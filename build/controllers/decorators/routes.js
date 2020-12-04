"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
// Main purpose is routerBinder() will rertun a factory decorator.  The decorators here add metadata.
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            console.log("routes.ts decorator at build");
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
// List all method types you want to build a decorator for using routerBinder() helper method.
exports.get = routeBinder(Methods_1.Methods.get); // Variable get is set to a function with meta set for a 'path' and 'method'
exports.put = routeBinder(Methods_1.Methods.put);
exports.post = routeBinder(Methods_1.Methods.post);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
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
