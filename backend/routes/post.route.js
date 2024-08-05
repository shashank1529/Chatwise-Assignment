import express from "express";
import { createPost, commentOnPost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.post("/comment", protectRoute, commentOnPost);

export default router;
