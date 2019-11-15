// @preval
// This file is evaluated at build time using babel-plugin-preval.

const fs = require("fs-extra")
const path = require("path")
const glob = require("glob")
const cheerio = require("cheerio")
const trimNewlines = require("trim-newlines")
const merge = require("lodash.merge")
const aliases = require("../../aliases.json")

const filepaths = glob.sync("../icons/**/*.svg")

const icons = filepaths
  .map(filepath => {
    const name = path.parse(filepath).name
    const svg = fs.readFileSync(filepath, "utf8")
    const svgElement = cheerio.load(svg)("svg")
    const viewBox = svgElement.attr("viewBox")
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

const iconsWithAliases = Object.keys(aliases).reduce((acc, iconName) => {
  const copies = aliases[iconName].map(alias => ({ [alias]: icons[iconName] }))
  return merge.apply(this, [acc, ...copies])
}, icons)

module.exports = iconsWithAliases
