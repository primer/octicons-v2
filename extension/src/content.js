import { observe } from "selector-observer"
import icons from "./icons"
import oldOcticons from "@primer/octicons"

// This enable/disable code seems very flakey and imperative.
// TODO: Refactor enabled/disable code.

let isEnabled = true

observe(".octicon:not(.replaced)", {
  add(element) {
    if (isEnabled) {
      replaceOcticon(element)
    }
  },
})

chrome.runtime.onMessage.addListener(message => {
  if (message.isEnabled) {
    isEnabled = true
    document.querySelectorAll(".octicon:not(.replaced)").forEach(replaceOcticon)
  } else {
    isEnabled = false
    document.querySelectorAll(".octicon.replaced").forEach(restoreOcticon)
  }
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

function restoreOcticon(octicon) {
  const iconName = getIconName(octicon)
  const icon = oldOcticons[iconName]
  const height = parseInt(octicon.getAttribute("height"), 10)
  const width = (parseInt(icon.width, 10) / parseInt(icon.height, 10)) * height

  octicon.setAttribute("viewBox", icon.options.viewBox)
  octicon.setAttribute("width", width)
  octicon.classList.remove("replaced")
  octicon.innerHTML = icon.path
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
