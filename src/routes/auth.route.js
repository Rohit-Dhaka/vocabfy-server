import { Router } from "express";
import * as authController from "../controllers/auth.Controller.js"
const authRoute = Router();


authRoute.post("/register", authController.register);
authRoute.post("/verify-email", authController.verifyEmail);
authRoute.post("/login", authController.login);
authRoute.post("/refresh-token", authController.refreshToken);
authRoute.post("/logout", authController.logout);
authRoute.post("/logout-all", authController.logoutAll);
authRoute.post("/change-password", authController.changePassword);
authRoute.post("/forgot-password/send-otp", authController.sendForgotPasswordOtp);
authRoute.post("/forgot-password/verify-otp", authController.verifyForgotPasswordOtp);
authRoute.post("/forgot-password/reset-password", authController.resetPassword);

export default authRoute;