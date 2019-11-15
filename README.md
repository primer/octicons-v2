# Octicons Viewer

https://octicons-viewer.now.sh

## Contributing

### Local development

Follow these steps to get the site running on your local machine:

```shell
# Clone the repository
git clone https://github.com/primer/octicons-viewer.git
cd octicons-viewer

# Install the dependencies
yarn

# Start the development server
yarn develop

# Navigate to http://localhost:8000 in your browser
```

_Note: These steps require Yarn to be set up locally. See [yarnpkg.com](https://yarnpkg.com/) for more information._

### Loading the extension

1. Open Chrome and go to `chrome://extensions`.
1. Enable `Developer mode` using the toggle in the top right.
1. Click "Load unpacked".
1. Find and select the `extension` directory from this project.

### Adding an icon

1. Place an SVG file in the `icons/` directory.
1. Optimize the SVG:

   ```shell
   yarn svgo
   ```

   _Open a new terminal session before running `svgo` so you don't have to stop the developement server._

1. View your icon at http://localhost:8000.
