import { DEVICE_HEIGHT, DEVICE_WIDTH, deviceInfo } from "../../../consts";
import Background from "../../../general/Background";
import ImageText from "../../../general/ImageText";

let paramsObj = {};
Page({
  build() {
    hmUI.setLayerScrolling(false);

    const bg = new Background('image/lose-bg.png');

    bg.onClick(() => {
      hmApp.gotoPage({ url: 'page/gts-3/game/index' });
    });
    if(deviceInfo.screenShape == 1){ //if screen is rounded

      //score widget with proprieties for rounded screens
       const lastScoreWidget = new ImageText('score-numbers', { 
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 85,
      w: 100,
      h: 54
    });

    lastScoreWidget.text = paramsObj.currentScore.toString();    
    
      //best score widget with proprieties for rounded screens
    const bestScoreWidget = new ImageText('score-numbers-small', {
      x: DEVICE_WIDTH / 2 + 60,
      y: DEVICE_HEIGHT / 2 - 13,
      w: 100,
      h: 30
    });

    bestScoreWidget.text = getApp()._options.globalData.maxScore.toString();
    } else {  //if screen si squared

            //score widget with proprieties for squared screens
  const lastScoreWidget = new ImageText('score-numbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 65,
      w: 100,
      h: 53
    });

    lastScoreWidget.text = paramsObj.currentScore.toString();
            //best score widget with proprieties for squared screens
    const bestScoreWidget = new ImageText('score-numbers-small', {
      x: DEVICE_WIDTH / 2 + 60,
      y: DEVICE_HEIGHT / 2 ,
      w: 100,
      h: 30
    });

    bestScoreWidget.text = getApp()._options.globalData.maxScore.toString();
    }

  },
  onInit(params) {
    paramsObj = JSON.parse(params);
    console.log('INIT: ', paramsObj.currentScore);
  },

  onDestroy() {

  },
})
