import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='navbar navbar-light bg-light navbar-expand-lg sticky-top'>
            <Link to='/' className='navbar-brand'>Rudder</Link>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link to='/manage-friends' className='nav-link'>Manage Friends</Link>
                </li>

                <li className='nav-item'>
                    <Link to='/create-flat' className='nav-link'>Create Flat</Link>
                </li>

                <li className='nav-item'>
                    <Link to='/flat-r' className='nav-link'>Flat Page</Link>
                </li>
            </ul>
        </nav>
    )

}

export default Navbar
