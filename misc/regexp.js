// Регулярные выражения
const linkTypeOne = /\[[^\[\]]*?\]\(.*?\)|^\[*?\]\(.*?\)/g // []()
const linkTypeTwo = /\(\((https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}[^\(\)]*?\)\)|\(\((https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}.*?\)\)/g // (())
const descriptionInTypeOne = /(?<=(\[))([^\[\]]*?)(?=(\]))|(?<=(\[))(.*?)(?=(\]))/g
const link = /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/g // ссылка

module.exports = { linkTypeOne, linkTypeTwo, descriptionInTypeOne, link }