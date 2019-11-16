let isEnabled = true

chrome.tabs.onUpdated.addListener(tabId => {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, { isEnabled })
  }
})

chrome.browserAction.onClicked.addListener(tab => {
  isEnabled = !isEnabled

  if (isEnabled) {
    chrome.browserAction.setIcon({ path: "../images/icon32.png" })
    chrome.tabs.sendMessage(tab.id, { isEnabled })
  } else {
    chrome.browserAction.setIcon({ path: "../images/off.png" })
    chrome.tabs.sendMessage(tab.id, { isEnabled })
  }
})
