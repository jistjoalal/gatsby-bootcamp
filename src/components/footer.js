import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <footer>
      <p>Created by {data.site.siteMetadata.author} - © 2019</p>
    </footer>
  )
}
