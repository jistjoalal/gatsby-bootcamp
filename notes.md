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

```js
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

### render images in markdown pages

```sh
npm i gatsby-plugin-sharp gatsby-remark-images gatsby-remark-relative-images
```

`gatsby-config.js`

```js
// plugins:
"gatsby-plugin-sharp",
{
  resolve: "gatsby-transformer-remark",
  options: {
    plugins: [
      "gatsby-remark-relative-images",
      {
        resolve: "gatsby-remark-images",
        options: {
          maxWidth: 750,
          linkImagesToOriginal: false,
        },
      },
    ],
  },
},
```

In source markdown file, specify path relative to the markdown file:

```md
![Image](./image.png)
```

## use SCSS w/ gatsby

```sh
npm install --save node-sass gatsby-plugin-sass
```

## use css modules to style react components

React:

```jsx
import styles from "./component.module.scss"
export default () => <h1 className={styles.header}>Hooray</h1>
```

`component.module.scss` (same dir as component)

```scss
.header {
  color: black;
}
```

## markdown syntax highlighting using [prismjs](https://prismjs.com/)

```sh
npm install --save gatsby-remark-prismjs prismjs
```

```js
// gatsby-config.js
// - plugins:
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-prismjs`,
    ]
  }
}

// gatsby-browser.js
require("prismjs/themes/prism-okaidia.css")
// more themes @ https://github.com/PrismJS/prism/tree/master/themes
```
