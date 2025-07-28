import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import httpStatus from 'http-status'
import sendResponse from "../../../shared/sendResponse";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdminFromDB(filters, options);
    
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins retrieved successfully",
      meta: result.meta,
      data: result.data,
    })
  } catch (err) {
    next(err)
  }
};
const getSingleAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);
    
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin retrieved successfully",
      data: result
    })
  } catch (err) {
    next(err)
  }
};
const updateAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.updateAdminIntoDB(id, req.body);
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin updated successfully",
      data: result
    })
  } catch (err) {
    next(err)
  }
};
const deleteAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
    
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result
    })
    
  } catch (err: any) {
    next(err)
  }
};
const softDeleteAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin soft deleted successfully",
      data: result
    })
  } catch (err: any) {
    next(err)
  }
};

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin
};
