/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import Button from "./button"

const modes = ["light", "dark"]

export default function ColorModeToggle() {
  const [mode, setMode] = useColorMode()
  return (
    <Button
      onClick={() => {
        const index = modes.indexOf(mode)
        const next = modes[(index + 1) % modes.length]
        setMode(next)
      }}
      sx={{
        px: 2,
        py: 1,
      }}
    >
      {mode}
    </Button>
  )
}
