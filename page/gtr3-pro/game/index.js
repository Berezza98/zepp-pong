import Game from "../../../general/Game"

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