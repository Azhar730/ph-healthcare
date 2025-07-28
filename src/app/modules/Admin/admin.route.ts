import { PrismaClient } from "@prisma/client";
import { AdminControllers } from "./admin.controller";
import { Router } from "express";

const router = Router();

router.get("/", AdminControllers.getAllAdmin);
router.get("/:id", AdminControllers.getSingleAdmin);
router.get("/:id", AdminControllers.updateAdmin);
export const AdminRoutes = router;
