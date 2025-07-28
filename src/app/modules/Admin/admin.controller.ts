import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admins retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong !",
      error: err,
    });
  }
};
const getSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong !",
      error: err,
    });
  }
};
const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.updateAdminIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong !",
      error: err,
    });
  }
};

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};
