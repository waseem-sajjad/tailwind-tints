import plugin from "tailwindcss/plugin";

import palette, { isValidHexColorCode } from "./utils/palette";

export interface Colors {
  [key: string]: string;
}

const themeConfig = (colors: Colors) => {
  const config: {
    [key: string]: {};
  } = {};

  if (!colors) return {};

  for (const color of Object.keys(colors)) {
    if (!isValidHexColorCode(colors[color])) {
      throw new Error(`Color ${color} not valid`);
    }

    const tints = palette(colors[color]);

    if (tints) {
      config[color] = tints;
    }
  }

  return config;
};

const tailwindTints = (colors: Colors) => {
  const config = themeConfig(colors);
  return plugin(() => {}, {
    theme: {
      extend: {
        colors: config,
      },
    },
  });
};

export default tailwindTints;
