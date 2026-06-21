import { Router } from "express";

import { authGuard } from "../../../shared/http/middlewares/auth-guard";
import { AuthController } from "./auth.controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authGuard, authController.logout);
authRouter.get("/me", authGuard, authController.me);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
