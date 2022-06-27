import Background from "../../../general/Background";

Page({
  build() {
    hmUI.setLayerScrolling(false);

    const bg = new Background('image/home-bg.png');

    bg.onClick(() => {
      hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
    });
  },
  onInit() {
    
  },

  onDestroy() {

  },
})