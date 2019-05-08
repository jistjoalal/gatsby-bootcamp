import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

import blogStyles from "./blog.module.scss"

export default () => (
  <Layout>
    <h1>blog page</h1>
    <ol className={blogStyles.posts}>{allMarkdownPosts().map(PostTitle)}</ol>
  </Layout>
)

const PostTitle = ({ node }) => (
  <li key={node.id} className={blogStyles.post}>
    <Link to={`/blog/${node.fields.slug}`}>
      <h2>{node.frontmatter.title}</h2>
      <p>{node.frontmatter.date}</p>
    </Link>
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
