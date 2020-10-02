import React, { Component } from 'react'

import FlatR from './flat-r.component'
import UniR from './uni-r.component'

const RudderOptions = () => {
    return (
        <div className='row' style={{marginTop: '10%'}}>
            <FlatR/>
            <div className='col-md-4'></div>
            <UniR/>
        </div>
    )
}

export default RudderOptions
