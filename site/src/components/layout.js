/** @jsx jsx */
import { Global } from "@emotion/core"
import { Link as GatsbyLink } from "gatsby"
import { jsx } from "theme-ui"
import ColorModeToggle from "./color-mode-toggle"
import Link from "./link"

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
          alignItems: ["flex-start", "center"],
          p: 3,
        }}
      >
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: ["flex-start", "center"],
            flexDirection: ["column", "row"],
            flexGrow: 1,
          }}
        >
          <Link
            as={GatsbyLink}
            to="/"
            sx={{ fontWeight: "bold", "&:hover": { textDecoration: "none" } }}
          >
            Octicons v2
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
          <div sx={{ mt: [3, 0] }}>
            <Link
              href="https://github.com/primer/octicons-v2/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mr: [3, 4] }}
            >
              View repo
            </Link>
            <Link href="/octicons.zip" download sx={{ mr: [3, 4] }}>
              Download all
            </Link>
            <Link
              href="https://chrome.google.com/webstore/detail/emgbcekhgdlkgiggjjjgmgcgbckfljan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome extension
            </Link>
          </div>
        </div>
        <ColorModeToggle sx={{ ml: 4 }} />
      </header>
      <main sx={{ width: "100%", maxWidth: 960, p: [4, 5], mx: "auto" }}>
        {children}
      </main>
    </div>
  )
}
