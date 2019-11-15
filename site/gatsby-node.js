const fs = require("fs")
const path = require("path")
const glob = require("glob")
const cheerio = require("cheerio")
const trimNewlines = require("trim-newlines")
const slugify = require("@sindresorhus/slugify")
const Zip = require("node-zip")
const PDFDocument = require("pdfkit")
const svgToPdf = require("svg-to-pdfkit")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const filepaths = glob.sync("../icons/**/*.svg")

  const icons = filepaths.map(filepath => {
    const slug = slugify(path.relative("icons", filepath).replace(/.svg/, ""))
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

exports.createPages = async ({ graphql, actions }) => {
  const iconPageTemplate = path.resolve(__dirname, "src/templates/icon-page.js")

  const result = await graphql(`
    {
      allIcon {
        nodes {
          slug
          name
          width
          height
          viewBox
          contents
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allIcon.nodes.forEach(icon => {
    actions.createPage({
      path: icon.slug,
      component: iconPageTemplate,
      context: {
        name: icon.name,
        width: icon.width,
        height: icon.height,
        viewBox: icon.viewBox,
        contents: icon.contents,
      },
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
          width
          height
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
      width: icon.width,
      height: icon.height,
      contents: icon.contents,
    })

    const pdf = await getPdf({ svg, width: icon.width, height: icon.height })

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
        .file(`${icon.name}-${icon.width}.svg`, icon.svg)

      zip
        .folder("octicons")
        .folder("pdf")
        .file(`${icon.name}-${icon.width}.pdf`, icon.pdf)
    })

    const data = zip.generate({ base64: false, compression: "DEFLATE" })
    fs.writeFileSync(
      path.resolve(__dirname, "public/octicons.zip"),
      data,
      "binary"
    )
  })
}

function getSvg({ viewBox, width, height, contents }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">${contents}</svg>`
}

function getPdf({ svg, width, height }) {
  return new Promise(resolve => {
    let buffers = []
    const doc = new PDFDocument({ size: [width, height] })
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => resolve(Buffer.concat(buffers)))
    svgToPdf(doc, svg, 0, 0, { assumePt: true })
    doc.end()
  })
}
