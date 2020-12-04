import "reflect-metadata";
import { Request, Response, RequestHandler, NextFunction } from "express";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
// import express from "express";
// import { bodyValidator } from './bodyValidator';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

// Decorator constructs the routes with route handlers and associates them with some express router, wires up middlewares to a method.
export function controller(routePrefix: string) {
  return function (target: Function) {
    console.log("controller.ts decorator at build");
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // 1 Routes
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      // 2 Middlewares
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      // 3 Body fields validator middleware
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      // Associate routeHandler and path to a Router, add middlewares.  ex: router['get']('/login', loggerMiddleware, logger2Middleware, routeHandler)
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        ); // lookup of method on the router.  Remember Router definition is provieed by Express.
        // router.get(`${routePrefix}${path}`, routeHandler);
        console.log(`route constructed: ${routePrefix}${path}`);
      }
    }
  };
}
