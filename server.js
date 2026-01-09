const express = require('express');
const mongoose = require('mongoose');
const UserData = require('./model');
const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://likhitharanichejarla_db_user:@cluster0.hzz7z7z.mongodb.net/').then(() => console.log('connected to db..')).catch(err => console.log(err))
app.post('/add_user',async (req,res) => {
    const {username} = req.body;
    const {email} = req.body;
    try{
        const newData = new UserData({username,email});
        await newData.save();
        return res.json("user can be sucessful")
    }
    catch(err){
        console.log(err.message);
    }
})
app.get('/get_all_data',async(req,res)=>{
    try{
        const allData = await UserData.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
})
app.put('/update/:id', async(req,res) => {
        const {username}=req.body;
        const {email}=req.body;
        
        try{
        const allData = await UserData.findByIdAndUpdate(req.params.id,{username,email});
        return res.json(allData);
        UserData.find();
    }
    catch(err){
        console.log(err.message);
    }
    });
    app.delete('/delete/:id',async (req,res)=>{
        try{
            await UserData.findByIdAndDelete(req.params.id);
            return res.json(await UserData.find());

        }
        catch(err){
            console.log(err.message);
        }
    });
app.listen(3000,()=>console.log('server running on http://localhost:3000'));