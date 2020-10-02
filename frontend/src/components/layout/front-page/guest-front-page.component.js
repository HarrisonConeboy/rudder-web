import React, { Component } from 'react'
import LoginOptions from './login-options.component'
import { Link } from 'react-router-dom'

const GuestPage = () => {
    return (
        <div className='container-fluid' style={{marginTop: '25%'}}>
            <div className='row' style={{justifyContent: 'center'}}>
                <h2 className='display-3'>Welcome to Rudder</h2>
            </div>
            <div className='row' style={{justifyContent: 'center'}}>
                <LoginOptions/>
            </div>
        </div>
        
    )
}

export default GuestPage
