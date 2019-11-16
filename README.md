# Octicons Viewer

Octicons Viewer is a website and Chrome extension for reviewing new Octicons as part of the [Octicons refresh](https://github.com/github/design-systems/issues/711).

- Website: https://octicons-viewer.now.sh
- Chrome extension: _Coming soon_

## Contributing

### Local development

Follow these steps to get the website and Chrome extension running on your local machine:

```shell
# Clone the repository
git clone https://github.com/primer/octicons-viewer.git
cd octicons-viewer

# Install the dependencies
yarn

# Start the development server
yarn start

# Navigate to http://localhost:8000 in your browser
```

_Note: These steps require Yarn to be set up locally. See [yarnpkg.com](https://yarnpkg.com/) for more information._

### Loading the Chrome extension

Once you've started the local development server, follow these steps to load the extension into Chrome:

1. Open Chrome and navigate to `chrome://extensions`.
1. Enable `Developer mode` using the toggle in the top right.
1. Click "Load unpacked".
1. Find and select the `extension` directory from this project.

_Note: You'll only need to load the extension once._

### Adding an icon

1. Place an SVG file in the `icons/` directory.
1. Optimize the SVG:

   ```shell
   yarn svgo
   ```

   _Tip: Open a new terminal session before running `yarn svgo` to avoid stopping the developement server._

1. View your icon at http://localhost:8000.
1. Reload the `Octicons Viewer` extension in Chrome to see the icon on github.com. You can reload the extension from `chrome://extensions` but we recommend using the [Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) extension because it allows you to reload extensions from the toolbar.
