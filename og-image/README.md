# Octicons Open Graph Image Generator

A service that generates dynamic Open Graph images for https://octicons-v2.now.sh

Inspired by https://github.com/zeit/og-image

## Problem

We often share https://octicons-v2.now.sh links on Slack to get feedback on icons. However, we have to leave Slack to view the icons. This makes it hard to get quick feedback.

## Solution

Show preview images for https://octicons-v2.now.sh links in Slack:

| Before | After |
| --- | --- |
| <img width="376" src="https://user-images.githubusercontent.com/4608155/71159343-4f0cc900-21fa-11ea-9c0f-f2e93d9dd5ab.png">  | <img width="376" src="https://user-images.githubusercontent.com/4608155/71156666-4bc30e80-21f5-11ea-8949-11f97b633c8f.png" /> |

## Usage

The [Open Graph protocol](https://ogp.me/) says you can put a `<meta>` tag in the `<head>` of a webpage to define a preview image for the page, like so:

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="http://example.com/logo.jpg" />
</head>
```

The Octicons Open Graph Image Generator service allows you to use `https://octicons-v2.now.sh/api/og-image?svg=<svg-code>` in the `content` attribute of a `<meta>` tag to generate a preview image dynamically, like so:

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://octicons-v2.now.sh/api/og-image?svg=%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%20width=%2216%22%20height=%2216%22%3E%3Cpath%20d=%22M8%2013C10.7614%2013%2013%2010.7614%2013%208C13%205.23858%2010.7614%203%208%203C5.23858%203%203%205.23858%203%208C3%2010.7614%205.23858%2013%208%2013Z%22%3E%3C/path%3E%3C/svg%3E`%20|%20%3Cimg%20src=%22https://octicons-v2.now.sh/api/og-image?svg=%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%20width=%2216%22%20height=%2216%22%3E%20%3Cpath%20d=%22M8%2013C10.7614%2013%2013%2010.7614%2013%208C13%205.23858%2010.7614%203%208%203C5.23858%203%203%205.23858%203%208C3%2010.7614%205.23858%2013%208%2013Z%22%3E%3C/path%3E%3C/svg%3E" />
</head>
```
