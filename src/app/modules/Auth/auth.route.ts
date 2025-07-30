import { Router } from "express";
import { AuthControllers } from "./authController";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/login", AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthControllers.changePassword
);
router.post("/forgot-password", AuthControllers.forgotPassword);
router.post("/reset-password", AuthControllers.resetPassword);
export const AuthRoutes = router;
