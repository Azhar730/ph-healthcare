// import { NextFunction, Request, Response } from "express";
// import { ZodObject } from "zod";

// const validateRequest =
//   (schema: ZodObject) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//       });
//       return next();
//     } catch (err) {
//       next(err);
//     }
//   };
// export default validateRequest;



import { ZodObject } from 'zod';
import catchAsync from '../../shared/catchAsync';

export const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
        body: req.body,
      });
    next();
  });
};