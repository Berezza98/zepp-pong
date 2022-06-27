import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../consts";
import Background from "../../../general/Background";
import ImageText from "../../../general/ImageText";

let paramsObj = {};

Page({
  build() {
    hmUI.setLayerScrolling(false);

    const bg = new Background('image/lose-bg.png');

    bg.onClick(() => {
      hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
    });
    
    const lastScoreWidget = new ImageText('score-numbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 85,
      w: 100,
      h: 51
    });

    lastScoreWidget.text = paramsObj.currentScore.toString();

    const bestScoreWidget = new ImageText('score-numbers-small', {
      x: DEVICE_WIDTH / 2 + 60,
      y: DEVICE_HEIGHT / 2 - 13,
      w: 100,
      h: 30
    });

    bestScoreWidget.text = getApp()._options.globalData.maxScore.toString();
  },
  onInit(params) {
    paramsObj = JSON.parse(params);
    console.log('INIT: ', paramsObj.currentScore);
  },

  onDestroy() {

  },
})