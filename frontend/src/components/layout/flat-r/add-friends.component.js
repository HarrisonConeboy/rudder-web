import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFlat } from '../../../redux/actions/flatActions'

import GuestPage from './guest-front-page.component'
import UserPage from './user-front-page.component'


class FrontPage extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({
                user: nextProps.auth.user
            })
        }
    }

    render() {
        if (this.state) {
            return (<UserPage name={this.state.user.name} />)
        } else {
            return (<GuestPage />)
        }
    }
}


FrontPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { logoutUser }) (FrontPage)
