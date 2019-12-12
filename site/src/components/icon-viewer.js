/** @jsx jsx */
import { Slider } from "@theme-ui/components"
import { rgba } from "polished"
import React from "react"
import { jsx, useThemeUI } from "theme-ui"

export default function IconViewer({ children }) {
  const [zoom, setZoom] = React.useState(10)
  const { theme } = useThemeUI()

  return (
    <div
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
        border: "1px solid",
        borderColor: "border",
        borderRadius: 1,
        overflow: "hidden",
        backgroundImage: `${gridGradient(
          0,
          getGridSize(zoom),
          theme.colors.border,
          theme
        )}, ${gridGradient(90, getGridSize(zoom), theme.colors.border)}`,
        backgroundSize: `${getGridSize(zoom)}px ${getGridSize(zoom)}px`,
        backgroundPosition: "center center",
      }}
    >
      <div
        sx={theme => ({
          display: "flex",
          transform: `scale(${zoom})`,
          boxShadow: `0 0 0 ${1 / zoom}px ${theme.colors.accent}`,
        })}
      >
        {children}
      </div>
      <div
        sx={{
          display: "grid",
          gridGap: 2,
          gridTemplateColumns: "1fr 48px",
          justifyItems: "start",
          alignItems: "center",
          position: "absolute",
          left: 0,
          bottom: 0,
          width: ["100%", "25%"],
          p: 3,
        }}
      >
        <Slider
          aria-label="zoom"
          name="zoom"
          min="1"
          max="24"
          step="0.5"
          value={zoom}
          onChange={event => setZoom(parseFloat(event.target.value))}
          sx={{ width: "100%", p: 0, m: 0, mr: 2 }}
        />
        <span sx={{ flexShrink: 0 }}>{zoom * 100}%</span>
      </div>
    </div>
  )
}

function gridGradient(angle, size, color) {
  // WebKit browsers do not support the "transparent" keyword in gradients.
  // As a workaround, we convert `color` to rgba with an alpha value of 0.
  const tranparent = rgba(color, 0)
  return `linear-gradient(${angle}deg, ${tranparent}, ${tranparent} ${Math.floor(
    size / 2
  )}px, ${color}, ${tranparent} ${Math.floor(size / 2) + 1}px)`
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
