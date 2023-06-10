const { PostModel } = require("../models/postModel");
const express = require("express");
const postRouter = express.Router();

// postRouter.get("/", async(req, res)=>{
//     try {
//         const data = await PostModel.find({});
//         res.status(200).json(data)
//     } catch (error) {
//         console.log(error)
//     }
// })
postRouter.post("/", async(req, res)=>{
    try {
        let newPost = new PostModel(req.body);
        await newPost.save();
        res.status(201).json({"msg": "posted!"})
    } catch (error) {
        console.log(error)
    }
})
postRouter.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const data = await PostModel.findByIdAndDelete(id);
        res.status(200).json({"msg": "deleted!"})
    } catch (error) {
        console.log(error)
    }
})
postRouter.get("/", async(req, res)=>{
    const {destination, sort, order} = req.query;

    if(order == "desc"){
        order = -1
    }else if(order == "asc"){
        order = 1
    }
    try {
        if(destination && sort){
            let data = await PostModel.find({"destination": destination}).sort({"budget_per_person": order});
            res.status(200).json(data)
        }else if(destination && !sort){
            let data = await PostModel.find({"destination": destination});
            res.status(200).json(data)
        }else if(!destination && sort){
            let data = await PostModel.find({}).sort({"budget_per_person": order});
            res.status(200).json(data)
        }else{
            const data = await PostModel.find({});
            res.status(200).json(data)
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    postRouter
}