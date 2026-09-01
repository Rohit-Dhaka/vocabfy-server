import express from 'express'
import cors from 'cors'
import route from './routes/index.route.js'


const app = express()


app.use(express.json())
app.use(cors())
app.use('/api', route)

export default app;

