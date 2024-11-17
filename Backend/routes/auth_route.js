import express from "express";
import { Login } from "../controllers/auth_controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", Login)

export default AuthRouter;