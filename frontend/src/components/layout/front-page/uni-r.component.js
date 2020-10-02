import React from 'react'
import { Link } from 'react-router-dom'

const UniR = () => {
    return (
        <div className='col-md-4' style={{textAlignLast: 'center'}}>
            <Link to='/uni' className='link display-4' style={{fontSize: '34px'}}><i>{'<'}Uni.r{'/>'}</i></Link>
        </div>
    )
}

export default UniR
