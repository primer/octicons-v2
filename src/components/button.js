/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Button(props) {
  return (
    <button
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
        ":disabled": {
          opacity: 0.5,
          cursor: "default",
        },
      }}
      {...props}
    />
  )
}
