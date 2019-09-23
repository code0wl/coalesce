import { Vector } from './module/vector/engine.vector';
import { CollisionInfo } from './module/logger/collision.info';
import { Canvas } from './module/canvas/engine.canvas';

let gObjectNum = 0;

const { context, width, height } = new Canvas(
  window.innerWidth,
  window.innerHeight
);

const Physics = function() {
  let mPositionalCorrectionFlag = true;
  let mRelaxationCount = 15; // number of relaxation iteration
  let mPosCorrectionRate = 0.8; // percentage of separation to project objects

  let positionalCorrection = function(s1, s2, collisionInfo) {
    let s1InvMass = s1.mInvMass;
    let s2InvMass = s2.mInvMass;

    let num =
      (collisionInfo.getDepth() / (s1InvMass + s2InvMass)) * mPosCorrectionRate;
    let correctionAmount = collisionInfo.getNormal().scale(num);

    s1.move(correctionAmount.scale(-s1InvMass));
    s2.move(correctionAmount.scale(s2InvMass));
  };

  let resolveCollision = function(s1, s2, collisionInfo) {
    if (s1.mInvMass === 0 && s2.mInvMass === 0) {
      return;
    }

    //  correct positions
    if (Coalesce.Physics.mPositionalCorrectionFlag) {
      positionalCorrection(s1, s2, collisionInfo);
    }

    let n = collisionInfo.getNormal();

    //the direction of collisionInfo is always from s1 to s2
    //but the Mass is inversed, so start scale with s2 and end scale with s1
    let start = collisionInfo.mStart.scale(
      s2.mInvMass / (s1.mInvMass + s2.mInvMass)
    );
    let end = collisionInfo.mEnd.scale(
      s1.mInvMass / (s1.mInvMass + s2.mInvMass)
    );
    let p = start.add(end);
    //r is Vector from center of object to collision point
    let r1 = p.subtract(s1.mCenter);
    let r2 = p.subtract(s2.mCenter);

    //newV = V + mAngularVelocity cross R
    let v1 = s1.mVelocity.add(
      new Vector(-1 * s1.mAngularVelocity * r1.y, s1.mAngularVelocity * r1.x)
    );
    let v2 = s2.mVelocity.add(
      new Vector(-1 * s2.mAngularVelocity * r2.y, s2.mAngularVelocity * r2.x)
    );
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

  let drawCollisionInfo = function(collisionInfo, context) {
    context.beginPath();
    context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
    context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
    context.closePath();
    context.strokeStyle = 'orange';
    context.stroke();
  };

  const collision = function() {
    let i, j, k;
    let collisionInfo = new CollisionInfo();
    for (k = 0; k < mRelaxationCount; k++) {
      for (i = 0; i < Coalesce.Core.mAllObjects.length; i++) {
        for (j = i + 1; j < Coalesce.Core.mAllObjects.length; j++) {
          if (
            Coalesce.Core.mAllObjects[i].boundTest(Coalesce.Core.mAllObjects[j])
          ) {
            if (
              Coalesce.Core.mAllObjects[i].collisionTest(
                Coalesce.Core.mAllObjects[j],
                collisionInfo
              )
            ) {
              //make sure the normal is always from object[i] to object[j]
              if (
                collisionInfo
                  .getNormal()
                  .dot(
                    Coalesce.Core.mAllObjects[j].mCenter.subtract(
                      Coalesce.Core.mAllObjects[i].mCenter
                    )
                  ) < 0
              ) {
                collisionInfo.changeDir();
              }

              resolveCollision(
                Coalesce.Core.mAllObjects[i],
                Coalesce.Core.mAllObjects[j],
                collisionInfo
              );
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

const Core = function() {
  let mGravity = new Vector(0, 20);
  let mMovement = true;

  let mCurrentTime,
    mElapsedTime,
    mPreviousTime = Date.now(),
    mLagTime = 0;
  const kFPS = 60; // Frames per second
  let kFrameTime = 1 / kFPS;
  let mUpdateIntervalInSeconds = kFrameTime;
  let kMPF = 1000 * kFrameTime; // Milliseconds per frame.
  let mAllObjects = [];

  let updateUIEcho = function() {
    if (!mAllObjects.length) return;
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
      Coalesce.Physics.mPositionalCorrectionFlag +
      '</li>' +
      '<li>Movement: ' +
      Coalesce.Core.mMovement +
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
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < mAllObjects.length; i++) {
      context.strokeStyle = 'blue';
      if (i === gObjectNum) {
        context.strokeStyle = 'red';
      }
      mAllObjects[i].draw(context);
    }
  };

  const update = () => {
    for (let i = 0; i < mAllObjects.length; i++) {
      mAllObjects[i].update(context);
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
      Coalesce.Physics.collision();
      update();
    }
  };

  let initializeEngineCore = function() {
    runGameLoop();
  };

  return {
    initializeEngineCore,
    mAllObjects,
    context,
    width,
    height,
    mGravity,
    mUpdateIntervalInSeconds,
    mMovement
  };
};

export const Coalesce = { Core: Core(), Physics: Physics() };
