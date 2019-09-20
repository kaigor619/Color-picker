const Convert = {
  hsv_rgb: function(H: number, S: number, V: number): number[] {
    let f,
      p,
      q,
      t,
      lH,
      R: number = 0,
      G: number = 0,
      B: number = 0;

    S /= 100;
    V /= 100;

    lH = Math.floor(H / 60);

    f = H / 60 - lH;
    p = V * (1 - S);
    q = V * (1 - S * f);
    t = V * (1 - (1 - f) * S);

    switch (lH) {
      case 0:
        R = V;
        G = t;
        B = p;
        break;
      case 1:
        R = q;
        G = V;
        B = p;
        break;
      case 2:
        R = p;
        G = V;
        B = t;
        break;
      case 3:
        R = p;
        G = q;
        B = V;
        break;
      case 4:
        R = t;
        G = p;
        B = V;
        break;
      case 5:
        R = V;
        G = p;
        B = q;
        break;
    }

    return [Math.floor(R * 255), Math.floor(G * 255), Math.floor(B * 255)];
  },

  rgb_hex: function(mas: number[], opacity: number) {
    return (
      "#" +
      mas[0].toString(16) +
      "" +
      mas[1].toString(16) +
      "" +
      mas[2].toString(16)
    );
  },

  RGBAToHexA: function(rgba: number[]) {
    let [r, g, b, a] = rgba;
    let r_str = r.toString(16);
    let g_str = g.toString(16);
    let b_str = b.toString(16);
    let a_str = Math.round(a * 255).toString(16);

    if (r_str.length == 1) r_str = "0" + r_str;
    if (g_str.length == 1) g_str = "0" + g_str;
    if (b_str.length == 1) b_str = "0" + b_str;
    if (a_str.length == 1) a_str = "0" + a_str;

    let value = "#" + r_str + g_str + b_str + a_str;

    if (value.length == 9) {
      if (value.slice(-2) == "ff") value = value.substring(0, 7);
    }
    return value;
  },
  rgb_hsv: function(mas: number[]) {
    let r = mas[0],
      g = mas[1],
      b = mas[2];

    let rabs,
      gabs,
      babs,
      rr,
      gg,
      bb,
      h: number = 0,
      s,
      v: number,
      diff: number,
      diffc,
      percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs);
    diff = v - Math.min(rabs, gabs, babs);
    diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = (num: number) => Math.round(num * 100) / 100;
    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(rabs);
      gg = diffc(gabs);
      bb = diffc(babs);

      if (rabs === v) {
        h = bb - gg;
      } else if (gabs === v) {
        h = 1 / 3 + rr - bb;
      } else if (babs === v) {
        h = 2 / 3 + gg - rr;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }

    return [
      Math.round(h * 360),
      +parseInt(percentRoundFn(s * 100)),
      +parseInt(percentRoundFn(v * 100))
    ];
  },
  hsl_hsv: function(hsl: number[]): number[] {
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];
    s = s / 100;
    l = l / 100;
    let c: number = 0;
    let t = s * (l < 0.5 ? l : 1 - l);
    let b = l + t;
    c = l > 0 ? (2 * t) / b : c;
    c = (c * 100) | 0;
    b = (b * 100) | 0;
    return [h, c, b];
  },
  hsv_hsl: function(hsvArray: number[]): number[] {
    let [h, s, b] = hsvArray;
    h /= 100;
    s /= 100;
    b /= 100;
    let l = ((2 - s) * b) / 2;

    let n = l && l < 1 ? (s * b) / (l < 0.5 ? l * 2 : 2 - l * 2) : s;
    return [Math.floor(h * 100), Math.floor(n * 100), Math.floor(l * 100)];
  },
  hex_rgb: function(hex: string): number[] {
    let r, g, b, a;
    hex = hex.replace("#", "");
    if (3 === hex.length) {
      r = hex.charAt(0);
      g = hex.charAt(1);
      b = hex.charAt(2);
    } else if (4 === hex.length) {
      r = hex.charAt(0);
      g = hex.charAt(1);
      b = hex.charAt(2);
      a = hex.charAt(3);
    } else if (6 === hex.length) {
      r = hex.substring(0, 2);
      g = hex.substring(2, 4);
      b = hex.substring(4, 6);
    } else if (8 === hex.length) {
      r = hex.substring(0, 2);
      g = hex.substring(2, 4);
      b = hex.substring(4, 6);
      a = hex.substring(6, 8);
    } else {
      return [];
    }
    if ("undefined" === typeof a) {
      a = "ff";
    }
    if (1 === r.length) {
      r += r;
    }
    if (1 === g.length) {
      g += g;
    }
    if (1 === b.length) {
      b += b;
    }
    if (1 === a.length) {
      a += a;
    }
    r = +parseInt(r, 16);
    g = +parseInt(g, 16);
    b = +parseInt(b, 16);
    a = +parseInt(a, 16) / 255;
    return [r, g, b];
  },
  getHfromPosit: (left: number, width: number): number => {
    let h = Math.abs(Math.round(left / (width / 360)) - 360);
    h = h == 360 ? 0 : h;
    return h;
  },

  rgb_hsl: function(rgb: number[], opacity: number) {
    // Make r, g, and b fractions of 1
    let [r, g, b] = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +parseInt((s * 100).toFixed(1));
    l = +parseInt((l * 100).toFixed(1));

    return [h, s, l];
  },
  hsl_rgb: function(hsl: number[]) {
    let [h, s, l] = hsl;
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }
};

export default Convert;
