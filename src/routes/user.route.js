import { Router } from "express";
import * as userController from "../controllers/user.Controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";
const userRoute = Router();


userRoute.get("/profile",  authMiddleware, userController.getUser);
userRoute.patch("/profile", userController.updateUser);
userRoute.patch("/avatar", userController.updateAvatar);
userRoute.delete("/avatar", userController.deleteAvatar);
userRoute.patch("/banner", userController.updateBanner);
userRoute.delete("/banner", userController.deleteBanner);
userRoute.patch("/deactivate", userController.deactivateAccount);
userRoute.delete("/delete-account", userController.deleteAccount);

export default userRoute;