let Model = {
  rgb: {
    rgb_rgb: (rgb: number[]) => {
      return rgb;
    },
    symbolInString: 'rgb',
    getStr(rgb_arr: number[]) {
      return 'rgb(' + rgb_arr.join(',') + ')';
    },
    getString: function(rgb_arr: number[], opacity: number): string {
      let str = '';
      if (opacity === 1) str = 'rgb(' + rgb_arr.join(', ') + ')';
      else str = 'rgba(' + rgb_arr.join(', ') + ', ' + opacity + ')';
      return str;
    },
    getWorkView: (str: string): { val: number[]; opacity: number } => {
      let str_arr = str
        .substring(str.indexOf('(') + 1, str.length - 1)
        .replace(/ /g, '')
        .split(',');

      let opacity = 1;

      let val = str_arr.map((item, i) => {
        let res = i === 3 ? +Number(item).toFixed(2) : +parseInt(item);
        return res;
      });

      if (str.indexOf('rgba') >= 0 && val[3]) {
        opacity = val[3];
        val.splice(-1, 1);
      } else opacity = 1;

      let rgba_obj = {
        val,
        opacity,
      };

      return rgba_obj;
    },
  },
  hsl: {
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
    symbolInString: 'hsl',
    getString: function(hsl_arr: number[], opacity: number): string {
      let str = '';
      if (opacity === 1)
        str = `hsl(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%)`;
      else
        str = `hsla(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%, ${opacity})`;

      return str;
    },
    getWorkView: (str: string) => {
      let str_arr = str
        .substring(str.indexOf('(') + 1, str.length - 1)
        .replace(/ /g, '')
        .split(',');

      let opacity = 1;

      let val = str_arr.map((item, i) => {
        let res = i === 3 ? +Number(item).toFixed(2) : +parseInt(item);
        return res;
      });

      if (str.indexOf('hsla') >= 0 && val[3]) {
        opacity = val[3];
        val.splice(-1, 1);
      } else opacity = 1;

      let rgba_obj = {
        val,
        opacity,
      };
      return rgba_obj;
    },
  },
  hex: {
    getWorkView: (hex: string) => {
      let opacity = 1;
      if (hex.length === 9) {
        let a = hex.substring(7, 9);
        a = a ? a : 'ff';
        opacity = +(+parseInt(a, 16) / 255).toFixed(2);
      }

      let hex_obj = {
        val: hex,
        opacity,
      };
      return hex_obj;
    },
    getString: function(hex: string, opacity: number): string {
      return hex;
    },
    rgb_hex: (rgb: number[], opacity: number) => {
      let a = Model.hex.getOpacity(opacity);

      let [r, g, b] = rgb.map(elem => {
        let res = elem.toString(16);
        return res.length === 1 ? '0' + res : res;
      });

      return '#' + r + g + b + a;
    },
    getOpacity: (opacity: number) => {
      let a_str = Math.round(opacity * 255).toString(16);
      a_str = a_str.length === 1 ? '0' + a_str : a_str === 'ff' ? '' : a_str;
      return a_str;
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
    symbolInString: '#',
  },
};

export default Model;
