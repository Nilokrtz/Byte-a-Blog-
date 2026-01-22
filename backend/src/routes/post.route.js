import { Router } from "express";
import { createController, findAllController,topPostController,findByIdController, searchByTitleController } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const route = Router();

route.post("/", authMiddleware, createController);
route.get("/", authMiddleware, findAllController);
route.get("/top", topPostController);
route.get("/search", searchByTitleController);


route.get("/:id", authMiddleware, findByIdController);

export default route;