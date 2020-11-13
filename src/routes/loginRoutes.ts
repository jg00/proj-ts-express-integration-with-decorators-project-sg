import { Router, Request, Response, NextFunction } from "express";

// Override type definition for body-parser middleware to replace body: any annotation
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// Middleware requireAuth to handle access to routes
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403); // Forbidden
  res.send("Not permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
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
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@i.com" && password === "futbol") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href='/logout'>Logout</a>
      </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href='/login'>Login</a>
    </div>
  `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send(`Welcome to protected route, logged in user`);
});

export { router };

/*
  1 normally we are exporting and declaring a variable on the same line like
  export const router = Router();
  Here we have to wrap our variable in {} because we are tyring to export a variable 
  that has already been created.

  2 Note the type definition for body-parser middleware has some issues where body: any.
    body: ReqBody; // Replaced with below.  Note that ReqBody = null.  See generic type arguments.
    body: { [key:string]: string | undefined } // Possible fix but will not change type definition files in general.

    router.post("/login", (req: Request, res: Response) => {
      const { email, password } = req.body;

      if (email) {
        res.send(email.toUpperCase());
      } else {
        res.send("You must provide an email property");
      }
    });
*/
