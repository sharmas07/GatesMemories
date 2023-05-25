import userModel from "../mongodb/models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import followedByUserEmail from "../views/email/followedByUser.js";
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.TWILLIO_API_KEY);

// Get all users
export const getAllUsers = async (req, res) => {

    try {
      let users = await userModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  


// get user
export const getUser = async(req,res)=>{
    const id = req.params.id;

    try {
        const user = await userModel.findById(id);
        if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)

        }
        else{
            res.status(404).json("No such user exist")
        } 
    } catch (error) {
        res.status(500).json(error)
    }
}

// update a user
export const updateUser = async(req, res)=>{
    const id = req.params.id
    const {_id, password} = req.body
    console.log(id, _id);
    if (id === _id) {
        try {
            if(password){
                const salt = await bcrypt.genSalt(5)
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await userModel.findByIdAndUpdate(id, req.body, {new: true})
            console.log('user updated')
            const auth_token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_SECRET
              );
              console.log({user, auth_token})
            res.status(200).json({user,auth_token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access denied")
    }
}

// Delete User
export const deleteUser = async (req, res)=>{
    const id = req.params.id
    const {_id , currentUserAdminStatus} = req.body

    if(_id===id || currentUserAdminStatus){
        try {
            await userModel.findByIdAndDelete(id);
            res.status(200).json("User deleted sucessfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Access denied")
    }
}

// Follow a User
export const followUser = async (req, res)=>{

    const id = req.params.id;

    const {_id} = req.body;

    if(_id === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followedUser = await userModel.findById(id)
            const followedByUser =await userModel.findById(_id)
            console.log(followUser)
            console.log(followedByUser)
            if(!followedUser.followers.includes(_id)){
                await followedUser.updateOne({$push: {followers: _id}})
                await followedByUser.updateOne({$push: {following: id}})

                // TODO : integrate twillio api
                const emailBody = followedByUserEmail(followedUser.username, followedByUser.username)

                const msg = {
                    to: `${followedUser.email}`,
                    from: 'gatesmemories@gmail.com',
                    subject: 'GatesMemories - you got a new follower',
                    html: emailBody,
                };
                
                (async () => {
                    try {
                    await sgMail.send(msg);
                    console.log('Email sent successfully');
                    } catch (error) {
                    console.error(error);
                
                    if (error.response) {
                        console.error(error.response.body);
                    }
                    }
                })();

                res.status(200).json("User followed!");
            }
            else{
                res.status(403).json("User is already followed by you")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


// UnFollow a User
export const UnfollowUser = async (req, res)=>{
    const id = req.params.id;

    const {_id} = req.body;

    if(_id === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await userModel.findById(id)
            const followingUser =await userModel.findById(_id)

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull: {followers: _id}})
                await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json("User Unfollowed!");
            }
            else{
                res.status(403).json("User is not followed by you")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// search user by username
export const searchUsersByUsername = async (req, res) => {
    const searchString = `^${req.body.searchString}`;
    try {
        const users = await userModel.find({ username: { $regex: searchString, $options: "i" }}).select('-password').exec();
        res.status(200).json(users)
        return;
    } catch (error) {
        res.status(501).json(error)
        return;
    }
};
  
