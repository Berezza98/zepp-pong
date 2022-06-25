import Background from "./Background";
import Ball from "./Ball";
import Score from "./Score";
import Walls from "./Walls";

export default class Game {
  constructor() {
    this.fps = 30;

    this.init();
  }

  init() {
    this.background = new Background('image/background.png');
    this.score = new Score();
    this.ball = new Ball(this);
    this.walls = new Walls(this);
    this.gameObjects = [
      this.background,
      this.score,
      this.ball,
      this.walls
    ];
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

    const myScore = this.score.counter;

    if (myScore > getApp()._options.globalData.maxScore) {
      getApp()._options.globalData.maxScore = myScore;
      getApp()._options.globalData.localStorage.set({
        maxScore: myScore
      });
    }

    hmApp.gotoPage({
      url: 'page/gtr3-pro/loose/index',
      param: JSON.stringify({
        currentScore: myScore
      })
    });
  }
}

new Game(5);
