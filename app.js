import express from "express"
import https from "https"
import dotenv from "dotenv/config"
import routes from "./routes/routes.js"
import helmet from "helmet"
const app = express()
app.use(express.json())
app.use(helmet()) // hide internal part
app.use("/note", routes)

// localhost  server //
const port = process.env.PORT || '1000' // port number for server 
https.createServer({}, app).listen(port, () => {
    console.log("Connected to the server number ", port);
})




