import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { validateData } from "../middlewares/zod-validation.js";
import { userCreateSchema, userLoginSchema } from "../schemas/users.schema.js";
import { UserService } from "../services/user.service.js";
import auth from "../middlewares/auth.js";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/", validateData(userCreateSchema), userController.create);
router.post("/login", validateData(userLoginSchema), userController.login); 

export default router;
