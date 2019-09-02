const mouse = {
    pageX: function(b: any) {
      var a, c, d;
      d = b || event;
      return null == d.pageX && null != d.clientX
        ? ((a = document.body),
          (c = document.documentElement),
          (b = c.scrollLeft || (a && a.scrollLeft) || 0),
          (b = d.clientX + b - (c.clientLeft || a.clientLeft || 0)))
        : d.pageX;
    },

    pageY: function(b: any) {
      var a, c, d;
      d = b || event;
      return null == d.pageX && null != d.clientX
        ? ((a = document.body),
          (c = document.documentElement),
          (b = c.scrollTop || (a && a.scrollTop) || 0),
          (b = d.clientY + b - (c.clientTop || a.clientTop || 0)))
        : d.pageY;
    }
  },
  Obj = {
    positX: function(b: any) {
      var a, c;
      a = 0;
      c = b.getBoundingClientRect();
      b = document.body;
      a = document.documentElement;
      a =
        c.left +
        (a.scrollLeft || (b && b.scrollLeft) || 0) -
        (a.clientLeft || b.sclientLeft || 0);
      return Math.round(a);
    },
    positY: function(b: any) {
      var a, c;
      a = 0;
      c = b.getBoundingClientRect();
      b = document.body;
      a = document.documentElement;
      a =
        c.top +
        (a.scrollTop || (b && b.scrollTop) || 0) -
        (a.clientTop || b.sclientTop || 0);
      return Math.round(a);
    }
  };

export { Obj, mouse };
