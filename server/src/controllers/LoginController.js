const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    async store(req, res){

        const {email, password} = req.body;
        try{

            if(!email || !password){
                return res.status(200).json({
                    message : "Required field missing!"
                })
            }

            const user = await User.findOne({email});

            if(!user){
                return res.status(200).json({
                    message : "User not found! Do you want to register instead?"
                })
            }

            if(user && await bcrypt.compare(password, user.password)){
                const userResponse = {
                    _id : user._id,
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName
                }

                return jwt.sign({user: userResponse}, 'secret', {expiresIn: '1d'}, (err, token) => {
                    return res.json({
                        user: token,
                        user_id: userResponse._id
                    })
                })
            }
            else{
                return res.status(200).json({
                    message : "Email or password does not match"
                })
            }
        }
        catch(error){
            throw Error(`Error while Authenticating a User ${error}`)
        }
    }
}