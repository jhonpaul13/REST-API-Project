import bcrypt from 'bcrypt'
import { json } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const register = async (req, res) =>{
    try{
        const { fistName, lastName, email, password} = req.body
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            fistName,
            lastName,
            email,
            password: encryptedPassword
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err) {
        res.status(500).json({error: err.message})
    }
}

export const login = async (req, res) =>{
    try{
        const{ email, password} = req.body

        const user = await User.findOne({
            email: email
        })

        if (!user) return res.status(400).json({ msg:'invalid email/password'})

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = jwt.sign({ id:user._i}, process.env.JWT_SECRET)
            user.password = '***'
            res.status(200).json({token, user})
        } else{
            res.status(400).json({msg: 'invalid credentials'})
        }

    }catch (error){
        res.status(500).json({error: err.message})
    }
}