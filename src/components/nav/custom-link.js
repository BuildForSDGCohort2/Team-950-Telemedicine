import React from 'react'
import {NavLink} from 'react-router-dom'


export default function CustomLink(props) {
    return <li className="nav-item">
              <NavLink className="nav-link" to="/about">about</NavLink>
           </li>
}

