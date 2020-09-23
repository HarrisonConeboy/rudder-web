import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../../redux/actions/authActions'
import classnames from 'classnames'


class LoginUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            window.location = '/'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            window.location = '/'
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

    }

    // On Change Methods
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(loginUser)

        this.props.loginUser(loginUser)

    }


    render() {
        const { errors } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='text' className={classnames('form-control', {invalid: errors.email || errors.emailnotfound})} onChange={this.onChangeEmail} value={this.state.email}></input>
                        <span className='text-danger'>{errors.email}{errors.emailnotfound}</span>
                    </div>

                    <div className='form-group'>
                        <label>Password:</label>
                        <input type='password' className={classnames('form-control', {invalid: errors.password || errors.passwordincorrect})} value={this.state.password} onChange={this.onChangePassword}></input>
                        <span className='text-danger'>{errors.password}{errors.passwordincorrect}</span>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Login User' className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        )
    }



}

LoginUser.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { loginUser }) (LoginUser)
