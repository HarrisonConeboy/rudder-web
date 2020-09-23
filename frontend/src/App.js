import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './redux/utils/setAuthToken'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'

import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/navigation/navbar.component'
import CreateUser from './components/auth/create-user.component'
import LoginUser from './components/auth/login-user.component'
import FrontPage from './components/layout/front-page.component'
import PrivateRoute from './components/private-routes/PrivateRoute'
import Dashboard from './components/layout/dashboard.component'


export default class App extends Component {

  constructor(props) {
    super(props)

  }

  // Check local storage for jwt passport
  checkAuth = () => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken
      setAuthToken(token)
      const decoded = jwt_decode(token)
      store.dispatch(setCurrentUser(decoded))
    
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
    
        window.location = '/login'
      }
    }
  }

  componentDidMount() {
    // Check if the user has logged in before
    this.checkAuth()
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='container-fluid'>
            <Navbar />
            <div className='container'>
              <div className='row'>
                  <Route path='/' exact component={FrontPage} />
                  <Route path='/register' exact component={CreateUser} />
                  <Route path='/login' exact component={LoginUser} />
                  <Switch>
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
