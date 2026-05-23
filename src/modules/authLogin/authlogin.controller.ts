import type { Request, Response } from "express";
import { authLoginService } from "./authlogin.service";

const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await authLoginService.loginUserIntoDB(
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error: unknown) {

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
  }
};

export const authLoginController = {
  loginUser,
};