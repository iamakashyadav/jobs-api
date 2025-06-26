import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
    return;
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
  return;
};

export default errorHandlerMiddleware;
