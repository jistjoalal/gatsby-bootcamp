import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

import '../styles/index.scss'

export default ({ children }) =>
  <div>
    <Header />
      {children}
    <Footer />
  </div>
