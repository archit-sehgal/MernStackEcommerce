const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const {User,Product,Admin}=require("../db/index");
const router=express.Router()

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send("Error fetching courses");
    }
});
router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    const findProduct=await Product.findOne({id:id})
    if(findProduct){
        res.json({message:"product found",findProduct})
    }else{
        res.status(404).json({message:"product not found"}) 
    }
})

module.exports=router;