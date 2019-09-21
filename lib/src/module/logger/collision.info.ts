import { Vector } from '../vector/engine.vector';

export class CollisionInfo {
  mDepth;
  mNormal;
  mStart;
  mEnd;
  constructor() {
    this.mDepth = 0;
    this.mNormal = new Vector(0, 0);
    this.mStart = new Vector(0, 0);
    this.mEnd = new Vector(0, 0);
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
