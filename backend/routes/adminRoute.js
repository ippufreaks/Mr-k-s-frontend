const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("name should be 3 characters long"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters long"),
  ],
  adminController.registerAdmin
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters long"),
  ],
  adminController.loginAdmin
);


router.post(
  "/update/password",
  authMiddleware.authAdmin,
  [
    body("oldPassword")
      .isLength({ min: 3 })
      .withMessage("Old Password should be at least 3 characters long"),
    body("newPassword")
      .isLength({ min: 3 })
      .withMessage("New Password should be at least 3 characters long"),
  ],
  adminController.updateAdminPassword
);




router.get('/profile', authMiddleware.authAdmin, adminController.getAdminProfile);

router.get('/logout', authMiddleware.authAdmin, adminController.logoutAdmin);

module.exports = router;
