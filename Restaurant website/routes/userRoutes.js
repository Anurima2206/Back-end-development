const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

//routes
// GET USER || GET
router.get("/getUser",authMiddleware, getUserController);
router.put("/updateUser",authMiddleware, updateUserController);
router.post("/resetPassword",authMiddleware, resetPasswordController);
router.put("/updatePassword",authMiddleware, updatePasswordController);
router.delete("/deleteProfile",authMiddleware, deleteProfileController);
module.exports = router;