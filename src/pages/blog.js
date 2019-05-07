import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>blog page</h1>
    <ol>{allMarkdownPosts().map(PostTitle)}</ol>
  </Layout>
)

const PostTitle = ({ node }) => (
  <li key={node.id}>
    <Link to={`/blog/${node.fields.slug}`}>
      <h2>{node.frontmatter.title}</h2>
    </Link>
    <p>{node.frontmatter.date}</p>
  </li>
)

const allMarkdownPosts = () =>
  useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).allMarkdownRemark.edges
