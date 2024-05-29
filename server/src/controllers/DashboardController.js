const Item = require('../models/Item');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

module.exports = {

    getItemById(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            }
            else{
                const {itemId} = req.params;
                console.log(itemId)
                try{
                    const item = await Item.findById(itemId);            
                    
                    return res.json({authData, items});

                }catch(error){
                    return res.status(400).json({
                        message : "Item not found! Want to add one?"
                    })
                }
            }
        })
    },

    getAllItems(req, res){

        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            }
            else{
                const { category } = req.params;
        
                const query = category ? { category: category, user : new mongoose.Types.ObjectId(authData.user._id)} : {user : new mongoose.Types.ObjectId(authData.user._id)}

                try{
                    const items = await Item.find(query).sort({totalVotes: -1});            
                    if(items){
                        return res.json({authData, items});
                    }
        
                }catch(error){
                    return res.status(400).json({
                        message : "No items available yet!"
                    })
                }
            }
        })        
    },

    updateItem(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            }
            else{
                const {itemId, comment} = req.body

                try{
                    const filter = {_id : itemId}

                    const update = {
                        $inc:{
                            upvotes : 1,
                            totalVotes : 1
                        },

                        $push:{
                            comments : comment
                        }
                    }

                    const options = {new : true}

                    const updateRes = await Item.findOneAndUpdate(filter,
                                                                update,
                                                                options)

                    return res.json({authData, updateRes})
                }
                catch(error){
                    throw Error(`Error occured while adding a vote to the item : ${error}`);
                }
            }
        })
    },

    downVoteItem(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            }
            else{
                try{
                    const {itemId} = req.params
                    const filter = {_id : itemId, totalVotes : {$gt : 0}}

                    const update = {
                        $inc: {
                            downvotes: 1,
                            totalVotes: -1
                        }
                    };

                    const options = {new : true}

                    const updateRes = await Item.findOneAndUpdate(filter,
                                                                update,
                                                                options)

                    return res.json({authData, updateRes})
                }
                catch(error){
                    throw Error(`Error occured while removing a vote to the item : ${error}`);
                }
            }
        })
    }
}