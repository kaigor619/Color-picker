const Convert = {
  // hsv_rgb: function(H: number, S: number, V: number): number[] {
  //   let R = 0,
  //     G = 0,
  //     B = 0;

  //   H = H === 360 ? 0 : H;
  //   S /= 100;
  //   V /= 100;

  //   let lH = Math.floor(H / 60);

  //   let f = H / 60 - lH;
  //   let p = V * (1 - S);
  //   let q = V * (1 - S * f);
  //   let t = V * (1 - (1 - f) * S);

  //   let switcher_hsv = {
  //     '0': [V, t, p],
  //     '1': [q, V, p],
  //     '2': [p, V, t],
  //     '3': [p, q, V],
  //     '4': [t, p, V],
  //     '5': [V, p, q],
  //   };
  //   for (let key in switcher_hsv) {
  //     if (+key === lH) {
  //       [R, G, B] = switcher_hsv[key];
  //     }
  //   }

  //   let [r, g, b] = [R, G, B].map(elem => Math.floor(elem * 255));

  //   return [r, g, b];
  // },

  // rgb_hsv: function(mas: number[]) {
  //   let h, s, v;
  //   let [r, g, b] = mas.map(elem => +elem / 255);

  //   let cmax = Math.max(r, g, b);
  //   let cmin = Math.min(r, g, b);
  //   let diff = cmax - cmin;

  //   if (cmax == cmin) h = 0;

  //   if (cmax == r) h = (60 * ((g - b) / diff) + 360) % 360;
  //   else if (cmax == g) h = (60 * ((b - r) / diff) + 120) % 360;
  //   else if (cmax == b) h = (60 * ((b - r) / diff) + 240) % 360;

  //   if (cmax == 0) s = 0;
  //   else s = (diff / cmax) * 100;

  //   v = cmax * 100;

  //   return [+h.toFixed(0), +s.toFixed(0), +v.toFixed(0)];
  // },
  // getHfromPosit: (left: number, width: number): number => {
  //   let h = Math.abs(Math.round(left / (width / 360)) - 360);
  //   h = h === 360 ? 0 : h;
  //   return h;
  // },
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
};

export default Convert;
