import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

export default () => (
  <Layout>
    <Head title="Home" />
    <h1>hello.</h1>
    <h2>this is a blog written by a person</h2>
    <p>
      Need a developer? <Link to="/contact">Contact me</Link>
    </p>
  </Layout>
)
