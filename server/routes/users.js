const express = require('express')
const connection = require('../connection')
const router = express.Router()

const jwt = require('jsonwebtoken')
require('dotenv').config()

var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')
const { query } = require('express')

router.post('/signup',(req,res)=>{
    let user = req.body
    select_query = "select email,password,role,status from users where email=?"
    connection.query(select_query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0){
                insert_query = "insert into users(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')" 
                connection.query(insert_query,[user.name,user.contactNumber,user.email,user.password],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message: 'Successfully Registered'})
                    }else{
                        return res.status(500).json(err)
                    }
                })
            }else{
                return res.status(400).json({message: 'Email Already Exist'})
            }
        }else{
            return res.status(500).json(err)
        }
    })
})

router.post('/login',(req,res)=>{
    let user = req.body
    select_query = "select email,password,role,status from users where email=?"
    connection.query(select_query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0 || results[0].password !== user.password){
                return res.status(401).json({message: 'Incorrect Username or Password'})
            }else if(results[0].status === 'false'){
                return res.status(401).json({message: 'Wait for Admin Approval'})
            }else if(results[0].password === user.password){
                const respone = {email: results[0].email,role: results[0].role}
                const accessToken = jwt.sign(respone,process.env.ACCESS_TOKEN,{expiresIn: '8h'})
                return res.status(200).json({token: accessToken})
            }else{
                return res.status(400).json({message: 'Something went wrong. Please try again later'})
            }
        }else{
            return res.status(500).json(err)
        }
    })
})

router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query = "select id,name,email,contactNumber,status from users where role = 'user'"
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let user = req.body
    var query = "update users set status=? where id=?"
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: 'User id does not exist'})
            }
            return res.status(200).json({message:'User Updated Successfully'})
        }else{
            return res.status(500).json(err)
        }
    })
})

router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:'true'})
})

router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const user = req.body
    const email = res.locals.email
    // console.log(email,user)
    var qeury = "select * from users where email=? and password=?"
    connection.query(qeury,[email,user.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message: "Incorrect Old Password"})
            }else if(results[0].password == user.oldPassword){
                // console.log(results[0].password)
                var query = "update users set password=? where email=?"
                connection.query(query,[user.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message: "Password Updated Succussfully"})
                    }else{
                        return res.status(500).json(err)
                    }
                })
            }else{
                return res.status(400).json({message: "Something went wrong. Please try again later"})
            }
        }else{
            return res.status(500).json(err)
        }
    })
})

module.exports = router