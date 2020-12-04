"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Reference only prior to refactor routes using decorators
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
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
