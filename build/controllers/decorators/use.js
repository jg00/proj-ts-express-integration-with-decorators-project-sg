"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
// Our argument is what we want to hook up to our request handler
function use(middleware) {
    return function (target, key, desc) {
        // Existing array of middlewares associated to the method or set to new array
        var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target, key) || [];
        // Add metadata property with a value equal to a list of middlewares
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middleware, __spreadArrays(middlewares, [middleware]), target, key);
    };
}
exports.use = use;
