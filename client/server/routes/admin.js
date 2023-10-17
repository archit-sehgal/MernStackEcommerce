const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {authenticateJwt,secretKey}=require("../middleware/auth")
const mongoose = require("mongoose");
const { User, Admin, Product } = require("../db");
const router= express.Router();

router.get("/me",authenticateJwt,(req,res)=>{
    res.json({
        adminId:req.user.adminId
    })
})
// admin signup
router.post("/signup",async(req,res)=>{
    const{adminId,password}=req.body;
    const existingAdmin=await Admin.findOne({adminId:adminId})
    if(!existingAdmin){
        const newAdmin=new Admin({
            adminId:adminId,
            password:password
        })
        await newAdmin.save()
        const token=jwt.sign({adminId,password},secretKey)
        res.json({message:"admin created successfully",token})
    }else{
        res.status(404).json("admin already exist")
    }
})
// admin login
router.post("/login",async(req,res)=>{
    const{adminId,password}=req.body;
    const existingAdmin=await Admin.findOne({adminId:adminId,password:password})
    if(existingAdmin){
        const token=jwt.sign({adminId,password},secretKey);
        res.json({message:"admin logged in",token})
    }
    else{
        res.status(403).send("admin not registered");
    }
})
// add products
router.post("/products",authenticateJwt,async(req,res)=>{
    const{productName,desc,price,imageLink}=req.body;
    const existingProduct=await Product.findOne({productName:productName})
    if(existingProduct){
        res.status(403).send("product already exists")
    }else{
        const newProduct=new Product({
            id:Math.floor(Math.random()*100000),
            productName:productName,
            desc:desc,
            price:price,
            imageLink:imageLink
        })
        await newProduct.save();
        res.json({message:"product added successfully",newProduct})
    }
})
// edit a product
router.post("/product/:id",authenticateJwt,async(req,res)=>{
    const id=req.params.id;
    const{productName,desc,price,imageLink}=req.body;
    const findProduct=await Product.findOne({id:id})
    if(findProduct){
        findProduct.productName=productName;
        findProduct.desc=desc;
        findProduct.price=price;
        findProduct.imageLink=imageLink;
        await findProduct.save();
        res.json({message:"product updated successfully",findProduct})
    }else{
        res.status(404).send("product not found")
    }
})
// delete a product
router.delete("/product/:id",authenticateJwt,async(req,res)=>{
    const id=req.params.id;
    const findProduct=await Product.deleteOne({id:id});
    if(!findProduct){
        res.status(404).send("product not found");
    }
    res.json({message:"product deleted successfully"})
})
module.exports=router;
