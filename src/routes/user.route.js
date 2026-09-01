import { Router } from "express";
import * as userController from "../controllers/user.Controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userRoute = Router();

userRoute.get("/profile", authMiddleware, userController.getUser);
userRoute.patch("/profile", authMiddleware, userController.updateUser);
userRoute.patch("/avatar", authMiddleware, userController.updateAvatar);
userRoute.delete("/avatar", authMiddleware, userController.deleteAvatar);
userRoute.patch("/banner", authMiddleware, userController.updateBanner);
userRoute.delete("/banner", authMiddleware, userController.deleteBanner);
userRoute.patch(
  "/deactivate",
  authMiddleware,
  userController.deactivateAccount,
);
userRoute.delete(
  "/delete-account",
  authMiddleware,
  userController.deleteAccount,
);

export default userRoute;
