import { Router } from "express";
import { authSignUpController } from "./authSignup.controller";

const router = Router();
router.post("/signup",authSignUpController.signupUser)

export const authSignupRoute= router;