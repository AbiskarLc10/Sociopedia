const express = require("express");
const router = express.Router();
const controller = require("../Controllers/authControllers");
const verifyUser = require("../Middlewares/verifyUser")

router.route("/login").post(controller.loginUser);
router.route("/signup").post(controller.signUpUser);
router.route("/signout/:userId").delete(verifyUser,controller.signOutUser)

module.exports = router