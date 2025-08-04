const port = 8000
import http from "https" //const http = require("http")
import express from "express"
const app = express()
app.use(express.json())
import fs from "fs"
import user from "./Auth/user.js"
import { connect }from "./db/db.js"
connect()
app.use(user)
const server = http.createServer({
    key: fs.readFileSync('Keys/privatekey.pem'),
    cert: fs.readFileSync('Keys/certificate.pem')
}, app) 

server.listen(port)