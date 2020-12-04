import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

// Type check that our function is of type RequestHandler as defined by the express library.
// Value property will be a reference to a function that we apply our decorator to.
// To satisfy as an argument of type RouterHandlerDescriptor, it there is a value, it must be
// of type RequestHandler.
interface RouterHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

// Main purpose is routerBinder() will rertun a factory decorator.  The decorators here add metadata.
function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouterHandlerDescriptor) {
      console.log("routes.ts decorator at build");
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

// List all method types you want to build a decorator for using routerBinder() helper method.
export const get = routeBinder(Methods.get); // Variable get is set to a function with meta set for a 'path' and 'method'
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);

/*
// 4 PropertyDescriptor {} object
{
    writable: ..
    configurable: ..
    enumerable: ..
    value: ..
}


// 1 Original before refactor with a RouteBinder function
 - For get() add a metadata of the provided path to the function the decorator is applied to.
export function get(path: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    console.log("routes.ts decorator at build");
    Reflect.defineMetadata("path", path, target, key);
    Reflect.defineMetadata("method", "get", target, key);
  };
}
*/

/*
  // 3
  routeBinder function is only used here to avoid duplication of returned function
*/

/* 
// 2 Possible second or more functions defined
  export function post(path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      console.log("routes.ts decorator at build");
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", "post", target, key);
    };
  }
*/
