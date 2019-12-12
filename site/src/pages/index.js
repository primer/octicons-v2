/** @jsx jsx */
import Tooltip from "@tippy.js/react"
import { graphql, Link, useStaticQuery } from "gatsby"
import groupBy from "lodash.groupby"
import React from "react"
import { jsx } from "theme-ui"
import Head from "../components/head"
import Icon from "../components/icon"
import Layout from "../components/layout"
import useSearch from "../use-search"

export default function App() {
  const data = useStaticQuery(graphql`
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
  const [query, setQuery] = React.useState("")
  const results = useSearch(data.allIcon.nodes, query, { keys: ["name"] })

  const iconsBySize = groupBy(results, "size")

  return (
    <Layout>
      <Head />
      <div
        sx={{
          display: "grid",
          gridGap: 5,
        }}
      >
        <input
          sx={{
            width: "100%",
            p: 3,
            appearance: "none",
            border: "1px solid",
            borderColor: "border",
            borderRadius: 1,
            fontSize: "inherit",
            backgroundColor: "muted",
            color: "inherit",
          }}
          value={query}
          onChange={event => setQuery(event.target.value)}
          type="search"
          placeholder="Search icons..."
        />
        {Object.entries(iconsBySize).length > 0 ? (
          Object.entries(iconsBySize).map(([size, icons]) => (
            <div key={size}>
              <h2 sx={{ mt: 0, mb: 4, fontSize: 2, fontWeight: "bold" }}>
                {size}px
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
                      <Icon
                        size={icon.size}
                        viewBox={icon.viewBox}
                        contents={icon.contents}
                      />
                    </Link>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p sx={{ textAlign: "center" }}>No results found</p>
        )}
      </div>
    </Layout>
  )
}
