/** @jsx jsx */
import Helmet from "react-helmet"
import { jsx } from "theme-ui"
import useSiteMetdata from "../use-site-metadata"

export default function Head(props) {
  const siteMetadata = useSiteMetdata()
  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : siteMetadata.title
  const description = props.description || siteMetadata.description
  const imageUrl = props.imageUrl || siteMetadata.imageUrl

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
