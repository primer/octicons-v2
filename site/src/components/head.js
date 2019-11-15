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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
