import { Admin, Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpars/paginationHelper";

const getAllAdminFromDB = async (query: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = query;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getSingleAdminFromDB = async(id:string):Promise<Admin | null>=>{
//   const result = await prisma.admin.findUnique({
//     where: {
//       id
//     }
//   })
// }
export const AdminServices = {
  getAllAdminFromDB,
};
