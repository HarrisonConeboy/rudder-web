const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.port || 5000

app.use(cors)
app.use(express.json())

require('dotenv').config()

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => {console.log(err)})

const connection = mongoose.connection

connection.on('open', () => {
    console.log('Successfully connected to MongoDB cluster')
})

app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    }
)