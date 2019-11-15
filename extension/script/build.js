const fs = require("fs-extra")
const path = require("path")
const glob = require("glob")
const cheerio = require("cheerio")
const trimNewlines = require("trim-newlines")
const merge = require("lodash.merge")

const filepaths = glob.sync("icons/**/*.svg")

const icons = filepaths
  .map(filepath => {
    const name = path.parse(filepath).name
    const svg = fs.readFileSync(filepath, "utf8")
    const svgElement = cheerio.load(svg)("svg")
    const viewBox = svgElement.attr("viewBox")
    const width = parseInt(viewBox.split(" ")[2])
    const height = parseInt(viewBox.split(" ")[3])
    const contents = trimNewlines(svgElement.html().trim())
    return { name, size: height, contents }
  })
  .reduce(
    (acc, icon) =>
      merge(acc, {
        [icon.name]: { [icon.size]: icon.contents },
      }),
    {}
  )

fs.ensureDirSync(path.join(__dirname, "build"))
fs.writeFileSync(
  path.join(__dirname, "build/icons.json"),
  JSON.stringify(icons)
)
