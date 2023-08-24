import convert from "color-convert";

export type Palette = {
  colors: {
    [key: number | string]: string;
  };
};

const CMY_HUES = [180, 300, 60];
const RGB_HUES = [360, 240, 120, 0];

function hueShift(hues: Array<number>, hue: number, intensity: number) {
  const closestHue = hues.sort(
      (a, b) => Math.abs(a - hue) - Math.abs(b - hue)
    )[0],
    hueShift = closestHue - hue;
  return Math.round(intensity * hueShift * 0.5);
}

function lighten(hex: string, intensity: number): string {
  if (!hex) {
    return "";
  }

  const [h, s, v] = convert.hex.hsv(hex);
  const hue = h + hueShift(CMY_HUES, h, intensity);
  const saturation = s - Math.round(s * intensity);
  const value = v + Math.round((100 - v) * intensity);

  return `#${convert.hsv.hex([hue, saturation, value])}`;
}

function darken(hex: string, intensity: number): string {
  if (!hex) {
    return "";
  }

  const inverseIntensity = 1 - intensity;
  const [h, s, v] = convert.hex.hsv(hex);
  const hue = h + hueShift(RGB_HUES, h, inverseIntensity);
  const saturation = s + Math.round((100 - s) * inverseIntensity);
  const value = v - Math.round(v * inverseIntensity);

  return `#${convert.hsv.hex([hue, saturation, value])}`;
}

export function isValidHexColorCode(str: string) {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(str);
}

export function sixDigitsColorHex(hexColor: string) {
  const hexValue = hexColor.replace("#", "");
  return `#${
    hexValue.length === 3
      ? hexValue.replace(/(.)/g, "$1$1")
      : hexValue.padEnd(6, "0")
  }`;
}

const utils = (
  name: string,
  baseColor?: string
): { [key: string]: string } | undefined => {
  if (!baseColor) {
    return;
  }

  const fullColorCode = sixDigitsColorHex(baseColor);

  const response: Palette = {
    colors: {
      500: fullColorCode,
    },
  };

  const intensityMap: {
    [key: number]: number;
  } = {
    50: 0.95,
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3,
    600: 0.9,
    700: 0.75,
    800: 0.6,
    900: 0.45,
    950: 0.29,
  };

  [50, 100, 200, 300, 400].forEach((level) => {
    response.colors[level] = lighten(fullColorCode, intensityMap[level]);
  });

  [600, 700, 800, 900, 950].forEach((level) => {
    response.colors[level] = darken(fullColorCode, intensityMap[level]);
  });

  const colors: { [key: string]: string } = {};

  colors[name] = baseColor;

  for (const color of Object.keys(response.colors)) {
    colors[`${name}-${color}`] = response.colors[color];
  }

  return colors;
};

export default utils;
