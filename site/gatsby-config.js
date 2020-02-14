module.exports = {
  siteMetadata: {
    title: "Octicons v2",
    description: "[WIP] A new look for Octicons, GitHub's icon set",
    imageUrl:
      "https://user-images.githubusercontent.com/10384315/53922681-2f6d3100-402a-11e9-9719-5d1811c8110a.png",
  },
  pathPrefix: "/octicons-v2",
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
