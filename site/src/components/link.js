/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Link({ as: Component, ...props }) {
  return (
    <Component
      sx={{
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      {...props}
    />
  )
}

Link.defaultProps = {
  as: "a",
}
