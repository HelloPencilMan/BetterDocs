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
    var e = {};

    function V(e) {
        for (var r, a = /\+/g, $ = /([^&=]+)=?([^&]*)/g, o = function(e) {
                return decodeURIComponent(e.replace(a, " "))
            }, p = {}; r = $.exec(e);) p[o(r[1])] = o(r[2]);
        return p
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var w = V;

    function ea(e) {
        var r = [];
        for (var a in e) e.hasOwnProperty(a) && r.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
        return r.join("&")
    }
    e.deparam = w;
    var H = ea;
    e.param = H;
    var n = {};
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var ia = /^([\w-_]+)\/([\w-_.]+)$/i;
    n.default = ia;
    var b = {},
        X = b && b.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(b, "__esModule", {
        value: !0
    });
    var _ = X(n);

    function ba() {
        var e = w(location.search.substr(1)),
            r = null,
            i = null;
        if ("issue-term" in e) {
            if (void 0 !== (r = e["issue-term"])) {
                if ("" === r) throw new Error("When issue-term is specified, it cannot be blank.");
                if (-1 !== ["title", "url", "pathname", "og:title"].indexOf(r)) {
                    if (!e[r]) throw new Error("Unable to find \"" + r + "\" metadata.");
                    r = e[r]
                }
            }
        } else {
            if (!("issue-number" in e)) throw new Error("\"issue-term\" or \"issue-number\" must be specified.");
            if ((i = +e["issue-number"]).toString(10) !== e["issue-number"]) throw new Error("issue-number is invalid. \"" + e["issue-number"])
        }
        if (!("repo" in e)) throw new Error("\"repo\" is required.");
        if (!("origin" in e)) throw new Error("\"origin\" is required.");
        var t = _.default.exec(e.repo);
        if (null === t) throw new Error("Invalid repo: \"" + e.repo + "\"");
        return {
            owner: t[1],
            repo: t[2],
            issueTerm: r,
            issueNumber: i,
            origin: e.origin,
            url: e.url,
            title: e.title,
            description: e.description,
            theme: e.theme || "github-light"
        }
    }
    var da = ba();
    b.pageAttributes = da;
    var M = {};
    Object.defineProperty(M, "__esModule", {
        value: !0
    });
    var l = "https://betterdocs-oauth.herokuapp.com/";
    M.UTTERANCES_API = l;
    var c = {};
    Object.defineProperty(c, "__esModule", {
        value: !0
    });
    var ra = l + "/authorize",
        wa = l + "/token",
        xa = location.origin + "/authorized.html",
        ya = function() {
            function e() {
                this.storageKey = "OAUTH_TOKEN2", this.token = null;
                try {
                    this.token = localStorage.getItem(this.storageKey)
                } catch (e) {}
            }
            return Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this.token
                },
                set: function(e) {
                    this.token = e;
                    try {
                        null === e ? localStorage.removeItem(this.storageKey) : localStorage.setItem(this.storageKey, e)
                    } catch (r) {}
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        Fa = new ya;

    function S() {
        return window.open(ra + "?" + H({
            redirect_uri: xa
        })), new Promise(function(e) {
            return window.notifyAuthorized = e
        }).then(function(e) {
            return fetch(wa + e, {
                mode: "cors"
            })
        }).then(function(e) {
            return e.ok ? e.json() : e.text().then(function(e) {
                return Promise.reject("Error retrieving token:\n" + e)
            })
        }).then(function(e) {
            c.token.value = e
        }, function(e) {
            throw c.token.value = null, e
        })
    }
    c.token = Fa;
    var U = S;
    c.login = U;
    var G = {};

    function Z(e) {
        return e = e.replace(/\s/g, ""), decodeURIComponent(escape(atob(e)))
    }
    Object.defineProperty(G, "__esModule", {
        value: !0
    });
    var C = Z;
    G.decodeBase64UTF8 = C;
    var a = {};
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var g, h, fa = "https://api.github.com/",
        x = "application/vnd.github.VERSION.html+json",
        ka = "application/vnd.github.VERSION.html",
        m = "application/vnd.github.squirrel-girl-preview",
        qa = 100,
        z = "master";

    function sa(n) {
        g = n.owner, h = n.repo
    }
    var E = sa;

    function i(n, e) {
        (e = e || {}).mode = "cors", e.cache = "no-cache";
        var r = new Request(fa + n, e);
        return r.headers.set("Accept", m), /^search\//.test(n) || null === c.token.value || r.headers.set("Authorization", "token " + c.token.value), r
    }
    a.setRepoContext = E;
    var I = {
        standard: {
            limit: Number.MAX_VALUE,
            remaining: Number.MAX_VALUE,
            reset: 0
        },
        search: {
            limit: Number.MAX_VALUE,
            remaining: Number.MAX_VALUE,
            reset: 0
        }
    };

    function za(n) {
        var e = n.headers.get("X-RateLimit-Limit"),
            r = n.headers.get("X-RateLimit-Remaining"),
            t = n.headers.get("X-RateLimit-Reset"),
            $ = /\/search\//.test(n.url),
            a = $ ? I.search : I.standard;
        if (a.limit = +e, a.remaining = +r, a.reset = +t, 403 === n.status && 0 === a.remaining) {
            var o = new Date(0);
            o.setUTCSeconds(a.reset);
            var s = Math.round((o.getTime() - new Date().getTime()) / 1e3 / 60),
                i = $ ? "search API" : "non-search APIs";
            console.warn("Rate limit exceeded for " + i + ". Resets in " + s + " minute" + (1 === s ? "" : "s") + ".")
        }
    }

    function Ca(n) {
        var e = n.headers.get("link");
        if (null === e) return 0;
        var r = /\?page=([2-9][0-9]*)>; rel="next"/.exec(e);
        return null === r ? 0 : +r[1]
    }

    function f(n) {
        return fetch(n).then(function(e) {
            return 401 === e.status && (c.token.value = null), 403 === e.status && e.json().then(function(n) {
                "Resource not accessible by integration" === n.message && window.dispatchEvent(new CustomEvent("not-installed"))
            }), za(e), "GET" === n.method && -1 !== [401, 403].indexOf(e.status) && n.headers.has("Authorization") ? (n.headers.delete("Authorization"), f(n)) : e
        })
    }

    function Ha(n, e) {
        void 0 === e && (e = !1);
        var r = i("repos/" + g + "/" + h + "/contents/" + n + "?ref=" + z);
        return e && r.headers.set("accept", ka), f(r).then(function(r) {
            if (404 === r.status) throw new Error("Repo \"" + g + "/" + h + "\" does not have a file named \"" + n + "\" in the \"" + z + "\" branch.");
            if (!r.ok) throw new Error("Error fetching " + n + ".");
            return e ? r.text() : r.json()
        }).then(function(n) {
            if (e) return n;
            var r = n.content,
                t = C(r);
            return JSON.parse(t)
        })
    }
    var Ja = Ha;

    function Ma(n) {
        var e = "\"" + n + "\" type:issue in:title repo:" + g + "/" + h;
        return f(i("search/issues?q=" + encodeURIComponent(e) + "&sort=created&order=asc")).then(function(n) {
            if (!n.ok) throw new Error("Error fetching issue via search.");
            return n.json()
        }).then(function(n) {
            return 0 === n.total_count ? null : (n.total_count > 1 && console.warn("Multiple issues match \"" + e + "\". Using earliest created."), n.items[0])
        })
    }
    a.loadJsonFile = Ja;
    var O = Ma;

    function T(n) {
        return f(i("repos/" + g + "/" + h + "/issues/" + n)).then(function(n) {
            if (!n.ok) throw new Error("Error fetching issue via issue number.");
            return n.json()
        })
    }
    a.loadIssueByTerm = O;
    var Q = T;

    function Oa(n, e) {
        var r = i("repos/" + g + "/" + h + "/issues/" + n + "/comments?page=" + e + "&per_page=" + qa),
            t = x + "," + m;
        return r.headers.set("Accept", t), r
    }

    function W(n, e) {
        return f(Oa(n, e)).then(function(n) {
            if (!n.ok) throw new Error("Error fetching comments.");
            var e = Ca(n);
            return n.json().then(function(n) {
                return {
                    items: n,
                    nextPage: e
                }
            })
        })
    }
    a.loadIssueByNumber = Q;
    var R = W;

    function Y() {
        return null === c.token.value ? Promise.resolve(null) : f(i("user")).then(function(n) {
            return n.ok ? n.json() : null
        })
    }
    a.loadCommentsPage = R;
    var o = Y;

    function $(n, e, r, t) {
        var $ = new Request(l + "/repos/" + g + "/" + h + "/issues", {
            method: "POST",
            body: JSON.stringify({
                title: n,
                body: "# " + r + "\n\n" + t + "\n\n[" + e + "](" + e + ")"
            })
        });
        return $.headers.set("Accept", m), $.headers.set("Authorization", "token " + c.token.value), fetch($).then(function(n) {
            if (!n.ok) throw new Error("Error creating comments container issue");
            return n.json()
        })
    }
    a.loadUser = o;
    var y = $;

    function aa(n, e) {
        var r = i("repos/" + g + "/" + h + "/issues/" + n + "/comments", {
                method: "POST",
                body: JSON.stringify({
                    body: e
                })
            }),
            t = x + "," + m;
        return r.headers.set("Accept", t), f(r).then(function(n) {
            if (!n.ok) throw new Error("Error posting comment.");
            return n.json()
        })
    }
    a.createIssue = y;
    var p = aa;

    function ca(n) {
        return f(i("markdown", {
            method: "POST",
            body: JSON.stringify({
                text: n,
                mode: "gfm",
                context: g + "/" + h
            })
        })).then(function(n) {
            return n.text()
        })
    }
    a.postComment = p;
    var A = ca;
    a.renderMarkdown = A;
    var B = {};
    Object.defineProperty(B, "__esModule", {
        value: !0
    });
    var j = [1e3, "second", 6e4, "minute", 36e5, "hour", 864e5, "day", 6048e5, "week", 23328e5, "month"],
        ga = {
            month: "short",
            day: "numeric",
            year: "numeric"
        };

    function ha(e, r) {
        var $ = e - r.getTime();
        if ($ < 5e3) return "just now";
        for (var o = 0; o + 2 < j.length && 1.1 * $ > j[o + 2];) o += 2;
        var t = j[o],
            a = j[o + 1],
            s = Math.round($ / t);
        return s > 3 && o === j.length - 2 ? "on " + r.toLocaleDateString(void 0, ga) : 1 === s ? ("hour" === a ? "an" : "a") + " " + a + " ago" : s + " " + a + "s ago"
    }
    var D = ha;
    B.timeAgo = D;
    var ja, q = {};

    function la(e) {
        ja = e, addEventListener("resize", r), addEventListener("load", r)
    }
    Object.defineProperty(q, "__esModule", {
        value: !0
    });
    var F = la;
    q.startMeasuring = F;
    var na = -1;

    function oa() {
        var e = document.body.scrollHeight;
        if (e !== na) {
            na = e;
            var $ = {
                type: "resize",
                height: e
            };
            parent.postMessage($, ja)
        }
    }
    var pa = 0;

    function r() {
        var e = Date.now();
        e - pa > 50 && (pa = e, setTimeout(oa, 50))
    }
    var d = r;
    q.scheduleMeasure = d;
    var s = {};
    Object.defineProperty(s, "__esModule", {
        value: !0
    });
    var ta = "?v=3&s=88",
        ua = {
            COLLABORATOR: "Collaborator",
            CONTRIBUTOR: "Contributor",
            MEMBER: "Member",
            OWNER: "Owner"
        },
        va = function() {
            function e(e, r) {
                this.comment = e, this.currentUser = r;
                var t = e.user,
                    n = e.html_url,
                    a = e.created_at,
                    o = e.body_html,
                    s = e.author_association;
                this.element = document.createElement("article"), this.element.classList.add("timeline-comment"), t.login === r && this.element.classList.add("current-user");
                var l = ua[s];
                this.element.innerHTML = "\n      <a class=\"avatar\" href=\"" + t.html_url + "\" target=\"_blank\" tabindex=\"-1\">\n        <img alt=\"@" + t.login + "\" height=\"44\" width=\"44\"\n              src=\"" + t.avatar_url + ta + "\">\n      </a>\n      <div class=\"comment\">\n        <header class=\"comment-header\">\n          <span class=\"comment-meta\">\n            <a class=\"text-link\" href=\"" + t.html_url + "\" target=\"_blank\"><strong>" + t.login + "</strong></a>\n            commented\n            <a class=\"text-link\" href=\"" + n + "\" target=\"_blank\">" + D(Date.now(), new Date(a)) + "</a>\n          </span>\n          " + (l ? "<span class=\"author-association-badge\">" + l + "</span>" : "") + "\n        </header>\n        <div class=\"markdown-body markdown-body-scrollable\">\n          " + o + "\n        </div>\n      </div>", K(this.element.lastElementChild.lastElementChild)
            }
            return e.prototype.setCurrentUser = function(e) {
                this.currentUser !== e && (this.currentUser = e, this.comment.user.login === this.currentUser ? this.element.classList.add("current-user") : this.element.classList.remove("current-user"))
            }, e
        }(),
        J = va;

    function K(e) {
        Array.from(e.querySelectorAll("a")).forEach(function(e) {
            e.target = "_top", e.rel = "noopener noreferrer"
        }), Array.from(e.querySelectorAll("img")).forEach(function(e) {
            return e.onload = d
        }), Array.from(e.querySelectorAll("a.commit-tease-sha")).forEach(function(e) {
            return e.href = "https://github.com" + e.pathname
        })
    }
    s.CommentComponent = J;
    var L = K;
    s.processRenderedMarkdown = L;
    var v = {};
    Object.defineProperty(v, "__esModule", {
        value: !0
    });
    var Aa = function() {
            function e(e, t) {
                this.user = e, this.issue = t, this.timeline = [], this.count = 0, this.element = document.createElement("main"), this.element.classList.add("timeline"), this.element.innerHTML = "\n      <h1 class=\"timeline-header\">\n        <a class=\"text-link\" target=\"_blank\"></a>\n        <em>\n          - powered by\n          <a class=\"text-link\" href=\"https://utteranc.es\" target=\"_blank\">utteranc.es</a>\n        </em>\n      </h1>", this.countAnchor = this.element.firstElementChild.firstElementChild, this.marker = document.createComment("marker"), this.element.appendChild(this.marker), this.setIssue(this.issue), this.renderCount()
            }
            return e.prototype.setUser = function(e) {
                this.user = e;
                for (var t = e ? e.login : null, n = 0; n < this.timeline.length; n++) this.timeline[n].setCurrentUser(t);
                d()
            }, e.prototype.setIssue = function(e) {
                this.issue = e, e ? this.countAnchor.href = e.html_url : this.countAnchor.removeAttribute("href")
            }, e.prototype.appendComment = function(e) {
                var t = new J(e, this.user ? this.user.login : null);
                this.timeline.push(t), this.element.insertBefore(t.element, this.marker), this.count++, this.renderCount(), d()
            }, e.prototype.renderCount = function() {
                this.countAnchor.textContent = this.count + " Comment" + (1 === this.count ? "" : "s")
            }, e
        }(),
        Ba = Aa;
    v.TimelineComponent = Ba;
    var N = {};
    Object.defineProperty(N, "__esModule", {
        value: !0
    });
    var Da = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\" version=\"1.1\"><path fill=\"rgb(179,179,179)\" fill-rule=\"evenodd\" d=\"M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z\"></path></svg>",
        Ea = "data:image/svg+xml;base64," + btoa(Da),
        u = "Nothing to preview",
        Ga = function() {
            function e(e, t) {
                var n = this;
                this.user = e, this.submit = t, this.submitting = !1, this.renderTimeout = 0, this.handleInput = function() {
                    var e = n.textarea.value,
                        t = /^\s*$/.test(e);
                    n.submitButton.disabled = t, n.textarea.scrollHeight < 450 && n.textarea.offsetHeight < n.textarea.scrollHeight && (n.textarea.style.height = n.textarea.scrollHeight + "px", d()), clearTimeout(n.renderTimeout), t ? n.preview.textContent = u : (n.preview.textContent = "Loading preview...", n.renderTimeout = setTimeout(function() {
                        return A(e).then(function(e) {
                            return n.preview.innerHTML = e
                        }).then(function() {
                            return L(n.preview)
                        }).then(d)
                    }, 500))
                }, this.handleSubmit = function(e) {
                    e.preventDefault(), n.submitting || (n.submitting = !0, n.user && (n.textarea.disabled = !0, n.submitButton.disabled = !0), n.submit(n.textarea.value).catch(function() {
                        return 0
                    }).then(function() {
                        n.submitting = !1, n.textarea.disabled = !n.user, n.textarea.value = "", n.submitButton.disabled = !1, n.handleClick({
                            target: n.form.querySelector(".tabnav-tab.tab-write")
                        }), n.preview.textContent = u
                    }))
                }, this.handleClick = function(e) {
                    var t = e.target;
                    if (t instanceof HTMLButtonElement && t.classList.contains("tabnav-tab") && !t.classList.contains("selected")) {
                        n.form.querySelector(".tabnav-tab.selected").classList.remove("selected"), t.classList.add("selected");
                        var a = t.classList.contains("tab-preview");
                        n.textarea.style.display = a ? "none" : "", n.preview.style.display = a ? "" : "none", d()
                    }
                }, this.handleKeyDown = function(e) {
                    var t = e.which,
                        a = e.ctrlKey;
                    13 === t && a && !n.submitButton.disabled && n.form.dispatchEvent(new CustomEvent("submit"))
                }, this.element = document.createElement("article"), this.element.classList.add("timeline-comment"), this.element.innerHTML = "\n      <a class=\"avatar\" target=\"_blank\" tabindex=\"-1\">\n        <img height=\"44\" width=\"44\">\n      </a>\n      <form class=\"comment\" accept-charset=\"UTF-8\" action=\"javascript:\">\n        <header class=\"new-comment-header\">\n          <nav class=\"tabnav-tabs\" role=\"tablist\">\n            <button type=\"button\" class=\"tabnav-tab tab-write selected\"\n                    role=\"tab\" aria-selected=\"true\">\n              Write\n            </button>\n            <button type=\"button\" class=\"tabnav-tab tab-preview\"\n                    role=\"tab\">\n              Preview\n            </button>\n          </nav>\n        </header>\n        <div class=\"comment-body\">\n          <textarea class=\"form-control\" placeholder=\"Leave a comment\" aria-label=\"comment\"></textarea>\n          <div class=\"markdown-body\" style=\"display: none\">\n            " + u + "\n          </div>\n        </div>\n        <footer class=\"comment-footer\">\n          <a class=\"text-link markdown-info\" tabindex=\"-1\" target=\"_blank\"\n             href=\"https://guides.github.com/features/mastering-markdown/\">\n            <svg class=\"octicon v-align-bottom\" viewBox=\"0 0 16 16\" version=\"1.1\"\n              width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z\">\n              </path>\n            </svg>\n            Styling with Markdown is supported\n          </a>\n          <button class=\"btn btn-primary\" type=\"submit\">Comment</button>\n        </footer>\n      </form>", this.avatarAnchor = this.element.firstElementChild, this.avatar = this.avatarAnchor.firstElementChild, this.form = this.avatarAnchor.nextElementSibling, this.textarea = this.form.firstElementChild.nextElementSibling.firstElementChild, this.preview = this.form.firstElementChild.nextElementSibling.lastElementChild, this.submitButton = this.form.lastElementChild.lastElementChild, this.setUser(e), this.textarea.addEventListener("input", this.handleInput), this.form.addEventListener("submit", this.handleSubmit), this.form.addEventListener("click", this.handleClick), this.form.addEventListener("keydown", this.handleKeyDown), Ia(this.textarea)
            }
            return e.prototype.setUser = function(e) {
                this.user = e, this.submitButton.textContent = e ? "Comment" : "Sign in to comment", this.submitButton.disabled = !!e, e ? (this.avatarAnchor.href = e.html_url, this.avatar.alt = "@" + e.login, this.avatar.src = e.avatar_url + "?v=3&s=88") : (this.avatarAnchor.removeAttribute("href"), this.avatar.alt = "@anonymous", this.avatar.src = Ea, this.textarea.disabled = !0)
            }, e.prototype.clear = function() {
                this.textarea.value = ""
            }, e
        }(),
        P = Ga;

    function Ia(e) {
        var t = function e() {
            removeEventListener("mousemove", d), removeEventListener("mouseup", e)
        };
        e.addEventListener("mousedown", function() {
            addEventListener("mousemove", d), addEventListener("mouseup", t)
        })
    }
    N.NewCommentComponent = P;
    var t = {};

    function Ka(e, t) {
        return new Promise(function(s) {
            var r = document.createElement("link");
            r.rel = "stylesheet", r.setAttribute("crossorigin", "anonymous"), r.onload = s, r.href = "/stylesheets/themes/" + e + "/utterances.css", document.head.appendChild(r), addEventListener("message", function(e) {
                e.origin === t && "set-theme" === e.data.type && (r.href = "/stylesheets/themes/" + e.data.theme + "/utterances.css")
            })
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var La = Ka;
    t.loadTheme = La;
    var k = {};
    Object.defineProperty(k, "__esModule", {
        value: !0
    });

    function Na() {
        return null !== b.pageAttributes.issueNumber ? Q(b.pageAttributes.issueNumber) : O(b.pageAttributes.issueTerm)
    }

    function ma(e, t) {
        F(b.pageAttributes.origin);
        var r = new v.TimelineComponent(t, e);
        if (document.body.appendChild(r.element), e && e.comments > 0 && R(e.number, 1).then(function(e) {
                return e.items.forEach(function(e) {
                    return r.appendComment(e)
                })
            }), !e || !e.locked) {
            var u = new P(t, function(a) {
                if (t) return (e ? p(e.number, a) : y(b.pageAttributes.issueTerm, b.pageAttributes.url, b.pageAttributes.title, b.pageAttributes.description).then(function(t) {
                    return e = t, r.setIssue(e), p(e.number, a)
                })).then(function(e) {
                    r.appendComment(e), u.clear()
                });
                return c.login().then(function() {
                    return o()
                }).then(function(e) {
                    t = e, r.setUser(t), u.setUser(t)
                })
            });
            r.element.appendChild(u.element), d()
        }
    }
    E(b.pageAttributes), Promise.all([Na(), o(), t.loadTheme(b.pageAttributes.theme, b.pageAttributes.origin)]).then(function(e) {
        return ma(e[0], e[1])
    }), addEventListener("not-installed", function e() {
        removeEventListener("not-installed", e), document.querySelector(".timeline").insertAdjacentHTML("afterbegin", "\n  <div class=\"flash flash-error flash-not-installed\">\n    Error: utterances is not installed on <code>" + b.pageAttributes.owner + "/" + b.pageAttributes.repo + "</code>.\n    If you own this repo,\n    <a href=\"https://github.com/apps/utterances\" target=\"_blank\"><strong>install the app</strong></a>.\n    Read more about this change in\n    <a href=\"https://github.com/utterance/utterances/pull/25\" target=\"_blank\">the PR</a>.\n  </div>")
    });
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = k
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return k
        })
    }
    return {
        "ieWq": e,
        "fHsu": k
    };
});