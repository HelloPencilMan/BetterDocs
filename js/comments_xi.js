parcelRequire = function(e) {
    var r = "function" == typeof parcelRequire && parcelRequire,
        n = "function" == typeof require && require,
        i = {};

    function u(e, u) {
        if (e in i) return i[e];
        var t = "function" == typeof parcelRequire && parcelRequire;
        if (!u && t) return t(e, !0);
        if (r) return r(e, !0);
        if (n && "string" == typeof e) return n(e);
        var o = new Error("Cannot find module '" + e + "'");
        throw o.code = "MODULE_NOT_FOUND", o
    }
    return u.register = function(e, r) {
        i[e] = r
    }, i = e(u), u.modules = i, u
}(function(require) {
    var c = {};

    function m(e) {
        for (var r, a = /\+/g, $ = /([^&=]+)=?([^&]*)/g, o = function(e) {
                return decodeURIComponent(e.replace(a, " "))
            }, p = {}; r = $.exec(e);) p[o(r[1])] = o(r[2]);
        return p
    }
    Object.defineProperty(c, "__esModule", {
        value: !0
    });
    var n = m;

    function l(e) {
        var r = [];
        for (var a in e) e.hasOwnProperty(a) && r.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
        return r.join("&")
    }
    c.deparam = n;
    var g = l;
    c.param = g;
    var d = {};
    Object.defineProperty(d, "__esModule", {
        value: !0
    });
    var b = document.currentScript;
    void 0 === b && (b = document.querySelector("script[src^=\"https://utteranc.es/client.js\"],script[src^=\"http://localhost:4000/client.js\"]"));
    for (var a = {}, e = 0; e < b.attributes.length; e++) {
        var j = b.attributes.item(e);
        a[j.name] = j.value
    }
    var f = document.querySelector("link[rel='canonical']");
    a.url = f ? f.href : location.origin + location.pathname + location.search, a.origin = location.origin, a.pathname = location.pathname.substr(1).replace(/\.\w+$/, ""), a.title = document.title;
    var k = document.querySelector("meta[name='description']");
    a.description = k ? k.content : "";
    var i = document.querySelector("meta[property='og:title'],meta[name='og:title']");
    a["og:title"] = i ? i.content : "", document.head.insertAdjacentHTML("afterbegin", "<style>\n    .utterances {\n      position: relative;\n      box-sizing: border-box;\n      width: 100%;\n      max-width: 760px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    .utterances-frame {\n      position: absolute;\n      left: 0;\n      right: 0;\n      width: 1px;\n      min-width: 100%;\n      max-width: 100%;\n      height: 100%;\n      border: 0;\n    }\n  </style>");
    var h = b.src.match(/^https:\/\/betterdocs.us|http:\/\/localhost:\d+/)[0],
        o = h + "/comments.html";
    b.insertAdjacentHTML("afterend", "<div class=\"utterances\">\n    <iframe class=\"utterances-frame\" title=\"Comments\" scrolling=\"no\" src=\"" + o + "?" + g(a) + "\"></iframe>\n  </div>");
    var p = b.nextElementSibling;
    b.parentElement.removeChild(b), addEventListener("message", function(t) {
        if (t.origin === h) {
            var r = t.data;
            r && "resize" === r.type && r.height && (p.style.height = r.height + "px")
        }
    });
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = d
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return d
        })
    }
    return {
        "D53L": d,
        "ieWq": c
    };
});