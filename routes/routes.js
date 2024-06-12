import express from "express"
import  text_add  from "../configuration/config.js";
const routes = express.Router();

routes.route("/add").post(text_add)
export default routes

