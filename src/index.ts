import plugin from "tailwindcss/plugin";

import colorize, { isValidHexColorCode } from "./utils";
import clesses from "./utils/clesses";

export interface Colors {
  [key: string]: string;
}

const tailwindTints = (colors: Colors) => {
  return plugin(({ matchUtilities }) => {
    if (colors) {
      for (const color of Object.keys(colors)) {
        if (!isValidHexColorCode(colors[color])) {
          throw new Error(`Color ${color} not valid`);
        }

        const palette = colorize(color, colors[color]);

        if (palette) {
          matchUtilities(clesses, {
            values: palette,
          });
        }
      }
    }
  });
};

export default tailwindTints;
