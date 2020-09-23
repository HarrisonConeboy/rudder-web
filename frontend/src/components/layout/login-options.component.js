import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoginOptions extends Component {

    render() {
        return (
            <div className='row mt-5 pt-2'>
                <div className='col-md-6 centered display-4'>
                    <Link to='/login' className='link'>
                        <i className='code' style={{fontSize: '34px'}}>{'<'}Login{'/>'}</i>
                    </Link>
                </div>

                <div className='col-md-6 centered display-4'>
                    <Link to='/register' className='link'>
                        <i className='code' style={{fontSize: '34px'}}>{'<'}Register{'/>'}</i>
                    </Link>
                </div>
            </div>
        )
    }

}