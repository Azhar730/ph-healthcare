import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Admins retrieved successfully",
    data: result,
  });
};

export const AdminControllers = {
  getAllAdmin,
};
