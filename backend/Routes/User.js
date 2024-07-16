const express = require("express")
const User = require("../Models/User")
const { tokenGenerate } = require("../Helpers/tokenGenerate")
const jsonWeb = require("jsonwebtoken")
const router = express.Router()

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    try {
        let user = await User.findOne({username})
        if (!user) user = await User.findOne({email: username})
        if (!user) return res.json({success:false, message:"Invalid Creds"})
        else{
            if (user.password !== password) return res.json({success:false, message:"Invalid"})
            else{ 
                let token = await tokenGenerate(user._id)
                return res.json({success:true, message:"Logged In", token, user})
            }
        }
    } catch (error) {
        res.json({success:false, message:"Insufficient Data"})
        console.log(error)
    }

})
router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body)
        if (user){
            token = await tokenGenerate(user._id)
            console.log(token)
            res.json({success:true, message:"User Created", user, token})
        }
        else{
            res.json({success:false, message:"Error"})
        }
    } catch (error) {
        res.json({success:false, message:"Server Error"})
        console.log(error)
    }
})

router.get("/me", async (req, res) => {
    try {
        const {token} = req.headers 
        if (!token){
            return res.status(401).json({message: "Unauthorized", success:False})
        }
        const data = jsonWeb.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(data.id)
        if (user){
            return res.json({user, message: "User Found", success:true})
        }
        else{
            res.status(404).json({message: "User Not Found", success:false})
        }
    } catch (error) {
        res.json({success:false, message:"Server Error"})
        console.log(error)
    }
})

module.exports = router