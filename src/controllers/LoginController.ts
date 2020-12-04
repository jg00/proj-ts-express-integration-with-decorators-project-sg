import { Request, Response, NextFunction } from "express";
import { get, controller, bodyValidator, post } from "./decorators/index";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "hi@i.com" && password === "futbol") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }

  /*
  // For testing only that the function wired to a router decorator meets the requirements of interface RouterHandlerDescriptor 
  @get("/")
  add(a: number, b: number): number {
    return a + b;
  }
  */
}

/*
  // Test middleware.  This is of type 
  // 1 import decorators
  import { get, controller, use } from "./decorators/index";

  // 2 RequestHandler
  function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Request was made!!");
    next();
  }

  // 3 Add @use(logger) to a method
*/
