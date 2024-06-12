import express from "express"
import  {text_add, text_fetch} from "../controller/controller.js";
const routes = express.Router();

routes.route("/add").post(text_add)
routes.route("/fetch").get(text_fetch)
export default routes

