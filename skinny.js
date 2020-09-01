/* eslint-disable */

/*! skinny.js v0.1.0 | Copyright 2013 Vistaprint | vistaprint.github.io/SkinnyJS/LICENSE 
http://vistaprint.github.io/SkinnyJS/download-builder.html?modules=jquery.delimitedString,jquery.queryString*/

!(function (n) {
  ;(n.encodeDelimitedString = function (n, r, t, i, e) {
    if (!n) return ""
    ;(i =
      i ||
      function (n) {
        return n
      }),
      (e = e || i)
    var u = []
    for (var f in n) n.hasOwnProperty(f) && u.push(i(f) + t + e(n[f]))
    return u.join(r)
  }),
    (n.parseDelimitedString = function (n, r, t, i, e) {
      ;(i =
        i ||
        function (n) {
          return n
        }),
        (e = e || i)
      var u = {}
      if (n)
        for (var f = n.split(r), o = f.length, a = 0; a < o; a++) {
          var s = f[a]
          if (s.length > 0) {
            var g,
              c,
              l = s.indexOf(t)
            l > 0 && l <= s.length - 1
              ? ((g = s.substring(0, l)), (c = s.substring(l + 1)))
              : (g = s),
              (u[i(g)] = e(c))
          }
        }
      return u
    })
})(jQuery)
!(function (r) {
  var n = /\+/gi,
    e = function (r) {
      return null == r ? "" : decodeURIComponent(r.replace(n, " "))
    }
  ;(r.deparam = function (n) {
    if ("string" != typeof n)
      throw new Error(
        "$.deparam() expects a string for 'queryString' argument."
      )
    return (
      n && "?" == n.charAt(0) && (n = n.substring(1, n.length)),
      r.parseDelimitedString(n, "&", "=", e)
    )
  }),
    (r.parseQueryString = r.deparam),
    (r.currentQueryString = function () {
      return r.deparam(window.location.search)
    }),
    (r.appendQueryString = function (n, e) {
      var t = r.param(e)
      return t.length > 0 && (t = "?" + t), n + t
    })
})(jQuery)
