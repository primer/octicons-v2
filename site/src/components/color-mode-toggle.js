/** @jsx jsx */
import Moon from "react-feather/dist/icons/moon"
import Sun from "react-feather/dist/icons/sun"
import { jsx, useColorMode } from "theme-ui"
import Button from "./button"

export default function ColorModeToggle(props) {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Button
      aria-label={
        colorMode === "default" ? "Activate dark mode" : "Activate light mode"
      }
      onClick={() => {
        setColorMode(colorMode === "default" ? "dark" : "default")
      }}
      sx={{
        padding: 1,
        lineHeight: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
      {...props}
    >
      {colorMode === "default" ? (
        <Moon fill="currentColor" />
      ) : (
        <Sun fill="currentColor" />
      )}
    </Button>
  )
}
