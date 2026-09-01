import { Router } from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
const route = Router();

route.use("/auth", authRoute);
route.use("/user", userRoute);

export default route;