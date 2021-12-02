const { replacelinks } = require('./utils/replaceLinks')
const { amount } = require('./utils/amount')
const config = require('config');

const TelegramBotApi = require('node-telegram-bot-api')

const bot = new TelegramBotApi(config.get('token'), {
    polling: true
})

let messageAmountLinks = (amountLinks) => (`👀🧾 Количество форматированных ссылок в тексте: ${amountLinks}`)

bot.on('message', msg => {
    const text = msg.text
    const chatId = msg.chat.id
    let amountLinksInText = 0

    replacelinks(text).then(result => {
        amountLinksInText = amount(result)
        bot.sendMessage(chatId , result, {
            disable_web_page_preview: true
        })
        bot.sendMessage(chatId , messageAmountLinks(amountLinksInText))
    })
    
})