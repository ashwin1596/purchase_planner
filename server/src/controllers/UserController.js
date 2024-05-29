const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = {
    async createUser(req, res){
        try{
            const {firstName, lastName, password, email} = req.body;

            if(!firstName || !lastName || !password || !email){
                return res.status(200).json({
                    message : "Required field missing!"
                })
            }

            const existentUser = await User.findOne({email});

            if(!existentUser){
                const hashedPassword = await bcrypt.hash(password, 10); 

                const user = await User.create({
                    firstName,
                    lastName,
                    password: hashedPassword,
                    email
                });

                return res.json({
                    _id : user._id,
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName
                });
            }

            return res.status(200).json({
                message : 'email/user already exists! Do you want to login instead?'
            });

        }
        catch(error){
            throw Error(`Error occured while registering a new user : ${error}`);
        }
    },

    async getUserById(req, res){
        const {userId} = req.params;
        try{
            const user = await User.findById(userId);
            return res.json(user);
        }catch(error){
            return res.status(400).json({
                message : 'User ID not found! Do you want to register instead?'
            });
        }
    }

}