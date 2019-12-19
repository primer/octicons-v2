import { NowRequest, NowResponse } from "@now/node"
import chrome from "chrome-aws-lambda"
import puppeteer, { LaunchOptions } from "puppeteer-core"

export default async (req: NowRequest, res: NowResponse) => {
  if (typeof req.query.svg !== "string") {
    res.statusCode = 400
    res.json({ message: "Missing `svg` query parameter" })
    return
  }

  try {
    const html = getHtml(req.query.svg)
    const file = await getScreenshot(html)

    res.statusCode = 200
    res.setHeader("Content-Type", "image/png")
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    res.end(file)
  } catch (error) {
    res.statusCode = 500
    res.json(JSON.stringify(error))
  }
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
  const launchOptions = await getLaunchOptions()
  const browser = await puppeteer.launch(launchOptions)
  const page = await browser.newPage()
  await page.setContent(html)
  const file = await page.screenshot()
  await browser.close()
  return file
}

// Copied from https://github.com/zeit/og-image/blob/master/api/_lib/options.ts
const isDev = process.env.NOW_REGION === "dev1"
const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

async function getLaunchOptions(): Promise<LaunchOptions> {
  // Facebook recommends 1200x630 for Open Graph images
  // Reference: https://developers.facebook.com/docs/sharing/webmasters/images/
  const width = 1200
  const height = 630

  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
      defaultViewport: { width, height },
    }
  }

  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
    defaultViewport: { width, height },
  }
}
