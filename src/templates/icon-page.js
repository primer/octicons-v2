/** @jsx jsx */
import copy from "copy-to-clipboard"
import download from "downloadjs"
import React from "react"
import { jsx } from "theme-ui"
import Button from "../components/button"
import Head from "../components/head"
import Icon from "../components/icon"
import IconViewer from "../components/icon-viewer"
import Layout from "../components/layout"
import Specimens16 from "../components/specimens-16"
import Specimens24 from "../components/specimens-24"

export default function IconPage({ pageContext }) {
  const { name, width, height, viewBox, contents } = pageContext
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">${contents}</svg>`

  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Layout>
      <Head title={`${name} (${width}×${height})`} />
      <h1 sx={{ mt: 0, mb: 2, fontSize: 5, fontWeight: "bold" }}>{name}</h1>
      <p sx={{ mt: 0, mb: 4 }}>
        {width}×{height}
      </p>
      <IconViewer>
        <Icon
          width={width}
          height={height}
          viewBox={viewBox}
          contents={contents}
        />
      </IconViewer>
      <div
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: ["1fr", "repeat(3, 1fr)"],
          gridGap: 3,
        }}
      >
        <Button
          onClick={() => {
            copy(svg)
            setCopied(true)
          }}
        >
          {copied ? "Copied" : "Copy SVG"}
        </Button>
        <Button onClick={() => download(svg, `${name}.svg`, "image/svg+xml")}>
          Download SVG
        </Button>
        <Button disabled>Download PDF</Button>
      </div>
      <h2 sx={{ mt: 4, mb: 3, fontWeight: "bold", fontSize: 4 }}>Specimens</h2>
      <Specimens
        size={width}
        icon={props => (
          <Icon
            width={width}
            height={height}
            viewBox={viewBox}
            contents={contents}
            {...props}
          />
        )}
      />
    </Layout>
  )
}

function Specimens({ size, icon }) {
  switch (size) {
    case 16:
      return <Specimens16 icon={icon} />
    case 24:
      return <Specimens24 icon={icon} />
    default:
      return <p sx={{ mt: 0, mb: 3 }}>No specimens available</p>
  }
}
