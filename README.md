# Octicons Viewer

test and share icons

https://octicons-viewer.now.sh

## Contributing

### Local development

Follow these steps to get the site running on your local machine:

```shell
# Clone the repository
git clone https://github.com/primer/octicons-viewer.git
cd octicons-viewer

# Install the dependencies
npm install

# Start the development server
npm run develop

# Navigate to http://localhost:8000 in your browser
```

_Note: These steps require Node.js and npm to be set up locally. See [nodejs.org](https://nodejs.org/) for more information._

### Adding an icon

1. Place an SVG file in the `icons/` directory.
1. Stop the development server if it's running by hitting <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal.
1. Optimize the SVG:

   ```shell
   npm run svgo
   ```

1. Start the development server again:

   ```shell
   npm run develop
   ```

1. View your icon at http://localhost:8000.
