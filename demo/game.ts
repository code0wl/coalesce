import {
  Coalesce,
  Vector,
  Rectangle,
  Circle
} from '2d-physics-engine-core/src/';
let gObjectNum = 0;

class MyGame {
  gObjectNum;
  constructor() {
    var r1 = new Rectangle(new Vector(500, 200), 400, 20, 0, 0.3, 0);
    r1.rotate(2.8);

    for (var i = 0; i < 10; i++) {
      var r1 = new Rectangle(
        new Vector(
          Math.random() * Coalesce.Core.mWidth,
          (Math.random() * Coalesce.Core.mHeight) / 2
        ),
        Math.random() * 50 + 10,
        Math.random() * 50 + 10,
        Math.random() * 30,
        Math.random(),
        Math.random()
      );
      r1.mVelocity = new Vector(
        Math.random() * 60 - 30,
        Math.random() * 60 - 30
      );
      var r1 = new Circle(
        new Vector(
          Math.random() * Coalesce.Core.mWidth,
          (Math.random() * Coalesce.Core.mHeight) / 2
        ),
        Math.random() * 20 + 10,
        Math.random() * 30,
        Math.random(),
        Math.random()
      );
      r1.mVelocity = new Vector(
        Math.random() * 60 - 30,
        Math.random() * 60 - 30
      );
    }
  }
}

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
    if (keycode - 48 < Coalesce.Core.mAllObjects.length) {
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
    if (gObjectNum < Coalesce.Core.mAllObjects.length - 1) {
      gObjectNum++;
    }
  }
  if (keycode === 87) {
    //W
    Coalesce.Core.mAllObjects[gObjectNum].move(new Vector(0, -10));
  }
  if (keycode === 83) {
    // S
    Coalesce.Core.mAllObjects[gObjectNum].move(new Vector(0, +10));
  }
  if (keycode === 65) {
    //A
    Coalesce.Core.mAllObjects[gObjectNum].move(new Vector(-10, 0));
  }
  if (keycode === 68) {
    //D
    Coalesce.Core.mAllObjects[gObjectNum].move(new Vector(10, 0));
  }
  if (keycode === 81) {
    //Q
    Coalesce.Core.mAllObjects[gObjectNum].rotate(-0.1);
  }
  if (keycode === 69) {
    //E
    Coalesce.Core.mAllObjects[gObjectNum].rotate(0.1);
  }
  if (keycode === 73) {
    //I
    Coalesce.Core.mAllObjects[gObjectNum].mVelocity.y -= 1;
  }
  if (keycode === 75) {
    // k
    Coalesce.Core.mAllObjects[gObjectNum].mVelocity.y += 1;
  }
  if (keycode === 74) {
    //j
    Coalesce.Core.mAllObjects[gObjectNum].mVelocity.x -= 1;
  }
  if (keycode === 76) {
    //l
    Coalesce.Core.mAllObjects[gObjectNum].mVelocity.x += 1;
  }
  if (keycode === 85) {
    //U
    Coalesce.Core.mAllObjects[gObjectNum].mAngularVelocity -= 0.1;
  }
  if (keycode === 79) {
    //O
    Coalesce.Core.mAllObjects[gObjectNum].mAngularVelocity += 0.1;
  }
  if (keycode === 90) {
    //Z
    Coalesce.Core.mAllObjects[gObjectNum].updateMass(-1);
  }
  if (keycode === 88) {
    //X
    Coalesce.Core.mAllObjects[gObjectNum].updateMass(1);
  }
  if (keycode === 67) {
    //C
    Coalesce.Core.mAllObjects[gObjectNum].mFriction -= 0.01;
  }
  if (keycode === 86) {
    //V
    Coalesce.Core.mAllObjects[gObjectNum].mFriction += 0.01;
  }
  if (keycode === 66) {
    //B
    Coalesce.Core.mAllObjects[gObjectNum].mRestitution -= 0.01;
  }
  if (keycode === 78) {
    //N
    Coalesce.Core.mAllObjects[gObjectNum].mRestitution += 0.01;
  }
  if (keycode === 77) {
    //M
    Physics.mPositionalCorrectionFlag = !Physics.mPositionalCorrectionFlag;
  }
  if (keycode === 188) {
    //，
    Coalesce.Core.mMovement = !Coalesce.Core.mMovement;
  }
  if (keycode === 70) {
    //f
    var r1 = new Rectangle(
      new Vector(
        Coalesce.Core.mAllObjects[gObjectNum].mCenter.x,
        Coalesce.Core.mAllObjects[gObjectNum].mCenter.y
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
        Coalesce.Core.mAllObjects[gObjectNum].mCenter.x,
        Coalesce.Core.mAllObjects[gObjectNum].mCenter.y
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
    for (i = 0; i < Coalesce.Core.mAllObjects.length; i++) {
      if (Coalesce.Core.mAllObjects[i].mInvMass !== 0) {
        Coalesce.Core.mAllObjects[i].mVelocity = new Vector(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250
        );
      }
    }
  }
  if (keycode === 82) {
    //R
    Coalesce.Core.mAllObjects.splice(7, Coalesce.Core.mAllObjects.length);
    gObjectNum = 0;
  }
});

new MyGame();
// Coalesce.Core().initializeEngineCore();
