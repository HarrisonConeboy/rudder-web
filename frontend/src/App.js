import React, { Component } from 'react'
import Navbar from './components/navbar.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateUser from './components/create-user.component'
import CreateItem from './components/create-item.component'
import FrontPage from './components/front-page.component'

const App = () => {
  return (
    <Router>
      <div className='container-fluid'>
        <Navbar />
        <div className='container'>
          <div className='row'>
              <Route path='/' exact component={FrontPage} />
              <Route path='/user/create' exact component={CreateUser} />
              <Route path='/item/create' exact component={CreateItem} />
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
