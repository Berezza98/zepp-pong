import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";
import ImageText from "./ImageText";

export default class Score {
  constructor() {
    this._counter = 0;
  }

  get counter() {
    return this._counter;
  }

  set counter(value) {
    this._counter = value;

    if (!this.widget) return;

    this.widget.remove();
    this.widget = null;
  }

  increase() {
    this.counter = this.counter + 1;
  }

  update() {
    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: DEVICE_WIDTH / 2,
        y: DEVICE_HEIGHT / 2 - 8,
        w: 100,
        h: 50
      });

      return;
    }

    this.draw()
  }

  draw() {
    this.widget = new ImageText('score-numbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 8,
      w: 100,
      h: 50
    });

    this.widget.text = this.counter;
  }
}