import { Router } from "express";
import { createController, findAllController } from "../controllers/post.controller.js";

const route = Router();

route.post("/", createController);
route.get("/", findAllController);

export default route;