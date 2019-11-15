import { observe } from "selector-observer"
import icons from "./icons"

console.log("Hello, Octicons Viewer!")

observe(".octicon:not(.replaced)", {
  add(element) {
    replaceOcticon(element)
  },
})

function replaceOcticon(octicon) {
  const iconName = getIconName(octicon)

  if (!(iconName in icons)) {
    console.warn(`Missing "${iconName}"`)
    return
  }

  const icon = icons[iconName]
  const height = octicon.getAttribute("height")
  const viewBoxSize = closestSize(Object.keys(icon), height)

  octicon.setAttribute("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`)
  octicon.setAttribute("width", height)
  octicon.classList.add("replaced")
  octicon.innerHTML = icon[viewBoxSize]
}

function getIconName(octicon) {
  return Array.from(octicon.classList).reduce((acc, className) => {
    if (className.match(/^octicon-/)) {
      // "octicon-name" -> "name"
      return className
        .split("-")
        .slice(1)
        .join("-")
    }
    return acc
  }, "")
}

function closestSize(sizes, value) {
  return sizes.reduce((acc, size) => (size <= value ? size : acc), sizes[0])
}
