import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import type { PassportStatic } from "passport"
import "dotenv/config";
import { prisma } from "../helpers/prisma.js"

interface JwtPayload {
    userId: string;
}

export function setupJwtStrategy(passport: PassportStatic){
    passport.use(
        "jwt",
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET!,
            },
            async (payload: JwtPayload, done) => {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            id: payload.userId,
                        },
                    })

                    if(!user) return done(null, false)

                    return done(null, user)
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )
}