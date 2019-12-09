const Convert = {
  hsv_rgb: function(H: number, S: number, V: number): number[] {
    let f,
      p,
      q,
      t,
      lH,
      R = 0,
      G = 0,
      B = 0;

    H = H === 360 ? 0 : H;
    S /= 100;
    V /= 100;

    lH = Math.floor(H / 60);

    f = H / 60 - lH;
    p = V * (1 - S);
    q = V * (1 - S * f);
    t = V * (1 - (1 - f) * S);

    let switcher_hsv = {
      '0': [V, t, p],
      '1': [q, V, p],
      '2': [p, V, t],
      '3': [p, q, V],
      '4': [t, p, V],
      '5': [V, p, q],
    };
    for (let key in switcher_hsv) {
      if (+key === lH) {
        [R, G, B] = switcher_hsv[key];
      }
    }

    let [r, g, b] = [R, G, B].map(elem => Math.floor(elem * 255));

    return [r, g, b];
  },

  rgb_hsv: function(mas: number[]) {
    let [r, g, b] = mas;

    let rabs,
      gabs,
      babs,
      rr,
      gg,
      bb,
      h = 0,
      s,
      v,
      diff,
      diffc,
      percentRoundFn;

    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs);
    diff = v - Math.min(rabs, gabs, babs);
    diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = (num: number) => Math.round(num * 100) / 100;
    if (diff === 0) {
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
      +parseInt(percentRoundFn(v * 100)),
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

    let [q, w, e] = [h, n, l].map(elem => Math.floor(elem * 100));
    return [q, w, e];
  },
  hex_rgb: function(hex: string): number[] {
    let r, g, b, a;
    hex = hex.replace('#', '');
    let switcher_charAt = {
      '3': [0, 1, 2],
      '4': [0, 1, 2, 3],
    };
    let switcher_substring = {
      '6': [0, 2, 4],
      '8': [0, 2, 4, 6],
    };
    let avaibility = false;
    for (let key in switcher_charAt) {
      if (+key === hex.length) {
        [r, g, b, a] = switcher_charAt[key].map(elem => hex.charAt(elem));
        avaibility = true;
      }
    }
    for (let key in switcher_substring) {
      if (+key === hex.length) {
        [r, g, b, a] = switcher_substring[key].map(elem =>
          hex.substring(elem, elem + 2),
        );
        avaibility = true;
      }
    }
    if (!avaibility) return [0, 0, 0];

    a = !a ? 'ff' : a;
    [r, g, b, a] = [r, g, b, a].map(
      elem => +parseInt(1 === elem.length ? elem + elem : elem, 16),
    );
    a /= 255;
    return [r, g, b];
  },
  getHfromPosit: (left: number, width: number): number => {
    let h = Math.abs(Math.round(left / (width / 360)) - 360);
    h = h === 360 ? 0 : h;
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

    if (delta === 0) h = 0;
    // Red is max
    else if (cmax === r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

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

    let a1, a2;
    let switcher = {
      '0': [c, x, 0],
      '60': [x, c, 0],
      '120': [0, c, x],
      '180': [0, x, c],
      '240': [x, 0, c],
      '300': [c, 0, x],
    };
    for (let key in switcher) {
      a1 = +key;
      a2 = a1 + 60;
      if (a1 <= h && h < a2) {
        [r, g, b] = switcher[key].map(elem => elem);
      }
    }

    [r, g, b] = [r, g, b].map(elem => Math.round((elem + m) * 255));
    return [r, g, b];
  },
};

export default Convert;
