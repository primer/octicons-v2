module.exports = {
  siteMetadata: {
    title: "Octicons Viewer",
    description: "Your project. GitHub’s icons.",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
  ],
}
