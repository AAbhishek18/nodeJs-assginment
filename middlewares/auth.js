const JWT =require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const secret=process.env.JWT_SECRET

const authentication= async(req,res,next)=>{
    try{
        const authHeader=req.headers['authorization']
        if(!authHeader){
            return res.status(401).json({status:false,message:"Not Authorized!"})
        }
        //console.log(authHeader.split(" ")[0])
        let token=""
        if(authHeader){
            token=authHeader.split(" ")[1]
        }
        if(!token){
            return res.status(401).json({status:false,message:"Token Not Found"})
        }
        //console.log(token)
        const decoded_token=JWT.decode(token)
       
        if(decoded_token.exp<Date.now()/1000){
            return res.status(401).json({status:false,message:"Login First!"})
        }
        //verfy the token
        JWT.verify(token,secret)

        if(!decoded_token){
            return res.status(401).json({status:false,message:"SignUp First"})
        }
        if(decoded_token.length==0){
            return res.status(401).json({status:false,message:" User not Unauthorized"})
        }
        req.user=decoded_token
        next()

    }
    catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}
module.exports={authentication}