const fs = require("fs")
const path = require("path")
const glob = require("glob")
const cheerio = require("cheerio")
const trimNewlines = require("trim-newlines")
const slugify = require("@sindresorhus/slugify")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const filepaths = glob.sync("icons/**/*.svg")

  const icons = filepaths.map(filepath => {
    const slug = slugify(path.relative("icons", filepath))
    const name = path.parse(filepath).name
    const svg = fs.readFileSync(filepath, "utf8")
    const svgElement = cheerio.load(svg)("svg")
    const width = parseInt(svgElement.attr("width"))
    const height = parseInt(svgElement.attr("height"))
    const viewBox = svgElement.attr("viewBox")
    const contents = trimNewlines(svgElement.html())
    return { slug, name, width, height, viewBox, contents }
  })

  icons.forEach(icon => {
    actions.createNode({
      ...icon,
      id: createNodeId(icon.slug),
      parent: null,
      children: [],
      internal: {
        type: "Icon",
        content: JSON.stringify(icon),
        contentDigest: createContentDigest(icon),
      },
    })
  })
}
