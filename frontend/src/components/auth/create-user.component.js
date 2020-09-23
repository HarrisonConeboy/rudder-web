import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/authActions'
import classnames from 'classnames'

class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    
    // On change methods
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

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

    onChangePassword2 = (e) => {
        this.setState({
            password2: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        console.log(newUser)

        this.props.registerUser(newUser, this.props.history)

    }

    

    render() {
        const { errors } = this.state

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input type='text' className={classnames('form-control', {invalid: errors.name})} value={this.state.name} onChange={this.onChangeName}></input>
                            <span className='text-danger'>{errors.name}</span>
                    </div>

                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='text' className={classnames('form-control', {invalid: errors.email})} value={this.state.email} onChange={this.onChangeEmail}></input>
                        <span className='text-danger'>{errors.email}</span>
                    </div>

                    <div className='form-group'>
                        <label>Password:</label>
                        <input type='password' className={classnames('form-control', {invalid: errors.password})}value={this.state.password} onChange={this.onChangePassword}></input>
                        <span className='text-danger'>{errors.password}</span>
                    </div>

                    <div className='form-group'>
                        <label>Confirm Password:</label>
                        <input type='password' className={classnames('form-control', {invalid: errors.password2})} value={this.state.password2} onChange={this.onChangePassword2}></input>
                        <span className='text-danger'>{errors.password2}</span>
                    </div>

                    <div className='form-group'>
                        <input type='submit' className='btn btn-primary' value='Create New User'></input>
                    </div>
                </form>
            </div>
        )
    }

}

CreateUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { registerUser }) (withRouter(CreateUser))
