import { COLORS, DEVICE_WIDTH, SCREEN_CENTER } from "../consts";
import { getRandomInt } from "../utils/helpers";
import Vector from "../utils/Vector";
import Image from './Image';

const BALL_IMAGE_MAP = {
  [COLORS.BLUE]: 'blue',
  [COLORS.YELLOW]: 'yellow',
  [COLORS.RED]: 'red',
  [COLORS.GREEN]: 'green'
};

export default class Ball {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.maxSpeed = 3;

    this.acceleration = new Vector(0, 0);
    this.velocity = Vector.random().setMag(this.maxSpeed);
    this.position = SCREEN_CENTER;

    this.setOrChangeColor();
  }

  get image() {
    return `ball/${BALL_IMAGE_MAP[this.color]}-ball.png`;
  }

  get radius() {
    return this.width / 2;
  }

  increaseSpeed() {
    this.maxSpeed += 1;
  }

  setOrChangeColor() {
    this.color = Object.values(COLORS)[getRandomInt(0, Object.values(COLORS).length - 1)];

    if (this.widget) {
      this.widget.setSrc(this.image);
    }
  }

  checkDeviceBorders() {
    if (this.position.sub(SCREEN_CENTER).mag() > DEVICE_WIDTH / 2 + this.width / 2) {
      this.game.stop();
    }
  }

  wallPenetrationResolution() {
    const currentPenetration = (this.position.sub(SCREEN_CENTER).mag() + this.radius) - (DEVICE_WIDTH / 2 - this.game.walls.height);
    this.position = this.position.add(SCREEN_CENTER.sub(this.position).setMag(currentPenetration));
  }

  changeVelocityAfterCollision(collidedWall) {
    const collidedWallStart = SCREEN_CENTER.add(Vector.fromAngle(collidedWall.start + this.game.walls.currentAngle).setMag(DEVICE_WIDTH / 2 - this.game.walls.height));
    const collidedWallEnd = SCREEN_CENTER.add(Vector.fromAngle(collidedWall.end + this.game.walls.currentAngle).setMag(DEVICE_WIDTH / 2 - this.game.walls.height));
    const startToEndVector = collidedWallEnd.sub(collidedWallStart);
    const startToCenterBallVector = this.position.sub(collidedWallStart);

    const projectionLength = Vector.dot(startToEndVector.normalize(), startToCenterBallVector);
    const projectionPoint = collidedWallStart.add(startToEndVector.setMag(projectionLength));

    // WE NEED TO FIND ANGLE BETWEEN PLATFORM AND BALL VELOCITY VECTOR
    const v1 = this.velocity.mult(-1);
    const v2 = collidedWallStart.sub(projectionPoint);

    const wallAngle = collidedWallEnd.sub(collidedWallStart).heading();
    const angle = Vector.angleBetween(v1, v2);
    const newAngle = wallAngle + Math.PI / 2 //angle;
    this.velocity = Vector.fromAngle(newAngle).setMag(this.maxSpeed);
  }

  checkWallCollision() {
    if (SCREEN_CENTER.sub(this.position).mag() + this.radius < DEVICE_WIDTH / 2 - this.game.walls.height) return;

    this.wallPenetrationResolution();

    const angle = this.position.sub(SCREEN_CENTER).heading();
    const collidedWall = this.game.walls.checkCollision(angle);

    if (!collidedWall || this.color !== collidedWall.id) {
      this.game.stop();
      return;
    }

    this.changeVelocityAfterCollision(collidedWall);
    this.setOrChangeColor();
    this.game.score.increase();

    if (this.game.score.counter % 5 === 0) {
      this.increaseSpeed();
    }
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    this.checkDeviceBorders();
    this.checkWallCollision();

    this.acceleration.set(0, 0);

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
      });

      return;
    }

    this.draw();
  }

  draw() {
    this.widget = new Image({
      x: this.position.x,
      y: this.position.y,
      w: this.width,
      h: this.height,
      src: this.image,
      mode: 'center'
    });
  }
}