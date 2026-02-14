import express from "express";
import routes from "./routers/index.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.js";
import passport from "passport";
import { setupJwtStrategy } from "./auth/passport-jwt.strategy.js";

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

setupJwtStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);

export default app;
