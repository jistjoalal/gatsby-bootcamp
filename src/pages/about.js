import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

export default () => (
  <Layout>
    <Head title="About" />
    <h1>about page</h1>
    <p>about us!</p>
    <Link to="/contact">Contact us</Link>
  </Layout>
)
