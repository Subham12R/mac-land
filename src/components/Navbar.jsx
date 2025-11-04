import React from 'react'
import logo from '/logo.svg'
import search from '/search.svg'
import cart from '/cart.svg'
import { navLinks } from '../constants'

const Navbar = () => {
  return (
    <header>
        <nav>
            <img src={logo} alt="logo" />
            
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <a href={link.href}>{link.label}</a>
                    </li>
                ))}
            </ul>

            <div className="flex-center gap-2">
                <button><img src={search} alt="search" /></button>
                <button><img src={cart} alt="cart" /></button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar