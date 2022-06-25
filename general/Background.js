import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";
import { hslToHex } from "../utils/helpers";

const S = 40;
const L = 30;

export default class Background {
  constructor(image) {
    this.image = image;
    this.colorValue = 0;
  }

  onClick(handler) {
    this.widget.addEventListener(hmUI.event.CLICK_UP, handler);    
  }

  remove() {
    hmUI.deleteWidget(this.widget);
  }

  update() {
    this.colorValue = this.colorValue + 0.5 % 360;

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        color: hslToHex(this.colorValue, S, L)
      });

      return;
    }

    this.draw();
  }

  draw() {
    // this.widget = hmUI.createWidget(hmUI.widget.IMG, {
    //   x: 0,
    //   y: 0,
    //   w: DEVICE_WIDTH,
    //   h: DEVICE_HEIGHT,
    //   pos_x: 0,
    //   pos_y: 0,
    //   center_x: this.width / 2,
    //   center_y: this.height / 2,
    //   src: this.image
    // });
    this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: DEVICE_WIDTH,
      h: DEVICE_HEIGHT,
      color: hslToHex(this.colorValue, S, L)
    });
  }
}