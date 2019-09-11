/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Specimens16({ icon: Icon }) {
  return (
    <div sx={{ display: "grid", gridGap: 3, justifyItems: "start" }}>
      <span>
        <Icon sx={{ mr: 1 }} />
        <span contentEditable>Inline text</span>
      </span>
      <span sx={{ fontSize: 1 }}>
        <Icon sx={{ mr: 1 }} />
        <span contentEditable>Small inline text</span>
      </span>
      <button
        sx={{
          appearance: "none",
          px: 3,
          py: 2,
          fontFamily: "inherit",
          fontSize: 1,
          fontWeight: "bold",
          color: "text",
          background: "transparent",
          border: "1px solid",
          borderColor: "border",
          borderRadius: 1,
        }}
      >
        <Icon sx={{ mr: 1 }} />
        <span contentEditable>Button</span>
      </button>
      <span
        sx={{
          display: "inline-block",
          bg: "text",
          color: "background",
          py: 1,
          px: 2,
          fontSize: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Icon
          sx={{
            mr: 1,
          }}
        />
        <span contentEditable>Label</span>
      </span>
      <div
        sx={{
          display: "flex",
          bg: "border",
          justifyContent: "center",
          alignItems: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
        }}
      >
        <Icon />
      </div>
      <div
        sx={{
          display: "flex",
          bg: "text",
          color: "background",
          justifyContent: "center",
          alignItems: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
        }}
      >
        <Icon />
      </div>
    </div>
  )
}
