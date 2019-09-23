export const updateLog = function(objs, num, {...options}) {
  if (!objs.length) return;
  document.getElementById('info').innerHTML =
    '<p><b>Selected Object:</b>:</p>' +
    '<ul style="margin:-10px">' +
    '<li>Id: ' +
    num +
    '</li>' +
    '<li>Center: ' +
    objs[num].mCenter.x.toPrecision(3) +
    ',' +
    objs[num].mCenter.y.toPrecision(3) +
    '</li>' +
    '<li>Angle: ' +
    objs[num].mAngle.toPrecision(3) +
    '</li>' +
    '<li>Velocity: ' +
    objs[num].mVelocity.x.toPrecision(3) +
    ',' +
    objs[num].mVelocity.y.toPrecision(3) +
    '</li>' +
    '<li>AngluarVelocity: ' +
    objs[num].mAngularVelocity.toPrecision(3) +
    '</li>' +
    '<li>Mass: ' +
    1 / objs[num].mInvMass.toPrecision(3) +
    '</li>' +
    '<li>Friction: ' +
    objs[num].mFriction.toPrecision(3) +
    '</li>' +
    '<li>Restitution: ' +
    objs[num].mRestitution.toPrecision(3) +
    '</li>' +
    '<li>Positional Correction: ' +
    options.mPositionalCorrectionFlag +
    '</li>' +
    '<li>Movement: ' +
    options.Movement +
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
