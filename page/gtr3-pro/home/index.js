import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../consts";
import ImageText from "../../../general/ImageText";

Page({
  build() {
    hmUI.setLayerScrolling(false);

    const button = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: DEVICE_WIDTH / 2 - 100 / 2,
      y: DEVICE_HEIGHT / 2 + 40,
      w: 100,
      h: 60,
      press_color: 0x1976d2,
      normal_color: 0xef5350,
      text: 'Play',
      radius: 5,
      text_size: 30,
      click_func: () => {
        hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
      }
    });
    
    const maxScoreWidget = new ImageText('score-numbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 8,
      w: 100,
      h: 50
    });

    maxScoreWidget.text = getApp()._options.globalData.maxScore.toString();
  },
  onInit() {
    
  },

  onDestroy() {

  },
})