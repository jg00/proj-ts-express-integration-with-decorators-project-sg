import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";
// import { router } from "./routes/loginRoutes";
// import { router as controllerRouter } from "./controllers/decorators/controller";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["whuh"] }));
app.use(AppRouter.getInstance());
// app.use(router);
// app.use(controllerRouter);

app.listen(3000, () => console.log(`Listening on port 3000`));
