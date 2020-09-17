import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
            <Link to='/' className='navbar-brand'>RudDer</Link>
            <div className='collapse navbar-collapse'>
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
