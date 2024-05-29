const Item = require('../models/Item');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
    createItem(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                console.log(err);
                res.sendStatus(401);
            }
            else{
                try{
                        const {
                                name, 
                                category, 
                                price, 
                                } = req.body;

                        const user = await User.findById(authData.user._id);

                        if(!user){
                            return res.status(400).json({
                                message : "User does not exist!"
                            })
                        }
                        
                        existing_item = await Item.findOne({name : name, user : new mongoose.Types.ObjectId(authData.user._id)});

                        if(!existing_item){
                            
                            const item = await Item.create({
                                name, 
                                category, 
                                price, 
                                user : authData.user._id,
                                upvotes: 0,
                                downvotes: 0,
                                totalVotes: 0 
                            });

                            return res.json({item: item, message:'Item successfully added!'});
                        }

                        return res.status(200).json({
                            message : 'Item already exists! Want to update instead?'
                        });

                }
                catch(error){
                    throw Error(`Error occured while adding a new item : ${error}`);
                }
            }
        })
    }, 

    delete(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            }
            else{
                const {itemId} = req.params;
                console.log(itemId)
                try{
                    await Item.findByIdAndDelete(itemId)   
                    return res.status(204).send() 
                }
                catch(error){
                    return res.status(400).json({
                        message : "No items available with given ID!"
                    })
                }
            }
        })
    }
}