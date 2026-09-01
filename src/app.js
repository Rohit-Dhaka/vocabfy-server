import express from 'express'
import cors from 'cors'
import route from './routes/index.route.js'
import cookieParser from 'cookie-parser'


const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', route)

export default app;

