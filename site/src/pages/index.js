/** @jsx jsx */
import { graphql, Link, useStaticQuery } from "gatsby"
import groupBy from "lodash.groupby"
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import Head from "../components/head"
import Tooltip from "@tippy.js/react"

export default function App() {
  const data = useStaticQuery(graphql`
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

  const iconsBySize = groupBy(data.allIcon.nodes, "width")

  return (
    <Layout>
      <Head />
      <div
        sx={{
          display: "grid",
          gridGap: 5,
        }}
      >
        {Object.entries(iconsBySize).map(([size, icons]) => (
          <div key={size}>
            <h2 sx={{ mt: 0, mb: 4, fontSize: 2, fontWeight: "bold" }}>
              {size}
            </h2>
            <div
              sx={{
                display: "grid",
                gridGap: 4,
                gridTemplateColumns: `repeat(auto-fill, ${size}px)`,
              }}
            >
              {icons.map(icon => (
                <Tooltip
                  key={icon.slug}
                  content={icon.name}
                  arrow={true}
                  arrowType="round"
                  delay={300}
                >
                  <Link
                    to={`/${icon.slug}`}
                    sx={{ display: "flex", color: "inherit" }}
                  >
                    <svg
                      width={icon.width}
                      height={icon.height}
                      viewBox={icon.viewBox}
                      fill="currentColor"
                      dangerouslySetInnerHTML={{ __html: icon.contents }}
                    />
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
