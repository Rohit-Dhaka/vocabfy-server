import { Router } from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import { apiRateLimiter } from "../middlewares/rateLimit.middleware.js";
const route = Router();

route.use("/auth", authRoute);
route.use("/user", apiRateLimiter , userRoute);

export default route;