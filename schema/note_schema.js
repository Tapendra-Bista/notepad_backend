import { version } from "env";
import mongoose, { Types } from "mongoose";

const notepad = new  mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true,
      },
},{
    timestamps:true,versionKey: false
})

export default notepad




