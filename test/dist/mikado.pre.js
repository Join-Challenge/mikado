/**!
 * Mikado.js v0.7.57
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
Object.assign || (Object.assign = function() {
  for (var a = arguments, b = a.length, c = a[0], d = 1, e, f, g; d < b; d++) {
    e = a[d];
    f = Object.keys(e);
    g = f.length;
    for (var k = 0, l; k < g; k++) {
      l = f[k], c[l] = e[l];
    }
  }
  return c;
});
Object.values || (Object.values = function(a) {
  for (var b = Object.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) {
    d[e] = a[b[e]];
  }
  return d;
});
window.requestAnimationFrame || (window.requestAnimationFrame = window.setTimeout);
window.cancelAnimationFrame || (window.cancelAnimationFrame = window.clearTimeout);
window.Promise || (window.Promise = function() {
  function a(a) {
    this.callback = null;
    var b = this;
    a(function(a) {
      b.callback && (b.callback(a), b.callback = null);
    });
  }
  a.prototype.then = function(a) {
    this.callback = a;
  };
  return a;
}());
function h(a, b, c, d) {
  if ("tap" === b) {
    if (r || y) {
      aa(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || {passive:!0, capture:!0});
}
function C(a, b) {
  b || (b = a.type);
  var c = a.target, d = c, e = c["_event_" + b];
  if (e) {
    d = c["_root_" + b];
  } else {
    for (; d !== ca;) {
      "click" === b && ba && (e = d.getAttribute("tap"));
      e || (e = d.getAttribute(b));
      if (e) {
        var f = e.indexOf(":");
        if (-1 !== f) {
          var g = e.substring(0, f);
          f = e.substring(f + 1);
          e = 0;
          for (d = d.parentElement; d !== ca;) {
            if (d.hasAttribute(f)) {
              e = g;
              break;
            }
            d = d.parentElement;
          }
        }
        break;
      }
      d = d.parentElement;
    }
    if (!e) {
      return;
    }
    c["_event_" + b] = e;
    c["_root_" + b] = d;
  }
  if (b = D[e]) {
    a.preventDefault(), b(d, a, c);
  }
  a.stopPropagation();
}
var E = {}, D = {}, ca = document.body, r = "ontouchstart" in window, y = !r && window.PointerEvent && navigator.maxTouchPoints, ba;
F.route = F.prototype.route = function(a, b) {
  D[a] = b;
  return this;
};
F.dispatch = F.prototype.dispatch = function(a, b, c, d) {
  D[a].call(this, b, c, d);
  return this;
};
var G, H, aa;
if (r || y) {
  var da = function(a, b) {
    b && (a = b[0]);
    G = a.clientX;
    H = a.clientY;
  }, ea = function(a) {
    var b = G, c = H;
    da(a, a.changedTouches);
    50 > Math.abs(G - b) && 50 > Math.abs(H - c) && C.call(this, a, "tap");
  }, fa = function(a) {
    da(a, a.touches);
  };
  aa = function(a) {
    h(a, y ? "pointerdown" : "touchstart", fa, !1);
    h(a, y ? "pointerup" : "touchend", ea, !1);
  };
}
F.listen = F.prototype.listen = function(a, b) {
  E[a] || (h(1, a, C, b || !0), E[a] = 1);
  return this;
};
F.unlisten = F.prototype.unlisten = function(a, b) {
  E[a] && (h(0, a, C, b || !0), E[a] = 0);
  return this;
};
F.prototype.move = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[c];
  } else {
    c = this.index(a);
  }
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
F.prototype.shift = function(a, b, c) {
  if (!b) {
    return this;
  }
  if ("number" === typeof a) {
    var d = a;
    a = this.dom[a];
  } else {
    d = this.index(a);
  }
  var e = 0 > b;
  if (e && d || !e && d < this.length - 1) {
    b = e ? Math.max(d + b, 0) : Math.min(d + b, this.length - 1);
    var f = this.dom[b], g = e && 1 < d - b || !e && 1 < b - d;
    if (!g && this.reuse && (this.store || this.loose)) {
      var k = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[b] : f._data, c, b);
      this.update(f, k, c, d);
    } else {
      this.root.insertBefore(a, e ? f : this.dom[b + 1] || null);
    }
    if (g) {
      a = this.dom[d];
      f = this.store && this.store[d];
      if (e) {
        for (; d > b; d--) {
          this.dom[d] = this.dom[d - 1], this.store && (this.store[d] = this.store[d - 1]);
        }
      } else {
        for (; d < b; d++) {
          this.dom[d] = this.dom[d + 1], this.store && (this.store[d] = this.store[d + 1]);
        }
      }
      this.dom[b] = a;
      this.store && (this.store[b] = f);
    } else {
      c = this.dom, e = this.store, c[d] = f, c[b] = a, e && (a = e[b], e[b] = e[d], e[d] = a);
    }
  }
  return this;
};
F.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
F.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
F.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
F.prototype.last = function(a) {
  return this.shift(a, this.length);
};
F.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
F.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
F.prototype.swap = function(a, b, c) {
  if (a !== b) {
    if ("number" === typeof a) {
      var d = a;
      a = this.dom[a];
    } else {
      d = this.index(a);
    }
    if ("number" === typeof b) {
      var e = b;
      b = this.dom[b];
    } else {
      e = this.index(b);
    }
    if (this.reuse && (this.store || this.loose)) {
      var f = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[e] : b._data, c, d);
      this.update(b, f, c, e);
    } else {
      c = d + 1 !== e, this.root.insertBefore(c ? a : b, c ? b : a), c && e + 1 !== d && this.root.insertBefore(b, this.dom[d + 1] || null), this.dom[d] = b, this.dom[e] = a, this.store && !this.extern && (a = this.store[e], this.store[e] = this.store[d], this.store[d] = a);
    }
  }
  return this;
};
var I = {};
function ha(a) {
  return I[a] = new RegExp("(?:^|\\s)" + a + "(?!\\S)", "g");
}
function ia(a, b) {
  J(a, b) || (a.className += " " + b, a._class += " " + b);
  return this;
}
function ja(a, b) {
  b = (a._class || (a._class = a.className)).replace(I[b] || ha(b), "");
  a._class !== b && (a.className = b, a._class = b);
  return this;
}
function J(a, b) {
  return !!(a._class || (a._class = a.className)).match(I[b] || ha(b));
}
function ka(a, b) {
  var c = a._attr || (a._attr = {}), d = c[b];
  return d || "" === d ? d : c[b] = a.getAttribute(b);
}
;var K = window.localStorage;
F.prototype.export = function() {
  if (this.store) {
    var a = this.store;
  } else {
    if (this.loose) {
      a = Array(this.length);
      for (var b = 0; b < this.length; b++) {
        a[b] = this.dom[b]._data;
      }
    }
  }
  a && K.setItem(this.template, JSON.stringify(a));
  return this;
};
F.prototype.import = function() {
  var a = K.getItem(this.template);
  a && (this.store = a = JSON.parse(a));
  return this;
};
F.prototype.delete = function(a) {
  K.removeItem(a || this.template);
  return this;
};
var L = Array.prototype, M = window.Proxy, N = 0;
function O(a) {
  if (!(this instanceof O)) {
    return new O(a);
  }
  if (a instanceof O) {
    return a;
  }
  this.view = this.mikado = null;
  var b = a ? a.length : 0;
  if (M) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:L.splice.bind(this), pop:L.pop.bind(this), shift:L.shift.bind(this), unshift:L.unshift.bind(this), push:L.push.bind(this)};
    return new Proxy(this, la);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    P(this, a);
  }
  N = b;
  P(this, "length");
}
function P(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.proto[b];
  }, set:function(a) {
    "number" === typeof b && (b === N && P(this, ++N), la.set(this, b, a));
  }});
}
var Q = !1, la = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (b = e, d = !0);
  }
  if (!Q) {
    Q = !0;
    if ((e = a.mikado) && !e.skip) {
      var f = a.length;
      if (d) {
        var g = e.length;
        f !== g && (a.length = g);
        if (e.stealth && a[b] === c) {
          return Q = !1, !0;
        }
        d = a.view;
        b >= g ? (e.add(c, d), a.length++) : b < g && (f = e.key, g = e.dom[b], e.reuse || f && g._key === c[f] ? e.update(g, c, d, b) : e.replace(g, c, d, b));
        if (e.proxy) {
          return Q = !1, !0;
        }
      } else {
        "length" === b && c < f && e.remove(c, f - c);
      }
    }
    Q = !1;
  }
  (M ? a : a.proto)[b] = c;
  return !0;
}};
O.prototype.swap = function(a, b) {
  Q = !0;
  this.mikado.swap(a, b, this.view);
  Q = !1;
  return this;
};
O.prototype.set = function(a) {
  this.splice();
  return this.concat(a);
};
O.prototype.splice = function(a, b, c) {
  Q = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a, this.view);
  Q = !1;
  return b;
};
O.prototype.push = function(a) {
  Q = !0;
  this.mikado.add(a, this.view);
  this.mikado.proxy || (this[this.length] = a);
  M && this.length++;
  Q = !1;
};
O.prototype.unshift = function(a) {
  Q = !0;
  this.mikado.add(a, 0, this.view);
  this.proto.unshift(a);
  Q = !1;
};
O.prototype.pop = function() {
  Q = !0;
  this.mikado.remove(this.length - 1);
  var a = this.proto.pop();
  Q = !1;
  return a;
};
O.prototype.shift = function() {
  Q = !0;
  this.mikado.remove(0);
  var a = this.proto.shift();
  Q = !1;
  return a;
};
O.prototype.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
O.prototype.sort = L.sort;
O.prototype.reverse = L.reverse;
O.prototype.slice = L.slice;
O.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
O.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    if (a(this[b])) {
      e && (this.splice(d, e), c -= e, b -= e, e = 0);
    } else {
      if (e) {
        e++;
      } else {
        var d = b;
        var e = 1;
      }
    }
  }
  e && this.splice(d, e);
  return this;
};
O.prototype.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
};
var na = !window.Proxy && function() {
  function a(a, c) {
    this.path = c.path;
    this.handler = c.handler;
    c = Object.keys(a);
    for (var b = 0, e = c.length; b < e; b++) {
      var f = c[b];
      this.define(a, f, a[f]);
    }
    return a;
  }
  a.prototype._proxy = !0;
  a.prototype.define = function(a, c, d) {
    var b = this;
    Object.defineProperty(a, c, {get:function() {
      return d;
    }, set:function(a) {
      d !== a && (ma(b.handler, b.path, c, a), d = a);
    }});
  };
  return a;
}(), oa = {_text:function(a, b) {
  a.nodeValue = b;
}, _html:function(a, b) {
  a.innerHTML = b;
}, _class:function(a, b) {
  a.className = b;
}, _css:function(a, b) {
  (a._style || (a._style = a.style)).cssText = b;
}, _attr:function(a, b, c) {
  a.setAttribute(c, b);
}};
function pa(a, b, c) {
  return new (na || Proxy)(a, {path:b, handler:c, get:qa, set:ra});
}
function qa(a, b) {
  return "_proxy" === b || a[b];
}
function ra(a, b, c) {
  a[b] !== c && (ma(this.handler, this.path, b, c), a[b] = c);
  return !0;
}
function ma(a, b, c, d) {
  if (a = a["data." + c]) {
    for (var e = 0, f = a.length, g; e < f; e++) {
      g = a[e], oa[g[0]](b[g[1]], d, g[2] || c);
    }
  }
}
;var sa = window, ta = sa.requestAnimationFrame, ua = sa.cancelAnimationFrame, va = {}, R = {}, S = {}, T = {}, U = {};
function F(a, b, c) {
  if (!(this instanceof F)) {
    return new F(a, b, c);
  }
  a.nodeType || (c = b, b = a, a = null);
  a ? this.mount(a) : (this.root = this.dom = null, this.length = 0);
  this.init(b, c);
}
F.register = F.register = function(a, b) {
  b || (b = a, a = b.n);
  R[a] = b;
  return F;
};
F.prototype.mount = function(a) {
  this.root !== a && (this.key && this.root && (this.root._pool = this.live, this.live = a._pool || {}), this.root = a, this.check(), this.dom = a._dom || (a._dom = wa(a.children)), this.length = this.dom.length);
  return this;
};
F.prototype.sync = function(a) {
  this.root._dom = this.dom = wa(this.root.children);
  this.length = this.dom.length;
  if (a && this.cache) {
    for (a = 0; a < this.length; a++) {
      var b = this.dom[a]._path;
      if (b) {
        for (var c = 0, d; c < b.length; c++) {
          d = b[c], d._class = d._html = d._text = d._css = d._attr = null;
        }
      }
    }
  }
  return this;
};
F.prototype.purge = function() {
  S[this.template + (this.cache ? "_cache" : "")] = null;
  if (this.key) {
    if (this.length) {
      for (var a = Object.keys(this.live), b = 0, c = a.length, d = void 0; b < c; b++) {
        this.key[d = a[b]] || delete this.key[d];
      }
    } else {
      this.live = {};
    }
  }
  this.tpl_pool && (this.tpl_pool = T[this.template] = []);
  this.key_pool && (this.key_pool = U[this.template] = {});
  return this;
};
F.prototype.index = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this.dom[b] === a) {
      return b;
    }
  }
  return -1;
};
F.prototype.node = function(a) {
  return this.dom[a];
};
F.prototype.data = function(a) {
  var b = "object" === typeof a;
  return this.store ? this.store[b ? this.index(a) : a] : (b ? a : this.dom[a])._data;
};
F.prototype.find = function(a) {
  if (this.key) {
    return this.live["object" !== typeof a ? a : a[this.key]];
  }
  for (var b = 0; b < this.length; b++) {
    if (this.data(b) === a) {
      return this.dom[b];
    }
  }
};
F.prototype.search = function(a) {
  a = Object.values(a).join("^");
  for (var b = 0; b < this.length; b++) {
    if (Object.values(this.data(b)).join("^") === a) {
      return this.dom[b];
    }
  }
};
F.prototype.where = function(a) {
  for (var b = Object.keys(a), c = b.length, d = [], e = 0, f, g; e < this.length; e++) {
    f = this.data(e);
    g = 1;
    for (var k = 0, l; k < c; k++) {
      if (l = b[k], f[l] !== a[l]) {
        g = 0;
        break;
      }
    }
    g && (d[d.length] = this.dom[e]);
  }
  return d;
};
F.prototype.init = function(a, b) {
  "string" === typeof a ? a = R[a] : (b || !a || a.n || (b = a, a = null), a ? a.n && F.register(a) : a = R[this.template]);
  b || (b = this.config || {});
  this.reuse = !1 !== b.reuse;
  this.state = b.state || va;
  this.cache = !1 !== b.cache;
  this.async = b.async;
  this.timer = 0;
  this.on = b.on;
  var c = b.store || !1 !== b.store;
  (this.extern = "object" === typeof c) ? b.store = !0 : c && (c = []);
  if (this.observe = c instanceof O) {
    c.mikado = this;
  }
  this.skip = 0;
  this.loose = !this.extern && !1 !== b.loose;
  this.store = !this.loose && c;
  this.config = b;
  c = a.n;
  this.template !== c && (this.template = c, this.static = a.d, this.update_path = this.vpath = null, this.proxy = this.stealth = 0, this.include = null, this.factory = !1 !== b.prefetch && this.parse(a), this.check(), this.live = (this.key = a.k) && {}, a = b.pool, this.tpl_pool = this.reuse && !1 !== a && "key" !== a && (T[c] || (T[c] = [])), this.key_pool = this.key && !1 !== a && "queue" !== a && (U[c] || (U[c] = {})), this.size = this.tpl_pool && b.size);
  return this;
};
F.once = F.once = function(a, b, c, d, e) {
  var f = new F(a, b);
  "function" === typeof d && (e = d, d = null);
  if (e) {
    var g = e;
    e = function() {
      f.destroy(1);
      g();
    };
  }
  f.render(c, d, e);
  e || f.destroy(1);
  return F;
};
F.prototype.check = function() {
  if (this.root) {
    var a = this.root._tpl;
    a !== this.template && (this.root._tpl = this.template, a && (this.live = {}, this.remove(0, this.length)));
  }
  return this;
};
function wa(a) {
  for (var b = a.length, c = Array(b), d = 0, e; d < b; d++) {
    e = a[d], c[d] = e;
  }
  return c;
}
F.prototype.create = function(a, b, c) {
  var d = this.key, e = d && a[d], f, g;
  if (d && (g = this.key_pool) && (f = g[e])) {
    var k = 1;
    if (g) {
      if (g[e] = null, g = this.tpl_pool) {
        var l = f._index;
        f._index = null;
        var n = g.pop();
        n !== f && (n._index = l, g[l] = n);
      }
    } else {
      d = 0;
    }
  } else {
    if ((f = this.tpl_pool) && f.length) {
      f = f.pop(), g && (f._index = null, g[f._key] = null);
    } else {
      var v = 1;
      f = this.factory;
    }
  }
  k && this.stealth && !this.observe || this.apply(f, a, b, c);
  if (v) {
    f = this.factory.cloneNode(!0);
    var m;
    (m = this.on) && (m = m.create) && m(f);
  }
  d && (f._key = e, this.live[e] = f);
  return f;
};
F.prototype.apply = function(a, b, c, d) {
  this.factory || (this.factory = a = this.parse(R[this.template]));
  if (!this.static) {
    b || (b = this.store ? this.store[d] : a._data);
    c && this.observe && (this.store.view = c);
    this.update_path(a._path || this.create_path(a), !1, b, d, c);
    var e;
    (e = this.on) && (e = e.change) && a !== this.factory && e(a);
    return this;
  }
};
F.prototype.refresh = function(a, b) {
  if (this.stealth) {
    return this;
  }
  var c;
  "number" === typeof a ? c = this.dom[a] : b = a;
  if (c) {
    return this.apply(c, null, b, a);
  }
  a = this.length;
  if ((c = this.store) && this.loose) {
    return this.store = null, this.render(c, b);
  }
  c = c ? c.length : a;
  a = a < c ? a : c;
  for (c = 0; c < a; c++) {
    this.apply(this.dom[c], null, b, c);
  }
  return this;
};
F.prototype.render = function(a, b, c, d) {
  if (!d) {
    b && "object" !== typeof b && (c = b, b = null);
    this.timer && this.cancel();
    if (c) {
      var e = this;
      this.timer = ta(function() {
        e.timer = 0;
        e.render(a, b, null, 1);
        "function" === typeof c && c();
      });
      return this;
    }
    if (this.async) {
      var f = this;
      return new Promise(function(c) {
        f.timer = ta(function() {
          f.timer = 0;
          f.render(a, b, null, 1);
          c();
        });
      });
    }
  }
  d = this.length;
  if (!a) {
    if (this.static) {
      return this.dom[0] || this.add(), this;
    }
    if (!(a = this.store)) {
      return this;
    }
  }
  var g = a.length;
  if ("undefined" === typeof g) {
    a = [a], g = 1;
  } else {
    if (!g) {
      return this.remove(0, d);
    }
  }
  var k = (this.key_pool || !this.reuse) && this.key;
  k || this.reuse || (this.remove(0, d, g), d = 0);
  var l = d < g ? d : g, n = 0;
  if (n < l) {
    for (; n < l; n++) {
      var v = this.dom[n], m = a[n];
      if (k && v._key !== m[k]) {
        return this.reconcile(a, b, n, 1);
      }
      this.update(v, m, b, n);
    }
  }
  if (n < g) {
    for (; n < g; n++) {
      this.add(a[n], b);
    }
  } else {
    g < d && this.remove(g, d - g);
  }
  return this;
};
F.prototype.reconcile = function(a, b, c, d) {
  var e = !this.extern && this.store;
  e && (a || (a = e), this.store = 0);
  var f = this.dom, g = this.live, k = a.length, l = f.length, n = l > k ? l : k, v = 0, m = this.key;
  for (c || (c = 0); c < n; c++) {
    var t = void 0;
    if (c < k) {
      var q = a[c], p = c >= l, u = void 0, w = void 0, B = void 0;
      if (!p && (u = f[c], w = q[m], B = u._key, B === w)) {
        d && this.update(u, q, b, c);
        continue;
      }
      if (p || !g[w]) {
        d && (p || !this.key_pool ? (l++, n = l > k ? l : k, this.add(q, b, c)) : this.replace(u, q, b, c));
        continue;
      }
      for (var x = p = void 0, z = c + 1; z < n; z++) {
        if (!p && z < l && f[z]._key === w && (p = z + 1), !x && z < k && a[z][m] === B && (x = z + 1), p && x) {
          p >= x ? (t = f[p - 1], this.root.insertBefore(t, u), d && this.update(t, q, b, c), p === x ? (1 < z - c && this.root.insertBefore(u, f[p]), f[c] = f[z], f[z] = u) : (V(f, p - 1, c), v++)) : (q = x - 1 + v, this.root.insertBefore(u, f[q] || null), V(f, c, (q > l ? l : q) - 1), v--, c--);
          t = 1;
          break;
        }
      }
    }
    t || (this.remove(c), l--, n = l > k ? l : k, c--);
  }
  e && (this.store = a);
  return this;
};
function V(a, b, c, d) {
  var e = d || a[b];
  d && b++;
  if (b < c) {
    for (; b < c; b++) {
      a[b] = a[b + 1];
    }
  } else {
    for (; b > c; b--) {
      a[b] = a[b - 1];
    }
  }
  a[c] = e;
}
F.prototype.add = function(a, b, c, d) {
  if (!d) {
    if ("number" === typeof b) {
      c = b;
      b = null;
      var e = 1;
    } else {
      if (c || 0 === c) {
        e = 1;
      }
    }
  }
  c = d || e ? c : this.length;
  b = this.create(a, b, c);
  var f;
  this.proxy && (this.stealth && this.loose && b._data === a ? f = 1 : a._proxy || (a = pa(a, b._path || this.create_path(b), this.proxy)));
  f || (this.store ? e && !this.extern ? V(this.store, this.length - 1, c, a) : (this.skip = 1, this.store[c] = a, this.skip = 0) : this.loose && (b._data = a));
  e ? (this.root.insertBefore(b, this.dom[c]), V(this.dom, this.length - 1, c, b), this.length++) : (d ? this.root.replaceChild(b, d) : (this.root.appendChild(b), this.length++), this.dom[c] = b);
  var g;
  (g = this.on) && (g = g.insert) && g(b);
  return this;
};
F.prototype.clear = function(a) {
  this.length && this.remove(0, this.length);
  a && this.purge();
  return this;
};
F.prototype.destroy = function(a) {
  a && this.unload();
  this.length = 0;
  this.include = this.store = this.live = this.dom = this.root = this.template = this.vpath = this.update_path = this.factory = null;
};
F.prototype.cancel = function() {
  this.timer && (ua(this.timer), this.timer = null);
  return this;
};
F.prototype.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = 1;
  } else {
    d = c || 0 === c;
  }
  for (var e = a.length, f = 0; f < e; f++) {
    this.add(a[f], b, d ? c++ : null);
  }
  return this;
};
F.prototype.remove = function(a, b, c) {
  var d = this.length;
  a && ("object" === typeof a ? a = this.index(a) : 0 > a && (a = d + a - 1));
  if (!d || a >= d) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  if (!a && b >= d) {
    this.store && !this.extern && (this.store = c ? Array(c) : []);
    if (this.include && (this.key_pool || this.tpl_pool)) {
      for (b = 0; b < this.include.length; b++) {
        this.include[b].clear();
      }
    }
    a = this.dom;
    b = a.length;
    this.root.textContent = "";
    this.root._dom = this.dom = c ? Array(c) : [];
    d = 0;
  } else {
    this.store && !this.observe && this.store.splice(a, b), a = this.dom.splice(a, b), d -= b;
  }
  var e;
  if ((e = this.on) && (e = e.remove)) {
    for (c = 0; c < b; c++) {
      e(a[c]);
    }
  }
  this.length = d;
  if (this.tpl_pool && !this.key_pool && 1 < b) {
    e = a;
    c = e.length;
    for (var f = c / 2 | 0, g = 0, k; g < f; g++) {
      k = e[g], e[g] = e[c - g - 1], e[c - g - 1] = k;
    }
  }
  for (e = 0; e < b; e++) {
    c = a[e], d && this.root.removeChild(c), this.checkout(c);
  }
  return this;
};
F.prototype.checkout = function(a) {
  if (this.key) {
    var b = a._key;
    this.live[b] = null;
    this.key_pool && (this.key_pool[b] = a);
  }
  this.tpl_pool && (b = this.tpl_pool.length, !this.size || b < this.size) && (this.key_pool && (a._index = b), this.tpl_pool[b] = a);
};
F.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[d]) : d = this.index(a));
  this.add(b, c, d, a);
  this.checkout(a);
  var e;
  (e = this.on) && (e = e.remove) && e(a);
  return this;
};
F.prototype.update = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[a]) : d = this.index(a));
  if (this.proxy) {
    if (this.stealth && (this.store ? this.store[d] : a._data) === b) {
      return this;
    }
    b._proxy || (b = pa(b, a._path || this.create_path(a), this.proxy));
  }
  this.store ? (this.skip = 1, this.store[d] = b, this.skip = 0) : this.loose && (a._data = b);
  if (this.key) {
    var e = a._key, f = b[this.key];
    e !== f && (this.live[e] = null, this.live[f] = a, a._key = f);
  }
  var g;
  (g = this.on) && (g = g.update) && g(a);
  return this.apply(a, b, c, d);
};
F.prototype.create_path = function(a) {
  for (var b = this.vpath.length, c = {}, d = Array(b), e = 0, f; e < b; e++) {
    f = this.vpath[e];
    var g = e, k;
    if (!(k = c[f])) {
      k = a;
      for (var l = 0, n = f.length, v = ""; l < n; l++) {
        var m = f[l];
        v += m;
        c[v] ? k = c[v] : (">" === m ? k = k.firstElementChild : "+" === m ? k = k.nextElementSibling : "|" === m && (k = k.firstChild), c[v] = k);
      }
    }
    d[g] = k;
  }
  return a._path = d;
};
var W;
F.prototype.parse = function(a, b, c, d) {
  if (!b) {
    var e = S[a.n + (this.cache ? "_cache" : "")];
    if (e) {
      return this.update_path = e.update_path, this.static = e.static, this.stealth = e.stealth, this.proxy = e.proxy, this.include = e.include, this.vpath = e.vpath, e.node;
    }
  }
  e = document.createElement(a.t || "div");
  b || (b = 0, c = "&", W = "", this.vpath = [], e._path = d = []);
  var f = a.s, g = a.i, k = a.x, l = a.h, n = a.a, v = a.e, m = a.c, t = a.j, q = this.vpath.length, p = 0, u = 0, w = "";
  t && (w += ";" + t, -1 < w.indexOf("self") && (p = 2));
  a.f && (W += ";if(" + a.f + "){self.hidden=false", p = 2);
  m && ("object" === typeof m ? (t = m[1], m = "" + m[0], w += this.cache && !t ? ";v=" + m + ";if(self._class!==v){self._class=v;self.className=v}" : m ? ";self.className=" + m : "", t && (X(this, m, ["_class", q]), u++), p++) : e.className = m);
  if (n || v) {
    var B;
    n && (B = Object.keys(n));
    v && (m = Object.keys(v), B = B ? B.concat(m) : m);
    for (m = 0; m < B.length; m++) {
      t = B[m];
      var x = void 0;
      n && "undefined" !== typeof(x = n[t]) || (x = v[t], this.listen(t));
      if ("object" === typeof x) {
        var z = x[1];
        x = "" + x[0];
        w += this.cache && !z ? ";v=" + x + ";var _a=self._attr||(self._attr={});if(_a['" + t + "']!==v){_a['" + t + "']=v;self.setAttribute('" + t + "',v)}" : x ? ";self.setAttribute('" + t + "'," + x + ")" : "";
        z && (X(this, x, ["_attr", q, t]), u++);
        p++;
      } else {
        e.setAttribute(t, x);
      }
    }
  }
  f && ("string" === typeof f ? e.style.cssText = f : f.length && (B = f[1], f = f[0], w += this.cache && !B ? ";v=" + f + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}" : f ? ";self.style.cssText=" + f : "", B && (X(this, f, ["_css", q]), u++), p++));
  if (a["@"] || a.r) {
    this.include || (this.include = []);
    var A = a["@"] || a.i;
    a["@"] || (A.n = a["@"] = this.template + "@" + this.include.length, a.i = null);
    g = null;
    w += ";this.include[" + this.include.length + "].mount(self).render(" + a.r + (a.m ? ".slice(" + (0 <= a.m ? "0," + a.m : a.m) + ")" : "") + ",view)";
    k = W;
    W = "";
    this.include.push(new F(e, A, Object.assign({}, this.config, {store:!1, async:0})));
    W = k;
    p++;
  } else {
    if (!g) {
      if (a["+"]) {
        g = R[a["+"]];
      } else {
        if (k) {
          if (l = "object" === typeof k) {
            A = k[1], k = "" + k[0];
          }
          f = document.createTextNode(k);
          l && (p && q++, this.vpath[q] = c + "|", d[q] = f, xa(p, this.cache && !A ? ";v=" + k + ";if(self._text!==v){self._text=v;self.nodeValue=v}" : k ? ";self.nodeValue=" + k : "", q, this.cache), A && (X(this, k, ["_text", q]), u++), p && q--);
          e.appendChild(f);
        } else {
          l && ("object" === typeof l ? (A = l[1], l = "" + l[0], w += this.cache && !A ? ";v=" + l + ";if(self._html!==v){self._html=v;self.innerHTML=v}" : l ? ";self.innerHTML=" + l : "", A && (X(this, l, ["_html", q]), u++), p++) : e.innerHTML = l);
        }
      }
    }
  }
  p ? (this.vpath[q] = c, d[q] = e, this.static = 0, p === u && (this.stealth = 1), xa(p, w, q, this.cache)) : w && (W += w);
  W += "";
  if (g) {
    if (g.length) {
      for (w = ">", A = 0; A < g.length; A++) {
        A && (w += "+");
        k = g[A];
        if (u = k["+"]) {
          k = R[u];
        }
        e.appendChild(this.parse(k, b + A + 1, c + w, d));
      }
    } else {
      if (u = g["+"]) {
        g = R[u];
      }
      e.appendChild(this.parse(g, b + 1, c + ">", d));
    }
  }
  a.f && (W += "}else " + (1 < p ? "self" : "p[" + q + "]") + ".hidden=true");
  b || (!this.static && W && (this.update_path = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + W)), b = {update_path:this.update_path, static:this.static, vpath:this.vpath, node:e}, b.include = this.include, b.proxy = this.proxy, b.stealth = this.stealth, S[a.n + (this.cache ? "_cache" : "")] = b);
  return e;
};
function X(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function xa(a, b, c, d) {
  W = d || 1 < a ? W + (";self=p[" + c + "]" + b) : W + b.replace(/self/g, "p[" + c + "]");
}
F.prototype.load = function(a, b) {
  var c = this, d = new XMLHttpRequest;
  d.overrideMimeType("application/json");
  d.open("GET", a, !1 !== b);
  d.onload = function() {
    var a = this.responseText;
    if (a) {
      try {
        var d = JSON.parse(a);
        F.register(d);
        c instanceof F && c.init(d);
      } catch (k) {
        var g = k;
      }
      "function" === typeof b && b(g);
    }
  };
  d.send();
  return this;
};
F.load = F.prototype.load;
F.prototype.unload = function(a) {
  a ? "object" === typeof a && (a = a.n) : a = this.template;
  a && (R[a] = null, T[a] = U[a] = S[a] = null, S[a + "_cache"] = null);
  return this;
};
F.unregister = F.prototype.unregister = F.unload = F.prototype.unload;
var ya = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, za, Aa = 0;
function Ba(a, b) {
  var c = {};
  if (!b) {
    za = !0;
    if ("string" === typeof a) {
      if (-1 !== a.indexOf("<")) {
        var d = document.createElement("div");
        d.innerHTML = a;
        a = d.firstElementChild;
        c.n = a.id || "tpl_" + Aa++;
      } else {
        c.n = a, a = document.getElementById(a);
      }
    } else {
      c.n = a.id || "tpl_" + Aa++;
    }
    a.content ? a = a.content.firstElementChild : "TEMPLATE" === a.tagName && (a = a.firstElementChild);
  }
  if (d = a.tagName) {
    if ("INCLUDE" === d) {
      return b = a.getAttribute("from"), c["+"] = b ? b : Ca(a.firstChild.nodeValue), c;
    }
    "DIV" !== d && (c.t = d.toLowerCase());
  } else {
    return (b = a) && (b = b.nodeValue) && (b = b.replace(/\s+/g, " ")) && b.trim() && (a = b.indexOf("{{@"), -1 !== a && (d = b.indexOf("}}", a), c.j = b.substring(a + 3, d), b = b.substring(0, a) + b.substring(d + 2)), b && b.trim() && (-1 !== b.indexOf("{{#") ? Y(c, "h", b.replace(/{{#/g, "{{")) : Y(c, "x", b))), c.j || b && b.trim() ? c : null;
  }
  var e = a.attributes;
  if (e.length) {
    for (var f = 0; f < e.length; f++) {
      var g = e[f].nodeName;
      if ("class" === g) {
        Y(c, "c", a.className);
      } else {
        var k = a.getAttribute(g);
        "style" === g ? Y(c, "s", k) : "if" === g ? Y(c, "f", k) : "include" === g ? a.hasAttribute("for") || (g = {}, (c.i || (c.i = [])).push(g), Y(g, "+", k)) : "for" === g && "LABEL" !== d ? ((g = a.getAttribute("include")) && (c["@"] = Ca(g)), Y(c, "r", k)) : "max" === g ? Y(c, "m", k) : "js" === g ? c.j = Ca(k) : "key" === g ? Y(c, "k", k.replace("data.", "")) : ("bind" === g && (k = k.split(":"), 2 > k.length && k.unshift("value"), g = k[0], k = "{{==" + k[1] + "}}"), ya[g.substring(2)] && 
        -1 !== k.indexOf("{{") && (g = g.substring(2)), ya[g] ? Y(c.e || (c.e = {}), g, k) : Y(c.a || (c.a = {}), g, k));
      }
    }
  }
  a = a.childNodes;
  if (d = a.length) {
    for (f = e = 0; f < d; f++) {
      if (k = Ba(a[f], 1)) {
        1 === d && 3 === a[f].nodeType ? (k.j && (c.j = k.j), k.h && (c.h = k.h), k.x && (c.x = k.x)) : (c.i || (c.i = []))[e++] = k;
      }
    }
    1 === e && (c.i = c.i[0]);
  }
  b || (c.d = za);
  return c;
}
function Y(a, b, c) {
  if (-1 !== c.indexOf("{{") && -1 !== c.indexOf("}}")) {
    var d = -1 !== c.indexOf("{{=="), e = d || -1 !== c.indexOf("{{=");
    za = !1;
    c = c.replace(/{{==/g, "{{").replace(/{{=/g, "{{").replace(/"{{/g, "").replace(/}}"/g, "").replace(/{{/g, "' + ").replace(/}}/g, " + '");
    a[b] = [("'" + c + "'").replace(/'' \+ /g, "").replace(/ \+ ''/g, "").trim()];
    d ? a[b].push(2) : e && a[b].push(1);
  } else {
    a[b] = c;
  }
}
function Ca(a) {
  return a.replace(/{{/g, "").replace(/}}/g, "").trim();
}
;F.compile = Ba;
F.array = O;
F.setText = function(a, b) {
  b += "";
  3 !== a.nodeType && (a._html = null, a = a.firstChild || a.appendChild(document.createTextNode(a._text = b)));
  a._text !== b && (a.nodeValue = b, a._text = b);
  return this;
};
F.getText = function(a) {
  if (3 !== a.nodeType && !(a = a.firstChild)) {
    return "";
  }
  var b = a._text;
  return b || "" === b ? b : a._text = a.nodeValue;
};
F.setHTML = function(a, b) {
  b += "";
  a._html !== b && (a.innerHTML = b, a._html = b);
  return this;
};
F.getHTML = function(a) {
  var b = a._html;
  return b || "" === b ? b : a._html = a.innerHTML;
};
F.setClass = function(a, b) {
  a._class !== b && (a.className = b, a._class = b);
  return this;
};
F.getClass = function(a) {
  var b = a._class;
  return b || "" === b ? b : a._class = a.className;
};
F.hasClass = J;
F.toggleClass = function(a, b) {
  J(a, b) ? ja(a, b) : ia(a, b);
  return this;
};
F.removeClass = ja;
F.addClass = ia;
F.setCSS = function(a, b) {
  a._css !== b && ((a._style || (a._style = a.style)).cssText = b, a._css = b);
  return this;
};
F.getCSS = function(a) {
  var b = a._css;
  return b || "" === b ? b : a._css = a.getAttribute("style");
};
F.setAttribute = function(a, b, c) {
  var d = a._attr || (a._attr = {});
  d[b] !== c && (a.setAttribute(b, c), d[b] = c);
  return this;
};
F.getAttribute = ka;
F.hasAttribute = function(a, b) {
  a = ka(a, b);
  return !!a || "" === a;
};
F.removeAttribute = function(a, b) {
  var c = a._attr || (a._attr = {});
  null !== c[b] && (a.removeAttribute(b), c[b] = null);
  return this;
};
var Z = window, Da;
(Da = Z.define) && Da.amd ? Da([], function() {
  return F;
}) : "object" === typeof Z.exports ? Z.module.exports = F : Z.Mikado = F;
}).call(this);
