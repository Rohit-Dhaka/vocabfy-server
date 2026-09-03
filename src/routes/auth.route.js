import { Router } from "express";
import * as authController from "../controllers/auth.Controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {authRateLimiter,passwordRateLimiter,} from "../middlewares/ratelimit.middleware.js";
const authRoute = Router();



authRoute.post("/register", authRateLimiter, authController.register);
authRoute.post("/verify-email", authRateLimiter, authController.verifyEmail);
authRoute.post("/login",  authController.login);
authRoute.post("/refresh-token", authController.refreshToken);
authRoute.post("/logout", authRateLimiter, authController.logout);
authRoute.post("/logout-all",authRateLimiter,authMiddleware,authController.logoutAll);
authRoute.post("/change-password",passwordRateLimiter,authMiddleware,authController.changePassword);
authRoute.post("/forgot-password/send-otp",passwordRateLimiter,authController.sendForgotPasswordOtp);
authRoute.post( "/forgot-password/verify-otp", passwordRateLimiter, authController.verifyForgotPasswordOtp);
authRoute.post( "/forgot-password/reset-password", passwordRateLimiter, authController.resetPassword);

export default authRoute;

// passwordRateLimiter add karn hai 
// authRateLimiter