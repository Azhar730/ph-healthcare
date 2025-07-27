import { PrismaClient } from "@prisma/client";
import { AdminControllers } from "./admin.controller";
import { Router } from "express";

const router = Router();

router.post("/", AdminControllers.getAllAdmin);
export const AdminRoutes = router;
