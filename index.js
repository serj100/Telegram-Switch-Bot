const { replacelinks } = require('./utils/replaceLinks')
const { amount } = require('./utils/amount')
const config = require('config');

const TelegramBotApi = require('node-telegram-bot-api')

const bot = new TelegramBotApi(config.get('token'), {
    polling: true
})

let message = (amountLinks, result) => (
`
Количество найденных ссылок в тексте: ${amountLinks}
Результат:

${result}
`
)


bot.on('message', msg => {
    const text = msg.text
    const chatId = msg.chat.id
    let amountLinksInText = 0
    replacelinks(text).then(result => {
        amountLinksInText = amount(result)
        bot.sendMessage(chatId , message(amountLinksInText, result))
    })
})