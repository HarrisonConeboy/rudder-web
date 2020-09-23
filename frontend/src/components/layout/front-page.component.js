import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import LoginOptions from './login-options.component'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../../redux/actions/authActions'


class FrontPage extends Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({
                auth: nextProps.auth
            })
        }
    }

    onLogout = (e) => {
        e.preventDefault()
        this.props.logoutUser()
        window.location = '/'
    }

    render() {

        if (this.state) {
            console.log(this.state)
            return (
                <div className='container'>
                    <div className='row' style={{marginTop: '17.5%', justifyContent: "center"}}>
                        <h2 className='display-3'>Welcome back to Rudder</h2>
                    </div>

                    <div className='row display-3' style={{justifyContent: 'center'}}>{this.state.auth.user.name.split(' ')[0]}</div>

                    <div className='row' style={{marginTop: '5%', justifyContent: "center"}}>
                        <button onClick={this.onLogout} className='btn btn-primary'>Logout</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='row' style={{marginTop: '25%', justifyContent: "center"}}>
                        <h2 className='display-3'>Welcome to Rudder</h2>
                    </div>
                    <Route path='/' exact component={LoginOptions}/>
                </div>
            )
        }


    }
}


FrontPage.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { logoutUser }) (FrontPage)
