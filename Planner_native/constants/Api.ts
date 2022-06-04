export const server = "http://10.0.2.2:8080/"
// export const server = "http://servermvp.ru:49379/"

export const api = {
    registration: `${server}registration`,
	authentication: `${server}hello`,
	version: `${server}version`,
	note: `${server}note`,
	saveNote: `${server}note/save`,
	saveSmartTask: `${server}smarttask/save`,
	smartTask: `${server}smarttask`,
	timerTracker: `${server}timertracker`,
	saveTimerTracker: `${server}timertracker/save`,
	userInfo: `${server}user_info`,
    disableTelegram: `${server}disable_tg`
}