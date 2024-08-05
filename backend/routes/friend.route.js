import express from "express";
import { sendFriendRequest, respondToFriendRequest } from "../controllers/friend.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send", protectRoute, sendFriendRequest);
router.post("/respond", protectRoute, respondToFriendRequest);

export default router;
