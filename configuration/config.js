import mongoose from "mongoose";
import env from "dotenv";
import notepad from "../schema/note_schema.js"
env.config()
mongoose.connect(process.env.DBURL,).then(()=>{
    console.log("Connected to the mongoose")
}).catch((error)=>{
    console.log("Error is mongoose :"+error)
})

const notepad_module =  mongoose.model("note",notepad)

export default notepad_module
                                    