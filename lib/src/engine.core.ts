import { Vector } from './module/vector/engine.vector';
import { Rectangle } from './module/rigid/engine.shape.rectangle';
import { Circle } from './module/rigid/engine.shape.circle';
import { CollisionInfo } from './module/logger/collision.info';

window.collisionInfoR1 = new CollisionInfo();
window.collisionInfoR2 = new CollisionInfo();

declare const window: any;

window.gEngine = window.gEngine || {};

gEngine.Physics = (function() {
  var mPositionalCorrectionFlag = true;
  var mRelaxationCount = 15; // number of relaxation iteration
  var mPosCorrectionRate = 0.8; // percentage of separation to project objects

  var positionalCorrection = function(s1, s2, collisionInfo) {
    var s1InvMass = s1.mInvMass;
    var s2InvMass = s2.mInvMass;

    var num =
      (collisionInfo.getDepth() / (s1InvMass + s2InvMass)) * mPosCorrectionRate;
    var correctionAmount = collisionInfo.getNormal().scale(num);

    s1.move(correctionAmount.scale(-s1InvMass));
    s2.move(correctionAmount.scale(s2InvMass));
  };

  var resolveCollision = function(s1, s2, collisionInfo) {
    if (s1.mInvMass === 0 && s2.mInvMass === 0) {
      return;
    }

    //  correct positions
    if (gEngine.Physics.mPositionalCorrectionFlag) {
      positionalCorrection(s1, s2, collisionInfo);
    }

    var n = collisionInfo.getNormal();

    //the direction of collisionInfo is always from s1 to s2
    //but the Mass is inversed, so start scale with s2 and end scale with s1
    var start = collisionInfo.mStart.scale(
      s2.mInvMass / (s1.mInvMass + s2.mInvMass)
    );
    var end = collisionInfo.mEnd.scale(
      s1.mInvMass / (s1.mInvMass + s2.mInvMass)
    );
    var p = start.add(end);
    //r is Vector from center of object to collision point
    var r1 = p.subtract(s1.mCenter);
    var r2 = p.subtract(s2.mCenter);

    //newV = V + mAngularVelocity cross R
    var v1 = s1.mVelocity.add(
      new Vector(-1 * s1.mAngularVelocity * r1.y, s1.mAngularVelocity * r1.x)
    );
    var v2 = s2.mVelocity.add(
      new Vector(-1 * s2.mAngularVelocity * r2.y, s2.mAngularVelocity * r2.x)
    );
    var relativeVelocity = v2.subtract(v1);

    // Relative velocity in normal direction
    var rVelocityInNormal = relativeVelocity.dot(n);

    //if objects moving apart ignore
    if (rVelocityInNormal > 0) {
      return;
    }

    // compute and apply response impulses for each object
    var newRestituion = Math.min(s1.mRestitution, s2.mRestitution);
    var newFriction = Math.min(s1.mFriction, s2.mFriction);

    //R cross N
    var R1crossN = r1.cross(n);
    var R2crossN = r2.cross(n);

    // Calc impulse scalar
    // the formula of jN can be found in http://www.myphysicslab.com/collision.html
    var jN = -(1 + newRestituion) * rVelocityInNormal;
    jN =
      jN /
      (s1.mInvMass +
        s2.mInvMass +
        R1crossN * R1crossN * s1.mInertia +
        R2crossN * R2crossN * s2.mInertia);

    //impulse is in direction of normal ( from s1 to s2)
    var impulse = n.scale(jN);
    // impulse = F dt = m * ?v
    // ?v = impulse / m
    s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
    s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));

    s1.mAngularVelocity -= R1crossN * jN * s1.mInertia;
    s2.mAngularVelocity += R2crossN * jN * s2.mInertia;

    var tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));

    //relativeVelocity.dot(tangent) should less than 0
    tangent = tangent.normalize().scale(-1);

    var R1crossT = r1.cross(tangent);
    var R2crossT = r2.cross(tangent);

    var jT = -(1 + newRestituion) * relativeVelocity.dot(tangent) * newFriction;
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

  var drawCollisionInfo = function(collisionInfo, context) {
    context.beginPath();
    context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
    context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
    context.closePath();
    context.strokeStyle = 'orange';
    context.stroke();
  };
  var collision = function() {
    var i, j, k;
    var collisionInfo = new CollisionInfo();
    for (k = 0; k < mRelaxationCount; k++) {
      for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
        for (j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
          if (
            gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])
          ) {
            if (
              gEngine.Core.mAllObjects[i].collisionTest(
                gEngine.Core.mAllObjects[j],
                collisionInfo
              )
            ) {
              //make sure the normal is always from object[i] to object[j]
              if (
                collisionInfo
                  .getNormal()
                  .dot(
                    gEngine.Core.mAllObjects[j].mCenter.subtract(
                      gEngine.Core.mAllObjects[i].mCenter
                    )
                  ) < 0
              ) {
                collisionInfo.changeDir();
              }

              //draw collision info (a black line that shows normal)
              //drawCollisionInfo(collisionInfo, gEngine.Core.mContext);

              resolveCollision(
                gEngine.Core.mAllObjects[i],
                gEngine.Core.mAllObjects[j],
                collisionInfo
              );
            }
          }
        }
      }
    }
  };
  var mPublic = {
    collision: collision,
    mPositionalCorrectionFlag: mPositionalCorrectionFlag
  };

  return mPublic;
})();

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, evil: true, bitwise: true */
/*global  requestAnimationFrame: false */
/*global document,gObjectNum */
// Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
window.gEngine = gEngine || {};
// initialize the variable while ensuring it is not redefined
gEngine.Core = (function() {
  var mCanvas,
    mContext,
    mWidth = window.innerWidth,
    mHeight = window.innerHeight;
  mCanvas = document.getElementById('canvas');
  mContext = mCanvas.getContext('2d');
  mCanvas.height = mHeight;
  mCanvas.width = mWidth;

  var mGravity = new Vector(0, 20);
  var mMovement = true;

  var mCurrentTime,
    mElapsedTime,
    mPreviousTime = Date.now(),
    mLagTime = 0;
  var kFPS = 60; // Frames per second
  var kFrameTime = 1 / kFPS;
  var mUpdateIntervalInSeconds = kFrameTime;
  var kMPF = 1000 * kFrameTime; // Milliseconds per frame.
  var mAllObjects = [];

  var updateUIEcho = function() {
    if (!mAllObjects.length) return;
    document.getElementById('uiEchoString').innerHTML =
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
      gEngine.Physics.mPositionalCorrectionFlag +
      '</li>' +
      '<li>Movement: ' +
      gEngine.Core.mMovement +
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
  var draw = function() {
    mContext.clearRect(0, 0, mWidth, mHeight);
    var i;
    for (i = 0; i < mAllObjects.length; i++) {
      mContext.strokeStyle = 'blue';
      if (i === gObjectNum) {
        mContext.strokeStyle = 'red';
      }
      mAllObjects[i].draw(mContext);
    }
  };
  var update = function() {
    var i;
    for (i = 0; i < mAllObjects.length; i++) {
      mAllObjects[i].update(mContext);
    }
  };
  var runGameLoop = function() {
    requestAnimationFrame(function() {
      runGameLoop();
    });

    //      compute how much time has elapsed since we last runGameLoop was executed
    mCurrentTime = Date.now();
    mElapsedTime = mCurrentTime - mPreviousTime;
    mPreviousTime = mCurrentTime;
    mLagTime += mElapsedTime;

    updateUIEcho();
    draw();
    //      Make sure we update the game the appropriate number of times.
    //      Update only every Milliseconds per frame.
    //      If lag larger then update frames, update until caught up.
    while (mLagTime >= kMPF) {
      mLagTime -= kMPF;
      gEngine.Physics.collision();
      update();
    }
  };
  var initializeEngineCore = function() {
    runGameLoop();
  };
  var mPublic = {
    initializeEngineCore: initializeEngineCore,
    mAllObjects: mAllObjects,
    mWidth: mWidth,
    mHeight: mHeight,
    mContext: mContext,
    mGravity: mGravity,
    mUpdateIntervalInSeconds: mUpdateIntervalInSeconds,
    mMovement: mMovement
  };
  return mPublic;
})();

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */

/* global height, width, gEngine */
window.MyGame = function() {
  var r1 = new Rectangle(new Vector(500, 200), 400, 20, 0, 0.3, 0);
  r1.rotate(2.8);

  for (var i = 0; i < 10; i++) {
    var r1 = new Rectangle(
      new Vector(
        Math.random() * gEngine.Core.mWidth,
        (Math.random() * gEngine.Core.mHeight) / 2
      ),
      Math.random() * 50 + 10,
      Math.random() * 50 + 10,
      Math.random() * 30,
      Math.random(),
      Math.random()
    );
    r1.mVelocity = new Vector(Math.random() * 60 - 30, Math.random() * 60 - 30);
    var r1 = new Circle(
      new Vector(
        Math.random() * gEngine.Core.mWidth,
        (Math.random() * gEngine.Core.mHeight) / 2
      ),
      Math.random() * 20 + 10,
      Math.random() * 30,
      Math.random(),
      Math.random()
    );
    r1.mVelocity = new Vector(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }
};

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */

/* global mAllObjects, gEngine */

var gObjectNum = 0;
document.addEventListener('keydown', event => {
  var keycode;

  if (window.event) {
    //alert('ie');
    keycode = event.keyCode;
  } else if (event.which) {
    //alert('firefox ');
    keycode = event.which;
  }
  if (keycode >= 48 && keycode <= 57) {
    if (keycode - 48 < gEngine.Core.mAllObjects.length) {
      gObjectNum = keycode - 48;
    }
  }
  if (keycode === 38) {
    //up arrow
    if (gObjectNum > 0) {
      gObjectNum--;
    }
  }
  if (keycode === 40) {
    // down arrow
    if (gObjectNum < gEngine.Core.mAllObjects.length - 1) {
      gObjectNum++;
    }
  }
  if (keycode === 87) {
    //W
    gEngine.Core.mAllObjects[gObjectNum].move(new Vector(0, -10));
  }
  if (keycode === 83) {
    // S
    gEngine.Core.mAllObjects[gObjectNum].move(new Vector(0, +10));
  }
  if (keycode === 65) {
    //A
    gEngine.Core.mAllObjects[gObjectNum].move(new Vector(-10, 0));
  }
  if (keycode === 68) {
    //D
    gEngine.Core.mAllObjects[gObjectNum].move(new Vector(10, 0));
  }
  if (keycode === 81) {
    //Q
    gEngine.Core.mAllObjects[gObjectNum].rotate(-0.1);
  }
  if (keycode === 69) {
    //E
    gEngine.Core.mAllObjects[gObjectNum].rotate(0.1);
  }
  if (keycode === 73) {
    //I
    gEngine.Core.mAllObjects[gObjectNum].mVelocity.y -= 1;
  }
  if (keycode === 75) {
    // k
    gEngine.Core.mAllObjects[gObjectNum].mVelocity.y += 1;
  }
  if (keycode === 74) {
    //j
    gEngine.Core.mAllObjects[gObjectNum].mVelocity.x -= 1;
  }
  if (keycode === 76) {
    //l
    gEngine.Core.mAllObjects[gObjectNum].mVelocity.x += 1;
  }
  if (keycode === 85) {
    //U
    gEngine.Core.mAllObjects[gObjectNum].mAngularVelocity -= 0.1;
  }
  if (keycode === 79) {
    //O
    gEngine.Core.mAllObjects[gObjectNum].mAngularVelocity += 0.1;
  }
  if (keycode === 90) {
    //Z
    gEngine.Core.mAllObjects[gObjectNum].updateMass(-1);
  }
  if (keycode === 88) {
    //X
    gEngine.Core.mAllObjects[gObjectNum].updateMass(1);
  }
  if (keycode === 67) {
    //C
    gEngine.Core.mAllObjects[gObjectNum].mFriction -= 0.01;
  }
  if (keycode === 86) {
    //V
    gEngine.Core.mAllObjects[gObjectNum].mFriction += 0.01;
  }
  if (keycode === 66) {
    //B
    gEngine.Core.mAllObjects[gObjectNum].mRestitution -= 0.01;
  }
  if (keycode === 78) {
    //N
    gEngine.Core.mAllObjects[gObjectNum].mRestitution += 0.01;
  }
  if (keycode === 77) {
    //M
    gEngine.Physics.mPositionalCorrectionFlag = !gEngine.Physics
      .mPositionalCorrectionFlag;
  }
  if (keycode === 188) {
    //，
    gEngine.Core.mMovement = !gEngine.Core.mMovement;
  }
  if (keycode === 70) {
    //f
    var r1 = new Rectangle(
      new Vector(
        gEngine.Core.mAllObjects[gObjectNum].mCenter.x,
        gEngine.Core.mAllObjects[gObjectNum].mCenter.y
      ),
      Math.random() * 30 + 10,
      Math.random() * 30 + 10,
      Math.random() * 30,
      Math.random(),
      Math.random()
    );
    r1.mVelocity = new Vector(
      Math.random() * 300 - 150,
      Math.random() * 300 - 150
    );
  }
  if (keycode === 71) {
    //g
    var r1 = new Circle(
      new Vector(
        gEngine.Core.mAllObjects[gObjectNum].mCenter.x,
        gEngine.Core.mAllObjects[gObjectNum].mCenter.y
      ),
      Math.random() * 10 + 20,
      Math.random() * 30,
      Math.random(),
      Math.random()
    );
    r1.mVelocity = new Vector(
      Math.random() * 300 - 150,
      Math.random() * 300 - 150
    );
  }

  if (keycode === 72) {
    //H
    var i;
    for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
      if (gEngine.Core.mAllObjects[i].mInvMass !== 0) {
        gEngine.Core.mAllObjects[i].mVelocity = new Vector(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250
        );
      }
    }
  }
  if (keycode === 82) {
    //R
    gEngine.Core.mAllObjects.splice(7, gEngine.Core.mAllObjects.length);
    gObjectNum = 0;
  }
});

window['game'] = new window.MyGame();
gEngine.Core.initializeEngineCore();
