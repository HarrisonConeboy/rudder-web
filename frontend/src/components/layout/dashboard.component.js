import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../redux/actions/authActions"

class Dashboard extends Component {
  
    onLogoutClick = e => {
      e.preventDefault()
      this.props.logoutUser()
    }

    render() {
        const { user } = this.props.auth

        return (
            <div>
                <h2 className='display-3'>Dashboard</h2>
                <button className='btn btn-primary' onClick={this.onLogoutClick}>Logout</button>
            </div>
        )
    }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser }) (Dashboard)