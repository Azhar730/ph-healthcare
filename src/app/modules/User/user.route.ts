import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/create-admin", UserControllers.createAdmin);

export const UserRoutes = router;
