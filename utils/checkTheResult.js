const { amount } = require("./amount");
const { howType } = require("./howType");

const checkTheResult = (beforeText, resultText) => {
    let typeLinks = howType(resultText)
    const tempLink = '@new_link@'
    let matchTempLink = resultText.match(tempLink)
    const err = 'error'
    const ok = 'ok'
    let amountLinksBeforeText = amount(beforeText)
    let amountLinksResultText = amount(resultText)
    let beforeTextLength = beforeText.length
    let resultTextLength = resultText.length

    
    try {
        if (amountLinksBeforeText !== amountLinksResultText) return err // сравниваем кол-во ссылок на входе и выходе
        if (typeLinks === 'unknown' || typeLinks === 'error' || typeLinks === 'one_and_two') return err // должен быть только один тип ссылок на выходе
        if (matchTempLink) return err // если циклы по какой-то причине оставят на выходе '@new_link@' в строке
        if (typeLinks === 'one' && beforeTextLength != (resultTextLength + amountLinksResultText)) return err // ели по каким-то причинам на выходе имеем не то колличество символов, что должно быть
        if (typeLinks === 'two' && beforeTextLength != (resultTextLength - amountLinksResultText)) return err
    } catch {
        return err
    }
    return ok
}

module.exports = { checkTheResult }