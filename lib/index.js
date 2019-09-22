/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(vec) {
        return new Vector(vec.x + this.x, vec.y + this.y);
    }
    subtract(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }
    scale(n) {
        return new Vector(this.x * n, this.y * n);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    cross(vec) {
        return this.x * vec.y - this.y * vec.x;
    }
    rotate(center, angle) {
        //rotate in counterclockwise
        var r = [];
        var x = this.x - center.x;
        var y = this.y - center.y;
        r[0] = x * Math.cos(angle) - y * Math.sin(angle);
        r[1] = x * Math.sin(angle) + y * Math.cos(angle);
        r[0] += center.x;
        r[1] += center.y;
        return new Vector(r[0], r[1]);
    }
    normalize() {
        var len = this.length();
        if (len > 0) {
            len = 1 / len;
        }
        return new Vector(this.x * len, this.y * len);
    }
    distance(vec) {
        var x = this.x - vec.x;
        var y = this.y - vec.y;
        return Math.sqrt(x * x + y * y);
    }
}
exports.Vector = Vector;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_vector_1 = __webpack_require__(0);
const collision_info_1 = __webpack_require__(2);
let gObjectNum = 0;
const Physics = function () {
    let mPositionalCorrectionFlag = true;
    let mRelaxationCount = 15; // number of relaxation iteration
    let mPosCorrectionRate = 0.8; // percentage of separation to project objects
    let positionalCorrection = function (s1, s2, collisionInfo) {
        let s1InvMass = s1.mInvMass;
        let s2InvMass = s2.mInvMass;
        let num = (collisionInfo.getDepth() / (s1InvMass + s2InvMass)) * mPosCorrectionRate;
        let correctionAmount = collisionInfo.getNormal().scale(num);
        s1.move(correctionAmount.scale(-s1InvMass));
        s2.move(correctionAmount.scale(s2InvMass));
    };
    let resolveCollision = function (s1, s2, collisionInfo) {
        if (s1.mInvMass === 0 && s2.mInvMass === 0) {
            return;
        }
        //  correct positions
        if (exports.Coalesce.Physics.mPositionalCorrectionFlag) {
            positionalCorrection(s1, s2, collisionInfo);
        }
        let n = collisionInfo.getNormal();
        //the direction of collisionInfo is always from s1 to s2
        //but the Mass is inversed, so start scale with s2 and end scale with s1
        let start = collisionInfo.mStart.scale(s2.mInvMass / (s1.mInvMass + s2.mInvMass));
        let end = collisionInfo.mEnd.scale(s1.mInvMass / (s1.mInvMass + s2.mInvMass));
        let p = start.add(end);
        //r is Vector from center of object to collision point
        let r1 = p.subtract(s1.mCenter);
        let r2 = p.subtract(s2.mCenter);
        //newV = V + mAngularVelocity cross R
        let v1 = s1.mVelocity.add(new engine_vector_1.Vector(-1 * s1.mAngularVelocity * r1.y, s1.mAngularVelocity * r1.x));
        let v2 = s2.mVelocity.add(new engine_vector_1.Vector(-1 * s2.mAngularVelocity * r2.y, s2.mAngularVelocity * r2.x));
        let relativeVelocity = v2.subtract(v1);
        // Relative velocity in normal direction
        let rVelocityInNormal = relativeVelocity.dot(n);
        //if objects moving apart ignore
        if (rVelocityInNormal > 0) {
            return;
        }
        let newRestituion = Math.min(s1.mRestitution, s2.mRestitution);
        let newFriction = Math.min(s1.mFriction, s2.mFriction);
        let R1crossN = r1.cross(n);
        let R2crossN = r2.cross(n);
        let jN = -(1 + newRestituion) * rVelocityInNormal;
        jN =
            jN /
                (s1.mInvMass +
                    s2.mInvMass +
                    R1crossN * R1crossN * s1.mInertia +
                    R2crossN * R2crossN * s2.mInertia);
        let impulse = n.scale(jN);
        s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
        s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));
        s1.mAngularVelocity -= R1crossN * jN * s1.mInertia;
        s2.mAngularVelocity += R2crossN * jN * s2.mInertia;
        let tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));
        //relativeVelocity.dot(tangent) should less than 0
        tangent = tangent.normalize().scale(-1);
        let R1crossT = r1.cross(tangent);
        let R2crossT = r2.cross(tangent);
        let jT = -(1 + newRestituion) * relativeVelocity.dot(tangent) * newFriction;
        jT =
            jT /
                (s1.mInvMass +
                    s2.mInvMass +
                    R1crossT * R1crossT * s1.mInertia +
                    R2crossT * R2crossT * s2.mInertia);
        //friction should less than force in normal direction
        if (jT > jN) {
            jT = jN;
        }
        //impulse is from s1 to s2 (in opposite direction of velocity)
        impulse = tangent.scale(jT);
        s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
        s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));
        s1.mAngularVelocity -= R1crossT * jT * s1.mInertia;
        s2.mAngularVelocity += R2crossT * jT * s2.mInertia;
    };
    let drawCollisionInfo = function (collisionInfo, context) {
        context.beginPath();
        context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
        context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
        context.closePath();
        context.strokeStyle = 'orange';
        context.stroke();
    };
    const collision = function () {
        let i, j, k;
        let collisionInfo = new collision_info_1.CollisionInfo();
        for (k = 0; k < mRelaxationCount; k++) {
            for (i = 0; i < this.Core.mAllObjects.length; i++) {
                for (j = i + 1; j < this.Core.mAllObjects.length; j++) {
                    if (this.Core.mAllObjects[i].boundTest(this.Core.mAllObjects[j])) {
                        if (this.Core.mAllObjects[i].collisionTest(this.Core.mAllObjects[j], collisionInfo)) {
                            //make sure the normal is always from object[i] to object[j]
                            if (collisionInfo
                                .getNormal()
                                .dot(this.Core.mAllObjects[j].mCenter.subtract(this.Core.mAllObjects[i].mCenter)) < 0) {
                                collisionInfo.changeDir();
                            }
                            resolveCollision(this.Core.mAllObjects[i], this.Core.mAllObjects[j], collisionInfo);
                        }
                    }
                }
            }
        }
    };
    return {
        collision,
        mPositionalCorrectionFlag
    };
};
const Core = function () {
    let mCanvas, mContext, mWidth = window.innerWidth, mHeight = window.innerHeight;
    mCanvas = document.getElementById('canvas');
    mContext = mCanvas.getContext('2d');
    mCanvas.height = mHeight;
    mCanvas.width = mWidth;
    let mGravity = new engine_vector_1.Vector(0, 20);
    let mMovement = true;
    let mCurrentTime, mElapsedTime, mPreviousTime = Date.now(), mLagTime = 0;
    const kFPS = 60; // Frames per second
    let kFrameTime = 1 / kFPS;
    let mUpdateIntervalInSeconds = kFrameTime;
    let kMPF = 1000 * kFrameTime; // Milliseconds per frame.
    let mAllObjects = [];
    let updateUIEcho = function () {
        if (!mAllObjects.length)
            return;
        document.getElementById('info').innerHTML =
            '<p><b>Selected Object:</b>:</p>' +
                '<ul style="margin:-10px">' +
                '<li>Id: ' +
                gObjectNum +
                '</li>' +
                '<li>Center: ' +
                mAllObjects[gObjectNum].mCenter.x.toPrecision(3) +
                ',' +
                mAllObjects[gObjectNum].mCenter.y.toPrecision(3) +
                '</li>' +
                '<li>Angle: ' +
                mAllObjects[gObjectNum].mAngle.toPrecision(3) +
                '</li>' +
                '<li>Velocity: ' +
                mAllObjects[gObjectNum].mVelocity.x.toPrecision(3) +
                ',' +
                mAllObjects[gObjectNum].mVelocity.y.toPrecision(3) +
                '</li>' +
                '<li>AngluarVelocity: ' +
                mAllObjects[gObjectNum].mAngularVelocity.toPrecision(3) +
                '</li>' +
                '<li>Mass: ' +
                1 / mAllObjects[gObjectNum].mInvMass.toPrecision(3) +
                '</li>' +
                '<li>Friction: ' +
                mAllObjects[gObjectNum].mFriction.toPrecision(3) +
                '</li>' +
                '<li>Restitution: ' +
                mAllObjects[gObjectNum].mRestitution.toPrecision(3) +
                '</li>' +
                '<li>Positional Correction: ' +
                exports.Coalesce.Physics.mPositionalCorrectionFlag +
                '</li>' +
                '<li>Movement: ' +
                this.Core.mMovement +
                '</li>' +
                '</ul> <hr>' +
                '<p><b>Control</b>: of selected object</p>' +
                '<ul style="margin:-10px">' +
                '<li><b>Num</b> or <b>Up/Down Arrow</b>: Select Object</li>' +
                '<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>' +
                '<li><b>IJKL</b> + <b>UO</b>: Velocities [Linear + Angular]</li>' +
                '<li><b>Z/X</b>: Mass [Decrease/Increase]</li>' +
                '<li><b>C/V</b>: Frictrion [Decrease/Increase]</li>' +
                '<li><b>B/N</b>: Restitution [Decrease/Increase]</li>' +
                '<li><b>M</b>: Positional Correction [On/Off]</li>' +
                '<li><b>,</b>: Movement [On/Off]</li>' +
                '</ul> <hr>' +
                '<b>F/G</b>: Spawn [Rectangle/Circle] at selected object' +
                '<p><b>H</b>: Excite all objects</p>' +
                '<p><b>R</b>: Reset System</p>' +
                '<hr>';
    };
    const draw = () => {
        mContext.clearRect(0, 0, mWidth, mHeight);
        for (let i = 0; i < mAllObjects.length; i++) {
            mContext.strokeStyle = 'blue';
            if (i === gObjectNum) {
                mContext.strokeStyle = 'red';
            }
            mAllObjects[i].draw(mContext);
        }
    };
    const update = () => {
        for (let i = 0; i < mAllObjects.length; i++) {
            mAllObjects[i].update(mContext);
        }
    };
    const runGameLoop = () => {
        requestAnimationFrame(() => runGameLoop());
        mCurrentTime = Date.now();
        mElapsedTime = mCurrentTime - mPreviousTime;
        mPreviousTime = mCurrentTime;
        mLagTime += mElapsedTime;
        updateUIEcho();
        draw();
        while (mLagTime >= kMPF) {
            mLagTime -= kMPF;
            exports.Coalesce.Physics().collision();
            update();
        }
    };
    let initializeEngineCore = function () {
        runGameLoop();
    };
    return {
        initializeEngineCore,
        mAllObjects,
        mWidth,
        mHeight,
        mContext,
        mGravity,
        mUpdateIntervalInSeconds,
        mMovement
    };
};
exports.Coalesce = { Core: Core(), Physics: Physics() };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_vector_1 = __webpack_require__(0);
class CollisionInfo {
    constructor() {
        this.mDepth = 0;
        this.mNormal = new engine_vector_1.Vector(0, 0);
        this.mStart = new engine_vector_1.Vector(0, 0);
        this.mEnd = new engine_vector_1.Vector(0, 0);
    }
    /**
     * Set the depth of the CollisionInfo
     * @memberOf CollisionInfo
     * @param {Number} s how much penetration
     * @returns {void}
     */
    setDepth(s) {
        this.mDepth = s;
    }
    /**
     * Set the normal of the CollisionInfo
     * @memberOf CollisionInfo
     * @param {Vector} s Vector upon which collision interpenetrates
     * @returns {void}
     */
    setNormal(s) {
        this.mNormal = s;
    }
    /**
     * Return the depth of the CollisionInfo
     * @memberOf CollisionInfo
     * @returns {Number} how much penetration
     */
    getDepth() {
        return this.mDepth;
    }
    /**
     * Return the depth of the CollisionInfo
     * @memberOf CollisionInfo
     * @returns {Vector} Vector upon which collision interpenetrates
     */
    getNormal() {
        return this.mNormal;
    }
    /**
     * Set the all value of the CollisionInfo
     * @memberOf CollisionInfo
     * @param {Number} d the depth of the CollisionInfo
     * @param {Vector} n the normal of the CollisionInfo
     * @param {Vector} s the startpoint of the CollisionInfo
     * @returns {void}
     */
    setInfo(d, n, s) {
        this.mDepth = d;
        this.mNormal = n;
        this.mStart = s;
        this.mEnd = s.add(n.scale(d));
    }
    /**
     * change the direction of normal
     * @memberOf CollisionInfo
     * @returns {void}
     */
    changeDir() {
        this.mNormal = this.mNormal.scale(-1);
        var n = this.mStart;
        this.mStart = this.mEnd;
        this.mEnd = n;
    }
}
exports.CollisionInfo = CollisionInfo;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_vector_1 = __webpack_require__(0);
const engine_core_1 = __webpack_require__(1);
class RigidShape {
    constructor(center, mass, friction, restitution) {
        this.mCenter = center;
        this.mInertia = 0;
        if (mass !== undefined) {
            this.mInvMass = mass;
        }
        else {
            this.mInvMass = 1;
        }
        this.mFriction = friction !== undefined ? friction : 0.8;
        this.mRestitution = restitution !== undefined ? restitution : 0.2;
        this.mVelocity = new engine_vector_1.Vector(0, 0);
        if (this.mInvMass !== 0) {
            this.mInvMass = 1 / this.mInvMass;
            this.mAcceleration = engine_core_1.Coalesce.Core.mGravity;
        }
        else {
            this.mAcceleration = new engine_vector_1.Vector(0, 0);
        }
        //angle
        this.mAngle = 0;
        //negetive-- clockwise
        //postive-- counterclockwise
        this.mAngularVelocity = 0;
        this.mAngularAcceleration = 0;
        this.mBoundRadius = 0;
        engine_core_1.Coalesce.Core.mAllObjects.push(this);
        console.log(engine_core_1.Coalesce.Core.mAllObjects);
    }
    updateMass(delta) {
        var mass;
        if (this.mInvMass !== 0) {
            mass = 1 / this.mInvMass;
        }
        else {
            mass = 0;
        }
        mass += delta;
        if (mass <= 0) {
            this.mInvMass = 0;
            this.mVelocity = new engine_vector_1.Vector(0, 0);
            this.mAcceleration = new engine_vector_1.Vector(0, 0);
            this.mAngularVelocity = 0;
            this.mAngularAcceleration = 0;
        }
        else {
            this.mInvMass = 1 / mass;
            this.mAcceleration = engine_core_1.Coalesce.Core.mGravity;
        }
        this.updateInertia();
    }
    updateInertia() {
        // subclass must define this.
        // must work with inverted this.mInvMass
    }
    update() {
        if (engine_core_1.Coalesce.Core.mMovement) {
            var dt = engine_core_1.Coalesce.Core.mUpdateIntervalInSeconds;
            //v += a*t
            this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));
            //s += v*t
            this.move(this.mVelocity.scale(dt));
            this.mAngularVelocity += this.mAngularAcceleration * dt;
            this.rotate(this.mAngularVelocity * dt);
        }
        var width = engine_core_1.Coalesce.Core.mWidth;
        var height = engine_core_1.Coalesce.Core.mHeight;
        if (this.mCenter.x < 0 ||
            this.mCenter.x > width ||
            this.mCenter.y < 0 ||
            this.mCenter.y > height) {
            var index = engine_core_1.Coalesce.Core.mAllObjects.indexOf(this);
            if (index > -1)
                engine_core_1.Coalesce.Core.mAllObjects.splice(index, 1);
        }
    }
    boundTest(otherShape) {
        var vFrom1to2 = otherShape.mCenter.subtract(this.mCenter);
        var rSum = this.mBoundRadius + otherShape.mBoundRadius;
        var dist = vFrom1to2.length();
        if (dist > rSum) {
            //not overlapping
            return false;
        }
        return true;
    }
}
exports.RigidShape = RigidShape;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine_core_1 = __webpack_require__(1);
exports.Coalesce = engine_core_1.Coalesce;
var engine_shape_rectangle_1 = __webpack_require__(5);
exports.Rectangle = engine_shape_rectangle_1.Rectangle;
var engine_shape_circle_1 = __webpack_require__(7);
exports.Circle = engine_shape_circle_1.Circle;
var engine_vector_1 = __webpack_require__(0);
exports.Vector = engine_vector_1.Vector;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_vector_1 = __webpack_require__(0);
const engine_rigid_1 = __webpack_require__(3);
const superstruct_1 = __webpack_require__(6);
const collision_info_1 = __webpack_require__(2);
const collisionInfoR1 = new collision_info_1.CollisionInfo();
const collisionInfoR2 = new collision_info_1.CollisionInfo();
class Rectangle extends engine_rigid_1.RigidShape {
    constructor(center, width, height, mass, friction, restitution) {
        super(center, width, height, mass);
        this.tmpSupport = new superstruct_1.SupportStruct();
        this.mType = 'Rectangle';
        this.mWidth = width;
        this.mHeight = height;
        this.mBoundRadius = Math.sqrt(width * width + height * height) / 2;
        this.mVertex = [];
        this.mFaceNormal = [];
        //0--TopLeft;1--TopRight;2--BottomRight;3--BottomLeft
        this.mVertex[0] = new engine_vector_1.Vector(center.x - width / 2, center.y - height / 2);
        this.mVertex[1] = new engine_vector_1.Vector(center.x + width / 2, center.y - height / 2);
        this.mVertex[2] = new engine_vector_1.Vector(center.x + width / 2, center.y + height / 2);
        this.mVertex[3] = new engine_vector_1.Vector(center.x - width / 2, center.y + height / 2);
        //0--Top;1--Right;2--Bottom;3--Left
        //mFaceNormal is normal of face toward outside of rectangle
        this.mFaceNormal[0] = this.mVertex[1].subtract(this.mVertex[2]);
        this.mFaceNormal[0] = this.mFaceNormal[0].normalize();
        this.mFaceNormal[1] = this.mVertex[2].subtract(this.mVertex[3]);
        this.mFaceNormal[1] = this.mFaceNormal[1].normalize();
        this.mFaceNormal[2] = this.mVertex[3].subtract(this.mVertex[0]);
        this.mFaceNormal[2] = this.mFaceNormal[2].normalize();
        this.mFaceNormal[3] = this.mVertex[0].subtract(this.mVertex[1]);
        this.mFaceNormal[3] = this.mFaceNormal[3].normalize();
        this.updateInertia();
    }
    rotate(angle) {
        this.mAngle += angle;
        for (let i = 0; i < this.mVertex.length; i++) {
            this.mVertex[i] = this.mVertex[i].rotate(this.mCenter, angle);
        }
        this.mFaceNormal[0] = this.mVertex[1].subtract(this.mVertex[2]);
        this.mFaceNormal[0] = this.mFaceNormal[0].normalize();
        this.mFaceNormal[1] = this.mVertex[2].subtract(this.mVertex[3]);
        this.mFaceNormal[1] = this.mFaceNormal[1].normalize();
        this.mFaceNormal[2] = this.mVertex[3].subtract(this.mVertex[0]);
        this.mFaceNormal[2] = this.mFaceNormal[2].normalize();
        this.mFaceNormal[3] = this.mVertex[0].subtract(this.mVertex[1]);
        this.mFaceNormal[3] = this.mFaceNormal[3].normalize();
        return this;
    }
    findAxisLeastPenetration(otherRect, collisionInfo) {
        var n;
        var supportPoint;
        var bestDistance = 999999;
        var bestIndex = null;
        var hasSupport = true;
        var i = 0;
        while (hasSupport && i < this.mFaceNormal.length) {
            // Retrieve a face normal from A
            n = this.mFaceNormal[i];
            // use -n as direction and the vectex on edge i as point on edge
            var dir = n.scale(-1);
            var ptOnEdge = this.mVertex[i];
            // find the support on B
            // the point has longest distance with edge i
            otherRect.findSupportPoint(dir, ptOnEdge);
            hasSupport = this.tmpSupport.mSupportPoint !== null;
            //get the shortest support point depth
            if (hasSupport && this.tmpSupport.mSupportPointDist < bestDistance) {
                bestDistance = this.tmpSupport.mSupportPointDist;
                bestIndex = i;
                supportPoint = this.tmpSupport.mSupportPoint;
            }
            i = i + 1;
        }
        if (hasSupport) {
            //all four directions have support point
            var bestVec = this.mFaceNormal[bestIndex].scale(bestDistance);
            collisionInfo.setInfo(bestDistance, this.mFaceNormal[bestIndex], supportPoint.add(bestVec));
        }
        return hasSupport;
    }
    findSupportPoint(dir, ptOnEdge) {
        //the longest project length
        var vToEdge;
        var projection;
        this.tmpSupport.mSupportPointDist = -9999999;
        this.tmpSupport.mSupportPoint = null;
        //check each Vector of other object
        for (let i = 0; i < this.mVertex.length; i++) {
            vToEdge = this.mVertex[i].subtract(ptOnEdge);
            projection = vToEdge.dot(dir);
            //find the longest distance with certain edge
            //dir is -n direction, so the distance should be positive
            if (projection > 0 && projection > this.tmpSupport.mSupportPointDist) {
                this.tmpSupport.mSupportPoint = this.mVertex[i];
                this.tmpSupport.mSupportPointDist = projection;
            }
        }
    }
    collidedRectRect(r1, r2, collisionInfo) {
        var status1 = false;
        var status2 = false;
        //find Axis of Separation for both rectangle
        status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);
        if (status1) {
            status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
            if (status2) {
                //if both of rectangles are overlapping, choose the shorter normal as the normal
                if (collisionInfoR1.getDepth() < collisionInfoR2.getDepth()) {
                    var depthVec = collisionInfoR1
                        .getNormal()
                        .scale(collisionInfoR1.getDepth());
                    collisionInfo.setInfo(collisionInfoR1.getDepth(), collisionInfoR1.getNormal(), collisionInfoR1.mStart.subtract(depthVec));
                }
                else {
                    collisionInfo.setInfo(collisionInfoR2.getDepth(), collisionInfoR2.getNormal().scale(-1), collisionInfoR2.mStart);
                }
            }
        }
        return status1 && status2;
    }
    collidedRectCirc(otherCir, collisionInfo) {
        var inside = true;
        var bestDistance = -99999;
        var nearestEdge = 0;
        var i, v;
        var circ2Pos, projection;
        for (i = 0; i < 4; i++) {
            //find the nearest face for center of circle
            circ2Pos = otherCir.mCenter;
            v = circ2Pos.subtract(this.mVertex[i]);
            projection = v.dot(this.mFaceNormal[i]);
            if (projection > 0) {
                //if the center of circle is outside of rectangle
                bestDistance = projection;
                nearestEdge = i;
                inside = false;
                break;
            }
            if (projection > bestDistance) {
                bestDistance = projection;
                nearestEdge = i;
            }
        }
        var dis, normal, radiusVec;
        if (!inside) {
            //the center of circle is outside of rectangle
            //v1 is from left vertex of face to center of circle
            //v2 is from left vertex of face to right vertex of face
            var v1 = circ2Pos.subtract(this.mVertex[nearestEdge]);
            var v2 = this.mVertex[(nearestEdge + 1) % 4].subtract(this.mVertex[nearestEdge]);
            var dot = v1.dot(v2);
            if (dot < 0) {
                //the center of circle is in corner region of mVertex[nearestEdge]
                dis = v1.length();
                //compare the distance with radium to decide collision
                if (dis > otherCir.mRadius) {
                    return false;
                }
                normal = v1.normalize();
                radiusVec = normal.scale(-otherCir.mRadius);
                collisionInfo.setInfo(otherCir.mRadius - dis, normal, circ2Pos.add(radiusVec));
            }
            else {
                //the center of circle is in corner region of mVertex[nearestEdge+1]
                //v1 is from right vertex of face to center of circle
                //v2 is from right vertex of face to left vertex of face
                v1 = circ2Pos.subtract(this.mVertex[(nearestEdge + 1) % 4]);
                v2 = v2.scale(-1);
                dot = v1.dot(v2);
                if (dot < 0) {
                    dis = v1.length();
                    //compare the distance with radium to decide collision
                    if (dis > otherCir.mRadius) {
                        return false;
                    }
                    normal = v1.normalize();
                    radiusVec = normal.scale(-otherCir.mRadius);
                    collisionInfo.setInfo(otherCir.mRadius - dis, normal, circ2Pos.add(radiusVec));
                }
                else {
                    //the center of circle is in face region of face[nearestEdge]
                    if (bestDistance < otherCir.mRadius) {
                        radiusVec = this.mFaceNormal[nearestEdge].scale(otherCir.mRadius);
                        collisionInfo.setInfo(otherCir.mRadius - bestDistance, this.mFaceNormal[nearestEdge], circ2Pos.subtract(radiusVec));
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            //the center of circle is inside of rectangle
            radiusVec = this.mFaceNormal[nearestEdge].scale(otherCir.mRadius);
            collisionInfo.setInfo(otherCir.mRadius - bestDistance, this.mFaceNormal[nearestEdge], circ2Pos.subtract(radiusVec));
        }
        return true;
    }
    collisionTest(otherShape, collisionInfo) {
        var status = false;
        if (otherShape.mType === 'Circle') {
            status = this.collidedRectCirc(otherShape, collisionInfo);
        }
        else {
            status = this.collidedRectRect(this, otherShape, collisionInfo);
        }
        return status;
    }
    move(v) {
        for (let i = 0; i < this.mVertex.length; i++) {
            this.mVertex[i] = this.mVertex[i].add(v);
        }
        this.mCenter = this.mCenter.add(v);
        return this;
    }
    draw(context) {
        context.save();
        context.translate(this.mVertex[0].x, this.mVertex[0].y);
        context.rotate(this.mAngle);
        context.strokeRect(0, 0, this.mWidth, this.mHeight);
        context.restore();
    }
    updateInertia() {
        // Expect this.mInvMass to be already inverted!
        if (this.mInvMass === 0) {
            this.mInertia = 0;
        }
        else {
            //   inertia=mass*width^2+height^2
            this.mInertia =
                ((1 / this.mInvMass) *
                    (this.mWidth * this.mWidth + this.mHeight * this.mHeight)) /
                    12;
            this.mInertia = 1 / this.mInertia;
        }
    }
}
exports.Rectangle = Rectangle;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SupportStruct {
    constructor() {
        this.mSupportPoint = null;
        this.mSupportPointDist = 0;
    }
}
exports.SupportStruct = SupportStruct;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_vector_1 = __webpack_require__(0);
const engine_rigid_1 = __webpack_require__(3);
class Circle extends engine_rigid_1.RigidShape {
    constructor(center, radius, mass, friction, restitution) {
        super(center, radius, mass, friction);
        this.mType = 'Circle';
        this.mRadius = radius;
        this.mBoundRadius = radius;
        this.mStartpoint = new engine_vector_1.Vector(center.x, center.y - radius);
        this.updateInertia();
    }
    move(s) {
        this.mStartpoint = this.mStartpoint.add(s);
        this.mCenter = this.mCenter.add(s);
        return this;
    }
    draw(context) {
        context.beginPath();
        //draw a circle
        context.arc(this.mCenter.x, this.mCenter.y, this.mRadius, 0, Math.PI * 2, true);
        //draw a line from start point toward center
        context.moveTo(this.mStartpoint.x, this.mStartpoint.y);
        context.lineTo(this.mCenter.x, this.mCenter.y);
        context.closePath();
        context.stroke();
    }
    //rotate angle in counterclockwise
    rotate(angle) {
        this.mAngle += angle;
        this.mStartpoint = this.mStartpoint.rotate(this.mCenter, angle);
        return this;
    }
    updateInertia() {
        if (this.mInvMass === 0) {
            this.mInertia = 0;
        }
        else {
            // this.mInvMass is inverted!!
            // Inertia=mass * radius^2
            // 12 is a constant value that can be changed
            this.mInertia =
                ((1 / this.mInvMass) * (this.mRadius * this.mRadius)) / 12;
        }
    }
    collisionTest(otherShape, collisionInfo) {
        var status = false;
        if (otherShape.mType === 'Circle') {
            status = this.collidedCircCirc(this, otherShape, collisionInfo);
        }
        else {
            status = otherShape.collidedRectCirc(this, collisionInfo);
        }
        return status;
    }
    collidedCircCirc(c1, c2, collisionInfo) {
        var vFrom1to2 = c2.mCenter.subtract(c1.mCenter);
        var rSum = c1.mRadius + c2.mRadius;
        var dist = vFrom1to2.length();
        if (dist > Math.sqrt(rSum * rSum)) {
            //not overlapping
            return false;
        }
        if (dist !== 0) {
            // overlapping bu not same position
            var normalFrom2to1 = vFrom1to2.scale(-1).normalize();
            var radiusC2 = normalFrom2to1.scale(c2.mRadius);
            collisionInfo.setInfo(rSum - dist, vFrom1to2.normalize(), c2.mCenter.add(radiusC2));
        }
        else {
            //same position
            if (c1.mRadius > c2.mRadius) {
                collisionInfo.setInfo(rSum, new engine_vector_1.Vector(0, -1), c1.mCenter.add(new engine_vector_1.Vector(0, c1.mRadius)));
            }
            else {
                collisionInfo.setInfo(rSum, new engine_vector_1.Vector(0, -1), c2.mCenter.add(new engine_vector_1.Vector(0, c2.mRadius)));
            }
        }
        return true;
    }
}
exports.Circle = Circle;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvdmVjdG9yL2VuZ2luZS52ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9lbmdpbmUuY29yZS50cyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL21vZHVsZS9sb2dnZXIvY29sbGlzaW9uLmluZm8udHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvcmlnaWQvZW5naW5lLnJpZ2lkLnRzIiwid2VicGFjazovLy8uL2xpYi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvcmlnaWQvZW5naW5lLnNoYXBlLnJlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL3N1cGVyc3RydWN0LnRzIiwid2VicGFjazovLy8uL2xpYi9zcmMvbW9kdWxlL3JpZ2lkL2VuZ2luZS5zaGFwZS5jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztR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QUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLHNCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksc0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLHNCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTFFLG1DQUFtQztRQUNuQywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXRELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJ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LElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQXpHRCx3QkF5R0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBhZGQodmVjKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodmVjLnggKyB0aGlzLngsIHZlYy55ICsgdGhpcy55KTtcbiAgfVxuXG4gIHN1YnRyYWN0KHZlYykge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAtIHZlYy54LCB0aGlzLnkgLSB2ZWMueSk7XG4gIH1cblxuICBzY2FsZShuKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogbiwgdGhpcy55ICogbik7XG4gIH1cblxuICBkb3QodmVjKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnk7XG4gIH1cblxuICBjcm9zcyh2ZWMpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdmVjLnkgLSB0aGlzLnkgKiB2ZWMueDtcbiAgfVxuXG4gIHJvdGF0ZShjZW50ZXIsIGFuZ2xlKSB7XG4gICAgLy9yb3RhdGUgaW4gY291bnRlcmNsb2Nrd2lzZVxuICAgIHZhciByID0gW107XG5cbiAgICB2YXIgeCA9IHRoaXMueCAtIGNlbnRlci54O1xuICAgIHZhciB5ID0gdGhpcy55IC0gY2VudGVyLnk7XG5cbiAgICByWzBdID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgclsxXSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xuXG4gICAgclswXSArPSBjZW50ZXIueDtcbiAgICByWzFdICs9IGNlbnRlci55O1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoclswXSwgclsxXSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoKCk7XG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgfVxuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIGxlbiwgdGhpcy55ICogbGVuKTtcbiAgfVxuXG4gIGRpc3RhbmNlKHZlYykge1xuICAgIHZhciB4ID0gdGhpcy54IC0gdmVjLng7XG4gICAgdmFyIHkgPSB0aGlzLnkgLSB2ZWMueTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL21vZHVsZS92ZWN0b3IvZW5naW5lLnZlY3Rvcic7XG5pbXBvcnQgeyBDb2xsaXNpb25JbmZvIH0gZnJvbSAnLi9tb2R1bGUvbG9nZ2VyL2NvbGxpc2lvbi5pbmZvJztcbmRlY2xhcmUgY29uc3Qgd2luZG93O1xuXG5sZXQgZ09iamVjdE51bSA9IDA7XG5cbmNvbnN0IFBoeXNpY3MgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG1Qb3NpdGlvbmFsQ29ycmVjdGlvbkZsYWcgPSB0cnVlO1xuICBsZXQgbVJlbGF4YXRpb25Db3VudCA9IDE1OyAvLyBudW1iZXIgb2YgcmVsYXhhdGlvbiBpdGVyYXRpb25cbiAgbGV0IG1Qb3NDb3JyZWN0aW9uUmF0ZSA9IDAuODsgLy8gcGVyY2VudGFnZSBvZiBzZXBhcmF0aW9uIHRvIHByb2plY3Qgb2JqZWN0c1xuXG4gIGxldCBwb3NpdGlvbmFsQ29ycmVjdGlvbiA9IGZ1bmN0aW9uKHMxLCBzMiwgY29sbGlzaW9uSW5mbykge1xuICAgIGxldCBzMUludk1hc3MgPSBzMS5tSW52TWFzcztcbiAgICBsZXQgczJJbnZNYXNzID0gczIubUludk1hc3M7XG5cbiAgICBsZXQgbnVtID1cbiAgICAgIChjb2xsaXNpb25JbmZvLmdldERlcHRoKCkgLyAoczFJbnZNYXNzICsgczJJbnZNYXNzKSkgKiBtUG9zQ29ycmVjdGlvblJhdGU7XG4gICAgbGV0IGNvcnJlY3Rpb25BbW91bnQgPSBjb2xsaXNpb25JbmZvLmdldE5vcm1hbCgpLnNjYWxlKG51bSk7XG5cbiAgICBzMS5tb3ZlKGNvcnJlY3Rpb25BbW91bnQuc2NhbGUoLXMxSW52TWFzcykpO1xuICAgIHMyLm1vdmUoY29ycmVjdGlvbkFtb3VudC5zY2FsZShzMkludk1hc3MpKTtcbiAgfTtcblxuICBsZXQgcmVzb2x2ZUNvbGxpc2lvbiA9IGZ1bmN0aW9uKHMxLCBzMiwgY29sbGlzaW9uSW5mbykge1xuICAgIGlmIChzMS5tSW52TWFzcyA9PT0gMCAmJiBzMi5tSW52TWFzcyA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vICBjb3JyZWN0IHBvc2l0aW9uc1xuICAgIGlmIChDb2FsZXNjZS5QaHlzaWNzLm1Qb3NpdGlvbmFsQ29ycmVjdGlvbkZsYWcpIHtcbiAgICAgIHBvc2l0aW9uYWxDb3JyZWN0aW9uKHMxLCBzMiwgY29sbGlzaW9uSW5mbyk7XG4gICAgfVxuXG4gICAgbGV0IG4gPSBjb2xsaXNpb25JbmZvLmdldE5vcm1hbCgpO1xuXG4gICAgLy90aGUgZGlyZWN0aW9uIG9mIGNvbGxpc2lvbkluZm8gaXMgYWx3YXlzIGZyb20gczEgdG8gczJcbiAgICAvL2J1dCB0aGUgTWFzcyBpcyBpbnZlcnNlZCwgc28gc3RhcnQgc2NhbGUgd2l0aCBzMiBhbmQgZW5kIHNjYWxlIHdpdGggczFcbiAgICBsZXQgc3RhcnQgPSBjb2xsaXNpb25JbmZvLm1TdGFydC5zY2FsZShcbiAgICAgIHMyLm1JbnZNYXNzIC8gKHMxLm1JbnZNYXNzICsgczIubUludk1hc3MpXG4gICAgKTtcbiAgICBsZXQgZW5kID0gY29sbGlzaW9uSW5mby5tRW5kLnNjYWxlKFxuICAgICAgczEubUludk1hc3MgLyAoczEubUludk1hc3MgKyBzMi5tSW52TWFzcylcbiAgICApO1xuICAgIGxldCBwID0gc3RhcnQuYWRkKGVuZCk7XG4gICAgLy9yIGlzIFZlY3RvciBmcm9tIGNlbnRlciBvZiBvYmplY3QgdG8gY29sbGlzaW9uIHBvaW50XG4gICAgbGV0IHIxID0gcC5zdWJ0cmFjdChzMS5tQ2VudGVyKTtcbiAgICBsZXQgcjIgPSBwLnN1YnRyYWN0KHMyLm1DZW50ZXIpO1xuXG4gICAgLy9uZXdWID0gViArIG1Bbmd1bGFyVmVsb2NpdHkgY3Jvc3MgUlxuICAgIGxldCB2MSA9IHMxLm1WZWxvY2l0eS5hZGQoXG4gICAgICBuZXcgVmVjdG9yKC0xICogczEubUFuZ3VsYXJWZWxvY2l0eSAqIHIxLnksIHMxLm1Bbmd1bGFyVmVsb2NpdHkgKiByMS54KVxuICAgICk7XG4gICAgbGV0IHYyID0gczIubVZlbG9jaXR5LmFkZChcbiAgICAgIG5ldyBWZWN0b3IoLTEgKiBzMi5tQW5ndWxhclZlbG9jaXR5ICogcjIueSwgczIubUFuZ3VsYXJWZWxvY2l0eSAqIHIyLngpXG4gICAgKTtcbiAgICBsZXQgcmVsYXRpdmVWZWxvY2l0eSA9IHYyLnN1YnRyYWN0KHYxKTtcblxuICAgIC8vIFJlbGF0aXZlIHZlbG9jaXR5IGluIG5vcm1hbCBkaXJlY3Rpb25cbiAgICBsZXQgclZlbG9jaXR5SW5Ob3JtYWwgPSByZWxhdGl2ZVZlbG9jaXR5LmRvdChuKTtcblxuICAgIC8vaWYgb2JqZWN0cyBtb3ZpbmcgYXBhcnQgaWdub3JlXG4gICAgaWYgKHJWZWxvY2l0eUluTm9ybWFsID4gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBuZXdSZXN0aXR1aW9uID0gTWF0aC5taW4oczEubVJlc3RpdHV0aW9uLCBzMi5tUmVzdGl0dXRpb24pO1xuICAgIGxldCBuZXdGcmljdGlvbiA9IE1hdGgubWluKHMxLm1GcmljdGlvbiwgczIubUZyaWN0aW9uKTtcblxuICAgIGxldCBSMWNyb3NzTiA9IHIxLmNyb3NzKG4pO1xuICAgIGxldCBSMmNyb3NzTiA9IHIyLmNyb3NzKG4pO1xuXG4gICAgbGV0IGpOID0gLSgxICsgbmV3UmVzdGl0dWlvbikgKiByVmVsb2NpdHlJbk5vcm1hbDtcbiAgICBqTiA9XG4gICAgICBqTiAvXG4gICAgICAoczEubUludk1hc3MgK1xuICAgICAgICBzMi5tSW52TWFzcyArXG4gICAgICAgIFIxY3Jvc3NOICogUjFjcm9zc04gKiBzMS5tSW5lcnRpYSArXG4gICAgICAgIFIyY3Jvc3NOICogUjJjcm9zc04gKiBzMi5tSW5lcnRpYSk7XG5cbiAgICBsZXQgaW1wdWxzZSA9IG4uc2NhbGUoak4pO1xuICAgIHMxLm1WZWxvY2l0eSA9IHMxLm1WZWxvY2l0eS5zdWJ0cmFjdChpbXB1bHNlLnNjYWxlKHMxLm1JbnZNYXNzKSk7XG4gICAgczIubVZlbG9jaXR5ID0gczIubVZlbG9jaXR5LmFkZChpbXB1bHNlLnNjYWxlKHMyLm1JbnZNYXNzKSk7XG5cbiAgICBzMS5tQW5ndWxhclZlbG9jaXR5IC09IFIxY3Jvc3NOICogak4gKiBzMS5tSW5lcnRpYTtcbiAgICBzMi5tQW5ndWxhclZlbG9jaXR5ICs9IFIyY3Jvc3NOICogak4gKiBzMi5tSW5lcnRpYTtcblxuICAgIGxldCB0YW5nZW50ID0gcmVsYXRpdmVWZWxvY2l0eS5zdWJ0cmFjdChuLnNjYWxlKHJlbGF0aXZlVmVsb2NpdHkuZG90KG4pKSk7XG5cbiAgICAvL3JlbGF0aXZlVmVsb2NpdHkuZG90KHRhbmdlbnQpIHNob3VsZCBsZXNzIHRoYW4gMFxuICAgIHRhbmdlbnQgPSB0YW5nZW50Lm5vcm1hbGl6ZSgpLnNjYWxlKC0xKTtcblxuICAgIGxldCBSMWNyb3NzVCA9IHIxLmNyb3NzKHRhbmdlbnQpO1xuICAgIGxldCBSMmNyb3NzVCA9IHIyLmNyb3NzKHRhbmdlbnQpO1xuXG4gICAgbGV0IGpUID0gLSgxICsgbmV3UmVzdGl0dWlvbikgKiByZWxhdGl2ZVZlbG9jaXR5LmRvdCh0YW5nZW50KSAqIG5ld0ZyaWN0aW9uO1xuICAgIGpUID1cbiAgICAgIGpUIC9cbiAgICAgIChzMS5tSW52TWFzcyArXG4gICAgICAgIHMyLm1JbnZNYXNzICtcbiAgICAgICAgUjFjcm9zc1QgKiBSMWNyb3NzVCAqIHMxLm1JbmVydGlhICtcbiAgICAgICAgUjJjcm9zc1QgKiBSMmNyb3NzVCAqIHMyLm1JbmVydGlhKTtcblxuICAgIC8vZnJpY3Rpb24gc2hvdWxkIGxlc3MgdGhhbiBmb3JjZSBpbiBub3JtYWwgZGlyZWN0aW9uXG4gICAgaWYgKGpUID4gak4pIHtcbiAgICAgIGpUID0gak47XG4gICAgfVxuXG4gICAgLy9pbXB1bHNlIGlzIGZyb20gczEgdG8gczIgKGluIG9wcG9zaXRlIGRpcmVjdGlvbiBvZiB2ZWxvY2l0eSlcbiAgICBpbXB1bHNlID0gdGFuZ2VudC5zY2FsZShqVCk7XG5cbiAgICBzMS5tVmVsb2NpdHkgPSBzMS5tVmVsb2NpdHkuc3VidHJhY3QoaW1wdWxzZS5zY2FsZShzMS5tSW52TWFzcykpO1xuICAgIHMyLm1WZWxvY2l0eSA9IHMyLm1WZWxvY2l0eS5hZGQoaW1wdWxzZS5zY2FsZShzMi5tSW52TWFzcykpO1xuICAgIHMxLm1Bbmd1bGFyVmVsb2NpdHkgLT0gUjFjcm9zc1QgKiBqVCAqIHMxLm1JbmVydGlhO1xuICAgIHMyLm1Bbmd1bGFyVmVsb2NpdHkgKz0gUjJjcm9zc1QgKiBqVCAqIHMyLm1JbmVydGlhO1xuICB9O1xuXG4gIGxldCBkcmF3Q29sbGlzaW9uSW5mbyA9IGZ1bmN0aW9uKGNvbGxpc2lvbkluZm8sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKGNvbGxpc2lvbkluZm8ubVN0YXJ0LngsIGNvbGxpc2lvbkluZm8ubVN0YXJ0LnkpO1xuICAgIGNvbnRleHQubGluZVRvKGNvbGxpc2lvbkluZm8ubUVuZC54LCBjb2xsaXNpb25JbmZvLm1FbmQueSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ29yYW5nZSc7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgfTtcblxuICBjb25zdCBjb2xsaXNpb24gPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaSwgaiwgaztcbiAgICBsZXQgY29sbGlzaW9uSW5mbyA9IG5ldyBDb2xsaXNpb25JbmZvKCk7XG4gICAgZm9yIChrID0gMDsgayA8IG1SZWxheGF0aW9uQ291bnQ7IGsrKykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuQ29yZS5tQWxsT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IHRoaXMuQ29yZS5tQWxsT2JqZWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmICh0aGlzLkNvcmUubUFsbE9iamVjdHNbaV0uYm91bmRUZXN0KHRoaXMuQ29yZS5tQWxsT2JqZWN0c1tqXSkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5Db3JlLm1BbGxPYmplY3RzW2ldLmNvbGxpc2lvblRlc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5Db3JlLm1BbGxPYmplY3RzW2pdLFxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm9cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vbWFrZSBzdXJlIHRoZSBub3JtYWwgaXMgYWx3YXlzIGZyb20gb2JqZWN0W2ldIHRvIG9iamVjdFtqXVxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uSW5mb1xuICAgICAgICAgICAgICAgICAgLmdldE5vcm1hbCgpXG4gICAgICAgICAgICAgICAgICAuZG90KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvcmUubUFsbE9iamVjdHNbal0ubUNlbnRlci5zdWJ0cmFjdChcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvcmUubUFsbE9iamVjdHNbaV0ubUNlbnRlclxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApIDwgMFxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25JbmZvLmNoYW5nZURpcigpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICB0aGlzLkNvcmUubUFsbE9iamVjdHNbaV0sXG4gICAgICAgICAgICAgICAgdGhpcy5Db3JlLm1BbGxPYmplY3RzW2pdLFxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm9cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7XG4gICAgY29sbGlzaW9uLFxuICAgIG1Qb3NpdGlvbmFsQ29ycmVjdGlvbkZsYWdcbiAgfTtcbn07XG5cbmNvbnN0IENvcmUgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG1DYW52YXMsXG4gICAgbUNvbnRleHQsXG4gICAgbVdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgbUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgbUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgbUNvbnRleHQgPSBtQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIG1DYW52YXMuaGVpZ2h0ID0gbUhlaWdodDtcbiAgbUNhbnZhcy53aWR0aCA9IG1XaWR0aDtcblxuICBsZXQgbUdyYXZpdHkgPSBuZXcgVmVjdG9yKDAsIDIwKTtcbiAgbGV0IG1Nb3ZlbWVudCA9IHRydWU7XG5cbiAgbGV0IG1DdXJyZW50VGltZSxcbiAgICBtRWxhcHNlZFRpbWUsXG4gICAgbVByZXZpb3VzVGltZSA9IERhdGUubm93KCksXG4gICAgbUxhZ1RpbWUgPSAwO1xuICBjb25zdCBrRlBTID0gNjA7IC8vIEZyYW1lcyBwZXIgc2Vjb25kXG4gIGxldCBrRnJhbWVUaW1lID0gMSAvIGtGUFM7XG4gIGxldCBtVXBkYXRlSW50ZXJ2YWxJblNlY29uZHMgPSBrRnJhbWVUaW1lO1xuICBsZXQga01QRiA9IDEwMDAgKiBrRnJhbWVUaW1lOyAvLyBNaWxsaXNlY29uZHMgcGVyIGZyYW1lLlxuICBsZXQgbUFsbE9iamVjdHMgPSBbXTtcblxuICBsZXQgdXBkYXRlVUlFY2hvID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFtQWxsT2JqZWN0cy5sZW5ndGgpIHJldHVybjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mbycpLmlubmVySFRNTCA9XG4gICAgICAnPHA+PGI+U2VsZWN0ZWQgT2JqZWN0OjwvYj46PC9wPicgK1xuICAgICAgJzx1bCBzdHlsZT1cIm1hcmdpbjotMTBweFwiPicgK1xuICAgICAgJzxsaT5JZDogJyArXG4gICAgICBnT2JqZWN0TnVtICtcbiAgICAgICc8L2xpPicgK1xuICAgICAgJzxsaT5DZW50ZXI6ICcgK1xuICAgICAgbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubUNlbnRlci54LnRvUHJlY2lzaW9uKDMpICtcbiAgICAgICcsJyArXG4gICAgICBtQWxsT2JqZWN0c1tnT2JqZWN0TnVtXS5tQ2VudGVyLnkudG9QcmVjaXNpb24oMykgK1xuICAgICAgJzwvbGk+JyArXG4gICAgICAnPGxpPkFuZ2xlOiAnICtcbiAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1BbmdsZS50b1ByZWNpc2lvbigzKSArXG4gICAgICAnPC9saT4nICtcbiAgICAgICc8bGk+VmVsb2NpdHk6ICcgK1xuICAgICAgbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubVZlbG9jaXR5LngudG9QcmVjaXNpb24oMykgK1xuICAgICAgJywnICtcbiAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1WZWxvY2l0eS55LnRvUHJlY2lzaW9uKDMpICtcbiAgICAgICc8L2xpPicgK1xuICAgICAgJzxsaT5BbmdsdWFyVmVsb2NpdHk6ICcgK1xuICAgICAgbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubUFuZ3VsYXJWZWxvY2l0eS50b1ByZWNpc2lvbigzKSArXG4gICAgICAnPC9saT4nICtcbiAgICAgICc8bGk+TWFzczogJyArXG4gICAgICAxIC8gbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubUludk1hc3MudG9QcmVjaXNpb24oMykgK1xuICAgICAgJzwvbGk+JyArXG4gICAgICAnPGxpPkZyaWN0aW9uOiAnICtcbiAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1GcmljdGlvbi50b1ByZWNpc2lvbigzKSArXG4gICAgICAnPC9saT4nICtcbiAgICAgICc8bGk+UmVzdGl0dXRpb246ICcgK1xuICAgICAgbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubVJlc3RpdHV0aW9uLnRvUHJlY2lzaW9uKDMpICtcbiAgICAgICc8L2xpPicgK1xuICAgICAgJzxsaT5Qb3NpdGlvbmFsIENvcnJlY3Rpb246ICcgK1xuICAgICAgQ29hbGVzY2UuUGh5c2ljcy5tUG9zaXRpb25hbENvcnJlY3Rpb25GbGFnICtcbiAgICAgICc8L2xpPicgK1xuICAgICAgJzxsaT5Nb3ZlbWVudDogJyArXG4gICAgICB0aGlzLkNvcmUubU1vdmVtZW50ICtcbiAgICAgICc8L2xpPicgK1xuICAgICAgJzwvdWw+IDxocj4nICtcbiAgICAgICc8cD48Yj5Db250cm9sPC9iPjogb2Ygc2VsZWN0ZWQgb2JqZWN0PC9wPicgK1xuICAgICAgJzx1bCBzdHlsZT1cIm1hcmdpbjotMTBweFwiPicgK1xuICAgICAgJzxsaT48Yj5OdW08L2I+IG9yIDxiPlVwL0Rvd24gQXJyb3c8L2I+OiBTZWxlY3QgT2JqZWN0PC9saT4nICtcbiAgICAgICc8bGk+PGI+V0FTRDwvYj4gKyA8Yj5RRTwvYj46IFBvc2l0aW9uIFtNb3ZlICsgUm90YXRlXTwvbGk+JyArXG4gICAgICAnPGxpPjxiPklKS0w8L2I+ICsgPGI+VU88L2I+OiBWZWxvY2l0aWVzIFtMaW5lYXIgKyBBbmd1bGFyXTwvbGk+JyArXG4gICAgICAnPGxpPjxiPlovWDwvYj46IE1hc3MgW0RlY3JlYXNlL0luY3JlYXNlXTwvbGk+JyArXG4gICAgICAnPGxpPjxiPkMvVjwvYj46IEZyaWN0cmlvbiBbRGVjcmVhc2UvSW5jcmVhc2VdPC9saT4nICtcbiAgICAgICc8bGk+PGI+Qi9OPC9iPjogUmVzdGl0dXRpb24gW0RlY3JlYXNlL0luY3JlYXNlXTwvbGk+JyArXG4gICAgICAnPGxpPjxiPk08L2I+OiBQb3NpdGlvbmFsIENvcnJlY3Rpb24gW09uL09mZl08L2xpPicgK1xuICAgICAgJzxsaT48Yj4sPC9iPjogTW92ZW1lbnQgW09uL09mZl08L2xpPicgK1xuICAgICAgJzwvdWw+IDxocj4nICtcbiAgICAgICc8Yj5GL0c8L2I+OiBTcGF3biBbUmVjdGFuZ2xlL0NpcmNsZV0gYXQgc2VsZWN0ZWQgb2JqZWN0JyArXG4gICAgICAnPHA+PGI+SDwvYj46IEV4Y2l0ZSBhbGwgb2JqZWN0czwvcD4nICtcbiAgICAgICc8cD48Yj5SPC9iPjogUmVzZXQgU3lzdGVtPC9wPicgK1xuICAgICAgJzxocj4nO1xuICB9O1xuXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgbUNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIG1XaWR0aCwgbUhlaWdodCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtQWxsT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgbUNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnYmx1ZSc7XG4gICAgICBpZiAoaSA9PT0gZ09iamVjdE51bSkge1xuICAgICAgICBtQ29udGV4dC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuICAgICAgfVxuICAgICAgbUFsbE9iamVjdHNbaV0uZHJhdyhtQ29udGV4dCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1BbGxPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBtQWxsT2JqZWN0c1tpXS51cGRhdGUobUNvbnRleHQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBydW5HYW1lTG9vcCA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcnVuR2FtZUxvb3AoKSk7XG5cbiAgICBtQ3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIG1FbGFwc2VkVGltZSA9IG1DdXJyZW50VGltZSAtIG1QcmV2aW91c1RpbWU7XG4gICAgbVByZXZpb3VzVGltZSA9IG1DdXJyZW50VGltZTtcbiAgICBtTGFnVGltZSArPSBtRWxhcHNlZFRpbWU7XG5cbiAgICB1cGRhdGVVSUVjaG8oKTtcbiAgICBkcmF3KCk7XG5cbiAgICB3aGlsZSAobUxhZ1RpbWUgPj0ga01QRikge1xuICAgICAgbUxhZ1RpbWUgLT0ga01QRjtcbiAgICAgIENvYWxlc2NlLlBoeXNpY3MoKS5jb2xsaXNpb24oKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgaW5pdGlhbGl6ZUVuZ2luZUNvcmUgPSBmdW5jdGlvbigpIHtcbiAgICBydW5HYW1lTG9vcCgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZUVuZ2luZUNvcmUsXG4gICAgbUFsbE9iamVjdHMsXG4gICAgbVdpZHRoLFxuICAgIG1IZWlnaHQsXG4gICAgbUNvbnRleHQsXG4gICAgbUdyYXZpdHksXG4gICAgbVVwZGF0ZUludGVydmFsSW5TZWNvbmRzLFxuICAgIG1Nb3ZlbWVudFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IENvYWxlc2NlID0geyBDb3JlOiBDb3JlKCksIFBoeXNpY3M6IFBoeXNpY3MoKSB9O1xuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9uSW5mbyB7XG4gIG1EZXB0aDtcbiAgbU5vcm1hbDtcbiAgbVN0YXJ0O1xuICBtRW5kO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1EZXB0aCA9IDA7XG4gICAgdGhpcy5tTm9ybWFsID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICB0aGlzLm1TdGFydCA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgdGhpcy5tRW5kID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlcHRoIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzIGhvdyBtdWNoIHBlbmV0cmF0aW9uXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0RGVwdGgocykge1xuICAgIHRoaXMubURlcHRoID0gcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIG5vcm1hbCBvZiB0aGUgQ29sbGlzaW9uSW5mb1xuICAgKiBAbWVtYmVyT2YgQ29sbGlzaW9uSW5mb1xuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcyBWZWN0b3IgdXBvbiB3aGljaCBjb2xsaXNpb24gaW50ZXJwZW5ldHJhdGVzXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0Tm9ybWFsKHMpIHtcbiAgICB0aGlzLm1Ob3JtYWwgPSBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGVwdGggb2YgdGhlIENvbGxpc2lvbkluZm9cbiAgICogQG1lbWJlck9mIENvbGxpc2lvbkluZm9cbiAgICogQHJldHVybnMge051bWJlcn0gaG93IG11Y2ggcGVuZXRyYXRpb25cbiAgICovXG4gIGdldERlcHRoKCkge1xuICAgIHJldHVybiB0aGlzLm1EZXB0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGRlcHRoIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFZlY3RvciB1cG9uIHdoaWNoIGNvbGxpc2lvbiBpbnRlcnBlbmV0cmF0ZXNcbiAgICovXG4gIGdldE5vcm1hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5tTm9ybWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYWxsIHZhbHVlIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkIHRoZSBkZXB0aCBvZiB0aGUgQ29sbGlzaW9uSW5mb1xuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbiB0aGUgbm9ybWFsIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBzIHRoZSBzdGFydHBvaW50IG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0SW5mbyhkLCBuLCBzKSB7XG4gICAgdGhpcy5tRGVwdGggPSBkO1xuICAgIHRoaXMubU5vcm1hbCA9IG47XG4gICAgdGhpcy5tU3RhcnQgPSBzO1xuICAgIHRoaXMubUVuZCA9IHMuYWRkKG4uc2NhbGUoZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgZGlyZWN0aW9uIG9mIG5vcm1hbFxuICAgKiBAbWVtYmVyT2YgQ29sbGlzaW9uSW5mb1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNoYW5nZURpcigpIHtcbiAgICB0aGlzLm1Ob3JtYWwgPSB0aGlzLm1Ob3JtYWwuc2NhbGUoLTEpO1xuICAgIHZhciBuID0gdGhpcy5tU3RhcnQ7XG4gICAgdGhpcy5tU3RhcnQgPSB0aGlzLm1FbmQ7XG4gICAgdGhpcy5tRW5kID0gbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuaW1wb3J0IHsgQ29hbGVzY2UgfSBmcm9tICcuLi8uLi9lbmdpbmUuY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBSaWdpZFNoYXBlIHtcbiAgbW92ZTtcbiAgcm90YXRlO1xuICBtQ2VudGVyO1xuICBtSW52TWFzcztcbiAgbUZyaWN0aW9uO1xuICBtUmVzdGl0dXRpb247XG4gIG1JbmVydGlhO1xuICBtQm91bmRSYWRpdXM7XG4gIG1Bbmd1bGFyVmVsb2NpdHk7XG4gIG1Bbmd1bGFyQWNjZWxlcmF0aW9uO1xuICBtVmVsb2NpdHk7XG4gIG1BbmdsZTtcbiAgbUFjY2VsZXJhdGlvbjtcblxuICBjb25zdHJ1Y3RvcihjZW50ZXIsIG1hc3MsIGZyaWN0aW9uLCByZXN0aXR1dGlvbikge1xuICAgIHRoaXMubUNlbnRlciA9IGNlbnRlcjtcbiAgICB0aGlzLm1JbmVydGlhID0gMDtcbiAgICBpZiAobWFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1JbnZNYXNzID0gbWFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tSW52TWFzcyA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5tRnJpY3Rpb24gPSBmcmljdGlvbiAhPT0gdW5kZWZpbmVkID8gZnJpY3Rpb24gOiAwLjg7XG4gICAgdGhpcy5tUmVzdGl0dXRpb24gPSByZXN0aXR1dGlvbiAhPT0gdW5kZWZpbmVkID8gcmVzdGl0dXRpb24gOiAwLjI7XG4gICAgdGhpcy5tVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDAsIDApO1xuXG4gICAgaWYgKHRoaXMubUludk1hc3MgIT09IDApIHtcbiAgICAgIHRoaXMubUludk1hc3MgPSAxIC8gdGhpcy5tSW52TWFzcztcbiAgICAgIHRoaXMubUFjY2VsZXJhdGlvbiA9IENvYWxlc2NlLkNvcmUubUdyYXZpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubUFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgfVxuXG4gICAgLy9hbmdsZVxuICAgIHRoaXMubUFuZ2xlID0gMDtcblxuICAgIC8vbmVnZXRpdmUtLSBjbG9ja3dpc2VcbiAgICAvL3Bvc3RpdmUtLSBjb3VudGVyY2xvY2t3aXNlXG4gICAgdGhpcy5tQW5ndWxhclZlbG9jaXR5ID0gMDtcblxuICAgIHRoaXMubUFuZ3VsYXJBY2NlbGVyYXRpb24gPSAwO1xuXG4gICAgdGhpcy5tQm91bmRSYWRpdXMgPSAwO1xuXG4gICAgQ29hbGVzY2UuQ29yZS5tQWxsT2JqZWN0cy5wdXNoKHRoaXMpO1xuICAgIGNvbnNvbGUubG9nKENvYWxlc2NlLkNvcmUubUFsbE9iamVjdHMpO1xuICB9XG5cbiAgdXBkYXRlTWFzcyhkZWx0YSkge1xuICAgIHZhciBtYXNzO1xuICAgIGlmICh0aGlzLm1JbnZNYXNzICE9PSAwKSB7XG4gICAgICBtYXNzID0gMSAvIHRoaXMubUludk1hc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hc3MgPSAwO1xuICAgIH1cblxuICAgIG1hc3MgKz0gZGVsdGE7XG4gICAgaWYgKG1hc3MgPD0gMCkge1xuICAgICAgdGhpcy5tSW52TWFzcyA9IDA7XG4gICAgICB0aGlzLm1WZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgICB0aGlzLm1BY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgICAgdGhpcy5tQW5ndWxhclZlbG9jaXR5ID0gMDtcbiAgICAgIHRoaXMubUFuZ3VsYXJBY2NlbGVyYXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1JbnZNYXNzID0gMSAvIG1hc3M7XG4gICAgICB0aGlzLm1BY2NlbGVyYXRpb24gPSBDb2FsZXNjZS5Db3JlLm1HcmF2aXR5O1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUluZXJ0aWEoKTtcbiAgfVxuXG4gIHVwZGF0ZUluZXJ0aWEoKSB7XG4gICAgLy8gc3ViY2xhc3MgbXVzdCBkZWZpbmUgdGhpcy5cbiAgICAvLyBtdXN0IHdvcmsgd2l0aCBpbnZlcnRlZCB0aGlzLm1JbnZNYXNzXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKENvYWxlc2NlLkNvcmUubU1vdmVtZW50KSB7XG4gICAgICB2YXIgZHQgPSBDb2FsZXNjZS5Db3JlLm1VcGRhdGVJbnRlcnZhbEluU2Vjb25kcztcbiAgICAgIC8vdiArPSBhKnRcbiAgICAgIHRoaXMubVZlbG9jaXR5ID0gdGhpcy5tVmVsb2NpdHkuYWRkKHRoaXMubUFjY2VsZXJhdGlvbi5zY2FsZShkdCkpO1xuICAgICAgLy9zICs9IHYqdFxuICAgICAgdGhpcy5tb3ZlKHRoaXMubVZlbG9jaXR5LnNjYWxlKGR0KSk7XG5cbiAgICAgIHRoaXMubUFuZ3VsYXJWZWxvY2l0eSArPSB0aGlzLm1Bbmd1bGFyQWNjZWxlcmF0aW9uICogZHQ7XG4gICAgICB0aGlzLnJvdGF0ZSh0aGlzLm1Bbmd1bGFyVmVsb2NpdHkgKiBkdCk7XG4gICAgfVxuICAgIHZhciB3aWR0aCA9IENvYWxlc2NlLkNvcmUubVdpZHRoO1xuICAgIHZhciBoZWlnaHQgPSBDb2FsZXNjZS5Db3JlLm1IZWlnaHQ7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tQ2VudGVyLnggPCAwIHx8XG4gICAgICB0aGlzLm1DZW50ZXIueCA+IHdpZHRoIHx8XG4gICAgICB0aGlzLm1DZW50ZXIueSA8IDAgfHxcbiAgICAgIHRoaXMubUNlbnRlci55ID4gaGVpZ2h0XG4gICAgKSB7XG4gICAgICB2YXIgaW5kZXggPSBDb2FsZXNjZS5Db3JlLm1BbGxPYmplY3RzLmluZGV4T2YodGhpcyk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkgQ29hbGVzY2UuQ29yZS5tQWxsT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGJvdW5kVGVzdChvdGhlclNoYXBlKSB7XG4gICAgdmFyIHZGcm9tMXRvMiA9IG90aGVyU2hhcGUubUNlbnRlci5zdWJ0cmFjdCh0aGlzLm1DZW50ZXIpO1xuICAgIHZhciByU3VtID0gdGhpcy5tQm91bmRSYWRpdXMgKyBvdGhlclNoYXBlLm1Cb3VuZFJhZGl1cztcbiAgICB2YXIgZGlzdCA9IHZGcm9tMXRvMi5sZW5ndGgoKTtcbiAgICBpZiAoZGlzdCA+IHJTdW0pIHtcbiAgICAgIC8vbm90IG92ZXJsYXBwaW5nXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJleHBvcnQgeyBDb2FsZXNjZSB9IGZyb20gJy4vZW5naW5lLmNvcmUnO1xuZXhwb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9tb2R1bGUvcmlnaWQvZW5naW5lLnNoYXBlLnJlY3RhbmdsZSc7XG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL21vZHVsZS9yaWdpZC9lbmdpbmUuc2hhcGUuY2lyY2xlJztcbmV4cG9ydCB7IFZlY3RvciB9IGZyb20gJy4vbW9kdWxlL3ZlY3Rvci9lbmdpbmUudmVjdG9yJztcbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4uL3ZlY3Rvci9lbmdpbmUudmVjdG9yJztcbmltcG9ydCB7IFJpZ2lkU2hhcGUgfSBmcm9tICcuL2VuZ2luZS5yaWdpZCc7XG5pbXBvcnQgeyBTdXBwb3J0U3RydWN0IH0gZnJvbSAnLi4vLi4vc3VwZXJzdHJ1Y3QnO1xuaW1wb3J0IHsgQ29sbGlzaW9uSW5mbyB9IGZyb20gJy4uL2xvZ2dlci9jb2xsaXNpb24uaW5mbyc7XG5cbmNvbnN0IGNvbGxpc2lvbkluZm9SMSA9IG5ldyBDb2xsaXNpb25JbmZvKCk7XG5jb25zdCBjb2xsaXNpb25JbmZvUjIgPSBuZXcgQ29sbGlzaW9uSW5mbygpO1xuXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgUmlnaWRTaGFwZSB7XG4gIG1UeXBlO1xuICBtV2lkdGg7XG4gIHRtcFN1cHBvcnQ7XG4gIG1IZWlnaHQ7XG4gIG1Cb3VuZFJhZGl1cztcbiAgbVZlcnRleDtcbiAgbUZhY2VOb3JtYWw7XG4gIGNvbnN0cnVjdG9yKGNlbnRlciwgd2lkdGgsIGhlaWdodCwgbWFzcywgZnJpY3Rpb24sIHJlc3RpdHV0aW9uKSB7XG4gICAgc3VwZXIoY2VudGVyLCB3aWR0aCwgaGVpZ2h0LCBtYXNzKTtcbiAgICB0aGlzLnRtcFN1cHBvcnQgPSBuZXcgU3VwcG9ydFN0cnVjdCgpO1xuXG4gICAgdGhpcy5tVHlwZSA9ICdSZWN0YW5nbGUnO1xuICAgIHRoaXMubVdpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5tSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMubUJvdW5kUmFkaXVzID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpIC8gMjtcbiAgICB0aGlzLm1WZXJ0ZXggPSBbXTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsID0gW107XG5cbiAgICAvLzAtLVRvcExlZnQ7MS0tVG9wUmlnaHQ7Mi0tQm90dG9tUmlnaHQ7My0tQm90dG9tTGVmdFxuICAgIHRoaXMubVZlcnRleFswXSA9IG5ldyBWZWN0b3IoY2VudGVyLnggLSB3aWR0aCAvIDIsIGNlbnRlci55IC0gaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5tVmVydGV4WzFdID0gbmV3IFZlY3RvcihjZW50ZXIueCArIHdpZHRoIC8gMiwgY2VudGVyLnkgLSBoZWlnaHQgLyAyKTtcbiAgICB0aGlzLm1WZXJ0ZXhbMl0gPSBuZXcgVmVjdG9yKGNlbnRlci54ICsgd2lkdGggLyAyLCBjZW50ZXIueSArIGhlaWdodCAvIDIpO1xuICAgIHRoaXMubVZlcnRleFszXSA9IG5ldyBWZWN0b3IoY2VudGVyLnggLSB3aWR0aCAvIDIsIGNlbnRlci55ICsgaGVpZ2h0IC8gMik7XG5cbiAgICAvLzAtLVRvcDsxLS1SaWdodDsyLS1Cb3R0b207My0tTGVmdFxuICAgIC8vbUZhY2VOb3JtYWwgaXMgbm9ybWFsIG9mIGZhY2UgdG93YXJkIG91dHNpZGUgb2YgcmVjdGFuZ2xlXG4gICAgdGhpcy5tRmFjZU5vcm1hbFswXSA9IHRoaXMubVZlcnRleFsxXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbMl0pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMF0gPSB0aGlzLm1GYWNlTm9ybWFsWzBdLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMV0gPSB0aGlzLm1WZXJ0ZXhbMl0uc3VidHJhY3QodGhpcy5tVmVydGV4WzNdKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzFdID0gdGhpcy5tRmFjZU5vcm1hbFsxXS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzJdID0gdGhpcy5tVmVydGV4WzNdLnN1YnRyYWN0KHRoaXMubVZlcnRleFswXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFsyXSA9IHRoaXMubUZhY2VOb3JtYWxbMl0ubm9ybWFsaXplKCk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFszXSA9IHRoaXMubVZlcnRleFswXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbMV0pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbM10gPSB0aGlzLm1GYWNlTm9ybWFsWzNdLm5vcm1hbGl6ZSgpO1xuXG4gICAgdGhpcy51cGRhdGVJbmVydGlhKCk7XG4gIH1cblxuICByb3RhdGUoYW5nbGUpIHtcbiAgICB0aGlzLm1BbmdsZSArPSBhbmdsZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubVZlcnRleC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5tVmVydGV4W2ldID0gdGhpcy5tVmVydGV4W2ldLnJvdGF0ZSh0aGlzLm1DZW50ZXIsIGFuZ2xlKTtcbiAgICB9XG4gICAgdGhpcy5tRmFjZU5vcm1hbFswXSA9IHRoaXMubVZlcnRleFsxXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbMl0pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMF0gPSB0aGlzLm1GYWNlTm9ybWFsWzBdLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMV0gPSB0aGlzLm1WZXJ0ZXhbMl0uc3VidHJhY3QodGhpcy5tVmVydGV4WzNdKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzFdID0gdGhpcy5tRmFjZU5vcm1hbFsxXS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzJdID0gdGhpcy5tVmVydGV4WzNdLnN1YnRyYWN0KHRoaXMubVZlcnRleFswXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFsyXSA9IHRoaXMubUZhY2VOb3JtYWxbMl0ubm9ybWFsaXplKCk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFszXSA9IHRoaXMubVZlcnRleFswXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbMV0pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbM10gPSB0aGlzLm1GYWNlTm9ybWFsWzNdLm5vcm1hbGl6ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmluZEF4aXNMZWFzdFBlbmV0cmF0aW9uKG90aGVyUmVjdCwgY29sbGlzaW9uSW5mbykge1xuICAgIHZhciBuO1xuICAgIHZhciBzdXBwb3J0UG9pbnQ7XG5cbiAgICB2YXIgYmVzdERpc3RhbmNlID0gOTk5OTk5O1xuICAgIHZhciBiZXN0SW5kZXggPSBudWxsO1xuXG4gICAgdmFyIGhhc1N1cHBvcnQgPSB0cnVlO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlIChoYXNTdXBwb3J0ICYmIGkgPCB0aGlzLm1GYWNlTm9ybWFsLmxlbmd0aCkge1xuICAgICAgLy8gUmV0cmlldmUgYSBmYWNlIG5vcm1hbCBmcm9tIEFcbiAgICAgIG4gPSB0aGlzLm1GYWNlTm9ybWFsW2ldO1xuXG4gICAgICAvLyB1c2UgLW4gYXMgZGlyZWN0aW9uIGFuZCB0aGUgdmVjdGV4IG9uIGVkZ2UgaSBhcyBwb2ludCBvbiBlZGdlXG4gICAgICB2YXIgZGlyID0gbi5zY2FsZSgtMSk7XG4gICAgICB2YXIgcHRPbkVkZ2UgPSB0aGlzLm1WZXJ0ZXhbaV07XG4gICAgICAvLyBmaW5kIHRoZSBzdXBwb3J0IG9uIEJcbiAgICAgIC8vIHRoZSBwb2ludCBoYXMgbG9uZ2VzdCBkaXN0YW5jZSB3aXRoIGVkZ2UgaVxuICAgICAgb3RoZXJSZWN0LmZpbmRTdXBwb3J0UG9pbnQoZGlyLCBwdE9uRWRnZSk7XG4gICAgICBoYXNTdXBwb3J0ID0gdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnQgIT09IG51bGw7XG5cbiAgICAgIC8vZ2V0IHRoZSBzaG9ydGVzdCBzdXBwb3J0IHBvaW50IGRlcHRoXG4gICAgICBpZiAoaGFzU3VwcG9ydCAmJiB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludERpc3QgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgYmVzdERpc3RhbmNlID0gdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnREaXN0O1xuICAgICAgICBiZXN0SW5kZXggPSBpO1xuICAgICAgICBzdXBwb3J0UG9pbnQgPSB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludDtcbiAgICAgIH1cbiAgICAgIGkgPSBpICsgMTtcbiAgICB9XG4gICAgaWYgKGhhc1N1cHBvcnQpIHtcbiAgICAgIC8vYWxsIGZvdXIgZGlyZWN0aW9ucyBoYXZlIHN1cHBvcnQgcG9pbnRcbiAgICAgIHZhciBiZXN0VmVjID0gdGhpcy5tRmFjZU5vcm1hbFtiZXN0SW5kZXhdLnNjYWxlKGJlc3REaXN0YW5jZSk7XG4gICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgIGJlc3REaXN0YW5jZSxcbiAgICAgICAgdGhpcy5tRmFjZU5vcm1hbFtiZXN0SW5kZXhdLFxuICAgICAgICBzdXBwb3J0UG9pbnQuYWRkKGJlc3RWZWMpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gaGFzU3VwcG9ydDtcbiAgfVxuXG4gIGZpbmRTdXBwb3J0UG9pbnQoZGlyLCBwdE9uRWRnZSkge1xuICAgIC8vdGhlIGxvbmdlc3QgcHJvamVjdCBsZW5ndGhcbiAgICB2YXIgdlRvRWRnZTtcbiAgICB2YXIgcHJvamVjdGlvbjtcblxuICAgIHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50RGlzdCA9IC05OTk5OTk5O1xuICAgIHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50ID0gbnVsbDtcblxuICAgIC8vY2hlY2sgZWFjaCBWZWN0b3Igb2Ygb3RoZXIgb2JqZWN0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1WZXJ0ZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZUb0VkZ2UgPSB0aGlzLm1WZXJ0ZXhbaV0uc3VidHJhY3QocHRPbkVkZ2UpO1xuICAgICAgcHJvamVjdGlvbiA9IHZUb0VkZ2UuZG90KGRpcik7XG5cbiAgICAgIC8vZmluZCB0aGUgbG9uZ2VzdCBkaXN0YW5jZSB3aXRoIGNlcnRhaW4gZWRnZVxuICAgICAgLy9kaXIgaXMgLW4gZGlyZWN0aW9uLCBzbyB0aGUgZGlzdGFuY2Ugc2hvdWxkIGJlIHBvc2l0aXZlXG4gICAgICBpZiAocHJvamVjdGlvbiA+IDAgJiYgcHJvamVjdGlvbiA+IHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50RGlzdCkge1xuICAgICAgICB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludCA9IHRoaXMubVZlcnRleFtpXTtcbiAgICAgICAgdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnREaXN0ID0gcHJvamVjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb2xsaWRlZFJlY3RSZWN0KHIxLCByMiwgY29sbGlzaW9uSW5mbykge1xuICAgIHZhciBzdGF0dXMxID0gZmFsc2U7XG4gICAgdmFyIHN0YXR1czIgPSBmYWxzZTtcblxuICAgIC8vZmluZCBBeGlzIG9mIFNlcGFyYXRpb24gZm9yIGJvdGggcmVjdGFuZ2xlXG4gICAgc3RhdHVzMSA9IHIxLmZpbmRBeGlzTGVhc3RQZW5ldHJhdGlvbihyMiwgY29sbGlzaW9uSW5mb1IxKTtcblxuICAgIGlmIChzdGF0dXMxKSB7XG4gICAgICBzdGF0dXMyID0gcjIuZmluZEF4aXNMZWFzdFBlbmV0cmF0aW9uKHIxLCBjb2xsaXNpb25JbmZvUjIpO1xuICAgICAgaWYgKHN0YXR1czIpIHtcbiAgICAgICAgLy9pZiBib3RoIG9mIHJlY3RhbmdsZXMgYXJlIG92ZXJsYXBwaW5nLCBjaG9vc2UgdGhlIHNob3J0ZXIgbm9ybWFsIGFzIHRoZSBub3JtYWxcbiAgICAgICAgaWYgKGNvbGxpc2lvbkluZm9SMS5nZXREZXB0aCgpIDwgY29sbGlzaW9uSW5mb1IyLmdldERlcHRoKCkpIHtcbiAgICAgICAgICB2YXIgZGVwdGhWZWMgPSBjb2xsaXNpb25JbmZvUjFcbiAgICAgICAgICAgIC5nZXROb3JtYWwoKVxuICAgICAgICAgICAgLnNjYWxlKGNvbGxpc2lvbkluZm9SMS5nZXREZXB0aCgpKTtcbiAgICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgICBjb2xsaXNpb25JbmZvUjEuZ2V0RGVwdGgoKSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMS5nZXROb3JtYWwoKSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMS5tU3RhcnQuc3VidHJhY3QoZGVwdGhWZWMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgICBjb2xsaXNpb25JbmZvUjIuZ2V0RGVwdGgoKSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMi5nZXROb3JtYWwoKS5zY2FsZSgtMSksXG4gICAgICAgICAgICBjb2xsaXNpb25JbmZvUjIubVN0YXJ0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzMSAmJiBzdGF0dXMyO1xuICB9XG5cbiAgY29sbGlkZWRSZWN0Q2lyYyhvdGhlckNpciwgY29sbGlzaW9uSW5mbykge1xuICAgIHZhciBpbnNpZGUgPSB0cnVlO1xuICAgIHZhciBiZXN0RGlzdGFuY2UgPSAtOTk5OTk7XG4gICAgdmFyIG5lYXJlc3RFZGdlID0gMDtcbiAgICB2YXIgaSwgdjtcbiAgICB2YXIgY2lyYzJQb3MsIHByb2plY3Rpb247XG4gICAgZm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgLy9maW5kIHRoZSBuZWFyZXN0IGZhY2UgZm9yIGNlbnRlciBvZiBjaXJjbGVcbiAgICAgIGNpcmMyUG9zID0gb3RoZXJDaXIubUNlbnRlcjtcbiAgICAgIHYgPSBjaXJjMlBvcy5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbaV0pO1xuICAgICAgcHJvamVjdGlvbiA9IHYuZG90KHRoaXMubUZhY2VOb3JtYWxbaV0pO1xuICAgICAgaWYgKHByb2plY3Rpb24gPiAwKSB7XG4gICAgICAgIC8vaWYgdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgb3V0c2lkZSBvZiByZWN0YW5nbGVcbiAgICAgICAgYmVzdERpc3RhbmNlID0gcHJvamVjdGlvbjtcbiAgICAgICAgbmVhcmVzdEVkZ2UgPSBpO1xuICAgICAgICBpbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocHJvamVjdGlvbiA+IGJlc3REaXN0YW5jZSkge1xuICAgICAgICBiZXN0RGlzdGFuY2UgPSBwcm9qZWN0aW9uO1xuICAgICAgICBuZWFyZXN0RWRnZSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkaXMsIG5vcm1hbCwgcmFkaXVzVmVjO1xuXG4gICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgIC8vdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgb3V0c2lkZSBvZiByZWN0YW5nbGVcblxuICAgICAgLy92MSBpcyBmcm9tIGxlZnQgdmVydGV4IG9mIGZhY2UgdG8gY2VudGVyIG9mIGNpcmNsZVxuICAgICAgLy92MiBpcyBmcm9tIGxlZnQgdmVydGV4IG9mIGZhY2UgdG8gcmlnaHQgdmVydGV4IG9mIGZhY2VcbiAgICAgIHZhciB2MSA9IGNpcmMyUG9zLnN1YnRyYWN0KHRoaXMubVZlcnRleFtuZWFyZXN0RWRnZV0pO1xuICAgICAgdmFyIHYyID0gdGhpcy5tVmVydGV4WyhuZWFyZXN0RWRnZSArIDEpICUgNF0uc3VidHJhY3QoXG4gICAgICAgIHRoaXMubVZlcnRleFtuZWFyZXN0RWRnZV1cbiAgICAgICk7XG5cbiAgICAgIHZhciBkb3QgPSB2MS5kb3QodjIpO1xuXG4gICAgICBpZiAoZG90IDwgMCkge1xuICAgICAgICAvL3RoZSBjZW50ZXIgb2YgY2lyY2xlIGlzIGluIGNvcm5lciByZWdpb24gb2YgbVZlcnRleFtuZWFyZXN0RWRnZV1cbiAgICAgICAgZGlzID0gdjEubGVuZ3RoKCk7XG4gICAgICAgIC8vY29tcGFyZSB0aGUgZGlzdGFuY2Ugd2l0aCByYWRpdW0gdG8gZGVjaWRlIGNvbGxpc2lvblxuICAgICAgICBpZiAoZGlzID4gb3RoZXJDaXIubVJhZGl1cykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vcm1hbCA9IHYxLm5vcm1hbGl6ZSgpO1xuICAgICAgICByYWRpdXNWZWMgPSBub3JtYWwuc2NhbGUoLW90aGVyQ2lyLm1SYWRpdXMpO1xuICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgb3RoZXJDaXIubVJhZGl1cyAtIGRpcyxcbiAgICAgICAgICBub3JtYWwsXG4gICAgICAgICAgY2lyYzJQb3MuYWRkKHJhZGl1c1ZlYylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgaW4gY29ybmVyIHJlZ2lvbiBvZiBtVmVydGV4W25lYXJlc3RFZGdlKzFdXG5cbiAgICAgICAgLy92MSBpcyBmcm9tIHJpZ2h0IHZlcnRleCBvZiBmYWNlIHRvIGNlbnRlciBvZiBjaXJjbGVcbiAgICAgICAgLy92MiBpcyBmcm9tIHJpZ2h0IHZlcnRleCBvZiBmYWNlIHRvIGxlZnQgdmVydGV4IG9mIGZhY2VcbiAgICAgICAgdjEgPSBjaXJjMlBvcy5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbKG5lYXJlc3RFZGdlICsgMSkgJSA0XSk7XG4gICAgICAgIHYyID0gdjIuc2NhbGUoLTEpO1xuICAgICAgICBkb3QgPSB2MS5kb3QodjIpO1xuICAgICAgICBpZiAoZG90IDwgMCkge1xuICAgICAgICAgIGRpcyA9IHYxLmxlbmd0aCgpO1xuICAgICAgICAgIC8vY29tcGFyZSB0aGUgZGlzdGFuY2Ugd2l0aCByYWRpdW0gdG8gZGVjaWRlIGNvbGxpc2lvblxuICAgICAgICAgIGlmIChkaXMgPiBvdGhlckNpci5tUmFkaXVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vcm1hbCA9IHYxLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgIHJhZGl1c1ZlYyA9IG5vcm1hbC5zY2FsZSgtb3RoZXJDaXIubVJhZGl1cyk7XG4gICAgICAgICAgY29sbGlzaW9uSW5mby5zZXRJbmZvKFxuICAgICAgICAgICAgb3RoZXJDaXIubVJhZGl1cyAtIGRpcyxcbiAgICAgICAgICAgIG5vcm1hbCxcbiAgICAgICAgICAgIGNpcmMyUG9zLmFkZChyYWRpdXNWZWMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL3RoZSBjZW50ZXIgb2YgY2lyY2xlIGlzIGluIGZhY2UgcmVnaW9uIG9mIGZhY2VbbmVhcmVzdEVkZ2VdXG4gICAgICAgICAgaWYgKGJlc3REaXN0YW5jZSA8IG90aGVyQ2lyLm1SYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1c1ZlYyA9IHRoaXMubUZhY2VOb3JtYWxbbmVhcmVzdEVkZ2VdLnNjYWxlKG90aGVyQ2lyLm1SYWRpdXMpO1xuICAgICAgICAgICAgY29sbGlzaW9uSW5mby5zZXRJbmZvKFxuICAgICAgICAgICAgICBvdGhlckNpci5tUmFkaXVzIC0gYmVzdERpc3RhbmNlLFxuICAgICAgICAgICAgICB0aGlzLm1GYWNlTm9ybWFsW25lYXJlc3RFZGdlXSxcbiAgICAgICAgICAgICAgY2lyYzJQb3Muc3VidHJhY3QocmFkaXVzVmVjKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL3RoZSBjZW50ZXIgb2YgY2lyY2xlIGlzIGluc2lkZSBvZiByZWN0YW5nbGVcbiAgICAgIHJhZGl1c1ZlYyA9IHRoaXMubUZhY2VOb3JtYWxbbmVhcmVzdEVkZ2VdLnNjYWxlKG90aGVyQ2lyLm1SYWRpdXMpO1xuICAgICAgY29sbGlzaW9uSW5mby5zZXRJbmZvKFxuICAgICAgICBvdGhlckNpci5tUmFkaXVzIC0gYmVzdERpc3RhbmNlLFxuICAgICAgICB0aGlzLm1GYWNlTm9ybWFsW25lYXJlc3RFZGdlXSxcbiAgICAgICAgY2lyYzJQb3Muc3VidHJhY3QocmFkaXVzVmVjKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb2xsaXNpb25UZXN0KG90aGVyU2hhcGUsIGNvbGxpc2lvbkluZm8pIHtcbiAgICB2YXIgc3RhdHVzID0gZmFsc2U7XG4gICAgaWYgKG90aGVyU2hhcGUubVR5cGUgPT09ICdDaXJjbGUnKSB7XG4gICAgICBzdGF0dXMgPSB0aGlzLmNvbGxpZGVkUmVjdENpcmMob3RoZXJTaGFwZSwgY29sbGlzaW9uSW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IHRoaXMuY29sbGlkZWRSZWN0UmVjdCh0aGlzLCBvdGhlclNoYXBlLCBjb2xsaXNpb25JbmZvKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1cztcbiAgfVxuXG4gIG1vdmUodikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tVmVydGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLm1WZXJ0ZXhbaV0gPSB0aGlzLm1WZXJ0ZXhbaV0uYWRkKHYpO1xuICAgIH1cbiAgICB0aGlzLm1DZW50ZXIgPSB0aGlzLm1DZW50ZXIuYWRkKHYpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLm1WZXJ0ZXhbMF0ueCwgdGhpcy5tVmVydGV4WzBdLnkpO1xuICAgIGNvbnRleHQucm90YXRlKHRoaXMubUFuZ2xlKTtcbiAgICBjb250ZXh0LnN0cm9rZVJlY3QoMCwgMCwgdGhpcy5tV2lkdGgsIHRoaXMubUhlaWdodCk7XG5cbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHVwZGF0ZUluZXJ0aWEoKSB7XG4gICAgLy8gRXhwZWN0IHRoaXMubUludk1hc3MgdG8gYmUgYWxyZWFkeSBpbnZlcnRlZCFcbiAgICBpZiAodGhpcy5tSW52TWFzcyA9PT0gMCkge1xuICAgICAgdGhpcy5tSW5lcnRpYSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAvLyAgIGluZXJ0aWE9bWFzcyp3aWR0aF4yK2hlaWdodF4yXG4gICAgICB0aGlzLm1JbmVydGlhID1cbiAgICAgICAgKCgxIC8gdGhpcy5tSW52TWFzcykgKlxuICAgICAgICAgICh0aGlzLm1XaWR0aCAqIHRoaXMubVdpZHRoICsgdGhpcy5tSGVpZ2h0ICogdGhpcy5tSGVpZ2h0KSkgL1xuICAgICAgICAxMjtcbiAgICAgIHRoaXMubUluZXJ0aWEgPSAxIC8gdGhpcy5tSW5lcnRpYTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdXBwb3J0U3RydWN0IHtcbiAgbVN1cHBvcnRQb2ludERpc3Q7XG4gIG1TdXBwb3J0UG9pbnQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubVN1cHBvcnRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5tU3VwcG9ydFBvaW50RGlzdCA9IDA7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuaW1wb3J0IHsgUmlnaWRTaGFwZSB9IGZyb20gJy4vZW5naW5lLnJpZ2lkJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIFJpZ2lkU2hhcGUge1xuICBtVHlwZTtcbiAgbVJhZGl1cztcbiAgbUJvdW5kUmFkaXVzO1xuICBtU3RhcnRwb2ludDtcbiAgY29uc3RydWN0b3IoY2VudGVyLCByYWRpdXMsIG1hc3MsIGZyaWN0aW9uLCByZXN0aXR1dGlvbikge1xuICAgIHN1cGVyKGNlbnRlciwgcmFkaXVzLCBtYXNzLCBmcmljdGlvbik7XG4gICAgdGhpcy5tVHlwZSA9ICdDaXJjbGUnO1xuICAgIHRoaXMubVJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLm1Cb3VuZFJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLm1TdGFydHBvaW50ID0gbmV3IFZlY3RvcihjZW50ZXIueCwgY2VudGVyLnkgLSByYWRpdXMpO1xuICAgIHRoaXMudXBkYXRlSW5lcnRpYSgpO1xuICB9XG5cbiAgbW92ZShzKSB7XG4gICAgdGhpcy5tU3RhcnRwb2ludCA9IHRoaXMubVN0YXJ0cG9pbnQuYWRkKHMpO1xuICAgIHRoaXMubUNlbnRlciA9IHRoaXMubUNlbnRlci5hZGQocyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgLy9kcmF3IGEgY2lyY2xlXG4gICAgY29udGV4dC5hcmMoXG4gICAgICB0aGlzLm1DZW50ZXIueCxcbiAgICAgIHRoaXMubUNlbnRlci55LFxuICAgICAgdGhpcy5tUmFkaXVzLFxuICAgICAgMCxcbiAgICAgIE1hdGguUEkgKiAyLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICAvL2RyYXcgYSBsaW5lIGZyb20gc3RhcnQgcG9pbnQgdG93YXJkIGNlbnRlclxuICAgIGNvbnRleHQubW92ZVRvKHRoaXMubVN0YXJ0cG9pbnQueCwgdGhpcy5tU3RhcnRwb2ludC55KTtcbiAgICBjb250ZXh0LmxpbmVUbyh0aGlzLm1DZW50ZXIueCwgdGhpcy5tQ2VudGVyLnkpO1xuXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgLy9yb3RhdGUgYW5nbGUgaW4gY291bnRlcmNsb2Nrd2lzZVxuICByb3RhdGUoYW5nbGUpIHtcbiAgICB0aGlzLm1BbmdsZSArPSBhbmdsZTtcbiAgICB0aGlzLm1TdGFydHBvaW50ID0gdGhpcy5tU3RhcnRwb2ludC5yb3RhdGUodGhpcy5tQ2VudGVyLCBhbmdsZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVJbmVydGlhKCkge1xuICAgIGlmICh0aGlzLm1JbnZNYXNzID09PSAwKSB7XG4gICAgICB0aGlzLm1JbmVydGlhID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5tSW52TWFzcyBpcyBpbnZlcnRlZCEhXG4gICAgICAvLyBJbmVydGlhPW1hc3MgKiByYWRpdXNeMlxuICAgICAgLy8gMTIgaXMgYSBjb25zdGFudCB2YWx1ZSB0aGF0IGNhbiBiZSBjaGFuZ2VkXG4gICAgICB0aGlzLm1JbmVydGlhID1cbiAgICAgICAgKCgxIC8gdGhpcy5tSW52TWFzcykgKiAodGhpcy5tUmFkaXVzICogdGhpcy5tUmFkaXVzKSkgLyAxMjtcbiAgICB9XG4gIH1cblxuICBjb2xsaXNpb25UZXN0KG90aGVyU2hhcGUsIGNvbGxpc2lvbkluZm8pIHtcbiAgICB2YXIgc3RhdHVzID0gZmFsc2U7XG4gICAgaWYgKG90aGVyU2hhcGUubVR5cGUgPT09ICdDaXJjbGUnKSB7XG4gICAgICBzdGF0dXMgPSB0aGlzLmNvbGxpZGVkQ2lyY0NpcmModGhpcywgb3RoZXJTaGFwZSwgY29sbGlzaW9uSW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IG90aGVyU2hhcGUuY29sbGlkZWRSZWN0Q2lyYyh0aGlzLCBjb2xsaXNpb25JbmZvKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1cztcbiAgfVxuXG4gIGNvbGxpZGVkQ2lyY0NpcmMoYzEsIGMyLCBjb2xsaXNpb25JbmZvKSB7XG4gICAgdmFyIHZGcm9tMXRvMiA9IGMyLm1DZW50ZXIuc3VidHJhY3QoYzEubUNlbnRlcik7XG4gICAgdmFyIHJTdW0gPSBjMS5tUmFkaXVzICsgYzIubVJhZGl1cztcbiAgICB2YXIgZGlzdCA9IHZGcm9tMXRvMi5sZW5ndGgoKTtcbiAgICBpZiAoZGlzdCA+IE1hdGguc3FydChyU3VtICogclN1bSkpIHtcbiAgICAgIC8vbm90IG92ZXJsYXBwaW5nXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkaXN0ICE9PSAwKSB7XG4gICAgICAvLyBvdmVybGFwcGluZyBidSBub3Qgc2FtZSBwb3NpdGlvblxuICAgICAgdmFyIG5vcm1hbEZyb20ydG8xID0gdkZyb20xdG8yLnNjYWxlKC0xKS5ub3JtYWxpemUoKTtcbiAgICAgIHZhciByYWRpdXNDMiA9IG5vcm1hbEZyb20ydG8xLnNjYWxlKGMyLm1SYWRpdXMpO1xuICAgICAgY29sbGlzaW9uSW5mby5zZXRJbmZvKFxuICAgICAgICByU3VtIC0gZGlzdCxcbiAgICAgICAgdkZyb20xdG8yLm5vcm1hbGl6ZSgpLFxuICAgICAgICBjMi5tQ2VudGVyLmFkZChyYWRpdXNDMilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vc2FtZSBwb3NpdGlvblxuICAgICAgaWYgKGMxLm1SYWRpdXMgPiBjMi5tUmFkaXVzKSB7XG4gICAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgICByU3VtLFxuICAgICAgICAgIG5ldyBWZWN0b3IoMCwgLTEpLFxuICAgICAgICAgIGMxLm1DZW50ZXIuYWRkKG5ldyBWZWN0b3IoMCwgYzEubVJhZGl1cykpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgclN1bSxcbiAgICAgICAgICBuZXcgVmVjdG9yKDAsIC0xKSxcbiAgICAgICAgICBjMi5tQ2VudGVyLmFkZChuZXcgVmVjdG9yKDAsIGMyLm1SYWRpdXMpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==