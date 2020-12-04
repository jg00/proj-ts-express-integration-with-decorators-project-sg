import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";

// Our argument is what we want to hook up to our request handler
export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    // Existing array of middlewares associated to the method or set to new array
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    // Add metadata property with a value equal to a list of middlewares
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
