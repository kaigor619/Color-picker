const convert = {
  rgb_string: function(rgb_arr: number[]): string {
    return "rgb(" + rgb_arr.join(",") + ")";
  },
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

  hex: function(mas: number[]) {
    return (
      "#" +
      mas[0].toString(16) +
      "" +
      mas[1].toString(16) +
      "" +
      mas[2].toString(16)
    );
  },
  RGBAToHexA: function(r: number, g: number, b: number, a: number) {
    let r_str = r.toString(16);
    let g_str = g.toString(16);
    let b_str = b.toString(16);
    let a_str = Math.round(a * 255).toString(16);

    if (r_str.length == 1) r_str = "0" + r;
    if (g_str.length == 1) g_str = "0" + g;
    if (b_str.length == 1) b_str = "0" + b;
    if (a_str.length == 1) a_str = "0" + a;

    return "#" + r + g + b + a;
  },
  rgbaToHsv: function(mas: number[]) {
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
    return {
      h: Math.round(h * 360),
      s: percentRoundFn(s * 100),
      v: percentRoundFn(v * 100)
    };
  },
  hslTohsb: function(hsl: number[]): number[] {
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
  hsb_hsl: function(h: number, s: number, b: number): number[] {
    h /= 100;
    s /= 100;
    b /= 100;
    let l = ((2 - s) * b) / 2;

    let n = l && l < 1 ? (s * b) / (l < 0.5 ? l * 2 : 2 - l * 2) : s;
    return [Math.floor(h * 100), Math.floor(n * 100), Math.floor(l * 100)];
  },
  hex_rgba: function(hex: string): number[] {
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
  onlyNumbers: (e: any) => {
    var key = e.charCode || e.keyCode || 0;

    return (
      key == 8 ||
      key == 9 ||
      key == 46 ||
      key == 110 ||
      key == 190 ||
      (key >= 35 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105)
    );
  }
};

export default convert;
