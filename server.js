import app from './src/app.js'
import connectDB from './src/config/db.js'
import env from './src/config/env.js'

const PORT = env.PORT || 3000

connectDB();
app.listen(PORT , ()=>{
    console.log(`app listen on port ${env.PORT}`)
})



