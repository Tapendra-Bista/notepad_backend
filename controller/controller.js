import { json } from "express";
import notepad_module from "../configuration/config.js";
// create new text
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
// fetch text from database
const text_fetch = async (req, resp) => {
    var data = await notepad_module.find().sort({ "createdAt": -1 })
    if (data) {
        console.log(data)
        return resp.status(200).json(data);
    } else {
        console.log("No items")
        return resp.status(404), json({ message: "NO items " })
    }
}

// delete text 
const text_delete = async (req, resp) => {
    const { id } = req.body
    try {

        const find = await notepad_module.findById(id)
        if (find) {
            const data_delete = await notepad_module.findOneAndDelete(id)
            return resp.status(200).json({ status: true, message: "Deleted", data: data_delete })
        }
    } catch (error) {
        console.log("Not found that text")
        return resp.status(404).json({ status: false, message: 'Not found by id : ' + id })
    }

}

// update text 
const text_update = async (req, resp) => {
    const { id, text } = req.body
    try {
        const find = await notepad_module.findById(id)
        if (find) {
            const data_update = await notepad_module.updateOne(
                {
                    $set: {
                        notepadText: text,
                    }
                })
            return resp.status(200).json({ status: true, message: "Updated", data: data_update })
        }
    } catch (error) {
        console.log("error at update :" + error);
        return resp.status(404).json({ status: false, message: 'Not found by id : ' + id })
    }
}
export { text_add, text_delete, text_fetch, text_update };

// end