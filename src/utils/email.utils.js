import nodemailer from 'nodemailer'
import env from '../config/env.js'

const transport = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    port:465,
    auth:{
        user:env.EMAIL_USER,
        pass:env.EMAIL_PASS
    }
})

const sendEmail = async({email,subject,text,html})=>{
    try{
        const info = await transport.sendMail({
            from:`Your email:${env.EMAIL_USER}`,
            to: email,
            subject,
            text,
            html
        })        
        return info;
    }
    catch(error){
        console.log(error)
    }
}
export default sendEmail;
