import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../consts";
import ImageText from "../../../general/ImageText";

let paramsObj = {};

Page({
  build() {
    hmUI.setLayerScrolling(false);

    const button = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: DEVICE_WIDTH / 2 - 200 / 2,
      y: DEVICE_HEIGHT / 2 + 40,
      w: 200,
      h: 60,
      press_color: 0x1976d2,
      normal_color: 0xef5350,
      text: 'Play Again',
      radius: 5,
      text_size: 30,
      click_func: () => {
        hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
      }
    });
    
    const lastScoreWidget = new ImageText('score-numbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 8,
      w: 100,
      h: 50
    });

    lastScoreWidget.text = paramsObj.currentScore.toString();
  },
  onInit(params) {
    paramsObj = JSON.parse(params);
    console.log('INIT: ', paramsObj.currentScore);
  },

  onDestroy() {

  },
})