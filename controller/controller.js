import { json } from "express";
import notepad_module from "../configuration/config.js"

const text_add = async (req, resp) => {
    const { text } = req.body;

    if (text != null) {
        console.log("text value :" + text)
        const check = await notepad_module.findOne({ text }); // checking already same text available or not 
        // to avoid duplicate value

        if (check) {
            console.log("This text already exist")
            return resp.status(409).json({ status: false, message: 'This text already exist ' })
        }
        try {
            const data = await notepad_module.create({
                notepadText: text,
            })
            console.log("new text :" + data)
            return resp.status(200).json({ status: true, message: "Successfully added new text", data: data })

        } catch (error) {
            console.log(error.toString())
            return resp.status(403).json({ status: false, message: error['message'] })
        }
    } else {
        console.log("text is null")
        return resp.status(406).json({ status: false, message: "Not Acceptable !" })
    }
}

const text_fetch = async (req, resp) => {
    var data =  await notepad_module.find().sort({ "createdAt": -1 })
    if (data) {
        console.log(data)
        return resp.status(200).json(data);
    } else {
        console.log("No items")
        return resp.status(404), json({ message: "NO items " })

    }
}

export { text_add, text_fetch };