import Vector from "../utils/Vector";

export const COLORS = {
  RED: 'RED',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN'
}

export const LOCAL_STORAGE_KEY = 'zepp-pong.txt';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();

export const SCREEN_CENTER = new Vector(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2);

export const deviceInfo = hmSetting.getDeviceInfo();
