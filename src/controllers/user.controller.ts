import { Request, Response } from "express";
import { UserCreateDto, UserLoginDto } from "../schemas/users.schema.js";
import { UserService } from "../services/user.service.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request<{}, {}, UserCreateDto>, res: Response) => {
    const user = await this.userService.create(req.body);

    return res.status(201).json(user);
  };

  login = async (req: Request<{}, {}, UserLoginDto>, res: Response) => {
    const data = await this.userService.login(req.body);

    return res.status(200).json(data);
  };
  
}
