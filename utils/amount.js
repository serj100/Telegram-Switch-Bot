const { howType } = require('./howType')

const amount = (linkBefore) => {
    let typeLinks = howType(linkBefore)
    let arrayTemplates = []
    let amount = null

    try {
        switch (typeLinks) {
            case 'one':
                arrayTemplates = linkBefore.match(/\[.*?\]\(.*?\)/g)
                amount = arrayTemplates.length
                return amount
            case 'two':
                arrayTemplates = linkBefore.match(/\(\(.*?\)\)/g)
                amount = arrayTemplates.length
                return amount
            default:
                amount = 0
                return amount
        }
    } catch {
        amount = 0
        return amount
    }
}

module.exports = { amount }