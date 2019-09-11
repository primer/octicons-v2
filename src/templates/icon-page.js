/** @jsx jsx */
import { jsx } from "theme-ui"
import Head from "../components/head"
import Icon from "../components/icon"
import IconViewer from "../components/icon-viewer"
import Layout from "../components/layout"
import Specimens16 from "../components/specimens-16"

export default function IconPage({ pageContext }) {
  const { name, width, height, viewBox, contents } = pageContext

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
    default:
      return <p sx={{ mt: 0, mb: 3 }}>No specimens available</p>
  }
}
