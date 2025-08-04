import express from 'express'
const app = express()
import { client } from '../db/db.js'
const db = client.db('UserAccount')
import bcrypt from 'bcrypt'
let salt = 10
let collection = db.collection("User")
app.post('/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        let userModel = {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: hashedPassword
        }
        await collection.insertOne(userModel)
        res.status(201).send(`Welcome ${userModel.name} ${userModel.surname}`)
    }catch(err){
        console.error(err)
        res.status(500).send("Error signing up.")
    }
})
export default app;