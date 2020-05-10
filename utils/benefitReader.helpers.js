const fs = require('fs').promises
const _ = require('lodash')
function dlog(obj) {
  console.log(
    JSON.stringify({ msg: obj }, null, process.env.FORMAT_LOGS ? 2 : 0),
  )
}

process.env.FORMAT_LOGS = true
const readSection = (lines) => _.takeWhile(lines, endOfSection)
const dropSection = (lines) => _.drop(_.dropWhile(lines, endOfSection), 1)
const endOfSection = (l) => l !== '---'

const readBenefits = async () => {
  const files = await fs.readdir('../views/benefits')
  const benefitFiles = files.filter((filename) => filename.endsWith('.md'))

  benefitFiles.forEach(async (file) => {
    const benefit = await fs.readFile(`../views/benefits/${file}`)
    var lines = benefit.toString().split('\n')

    const retVal = {}
    retVal.header = readSection(lines)
    lines = dropSection(lines)
    retVal.list = readSection(lines)
    lines = dropSection(lines)
    retVal.Markdown = readSection(lines)
    lines = dropSection(lines)
    retVal.LinkText = readSection(lines)
    lines = dropSection(lines)
    retVal.URL = readSection(lines)
    lines = dropSection(lines)
    return retVal
  })
}

dlog(readBenefits())
module.exports = {
  readBenefits,
}
