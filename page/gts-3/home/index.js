import Background from "../../../general/Background";

Page({
  build() {
    hmUI.setLayerScrolling(false);

    const bg = new Background('image/home-bg.png');

    bg.onClick(() => {
      hmApp.gotoPage({ url: 'page/gts-3/game/index' });
    });
  },
  onInit() {
    
  },

  onDestroy() {

  },
})
