type RGB = [number, number, number];

type HSV = [number, number, number];

class ColorConvert {
  private hexToRgb(hexColor: string): RGB {
    const match = RegExp(/[a-f0-9]{6}|[a-f0-9]{3}/i).exec(hexColor.toString());
    if (!match) {
      return [0, 0, 0];
    }

    let colorString = match[0];

    if (match[0].length === 3) {
      colorString = colorString
        .split("")
        .map((char) => {
          return char + char;
        })
        .join("");
    }

    const integer = parseInt(colorString, 16);
    const r = (integer >> 16) & 0xff;
    const g = (integer >> 8) & 0xff;
    const b = integer & 0xff;

    return [r, g, b];
  }

  private rgbToHsv(rgb: RGB): HSV {
    let rdif;
    let gdif;
    let bdif;
    let h = undefined;
    let s = undefined;

    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = (c: number) => {
      return (v - c) / 6 / diff + 1 / 2;
    };

    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);

      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }

      if (h && h < 0) {
        h += 1;
      } else if (h && h > 1) {
        h -= 1;
      }
    }

    return [(h && h * 360) || 0, s * 100, v * 100];
  }

  public hextoHsv(hexColor: string): HSV {
    return this.rgbToHsv(this.hexToRgb(hexColor));
  }

  private hsvToRgb(hsv: HSV): RGB {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;

    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;

    const color: {
      rgb: RGB;
    } = {
      rgb: [0, 0, 0],
    };

    switch (hi) {
      case 0:
        color.rgb = [v, t, p];
        break;
      case 1:
        color.rgb = [q, v, p];
        break;
      case 2:
        color.rgb = [p, v, t];
        break;
      case 3:
        color.rgb = [p, q, v];
        break;
      case 4:
        color.rgb = [t, p, v];
        break;
      case 5:
        color.rgb = [v, p, q];
        break;
    }

    return color.rgb;
  }

  private rgbToHex(rgb: RGB) {
    const integer =
      ((Math.round(rgb[0]) & 0xff) << 16) +
      ((Math.round(rgb[1]) & 0xff) << 8) +
      (Math.round(rgb[2]) & 0xff);

    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  }
  public hsvToHex(hsv: HSV): string {
    return this.rgbToHex(this.hsvToRgb(hsv));
  }
}

export default new ColorConvert();
