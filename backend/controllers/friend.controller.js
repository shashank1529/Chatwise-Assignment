import { Friend } from "../models/friend.model.js";
import { User } from "../models/user.model.js";

export async function sendFriendRequest(req, res) {
  try {
    const { recipientId } = req.body;
    const requesterId = req.user._id;

    const existingRequest = await Friend.findOne({ requester: requesterId, recipient: recipientId });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: "Friend request already sent" });
    }

    const friendRequest = new Friend({
      requester: requesterId,
      recipient: recipientId
    });

    await friendRequest.save();
    res.status(201).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    console.log("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function respondToFriendRequest(req, res) {
  try {
    const { requestId, status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ success: false, message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    friendRequest.status = status;
    await friendRequest.save();

    res.status(200).json({ success: true, message: `Friend request ${status}` });
  } catch (error) {
    console.log("Error in respondToFriendRequest controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
