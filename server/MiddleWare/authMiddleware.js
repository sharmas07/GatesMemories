import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.JWT_SECRET

const authMiddleware = async (req, res, next) => {
    try {
        const auth_token = req.headers.authorization.split(" ")[1];
        console.log(auth_token)
        if (auth_token) {
            const decoded = jwt.verify(auth_token, secret)
            console.log(decoded)
            req.body._id = decoded?.id
        }
        next()
        

    } catch (error) {
        console.log(error)
    }
}

export default authMiddleware