import Vector from "./Vector.js";

const logger = DeviceRuntimeCore.HmLogger.getLogger('Space Breaker');
export function log(...args) {
  logger.debug(...args);
}

export function getCoorditatesAfterRotation({ position, angle, origin }) {
  return new Vector(
    (position.x - origin.x) * Math.cos(angle) - (position.y - origin.y) * Math.sin(angle) + origin.x,
    (position.x - origin.x) * Math.sin(angle) + (position.y - origin.y) * Math.cos(angle) + origin.y
  );
}

export function getMinMax(min, max, origMin, origMax, value) { // -1 1 -100 100, -1
  const origDist = Math.abs(origMax - origMin); // 100 - (-100) = 200
  const dist = Math.abs(max - min); // 1 - (-1) = 2
  const coef = origDist / dist; // 200 / 2 = 100

  return origMin + (coef + value * coef); // -100 + (100 + (-100))
}

export function lineCircleCollision(line, circle) {
  // LINE IS AN OBJECT WITH TWO PROPS: "start" - Vector and "end" - Vector
  const startLineToEndLineVector = line.end.sub(line.start);
  const centerBallToStartLineVector = line.start.sub(circle.position);
  const centerBallToEndLineVector = line.end.sub(circle.position);

  // CHECK IF CLOSEST POINT IS START POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToStartLineVector.normalize()) > 0) {
    return {
      result: line.start.sub(circle.position).mag() + 0.01 < circle.radius,
      projectionPoint: line.start
    }
  }

  // CHECK IF CLOSEST POINT IS END POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToEndLineVector.normalize()) < 0) {
    return {
      result: line.end.sub(circle.position).mag() + 0.01 < circle.radius,
      projectionPoint: line.end
    }
  }

  const startLineToCenterBallVector = circle.position.sub(line.start);

  const projectionLength = Vector.dot(startLineToEndLineVector.normalize(), startLineToCenterBallVector);
  const projectionPoint = line.start.add(startLineToEndLineVector.setMag(projectionLength));

  return {
    result: projectionPoint.sub(circle.position).mag() < circle.radius,
    projectionPoint
  }
}

export function radiansToDegrees(radiansValue) {
  return radiansValue * (180 / Math.PI);
}

export function normalizeAngle(angle) {
  const newAngle = (angle % (Math.PI * 2));

  if (newAngle > 0) return newAngle;

  return newAngle + Math.PI * 2;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
