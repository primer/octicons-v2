/** @jsx jsx */
import { graphql, Link, useStaticQuery } from "gatsby"
import groupBy from "lodash.groupby"
import { jsx } from "theme-ui"
import Layout from "../components/layout"

export default function App() {
  const data = useStaticQuery(graphql`
    {
      allIcon {
        nodes {
          slug
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
                <Link key={icon.slug} to={icon.slug} sx={{ color: "inherit" }}>
                  <svg
                    width={icon.width}
                    height={icon.height}
                    viewBox={icon.viewBox}
                    fill="currentColor"
                    dangerouslySetInnerHTML={{ __html: icon.contents }}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
