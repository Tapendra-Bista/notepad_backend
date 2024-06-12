import express from "express"
import https from "https"
import dotenv from "dotenv/config"
import routes from "./routes/routes.js"
import helmet from "helmet"
import fs, { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
app.use(express.json())
app.use(helmet()) // hide internal part
app.use("/note", routes)
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename)
// localhost  server //
const certpath = path.join(__dirname, "security/cert.pem")
const keypath = path.join(__dirname, "security/key.pem")
const port = process.env.PORT || '6000' // port number for server 
https.createServer({
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath)
}, app).listen(port, () => {
    console.log("Listenning  at port number:", port);
})


// for https
//  openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365





