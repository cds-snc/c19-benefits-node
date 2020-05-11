const fs = require('fs').promises

 process.env.FORMAT_LOGS = false
function dlog(obj) {
  console.log(
    JSON.stringify({ msg: obj }, null, process.env.FORMAT_LOGS ? 2 : 0),
  )
}

const nlAtBeginning = /^\n/
const nlAtEnd = /\n$/

const get4SectionBenefit = (sections) => {
  const section = {
    header: sections[0],
    markdown: sections[1],
    linkText: sections[2],
    url: sections[3],
  }
  return section
}

const get5SectionBenefit = (sections) => {
  const section = {
    header: sections[0],
    blueLinks: sections[1],
    markdown: sections[2],
    linkText: sections[3],
    url: sections[4],
  }
  return section
}

const getSections = (benefit) =>
  benefit
    .toString()
    .split('---')
    .map((s) => {
      return s.replace(nlAtBeginning, '').replace(nlAtEnd, '').split('\n')
    })

const readBenefitFile = async (file) => {
  const benefit = await fs.readFile(`../views/benefits/${file}`)
  const sections = getSections(benefit)
  switch (sections.length) {
    case 4:
      return get4SectionBenefit(sections)
    case 5:
      return get5SectionBenefit(sections)
    default:
      throw new Error('Invalid Benefit')
  }
}

const readBenefits = async (benefitsDirectory) => {
  const files = await fs.readdir(benefitsDirectory)
  return await Promise.all(
    files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const benefit = await readBenefitFile(filename)
        return benefit
      }),
  )
}

readBenefits('../views/benefits').then((x) => {
  dlog(x)
})

module.exports = {
  readBenefits,
}
