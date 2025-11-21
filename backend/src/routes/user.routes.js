import express from "express";
import {
  adminData,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  userData,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(authMiddleware, getUser);
router.route("/me").get(authMiddleware, getUser);

router
  .route("/user-dashboard")
  .get(authMiddleware, authorizeRoles("USER", "ADMIN"), userData);
router
  .route("/admin-dashboard")
  .get(authMiddleware, authorizeRoles("ADMIN"), userData);

export default router;
