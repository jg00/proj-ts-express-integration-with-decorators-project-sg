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
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
// import express from "express";
// import { bodyValidator } from './bodyValidator';
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("Invalid request");
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        next();
    };
}
// Decorator constructs the routes with route handlers and associates them with some express router, wires up middlewares to a method.
function controller(routePrefix) {
    return function (target) {
        console.log("controller.ts decorator at build");
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            // 1 Routes
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            // 2 Middlewares
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            // 3 Body fields validator middleware
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            var validator = bodyValidators(requiredBodyProps);
            // Associate routeHandler and path to a Router, add middlewares.  ex: router['get']('/login', loggerMiddleware, logger2Middleware, routeHandler)
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator,
                    routeHandler])); // lookup of method on the router.  Remember Router definition is provieed by Express.
                // router.get(`${routePrefix}${path}`, routeHandler);
                console.log("route constructed: " + routePrefix + path);
            }
        }
    };
}
exports.controller = controller;
