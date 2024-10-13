
import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"



export const verifyToken = async (req,res,next) => {

    const {token} = req.headers

    if(!token)
    {
        return next(errorHandler(403, "There is no token"))
    }

    jwt.verify(token ,process.env.JWT_SECRETE,(err,user) => {

        if(err)
        {
            return next(errorHandler(401 ,'unauthorized'))
        }

        req.user = user 

        next()
    })
}
