import { Router } from "express";
import { authLoginController } from "./authlogin.controller";

const router = Router();
router.post("/login", authLoginController.loginUser);
// router.post("/refresh-token", authLoginController.refreshToken);

export const authLoginRouter = router;
