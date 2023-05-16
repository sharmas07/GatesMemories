import userModel from "../mongodb/models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Registering a user
export const registerUser = async (req, res) => {
    console.log('register user got hit')
    const salt = await bcrypt.genSalt(5);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass;
    const newUser = new userModel(req.body)
    const username = req.body.username;
    try {
        const oldUser = await userModel.findOne({username: username})
        if (oldUser) {
            return res.status(400).json("user already exist");
        }
        const user = await newUser.save()

        const auth_token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_SECRET)

        res.status(200).json({user, auth_token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


// login user
export const loginUser = async (req,res)=>{
    const{username, password} = req.body;
    try {
        const user = await userModel.findOne({username:username})
       
        if(user){
            const validate = await bcrypt.compare(password, user.password) 
        
            if (!validate) {
                res.status(400).json("wrong password")
            }
            else{
                const auth_token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_SECRET)
                res.status(200).json({user, auth_token})
            }
        }
        else{
            res.status(401).json("user does not exist")
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }


}