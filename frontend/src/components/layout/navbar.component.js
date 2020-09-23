import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='navbar navbar-light bg-light navbar-expand-lg sticky-top'>
            <Link to='/' className='navbar-brand'>RudDer</Link>
            <div>
                <ul className='navbar-nav mr-auto'>

                    <li className='navbar-item'>
                        <Link to='/user/create' className='nav-link'>Create User</Link>
                    </li>

                    <li className='navbar-item'>
                        <Link to='/item/create' className='nav-link'>Create Item</Link>
                    </li>

                </ul>
            </div>
        </nav>
    )

}

export default Navbar
