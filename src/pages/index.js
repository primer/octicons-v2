/** @jsx jsx */
import { Global } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import groupBy from "lodash.groupby"
import { jsx } from "theme-ui"
import ColorModeToggle from "../components/color-mode-toggle"

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
    <div>
      <Global
        styles={theme => ({
          body: {
            margin: 0,
            boxSizing: "border-box",
            fontFamily: theme.fonts.body,
            color: theme.colors.tet,
            backgroundColor: theme.colors.background,
          },
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
        })}
      />
      <div sx={{ position: "absolute", top: 0, right: 0, p: 3 }}>
        <ColorModeToggle />
      </div>
      <main
        sx={{
          display: "grid",
          gridGap: 5,
          width: "100%",
          maxWidth: 960,
          p: [4, 5],
          mx: "auto",
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
                <svg
                  key={icon.slug}
                  width={icon.width}
                  height={icon.height}
                  viewBox={icon.viewBox}
                  fill="currentColor"
                  dangerouslySetInnerHTML={{ __html: icon.contents }}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
