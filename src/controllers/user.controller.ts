import { Request, Response } from 'express';

export class UserController {
  static getAll(req: Request, res: Response) {
    return res.send("users");
  }

  static create(req: Request, res: Response) {
    const { name } = req.body;

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { name }
    });
  }
}