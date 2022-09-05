
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto link-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/Home" style={{color:'black'}}>  Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/Interaction" style={{color:'black'}}>Interaction</NavLink>
            </li>
            

          </ul>

        </div>
      </nav>
    </>
  )
}

export default Navbar