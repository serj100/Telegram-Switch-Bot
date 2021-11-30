const { howType } = require('./howType')

const replacelinks = async (linkBefore) => {
    let arrayTemplates = []
    const iDoNotKnowHow = 'Я не смог разобрать текст 😒'
    const err = 'Что-то пошло не так.'
    let arrayTemplatesWithoutLinks = []
    let typeLinks = ''
    let arrayLinks = []
    let arrayDescriptions = []
    let tempSting = ''
    let tempDecriptionArray1 = []
    let resultString = ''

    if (linkBefore) {
        typeLinks = howType(linkBefore)
    } else {
        return err
    }


    switch (typeLinks) {
        case 'one':
            try {

                tempSting = linkBefore.replace(/\[.*?\]\(.*?\)/g, '@new_link@')
                arrayTemplates = await linkBefore.match(/\[.*?\]\(.*?\)/g) // достаем все шаблоны

                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayDescriptions.push(...arrayTemplates[i].match(/(?<=(\[))(.*?)(?=(\]))/g)) // создаем массив из содержимого между []
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayLinks.push(...arrayTemplates[i].match(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/g)) // создаем массив из ссылок
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    resultString = tempSting.replace('@new_link@', `((${arrayLinks[i]} ${arrayDescriptions[i]}))`) // соеденяем все эти штучки воедино
                    tempSting = resultString
                }

                return resultString
            } catch {
                return err
            }
        case 'two': {
            try {
                tempSting = linkBefore.replace(/\(\(.*?\)\)/g, '@new_link@')
                arrayTemplates = await linkBefore.match(/\(\(.*?\)\)/g) // достаем все шаблоны
                
                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayLinks.push(...arrayTemplates[i].match(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/g)) // создаем массив из ссылок
                }
                
                for (i = 0; i < arrayTemplates.length; i++) {
                    arrayTemplatesWithoutLinks.push(arrayTemplates[i].replace(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/g, ''))
                    tempDecriptionArray1.push(arrayTemplatesWithoutLinks[i].slice(3))
                    arrayDescriptions.push(tempDecriptionArray1[i].slice(0, -2)) // тут уже имеем массив описаний ссылок
                }

                for (i = 0; i < arrayTemplates.length; i++) {
                    resultString = tempSting.replace('@new_link@', `[${arrayDescriptions[i]}](${arrayLinks[i]})`) // соеденяем все эти штучки воедино
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