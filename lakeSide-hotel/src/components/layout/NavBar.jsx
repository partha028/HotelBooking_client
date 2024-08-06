import React, { useState } from 'react';
import { Link, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false);
    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

  return (
 
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className='container-fluid'>
        <Link className='navbar-brand' to="/">
          <span className='hotel-color'>LakeSide Hotel</span>
        </Link> 
        <button 
          className='navbar-toggler' 
          type='button' 
          data-bs-toggle='collapse' 
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/browse-all-rooms'>
                Browse all rooms
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/admin'>
                Admin
              </NavLink>
            </li> 
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/find-booking'>
                Find my Booking
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
                <NavDropdown className={`${showAccount ? "show" : ""}`} 
                             title="Account" 
                             id="basic-nav-dropdown"
                             onClick={handleAccountClick}>
                    <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/logout'>Logout</NavDropdown.Item>
                </NavDropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    
  );
}

export default NavBar;
