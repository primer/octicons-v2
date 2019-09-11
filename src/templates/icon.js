/** @jsx jsx */
import React from "react"
import { jsx, useThemeUI } from "theme-ui"
import Layout from "../components/layout"
import Head from "../components/head"

export default function Icon({ pageContext }) {
  const { name, width, height, viewBox, contents } = pageContext
  const [zoom, setZoom] = React.useState(10)
  const { theme } = useThemeUI()

  return (
    <Layout>
      <Head title={`${name} (${width}×${height})`} />
      <h1 sx={{ mt: 0, mb: 2, fontSize: 5, fontWeight: "bold" }}>{name}</h1>
      <p sx={{ mt: 0, mb: 4 }}>
        {width}×{height}
      </p>
      <div
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          border: "1px solid",
          borderColor: "border",
          overflow: "hidden",
          backgroundImage: `${gridGradient(
            0,
            getGridSize(zoom),
            theme.colors.border
          )}, ${gridGradient(90, getGridSize(zoom), theme.colors.border)}`,
          backgroundSize: `${getGridSize(zoom)}px ${getGridSize(zoom)}px`,
          backgroundPosition: "center center",
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          fill="currentColor"
          dangerouslySetInnerHTML={{ __html: contents }}
          sx={{
            transform: `scale(${zoom})`,
          }}
        />
        <div
          sx={{
            display: "flex",
            position: "absolute",
            left: 0,
            bottom: 0,
            width: ["100%", "25%"],
            p: 3,
          }}
        >
          <input
            aria-label="zoom"
            name="zoom"
            type="range"
            min="1"
            max="24"
            step="0.5"
            value={zoom}
            onChange={event => setZoom(parseFloat(event.target.value))}
            sx={{ flexGrow: 1, p: 0, m: 0, mr: 2 }}
          />
          <span sx={{ flexShrink: 0 }}>{zoom * 100}%</span>
        </div>
      </div>
    </Layout>
  )
}

function gridGradient(angle, size, color) {
  return `linear-gradient(${angle}deg, transparent, transparent ${Math.floor(
    size / 2
  )}px, ${color}, transparent ${Math.floor(size / 2) + 1}px)`
}

function getGridSize(zoom) {
  if (zoom > 8) {
    return zoom
  }

  if (zoom > 4) {
    return zoom * 2
  }

  if (zoom > 2) {
    return zoom * 6
  }

  return zoom * 12
}
