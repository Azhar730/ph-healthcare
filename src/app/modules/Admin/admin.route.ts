import { PrismaClient } from "@prisma/client";
import { AdminControllers } from "./admin.controller";
import { Router } from "express";

const router = Router();

router.get("/", AdminControllers.getAllAdmin);
router.get("/:id", AdminControllers.getSingleAdmin);
router.patch("/:id", AdminControllers.updateAdmin);
router.delete("/:id", AdminControllers.deleteAdmin);
router.delete("/soft/:id", AdminControllers.updateAdmin);
export const AdminRoutes = router;
