import { Router } from "express";
import UserController from "../controllers/user/user.controller";

const router: Router = Router();
const userController = new UserController();

router.post("/signup", userController.register);

router.post("/login", userController.login);

export default router;
