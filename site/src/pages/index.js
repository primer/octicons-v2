/** @jsx jsx */
import { Input } from "@theme-ui/components"
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
  const [isShowingIconNames, setIsShowingIconNames] = React.useState(false)
  const results = useSearch(data.allIcon.nodes, query, { keys: ["name"] })

  const iconsBySize = React.useMemo(() => groupBy(results, "size"), [results])

  React.useEffect(() => {
    const valueFromLocalStorage = JSON.parse(
      window.localStorage.getItem("isShowingIconNames")
    )

    if (valueFromLocalStorage) {
      setIsShowingIconNames(valueFromLocalStorage)
    }
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem("isShowingIconNames", isShowingIconNames)
  }, [isShowingIconNames])

  return (
    <Layout>
      <Head />

      <div
        sx={{
          display: "grid",
          gridGap: 5,
        }}
      >
        <div>
          <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            type="search"
            placeholder="Search icons..."
            sx={{ p: 3, bg: "muted", borderColor: "border" }}
          />
          <label sx={{ display: "inline-block", fontSize: 1, mt: 3 }}>
            <input
              type="checkbox"
              checked={isShowingIconNames}
              onChange={event => setIsShowingIconNames(event.target.checked)}
              sx={{ mr: 2, ml: 0, my: 0, p: 0 }}
            />
            Show icon names
          </label>
        </div>
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

                  gridTemplateColumns: isShowingIconNames
                    ? "repeat(auto-fill, minmax(160px, 1fr))"
                    : `repeat(auto-fill, ${size}px)`,
                }}
              >
                {icons.map(icon => (
                  <Tooltip
                    key={icon.slug}
                    content={icon.name}
                    arrow={true}
                    arrowType="round"
                    delay={300}
                    enabled={!isShowingIconNames}
                  >
                    <Link
                      to={`/${icon.slug}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <Icon
                        size={icon.size}
                        viewBox={icon.viewBox}
                        contents={icon.contents}
                        sx={{ flex: "0 0 auto" }}
                      />
                      {isShowingIconNames ? (
                        <span sx={{ ml: 3, fontSize: 1 }}>{icon.name}</span>
                      ) : null}
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
