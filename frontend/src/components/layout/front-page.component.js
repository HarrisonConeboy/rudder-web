import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import LoginOptions from './login-options.component'


export default class FrontPage extends Component {

    render() {
        return (
            <div className='container'>
                <div className='row' style={{marginTop: '25%', justifyContent: "center"}}>
                    <h2 className='display-3'>Welcome to RudDer</h2>
                </div>
                <Route path='/' exact component={LoginOptions}/>
            </div>
        )
    }

}
