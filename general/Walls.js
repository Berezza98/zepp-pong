import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, SCREEN_CENTER } from "../consts";
import { radiansToDegrees, normalizeAngle } from "../utils/helpers";

const WALL_COLORS_MAP = {
  [COLORS.BLUE]: 0x2E5DB5,
  [COLORS.YELLOW]: 0xFFBA29,
  [COLORS.RED]: 0xFF5326,
  [COLORS.GREEN]: 0x009C4E
};

export default class Walls {
  constructor(game) {
    this.game = game;
    this.height = 10;
    this.currentAngle = 0;
    this.gap = Math.PI / 180 * 10;

    this.wallsConfig = [
      {
        start: 0 + this.gap,
        end: Math.PI / 2 - this.gap,
        color: WALL_COLORS_MAP[COLORS.GREEN],
        id: COLORS.GREEN
      },
      {
        start: Math.PI / 2 + this.gap,
        end: Math.PI - this.gap,
        color: WALL_COLORS_MAP[COLORS.YELLOW],
        id: COLORS.YELLOW
      },
      {
        start: Math.PI + this.gap,
        end: Math.PI + Math.PI / 2 - this.gap,
        color: WALL_COLORS_MAP[COLORS.RED],
        id: COLORS.RED
      },
      {
        start: Math.PI + Math.PI / 2 + this.gap,
        end: 2 * Math.PI - this.gap,
        color: WALL_COLORS_MAP[COLORS.BLUE],
        id: COLORS.BLUE
      },
    ];

    this.addSpinEvent();
  }

  addSpinEvent() {
    hmApp.registerSpinEvent((key, degree) => {
      this.currentAngle += Math.PI / 180 * degree;
      return true;
    });
  }

  checkCollision(angle) {
    for (let i = 0; i < this.wallsConfig.length; i++) {
      const wall = this.wallsConfig[i];

      const correctAngle = normalizeAngle(angle);
      const min = normalizeAngle(wall.start + this.currentAngle);
      const max = normalizeAngle(wall.end + this.currentAngle);

      const comparing = min < max ? correctAngle >= min && correctAngle <= max : correctAngle >= min || correctAngle <= max;
      
      if (comparing) return wall;
    }

    return false;
  }

  update() {
    if (this.wallWidgets?.length > 0) {
      this.wallWidgets.forEach((arc, index) => {
        const config = this.wallsConfig[index];

        arc.setProperty(hmUI.prop.MORE, {
          start_angle: radiansToDegrees(config.start) + radiansToDegrees(this.currentAngle),
          end_angle: radiansToDegrees(config.end) + radiansToDegrees(this.currentAngle),
        });
      });
      return;
    }

    this.draw();
  }

  draw() {
    this.wallWidgets = [];

    this.wallsConfig.forEach(({ start, end, color }) => {
      const arc = hmUI.createWidget(hmUI.widget.ARC);
      arc.setProperty(hmUI.prop.MORE, {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT,
        start_angle: radiansToDegrees(start),
        end_angle: radiansToDegrees(end),
        color,
        line_width: this.height
      });

      this.wallWidgets.push(arc);
    });
  }
}