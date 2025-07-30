import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.createAdmin
);

export const UserRoutes = router;
