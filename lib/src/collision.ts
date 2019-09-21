import { Vector } from './module/vector/engine.vector';

/*
 * File: CollisionInfo.js
 *      normal: vector upon which collision interpenetrates
 *      depth: how much penetration
 */

/*jslint node: true, vars: true, evil: true, bitwise: true */

/**
 * Default Constructor
 * @memberOf CollisionInfo
 * @returns {CollisionInfo} New instance of CollisionInfo
 */
window.CollisionInfo = function() {
  this.mDepth = 0;
  this.mNormal = new Vector(0, 0);
  this.mStart = new Vector(0, 0);
  this.mEnd = new Vector(0, 0);
};

/**
 * Set the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} s how much penetration
 * @returns {void}
 */
CollisionInfo.prototype.setDepth = function(s) {
  this.mDepth = s;
};

/**
 * Set the normal of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Vector} s vector upon which collision interpenetrates
 * @returns {void}
 */
CollisionInfo.prototype.setNormal = function(s) {
  this.mNormal = s;
};

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {Number} how much penetration
 */
CollisionInfo.prototype.getDepth = function() {
  return this.mDepth;
};

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {Vector} vector upon which collision interpenetrates
 */
CollisionInfo.prototype.getNormal = function() {
  return this.mNormal;
};

/**
 * Set the all value of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} d the depth of the CollisionInfo
 * @param {Vector} n the normal of the CollisionInfo
 * @param {Vector} s the startpoint of the CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.setInfo = function(d, n, s) {
  this.mDepth = d;
  this.mNormal = n;
  this.mStart = s;
  this.mEnd = s.add(n.scale(d));
};

/**
 * change the direction of normal
 * @memberOf CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.changeDir = function() {
  this.mNormal = this.mNormal.scale(-1);
  var n = this.mStart;
  this.mStart = this.mEnd;
  this.mEnd = n;
};

export default CollisionInfo;
