import type { Request, Response } from "express";
import { authSignupService } from "./authSignup.service";
 

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await  authSignupService.createUserAuthIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authSignUpController = {
  signupUser,
};
