/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Icon({ width, height, viewBox, contents, ...props }) {
  return (
    <svg
      width={width}
      height={height}
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
