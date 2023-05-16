import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import connectDB from './mongodb/connectDB.js'

import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'

const app = express();
dotenv.config()

// to server images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

app.use(cors())
app.use(bodyParser.json())
app.use(express.json({limit: '50mb'}));


// Routes
app.use('/auth',AuthRoute)
app.use('/user', UserRoute)
app.use('/posts',PostRoute)
app.use('/upload', UploadRoute)

const startServer = async ()=>{

    try {
        connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }

    app.listen(process.env.PORT, ()=>{
        console.log('server started')
    })
}
startServer();