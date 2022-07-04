import Game from "../../../general/Game"
import {  deviceInfo } from "../../../consts";
if(deviceInfo.screenShape == 0){
  hmUI.setStatusBarVisible(false); //disable statusbar if screen is squared
}
Page({
  build() {
    hmUI.setLayerScrolling(false);
    
    const game = new Game();
    game.render();
  },
  onInit() {

  },

  onDestroy() {

  },
})
