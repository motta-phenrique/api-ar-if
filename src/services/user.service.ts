import { BadRequestError } from "../helpers/api-errors.js";
import { prisma } from "../helpers/prisma.js";
import { UserCreateDto, UserLoginDto } from "../schemas/users.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  create = async (user: UserCreateDto) => {
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) throw new BadRequestError("User already exists");

    const passwordHash = await bcrypt.hash(user.password, 10);

    const data = prisma.user.create({
      data: {
        ...user,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return data;
  };

  login = async (data: UserLoginDto) => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new BadRequestError("User not found");

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) throw new BadRequestError("Invalid password");

    const token = jwt.sign(
      {
        role: "user",
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
    };
  };
}
