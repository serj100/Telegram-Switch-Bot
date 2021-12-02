const { linkTypeOne, linkTypeTwo, descriptionInTypeOne, link } = require('../misc/regexp')
const { checkTheResult } = require('./checkTheResult')
const { howType } = require('./howType')

const replacelinks = async (linkBefore) => {
    let arrayTemplates = []
    const iDoNotKnowHow = 'Не нашел ссылок в тексте.'
    const err = 'Что-то пошло не так. Возможно это был не текст или одна из ссылок содержит ошибку.'
    let arrayTemplatesWithoutLinks = []
    let typeLinks = ''
    let arrayLinks = []
    let arrayDescriptions = []
    let tempSting = ''
    let tempDecriptionArray1 = []
    let resultString = ''
    const tempLink = '@new_link@'
    let check = ''

    if (!linkBefore){
        return err
    }

    typeLinks = howType(linkBefore)

    switch (typeLinks) {
        case 'one':
            try {

                tempSting = await linkBefore.replace(linkTypeOne, tempLink)
                arrayTemplates = await linkBefore.match(linkTypeOne) // достаем все шаблоны

                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayDescriptions.push(...arrayTemplates[i].match(descriptionInTypeOne)) // создаем массив из содержимого между []
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayLinks.push(...arrayTemplates[i].match(link)) // создаем массив из ссылок
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    resultString = tempSting.replace(tempLink, `((${arrayLinks[i]} ${arrayDescriptions[i]}))`) // соеденяем все эти штучки воедино
                    tempSting = resultString
                }
                check = checkTheResult(linkBefore, resultString)
                if(check === 'error') resultString = err // отсеиваем возможные неприятности
                return resultString
            } catch {
                return err
            }
        case 'two': {
            try {
                tempSting = await linkBefore.replace(linkTypeTwo, tempLink)
                arrayTemplates = await linkBefore.match(linkTypeTwo) // достаем все шаблоны
                
                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayLinks.push(...arrayTemplates[i].match(link)) // создаем массив из ссылок
                }
                
                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayTemplatesWithoutLinks.push(arrayTemplates[i].replace(link, ''))
                    tempDecriptionArray1.push(arrayTemplatesWithoutLinks[i].slice(3))
                    arrayDescriptions.push(tempDecriptionArray1[i].slice(0, -2)) // тут уже имеем массив описаний ссылок
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    resultString = tempSting.replace(tempLink, `[${arrayDescriptions[i]}](${arrayLinks[i]})`) // соеденяем все эти штучки воедино
                    tempSting = resultString
                }
                
                check = checkTheResult(linkBefore, resultString)
                if(check === 'error') resultString = err // отсеиваем возможные неприятности
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