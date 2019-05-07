import React from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"

const NavLink = ({ children, to }) => (
  <Link
    className={headerStyles.navItem}
    activeClassName={headerStyles.activeNavItem}
    to={to}
  >
    {children}
  </Link>
)

export default () => (
  <header className={headerStyles.header}>
    <h1>
      <Link className={headerStyles.title} to="/">
        Gatsby Blog
      </Link>
    </h1>
    <nav>
      <ul className={headerStyles.navList}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
      </ul>
    </nav>
  </header>
)
