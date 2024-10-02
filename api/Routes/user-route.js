const express = require("express");
const verifyUser = require("../Middlewares/verifyUser");
const router = express.Router();
const controller = require("../Controllers/userControllers");


router.route("/updateUser/:userId").patch(verifyUser,controller.updateUser);
router.route("/getUser/:userId").get(verifyUser,controller.getUser);
router.route("/:userId/friends").get(verifyUser,controller.getUserFriends)
router.route("/:userId/:friendId").patch(verifyUser,controller.addRemoveFriends)


module.exports = router;