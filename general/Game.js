import Background from "./Background";
import Ball from "./Ball";
import Walls from "./Walls";

export default class Game {
  constructor() {
    this.fps = 30;
    this.score = 0;

    this.init();
  }

  init() {
    this.background = new Background('image/background.png');
    this.ball = new Ball(this);
    this.walls = new Walls(this);
    this.gameObjects = [
      this.ball,
      this.walls
    ];
  }

  increaseScore() {
    this.score += 1;
  }

  render() {
    this.timer = timer.createTimer(0, 1000 / this.fps, () => {
      this.gameObjects.forEach(obj => obj.update());
    });
  }

  stop() {
    if (!this.timer) return;

    timer.stopTimer(this.timer);
    this.background.remove();
  }
}

new Game(5);
