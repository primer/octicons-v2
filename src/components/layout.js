/** @jsx jsx */
import { Global } from "@emotion/core"
import { jsx } from "theme-ui"
import ColorModeToggle from "../components/color-mode-toggle"
import { Link } from "gatsby"

export default function Layout({ children }) {
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
      <header
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Link
          to="/"
          sx={{ fontWeight: "bold", color: "inherit", textDecoration: "none" }}
        >
          Octicons Viewer
          <span
            sx={{
              fontSize: 0,
              color: "warningText",
              bg: "warningBg",
              py: 1,
              px: 2,
              ml: 2,
              borderRadius: 1,
            }}
          >
            WIP
          </span>
        </Link>
        <ColorModeToggle />
      </header>
      <main sx={{ width: "100%", maxWidth: 960, p: [4, 5], mx: "auto" }}>
        {children}
      </main>
    </div>
  )
}
