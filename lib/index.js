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
exports.Coalesce = {
    Physics() {
        let mPositionalCorrectionFlag = true;
        let mRelaxationCount = 15; // number of relaxation iteration
        let mPosCorrectionRate = 0.8; // percentage of separation to project objects
        let positionalCorrection = function (s1, s2, collisionInfo) {
            let s1InvMass = s1.mInvMass;
            let s2InvMass = s2.mInvMass;
            let num = (collisionInfo.getDepth() / (s1InvMass + s2InvMass)) *
                mPosCorrectionRate;
            let correctionAmount = collisionInfo.getNormal().scale(num);
            s1.move(correctionAmount.scale(-s1InvMass));
            s2.move(correctionAmount.scale(s2InvMass));
        };
        let resolveCollision = function (s1, s2, collisionInfo) {
            if (s1.mInvMass === 0 && s2.mInvMass === 0) {
                return;
            }
            //  correct positions
            if (this.Physics.mPositionalCorrectionFlag) {
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
    },
    Core() {
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
                    this.Physics.mPositionalCorrectionFlag +
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
    }
};


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
        if (friction !== undefined) {
            this.mFriction = friction;
        }
        else {
            this.mFriction = 0.8;
        }
        if (restitution !== undefined) {
            this.mRestitution = restitution;
        }
        else {
            this.mRestitution = 0.2;
        }
        this.mVelocity = new engine_vector_1.Vector(0, 0);
        if (this.mInvMass !== 0) {
            this.mInvMass = 1 / this.mInvMass;
            console.log(engine_core_1.Coalesce);
            this.mAcceleration = engine_core_1.Coalesce.Core().mGravity;
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
        engine_core_1.Coalesce.Core().mAllObjects.push(this);
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
            this.mAcceleration = engine_core_1.Coalesce.Core().mGravity;
        }
        this.updateInertia();
    }
    updateInertia() {
        // subclass must define this.
        // must work with inverted this.mInvMass
    }
    update() {
        if (engine_core_1.Coalesce.Core().mMovement) {
            var dt = engine_core_1.Coalesce.Core().mUpdateIntervalInSeconds;
            //v += a*t
            this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));
            //s += v*t
            this.move(this.mVelocity.scale(dt));
            this.mAngularVelocity += this.mAngularAcceleration * dt;
            this.rotate(this.mAngularVelocity * dt);
        }
        var width = engine_core_1.Coalesce.Core().mWidth;
        var height = engine_core_1.Coalesce.Core().mHeight;
        if (this.mCenter.x < 0 ||
            this.mCenter.x > width ||
            this.mCenter.y < 0 ||
            this.mCenter.y > height) {
            var index = engine_core_1.Coalesce.Core().mAllObjects.indexOf(this);
            if (index > -1)
                engine_core_1.Coalesce.Core().mAllObjects.splice(index, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvdmVjdG9yL2VuZ2luZS52ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9lbmdpbmUuY29yZS50cyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL21vZHVsZS9sb2dnZXIvY29sbGlzaW9uLmluZm8udHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvcmlnaWQvZW5naW5lLnJpZ2lkLnRzIiwid2VicGFjazovLy8uL2xpYi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9tb2R1bGUvcmlnaWQvZW5naW5lLnNoYXBlLnJlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL3N1cGVyc3RydWN0LnRzIiwid2VicGFjazovLy8uL2xpYi9zcmMvbW9kdWxlL3JpZ2lkL2VuZ2luZS5zaGFwZS5jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztR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LElBQUksS0FBSyxDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMs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QyxDQUFDO2FBQ0g7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBekdELHdCQXlHQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcbiIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG4gIGFkZCh2ZWMpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih2ZWMueCArIHRoaXMueCwgdmVjLnkgKyB0aGlzLnkpO1xuICB9XG5cbiAgc3VidHJhY3QodmVjKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55KTtcbiAgfVxuXG4gIHNjYWxlKG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKiBuLCB0aGlzLnkgKiBuKTtcbiAgfVxuXG4gIGRvdCh2ZWMpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueTtcbiAgfVxuXG4gIGNyb3NzKHZlYykge1xuICAgIHJldHVybiB0aGlzLnggKiB2ZWMueSAtIHRoaXMueSAqIHZlYy54O1xuICB9XG5cbiAgcm90YXRlKGNlbnRlciwgYW5nbGUpIHtcbiAgICAvL3JvdGF0ZSBpbiBjb3VudGVyY2xvY2t3aXNlXG4gICAgdmFyIHIgPSBbXTtcblxuICAgIHZhciB4ID0gdGhpcy54IC0gY2VudGVyLng7XG4gICAgdmFyIHkgPSB0aGlzLnkgLSBjZW50ZXIueTtcblxuICAgIHJbMF0gPSB4ICogTWF0aC5jb3MoYW5nbGUpIC0geSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICByWzFdID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICByWzBdICs9IGNlbnRlci54O1xuICAgIHJbMV0gKz0gY2VudGVyLnk7XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcihyWzBdLCByWzFdKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGgoKTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogbGVuLCB0aGlzLnkgKiBsZW4pO1xuICB9XG5cbiAgZGlzdGFuY2UodmVjKSB7XG4gICAgdmFyIHggPSB0aGlzLnggLSB2ZWMueDtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHZlYy55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4vbW9kdWxlL3ZlY3Rvci9lbmdpbmUudmVjdG9yJztcbmltcG9ydCB7IENvbGxpc2lvbkluZm8gfSBmcm9tICcuL21vZHVsZS9sb2dnZXIvY29sbGlzaW9uLmluZm8nO1xuZGVjbGFyZSBjb25zdCB3aW5kb3c7XG5cbmxldCBnT2JqZWN0TnVtID0gMDtcbmludGVyZmFjZSBJRW5naW5lIHtcbiAgUGh5c2ljcygpOiBhbnk7XG4gIENvcmUoKTogYW55O1xufVxuXG5leHBvcnQgY29uc3QgQ29hbGVzY2U6IElFbmdpbmUgPSB7XG4gIFBoeXNpY3MoKSB7XG4gICAgbGV0IG1Qb3NpdGlvbmFsQ29ycmVjdGlvbkZsYWcgPSB0cnVlO1xuICAgIGxldCBtUmVsYXhhdGlvbkNvdW50ID0gMTU7IC8vIG51bWJlciBvZiByZWxheGF0aW9uIGl0ZXJhdGlvblxuICAgIGxldCBtUG9zQ29ycmVjdGlvblJhdGUgPSAwLjg7IC8vIHBlcmNlbnRhZ2Ugb2Ygc2VwYXJhdGlvbiB0byBwcm9qZWN0IG9iamVjdHNcblxuICAgIGxldCBwb3NpdGlvbmFsQ29ycmVjdGlvbiA9IGZ1bmN0aW9uKHMxLCBzMiwgY29sbGlzaW9uSW5mbykge1xuICAgICAgbGV0IHMxSW52TWFzcyA9IHMxLm1JbnZNYXNzO1xuICAgICAgbGV0IHMySW52TWFzcyA9IHMyLm1JbnZNYXNzO1xuXG4gICAgICBsZXQgbnVtID1cbiAgICAgICAgKGNvbGxpc2lvbkluZm8uZ2V0RGVwdGgoKSAvIChzMUludk1hc3MgKyBzMkludk1hc3MpKSAqXG4gICAgICAgIG1Qb3NDb3JyZWN0aW9uUmF0ZTtcbiAgICAgIGxldCBjb3JyZWN0aW9uQW1vdW50ID0gY29sbGlzaW9uSW5mby5nZXROb3JtYWwoKS5zY2FsZShudW0pO1xuXG4gICAgICBzMS5tb3ZlKGNvcnJlY3Rpb25BbW91bnQuc2NhbGUoLXMxSW52TWFzcykpO1xuICAgICAgczIubW92ZShjb3JyZWN0aW9uQW1vdW50LnNjYWxlKHMySW52TWFzcykpO1xuICAgIH07XG5cbiAgICBsZXQgcmVzb2x2ZUNvbGxpc2lvbiA9IGZ1bmN0aW9uKHMxLCBzMiwgY29sbGlzaW9uSW5mbykge1xuICAgICAgaWYgKHMxLm1JbnZNYXNzID09PSAwICYmIHMyLm1JbnZNYXNzID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gIGNvcnJlY3QgcG9zaXRpb25zXG4gICAgICBpZiAodGhpcy5QaHlzaWNzLm1Qb3NpdGlvbmFsQ29ycmVjdGlvbkZsYWcpIHtcbiAgICAgICAgcG9zaXRpb25hbENvcnJlY3Rpb24oczEsIHMyLCBjb2xsaXNpb25JbmZvKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG4gPSBjb2xsaXNpb25JbmZvLmdldE5vcm1hbCgpO1xuXG4gICAgICAvL3RoZSBkaXJlY3Rpb24gb2YgY29sbGlzaW9uSW5mbyBpcyBhbHdheXMgZnJvbSBzMSB0byBzMlxuICAgICAgLy9idXQgdGhlIE1hc3MgaXMgaW52ZXJzZWQsIHNvIHN0YXJ0IHNjYWxlIHdpdGggczIgYW5kIGVuZCBzY2FsZSB3aXRoIHMxXG4gICAgICBsZXQgc3RhcnQgPSBjb2xsaXNpb25JbmZvLm1TdGFydC5zY2FsZShcbiAgICAgICAgczIubUludk1hc3MgLyAoczEubUludk1hc3MgKyBzMi5tSW52TWFzcylcbiAgICAgICk7XG4gICAgICBsZXQgZW5kID0gY29sbGlzaW9uSW5mby5tRW5kLnNjYWxlKFxuICAgICAgICBzMS5tSW52TWFzcyAvIChzMS5tSW52TWFzcyArIHMyLm1JbnZNYXNzKVxuICAgICAgKTtcbiAgICAgIGxldCBwID0gc3RhcnQuYWRkKGVuZCk7XG4gICAgICAvL3IgaXMgVmVjdG9yIGZyb20gY2VudGVyIG9mIG9iamVjdCB0byBjb2xsaXNpb24gcG9pbnRcbiAgICAgIGxldCByMSA9IHAuc3VidHJhY3QoczEubUNlbnRlcik7XG4gICAgICBsZXQgcjIgPSBwLnN1YnRyYWN0KHMyLm1DZW50ZXIpO1xuXG4gICAgICAvL25ld1YgPSBWICsgbUFuZ3VsYXJWZWxvY2l0eSBjcm9zcyBSXG4gICAgICBsZXQgdjEgPSBzMS5tVmVsb2NpdHkuYWRkKFxuICAgICAgICBuZXcgVmVjdG9yKC0xICogczEubUFuZ3VsYXJWZWxvY2l0eSAqIHIxLnksIHMxLm1Bbmd1bGFyVmVsb2NpdHkgKiByMS54KVxuICAgICAgKTtcbiAgICAgIGxldCB2MiA9IHMyLm1WZWxvY2l0eS5hZGQoXG4gICAgICAgIG5ldyBWZWN0b3IoLTEgKiBzMi5tQW5ndWxhclZlbG9jaXR5ICogcjIueSwgczIubUFuZ3VsYXJWZWxvY2l0eSAqIHIyLngpXG4gICAgICApO1xuICAgICAgbGV0IHJlbGF0aXZlVmVsb2NpdHkgPSB2Mi5zdWJ0cmFjdCh2MSk7XG5cbiAgICAgIC8vIFJlbGF0aXZlIHZlbG9jaXR5IGluIG5vcm1hbCBkaXJlY3Rpb25cbiAgICAgIGxldCByVmVsb2NpdHlJbk5vcm1hbCA9IHJlbGF0aXZlVmVsb2NpdHkuZG90KG4pO1xuXG4gICAgICAvL2lmIG9iamVjdHMgbW92aW5nIGFwYXJ0IGlnbm9yZVxuICAgICAgaWYgKHJWZWxvY2l0eUluTm9ybWFsID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdSZXN0aXR1aW9uID0gTWF0aC5taW4oczEubVJlc3RpdHV0aW9uLCBzMi5tUmVzdGl0dXRpb24pO1xuICAgICAgbGV0IG5ld0ZyaWN0aW9uID0gTWF0aC5taW4oczEubUZyaWN0aW9uLCBzMi5tRnJpY3Rpb24pO1xuXG4gICAgICBsZXQgUjFjcm9zc04gPSByMS5jcm9zcyhuKTtcbiAgICAgIGxldCBSMmNyb3NzTiA9IHIyLmNyb3NzKG4pO1xuXG4gICAgICBsZXQgak4gPSAtKDEgKyBuZXdSZXN0aXR1aW9uKSAqIHJWZWxvY2l0eUluTm9ybWFsO1xuICAgICAgak4gPVxuICAgICAgICBqTiAvXG4gICAgICAgIChzMS5tSW52TWFzcyArXG4gICAgICAgICAgczIubUludk1hc3MgK1xuICAgICAgICAgIFIxY3Jvc3NOICogUjFjcm9zc04gKiBzMS5tSW5lcnRpYSArXG4gICAgICAgICAgUjJjcm9zc04gKiBSMmNyb3NzTiAqIHMyLm1JbmVydGlhKTtcblxuICAgICAgbGV0IGltcHVsc2UgPSBuLnNjYWxlKGpOKTtcbiAgICAgIHMxLm1WZWxvY2l0eSA9IHMxLm1WZWxvY2l0eS5zdWJ0cmFjdChpbXB1bHNlLnNjYWxlKHMxLm1JbnZNYXNzKSk7XG4gICAgICBzMi5tVmVsb2NpdHkgPSBzMi5tVmVsb2NpdHkuYWRkKGltcHVsc2Uuc2NhbGUoczIubUludk1hc3MpKTtcblxuICAgICAgczEubUFuZ3VsYXJWZWxvY2l0eSAtPSBSMWNyb3NzTiAqIGpOICogczEubUluZXJ0aWE7XG4gICAgICBzMi5tQW5ndWxhclZlbG9jaXR5ICs9IFIyY3Jvc3NOICogak4gKiBzMi5tSW5lcnRpYTtcblxuICAgICAgbGV0IHRhbmdlbnQgPSByZWxhdGl2ZVZlbG9jaXR5LnN1YnRyYWN0KG4uc2NhbGUocmVsYXRpdmVWZWxvY2l0eS5kb3QobikpKTtcblxuICAgICAgLy9yZWxhdGl2ZVZlbG9jaXR5LmRvdCh0YW5nZW50KSBzaG91bGQgbGVzcyB0aGFuIDBcbiAgICAgIHRhbmdlbnQgPSB0YW5nZW50Lm5vcm1hbGl6ZSgpLnNjYWxlKC0xKTtcblxuICAgICAgbGV0IFIxY3Jvc3NUID0gcjEuY3Jvc3ModGFuZ2VudCk7XG4gICAgICBsZXQgUjJjcm9zc1QgPSByMi5jcm9zcyh0YW5nZW50KTtcblxuICAgICAgbGV0IGpUID1cbiAgICAgICAgLSgxICsgbmV3UmVzdGl0dWlvbikgKiByZWxhdGl2ZVZlbG9jaXR5LmRvdCh0YW5nZW50KSAqIG5ld0ZyaWN0aW9uO1xuICAgICAgalQgPVxuICAgICAgICBqVCAvXG4gICAgICAgIChzMS5tSW52TWFzcyArXG4gICAgICAgICAgczIubUludk1hc3MgK1xuICAgICAgICAgIFIxY3Jvc3NUICogUjFjcm9zc1QgKiBzMS5tSW5lcnRpYSArXG4gICAgICAgICAgUjJjcm9zc1QgKiBSMmNyb3NzVCAqIHMyLm1JbmVydGlhKTtcblxuICAgICAgLy9mcmljdGlvbiBzaG91bGQgbGVzcyB0aGFuIGZvcmNlIGluIG5vcm1hbCBkaXJlY3Rpb25cbiAgICAgIGlmIChqVCA+IGpOKSB7XG4gICAgICAgIGpUID0gak47XG4gICAgICB9XG5cbiAgICAgIC8vaW1wdWxzZSBpcyBmcm9tIHMxIHRvIHMyIChpbiBvcHBvc2l0ZSBkaXJlY3Rpb24gb2YgdmVsb2NpdHkpXG4gICAgICBpbXB1bHNlID0gdGFuZ2VudC5zY2FsZShqVCk7XG5cbiAgICAgIHMxLm1WZWxvY2l0eSA9IHMxLm1WZWxvY2l0eS5zdWJ0cmFjdChpbXB1bHNlLnNjYWxlKHMxLm1JbnZNYXNzKSk7XG4gICAgICBzMi5tVmVsb2NpdHkgPSBzMi5tVmVsb2NpdHkuYWRkKGltcHVsc2Uuc2NhbGUoczIubUludk1hc3MpKTtcbiAgICAgIHMxLm1Bbmd1bGFyVmVsb2NpdHkgLT0gUjFjcm9zc1QgKiBqVCAqIHMxLm1JbmVydGlhO1xuICAgICAgczIubUFuZ3VsYXJWZWxvY2l0eSArPSBSMmNyb3NzVCAqIGpUICogczIubUluZXJ0aWE7XG4gICAgfTtcblxuICAgIGxldCBkcmF3Q29sbGlzaW9uSW5mbyA9IGZ1bmN0aW9uKGNvbGxpc2lvbkluZm8sIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhjb2xsaXNpb25JbmZvLm1TdGFydC54LCBjb2xsaXNpb25JbmZvLm1TdGFydC55KTtcbiAgICAgIGNvbnRleHQubGluZVRvKGNvbGxpc2lvbkluZm8ubUVuZC54LCBjb2xsaXNpb25JbmZvLm1FbmQueSk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdvcmFuZ2UnO1xuICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29sbGlzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaSwgaiwgaztcbiAgICAgIGxldCBjb2xsaXNpb25JbmZvID0gbmV3IENvbGxpc2lvbkluZm8oKTtcbiAgICAgIGZvciAoayA9IDA7IGsgPCBtUmVsYXhhdGlvbkNvdW50OyBrKyspIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuQ29yZS5tQWxsT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgdGhpcy5Db3JlLm1BbGxPYmplY3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5Db3JlLm1BbGxPYmplY3RzW2ldLmJvdW5kVGVzdCh0aGlzLkNvcmUubUFsbE9iamVjdHNbal0pKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLkNvcmUubUFsbE9iamVjdHNbaV0uY29sbGlzaW9uVGVzdChcbiAgICAgICAgICAgICAgICAgIHRoaXMuQ29yZS5tQWxsT2JqZWN0c1tqXSxcbiAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm9cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIHRoZSBub3JtYWwgaXMgYWx3YXlzIGZyb20gb2JqZWN0W2ldIHRvIG9iamVjdFtqXVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm9cbiAgICAgICAgICAgICAgICAgICAgLmdldE5vcm1hbCgpXG4gICAgICAgICAgICAgICAgICAgIC5kb3QoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db3JlLm1BbGxPYmplY3RzW2pdLm1DZW50ZXIuc3VidHJhY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvcmUubUFsbE9iamVjdHNbaV0ubUNlbnRlclxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSA8IDBcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm8uY2hhbmdlRGlyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgIHRoaXMuQ29yZS5tQWxsT2JqZWN0c1tpXSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuQ29yZS5tQWxsT2JqZWN0c1tqXSxcbiAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkluZm9cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGlzaW9uLFxuICAgICAgbVBvc2l0aW9uYWxDb3JyZWN0aW9uRmxhZ1xuICAgIH07XG4gIH0sXG4gIENvcmUoKSB7XG4gICAgbGV0IG1DYW52YXMsXG4gICAgICBtQ29udGV4dCxcbiAgICAgIG1XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgbUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBtQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgIG1Db250ZXh0ID0gbUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIG1DYW52YXMuaGVpZ2h0ID0gbUhlaWdodDtcbiAgICBtQ2FudmFzLndpZHRoID0gbVdpZHRoO1xuXG4gICAgbGV0IG1HcmF2aXR5ID0gbmV3IFZlY3RvcigwLCAyMCk7XG4gICAgbGV0IG1Nb3ZlbWVudCA9IHRydWU7XG5cbiAgICBsZXQgbUN1cnJlbnRUaW1lLFxuICAgICAgbUVsYXBzZWRUaW1lLFxuICAgICAgbVByZXZpb3VzVGltZSA9IERhdGUubm93KCksXG4gICAgICBtTGFnVGltZSA9IDA7XG4gICAgY29uc3Qga0ZQUyA9IDYwOyAvLyBGcmFtZXMgcGVyIHNlY29uZFxuICAgIGxldCBrRnJhbWVUaW1lID0gMSAvIGtGUFM7XG4gICAgbGV0IG1VcGRhdGVJbnRlcnZhbEluU2Vjb25kcyA9IGtGcmFtZVRpbWU7XG4gICAgbGV0IGtNUEYgPSAxMDAwICoga0ZyYW1lVGltZTsgLy8gTWlsbGlzZWNvbmRzIHBlciBmcmFtZS5cbiAgICBsZXQgbUFsbE9iamVjdHMgPSBbXTtcblxuICAgIGxldCB1cGRhdGVVSUVjaG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghbUFsbE9iamVjdHMubGVuZ3RoKSByZXR1cm47XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mbycpLmlubmVySFRNTCA9XG4gICAgICAgICc8cD48Yj5TZWxlY3RlZCBPYmplY3Q6PC9iPjo8L3A+JyArXG4gICAgICAgICc8dWwgc3R5bGU9XCJtYXJnaW46LTEwcHhcIj4nICtcbiAgICAgICAgJzxsaT5JZDogJyArXG4gICAgICAgIGdPYmplY3ROdW0gK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICAgJzxsaT5DZW50ZXI6ICcgK1xuICAgICAgICBtQWxsT2JqZWN0c1tnT2JqZWN0TnVtXS5tQ2VudGVyLngudG9QcmVjaXNpb24oMykgK1xuICAgICAgICAnLCcgK1xuICAgICAgICBtQWxsT2JqZWN0c1tnT2JqZWN0TnVtXS5tQ2VudGVyLnkudG9QcmVjaXNpb24oMykgK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICAgJzxsaT5BbmdsZTogJyArXG4gICAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1BbmdsZS50b1ByZWNpc2lvbigzKSArXG4gICAgICAgICc8L2xpPicgK1xuICAgICAgICAnPGxpPlZlbG9jaXR5OiAnICtcbiAgICAgICAgbUFsbE9iamVjdHNbZ09iamVjdE51bV0ubVZlbG9jaXR5LngudG9QcmVjaXNpb24oMykgK1xuICAgICAgICAnLCcgK1xuICAgICAgICBtQWxsT2JqZWN0c1tnT2JqZWN0TnVtXS5tVmVsb2NpdHkueS50b1ByZWNpc2lvbigzKSArXG4gICAgICAgICc8L2xpPicgK1xuICAgICAgICAnPGxpPkFuZ2x1YXJWZWxvY2l0eTogJyArXG4gICAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1Bbmd1bGFyVmVsb2NpdHkudG9QcmVjaXNpb24oMykgK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICAgJzxsaT5NYXNzOiAnICtcbiAgICAgICAgMSAvIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1JbnZNYXNzLnRvUHJlY2lzaW9uKDMpICtcbiAgICAgICAgJzwvbGk+JyArXG4gICAgICAgICc8bGk+RnJpY3Rpb246ICcgK1xuICAgICAgICBtQWxsT2JqZWN0c1tnT2JqZWN0TnVtXS5tRnJpY3Rpb24udG9QcmVjaXNpb24oMykgK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICAgJzxsaT5SZXN0aXR1dGlvbjogJyArXG4gICAgICAgIG1BbGxPYmplY3RzW2dPYmplY3ROdW1dLm1SZXN0aXR1dGlvbi50b1ByZWNpc2lvbigzKSArXG4gICAgICAgICc8L2xpPicgK1xuICAgICAgICAnPGxpPlBvc2l0aW9uYWwgQ29ycmVjdGlvbjogJyArXG4gICAgICAgIHRoaXMuUGh5c2ljcy5tUG9zaXRpb25hbENvcnJlY3Rpb25GbGFnICtcbiAgICAgICAgJzwvbGk+JyArXG4gICAgICAgICc8bGk+TW92ZW1lbnQ6ICcgK1xuICAgICAgICB0aGlzLkNvcmUubU1vdmVtZW50ICtcbiAgICAgICAgJzwvbGk+JyArXG4gICAgICAgICc8L3VsPiA8aHI+JyArXG4gICAgICAgICc8cD48Yj5Db250cm9sPC9iPjogb2Ygc2VsZWN0ZWQgb2JqZWN0PC9wPicgK1xuICAgICAgICAnPHVsIHN0eWxlPVwibWFyZ2luOi0xMHB4XCI+JyArXG4gICAgICAgICc8bGk+PGI+TnVtPC9iPiBvciA8Yj5VcC9Eb3duIEFycm93PC9iPjogU2VsZWN0IE9iamVjdDwvbGk+JyArXG4gICAgICAgICc8bGk+PGI+V0FTRDwvYj4gKyA8Yj5RRTwvYj46IFBvc2l0aW9uIFtNb3ZlICsgUm90YXRlXTwvbGk+JyArXG4gICAgICAgICc8bGk+PGI+SUpLTDwvYj4gKyA8Yj5VTzwvYj46IFZlbG9jaXRpZXMgW0xpbmVhciArIEFuZ3VsYXJdPC9saT4nICtcbiAgICAgICAgJzxsaT48Yj5aL1g8L2I+OiBNYXNzIFtEZWNyZWFzZS9JbmNyZWFzZV08L2xpPicgK1xuICAgICAgICAnPGxpPjxiPkMvVjwvYj46IEZyaWN0cmlvbiBbRGVjcmVhc2UvSW5jcmVhc2VdPC9saT4nICtcbiAgICAgICAgJzxsaT48Yj5CL048L2I+OiBSZXN0aXR1dGlvbiBbRGVjcmVhc2UvSW5jcmVhc2VdPC9saT4nICtcbiAgICAgICAgJzxsaT48Yj5NPC9iPjogUG9zaXRpb25hbCBDb3JyZWN0aW9uIFtPbi9PZmZdPC9saT4nICtcbiAgICAgICAgJzxsaT48Yj4sPC9iPjogTW92ZW1lbnQgW09uL09mZl08L2xpPicgK1xuICAgICAgICAnPC91bD4gPGhyPicgK1xuICAgICAgICAnPGI+Ri9HPC9iPjogU3Bhd24gW1JlY3RhbmdsZS9DaXJjbGVdIGF0IHNlbGVjdGVkIG9iamVjdCcgK1xuICAgICAgICAnPHA+PGI+SDwvYj46IEV4Y2l0ZSBhbGwgb2JqZWN0czwvcD4nICtcbiAgICAgICAgJzxwPjxiPlI8L2I+OiBSZXNldCBTeXN0ZW08L3A+JyArXG4gICAgICAgICc8aHI+JztcbiAgICB9O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIG1Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCBtV2lkdGgsIG1IZWlnaHQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtQWxsT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtQ29udGV4dC5zdHJva2VTdHlsZSA9ICdibHVlJztcbiAgICAgICAgaWYgKGkgPT09IGdPYmplY3ROdW0pIHtcbiAgICAgICAgICBtQ29udGV4dC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuICAgICAgICB9XG4gICAgICAgIG1BbGxPYmplY3RzW2ldLmRyYXcobUNvbnRleHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1BbGxPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1BbGxPYmplY3RzW2ldLnVwZGF0ZShtQ29udGV4dCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bkdhbWVMb29wID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHJ1bkdhbWVMb29wKCkpO1xuXG4gICAgICBtQ3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgbUVsYXBzZWRUaW1lID0gbUN1cnJlbnRUaW1lIC0gbVByZXZpb3VzVGltZTtcbiAgICAgIG1QcmV2aW91c1RpbWUgPSBtQ3VycmVudFRpbWU7XG4gICAgICBtTGFnVGltZSArPSBtRWxhcHNlZFRpbWU7XG5cbiAgICAgIHVwZGF0ZVVJRWNobygpO1xuICAgICAgZHJhdygpO1xuXG4gICAgICB3aGlsZSAobUxhZ1RpbWUgPj0ga01QRikge1xuICAgICAgICBtTGFnVGltZSAtPSBrTVBGO1xuICAgICAgICBDb2FsZXNjZS5QaHlzaWNzKCkuY29sbGlzaW9uKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgaW5pdGlhbGl6ZUVuZ2luZUNvcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bkdhbWVMb29wKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplRW5naW5lQ29yZSxcbiAgICAgIG1BbGxPYmplY3RzLFxuICAgICAgbVdpZHRoLFxuICAgICAgbUhlaWdodCxcbiAgICAgIG1Db250ZXh0LFxuICAgICAgbUdyYXZpdHksXG4gICAgICBtVXBkYXRlSW50ZXJ2YWxJblNlY29uZHMsXG4gICAgICBtTW92ZW1lbnRcbiAgICB9O1xuICB9XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9uSW5mbyB7XG4gIG1EZXB0aDtcbiAgbU5vcm1hbDtcbiAgbVN0YXJ0O1xuICBtRW5kO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1EZXB0aCA9IDA7XG4gICAgdGhpcy5tTm9ybWFsID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICB0aGlzLm1TdGFydCA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgdGhpcy5tRW5kID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlcHRoIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzIGhvdyBtdWNoIHBlbmV0cmF0aW9uXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0RGVwdGgocykge1xuICAgIHRoaXMubURlcHRoID0gcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIG5vcm1hbCBvZiB0aGUgQ29sbGlzaW9uSW5mb1xuICAgKiBAbWVtYmVyT2YgQ29sbGlzaW9uSW5mb1xuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcyBWZWN0b3IgdXBvbiB3aGljaCBjb2xsaXNpb24gaW50ZXJwZW5ldHJhdGVzXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0Tm9ybWFsKHMpIHtcbiAgICB0aGlzLm1Ob3JtYWwgPSBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGVwdGggb2YgdGhlIENvbGxpc2lvbkluZm9cbiAgICogQG1lbWJlck9mIENvbGxpc2lvbkluZm9cbiAgICogQHJldHVybnMge051bWJlcn0gaG93IG11Y2ggcGVuZXRyYXRpb25cbiAgICovXG4gIGdldERlcHRoKCkge1xuICAgIHJldHVybiB0aGlzLm1EZXB0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGRlcHRoIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFZlY3RvciB1cG9uIHdoaWNoIGNvbGxpc2lvbiBpbnRlcnBlbmV0cmF0ZXNcbiAgICovXG4gIGdldE5vcm1hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5tTm9ybWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYWxsIHZhbHVlIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBtZW1iZXJPZiBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkIHRoZSBkZXB0aCBvZiB0aGUgQ29sbGlzaW9uSW5mb1xuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbiB0aGUgbm9ybWFsIG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBzIHRoZSBzdGFydHBvaW50IG9mIHRoZSBDb2xsaXNpb25JbmZvXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgc2V0SW5mbyhkLCBuLCBzKSB7XG4gICAgdGhpcy5tRGVwdGggPSBkO1xuICAgIHRoaXMubU5vcm1hbCA9IG47XG4gICAgdGhpcy5tU3RhcnQgPSBzO1xuICAgIHRoaXMubUVuZCA9IHMuYWRkKG4uc2NhbGUoZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgZGlyZWN0aW9uIG9mIG5vcm1hbFxuICAgKiBAbWVtYmVyT2YgQ29sbGlzaW9uSW5mb1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNoYW5nZURpcigpIHtcbiAgICB0aGlzLm1Ob3JtYWwgPSB0aGlzLm1Ob3JtYWwuc2NhbGUoLTEpO1xuICAgIHZhciBuID0gdGhpcy5tU3RhcnQ7XG4gICAgdGhpcy5tU3RhcnQgPSB0aGlzLm1FbmQ7XG4gICAgdGhpcy5tRW5kID0gbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuaW1wb3J0IHsgQ29hbGVzY2UgfSBmcm9tICcuLi8uLi9lbmdpbmUuY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBSaWdpZFNoYXBlIHtcbiAgbW92ZTtcbiAgcm90YXRlO1xuICBtQ2VudGVyO1xuICBtSW52TWFzcztcbiAgbUZyaWN0aW9uO1xuICBtUmVzdGl0dXRpb247XG4gIG1JbmVydGlhO1xuICBtQm91bmRSYWRpdXM7XG4gIG1Bbmd1bGFyVmVsb2NpdHk7XG4gIG1Bbmd1bGFyQWNjZWxlcmF0aW9uO1xuICBtVmVsb2NpdHk7XG4gIG1BbmdsZTtcbiAgbUFjY2VsZXJhdGlvbjtcblxuICBjb25zdHJ1Y3RvcihjZW50ZXIsIG1hc3MsIGZyaWN0aW9uLCByZXN0aXR1dGlvbikge1xuICAgIHRoaXMubUNlbnRlciA9IGNlbnRlcjtcbiAgICB0aGlzLm1JbmVydGlhID0gMDtcbiAgICBpZiAobWFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1JbnZNYXNzID0gbWFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tSW52TWFzcyA9IDE7XG4gICAgfVxuXG4gICAgaWYgKGZyaWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubUZyaWN0aW9uID0gZnJpY3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubUZyaWN0aW9uID0gMC44O1xuICAgIH1cblxuICAgIGlmIChyZXN0aXR1dGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1SZXN0aXR1dGlvbiA9IHJlc3RpdHV0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1SZXN0aXR1dGlvbiA9IDAuMjtcbiAgICB9XG5cbiAgICB0aGlzLm1WZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG5cbiAgICBpZiAodGhpcy5tSW52TWFzcyAhPT0gMCkge1xuICAgICAgdGhpcy5tSW52TWFzcyA9IDEgLyB0aGlzLm1JbnZNYXNzO1xuICAgICAgY29uc29sZS5sb2coQ29hbGVzY2UpO1xuICAgICAgdGhpcy5tQWNjZWxlcmF0aW9uID0gQ29hbGVzY2UuQ29yZSgpLm1HcmF2aXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1BY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIH1cblxuICAgIC8vYW5nbGVcbiAgICB0aGlzLm1BbmdsZSA9IDA7XG5cbiAgICAvL25lZ2V0aXZlLS0gY2xvY2t3aXNlXG4gICAgLy9wb3N0aXZlLS0gY291bnRlcmNsb2Nrd2lzZVxuICAgIHRoaXMubUFuZ3VsYXJWZWxvY2l0eSA9IDA7XG5cbiAgICB0aGlzLm1Bbmd1bGFyQWNjZWxlcmF0aW9uID0gMDtcblxuICAgIHRoaXMubUJvdW5kUmFkaXVzID0gMDtcblxuICAgIENvYWxlc2NlLkNvcmUoKS5tQWxsT2JqZWN0cy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlTWFzcyhkZWx0YSkge1xuICAgIHZhciBtYXNzO1xuICAgIGlmICh0aGlzLm1JbnZNYXNzICE9PSAwKSB7XG4gICAgICBtYXNzID0gMSAvIHRoaXMubUludk1hc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hc3MgPSAwO1xuICAgIH1cblxuICAgIG1hc3MgKz0gZGVsdGE7XG4gICAgaWYgKG1hc3MgPD0gMCkge1xuICAgICAgdGhpcy5tSW52TWFzcyA9IDA7XG4gICAgICB0aGlzLm1WZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgICB0aGlzLm1BY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgICAgdGhpcy5tQW5ndWxhclZlbG9jaXR5ID0gMDtcbiAgICAgIHRoaXMubUFuZ3VsYXJBY2NlbGVyYXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1JbnZNYXNzID0gMSAvIG1hc3M7XG4gICAgICB0aGlzLm1BY2NlbGVyYXRpb24gPSBDb2FsZXNjZS5Db3JlKCkubUdyYXZpdHk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlSW5lcnRpYSgpO1xuICB9XG5cbiAgdXBkYXRlSW5lcnRpYSgpIHtcbiAgICAvLyBzdWJjbGFzcyBtdXN0IGRlZmluZSB0aGlzLlxuICAgIC8vIG11c3Qgd29yayB3aXRoIGludmVydGVkIHRoaXMubUludk1hc3NcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoQ29hbGVzY2UuQ29yZSgpLm1Nb3ZlbWVudCkge1xuICAgICAgdmFyIGR0ID0gQ29hbGVzY2UuQ29yZSgpLm1VcGRhdGVJbnRlcnZhbEluU2Vjb25kcztcbiAgICAgIC8vdiArPSBhKnRcbiAgICAgIHRoaXMubVZlbG9jaXR5ID0gdGhpcy5tVmVsb2NpdHkuYWRkKHRoaXMubUFjY2VsZXJhdGlvbi5zY2FsZShkdCkpO1xuICAgICAgLy9zICs9IHYqdFxuICAgICAgdGhpcy5tb3ZlKHRoaXMubVZlbG9jaXR5LnNjYWxlKGR0KSk7XG5cbiAgICAgIHRoaXMubUFuZ3VsYXJWZWxvY2l0eSArPSB0aGlzLm1Bbmd1bGFyQWNjZWxlcmF0aW9uICogZHQ7XG4gICAgICB0aGlzLnJvdGF0ZSh0aGlzLm1Bbmd1bGFyVmVsb2NpdHkgKiBkdCk7XG4gICAgfVxuICAgIHZhciB3aWR0aCA9IENvYWxlc2NlLkNvcmUoKS5tV2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IENvYWxlc2NlLkNvcmUoKS5tSGVpZ2h0O1xuICAgIGlmIChcbiAgICAgIHRoaXMubUNlbnRlci54IDwgMCB8fFxuICAgICAgdGhpcy5tQ2VudGVyLnggPiB3aWR0aCB8fFxuICAgICAgdGhpcy5tQ2VudGVyLnkgPCAwIHx8XG4gICAgICB0aGlzLm1DZW50ZXIueSA+IGhlaWdodFxuICAgICkge1xuICAgICAgdmFyIGluZGV4ID0gQ29hbGVzY2UuQ29yZSgpLm1BbGxPYmplY3RzLmluZGV4T2YodGhpcyk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkgQ29hbGVzY2UuQ29yZSgpLm1BbGxPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgYm91bmRUZXN0KG90aGVyU2hhcGUpIHtcbiAgICB2YXIgdkZyb20xdG8yID0gb3RoZXJTaGFwZS5tQ2VudGVyLnN1YnRyYWN0KHRoaXMubUNlbnRlcik7XG4gICAgdmFyIHJTdW0gPSB0aGlzLm1Cb3VuZFJhZGl1cyArIG90aGVyU2hhcGUubUJvdW5kUmFkaXVzO1xuICAgIHZhciBkaXN0ID0gdkZyb20xdG8yLmxlbmd0aCgpO1xuICAgIGlmIChkaXN0ID4gclN1bSkge1xuICAgICAgLy9ub3Qgb3ZlcmxhcHBpbmdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCB7IENvYWxlc2NlIH0gZnJvbSAnLi9lbmdpbmUuY29yZSc7XG5leHBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL21vZHVsZS9yaWdpZC9lbmdpbmUuc2hhcGUucmVjdGFuZ2xlJztcbmV4cG9ydCB7IENpcmNsZSB9IGZyb20gJy4vbW9kdWxlL3JpZ2lkL2VuZ2luZS5zaGFwZS5jaXJjbGUnO1xuZXhwb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9tb2R1bGUvdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yL2VuZ2luZS52ZWN0b3InO1xuaW1wb3J0IHsgUmlnaWRTaGFwZSB9IGZyb20gJy4vZW5naW5lLnJpZ2lkJztcbmltcG9ydCB7IFN1cHBvcnRTdHJ1Y3QgfSBmcm9tICcuLi8uLi9zdXBlcnN0cnVjdCc7XG5pbXBvcnQgeyBDb2xsaXNpb25JbmZvIH0gZnJvbSAnLi4vbG9nZ2VyL2NvbGxpc2lvbi5pbmZvJztcblxuY29uc3QgY29sbGlzaW9uSW5mb1IxID0gbmV3IENvbGxpc2lvbkluZm8oKTtcbmNvbnN0IGNvbGxpc2lvbkluZm9SMiA9IG5ldyBDb2xsaXNpb25JbmZvKCk7XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBSaWdpZFNoYXBlIHtcbiAgbVR5cGU7XG4gIG1XaWR0aDtcbiAgdG1wU3VwcG9ydDtcbiAgbUhlaWdodDtcbiAgbUJvdW5kUmFkaXVzO1xuICBtVmVydGV4O1xuICBtRmFjZU5vcm1hbDtcbiAgY29uc3RydWN0b3IoY2VudGVyLCB3aWR0aCwgaGVpZ2h0LCBtYXNzLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pIHtcbiAgICBzdXBlcihjZW50ZXIsIHdpZHRoLCBoZWlnaHQsIG1hc3MpO1xuICAgIHRoaXMudG1wU3VwcG9ydCA9IG5ldyBTdXBwb3J0U3RydWN0KCk7XG5cbiAgICB0aGlzLm1UeXBlID0gJ1JlY3RhbmdsZSc7XG4gICAgdGhpcy5tV2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLm1IZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5tQm91bmRSYWRpdXMgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGhlaWdodCAqIGhlaWdodCkgLyAyO1xuICAgIHRoaXMubVZlcnRleCA9IFtdO1xuICAgIHRoaXMubUZhY2VOb3JtYWwgPSBbXTtcblxuICAgIC8vMC0tVG9wTGVmdDsxLS1Ub3BSaWdodDsyLS1Cb3R0b21SaWdodDszLS1Cb3R0b21MZWZ0XG4gICAgdGhpcy5tVmVydGV4WzBdID0gbmV3IFZlY3RvcihjZW50ZXIueCAtIHdpZHRoIC8gMiwgY2VudGVyLnkgLSBoZWlnaHQgLyAyKTtcbiAgICB0aGlzLm1WZXJ0ZXhbMV0gPSBuZXcgVmVjdG9yKGNlbnRlci54ICsgd2lkdGggLyAyLCBjZW50ZXIueSAtIGhlaWdodCAvIDIpO1xuICAgIHRoaXMubVZlcnRleFsyXSA9IG5ldyBWZWN0b3IoY2VudGVyLnggKyB3aWR0aCAvIDIsIGNlbnRlci55ICsgaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5tVmVydGV4WzNdID0gbmV3IFZlY3RvcihjZW50ZXIueCAtIHdpZHRoIC8gMiwgY2VudGVyLnkgKyBoZWlnaHQgLyAyKTtcblxuICAgIC8vMC0tVG9wOzEtLVJpZ2h0OzItLUJvdHRvbTszLS1MZWZ0XG4gICAgLy9tRmFjZU5vcm1hbCBpcyBub3JtYWwgb2YgZmFjZSB0b3dhcmQgb3V0c2lkZSBvZiByZWN0YW5nbGVcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzBdID0gdGhpcy5tVmVydGV4WzFdLnN1YnRyYWN0KHRoaXMubVZlcnRleFsyXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFswXSA9IHRoaXMubUZhY2VOb3JtYWxbMF0ubm9ybWFsaXplKCk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFsxXSA9IHRoaXMubVZlcnRleFsyXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbM10pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMV0gPSB0aGlzLm1GYWNlTm9ybWFsWzFdLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMl0gPSB0aGlzLm1WZXJ0ZXhbM10uc3VidHJhY3QodGhpcy5tVmVydGV4WzBdKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzJdID0gdGhpcy5tRmFjZU5vcm1hbFsyXS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzNdID0gdGhpcy5tVmVydGV4WzBdLnN1YnRyYWN0KHRoaXMubVZlcnRleFsxXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFszXSA9IHRoaXMubUZhY2VOb3JtYWxbM10ubm9ybWFsaXplKCk7XG5cbiAgICB0aGlzLnVwZGF0ZUluZXJ0aWEoKTtcbiAgfVxuXG4gIHJvdGF0ZShhbmdsZSkge1xuICAgIHRoaXMubUFuZ2xlICs9IGFuZ2xlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tVmVydGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLm1WZXJ0ZXhbaV0gPSB0aGlzLm1WZXJ0ZXhbaV0ucm90YXRlKHRoaXMubUNlbnRlciwgYW5nbGUpO1xuICAgIH1cbiAgICB0aGlzLm1GYWNlTm9ybWFsWzBdID0gdGhpcy5tVmVydGV4WzFdLnN1YnRyYWN0KHRoaXMubVZlcnRleFsyXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFswXSA9IHRoaXMubUZhY2VOb3JtYWxbMF0ubm9ybWFsaXplKCk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFsxXSA9IHRoaXMubVZlcnRleFsyXS5zdWJ0cmFjdCh0aGlzLm1WZXJ0ZXhbM10pO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMV0gPSB0aGlzLm1GYWNlTm9ybWFsWzFdLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMubUZhY2VOb3JtYWxbMl0gPSB0aGlzLm1WZXJ0ZXhbM10uc3VidHJhY3QodGhpcy5tVmVydGV4WzBdKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzJdID0gdGhpcy5tRmFjZU5vcm1hbFsyXS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLm1GYWNlTm9ybWFsWzNdID0gdGhpcy5tVmVydGV4WzBdLnN1YnRyYWN0KHRoaXMubVZlcnRleFsxXSk7XG4gICAgdGhpcy5tRmFjZU5vcm1hbFszXSA9IHRoaXMubUZhY2VOb3JtYWxbM10ubm9ybWFsaXplKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaW5kQXhpc0xlYXN0UGVuZXRyYXRpb24ob3RoZXJSZWN0LCBjb2xsaXNpb25JbmZvKSB7XG4gICAgdmFyIG47XG4gICAgdmFyIHN1cHBvcnRQb2ludDtcblxuICAgIHZhciBiZXN0RGlzdGFuY2UgPSA5OTk5OTk7XG4gICAgdmFyIGJlc3RJbmRleCA9IG51bGw7XG5cbiAgICB2YXIgaGFzU3VwcG9ydCA9IHRydWU7XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgd2hpbGUgKGhhc1N1cHBvcnQgJiYgaSA8IHRoaXMubUZhY2VOb3JtYWwubGVuZ3RoKSB7XG4gICAgICAvLyBSZXRyaWV2ZSBhIGZhY2Ugbm9ybWFsIGZyb20gQVxuICAgICAgbiA9IHRoaXMubUZhY2VOb3JtYWxbaV07XG5cbiAgICAgIC8vIHVzZSAtbiBhcyBkaXJlY3Rpb24gYW5kIHRoZSB2ZWN0ZXggb24gZWRnZSBpIGFzIHBvaW50IG9uIGVkZ2VcbiAgICAgIHZhciBkaXIgPSBuLnNjYWxlKC0xKTtcbiAgICAgIHZhciBwdE9uRWRnZSA9IHRoaXMubVZlcnRleFtpXTtcbiAgICAgIC8vIGZpbmQgdGhlIHN1cHBvcnQgb24gQlxuICAgICAgLy8gdGhlIHBvaW50IGhhcyBsb25nZXN0IGRpc3RhbmNlIHdpdGggZWRnZSBpXG4gICAgICBvdGhlclJlY3QuZmluZFN1cHBvcnRQb2ludChkaXIsIHB0T25FZGdlKTtcbiAgICAgIGhhc1N1cHBvcnQgPSB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludCAhPT0gbnVsbDtcblxuICAgICAgLy9nZXQgdGhlIHNob3J0ZXN0IHN1cHBvcnQgcG9pbnQgZGVwdGhcbiAgICAgIGlmIChoYXNTdXBwb3J0ICYmIHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50RGlzdCA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICBiZXN0RGlzdGFuY2UgPSB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludERpc3Q7XG4gICAgICAgIGJlc3RJbmRleCA9IGk7XG4gICAgICAgIHN1cHBvcnRQb2ludCA9IHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50O1xuICAgICAgfVxuICAgICAgaSA9IGkgKyAxO1xuICAgIH1cbiAgICBpZiAoaGFzU3VwcG9ydCkge1xuICAgICAgLy9hbGwgZm91ciBkaXJlY3Rpb25zIGhhdmUgc3VwcG9ydCBwb2ludFxuICAgICAgdmFyIGJlc3RWZWMgPSB0aGlzLm1GYWNlTm9ybWFsW2Jlc3RJbmRleF0uc2NhbGUoYmVzdERpc3RhbmNlKTtcbiAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgYmVzdERpc3RhbmNlLFxuICAgICAgICB0aGlzLm1GYWNlTm9ybWFsW2Jlc3RJbmRleF0sXG4gICAgICAgIHN1cHBvcnRQb2ludC5hZGQoYmVzdFZlYylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBoYXNTdXBwb3J0O1xuICB9XG5cbiAgZmluZFN1cHBvcnRQb2ludChkaXIsIHB0T25FZGdlKSB7XG4gICAgLy90aGUgbG9uZ2VzdCBwcm9qZWN0IGxlbmd0aFxuICAgIHZhciB2VG9FZGdlO1xuICAgIHZhciBwcm9qZWN0aW9uO1xuXG4gICAgdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnREaXN0ID0gLTk5OTk5OTk7XG4gICAgdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnQgPSBudWxsO1xuXG4gICAgLy9jaGVjayBlYWNoIFZlY3RvciBvZiBvdGhlciBvYmplY3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubVZlcnRleC5sZW5ndGg7IGkrKykge1xuICAgICAgdlRvRWRnZSA9IHRoaXMubVZlcnRleFtpXS5zdWJ0cmFjdChwdE9uRWRnZSk7XG4gICAgICBwcm9qZWN0aW9uID0gdlRvRWRnZS5kb3QoZGlyKTtcblxuICAgICAgLy9maW5kIHRoZSBsb25nZXN0IGRpc3RhbmNlIHdpdGggY2VydGFpbiBlZGdlXG4gICAgICAvL2RpciBpcyAtbiBkaXJlY3Rpb24sIHNvIHRoZSBkaXN0YW5jZSBzaG91bGQgYmUgcG9zaXRpdmVcbiAgICAgIGlmIChwcm9qZWN0aW9uID4gMCAmJiBwcm9qZWN0aW9uID4gdGhpcy50bXBTdXBwb3J0Lm1TdXBwb3J0UG9pbnREaXN0KSB7XG4gICAgICAgIHRoaXMudG1wU3VwcG9ydC5tU3VwcG9ydFBvaW50ID0gdGhpcy5tVmVydGV4W2ldO1xuICAgICAgICB0aGlzLnRtcFN1cHBvcnQubVN1cHBvcnRQb2ludERpc3QgPSBwcm9qZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbGxpZGVkUmVjdFJlY3QocjEsIHIyLCBjb2xsaXNpb25JbmZvKSB7XG4gICAgdmFyIHN0YXR1czEgPSBmYWxzZTtcbiAgICB2YXIgc3RhdHVzMiA9IGZhbHNlO1xuXG4gICAgLy9maW5kIEF4aXMgb2YgU2VwYXJhdGlvbiBmb3IgYm90aCByZWN0YW5nbGVcbiAgICBzdGF0dXMxID0gcjEuZmluZEF4aXNMZWFzdFBlbmV0cmF0aW9uKHIyLCBjb2xsaXNpb25JbmZvUjEpO1xuXG4gICAgaWYgKHN0YXR1czEpIHtcbiAgICAgIHN0YXR1czIgPSByMi5maW5kQXhpc0xlYXN0UGVuZXRyYXRpb24ocjEsIGNvbGxpc2lvbkluZm9SMik7XG4gICAgICBpZiAoc3RhdHVzMikge1xuICAgICAgICAvL2lmIGJvdGggb2YgcmVjdGFuZ2xlcyBhcmUgb3ZlcmxhcHBpbmcsIGNob29zZSB0aGUgc2hvcnRlciBub3JtYWwgYXMgdGhlIG5vcm1hbFxuICAgICAgICBpZiAoY29sbGlzaW9uSW5mb1IxLmdldERlcHRoKCkgPCBjb2xsaXNpb25JbmZvUjIuZ2V0RGVwdGgoKSkge1xuICAgICAgICAgIHZhciBkZXB0aFZlYyA9IGNvbGxpc2lvbkluZm9SMVxuICAgICAgICAgICAgLmdldE5vcm1hbCgpXG4gICAgICAgICAgICAuc2NhbGUoY29sbGlzaW9uSW5mb1IxLmdldERlcHRoKCkpO1xuICAgICAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMS5nZXREZXB0aCgpLFxuICAgICAgICAgICAgY29sbGlzaW9uSW5mb1IxLmdldE5vcm1hbCgpLFxuICAgICAgICAgICAgY29sbGlzaW9uSW5mb1IxLm1TdGFydC5zdWJ0cmFjdChkZXB0aFZlYylcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMi5nZXREZXB0aCgpLFxuICAgICAgICAgICAgY29sbGlzaW9uSW5mb1IyLmdldE5vcm1hbCgpLnNjYWxlKC0xKSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9SMi5tU3RhcnRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0dXMxICYmIHN0YXR1czI7XG4gIH1cblxuICBjb2xsaWRlZFJlY3RDaXJjKG90aGVyQ2lyLCBjb2xsaXNpb25JbmZvKSB7XG4gICAgdmFyIGluc2lkZSA9IHRydWU7XG4gICAgdmFyIGJlc3REaXN0YW5jZSA9IC05OTk5OTtcbiAgICB2YXIgbmVhcmVzdEVkZ2UgPSAwO1xuICAgIHZhciBpLCB2O1xuICAgIHZhciBjaXJjMlBvcywgcHJvamVjdGlvbjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAvL2ZpbmQgdGhlIG5lYXJlc3QgZmFjZSBmb3IgY2VudGVyIG9mIGNpcmNsZVxuICAgICAgY2lyYzJQb3MgPSBvdGhlckNpci5tQ2VudGVyO1xuICAgICAgdiA9IGNpcmMyUG9zLnN1YnRyYWN0KHRoaXMubVZlcnRleFtpXSk7XG4gICAgICBwcm9qZWN0aW9uID0gdi5kb3QodGhpcy5tRmFjZU5vcm1hbFtpXSk7XG4gICAgICBpZiAocHJvamVjdGlvbiA+IDApIHtcbiAgICAgICAgLy9pZiB0aGUgY2VudGVyIG9mIGNpcmNsZSBpcyBvdXRzaWRlIG9mIHJlY3RhbmdsZVxuICAgICAgICBiZXN0RGlzdGFuY2UgPSBwcm9qZWN0aW9uO1xuICAgICAgICBuZWFyZXN0RWRnZSA9IGk7XG4gICAgICAgIGluc2lkZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChwcm9qZWN0aW9uID4gYmVzdERpc3RhbmNlKSB7XG4gICAgICAgIGJlc3REaXN0YW5jZSA9IHByb2plY3Rpb247XG4gICAgICAgIG5lYXJlc3RFZGdlID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRpcywgbm9ybWFsLCByYWRpdXNWZWM7XG5cbiAgICBpZiAoIWluc2lkZSkge1xuICAgICAgLy90aGUgY2VudGVyIG9mIGNpcmNsZSBpcyBvdXRzaWRlIG9mIHJlY3RhbmdsZVxuXG4gICAgICAvL3YxIGlzIGZyb20gbGVmdCB2ZXJ0ZXggb2YgZmFjZSB0byBjZW50ZXIgb2YgY2lyY2xlXG4gICAgICAvL3YyIGlzIGZyb20gbGVmdCB2ZXJ0ZXggb2YgZmFjZSB0byByaWdodCB2ZXJ0ZXggb2YgZmFjZVxuICAgICAgdmFyIHYxID0gY2lyYzJQb3Muc3VidHJhY3QodGhpcy5tVmVydGV4W25lYXJlc3RFZGdlXSk7XG4gICAgICB2YXIgdjIgPSB0aGlzLm1WZXJ0ZXhbKG5lYXJlc3RFZGdlICsgMSkgJSA0XS5zdWJ0cmFjdChcbiAgICAgICAgdGhpcy5tVmVydGV4W25lYXJlc3RFZGdlXVxuICAgICAgKTtcblxuICAgICAgdmFyIGRvdCA9IHYxLmRvdCh2Mik7XG5cbiAgICAgIGlmIChkb3QgPCAwKSB7XG4gICAgICAgIC8vdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgaW4gY29ybmVyIHJlZ2lvbiBvZiBtVmVydGV4W25lYXJlc3RFZGdlXVxuICAgICAgICBkaXMgPSB2MS5sZW5ndGgoKTtcbiAgICAgICAgLy9jb21wYXJlIHRoZSBkaXN0YW5jZSB3aXRoIHJhZGl1bSB0byBkZWNpZGUgY29sbGlzaW9uXG4gICAgICAgIGlmIChkaXMgPiBvdGhlckNpci5tUmFkaXVzKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9ybWFsID0gdjEubm9ybWFsaXplKCk7XG4gICAgICAgIHJhZGl1c1ZlYyA9IG5vcm1hbC5zY2FsZSgtb3RoZXJDaXIubVJhZGl1cyk7XG4gICAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgICBvdGhlckNpci5tUmFkaXVzIC0gZGlzLFxuICAgICAgICAgIG5vcm1hbCxcbiAgICAgICAgICBjaXJjMlBvcy5hZGQocmFkaXVzVmVjKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy90aGUgY2VudGVyIG9mIGNpcmNsZSBpcyBpbiBjb3JuZXIgcmVnaW9uIG9mIG1WZXJ0ZXhbbmVhcmVzdEVkZ2UrMV1cblxuICAgICAgICAvL3YxIGlzIGZyb20gcmlnaHQgdmVydGV4IG9mIGZhY2UgdG8gY2VudGVyIG9mIGNpcmNsZVxuICAgICAgICAvL3YyIGlzIGZyb20gcmlnaHQgdmVydGV4IG9mIGZhY2UgdG8gbGVmdCB2ZXJ0ZXggb2YgZmFjZVxuICAgICAgICB2MSA9IGNpcmMyUG9zLnN1YnRyYWN0KHRoaXMubVZlcnRleFsobmVhcmVzdEVkZ2UgKyAxKSAlIDRdKTtcbiAgICAgICAgdjIgPSB2Mi5zY2FsZSgtMSk7XG4gICAgICAgIGRvdCA9IHYxLmRvdCh2Mik7XG4gICAgICAgIGlmIChkb3QgPCAwKSB7XG4gICAgICAgICAgZGlzID0gdjEubGVuZ3RoKCk7XG4gICAgICAgICAgLy9jb21wYXJlIHRoZSBkaXN0YW5jZSB3aXRoIHJhZGl1bSB0byBkZWNpZGUgY29sbGlzaW9uXG4gICAgICAgICAgaWYgKGRpcyA+IG90aGVyQ2lyLm1SYWRpdXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbm9ybWFsID0gdjEubm9ybWFsaXplKCk7XG4gICAgICAgICAgcmFkaXVzVmVjID0gbm9ybWFsLnNjYWxlKC1vdGhlckNpci5tUmFkaXVzKTtcbiAgICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgICBvdGhlckNpci5tUmFkaXVzIC0gZGlzLFxuICAgICAgICAgICAgbm9ybWFsLFxuICAgICAgICAgICAgY2lyYzJQb3MuYWRkKHJhZGl1c1ZlYylcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgaW4gZmFjZSByZWdpb24gb2YgZmFjZVtuZWFyZXN0RWRnZV1cbiAgICAgICAgICBpZiAoYmVzdERpc3RhbmNlIDwgb3RoZXJDaXIubVJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzVmVjID0gdGhpcy5tRmFjZU5vcm1hbFtuZWFyZXN0RWRnZV0uc2NhbGUob3RoZXJDaXIubVJhZGl1cyk7XG4gICAgICAgICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgICAgICAgIG90aGVyQ2lyLm1SYWRpdXMgLSBiZXN0RGlzdGFuY2UsXG4gICAgICAgICAgICAgIHRoaXMubUZhY2VOb3JtYWxbbmVhcmVzdEVkZ2VdLFxuICAgICAgICAgICAgICBjaXJjMlBvcy5zdWJ0cmFjdChyYWRpdXNWZWMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vdGhlIGNlbnRlciBvZiBjaXJjbGUgaXMgaW5zaWRlIG9mIHJlY3RhbmdsZVxuICAgICAgcmFkaXVzVmVjID0gdGhpcy5tRmFjZU5vcm1hbFtuZWFyZXN0RWRnZV0uc2NhbGUob3RoZXJDaXIubVJhZGl1cyk7XG4gICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgIG90aGVyQ2lyLm1SYWRpdXMgLSBiZXN0RGlzdGFuY2UsXG4gICAgICAgIHRoaXMubUZhY2VOb3JtYWxbbmVhcmVzdEVkZ2VdLFxuICAgICAgICBjaXJjMlBvcy5zdWJ0cmFjdChyYWRpdXNWZWMpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbGxpc2lvblRlc3Qob3RoZXJTaGFwZSwgY29sbGlzaW9uSW5mbykge1xuICAgIHZhciBzdGF0dXMgPSBmYWxzZTtcbiAgICBpZiAob3RoZXJTaGFwZS5tVHlwZSA9PT0gJ0NpcmNsZScpIHtcbiAgICAgIHN0YXR1cyA9IHRoaXMuY29sbGlkZWRSZWN0Q2lyYyhvdGhlclNoYXBlLCBjb2xsaXNpb25JbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gdGhpcy5jb2xsaWRlZFJlY3RSZWN0KHRoaXMsIG90aGVyU2hhcGUsIGNvbGxpc2lvbkluZm8pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgbW92ZSh2KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1WZXJ0ZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubVZlcnRleFtpXSA9IHRoaXMubVZlcnRleFtpXS5hZGQodik7XG4gICAgfVxuICAgIHRoaXMubUNlbnRlciA9IHRoaXMubUNlbnRlci5hZGQodik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgIGNvbnRleHQudHJhbnNsYXRlKHRoaXMubVZlcnRleFswXS54LCB0aGlzLm1WZXJ0ZXhbMF0ueSk7XG4gICAgY29udGV4dC5yb3RhdGUodGhpcy5tQW5nbGUpO1xuICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCB0aGlzLm1XaWR0aCwgdGhpcy5tSGVpZ2h0KTtcblxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgdXBkYXRlSW5lcnRpYSgpIHtcbiAgICAvLyBFeHBlY3QgdGhpcy5tSW52TWFzcyB0byBiZSBhbHJlYWR5IGludmVydGVkIVxuICAgIGlmICh0aGlzLm1JbnZNYXNzID09PSAwKSB7XG4gICAgICB0aGlzLm1JbmVydGlhID0gMDtcbiAgICB9IGVsc2Uge1xuICAgIC8vICAgaW5lcnRpYT1tYXNzKndpZHRoXjIraGVpZ2h0XjJcbiAgICAgIHRoaXMubUluZXJ0aWEgPVxuICAgICAgICAoKDEgLyB0aGlzLm1JbnZNYXNzKSAqXG4gICAgICAgICAgKHRoaXMubVdpZHRoICogdGhpcy5tV2lkdGggKyB0aGlzLm1IZWlnaHQgKiB0aGlzLm1IZWlnaHQpKSAvXG4gICAgICAgIDEyO1xuICAgICAgdGhpcy5tSW5lcnRpYSA9IDEgLyB0aGlzLm1JbmVydGlhO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFN1cHBvcnRTdHJ1Y3Qge1xuICBtU3VwcG9ydFBvaW50RGlzdDtcbiAgbVN1cHBvcnRQb2ludDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tU3VwcG9ydFBvaW50ID0gbnVsbDtcbiAgICB0aGlzLm1TdXBwb3J0UG9pbnREaXN0ID0gMDtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3IvZW5naW5lLnZlY3Rvcic7XG5pbXBvcnQgeyBSaWdpZFNoYXBlIH0gZnJvbSAnLi9lbmdpbmUucmlnaWQnO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgUmlnaWRTaGFwZSB7XG4gIG1UeXBlO1xuICBtUmFkaXVzO1xuICBtQm91bmRSYWRpdXM7XG4gIG1TdGFydHBvaW50O1xuICBjb25zdHJ1Y3RvcihjZW50ZXIsIHJhZGl1cywgbWFzcywgZnJpY3Rpb24sIHJlc3RpdHV0aW9uKSB7XG4gICAgc3VwZXIoY2VudGVyLCByYWRpdXMsIG1hc3MsIGZyaWN0aW9uKTtcbiAgICB0aGlzLm1UeXBlID0gJ0NpcmNsZSc7XG4gICAgdGhpcy5tUmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMubUJvdW5kUmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMubVN0YXJ0cG9pbnQgPSBuZXcgVmVjdG9yKGNlbnRlci54LCBjZW50ZXIueSAtIHJhZGl1cyk7XG4gICAgdGhpcy51cGRhdGVJbmVydGlhKCk7XG4gIH1cblxuICBtb3ZlKHMpIHtcbiAgICB0aGlzLm1TdGFydHBvaW50ID0gdGhpcy5tU3RhcnRwb2ludC5hZGQocyk7XG4gICAgdGhpcy5tQ2VudGVyID0gdGhpcy5tQ2VudGVyLmFkZChzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAvL2RyYXcgYSBjaXJjbGVcbiAgICBjb250ZXh0LmFyYyhcbiAgICAgIHRoaXMubUNlbnRlci54LFxuICAgICAgdGhpcy5tQ2VudGVyLnksXG4gICAgICB0aGlzLm1SYWRpdXMsXG4gICAgICAwLFxuICAgICAgTWF0aC5QSSAqIDIsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIC8vZHJhdyBhIGxpbmUgZnJvbSBzdGFydCBwb2ludCB0b3dhcmQgY2VudGVyXG4gICAgY29udGV4dC5tb3ZlVG8odGhpcy5tU3RhcnRwb2ludC54LCB0aGlzLm1TdGFydHBvaW50LnkpO1xuICAgIGNvbnRleHQubGluZVRvKHRoaXMubUNlbnRlci54LCB0aGlzLm1DZW50ZXIueSk7XG5cbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICAvL3JvdGF0ZSBhbmdsZSBpbiBjb3VudGVyY2xvY2t3aXNlXG4gIHJvdGF0ZShhbmdsZSkge1xuICAgIHRoaXMubUFuZ2xlICs9IGFuZ2xlO1xuICAgIHRoaXMubVN0YXJ0cG9pbnQgPSB0aGlzLm1TdGFydHBvaW50LnJvdGF0ZSh0aGlzLm1DZW50ZXIsIGFuZ2xlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZUluZXJ0aWEoKSB7XG4gICAgaWYgKHRoaXMubUludk1hc3MgPT09IDApIHtcbiAgICAgIHRoaXMubUluZXJ0aWEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLm1JbnZNYXNzIGlzIGludmVydGVkISFcbiAgICAgIC8vIEluZXJ0aWE9bWFzcyAqIHJhZGl1c14yXG4gICAgICAvLyAxMiBpcyBhIGNvbnN0YW50IHZhbHVlIHRoYXQgY2FuIGJlIGNoYW5nZWRcbiAgICAgIHRoaXMubUluZXJ0aWEgPVxuICAgICAgICAoKDEgLyB0aGlzLm1JbnZNYXNzKSAqICh0aGlzLm1SYWRpdXMgKiB0aGlzLm1SYWRpdXMpKSAvIDEyO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxpc2lvblRlc3Qob3RoZXJTaGFwZSwgY29sbGlzaW9uSW5mbykge1xuICAgIHZhciBzdGF0dXMgPSBmYWxzZTtcbiAgICBpZiAob3RoZXJTaGFwZS5tVHlwZSA9PT0gJ0NpcmNsZScpIHtcbiAgICAgIHN0YXR1cyA9IHRoaXMuY29sbGlkZWRDaXJjQ2lyYyh0aGlzLCBvdGhlclNoYXBlLCBjb2xsaXNpb25JbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gb3RoZXJTaGFwZS5jb2xsaWRlZFJlY3RDaXJjKHRoaXMsIGNvbGxpc2lvbkluZm8pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgY29sbGlkZWRDaXJjQ2lyYyhjMSwgYzIsIGNvbGxpc2lvbkluZm8pIHtcbiAgICB2YXIgdkZyb20xdG8yID0gYzIubUNlbnRlci5zdWJ0cmFjdChjMS5tQ2VudGVyKTtcbiAgICB2YXIgclN1bSA9IGMxLm1SYWRpdXMgKyBjMi5tUmFkaXVzO1xuICAgIHZhciBkaXN0ID0gdkZyb20xdG8yLmxlbmd0aCgpO1xuICAgIGlmIChkaXN0ID4gTWF0aC5zcXJ0KHJTdW0gKiByU3VtKSkge1xuICAgICAgLy9ub3Qgb3ZlcmxhcHBpbmdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGRpc3QgIT09IDApIHtcbiAgICAgIC8vIG92ZXJsYXBwaW5nIGJ1IG5vdCBzYW1lIHBvc2l0aW9uXG4gICAgICB2YXIgbm9ybWFsRnJvbTJ0bzEgPSB2RnJvbTF0bzIuc2NhbGUoLTEpLm5vcm1hbGl6ZSgpO1xuICAgICAgdmFyIHJhZGl1c0MyID0gbm9ybWFsRnJvbTJ0bzEuc2NhbGUoYzIubVJhZGl1cyk7XG4gICAgICBjb2xsaXNpb25JbmZvLnNldEluZm8oXG4gICAgICAgIHJTdW0gLSBkaXN0LFxuICAgICAgICB2RnJvbTF0bzIubm9ybWFsaXplKCksXG4gICAgICAgIGMyLm1DZW50ZXIuYWRkKHJhZGl1c0MyKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9zYW1lIHBvc2l0aW9uXG4gICAgICBpZiAoYzEubVJhZGl1cyA+IGMyLm1SYWRpdXMpIHtcbiAgICAgICAgY29sbGlzaW9uSW5mby5zZXRJbmZvKFxuICAgICAgICAgIHJTdW0sXG4gICAgICAgICAgbmV3IFZlY3RvcigwLCAtMSksXG4gICAgICAgICAgYzEubUNlbnRlci5hZGQobmV3IFZlY3RvcigwLCBjMS5tUmFkaXVzKSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxpc2lvbkluZm8uc2V0SW5mbyhcbiAgICAgICAgICByU3VtLFxuICAgICAgICAgIG5ldyBWZWN0b3IoMCwgLTEpLFxuICAgICAgICAgIGMyLm1DZW50ZXIuYWRkKG5ldyBWZWN0b3IoMCwgYzIubVJhZGl1cykpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9