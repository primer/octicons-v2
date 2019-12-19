# Octicons Open Graph Image Generator

A service that generates dynamic Open Graph images for https://octicons-v2.now.sh

Inspired by https://github.com/zeit/og-image

## Problem

We often share https://octicons-v2.now.sh links on Slack to get feedback on icons. However, we have to leave Slack to view the icons. This makes it hard to get quick feedback.

## Solution

Show preview images for https://octicons-v2.now.sh links in Slack:

| Before                                                                                                                      | After                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img width="376" src="https://user-images.githubusercontent.com/4608155/71159343-4f0cc900-21fa-11ea-9c0f-f2e93d9dd5ab.png"> | <img width="376" src="https://user-images.githubusercontent.com/4608155/71156666-4bc30e80-21f5-11ea-8949-11f97b633c8f.png" /> |

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
  <meta
    property="og:image"
    content="https://octicons-v2.now.sh/api/og-image?svg=%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%20width=%2216%22%20height=%2216%22%3E%20%20%3Cpath%20fill-rule=%22evenodd%22%20clip-rule=%22evenodd%22%20d=%22M1.5%208C1.49999%206.77839%201.84424%205.5815%202.49327%204.54656C3.14231%203.51162%204.06985%202.68053%205.16957%202.14858C6.26928%201.61662%207.49664%201.40534%208.71092%201.53895C9.92521%201.67256%2011.0773%202.14566%2012.035%202.904L2.904%2012.035C1.99276%2010.8877%201.49778%209.46515%201.5%208ZM3.965%2013.096C5.21468%2014.0856%206.78443%2014.5815%208.37581%2014.4893C9.96719%2014.3972%2011.4692%2013.7236%2012.5964%2012.5964C13.7236%2011.4692%2014.3972%209.96719%2014.4893%208.37581C14.5815%206.78443%2014.0856%205.21468%2013.096%203.965L3.965%2013.096ZM8%200C5.87827%200%203.84344%200.842855%202.34315%202.34315C0.842855%203.84344%200%205.87827%200%208C0%2010.1217%200.842855%2012.1566%202.34315%2013.6569C3.84344%2015.1571%205.87827%2016%208%2016C10.1217%2016%2012.1566%2015.1571%2013.6569%2013.6569C15.1571%2012.1566%2016%2010.1217%2016%208C16%205.87827%2015.1571%203.84344%2013.6569%202.34315C12.1566%200.842855%2010.1217%200%208%200V0Z%22%3E%3C/path%3E%3C/svg%3E"
  />
</head>
```

## Local development

Follow these steps to get the service running on your local machine:

```shell
# Clone the repository
git clone https://github.com/primer/octicons-v2.git
cd octicons-v2

# Install the dependencies
yarn

# Start the development server
now dev
# If nothing happens, run `npm install -g now`

# Navigate to http://localhost:3000/api/og-image?svg=<svg-code> in your browser
```

> Note: These steps require Yarn to be set up locally. See [yarnpkg.com](https://yarnpkg.com/) for more information.
