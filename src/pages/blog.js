import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

import blogStyles from "./blog.module.scss"

export default () => (
  <Layout>
    <Head title="Blog" />
    <h1>blog page</h1>
    <ol className={blogStyles.posts}>{allMarkdownPosts().map(PostTitle)}</ol>
  </Layout>
)

const PostTitle = ({ node }) => (
  <li key={node.id} className={blogStyles.post}>
    <Link to={`/blog/${node.slug}`}>
      <h2>{node.title}</h2>
      <p>{node.publishedDate}</p>
    </Link>
  </li>
)

const allMarkdownPosts = () =>
  useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `).allContentfulBlogPost.edges
