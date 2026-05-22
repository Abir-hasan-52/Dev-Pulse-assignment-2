import type { Request, Response } from "express";

const signupUser = async (req: Request, res: Response) => {
  try {
    //  res.status(200).json({
    //   success: true,
    //   message: "User login successfully!",
    //   data: result,
    // });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController={
    signupUser
}
