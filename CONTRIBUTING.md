# Contributing

## Local development

Follow these steps to get the website and Chrome extension running on your local machine:

```shell
# Clone the repository
git clone https://github.com/primer/octicons-v2.git
cd octicons-v2

# Install the dependencies
yarn

# Start the development server
yarn start

# Navigate to http://localhost:8000 in your browser
```

> Note: These steps require Yarn to be set up locally. See [yarnpkg.com](https://yarnpkg.com/) for more information.

## Loading the Chrome extension

Once you've started the local development server, follow these steps to load the extension into Chrome:

1. Open Chrome and navigate to `chrome://extensions`.
1. Enable `Developer mode` using the toggle in the top right.
1. Click "Load unpacked".
1. Find and select the `extension` directory from this project.

> Note: You'll only need to load the extension once.

## Adding an icon

1. Start the development server:

   ```shell
   yarn start
   ```

1. Place an SVG file in the `icons/` directory.
1. Optimize the SVG:

   ```shell
   yarn svgo
   ```

   > Tip: Open a new terminal session before running `yarn svgo` to avoid stopping the developement server.

1. View your icon at http://localhost:8000.
1. Reload the `Octicons v2` extension in Chrome to see the icon on [github.com](https://github.com). You can reload the extension from `chrome://extensions` but we recommend using the [Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) extension because it allows you to reload unpacked extensions from the toolbar.
