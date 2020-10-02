import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../../redux/actions/authActions'
import RudderOptions from './rudder-options.component'


class UserPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.name
        }
    }

    onLogout = (e) => {
        e.preventDefault()
        this.props.logoutUser()
        window.location = '/'
    }

    render() {
        return(
            <div className='container'>
                <div className='row' style={{marginTop: '17.5%', justifyContent: "center"}}>
                    <h2 className='display-3'>Welcome back to Rudder</h2>
                </div>

                <div className='row display-3' style={{justifyContent: 'center'}}>{this.state.name}</div>

                <div className='row' style={{marginTop: '5%', justifyContent: "center"}}>
                    <button onClick={this.onLogout} className='btn btn-primary'>Logout</button>
                </div>

                <RudderOptions/>
            </div>
        )
    }

}

UserPage.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

export default connect(null, { logoutUser }) (UserPage)
