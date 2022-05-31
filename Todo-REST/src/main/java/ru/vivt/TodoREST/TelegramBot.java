package ru.vivt.TodoREST;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.BotApiMethod;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import ru.vivt.TodoREST.domain.SmartTask;
import ru.vivt.TodoREST.repository.SmartTaskRepository;
import ru.vivt.TodoREST.repository.UserRepository;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class TelegramBot extends Thread implements InitializingBean {
    @Value("${server.telegram.bot.token}")
    private String tgToken;
    @Value("${server.telegram.bot.timeout}")
    private Long timeOutTg;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SmartTaskRepository smartTaskRepository;


    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

    public static String generateNewToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    private static BotApiMethod<Message> createMsg(String chatId, String text) {
        var msg = new SendMessage();
        msg.setChatId(chatId);
        msg.setText(text);
        return msg;
    }

    public TelegramLongPollingBot botInit() {
        var bot = new TelegramLongPollingBot() {


            @Override
            public void onUpdateReceived(Update update) {
                var chatId = update.getMessage().getChatId();

                var msgHi = createMsg(chatId.toString(), "Привет! Введи свой логин для получения уведомлений, командой /login [login]");
                var msgError = createMsg(chatId.toString(), "Ошибка!");
                var msgMail = createMsg(chatId.toString(), "Привязка к логину прошла успешно! Введите код из личного кабинета для активации оповещений /token [token]");//error: critical vulnerability
                var msgMailCompleted = createMsg(chatId.toString(), "Оповещения подключены");

                String msgUpdate = update.getMessage().getText();

                Function<String, BotApiMethod<Message>> funLoginCheck = (o -> {
                    String loginUser = o.toString().replace("/login ", "");
                    System.out.println("Login: " + loginUser);

                    var u = userRepository.findByLogin(loginUser);
                    u.setChatIdTg(chatId.toString());
                    u.setConfirmedTg(false);
                    u.setSecretTokenTg(generateNewToken());
                    userRepository.save(u);
                    return msgMail;
                });

                Function<String, BotApiMethod<Message>> funcTokenCheck = (o -> {
                    String tokenUser = o.toString().replace("/token ", "");
                    System.out.println("Token: " + tokenUser);


                    var u = userRepository.findByChatId(chatId.toString()).orElse(null);
                    if (u != null && u.size() == 1 && u.get(0).getSecretTokenTg().equals(tokenUser)) {
                        u.get(0).setConfirmedTg(true);
                        u.get(0).setChatIdTg(chatId.toString());
                        u.get(0).setSecretTokenTg(null);
                        userRepository.save(u.get(0));
                        return msgMailCompleted;
                    } else {
                        return msgError;
                    }
                });

                try {
                    execute(switch (msgUpdate) {
                        case "/start" -> (msgHi);
                        case String s && s.startsWith("/login") -> funLoginCheck.apply(s);
                        case String s && s.startsWith("/token") -> funcTokenCheck.apply(s);
                        default -> msgError;
                    });
                } catch (TelegramApiException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public String getBotUsername() {
                return "Note_bot";
            }

            @Override
            public String getBotToken() {
                return tgToken;
            }
        };

        return bot;
    }

    @Override
    public void run() {
        try {

            TelegramLongPollingBot bot =  botInit();
            TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
            telegramBotsApi.registerBot(bot);

            while (true) {
                try {
                    System.out.println("send tg bot message");
                    var currentDate = new Date(System.currentTimeMillis());
                    var smartTaskAndUser = smartTaskRepository
                            .findAll().stream().filter(f -> !f.isCompleted() && f.getTimeBound().before(currentDate))
                            .collect(Collectors.groupingBy(SmartTask::getIdUser))
                            .entrySet();
                    
                    smartTaskAndUser.stream().forEach(f -> {
                        var u = userRepository.findById(f.getKey());
                        if (u.isPresent()) {
                            var user = u.get();
                            if (user.getChatIdTg() != null && user.isConfirmedTg()) {
                                var msgSendTg = f.getValue().stream()
                                        .map(sm -> {
                                            sm.getAchievable();
                                            sm.getRelevant();
                                            sm.getSpecific();
                                            sm.getTimeBound();
                                            sm.getMeasurable();
                                            String stringSmartTask = """
                                                    ------------
                                                    (S) Цель: %s
                                                    (M) : %s
                                                    (A) : %s
                                                    (R) : %s
                                                    (T) : %S
                                                    -------------
                                                    """.formatted(sm.getSpecific(), sm.getMeasurable(), sm.getAchievable(), sm.getRelevant(), sm.getTimeBound().toString());
                                            return stringSmartTask;
                                        })
                                        .reduce("", (sm, sm2) -> sm + "\n" + sm2);
                                try {
                                    bot.execute(createMsg(user.getChatIdTg(), msgSendTg));
                                } catch (TelegramApiException | NullPointerException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    });

                    Thread.sleep(timeOutTg);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterPropertiesSet() {
        start();
    }
}
