import Game from "../../../general/Game"

const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
Page({
  build() {
    hmUI.setLayerScrolling(false);
    
    const game = new Game();
    game.render();
  },
  onInit() {
    logger.debug('page onInit invoked')
  },

  onDestroy() {
    logger.debug('page onDestroy invoked')
  },
})