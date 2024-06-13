import express from "express"
import  {text_add, text_delete, text_fetch, text_update} from "../controller/controller.js";
const routes = express.Router();
routes.route("/add").post(text_add)
routes.route("/fetch").get(text_fetch)
routes.route("/delete").delete(text_delete)
routes.route("/update").patch(text_update)
export default routes

