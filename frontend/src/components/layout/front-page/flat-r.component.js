import React from 'react'
import { Link } from 'react-router-dom'

const FlatR = () => {
    return (
        <div className='col-md-4'>
            <Link to='/flat' className='link display-4' style={{fontSize:'34px'}}><i>{'<'}Flat.r{'/>'}</i></Link>
        </div>
    )
}

export default FlatR
