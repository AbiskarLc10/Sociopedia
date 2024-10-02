const express = require("express");
const router = express.Router();
const controller = require("../Controllers/postControllers");
const verifyUser = require("../Middlewares/verifyUser");

router.route("/getAllPosts").get(verifyUser, controller.getAllPosts);
router.route("/:userId/getUser").get(verifyUser,controller.getUserByPost)
router.route("/:userId/posts").get(verifyUser, controller.getUserPosts);
router.route("/createpost").post(verifyUser, controller.createUserPost);
router.route("/likePost/:postId").patch(verifyUser, controller.likePost);

module.exports = router;
