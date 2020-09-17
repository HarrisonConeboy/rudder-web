import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            age: 0
        }
    }

    

    render() {
        return (
            <div>
                <p>Create User component</p>
            </div>
        )
    }

}
