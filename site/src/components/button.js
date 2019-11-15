/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Button({ as: Component = "button", ...props }) {
  return (
    <Component
      sx={{
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
        ":disabled": {
          opacity: 0.5,
          cursor: "default",
        },
      }}
      {...props}
    />
  )
}
