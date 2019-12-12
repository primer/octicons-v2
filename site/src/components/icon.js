/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Icon({ size, viewBox, contents, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: contents }}
      sx={{
        display: "inline-block",
        verticalAlign: "text-bottom",
      }}
      {...props}
    />
  )
}
