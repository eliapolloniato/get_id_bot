var myArgs = process.argv.slice(2)
const cvapi = require('./get')
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

var debug = false
if (myArgs[0] == 'debug') { debug = true }
if (debug) console.log('Debug enabled')

var options = {}

const bot = new TelegramBot(process.env.TOKEN, { polling: true })

bot.onText(/\/check (.+)/, (msg, match) => { // /check command

    const chatId = msg.chat.id
    if (match[1].split(' ', 2)[1] != undefined && match[1].split(' ', 2)[0] != undefined) {
        options.password = match[1].split(' ', 2)[1] //get username and password from command
        options.username = match[1].split(' ', 2)[0]
        cvapi(options, debug, (res, err) => {
            if (err) {
                console.log(err)
                if (err = 'wrong') {
                    bot.sendMessage(chatId, 'Username o password errati')
                }
            } else {
                if (debug) console.log('Done, sending informations')
                var text = 'Nome e Cognome: ' + res.firstName + ' ' + res.lastName + '\nId utente: ' + res.ident
                bot.sendMessage(chatId, text)
            }
        })
    } else bot.sendMessage(chatId, 'Nome utente o password non specificati')
})

bot.onText(/\/github/, (msg) => { // /check command alone

    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'Bot creato da Elia Polloniato\nGithub: https://github.com/eliapolloniato/get_id_bot')
})

bot.onText(/\/help/, (msg) => { // /help command 

    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'Comandi e utilizzo:\n/check <indirizzo mail> <password> -> utilizza le credenziali per entrare in Spaggiari per trovare il tuo codice identificativo\n/github -> link al source code su GitHub')
})
bot.onText(/\/start/, (msg) => { // /start command

    const chatId = msg.chat.id

    bot.sendMessage(chatId, "Benvenuto, questo bot è stato sviluppato da Elia Polloniato.\nLe informazioni d'accesso che invii in questa chat non vengono salvate.\nDigita /help per una lista di comandi disponibili")
})