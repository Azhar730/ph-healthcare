import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { AdminControllers } from "./admin.controller";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getAllAdmin
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getSingleAdmin
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.updateAdmin
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.deleteAdmin
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.updateAdmin
);
export const AdminRoutes = router;
