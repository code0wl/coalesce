# WIP A modern lightweight physics engine for the browser (Currently undergoing a major rewrite)
### A minimalist 2D physics engine written and maintained with TypeScript and RxJS for games, graphs or any canvas interface

Work in Progress (Do not use for Production yet) [![Build Status](https://travis-ci.org/code0wl/coalesce.svg?branch=master)](https://travis-ci.org/code0wl/coalesce)

This project is maintained using TypeScript and RxJS. 
Nice to know is the project you are including this library in does not need to include these dependencies, of course :).
The package will only contain TypeScript and RxJS as dependencies. To keep the code as light-weight as possible, I have decided to only make it work for modern browsers.
A full list of supported browsers will be up as soon as the project is complete.

**Module Support** 

Engine will support the following modules which could be seen as features

- Accelerometer
- RigidShape
- Gravity
- Collision
- Canvas Drawing interface
- Different input peripheral support (mouse, keyboard, leap-motion, VR)

**How to use**

A full documentation will follow, but for now checking the project's package.json file will reveal how to run the demo application.

```npm
"scripts": {
    "prestart": "npm i",
    "start": "npm run prep.engine",
    "prep.demo": "npm i && webpack --config webpack/demo.config.js &&  webpack-dev-server --config webpack/demo.config.js",
    "prep.engine": "webpack --config webpack/base.config.js && webpack-dev-server --config webpack/base.config.js"
}
```
