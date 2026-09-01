import { v2 as cloudinary} from 'cloudinary'
import env from './env.js'


cloudinary.config({
    api_key:env.API_KEY,
    api_secret:env.API_SECRET,
    cloud_name:env.CLOUD_NAME
})
export default cloudinary;