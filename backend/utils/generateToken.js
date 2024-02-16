import jwt from "jsonwebtoken"
const generateTokenAndSetCookie =(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d',
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"Strict",
        secure:process.env.NODE_ENV !="development",
        maxAge:15 * 24 *60* 60* 100
    })

}

export default generateTokenAndSetCookie