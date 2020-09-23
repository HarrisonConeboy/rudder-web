import React, { Component } from 'react'
import axios from 'axios'

export default class CreateItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            type: '',
            price: 0,
            user: '',
            types: [],
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/types')
            .then(res => {
                this.setState({
                    types: res.data.map(type => type.type)
                })
            })
        
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeType = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    onChangePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    onChangeUser = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newItem = {
            name: this.state.name,
            type: this.state.type,
            price: this.state.price,
            user: this.state.user
        }

        axios.post('http://localhost:5000/items/add', newItem)
            .then(res => console.log('Item added'))
            .catch(err => console.log(err))

        window.location = '/'
    }

    render() {
        return(
            <div>
                <h3>List a new item</h3>
                <form onSubmit={this.onSubmit}>

                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' className='form-control' value={this.state.name} onChange={this.onChangeName}/>
                    </div>

                    <div className='form-group'>
                        <label>Type</label>
                        <select ref="typeSelect"
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}>
                            {
                            this.state.types.map(function(type) {
                                return <option 
                                key={type}
                                value={type}>{type}
                                </option>;
                            })
                            }
                        </select>
                    </div>
                    
                    <div className='form-group'>
                        <label>Price</label>
                        <input type='text' onChange={this.onChangePrice} className='form-control' value={this.state.price}/>
                    </div>

                    <div className='form-group'>
                        <label>User</label>
                        <select ref='userSelect'
                            className='form-control'
                            value={this.state.user}
                            onChange={this.onChangeUser}>
                                {
                                    this.state.users.map(user => {
                                        return <option key={user} value={user}>{user}</option>
                                    })
                                }
                        </select>
                    </div>

                    <div className='form-group'>
                        <input className='btn btn-primary' type='submit' value='Add Item'/>
                    </div>
                </form>
            </div>
        )
    }

}
