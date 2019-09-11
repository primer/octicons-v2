/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Specimens24({ icon: Icon }) {
  return (
    <div sx={{ display: "grid", gridGap: 3, justifyItems: "start" }}>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          p: 3,
          border: "1px solid",
          borderColor: "border",
          borderRadius: 1,
        }}
      >
        <Icon sx={{ mr: 3 }} />
        <span contentEditable>Flash message</span>
      </div>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          color: "text",
          bg: "border",
          borderRadius: "50%",
        }}
      >
        <Icon />
      </div>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          color: "background",
          bg: "text",
          borderRadius: "50%",
        }}
      >
        <Icon />
      </div>
    </div>
  )
}
