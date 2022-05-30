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
import ru.vivt.TodoREST.repository.SmartTaskRepository;
import ru.vivt.TodoREST.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

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

    private static Map<String, String> mapChatMail = new HashMap<>();

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
                var msgError = createMsg(chatId.toString(), "Error!");
                var msgMail = createMsg(chatId.toString(), "Привязка к почте прошла успешно");//error: critical vulnerability

                String msgUpdate = update.getMessage().getText();

                Function<String, BotApiMethod<Message>> fun = (o -> {
                    String loginUser = o.toString().replace("/login ", "");
                    System.out.println("Login: " + loginUser);

                    mapChatMail.put(chatId.toString(), loginUser);
                    var u = userRepository.findByLogin(loginUser);
                    u.setChatIdTg(chatId.toString());
                    u.setConfirmedTg(false);
                    u.setSecretTokenTg("test-token");
                    userRepository.save(u);
                    return msgMail;
                });

                try {
                    execute(switch (msgUpdate) {
                        case "/start" -> (msgHi);
                        case String s && s.startsWith("/login") -> fun.apply(s);
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
                    smartTaskRepository.findAll().stream().filter(f -> !f.isCompleted()).forEach(f -> {//todo: add filter date, single msg, verifizieren user
                        System.out.println(f.toString());
                        var u = userRepository.findById(f.getIdUser());
                        if (u.isPresent()) {
                            var user = u.get();
                            user.setConfirmedTg(true);
                            if (user.getChatIdTg() != null && user.isConfirmedTg()) {
                                try {
                                    bot.execute(createMsg(user.getChatIdTg(), f.toString()));
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
    public void afterPropertiesSet() throws Exception {
        start();
    }
}
