const { howType } = require('./howType')

const replacelinks = async (linkBefore) => {
    const iDoNotKnowHow = 'Я не смог разобрать текст 😒'
    const err = 'Что-то пошло не так.'
    let typeLinks = ''
    let arrayLinks = []
    let arrayDescriptions = []
    let tempSting = ''
    let tempArray = []
    let resultString = ''

    if (linkBefore) {
        typeLinks = howType(linkBefore)
    } else {
        return err
    }


    switch (typeLinks) {
        case 'one':
            try {
                arrayDescriptions = await linkBefore.match(/(?<=(\[))(.*?)(?=(\]))/g) // создаем массив из содержимого между []
                tempSting = await linkBefore.replace(/(\))/g, ' @new_descr@))') // ')' в строке заменем на ' @new_descr@))' для дальнейшей подставки значений из массива arrayDescriptions
                tempSting = await tempSting.replace(/\[(.*?)\]/g, '(') // заменяем [] вместе с содержимым на '(', получается (( перед ссылкой
                // в этом цикле перебираем массив и заменяем в строке все '@new_descr@'
                for (i = 0; i < arrayDescriptions.length; i++) {
                    resultString = tempSting.replace('@new_descr@', arrayDescriptions[i])
                    tempSting = resultString
                }
                return resultString // найс, работает, не трогаем )
            } catch {
                return err
            }

        case 'two': {
            try {
                arrayLinks = await linkBefore.match(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/gim) // все ссылки в массив
                tempSting = await linkBefore.replace(/(\(\(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}(.*?)\)\)/gim, '@new_link@') // заменяем ссылки с описанием на '@new_link@' для замены в цикле
                tempArray2 = await linkBefore.match(/(\(\(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}(\s(.*?)\)\))/gim) // (()) с содержимым


                for (i = 0; i < tempArray2.length; i++) {
                    arrayDescriptions.push(tempArray2[i].replace(/(\(\(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}\s/gim, '')) // удаляем ссылки и оставляем "описание))"
                    tempArray.push(arrayDescriptions[i].replace('))', '')) // удаляем из описания '))'
                }

                // циклом проходимся по строке, заменяя @new_descr@ на шаблон строки
                for (i = 0; i < arrayLinks.length; i++) {
                    resultString = tempSting.replace('@new_link@', `[${tempArray[i]}](${arrayLinks[i]})`)
                    tempSting = resultString
                }
                return resultString
            } catch {
                return err
            }
        }
        case 'one_and_two': {
            resultString = iDoNotKnowHow
            return resultString
        }
        case 'unknown': {
            resultString = iDoNotKnowHow
            return resultString
        }
        case 'error': {
            resultString = err
            return resultString
        }
        default:
            resultString = err
            return resultString
    }
}

module.exports = { replacelinks }