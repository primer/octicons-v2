import { NowRequest, NowResponse } from "@now/node"
import chrome from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"

// TODO: set up dev environment

export default async (req: NowRequest, res: NowResponse) => {
  if (typeof req.query.svg !== "string") {
    // TODO: return error
    return
  }

  const html = getHtml(req.query.svg)
  const file = await getScreenshot(html) // TODO: handle error

  res.statusCode = 200
  res.setHeader("Content-Type", "image/png")
  res.end(file)
}

function getHtml(svg: string) {
  return `<!DOCTYPE html>
<html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(20);
    }
  </style>
  <body>
    ${svg}
  </body>
</html>`
}

async function getScreenshot(html: string) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
    defaultViewport: { width: 1200, height: 630 },
  })
  const page = await browser.newPage()
  await page.setContent(html)
  const file = await page.screenshot()
  await browser.close()
  return file
}
