/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"

const modes = ["light", "dark"]

export default function ColorModeToggle() {
  const [mode, setMode] = useColorMode()
  return (
    <button
      onClick={() => {
        const index = modes.indexOf(mode)
        const next = modes[(index + 1) % modes.length]
        setMode(next)
      }}
      sx={{
        appearance: "none",
        px: 2,
        py: 1,
        fontFamily: "inherit",
        fontSize: 1,
        fontWeight: "bold",
        color: "text",
        background: "transparent",
        border: "1px solid",
      }}
    >
      {mode}
    </button>
  )
}
