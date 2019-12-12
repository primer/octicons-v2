/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Button({ as: Component = "button", ...props }) {
  return (
    <Component
      sx={theme => ({
        appearance: "none",
        p: 3,
        fontFamily: "inherit",
        fontSize: 1,
        fontWeight: "bold",
        color: "text",
        bg: "muted",
        border: 0,
        borderRadius: 1,
        cursor: "pointer",
        textDecoration: "none",
        boxShadow: `inset 0 -1px 2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px ${theme.colors.border},  0 1px 2px rgba(0, 0, 0, 0.05)`,
        ":disabled": {
          opacity: 0.5,
          cursor: "default",
        },
      })}
      {...props}
    />
  )
}
