const {linkTypeOne, linkTypeTwo} = require('../misc/regexp')

const howType = (linkBefore) => {
    let typeFormatLink = null
    const err = 'error'

    if (!linkBefore){
        return err
    }

    let typeLinkOne = linkBefore.match(linkTypeOne) // []()
    let typeLinkTwo = linkBefore.match(linkTypeTwo) // (())

    try{
        if(typeLinkOne && (!typeLinkTwo)){
            typeFormatLink = 'one'
        } else if (typeLinkOne && typeLinkTwo) {
            typeFormatLink = 'one_and_two'
        } else if (typeLinkTwo && (!typeLinkOne)) {
            typeFormatLink = 'two'
        } else {
            typeFormatLink = 'unknown'
        }
    } catch {
        return err
    }


    return typeFormatLink
}


module.exports = { howType }