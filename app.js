import express from "express"
import https from "https"
import dotenv from "dotenv/config"
const app = express()
app.use(express.json())
const port = process.env.PORT || '1000' // port number for server 
https.createServer({},app).listen(port, () => {
    console.log("Connected to the server number ", port);
})



