import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authSignupRoute } from "./modules/authSignup/authSignup.route";
import { authLoginRouter } from "./modules/authLogin/authlogin.route";

const app: Application = express();

// express middle ware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "DevPulse express server is running!",
    author: "abir",
  });
});

app.use("/api/auth", authSignupRoute);
app.use("/api/auth",authLoginRouter);

export default app;
