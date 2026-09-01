import env from '../config/env.js'
import userModel from '../models/User.model.js'
import jwt from 'jsonwebtoken'

async function authMiddleware (req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).json({message:"token not find"})
        }
        const decode = jwt.verify(token , env.SECRET_KEY)        
        const user = await userModel.findById(decode.id)
        req.user = user
        next();        
    }
    catch(error){
        console.log("error",error)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default authMiddleware