# gatsby bootcamp notes

## create new project

```sh
gatsby new gatsby-bootcamp https://github.com/gatsbyjs/gatsby-starter-hello-world
```

## use GraphQL playground instead of GraphiQL

Create `.env.development` in root of project

```
GATSBY_GRAPHQL_IDE=playground
```

Install env-cmd package

```
npm i --save-dev env-cmd
```

Edit package.json

```json
"develop": "env-cmd .env.development gatsby develop",
```

## markdown file to html pages

### serve markdown files over graphql

```sh
npm i --save-dev gatsby-source-filesystem gatsby-transformer-remark
```

edit `gatsby-config.json`:

```json
plugins: [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "src",
      path: `${__dirname}/src/`,
    },
  },
  "gatsby-transformer-remark",
],
```

Markdown files in `src` dir can now be queried w/ GraphQL:

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          date
        }
        html
        excerpt
        fields { //
          slug   // comes from gatsby-node.js
        }        //
      }
    }
  }
}
```

### create post template file `src/templates/blog.js`

```jsx
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

export default ({ data }) => (
  <Layout>
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <p>{data.markdownRemark.frontmatter.date}</p>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Layout>
)
```

### generate page for each post

Create new file `gatsby-node.js` in root of project

```js
const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("src/templates/blog.js")
  const res = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.fields.slug}`,
      context: {
        slug: edge.fields.slug,
      },
    })
  })
}
```
