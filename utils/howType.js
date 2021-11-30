const howType = (linkBefore) => {
    let typeFormatLink = null
    const err = 'error'

    let typeLinkOne = linkBefore.match(/\[.*?\]\(.*?\)/g) // []()
    let typeLinkTwo = linkBefore.match(/\(\(.*?\)\)/g) // (())

    try{
        if(typeLinkOne && (!typeLinkTwo)){
            typeFormatLink = 'one'
        } else if (typeLinkOne && typeLinkTwo) {
            typeFormatLink = 'one_and_two'
        } else if (typeLinkTwo && (typeLinkOne === null)) {
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