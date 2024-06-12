import notepad_module from "../configuration/config.js"

const text_add = async (req, resp) => {
    const { text } = req.body;
    const check = await notepad_module.findOne({ text }); // checking already same text available or not 
    // to avoid duplicate value

    if (check) {
        return resp.status(409).json({ status: false, message: 'This text already exist ' })
    }
    try {
        const data = notepad_module.create({
            text: text
        })
        return resp.status(200).json({ status: true, message: "Successfully added new text", data: data })
        console.log("new text :" + data)
    } catch (error) {
        return resp.status(403).json({ status: false, message: error['message'] })
    }
}


export default text_add;