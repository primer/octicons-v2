let isEnabled = true

chrome.tabs.onUpdated.addListener(() => {
  if (isEnabled) {
    chrome.tabs.executeScript({ file: "build/content.js" })
  }
})

chrome.browserAction.onClicked.addListener(() => {
  isEnabled = !isEnabled

  if (isEnabled) {
    chrome.browserAction.setIcon({ path: "../images/icon32.png" })
    chrome.tabs.executeScript({ file: "build/content.js" })
  } else {
    chrome.browserAction.setIcon({ path: "../images/off.png" })
    chrome.tabs.reload()
  }
})
