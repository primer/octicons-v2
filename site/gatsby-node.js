const fs = require("fs")
const path = require("path")
const glob = require("glob")
const cheerio = require("cheerio")
const trimNewlines = require("trim-newlines")
const Zip = require("node-zip")
const PDFDocument = require("pdfkit")
const svgToPdf = require("svg-to-pdfkit")
const groupBy = require("lodash.groupby")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const filepaths = glob.sync("../icons/**/*.svg")

  const icons = filepaths.map(filepath => {
    const name = path.parse(filepath).name
    const svg = fs.readFileSync(filepath, "utf8")
    const svgElement = cheerio.load(svg)("svg")
    const size = parseInt(svgElement.attr("height"))
    const viewBox = svgElement.attr("viewBox")
    const contents = trimNewlines(svgElement.html())
    const slug = `${name}-${size}`
    return { slug, name, size, viewBox, contents }
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

exports.createPages = async ({ graphql, actions }) => {
  const iconPageTemplate = path.resolve(__dirname, "src/templates/icon-page.js")

  const result = await graphql(`
    {
      allIcon {
        nodes {
          slug
          name
          size
          viewBox
          contents
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const iconsByName = groupBy(result.data.allIcon.nodes, "name")

  Object.values(iconsByName).forEach(icons => {
    const sizes = icons.reduce((acc, icon) => [...acc, icon.size], [])
    icons.forEach(icon => {
      actions.createPage({
        path: icon.slug,
        component: iconPageTemplate,
        context: {
          slug: icon.slug,
          name: icon.name,
          size: icon.size,
          viewBox: icon.viewBox,
          contents: icon.contents,
          sizes,
        },
      })
    })
  })
}

exports.onPostBuild = async ({ graphql }) => {
  const result = await graphql(`
    {
      allIcon {
        nodes {
          slug
          name
          size
          viewBox
          contents
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const icons = result.data.allIcon.nodes.map(async icon => {
    const svg = getSvg({
      viewBox: icon.viewBox,
      size: icon.size,
      contents: icon.contents,
    })

    const pdf = await getPdf({ svg, size: icon.size })

    return {
      ...icon,
      svg,
      pdf,
    }
  })

  Promise.all(icons).then(icons => {
    const zip = new Zip()

    icons.forEach(icon => {
      zip
        .folder("octicons")
        .folder("svg")
        .file(`${icon.name}-${icon.size}.svg`, icon.svg)

      zip
        .folder("octicons")
        .folder("pdf")
        .file(`${icon.name}-${icon.size}.pdf`, icon.pdf)
    })

    const data = zip.generate({ base64: false, compression: "DEFLATE" })
    fs.writeFileSync(
      path.resolve(__dirname, "public/octicons.zip"),
      data,
      "binary"
    )
  })
}

function getSvg({ viewBox, size, contents }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${size}" height="${size}">${contents}</svg>`
}

function getPdf({ svg, size }) {
  return new Promise(resolve => {
    let buffers = []
    const doc = new PDFDocument({ size: [size, size] })
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => resolve(Buffer.concat(buffers)))
    svgToPdf(doc, svg, 0, 0, { assumePt: true })
    doc.end()
  })
}
