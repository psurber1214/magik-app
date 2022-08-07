import React from 'react'
import PropTypes from 'prop-types'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
//import logo from '../assets/tamu-logo.png'

function Navbar({ title }) {
  return <nav className=' p-10 bg-slate-500 text-primary-content '>Navbar</nav>
}

Navbar.defaultProps = {
  title: 'Magik App',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
