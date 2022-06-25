import Vector from "../utils/Vector";

export const COLORS = {
  RED: 'RED',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN'
}

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();

export const SCREEN_CENTER = new Vector(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2);