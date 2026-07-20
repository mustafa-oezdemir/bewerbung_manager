import e from "node:path";
import { access as t, copyFile as n, mkdir as r, open as i, readFile as a, readdir as o, rename as s, rm as c, stat as l, writeFile as u } from "node:fs/promises";
import { fileURLToPath as d, pathToFileURL as f } from "node:url";
import { BrowserWindow as p, Notification as m, app as h, dialog as g, ipcMain as _, nativeImage as v, shell as y } from "electron";
import { PDFDocument as b } from "pdf-lib";
import { constants as x } from "node:fs";
import { createHash as S } from "node:crypto";
//#region \0rolldown/runtime.js
var C = Object.create, w = Object.defineProperty, T = Object.getOwnPropertyDescriptor, E = Object.getOwnPropertyNames, D = Object.getPrototypeOf, O = Object.prototype.hasOwnProperty, k = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), A = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = E(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !O.call(e, s) && s !== n && w(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = T(t, s)) || r.enumerable
	});
	return e;
}, j = (e, t, n) => (n = e == null ? {} : C(D(e)), A(t || !e || !e.__esModule ? w(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), ee;
function M(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var N = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, P = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(ee = globalThis).__zod_globalConfig ?? (ee.__zod_globalConfig = {});
var F = globalThis.__zod_globalConfig;
function I(e) {
	return e && Object.assign(F, e), F;
}
//#endregion
//#region node_modules/zod/v4/core/util.js
function L(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function R(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function z(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function B(e) {
	return e == null;
}
function V(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function H(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var te = /* @__PURE__*/ Symbol("evaluating");
function U(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== te) return r === void 0 && (r = te, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function ne(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function re(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ie(e) {
	return JSON.stringify(e);
}
function W(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ae = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function oe(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var G = /* @__PURE__*/ z(() => {
	if (F.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function se(e) {
	if (oe(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(oe(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function ce(e) {
	return se(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var le = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function ue(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function K(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function q(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function de(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var fe = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pe(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return K(e, re(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return ne(this, "shape", e), e;
		},
		checks: []
	}));
}
function me(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return K(e, re(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return ne(this, "shape", r), r;
		},
		checks: []
	}));
}
function he(e, t) {
	if (!se(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return K(e, re(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ne(this, "shape", n), n;
	} }));
}
function ge(e, t) {
	if (!se(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return K(e, re(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ne(this, "shape", n), n;
	} }));
}
function _e(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return K(e, re(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return ne(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function ve(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return K(t, re(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return ne(this, "shape", i), i;
		},
		checks: []
	}));
}
function ye(e, t, n) {
	return K(t, re(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return ne(this, "shape", i), i;
	} }));
}
function be(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function xe(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Se(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Ce(e) {
	return typeof e == "string" ? e : e?.message;
}
function we(e, t, n) {
	let r = e.message ? e.message : Ce(e.inst?._zod.def?.error?.(e)) ?? Ce(t?.error?.(e)) ?? Ce(n.customError?.(e)) ?? Ce(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function Te(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Ee(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region node_modules/zod/v4/core/errors.js
var De = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, R, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, J = M("$ZodError", De), Oe = M("$ZodError", De, { Parent: Error });
function ke(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Ae(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i];
					i === e.length - 1 ? (r[n] = r[n] || { _errors: [] }, r[n]._errors.push(t(a))) : r[n] = r[n] || { _errors: [] }, r = r[n], i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region node_modules/zod/v4/core/parse.js
var je = (e) => (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new N();
	if (o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => we(e, a, I())));
		throw ae(t, i?.callee), t;
	}
	return o.value;
}, Me = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => we(e, a, I())));
		throw ae(t, i?.callee), t;
	}
	return o.value;
}, Ne = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new N();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? J)(a.issues.map((e) => we(e, i, I())))
	} : {
		success: !0,
		data: a.value
	};
}, Pe = /* @__PURE__*/ Ne(Oe), Fe = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => we(e, i, I())))
	} : {
		success: !0,
		data: a.value
	};
}, Ie = /* @__PURE__*/ Fe(Oe), Le = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return je(e)(t, n, i);
}, Re = (e) => (t, n, r) => je(e)(t, n, r), ze = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Me(e)(t, n, i);
}, Be = (e) => async (t, n, r) => Me(e)(t, n, r), Ve = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ne(e)(t, n, i);
}, He = (e) => (t, n, r) => Ne(e)(t, n, r), Ue = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Fe(e)(t, n, i);
}, We = (e) => async (t, n, r) => Fe(e)(t, n, r), Ge = /^[cC][0-9a-z]{6,}$/, Ke = /^[0-9a-z]+$/, qe = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Je = /^[0-9a-vA-V]{20}$/, Ye = /^[A-Za-z0-9]{27}$/, Xe = /^[a-zA-Z0-9_-]{21}$/, Ze = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Qe = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, $e = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, et = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, tt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function nt() {
	return new RegExp(tt, "u");
}
var rt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, it = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, at = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ot = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, st = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ct = /^[A-Za-z0-9_-]*$/, lt = /^https?$/, ut = /^\+[1-9]\d{6,14}$/, dt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ft = /*@__PURE__*/ RegExp(`^${dt}$`);
function pt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function mt(e) {
	return RegExp(`^${pt(e)}$`);
}
function ht(e) {
	let t = pt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${dt}T(?:${r})$`);
}
var gt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, _t = /^-?\d+$/, vt = /^-?\d+(?:\.\d+)?$/, yt = /^(?:true|false)$/i, bt = /^[^A-Z]*$/, xt = /^[^a-z]*$/, St = /*@__PURE__*/ M("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Ct = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, wt = /*@__PURE__*/ M("$ZodCheckLessThan", (e, t) => {
	St.init(e, t);
	let n = Ct[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Tt = /*@__PURE__*/ M("$ZodCheckGreaterThan", (e, t) => {
	St.init(e, t);
	let n = Ct[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /*@__PURE__*/ M("$ZodCheckMultipleOf", (e, t) => {
	St.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : H(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Dt = /*@__PURE__*/ M("$ZodCheckNumberFormat", (e, t) => {
	St.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = fe[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = _t);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), Ot = /*@__PURE__*/ M("$ZodCheckMaxLength", (e, t) => {
	var n;
	St.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !B(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Te(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), kt = /*@__PURE__*/ M("$ZodCheckMinLength", (e, t) => {
	var n;
	St.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !B(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Te(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), At = /*@__PURE__*/ M("$ZodCheckLengthEquals", (e, t) => {
	var n;
	St.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !B(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Te(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), jt = /*@__PURE__*/ M("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	St.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Mt = /*@__PURE__*/ M("$ZodCheckRegex", (e, t) => {
	jt.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Nt = /*@__PURE__*/ M("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= bt, jt.init(e, t);
}), Pt = /*@__PURE__*/ M("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= xt, jt.init(e, t);
}), Ft = /*@__PURE__*/ M("$ZodCheckIncludes", (e, t) => {
	St.init(e, t);
	let n = ue(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), It = /*@__PURE__*/ M("$ZodCheckStartsWith", (e, t) => {
	St.init(e, t);
	let n = RegExp(`^${ue(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Lt = /*@__PURE__*/ M("$ZodCheckEndsWith", (e, t) => {
	St.init(e, t);
	let n = RegExp(`.*${ue(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Rt = /*@__PURE__*/ M("$ZodCheckOverwrite", (e, t) => {
	St.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), zt = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, Bt = {
	major: 4,
	minor: 4,
	patch: 3
}, Vt = /*@__PURE__*/ M("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Bt;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = be(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (xe(e) || !a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new N();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= be(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= be(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (be(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new N();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (i, a) => {
			if (a.skipChecks) return e._zod.parse(i, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
			}
			let o = e._zod.parse(i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new N();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	U(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Pe(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Ie(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Ht = /*@__PURE__*/ M("$ZodString", (e, t) => {
	Vt.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? gt(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Y = /*@__PURE__*/ M("$ZodStringFormat", (e, t) => {
	jt.init(e, t), Ht.init(e, t);
}), Ut = /*@__PURE__*/ M("$ZodGUID", (e, t) => {
	t.pattern ??= Qe, Y.init(e, t);
}), Wt = /*@__PURE__*/ M("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= $e(e);
	} else t.pattern ??= $e();
	Y.init(e, t);
}), Gt = /*@__PURE__*/ M("$ZodEmail", (e, t) => {
	t.pattern ??= et, Y.init(e, t);
}), Kt = /*@__PURE__*/ M("$ZodURL", (e, t) => {
	Y.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === lt.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), qt = /*@__PURE__*/ M("$ZodEmoji", (e, t) => {
	t.pattern ??= nt(), Y.init(e, t);
}), Jt = /*@__PURE__*/ M("$ZodNanoID", (e, t) => {
	t.pattern ??= Xe, Y.init(e, t);
}), Yt = /*@__PURE__*/ M("$ZodCUID", (e, t) => {
	t.pattern ??= Ge, Y.init(e, t);
}), Xt = /*@__PURE__*/ M("$ZodCUID2", (e, t) => {
	t.pattern ??= Ke, Y.init(e, t);
}), Zt = /*@__PURE__*/ M("$ZodULID", (e, t) => {
	t.pattern ??= qe, Y.init(e, t);
}), Qt = /*@__PURE__*/ M("$ZodXID", (e, t) => {
	t.pattern ??= Je, Y.init(e, t);
}), $t = /*@__PURE__*/ M("$ZodKSUID", (e, t) => {
	t.pattern ??= Ye, Y.init(e, t);
}), en = /*@__PURE__*/ M("$ZodISODateTime", (e, t) => {
	t.pattern ??= ht(t), Y.init(e, t);
}), tn = /*@__PURE__*/ M("$ZodISODate", (e, t) => {
	t.pattern ??= ft, Y.init(e, t);
}), nn = /*@__PURE__*/ M("$ZodISOTime", (e, t) => {
	t.pattern ??= mt(t), Y.init(e, t);
}), rn = /*@__PURE__*/ M("$ZodISODuration", (e, t) => {
	t.pattern ??= Ze, Y.init(e, t);
}), an = /*@__PURE__*/ M("$ZodIPv4", (e, t) => {
	t.pattern ??= rt, Y.init(e, t), e._zod.bag.format = "ipv4";
}), on = /*@__PURE__*/ M("$ZodIPv6", (e, t) => {
	t.pattern ??= it, Y.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), sn = /*@__PURE__*/ M("$ZodCIDRv4", (e, t) => {
	t.pattern ??= at, Y.init(e, t);
}), cn = /*@__PURE__*/ M("$ZodCIDRv6", (e, t) => {
	t.pattern ??= ot, Y.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function ln(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var un = /*@__PURE__*/ M("$ZodBase64", (e, t) => {
	t.pattern ??= st, Y.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		ln(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function dn(e) {
	if (!ct.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return ln(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var fn = /*@__PURE__*/ M("$ZodBase64URL", (e, t) => {
	t.pattern ??= ct, Y.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		dn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), pn = /*@__PURE__*/ M("$ZodE164", (e, t) => {
	t.pattern ??= ut, Y.init(e, t);
});
function mn(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var hn = /*@__PURE__*/ M("$ZodJWT", (e, t) => {
	Y.init(e, t), e._zod.check = (n) => {
		mn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gn = /*@__PURE__*/ M("$ZodNumber", (e, t) => {
	Vt.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? vt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), _n = /*@__PURE__*/ M("$ZodNumberFormat", (e, t) => {
	Dt.init(e, t), gn.init(e, t);
}), vn = /*@__PURE__*/ M("$ZodBoolean", (e, t) => {
	Vt.init(e, t), e._zod.pattern = yt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), yn = /*@__PURE__*/ M("$ZodUnknown", (e, t) => {
	Vt.init(e, t), e._zod.parse = (e) => e;
}), bn = /*@__PURE__*/ M("$ZodNever", (e, t) => {
	Vt.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function xn(e, t, n) {
	e.issues.length && t.issues.push(...Se(n, e.issues)), t.value[n] = e.value;
}
var Sn = /*@__PURE__*/ M("$ZodArray", (e, t) => {
	Vt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => xn(t, n, e))) : xn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function Cn(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...Se(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function wn(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = de(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function Tn(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === "optional", d = c.optout === "optional";
	for (let i in t) {
		if (i === "__proto__" || s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => Cn(e, n, i, t, u, d))) : Cn(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var En = /*@__PURE__*/ M("$ZodObject", (e, t) => {
	if (Vt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = z(() => wn(t));
	U(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = oe, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === "optional", i = n._zod.optout === "optional", a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => Cn(n, t, e, s, r, i))) : Cn(a, t, e, s, r, i);
		}
		return i ? Tn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), Dn = /*@__PURE__*/ M("$ZodObjectJIT", (e, t) => {
	En.init(e, t);
	let n = e._zod.parse, r = z(() => wn(t)), i = (e) => {
		let t = new zt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ie(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ie(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), c && l ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : c ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, a, o = oe, s = !F.jitless, c = s && G.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let p = d.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? Tn([], p, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), d);
	};
});
function On(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !be(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => we(e, r, I())))
	}), t);
}
var kn = /*@__PURE__*/ M("$ZodUnion", (e, t) => {
	Vt.init(e, t), U(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), U(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), U(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), U(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => V(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => On(t, r, e, i)) : On(o, r, e, i);
	};
}), An = /*@__PURE__*/ M("$ZodIntersection", (e, t) => {
	Vt.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Mn(e, t, n)) : Mn(e, i, a);
	};
});
function jn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (se(e) && se(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = jn(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = jn(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Mn(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), be(e)) return e;
	let o = jn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Nn = /*@__PURE__*/ M("$ZodEnum", (e, t) => {
	Vt.init(e, t);
	let n = L(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => le.has(typeof e)).map((e) => typeof e == "string" ? ue(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Pn = /*@__PURE__*/ M("$ZodLiteral", (e, t) => {
	if (Vt.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? ue(e) : e ? ue(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Fn = /*@__PURE__*/ M("$ZodTransform", (e, t) => {
	Vt.init(e, t), e._zod.optin = "optional", e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new P(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n.fallback = !0, n));
		if (i instanceof Promise) throw new N();
		return n.value = i, n.fallback = !0, n;
	};
});
function In(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var Ln = /*@__PURE__*/ M("$ZodOptional", (e, t) => {
	Vt.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", U(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), U(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${V(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => In(e, r)) : In(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Rn = /*@__PURE__*/ M("$ZodExactOptional", (e, t) => {
	Ln.init(e, t), U(e._zod, "values", () => t.innerType._zod.values), U(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), zn = /*@__PURE__*/ M("$ZodNullable", (e, t) => {
	Vt.init(e, t), U(e._zod, "optin", () => t.innerType._zod.optin), U(e._zod, "optout", () => t.innerType._zod.optout), U(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${V(e.source)}|null)$`) : void 0;
	}), U(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Bn = /*@__PURE__*/ M("$ZodDefault", (e, t) => {
	Vt.init(e, t), e._zod.optin = "optional", U(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Vn(e, t)) : Vn(r, t);
	};
});
function Vn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Hn = /*@__PURE__*/ M("$ZodPrefault", (e, t) => {
	Vt.init(e, t), e._zod.optin = "optional", U(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Un = /*@__PURE__*/ M("$ZodNonOptional", (e, t) => {
	Vt.init(e, t), U(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Wn(t, e)) : Wn(i, e);
	};
});
function Wn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Gn = /*@__PURE__*/ M("$ZodCatch", (e, t) => {
	Vt.init(e, t), e._zod.optin = "optional", U(e._zod, "optout", () => t.innerType._zod.optout), U(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => we(e, n, I())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => we(e, n, I())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), Kn = /*@__PURE__*/ M("$ZodPipe", (e, t) => {
	Vt.init(e, t), U(e._zod, "values", () => t.in._zod.values), U(e._zod, "optin", () => t.in._zod.optin), U(e._zod, "optout", () => t.out._zod.optout), U(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => qn(e, t.in, n)) : qn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => qn(e, t.out, n)) : qn(r, t.out, n);
	};
});
function qn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var Jn = /*@__PURE__*/ M("$ZodReadonly", (e, t) => {
	Vt.init(e, t), U(e._zod, "propValues", () => t.innerType._zod.propValues), U(e._zod, "values", () => t.innerType._zod.values), U(e._zod, "optin", () => t.innerType?._zod?.optin), U(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Yn) : Yn(r);
	};
});
function Yn(e) {
	return e.value = Object.freeze(e.value), e;
}
var Xn = /*@__PURE__*/ M("$ZodCustom", (e, t) => {
	St.init(e, t), Vt.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Zn(t, n, r, e));
		Zn(i, n, r, e);
	};
});
function Zn(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Ee(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var Qn, $n = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function er() {
	return new $n();
}
(Qn = globalThis).__zod_globalRegistry ?? (Qn.__zod_globalRegistry = er());
var tr = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function nr(e, t) {
	return new e({
		type: "string",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new e({
		type: "boolean",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
	return new e({
		type: "never",
		...q(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new wt({
		check: "less_than",
		...q(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t) {
	return new wt({
		check: "less_than",
		...q(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t) {
	return new Tt({
		check: "greater_than",
		...q(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t) {
	return new Tt({
		check: "greater_than",
		...q(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new Et({
		check: "multiple_of",
		...q(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new Ot({
		check: "max_length",
		...q(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new kt({
		check: "min_length",
		...q(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t) {
	return new At({
		check: "length_equals",
		...q(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t) {
	return new Mt({
		check: "string_format",
		format: "regex",
		...q(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ur(e) {
	return new Nt({
		check: "string_format",
		format: "lowercase",
		...q(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Wr(e) {
	return new Pt({
		check: "string_format",
		format: "uppercase",
		...q(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Gr(e, t) {
	return new Ft({
		check: "string_format",
		format: "includes",
		...q(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t) {
	return new It({
		check: "string_format",
		format: "starts_with",
		...q(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function qr(e, t) {
	return new Lt({
		check: "string_format",
		format: "ends_with",
		...q(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Jr(e) {
	return new Rt({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yr(e) {
	return /* @__PURE__ */ Jr((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Xr() {
	return /* @__PURE__ */ Jr((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Zr() {
	return /* @__PURE__ */ Jr((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Qr() {
	return /* @__PURE__ */ Jr((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function $r() {
	return /* @__PURE__ */ Jr((e) => W(e));
}
// @__NO_SIDE_EFFECTS__
function ei(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...q(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ti(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...q(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ni(e, t) {
	let n = /* @__PURE__ */ ri((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Ee(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Ee(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function ri(e, t) {
	let n = new St({
		check: "custom",
		...q(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function ii(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? tr,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function ai(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, ai(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && ci(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function oi(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function si(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e === "$ref" || e === "allOf" || e in a || delete i[e];
			if (s.$ref && n.def) for (let e in i) e === "$ref" || e === "allOf" || e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e === "$ref" || e === "allOf" || e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, o[e.defId] = e.def);
	}
	e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: ui(t, "input", e.processors),
					output: ui(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function ci(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return ci(r.element, n);
	if (r.type === "set") return ci(r.valueType, n);
	if (r.type === "lazy") return ci(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return ci(r.innerType, n);
	if (r.type === "intersection") return ci(r.left, n) || ci(r.right, n);
	if (r.type === "record" || r.type === "map") return ci(r.keyType, n) || ci(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : ci(r.in, n) || ci(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (ci(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (ci(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (ci(e, n)) return !0;
		return !!(r.rest && ci(r.rest, n));
	}
	return !1;
}
var li = (e, t = {}) => (n) => {
	let r = ii({
		...n,
		processors: t
	});
	return ai(e, r), oi(r, e), si(r, e);
}, ui = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = ii({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return ai(e, o), oi(o, e), si(o, e);
}, di = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, fi = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = di[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, pi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, mi = (e, t, n, r) => {
	n.type = "boolean";
}, hi = (e, t, n, r) => {
	n.not = {};
}, gi = (e, t, n, r) => {
	let i = e._zod.def, a = L(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, _i = (e, t, n, r) => {
	let i = e._zod.def, a = [];
	for (let e of i.values) if (e === void 0) {
		if (t.unrepresentable === "throw") throw Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof e == "bigint") {
		if (t.unrepresentable === "throw") throw Error("BigInt literals cannot be represented in JSON Schema");
		a.push(Number(e));
	} else a.push(e);
	if (a.length !== 0) if (a.length === 1) {
		let e = a[0];
		n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
	} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
}, vi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, yi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, bi = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = ai(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, xi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = ai(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = ai(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Si = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => ai(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Ci = (e, t, n, r) => {
	let i = e._zod.def, a = ai(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = ai(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, wi = (e, t, n, r) => {
	let i = e._zod.def, a = ai(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Ti = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ei = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Di = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Oi = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, ki = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	ai(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Ai = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, ji = (e, t, n, r) => {
	let i = e._zod.def;
	ai(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Mi = /*@__PURE__*/ M("ZodISODateTime", (e, t) => {
	en.init(e, t), ia.init(e, t);
});
function Ni(e) {
	return /* @__PURE__ */ Tr(Mi, e);
}
var Pi = /*@__PURE__*/ M("ZodISODate", (e, t) => {
	tn.init(e, t), ia.init(e, t);
});
function Fi(e) {
	return /* @__PURE__ */ Er(Pi, e);
}
var Ii = /*@__PURE__*/ M("ZodISOTime", (e, t) => {
	nn.init(e, t), ia.init(e, t);
});
function Li(e) {
	return /* @__PURE__ */ Dr(Ii, e);
}
var Ri = /*@__PURE__*/ M("ZodISODuration", (e, t) => {
	rn.init(e, t), ia.init(e, t);
});
function zi(e) {
	return /* @__PURE__ */ Or(Ri, e);
}
var Bi = /*@__PURE__*/ M("ZodError", (e, t) => {
	J.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Ae(e, t) },
		flatten: { value: (t) => ke(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, R, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, R, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), Vi = /* @__PURE__ */ je(Bi), Hi = /* @__PURE__ */ Me(Bi), Ui = /* @__PURE__ */ Ne(Bi), Wi = /* @__PURE__ */ Fe(Bi), Gi = /* @__PURE__ */ Le(Bi), Ki = /* @__PURE__ */ Re(Bi), qi = /* @__PURE__ */ ze(Bi), Ji = /* @__PURE__ */ Be(Bi), Yi = /* @__PURE__ */ Ve(Bi), Xi = /* @__PURE__ */ He(Bi), Zi = /* @__PURE__ */ Ue(Bi), Qi = /* @__PURE__ */ We(Bi), $i = /* @__PURE__ */ new WeakMap();
function ea(e, t, n) {
	let r = Object.getPrototypeOf(e), i = $i.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), $i.set(r, i)), !i.has(t)) {
		i.add(t);
		for (let e in n) {
			let t = n[e];
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !1,
				get() {
					let n = t.bind(this);
					return Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: n
					}), n;
				},
				set(t) {
					Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: t
					});
				}
			});
		}
	}
}
var ta = /*@__PURE__*/ M("ZodType", (e, t) => (Vt.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: ui(e, "input"),
	output: ui(e, "output")
} }), e.toJSONSchema = li(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => Vi(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => Ui(e, t, n), e.parseAsync = async (t, n) => Hi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Wi(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Gi(e, t, n), e.decode = (t, n) => Ki(e, t, n), e.encodeAsync = async (t, n) => qi(e, t, n), e.decodeAsync = async (t, n) => Ji(e, t, n), e.safeEncode = (t, n) => Yi(e, t, n), e.safeDecode = (t, n) => Xi(e, t, n), e.safeEncodeAsync = async (t, n) => Zi(e, t, n), e.safeDecodeAsync = async (t, n) => Qi(e, t, n), ea(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(re(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return K(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(_o(e, t));
	},
	superRefine(e, t) {
		return this.check(vo(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ Jr(e));
	},
	optional() {
		return Qa(this);
	},
	exactOptional() {
		return eo(this);
	},
	nullable() {
		return no(this);
	},
	nullish() {
		return Qa(no(this));
	},
	nonoptional(e) {
		return co(this, e);
	},
	array() {
		return Ra(this);
	},
	or(e) {
		return Ha([this, e]);
	},
	and(e) {
		return Wa(this, e);
	},
	transform(e) {
		return po(this, Xa(e));
	},
	default(e) {
		return io(this, e);
	},
	prefault(e) {
		return oo(this, e);
	},
	catch(e) {
		return uo(this, e);
	},
	pipe(e) {
		return po(this, e);
	},
	readonly() {
		return ho(this);
	},
	describe(e) {
		let t = this.clone();
		return tr.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return tr.get(this);
		let t = this.clone();
		return tr.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e) {
		return e(this);
	}
}), Object.defineProperty(e, "description", {
	get() {
		return tr.get(e)?.description;
	},
	configurable: !0
}), e)), na = /*@__PURE__*/ M("_ZodString", (e, t) => {
	Ht.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => fi(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, ea(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ Hr(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ Gr(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Kr(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ qr(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Br(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ zr(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Vr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Br(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Ur(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ Wr(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Xr());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Yr(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ Zr());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Qr());
		},
		slugify() {
			return this.check(/* @__PURE__ */ $r());
		}
	});
}), ra = /*@__PURE__*/ M("ZodString", (e, t) => {
	Ht.init(e, t), na.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ rr(aa, t)), e.url = (t) => e.check(/* @__PURE__ */ lr(ua, t)), e.jwt = (t) => e.check(/* @__PURE__ */ wr(Ea, t)), e.emoji = (t) => e.check(/* @__PURE__ */ ur(fa, t)), e.guid = (t) => e.check(/* @__PURE__ */ ir(sa, t)), e.uuid = (t) => e.check(/* @__PURE__ */ ar(ca, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ or(ca, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ sr(ca, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ cr(ca, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ dr(pa, t)), e.guid = (t) => e.check(/* @__PURE__ */ ir(sa, t)), e.cuid = (t) => e.check(/* @__PURE__ */ fr(ma, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ pr(ha, t)), e.ulid = (t) => e.check(/* @__PURE__ */ mr(ga, t)), e.base64 = (t) => e.check(/* @__PURE__ */ xr(Ca, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Sr(wa, t)), e.xid = (t) => e.check(/* @__PURE__ */ hr(_a, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ gr(va, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ _r(ya, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ vr(ba, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ yr(xa, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ br(Sa, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Cr(Ta, t)), e.datetime = (t) => e.check(Ni(t)), e.date = (t) => e.check(Fi(t)), e.time = (t) => e.check(Li(t)), e.duration = (t) => e.check(zi(t));
});
function X(e) {
	return /* @__PURE__ */ nr(ra, e);
}
var ia = /*@__PURE__*/ M("ZodStringFormat", (e, t) => {
	Y.init(e, t), na.init(e, t);
}), aa = /*@__PURE__*/ M("ZodEmail", (e, t) => {
	Gt.init(e, t), ia.init(e, t);
});
function oa(e) {
	return /* @__PURE__ */ rr(aa, e);
}
var sa = /*@__PURE__*/ M("ZodGUID", (e, t) => {
	Ut.init(e, t), ia.init(e, t);
}), ca = /*@__PURE__*/ M("ZodUUID", (e, t) => {
	Wt.init(e, t), ia.init(e, t);
});
function la(e) {
	return /* @__PURE__ */ ar(ca, e);
}
var ua = /*@__PURE__*/ M("ZodURL", (e, t) => {
	Kt.init(e, t), ia.init(e, t);
});
function da(e) {
	return /* @__PURE__ */ lr(ua, e);
}
var fa = /*@__PURE__*/ M("ZodEmoji", (e, t) => {
	qt.init(e, t), ia.init(e, t);
}), pa = /*@__PURE__*/ M("ZodNanoID", (e, t) => {
	Jt.init(e, t), ia.init(e, t);
}), ma = /*@__PURE__*/ M("ZodCUID", (e, t) => {
	Yt.init(e, t), ia.init(e, t);
}), ha = /*@__PURE__*/ M("ZodCUID2", (e, t) => {
	Xt.init(e, t), ia.init(e, t);
}), ga = /*@__PURE__*/ M("ZodULID", (e, t) => {
	Zt.init(e, t), ia.init(e, t);
}), _a = /*@__PURE__*/ M("ZodXID", (e, t) => {
	Qt.init(e, t), ia.init(e, t);
}), va = /*@__PURE__*/ M("ZodKSUID", (e, t) => {
	$t.init(e, t), ia.init(e, t);
}), ya = /*@__PURE__*/ M("ZodIPv4", (e, t) => {
	an.init(e, t), ia.init(e, t);
}), ba = /*@__PURE__*/ M("ZodIPv6", (e, t) => {
	on.init(e, t), ia.init(e, t);
}), xa = /*@__PURE__*/ M("ZodCIDRv4", (e, t) => {
	sn.init(e, t), ia.init(e, t);
}), Sa = /*@__PURE__*/ M("ZodCIDRv6", (e, t) => {
	cn.init(e, t), ia.init(e, t);
}), Ca = /*@__PURE__*/ M("ZodBase64", (e, t) => {
	un.init(e, t), ia.init(e, t);
}), wa = /*@__PURE__*/ M("ZodBase64URL", (e, t) => {
	fn.init(e, t), ia.init(e, t);
}), Ta = /*@__PURE__*/ M("ZodE164", (e, t) => {
	pn.init(e, t), ia.init(e, t);
}), Ea = /*@__PURE__*/ M("ZodJWT", (e, t) => {
	hn.init(e, t), ia.init(e, t);
}), Da = /*@__PURE__*/ M("ZodNumber", (e, t) => {
	gn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => pi(e, t, n, r), ea(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ Ir(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Lr(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Lr(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ Pr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ Fr(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Fr(e, t));
		},
		int(e) {
			return this.check(Aa(e));
		},
		safe(e) {
			return this.check(Aa(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ Ir(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Lr(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ Pr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ Fr(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function Oa(e) {
	return /* @__PURE__ */ kr(Da, e);
}
var ka = /*@__PURE__*/ M("ZodNumberFormat", (e, t) => {
	_n.init(e, t), Da.init(e, t);
});
function Aa(e) {
	return /* @__PURE__ */ Ar(ka, e);
}
var ja = /*@__PURE__*/ M("ZodBoolean", (e, t) => {
	vn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => mi(e, t, n, r);
});
function Ma(e) {
	return /* @__PURE__ */ jr(ja, e);
}
var Na = /*@__PURE__*/ M("ZodUnknown", (e, t) => {
	yn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Pa() {
	return /* @__PURE__ */ Mr(Na);
}
var Fa = /*@__PURE__*/ M("ZodNever", (e, t) => {
	bn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => hi(e, t, n, r);
});
function Ia(e) {
	return /* @__PURE__ */ Nr(Fa, e);
}
var La = /*@__PURE__*/ M("ZodArray", (e, t) => {
	Sn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => bi(e, t, n, r), e.element = t.element, ea(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Br(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ zr(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Vr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function Ra(e, t) {
	return /* @__PURE__ */ ei(La, e, t);
}
var za = /*@__PURE__*/ M("ZodObject", (e, t) => {
	Dn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => xi(e, t, n, r), U(e, "shape", () => t.shape), ea(e, "ZodObject", {
		keyof() {
			return Ka(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: Pa()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Pa()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: Ia()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return he(this, e);
		},
		safeExtend(e) {
			return ge(this, e);
		},
		merge(e) {
			return _e(this, e);
		},
		pick(e) {
			return pe(this, e);
		},
		omit(e) {
			return me(this, e);
		},
		partial(...e) {
			return ve(Za, this, e[0]);
		},
		required(...e) {
			return ye(so, this, e[0]);
		}
	});
});
function Ba(e, t) {
	return new za({
		type: "object",
		shape: e ?? {},
		...q(t)
	});
}
var Va = /*@__PURE__*/ M("ZodUnion", (e, t) => {
	kn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r), e.options = t.options;
});
function Ha(e, t) {
	return new Va({
		type: "union",
		options: e,
		...q(t)
	});
}
var Ua = /*@__PURE__*/ M("ZodIntersection", (e, t) => {
	An.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r);
});
function Wa(e, t) {
	return new Ua({
		type: "intersection",
		left: e,
		right: t
	});
}
var Ga = /*@__PURE__*/ M("ZodEnum", (e, t) => {
	Nn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => gi(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new Ga({
			...t,
			checks: [],
			...q(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new Ga({
			...t,
			checks: [],
			...q(r),
			entries: i
		});
	};
});
function Ka(e, t) {
	return new Ga({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...q(t)
	});
}
var qa = /*@__PURE__*/ M("ZodLiteral", (e, t) => {
	Pn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => _i(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Ja(e, t) {
	return new qa({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...q(t)
	});
}
var Ya = /*@__PURE__*/ M("ZodTransform", (e, t) => {
	Fn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new P(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Ee(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(Ee(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = i, n.fallback = !0, n);
	};
});
function Xa(e) {
	return new Ya({
		type: "transform",
		transform: e
	});
}
var Za = /*@__PURE__*/ M("ZodOptional", (e, t) => {
	Ln.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Qa(e) {
	return new Za({
		type: "optional",
		innerType: e
	});
}
var $a = /*@__PURE__*/ M("ZodExactOptional", (e, t) => {
	Rn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function eo(e) {
	return new $a({
		type: "optional",
		innerType: e
	});
}
var to = /*@__PURE__*/ M("ZodNullable", (e, t) => {
	zn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function no(e) {
	return new to({
		type: "nullable",
		innerType: e
	});
}
var ro = /*@__PURE__*/ M("ZodDefault", (e, t) => {
	Bn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function io(e, t) {
	return new ro({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ce(t);
		}
	});
}
var ao = /*@__PURE__*/ M("ZodPrefault", (e, t) => {
	Hn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function oo(e, t) {
	return new ao({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ce(t);
		}
	});
}
var so = /*@__PURE__*/ M("ZodNonOptional", (e, t) => {
	Un.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function co(e, t) {
	return new so({
		type: "nonoptional",
		innerType: e,
		...q(t)
	});
}
var lo = /*@__PURE__*/ M("ZodCatch", (e, t) => {
	Gn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function uo(e, t) {
	return new lo({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var fo = /*@__PURE__*/ M("ZodPipe", (e, t) => {
	Kn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r), e.in = t.in, e.out = t.out;
});
function po(e, t) {
	return new fo({
		type: "pipe",
		in: e,
		out: t
	});
}
var mo = /*@__PURE__*/ M("ZodReadonly", (e, t) => {
	Jn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ho(e) {
	return new mo({
		type: "readonly",
		innerType: e
	});
}
var go = /*@__PURE__*/ M("ZodCustom", (e, t) => {
	Xn.init(e, t), ta.init(e, t), e._zod.processJSONSchema = (t, n, r) => vi(e, t, n, r);
});
function _o(e, t = {}) {
	return /* @__PURE__ */ ti(go, e, t);
}
function vo(e, t) {
	return /* @__PURE__ */ ni(e, t);
}
//#endregion
//#region src/shared/documentDesign.ts
var yo = [
	"rubik",
	"inter",
	"roboto",
	"open-sans",
	"lato",
	"arimo",
	"raleway",
	"bitter",
	"exo-2",
	"chivo",
	"tinos",
	"source-sans",
	"merriweather",
	"montserrat",
	"oswald",
	"volkhov",
	"arial",
	"georgia"
], bo = [
	"small",
	"medium",
	"large"
], xo = ["visual", "ats"], So = [
	"template",
	"single",
	"two-column-left-wide",
	"two-column-right-wide",
	"two-column-equal",
	"left-sidebar",
	"right-sidebar",
	"three-column",
	"timeline",
	"compact-ats"
], Co = [
	"white",
	"soft",
	"geometric",
	"hexagons",
	"waves",
	"lines",
	"dots",
	"abstract",
	"corner",
	"pastel-gradient",
	"top-band",
	"bottom-band",
	"programming-languages-bg"
], wo = {
	marginLevel: 3,
	sectionSpacingLevel: 3,
	fontSize: "medium",
	lineHeightLevel: 3,
	fontId: "source-sans",
	headingFontId: "source-sans",
	columnLayout: "template",
	resumeOutputMode: "visual",
	backgroundId: "white",
	showBackgroundInPrint: !0
}, To = [
	{
		id: "rubik",
		name: "Rubik",
		family: "Rubik, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "inter",
		name: "Inter",
		family: "Inter, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 750,
		bodyWeight: 400
	},
	{
		id: "roboto",
		name: "Roboto",
		family: "Roboto, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "open-sans",
		name: "Open Sans",
		family: "\"Open Sans\", Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "lato",
		name: "Lato",
		family: "Lato, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "arimo",
		name: "Arimo",
		family: "Arimo, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "raleway",
		name: "Raleway",
		family: "Raleway, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 750,
		bodyWeight: 400
	},
	{
		id: "bitter",
		name: "Bitter",
		family: "Bitter, Georgia, serif",
		category: "serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "exo-2",
		name: "Exo 2",
		family: "\"Exo 2\", Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "chivo",
		name: "Chivo",
		family: "Chivo, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "tinos",
		name: "Tinos",
		family: "Tinos, \"Times New Roman\", serif",
		category: "serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "source-sans",
		name: "Source Sans 3",
		family: "\"Source Sans 3\", \"Segoe UI\", Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "merriweather",
		name: "Merriweather",
		family: "Merriweather, Georgia, serif",
		category: "serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "montserrat",
		name: "Montserrat",
		family: "Montserrat, Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 750,
		bodyWeight: 400
	},
	{
		id: "oswald",
		name: "Oswald",
		family: "Oswald, \"Arial Narrow\", Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "volkhov",
		name: "Volkhov",
		family: "Volkhov, Georgia, serif",
		category: "serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "arial",
		name: "Arial",
		family: "Arial, sans-serif",
		category: "sans-serif",
		headingWeight: 700,
		bodyWeight: 400
	},
	{
		id: "georgia",
		name: "Georgia",
		family: "Georgia, \"Times New Roman\", serif",
		category: "serif",
		headingWeight: 700,
		bodyWeight: 400
	}
], Eo = [
	"Java",
	"TypeScript",
	"React",
	"Electron",
	"Go",
	"Rust",
	"C#",
	".NET",
	"Python",
	"C",
	"C++",
	"HTML",
	"CSS"
], Do = {
	1: 11,
	2: 14,
	3: 17,
	4: 20,
	5: 23
}, Oo = {
	1: {
		vertical: 10,
		horizontal: 13
	},
	2: {
		vertical: 11,
		horizontal: 14
	},
	3: {
		vertical: 12,
		horizontal: 15
	},
	4: {
		vertical: 15,
		horizontal: 18
	},
	5: {
		vertical: 18,
		horizontal: 21
	}
}, ko = {
	1: 3.5,
	2: 4.5,
	3: 5.5,
	4: 7,
	5: 8.5
}, Ao = {
	1: 1.2,
	2: 1.3,
	3: 1.4,
	4: 1.52,
	5: 1.65
}, jo = {
	small: 8.4,
	medium: 9.2,
	large: 10
}, Mo = (e) => To.find((t) => t.id === e) ?? To.find((e) => e.id === "source-sans") ?? To[0], No = {
	none: "",
	basic: "Grundkenntnisse",
	good: "Gute Kenntnisse",
	advanced: "Fortgeschrittene Kenntnisse",
	expert: "Expertenkenntnisse"
}, Po = {
	none: 0,
	basic: 2,
	good: 3,
	advanced: 4,
	expert: 5
}, Fo = {
	title: "Kenntnisse & Zusatzangaben",
	categories: [],
	isVisible: !0
}, Io = [
	"comma-separated",
	"one-per-line",
	"tags",
	"bullets",
	"level-bars",
	"level-dots"
], Lo = [
	"basic",
	"good",
	"advanced",
	"expert",
	"none"
], Ro = [
	"it",
	"engineering",
	"business",
	"language",
	"software",
	"method",
	"certificate",
	"additional",
	"custom"
], zo = Oa().nonnegative().optional(), Bo = Ba({
	id: la(),
	name: X().trim(),
	description: X().trim().optional(),
	level: Ka(Lo),
	yearsOfExperience: zo,
	lastUsedYear: Oa().int().min(1900).max(2200).optional(),
	isVisible: Ma(),
	sortOrder: Oa().int().nonnegative()
}), Vo = Ba({
	id: la(),
	title: X().trim(),
	items: Ra(Bo),
	displayMode: Ka(Io).optional(),
	isVisible: Ma(),
	sortOrder: Oa().int().nonnegative()
}), Ho = Ba({
	id: la(),
	title: X().trim(),
	type: Ka(Ro),
	subtitle: X().trim().optional(),
	items: Ra(Bo),
	subcategories: Ra(Vo),
	displayMode: Ka(Io),
	showLevels: Ma(),
	showYearsOfExperience: Ma(),
	isVisible: Ma(),
	sortOrder: Oa().int().nonnegative()
}), Uo = Ba({
	title: X().trim().default("Kenntnisse & Zusatzangaben"),
	categories: Ra(Ho).default([]),
	isVisible: Ma().default(!0)
}), Wo = [
	"Entwurf",
	"Bewerbungsbereit",
	"Beworben",
	"Eingangsbestätigung",
	"In Prüfung",
	"Vorstellungsgespräch",
	"Zweites Gespräch",
	"Zusage",
	"Absage",
	"Zurückgezogen",
	"Archiviert"
], Go = [
	"Keine Begründung",
	"Andere Kandidatin / anderer Kandidat",
	"Qualifikation nicht passend",
	"Stelle bereits besetzt",
	"Stelle gestrichen",
	"Gehaltsvorstellung",
	"Standort / Entfernung",
	"Sprachkenntnisse",
	"Berufserfahrung",
	"Automatische Absage",
	"Eigene Absage",
	"Sonstiges"
], Ko = [
	"Vor Ort",
	"Hybrid",
	"Remote"
], qo = [
	"Unbefristet",
	"Befristet",
	"Praktikum",
	"Ausbildung",
	"Werkstudent",
	"Freelance"
], Jo = ["Zeugnisse", "Zertifikate"], Yo = [
	"application-sent",
	"application-deadline",
	"interview",
	"second-interview",
	"phone-interview",
	"online-interview",
	"trial-work",
	"assessment",
	"follow-up-call",
	"follow-up-email",
	"contract-start",
	"contract-end",
	"fixed-term-end",
	"probation-end",
	"custom"
], Z = X().trim().optional().default(""), Xo = Ni().optional(), Zo = Ba({
	name: X().trim().min(1, "Unternehmen ist erforderlich."),
	street: Z,
	postalCode: Z,
	city: X().trim().min(1, "Ort ist erforderlich."),
	country: X().trim().default("Deutschland"),
	website: Ha([da(), Ja("")]).default("")
}), Qo = Ba({
	salutation: Ka([
		"Frau",
		"Herr",
		"Divers",
		""
	]).default(""),
	firstName: Z,
	lastName: Z,
	position: Z,
	email: Ha([oa(), Ja("")]).default(""),
	phone: Z
}), $o = Ba({
	title: X().trim().min(1, "Position ist erforderlich."),
	source: Z,
	url: Ha([da(), Ja("")]).default(""),
	fullText: Z,
	workModel: Ka(Ko).default("Hybrid"),
	contractType: Ka(qo).default("Unbefristet"),
	salaryExpectation: Z
}), es = Ba({
	at: Ni(),
	from: Ka(Wo).optional(),
	to: Ka(Wo),
	note: Z
}), ts = Ba({
	coverSubject: Z,
	coverIntroduction: Z,
	coverMotivation: Z,
	coverQualification: Z,
	coverCompanyFit: Z,
	coverClosing: Z,
	resumeProfile: Z,
	deckblattStatement: Z
}), ns = Ha([
	Ja(1),
	Ja(2),
	Ja(3),
	Ja(4),
	Ja(5)
]), rs = Ba({
	marginLevel: ns,
	sectionSpacingLevel: ns,
	fontSize: Ka(bo),
	lineHeightLevel: ns,
	fontId: Ka(yo),
	headingFontId: Ka(yo),
	columnLayout: Ka(So),
	resumeOutputMode: Ka(xo).default(wo.resumeOutputMode),
	backgroundId: Ka(Co),
	showBackgroundInPrint: Ma()
}), is = Ba({
	schemaVersion: Ja(1),
	id: la(),
	folderName: X().min(1),
	company: Zo,
	contact: Qo,
	job: $o,
	status: Ka(Wo),
	templateId: X().min(1),
	accentColor: X().regex(/^#[0-9a-fA-F]{6}$/),
	secondaryColor: X().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
	designSettings: rs.default(wo),
	profileId: la().optional(),
	notes: Z,
	sentAt: Xo,
	deadlineAt: Xo,
	interviewAt: Xo,
	secondInterviewAt: Xo,
	startAt: Xo,
	contractEndAt: Xo,
	fixedTermEndAt: Xo,
	probationEndAt: Xo,
	rejectionAt: Xo,
	rejectionReason: Ka(Go).optional(),
	acceptedAt: Xo,
	withdrawnAt: Xo,
	archivedAt: Xo,
	documents: ts,
	attachmentIds: Ra(la()).default([]),
	statusHistory: Ra(es),
	createdAt: Ni(),
	updatedAt: Ni()
}), as = Ba({
	company: Zo,
	contact: Qo,
	job: $o,
	templateId: X().min(1),
	accentColor: X().regex(/^#[0-9a-fA-F]{6}$/),
	secondaryColor: X().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
	designSettings: rs.default(wo),
	profileId: la().optional(),
	notes: Z,
	sentAt: Xo,
	deadlineAt: Xo,
	interviewAt: Xo,
	startAt: Xo
});
Ba({
	company: Ba({
		name: X().optional(),
		street: X().optional(),
		postalCode: X().optional(),
		city: X().optional(),
		country: X().optional(),
		website: X().optional()
	}).optional(),
	contact: Ba({
		salutation: Ka([
			"Frau",
			"Herr",
			"Divers",
			""
		]).optional(),
		firstName: X().optional(),
		lastName: X().optional(),
		position: X().optional(),
		email: X().optional(),
		phone: X().optional()
	}).optional(),
	job: Ba({
		title: X().optional(),
		source: X().optional(),
		url: X().optional(),
		fullText: X().optional(),
		workModel: Ka(Ko).optional(),
		contractType: Ka(qo).optional(),
		salaryExpectation: X().optional()
	}).optional(),
	templateId: X().optional(),
	accentColor: X().regex(/^#[0-9a-fA-F]{6}$/).optional(),
	secondaryColor: X().regex(/^#[0-9a-fA-F]{6}$/).optional(),
	designSettings: rs.partial().optional(),
	profileId: la().optional(),
	notes: X().optional(),
	sentAt: Xo,
	deadlineAt: Xo,
	interviewAt: Xo,
	startAt: Xo
});
var os = Ba({
	id: la(),
	isDefault: Ma(),
	firstName: X().trim().min(1),
	lastName: X().trim().min(1),
	title: Z,
	street: Z,
	postalCode: Z,
	city: Z,
	country: X().default("Deutschland"),
	phone: Z,
	email: Ha([oa(), Ja("")]).default(""),
	linkedin: Z,
	github: Z,
	portfolio: Z,
	birthDate: Z,
	birthPlace: Z,
	nationality: Z,
	photoPath: Z,
	signaturePath: Z,
	summary: Z,
	skills: Ra(X()).default([]),
	knowledgeSection: Uo.default(Fo),
	experiences: Ra(Ba({
		id: la(),
		from: X(),
		to: X(),
		role: X(),
		company: X(),
		city: Z,
		achievements: Ra(X())
	})).default([]),
	education: Ra(Ba({
		id: la(),
		from: X(),
		to: X(),
		degree: X(),
		institution: X(),
		city: Z
	})).default([]),
	languages: Ra(X()).default([]),
	certifications: Ra(X()).default([]),
	resumeSections: Ba({
		profile: Ma(),
		experience: Ma(),
		education: Ma(),
		skills: Ma(),
		languages: Ma(),
		certifications: Ma()
	}).default({
		profile: !0,
		experience: !0,
		education: !0,
		skills: !0,
		languages: !0,
		certifications: !0
	}),
	updatedAt: Ni()
}), ss = Ba({
	id: la(),
	applicationId: la().optional(),
	type: Ka(Yo),
	title: X().min(1),
	description: Z,
	startAt: Ni(),
	endAt: Xo,
	allDay: Ma(),
	completed: Ma(),
	cancelled: Ma(),
	reminderMinutes: Ra(Oa().int().nonnegative()),
	createdAt: Ni(),
	updatedAt: Ni()
}), cs = Ba({
	id: la(),
	applicationId: la(),
	category: Ka(Jo),
	fileName: X().min(1),
	storedName: X().min(1),
	description: Z,
	documentDate: Z,
	order: Oa().int().nonnegative(),
	includedInPackage: Ma().default(!0),
	createdAt: Ni()
}), ls = Ba({
	followUpDays: Oa().int().positive().nullable(),
	notificationsEnabled: Ma(),
	theme: Ka([
		"light",
		"dark",
		"system"
	]),
	archiveAccepted: Ma(),
	autoBackupEnabled: Ma().default(!0),
	backupRetention: Oa().int().min(3).max(50).default(10),
	autoSaveDelaySeconds: Oa().int().min(1).max(30).default(2),
	language: Ja("de")
}), us = Ba({
	schemaVersion: Ja(1),
	applications: Ra(is),
	profiles: Ra(os),
	events: Ra(ss),
	attachments: Ra(cs),
	settings: ls,
	updatedAt: Ni()
}), ds = {
	followUpDays: 14,
	notificationsEnabled: !0,
	theme: "system",
	archiveAccepted: !1,
	autoBackupEnabled: !0,
	backupRetention: 10,
	autoSaveDelaySeconds: 2,
	language: "de"
}, fs = (t, n) => {
	let r = e.join(t, "BewerbungsManager", "data"), i = e.join(r, "Muster");
	return {
		dataRoot: r,
		musterRoot: i,
		anschreibenTemplates: e.join(i, "Anschreiben"),
		deckblattTemplates: e.join(i, "Deckblatt"),
		lebenslaufTemplates: e.join(i, "Lebenslauf"),
		anschreibenDocuments: e.join(r, "Anschreiben"),
		previewCache: e.join(r, "cache", "template-previews"),
		systemTemplateCache: e.join(r, "cache", "system-templates"),
		bundledTemplatesRoot: n
	};
}, ps = [
	{
		id: "classic-professional",
		name: "Klar & Zentriert",
		description: "Einspaltig, ruhig und besonders ATS-freundlich.",
		accent: "#123f8c",
		secondary: "#eef4ff",
		font: "Segoe UI",
		layout: "centered",
		features: [
			"Zentrierter Kopf",
			"Einspaltig",
			"ATS-freundlich"
		],
		category: "ats",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		designDefaults: {
			columnLayout: "single",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "modern-sidebar",
		name: "Sidebar Rechts",
		description: "Markante Seitenleiste für Profil, Skills und Sprachen.",
		accent: "#1597ff",
		secondary: "#244766",
		font: "Segoe UI",
		layout: "sidebar-right",
		features: [
			"Rechte Seitenleiste",
			"Profilfokus",
			"Kompakt"
		],
		category: "modern",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		designDefaults: {
			columnLayout: "right-sidebar",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "zweispaltig",
		name: "Zweispaltig",
		description: "Klar strukturiertes Zweispalten-Layout mit optionaler ATS-Variante.",
		accent: "#1f4e5f",
		secondary: "#eaf1f4",
		font: "Segoe UI",
		layout: "sidebar-right",
		features: [
			"Hauptspalte",
			"Sidebar",
			"A4-optimiert"
		],
		category: "business",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		sidebarWidthRatio: .29,
		designDefaults: {
			columnLayout: "template",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "gepflegt",
		name: "Gepflegt",
		description: "Eine raffinierte Lebenslaufvorlage, perfekt für Business Development Manager, Vertriebsleiter und andere kundenorientierte Positionen.",
		accent: "#00B8B5",
		secondary: "#087875",
		font: "Source Sans 3",
		layout: "sidebar-left",
		features: [
			"Linke Farbfläche",
			"Business-fokussiert",
			"ATS-Variante"
		],
		category: "business",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		sidebarWidthRatio: .3,
		atsInfo: "Dieses Template wurde mit verbreiteten ATS-Systemen getestet. Dennoch muss der Inhalt in erster Linie klar, relevant und für Personalverantwortliche leicht erfassbar bleiben.",
		designDefaults: {
			columnLayout: "left-sidebar",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "modern",
		name: "Modern",
		description: "Perfekte Lebenslauf-Vorlage mit kreativen Elementen, die Berufserfahrung und Qualifikationen übersichtlich zur Geltung bringt.",
		accent: "#06B6C9",
		secondary: "#C7F1F5",
		font: "Source Sans 3",
		layout: "split-clean",
		features: [
			"Zwei Spalten",
			"Türkise Wellen",
			"Professionell"
		],
		category: "creative-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		atsInfo: "Modern-Template unterstützt ATS-freundliche Ausgabe mit einspaltigem Layout und entfernten visuellen Elementen.",
		designDefaults: {
			columnLayout: "two-column-equal",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "minimal-clean",
		name: "Minimal Elegant",
		description: "Viel Weißraum, feine Linien und dezente Typografie.",
		accent: "#263746",
		secondary: "#eef1f3",
		font: "Arial",
		layout: "minimal",
		features: [
			"Viel Weißraum",
			"Dezente Linien",
			"Zeitlos"
		],
		category: "executive",
		supportsAtsMode: !0,
		supportsPhoto: !0
	},
	{
		id: "technical-developer",
		name: "Modern Split",
		description: "Klare Zweiteilung mit starker Kompetenzdarstellung.",
		accent: "#0f4aa0",
		secondary: "#f1f5fb",
		font: "Segoe UI",
		layout: "split-clean",
		features: [
			"Zwei Spalten",
			"Skill-Chips",
			"Modern"
		],
		category: "modern",
		supportsAtsMode: !0,
		supportsPhoto: !0
	},
	{
		id: "executive-dark",
		name: "Sidebar Links",
		description: "Farbige linke Bühne für Senior- und Kreativprofile.",
		accent: "#16b8b5",
		secondary: "#087573",
		font: "Segoe UI",
		layout: "sidebar-left",
		features: [
			"Linke Seitenleiste",
			"Starke Farbe",
			"Foto-Platzhalter"
		],
		category: "executive",
		supportsAtsMode: !0,
		supportsPhoto: !0
	},
	{
		id: "creative-accent",
		name: "Bold Grid",
		description: "Kräftige Überschriften und ein strukturiertes Zweispaltenraster.",
		accent: "#0d3e91",
		secondary: "#edf4ff",
		font: "Arial",
		layout: "bold-grid",
		features: [
			"Kräftige Titel",
			"Zweispaltenraster",
			"Dynamisch"
		],
		category: "creative",
		supportsAtsMode: !0,
		supportsPhoto: !0
	},
	{
		id: "tabellarisch",
		name: "Tabellarisch",
		description: "Modernes Timeline-Design für erfahrene Profis mit vertikalen Erfahrungs- und Ausbildungs-Zeitleisten.",
		accent: "#c78300",
		secondary: "#17263d",
		font: "Source Sans 3",
		layout: "split-clean",
		features: [
			"Timeline",
			"Berufserfahrung",
			"Zeitgenössisch"
		],
		category: "modern",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		atsInfo: "Tabellarisch-Template unterstützt ATS-Modus mit einspaltigem Layout und ausgeblendeten Designelementen wie Timeline-Grafiken.",
		designDefaults: {
			columnLayout: "single",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	}
], ms = (e) => ps.find((t) => t.id === e) ?? ps[0], hs = (e) => {
	let t = e.replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(t)) return "#ffffff";
	let [n, r, i] = [
		0,
		2,
		4
	].map((e) => Number.parseInt(t.slice(e, e + 2), 16) / 255).map((e) => e <= .03928 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4);
	return .2126 * n + .7152 * r + .0722 * i > .46 ? "#26313a" : "#ffffff";
}, gs = (e, t) => t.map((t) => ({
	title: t,
	type: e
}));
gs("it", [
	"Programmiersprachen",
	"Backend",
	"Frontend",
	"Fullstack",
	"Frameworks",
	"Datenbanken",
	"Cloud",
	"DevOps",
	"Testing",
	"Versionsverwaltung",
	"Methoden",
	"Tools"
]), gs("engineering", [
	"CAD",
	"FEM",
	"Berechnung",
	"Konstruktion",
	"Prozessplanung",
	"Produktionsplanung",
	"Werkstofftechnik",
	"Qualitätsmanagement",
	"Normen und Regelwerke",
	"Technische Dokumentation",
	"Projektmanagement"
]), gs("engineering", [
	"CAD/BIM",
	"Bauplanung",
	"Bauleitung",
	"Ausschreibung",
	"Kostenplanung",
	"Terminplanung",
	"Qualitätssicherung",
	"Baurecht und Normen",
	"Projektmanagement",
	"Software"
]), gs("engineering", [
	"Schaltungstechnik",
	"Automatisierung",
	"SPS",
	"EPLAN",
	"Messtechnik",
	"Regelungstechnik",
	"Embedded Systems",
	"Normen",
	"Projektplanung",
	"Software"
]), gs("business", [
	"Buchhaltung",
	"Controlling",
	"ERP",
	"SAP",
	"Office",
	"Personalverwaltung",
	"Lohnabrechnung",
	"Steuerrecht",
	"Projektmanagement",
	"Kommunikation"
]);
//#endregion
//#region src/features/knowledge/knowledge.utils.ts
var _s = (e = "", t = 0) => ({
	id: crypto.randomUUID(),
	name: e,
	description: "",
	level: "none",
	isVisible: !0,
	sortOrder: t
}), vs = (e = "", t = 0, n = "custom") => ({
	id: crypto.randomUUID(),
	title: e,
	type: n,
	subtitle: "",
	items: [],
	subcategories: [],
	displayMode: "comma-separated",
	showLevels: !1,
	showYearsOfExperience: !1,
	isVisible: !0,
	sortOrder: t
}), ys = (e) => e.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder), bs = (e, t, n, r) => {
	let i = [];
	if (t && e.level !== "none") if (r === "level-dots") {
		let t = Po[e.level];
		i.push(`${"●".repeat(t)}${"○".repeat(5 - t)} ${No[e.level]}`);
	} else i.push(No[e.level]);
	return n && e.yearsOfExperience !== void 0 && i.push(`${e.yearsOfExperience} ${e.yearsOfExperience === 1 ? "Jahr" : "Jahre"}`), e.lastUsedYear !== void 0 && i.push(`zuletzt ${e.lastUsedYear}`), e.description?.trim() && i.push(e.description.trim()), `${e.name}${i.length ? ` – ${i.join(", ")}` : ""}`;
}, xs = (e) => e.categories.filter((e) => e.isVisible).flatMap((e) => [...ys(e.items).map((e) => e.name), ...e.subcategories.filter((e) => e.isVisible).flatMap((e) => ys(e.items).map((e) => e.name))]), Ss = (e, t = !1) => e.isVisible ? e.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => {
	let n = [], r = t ? "comma-separated" : e.displayMode, i = ys(e.items);
	if (i.length) {
		let t = i.map((t) => bs(t, e.showLevels, e.showYearsOfExperience, r));
		n.push(r === "comma-separated" || r === "tags" ? `${e.title}: ${t.join(", ")}` : `${e.title}\n${t.map((e) => `• ${e}`).join("\n")}`);
	}
	return e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).forEach((i) => {
		let a = ys(i.items);
		if (!a.length) return;
		let o = t ? "comma-separated" : i.displayMode ?? r, s = a.map((t) => bs(t, e.showLevels, e.showYearsOfExperience, o));
		n.push(o === "comma-separated" || o === "tags" ? `${e.title} – ${i.title}: ${s.join(", ")}` : `${e.title} – ${i.title}\n${s.map((e) => `• ${e}`).join("\n")}`);
	}), n;
}).filter(Boolean).join("\n") : "", Cs = (e, t) => {
	if (e?.categories.length) return structuredClone(e);
	if (!t.filter(Boolean).length) return structuredClone(e ?? Fo);
	let n = vs("Kenntnisse", 0, "custom");
	return n.items = t.filter(Boolean).map((e, t) => _s(e, t)), {
		title: e?.title || Fo.title,
		categories: [n],
		isVisible: e?.isVisible ?? !0
	};
}, ws = 30, Ts = 38, Es = 3300, Ds = (e, t = 95) => Math.max(0, Math.ceil(e.trim().length / t)), Os = (e) => 4 + Ds(`${e.role} ${e.company}`, 70) + e.achievements.reduce((e, t) => e + 1 + Ds(t), 0), ks = (e) => 2 + Ds(`${e.degree} ${e.institution}`, 80), As = (e, t) => {
	if (!e) return 4;
	let n = t || e.summary, r = xs(Cs(e.knowledgeSection, e.skills)).length;
	return Ds(n, 105) + Math.ceil(r / 3) + Math.ceil(e.languages.length / 2) + Math.ceil(e.certifications.length / 2);
}, js = (e, t) => e > t * 1.3 ? "dense" : e > t * .9 ? "compact" : "standard", Ms = (e, t = "") => {
	let n = [...(e?.experiences ?? []).map((e) => ({
		kind: "experience",
		id: e.id,
		weight: Os(e)
	})), ...(e?.education ?? []).map((e) => ({
		kind: "education",
		id: e.id,
		weight: ks(e)
	}))], r = n.reduce((e, t) => e + t.weight, 0), i = Math.max(r, As(e, t));
	if (i <= ws || n.length <= 1) return [{
		pageNumber: 1,
		items: n,
		density: js(i, ws)
	}];
	let a = [], o = [], s = 0;
	for (let e of n) a.length === 0 || s + e.weight <= ws ? (a.push(e), s += e.weight) : o.push(e);
	o.length === 0 && a.length > 1 && (o.unshift(a.pop()), s = a.reduce((e, t) => e + t.weight, 0));
	let c = o.reduce((e, t) => e + t.weight, 0);
	return [{
		pageNumber: 1,
		items: a,
		density: js(Math.max(s, As(e, t)), ws)
	}, {
		pageNumber: 2,
		items: o,
		density: js(c, Ts)
	}];
}, Ns = (e) => {
	let t = [
		e.coverSubject,
		e.coverIntroduction,
		e.coverMotivation,
		e.coverQualification,
		e.coverCompanyFit,
		e.coverClosing
	].reduce((e, t) => e + t.trim().length, 0);
	return {
		characterCount: t,
		recommendedMaximum: Es,
		density: t > Es ? "dense" : t > 2500 ? "compact" : "standard",
		isOverRecommendedLength: t > Es
	};
}, Ps = /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=\s]+$/i, Fs = (e) => e && Ps.test(e) ? e : "", Q = (e = "") => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;"), Is = (e, t) => e.backgroundId === "programming-languages-bg" && !t ? `<div class="document-background-layer programming-languages-layer" aria-hidden="true">${Eo.map((e) => `<span>${Q(e)}</span>`).join("")}</div>` : "", Ls = (e, t, n) => {
	let r = ys(e);
	if (!r.length) return "";
	let i = r.map((e) => bs(e, t.showLevels, t.showYearsOfExperience, n));
	if (n === "comma-separated") return `<p class="knowledge-comma">${i.map(Q).join(", ")}</p>`;
	if (n === "tags") return `<div class="knowledge-tags">${i.map((e) => `<span>${Q(e)}</span>`).join("")}</div>`;
	if (n === "level-bars" || n === "level-dots") return `<div class="knowledge-level-list ${n}">${r.map((e) => {
		let r = Po[e.level], i = e.level === "none" ? "" : No[e.level], a = t.showYearsOfExperience && e.yearsOfExperience !== void 0 ? ` · ${e.yearsOfExperience} Jahre` : "", o = n === "level-bars" ? `<i class="knowledge-level-bar"><b style="width:${r * 20}%"></b></i>` : `<i class="knowledge-level-dots">${"●".repeat(r)}<em>${"○".repeat(5 - r)}</em></i>`;
		return `<div class="knowledge-level-row"><span>${Q(e.name)}</span>${o}<small>${Q(i + a)}</small></div>`;
	}).join("")}</div>`;
	let a = n === "bullets" ? "ul" : "div";
	return `<${a} class="knowledge-lines ${n}">${i.map((e) => n === "bullets" ? `<li>${Q(e)}</li>` : `<p>${Q(e)}</p>`).join("")}</${a}>`;
}, Rs = (e, t) => {
	if (!e) return "";
	let n = Cs(e.knowledgeSection, e.skills);
	if (!n.isVisible) return "";
	let r = n.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => {
		let n = t ? "comma-separated" : e.displayMode, r = Ls(e.items, e, n), i = e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).map((r) => {
			let i = Ls(r.items, e, t ? "comma-separated" : r.displayMode ?? n);
			return i ? `<div class="knowledge-subcategory"><h5>${Q(r.title)}</h5>${i}</div>` : "";
		}).join("");
		return !r && !i ? "" : `<div class="knowledge-category"><h4>${Q(e.title)}</h4>${e.subtitle ? `<small>${Q(e.subtitle)}</small>` : ""}${r}${i}</div>`;
	}).join(""), i = t ? "Kenntnisse" : n.title;
	return r ? `<section class="knowledge-section"><h3>${Q(i)}</h3>${r}</section>` : "";
}, zs = (e) => e ? `${e.firstName} ${e.lastName}`.trim() : "Vorname Nachname", Bs = (e) => [e.contact.firstName, e.contact.lastName].filter(Boolean).join(" "), Vs = (e) => {
	let t = Bs(e);
	return t ? e.contact.salutation === "Frau" ? `Sehr geehrte Frau ${e.contact.lastName}` : e.contact.salutation === "Herr" ? `Sehr geehrter Herr ${e.contact.lastName}` : `Guten Tag ${t}` : "Sehr geehrte Damen und Herren";
}, Hs = (e) => [
	e.company.name,
	Bs(e),
	e.company.street,
	`${e.company.postalCode} ${e.company.city}`.trim()
].filter(Boolean).map(Q).join("<br>"), Us = (e) => e ? [
	zs(e),
	e.street,
	`${e.postalCode} ${e.city}`.trim(),
	e.phone,
	e.email
].filter(Boolean).map(Q).join(" · ") : "Bitte unter Profile Ihre Absenderdaten ergänzen.", Ws = (e, t, n, r) => {
	let i = Mo(r.fontId), a = Mo(r.headingFontId);
	return `
  :root{--accent:${e};--secondary:${t};--on-secondary:${n};--ink:#172026;--muted:#5c6870;--line:#d9e0e3;--doc-margin:${Do[r.marginLevel]}mm;--section-gap:${ko[r.sectionSpacingLevel]}mm;--body-size:${jo[r.fontSize]}pt;--body-line:${Ao[r.lineHeightLevel]};--body-font:${i.family};--heading-font:${a.family};--heading-weight:${a.headingWeight}}
  @page{size:A4;margin:0}
  *{box-sizing:border-box}body{margin:0;background:#eef1f1;color:var(--ink);font-family:var(--body-font)}
  .page{width:210mm;height:297mm;min-height:297mm;max-height:297mm;margin:0 auto 8mm;overflow:hidden;background:#fff;break-after:page;page-break-after:always;position:relative;print-color-adjust:exact;-webkit-print-color-adjust:exact}
  .page:last-child{break-after:auto;page-break-after:auto}.page-content{position:relative;z-index:1;width:100%;height:100%;transform-origin:top left}.standard-page-content{padding:var(--doc-margin)}
  .document-background-layer{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}.programming-languages-layer{color:color-mix(in srgb,var(--accent),#70808a 45%);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;opacity:.105}.programming-languages-layer:before,.programming-languages-layer:after{position:absolute;border:1px solid currentColor;border-radius:4mm;content:""}.programming-languages-layer:before{width:54mm;height:37mm;right:-15mm;top:-9mm}.programming-languages-layer:after{width:61mm;height:42mm;left:-20mm;bottom:-12mm}.programming-languages-layer span{position:absolute;padding:1.2mm 2.3mm;border:1px solid currentColor;border-radius:2.5mm;font-size:7.8pt;font-weight:650;letter-spacing:.025em;white-space:nowrap}.programming-languages-layer span:nth-child(1){right:9mm;top:12mm}.programming-languages-layer span:nth-child(2){right:31mm;top:23mm}.programming-languages-layer span:nth-child(3){right:7mm;top:38mm}.programming-languages-layer span:nth-child(4){right:26mm;top:52mm}.programming-languages-layer span:nth-child(5){right:8mm;top:68mm}.programming-languages-layer span:nth-child(6){left:8mm;bottom:77mm}.programming-languages-layer span:nth-child(7){left:25mm;bottom:62mm}.programming-languages-layer span:nth-child(8){left:7mm;bottom:47mm}.programming-languages-layer span:nth-child(9){left:31mm;bottom:33mm}.programming-languages-layer span:nth-child(10){left:8mm;bottom:18mm}.programming-languages-layer span:nth-child(11){left:51mm;bottom:13mm}.programming-languages-layer span:nth-child(12){right:8mm;bottom:16mm}.programming-languages-layer span:nth-child(13){right:26mm;bottom:31mm}
  .rule{height:4px;background:var(--accent);margin-bottom:22mm}
  .kicker{color:var(--accent);font-size:10pt;text-transform:uppercase;letter-spacing:.16em;font-weight:700}
  h1,h2,h3{font-family:var(--heading-font);font-weight:var(--heading-weight)}h1{font-size:29pt;line-height:1.05;margin:8mm 0 4mm}h2{font-size:14pt;color:var(--accent);margin:8mm 0 3mm}
  h3{font-size:11pt;margin:0 0 1mm}.muted{color:var(--muted)}p,li{font-size:var(--body-size);line-height:var(--body-line)}
  .cover-content{display:flex;flex-direction:column;justify-content:flex-end}.cover-content h1{font-size:36pt;max-width:145mm}
  .contact{padding-top:8mm;border-top:1px solid var(--line)}.sender{font-size:8.5pt;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:2mm}
  .recipient{margin-top:13mm;min-height:35mm}.date{text-align:right}.subject{font-weight:800;font-size:12pt;margin:8mm 0 5mm}
  .signature{margin-top:8mm}.signature-image{display:block;width:auto;max-width:48mm;height:auto;max-height:16mm;margin:2mm 0 1mm;object-fit:contain;object-position:left center}
  .letter-content{padding:var(--doc-margin)}.letter-content>p:not(.date,.subject){margin:0 0 calc(var(--section-gap) * .72)}
  .letter-compact .letter-content{padding:16mm 20mm}.letter-compact .rule{margin-bottom:15mm}.letter-compact .recipient{margin-top:10mm;min-height:30mm}.letter-compact p{font-size:9.6pt;line-height:1.42}.letter-compact .signature{margin-top:6mm}
  .letter-dense .letter-content{padding:14mm 18mm}.letter-dense .rule{height:3px;margin-bottom:10mm}.letter-dense .recipient{margin-top:7mm;min-height:24mm}.letter-dense p{font-size:9pt;line-height:1.32}.letter-dense .letter-content>p:not(.date,.subject){margin-bottom:2.6mm}.letter-dense .subject{margin:5mm 0 3mm}.letter-dense .signature{margin-top:4mm}
  .cv-page{padding:0;display:grid;grid-template:"header header" auto "main side" 1fr/64% 36%;overflow:hidden}
  .cv-header{grid-area:header;display:flex;align-items:center;justify-content:space-between;gap:9mm;padding:var(--doc-margin) var(--doc-margin) calc(var(--doc-margin) * .6)}
  .cv-header h1{margin:1mm 0 0;font-size:25pt;line-height:1;letter-spacing:.015em;text-transform:uppercase}
  .cv-header h2{margin:2mm 0;color:var(--accent);font-size:14pt;font-weight:500}
  .cv-contact-line{margin:0;color:var(--muted);font-size:8.4pt}
  .cv-avatar{display:grid;width:24mm;height:24mm;flex:0 0 auto;place-items:center;border:2px solid color-mix(in srgb,var(--accent),white 60%);border-radius:50%;color:var(--accent);background:color-mix(in srgb,var(--accent),white 89%);font-size:16pt;font-weight:800}.cv-avatar.has-image{overflow:hidden;padding:0}.cv-avatar-image{display:block;width:100%;height:100%;object-fit:cover}
  .cv-primary{grid-area:main;min-width:0;padding:0 calc(var(--doc-margin) * .65) var(--doc-margin) var(--doc-margin)}
  .cv-secondary{grid-area:side;min-width:0;padding:2mm calc(var(--doc-margin) * .75) var(--doc-margin) calc(var(--doc-margin) * .35)}
  .cv-page section{margin-top:var(--section-gap)}.cv-page section>h3{margin:0 0 3mm;padding-bottom:2mm;border-bottom:1px solid #aeb6b5;color:#535c5b;font-size:11pt;font-weight:600;letter-spacing:.025em;text-transform:uppercase}
  .cv-page p,.cv-page li{font-size:var(--body-size);line-height:var(--body-line)}.cv-entry{margin:0 0 calc(var(--section-gap) * .8)}.cv-entry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:5mm}
  .cv-entry-head strong{color:color-mix(in srgb,var(--accent),#172125 24%);font-size:11.5pt}.cv-entry-head p{margin:1mm 0;color:var(--accent);font-weight:600}
  .cv-entry-head small{flex:0 0 31mm;color:var(--muted);font-size:8pt;line-height:1.35;text-align:right}.cv-entry ul,.cv-secondary ul{margin:1mm 0;padding-left:5mm}
  .skills,.knowledge-tags{display:flex;flex-wrap:wrap;gap:1.5mm}.chip,.knowledge-tags span{padding:1mm 2mm;border-bottom:1px solid #b6bdbc;color:color-mix(in srgb,var(--accent),#202827 25%);font-size:8.2pt}
  .knowledge-category{margin-bottom:3mm}.knowledge-category h4,.knowledge-subcategory h5{font-size:9pt;margin:0 0 1mm;color:var(--accent)}.knowledge-category>small{display:block;margin:-.5mm 0 1mm}.knowledge-comma,.knowledge-lines p{margin:0 0 1mm}.knowledge-lines{margin:0;padding-left:4mm}.knowledge-subcategory{margin-top:1.5mm}.knowledge-level-row{display:grid;grid-template-columns:minmax(20mm,1fr) 18mm;gap:.8mm 2mm;margin-bottom:1mm}.knowledge-level-row small{grid-column:1/-1;font-size:7pt}.knowledge-level-bar{height:1.4mm;background:#dfe5e4;align-self:center}.knowledge-level-bar b{display:block;height:100%;background:var(--accent)}.knowledge-level-dots{font-style:normal;color:var(--accent);letter-spacing:.4mm}.knowledge-level-dots em{font-style:normal;color:#c9cfce}
  .language{display:flex;justify-content:space-between;gap:4mm;margin:2mm 0}.language i{color:var(--accent);font-size:7pt;font-style:normal;letter-spacing:1px;white-space:nowrap}.language-plain{justify-content:flex-start}
  .side-avatar{display:none;margin:0 auto 8mm}
  .cv-sidebar-right{grid-template:"header side" auto "main side" 1fr/66% 34%}.cv-sidebar-left{grid-template:"side header" auto "side main" 1fr/35% 65%}
  .cv-sidebar-right .cv-secondary,.cv-sidebar-left .cv-secondary{padding:17mm 10mm 14mm;color:var(--on-secondary);background:var(--secondary)}
  .cv-sidebar-right .cv-secondary section>h3,.cv-sidebar-left .cv-secondary section>h3{border-bottom-color:color-mix(in srgb,var(--on-secondary),transparent 25%);color:var(--on-secondary)}
  .cv-sidebar-right .cv-secondary p,.cv-sidebar-right .cv-secondary li,.cv-sidebar-left .cv-secondary p,.cv-sidebar-left .cv-secondary li{color:var(--on-secondary)}
  .cv-sidebar-right .cv-secondary .chip,.cv-sidebar-left .cv-secondary .chip{border-color:color-mix(in srgb,var(--on-secondary),transparent 45%);color:var(--on-secondary)}
  .cv-sidebar-right .language i,.cv-sidebar-left .language i{color:var(--on-secondary)}
  .cv-sidebar-right .cv-header>.cv-avatar,.cv-sidebar-left .cv-header>.cv-avatar{display:none}.cv-sidebar-right .side-avatar,.cv-sidebar-left .side-avatar{display:grid;border-color:color-mix(in srgb,var(--on-secondary),transparent 35%);color:var(--on-secondary);background:color-mix(in srgb,var(--on-secondary),transparent 83%)}
  .cv-sidebar-right .cv-header{padding-right:9mm}.cv-sidebar-left .cv-header{padding-left:10mm}.cv-sidebar-left .cv-primary{padding-right:14mm;padding-left:10mm}
  .cv-centered,.cv-minimal{grid-template:"header" auto "side" auto "main" 1fr/1fr}.cv-centered .cv-header{justify-content:center;text-align:center}.cv-centered .cv-contact-line{text-align:center}
  .cv-centered .cv-header>.cv-avatar,.cv-minimal .cv-header>.cv-avatar{display:none}.cv-centered .cv-secondary{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;padding:0 15mm 3mm}.cv-centered .cv-secondary section{margin-top:3mm}.cv-centered .cv-secondary section:first-of-type{grid-column:1/-1}
  .cv-centered .cv-primary,.cv-minimal .cv-primary{padding:0 15mm 14mm}.cv-minimal .cv-header{padding-bottom:5mm;border-bottom:1px solid #cfd4d3}.cv-minimal .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:7mm;padding:0 15mm 2mm}.cv-minimal .cv-secondary section{margin-top:5mm}
  .cv-split-clean .cv-secondary,.cv-bold-grid .cv-secondary{margin:0 12mm 14mm 0;padding:0 0 0 6mm;border-left:1px solid #d8dddc}.cv-split-clean .cv-secondary{background:linear-gradient(180deg,var(--secondary),white 70%)}
  .cv-bold-grid section>h3{border-bottom:2px solid var(--accent);color:color-mix(in srgb,var(--accent),#14202a 15%);font-size:13pt;font-weight:800}.cv-bold-grid .cv-header h1{color:color-mix(in srgb,var(--accent),#15202a 15%);font-weight:850}
  .cv-compact .cv-header{padding-top:11mm;padding-bottom:6mm}.cv-compact section{margin-top:5mm}.cv-compact .cv-entry{margin-bottom:3.5mm}.cv-compact p,.cv-compact li{font-size:8.15pt;line-height:1.3}
  .cv-dense .cv-header{padding-top:9mm;padding-bottom:4mm}.cv-dense .cv-header h1{font-size:22pt}.cv-dense .cv-header h2{font-size:12pt}.cv-dense section{margin-top:3.5mm}.cv-dense section>h3{margin-bottom:2mm;padding-bottom:1mm;font-size:10pt}.cv-dense .cv-entry{margin-bottom:2.5mm}.cv-dense p,.cv-dense li{font-size:7.6pt;line-height:1.24}.cv-dense .cv-entry-head strong{font-size:10pt}
  .cv-continuation{grid-template:"header" auto "main" 1fr/1fr}.cv-continuation .cv-header{padding:11mm 15mm 6mm;border-bottom:1px solid var(--line)}.cv-continuation .cv-header h1{font-size:18pt;margin:0}.cv-continuation .cv-header h2,.cv-continuation .cv-avatar{display:none}.cv-continuation .cv-primary{padding:0 15mm 14mm}.cv-continuation .cv-secondary{display:none}
  .column-single{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-single .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:5mm;padding:0 var(--doc-margin)}.column-single .cv-secondary section{margin-top:3mm}.column-single .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}
  .column-two-column-left-wide{grid-template:"header header" auto "main side" 1fr/65% 35%}.column-two-column-right-wide{grid-template:"side header" auto "side main" 1fr/36% 64%}.column-two-column-right-wide .cv-secondary{padding:var(--doc-margin) calc(var(--doc-margin) * .55);background:var(--secondary);color:var(--on-secondary)}.column-two-column-right-wide .cv-secondary h3,.column-two-column-right-wide .cv-secondary p,.column-two-column-right-wide .cv-secondary li,.column-two-column-right-wide .cv-secondary .chip{color:var(--on-secondary)}
  .column-two-column-equal{grid-template:"header header" auto "main side" 1fr/50% 50%}.column-left-sidebar{grid-template:"side header" auto "side main" 1fr/35% 65%}.column-right-sidebar{grid-template:"header side" auto "main side" 1fr/65% 35%}.column-left-sidebar .cv-secondary,.column-right-sidebar .cv-secondary{padding:var(--doc-margin) calc(var(--doc-margin) * .55);background:var(--secondary);color:var(--on-secondary)}.column-left-sidebar .cv-secondary h3,.column-left-sidebar .cv-secondary p,.column-left-sidebar .cv-secondary li,.column-left-sidebar .cv-secondary .chip,.column-right-sidebar .cv-secondary h3,.column-right-sidebar .cv-secondary p,.column-right-sidebar .cv-secondary li,.column-right-sidebar .cv-secondary .chip{color:var(--on-secondary)}
  .column-three-column{grid-template:"header header" auto "main side" 1fr/56% 44%}.column-three-column .cv-secondary{display:grid;grid-template-columns:1fr 1fr;align-content:start;gap:0 5mm}.column-three-column .cv-secondary section:first-of-type{grid-column:1/-1}
  .column-timeline{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-timeline .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:5mm;padding:0 var(--doc-margin)}.column-timeline .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}.column-timeline .cv-entry{padding-left:6mm;border-left:2px solid var(--accent);position:relative}.column-timeline .cv-entry:before{position:absolute;left:-2.3mm;top:1mm;width:3.5mm;height:3.5mm;border:1mm solid white;border-radius:50%;background:var(--accent);content:""}
  .column-compact-ats{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-compact-ats .cv-avatar{display:none}.column-compact-ats .cv-header{padding-bottom:5mm;border-bottom:1px solid var(--line)}.column-compact-ats .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:4mm;padding:0 var(--doc-margin)}.column-compact-ats .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}.column-compact-ats section{margin-top:3.5mm}.column-compact-ats p,.column-compact-ats li{font-size:8.2pt;line-height:1.28}
  .background-soft{background:color-mix(in srgb,var(--accent),white 96%)}.background-geometric{background-color:#fff;background-image:linear-gradient(135deg,color-mix(in srgb,var(--accent),transparent 95%) 25%,transparent 25%),linear-gradient(315deg,color-mix(in srgb,var(--accent),transparent 96%) 25%,transparent 25%);background-size:28mm 28mm}.background-hexagons{background-color:#fff;background-image:radial-gradient(circle at 25% 25%,color-mix(in srgb,var(--accent),transparent 92%) 1px,transparent 1.5px);background-size:8mm 8mm}.background-waves{background:radial-gradient(ellipse at 100% 0,color-mix(in srgb,var(--accent),transparent 88%) 0 18%,transparent 18.2% 25%,color-mix(in srgb,var(--accent),transparent 95%) 25.2% 31%,transparent 31.2%),#fff}.background-lines{background-color:#fff;background-image:linear-gradient(color-mix(in srgb,var(--accent),transparent 96%) 1px,transparent 1px);background-size:100% 8mm}.background-dots{background-color:#fff;background-image:radial-gradient(color-mix(in srgb,var(--accent),transparent 88%) .55px,transparent .7px);background-size:5mm 5mm}.background-abstract{background:radial-gradient(ellipse at 105% 15%,color-mix(in srgb,var(--accent),transparent 86%) 0 12%,transparent 12.2% 18%,color-mix(in srgb,var(--secondary),transparent 94%) 18.2% 24%,transparent 24.2%),#fff}.background-corner{background:linear-gradient(135deg,color-mix(in srgb,var(--accent),white 28%) 0 13%,transparent 13.2%),#fff}.background-pastel-gradient{background:linear-gradient(145deg,color-mix(in srgb,var(--accent),white 93%),#fff 52%,color-mix(in srgb,var(--secondary),white 94%))}.background-top-band{background:linear-gradient(180deg,color-mix(in srgb,var(--accent),white 80%) 0 24mm,#fff 24.2mm)}.background-bottom-band{background:linear-gradient(0deg,color-mix(in srgb,var(--accent),white 82%) 0 18mm,#fff 18.2mm)}
  .page-number{position:absolute;right:10mm;bottom:7mm;color:var(--muted);font-size:7.5pt}
  .cv-entry,.cv-page section,.signature{break-inside:avoid;page-break-inside:avoid}.cv-page section>h3{break-after:avoid;page-break-after:avoid}
  @media print{body{background:#fff}.page{margin:0}.no-print-background{background:#fff!important}.no-print-background .document-background-layer{display:none!important}}
`;
}, Gs = "\n  <script>\n    (() => {\n      const fit = (page) => {\n        const content = page.querySelector(\".page-content\");\n        if (!content) return;\n        content.style.transform = \"\";\n        content.style.width = \"100%\";\n        const heightRatio = page.clientHeight / Math.max(content.scrollHeight, 1);\n        const widthRatio = page.clientWidth / Math.max(content.scrollWidth, 1);\n        const scale = Math.min(1, heightRatio, widthRatio);\n        if (scale < 0.999) {\n          content.style.transform = \"scale(\" + scale + \")\";\n          content.style.width = 100 / scale + \"%\";\n          content.dataset.fitScale = scale.toFixed(3);\n        } else {\n          content.dataset.fitScale = \"1.000\";\n        }\n      };\n      document.querySelectorAll(\".page\").forEach(fit);\n    })();\n  <\/script>", Ks = (e, t, n) => {
	let r = ms(e.templateId), i = e.accentColor || r.accent, a = e.secondaryColor || r.secondary, o = hs(a), s = e.designSettings, c = s.resumeOutputMode === "ats" || s.columnLayout === "compact-ats", l = c ? "compact-ats" : s.columnLayout, u = `background-${s.backgroundId} ${s.showBackgroundInPrint ? "print-background" : "no-print-background"}`, d = Is(s, c), f = e.documents, p = t?.resumeSections ?? {
		profile: !0,
		experience: !0,
		education: !0,
		skills: !0,
		languages: !0,
		certifications: !0
	}, m = zs(t), h = e.job.title, g = e.company.name, _ = t ? `${t.firstName.charAt(0)}${t.lastName.charAt(0)}`.toUpperCase() : "VN", v = Fs(t?.photoPath), y = Fs(t?.signaturePath), b = (e = !1) => c ? "" : v ? `<span class="cv-avatar${e ? " side-avatar" : ""} has-image"><img class="cv-avatar-image" src="${Q(v)}" alt=""></span>` : `<span class="cv-avatar${e ? " side-avatar" : ""}">${Q(_)}</span>`, x = t ? [
		t.phone,
		t.email,
		t.city,
		t.linkedin
	].filter(Boolean).map(Q).join(" · ") : "Telefon · E-Mail · Ort", S = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(/* @__PURE__ */ new Date()), C = Ns(f), w = `
    <section class="page cover-page ${u}">
      ${d}
      <div class="page-content standard-page-content cover-content">
        <div class="rule"></div>
        <p class="kicker">Bewerbung</p>
        <h1>${Q(h)}</h1>
        <p class="muted">bei ${Q(g)}</p>
        <h2>${Q(m)}</h2>
        <p>${Q(f.deckblattStatement || t?.summary || "Motiviert, strukturiert und bereit für die nächste berufliche Aufgabe.")}</p>
        <div class="contact"><p>${Us(t)}</p></div>
      </div>
    </section>`, T = `
    <section class="page letter-page letter-${C.density} ${u}">
      ${d}
      <div class="page-content letter-content">
        <div class="rule"></div>
        <div class="sender">${Us(t)}</div>
        <div class="recipient">${Hs(e)}</div>
        <p class="date">${Q(t?.city || e.company.city)}, ${S}</p>
        <p class="subject">${Q(f.coverSubject || `Bewerbung als ${h}`)}</p>
        <p>${Q(Vs(e))},</p>
        <p>${Q(f.coverIntroduction || `die ausgeschriebene Position als ${h} bei ${g} spricht mich besonders an, weil sie fachliche Verantwortung mit konkretem Gestaltungsspielraum verbindet.`)}</p>
        <p>${Q(f.coverMotivation || "Meine Motivation entsteht aus der Möglichkeit, vorhandene Erfahrung gezielt einzusetzen, mich fachlich weiterzuentwickeln und gemeinsam mit Ihrem Team messbare Ergebnisse zu erzielen.")}</p>
        <p>${Q(f.coverQualification || t?.summary || "Ich arbeite strukturiert, zuverlässig und lösungsorientiert. Neue Anforderungen erfasse ich schnell und überführe sie in nachvollziehbare, belastbare Ergebnisse.")}</p>
        <p>${Q(f.coverCompanyFit || `An ${g} überzeugt mich besonders die Verbindung aus professionellem Anspruch und zukunftsorientierter Arbeitsweise.`)}</p>
        <p>${Q(f.coverClosing || "Gerne überzeuge ich Sie in einem persönlichen Gespräch davon, welchen konkreten Beitrag ich in Ihrem Team leisten kann. Auf Ihren Terminvorschlag freue ich mich.")}</p>
        <div class="signature"><p>Mit freundlichen Grüßen</p>${y ? `<img class="signature-image" src="${Q(y)}" alt="">` : ""}<strong>${Q(m)}</strong></div>
      </div>
    </section>`, E = new Map((t?.experiences ?? []).map((e) => [e.id, e])), D = new Map((t?.education ?? []).map((e) => [e.id, e])), O = p.profile ? `<section><h3>Zusammenfassung</h3><p>${Q(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", k = p.skills ? Rs(t, c) : "", A = p.languages && t?.languages.length ? `<section><h3>Sprachen</h3>${t.languages.map((e) => c ? `<p class="language language-plain"><span>${Q(e)}</span></p>` : `<p class="language"><span>${Q(e)}</span><i>●●●●○</i></p>`).join("")}</section>` : "", j = p.certifications && t?.certifications.length ? `<section><h3>Zertifikate</h3><ul>${t.certifications.map((e) => `<li>${Q(e)}</li>`).join("")}</ul></section>` : "", ee = Ms(t ? {
		...t,
		experiences: p.experience ? t.experiences : [],
		education: p.education ? t.education : []
	} : void 0, f.resumeProfile), M = (e) => {
		let t = E.get(e);
		return t ? `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${Q(t.role)}</strong><p>${Q(t.company)}</p></div>
          <small>${Q(t.from)} – ${Q(t.to)}${t.city ? `<br>${Q(t.city)}` : ""}</small>
        </div>
        <ul>${t.achievements.filter(Boolean).map((e) => `<li>${Q(e)}</li>`).join("")}</ul>
      </article>` : "";
	}, N = (e) => {
		let t = D.get(e);
		return t ? `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${Q(t.degree)}</strong><p>${Q(t.institution)}</p></div>
          <small>${Q(t.from)} – ${Q(t.to)}${t.city ? `<br>${Q(t.city)}` : ""}</small>
        </div>
      </article>` : "";
	}, P = ee.map((e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => M(e.id)).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => N(e.id)).join(""), a = e.pageNumber === 2, o = e.density === "standard" ? "" : ` cv-${e.density}`, s = `
          <main class="cv-primary">
            ${n ? `<section><h3>Berufserfahrung${a ? " · Fortsetzung" : ""}</h3>${n}</section>` : ""}
            ${i ? `<section><h3>Ausbildung</h3>${i}</section>` : ""}
            ${!n && !i && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
          </main>`, f = a ? "" : `<aside class="cv-secondary">
                  ${b(!0)}
                  ${O}
                  ${k}
                  ${A}
                  ${j}
                </aside>`;
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}">
        ${d}
        <div class="page-content cv-page cv-${r.layout} column-${l}${a ? " cv-continuation" : ""}${o}">
          <header class="cv-header">
            <div>
              <p class="kicker">${a ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}</p>
              <h1>${Q(m)}</h1>
              <h2>${Q(t?.title || h)}</h2>
              <p class="cv-contact-line">${x}</p>
            </div>
            ${b()}
          </header>
          ${c ? `${f}${s}` : `${s}${f}`}
          <span class="page-number">${e.pageNumber} / ${ee.length}</span>
        </div>
      </section>`;
	}).join(""), F = n === "mappe" ? [
		w,
		T,
		P
	] : n === "deckblatt" ? [w] : n === "anschreiben" ? [T] : [P];
	return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${Q(g)} – ${Q(h)}</title><style>${Ws(i, a, o, s)}</style></head><body>${F.join("")}${Gs}</body></html>`;
}, qs = (e, t) => {
	let n = e.documents;
	return `# ${n.coverSubject || `Bewerbung als ${e.job.title}`}

${Vs(e)},

${n.coverIntroduction}

${n.coverMotivation}

${n.coverQualification}

${n.coverCompanyFit}

${n.coverClosing}

Mit freundlichen Grüßen

${zs(t)}
`;
}, Js = () => (/* @__PURE__ */ new Date()).toISOString(), Ys = () => crypto.randomUUID(), Xs = /* @__PURE__ */ new Set([
	"Zusage",
	"Absage",
	"Zurückgezogen",
	"Archiviert"
]), Zs = (e, t) => t?.trim() ? `${e}: ${t.trim()}` : "", Qs = (e) => {
	let t = e.toLocaleLowerCase("de-DE"), n = /muttersprache|c2|native/.test(t) ? 5 : /c1|verhandlungssicher|versiert|fließend/.test(t) || /b2|gute kenntnisse/.test(t) ? 4 : /b1|grundkenntnisse/.test(t) ? 3 : /a2/.test(t) ? 2 : /a1/.test(t) ? 1 : e ? 3 : 0;
	return `${"●".repeat(n)}${"○".repeat(5 - n)}`;
}, $s = (e) => Mo(e).family.match(/"([^"]+)"|([^,]+)/)?.[1] ?? Mo(e).family.match(/"([^"]+)"|([^,]+)/)?.[2]?.trim() ?? "Arial", ec = (e, t, n) => {
	let r = (e) => [
		1,
		3,
		5
	].map((t) => Number.parseInt(e.replace("#", "").slice(t - 1, t + 1), 16)), i = r(e), a = r(t);
	return `#${i.map((e, t) => Math.round(e * (1 - n) + a[t] * n).toString(16).padStart(2, "0")).join("")}`;
}, tc = {
	"application-sent": [],
	"application-deadline": [4320, 1440],
	interview: [1440, 60],
	"second-interview": [1440, 60],
	"phone-interview": [1440, 60],
	"online-interview": [1440, 60],
	"trial-work": [1440],
	assessment: [1440],
	"follow-up-call": [0],
	"follow-up-email": [0],
	"contract-start": [1440],
	"contract-end": [10080],
	"fixed-term-end": [20160],
	"probation-end": [20160],
	custom: []
}, nc = () => ({
	schemaVersion: 1,
	applications: [],
	profiles: [],
	events: [],
	attachments: [],
	settings: ds,
	updatedAt: Js()
}), rc = (e) => e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-").replace(/\s+/g, "_").replace(/[. ]+$/g, "").slice(0, 80) || "Bewerbung", ic = () => (/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(0, 14), ac = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), n.setHours(9, 0, 0, 0), n.toISOString();
}, oc = (e, t = " | ") => e.map((e) => e?.trim()).filter(Boolean).join(t), sc = (e) => {
	let [t, ...n] = e.split(/\s+(?:\||–|—|:)\s+|\s+-\s+/).map((e) => e.trim());
	return {
		name: t ?? "",
		level: n.join(" – ")
	};
}, cc = class {
	constructor(t) {
		this.workspace = nc(), this.dataPath = e.join(t, "BewerbungsManager", "data"), this.workspacePath = e.join(this.dataPath, "Settings", "workspace.json");
	}
	async initialize() {
		let t = [
			"Bewerbungen",
			"Lebenslauf",
			"Anschreiben",
			"Zeugnisse",
			"Zertifikate",
			e.join("Muster", "Anschreiben"),
			e.join("Muster", "Lebenslauf"),
			e.join("Muster", "Deckblatt"),
			"Profile",
			"Settings",
			"Backups"
		];
		await Promise.all(t.map((t) => r(e.join(this.dataPath, t), { recursive: !0 }))), this.workspace = await this.loadWorkspace(), await this.persist();
	}
	getWorkspace() {
		return structuredClone(this.workspace);
	}
	async loadWorkspace() {
		for (let e of [this.workspacePath, `${this.workspacePath}.bak`]) try {
			let t = JSON.parse(await a(e, "utf8")), n = us.safeParse(t);
			if (n.success) return n.data;
		} catch {}
		return nc();
	}
	async atomicWrite(t, a) {
		await r(e.dirname(t), { recursive: !0 });
		let o = `${t}.${Ys()}.tmp`, l = `${t}.bak`, u = await i(o, "w");
		try {
			await u.writeFile(a, "utf8"), await u.sync();
		} finally {
			await u.close();
		}
		try {
			await n(t, l);
		} catch {}
		try {
			await s(o, t);
		} catch {
			await c(t, { force: !0 }), await s(o, t);
		}
	}
	async persist() {
		this.workspace.updatedAt = Js();
		let e = us.parse(this.workspace);
		await this.atomicWrite(this.workspacePath, JSON.stringify(e, null, 2)), await Promise.all(e.applications.map((e) => this.persistApplicationFiles(e))), await this.createAutomaticBackup();
	}
	async createAutomaticBackup() {
		if (!this.workspace.settings.autoBackupEnabled) return;
		let t = e.join(this.dataPath, "Backups");
		await r(t, { recursive: !0 });
		let i = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), a = e.join(t, `workspace-${i}.json`);
		try {
			await l(a);
		} catch {
			await n(this.workspacePath, a);
		}
		let s = (await o(t, { withFileTypes: !0 })).filter((e) => e.isFile() && /^workspace-\d{4}-\d{2}-\d{2}\.json$/.test(e.name)).map((e) => e.name).sort().reverse();
		for (let n of s.slice(this.workspace.settings.backupRetention)) {
			let r = e.resolve(t, n);
			if (!r.startsWith(`${e.resolve(t)}${e.sep}`)) throw Error("Ungültiger Sicherungspfad.");
			await c(r, { force: !0 });
		}
	}
	applicationPath(t) {
		return e.join(this.dataPath, "Bewerbungen", t.folderName);
	}
	getApplicationPath(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		return this.applicationPath(t);
	}
	async ensureApplicationDirectories(t) {
		let n = this.applicationPath(t);
		return await Promise.all([
			"Stellenanzeige",
			"Anschreiben",
			"Deckblatt",
			"Lebenslauf",
			"Zeugnisse",
			"Zertifikate",
			"Export"
		].map((t) => r(e.join(n, t), { recursive: !0 }))), n;
	}
	async persistApplicationFiles(t) {
		let n = await this.ensureApplicationDirectories(t), r = this.workspace.profiles.find((e) => e.id === t.profileId || !t.profileId && e.isDefault);
		await Promise.all([
			this.atomicWrite(e.join(n, "bewerbung.json"), JSON.stringify(is.parse(t), null, 2)),
			this.atomicWrite(e.join(n, "Stellenanzeige", "stellenanzeige.json"), JSON.stringify(t.job, null, 2)),
			this.atomicWrite(e.join(n, "Stellenanzeige", "stellenanzeige.txt"), t.job.fullText),
			this.atomicWrite(e.join(n, "Anschreiben", `${rc(t.company.name)}.md`), qs(t, r)),
			this.atomicWrite(e.join(n, "Export", "bewerbungsmappe.html"), Ks(t, r, "mappe"))
		]);
	}
	createEvent(e, t, n, r, i) {
		let a = Js();
		return {
			id: Ys(),
			applicationId: e,
			type: t,
			title: n,
			description: "",
			startAt: r,
			allDay: i,
			completed: !1,
			cancelled: !1,
			reminderMinutes: tc[t],
			createdAt: a,
			updatedAt: a
		};
	}
	ensureEvent(e, t, n, r, i = !1) {
		let a = this.workspace.events.find((n) => n.applicationId === e.id && n.type === t);
		if (!r) {
			a && (a.cancelled = !0, a.updatedAt = Js());
			return;
		}
		if (a) {
			Object.assign(a, {
				title: n,
				startAt: r,
				allDay: i,
				cancelled: !1,
				updatedAt: Js()
			});
			return;
		}
		this.workspace.events.push(this.createEvent(e.id, t, n, r, i));
	}
	syncEvents(e) {
		let t = e.company.name;
		this.ensureEvent(e, "application-sent", `Bewerbung gesendet · ${t}`, e.sentAt, !0), this.ensureEvent(e, "application-deadline", `Bewerbungsfrist · ${t}`, e.deadlineAt, !0), this.ensureEvent(e, "interview", `Vorstellungsgespräch · ${t}`, e.interviewAt), this.ensureEvent(e, "second-interview", `Zweites Gespräch · ${t}`, e.secondInterviewAt), this.ensureEvent(e, "contract-start", `Vertragsbeginn · ${t}`, e.startAt, !0), this.ensureEvent(e, "contract-end", `Vertragsende · ${t}`, e.contractEndAt, !0), this.ensureEvent(e, "fixed-term-end", `Befristungsende · ${t}`, e.fixedTermEndAt, !0), this.ensureEvent(e, "probation-end", `Probezeitende · ${t}`, e.probationEndAt, !0);
		let n = e.status === "Beworben" && e.sentAt && this.workspace.settings.followUpDays !== null ? ac(e.sentAt, this.workspace.settings.followUpDays) : void 0;
		if (this.ensureEvent(e, "follow-up-call", `Bei ${t} zum Stand der Bewerbung nachfragen`, n), Xs.has(e.status)) {
			let t = /* @__PURE__ */ new Set([
				"application-sent",
				"contract-start",
				"contract-end",
				"fixed-term-end",
				"probation-end"
			]);
			this.workspace.events.forEach((n) => {
				n.applicationId === e.id && !t.has(n.type) && new Date(n.startAt) > /* @__PURE__ */ new Date() && (n.cancelled = !0, n.updatedAt = Js());
			});
		}
	}
	async createApplication(e) {
		let t = as.parse(e), n = Js(), r = `${rc(t.company.name)}_${ic()}`, i = {
			schemaVersion: 1,
			id: Ys(),
			folderName: r,
			...t,
			status: t.sentAt ? "Beworben" : "Entwurf",
			documents: {
				coverSubject: `Bewerbung als ${t.job.title}`,
				coverIntroduction: `die Position als ${t.job.title} bei ${t.company.name} verbindet genau die Aufgaben, in denen ich meine Erfahrung gezielt einbringen möchte.`,
				coverMotivation: "",
				coverQualification: "",
				coverCompanyFit: "",
				coverClosing: "Gerne überzeuge ich Sie in einem persönlichen Gespräch von meiner Motivation und Eignung. Auf Ihren Terminvorschlag freue ich mich.",
				resumeProfile: "",
				deckblattStatement: ""
			},
			attachmentIds: [],
			statusHistory: [{
				at: n,
				to: t.sentAt ? "Beworben" : "Entwurf",
				note: "Bewerbung angelegt"
			}],
			createdAt: n,
			updatedAt: n
		};
		return this.workspace.applications.unshift(is.parse(i)), this.syncEvents(i), await this.persist(), this.getWorkspace();
	}
	async saveApplication(e) {
		let t = is.parse(e), n = this.workspace.applications.findIndex((e) => e.id === t.id);
		if (n < 0) throw Error("Bewerbung wurde nicht gefunden.");
		return t.updatedAt = Js(), this.workspace.applications[n] = t, this.syncEvents(t), await this.persist(), this.getWorkspace();
	}
	async changeStatus(e, t, n) {
		let r = this.workspace.applications.find((t) => t.id === e);
		if (!r) throw Error("Bewerbung wurde nicht gefunden.");
		if (r.status !== t) {
			let e = Js(), i = r.status;
			r.status = t, r.updatedAt = e, r.statusHistory.push({
				at: e,
				from: i,
				to: t,
				note: ""
			}), t === "Absage" && (r.rejectionAt = e, r.rejectionReason = n ?? "Keine Begründung"), t === "Zusage" && (r.acceptedAt = e), t === "Zurückgezogen" && (r.withdrawnAt = e), t === "Archiviert" && (r.archivedAt = e), this.syncEvents(r), await this.persist();
		}
		return this.getWorkspace();
	}
	async removeApplication(e) {
		return this.workspace.applications = this.workspace.applications.filter((t) => t.id !== e), this.workspace.events = this.workspace.events.filter((t) => t.applicationId !== e), this.workspace.attachments = this.workspace.attachments.filter((t) => t.applicationId !== e), await this.persist(), this.getWorkspace();
	}
	async duplicateApplication(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		let n = Js(), r = {
			...structuredClone(t),
			id: Ys(),
			folderName: `${rc(t.company.name)}_${ic()}`,
			status: "Entwurf",
			sentAt: void 0,
			rejectionAt: void 0,
			rejectionReason: void 0,
			acceptedAt: void 0,
			attachmentIds: [],
			statusHistory: [{
				at: n,
				to: "Entwurf",
				note: "Bewerbung dupliziert"
			}],
			createdAt: n,
			updatedAt: n
		};
		return this.workspace.applications.unshift(r), this.syncEvents(r), await this.persist(), this.getWorkspace();
	}
	async saveProfile(e) {
		let t = os.parse(e);
		t.isDefault && this.workspace.profiles.forEach((e) => {
			e.isDefault = !1;
		});
		let n = this.workspace.profiles.findIndex((e) => e.id === t.id);
		return n >= 0 ? this.workspace.profiles[n] = t : this.workspace.profiles.push(t), await this.persist(), this.getWorkspace();
	}
	async saveSettings(e) {
		return this.workspace.settings = ls.parse(e), this.workspace.applications.forEach((e) => this.syncEvents(e)), await this.persist(), this.getWorkspace();
	}
	async saveEvent(e) {
		let t = this.workspace.events.findIndex((t) => t.id === e.id);
		if (t < 0) throw Error("Termin wurde nicht gefunden.");
		return this.workspace.events[t] = e, await this.persist(), this.getWorkspace();
	}
	async addAttachment(t, i, a) {
		let o = this.workspace.applications.find((e) => e.id === t);
		if (!o) throw Error("Bewerbung wurde nicht gefunden.");
		let s = e.basename(a), c = `${ic()}_${rc(s)}`, l = e.join(this.applicationPath(o), i, c);
		await r(e.dirname(l), { recursive: !0 }), await n(a, l);
		let u = {
			id: Ys(),
			applicationId: t,
			category: i,
			fileName: s,
			storedName: c,
			description: "",
			documentDate: "",
			order: o.attachmentIds.length,
			includedInPackage: !0,
			createdAt: Js()
		};
		return this.workspace.attachments.push(u), o.attachmentIds.push(u.id), await this.persist(), this.getWorkspace();
	}
	getAttachmentPath(t) {
		let n = this.getApplication(t.applicationId);
		if (e.basename(t.storedName) !== t.storedName) throw Error("Ungültiger gespeicherter Dateiname.");
		let r = e.resolve(this.applicationPath(n), t.category), i = e.resolve(r, t.storedName);
		if (!i.startsWith(`${r}${e.sep}`)) throw Error("Ungültiger Dokumentpfad.");
		return i;
	}
	getAttachmentPathById(e) {
		let t = this.workspace.attachments.find((t) => t.id === e);
		if (!t) throw Error("Dokument wurde nicht gefunden.");
		return this.getAttachmentPath(t);
	}
	async saveAttachment(t) {
		let n = cs.parse(t), i = this.workspace.attachments.findIndex((e) => e.id === n.id);
		if (i < 0) throw Error("Dokument wurde nicht gefunden.");
		let a = this.workspace.attachments[i];
		if (a.applicationId !== n.applicationId) throw Error("Die Zuordnung einer Datei kann nicht frei geändert werden.");
		if (a.category !== n.category) {
			let t = this.getAttachmentPath(a), i = this.getAttachmentPath(n);
			await r(e.dirname(i), { recursive: !0 }), await s(t, i);
		}
		return this.workspace.attachments[i] = n, await this.persist(), this.getWorkspace();
	}
	async moveAttachment(e, t) {
		let n = this.workspace.attachments.find((t) => t.id === e);
		if (!n) throw Error("Dokument wurde nicht gefunden.");
		let r = this.workspace.attachments.filter((e) => e.applicationId === n.applicationId && e.category === n.category).sort((e, t) => e.order - t.order), i = r.findIndex((t) => t.id === e), a = i + t;
		if (i < 0 || a < 0 || a >= r.length) return this.getWorkspace();
		let o = r[a], s = n.order;
		return n.order = o.order, o.order = s, await this.persist(), this.getWorkspace();
	}
	async removeAttachment(e) {
		let t = this.workspace.attachments.find((t) => t.id === e);
		if (!t) throw Error("Dokument wurde nicht gefunden.");
		await c(this.getAttachmentPath(t), { force: !0 }), this.workspace.attachments = this.workspace.attachments.filter((t) => t.id !== e);
		let n = this.getApplication(t.applicationId);
		return n.attachmentIds = n.attachmentIds.filter((t) => t !== e), await this.persist(), this.getWorkspace();
	}
	getPackageAttachmentPaths(e) {
		let t = {
			Zeugnisse: 0,
			Zertifikate: 1
		};
		return this.workspace.attachments.filter((t) => t.applicationId === e && t.includedInPackage).sort((e, n) => t[e.category] - t[n.category] || e.order - n.order).map((e) => ({
			fileName: e.fileName,
			path: this.getAttachmentPath(e)
		}));
	}
	getProfileForApplication(e) {
		return this.workspace.profiles.find((t) => t.id === e.profileId || !e.profileId && t.isDefault);
	}
	getApplication(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		return t;
	}
	getTemplateDocumentContext(t) {
		let n = this.getApplication(t), r = this.getProfileForApplication(n), i = r ? `${r.firstName} ${r.lastName}`.trim() : "", a = [n.contact.firstName, n.contact.lastName].filter(Boolean).join(" "), o = n.contact.lastName ? n.contact.salutation === "Herr" ? `Sehr geehrter Herr ${n.contact.lastName},` : n.contact.salutation === "Frau" ? `Sehr geehrte Frau ${n.contact.lastName},` : `Guten Tag ${a},` : "Sehr geehrte Damen und Herren,", s = Cs(r?.knowledgeSection, r?.skills ?? []), c = Ss(s, !1), l = {
			VORNAME: r?.firstName ?? "",
			NACHNAME: r?.lastName ?? "",
			BERUFSBEZEICHNUNG: r?.title || n.job.title,
			FACHGEBIET_1: r?.skills[0] ?? "",
			FACHGEBIET_2: r?.skills[1] ?? "",
			FACHGEBIETE: (r?.skills ?? []).slice(0, 3).join(" | "),
			TELEFON: r?.phone ?? "",
			EMAIL: r?.email ?? "",
			WEBSITE: r?.portfolio || r?.github || "",
			GITHUB: r?.github ?? "",
			LINKEDIN: r?.linkedin ?? "",
			ORT: r?.city ?? "",
			GEBURTSDATUM: r?.birthDate ?? "",
			GEBURTSORT: r?.birthPlace ?? "",
			GEBURTSZEILE: r?.birthDate || r?.birthPlace ? `Geb. ${r?.birthDate ?? ""}${r?.birthDate && r?.birthPlace ? " in " : ""}${r?.birthPlace ?? ""}` : "",
			KONTAKT_ZEILE_1: oc([r?.phone, r?.email]),
			KONTAKT_ZEILE_2: oc([r?.portfolio || r?.github, r?.linkedin]),
			KONTAKT_ZEILE_3: oc([
				r?.city,
				r?.birthDate,
				r?.birthPlace
			]),
			KONTAKTE_TITEL: r?.phone || r?.email || r?.portfolio || r?.github || r?.linkedin || r?.city ? "KONTAKTE" : "",
			KONTAKTDATEN_TITEL: r?.phone || r?.email || r?.portfolio || r?.github || r?.linkedin || r?.city || r?.birthDate || r?.birthPlace ? "KONTAKTDATEN" : "",
			TELEFON_ZEILE: Zs("Telefon", r?.phone),
			EMAIL_ZEILE: Zs("E-Mail", r?.email),
			WEBSITE_ZEILE: Zs("Website", r?.portfolio || r?.github),
			LINKEDIN_ZEILE: Zs("LinkedIn", r?.linkedin),
			ORT_ZEILE: Zs("Ort", r?.city),
			HEADER_KONTAKT_1: r?.phone ?? "",
			HEADER_KONTAKT_2: r?.email ?? "",
			HEADER_KONTAKT_3: r?.linkedin ?? "",
			HEADER_KONTAKT_4: oc([r?.city, r?.country]),
			HEADER_KONTAKT_5: r?.birthDate || r?.birthPlace ? `Geb. ${r?.birthDate ?? ""}${r?.birthDate && r?.birthPlace ? " in " : ""}${r?.birthPlace ?? ""}` : "",
			HEADER_KONTAKT_6: r?.portfolio || r?.github || "",
			PROFILFOTO: r?.photoPath ?? "",
			ZUSAMMENFASSUNG_TITEL: n.documents.resumeProfile || r?.summary ? "ZUSAMMENFASSUNG" : "",
			ZUSAMMENFASSUNG: n.documents.resumeProfile || r?.summary || "",
			STAERKEN_TITEL: r?.skills.length ? "STÄRKEN" : "",
			STAERKEN_ATS: (r?.skills ?? []).slice(0, 3).join("\n"),
			ERFOLGE_TITEL: "",
			ERFOLGE_ATS: "",
			ERFOLG_HIGHLIGHT_1_TITEL: "",
			ERFOLG_HIGHLIGHT_1_BESCHREIBUNG: "",
			ERFOLG_HIGHLIGHT_2_TITEL: "",
			ERFOLG_HIGHLIGHT_2_BESCHREIBUNG: "",
			KENNTNISSE_TITEL: c ? "FÄHIGKEITEN" : "",
			KENNTNISSE: c,
			SPRACHEN_TITEL: r?.languages.length ? "SPRACHEN" : "",
			SPRACHEN_ATS: (r?.languages ?? []).join("\n"),
			BERUFSERFAHRUNG_TITEL: r?.experiences.length ? "BERUFSERFAHRUNG" : "",
			ERFAHRUNG_TITEL: r?.experiences.length ? "ERFAHRUNG" : "",
			AUSBILDUNG_TITEL: r?.education.length ? "AUSBILDUNG" : "",
			PROJEKTE_TITEL: "",
			PROJEKTE: "",
			WEITERBILDUNGEN_TITEL: "",
			WEITERBILDUNGEN: "",
			ZERTIFIKATE_TITEL: r?.certifications.length ? "ZERTIFIKATE" : "",
			ZERTIFIKATE: (r?.certifications ?? []).join("\n"),
			VEROEFFENTLICHUNGEN_TITEL: "",
			VEROEFFENTLICHUNGEN: "",
			EHRENAMT_TITEL: "",
			EHRENAMT: "",
			SOFTWARE_TITEL: "",
			SOFTWARE: "",
			ZUSATZANGABEN_TITEL: "",
			ZUSATZANGABEN: "",
			FUEHRERSCHEIN_TITEL: "",
			FUEHRERSCHEIN: "",
			INTERESSEN_TITEL: "",
			INTERESSEN: "",
			DESIGN_PRIMARY: n.accentColor,
			DESIGN_ACCENT: n.secondaryColor,
			DESIGN_SOFT_ACCENT: ec(n.accentColor, "#ffffff", .78),
			DESIGN_TITLE_BACKGROUND: ec(n.accentColor, "#ffffff", .62),
			DESIGN_FONT: $s(n.designSettings.fontId),
			DESIGN_MARGIN_VERTICAL_MM: String(Oo[n.designSettings.marginLevel].vertical),
			DESIGN_MARGIN_HORIZONTAL_MM: String(Oo[n.designSettings.marginLevel].horizontal),
			DEKORATION_AKTIV: n.designSettings.showBackgroundInPrint ? "true" : "false",
			ATS_MODUS: n.designSettings.columnLayout === "compact-ats" ? "true" : ""
		}, u = Math.min((r?.experiences.length ?? 0) - 1, 7);
		for (let e = 0; e < 8; e += 1) {
			let t = e + 1, n = r?.experiences[e];
			l[`POSITION_${t}`] = n?.role ?? "", l[`UNTERNEHMEN_${t}`] = n?.company ?? "", l[`STARTDATUM_${t}`] = n?.from ?? "", l[`DATUM_TRENNER_${t}`] = n?.from && n.to ? " – " : "", l[`ENDDATUM_${t}`] = n?.to ?? "", l[`ARBEITSORT_${t}`] = n?.city ?? "", l[`BESCHREIBUNG_${t}`] = "", l[`METADATA_TRENNER_${t}`] = (n?.from || n?.to) && n?.city ? "·" : "", l[`TECHNOLOGIEN_${t}`] = "", l[`ERFAHRUNG_TRENNER_${t}`] = n && e < u ? "​" : "";
			for (let e = 0; e < 5; e += 1) l[`ERFOLG_${t}_${e + 1}`] = n?.achievements[e] ?? "";
		}
		for (let e = 0; e < 3; e += 1) {
			let t = e + 1, n = r?.education[e];
			l[`ABSCHLUSS_${t}`] = n?.degree ?? "", l[`FACHRICHTUNG_${t}`] = "", l[`HOCHSCHULE_${t}`] = n?.institution ?? "", l[`AUSBILDUNG_START_${t}`] = n?.from ?? "", l[`AUSBILDUNG_DATUM_TRENNER_${t}`] = n?.from && n.to ? " – " : "", l[`AUSBILDUNG_ENDE_${t}`] = n?.to ?? "", l[`AUSBILDUNG_ORT_${t}`] = n?.city ?? "", l[`AUSBILDUNG_METADATA_TRENNER_${t}`] = (n?.from || n?.to) && n?.city ? "·" : "";
			let i = r?.skills[e] ?? "";
			l[`STAERKE_${t}_TITEL`] = i, l[`STAERKE_${t}_BESCHREIBUNG`] = "";
			let a = sc(r?.languages[e] ?? "");
			l[`SPRACHE_${t}`] = a.name, l[`SPRACHNIVEAU_${t}`] = a.level, l[`SPRACHE_${t}_PUNKTE`] = Qs(a.level);
		}
		s.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).slice(0, 6).forEach((e, t) => {
			let n = [...e.items.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => e.name), ...e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => e.items.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => e.name))];
			l[`KENNTNIS_KATEGORIE_${t + 1}`] = n.length ? e.title : "", l[`KENNTNIS_EINTRAEGE_${t + 1}`] = n.join(" · ");
		});
		let d = {
			BEWERBER_NAME: i,
			BEWERBER_VORNAME: r?.firstName ?? "",
			BEWERBER_NACHNAME: r?.lastName ?? "",
			BEWERBER_ADRESSE: r?.street ?? "",
			BEWERBER_PLZ: r?.postalCode ?? "",
			BEWERBER_ORT: r?.city ?? "",
			BEWERBER_TELEFON: r?.phone ?? "",
			BEWERBER_EMAIL: r?.email ?? "",
			FIRMA_NAME: n.company.name,
			FIRMA_ADRESSE: n.company.street,
			FIRMA_PLZ: n.company.postalCode,
			FIRMA_ORT: n.company.city,
			ANSPRECHPARTNER: a,
			STELLENBEZEICHNUNG: n.job.title,
			STELLENNUMMER: "",
			BEWERBUNGSDATUM: new Intl.DateTimeFormat("de-DE").format(/* @__PURE__ */ new Date()),
			BETREFF: n.documents.coverSubject || `Bewerbung als ${n.job.title}`,
			ANREDE: o,
			EINLEITUNG: n.documents.coverIntroduction,
			HAUPTTEXT: [
				n.documents.coverMotivation,
				n.documents.coverQualification,
				n.documents.coverCompanyFit
			].filter(Boolean).join("\n\n"),
			SCHLUSSTEXT: n.documents.coverClosing,
			GRUSSFORMEL: "Mit freundlichen Grüßen",
			UNTERSCHRIFT: i,
			KENNTNISSE: c,
			...l
		}, f = this.applicationPath(n);
		return {
			application: n,
			targetDirectories: {
				anschreiben: e.join(f, "Anschreiben"),
				deckblatt: e.join(f, "Deckblatt"),
				lebenslauf: e.join(f, "Lebenslauf")
			},
			requestedBaseName: n.company.name,
			data: d
		};
	}
	getExportHtml(e, t, n) {
		let r = n ? is.parse(n) : this.getApplication(e);
		if (r.id !== e) throw Error("Die Exportdaten gehören nicht zur ausgewählten Bewerbung.");
		return Ks(r, this.getProfileForApplication(r), t);
	}
	getExportDefaultName(e, t) {
		let n = this.getApplication(e);
		return `${rc(n.company.name)}_${rc(n.job.title)}_${t}.pdf`;
	}
	async writeBackup(e) {
		await u(e, JSON.stringify(us.parse(this.workspace), null, 2), "utf8");
	}
	async importBackup(t) {
		let r = JSON.parse(await a(t, "utf8")), i = us.parse(r), o = e.join(this.dataPath, "Backups", `vor-import-${ic()}.json`);
		await n(this.workspacePath, o);
		let s = this.workspace;
		try {
			this.workspace = i;
			let e = [];
			for (let t of this.workspace.attachments) try {
				await l(this.getAttachmentPath(t)), e.push(t);
			} catch {}
			this.workspace.attachments = e;
			let t = new Set(e.map((e) => e.id));
			return this.workspace.applications.forEach((e) => {
				e.attachmentIds = e.attachmentIds.filter((e) => t.has(e));
			}), await this.persist(), this.getWorkspace();
		} catch (e) {
			this.workspace = s;
			try {
				await this.persist();
			} catch {}
			throw e;
		}
	}
	async writeSettings(e) {
		await u(e, JSON.stringify(ls.parse(this.workspace.settings), null, 2), "utf8");
	}
	async importSettings(e) {
		let t = JSON.parse(await a(e, "utf8"));
		return this.workspace.settings = ls.parse(t), this.workspace.applications.forEach((e) => this.syncEvents(e)), await this.persist(), this.getWorkspace();
	}
	getTemplateIds() {
		return new Set(ps.map((e) => e.id));
	}
}, lc = async (e, t, n) => {
	try {
		let n = await b.load(t);
		(await e.copyPages(n, n.getPageIndices())).forEach((t) => e.addPage(t));
	} catch (e) {
		let t = e instanceof Error ? e.message : "Unbekannter Fehler";
		throw Error(`PDF „${n}“ konnte nicht verarbeitet werden: ${t}`);
	}
}, uc = async (e, t) => {
	let n = await b.create();
	await lc(n, e, "Bewerbungsunterlagen");
	for (let e of t) await lc(n, e.bytes, e.fileName);
	return n.save();
}, dc = /* @__PURE__ */ new Set([
	".docx",
	".dotx",
	".doc"
]), fc = {
	"muster-folder": "Musterordner",
	"existing-document": "Eigenes Dokument",
	"uploaded-word-template": "Eigene Word-Vorlage",
	"system-word-template": "System Word-Vorlage"
}, pc = 1e3, mc = {
	id: "word-muster-anschreiben",
	fileName: "Anschreiben_Muster.docx",
	name: "Word Muster",
	documentType: "anschreiben",
	format: "docx",
	source: "uploaded-word-template",
	sortOrder: 2,
	isSystemTemplate: !1,
	supportsPreview: !0,
	supportsPlaceholders: !0,
	editableInWord: !0,
	isProtected: !0,
	description: "Eigene Word-Vorlage für Anschreiben. Beim Verwenden wird immer eine neue, ausgefüllte Kopie erstellt.",
	tags: [
		"Word",
		"DOCX",
		"Anschreiben"
	]
}, hc = {
	id: "word-lebenslauf-elegant",
	fileName: "Elegant_Lebenslauf_Muster.docx",
	atsFileName: "Elegant_Lebenslauf_ATS.docx",
	previewFileName: "Elegant_Lebenslauf_Muster.preview.png",
	name: "Elegant",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 6,
	category: "elegant",
	layout: "two-column-right-sidebar",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	description: "Zweispaltige Word-Lebenslaufvorlage mit breiter Hauptspalte für Berufserfahrung und blauer Seitenleiste für persönliche Highlights.",
	tags: [
		"Elegant",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto"
	],
	cardHighlights: ["Breite Hauptspalte für Berufserfahrung", "Blaue Seitenleiste für persönliche Highlights"]
}, gc = {
	id: "word-lebenslauf-zeitgenoessisch",
	fileName: "Zeitgenoessisch_Lebenslauf_Muster.docx",
	atsFileName: "Zeitgenoessisch_Lebenslauf_ATS.docx",
	previewFileName: "Zeitgenoessisch_Lebenslauf_Muster.preview.png",
	name: "Zeitgenössisch",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 3,
	category: "contemporary",
	layout: "two-column-left-sidebar",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	description: "Grüne moderne Word-Lebenslaufvorlage. Saubere zweispaltige Struktur mit Foto, Stärken, Zusammenfassung und Erfahrung.",
	tags: [
		"Zeitgenössisch",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Grün"
	],
	cardHighlights: ["Grüne moderne Word-Lebenslaufvorlage", "Foto, Stärken, Zusammenfassung und Erfahrung"]
}, _c = {
	id: "word-lebenslauf-gepflegt",
	fileName: "Gepflegt_Lebenslauf_Muster.docx",
	atsFileName: "Gepflegt_Lebenslauf_ATS.docx",
	previewFileName: "Gepflegt_Lebenslauf_Muster.preview.png",
	name: "Gepflegt",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 7,
	category: "business",
	layout: "two-column-left-sidebar",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	description: "Raffinierte Business-Lebenslaufvorlage mit linker Farbfläche und klarer Informationshierarchie.",
	tags: [
		"Gepflegt",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Business",
		"Kundenorientiert"
	],
	cardHighlights: ["Linke Farbfläche für Profil und Kernkompetenzen", "Klare Business-Hierarchie für kundenorientierte Rollen"]
}, vc = {
	id: "word-lebenslauf-modern",
	fileName: "Modern_Lebenslauf_Muster.docx",
	atsFileName: "Modern_Lebenslauf_ATS.docx",
	previewFileName: "Modern_Lebenslauf_Muster.preview.png",
	name: "Modern",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 8,
	category: "creative-professional",
	layout: "two-column-equal",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	description: "Perfekte Lebenslauf-Vorlage mit kreativen Elementen, die Berufserfahrung und Qualifikationen übersichtlich zur Geltung bringt.",
	tags: [
		"Modern",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Türkis",
		"Kreativ",
		"Professionell"
	],
	cardHighlights: ["Türkise Wellenmuster für professionelle Ausstrahlung", "Zwei Spalten mit separaten Kontakt- und Erfahrungsbereichen"]
}, yc = {
	id: "word-lebenslauf-kreativ",
	fileName: "Kreativ_Lebenslauf_Muster.docx",
	atsFileName: "Kreativ_Lebenslauf_ATS.docx",
	previewFileName: "Kreativ_Lebenslauf_Muster.preview.png",
	name: "Kreativ",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 4,
	category: "creative",
	layout: "two-column-header-banner",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "compact-information",
	description: "Kompakte, kreative Word-Lebenslaufvorlage. Ideal, um viele Informationen übersichtlich auf einer Seite unterzubringen.",
	tags: [
		"Kreativ",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Zweispaltig",
		"Kompakt"
	],
	colorVariants: {
		gruen: "#39B774",
		schwarz: "#111111",
		dunkelblau: "#244766",
		tuerkis: "#159F9B",
		violett: "#7052B5",
		orange: "#D97706"
	},
	cardHighlights: ["Viele Informationen übersichtlich auf einer Seite", "Zweispaltig · Mit Foto · DOCX"]
}, bc = {
	id: "word-lebenslauf-kompakt",
	fileName: "Kompakt_Lebenslauf_Muster.docx",
	atsFileName: "Kompakt_Lebenslauf_ATS.docx",
	previewFileName: "Kompakt_Lebenslauf_Muster.preview.png",
	name: "Kompakt",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 5,
	category: "compact",
	layout: "two-column-compact",
	atsFriendly: !0,
	supportsPhoto: !1,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "single-page-high-density",
	description: "Einseitige Word-Lebenslaufvorlage mit kleineren Seitenrändern und hoher Informationsdichte.",
	tags: [
		"Kompakt",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Ohne Foto",
		"Zweispaltig",
		"Einseitig"
	],
	colorVariants: {
		dunkelblau: "#0A3485",
		schwarz: "#111111",
		petrol: "#145B63",
		violett: "#5B3F91",
		dunkelgruen: "#185D47"
	},
	cardHighlights: ["Einseitig · Hohe Informationsdichte", "Zweispaltig · Ohne Foto · ATS-freundlich · DOCX"]
}, xc = [
	"BEWERBER_NAME",
	"BEWERBER_VORNAME",
	"BEWERBER_NACHNAME",
	"BEWERBER_ADRESSE",
	"BEWERBER_PLZ",
	"BEWERBER_ORT",
	"BEWERBER_TELEFON",
	"BEWERBER_EMAIL",
	"FIRMA_NAME",
	"FIRMA_ADRESSE",
	"FIRMA_PLZ",
	"FIRMA_ORT",
	"ANSPRECHPARTNER",
	"STELLENBEZEICHNUNG",
	"STELLENNUMMER",
	"BEWERBUNGSDATUM",
	"BETREFF",
	"ANREDE",
	"EINLEITUNG",
	"HAUPTTEXT",
	"SCHLUSSTEXT",
	"GRUSSFORMEL",
	"UNTERSCHRIFT",
	"KENNTNISSE"
], Sc = {
	FIRMA_ADI: "FIRMA_NAME",
	FIRMA_ADRESI: "FIRMA_ADRESSE",
	POSTA_KODU: "FIRMA_PLZ",
	SEHIR: "FIRMA_ORT",
	TARIH: "BEWERBUNGSDATUM",
	STELLE: "STELLENBEZEICHNUNG",
	REFERENZNUMMER: "STELLENNUMMER",
	ANSCHREIBEN_METNI: "HAUPTTEXT",
	KAPANIS: "SCHLUSSTEXT"
}, Cc = /* @__PURE__ */ "VORNAME.NACHNAME.BERUFSBEZEICHNUNG.FACHGEBIET_1.FACHGEBIET_2.FACHGEBIETE.TELEFON.EMAIL.WEBSITE.LINKEDIN.ORT.GEBURTSDATUM.GEBURTSORT.GEBURTSZEILE.GITHUB.KONTAKTDATEN_TITEL.KONTAKT_ZEILE_1.KONTAKT_ZEILE_2.KONTAKT_ZEILE_3.KONTAKTE_TITEL.HEADER_KONTAKT_1.HEADER_KONTAKT_2.HEADER_KONTAKT_3.HEADER_KONTAKT_4.HEADER_KONTAKT_5.HEADER_KONTAKT_6.TELEFON_ZEILE.EMAIL_ZEILE.WEBSITE_ZEILE.LINKEDIN_ZEILE.ORT_ZEILE.PROFILFOTO.ZUSAMMENFASSUNG_TITEL.ZUSAMMENFASSUNG.STAERKEN_TITEL.STAERKEN_ATS.ERFOLGE_TITEL.ERFOLGE_ATS.ERFOLG_HIGHLIGHT_1_TITEL.ERFOLG_HIGHLIGHT_1_BESCHREIBUNG.ERFOLG_HIGHLIGHT_2_TITEL.ERFOLG_HIGHLIGHT_2_BESCHREIBUNG.KENNTNISSE_TITEL.SPRACHEN_TITEL.SPRACHEN_ATS.BERUFSERFAHRUNG_TITEL.ERFAHRUNG_TITEL.AUSBILDUNG_TITEL.PROJEKTE_TITEL.PROJEKTE.WEITERBILDUNGEN_TITEL.WEITERBILDUNGEN.ZERTIFIKATE_TITEL.ZERTIFIKATE.VEROEFFENTLICHUNGEN_TITEL.VEROEFFENTLICHUNGEN.EHRENAMT_TITEL.EHRENAMT.SOFTWARE_TITEL.SOFTWARE.ZUSATZANGABEN_TITEL.ZUSATZANGABEN.FUEHRERSCHEIN_TITEL.FUEHRERSCHEIN.INTERESSEN_TITEL.INTERESSEN.ATS_MODUS".split("."), wc = (e, t) => Array.from({ length: e }, (e, n) => t.map((e) => `${e}_${n + 1}`)).flat(), Tc = [
	...Cc,
	...wc(8, [
		"POSITION",
		"UNTERNEHMEN",
		"STARTDATUM",
		"DATUM_TRENNER",
		"ENDDATUM",
		"ARBEITSORT",
		"BESCHREIBUNG",
		"METADATA_TRENNER",
		"TECHNOLOGIEN",
		"ERFAHRUNG_TRENNER"
	]),
	...Array.from({ length: 8 }, (e, t) => Array.from({ length: 5 }, (e, n) => `ERFOLG_${t + 1}_${n + 1}`)).flat(),
	...wc(3, [
		"ABSCHLUSS",
		"FACHRICHTUNG",
		"HOCHSCHULE",
		"AUSBILDUNG_START",
		"AUSBILDUNG_DATUM_TRENNER",
		"AUSBILDUNG_ENDE",
		"AUSBILDUNG_ORT",
		"AUSBILDUNG_METADATA_TRENNER"
	]),
	...wc(3, ["SPRACHE", "SPRACHNIVEAU"]),
	...Array.from({ length: 3 }, (e, t) => `SPRACHE_${t + 1}_PUNKTE`),
	...Array.from({ length: 3 }, (e, t) => [`STAERKE_${t + 1}_TITEL`, `STAERKE_${t + 1}_BESCHREIBUNG`]).flat(),
	...wc(6, ["KENNTNIS_KATEGORIE", "KENNTNIS_EINTRAEGE"])
], Ec = [...xc, ...Tc], Dc = class extends Error {
	code;
	constructor(e, t) {
		super(e), this.code = t, this.name = "TemplateError";
	}
}, Oc = (e) => {
	if (e instanceof Dc) return e;
	let t = typeof e == "object" && e && "code" in e ? String(e.code) : "";
	return [
		"EBUSY",
		"EPERM",
		"EACCES"
	].includes(t) ? new Dc("Die Datei wird von einem anderen Programm verwendet.", "LOCKED") : [
		"ENOENT",
		"ENODATA",
		"EIO"
	].includes(t) ? new Dc("Die Vorlage ist derzeit nicht lokal verfügbar. Die Datei wird möglicherweise noch von OneDrive synchronisiert.", "NOT_LOCAL") : new Dc("Die Vorlage konnte nicht gelesen werden.", "CORRUPT");
}, kc = (e) => e.replaceAll("Ä", "Ae").replaceAll("Ö", "Oe").replaceAll("Ü", "Ue").replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue").replaceAll("ß", "ss").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/\s+/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Vorlage", Ac = (e = /* @__PURE__ */ new Date()) => {
	let t = (e) => String(e).padStart(2, "0");
	return [
		e.getFullYear(),
		t(e.getMonth() + 1),
		t(e.getDate()),
		"_",
		t(e.getHours()),
		t(e.getMinutes()),
		t(e.getSeconds())
	].join("");
}, jc = async (n, r, i) => {
	let a = kc(r), o = e.join(n, `${a}${i}`);
	try {
		await t(o);
	} catch {
		return o;
	}
	for (let r = 2; r < 1e4; r += 1) {
		let o = e.join(n, `${a}_Kopie_${r}${i}`);
		try {
			await t(o);
		} catch {
			return o;
		}
	}
	return e.join(n, `${a}_${Ac()}${i}`);
}, Mc = /* @__PURE__ */ k(((e) => {
	function t(e, t, n) {
		if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function") return n.find.call(e, t);
		for (var i = 0; i < e.length; i++) if (r(e, i)) {
			var a = e[i];
			if (t.call(void 0, a, i, e)) return a;
		}
	}
	function n(e, t) {
		return t === void 0 && (t = Object), t && typeof t.getOwnPropertyDescriptors == "function" && (e = t.create(null, t.getOwnPropertyDescriptors(e))), t && typeof t.freeze == "function" ? t.freeze(e) : e;
	}
	function r(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function i(e, t) {
		if (typeof e != "object" || !e) throw TypeError("target is not an object");
		for (var n in t) r(t, n) && (e[n] = t[n]);
		return e;
	}
	var a = n({
		allowfullscreen: !0,
		async: !0,
		autofocus: !0,
		autoplay: !0,
		checked: !0,
		controls: !0,
		default: !0,
		defer: !0,
		disabled: !0,
		formnovalidate: !0,
		hidden: !0,
		ismap: !0,
		itemscope: !0,
		loop: !0,
		multiple: !0,
		muted: !0,
		nomodule: !0,
		novalidate: !0,
		open: !0,
		playsinline: !0,
		readonly: !0,
		required: !0,
		reversed: !0,
		selected: !0
	});
	function o(e) {
		return r(a, e.toLowerCase());
	}
	var s = n({
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function c(e) {
		return r(s, e.toLowerCase());
	}
	var l = n({
		script: !1,
		style: !1,
		textarea: !0,
		title: !0
	});
	function u(e) {
		var t = e.toLowerCase();
		return r(l, t) && !l[t];
	}
	function d(e) {
		var t = e.toLowerCase();
		return r(l, t) && l[t];
	}
	function f(e) {
		return e === m.HTML;
	}
	function p(e) {
		return f(e) || e === m.XML_XHTML_APPLICATION;
	}
	var m = n({
		HTML: "text/html",
		XML_APPLICATION: "application/xml",
		XML_TEXT: "text/xml",
		XML_XHTML_APPLICATION: "application/xhtml+xml",
		XML_SVG_IMAGE: "image/svg+xml"
	}), h = Object.keys(m).map(function(e) {
		return m[e];
	});
	function g(e) {
		return h.indexOf(e) > -1;
	}
	var _ = n({
		HTML: "http://www.w3.org/1999/xhtml",
		SVG: "http://www.w3.org/2000/svg",
		XML: "http://www.w3.org/XML/1998/namespace",
		XMLNS: "http://www.w3.org/2000/xmlns/"
	});
	e.assign = i, e.find = t, e.freeze = n, e.HTML_BOOLEAN_ATTRIBUTES = a, e.HTML_RAW_TEXT_ELEMENTS = l, e.HTML_VOID_ELEMENTS = s, e.hasDefaultHTMLNamespace = p, e.hasOwn = r, e.isHTMLBooleanAttribute = o, e.isHTMLRawTextElement = u, e.isHTMLEscapableRawTextElement = d, e.isHTMLMimeType = f, e.isHTMLVoidElement = c, e.isValidMimeType = g, e.MIME_TYPE = m, e.NAMESPACE = _;
})), Nc = /* @__PURE__ */ k(((e) => {
	var t = Mc();
	function n(e, t) {
		e.prototype = Object.create(Error.prototype, {
			constructor: { value: e },
			name: {
				value: e.name,
				enumerable: !0,
				writable: t
			}
		});
	}
	var r = t.freeze({
		Error: "Error",
		IndexSizeError: "IndexSizeError",
		DomstringSizeError: "DomstringSizeError",
		HierarchyRequestError: "HierarchyRequestError",
		WrongDocumentError: "WrongDocumentError",
		InvalidCharacterError: "InvalidCharacterError",
		NoDataAllowedError: "NoDataAllowedError",
		NoModificationAllowedError: "NoModificationAllowedError",
		NotFoundError: "NotFoundError",
		NotSupportedError: "NotSupportedError",
		InUseAttributeError: "InUseAttributeError",
		InvalidStateError: "InvalidStateError",
		SyntaxError: "SyntaxError",
		InvalidModificationError: "InvalidModificationError",
		NamespaceError: "NamespaceError",
		InvalidAccessError: "InvalidAccessError",
		ValidationError: "ValidationError",
		TypeMismatchError: "TypeMismatchError",
		SecurityError: "SecurityError",
		NetworkError: "NetworkError",
		AbortError: "AbortError",
		URLMismatchError: "URLMismatchError",
		QuotaExceededError: "QuotaExceededError",
		TimeoutError: "TimeoutError",
		InvalidNodeTypeError: "InvalidNodeTypeError",
		DataCloneError: "DataCloneError",
		EncodingError: "EncodingError",
		NotReadableError: "NotReadableError",
		UnknownError: "UnknownError",
		ConstraintError: "ConstraintError",
		DataError: "DataError",
		TransactionInactiveError: "TransactionInactiveError",
		ReadOnlyError: "ReadOnlyError",
		VersionError: "VersionError",
		OperationError: "OperationError",
		NotAllowedError: "NotAllowedError",
		OptOutError: "OptOutError"
	}), i = Object.keys(r);
	function a(e) {
		return typeof e == "number" && e >= 1 && e <= 25;
	}
	function o(e) {
		return typeof e == "string" && e.substring(e.length - r.Error.length) === r.Error;
	}
	function s(e, t) {
		a(e) ? (this.name = i[e], this.message = t || "") : (this.message = e, this.name = o(t) ? t : r.Error), Error.captureStackTrace && Error.captureStackTrace(this, s);
	}
	n(s, !0), Object.defineProperties(s.prototype, { code: {
		enumerable: !0,
		get: function() {
			var e = i.indexOf(this.name);
			return a(e) ? e : 0;
		}
	} });
	for (var c = {
		INDEX_SIZE_ERR: 1,
		DOMSTRING_SIZE_ERR: 2,
		HIERARCHY_REQUEST_ERR: 3,
		WRONG_DOCUMENT_ERR: 4,
		INVALID_CHARACTER_ERR: 5,
		NO_DATA_ALLOWED_ERR: 6,
		NO_MODIFICATION_ALLOWED_ERR: 7,
		NOT_FOUND_ERR: 8,
		NOT_SUPPORTED_ERR: 9,
		INUSE_ATTRIBUTE_ERR: 10,
		INVALID_STATE_ERR: 11,
		SYNTAX_ERR: 12,
		INVALID_MODIFICATION_ERR: 13,
		NAMESPACE_ERR: 14,
		INVALID_ACCESS_ERR: 15,
		VALIDATION_ERR: 16,
		TYPE_MISMATCH_ERR: 17,
		SECURITY_ERR: 18,
		NETWORK_ERR: 19,
		ABORT_ERR: 20,
		URL_MISMATCH_ERR: 21,
		QUOTA_EXCEEDED_ERR: 22,
		TIMEOUT_ERR: 23,
		INVALID_NODE_TYPE_ERR: 24,
		DATA_CLONE_ERR: 25
	}, l = Object.entries(c), u = 0; u < l.length; u++) {
		var d = l[u][0];
		s[d] = l[u][1];
	}
	function f(e, t) {
		this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, f);
	}
	n(f), e.DOMException = s, e.DOMExceptionName = r, e.ExceptionCode = c, e.ParseError = f;
})), Pc = /* @__PURE__ */ k(((e) => {
	function t(e) {
		try {
			typeof e != "function" && (e = RegExp);
			var t = new e("𝌆", "u").exec("𝌆");
			return !!t && t[0].length === 2;
		} catch {}
		return !1;
	}
	var n = t();
	function r(e) {
		if (e.source[0] !== "[") throw Error(e + " can not be used with chars");
		return e.source.slice(1, e.source.lastIndexOf("]"));
	}
	function i(e, t) {
		if (e.source[0] !== "[") throw Error("/" + e.source + "/ can not be used with chars_without");
		if (!t || typeof t != "string") throw Error(JSON.stringify(t) + " is not a valid search");
		if (e.source.indexOf(t) === -1) throw Error("\"" + t + "\" is not is /" + e.source + "/");
		if (t === "-" && e.source.indexOf(t) !== 1) throw Error("\"" + t + "\" is not at the first postion of /" + e.source + "/");
		return new RegExp(e.source.replace(t, ""), n ? "u" : "");
	}
	function a(e) {
		var t = this;
		return new RegExp(Array.prototype.slice.call(arguments).map(function(e) {
			var n = typeof e == "string";
			if (n && t === void 0 && e === "|") throw Error("use regg instead of reg to wrap expressions with `|`!");
			return n ? e : e.source;
		}).join(""), n ? "mu" : "m");
	}
	function o(e) {
		if (arguments.length === 0) throw Error("no parameters provided");
		return a.apply(o, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
	}
	var s = "�", c = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
	n && (c = a("[", r(c), "\\u{10000}-\\u{10FFFF}", "]"));
	var l = RegExp("[^" + r(c) + "]", n ? "u" : ""), u = /[\x20\x09\x0D\x0A]/, d = r(u), f = a(u, "+"), p = a(u, "*"), m = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
	n && (m = a("[", r(m), "\\u{10000}-\\u{10FFFF}", "]"));
	var h = a("[", r(m), r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), g = a(m, h, "*"), _ = a(h, "+"), v = o(a("&", g, ";"), "|", o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)), y = a("%", g, ";"), b = o(a("\"", o(/[^%&"]/, "|", y, "|", v), "*", "\""), "|", a("'", o(/[^%&']/, "|", y, "|", v), "*", "'")), x = o("\"", o(/[^<&"]/, "|", v), "*", "\"", "|", "'", o(/[^<&']/, "|", v), "*", "'"), S = a(i(m, ":"), i(h, ":"), "*"), C = a(S, o(":", S), "?"), w = a("^", C, "$"), T = a("(", C, ")"), E = o(/"[^"]*"|'[^']*'/), D = a(/^<\?/, "(", g, ")", o(f, "(", c, "*?)"), "?", /\?>/), O = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, k = o("\"", O, "*\"", "|", "'", i(O, "'"), "*'"), A = "<!--", j = "-->", ee = a(A, o(i(c, "-"), "|", a("-", i(c, "-"))), "*", j), M = "#PCDATA", N = o("EMPTY", "|", "ANY", "|", o(a(/\(/, p, M, o(p, /\|/, p, C), "*", p, /\)\*/), "|", a(/\(/, p, M, p, /\)/)), "|", a(/\([^>]+\)/, /[?*+]?/)), P = a("<!ELEMENT", f, o(C, "|", y), f, o(N, "|", y), p, ">"), F = a("<!ATTLIST", f, g, o(f, g, f, o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", o(a("NOTATION", f, /\(/, p, g, o(p, /\|/, p, g), "*", p, /\)/), "|", a(/\(/, p, _, o(p, /\|/, p, _), "*", p, /\)/))), f, o(/#REQUIRED|#IMPLIED/, "|", o(o("#FIXED", f), "?", x))), "*", p, ">"), I = "about:legacy-compat", L = o("\"" + I + "\"", "|", "'" + I + "'"), R = "SYSTEM", z = "PUBLIC", B = o(o(R, f, E), "|", o(z, f, k, f, E)), V = a("^", o(o(R, f, "(?<SystemLiteralOnly>", E, ")"), "|", o(z, f, "(?<PubidLiteral>", k, ")", f, "(?<SystemLiteral>", E, ")"))), H = a("^", k, "$"), te = a("^", E, "$"), U = o(b, "|", o(B, o(f, "NDATA", f, g), "?")), ne = "<!ENTITY", re = o(a(ne, f, g, f, U, p, ">"), "|", a(ne, f, "%", f, g, f, o(b, "|", B), p, ">")), ie = a("<!NOTATION", f, g, f, o(B, "|", a(z, f, k)), p, ">"), W = a(p, "=", p), ae = /1[.]\d+/, oe = a(f, "version", W, o("'", ae, "'", "|", "\"", ae, "\"")), G = /[A-Za-z][-A-Za-z0-9._]*/, se = a(/^<\?xml/, oe, o(f, "encoding", W, o("\"", G, "\"", "|", "'", G, "'")), "?", o(f, "standalone", W, o("'", o("yes", "|", "no"), "'", "|", "\"", o("yes", "|", "no"), "\"")), "?", p, /\?>/), ce = "<!DOCTYPE", le = "<![CDATA[", ue = "]]>", K = a(/<!\[CDATA\[/, a(c, "*?", /\]\]>/));
	e.chars = r, e.chars_without = i, e.detectUnicodeSupport = t, e.reg = a, e.regg = o, e.ABOUT_LEGACY_COMPAT = I, e.ABOUT_LEGACY_COMPAT_SystemLiteral = L, e.AttlistDecl = F, e.CDATA_START = le, e.CDATA_END = ue, e.CDSect = K, e.Char = c, e.Comment = ee, e.COMMENT_START = A, e.COMMENT_END = j, e.DOCTYPE_DECL_START = ce, e.elementdecl = P, e.EntityDecl = re, e.EntityValue = b, e.ExternalID = B, e.ExternalID_match = V, e.Name = g, e.NotationDecl = ie, e.Reference = v, e.PEReference = y, e.PI = D, e.PUBLIC = z, e.PubidLiteral = k, e.PubidLiteral_match = H, e.QName = C, e.QName_exact = w, e.QName_group = T, e.S = f, e.SChar_s = d, e.S_OPT = p, e.SYSTEM = R, e.SystemLiteral = E, e.SystemLiteral_match = te, e.InvalidChar = l, e.UNICODE_REPLACEMENT_CHARACTER = s, e.UNICODE_SUPPORT = n, e.XMLDecl = se;
})), Fc = /* @__PURE__ */ k(((e) => {
	var t = Mc(), n = t.find, r = t.hasDefaultHTMLNamespace, i = t.hasOwn, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.isHTMLVoidElement, c = t.MIME_TYPE, l = t.NAMESPACE, u = Symbol(), d = Nc(), f = d.DOMException, p = d.DOMExceptionName, m = Pc();
	function h(e) {
		if (e !== u) throw TypeError("Illegal constructor");
	}
	function g(e) {
		return e !== "";
	}
	function _(e) {
		return e ? e.split(/[\t\n\f\r ]+/).filter(g) : [];
	}
	function v(e, t) {
		return i(e, t) || (e[t] = !0), e;
	}
	function y(e) {
		if (!e) return [];
		var t = _(e);
		return Object.keys(t.reduce(v, {}));
	}
	function b(e) {
		return function(t) {
			return e && e.indexOf(t) !== -1;
		};
	}
	function x(e) {
		if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in qualified name \"" + e + "\"");
	}
	function S(e, n) {
		x(n), e ||= null;
		var r = null, i = n;
		if (n.indexOf(":") >= 0) {
			var a = n.split(":");
			r = a[0], i = a[1];
		}
		if (r !== null && e === null) throw new f(f.NAMESPACE_ERR, "prefix is non-null and namespace is null");
		if (r === "xml" && e !== t.NAMESPACE.XML) throw new f(f.NAMESPACE_ERR, "prefix is \"xml\" and namespace is not the XML namespace");
		if ((r === "xmlns" || n === "xmlns") && e !== t.NAMESPACE.XMLNS) throw new f(f.NAMESPACE_ERR, "either qualifiedName or prefix is \"xmlns\" and namespace is not the XMLNS namespace");
		if (e === t.NAMESPACE.XMLNS && r !== "xmlns" && n !== "xmlns") throw new f(f.NAMESPACE_ERR, "namespace is the XMLNS namespace and neither qualifiedName nor prefix is \"xmlns\"");
		return [
			e,
			r,
			i
		];
	}
	function C(e, t) {
		for (var n in e) i(e, n) && (t[n] = e[n]);
	}
	function w(e, t) {
		var n = e.prototype;
		if (!(n instanceof t)) {
			function r() {}
			r.prototype = t.prototype, r = new r(), C(n, r), e.prototype = n = r;
		}
		n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
	}
	var T = {}, E = T.ELEMENT_NODE = 1, D = T.ATTRIBUTE_NODE = 2, O = T.TEXT_NODE = 3, k = T.CDATA_SECTION_NODE = 4, A = T.ENTITY_REFERENCE_NODE = 5, j = T.ENTITY_NODE = 6, ee = T.PROCESSING_INSTRUCTION_NODE = 7, M = T.COMMENT_NODE = 8, N = T.DOCUMENT_NODE = 9, P = T.DOCUMENT_TYPE_NODE = 10, F = T.DOCUMENT_FRAGMENT_NODE = 11, I = T.NOTATION_NODE = 12, L = t.freeze({
		DOCUMENT_POSITION_DISCONNECTED: 1,
		DOCUMENT_POSITION_PRECEDING: 2,
		DOCUMENT_POSITION_FOLLOWING: 4,
		DOCUMENT_POSITION_CONTAINS: 8,
		DOCUMENT_POSITION_CONTAINED_BY: 16,
		DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
	});
	function R(e, t) {
		if (t.length < e.length) return R(t, e);
		var n = null;
		for (var r in e) {
			if (e[r] !== t[r]) return n;
			n = e[r];
		}
		return n;
	}
	function z(e) {
		return e.guid ||= Math.random(), e.guid;
	}
	function B() {}
	B.prototype = {
		length: 0,
		item: function(e) {
			return e >= 0 && e < this.length ? this[e] : null;
		},
		toString: function(e) {
			for (var t = typeof e == "function" ? {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: e
			} : e ? {
				requireWellFormed: !!e.requireWellFormed,
				splitCDATASections: e.splitCDATASections !== !1,
				nodeFilter: e.nodeFilter || null
			} : {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: null
			}, n = [], r = 0; r < this.length; r++) Ie(this[r], n, null, t);
			return n.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	}, B.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function V(e, t) {
		this._node = e, this._refresh = t, H(this);
	}
	function H(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (ze(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) i(e, r) && delete e[r];
			C(n, e), e._inc = t;
		}
	}
	V.prototype.item = function(e) {
		return H(this), this[e] || null;
	}, w(V, B);
	function te() {}
	function U(e, t) {
		for (var n = 0; n < e.length;) {
			if (e[n] === t) return n;
			n++;
		}
	}
	function ne(e, t, n, r) {
		if (r ? t[U(t, r)] = n : (t[t.length] = n, t.length++), e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && le(i, e, r), ce(i, e, n));
		}
	}
	function re(e, t, n) {
		var r = U(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r <= i;) t[r] = t[++r];
			if (t.length = i, e) {
				var a = e.ownerDocument;
				a && le(a, e, n), n.ownerElement = null;
			}
		}
	}
	te.prototype = {
		length: 0,
		item: B.prototype.item,
		getNamedItem: function(e) {
			this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			for (var t = 0; t < this.length;) {
				var n = this[t];
				if (n.nodeName === e) return n;
				t++;
			}
			return null;
		},
		setNamedItem: function(e) {
			var t = e.ownerElement;
			if (t && t !== this._ownerElement) throw new f(f.INUSE_ATTRIBUTE_ERR);
			var n = this.getNamedItemNS(e.namespaceURI, e.localName);
			return n === e ? e : (ne(this._ownerElement, this, e, n), n);
		},
		setNamedItemNS: function(e) {
			return this.setNamedItem(e);
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			if (!t) throw new f(f.NOT_FOUND_ERR, e);
			return re(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			if (!n) throw new f(f.NOT_FOUND_ERR, e ? e + " : " + t : t);
			return re(this._ownerElement, this, n), n;
		},
		getNamedItemNS: function(e, t) {
			e ||= null;
			for (var n = 0; n < this.length;) {
				var r = this[n];
				if (r.localName === t && r.namespaceURI === e) return r;
				n++;
			}
			return null;
		}
	}, te.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function ie() {}
	ie.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = c.XML_APPLICATION;
			e === l.HTML ? r = c.XML_XHTML_APPLICATION : e === l.SVG && (r = c.XML_SVG_IMAGE);
			var i = new se(u, { contentType: r });
			if (i.implementation = this, i.childNodes = new B(), i.doctype = n || null, n && i.appendChild(n), t) {
				var a = i.createElementNS(e, t);
				i.appendChild(a);
			}
			return i;
		},
		createDocumentType: function(e, t, n, r) {
			x(e);
			var i = new De(u);
			return i.name = e, i.nodeName = e, i.publicId = t || "", i.systemId = n || "", i.internalSubset = r || "", i.childNodes = new B(), i;
		},
		createHTMLDocument: function(e) {
			var t = new se(u, { contentType: c.HTML });
			if (t.implementation = this, t.childNodes = new B(), e !== !1) {
				t.doctype = this.createDocumentType("html"), t.doctype.ownerDocument = t, t.appendChild(t.doctype);
				var n = t.createElement("html");
				t.appendChild(n);
				var r = t.createElement("head");
				if (n.appendChild(r), typeof e == "string") {
					var i = t.createElement("title");
					i.appendChild(t.createTextNode(e)), r.appendChild(i);
				}
				n.appendChild(t.createElement("body"));
			}
			return t;
		}
	};
	function W(e) {
		h(e);
	}
	W.prototype = {
		firstChild: null,
		lastChild: null,
		previousSibling: null,
		nextSibling: null,
		parentNode: null,
		get parentElement() {
			return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
		},
		childNodes: null,
		ownerDocument: null,
		nodeValue: null,
		namespaceURI: null,
		prefix: null,
		localName: null,
		baseURI: "about:blank",
		get isConnected() {
			var e = this.getRootNode();
			return e && e.nodeType === e.DOCUMENT_NODE;
		},
		contains: function(e) {
			if (!e) return !1;
			var t = e;
			do {
				if (this === t) return !0;
				t = t.parentNode;
			} while (t);
			return !1;
		},
		getRootNode: function(e) {
			var t = this;
			do {
				if (!t.parentNode) return t;
				t = t.parentNode;
			} while (t);
		},
		isEqualNode: function(e) {
			if (!e) return !1;
			for (var t = [{
				node: this,
				other: e
			}]; t.length > 0;) {
				var n = t.pop(), r = n.node, i = n.other;
				if (r.nodeType !== i.nodeType) return !1;
				switch (r.nodeType) {
					case r.DOCUMENT_TYPE_NODE:
						if (r.name !== i.name || r.publicId !== i.publicId || r.systemId !== i.systemId) return !1;
						break;
					case r.ELEMENT_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.prefix !== i.prefix || r.localName !== i.localName || r.attributes.length !== i.attributes.length) return !1;
						for (var a = 0; a < r.attributes.length; a++) {
							var o = r.attributes.item(a), s = i.getAttributeNodeNS(o.namespaceURI, o.localName);
							if (!s) return !1;
							t.push({
								node: o,
								other: s
							});
						}
						break;
					case r.ATTRIBUTE_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.localName !== i.localName || r.value !== i.value) return !1;
						break;
					case r.PROCESSING_INSTRUCTION_NODE:
						if (r.target !== i.target || r.data !== i.data) return !1;
						break;
					case r.TEXT_NODE:
					case r.CDATA_SECTION_NODE:
					case r.COMMENT_NODE:
						if (r.data !== i.data) return !1;
						break;
				}
				if (r.childNodes.length !== i.childNodes.length) return !1;
				for (var a = r.childNodes.length - 1; a >= 0; a--) t.push({
					node: r.childNodes[a],
					other: i.childNodes[a]
				});
			}
			return !0;
		},
		isSameNode: function(e) {
			return this === e;
		},
		insertBefore: function(e, t) {
			return be(this, e, t);
		},
		replaceChild: function(e, t) {
			be(this, e, t, ye), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return K(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return Re(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			G(this, null, { enter: function(e) {
				for (var t = e.firstChild; t;) {
					var n = t.nextSibling;
					n !== null && n.nodeType === O && t.nodeType === O ? (e.removeChild(n), t.appendData(n.data)) : t = n;
				}
				return !0;
			} });
		},
		isSupported: function(e, t) {
			return this.ownerDocument.implementation.hasFeature(e, t);
		},
		lookupPrefix: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n) {
					for (var r in n) if (i(n, r) && n[r] === e) return r;
				}
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		lookupNamespaceURI: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n && i(n, e)) return n[e];
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		isDefaultNamespace: function(e) {
			return this.lookupPrefix(e) == null;
		},
		compareDocumentPosition: function(e) {
			if (this === e) return 0;
			var t = e, n = this, r = null, i = null;
			if (t instanceof Se && (r = t, t = r.ownerElement), n instanceof Se && (i = n, n = i.ownerElement, r && t && n === t)) for (var a = 0, o; o = n.attributes[a]; a++) {
				if (o === r) return L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + L.DOCUMENT_POSITION_PRECEDING;
				if (o === i) return L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + L.DOCUMENT_POSITION_FOLLOWING;
			}
			if (!t || !n || n.ownerDocument !== t.ownerDocument) return L.DOCUMENT_POSITION_DISCONNECTED + L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (z(n.ownerDocument) > z(t.ownerDocument) ? L.DOCUMENT_POSITION_FOLLOWING : L.DOCUMENT_POSITION_PRECEDING);
			if (i && t === n) return L.DOCUMENT_POSITION_CONTAINS + L.DOCUMENT_POSITION_PRECEDING;
			if (r && t === n) return L.DOCUMENT_POSITION_CONTAINED_BY + L.DOCUMENT_POSITION_FOLLOWING;
			for (var s = [], c = t.parentNode; c;) {
				if (!i && c === n) return L.DOCUMENT_POSITION_CONTAINED_BY + L.DOCUMENT_POSITION_FOLLOWING;
				s.push(c), c = c.parentNode;
			}
			s.reverse();
			for (var l = [], u = n.parentNode; u;) {
				if (!r && u === t) return L.DOCUMENT_POSITION_CONTAINS + L.DOCUMENT_POSITION_PRECEDING;
				l.push(u), u = u.parentNode;
			}
			l.reverse();
			var d = R(s, l);
			for (var f in d.childNodes) {
				var p = d.childNodes[f];
				if (p === n) return L.DOCUMENT_POSITION_FOLLOWING;
				if (p === t) return L.DOCUMENT_POSITION_PRECEDING;
				if (l.indexOf(p) >= 0) return L.DOCUMENT_POSITION_FOLLOWING;
				if (s.indexOf(p) >= 0) return L.DOCUMENT_POSITION_PRECEDING;
			}
			return 0;
		}
	};
	function ae(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	C(T, W), C(T, W.prototype), C(L, W), C(L, W.prototype);
	function oe(e, t) {
		G(e, null, { enter: function(e) {
			return !t(e) || G.STOP;
		} });
	}
	function G(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: G.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === G.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === G.STOP) return G.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: G.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: G.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	G.STOP = Symbol("walkDOM.STOP"), G.ENTER = 0, G.EXIT = 1;
	function se(e, t) {
		h(e);
		var n = t || {};
		this.ownerDocument = this, this.contentType = n.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
	}
	function ce(e, t, n) {
		e && e._inc++, n.namespaceURI === l.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function le(e, t, n, r) {
		e && e._inc++, n.namespaceURI === l.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function ue(e, t, n) {
		if (e && e._inc) {
			e._inc++;
			var r = t.childNodes;
			if (n && !n.nextSibling) r[r.length++] = n;
			else {
				for (var i = t.firstChild, a = 0; i;) r[a++] = i, i = i.nextSibling;
				r.length = a, delete r[r.length];
			}
		}
	}
	function K(e, t) {
		if (e !== t.parentNode) throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, ue(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
	}
	function q(e) {
		return e && (e.nodeType === W.DOCUMENT_NODE || e.nodeType === W.DOCUMENT_FRAGMENT_NODE || e.nodeType === W.ELEMENT_NODE);
	}
	function de(e) {
		return e && (e.nodeType === W.CDATA_SECTION_NODE || e.nodeType === W.COMMENT_NODE || e.nodeType === W.DOCUMENT_FRAGMENT_NODE || e.nodeType === W.DOCUMENT_TYPE_NODE || e.nodeType === W.ELEMENT_NODE || e.nodeType === W.PROCESSING_INSTRUCTION_NODE || e.nodeType === W.TEXT_NODE);
	}
	function fe(e) {
		return e && e.nodeType === W.DOCUMENT_TYPE_NODE;
	}
	function pe(e) {
		return e && e.nodeType === W.ELEMENT_NODE;
	}
	function me(e) {
		return e && e.nodeType === W.TEXT_NODE;
	}
	function he(e, t) {
		var r = e.childNodes || [];
		if (n(r, pe) || fe(t)) return !1;
		var i = n(r, fe);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function ge(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return pe(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, fe);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function _e(e, t, n) {
		if (!q(e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new f(f.NOT_FOUND_ERR, "child not in parent");
		if (!de(t) || fe(t) && e.nodeType !== W.DOCUMENT_NODE) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function ve(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === W.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(pe);
			if (o.length > 1 || n(a, me)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !he(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (pe(t) && !he(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (fe(t)) {
			if (n(i, fe)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, pe);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			if (!r && s) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
		}
	}
	function ye(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === W.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(pe);
			if (o.length > 1 || n(a, me)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !ge(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (pe(t) && !ge(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (fe(t)) {
			function e(e) {
				return fe(e) && e !== r;
			}
			if (n(i, e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, pe);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
		}
	}
	function be(e, t, n, r) {
		_e(e, t, n), e.nodeType === W.DOCUMENT_NODE && (r || ve)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === F) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do
			a.parentNode = e;
		while (a !== o && (a = a.nextSibling));
		return ue(e.ownerDocument || e, e, t), t.nodeType == F && (t.firstChild = t.lastChild = null), t;
	}
	se.prototype = {
		implementation: null,
		nodeName: "#document",
		nodeType: N,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType === F) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return be(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === E && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			var t = K(this, e);
			return t === this.documentElement && (this.documentElement = null), t;
		},
		replaceChild: function(e, t) {
			be(this, e, t, ye), e.ownerDocument = this, t && this.removeChild(t), pe(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return Le(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return oe(this.documentElement, function(n) {
				if (n.nodeType == E && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		createElement: function(e) {
			var t = new xe(u);
			t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = l.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new B();
			var n = t.attributes = new te();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new Ae(u);
			return e.ownerDocument = this, e.childNodes = new B(), e;
		},
		createTextNode: function(e) {
			var t = new we(u);
			return t.ownerDocument = this, t.childNodes = new B(), t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new Te(u);
			return t.ownerDocument = this, t.childNodes = new B(), t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new f(f.INVALID_CHARACTER_ERR, "data contains \"]]>\"");
			var t = new Ee(u);
			return t.ownerDocument = this, t.childNodes = new B(), t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new je(u);
			return n.ownerDocument = this, n.childNodes = new B(), n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in name \"" + e + "\"");
			return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
		},
		_createAttribute: function(e) {
			var t = new Se(u);
			return t.ownerDocument = this, t.childNodes = new B(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			if (!m.Name.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "not a valid xml name \"" + e + "\"");
			if (this.type === "html") throw new f("document is an html document", p.NotSupportedError);
			var t = new ke(u);
			return t.ownerDocument = this, t.childNodes = new B(), t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = S(e, t), r = new xe(u), i = r.attributes = new te();
			return r.childNodes = new B(), r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], i._ownerElement = r, r;
		},
		createAttributeNS: function(e, t) {
			var n = S(e, t), r = new Se(u);
			return r.ownerDocument = this, r.childNodes = new B(), r.nodeName = t, r.name = t, r.specified = !0, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], r;
		}
	}, w(se, W);
	function xe(e) {
		h(e), this._nsMap = Object.create(null);
	}
	xe.prototype = {
		nodeType: E,
		attributes: null,
		getQualifiedName: function() {
			return this.prefix ? this.prefix + ":" + this.localName : this.localName;
		},
		_isInHTMLDocumentAndNamespace: function() {
			return this.ownerDocument.type === "html" && this.namespaceURI === l.HTML;
		},
		hasAttributes: function() {
			return !!(this.attributes && this.attributes.length);
		},
		hasAttribute: function(e) {
			return !!this.getAttributeNode(e);
		},
		getAttribute: function(e) {
			var t = this.getAttributeNode(e);
			return t ? t.value : null;
		},
		getAttributeNode: function(e) {
			return this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase()), this.attributes.getNamedItem(e);
		},
		setAttribute: function(e, t) {
			this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			var n = this.getAttributeNode(e);
			n ? n.value = n.nodeValue = "" + t : (n = this.ownerDocument._createAttribute(e), n.value = n.nodeValue = "" + t, this.setAttributeNode(n));
		},
		removeAttribute: function(e) {
			var t = this.getAttributeNode(e);
			t && this.removeAttributeNode(t);
		},
		setAttributeNode: function(e) {
			return this.attributes.setNamedItem(e);
		},
		setAttributeNodeNS: function(e) {
			return this.attributes.setNamedItemNS(e);
		},
		removeAttributeNode: function(e) {
			return this.attributes.removeNamedItem(e.nodeName);
		},
		removeAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			n && this.removeAttributeNode(n);
		},
		hasAttributeNS: function(e, t) {
			return this.getAttributeNodeNS(e, t) != null;
		},
		getAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			return n ? n.value : null;
		},
		setAttributeNS: function(e, t, n) {
			var r = S(e, t)[2], i = this.getAttributeNodeNS(e, r);
			i ? i.value = i.nodeValue = "" + n : (i = this.ownerDocument.createAttributeNS(e, t), i.value = i.nodeValue = "" + n, this.setAttributeNode(i));
		},
		getAttributeNodeNS: function(e, t) {
			return this.attributes.getNamedItemNS(e, t);
		},
		getElementsByClassName: function(e) {
			var t = y(e);
			return new V(this, function(n) {
				var r = [];
				return t.length > 0 && oe(n, function(i) {
					if (i !== n && i.nodeType === E) {
						var a = i.getAttribute("class");
						if (a) {
							var o = e === a;
							if (!o) {
								var s = y(a);
								o = t.every(b(s));
							}
							o && r.push(i);
						}
					}
				}), r;
			});
		},
		getElementsByTagName: function(e) {
			var t = (this.nodeType === N ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
			return new V(this, function(r) {
				var i = [];
				return oe(r, function(a) {
					a === r || a.nodeType !== E || (e === "*" || a.getQualifiedName() === (t && a.namespaceURI === l.HTML ? n : e)) && i.push(a);
				}), i;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new V(this, function(n) {
				var r = [];
				return oe(n, function(i) {
					i !== n && i.nodeType === E && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
				}), r;
			});
		}
	}, se.prototype.getElementsByClassName = xe.prototype.getElementsByClassName, se.prototype.getElementsByTagName = xe.prototype.getElementsByTagName, se.prototype.getElementsByTagNameNS = xe.prototype.getElementsByTagNameNS, w(xe, W);
	function Se(e) {
		h(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
	}
	Se.prototype.nodeType = D, w(Se, W);
	function Ce(e) {
		h(e);
	}
	Ce.prototype = {
		data: "",
		substringData: function(e, t) {
			return this.data.substring(e, e + t);
		},
		appendData: function(e) {
			e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
		},
		insertData: function(e, t) {
			this.replaceData(e, 0, t);
		},
		deleteData: function(e, t) {
			this.replaceData(e, t, "");
		},
		replaceData: function(e, t, n) {
			var r = this.data.substring(0, e), i = this.data.substring(e + t);
			n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
		}
	}, w(Ce, W);
	function we(e) {
		h(e);
	}
	we.prototype = {
		nodeName: "#text",
		nodeType: O,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, w(we, Ce);
	function Te(e) {
		h(e);
	}
	Te.prototype = {
		nodeName: "#comment",
		nodeType: M
	}, w(Te, Ce);
	function Ee(e) {
		h(e);
	}
	Ee.prototype = {
		nodeName: "#cdata-section",
		nodeType: k
	}, w(Ee, we);
	function De(e) {
		h(e);
	}
	De.prototype.nodeType = P, w(De, W);
	function J(e) {
		h(e);
	}
	J.prototype.nodeType = I, w(J, W);
	function Oe(e) {
		h(e);
	}
	Oe.prototype.nodeType = j, w(Oe, W);
	function ke(e) {
		h(e);
	}
	ke.prototype.nodeType = A, w(ke, W);
	function Ae(e) {
		h(e);
	}
	Ae.prototype.nodeName = "#document-fragment", Ae.prototype.nodeType = F, w(Ae, W);
	function je(e) {
		h(e);
	}
	je.prototype.nodeType = ee, w(je, Ce);
	function Me() {}
	Me.prototype.serializeToString = function(e, t) {
		return Ne.call(e, t);
	}, W.prototype.toString = Ne;
	function Ne(e) {
		var t = typeof e == "function" ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: e
		} : e == null ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: null
		} : {
			requireWellFormed: !!e.requireWellFormed,
			splitCDATASections: e.splitCDATASections !== !1,
			nodeFilter: e.nodeFilter || null
		}, n = [], r = this.nodeType === N && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
		if (a && i == null) {
			var i = r.lookupPrefix(a);
			if (i == null) var o = [{
				namespace: a,
				prefix: null
			}];
		}
		return Ie(this, n, o, t), n.join("");
	}
	function Pe(e, t, n) {
		var r = e.prefix || "", i = e.namespaceURI;
		if (!i || r === "xml" && i === l.XML || i === l.XMLNS) return !1;
		for (var a = n.length; a--;) {
			var o = n[a];
			if (o.prefix === r) return o.namespace !== i;
		}
		return !0;
	}
	function Fe(e, t, n) {
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, ae), "\"");
	}
	function Ie(e, t, n, r) {
		n ||= [];
		var i = r.nodeFilter, a = r.requireWellFormed, c = r.splitCDATASections, u = (e.nodeType === N ? e : e.ownerDocument).type === "html";
		G(e, { ns: n }, {
			enter: function(e, n) {
				var d = n.ns;
				if (i) if (e = i(e), e) {
					if (typeof e == "string") return t.push(e), null;
				} else return null;
				switch (e.nodeType) {
					case E:
						var h = e.attributes, g = h.length, _ = e.tagName, v = _;
						if (!u && !e.prefix && e.namespaceURI) {
							for (var y, b = 0; b < h.length; b++) if (h.item(b).name === "xmlns") {
								y = h.item(b).value;
								break;
							}
							if (!y) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.prefix === "" && S.namespace === e.namespaceURI) {
									y = S.namespace;
									break;
								}
							}
							if (y !== e.namespaceURI) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.namespace === e.namespaceURI) {
									S.prefix && (v = S.prefix + ":" + _);
									break;
								}
							}
						}
						t.push("<", v);
						for (var C = d.slice(), w = 0; w < g; w++) {
							var T = h.item(w);
							T.prefix == "xmlns" ? C.push({
								prefix: T.localName,
								namespace: T.value
							}) : T.nodeName == "xmlns" && C.push({
								prefix: "",
								namespace: T.value
							});
						}
						for (var w = 0; w < g; w++) {
							var T = h.item(w);
							if (Pe(T, u, C)) {
								var j = T.prefix || "", I = T.namespaceURI;
								Fe(t, j ? "xmlns:" + j : "xmlns", I), C.push({
									prefix: j,
									namespace: I
								});
							}
							var L = i ? i(T) : T;
							L && (typeof L == "string" ? t.push(L) : Fe(t, L.name, L.value));
						}
						if (_ === v && Pe(e, u, C)) {
							var R = e.prefix || "", I = e.namespaceURI;
							Fe(t, R ? "xmlns:" + R : "xmlns", I), C.push({
								prefix: R,
								namespace: I
							});
						}
						var z = !e.firstChild;
						if (z && (u || e.namespaceURI === l.HTML) && (z = s(_)), z) return t.push("/>"), null;
						if (t.push(">"), u && o(_)) {
							for (var B = e.firstChild; B;) B.data ? t.push(B.data) : Ie(B, t, C.slice(), r), B = B.nextSibling;
							return t.push("</", v, ">"), null;
						}
						return {
							ns: C,
							tag: v
						};
					case N:
					case F:
						if (a && e.nodeType === N && e.documentElement == null) throw new f("The Document has no documentElement", p.InvalidStateError);
						return { ns: d };
					case D: return Fe(t, e.name, e.value), null;
					case O:
						if (a && m.InvalidChar.test(e.data)) throw new f("The Text node data contains characters outside the XML Char production", p.InvalidStateError);
						return t.push(e.data.replace(/[<&>]/g, ae)), null;
					case k:
						if (a && e.data.indexOf("]]>") !== -1) throw new f("The CDATASection data contains \"]]>\"", p.InvalidStateError);
						return c ? t.push(m.CDATA_START, e.data.replace(/]]>/g, "]]]]><![CDATA[>"), m.CDATA_END) : t.push(m.CDATA_START, e.data, m.CDATA_END), null;
					case M:
						if (a) {
							if (m.InvalidChar.test(e.data)) throw new f("The comment node data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("--") !== -1 || e.data[e.data.length - 1] === "-") throw new f("The comment node data contains \"--\" or ends with \"-\"", p.InvalidStateError);
						}
						return t.push(m.COMMENT_START, e.data, m.COMMENT_END), null;
					case P:
						var V = e.publicId, H = e.systemId;
						if (a) {
							if (V && !m.PubidLiteral_match.test(V)) throw new f("DocumentType publicId is not a valid PubidLiteral", p.InvalidStateError);
							if (H && H !== "." && !m.SystemLiteral_match.test(H)) throw new f("DocumentType systemId is not a valid SystemLiteral", p.InvalidStateError);
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new f("DocumentType internalSubset contains \"]>\"", p.InvalidStateError);
						}
						return t.push(m.DOCTYPE_DECL_START, " ", e.name), V ? (t.push(" ", m.PUBLIC, " ", V), H && H !== "." && t.push(" ", H)) : H && H !== "." && t.push(" ", m.SYSTEM, " ", H), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">"), null;
					case ee:
						if (a) {
							if (e.target.indexOf(":") !== -1 || e.target.toLowerCase() === "xml") throw new f("The ProcessingInstruction target is not well-formed", p.InvalidStateError);
							if (m.InvalidChar.test(e.data)) throw new f("The ProcessingInstruction data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("?>") !== -1) throw new f("The ProcessingInstruction data contains \"?>\"", p.InvalidStateError);
						}
						return t.push("<?", e.target, " ", e.data, "?>"), null;
					case A: return t.push("&", e.nodeName, ";"), null;
					default: return t.push("??", e.nodeName), null;
				}
			},
			exit: function(e, n) {
				n && n.tag && t.push("</", n.tag, ">");
			}
		});
	}
	function Le(e, t, n) {
		var r;
		return G(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === D || n ? a : null;
		} }), r;
	}
	function Re(e, t, n) {
		var r;
		return G(t, null, { enter: function(t, a) {
			var o = new t.constructor(u);
			for (var s in t) if (i(t, s)) {
				var c = t[s];
				typeof c != "object" && c != o[s] && (o[s] = c);
			}
			t.childNodes && (o.childNodes = new B()), o.ownerDocument = e;
			var l = n;
			switch (o.nodeType) {
				case E:
					var d = t.attributes, f = o.attributes = new te(), p = d.length;
					f._ownerElement = o;
					for (var m = 0; m < p; m++) o.setAttributeNode(Re(e, d.item(m), !0));
					break;
				case D: l = !0;
			}
			return a === null ? r = o : a.appendChild(o), l ? o : null;
		} }), r;
	}
	function ze(e, t, n) {
		e[t] = n;
	}
	function Be(e) {
		for (var t = [], n = e.firstChild; n;) n.nodeType === E && t.push(n), n = n.nextSibling;
		return t;
	}
	try {
		Object.defineProperty && (Object.defineProperty(V.prototype, "length", { get: function() {
			return H(this), this.$$length;
		} }), Object.defineProperty(W.prototype, "textContent", {
			get: function() {
				if (this.nodeType === E || this.nodeType === F) {
					var e = [];
					return G(this, null, { enter: function(t) {
						if (t.nodeType === E || t.nodeType === F) return !0;
						if (t.nodeType === ee || t.nodeType === M) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case E:
					case F:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), Object.defineProperty(xe.prototype, "children", { get: function() {
			return new V(this, Be);
		} }), Object.defineProperty(se.prototype, "children", { get: function() {
			return new V(this, Be);
		} }), Object.defineProperty(Ae.prototype, "children", { get: function() {
			return new V(this, Be);
		} }), ze = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e._updateLiveList = H, e.Attr = Se, e.CDATASection = Ee, e.CharacterData = Ce, e.Comment = Te, e.Document = se, e.DocumentFragment = Ae, e.DocumentType = De, e.DOMImplementation = ie, e.Element = xe, e.Entity = Oe, e.EntityReference = ke, e.LiveNodeList = V, e.NamedNodeMap = te, e.Node = W, e.NodeList = B, e.Notation = J, e.Text = we, e.ProcessingInstruction = je, e.walkDOM = G, e.XMLSerializer = Me;
})), Ic = /* @__PURE__ */ k(((e) => {
	var t = Mc().freeze;
	e.XML_ENTITIES = t({
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	}), e.HTML_ENTITIES = t({
		Aacute: "Á",
		aacute: "á",
		Abreve: "Ă",
		abreve: "ă",
		ac: "∾",
		acd: "∿",
		acE: "∾̳",
		Acirc: "Â",
		acirc: "â",
		acute: "´",
		Acy: "А",
		acy: "а",
		AElig: "Æ",
		aelig: "æ",
		af: "⁡",
		Afr: "𝔄",
		afr: "𝔞",
		Agrave: "À",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		Alpha: "Α",
		alpha: "α",
		Amacr: "Ā",
		amacr: "ā",
		amalg: "⨿",
		AMP: "&",
		amp: "&",
		And: "⩓",
		and: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsd: "∡",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		Aogon: "Ą",
		aogon: "ą",
		Aopf: "𝔸",
		aopf: "𝕒",
		ap: "≈",
		apacir: "⩯",
		apE: "⩰",
		ape: "≊",
		apid: "≋",
		apos: "'",
		ApplyFunction: "⁡",
		approx: "≈",
		approxeq: "≊",
		Aring: "Å",
		aring: "å",
		Ascr: "𝒜",
		ascr: "𝒶",
		Assign: "≔",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		Backslash: "∖",
		Barv: "⫧",
		barvee: "⊽",
		Barwed: "⌆",
		barwed: "⌅",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		Bcy: "Б",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		Because: "∵",
		because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		Bernoullis: "ℬ",
		Beta: "Β",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		Bfr: "𝔅",
		bfr: "𝔟",
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bNot: "⫭",
		bnot: "⌐",
		Bopf: "𝔹",
		bopf: "𝕓",
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxbox: "⧉",
		boxDL: "╗",
		boxDl: "╖",
		boxdL: "╕",
		boxdl: "┐",
		boxDR: "╔",
		boxDr: "╓",
		boxdR: "╒",
		boxdr: "┌",
		boxH: "═",
		boxh: "─",
		boxHD: "╦",
		boxHd: "╤",
		boxhD: "╥",
		boxhd: "┬",
		boxHU: "╩",
		boxHu: "╧",
		boxhU: "╨",
		boxhu: "┴",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxUL: "╝",
		boxUl: "╜",
		boxuL: "╛",
		boxul: "┘",
		boxUR: "╚",
		boxUr: "╙",
		boxuR: "╘",
		boxur: "└",
		boxV: "║",
		boxv: "│",
		boxVH: "╬",
		boxVh: "╫",
		boxvH: "╪",
		boxvh: "┼",
		boxVL: "╣",
		boxVl: "╢",
		boxvL: "╡",
		boxvl: "┤",
		boxVR: "╠",
		boxVr: "╟",
		boxvR: "╞",
		boxvr: "├",
		bprime: "‵",
		Breve: "˘",
		breve: "˘",
		brvbar: "¦",
		Bscr: "ℬ",
		bscr: "𝒷",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		Bumpeq: "≎",
		bumpeq: "≏",
		Cacute: "Ć",
		cacute: "ć",
		Cap: "⋒",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		CapitalDifferentialD: "ⅅ",
		caps: "∩︀",
		caret: "⁁",
		caron: "ˇ",
		Cayleys: "ℭ",
		ccaps: "⩍",
		Ccaron: "Č",
		ccaron: "č",
		Ccedil: "Ç",
		ccedil: "ç",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cconint: "∰",
		ccups: "⩌",
		ccupssm: "⩐",
		Cdot: "Ċ",
		cdot: "ċ",
		cedil: "¸",
		Cedilla: "¸",
		cemptyv: "⦲",
		cent: "¢",
		CenterDot: "·",
		centerdot: "·",
		Cfr: "ℭ",
		cfr: "𝔠",
		CHcy: "Ч",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		Chi: "Χ",
		chi: "χ",
		cir: "○",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		CircleDot: "⊙",
		circledR: "®",
		circledS: "Ⓢ",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		cirE: "⧃",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		clubs: "♣",
		clubsuit: "♣",
		Colon: "∷",
		colon: ":",
		Colone: "⩴",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		Congruent: "≡",
		Conint: "∯",
		conint: "∮",
		ContourIntegral: "∮",
		Copf: "ℂ",
		copf: "𝕔",
		coprod: "∐",
		Coproduct: "∐",
		COPY: "©",
		copy: "©",
		copysr: "℗",
		CounterClockwiseContourIntegral: "∳",
		crarr: "↵",
		Cross: "⨯",
		cross: "✗",
		Cscr: "𝒞",
		cscr: "𝒸",
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		Cup: "⋓",
		cup: "∪",
		cupbrcap: "⩈",
		CupCap: "≍",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		Dagger: "‡",
		dagger: "†",
		daleth: "ℸ",
		Darr: "↡",
		dArr: "⇓",
		darr: "↓",
		dash: "‐",
		Dashv: "⫤",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		Dcaron: "Ď",
		dcaron: "ď",
		Dcy: "Д",
		dcy: "д",
		DD: "ⅅ",
		dd: "ⅆ",
		ddagger: "‡",
		ddarr: "⇊",
		DDotrahd: "⤑",
		ddotseq: "⩷",
		deg: "°",
		Del: "∇",
		Delta: "Δ",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		Dfr: "𝔇",
		dfr: "𝔡",
		dHar: "⥥",
		dharl: "⇃",
		dharr: "⇂",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		diam: "⋄",
		Diamond: "⋄",
		diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		DifferentialD: "ⅆ",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		DJcy: "Ђ",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		Dopf: "𝔻",
		dopf: "𝕕",
		Dot: "¨",
		dot: "˙",
		DotDot: "⃜",
		doteq: "≐",
		doteqdot: "≑",
		DotEqual: "≐",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrow: "↓",
		Downarrow: "⇓",
		downarrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		DownTeeArrow: "↧",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		Dscr: "𝒟",
		dscr: "𝒹",
		DScy: "Ѕ",
		dscy: "ѕ",
		dsol: "⧶",
		Dstrok: "Đ",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		DZcy: "Џ",
		dzcy: "џ",
		dzigrarr: "⟿",
		Eacute: "É",
		eacute: "é",
		easter: "⩮",
		Ecaron: "Ě",
		ecaron: "ě",
		ecir: "≖",
		Ecirc: "Ê",
		ecirc: "ê",
		ecolon: "≕",
		Ecy: "Э",
		ecy: "э",
		eDDot: "⩷",
		Edot: "Ė",
		eDot: "≑",
		edot: "ė",
		ee: "ⅇ",
		efDot: "≒",
		Efr: "𝔈",
		efr: "𝔢",
		eg: "⪚",
		Egrave: "È",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		Element: "∈",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		Emacr: "Ē",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		EmptySmallSquare: "◻",
		emptyv: "∅",
		EmptyVerySmallSquare: "▫",
		emsp: " ",
		emsp13: " ",
		emsp14: " ",
		ENG: "Ŋ",
		eng: "ŋ",
		ensp: " ",
		Eogon: "Ę",
		eogon: "ę",
		Eopf: "𝔼",
		eopf: "𝕖",
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		Equal: "⩵",
		equals: "=",
		EqualTilde: "≂",
		equest: "≟",
		Equilibrium: "⇌",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erarr: "⥱",
		erDot: "≓",
		Escr: "ℰ",
		escr: "ℯ",
		esdot: "≐",
		Esim: "⩳",
		esim: "≂",
		Eta: "Η",
		eta: "η",
		ETH: "Ð",
		eth: "ð",
		Euml: "Ë",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		Exists: "∃",
		expectation: "ℰ",
		ExponentialE: "ⅇ",
		exponentiale: "ⅇ",
		fallingdotseq: "≒",
		Fcy: "Ф",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		Ffr: "𝔉",
		ffr: "𝔣",
		filig: "ﬁ",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		Fopf: "𝔽",
		fopf: "𝕗",
		ForAll: "∀",
		forall: "∀",
		fork: "⋔",
		forkv: "⫙",
		Fouriertrf: "ℱ",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		Fscr: "ℱ",
		fscr: "𝒻",
		gacute: "ǵ",
		Gamma: "Γ",
		gamma: "γ",
		Gammad: "Ϝ",
		gammad: "ϝ",
		gap: "⪆",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gcy: "Г",
		gcy: "г",
		Gdot: "Ġ",
		gdot: "ġ",
		gE: "≧",
		ge: "≥",
		gEl: "⪌",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		ges: "⩾",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		Gfr: "𝔊",
		gfr: "𝔤",
		Gg: "⋙",
		gg: "≫",
		ggg: "⋙",
		gimel: "ℷ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		gl: "≷",
		gla: "⪥",
		glE: "⪒",
		glj: "⪤",
		gnap: "⪊",
		gnapprox: "⪊",
		gnE: "≩",
		gne: "⪈",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		Gopf: "𝔾",
		gopf: "𝕘",
		grave: "`",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr: "𝒢",
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		Gt: "≫",
		GT: ">",
		gt: ">",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		Hacek: "ˇ",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		hArr: "⇔",
		harr: "↔",
		harrcir: "⥈",
		harrw: "↭",
		Hat: "^",
		hbar: "ℏ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		Hfr: "ℌ",
		hfr: "𝔥",
		HilbertSpace: "ℋ",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		Hopf: "ℍ",
		hopf: "𝕙",
		horbar: "―",
		HorizontalLine: "─",
		Hscr: "ℋ",
		hscr: "𝒽",
		hslash: "ℏ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		hybull: "⁃",
		hyphen: "‐",
		Iacute: "Í",
		iacute: "í",
		ic: "⁣",
		Icirc: "Î",
		icirc: "î",
		Icy: "И",
		icy: "и",
		Idot: "İ",
		IEcy: "Е",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		Ifr: "ℑ",
		ifr: "𝔦",
		Igrave: "Ì",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Im: "ℑ",
		Imacr: "Ī",
		imacr: "ī",
		image: "ℑ",
		ImaginaryI: "ⅈ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		imof: "⊷",
		imped: "Ƶ",
		Implies: "⇒",
		in: "∈",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		Int: "∬",
		int: "∫",
		intcal: "⊺",
		integers: "ℤ",
		Integral: "∫",
		intercal: "⊺",
		Intersection: "⋂",
		intlarhk: "⨗",
		intprod: "⨼",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		IOcy: "Ё",
		iocy: "ё",
		Iogon: "Į",
		iogon: "į",
		Iopf: "𝕀",
		iopf: "𝕚",
		Iota: "Ι",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		Iscr: "ℐ",
		iscr: "𝒾",
		isin: "∈",
		isindot: "⋵",
		isinE: "⋹",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Iukcy: "І",
		iukcy: "і",
		Iuml: "Ï",
		iuml: "ï",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Jcy: "Й",
		jcy: "й",
		Jfr: "𝔍",
		jfr: "𝔧",
		jmath: "ȷ",
		Jopf: "𝕁",
		jopf: "𝕛",
		Jscr: "𝒥",
		jscr: "𝒿",
		Jsercy: "Ј",
		jsercy: "ј",
		Jukcy: "Є",
		jukcy: "є",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		Kcy: "К",
		kcy: "к",
		Kfr: "𝔎",
		kfr: "𝔨",
		kgreen: "ĸ",
		KHcy: "Х",
		khcy: "х",
		KJcy: "Ќ",
		kjcy: "ќ",
		Kopf: "𝕂",
		kopf: "𝕜",
		Kscr: "𝒦",
		kscr: "𝓀",
		lAarr: "⇚",
		Lacute: "Ĺ",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		Lambda: "Λ",
		lambda: "λ",
		Lang: "⟪",
		lang: "⟨",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		Laplacetrf: "ℒ",
		laquo: "«",
		Larr: "↞",
		lArr: "⇐",
		larr: "←",
		larrb: "⇤",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		lat: "⪫",
		lAtail: "⤛",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lBarr: "⤎",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		Lcy: "Л",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		lE: "≦",
		le: "≤",
		LeftAngleBracket: "⟨",
		LeftArrow: "←",
		Leftarrow: "⇐",
		leftarrow: "←",
		LeftArrowBar: "⇤",
		LeftArrowRightArrow: "⇆",
		leftarrowtail: "↢",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		LeftRightArrow: "↔",
		Leftrightarrow: "⇔",
		leftrightarrow: "↔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		LeftTeeArrow: "↤",
		LeftTeeVector: "⥚",
		leftthreetimes: "⋋",
		LeftTriangle: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		LeftVectorBar: "⥒",
		lEg: "⪋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		les: "⩽",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		LessLess: "⪡",
		lesssim: "≲",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		Lfr: "𝔏",
		lfr: "𝔩",
		lg: "≶",
		lgE: "⪑",
		lHar: "⥢",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		LJcy: "Љ",
		ljcy: "љ",
		Ll: "⋘",
		ll: "≪",
		llarr: "⇇",
		llcorner: "⌞",
		Lleftarrow: "⇚",
		llhard: "⥫",
		lltri: "◺",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnap: "⪉",
		lnapprox: "⪉",
		lnE: "≨",
		lne: "⪇",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		LongLeftArrow: "⟵",
		Longleftarrow: "⟸",
		longleftarrow: "⟵",
		LongLeftRightArrow: "⟷",
		Longleftrightarrow: "⟺",
		longleftrightarrow: "⟷",
		longmapsto: "⟼",
		LongRightArrow: "⟶",
		Longrightarrow: "⟹",
		longrightarrow: "⟶",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		Lopf: "𝕃",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		Lscr: "ℒ",
		lscr: "𝓁",
		Lsh: "↰",
		lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		Lstrok: "Ł",
		lstrok: "ł",
		Lt: "≪",
		LT: "<",
		lt: "<",
		ltcc: "⪦",
		ltcir: "⩹",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		ltrPar: "⦖",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		Map: "⤅",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		Mcy: "М",
		mcy: "м",
		mdash: "—",
		mDDot: "∺",
		measuredangle: "∡",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr: "𝔐",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		mid: "∣",
		midast: "*",
		midcir: "⫰",
		middot: "·",
		minus: "−",
		minusb: "⊟",
		minusd: "∸",
		minusdu: "⨪",
		MinusPlus: "∓",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		Mopf: "𝕄",
		mopf: "𝕞",
		mp: "∓",
		Mscr: "ℳ",
		mscr: "𝓂",
		mstpos: "∾",
		Mu: "Μ",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nabla: "∇",
		Nacute: "Ń",
		nacute: "ń",
		nang: "∠⃒",
		nap: "≉",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		napprox: "≉",
		natur: "♮",
		natural: "♮",
		naturals: "ℕ",
		nbsp: "\xA0",
		nbump: "≎̸",
		nbumpe: "≏̸",
		ncap: "⩃",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot: "⩭̸",
		ncup: "⩂",
		Ncy: "Н",
		ncy: "н",
		ndash: "–",
		ne: "≠",
		nearhk: "⤤",
		neArr: "⇗",
		nearr: "↗",
		nearrow: "↗",
		nedot: "≐̸",
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		nequiv: "≢",
		nesear: "⤨",
		nesim: "≂̸",
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: "\n",
		nexist: "∄",
		nexists: "∄",
		Nfr: "𝔑",
		nfr: "𝔫",
		ngE: "≧̸",
		nge: "≱",
		ngeq: "≱",
		ngeqq: "≧̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		nGg: "⋙̸",
		ngsim: "≵",
		nGt: "≫⃒",
		ngt: "≯",
		ngtr: "≯",
		nGtv: "≫̸",
		nhArr: "⇎",
		nharr: "↮",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		NJcy: "Њ",
		njcy: "њ",
		nlArr: "⇍",
		nlarr: "↚",
		nldr: "‥",
		nlE: "≦̸",
		nle: "≰",
		nLeftarrow: "⇍",
		nleftarrow: "↚",
		nLeftrightarrow: "⇎",
		nleftrightarrow: "↮",
		nleq: "≰",
		nleqq: "≦̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		nless: "≮",
		nLl: "⋘̸",
		nlsim: "≴",
		nLt: "≪⃒",
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nLtv: "≪̸",
		nmid: "∤",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		Nopf: "ℕ",
		nopf: "𝕟",
		Not: "⫬",
		not: "¬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde: "≂̸",
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual: "≧̸",
		NotGreaterGreater: "≫̸",
		NotGreaterLess: "≹",
		NotGreaterSlantEqual: "⩾̸",
		NotGreaterTilde: "≵",
		NotHumpDownHump: "≎̸",
		NotHumpEqual: "≏̸",
		notin: "∉",
		notindot: "⋵̸",
		notinE: "⋹̸",
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		NotLeftTriangle: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess: "≪̸",
		NotLessSlantEqual: "⩽̸",
		NotLessTilde: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		NotPrecedes: "⊀",
		NotPrecedesEqual: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangle: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		NotSubset: "⊂⃒",
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		npar: "∦",
		nparallel: "∦",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		npre: "⪯̸",
		nprec: "⊀",
		npreceq: "⪯̸",
		nrArr: "⇏",
		nrarr: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nRightarrow: "⇏",
		nrightarrow: "↛",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce: "⪰̸",
		Nscr: "𝒩",
		nscr: "𝓃",
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsube: "⊈",
		nsubset: "⊂⃒",
		nsubseteq: "⊈",
		nsubseteqq: "⫅̸",
		nsucc: "⊁",
		nsucceq: "⪰̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupe: "⊉",
		nsupset: "⊃⃒",
		nsupseteq: "⊉",
		nsupseteqq: "⫆̸",
		ntgl: "≹",
		Ntilde: "Ñ",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		Nu: "Ν",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvap: "≍⃒",
		nVDash: "⊯",
		nVdash: "⊮",
		nvDash: "⊭",
		nvdash: "⊬",
		nvge: "≥⃒",
		nvgt: ">⃒",
		nvHarr: "⤄",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvltrie: "⊴⃒",
		nvrArr: "⤃",
		nvrtrie: "⊵⃒",
		nvsim: "∼⃒",
		nwarhk: "⤣",
		nwArr: "⇖",
		nwarr: "↖",
		nwarrow: "↖",
		nwnear: "⤧",
		Oacute: "Ó",
		oacute: "ó",
		oast: "⊛",
		ocir: "⊚",
		Ocirc: "Ô",
		ocirc: "ô",
		Ocy: "О",
		ocy: "о",
		odash: "⊝",
		Odblac: "Ő",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		OElig: "Œ",
		oelig: "œ",
		ofcir: "⦿",
		Ofr: "𝔒",
		ofr: "𝔬",
		ogon: "˛",
		Ograve: "Ò",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		Omacr: "Ō",
		omacr: "ō",
		Omega: "Ω",
		omega: "ω",
		Omicron: "Ο",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		Oopf: "𝕆",
		oopf: "𝕠",
		opar: "⦷",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		operp: "⦹",
		oplus: "⊕",
		Or: "⩔",
		or: "∨",
		orarr: "↻",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oS: "Ⓢ",
		Oscr: "𝒪",
		oscr: "ℴ",
		Oslash: "Ø",
		oslash: "ø",
		osol: "⊘",
		Otilde: "Õ",
		otilde: "õ",
		Otimes: "⨷",
		otimes: "⊗",
		otimesas: "⨶",
		Ouml: "Ö",
		ouml: "ö",
		ovbar: "⌽",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		par: "∥",
		para: "¶",
		parallel: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		PartialD: "∂",
		Pcy: "П",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		Pfr: "𝔓",
		pfr: "𝔭",
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		Pi: "Π",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plus: "+",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		PlusMinus: "±",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		Poincareplane: "ℌ",
		pointint: "⨕",
		Popf: "ℙ",
		popf: "𝕡",
		pound: "£",
		Pr: "⪻",
		pr: "≺",
		prap: "⪷",
		prcue: "≼",
		prE: "⪳",
		pre: "⪯",
		prec: "≺",
		precapprox: "⪷",
		preccurlyeq: "≼",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		precsim: "≾",
		Prime: "″",
		prime: "′",
		primes: "ℙ",
		prnap: "⪹",
		prnE: "⪵",
		prnsim: "⋨",
		prod: "∏",
		Product: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		Proportion: "∷",
		Proportional: "∝",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		Pscr: "𝒫",
		pscr: "𝓅",
		Psi: "Ψ",
		psi: "ψ",
		puncsp: " ",
		Qfr: "𝔔",
		qfr: "𝔮",
		qint: "⨌",
		Qopf: "ℚ",
		qopf: "𝕢",
		qprime: "⁗",
		Qscr: "𝒬",
		qscr: "𝓆",
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		QUOT: "\"",
		quot: "\"",
		rAarr: "⇛",
		race: "∽̱",
		Racute: "Ŕ",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		Rang: "⟫",
		rang: "⟩",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		Rarr: "↠",
		rArr: "⇒",
		rarr: "→",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		Rarrtl: "⤖",
		rarrtl: "↣",
		rarrw: "↝",
		rAtail: "⤜",
		ratail: "⤚",
		ratio: "∶",
		rationals: "ℚ",
		RBarr: "⤐",
		rBarr: "⤏",
		rbarr: "⤍",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		Rcy: "Р",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		Re: "ℜ",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		rect: "▭",
		REG: "®",
		reg: "®",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		rfisht: "⥽",
		rfloor: "⌋",
		Rfr: "ℜ",
		rfr: "𝔯",
		rHar: "⥤",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		RightAngleBracket: "⟩",
		RightArrow: "→",
		Rightarrow: "⇒",
		rightarrow: "→",
		RightArrowBar: "⇥",
		RightArrowLeftArrow: "⇄",
		rightarrowtail: "↣",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		RightTee: "⊢",
		RightTeeArrow: "↦",
		RightTeeVector: "⥛",
		rightthreetimes: "⋌",
		RightTriangle: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		RightVectorBar: "⥓",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		Ropf: "ℝ",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		RoundImplies: "⥰",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		Rrightarrow: "⇛",
		rsaquo: "›",
		Rscr: "ℛ",
		rscr: "𝓇",
		Rsh: "↱",
		rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		RuleDelayed: "⧴",
		ruluhar: "⥨",
		rx: "℞",
		Sacute: "Ś",
		sacute: "ś",
		sbquo: "‚",
		Sc: "⪼",
		sc: "≻",
		scap: "⪸",
		Scaron: "Š",
		scaron: "š",
		sccue: "≽",
		scE: "⪴",
		sce: "⪰",
		Scedil: "Ş",
		scedil: "ş",
		Scirc: "Ŝ",
		scirc: "ŝ",
		scnap: "⪺",
		scnE: "⪶",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		Scy: "С",
		scy: "с",
		sdot: "⋅",
		sdotb: "⊡",
		sdote: "⩦",
		searhk: "⤥",
		seArr: "⇘",
		searr: "↘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		Sfr: "𝔖",
		sfr: "𝔰",
		sfrown: "⌢",
		sharp: "♯",
		SHCHcy: "Щ",
		shchcy: "щ",
		SHcy: "Ш",
		shcy: "ш",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		shortmid: "∣",
		shortparallel: "∥",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		shy: "­",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		SmallCircle: "∘",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes: "⪬︀",
		SOFTcy: "Ь",
		softcy: "ь",
		sol: "/",
		solb: "⧄",
		solbar: "⌿",
		Sopf: "𝕊",
		sopf: "𝕤",
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps: "⊓︀",
		sqcup: "⊔",
		sqcups: "⊔︀",
		Sqrt: "√",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		squ: "□",
		Square: "□",
		square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		squarf: "▪",
		squf: "▪",
		srarr: "→",
		Sscr: "𝒮",
		sscr: "𝓈",
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		Star: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		Sub: "⋐",
		sub: "⊂",
		subdot: "⪽",
		subE: "⫅",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		Subset: "⋐",
		subset: "⊂",
		subseteq: "⊆",
		subseteqq: "⫅",
		SubsetEqual: "⊆",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succ: "≻",
		succapprox: "⪸",
		succcurlyeq: "≽",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		SuchThat: "∋",
		Sum: "∑",
		sum: "∑",
		sung: "♪",
		Sup: "⋑",
		sup: "⊃",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		supdot: "⪾",
		supdsub: "⫘",
		supE: "⫆",
		supe: "⊇",
		supedot: "⫄",
		Superset: "⊃",
		SupersetEqual: "⊇",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		Supset: "⋑",
		supset: "⊃",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swarhk: "⤦",
		swArr: "⇙",
		swarr: "↙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		Tab: "	",
		target: "⌖",
		Tau: "Τ",
		tau: "τ",
		tbrk: "⎴",
		Tcaron: "Ť",
		tcaron: "ť",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcy: "Т",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		Tfr: "𝔗",
		tfr: "𝔱",
		there4: "∴",
		Therefore: "∴",
		therefore: "∴",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		ThickSpace: "  ",
		thinsp: " ",
		ThinSpace: " ",
		thkap: "≈",
		thksim: "∼",
		THORN: "Þ",
		thorn: "þ",
		Tilde: "∼",
		tilde: "˜",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		times: "×",
		timesb: "⊠",
		timesbar: "⨱",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		top: "⊤",
		topbot: "⌶",
		topcir: "⫱",
		Topf: "𝕋",
		topf: "𝕥",
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		TRADE: "™",
		trade: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		TripleDot: "⃛",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		Tscr: "𝒯",
		tscr: "𝓉",
		TScy: "Ц",
		tscy: "ц",
		TSHcy: "Ћ",
		tshcy: "ћ",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Uacute: "Ú",
		uacute: "ú",
		Uarr: "↟",
		uArr: "⇑",
		uarr: "↑",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		ubrcy: "ў",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Ucirc: "Û",
		ucirc: "û",
		Ucy: "У",
		ucy: "у",
		udarr: "⇅",
		Udblac: "Ű",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		Ufr: "𝔘",
		ufr: "𝔲",
		Ugrave: "Ù",
		ugrave: "ù",
		uHar: "⥣",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		Umacr: "Ū",
		umacr: "ū",
		uml: "¨",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		uogon: "ų",
		Uopf: "𝕌",
		uopf: "𝕦",
		UpArrow: "↑",
		Uparrow: "⇑",
		uparrow: "↑",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		UpDownArrow: "↕",
		Updownarrow: "⇕",
		updownarrow: "↕",
		UpEquilibrium: "⥮",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		Upsi: "ϒ",
		upsi: "υ",
		upsih: "ϒ",
		Upsilon: "Υ",
		upsilon: "υ",
		UpTee: "⊥",
		UpTeeArrow: "↥",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		Uring: "Ů",
		uring: "ů",
		urtri: "◹",
		Uscr: "𝒰",
		uscr: "𝓊",
		utdot: "⋰",
		Utilde: "Ũ",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		Uuml: "Ü",
		uuml: "ü",
		uwangle: "⦧",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		vArr: "⇕",
		varr: "↕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq: "⊊︀",
		varsubsetneqq: "⫋︀",
		varsupsetneq: "⊋︀",
		varsupsetneqq: "⫌︀",
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		Vbar: "⫫",
		vBar: "⫨",
		vBarv: "⫩",
		Vcy: "В",
		vcy: "в",
		VDash: "⊫",
		Vdash: "⊩",
		vDash: "⊨",
		vdash: "⊢",
		Vdashl: "⫦",
		Vee: "⋁",
		vee: "∨",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		Verbar: "‖",
		verbar: "|",
		Vert: "‖",
		vert: "|",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr: "𝔙",
		vfr: "𝔳",
		vltri: "⊲",
		vnsub: "⊂⃒",
		vnsup: "⊃⃒",
		Vopf: "𝕍",
		vopf: "𝕧",
		vprop: "∝",
		vrtri: "⊳",
		Vscr: "𝒱",
		vscr: "𝓋",
		vsubnE: "⫋︀",
		vsubne: "⊊︀",
		vsupnE: "⫌︀",
		vsupne: "⊋︀",
		Vvdash: "⊪",
		vzigzag: "⦚",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		wedbar: "⩟",
		Wedge: "⋀",
		wedge: "∧",
		wedgeq: "≙",
		weierp: "℘",
		Wfr: "𝔚",
		wfr: "𝔴",
		Wopf: "𝕎",
		wopf: "𝕨",
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		Wscr: "𝒲",
		wscr: "𝓌",
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		Xfr: "𝔛",
		xfr: "𝔵",
		xhArr: "⟺",
		xharr: "⟷",
		Xi: "Ξ",
		xi: "ξ",
		xlArr: "⟸",
		xlarr: "⟵",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		Xopf: "𝕏",
		xopf: "𝕩",
		xoplus: "⨁",
		xotime: "⨂",
		xrArr: "⟹",
		xrarr: "⟶",
		Xscr: "𝒳",
		xscr: "𝓍",
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		Yacute: "Ý",
		yacute: "ý",
		YAcy: "Я",
		yacy: "я",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Ycy: "Ы",
		ycy: "ы",
		yen: "¥",
		Yfr: "𝔜",
		yfr: "𝔶",
		YIcy: "Ї",
		yicy: "ї",
		Yopf: "𝕐",
		yopf: "𝕪",
		Yscr: "𝒴",
		yscr: "𝓎",
		YUcy: "Ю",
		yucy: "ю",
		Yuml: "Ÿ",
		yuml: "ÿ",
		Zacute: "Ź",
		zacute: "ź",
		Zcaron: "Ž",
		zcaron: "ž",
		Zcy: "З",
		zcy: "з",
		Zdot: "Ż",
		zdot: "ż",
		zeetrf: "ℨ",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		zeta: "ζ",
		Zfr: "ℨ",
		zfr: "𝔷",
		ZHcy: "Ж",
		zhcy: "ж",
		zigrarr: "⇝",
		Zopf: "ℤ",
		zopf: "𝕫",
		Zscr: "𝒵",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	}), e.entityMap = e.HTML_ENTITIES;
})), Lc = /* @__PURE__ */ k(((e) => {
	var t = Mc(), n = Pc(), r = Nc(), i = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.hasOwn, c = t.NAMESPACE, l = r.ParseError, u = r.DOMException, d = 0, f = 1, p = 2, m = 3, h = 4, g = 5, _ = 6, v = 7;
	function y() {}
	y.prototype = { parse: function(e, t, n) {
		var r = this.domBuilder;
		r.startDocument(), E(t, t = Object.create(null)), x(e, t, n, r, this.errorHandler), r.endDocument();
	} };
	var b = /&#?\w+;?/g;
	function x(e, r, i, o, c) {
		var d = a(o.mimeType);
		e.indexOf(n.UNICODE_REPLACEMENT_CHARACTER) >= 0 && c.warning("Unicode replacement character detected, source encoding issues?");
		function f(e) {
			if (e > 65535) {
				e -= 65536;
				var t = 55296 + (e >> 10), n = 56320 + (e & 1023);
				return String.fromCharCode(t, n);
			} else return String.fromCharCode(e);
		}
		function p(e) {
			var t = e[e.length - 1] === ";" ? e : e + ";";
			if (!d && t !== e) return c.error("EntityRef: expecting ;"), e;
			var r = n.Reference.exec(t);
			if (!r || r[0].length !== t.length) return c.error("entity not matching Reference production: " + e), e;
			var a = t.slice(1, -1);
			return s(i, a) ? i[a] : a.charAt(0) === "#" ? f(parseInt(a.substring(1).replace("x", "0x"))) : (c.error("entity not found:" + e), e);
		}
		function m(t) {
			if (t > D) {
				var n = e.substring(D, t).replace(b, p);
				v && y(D), o.characters(n, 0, t - D), D = t;
			}
		}
		var h = 0, g = 0, _ = /\r\n?|\n|$/g, v = o.locator;
		function y(t, n) {
			for (; t >= g && (n = _.exec(e));) h = g, g = n.index + n[0].length, v.lineNumber++;
			v.columnNumber = t - h + 1;
		}
		for (var x = [{ currentNSMap: r }], E = [], D = 0;;) {
			try {
				var O = e.indexOf("<", D);
				if (O < 0) {
					if (!d && E.length > 0) return c.fatalError("unclosed xml tag(s): " + E.join(", "));
					if (!e.substring(D).match(/^\s*$/)) {
						var ee = o.doc, M = ee.createTextNode(e.substring(D));
						if (ee.documentElement) return c.error("Extra content at the end of the document");
						ee.appendChild(M), o.currentElement = M;
					}
					return;
				}
				if (O > D) {
					var N = e.substring(D, O);
					!d && E.length === 0 && (N = N.replace(new RegExp(n.S_OPT.source, "g"), ""), N && c.error("Unexpected content outside root element: '" + N + "'")), m(O);
				}
				switch (e.charAt(O + 1)) {
					case "/":
						var P = e.indexOf(">", O + 2), F = e.substring(O + 2, P > 0 ? P : void 0);
						if (!F) return c.fatalError("end tag name missing");
						var I = P > 0 && n.reg("^", n.QName_group, n.S_OPT, "$").exec(F);
						if (!I) return c.fatalError("end tag name contains invalid characters: \"" + F + "\"");
						if (!o.currentElement && !o.doc.documentElement) return;
						var L = E[E.length - 1] || o.currentElement.tagName || o.doc.documentElement.tagName || "";
						if (L !== I[1]) {
							var R = I[1].toLowerCase();
							if (!d || L.toLowerCase() !== R) return c.fatalError("Opening and ending tag mismatch: \"" + L + "\" != \"" + F + "\"");
						}
						var z = x.pop();
						E.pop();
						var B = z.localNSMap;
						if (o.endElement(z.uri, z.localName, L), B) for (var V in B) s(B, V) && o.endPrefixMapping(V);
						P++;
						break;
					case "?":
						v && y(O), P = A(e, O, o, c);
						break;
					case "!":
						v && y(O), P = k(e, O, o, c, d);
						break;
					default:
						v && y(O);
						var H = new j(), te = x[x.length - 1].currentNSMap, P = C(e, O, H, te, p, c, d), U = H.length;
						if (H.closed || (d && t.isHTMLVoidElement(H.tagName) ? H.closed = !0 : E.push(H.tagName)), v && U) {
							for (var ne = S(v, {}), re = 0; re < U; re++) {
								var ie = H[re];
								y(ie.offset), ie.locator = S(v, {});
							}
							o.locator = ne, w(H, o, te) && x.push(H), o.locator = v;
						} else w(H, o, te) && x.push(H);
						d && !H.closed ? P = T(e, P, H.tagName, p, o) : P++;
				}
			} catch (e) {
				if (e instanceof l) throw e;
				if (e instanceof u) throw new l(e.name + ": " + e.message, o.locator, e);
				c.error("element parse error: " + e), P = -1;
			}
			P > D ? D = P : m(Math.max(O, D) + 1);
		}
	}
	function S(e, t) {
		return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
	}
	function C(e, t, n, r, i, a, o) {
		function c(e, t, r) {
			if (s(n.attributeNames, e)) return a.fatalError("Attribute " + e + " redefined");
			if (!o && t.indexOf("<") >= 0) return a.fatalError("Unescaped '<' not allowed in attributes values");
			n.addValue(e, t.replace(/[\t\n\r]/g, " ").replace(b, i), r);
		}
		for (var l, u, y = ++t, x = d;;) {
			var S = e.charAt(y);
			switch (S) {
				case "=":
					if (x === f) l = e.slice(t, y), x = m;
					else if (x === p) x = m;
					else throw Error("attribute equal must after attrName");
					break;
				case "'":
				case "\"":
					if (x === m || x === f) if (x === f && (a.warning("attribute value must after \"=\""), l = e.slice(t, y)), t = y + 1, y = e.indexOf(S, t), y > 0) u = e.slice(t, y), c(l, u, t - 1), x = g;
					else throw Error("attribute value no end '" + S + "' match");
					else if (x == h) u = e.slice(t, y), c(l, u, t), a.warning("attribute \"" + l + "\" missed start quot(" + S + ")!!"), t = y + 1, x = g;
					else throw Error("attribute value must after \"=\"");
					break;
				case "/":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: x = v, n.closed = !0;
						case h:
						case f: break;
						case p:
							n.closed = !0;
							break;
						default: throw Error("attribute invalid close char('/')");
					}
					break;
				case "": return a.error("unexpected end of input"), x == d && n.setTagName(e.slice(t, y)), y;
				case ">":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: break;
						case h:
						case f: u = e.slice(t, y), u.slice(-1) === "/" && (n.closed = !0, u = u.slice(0, -1));
						case p:
							x === p && (u = l), x == h ? (a.warning("attribute \"" + u + "\" missed quot(\")!"), c(l, u, t)) : (o || a.warning("attribute \"" + u + "\" missed value!! \"" + u + "\" instead!!"), c(u, u, t));
							break;
						case m: if (!o) return a.fatalError("AttValue: ' or \" expected");
					}
					return y;
				case "": S = " ";
				default: if (S <= " ") switch (x) {
					case d:
						n.setTagName(e.slice(t, y)), x = _;
						break;
					case f:
						l = e.slice(t, y), x = p;
						break;
					case h:
						var u = e.slice(t, y);
						a.warning("attribute \"" + u + "\" missed quot(\")!!"), c(l, u, t);
					case g:
						x = _;
						break;
				}
				else switch (x) {
					case p:
						o || a.warning("attribute \"" + l + "\" missed value!! \"" + l + "\" instead2!!"), c(l, l, t), t = y, x = f;
						break;
					case g: a.warning("attribute space is required\"" + l + "\"!!");
					case _:
						x = f, t = y;
						break;
					case m:
						x = h, t = y;
						break;
					case v: throw Error("elements closed character '/' and '>' must be connected to");
				}
			}
			y++;
		}
	}
	function w(e, t, n) {
		for (var r = e.tagName, i = null, a = e.length; a--;) {
			var o = e[a], l = o.qName, u = o.value, d = l.indexOf(":");
			if (d > 0) var f = o.prefix = l.slice(0, d), p = l.slice(d + 1), m = f === "xmlns" && p;
			else p = l, f = null, m = l === "xmlns" && "";
			o.localName = p, m !== !1 && (i ?? (i = Object.create(null), E(n, n = Object.create(null))), n[m] = i[m] = u, o.uri = c.XMLNS, t.startPrefixMapping(m, u));
		}
		for (var a = e.length; a--;) o = e[a], o.prefix && (o.prefix === "xml" && (o.uri = c.XML), o.prefix !== "xmlns" && (o.uri = n[o.prefix]));
		var d = r.indexOf(":");
		d > 0 ? (f = e.prefix = r.slice(0, d), p = e.localName = r.slice(d + 1)) : (f = null, p = e.localName = r);
		var h = e.uri = n[f || ""];
		if (t.startElement(h, p, r, e), e.closed) {
			if (t.endElement(h, p, r), i) for (f in i) s(i, f) && t.endPrefixMapping(f);
		} else return e.currentNSMap = n, e.localNSMap = i, !0;
	}
	function T(e, t, n, r, a) {
		var s = i(n);
		if (s || o(n)) {
			var c = e.indexOf("</" + n + ">", t), l = e.substring(t + 1, c);
			return s && (l = l.replace(b, r)), a.characters(l, 0, l.length), c;
		}
		return t + 1;
	}
	function E(e, t) {
		for (var n in e) s(e, n) && (t[n] = e[n]);
	}
	function D(e, t) {
		var r = t;
		function i(t) {
			return t ||= 0, e.charAt(r + t);
		}
		function a(e) {
			e ||= 1, r += e;
		}
		function o() {
			for (var t = 0; r < e.length;) {
				var n = i();
				if (n !== " " && n !== "\n" && n !== "	" && n !== "\r") return t;
				t++, a();
			}
			return -1;
		}
		function s() {
			return e.substring(r);
		}
		function c(t) {
			return e.substring(r, r + t.length) === t;
		}
		function l(t) {
			return e.substring(r, r + t.length).toUpperCase() === t.toUpperCase();
		}
		function u(e) {
			var t = n.reg("^", e).exec(s());
			return t ? (a(t[0].length), t[0]) : null;
		}
		return {
			char: i,
			getIndex: function() {
				return r;
			},
			getMatch: u,
			getSource: function() {
				return e;
			},
			skip: a,
			skipBlanks: o,
			substringFromIndex: s,
			substringStartsWith: c,
			substringStartsWithCaseInsensitive: l
		};
	}
	function O(e, t) {
		function r(e, t) {
			var r = n.PI.exec(e.substringFromIndex());
			return r ? r[1].toLowerCase() === "xml" ? t.fatalError("xml declaration is only allowed at the start of the document, but found at position " + e.getIndex()) : (e.skip(r[0].length), r[0]) : t.fatalError("processing instruction is not well-formed at position " + e.getIndex());
		}
		var i = e.getSource();
		if (e.char() === "[") {
			e.skip(1);
			for (var a = e.getIndex(); e.getIndex() < i.length;) {
				if (e.skipBlanks(), e.char() === "]") {
					var o = i.substring(a, e.getIndex());
					return e.skip(1), o;
				}
				var s = null;
				if (e.char() === "<" && e.char(1) === "!") switch (e.char(2)) {
					case "E":
						e.char(3) === "L" ? s = e.getMatch(n.elementdecl) : e.char(3) === "N" && (s = e.getMatch(n.EntityDecl));
						break;
					case "A":
						s = e.getMatch(n.AttlistDecl);
						break;
					case "N":
						s = e.getMatch(n.NotationDecl);
						break;
					case "-":
						s = e.getMatch(n.Comment);
						break;
				}
				else if (e.char() === "<" && e.char(1) === "?") s = r(e, t);
				else if (e.char() === "%") s = e.getMatch(n.PEReference);
				else return t.fatalError("Error detected in Markup declaration");
				if (!s) return t.fatalError("Error in internal subset at position " + e.getIndex());
			}
			return t.fatalError("doctype internal subset is not well-formed, missing ]");
		}
	}
	function k(e, t, r, i, a) {
		var o = D(e, t);
		switch (a ? o.char(2).toUpperCase() : o.char(2)) {
			case "-":
				var s = o.getMatch(n.Comment);
				return s ? (r.comment(s, n.COMMENT_START.length, s.length - n.COMMENT_START.length - n.COMMENT_END.length), o.getIndex()) : i.fatalError("comment is not well-formed at position " + o.getIndex());
			case "[":
				var c = o.getMatch(n.CDSect);
				return c ? !a && !r.currentElement ? i.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(c, n.CDATA_START.length, c.length - n.CDATA_START.length - n.CDATA_END.length), r.endCDATA(), o.getIndex()) : i.fatalError("Invalid CDATA starting at position " + t);
			case "D":
				if (r.doc && r.doc.documentElement) return i.fatalError("Doctype not allowed inside or after documentElement at position " + o.getIndex());
				if (a ? !o.substringStartsWithCaseInsensitive(n.DOCTYPE_DECL_START) : !o.substringStartsWith(n.DOCTYPE_DECL_START)) return i.fatalError("Expected " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				if (o.skip(n.DOCTYPE_DECL_START.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				var l = {
					name: void 0,
					publicId: void 0,
					systemId: void 0,
					internalSubset: void 0
				};
				if (l.name = o.getMatch(n.Name), !l.name) return i.fatalError("doctype name missing or contains unexpected characters at position " + o.getIndex());
				if (a && l.name.toLowerCase() !== "html" && i.warning("Unexpected DOCTYPE in HTML document at position " + o.getIndex()), o.skipBlanks(), o.substringStartsWith(n.PUBLIC) || o.substringStartsWith(n.SYSTEM)) {
					var u = n.ExternalID_match.exec(o.substringFromIndex());
					if (!u) return i.fatalError("doctype external id is not well-formed at position " + o.getIndex());
					u.groups.SystemLiteralOnly === void 0 ? (l.systemId = u.groups.SystemLiteral, l.publicId = u.groups.PubidLiteral) : l.systemId = u.groups.SystemLiteralOnly, o.skip(u[0].length);
				} else if (a && o.substringStartsWithCaseInsensitive(n.SYSTEM)) {
					if (o.skip(n.SYSTEM.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.SYSTEM + " at position " + o.getIndex());
					if (l.systemId = o.getMatch(n.ABOUT_LEGACY_COMPAT_SystemLiteral), !l.systemId) return i.fatalError("Expected " + n.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + n.SYSTEM + " at position " + o.getIndex());
				}
				return a && l.systemId && !n.ABOUT_LEGACY_COMPAT_SystemLiteral.test(l.systemId) && i.warning("Unexpected doctype.systemId in HTML document at position " + o.getIndex()), a || (o.skipBlanks(), l.internalSubset = O(o, i)), o.skipBlanks(), o.char() === ">" ? (o.skip(1), r.startDTD(l.name, l.publicId, l.systemId, l.internalSubset), r.endDTD(), o.getIndex()) : i.fatalError("doctype not terminated with > at position " + o.getIndex());
			default: return i.fatalError("Not well-formed XML starting with \"<!\" at position " + t);
		}
	}
	function A(e, t, r, i) {
		var a = e.substring(t).match(n.PI);
		if (!a) return i.fatalError("Invalid processing instruction starting at position " + t);
		if (a[1].toLowerCase() === "xml") {
			if (t > 0) return i.fatalError("processing instruction at position " + t + " is an xml declaration which is only at the start of the document");
			if (!n.XMLDecl.test(e.substring(t))) return i.fatalError("xml declaration is not well-formed");
		}
		return r.processingInstruction(a[1], a[2]), t + a[0].length;
	}
	function j() {
		this.attributeNames = Object.create(null);
	}
	j.prototype = {
		setTagName: function(e) {
			if (!n.QName_exact.test(e)) throw Error("invalid tagName:" + e);
			this.tagName = e;
		},
		addValue: function(e, t, r) {
			if (!n.QName_exact.test(e)) throw Error("invalid attribute:" + e);
			this.attributeNames[e] = this.length, this[this.length++] = {
				qName: e,
				value: t,
				offset: r
			};
		},
		length: 0,
		getLocalName: function(e) {
			return this[e].localName;
		},
		getLocator: function(e) {
			return this[e].locator;
		},
		getQName: function(e) {
			return this[e].qName;
		},
		getURI: function(e) {
			return this[e].uri;
		},
		getValue: function(e) {
			return this[e].value;
		}
	}, e.XMLReader = y, e.parseUtils = D, e.parseDoctypeCommentOrCData = k;
})), Rc = /* @__PURE__ */ k(((e) => {
	var t = Mc(), n = Fc(), r = Nc(), i = Ic(), a = Lc(), o = n.DOMImplementation, s = t.hasDefaultHTMLNamespace, c = t.isHTMLMimeType, l = t.isValidMimeType, u = t.MIME_TYPE, d = t.NAMESPACE, f = r.ParseError, p = a.XMLReader;
	function m(e) {
		return e.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
	}
	function h(e) {
		if (e ||= {}, e.locator === void 0 && (e.locator = !0), this.assign = e.assign || t.assign, this.domHandler = e.domHandler || g, this.onError = e.onError || e.errorHandler, e.errorHandler && typeof e.errorHandler != "function") throw TypeError("errorHandler object is no longer supported, switch to onError!");
		e.errorHandler && e.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = e.normalizeLineEndings || m, this.locator = !!e.locator, this.xmlns = this.assign(Object.create(null), e.xmlns);
	}
	h.prototype.parseFromString = function(e, n) {
		if (!l(n)) throw TypeError("DOMParser.parseFromString: the provided mimeType \"" + n + "\" is not valid.");
		var r = this.assign(Object.create(null), this.xmlns), a = i.XML_ENTITIES, o = r[""] || null;
		s(n) ? (a = i.HTML_ENTITIES, o = d.HTML) : n === u.XML_SVG_IMAGE && (o = d.SVG), r[""] = o, r.xml = r.xml || d.XML;
		var c = new this.domHandler({
			mimeType: n,
			defaultNamespace: o,
			onError: this.onError
		}), f = this.locator ? {} : void 0;
		this.locator && c.setDocumentLocator(f);
		var m = new p();
		return m.errorHandler = c, m.domBuilder = c, !t.isHTMLMimeType(n) && typeof e != "string" && m.errorHandler.fatalError("source is not a string"), m.parse(this.normalizeLineEndings(String(e)), r, a), c.doc.documentElement || m.errorHandler.fatalError("missing root element"), c.doc;
	};
	function g(e) {
		var t = e || {};
		this.mimeType = t.mimeType || u.XML_APPLICATION, this.defaultNamespace = t.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = t.onError;
	}
	function _(e, t) {
		t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
	}
	g.prototype = {
		startDocument: function() {
			var e = new o();
			this.doc = c(this.mimeType) ? e.createHTMLDocument(!1) : e.createDocument(this.defaultNamespace, "");
		},
		startElement: function(e, t, n, r) {
			var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
			b(this, a), this.currentElement = a, this.locator && _(this.locator, a);
			for (var s = 0; s < o; s++) {
				var e = r.getURI(s), c = r.getValue(s), n = r.getQName(s), l = i.createAttributeNS(e, n);
				this.locator && _(r.getLocator(s), l), l.value = l.nodeValue = c, a.setAttributeNode(l);
			}
		},
		endElement: function(e, t, n) {
			this.currentElement = this.currentElement.parentNode;
		},
		startPrefixMapping: function(e, t) {},
		endPrefixMapping: function(e) {},
		processingInstruction: function(e, t) {
			var n = this.doc.createProcessingInstruction(e, t);
			this.locator && _(this.locator, n), b(this, n);
		},
		ignorableWhitespace: function(e, t, n) {},
		characters: function(e, t, n) {
			if (e = y.apply(this, arguments), e) {
				if (this.cdata) var r = this.doc.createCDATASection(e);
				else var r = this.doc.createTextNode(e);
				this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && _(this.locator, r);
			}
		},
		skippedEntity: function(e) {},
		endDocument: function() {
			this.doc.normalize();
		},
		setDocumentLocator: function(e) {
			e && (e.lineNumber = 0), this.locator = e;
		},
		comment: function(e, t, n) {
			e = y.apply(this, arguments);
			var r = this.doc.createComment(e);
			this.locator && _(this.locator, r), b(this, r);
		},
		startCDATA: function() {
			this.cdata = !0;
		},
		endCDATA: function() {
			this.cdata = !1;
		},
		startDTD: function(e, t, n, r) {
			var i = this.doc.implementation;
			if (i && i.createDocumentType) {
				var a = i.createDocumentType(e, t, n, r);
				this.locator && _(this.locator, a), b(this, a), this.doc.doctype = a;
			}
		},
		reportError: function(e, t) {
			if (typeof this.onError == "function") try {
				this.onError(e, t, this);
			} catch (n) {
				throw new f("Reporting " + e + " \"" + t + "\" caused " + n, this.locator);
			}
			else console.error("[xmldom " + e + "]	" + t, v(this.locator));
		},
		warning: function(e) {
			this.reportError("warning", e);
		},
		error: function(e) {
			this.reportError("error", e);
		},
		fatalError: function(e) {
			throw this.reportError("fatalError", e), new f(e, this.locator);
		}
	};
	function v(e) {
		if (e) return "\n@#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
	}
	function y(e, t, n) {
		return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
	}
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
		g.prototype[e] = function() {
			return null;
		};
	});
	function b(e, t) {
		e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
	}
	function x(e) {
		if (e === "error") throw "onErrorStopParsing";
	}
	function S() {
		throw "onWarningStopParsing";
	}
	e.__DOMHandler = g, e.DOMParser = h, e.normalizeLineEndings = m, e.onErrorStopParsing = x, e.onWarningStopParsing = S;
})), zc = /* @__PURE__ */ k(((e) => {
	var t = Mc();
	e.assign = t.assign, e.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, e.isHTMLMimeType = t.isHTMLMimeType, e.isValidMimeType = t.isValidMimeType, e.MIME_TYPE = t.MIME_TYPE, e.NAMESPACE = t.NAMESPACE;
	var n = Nc();
	e.DOMException = n.DOMException, e.DOMExceptionName = n.DOMExceptionName, e.ExceptionCode = n.ExceptionCode, e.ParseError = n.ParseError;
	var r = Fc();
	e.Attr = r.Attr, e.CDATASection = r.CDATASection, e.CharacterData = r.CharacterData, e.Comment = r.Comment, e.Document = r.Document, e.DocumentFragment = r.DocumentFragment, e.DocumentType = r.DocumentType, e.DOMImplementation = r.DOMImplementation, e.Element = r.Element, e.Entity = r.Entity, e.EntityReference = r.EntityReference, e.LiveNodeList = r.LiveNodeList, e.NamedNodeMap = r.NamedNodeMap, e.Node = r.Node, e.NodeList = r.NodeList, e.Notation = r.Notation, e.ProcessingInstruction = r.ProcessingInstruction, e.Text = r.Text, e.XMLSerializer = r.XMLSerializer;
	var i = Rc();
	e.DOMParser = i.DOMParser, e.normalizeLineEndings = i.normalizeLineEndings, e.onErrorStopParsing = i.onErrorStopParsing, e.onWarningStopParsing = i.onWarningStopParsing;
})), Bc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		return e[e.length - 1];
	}
	function r(e) {
		return e[0];
	}
	t.exports = {
		last: n,
		first: r
	};
})), Vc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function i(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? r(Object(n), !0).forEach(function(t) {
				a(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function a(e, t, n) {
		return (t = o(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Bc(), l = c.last, u = c.first;
	function d(e) {
		this.name = "GenericError", this.message = e, this.stack = Error(e).stack;
	}
	d.prototype = Error.prototype;
	function f(e) {
		this.name = "TemplateError", this.message = e, this.stack = Error(e).stack;
	}
	f.prototype = new d();
	function p(e) {
		this.name = "RenderingError", this.message = e, this.stack = Error(e).stack;
	}
	p.prototype = new d();
	function m(e) {
		this.name = "ScopeParserError", this.message = e, this.stack = Error(e).stack;
	}
	m.prototype = new d();
	function h(e) {
		this.name = "InternalError", this.properties = { explanation: "InternalError" }, this.message = e, this.stack = Error(e).stack;
	}
	h.prototype = new d();
	function g(e) {
		this.name = "APIVersionError", this.properties = { explanation: "APIVersionError" }, this.message = e, this.stack = Error(e).stack;
	}
	g.prototype = new d();
	function _(e, t) {
		var n = new g(e);
		throw n.properties = i({ id: "api_version_error" }, t), n;
	}
	function v(e) {
		var t = Object.keys(e.files).slice(0, 10), n = "";
		n = t.length === 0 ? "Empty zip file" : `Zip file contains : ${t.join(",")}`;
		var r = new h(`The filetype for this file could not be identified, is this file corrupted ? ${n}`);
		throw r.properties = {
			id: "filetype_not_identified",
			explanation: `The filetype for this file could not be identified, is this file corrupted ? ${n}`
		}, r;
	}
	function y(e) {
		var t = new h(`The filetype "${e}" is not handled by Docxtemplater`);
		throw t.properties = {
			id: "filetype_not_handled",
			explanation: `The file you are trying to generate is of type "${e}", but only docx and pptx formats are handled`,
			fileType: e
		}, t;
	}
	function b(e) {
		var t = new f("Multi error");
		throw t.properties = {
			errors: e,
			id: "multi_error",
			explanation: "The template has multiple errors"
		}, t;
	}
	function x(e) {
		var t = new f("Unopened tag");
		return t.properties = {
			xtag: l(e.xtag.split(" ")),
			id: "unopened_tag",
			context: e.xtag,
			offset: e.offset,
			lIndex: e.lIndex,
			explanation: `The tag beginning with "${e.xtag.substr(0, 30)}" is unopened`
		}, t;
	}
	function S(e) {
		var t = new f("Duplicate open tag, expected one open tag");
		return t.properties = {
			xtag: u(e.xtag.split(" ")),
			id: "duplicate_open_tag",
			context: e.xtag,
			offset: e.offset,
			lIndex: e.lIndex,
			explanation: `The tag beginning with "${e.xtag.substr(0, 30)}" has duplicate open tags`
		}, t;
	}
	function C(e) {
		var t = new f("Duplicate close tag, expected one close tag");
		return t.properties = {
			xtag: u(e.xtag.split(" ")),
			id: "duplicate_close_tag",
			context: e.xtag,
			offset: e.offset,
			lIndex: e.lIndex,
			explanation: `The tag ending with "${e.xtag.substr(0, 30)}" has duplicate close tags`
		}, t;
	}
	function w(e) {
		var t = new f("Unclosed tag");
		return t.properties = {
			xtag: u(e.xtag.split(" ")).substr(1),
			id: "unclosed_tag",
			context: e.xtag,
			offset: e.offset,
			lIndex: e.lIndex,
			explanation: `The tag beginning with "${e.xtag.substr(0, 30)}" is unclosed`
		}, t;
	}
	function T(e) {
		e.position === "left" ? E(e) : D(e);
	}
	function E(e) {
		var t = new f(`No tag "${e.element}" was found at the ${e.position}`), n = e.parsed[e.index];
		throw t.properties = {
			id: "no_xml_tag_found_at_left",
			explanation: `No tag "${e.element}" was found at the left`,
			offset: n.offset,
			part: n,
			parsed: e.parsed,
			index: e.index,
			element: e.element
		}, t;
	}
	function D(e) {
		var t = new f(`No tag "${e.element}" was found at the ${e.position}`), n = e.parsed[e.index];
		throw t.properties = {
			id: "no_xml_tag_found_at_right",
			explanation: `No tag "${e.element}" was found at the right`,
			offset: n.offset,
			part: n,
			parsed: e.parsed,
			index: e.index,
			element: e.element
		}, t;
	}
	function O(e) {
		var t = e.tag, n = e.value, r = e.offset, i = new p("There are some XML corrupt characters");
		return i.properties = {
			id: "invalid_xml_characters",
			xtag: t,
			value: n,
			offset: r,
			explanation: `There are some corrupt characters for the field "${t}"`
		}, i;
	}
	function k(e) {
		var t = e.tag, n = e.value, r = e.offset, i = e.partDelims, a = new p("Non string values are not allowed for rawXML tags");
		return a.properties = {
			id: "invalid_raw_xml_value",
			xtag: t,
			value: n,
			offset: r,
			explanation: `The value of the raw tag : "${i}" is not a string`
		}, a;
	}
	function A(e) {
		var t = e.part, n = t.value, r = t.offset, i = e.id, a = i === void 0 ? "raw_tag_outerxml_invalid" : i, o = e.message, s = o === void 0 ? "Raw tag not in paragraph" : o, c = e.part, l = e.explanation, u = l === void 0 ? `The tag "${n}" is not inside a paragraph` : l;
		typeof u == "function" && (u = u(c));
		var d = new f(s);
		throw d.properties = {
			id: a,
			explanation: u,
			rootError: e.rootError,
			xtag: n,
			offset: r,
			postparsed: e.postparsed,
			expandTo: e.expandTo,
			index: e.index
		}, d;
	}
	function j(e) {
		var t = new f("Raw tag should be the only text in paragraph"), n = e.part.value;
		throw t.properties = {
			id: "raw_xml_tag_should_be_only_text_in_paragraph",
			explanation: `The raw tag "${n}" should be the only text in this paragraph. This means that this tag should not be surrounded by any text or spaces.`,
			xtag: n,
			offset: e.part.offset,
			paragraphParts: e.paragraphParts
		}, t;
	}
	function ee(e) {
		var t = e.location, n = e.offset, r = e.square, i = t === "start" ? "unclosed" : "unopened", a = new f(`${t === "start" ? "Unclosed" : "Unopened"} loop`), o = e.value;
		return a.properties = {
			id: `${i}_loop`,
			explanation: `The loop with tag "${o}" is ${i}`,
			xtag: o,
			offset: n
		}, r && (a.properties.square = r), a;
	}
	function M(e, t) {
		var n = new f("Unbalanced loop tag");
		return n.properties = {
			id: "unbalanced_loop_tags",
			explanation: `Unbalanced loop tags {#${t[0].part.value}}{/${t[1].part.value}}{#${e[0].part.value}}{/${e[1].part.value}}`,
			offset: [t[0].part.offset, e[1].part.offset],
			lastPair: {
				left: t[0].part.value,
				right: t[1].part.value
			},
			pair: {
				left: e[0].part.value,
				right: e[1].part.value
			}
		}, n;
	}
	function N(e) {
		var t = e.tags, n = new f("Closing tag does not match opening tag");
		return n.properties = {
			id: "closing_tag_does_not_match_opening_tag",
			explanation: `The tag "${t[0].value}" is closed by the tag "${t[1].value}"`,
			openingtag: u(t).value,
			offset: [u(t).offset, l(t).offset],
			closingtag: l(t).value
		}, u(t).square && (n.properties.square = [u(t).square, l(t).square]), n;
	}
	function P(e) {
		var t = e.tag, n = e.offset, r = new f(`The position of the loop tags "${t}" would produce invalid XML`);
		return r.properties = {
			xtag: t,
			id: "loop_position_invalid",
			explanation: `The tags "${t}" are misplaced in the document, for example one of them is in a table and the other one outside the table`,
			offset: n
		}, r;
	}
	function F(e) {
		var t = e.tag, n = e.rootError, r = e.offset, i = new m("Scope parser compilation failed");
		return i.properties = {
			id: "scopeparser_compilation_failed",
			offset: r,
			xtag: t,
			explanation: `The scope parser for the tag "${t}" failed to compile`,
			rootError: n
		}, i;
	}
	function I(e) {
		var t = e.tag, n = e.scope, r = e.error, i = e.offset, a = new m("Scope parser execution failed");
		return a.properties = {
			id: "scopeparser_execution_failed",
			explanation: `The scope parser for the tag "${t}" failed to execute`,
			scope: n,
			offset: i,
			xtag: t,
			rootError: r
		}, a;
	}
	function L(e, t) {
		var n = `Unimplemented tag type "${e.type}"`;
		e.module && (n += ` "${e.module}"`);
		var r = new f(n);
		throw r.properties = {
			part: e,
			index: t,
			id: "unimplemented_tag_type"
		}, r;
	}
	function R() {
		var e = new h("Malformed xml");
		throw e.properties = {
			explanation: "The template contains malformed xml",
			id: "malformed_xml"
		}, e;
	}
	function z() {
		var e = new h("You must run `.compile()` before running `.resolveData()`");
		throw e.properties = {
			id: "resolve_before_compile",
			explanation: "You must run `.compile()` before running `.resolveData()`"
		}, e;
	}
	function B() {
		var e = new h("You should not call .render on a document that had compilation errors");
		throw e.properties = {
			id: "render_on_invalid_template",
			explanation: "You should not call .render on a document that had compilation errors"
		}, e;
	}
	function V() {
		var e = new h("You should not call .render twice on the same Docxtemplater instance");
		throw e.properties = {
			id: "render_twice",
			explanation: "You should not call .render twice on the same Docxtemplater instance"
		}, e;
	}
	function H(e, t) {
		var n = new f("An XML file has invalid xml");
		throw n.properties = {
			id: "file_has_invalid_xml",
			content: e,
			offset: t,
			explanation: "The docx contains invalid XML, it is most likely corrupt"
		}, n;
	}
	t.exports = {
		XTError: d,
		XTTemplateError: f,
		XTInternalError: h,
		XTScopeParserError: m,
		XTAPIVersionError: g,
		RenderingError: p,
		XTRenderingError: p,
		getClosingTagNotMatchOpeningTag: N,
		getLoopPositionProducesInvalidXMLError: P,
		getScopeCompilationError: F,
		getScopeParserExecutionError: I,
		getUnclosedTagException: w,
		getUnopenedTagException: x,
		getUnmatchedLoopException: ee,
		getDuplicateCloseTagException: C,
		getDuplicateOpenTagException: S,
		getCorruptCharactersException: O,
		getInvalidRawXMLValueException: k,
		getUnbalancedLoopException: M,
		throwApiVersionError: _,
		throwFileTypeNotHandled: y,
		throwFileTypeNotIdentified: v,
		throwMalformedXml: R,
		throwMultiError: b,
		throwExpandNotFound: A,
		throwRawTagShouldBeOnlyTextInParagraph: j,
		throwUnimplementedTagType: L,
		throwXmlTagNotFound: T,
		throwXmlInvalid: H,
		throwResolveBeforeCompile: z,
		throwRenderInvalidTemplate: B,
		throwRenderTwice: V
	};
})), Hc = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		return s(e) || o(e, t) || i(e, t) || r();
	}
	function r() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function i(e, t) {
		if (e) {
			if (typeof e == "string") return a(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0;
		}
	}
	function a(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function o(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function s(e) {
		if (Array.isArray(e)) return e;
	}
	var c = zc(), l = c.DOMParser, u = c.XMLSerializer, d = Vc().throwXmlTagNotFound, f = Bc(), p = f.last, m = f.first, h = Object.prototype.hasOwnProperty, g = Function.prototype.bind, _ = Function.prototype.call, v = _.bind(_, g)(_, _, h);
	function y(e) {
		return /^[ \n\r\t]+$/.test(e);
	}
	function b(e) {
		return { get: function(t) {
			return e === "." ? t : t && (v(t, e) ? t[e] : void 0);
		} };
	}
	function x(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			n.message && console.warn("Warning : " + n.message);
		}
	}
	var S = {};
	function C(e, t, n) {
		var r;
		if (S[t] ? r = S[t] : (r = RegExp(`(<.* ${t}=")([^"]*)(".*)\$`), S[t] = r), r.test(e)) return e.replace(r, `\$1${n}\$3`);
		var i = e.lastIndexOf("/>");
		return i === -1 && (i = e.lastIndexOf(">")), e.substr(0, i) + ` ${t}="${n}"` + e.substr(i);
	}
	function w(e, t) {
		var n = e.indexOf(` ${t}="`);
		if (n === -1) return null;
		var r = e.substr(n).search(/["']/) + n, i = e.substr(r + 1).search(/["']/) + r;
		return e.substr(r + 1, i - r);
	}
	function T(e, t) {
		return e.indexOf(t, e.length - t.length) !== -1;
	}
	function E(e, t) {
		return e.substring(0, t.length) === t;
	}
	function D(e) {
		for (var t = [], n = {}, r = [], i = 0, a = e.length; i < a; ++i) n[e[i]] ? t.push(e[i]) : (n[e[i]] = !0, r.push(e[i]));
		return t;
	}
	function O(e) {
		for (var t = {}, n = [], r = 0, i = e.length; r < i; ++r) t[e[r]] || (t[e[r]] = !0, n.push(e[r]));
		return n;
	}
	function k(e, t) {
		for (var n = [[]], r = 0; r < e.length; r++) {
			var i = e[r], a = n[n.length - 1], o = t(i);
			o === "start" ? n.push([i]) : o === "end" ? (a.push(i), n.push([])) : a.push(i);
		}
		for (var s = [], c = 0; c < n.length; c++) {
			var l = n[c];
			l.length > 0 && s.push(l);
		}
		return s;
	}
	function A() {
		return {
			errorLogging: "json",
			stripInvalidXMLChars: !1,
			paragraphLoop: !1,
			nullGetter: function(e) {
				return e.module ? "" : "undefined";
			},
			xmlFileNames: ["[Content_Types].xml"],
			parser: b,
			warnFn: x,
			linebreaks: !1,
			fileTypeConfig: null,
			delimiters: {
				start: "{",
				end: "}"
			},
			syntax: {
				changeDelimiterPrefix: "=",
				preserveNewlinesInTags: !1,
				allowUnopenedTag: !1,
				allowUnclosedTag: !1,
				allowUnbalancedLoops: !1
			}
		};
	}
	function j(e) {
		return new u().serializeToString(e).replace(/xmlns(:[a-z0-9]+)?="" ?/g, "");
	}
	function ee(e) {
		return e.charCodeAt(0) === 65279 && (e = e.substr(1)), new l().parseFromString(e, "text/xml");
	}
	var M = [
		["&", "&amp;"],
		["<", "&lt;"],
		[">", "&gt;"],
		["\"", "&quot;"],
		["'", "&apos;"]
	], N = M.map(function(e) {
		var t = n(e, 2), r = t[0], i = t[1];
		return {
			rstart: new RegExp(i, "g"),
			rend: new RegExp(r, "g"),
			start: i,
			end: r
		};
	});
	function P(e) {
		for (var t = N.length - 1; t >= 0; t--) {
			var n = N[t];
			e = e.replace(n.rstart, n.end);
		}
		return e;
	}
	function F(e) {
		var t;
		e = (t = e) != null && t.toString ? e.toString() : "";
		for (var n, r = 0, i = N.length; r < i; r++) n = N[r], e = e.replace(n.rend, n.start);
		return e;
	}
	function I(e) {
		for (var t = [], n = 0; n < e.length; n++) for (var r = e[n], i = 0; i < r.length; i++) {
			var a = r[i];
			t.push(a);
		}
		return t;
	}
	function L(e, t) {
		if (!t) return e;
		for (var n = 0, r = t.length; n < r; n++) e.push(t[n]);
		return e;
	}
	var R = /* @__PURE__ */ RegExp("\xA0", "g");
	function z(e) {
		return e.replace(R, " ");
	}
	function B(e, t) {
		for (var n = [], r; (r = e.exec(t)) != null;) n.push({
			array: r,
			offset: r.index
		});
		return n;
	}
	function V(e, t) {
		return e === "</" + t + ">";
	}
	function H(e, t) {
		return e.indexOf("<" + t) === 0 && [
			">",
			" ",
			"/"
		].indexOf(e[t.length + 1]) !== -1;
	}
	function te(e, t, n) {
		var r = U(e, t, n);
		if (r !== null) return r;
		d({
			position: "right",
			element: t,
			parsed: e,
			index: n
		});
	}
	function U(e, t, n) {
		typeof t == "string" && (t = [t]);
		for (var r = 1, i = n, a = e.length; i < a; i++) for (var o = e[i], s = 0, c = t; s < c.length; s++) {
			var l = c[s];
			if (V(o.value, l) && r--, H(o.value, l) && r++, r === 0) return i;
		}
		return null;
	}
	function ne(e, t, n) {
		var r = re(e, t, n);
		if (r !== null) return r;
		d({
			position: "left",
			element: t,
			parsed: e,
			index: n
		});
	}
	function re(e, t, n) {
		typeof t == "string" && (t = [t]);
		for (var r = 1, i = n; i >= 0; i--) for (var a = e[i], o = 0, s = t; o < s.length; o++) {
			var c = s[o];
			if (H(a.value, c) && r--, V(a.value, c) && r++, r === 0) return i;
		}
		return null;
	}
	function ie(e, t) {
		var n = t.type, r = t.tag, i = t.position;
		return n === "tag" && r === e && (i === "start" || i === "selfclosing");
	}
	function W(e, t) {
		var n = t.type, r = t.tag, i = t.position;
		return n === "tag" && r === e && i === "end";
	}
	function ae(e) {
		var t = e.type, n = e.tag, r = e.position;
		return [
			"w:p",
			"a:p",
			"text:p"
		].indexOf(n) !== -1 && t === "tag" && r === "start";
	}
	function oe(e) {
		var t = e.type, n = e.tag, r = e.position;
		return [
			"w:p",
			"a:p",
			"text:p"
		].indexOf(n) !== -1 && t === "tag" && r === "end";
	}
	function G(e) {
		var t = e.type, n = e.tag, r = e.position;
		return ["w:br", "a:br"].indexOf(n) !== -1 && t === "tag" && (r === "start" || r === "selfclosing");
	}
	function se(e) {
		var t = e.type, n = e.position;
		return e.text && t === "tag" && n === "start";
	}
	function ce(e) {
		var t = e.type, n = e.position;
		return e.text && t === "tag" && n === "end";
	}
	function le(e) {
		var t = e.type, n = e.position;
		return t === "placeholder" || t === "content" && n === "insidetag";
	}
	function ue(e, t) {
		var n = e.module, r = e.type;
		return t instanceof Array || (t = [t]), r === "placeholder" && t.indexOf(n) !== -1;
	}
	var K = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
	function q(e) {
		return K.lastIndex = 0, K.test(e);
	}
	function de(e) {
		return typeof e != "string" && (e = String(e)), e.replace(K, "");
	}
	function fe(e) {
		var t = {};
		for (var n in e) {
			var r = e[n];
			t[r] || (t[r] = []), t[r].push(n);
		}
		return t;
	}
	function pe(e, t) {
		for (var n = [], r = 0; r < e.length; r++) n.push({
			item: e[r],
			index: r
		});
		n.sort(function(e, n) {
			return t(e.item, n.item) || e.index - n.index;
		});
		for (var i = [], a = 0; a < n.length; a++) i.push(n[a].item);
		return i;
	}
	function me(e, t) {
		return t.delimiters.start + e.raw + t.delimiters.end;
	}
	t.exports = {
		getPartWithDelimiters: me,
		endsWith: T,
		startsWith: E,
		isContent: le,
		isParagraphStart: ae,
		isParagraphEnd: oe,
		isBreakTag: G,
		isTagStart: ie,
		isTagEnd: W,
		isTextStart: se,
		isTextEnd: ce,
		isStarting: H,
		isEnding: V,
		isModule: ue,
		uniq: O,
		getDuplicates: D,
		chunkBy: k,
		last: p,
		first: m,
		xml2str: j,
		str2xml: ee,
		getRightOrNull: U,
		getRight: te,
		getLeftOrNull: re,
		getLeft: ne,
		pregMatchAll: B,
		convertSpaces: z,
		charMapRegexes: N,
		hasCorruptCharacters: q,
		removeCorruptCharacters: de,
		getDefaults: A,
		wordToUtf8: P,
		utf8ToWord: F,
		concatArrays: I,
		pushArray: L,
		invertMap: fe,
		charMap: M,
		getSingleAttribute: w,
		setSingleAttribute: C,
		isWhiteSpace: y,
		stableSort: pe
	};
})), Uc = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		return s(e) || o(e, t) || i(e, t) || r();
	}
	function r() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function i(e, t) {
		if (e) {
			if (typeof e == "string") return a(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0;
		}
	}
	function a(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function o(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function s(e) {
		if (Array.isArray(e)) return e;
	}
	function c(e) {
		"@babel/helpers - typeof";
		return c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, c(e);
	}
	function l(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function u(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, f(r.key), r);
		}
	}
	function d(e, t, n) {
		return t && u(e.prototype, t), n && u(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function f(e) {
		var t = p(e, "string");
		return c(t) == "symbol" ? t : t + "";
	}
	function p(e, t) {
		if (c(e) != "object" || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (n !== void 0) {
			var r = n.call(e, t || "default");
			if (c(r) != "object") return r;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	t.exports = /* @__PURE__ */ function() {
		function e() {
			l(this, e);
		}
		return d(e, null, [
			{
				key: "createSchema",
				value: function(t) {
					return {
						validate: t,
						optional: function() {
							return e.createSchema(function(e) {
								return e === void 0 ? {
									success: !0,
									value: e
								} : t(e);
							});
						},
						nullable: function() {
							return e.createSchema(function(e) {
								return e == null ? {
									success: !0,
									value: e
								} : t(e);
							});
						}
					};
				}
			},
			{
				key: "string",
				value: function() {
					return e.createSchema(function(e) {
						return typeof e == "string" ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected string, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "date",
				value: function() {
					return e.createSchema(function(e) {
						return e instanceof Date ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected date, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "boolean",
				value: function() {
					return e.createSchema(function(e) {
						return typeof e == "boolean" ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected boolean, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "number",
				value: function() {
					return e.createSchema(function(e) {
						return typeof e == "number" ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected number, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "function",
				value: function() {
					return e.createSchema(function(e) {
						return typeof e == "function" ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected function, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "array",
				value: function(t) {
					return e.createSchema(function(e) {
						if (!Array.isArray(e)) return {
							success: !1,
							error: `Expected array, received ${c(e)}`
						};
						for (var n = 0; n < e.length; n++) {
							var r = t.validate(e[n]);
							if (!r.success) return {
								success: !1,
								error: `${r.error} at index ${n}`
							};
						}
						return {
							success: !0,
							value: e
						};
					});
				}
			},
			{
				key: "any",
				value: function() {
					return e.createSchema(function(e) {
						return {
							success: !0,
							value: e
						};
					});
				}
			},
			{
				key: "isRegex",
				value: function() {
					return e.createSchema(function(e) {
						return e instanceof RegExp ? {
							success: !0,
							value: e
						} : {
							success: !1,
							error: `Expected RegExp, received ${c(e)}`
						};
					});
				}
			},
			{
				key: "union",
				value: function(t) {
					return e.createSchema(function(e) {
						for (var n = 0; n < t.length; n++) {
							var r = t[n].validate(e);
							if (r.success) return r;
						}
						return {
							success: !1,
							error: `Value ${e} does not match any schema in union`
						};
					});
				}
			},
			{
				key: "object",
				value: function(t) {
					var r = e.createSchema(function(e) {
						if (e == null) return {
							success: !1,
							error: `Expected object, received ${e}`
						};
						if (c(e) !== "object") return {
							success: !1,
							error: `Expected object, received ${c(e)}`
						};
						for (var r = 0, i = Object.entries(t); r < i.length; r++) {
							var a = n(i[r], 2), o = a[0], s = a[1].validate(e[o]);
							if (!s.success) return {
								success: !1,
								error: `${s.error} at ${o}`
							};
						}
						return {
							success: !0,
							value: e
						};
					});
					return r.strict = function() {
						return e.createSchema(function(e) {
							var n = r.validate(e);
							if (!n.success) return n;
							var i = Object.keys(e).filter(function(e) {
								return !(e in t);
							});
							return i.length > 0 ? {
								success: !1,
								error: `Unexpected properties: ${i.join(", ")}`
							} : n;
						});
					}, r;
				}
			},
			{
				key: "record",
				value: function(t) {
					return e.createSchema(function(e) {
						if (e === null) return {
							success: !1,
							error: "Expected object, received null"
						};
						if (c(e) !== "object") return {
							success: !1,
							error: `Expected object, received ${c(e)}`
						};
						for (var n = 0, r = Object.keys(e); n < r.length; n++) {
							var i = r[n];
							if (typeof i != "string") return {
								success: !1,
								error: `Expected string key, received ${c(i)} at ${i}`
							};
							var a = t.validate(e[i]);
							if (!a.success) return {
								success: !1,
								error: `${a.error} at key ${i}`
							};
						}
						return {
							success: !0,
							value: e
						};
					});
				}
			}
		]);
	}();
})), Wc = /* @__PURE__ */ k(((e, t) => {
	var n = Hc().str2xml, r = "_rels/.rels";
	function i(e) {
		for (var t = e.files[r], i = t ? n(t.asText()) : null, a = i ? i.getElementsByTagName("Relationship") : [], o = {}, s = 0; s < a.length; s++) {
			var c = a[s];
			o[c.getAttribute("Target")] = c.getAttribute("Type");
		}
		return o;
	}
	t.exports = { getRelsTypes: i };
})), Gc = /* @__PURE__ */ k(((e, t) => {
	var n = Hc().str2xml, r = "[Content_Types].xml";
	function i(e, t, n) {
		for (var i = {}, a = 0; a < e.length; a++) {
			var o = e[a], s = o.getAttribute("ContentType"), c = o.getAttribute("PartName").substr(1);
			i[c] = s;
		}
		return n.file(/./).map(function(e) {
			for (var n = e.name, a = 0; a < t.length; a++) {
				var o = t[a], s = o.getAttribute("ContentType"), c = o.getAttribute("Extension");
				n.slice(n.length - c.length) === c && !i[n] && n !== r && (i[n] = s);
			}
			i[n] || (i[n] = "");
		}), i;
	}
	function a(e) {
		var t = e.files[r], i = t ? n(t.asText()) : null;
		return {
			overrides: i ? i.getElementsByTagName("Override") : null,
			defaults: i ? i.getElementsByTagName("Default") : null,
			contentTypes: t,
			contentTypeXml: i
		};
	}
	t.exports = {
		collectContentTypes: i,
		getContentTypes: a
	};
})), Kc = /* @__PURE__ */ k(((e, t) => {
	var n = Vc().XTInternalError;
	function r() {}
	function i(e) {
		return e;
	}
	t.exports = function(e) {
		var t = {
			on: r,
			set: r,
			getFileType: r,
			optionsTransformer: i,
			preparse: i,
			matchers: function() {
				return [];
			},
			parse: r,
			getTraits: r,
			postparse: i,
			errorsTransformer: i,
			preResolve: r,
			resolve: r,
			getRenderedMap: i,
			render: r,
			nullGetter: r,
			postrender: i
		};
		if (Object.keys(t).every(function(t) {
			return !e[t];
		})) {
			var a = new n("This module cannot be wrapped, because it doesn't define any of the necessary functions");
			throw a.properties = {
				id: "module_cannot_be_wrapped",
				explanation: "This module cannot be wrapped, because it doesn't define any of the necessary functions"
			}, a;
		}
		for (var o in t) e[o] || (e[o] = t[o]);
		return e;
	};
})), qc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e) {
		return o(e) || a(e) || l(e) || i();
	}
	function i() {
		throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function a(e) {
		if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
	}
	function o(e) {
		if (Array.isArray(e)) return u(e);
	}
	function s(e, t) {
		return f(e) || d(e, t) || l(e, t) || c();
	}
	function c() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function l(e, t) {
		if (e) {
			if (typeof e == "string") return u(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0;
		}
	}
	function u(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function d(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function f(e) {
		if (Array.isArray(e)) return e;
	}
	function p(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function m(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? p(Object(n), !0).forEach(function(t) {
				h(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function h(e, t, n) {
		return (t = g(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function g(e) {
		var t = _(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function _(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var v = Hc(), y = v.getRightOrNull, b = v.getRight, x = v.getLeft, S = v.getLeftOrNull, C = v.chunkBy, w = v.isTagStart, T = v.isTagEnd, E = v.isContent, D = v.last, O = v.first, k = Vc(), A = k.XTTemplateError, j = k.throwExpandNotFound, ee = k.getLoopPositionProducesInvalidXMLError;
	function M(e, t) {
		return e.length !== 0 && D(e).substr(1).indexOf(t) === 0;
	}
	function N(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n], i = r.position, a = r.value, o = r.tag;
			o && (i === "end" ? M(t, o) ? t.pop() : t.push(a) : i === "start" && t.push(a));
		}
		return t;
	}
	function P(e, t) {
		for (var n = 0; n < t.length; n++) if (t[n].indexOf(`<${e}`) === 0) return !0;
		return !1;
	}
	function F(e, t, n) {
		for (var r = N(e.slice(t[0].offset, t[1].offset)), i = function() {
			var i = n[o], a = i.contains, s = i.expand, c = i.onlyTextInTag;
			if (P(a, r)) {
				if (c) {
					var l = S(e, a, t[0].offset), u = y(e, a, t[1].offset);
					if (l === null || u === null) return 0;
					var d = C(e.slice(l, u), function(e) {
						return w(a, e) ? "start" : T(a, e) ? "end" : null;
					}), f = O(d), p = D(d), m = f.filter(E), h = p.filter(E);
					if (m.length !== 1 || h.length !== 1) return 0;
				}
				for (var g = I(r), _ = 0, v = 0; v < g.length; v++) {
					var b = g[v], x = b.tag, k = b.position;
					x === s && (k === "start" && _++, k === "end" && _--);
				}
				return _ === 0 ? { v: { value: s } } : { v: { error: ee({
					tag: O(t).part.value,
					offset: [O(t).part.offset, D(t).part.offset]
				}) } };
			}
		}, a, o = 0; o < n.length; o++) if (a = i(), a !== 0 && a) return a.v;
		return R(r) ? {} : { error: ee({
			tag: O(t).part.value,
			offset: [O(t).part.offset, D(t).part.offset]
		}) };
	}
	function I(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n], i = L(r), a = /^\s*<\//.test(r) ? "end" : "start";
			t.push({
				tag: i,
				position: a
			});
		}
		return t;
	}
	function L(e) {
		return e.replace(/^\s*<\/?([a-zA-Z:]+).*/, "$1");
	}
	function R(e) {
		if (e.length % 2 == 1) return !1;
		for (var t = 0, n = e.length / 2; t < n; t++) {
			var r = e[t], i = e[e.length - t - 1];
			if (L(r) !== L(i)) return !1;
		}
		return !0;
	}
	function z(e, t, n, r) {
		var i = e.expandTo || r.expandTo;
		if (i) {
			var a, o;
			try {
				o = x(n, i, t), a = b(n, i, t);
			} catch (a) {
				var s = m({
					part: e,
					rootError: a,
					postparsed: n,
					expandTo: i,
					index: t
				}, r.error);
				if (r.onError && r.onError(s) === "ignore") return;
				j(s);
			}
			return [o, a];
		}
	}
	function B(e, t, n, r) {
		var i = s(e, 2), a = i[0], o = i[1], c = n.indexOf(t), l = n.slice(a, c), u = n.slice(c + 1, o + 1), d = r.getInner({
			postparse: r.postparse,
			index: c,
			part: t,
			leftParts: l,
			rightParts: u,
			left: a,
			right: o,
			postparsed: n
		});
		return d.length || (d.expanded = [l, u], d = [d]), {
			left: a,
			right: o,
			inner: d
		};
	}
	function V(e, t) {
		var n = [];
		e.errors && (n = e.errors, e = e.postparsed);
		for (var i = [], a = 0, o = e.length; a < o; a++) {
			var c = e[a];
			if (c.type === "placeholder" && c.module === t.moduleName && !c.subparsed && !c.expanded) try {
				var l = z(c, a, e, t);
				if (!l) continue;
				var u = s(l, 2), d = u[0], f = u[1];
				i.push({
					left: d,
					right: f,
					part: c,
					i: a,
					leftPart: e[d],
					rightPart: e[f]
				});
			} catch (e) {
				n.push(e);
			}
		}
		i.sort(function(e, t) {
			return e.left === t.left ? t.part.lIndex < e.part.lIndex ? 1 : -1 : t.left < e.left ? 1 : -1;
		});
		for (var p = -1, h = 0, g = 0, _ = i.length; g < _; g++) {
			var v, y = i[g];
			if (p = Math.max(p, g > 0 ? i[g - 1].right : 0), !(y.left < p)) {
				var b = void 0;
				try {
					b = B([y.left + h, y.right + h], y.part, e, t);
				} catch (r) {
					if (t.onError && t.onError(m({
						part: y.part,
						rootError: r,
						postparsed: e,
						expandOne: B
					}, t.errors)) === "ignore") continue;
					if (r instanceof A) n.push(r);
					else throw r;
				}
				b && (h += b.inner.length - (b.right + 1 - b.left), (v = e).splice.apply(v, [b.left, b.right + 1 - b.left].concat(r(b.inner))));
			}
		}
		return {
			postparsed: e,
			errors: n
		};
	}
	t.exports = {
		expandToOne: V,
		getExpandToDefault: F
	};
})), Jc = /* @__PURE__ */ k(((e, t) => {
	var n = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", r = "application/vnd.ms-word.document.macroEnabled.main+xml", i = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml", a = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml", o = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", s = "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", c = "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", l = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", u = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml", d = "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml", f = "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml", p = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml", m = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", h = "application/vnd.ms-excel.sheet.macroEnabled.main+xml", g = "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", _ = [
		n,
		r,
		i,
		a
	];
	t.exports = {
		main: _,
		docx: [o].concat(_, [
			l,
			s,
			c
		]),
		pptx: [
			u,
			d,
			f,
			p
		],
		xlsx: [
			m,
			h,
			g
		]
	};
})), Yc = /* @__PURE__ */ k(((e, t) => {
	t.exports = {
		settingsContentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml",
		coreContentType: "application/vnd.openxmlformats-package.core-properties+xml",
		appContentType: "application/vnd.openxmlformats-officedocument.extended-properties+xml",
		customContentType: "application/vnd.openxmlformats-officedocument.custom-properties+xml",
		diagramDataContentType: "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml",
		diagramDrawingContentType: "application/vnd.ms-office.drawingml.diagramDrawing+xml"
	};
})), Xc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Hc().pushArray, l = Kc(), u = Jc(), d = Yc(), f = [
		d.settingsContentType,
		d.coreContentType,
		d.appContentType,
		d.customContentType,
		d.diagramDataContentType,
		d.diagramDrawingContentType
	], p = /*#__PURE__*/ function() {
		function e() {
			r(this, e), this.name = "Common";
		}
		return a(e, [{
			key: "getFileType",
			value: function(e) {
				var t = e.doc, n = t.invertedContentTypes;
				if (n) {
					for (var r = 0; r < f.length; r++) {
						var i = f[r];
						n[i] && c(t.targets, n[i]);
					}
					for (var a = [
						"docx",
						"pptx",
						"xlsx"
					], o, s = 0; s < a.length; s++) for (var l = a[s], d = u[l], p = 0; p < d.length; p++) {
						var m = d[p];
						if (n[m]) for (var h = 0, g = n[m]; h < g.length; h++) {
							var _ = g[h];
							t.relsTypes[_] && ["http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"].indexOf(t.relsTypes[_]) === -1 || (o = l, (u.main.indexOf(m) !== -1 || m === u.pptx[0]) && (t.textTarget ||= _), o !== "xlsx" && t.targets.push(_));
						}
					}
					return o;
				}
			}
		}]);
	}();
	t.exports = function() {
		return l(new p());
	};
})), Zc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Vc().getScopeParserExecutionError, l = Bc().last, u = Hc().concatArrays;
	function d(e, t) {
		for (var n = e.length >>> 0, r, i = 0; i < n; i++) if (r = e[i], t.call(this, r, i, e)) return r;
	}
	function f(e, t, n) {
		var r = this, i = this.scopeList[n], a = this.scopeList[this.scopeList.length - 1];
		if (this.root.finishedResolving) {
			for (var o = this.resolved, s = function() {
				var e = r.scopeLindex[l];
				o = d(o, function(t) {
					return t.lIndex === e;
				}), o = o.value[r.scopePathItem[l]];
			}, l = this.resolveOffset, u = this.scopePath.length; l < u; l++) s();
			return d(o, function(e) {
				return t.part.lIndex === e.lIndex;
			}).value;
		}
		var p, m = !this.cachedParsers || !t.part ? this.parser(e, {
			tag: t.part,
			scopePath: this.scopePath
		}) : this.cachedParsers[t.part.lIndex] ? this.cachedParsers[t.part.lIndex] : this.cachedParsers[t.part.lIndex] = this.parser(e, {
			tag: t.part,
			scopePath: this.scopePath
		});
		try {
			p = m.get(i, this.getContext(t, n));
		} catch (n) {
			throw c({
				tag: e,
				scope: i,
				error: n,
				offset: t.part.offset
			});
		}
		if (p == null && n > 0) return f.call(this, e, t, n - 1);
		if (typeof p == "function") try {
			p = p(a, this);
		} catch (n) {
			throw c({
				tag: e,
				scope: i,
				error: n,
				offset: t.part.offset
			});
		}
		return p;
	}
	function p(e, t, n) {
		var r = this, i = this.scopeList[n], a = this.scopeList[this.scopeList.length - 1], o = !this.cachedParsers || !t.part ? this.parser(e, {
			tag: t.part,
			scopePath: this.scopePath
		}) : this.cachedParsers[t.part.lIndex] ? this.cachedParsers[t.part.lIndex] : this.cachedParsers[t.part.lIndex] = this.parser(e, {
			tag: t.part,
			scopePath: this.scopePath
		});
		return Promise.resolve().then(function() {
			return o.get(i, r.getContext(t, n));
		}).catch(function(n) {
			throw c({
				tag: e,
				scope: i,
				error: n,
				offset: t.part.offset
			});
		}).then(function(i) {
			return i == null && n > 0 ? p.call(r, e, t, n - 1) : i;
		}).then(function(n) {
			if (typeof n == "function") try {
				n = n(a, r);
			} catch (n) {
				throw c({
					tag: e,
					scope: i,
					error: n,
					offset: t.part.offset
				});
			}
			return n;
		});
	}
	var m = /*#__PURE__*/ function() {
		function e(t) {
			r(this, e), this.root = t.root || this, this.resolveOffset = t.resolveOffset || 0, this.scopePath = t.scopePath, this.scopePathItem = t.scopePathItem, this.scopePathLength = t.scopePathLength, this.scopeList = t.scopeList, this.scopeType = "", this.scopeTypes = t.scopeTypes, this.scopeLindex = t.scopeLindex, this.parser = t.parser, this.resolved = t.resolved, this.cachedParsers = t.cachedParsers;
		}
		return a(e, [
			{
				key: "loopOver",
				value: function(e, t, n, r) {
					return this.loopOverValue(this.getValue(e, r), t, n);
				}
			},
			{
				key: "functorIfInverted",
				value: function(e, t, n, r, i) {
					return e && t(n, r, i), e;
				}
			},
			{
				key: "isValueFalsy",
				value: function(e, t) {
					return e == null || !e || t === "[object Array]" && e.length === 0;
				}
			},
			{
				key: "loopOverValue",
				value: function(e, t, n) {
					this.root.finishedResolving && (n = !1);
					var r = Object.prototype.toString.call(e);
					if (this.isValueFalsy(e, r)) return this.scopeType = !1, this.functorIfInverted(n, t, l(this.scopeList), 0, 1);
					if (r === "[object Array]") {
						this.scopeType = "array";
						for (var i = 0; i < e.length; i++) this.functorIfInverted(!n, t, e[i], i, e.length);
						return !0;
					}
					return r === "[object Object]" ? (this.scopeType = "object", this.functorIfInverted(!n, t, e, 0, 1)) : this.functorIfInverted(!n, t, l(this.scopeList), 0, 1);
				}
			},
			{
				key: "getValue",
				value: function(e, t) {
					return f.call(this, e, t, this.scopeList.length - 1);
				}
			},
			{
				key: "getValueAsync",
				value: function(e, t) {
					return p.call(this, e, t, this.scopeList.length - 1);
				}
			},
			{
				key: "getContext",
				value: function(e, t) {
					return {
						num: t,
						meta: e,
						scopeList: this.scopeList,
						resolved: this.resolved,
						scopePath: this.scopePath,
						scopeTypes: this.scopeTypes,
						scopePathItem: this.scopePathItem,
						scopePathLength: this.scopePathLength
					};
				}
			},
			{
				key: "createSubScopeManager",
				value: function(t, n, r, i, a) {
					return new e({
						root: this.root,
						resolveOffset: this.resolveOffset,
						resolved: this.resolved,
						parser: this.parser,
						cachedParsers: this.cachedParsers,
						scopeTypes: u([this.scopeTypes, [this.scopeType]]),
						scopeList: u([this.scopeList, [t]]),
						scopePath: u([this.scopePath, [n]]),
						scopePathItem: u([this.scopePathItem, [r]]),
						scopePathLength: u([this.scopePathLength, [a]]),
						scopeLindex: u([this.scopeLindex, [i.lIndex]])
					});
				}
			}
		]);
	}();
	t.exports = function(e) {
		return e.scopePath = [], e.scopePathItem = [], e.scopePathLength = [], e.scopeTypes = [], e.scopeLindex = [], e.scopeList = [e.tags], new m(e);
	};
})), Qc = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		return c(e) || s(e, t) || a(e, t) || i();
	}
	function i() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function a(e, t) {
		if (e) {
			if (typeof e == "string") return o(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
		}
	}
	function o(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function s(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function c(e) {
		if (Array.isArray(e)) return e;
	}
	function l(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function u(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? l(Object(n), !0).forEach(function(t) {
				d(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function d(e, t, n) {
		return (t = f(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function f(e) {
		var t = p(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function p(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var m = Vc(), h = m.getUnclosedTagException, g = m.getUnopenedTagException, _ = m.getDuplicateOpenTagException, v = m.getDuplicateCloseTagException, y = m.throwMalformedXml, b = m.throwXmlInvalid, x = m.XTTemplateError, S = Hc(), C = S.isTextStart, w = S.isTextEnd, T = S.wordToUtf8, E = S.pushArray, D = 0, O = 1, k = 2, A = 3;
	function j(e, t) {
		return e[0] <= t.offset && t.offset < e[1];
	}
	function ee(e, t) {
		return C(e) ? (t && y(), !0) : w(e) ? (t || y(), !1) : t;
	}
	function M(e) {
		var t = "", n = 1, r = e.indexOf(" ");
		return e[e.length - 2] === "/" ? (t = "selfclosing", r === -1 && (r = e.length - 2)) : e[1] === "/" ? (n = 2, t = "end", r === -1 && (r = e.length - 1)) : (t = "start", r === -1 && (r = e.length - 1)), {
			tag: e.slice(n, r),
			position: t
		};
	}
	function N(e, t, n) {
		for (var r = 0, i = e.length, a = {}, o = 0; o < t.length; o++) {
			var s = t[o];
			a[s] = !0;
		}
		for (var c = 0; c < n.length; c++) {
			var l = n[c];
			a[l] = !1;
		}
		for (var u = []; r < i && (r = e.indexOf("<", r), r !== -1);) {
			var d = r, f = e.indexOf("<", r + 1);
			r = e.indexOf(">", r), (r === -1 || f !== -1 && r > f) && b(e, d);
			var p = e.slice(d, r + 1), m = M(p), h = m.tag, g = m.position, _ = a[h];
			_ != null && u.push({
				type: "tag",
				position: g,
				text: _,
				offset: d,
				value: p,
				tag: h
			});
		}
		return u;
	}
	function P(e, t, n) {
		var r = [], i = !1, a = { offset: 0 }, o, s = e.reduce(function(e, s) {
			var c = s.position, l = s.offset, d = a.offset, f = a.length;
			if (o = t.substr(d, l - d), i && c === "start") {
				if (d + f === l && (o = t.substr(d, l - d + f + 4), !n.allowUnclosedTag)) return r.push(_({
					xtag: o,
					offset: d
				})), a = s, e.push(u(u({}, s), {}, { error: !0 })), e;
				n.allowUnclosedTag || r.push(h({
					xtag: T(o),
					offset: d
				})), e.pop();
			}
			return !i && c === "end" ? n.allowUnopenedTag ? e : d + f === l ? (o = t.substr(d - 4, l - d + f + 4), r.push(v({
				xtag: o,
				offset: d
			})), a = s, e.push(u(u({}, s), {}, { error: !0 })), e) : (r.push(g({
				xtag: o,
				offset: l
			})), a = s, e.push(u(u({}, s), {}, { error: !0 })), e) : (i = c === "start", a = s, e.push(s), e);
		}, []);
		if (i) {
			var c = a.offset;
			o = t.substr(c, t.length - c), n.allowUnclosedTag || r.push(h({
				xtag: T(o),
				offset: c
			})), s.pop();
		}
		return {
			delimiterWithErrors: s,
			errors: r
		};
	}
	function F(e, t) {
		return e === -1 && t === -1 ? D : e === t ? O : e === -1 || t === -1 ? t < e ? k : A : e < t ? k : A;
	}
	function I(e) {
		var t = e.split(" ");
		if (t.length !== 2) {
			var n = new x("New Delimiters cannot be parsed");
			throw n.properties = {
				id: "change_delimiters_invalid",
				explanation: "Cannot parser delimiters"
			}, n;
		}
		var i = r(t, 2), a = i[0], o = i[1];
		if (a.length === 0 || o.length === 0) {
			var s = new x("New Delimiters cannot be parsed");
			throw s.properties = {
				id: "change_delimiters_invalid",
				explanation: "Cannot parser delimiters"
			}, s;
		}
		return [a, o];
	}
	function L(e, t, n) {
		var i = [], a = t.start, o = t.end, s = -1, c = !1;
		if (a == null && o == null) return [];
		for (;;) {
			var l = e.indexOf(a, s + 1), u = e.indexOf(o, s + 1), d = null, f = void 0, p = F(l, u);
			switch (p === O && (p = c ? A : k), p) {
				case D: return i;
				case A:
					c = !1, s = u, d = "end", f = o.length;
					break;
				case k:
					c = !0, s = l, d = "start", f = a.length;
					break;
			}
			if (n.changeDelimiterPrefix && p === k && e[s + a.length] === n.changeDelimiterPrefix) {
				i.push({
					offset: l,
					position: "start",
					length: a.length,
					changedelimiter: !0
				});
				var m = e.indexOf(n.changeDelimiterPrefix, s + a.length + 1), h = e.indexOf(o, m + 1);
				i.push({
					offset: h,
					position: "end",
					length: o.length,
					changedelimiter: !0
				});
				var g = r(I(e.substr(s + a.length + 1, m - s - a.length - 1)), 2);
				a = g[0], o = g[1], s = h;
				continue;
			}
			i.push({
				offset: s,
				position: d,
				length: f
			});
		}
	}
	function R(e, t, n) {
		for (var r = "", i = 0; i < e.length; i++) {
			var a = e[i];
			r += a.value;
		}
		for (var o = L(r, t, n), s = 0, c = [], l = 0; l < e.length; l++) {
			var u = e[l];
			s += u.value.length, c.push({
				offset: s - u.value.length,
				lIndex: u.lIndex
			});
		}
		for (var d = P(o, r, n), f = d.delimiterWithErrors, p = d.errors, m = 0, h = 0, g = [], _ = 0; _ < c.length; _++) {
			for (var v = c[_], y = e[_], b = v.offset, x = [b, b + y.value.length], S = y.value, C = []; h < f.length && j(x, f[h]);) C.push(f[h]), h++;
			var w = [], T = 0;
			m > 0 && (T = m, m = 0);
			for (var E = 0; E < C.length; E++) {
				var D = C[E], O = S.substr(T, D.offset - b - T);
				if (D.changedelimiter) {
					D.position === "start" ? O.length > 0 && w.push({
						type: "content",
						value: O
					}) : T = D.offset - b + D.length;
					continue;
				}
				O.length > 0 && (w.push({
					type: "content",
					value: O
				}), T += O.length);
				var k = {
					type: "delimiter",
					position: D.position,
					offset: T + b
				};
				w.push(k), T = D.offset - b + D.length;
			}
			m = T - S.length;
			var A = S.substr(T);
			A.length > 0 && w.push({
				type: "content",
				value: A
			}), g.push(w);
		}
		return {
			parsed: g,
			errors: p
		};
	}
	function z(e) {
		return e.type === "content" && e.position === "insidetag";
	}
	function B(e) {
		return e.filter(z);
	}
	function V(e, t) {
		for (var n = !1, r = 0; r < e.length; r++) {
			var i = e[r];
			n = ee(i, n), i.type === "content" && (i.position = n ? "insidetag" : "outsidetag"), t !== "text" && z(i) && (i.value = i.value.replace(/>/g, "&gt;"));
		}
	}
	t.exports = {
		parseDelimiters: R,
		parse: function(e, t, n, r) {
			V(e, r);
			for (var i = R(B(e), t, n), a = i.parsed, o = i.errors, s = [], c = 0, l = 0, u = 0; u < e.length; u++) {
				var d = e[u];
				if (z(d)) {
					for (var f = 0, p = a[c]; f < p.length; f++) {
						var m = p[f];
						m.type === "content" && (m.position = "insidetag"), m.lIndex = l++;
					}
					E(s, a[c]), c++;
				} else d.lIndex = l++, s.push(d);
			}
			return {
				errors: o,
				lexed: s
			};
		},
		xmlparse: function(e, t) {
			for (var n = N(e, t.text, t.other), r = 0, i = [], a = 0; a < n.length; a++) {
				var o = n[a];
				e.length > r && o.offset - r > 0 && i.push({
					type: "content",
					value: e.substr(r, o.offset - r)
				}), r = o.offset + o.value.length, delete o.offset, i.push(o);
			}
			return e.length > r && i.push({
				type: "content",
				value: e.substr(r)
			}), i;
		}
	};
})), $c = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		return o(e) || a(e) || i(e) || r();
	}
	function r() {
		throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function i(e, t) {
		if (e) {
			if (typeof e == "string") return s(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
		}
	}
	function a(e) {
		if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
	}
	function o(e) {
		if (Array.isArray(e)) return s(e);
	}
	function s(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function c(e) {
		return e.type === "placeholder";
	}
	function l(e) {
		var t = {}, r = [{
			items: e.filter(c),
			parents: [],
			path: []
		}];
		function i(e, t, i) {
			i.length && r.push({
				items: i,
				parents: [].concat(n(t.parents), [e]),
				path: e.dataBound !== !1 && !e.attrParsed && e.value && !e.attrParsed ? [].concat(n(t.path), [e.value]) : n(t.path)
			});
		}
		function a(e, t) {
			for (var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t.length, r = e, i = 0; i < n; i++) r = r[t[i]];
			return r;
		}
		function o(e, t) {
			for (var n = t.length, r = 0; r < t.length; r++) {
				var i = t[r];
				(typeof i.lIndex == "number" ? i.lIndex : parseInt(i.lIndex.split("-")[0], 10)) > e.lIndex && n--;
			}
			return n;
		}
		for (; r.length > 0;) for (var s = r.pop(), l = a(t, s.path), u = 0, d = s.items; u < d.length; u++) {
			var f, p, m = d[u];
			if (m.attrParsed) {
				for (var h in m.attrParsed) i(m, s, m.attrParsed[h].filter(c));
				continue;
			}
			if (m.subparsed) {
				if (m.dataBound !== !1) {
					var g, _;
					(g = l)[_ = m.value] || (g[_] = {});
				}
				i(m, s, m.subparsed.filter(c));
				continue;
			}
			if (m.cellParsed) {
				for (var v = 0, y = m.cellPostParsed; v < y.length; v++) {
					var b = y[v];
					if (b.type === "placeholder") {
						if (b.module === "pro-xml-templating/xls-module-loop") continue;
						if (b.subparsed) {
							var x, S;
							(x = l)[S = b.value] || (x[S] = {}), i(b, s, b.subparsed.filter(c));
						} else {
							var C, w, T = o(m, s.parents);
							l = a(t, s.path, T), (C = l)[w = b.value] || (C[w] = {});
						}
					}
				}
				continue;
			}
			m.dataBound !== !1 && ((f = l)[p = m.value] || (f[p] = {}));
		}
		return t;
	}
	t.exports = {
		getTags: l,
		isPlaceholder: c
	};
})), el = /* @__PURE__ */ k(((e, t) => {
	var n = Hc().pushArray;
	function r(e, t) {
		return t instanceof Error ? n(Object.getOwnPropertyNames(t), ["stack"]).reduce(function(e, n) {
			return e[n] = t[n], n === "stack" && (e[n] = t[n].toString()), e;
		}, {}) : t;
	}
	function i(e, t) {
		if (console.log(JSON.stringify({ error: e }, r, t === "json" ? 2 : null)), e.properties && e.properties.errors instanceof Array) {
			var n = e.properties.errors.map(function(e) {
				return e.properties.explanation;
			}).join("\n");
			console.log("errorMessages", n);
		}
	}
	t.exports = i;
})), tl = /* @__PURE__ */ k(((e, t) => {
	var n = Hc().pregMatchAll;
	t.exports = function(e, t) {
		var r = { content: e }, i = t.join("|");
		return r.matches = n(RegExp(`(?:(<(?:${i})[^>]*>)([^<>]*)</(?:${i})>)|(<(?:${i})[^>]*/>)`, "g"), r.content), r;
	};
})), nl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	var r = /* @__PURE__ */ RegExp("\xA0", "g");
	function i(e) {
		return e.replace(r, " ");
	}
	function a(e, t) {
		var r = n(e);
		if (r === "string") return i(t.substr(0, e.length)) === e;
		if (e instanceof RegExp) return e.test(i(t));
		if (r === "function") return !!e(t);
	}
	function o(e, t) {
		var r = n(e);
		if (r === "string") return i(t).substr(e.length);
		if (e instanceof RegExp) return i(t).match(e)[1];
		if (r === "function") return e(t);
	}
	function s(e, t) {
		var r = n(e);
		if (r === "string") return [t, i(t).substr(e.length)];
		if (e instanceof RegExp) return i(t).match(e);
		if (r === "function") return [t, e(t)];
	}
	t.exports = {
		match: a,
		getValue: o,
		getValues: s
	};
})), rl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function i(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? r(Object(n), !0).forEach(function(t) {
				a(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function a(e, t, n) {
		return (t = o(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	function c(e, t) {
		return p(e) || f(e, t) || u(e, t) || l();
	}
	function l() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function u(e, t) {
		if (e) {
			if (typeof e == "string") return d(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0;
		}
	}
	function d(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function f(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function p(e) {
		if (Array.isArray(e)) return e;
	}
	var m = Hc(), h = m.wordToUtf8, g = m.pushArray, _ = m.isParagraphStart, v = m.isBreakTag, y = nl(), b = y.match, x = y.getValue, S = y.getValues;
	function C(e, t) {
		for (var n = [], r = 0; r < e.length; r++) {
			var i = e[r];
			if (i.matchers) {
				var a = i.matchers(t);
				if (!(a instanceof Array)) throw Error("module matcher returns a non array");
				g(n, a);
			}
		}
		return n;
	}
	function w(e, t, n) {
		for (var r = [], a = 0; a < e.length; a++) {
			var o = e[a], s = c(o, 2), l = s[0], u = s[1], d = o[2] || {};
			if (n.match(l, t)) {
				var f = n.getValues(l, t);
				if (typeof d == "function" && (d = d(f)), !d.value) {
					var p = c(f, 2);
					d.value = p[1];
				}
				r.push(i({
					type: "placeholder",
					prefix: l,
					module: u,
					onMatch: d.onMatch,
					priority: d.priority
				}, d));
			}
		}
		return r;
	}
	function T(e, t) {
		var n = t.modules, r = t.startOffset, i = t.lIndex, a;
		t.offset = r, t.match = b, t.getValue = x, t.getValues = S;
		var o = w(C(n, t), e, t);
		if (o.length > 0) {
			for (var s = null, c = 0; c < o.length; c++) {
				var l = o[c];
				l.priority ||= -l.value.length, (!s || l.priority > s.priority) && (s = l);
			}
			return s.offset = r, delete s.priority, s.endLindex = i, s.lIndex = i, s.raw = e, s.onMatch && s.onMatch(s), delete s.onMatch, delete s.prefix, s;
		}
		for (var u = 0; u < n.length; u++) if (a = n[u].parse(e, t), a) return a.offset = r, a.endLindex = i, a.lIndex = i, a.raw = e, a;
		return {
			type: "placeholder",
			value: e,
			offset: r,
			endLindex: i,
			lIndex: i
		};
	}
	t.exports = {
		preparse: function(e, t, n) {
			function r(e, n) {
				for (var r = 0; r < t.length; r++) e = t[r].preparse(e, n) || e;
				return e;
			}
			return r(e, n);
		},
		parse: function(e, t, n) {
			var r = !1, a = "", o, s = [], c = n.fileTypeConfig.droppedTagsInsidePlaceholder || [];
			return e.reduce(function(e, l) {
				return l.type === "delimiter" ? (r = l.position === "start", l.position === "end" && (n.parse = function(e) {
					return T(e, i(i(i({}, n), l), {}, {
						startOffset: o,
						modules: t
					}));
				}, e.push(n.parse(h(a))), g(e, s), s = []), l.position === "start" && (s = [], o = l.offset), a = "", e) : r ? l.type !== "content" || l.position !== "insidetag" ? (n.syntax.preserveNewlinesInTags && (v(l) || _(l)) && (a += "\n"), c.indexOf(l.tag) === -1 && s.push(l), e) : (a += l.value, e) : (e.push(l), e);
			}, []);
		},
		postparse: function(e, t, n) {
			function r(e, n, r) {
				for (var i = [], a = 0; a < t.length; a++) {
					var o = t[a];
					i.push(o.getTraits(e, n, r));
				}
				return i;
			}
			var a = [];
			function o(e, n) {
				for (var s = e, c = 0; c < t.length; c++) {
					var l = t[c].postparse(s, i(i({}, n), {}, {
						postparse: function(e, t) {
							return o(e, i(i({}, n), t));
						},
						getTraits: r
					}));
					if (l != null) {
						if (l.errors) {
							g(a, l.errors), s = l.postparsed;
							continue;
						}
						s = l;
					}
				}
				return s;
			}
			return {
				postparsed: o(e, n),
				errors: a
			};
		}
	};
})), il = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		if (e.lIndex == null) return null;
		var n = t.scopeManager.scopePathItem;
		return e.parentPart && (n = n.slice(0, n.length - 1)), t.filePath + "@" + e.lIndex.toString() + "-" + n.join("-");
	}
	t.exports = n;
})), al = /* @__PURE__ */ k(((e, t) => {
	var n = Vc(), r = n.throwUnimplementedTagType, i = n.XTScopeParserError, a = Hc().pushArray, o = il();
	function s(e, t) {
		for (var n = 0, r = t.modules; n < r.length; n++) {
			var i = r[n].render(e, t);
			if (i) return i;
		}
		return !1;
	}
	function c(e) {
		var t = e.baseNullGetter, n = e.compiled, c = e.scopeManager;
		e.nullGetter = function(e, n) {
			return t(e, n || c);
		};
		for (var l = [], u = [], d = 0, f = n.length; d < f; d++) {
			var p = n[d];
			e.index = d, e.resolvedId = o(p, e);
			var m = void 0;
			try {
				m = s(p, e);
			} catch (e) {
				if (e instanceof i) {
					l.push(e), u.push(p);
					continue;
				}
				throw e;
			}
			if (m) {
				m.errors && a(l, m.errors), u.push(m);
				continue;
			}
			if (p.type === "content" || p.type === "tag") {
				u.push(p);
				continue;
			}
			r(p, d);
		}
		for (var h = [], g = 0; g < u.length; g++) {
			var _ = u[g].value;
			_ instanceof Array ? a(h, _) : _ && h.push(_);
		}
		return {
			errors: l,
			parts: h
		};
	}
	t.exports = c;
})), ol = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		var t, n, r, i, a = 0, o = e.length;
		for (r = 0; r < o; r++) t = e.charCodeAt(r), (t & 64512) == 55296 && r + 1 < o && (n = e.charCodeAt(r + 1), (n & 64512) == 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), r++)), a += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
		var s = new Uint8Array(a);
		for (i = 0, r = 0; i < a; r++) t = e.charCodeAt(r), (t & 64512) == 55296 && r + 1 < o && (n = e.charCodeAt(r + 1), (n & 64512) == 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), r++)), t < 128 ? s[i++] = t : t < 2048 ? (s[i++] = 192 | t >>> 6, s[i++] = 128 | t & 63) : t < 65536 ? (s[i++] = 224 | t >>> 12, s[i++] = 128 | t >>> 6 & 63, s[i++] = 128 | t & 63) : (s[i++] = 240 | t >>> 18, s[i++] = 128 | t >>> 12 & 63, s[i++] = 128 | t >>> 6 & 63, s[i++] = 128 | t & 63);
		return s;
	}
	function r(e, t) {
		for (var r = 0, i = t.modules; r < i.length; r++) e = i[r].postrender(e, t);
		for (var a = 0, o = t.joinUncorrupt(e, t), s = "", c = 0, l = 65536, u = [], d = 0, f = o.length; d < f; d++) {
			var p = o[d];
			if (p.length + c > l) {
				var m = n(s);
				a += m.length, u.push(m), s = "";
			}
			s += p, c += p.length, delete o[d];
		}
		var h = n(s);
		a += h.length, u.push(h);
		for (var g = new Uint8Array(a), _ = 0, v = 0; v < u.length; v++) {
			for (var y = u[v], b = 0; b < y.length; ++b) g[b + _] = y[b];
			_ += y.length;
		}
		return g;
	}
	t.exports = r;
})), sl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function i(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? r(Object(n), !0).forEach(function(t) {
				a(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function a(e, t, n) {
		return (t = o(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Hc().pushArray, l = il();
	function u(e, t) {
		for (var n = 0, r = t.modules; n < r.length; n++) {
			var i = r[n].resolve(e, t);
			if (i) return i;
		}
		return !1;
	}
	function d(e, t, n, r) {
		var a = u(e, i(i({}, r), {}, { resolvedId: l(e, r) }));
		if (a) return a.then(function(n) {
			t.push({
				tag: e.value,
				lIndex: e.lIndex,
				value: n
			});
		}).catch(function(e) {
			e instanceof Array ? c(n, e) : n.push(e);
		});
		if (e.type === "placeholder") return r.scopeManager.getValueAsync(e.value, { part: e }).then(function(t) {
			return t ?? r.nullGetter(e);
		}).then(function(n) {
			t.push({
				tag: e.value,
				lIndex: e.lIndex,
				value: n
			});
		}).catch(function(e) {
			e instanceof Array ? c(n, e) : n.push(e);
		});
	}
	function f(e) {
		var t = [], n = [], r = e.baseNullGetter, i = e.scopeManager;
		e.nullGetter = function(e, t) {
			return r(e, t || i);
		}, e.resolved = t;
		var a = p(e, n, t);
		return a ? a.then(function() {
			return m(e, n, t);
		}) : m(e, n, t);
	}
	function p(e, t, n) {
		for (var r = null, i = function() {
			var i = o[a];
			if (["content", "tag"].indexOf(i.type) !== -1) return 1;
			i.resolveFirst && (r ??= Promise.resolve(null), r = r.then(function() {
				return d(i, n, t, e);
			}));
		}, a = 0, o = e.compiled; a < o.length; a++) if (i()) continue;
		return r;
	}
	function m(e, t, n) {
		for (var r = [], i = 0, a = e.compiled; i < a.length; i++) {
			var o = a[i];
			["content", "tag"].indexOf(o.type) === -1 && (o.resolveFirst || r.push(d(o, n, t, e)));
		}
		return Promise.all(r).then(function() {
			return {
				errors: t,
				resolved: n
			};
		});
	}
	t.exports = f;
})), cl = /* @__PURE__ */ k(((e, t) => {
	var n = Hc(), r = n.startsWith, i = n.endsWith, a = n.isStarting, o = n.isEnding, s = n.isWhiteSpace, c = Jc();
	function l(e) {
		for (var t = "", n = 0, a = e.length; n < a; n++) {
			var o = e[n];
			s(o) || r(o, "<w:bookmarkEnd") || (i(t, "</w:tbl>") && !r(o, "<w:p") && !r(o, "<w:tbl") && !r(o, "<w:sectPr") && !r(o, "</w:ftr>") && !r(o, "</w:hdr>") && (o = `<w:p/>${o}`), t = o, e[n] = o);
		}
		return e;
	}
	function u(e, t) {
		var n = t.fileTypeConfig.tagShouldContain || [], r = "", i = -1;
		c.docx.indexOf(t.contentType) !== -1 && (e = l(e));
		for (var s = -1, u = 0, d = n.length; u < d; u++) for (var f = n[u], p = f.tag, m = f.shouldContain, h = f.value, g = f.drop, _ = f.dropParent, v = 0, y = e.length; v < y; v++) {
			var b = e[v];
			if (i === u) {
				if (o(b, p)) if (i = -1, _) {
					for (var x = -1, S = s; S > 0; S--) if (a(e[S], _)) {
						x = S;
						break;
					}
					for (var C = x; C <= e.length; C++) {
						if (o(e[C], _)) {
							e[C] = "";
							break;
						}
						e[C] = "";
					}
				} else {
					for (var w = s; w <= v; w++) e[w] = "";
					g || (e[v] = r + h + b);
				}
				r += b;
				for (var T = 0, E = m.length; T < E; T++) {
					var D = m[T];
					if (a(b, D)) {
						i = -1;
						break;
					}
				}
			}
			i === -1 && a(b, p) && b.substr(1).indexOf("<") === -1 && (b[b.length - 2] === "/" ? e[v] = "" : (s = v, i = u, r = b));
		}
		return e;
	}
	t.exports = u;
})), ll = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Hc(), l = c.pushArray, u = c.wordToUtf8, d = c.convertSpaces, f = tl(), p = Qc(), m = rl(), h = al(), g = ol(), _ = sl(), v = cl(), y = Function.prototype.bind, b = Function.prototype.call, x = b.bind(b, y);
	function S(e, t) {
		for (var n = f(e, t), r = [], i = 0, a = n.matches; i < a.length; i++) {
			var o = a[i];
			r.push(o.array[2]);
		}
		return u(d(r.join("")));
	}
	t.exports = /*#__PURE__*/ function() {
		function e(t, n) {
			for (var i in r(this, e), this.cachedParsers = {}, this.content = t, n) this[i] = n[i];
			this.setModules({ inspect: { filePath: n.filePath } });
		}
		return a(e, [
			{
				key: "resolveTags",
				value: function(e) {
					var t = this;
					this.tags = e;
					var n = this.getOptions(), r = this.filePath;
					n.scopeManager = this.scopeManager, n.resolve = _;
					for (var i = [], a = [], o = 0, s = this.modules; o < s.length; o++) {
						var c = s[o];
						a.push(Promise.resolve(c.preResolve(n)).catch(function(e) {
							i.push(e);
						}));
					}
					return Promise.all(a).then(function() {
						if (i.length !== 0) throw i;
						return _(n).then(function(e) {
							for (var i = e.resolved, a = e.errors, o = 0; o < a.length; o++) {
								var s, c = a[o];
								c instanceof Error || (c = Error(c)), (s = c).properties || (s.properties = {}), c.properties.file = r, a[o] = c;
							}
							if (a.length !== 0) throw a;
							return Promise.all(i).then(function(e) {
								return n.scopeManager.root.finishedResolving = !0, n.scopeManager.resolved = e, t.setModules({ inspect: {
									resolved: e,
									filePath: r
								} }), e;
							});
						}).catch(function(e) {
							throw t.errorChecker(e), e;
						});
					});
				}
			},
			{
				key: "getFullText",
				value: function() {
					return S(this.content, this.fileTypeConfig.tagsXmlTextArray);
				}
			},
			{
				key: "setModules",
				value: function(e) {
					for (var t = 0, n = this.modules; t < n.length; t++) n[t].set(e);
				}
			},
			{
				key: "preparse",
				value: function() {
					this.allErrors = [], this.xmllexed = p.xmlparse(this.content, {
						text: this.fileTypeConfig.tagsXmlTextArray,
						other: this.fileTypeConfig.tagsXmlLexedArray
					}), this.setModules({ inspect: {
						filePath: this.filePath,
						xmllexed: this.xmllexed
					} });
					var e = p.parse(this.xmllexed, this.delimiters, this.syntax, this.fileType), t = e.lexed, n = e.errors;
					l(this.allErrors, n), this.lexed = t, this.setModules({ inspect: {
						filePath: this.filePath,
						lexed: this.lexed
					} });
					var r = this.getOptions();
					this.lexed = m.preparse(this.lexed, this.modules, r);
				}
			},
			{
				key: "parse",
				value: function() {
					var e = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).noPostParse;
					this.setModules({ inspect: { filePath: this.filePath } });
					var t = this.getOptions();
					return this.parsed = m.parse(this.lexed, this.modules, t), this.setModules({ inspect: {
						filePath: this.filePath,
						parsed: this.parsed
					} }), e ? this : this.postparse();
				}
			},
			{
				key: "postparse",
				value: function() {
					var e = this.getOptions(), t = m.postparse(this.parsed, this.modules, e), n = t.postparsed, r = t.errors;
					return this.postparsed = n, this.setModules({ inspect: {
						filePath: this.filePath,
						postparsed: this.postparsed
					} }), l(this.allErrors, r), this.errorChecker(this.allErrors), this;
				}
			},
			{
				key: "errorChecker",
				value: function(e) {
					for (var t = 0, n = e; t < n.length; t++) {
						var r = n[t];
						r.properties ||= {}, r.properties.file = this.filePath;
					}
					for (var i = 0, a = this.modules; i < a.length; i++) e = a[i].errorsTransformer(e);
				}
			},
			{
				key: "baseNullGetter",
				value: function(e, t) {
					for (var n = null, r = 0, i = this.modules; r < i.length; r++) {
						var a = i[r];
						n ??= a.nullGetter(e, t, this);
					}
					return n ?? this.nullGetter(e, t);
				}
			},
			{
				key: "getOptions",
				value: function() {
					return {
						compiled: this.postparsed,
						cachedParsers: this.cachedParsers,
						tags: this.tags,
						modules: this.modules,
						parser: this.parser,
						contentType: this.contentType,
						relsType: this.relsType,
						baseNullGetter: x(this.baseNullGetter, this),
						filePath: this.filePath,
						syntax: this.syntax,
						fileTypeConfig: this.fileTypeConfig,
						fileType: this.fileType,
						linebreaks: this.linebreaks,
						stripInvalidXMLChars: this.stripInvalidXMLChars
					};
				}
			},
			{
				key: "render",
				value: function(e) {
					this.filePath = e;
					var t = this.getOptions();
					t.resolved = this.scopeManager.resolved, t.scopeManager = this.scopeManager, t.render = h, t.joinUncorrupt = v;
					var n = h(t), r = n.errors, i = n.parts;
					return r.length > 0 ? (this.allErrors = r, this.errorChecker(r), this) : (this.content = g(i, t), this.setModules({ inspect: {
						filePath: this.filePath,
						content: this.content
					} }), this);
				}
			}
		]);
	}();
})), ul = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function i(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? r(Object(n), !0).forEach(function(t) {
				a(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function a(e, t, n) {
		return (t = h(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function o(e, t) {
		return d(e) || u(e, t) || c(e, t) || s();
	}
	function s() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function c(e, t) {
		if (e) {
			if (typeof e == "string") return l(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0;
		}
	}
	function l(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function u(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function d(e) {
		if (Array.isArray(e)) return e;
	}
	function f(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function p(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, h(r.key), r);
		}
	}
	function m(e, t, n) {
		return t && p(e.prototype, t), n && p(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function h(e) {
		var t = g(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function g(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var _ = Hc(), v = _.chunkBy, y = _.last, b = _.isParagraphStart, x = _.isModule, S = _.pushArray, C = _.isParagraphEnd, w = _.isContent, T = _.startsWith, E = _.isTagEnd, D = _.isTagStart, O = _.getSingleAttribute, k = _.setSingleAttribute, A = Jc(), j = Kc(), ee = Hc().isWhiteSpace, M = "loop";
	function N(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (w(n)) return !0;
		}
		return !1;
	}
	function P(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (n.type !== "content") return n;
		}
		return null;
	}
	function F(e) {
		var t = P(e.subparsed);
		return t != null && t.tag !== "w:t";
	}
	function I(e) {
		return e.hasPageBreak && F(e) ? "<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>" : "";
	}
	function L(e) {
		return e.length && b(e[0]) && C(y(e));
	}
	function R(e) {
		return N(e) ? 0 : e.length;
	}
	function z(e) {
		var t = e.parts.length - 1;
		e.parts[t] === "</w:p>" ? e.parts.splice(t, 0, "<w:r><w:br w:type=\"page\"/></w:r>") : e.parts.push("<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>");
	}
	function B(e) {
		e.parts.unshift("<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>");
	}
	function V(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (D("w:type", n) && n.value.indexOf("continuous") !== -1) return !0;
		}
		return !1;
	}
	function H(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (D("w:type", n) && n.value.indexOf("w:val=\"nextPage\"") !== -1) return !0;
		}
		return !1;
	}
	function te(e, t) {
		for (var n = "", r = 0; r < t.length; r++) {
			var i = t[r].value;
			n += i;
		}
		e.unshift(`<w:p><w:pPr>${n}</w:pPr></w:p>`);
	}
	function U(e) {
		for (var t = !1, n = !1, r = 0; r < e.length; r++) {
			var i = e[r];
			!t && T(i, "<w:sectPr") && (n = !0), n && (T(i, "<w:type") && (t = !0), !t && T(i, "</w:sectPr") && (e.splice(r, 0, "<w:type w:val=\"continuous\"/>"), r++));
		}
		return e;
	}
	function ne(e) {
		for (var t = 0, n = 0; n < e.length; n++) !T(e[n], "<w:headerReference") && !T(e[n], "<w:footerReference") && (e[t] = e[n], t++);
		return e.length = t, e;
	}
	function re(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (n.tag === "w:br" && n.value.indexOf("w:type=\"page\"") !== -1) return !0;
		}
		return !1;
	}
	function ie(e) {
		for (var t = 0; t < e.length; t++) if (e[t].tag === "w:drawing") return !0;
		return !1;
	}
	function W(e) {
		for (var t = [], n = null, r = 0; r < e.length; r++) {
			var i = e[r];
			D("w:sectPr", i) && (n = [], t.push(n)), n !== null && n.push(i), E("w:sectPr", i) && (n = null);
		}
		return t;
	}
	function ae(e) {
		for (var t = !1, n = 0, r = 0; r < e.length; r++) {
			var i = e[r];
			D("w:sectPr", i) && (t = !0), t && (i.tag === "w:headerReference" || i.tag === "w:footerReference") && (n++, t = !1), E("w:sectPr", i) && (t = !1);
		}
		return n;
	}
	function oe(e) {
		for (var t = [], n = !1, r = e.length - 1; r >= 0; r--) {
			var i = e[r];
			if (E("w:sectPr", i) && (n = !0), D("w:sectPr", i) && (t.unshift(i.value), n = !1), n && t.unshift(i.value), b(i)) {
				if (t.length > 0) return t.join("");
				break;
			}
		}
		return "";
	}
	var G = /*#__PURE__*/ function() {
		function e() {
			f(this, e), this.name = "LoopModule", this.inXfrm = !1, this.totalSectPr = 0, this.prefix = {
				start: "#",
				end: "/",
				dash: /^-([^\s]+)\s(.+)/,
				inverted: "^"
			};
		}
		return m(e, [
			{
				key: "optionsTransformer",
				value: function(e, t) {
					return this.docxtemplater = t, e;
				}
			},
			{
				key: "preparse",
				value: function(e, t) {
					var n = t.contentType;
					A.main.indexOf(n) !== -1 && (this.sects = W(e));
				}
			},
			{
				key: "matchers",
				value: function() {
					var e = M;
					return [
						[
							this.prefix.start,
							e,
							{
								expandTo: "auto",
								location: "start",
								inverted: !1
							}
						],
						[
							this.prefix.inverted,
							e,
							{
								expandTo: "auto",
								location: "start",
								inverted: !0
							}
						],
						[
							this.prefix.end,
							e,
							{ location: "end" }
						],
						[
							this.prefix.dash,
							e,
							function(e) {
								var t = o(e, 3);
								return {
									location: "start",
									inverted: !1,
									expandTo: t[1],
									value: t[2]
								};
							}
						]
					];
				}
			},
			{
				key: "getTraits",
				value: function(e, t) {
					if (e === "expandPair") {
						for (var n = [], r = 0, i = t.length; r < i; r++) {
							var a = t[r];
							x(a, M) && a.subparsed == null && n.push({
								part: a,
								offset: r
							});
						}
						return n;
					}
				}
			},
			{
				key: "postparse",
				value: function(e, t) {
					var n = t.basePart;
					if (n && this.docxtemplater.fileType === "docx" && e.length > 0) {
						n.sectPrCount = ae(e), this.totalSectPr += n.sectPrCount;
						for (var r = this.sects, i = 0, a = r.length; i < a; i++) {
							var o = r[i];
							if (n.lIndex < o[0].lIndex) {
								i + 1 < r.length && V(r[i + 1]) && (n.addContinuousType = !0);
								break;
							}
							if (e[0].lIndex < o[0].lIndex && o[0].lIndex < n.lIndex) {
								H(r[i]) && (n.addNextPage = { index: i });
								break;
							}
						}
						n.lastParagrapSectPr = oe(e);
					}
					if (!n || n.expandTo !== "auto" || n.module !== M || !L(e)) return e;
					n.paragraphLoop = !0;
					var s = 0, c = v(e, function(e) {
						return b(e) && (s++, s === 1) ? "start" : C(e) && (s--, s === 0) ? "end" : null;
					}), l = c[0], u = y(c), d = R(l), f = R(u);
					return d > 0 && c[1][0].type === "content" && ee(c[1][0].value) && (d += 1), f > 0 && y(c[c.length - 2]).type === "content" && ee(y(c[c.length - 2]).value) && (f += 1), n.hasPageBreakBeginning = re(l), n.hasPageBreak = re(u), ie(l) && (d = 0), ie(u) && (f = 0), e.slice(d, e.length - f);
				}
			},
			{
				key: "resolve",
				value: function(e, t) {
					var n = this;
					if (!x(e, M)) return null;
					var r = t.scopeManager, a = r.getValueAsync(e.value, { part: e }), o = [], s;
					n.resolveSerially && (s = Promise.resolve(null));
					function c(a, c, l) {
						var u = r.createSubScopeManager(a, e.value, c, e, l);
						n.resolveSerially ? (s = s.then(function() {
							return t.resolve(i(i({}, t), {}, {
								compiled: e.subparsed,
								tags: {},
								scopeManager: u
							}));
						}), o.push(s)) : o.push(t.resolve(i(i({}, t), {}, {
							compiled: e.subparsed,
							tags: {},
							scopeManager: u
						})));
					}
					var l = [];
					return a.then(function(n) {
						return n ??= t.nullGetter(e), n instanceof Promise ? n.then(function(e) {
							return e instanceof Array ? Promise.all(e) : e;
						}) : n instanceof Array ? Promise.all(n) : n;
					}).then(function(t) {
						return r.loopOverValue(t, c, e.inverted), Promise.all(o).then(function(e) {
							for (var t = [], n = 0; n < e.length; n++) {
								var r = e[n], i = r.resolved, a = r.errors;
								S(l, a), t.push(i);
							}
							return t;
						}).then(function(e) {
							if (l.length > 0) throw l;
							return e;
						});
					});
				}
			},
			{
				key: "render",
				value: function(e, t) {
					var n = this;
					if (e.tag === "p:xfrm" && (n.inXfrm = e.position === "start"), e.tag === "a:ext" && n.inXfrm) return n.lastExt = e, e;
					if (!x(e, M)) return null;
					var r = [], a = [], o = 0, s = e.subparsed[0], c = 0;
					s?.tag === "a:tr" && (c = +O(s.value, "h")), o -= c;
					var l = 0, u = F(e);
					function d(s, d, f) {
						o += c;
						for (var p = t.scopeManager.createSubScopeManager(s, e.value, d, e, f), m = 0, h = e.subparsed; m < h.length; m++) {
							var g = h[m];
							if (D("a16:rowId", g)) {
								var _ = +O(g.value, "val") + l;
								l = 1, g.value = k(g.value, "val", _);
							}
						}
						var v = t.render(i(i({}, t), {}, {
							compiled: e.subparsed,
							tags: {},
							scopeManager: p
						}));
						e.hasPageBreak && d === f - 1 && u && z(v), p.scopePathItem.some(function(e) {
							return e !== 0;
						}) ? (e.sectPrCount === 1 && (v.parts = ne(v.parts)), e.addContinuousType && (v.parts = U(v.parts))) : e.addNextPage && te(v.parts, n.sects[e.addNextPage.index]), e.addNextPage && z(v), e.hasPageBreakBeginning && u && B(v);
						for (var y = 0, b = v.parts; y < b.length; y++) {
							var x = b[y];
							r.push(x);
						}
						S(a, v.errors);
					}
					var f = t.scopeManager.getValue(e.value, { part: e });
					if (f ??= t.nullGetter(e), t.scopeManager.loopOverValue(f, d, e.inverted) === !1) return e.lastParagrapSectPr ? e.paragraphLoop ? { value: `<w:p><w:pPr>${e.lastParagrapSectPr}</w:pPr></w:p>` } : { value: `</w:t></w:r></w:p><w:p><w:pPr>${e.lastParagrapSectPr}</w:pPr><w:r><w:t>` } : {
						value: I(e) || "",
						errors: a
					};
					if (o !== 0) {
						var p = +O(n.lastExt.value, "cy");
						n.lastExt.value = k(n.lastExt.value, "cy", p + o);
					}
					return {
						value: t.joinUncorrupt(r, i(i({}, t), {}, { basePart: e })),
						errors: a
					};
				}
			}
		]);
	}();
	t.exports = function() {
		return j(new G());
	};
})), dl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Kc(), l = Hc(), u = l.isTextStart, d = l.isTextEnd, f = l.endsWith, p = l.startsWith, m = l.pushArray, h = "<w:t xml:space=\"preserve\">", g = h.length, _ = "</w:t>", v = _.length;
	function y(e) {
		return u(e) && e.tag === "w:t";
	}
	function b(e, t) {
		var n = e[t].value;
		return e[t + 1].value === "</w:t>" || n.indexOf("xml:space=\"preserve\"") !== -1 ? n : n.substr(0, n.length - 1) + " xml:space=\"preserve\">";
	}
	function x(e, t) {
		return e && e.basePart && t.length > 1;
	}
	var S = /*#__PURE__*/ function() {
		function e() {
			r(this, e), this.name = "SpacePreserveModule";
		}
		return a(e, [{
			key: "postparse",
			value: function(e, t) {
				var n = [], r = !1, i = 0, a = 0;
				function o(e, t) {
					return e.type === "placeholder" && t.length > 1;
				}
				var s = e.reduce(function(e, s) {
					return y(s) && (r = !0, a = n.length), r ? (n.push(s), x(t, n) && (i = t.basePart.endLindex, n[0].value = b(n, 0)), o(s, n) && (n[a].value = b(n, a), i = s.endLindex), d(s) && s.lIndex > i && (i !== 0 && (n[a].value = b(n, a)), m(e, n), n = [], r = !1, i = 0, a = 0), e) : (e.push(s), e);
				}, []);
				return m(s, n), s;
			}
		}, {
			key: "postrender",
			value: function(e) {
				for (var t = "", n = 0, r = 0, i = e.length; r < i; r++) {
					var a = e[r];
					a !== "" && (f(t, h) && p(a, _) && (e[n] = t.substr(0, t.length - g) + "<w:t/>", a = a.substr(v)), t = a, n = r, e[r] = a);
				}
				return e;
			}
		}]);
	}();
	t.exports = function() {
		return c(new S());
	};
})), fl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = qc(), l = Hc(), u = l.isContent, d = l.getPartWithDelimiters, f = Vc(), p = f.throwRawTagShouldBeOnlyTextInParagraph, m = f.getInvalidRawXMLValueException, h = Kc(), g = "rawxml";
	function _(e) {
		for (var t = e.part, n = e.left, r = e.right, i = e.postparsed, a = e.index, o = i.slice(n + 1, r), s = 0, c = o.length; s < c; s++) if (s !== a - n - 1) {
			var l = o[s];
			u(l) && p({
				paragraphParts: o,
				part: t
			});
		}
		return t;
	}
	var v = /*#__PURE__*/ function() {
		function e() {
			r(this, e), this.name = "RawXmlModule", this.prefix = "@";
		}
		return a(e, [
			{
				key: "optionsTransformer",
				value: function(e, t) {
					return this.fileTypeConfig = t.fileTypeConfig, e;
				}
			},
			{
				key: "matchers",
				value: function() {
					return [[this.prefix, g]];
				}
			},
			{
				key: "postparse",
				value: function(e) {
					var t = this;
					return c.expandToOne(e, {
						moduleName: g,
						getInner: _,
						expandTo: this.fileTypeConfig.tagRawXml,
						error: {
							message: "Raw tag not in paragraph",
							id: "raw_tag_outerxml_invalid",
							explanation: function(e) {
								return `The tag "${d(e, t.docxtemplater)}" is not inside a paragraph, putting raw tags inside an inline loop is disallowed.`;
							}
						}
					});
				}
			},
			{
				key: "render",
				value: function(e, t) {
					if (e.module !== g) return null;
					var n, r = [];
					try {
						n = t.scopeManager.getValue(e.value, { part: e }), n ??= t.nullGetter(e);
					} catch (e) {
						return r.push(e), { errors: r };
					}
					return n ||= "", typeof n == "string" ? { value: n } : { errors: [m({
						tag: e.value,
						value: n,
						partDelims: d(e, this.docxtemplater),
						part: e,
						offset: e.offset
					})] };
				}
			}
		]);
	}();
	t.exports = function() {
		return h(new v());
	};
})), pl = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = 0, i = e.length; r < i; r++) t[r] >= e[r].length || (n === -1 || e[r][t[r]].offset < e[n][t[n]].offset) && (n = r);
		return n;
	}
	t.exports = function(e) {
		for (var t = 0, r = 0, i = e; r < i.length; r++) {
			var a = i[r];
			t += a.length;
		}
		e = e.filter(function(e) {
			return e.length > 0;
		});
		for (var o = Array(t), s = e.map(function() {
			return 0;
		}), c = 0; c < t; c++) {
			var l = n(e, s);
			o[c] = e[l][s[l]], s[l]++;
		}
		return o;
	};
})), ml = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = pl(), l = Hc(), u = l.getLeft, d = l.getRight, f = l.pushArray, p = Kc(), m = qc().getExpandToDefault, h = Vc(), g = h.getUnmatchedLoopException, _ = h.getClosingTagNotMatchOpeningTag, v = h.getUnbalancedLoopException;
	function y(e) {
		switch (e.location) {
			case "start": return 1;
			case "end": return -1;
		}
	}
	function b(e, t) {
		return e != null && t != null && (e.part.location === "start" && t.part.location === "end" && e.part.value === t.part.value || t.part.value === "");
	}
	function x(e) {
		for (var t = 0, n = []; t < e.length;) {
			var r = e[t].part;
			if (r.location === "end") {
				if (t === 0) return e.splice(0, 1), n.push(g(r)), {
					traits: e,
					errors: n
				};
				var i = t, a = t - 1, o = 1;
				if (b(e[a], e[i])) return e.splice(i, 1), e.splice(a, 1), {
					errors: n,
					traits: e
				};
				for (; o < 50;) {
					var s = e[a - o], c = e[i + o];
					if (b(s, e[i])) return e.splice(i, 1), e.splice(a - o, 1), {
						errors: n,
						traits: e
					};
					if (b(e[a], c)) return e.splice(i + o, 1), e.splice(a, 1), {
						errors: n,
						traits: e
					};
					o++;
				}
				return n.push(_({ tags: [e[a].part, e[i].part] })), e.splice(i, 1), e.splice(a, 1), {
					traits: e,
					errors: n
				};
			}
			t++;
		}
		for (var l = 0; l < e.length; l++) {
			var u = e[l].part;
			n.push(g(u));
		}
		return {
			traits: [],
			errors: n
		};
	}
	function S(e) {
		var t = {}, n = [], r = [], i = [];
		for (f(i, e); i.length > 0;) {
			var a = x(i);
			f(n, a.errors), i = a.traits;
		}
		if (n.length > 0) return {
			pairs: r,
			errors: n
		};
		for (var o = 0, s = 0; s < e.length; s++) {
			var c = e[s], l = c.part, u = y(l);
			if (o += u, u === 1) t[o] = c;
			else {
				var d = t[o + 1];
				o === 0 && r.push([d, c]);
			}
			o = o >= 0 ? o : 0;
		}
		return {
			pairs: r,
			errors: n
		};
	}
	var C = /*#__PURE__*/ function() {
		function e() {
			r(this, e), this.name = "ExpandPairTrait";
		}
		return a(e, [{
			key: "optionsTransformer",
			value: function(e, t) {
				return t.options.paragraphLoop && f(t.fileTypeConfig.expandTags, t.fileTypeConfig.onParagraphLoop), this.expandTags = t.fileTypeConfig.expandTags, e;
			}
		}, {
			key: "postparse",
			value: function(e, t) {
				var n = this, r = t.getTraits, i = t.postparse, a = t.fileType, o = r("expandPair", e, t);
				o = o.map(function(e) {
					return e || [];
				}), o = c(o);
				var s = S(o), l = s.pairs, f = s.errors, p = 0, h = null, g = l.map(function(t) {
					var r = t[0].part.expandTo;
					if (r === "auto" && a !== "text") {
						var i = m(e, t, n.expandTags);
						i.error && f.push(i.error), r = i.value;
					}
					if (!r || a === "text") {
						var o = t[0].offset, s = t[1].offset;
						return o < p && !n.docxtemplater.options.syntax.allowUnbalancedLoops && f.push(v(t, h)), h = t, p = s, [o, s];
					}
					var c, l;
					try {
						c = u(e, r, t[0].offset);
					} catch (e) {
						f.push(e);
					}
					try {
						l = d(e, r, t[1].offset);
					} catch (e) {
						f.push(e);
					}
					return c < p && !n.docxtemplater.options.syntax.allowUnbalancedLoops && f.push(v(t, h)), p = l, h = t, [c, l];
				});
				if (f.length > 0) return {
					postparsed: e,
					errors: f
				};
				var _ = 0, y;
				return {
					postparsed: e.reduce(function(t, n, r) {
						var a = _ < l.length && g[_][0] <= r && r <= g[_][1], o = l[_], s = g[_];
						if (!a) return t.push(n), t;
						if (s[0] === r && (y = []), o[0].offset !== r && o[1].offset !== r && y.push(n), s[1] === r) {
							var c = e[o[0].offset];
							c.subparsed = i(y, { basePart: c }), c.endLindex = o[1].part.lIndex, delete c.location, delete c.expandTo, t.push(c), _++;
							for (var u = g[_]; u && u[0] < r;) _++, u = g[_];
						}
						return t;
					}, []),
					errors: f
				};
			}
		}]);
	}();
	t.exports = function() {
		return p(new C());
	};
})), hl = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		"@babel/helpers - typeof";
		return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, n(e);
	}
	function r(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
		}
	}
	function a(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function o(e) {
		var t = s(e, "string");
		return n(t) == "symbol" ? t : t + "";
	}
	function s(e, t) {
		if (n(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, t || "default");
			if (n(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var c = Kc(), l = Vc(), u = l.getScopeCompilationError, d = l.getCorruptCharactersException, f = Hc(), p = f.utf8ToWord, m = f.hasCorruptCharacters, h = f.removeCorruptCharacters, g = Yc(), _ = [
		g.settingsContentType,
		g.coreContentType,
		g.appContentType,
		g.customContentType
	], v = {
		docx: "w",
		pptx: "a"
	}, y = /*#__PURE__*/ function() {
		function e() {
			r(this, e), this.name = "Render", this.recordRun = !1, this.recordedRun = [];
		}
		return a(e, [
			{
				key: "set",
				value: function(e) {
					e.compiled && (this.compiled = e.compiled), e.data != null && (this.data = e.data);
				}
			},
			{
				key: "optionsTransformer",
				value: function(e, t) {
					return this.docxtemplater = t, this.brTag = t.fileType === "docx" ? "<w:r><w:br/></w:r>" : "<a:br/>", this.prefix = v[t.fileType], this.runStartTag = `${this.prefix}:r`, this.runPropsStartTag = `${this.prefix}:rPr`, e;
				}
			},
			{
				key: "postparse",
				value: function(e, t) {
					for (var n = [], r = 0; r < e.length; r++) {
						var i = e[r];
						if (i.type === "placeholder") {
							var a = i.value;
							try {
								t.cachedParsers[i.lIndex] = this.docxtemplater.parser(a, { tag: i });
							} catch (e) {
								n.push(u({
									tag: a,
									rootError: e,
									offset: i.offset
								}));
							}
						}
					}
					return {
						postparsed: e,
						errors: n
					};
				}
			},
			{
				key: "getRenderedMap",
				value: function(e) {
					for (var t in this.compiled) e[t] = {
						from: t,
						data: this.data
					};
					return e;
				}
			},
			{
				key: "render",
				value: function(e, t) {
					var n = t.contentType, r = t.scopeManager, i = t.linebreaks, a = t.nullGetter, o = t.fileType, s = t.stripInvalidXMLChars;
					if (_.indexOf(n) !== -1 && (i = !1), i && this.recordRuns(e), !(e.type !== "placeholder" || e.module)) {
						var c;
						try {
							c = r.getValue(e.value, { part: e });
						} catch (e) {
							return { errors: [e] };
						}
						if (c ??= a(e), typeof c == "string") {
							if (s) c = h(c);
							else if ([
								"docx",
								"pptx",
								"xlsx"
							].indexOf(o) !== -1 && m(c)) return { errors: [d({
								tag: e.value,
								value: c,
								offset: e.offset
							})] };
						}
						return o === "text" ? { value: c } : { value: i && typeof c == "string" ? this.renderLineBreaks(c) : p(c) };
					}
				}
			},
			{
				key: "recordRuns",
				value: function(e) {
					e.tag === this.runStartTag ? this.recordedRun = "" : e.tag === this.runPropsStartTag ? (e.position === "start" && (this.recordRun = !0, this.recordedRun += e.value), (e.position === "end" || e.position === "selfclosing") && (this.recordedRun += e.value, this.recordRun = !1)) : this.recordRun && (this.recordedRun += e.value);
				}
			},
			{
				key: "renderLineBreaks",
				value: function(e) {
					for (var t = [], n = e.split("\n"), r = 0, i = n.length; r < i; r++) t.push(p(n[r])), r < n.length - 1 && t.push(`</${this.prefix}:t></${this.prefix}:r>${this.brTag}<${this.prefix}:r>${this.recordedRun}<${this.prefix}:t${this.docxtemplater.fileType === "docx" ? " xml:space=\"preserve\"" : ""}>`);
					return t;
				}
			}
		]);
	}();
	t.exports = function() {
		return c(new y());
	};
})), gl = /* @__PURE__ */ k(((e, t) => {
	var n = ul(), r = dl(), i = fl(), a = ml(), o = hl();
	function s() {
		return {
			getTemplatedFiles: function() {
				return [];
			},
			templatedNs: ["http://schemas.microsoft.com/office/2006/coverPageProps"],
			textPath: function(e) {
				return e.textTarget;
			},
			tagsXmlTextArray: [
				"Company",
				"HyperlinkBase",
				"Manager",
				"cp:category",
				"cp:keywords",
				"dc:creator",
				"dc:description",
				"dc:subject",
				"dc:title",
				"cp:contentStatus",
				"PublishDate",
				"Abstract",
				"CompanyAddress",
				"CompanyPhone",
				"CompanyFax",
				"CompanyEmail",
				"w:t",
				"a:t",
				"m:t",
				"vt:lpstr",
				"vt:lpwstr"
			],
			tagsXmlLexedArray: /* @__PURE__ */ "w:proofState.w:tc.w:tr.w:tbl.w:ftr.w:hdr.w:body.w:document.w:p.w:r.w:br.w:rPr.w:pPr.w:spacing.w:sdtContent.w:sdt.w:drawing.w:sectPr.w:type.w:headerReference.w:footerReference.w:bookmarkStart.w:bookmarkEnd.w:commentRangeStart.w:commentRangeEnd.w:commentReference".split("."),
			droppedTagsInsidePlaceholder: [
				"w:p",
				"w:br",
				"w:bookmarkStart",
				"w:bookmarkEnd"
			],
			expandTags: [{
				contains: "w:tc",
				expand: "w:tr"
			}],
			onParagraphLoop: [{
				contains: "w:p",
				expand: "w:p",
				onlyTextInTag: !0
			}],
			tagRawXml: "w:p",
			baseModules: [
				n,
				r,
				a,
				i,
				o
			],
			tagShouldContain: [
				{
					tag: "w:sdtContent",
					shouldContain: [
						"w:p",
						"w:r",
						"w:commentRangeStart",
						"w:sdt"
					],
					value: "<w:p></w:p>"
				},
				{
					tag: "w:tc",
					shouldContain: ["w:p"],
					value: "<w:p></w:p>"
				},
				{
					tag: "w:tr",
					shouldContain: ["w:tc"],
					drop: !0
				},
				{
					tag: "w:tbl",
					shouldContain: ["w:tr"],
					drop: !0
				}
			]
		};
	}
	function c() {
		return {
			getTemplatedFiles: function() {
				return [];
			},
			textPath: function(e) {
				return e.textTarget;
			},
			tagsXmlTextArray: [
				"Company",
				"HyperlinkBase",
				"Manager",
				"cp:category",
				"cp:keywords",
				"dc:creator",
				"dc:description",
				"dc:subject",
				"dc:title",
				"a:t",
				"m:t",
				"vt:lpstr",
				"vt:lpwstr"
			],
			tagsXmlLexedArray: [
				"p:sp",
				"a:tc",
				"a:tr",
				"a:tbl",
				"a:graphicData",
				"a:p",
				"a:r",
				"a:rPr",
				"p:txBody",
				"a:txBody",
				"a:off",
				"a:ext",
				"p:graphicFrame",
				"p:xfrm",
				"a16:rowId",
				"a:endParaRPr"
			],
			droppedTagsInsidePlaceholder: ["a:p", "a:endParaRPr"],
			expandTags: [{
				contains: "a:tc",
				expand: "a:tr"
			}],
			onParagraphLoop: [{
				contains: "a:p",
				expand: "a:p",
				onlyTextInTag: !0
			}],
			tagRawXml: "p:sp",
			baseModules: [
				n,
				a,
				i,
				o
			],
			tagShouldContain: [
				{
					tag: "a:tbl",
					shouldContain: ["a:tr"],
					dropParent: "p:graphicFrame"
				},
				{
					tag: "p:txBody",
					shouldContain: ["a:p"],
					value: "<a:p></a:p>"
				},
				{
					tag: "a:txBody",
					shouldContain: ["a:p"],
					value: "<a:p></a:p>"
				}
			]
		};
	}
	t.exports = {
		docx: s,
		pptx: c
	};
})), _l = /* @__PURE__ */ k(((e, t) => {
	var n = ["modules"];
	function r(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function i(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? r(Object(n), !0).forEach(function(t) {
				a(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	function a(e, t, n) {
		return (t = v(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function o(e, t) {
		return d(e) || u(e, t) || c(e, t) || s();
	}
	function s() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function c(e, t) {
		if (e) {
			if (typeof e == "string") return l(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0;
		}
	}
	function l(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function u(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function d(e) {
		if (Array.isArray(e)) return e;
	}
	function f(e) {
		"@babel/helpers - typeof";
		return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, f(e);
	}
	function p(e, t) {
		if (e == null) return {};
		var n, r, i = m(e, t);
		if (Object.getOwnPropertySymbols) {
			var a = Object.getOwnPropertySymbols(e);
			for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
		}
		return i;
	}
	function m(e, t) {
		if (e == null) return {};
		var n = {};
		for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
			if (t.indexOf(r) !== -1) continue;
			n[r] = e[r];
		}
		return n;
	}
	function h(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function g(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, v(r.key), r);
		}
	}
	function _(e, t, n) {
		return t && g(e.prototype, t), n && g(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function v(e) {
		var t = y(e, "string");
		return f(t) == "symbol" ? t : t + "";
	}
	function y(e, t) {
		if (f(e) != "object" || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (n !== void 0) {
			var r = n.call(e, t || "default");
			if (f(r) != "object") return r;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	var b = Hc(), x = Uc(), S = x.object({
		allowUnopenedTag: x.boolean().optional(),
		allowUnclosedTag: x.boolean().optional(),
		allowUnbalancedLoops: x.boolean().optional(),
		changeDelimiterPrefix: x.string().optional().nullable()
	}), C = x.object({
		delimiters: x.object({
			start: x.string().nullable(),
			end: x.string().nullable()
		}).strict().optional(),
		fileTypeConfig: x.object({}).optional(),
		paragraphLoop: x.boolean().optional(),
		parser: x.function().optional(),
		errorLogging: x.union([x.boolean(), x.string()]).optional(),
		linebreaks: x.boolean().optional(),
		nullGetter: x.function().optional(),
		syntax: S.optional(),
		stripInvalidXMLChars: x.boolean().optional(),
		warnFn: x.function().optional()
	}).strict(), w = Wc().getRelsTypes, T = Gc(), E = T.collectContentTypes, D = T.getContentTypes, O = Kc(), k = qc(), A = Xc(), j = Zc(), ee = Qc(), M = $c().getTags, N = el(), P = Vc(), F = P.throwMultiError, I = P.throwResolveBeforeCompile, L = P.throwRenderInvalidTemplate, R = P.throwRenderTwice, z = P.XTInternalError, B = P.XTTemplateError, V = P.throwFileTypeNotIdentified, H = P.throwFileTypeNotHandled, te = P.throwApiVersionError;
	b.getRelsTypes = w, b.traits = k, b.moduleWrapper = O, b.collectContentTypes = E, b.getContentTypes = D;
	var U = b.getDefaults, ne = b.str2xml, re = b.xml2str, ie = b.concatArrays, W = b.uniq, ae = b.getDuplicates, oe = b.stableSort, G = b.pushArray, se = b.utf8ToWord, ce = b.invertMap, le = "[Content_Types].xml", ue = "_rels/.rels", K = [
		3,
		47,
		2
	];
	function q(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n];
			t.push(r.name);
		}
		var i = ae(t);
		if (i.length > 0) throw new z(`Detected duplicate module "${i[0]}"`);
	}
	function de(e) {
		for (var t = 0, n = e.modules; t < n.length; t++) for (var r = n[t], i = 0, a = r.xmlContentTypes || []; i < a.length; i++) for (var o = a[i], s = e.invertedContentTypes[o] || [], c = 0; c < s.length; c++) {
			var l = s[c];
			e.zip.files[l] && e.options.xmlFileNames.push(l);
		}
	}
	function fe(e) {
		return oe(e, function(e, t) {
			return (t.priority || 0) - (e.priority || 0);
		});
	}
	function pe(e) {
		var t = [];
		for (var n in e) t.push(n);
		for (var r = [le, ue], i = [
			"word/",
			"xl/",
			"ppt/"
		], a = 0; a < t.length; a++) for (var o = t[a], s = 0; s < i.length; s++) {
			var c = i[s];
			o.indexOf(`${c}`) === 0 && r.push(o);
		}
		for (var l = 0; l < t.length; l++) {
			var u = t[l];
			r.indexOf(u) === -1 && r.push(u);
		}
		return r;
	}
	function me(e, t) {
		e.hideDeprecations !== !0 && console.warn(t);
	}
	function he(e, t) {
		if (e.hideDeprecations !== !0) return me(e, `Deprecated method ".${t}", view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ${(/* @__PURE__ */ Error()).stack}`);
	}
	function ge(e) {
		e.modules = e.modules.filter(function(t) {
			if (!t.supportedFileTypes) return !0;
			if (!Array.isArray(t.supportedFileTypes)) throw Error("The supportedFileTypes field of the module must be an array");
			var n = t.supportedFileTypes.includes(e.fileType);
			return n || t.on("detached"), n;
		});
	}
	function _e(e) {
		var t = e.compiled;
		e.errors = ie(Object.keys(t).map(function(e) {
			return t[e].allErrors;
		})), e.errors.length !== 0 && (e.options.errorLogging && N(e.errors, e.options.errorLogging), F(e.errors));
	}
	function ve(e) {
		return typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(e);
	}
	var ye = /*#__PURE__*/ function() {
		function e(t) {
			var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.modules, a = i === void 0 ? [] : i, o = p(r, n);
			if (h(this, e), this.targets = [], this.rendered = !1, this.scopeManagers = {}, this.compiled = {}, this.modules = [A()], this.xmlDocuments = {}, arguments.length === 0) me(this, `Deprecated docxtemplater constructor with no arguments, view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ${(/* @__PURE__ */ Error()).stack}`), this.hideDeprecations = !0, this.setOptions(o);
			else {
				if (this.hideDeprecations = !0, this.setOptions(o), ve(t)) throw Error("You passed a Buffer to the Docxtemplater constructor. The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
				if (!t || !t.files || typeof t.file != "function") throw Error("The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
				if (!Array.isArray(a)) throw Error("The modules argument of docxtemplater's constructor must be an array");
				for (var s = 0; s < a.length; s++) {
					var c = a[s];
					this.attachModule(c);
				}
				this.loadZip(t), this.compile(), this.v4Constructor = !0;
			}
			this.hideDeprecations = !1;
		}
		return _(e, [
			{
				key: "verifyApiVersion",
				value: function(e) {
					e = e.split(".");
					for (var t = 0; t < e.length; t++) e[t] = parseInt(e[t], 10);
					return e.length !== 3 && te("neededVersion is not a valid version", {
						neededVersion: e,
						explanation: "the neededVersion must be an array of length 3"
					}), e[0] !== K[0] && te("The major api version do not match, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: K,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${K.join(".")}`
					}), e[1] > K[1] && te("The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: K,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${K.join(".")}`
					}), e[1] === K[1] && e[2] > K[2] && te("The patch api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: K,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${K.join(".")}`
					}), !0;
				}
			},
			{
				key: "setModules",
				value: function(e) {
					for (var t = 0, n = this.modules; t < n.length; t++) n[t].set(e);
				}
			},
			{
				key: "sendEvent",
				value: function(e) {
					for (var t = 0, n = this.modules; t < n.length; t++) n[t].on(e);
				}
			},
			{
				key: "attachModule",
				value: function(e) {
					if (this.v4Constructor) throw new z("attachModule() should not be called manually when using the v4 constructor");
					he(this, "attachModule");
					var t = f(e);
					if (t === "function") throw new z("Cannot attach a class/function as a module. Most probably you forgot to instantiate the module by using `new` on the module.");
					if (!e || t !== "object") throw new z("Cannot attachModule with a falsy value");
					if (e.requiredAPIVersion && this.verifyApiVersion(e.requiredAPIVersion), e.attached === !0) if (typeof e.clone == "function") e = e.clone();
					else throw Error(`Cannot attach a module that was already attached : "${e.name}". The most likely cause is that you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater`);
					e.attached = !0;
					var n = O(e);
					return this.modules.push(n), n.on("attached"), this.fileType && ge(this), this;
				}
			},
			{
				key: "findModule",
				value: function(e) {
					for (var t = 0, n = this.modules; t < n.length; t++) {
						var r = n[t];
						if (r.name === e) return r;
					}
				}
			},
			{
				key: "setOptions",
				value: function(e) {
					var t, n;
					if (this.v4Constructor) throw Error("setOptions() should not be called manually when using the v4 constructor");
					if (!e) throw Error("setOptions should be called with an object as first parameter");
					var r = C.validate(e);
					if (r.success === !1) throw Error(r.error);
					he(this, "setOptions"), this.options = {};
					var i = U();
					for (var a in i) {
						var o = i[a];
						this.options[a] = e[a] == null ? this[a] || o : e[a], this[a] = this.options[a];
					}
					return (t = this.delimiters).start && (t.start = se(this.delimiters.start)), (n = this.delimiters).end && (n.end = se(this.delimiters.end)), this;
				}
			},
			{
				key: "loadZip",
				value: function(e) {
					if (this.v4Constructor) throw Error("loadZip() should not be called manually when using the v4 constructor");
					if (he(this, "loadZip"), e.loadAsync) throw new z("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
					e.xtRendered && this.options.warnFn([/* @__PURE__ */ Error("This zip file appears to be the outcome of a previous docxtemplater generation. This typically indicates that docxtemplater was integrated by reusing the same zip file. It is recommended to create a new Pizzip instance for each docxtemplater generation.")]), this.zip = e, this.updateFileTypeConfig(), this.modules = ie([this.fileTypeConfig.baseModules.map(function(e) {
						return e();
					}), this.modules]);
					for (var t = 0, n = this.modules; t < n.length; t++) {
						var r = n[t];
						r.zip = this.zip, r.docxtemplater = this, r.fileTypeConfig = this.fileTypeConfig, r.fileType = this.fileType, r.xtOptions = this.options, r.modules = this.modules;
					}
					return ge(this), this;
				}
			},
			{
				key: "precompileFile",
				value: function(e) {
					var t = this.createTemplateClass(e);
					t.preparse(), this.compiled[e] = t;
				}
			},
			{
				key: "compileFile",
				value: function(e) {
					this.compiled[e].parse();
				}
			},
			{
				key: "getScopeManager",
				value: function(e, t, n) {
					var r;
					return (r = this.scopeManagers)[e] || (r[e] = j({
						tags: n,
						parser: this.parser,
						cachedParsers: t.cachedParsers
					})), this.scopeManagers[e];
				}
			},
			{
				key: "resolveData",
				value: function(e) {
					var t = this;
					he(this, "resolveData");
					var n = [];
					return Object.keys(this.compiled).length || I(), Promise.resolve(e).then(function(e) {
						t.data = e, t.setModules({
							data: t.data,
							Lexer: ee
						}), t.mapper = t.modules.reduce(function(e, t) {
							return t.getRenderedMap(e);
						}, {});
						for (var r = [], i = function() {
							var e = o[a], i = t.mapper[e], s = i.from, c = i.data;
							r.push(Promise.resolve(c).then(function(r) {
								var i = t.compiled[s];
								return i.filePath = e, i.scopeManager = t.getScopeManager(e, i, r), i.resolveTags(r).then(function(e) {
									return i.scopeManager.finishedResolving = !0, e;
								}, function(e) {
									G(n, e);
								});
							}));
						}, a = 0, o = Object.keys(t.mapper); a < o.length; a++) i();
						return Promise.all(r).then(function(e) {
							return n.length !== 0 && (t.options.errorLogging && N(n, t.options.errorLogging), F(n)), ie(e);
						});
					});
				}
			},
			{
				key: "compile",
				value: function() {
					if (he(this, "compile"), this.updateFileTypeConfig(), q(this.modules), this.modules = fe(this.modules), Object.keys(this.compiled).length) return this;
					for (var e = this.options, t = 0, n = this.modules; t < n.length; t++) e = n[t].optionsTransformer(e, this);
					this.options = e, this.options.xmlFileNames = W(this.options.xmlFileNames);
					for (var r = 0, i = this.options.xmlFileNames; r < i.length; r++) {
						var a = i[r], o = this.zip.files[a].asText();
						this.xmlDocuments[a] = ne(o);
					}
					this.setModules({
						zip: this.zip,
						xmlDocuments: this.xmlDocuments
					});
					for (var s = 0, c = this.modules; s < c.length; s++) {
						var l = c[s];
						l.xmlDocuments = this.xmlDocuments;
					}
					this.getTemplatedFiles(), this.sendEvent("before-preparse");
					for (var u = 0, d = this.templatedFiles; u < d.length; u++) {
						var f = d[u];
						this.zip.files[f] != null && this.precompileFile(f);
					}
					this.sendEvent("after-preparse");
					for (var p = 0, m = this.templatedFiles; p < m.length; p++) {
						var h = m[p];
						this.zip.files[h] != null && this.compiled[h].parse({ noPostParse: !0 });
					}
					this.sendEvent("after-parse");
					for (var g = 0, _ = this.templatedFiles; g < _.length; g++) {
						var v = _[g];
						this.zip.files[v] != null && this.compiled[v].postparse();
					}
					return this.sendEvent("after-postparse"), this.setModules({ compiled: this.compiled }), _e(this), this;
				}
			},
			{
				key: "updateFileTypeConfig",
				value: function() {
					this.relsTypes = w(this.zip);
					var t = D(this.zip), n = t.overrides, r = t.defaults, i = t.contentTypes, a = t.contentTypeXml;
					a && (this.filesContentTypes = E(n, r, this.zip), this.invertedContentTypes = ce(this.filesContentTypes), this.setModules({
						contentTypes: this.contentTypes,
						invertedContentTypes: this.invertedContentTypes
					}));
					var o;
					this.zip.files.mimetype && (o = "odt");
					for (var s = 0, c = this.modules; s < c.length; s++) o = c[s].getFileType({
						zip: this.zip,
						contentTypes: i,
						contentTypeXml: a,
						overrides: n,
						defaults: r,
						doc: this
					}) || o;
					if (this.fileType = o, o === "odt" && H(o), o || V(this.zip), de(this), ge(this), this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig, !this.fileTypeConfig) if (e.FileTypeConfig[this.fileType]) this.fileTypeConfig = e.FileTypeConfig[this.fileType]();
					else {
						var l = `Filetype "${this.fileType}" is not supported`, u = "filetype_not_supported";
						this.fileType === "xlsx" && (l = `Filetype "${this.fileType}" is supported only with the paid XlsxModule`, u = "xlsx_filetype_needs_xlsx_module");
						var d = new B(l);
						throw d.properties = {
							id: u,
							explanation: l
						}, d;
					}
					return this;
				}
			},
			{
				key: "renderAsync",
				value: function(e) {
					var t = this;
					this.hideDeprecations = !0;
					var n = this.resolveData(e);
					return this.hideDeprecations = !1, this.zip.xtRendered = !0, n.then(function() {
						return t.render();
					});
				}
			},
			{
				key: "render",
				value: function(e) {
					this.zip.xtRendered = !0, this.rendered && R(), this.rendered = !0, Object.keys(this.compiled).length === 0 && this.compile(), this.errors.length > 0 && L(), arguments.length > 0 && (this.data = e), this.setModules({
						data: this.data,
						Lexer: ee
					}), this.mapper ||= this.modules.reduce(function(e, t) {
						return t.getRenderedMap(e);
					}, {});
					var t = [];
					for (var n in this.mapper) {
						var r = this.mapper[n], i = r.from, a = r.data, s = this.compiled[i];
						s.scopeManager = this.getScopeManager(n, s, a), s.render(n), t.push([
							n,
							s.content,
							s
						]), delete s.content;
					}
					for (var c = 0; c < t.length; c++) for (var l = t[c], u = o(l, 3), d = u[1], f = u[2], p = 0, m = this.modules; p < m.length; p++) {
						var h = m[p];
						if (h.preZip) {
							var g = h.preZip(d, f);
							typeof g == "string" && (l[1] = g);
						}
					}
					for (var _ = 0; _ < t.length; _++) {
						var v = o(t[_], 2), y = v[0], b = v[1];
						this.zip.file(y, b, { createFolders: !0 });
					}
					return _e(this), this.sendEvent("syncing-zip"), this.syncZip(), this.sendEvent("synced-zip"), this;
				}
			},
			{
				key: "syncZip",
				value: function() {
					for (var e in this.xmlDocuments) {
						this.zip.remove(e);
						var t = re(this.xmlDocuments[e]);
						this.zip.file(e, t, { createFolders: !0 });
					}
				}
			},
			{
				key: "setData",
				value: function(e) {
					return he(this, "setData"), this.data = e, this;
				}
			},
			{
				key: "getZip",
				value: function() {
					return this.zip;
				}
			},
			{
				key: "createTemplateClass",
				value: function(e) {
					var t = this.zip.files[e].asText();
					return this.createTemplateClassFromContent(t, e);
				}
			},
			{
				key: "createTemplateClassFromContent",
				value: function(t, n) {
					for (var r = {
						filePath: n,
						contentType: this.filesContentTypes[n],
						relsType: this.relsTypes[n]
					}, i = U(), a = G(Object.keys(i), [
						"filesContentTypes",
						"fileTypeConfig",
						"fileType",
						"modules"
					]), o = 0; o < a.length; o++) {
						var s = a[o];
						r[s] = this[s];
					}
					return new e.XmlTemplater(t, r);
				}
			},
			{
				key: "getFullText",
				value: function(e) {
					return this.createTemplateClass(e || this.fileTypeConfig.textPath(this)).getFullText();
				}
			},
			{
				key: "getTemplatedFiles",
				value: function() {
					this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip), G(this.templatedFiles, this.targets);
					var e = this.fileTypeConfig.templatedNs || [];
					if (e.length > 0) {
						for (var t in this.filesContentTypes) if (/^customXml\/item\d+\.xml$/.test(t)) for (var n = 0; n < e.length; n++) {
							var r = e[n];
							this.zip.file(t).asText().indexOf(`xmlns="${r}"`) !== -1 && this.templatedFiles.push(t);
						}
					}
					return this.templatedFiles = W(this.templatedFiles), this.templatedFiles;
				}
			},
			{
				key: "getTags",
				value: function() {
					var e = {
						headers: [],
						footers: []
					};
					for (var t in this.compiled) {
						var n = this.filesContentTypes[t];
						n === "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml" && (e.document = {
							target: t,
							tags: M(this.compiled[t].postparsed)
						}), n === "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml" && e.headers.push({
							target: t,
							tags: M(this.compiled[t].postparsed)
						}), n === "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml" && e.footers.push({
							target: t,
							tags: M(this.compiled[t].postparsed)
						});
					}
					return e;
				}
			},
			{
				key: "toBuffer",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: pe
					}, e), {}, { type: "nodebuffer" }));
				}
			},
			{
				key: "toBlob",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: pe
					}, e), {}, { type: "blob" }));
				}
			},
			{
				key: "toBase64",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: pe
					}, e), {}, { type: "base64" }));
				}
			},
			{
				key: "toUint8Array",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: pe
					}, e), {}, { type: "uint8array" }));
				}
			},
			{
				key: "toArrayBuffer",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: pe
					}, e), {}, { type: "arraybuffer" }));
				}
			}
		]);
	}();
	ye.DocUtils = b, ye.Errors = Vc(), ye.XmlTemplater = ll(), ye.FileTypeConfig = gl(), ye.XmlMatcher = tl(), t.exports = ye, t.exports.default = ye;
})), vl = /* @__PURE__ */ k(((e) => {
	var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	e.encode = function(e) {
		for (var n = "", r, i, a, o, s, c, l, u = 0; u < e.length;) r = e.charCodeAt(u++), i = e.charCodeAt(u++), a = e.charCodeAt(u++), o = r >> 2, s = (r & 3) << 4 | i >> 4, c = (i & 15) << 2 | a >> 6, l = a & 63, isNaN(i) ? c = l = 64 : isNaN(a) && (l = 64), n = n + t.charAt(o) + t.charAt(s) + t.charAt(c) + t.charAt(l);
		return n;
	}, e.decode = function(e) {
		var n = "", r, i, a, o, s, c, l, u = 0;
		for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length;) o = t.indexOf(e.charAt(u++)), s = t.indexOf(e.charAt(u++)), c = t.indexOf(e.charAt(u++)), l = t.indexOf(e.charAt(u++)), r = o << 2 | s >> 4, i = (s & 15) << 4 | c >> 2, a = (c & 3) << 6 | l, n += String.fromCharCode(r), c !== 64 && (n += String.fromCharCode(i)), l !== 64 && (n += String.fromCharCode(a));
		return n;
	};
})), yl = /* @__PURE__ */ k(((e) => {
	if (e.base64 = !0, e.array = !0, e.string = !0, e.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", e.nodebuffer = typeof Buffer < "u", e.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") e.blob = !1;
	else {
		var t = /* @__PURE__ */ new ArrayBuffer(0);
		try {
			e.blob = new Blob([t], { type: "application/zip" }).size === 0;
		} catch {
			try {
				var n = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)();
				n.append(t), e.blob = n.getBlob("application/zip").size === 0;
			} catch {
				e.blob = !1;
			}
		}
	}
})), bl = /* @__PURE__ */ k(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : r((n = typeof globalThis < "u" ? globalThis : n || self).pako = {});
	})(e, (function(e) {
		function t(e) {
			for (var t = e.length; --t >= 0;) e[t] = 0;
		}
		var n = 30, r = new Uint8Array([
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			2,
			2,
			2,
			2,
			3,
			3,
			3,
			3,
			4,
			4,
			4,
			4,
			5,
			5,
			5,
			5,
			0
		]), i = new Uint8Array([
			0,
			0,
			0,
			0,
			1,
			1,
			2,
			2,
			3,
			3,
			4,
			4,
			5,
			5,
			6,
			6,
			7,
			7,
			8,
			8,
			9,
			9,
			10,
			10,
			11,
			11,
			12,
			12,
			13,
			13
		]), a = new Uint8Array([
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			2,
			3,
			7
		]), o = new Uint8Array([
			16,
			17,
			18,
			0,
			8,
			7,
			9,
			6,
			10,
			5,
			11,
			4,
			12,
			3,
			13,
			2,
			14,
			1,
			15
		]), s = Array(576);
		t(s);
		var c = Array(60);
		t(c);
		var l = Array(512);
		t(l);
		var u = Array(256);
		t(u);
		var d = Array(29);
		t(d);
		var f, p, m, h = Array(n);
		function g(e, t, n, r, i) {
			this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
		}
		function _(e, t) {
			this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
		}
		t(h);
		var v = function(e) {
			return e < 256 ? l[e] : l[256 + (e >>> 7)];
		}, y = function(e, t) {
			e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
		}, b = function(e, t, n) {
			e.bi_valid > 16 - n ? (e.bi_buf |= t << e.bi_valid & 65535, y(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += n - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
		}, x = function(e, t, n) {
			b(e, n[2 * t], n[2 * t + 1]);
		}, S = function(e, t) {
			var n = 0;
			do
				n |= 1 & e, e >>>= 1, n <<= 1;
			while (--t > 0);
			return n >>> 1;
		}, C = function(e, t, n) {
			var r, i, a = Array(16), o = 0;
			for (r = 1; r <= 15; r++) o = o + n[r - 1] << 1, a[r] = o;
			for (i = 0; i <= t; i++) {
				var s = e[2 * i + 1];
				s !== 0 && (e[2 * i] = S(a[s]++, s));
			}
		}, w = function(e) {
			var t;
			for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
			for (t = 0; t < n; t++) e.dyn_dtree[2 * t] = 0;
			for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
			e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
		}, T = function(e) {
			e.bi_valid > 8 ? y(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
		}, E = function(e, t, n, r) {
			var i = 2 * t, a = 2 * n;
			return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
		}, D = function(e, t, n) {
			for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && E(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !E(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
			e.heap[n] = r;
		}, O = function(e, t, n) {
			var a, o, s, c, l = 0;
			if (e.sym_next !== 0) do
				a = 255 & e.pending_buf[e.sym_buf + l++], a += (255 & e.pending_buf[e.sym_buf + l++]) << 8, o = e.pending_buf[e.sym_buf + l++], a === 0 ? x(e, o, t) : (s = u[o], x(e, s + 256 + 1, t), (c = r[s]) !== 0 && (o -= d[s], b(e, o, c)), a--, s = v(a), x(e, s, n), (c = i[s]) !== 0 && (a -= h[s], b(e, a, c)));
			while (l < e.sym_next);
			x(e, 256, t);
		}, k = function(e, t) {
			var n, r, i, a = t.dyn_tree, o = t.stat_desc.static_tree, s = t.stat_desc.has_stree, c = t.stat_desc.elems, l = -1;
			for (e.heap_len = 0, e.heap_max = 573, n = 0; n < c; n++) a[2 * n] === 0 ? a[2 * n + 1] = 0 : (e.heap[++e.heap_len] = l = n, e.depth[n] = 0);
			for (; e.heap_len < 2;) a[2 * (i = e.heap[++e.heap_len] = l < 2 ? ++l : 0)] = 1, e.depth[i] = 0, e.opt_len--, s && (e.static_len -= o[2 * i + 1]);
			for (t.max_code = l, n = e.heap_len >> 1; n >= 1; n--) D(e, a, n);
			i = c;
			do
				n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], D(e, a, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, a[2 * i] = a[2 * n] + a[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, a[2 * n + 1] = a[2 * r + 1] = i, e.heap[1] = i++, D(e, a, 1);
			while (e.heap_len >= 2);
			e.heap[--e.heap_max] = e.heap[1], function(e, t) {
				var n, r, i, a, o, s, c = t.dyn_tree, l = t.max_code, u = t.stat_desc.static_tree, d = t.stat_desc.has_stree, f = t.stat_desc.extra_bits, p = t.stat_desc.extra_base, m = t.stat_desc.max_length, h = 0;
				for (a = 0; a <= 15; a++) e.bl_count[a] = 0;
				for (c[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < 573; n++) (a = c[2 * c[2 * (r = e.heap[n]) + 1] + 1] + 1) > m && (a = m, h++), c[2 * r + 1] = a, r > l || (e.bl_count[a]++, o = 0, r >= p && (o = f[r - p]), s = c[2 * r], e.opt_len += s * (a + o), d && (e.static_len += s * (u[2 * r + 1] + o)));
				if (h !== 0) {
					do {
						for (a = m - 1; e.bl_count[a] === 0;) a--;
						e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[m]--, h -= 2;
					} while (h > 0);
					for (a = m; a !== 0; a--) for (r = e.bl_count[a]; r !== 0;) (i = e.heap[--n]) > l || (c[2 * i + 1] !== a && (e.opt_len += (a - c[2 * i + 1]) * c[2 * i], c[2 * i + 1] = a), r--);
				}
			}(e, t), C(a, l, e.bl_count);
		}, A = function(e, t, n) {
			var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
			for (o === 0 && (c = 138, l = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = o, o = t[2 * (r + 1) + 1], ++s < c && i === o || (s < l ? e.bl_tree[2 * i] += s : i === 0 ? s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++ : (i !== a && e.bl_tree[2 * i]++, e.bl_tree[32]++), s = 0, a = i, o === 0 ? (c = 138, l = 3) : i === o ? (c = 6, l = 3) : (c = 7, l = 4));
		}, j = function(e, t, n) {
			var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
			for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (i = o, o = t[2 * (r + 1) + 1], !(++s < c && i === o)) {
				if (s < l) do
					x(e, i, e.bl_tree);
				while (--s != 0);
				else i === 0 ? s <= 10 ? (x(e, 17, e.bl_tree), b(e, s - 3, 3)) : (x(e, 18, e.bl_tree), b(e, s - 11, 7)) : (i !== a && (x(e, i, e.bl_tree), s--), x(e, 16, e.bl_tree), b(e, s - 3, 2));
				s = 0, a = i, o === 0 ? (c = 138, l = 3) : i === o ? (c = 6, l = 3) : (c = 7, l = 4);
			}
		}, ee = !1, M = function(e, t, n, r) {
			b(e, 0 + +!!r, 3), T(e), y(e, n), y(e, ~n), n && e.pending_buf.set(e.window.subarray(t, t + n), e.pending), e.pending += n;
		}, N = {
			_tr_init: function(e) {
				ee ||= (function() {
					var e, t, o, _, v, y = Array(16);
					for (o = 0, _ = 0; _ < 28; _++) for (d[_] = o, e = 0; e < 1 << r[_]; e++) u[o++] = _;
					for (u[o - 1] = _, v = 0, _ = 0; _ < 16; _++) for (h[_] = v, e = 0; e < 1 << i[_]; e++) l[v++] = _;
					for (v >>= 7; _ < n; _++) for (h[_] = v << 7, e = 0; e < 1 << i[_] - 7; e++) l[256 + v++] = _;
					for (t = 0; t <= 15; t++) y[t] = 0;
					for (e = 0; e <= 143;) s[2 * e + 1] = 8, e++, y[8]++;
					for (; e <= 255;) s[2 * e + 1] = 9, e++, y[9]++;
					for (; e <= 279;) s[2 * e + 1] = 7, e++, y[7]++;
					for (; e <= 287;) s[2 * e + 1] = 8, e++, y[8]++;
					for (C(s, 287, y), e = 0; e < n; e++) c[2 * e + 1] = 5, c[2 * e] = S(e, 5);
					f = new g(s, r, 257, 286, 15), p = new g(c, i, 0, n, 15), m = new g([], a, 0, 19, 7);
				}(), !0), e.l_desc = new _(e.dyn_ltree, f), e.d_desc = new _(e.dyn_dtree, p), e.bl_desc = new _(e.bl_tree, m), e.bi_buf = 0, e.bi_valid = 0, w(e);
			},
			_tr_stored_block: M,
			_tr_flush_block: function(e, t, n, r) {
				var i, a, l = 0;
				e.level > 0 ? (e.strm.data_type === 2 && (e.strm.data_type = function(e) {
					var t, n = 4093624447;
					for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && e.dyn_ltree[2 * t] !== 0) return 0;
					if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return 1;
					for (t = 32; t < 256; t++) if (e.dyn_ltree[2 * t] !== 0) return 1;
					return 0;
				}(e)), k(e, e.l_desc), k(e, e.d_desc), l = function(e) {
					var t;
					for (A(e, e.dyn_ltree, e.l_desc.max_code), A(e, e.dyn_dtree, e.d_desc.max_code), k(e, e.bl_desc), t = 18; t >= 3 && e.bl_tree[2 * o[t] + 1] === 0; t--);
					return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
				}(e), i = e.opt_len + 3 + 7 >>> 3, (a = e.static_len + 3 + 7 >>> 3) <= i && (i = a)) : i = a = n + 5, n + 4 <= i && t !== -1 ? M(e, t, n, r) : e.strategy === 4 || a === i ? (b(e, 2 + +!!r, 3), O(e, s, c)) : (b(e, 4 + +!!r, 3), function(e, t, n, r) {
					var i;
					for (b(e, t - 257, 5), b(e, n - 1, 5), b(e, r - 4, 4), i = 0; i < r; i++) b(e, e.bl_tree[2 * o[i] + 1], 3);
					j(e, e.dyn_ltree, t - 1), j(e, e.dyn_dtree, n - 1);
				}(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1), O(e, e.dyn_ltree, e.dyn_dtree)), w(e), r && T(e);
			},
			_tr_tally: function(e, t, n) {
				return e.pending_buf[e.sym_buf + e.sym_next++] = t, e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = n, t === 0 ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (u[n] + 256 + 1)]++, e.dyn_dtree[2 * v(t)]++), e.sym_next === e.sym_end;
			},
			_tr_align: function(e) {
				b(e, 2, 3), x(e, 256, s), function(e) {
					e.bi_valid === 16 ? (y(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
				}(e);
			}
		}, P = function(e, t, n, r) {
			for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0;) {
				n -= o = n > 2e3 ? 2e3 : n;
				do
					a = a + (i = i + t[r++] | 0) | 0;
				while (--o);
				i %= 65521, a %= 65521;
			}
			return i | a << 16 | 0;
		}, F = new Uint32Array(function() {
			for (var e, t = [], n = 0; n < 256; n++) {
				e = n;
				for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
				t[n] = e;
			}
			return t;
		}()), I = function(e, t, n, r) {
			var i = F, a = r + n;
			e ^= -1;
			for (var o = r; o < a; o++) e = e >>> 8 ^ i[255 & (e ^ t[o])];
			return -1 ^ e;
		}, L = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version"
		}, R = {
			Z_NO_FLUSH: 0,
			Z_PARTIAL_FLUSH: 1,
			Z_SYNC_FLUSH: 2,
			Z_FULL_FLUSH: 3,
			Z_FINISH: 4,
			Z_BLOCK: 5,
			Z_TREES: 6,
			Z_OK: 0,
			Z_STREAM_END: 1,
			Z_NEED_DICT: 2,
			Z_ERRNO: -1,
			Z_STREAM_ERROR: -2,
			Z_DATA_ERROR: -3,
			Z_MEM_ERROR: -4,
			Z_BUF_ERROR: -5,
			Z_NO_COMPRESSION: 0,
			Z_BEST_SPEED: 1,
			Z_BEST_COMPRESSION: 9,
			Z_DEFAULT_COMPRESSION: -1,
			Z_FILTERED: 1,
			Z_HUFFMAN_ONLY: 2,
			Z_RLE: 3,
			Z_FIXED: 4,
			Z_DEFAULT_STRATEGY: 0,
			Z_BINARY: 0,
			Z_TEXT: 1,
			Z_UNKNOWN: 2,
			Z_DEFLATED: 8
		}, z = N._tr_init, B = N._tr_stored_block, V = N._tr_flush_block, H = N._tr_tally, te = N._tr_align, U = R.Z_NO_FLUSH, ne = R.Z_PARTIAL_FLUSH, re = R.Z_FULL_FLUSH, ie = R.Z_FINISH, W = R.Z_BLOCK, ae = R.Z_OK, oe = R.Z_STREAM_END, G = R.Z_STREAM_ERROR, se = R.Z_DATA_ERROR, ce = R.Z_BUF_ERROR, le = R.Z_DEFAULT_COMPRESSION, ue = R.Z_FILTERED, K = R.Z_HUFFMAN_ONLY, q = R.Z_RLE, de = R.Z_FIXED, fe = R.Z_DEFAULT_STRATEGY, pe = R.Z_UNKNOWN, me = R.Z_DEFLATED, he = 258, ge = 262, _e = 42, ve = 113, ye = 666, be = function(e, t) {
			return e.msg = L[t], t;
		}, xe = function(e) {
			return 2 * e - (e > 4 ? 9 : 0);
		}, Se = function(e) {
			for (var t = e.length; --t >= 0;) e[t] = 0;
		}, Ce = function(e) {
			var t, n, r, i = e.w_size;
			r = t = e.hash_size;
			do
				n = e.head[--r], e.head[r] = n >= i ? n - i : 0;
			while (--t);
			r = t = i;
			do
				n = e.prev[--r], e.prev[r] = n >= i ? n - i : 0;
			while (--t);
		}, we = function(e, t, n) {
			return (t << e.hash_shift ^ n) & e.hash_mask;
		}, Te = function(e, t) {
			var n;
			if (e.legacy_hash) n = e.ins_h = we(e, e.ins_h, e.window[t + 3 - 1]);
			else {
				var r = e.window, i = r[t] | r[t + 1] << 8 | r[t + 2] << 16 | r[t + 3] << 24;
				n = e.ins_h = Math.imul(i, 66521) + 66521 >>> 16 & e.hash_mask;
			}
			var a = e.prev[t & e.w_mask] = e.head[n];
			return e.head[n] = t, a;
		}, Ee = function(e) {
			var t = e.state, n = t.pending;
			n > e.avail_out && (n = e.avail_out), n !== 0 && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
		}, De = function(e, t) {
			V(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, Ee(e.strm);
		}, J = function(e, t) {
			e.pending_buf[e.pending++] = t;
		}, Oe = function(e, t) {
			e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
		}, ke = function(e, t, n, r) {
			var i = e.avail_in;
			return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, t.set(e.input.subarray(e.next_in, e.next_in + i), n), e.state.wrap === 1 ? e.adler = P(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = I(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
		}, Ae = function(e, t) {
			var n, r, i = e.max_chain_length, a = e.strstart, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - ge ? e.strstart - (e.w_size - ge) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + he, p = l[a + o - 1], m = l[a + o];
			e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
			do
				if (l[(n = t) + o] === m && l[n + o - 1] === p && l[n] === l[a] && l[++n] === l[a + 1]) {
					a += 2, n++;
					do					;
while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < f);
					if (r = he - (f - a), a = f - he, r > o) {
						if (e.match_start = t, o = r, r >= s) break;
						p = l[a + o - 1], m = l[a + o];
					}
				}
			while ((t = d[t & u]) > c && --i != 0);
			return o <= e.lookahead ? o : e.lookahead;
		}, je = function(e) {
			var t, n, r, i = e.w_size;
			do {
				if (n = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - ge) && (e.window.set(e.window.subarray(i, i + i - n), 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, e.insert > e.strstart && (e.insert = e.strstart), Ce(e), n += i), e.strm.avail_in === 0) break;
				if (t = ke(e.strm, e.window, e.strstart + e.lookahead, n), e.lookahead += t, e.legacy_hash) {
					if (e.lookahead + e.insert >= 3) for (r = e.strstart - e.insert, e.ins_h = e.window[r], e.ins_h = we(e, e.ins_h, e.window[r + 1]); e.insert && (Te(e, r), r++, e.insert--, !(e.lookahead + e.insert < 3)););
				} else if (e.lookahead + e.insert > 3) for (r = e.strstart - e.insert; e.insert && (Te(e, r), r++, e.insert--, !(e.lookahead + e.insert <= 3)););
			} while (e.lookahead < ge && e.strm.avail_in !== 0);
		}, Me = function(e, t) {
			var n, r, i, a = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, o = 0, s = e.strm.avail_in;
			do {
				if (n = 65535, i = e.bi_valid + 42 >> 3, e.strm.avail_out < i || (i = e.strm.avail_out - i, n > (r = e.strstart - e.block_start) + e.strm.avail_in && (n = r + e.strm.avail_in), n > i && (n = i), n < a && (n === 0 && t !== ie || t === U || n !== r + e.strm.avail_in))) break;
				o = +(t === ie && n === r + e.strm.avail_in), B(e, 0, 0, o), e.pending_buf[e.pending - 4] = n, e.pending_buf[e.pending - 3] = n >> 8, e.pending_buf[e.pending - 2] = ~n, e.pending_buf[e.pending - 1] = ~n >> 8, Ee(e.strm), r && (r > n && (r = n), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + r), e.strm.next_out), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r, e.block_start += r, n -= r), n && (ke(e.strm, e.strm.output, e.strm.next_out, n), e.strm.next_out += n, e.strm.avail_out -= n, e.strm.total_out += n);
			} while (o === 0);
			return (s -= e.strm.avail_in) && (s >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= s && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - s, e.strm.next_in), e.strstart), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), o ? 4 : t !== U && t !== ie && e.strm.avail_in === 0 && e.strstart === e.block_start ? 2 : (i = e.window_size - e.strstart, e.strm.avail_in > i && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, i += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), i > e.strm.avail_in && (i = e.strm.avail_in), i && (ke(e.strm, e.window, e.strstart, i), e.strstart += i, e.insert += i > e.w_size - e.insert ? e.w_size - e.insert : i), e.high_water < e.strstart && (e.high_water = e.strstart), i = e.bi_valid + 42 >> 3, a = (i = e.pending_buf_size - i > 65535 ? 65535 : e.pending_buf_size - i) > e.w_size ? e.w_size : i, ((r = e.strstart - e.block_start) >= a || (r || t === ie) && t !== U && e.strm.avail_in === 0 && r <= i) && (n = r > i ? i : r, o = +(t === ie && e.strm.avail_in === 0 && n === r), B(e, e.block_start, n, o), e.block_start += n, Ee(e.strm)), o ? 3 : 1);
		}, Ne = function(e, t) {
			for (var n, r;;) {
				if (e.lookahead < ge) {
					if (je(e), e.lookahead < ge && t === U) return 1;
					if (e.lookahead === 0) break;
				}
				if (n = 0, e.lookahead >= 3 && (n = Te(e, e.strstart)), n !== 0 && e.strstart - n <= e.w_size - ge && (e.match_length = Ae(e, n)), e.match_length >= 3) if (r = H(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
					e.match_length--;
					do
						e.strstart++, n = Te(e, e.strstart);
					while (--e.match_length != 0);
					e.strstart++;
				} else e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = we(e, e.ins_h, e.window[e.strstart + 1]));
				else r = H(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
				if (r && (De(e, !1), e.strm.avail_out === 0)) return 1;
			}
			return e.insert = e.strstart < 2 ? e.strstart : 2, t === ie ? (De(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (De(e, !1), e.strm.avail_out === 0) ? 1 : 2;
		}, Pe = function(e, t) {
			for (var n, r, i;;) {
				if (e.lookahead < ge) {
					if (je(e), e.lookahead < ge && t === U) return 1;
					if (e.lookahead === 0) break;
				}
				if (n = 0, e.lookahead >= 3 && (n = Te(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - ge && (e.match_length = Ae(e, n), e.match_length <= 5 && (e.strategy === ue || e.match_length === 3 && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
					i = e.strstart + e.lookahead - 3, r = H(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
					do
						++e.strstart <= i && (n = Te(e, e.strstart));
					while (--e.prev_length != 0);
					if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (De(e, !1), e.strm.avail_out === 0)) return 1;
				} else if (e.match_available) {
					if ((r = H(e, 0, e.window[e.strstart - 1])) && De(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return 1;
				} else e.match_available = 1, e.strstart++, e.lookahead--;
			}
			return e.match_available &&= (r = H(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === ie ? (De(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (De(e, !1), e.strm.avail_out === 0) ? 1 : 2;
		};
		function Fe(e, t, n, r, i) {
			this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
		}
		var Ie = [
			new Fe(0, 0, 0, 0, Me),
			new Fe(4, 4, 8, 4, Ne),
			new Fe(4, 5, 16, 8, Ne),
			new Fe(4, 6, 32, 32, Ne),
			new Fe(4, 4, 16, 16, Pe),
			new Fe(8, 16, 32, 32, Pe),
			new Fe(8, 16, 128, 128, Pe),
			new Fe(8, 32, 128, 256, Pe),
			new Fe(32, 128, 258, 1024, Pe),
			new Fe(32, 258, 258, 4096, Pe)
		];
		function Le() {
			this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = me, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = /* @__PURE__ */ new Uint16Array(1146), this.dyn_dtree = /* @__PURE__ */ new Uint16Array(122), this.bl_tree = /* @__PURE__ */ new Uint16Array(78), Se(this.dyn_ltree), Se(this.dyn_dtree), Se(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = /* @__PURE__ */ new Uint16Array(16), this.heap = /* @__PURE__ */ new Uint16Array(573), Se(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = /* @__PURE__ */ new Uint16Array(573), Se(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
		}
		var Re = function(e) {
			if (!e) return 1;
			var t = e.state;
			return +(!t || t.strm !== e || t.status !== _e && t.status !== 57 && t.status !== 69 && t.status !== 73 && t.status !== 91 && t.status !== 103 && t.status !== ve && t.status !== ye);
		}, ze = function(e) {
			if (Re(e)) return be(e, G);
			e.total_in = e.total_out = 0, e.data_type = pe;
			var t = e.state;
			return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap === 2 ? 57 : t.wrap ? _e : ve, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = -2, z(t), ae;
		}, Be = function(e) {
			var t, n = ze(e);
			return n === ae && ((t = e.state).window_size = 2 * t.w_size, Se(t.head), t.max_lazy_match = Ie[t.level].max_lazy, t.good_match = Ie[t.level].good_length, t.nice_match = Ie[t.level].nice_length, t.max_chain_length = Ie[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = 2, t.match_available = 0, t.ins_h = 0), n;
		}, Ve = function(e, t, n, r, i, a, o) {
			if (!e) return G;
			var s = 1;
			if (t === le && (t = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > 9 || n !== me || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > de || r === 8 && s !== 1) return be(e, G);
			r === 8 && (r = 9);
			var c = new Le();
			return e.state = c, c.strm = e, c.status = _e, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.legacy_hash = +!!o, c.hash_bits = i + 7, !c.legacy_hash && c.hash_bits < 15 && (c.hash_bits = 15), c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + 3 - 1) / 3), c.window = new Uint8Array(2 * c.w_size), c.head = new Uint16Array(c.hash_size), c.prev = new Uint16Array(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new Uint8Array(c.pending_buf_size), c.sym_buf = c.lit_bufsize, c.sym_end = 3 * (c.lit_bufsize - 1), c.level = t, c.strategy = a, c.method = n, Be(e);
		}, He = {
			deflateInit: function(e, t) {
				return Ve(e, t, me, 15, 8, fe);
			},
			deflateInit2: Ve,
			deflateReset: Be,
			deflateResetKeep: ze,
			deflateSetHeader: function(e, t) {
				return Re(e) || e.state.wrap !== 2 ? G : (e.state.gzhead = t, ae);
			},
			deflate: function(e, t) {
				if (Re(e) || t > W || t < 0) return e ? be(e, G) : G;
				var n = e.state;
				if (!e.output || e.avail_in !== 0 && !e.input || n.status === ye && t !== ie) return be(e, e.avail_out === 0 ? ce : G);
				var r = n.last_flush;
				if (n.last_flush = t, n.pending !== 0) {
					if (Ee(e), e.avail_out === 0) return n.last_flush = -1, ae;
				} else if (e.avail_in === 0 && xe(t) <= xe(r) && t !== ie) return be(e, ce);
				if (n.status === ye && e.avail_in !== 0) return be(e, ce);
				if (n.status === _e && n.wrap === 0 && (n.status = ve), n.status === _e) {
					var i = me + (n.w_bits - 8 << 4) << 8;
					if (i |= (n.strategy >= K || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3) << 6, n.strstart !== 0 && (i |= 32), Oe(n, i += 31 - i % 31), n.strstart !== 0 && (Oe(n, e.adler >>> 16), Oe(n, 65535 & e.adler)), e.adler = 1, n.status = ve, Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
				}
				if (n.status === 57) {
					if (e.adler = 0, J(n, 31), J(n, 139), J(n, 8), n.gzhead) J(n, +!!n.gzhead.text + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), J(n, 255 & n.gzhead.time), J(n, n.gzhead.time >> 8 & 255), J(n, n.gzhead.time >> 16 & 255), J(n, n.gzhead.time >> 24 & 255), J(n, n.level === 9 ? 2 : n.strategy >= K || n.level < 2 ? 4 : 0), J(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (J(n, 255 & n.gzhead.extra.length), J(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = I(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69;
					else if (J(n, 0), J(n, 0), J(n, 0), J(n, 0), J(n, 0), J(n, n.level === 9 ? 2 : n.strategy >= K || n.level < 2 ? 4 : 0), J(n, 3), n.status = ve, Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
				}
				if (n.status === 69) {
					if (n.gzhead.extra) {
						for (var a = n.pending, o = (65535 & n.gzhead.extra.length) - n.gzindex; n.pending + o > n.pending_buf_size;) {
							var s = n.pending_buf_size - n.pending;
							if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + s), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > a && (e.adler = I(e.adler, n.pending_buf, n.pending - a, a)), n.gzindex += s, Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
							a = 0, o -= s;
						}
						var c = new Uint8Array(n.gzhead.extra);
						n.pending_buf.set(c.subarray(n.gzindex, n.gzindex + o), n.pending), n.pending += o, n.gzhead.hcrc && n.pending > a && (e.adler = I(e.adler, n.pending_buf, n.pending - a, a)), n.gzindex = 0;
					}
					n.status = 73;
				}
				if (n.status === 73) {
					if (n.gzhead.name) {
						var l, u = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > u && (e.adler = I(e.adler, n.pending_buf, n.pending - u, u)), Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
								u = 0;
							}
							l = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, J(n, l);
						} while (l !== 0);
						n.gzhead.hcrc && n.pending > u && (e.adler = I(e.adler, n.pending_buf, n.pending - u, u)), n.gzindex = 0;
					}
					n.status = 91;
				}
				if (n.status === 91) {
					if (n.gzhead.comment) {
						var d, f = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > f && (e.adler = I(e.adler, n.pending_buf, n.pending - f, f)), Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
								f = 0;
							}
							d = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, J(n, d);
						} while (d !== 0);
						n.gzhead.hcrc && n.pending > f && (e.adler = I(e.adler, n.pending_buf, n.pending - f, f));
					}
					n.status = 103;
				}
				if (n.status === 103) {
					if (n.gzhead.hcrc) {
						if (n.pending + 2 > n.pending_buf_size && (Ee(e), n.pending !== 0)) return n.last_flush = -1, ae;
						J(n, 255 & e.adler), J(n, e.adler >> 8 & 255), e.adler = 0;
					}
					if (n.status = ve, Ee(e), n.pending !== 0) return n.last_flush = -1, ae;
				}
				if (e.avail_in !== 0 || n.lookahead !== 0 || t !== U && n.status !== ye) {
					var p = n.level === 0 ? Me(n, t) : n.strategy === K ? function(e, t) {
						for (var n;;) {
							if (e.lookahead === 0 && (je(e), e.lookahead === 0)) {
								if (t === U) return 1;
								break;
							}
							if (e.match_length = 0, n = H(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (De(e, !1), e.strm.avail_out === 0)) return 1;
						}
						return e.insert = 0, t === ie ? (De(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (De(e, !1), e.strm.avail_out === 0) ? 1 : 2;
					}(n, t) : n.strategy === q ? function(e, t) {
						for (var n, r, i, a, o = e.window;;) {
							if (e.lookahead <= he) {
								if (je(e), e.lookahead <= he && t === U) return 1;
								if (e.lookahead === 0) break;
							}
							if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (r = o[i = e.strstart - 1]) === o[++i] && r === o[++i] && r === o[++i]) {
								a = e.strstart + he;
								do								;
while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
								e.match_length = he - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
							}
							if (e.match_length >= 3 ? (n = H(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = H(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (De(e, !1), e.strm.avail_out === 0)) return 1;
						}
						return e.insert = 0, t === ie ? (De(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (De(e, !1), e.strm.avail_out === 0) ? 1 : 2;
					}(n, t) : Ie[n.level].func(n, t);
					if (p !== 3 && p !== 4 || (n.status = ye), p === 1 || p === 3) return e.avail_out === 0 && (n.last_flush = -1), ae;
					if (p === 2 && (t === ne ? te(n) : t !== W && (B(n, 0, 0, !1), t === re && (Se(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), Ee(e), e.avail_out === 0)) return n.last_flush = -1, ae;
				}
				return t === ie ? n.wrap <= 0 ? oe : (n.wrap === 2 ? (J(n, 255 & e.adler), J(n, e.adler >> 8 & 255), J(n, e.adler >> 16 & 255), J(n, e.adler >> 24 & 255), J(n, 255 & e.total_in), J(n, e.total_in >> 8 & 255), J(n, e.total_in >> 16 & 255), J(n, e.total_in >> 24 & 255)) : (Oe(n, e.adler >>> 16), Oe(n, 65535 & e.adler)), Ee(e), n.wrap > 0 && (n.wrap = -n.wrap), n.pending === 0 ? oe : ae) : ae;
			},
			deflateEnd: function(e) {
				if (Re(e)) return G;
				var t = e.state.status;
				return e.state = null, t === ve ? be(e, se) : ae;
			},
			deflateSetDictionary: function(e, t) {
				var n = t.length;
				if (Re(e)) return G;
				var r = e.state, i = r.wrap;
				if (i === 2 || i === 1 && r.status !== _e || r.lookahead) return G;
				if (i === 1 && (e.adler = P(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size) {
					i === 0 && (Se(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
					var a = new Uint8Array(r.w_size);
					a.set(t.subarray(n - r.w_size, n), 0), t = a, n = r.w_size;
				}
				var o = e.avail_in, s = e.next_in, c = e.input;
				for (e.avail_in = n, e.next_in = 0, e.input = t, je(r); r.lookahead >= 3;) {
					var l = r.strstart, u = r.lookahead - 2;
					do
						Te(r, l), l++;
					while (--u);
					r.strstart = l, r.lookahead = 2, je(r);
				}
				return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = s, e.input = c, e.avail_in = o, r.wrap = i, ae;
			},
			deflateInfo: "pako deflate (from Nodeca project)"
		};
		function Ue(e) {
			return Ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, Ue(e);
		}
		var We = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}, Ge = function(e) {
			for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
				var n = t.shift();
				if (n) {
					if (Ue(n) !== "object") throw TypeError(n + "must be non-object");
					for (var r in n) We(n, r) && (e[r] = n[r]);
				}
			}
			return e;
		}, Ke = function(e) {
			for (var t = 0, n = 0, r = e.length; n < r; n++) t += e[n].length;
			for (var i = new Uint8Array(t), a = 0, o = 0, s = e.length; a < s; a++) {
				var c = e[a];
				i.set(c, o), o += c.length;
			}
			return i;
		}, qe = !0;
		try {
			String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
		} catch {
			qe = !1;
		}
		for (var Je = /* @__PURE__ */ new Uint8Array(256), Ye = 0; Ye < 256; Ye++) Je[Ye] = Ye >= 252 ? 6 : Ye >= 248 ? 5 : Ye >= 240 ? 4 : Ye >= 224 ? 3 : Ye >= 192 ? 2 : 1;
		Je[254] = Je[255] = 1;
		var Xe = function(e) {
			if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(e);
			var t, n, r, i, a, o = e.length, s = 0;
			for (i = 0; i < o; i++) (64512 & (n = e.charCodeAt(i))) == 55296 && i + 1 < o && (64512 & (r = e.charCodeAt(i + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
			for (t = new Uint8Array(s), a = 0, i = 0; a < s; i++) (64512 & (n = e.charCodeAt(i))) == 55296 && i + 1 < o && (64512 & (r = e.charCodeAt(i + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n);
			return t;
		}, Ze = function(e, t) {
			var n, r, i = t || e.length;
			if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(e.subarray(0, t));
			var a = Array(2 * i);
			for (r = 0, n = 0; n < i;) {
				var o = e[n++];
				if (o < 128) a[r++] = o;
				else {
					var s = Je[o];
					if (s > 4) a[r++] = 65533, n += s - 1;
					else {
						for (o &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && n < i;) o = o << 6 | 63 & e[n++], s--;
						s > 1 ? a[r++] = 65533 : o < 65536 ? a[r++] = o : (o -= 65536, a[r++] = 55296 | o >> 10 & 1023, a[r++] = 56320 | 1023 & o);
					}
				}
			}
			return function(e, t) {
				if (t < 65534 && e.subarray && qe) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
				for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
				return n;
			}(a, r);
		}, Qe = function(e, t) {
			(t ||= e.length) > e.length && (t = e.length);
			for (var n = t - 1; n >= 0 && (192 & e[n]) == 128;) n--;
			return n < 0 || n === 0 ? t : n + Je[e[n]] > t ? n : t;
		}, $e = function() {
			this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
		}, et = Object.prototype.toString, tt = R.Z_NO_FLUSH, nt = R.Z_SYNC_FLUSH, rt = R.Z_FULL_FLUSH, it = R.Z_FINISH, at = R.Z_OK, ot = R.Z_STREAM_END, st = {
			level: R.Z_DEFAULT_COMPRESSION,
			method: R.Z_DEFLATED,
			chunkSize: 16384,
			windowBits: 15,
			memLevel: 8,
			strategy: R.Z_DEFAULT_STRATEGY,
			legacyHash: !0
		};
		function ct(e) {
			this.options = Ge({}, st, e || {});
			var t = this.options;
			t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new $e(), this.strm.avail_out = 0;
			var n = He.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy, t.legacyHash);
			if (n !== at) throw Error(L[n]);
			if (t.header && He.deflateSetHeader(this.strm, t.header), t.dictionary) {
				var r;
				if (r = typeof t.dictionary == "string" ? Xe(t.dictionary) : et.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, (n = He.deflateSetDictionary(this.strm, r)) !== at) throw Error(L[n]);
				this._dict_set = !0;
			}
		}
		function lt(e, t) {
			var n = new ct(t);
			if (n.push(e, !0), n.err) throw n.msg || L[n.err];
			return n.result;
		}
		ct.prototype.push = function(e, t) {
			var n, r, i = this.strm, a = this.options.chunkSize;
			if (this.ended) return !1;
			for (r = t === ~~t ? t : !0 === t ? it : tt, typeof e == "string" ? i.input = Xe(e) : et.call(e) === "[object ArrayBuffer]" ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;;) if (i.avail_out === 0 && (i.output = new Uint8Array(a), i.next_out = 0, i.avail_out = a), (r === nt || r === rt) && i.avail_out <= 6) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
			else {
				if ((n = He.deflate(i, r)) === ot) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), n = He.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === at;
				if (i.avail_out !== 0) {
					if (r > 0 && i.next_out > 0) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
					else if (i.avail_in === 0) break;
				} else this.onData(i.output);
			}
			return !0;
		}, ct.prototype.onData = function(e) {
			this.chunks.push(e);
		}, ct.prototype.onEnd = function(e) {
			e === at && (this.result = Ke(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
		};
		var ut = {
			Deflate: ct,
			deflate: lt,
			deflateRaw: function(e, t) {
				return (t ||= {}).raw = !0, lt(e, t);
			},
			gzip: function(e, t) {
				return (t ||= {}).gzip = !0, lt(e, t);
			},
			constants: R
		}, dt = 16209, ft = function(e, t) {
			var n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e.state;
			n = e.next_in, w = e.input, r = n + (e.avail_in - 5), i = e.next_out, T = e.output, a = i - (t - e.avail_out), o = i + (e.avail_out - 257), s = E.dmax, c = E.wsize, l = E.whave, u = E.wnext, d = E.window, f = E.hold, p = E.bits, m = E.lencode, h = E.distcode, g = (1 << E.lenbits) - 1, _ = (1 << E.distbits) - 1;
			t: do {
				p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = m[f & g];
				e: for (;;) {
					if (f >>>= y = v >>> 24, p -= y, (y = v >>> 16 & 255) == 0) T[i++] = 65535 & v;
					else {
						if (!(16 & y)) {
							if (!(64 & y)) {
								v = m[(65535 & v) + (f & (1 << y) - 1)];
								continue e;
							}
							if (32 & y) {
								E.mode = 16191;
								break t;
							}
							e.msg = "invalid literal/length code", E.mode = dt;
							break t;
						}
						b = 65535 & v, (y &= 15) && (p < y && (f += w[n++] << p, p += 8), b += f & (1 << y) - 1, f >>>= y, p -= y), p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = h[f & _];
						a: for (;;) {
							if (f >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
								if (!(64 & y)) {
									v = h[(65535 & v) + (f & (1 << y) - 1)];
									continue a;
								}
								e.msg = "invalid distance code", E.mode = dt;
								break t;
							}
							if (x = 65535 & v, p < (y &= 15) && (f += w[n++] << p, (p += 8) < y && (f += w[n++] << p, p += 8)), (x += f & (1 << y) - 1) > s) {
								e.msg = "invalid distance too far back", E.mode = dt;
								break t;
							}
							if (f >>>= y, p -= y, x > (y = i - a)) {
								if ((y = x - y) > l && E.sane) {
									e.msg = "invalid distance too far back", E.mode = dt;
									break t;
								}
								if (S = 0, C = d, u === 0) {
									if (S += c - y, y < b) {
										b -= y;
										do
											T[i++] = d[S++];
										while (--y);
										S = i - x, C = T;
									}
								} else if (u < y) {
									if (S += c + u - y, (y -= u) < b) {
										b -= y;
										do
											T[i++] = d[S++];
										while (--y);
										if (S = 0, u < b) {
											b -= y = u;
											do
												T[i++] = d[S++];
											while (--y);
											S = i - x, C = T;
										}
									}
								} else if (S += u - y, y < b) {
									b -= y;
									do
										T[i++] = d[S++];
									while (--y);
									S = i - x, C = T;
								}
								for (; b > 2;) T[i++] = C[S++], T[i++] = C[S++], T[i++] = C[S++], b -= 3;
								b && (T[i++] = C[S++], b > 1 && (T[i++] = C[S++]));
							} else {
								S = i - x;
								do
									T[i++] = T[S++], T[i++] = T[S++], T[i++] = T[S++], b -= 3;
								while (b > 2);
								b && (T[i++] = T[S++], b > 1 && (T[i++] = T[S++]));
							}
							break;
						}
					}
					break;
				}
			} while (n < r && i < o);
			n -= b = p >> 3, f &= (1 << (p -= b << 3)) - 1, e.next_in = n, e.next_out = i, e.avail_in = n < r ? r - n + 5 : 5 - (n - r), e.avail_out = i < o ? o - i + 257 : 257 - (i - o), E.hold = f, E.bits = p;
		}, pt = 15, mt = new Uint16Array([
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			13,
			15,
			17,
			19,
			23,
			27,
			31,
			35,
			43,
			51,
			59,
			67,
			83,
			99,
			115,
			131,
			163,
			195,
			227,
			258,
			0,
			0
		]), ht = new Uint8Array([
			16,
			16,
			16,
			16,
			16,
			16,
			16,
			16,
			17,
			17,
			17,
			17,
			18,
			18,
			18,
			18,
			19,
			19,
			19,
			19,
			20,
			20,
			20,
			20,
			21,
			21,
			21,
			21,
			16,
			199,
			75
		]), gt = new Uint16Array([
			1,
			2,
			3,
			4,
			5,
			7,
			9,
			13,
			17,
			25,
			33,
			49,
			65,
			97,
			129,
			193,
			257,
			385,
			513,
			769,
			1025,
			1537,
			2049,
			3073,
			4097,
			6145,
			8193,
			12289,
			16385,
			24577,
			0,
			0
		]), _t = new Uint8Array([
			16,
			16,
			16,
			16,
			17,
			17,
			18,
			18,
			19,
			19,
			20,
			20,
			21,
			21,
			22,
			22,
			23,
			23,
			24,
			24,
			25,
			25,
			26,
			26,
			27,
			27,
			28,
			28,
			29,
			29,
			64,
			64
		]), vt = function(e, t, n, r, i, a, o, s) {
			var c, l, u, d, f, p, m, h, g, _ = s.bits, v = 0, y = 0, b = 0, x = 0, S = 0, C = 0, w = 0, T = 0, E = 0, D = 0, O = null, k = /* @__PURE__ */ new Uint16Array(16), A = /* @__PURE__ */ new Uint16Array(16), j = null;
			for (v = 0; v <= pt; v++) k[v] = 0;
			for (y = 0; y < r; y++) k[t[n + y]]++;
			for (S = _, x = pt; x >= 1 && k[x] === 0; x--);
			if (S > x && (S = x), x === 0) return i[a++] = 20971520, i[a++] = 20971520, s.bits = 1, 0;
			for (b = 1; b < x && k[b] === 0; b++);
			for (S < b && (S = b), T = 1, v = 1; v <= pt; v++) if (T <<= 1, (T -= k[v]) < 0) return -1;
			if (T > 0 && (e === 0 || x !== 1)) return -1;
			for (A[1] = 0, v = 1; v < pt; v++) A[v + 1] = A[v] + k[v];
			for (y = 0; y < r; y++) t[n + y] !== 0 && (o[A[t[n + y]]++] = y);
			if (e === 0 ? (O = j = o, p = 20) : e === 1 ? (O = mt, j = ht, p = 257) : (O = gt, j = _t, p = 0), D = 0, y = 0, v = b, f = a, C = S, w = 0, u = -1, d = (E = 1 << S) - 1, e === 1 && E > 852 || e === 2 && E > 592) return 1;
			for (;;) {
				m = v - w, o[y] + 1 < p ? (h = 0, g = o[y]) : o[y] >= p ? (h = j[o[y] - p], g = O[o[y] - p]) : (h = 96, g = 0), c = 1 << v - w, b = l = 1 << C;
				do
					i[f + (D >> w) + (l -= c)] = m << 24 | h << 16 | g | 0;
				while (l !== 0);
				for (c = 1 << v - 1; D & c;) c >>= 1;
				if (c === 0 ? D = 0 : (D &= c - 1, D += c), y++, --k[v] == 0) {
					if (v === x) break;
					v = t[n + o[y]];
				}
				if (v > S && (D & d) !== u) {
					for (w === 0 && (w = S), f += b, T = 1 << (C = v - w); C + w < x && !((T -= k[C + w]) <= 0);) C++, T <<= 1;
					if (E += 1 << C, e === 1 && E > 852 || e === 2 && E > 592) return 1;
					i[u = D & d] = S << 24 | C << 16 | f - a | 0;
				}
			}
			return D !== 0 && (i[f + D] = v - w << 24 | 4194304), s.bits = S, 0;
		}, yt = R.Z_FINISH, bt = R.Z_BLOCK, xt = R.Z_TREES, St = R.Z_OK, Ct = R.Z_STREAM_END, wt = R.Z_NEED_DICT, Tt = R.Z_STREAM_ERROR, Et = R.Z_DATA_ERROR, Dt = R.Z_MEM_ERROR, Ot = R.Z_BUF_ERROR, kt = R.Z_DEFLATED, At = 16180, jt = 16190, Mt = 16191, Nt = 16192, Pt = 16194, Ft = 16199, It = 16200, Lt = 16206, Rt = 16209, zt = function(e) {
			return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
		};
		function Bt() {
			this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = /* @__PURE__ */ new Uint16Array(320), this.work = /* @__PURE__ */ new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
		}
		var Vt, Ht, Y = function(e) {
			if (!e) return 1;
			var t = e.state;
			return +(!t || t.strm !== e || t.mode < At || t.mode > 16211);
		}, Ut = function(e) {
			if (Y(e)) return Tt;
			var t = e.state;
			return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = At, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = /* @__PURE__ */ new Int32Array(852), t.distcode = t.distdyn = /* @__PURE__ */ new Int32Array(592), t.sane = 1, t.back = -1, St;
		}, Wt = function(e) {
			if (Y(e)) return Tt;
			var t = e.state;
			return t.wsize = 0, t.whave = 0, t.wnext = 0, Ut(e);
		}, Gt = function(e, t) {
			var n;
			if (Y(e)) return Tt;
			var r = e.state;
			return t < 0 ? (n = 0, t = -t) : (n = 5 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? Tt : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, Wt(e));
		}, Kt = function(e, t) {
			if (!e) return Tt;
			var n = new Bt();
			e.state = n, n.strm = e, n.window = null, n.mode = At;
			var r = Gt(e, t);
			return r !== St && (e.state = null), r;
		}, qt = !0, Jt = function(e) {
			if (qt) {
				Vt = /* @__PURE__ */ new Int32Array(512), Ht = /* @__PURE__ */ new Int32Array(32);
				for (var t = 0; t < 144;) e.lens[t++] = 8;
				for (; t < 256;) e.lens[t++] = 9;
				for (; t < 280;) e.lens[t++] = 7;
				for (; t < 288;) e.lens[t++] = 8;
				for (vt(1, e.lens, 0, 288, Vt, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
				vt(2, e.lens, 0, 32, Ht, 0, e.work, { bits: 5 }), qt = !1;
			}
			e.lencode = Vt, e.lenbits = 9, e.distcode = Ht, e.distbits = 5;
		}, Yt = function(e, t, n, r) {
			var i, a = e.state;
			return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(t.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : ((i = a.wsize - a.wnext) > r && (i = r), a.window.set(t.subarray(n - r, n - r + i), a.wnext), (r -= i) ? (a.window.set(t.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
		}, Xt = {
			inflateReset: Wt,
			inflateReset2: Gt,
			inflateResetKeep: Ut,
			inflateInit: function(e) {
				return Kt(e, 15);
			},
			inflateInit2: Kt,
			inflate: function(e, t) {
				var n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = 0, D = /* @__PURE__ */ new Uint8Array(4), O = new Uint8Array([
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				]);
				if (Y(e) || !e.output || !e.input && e.avail_in !== 0) return Tt;
				(n = e.state).mode === Mt && (n.mode = Nt), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, d = s, f = c, C = St;
				t: for (;;) switch (n.mode) {
					case At:
						if (n.wrap === 0) {
							n.mode = Nt;
							break;
						}
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (2 & n.wrap && l === 35615) {
							n.wbits === 0 && (n.wbits = 15), n.check = 0, D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = I(n.check, D, 2, 0), l = 0, u = 0, n.mode = 16181;
							break;
						}
						if (n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & l) << 8) + (l >> 8)) % 31) {
							e.msg = "incorrect header check", n.mode = Rt;
							break;
						}
						if ((15 & l) !== kt) {
							e.msg = "unknown compression method", n.mode = Rt;
							break;
						}
						if (u -= 4, S = 8 + (15 & (l >>>= 4)), n.wbits === 0 && (n.wbits = S), S > 15 || S > n.wbits) {
							e.msg = "invalid window size", n.mode = Rt;
							break;
						}
						n.dmax = 1 << n.wbits, n.flags = 0, e.adler = n.check = 1, n.mode = 512 & l ? 16189 : Mt, l = 0, u = 0;
						break;
					case 16181:
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (n.flags = l, (255 & n.flags) !== kt) {
							e.msg = "unknown compression method", n.mode = Rt;
							break;
						}
						if (57344 & n.flags) {
							e.msg = "unknown header flags set", n.mode = Rt;
							break;
						}
						n.head && (n.head.text = l >> 8 & 1), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = I(n.check, D, 2, 0)), l = 0, u = 0, n.mode = 16182;
					case 16182:
						for (; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						n.head && (n.head.time = l), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, D[2] = l >>> 16 & 255, D[3] = l >>> 24 & 255, n.check = I(n.check, D, 4, 0)), l = 0, u = 0, n.mode = 16183;
					case 16183:
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						n.head && (n.head.xflags = 255 & l, n.head.os = l >> 8), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = I(n.check, D, 2, 0)), l = 0, u = 0, n.mode = 16184;
					case 16184:
						if (1024 & n.flags) {
							for (; u < 16;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							n.length = l, n.head && (n.head.extra_len = l), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = I(n.check, D, 2, 0)), l = 0, u = 0;
						} else n.head && (n.head.extra = null);
						n.mode = 16185;
					case 16185:
						if (1024 & n.flags && ((p = n.length) > s && (p = s), p && (n.head && (S = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(r.subarray(a, a + p), S)), 512 & n.flags && 4 & n.wrap && (n.check = I(n.check, r, p, a)), s -= p, a += p, n.length -= p), n.length)) break t;
						n.length = 0, n.mode = 16186;
					case 16186:
						if (2048 & n.flags) {
							if (s === 0) break t;
							p = 0;
							do
								S = r[a + p++], n.head && S && n.length < 65536 && (n.head.name += String.fromCharCode(S));
							while (S && p < s);
							if (512 & n.flags && 4 & n.wrap && (n.check = I(n.check, r, p, a)), s -= p, a += p, S) break t;
						} else n.head && (n.head.name = null);
						n.length = 0, n.mode = 16187;
					case 16187:
						if (4096 & n.flags) {
							if (s === 0) break t;
							p = 0;
							do
								S = r[a + p++], n.head && S && n.length < 65536 && (n.head.comment += String.fromCharCode(S));
							while (S && p < s);
							if (512 & n.flags && 4 & n.wrap && (n.check = I(n.check, r, p, a)), s -= p, a += p, S) break t;
						} else n.head && (n.head.comment = null);
						n.mode = 16188;
					case 16188:
						if (512 & n.flags) {
							for (; u < 16;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							if (4 & n.wrap && l !== (65535 & n.check)) {
								e.msg = "header crc mismatch", n.mode = Rt;
								break;
							}
							l = 0, u = 0;
						}
						n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = Mt;
						break;
					case 16189:
						for (; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						e.adler = n.check = zt(l), l = 0, u = 0, n.mode = jt;
					case jt:
						if (n.havedict === 0) return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, wt;
						e.adler = n.check = 1, n.mode = Mt;
					case Mt: if (t === bt || t === xt) break t;
					case Nt:
						if (n.last) {
							l >>>= 7 & u, u -= 7 & u, n.mode = Lt;
							break;
						}
						for (; u < 3;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						switch (n.last = 1 & l, --u, 3 & (l >>>= 1)) {
							case 0:
								n.mode = 16193;
								break;
							case 1:
								if (Jt(n), n.mode = Ft, t === xt) {
									l >>>= 2, u -= 2;
									break t;
								}
								break;
							case 2:
								n.mode = 16196;
								break;
							case 3: e.msg = "invalid block type", n.mode = Rt;
						}
						l >>>= 2, u -= 2;
						break;
					case 16193:
						for (l >>>= 7 & u, u -= 7 & u; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if ((65535 & l) != (l >>> 16 ^ 65535)) {
							e.msg = "invalid stored block lengths", n.mode = Rt;
							break;
						}
						if (n.length = 65535 & l, l = 0, u = 0, n.mode = Pt, t === xt) break t;
					case Pt: n.mode = 16195;
					case 16195:
						if (p = n.length) {
							if (p > s && (p = s), p > c && (p = c), p === 0) break t;
							i.set(r.subarray(a, a + p), o), s -= p, a += p, c -= p, o += p, n.length -= p;
							break;
						}
						n.mode = Mt;
						break;
					case 16196:
						for (; u < 14;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (n.nlen = 257 + (31 & l), l >>>= 5, u -= 5, n.ndist = 1 + (31 & l), l >>>= 5, u -= 5, n.ncode = 4 + (15 & l), l >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
							e.msg = "too many length or distance symbols", n.mode = Rt;
							break;
						}
						n.have = 0, n.mode = 16197;
					case 16197:
						for (; n.have < n.ncode;) {
							for (; u < 3;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							n.lens[O[n.have++]] = 7 & l, l >>>= 3, u -= 3;
						}
						for (; n.have < 19;) n.lens[O[n.have++]] = 0;
						if (n.lencode = n.lendyn, n.lenbits = 7, w = { bits: n.lenbits }, C = vt(0, n.lens, 0, 19, n.lencode, 0, n.work, w), n.lenbits = w.bits, C) {
							e.msg = "invalid code lengths set", n.mode = Rt;
							break;
						}
						n.have = 0, n.mode = 16198;
					case 16198:
						for (; n.have < n.nlen + n.ndist;) {
							for (; _ = (E = n.lencode[l & (1 << n.lenbits) - 1]) >>> 16 & 255, v = 65535 & E, !((g = E >>> 24) <= u);) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							if (v < 16) l >>>= g, u -= g, n.lens[n.have++] = v;
							else {
								if (v === 16) {
									for (T = g + 2; u < T;) {
										if (s === 0) break t;
										s--, l += r[a++] << u, u += 8;
									}
									if (l >>>= g, u -= g, n.have === 0) {
										e.msg = "invalid bit length repeat", n.mode = Rt;
										break;
									}
									S = n.lens[n.have - 1], p = 3 + (3 & l), l >>>= 2, u -= 2;
								} else if (v === 17) {
									for (T = g + 3; u < T;) {
										if (s === 0) break t;
										s--, l += r[a++] << u, u += 8;
									}
									u -= g, S = 0, p = 3 + (7 & (l >>>= g)), l >>>= 3, u -= 3;
								} else {
									for (T = g + 7; u < T;) {
										if (s === 0) break t;
										s--, l += r[a++] << u, u += 8;
									}
									u -= g, S = 0, p = 11 + (127 & (l >>>= g)), l >>>= 7, u -= 7;
								}
								if (n.have + p > n.nlen + n.ndist) {
									e.msg = "invalid bit length repeat", n.mode = Rt;
									break;
								}
								for (; p--;) n.lens[n.have++] = S;
							}
						}
						if (n.mode === Rt) break;
						if (n.lens[256] === 0) {
							e.msg = "invalid code -- missing end-of-block", n.mode = Rt;
							break;
						}
						if (n.lenbits = 9, w = { bits: n.lenbits }, C = vt(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, w), n.lenbits = w.bits, C) {
							e.msg = "invalid literal/lengths set", n.mode = Rt;
							break;
						}
						if (n.distbits = 6, n.distcode = n.distdyn, w = { bits: n.distbits }, C = vt(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, w), n.distbits = w.bits, C) {
							e.msg = "invalid distances set", n.mode = Rt;
							break;
						}
						if (n.mode = Ft, t === xt) break t;
					case Ft: n.mode = It;
					case It:
						if (s >= 6 && c >= 258) {
							e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, ft(e, f), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, n.mode === Mt && (n.back = -1);
							break;
						}
						for (n.back = 0; _ = (E = n.lencode[l & (1 << n.lenbits) - 1]) >>> 16 & 255, v = 65535 & E, !((g = E >>> 24) <= u);) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (_ && !(240 & _)) {
							for (y = g, b = _, x = v; _ = (E = n.lencode[x + ((l & (1 << y + b) - 1) >> y)]) >>> 16 & 255, v = 65535 & E, !(y + (g = E >>> 24) <= u);) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							l >>>= y, u -= y, n.back += y;
						}
						if (l >>>= g, u -= g, n.back += g, n.length = v, _ === 0) {
							n.mode = 16205;
							break;
						}
						if (32 & _) {
							n.back = -1, n.mode = Mt;
							break;
						}
						if (64 & _) {
							e.msg = "invalid literal/length code", n.mode = Rt;
							break;
						}
						n.extra = 15 & _, n.mode = 16201;
					case 16201:
						if (n.extra) {
							for (T = n.extra; u < T;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							n.length += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
						}
						n.was = n.length, n.mode = 16202;
					case 16202:
						for (; _ = (E = n.distcode[l & (1 << n.distbits) - 1]) >>> 16 & 255, v = 65535 & E, !((g = E >>> 24) <= u);) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (!(240 & _)) {
							for (y = g, b = _, x = v; _ = (E = n.distcode[x + ((l & (1 << y + b) - 1) >> y)]) >>> 16 & 255, v = 65535 & E, !(y + (g = E >>> 24) <= u);) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							l >>>= y, u -= y, n.back += y;
						}
						if (l >>>= g, u -= g, n.back += g, 64 & _) {
							e.msg = "invalid distance code", n.mode = Rt;
							break;
						}
						n.offset = v, n.extra = 15 & _, n.mode = 16203;
					case 16203:
						if (n.extra) {
							for (T = n.extra; u < T;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							n.offset += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
						}
						if (n.offset > n.dmax) {
							e.msg = "invalid distance too far back", n.mode = Rt;
							break;
						}
						n.mode = 16204;
					case 16204:
						if (c === 0) break t;
						if (p = f - c, n.offset > p) {
							if ((p = n.offset - p) > n.whave && n.sane) {
								e.msg = "invalid distance too far back", n.mode = Rt;
								break;
							}
							p > n.wnext ? (p -= n.wnext, m = n.wsize - p) : m = n.wnext - p, p > n.length && (p = n.length), h = n.window;
						} else h = i, m = o - n.offset, p = n.length;
						p > c && (p = c), c -= p, n.length -= p;
						do
							i[o++] = h[m++];
						while (--p);
						n.length === 0 && (n.mode = It);
						break;
					case 16205:
						if (c === 0) break t;
						i[o++] = n.length, c--, n.mode = It;
						break;
					case Lt:
						if (n.wrap) {
							for (; u < 32;) {
								if (s === 0) break t;
								s--, l |= r[a++] << u, u += 8;
							}
							if (f -= c, e.total_out += f, n.total += f, 4 & n.wrap && f && (e.adler = n.check = n.flags ? I(n.check, i, f, o - f) : P(n.check, i, f, o - f)), f = c, 4 & n.wrap && (n.flags ? l : zt(l)) !== n.check) {
								e.msg = "incorrect data check", n.mode = Rt;
								break;
							}
							l = 0, u = 0;
						}
						n.mode = 16207;
					case 16207:
						if (n.wrap && n.flags) {
							for (; u < 32;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							if (4 & n.wrap && l !== (4294967295 & n.total)) {
								e.msg = "incorrect length check", n.mode = Rt;
								break;
							}
							l = 0, u = 0;
						}
						n.mode = 16208;
					case 16208:
						C = Ct;
						break t;
					case Rt:
						C = Et;
						break t;
					case 16210: return Dt;
					default: return Tt;
				}
				return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, (n.wsize || f !== e.avail_out && n.mode < Rt && (n.mode < Lt || t !== yt)) && Yt(e, e.output, e.next_out, f - e.avail_out), d -= e.avail_in, f -= e.avail_out, e.total_in += d, e.total_out += f, n.total += f, 4 & n.wrap && f && (e.adler = n.check = n.flags ? I(n.check, i, f, e.next_out - f) : P(n.check, i, f, e.next_out - f)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Mt ? 128 : 0) + (n.mode === Ft || n.mode === Pt ? 256 : 0), (d === 0 && f === 0 || t === yt) && C === St && (C = Ot), C;
			},
			inflateEnd: function(e) {
				if (Y(e)) return Tt;
				var t = e.state;
				return t.window &&= null, e.state = null, St;
			},
			inflateGetHeader: function(e, t) {
				if (Y(e)) return Tt;
				var n = e.state;
				return 2 & n.wrap ? (n.head = t, t.done = !1, St) : Tt;
			},
			inflateSetDictionary: function(e, t) {
				var n, r = t.length;
				return Y(e) || (n = e.state).wrap !== 0 && n.mode !== jt ? Tt : n.mode === jt && P(1, t, r, 0) !== n.check ? Et : Yt(e, t, r, r) ? (n.mode = 16210, Dt) : (n.havedict = 1, St);
			},
			inflateInfo: "pako inflate (from Nodeca project)"
		}, Zt = function() {
			this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
		}, Qt = Object.prototype.toString, $t = R.Z_NO_FLUSH, en = R.Z_FINISH, tn = R.Z_OK, nn = R.Z_STREAM_END, rn = R.Z_NEED_DICT, an = R.Z_STREAM_ERROR, on = R.Z_DATA_ERROR, sn = R.Z_MEM_ERROR, cn = R.Z_BUF_ERROR, ln = {
			chunkSize: 65536,
			windowBits: 15,
			to: ""
		};
		function un(e) {
			this.options = Ge({}, ln, e || {});
			var t = this.options;
			t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && !(15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new $e(), this.strm.avail_out = 0;
			var n = Xt.inflateInit2(this.strm, t.windowBits);
			if (n !== tn || (this.header = new Zt(), Xt.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = Xe(t.dictionary) : Qt.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = Xt.inflateSetDictionary(this.strm, t.dictionary)) !== tn))) throw Error(L[n]);
		}
		function dn(e, t) {
			var n = new un(t);
			if (n.push(e, !0), n.err) throw n.msg || L[n.err];
			return n.result;
		}
		un.prototype.push = function(e, t) {
			var n, r, i, a = this.strm, o = this.options.chunkSize, s = this.options.dictionary;
			if (this.ended) return !1;
			for (r = t === ~~t ? t : !0 === t ? en : $t, Qt.call(e) === "[object ArrayBuffer]" ? a.input = new Uint8Array(e) : a.input = e, a.next_in = 0, a.avail_in = a.input.length;;) {
				for (a.avail_out === 0 && (a.output = new Uint8Array(o), a.next_out = 0, a.avail_out = o), (n = Xt.inflate(a, r)) === rn && s && ((n = Xt.inflateSetDictionary(a, s)) === tn ? n = Xt.inflate(a, r) : n === on && (n = rn)); a.avail_in > 0 && n === nn && 2 & a.state.wrap && a.state.flags !== 0 && a.input[a.next_in] !== 0;) Xt.inflateReset(a), n = Xt.inflate(a, r);
				switch (n) {
					case an:
					case on:
					case rn:
					case sn: return this.onEnd(n), this.ended = !0, !1;
				}
				if (i = a.avail_out, a.next_out && (a.avail_out === 0 || n === nn || r > 0)) if (this.options.to === "string") {
					var c = Qe(a.output, a.next_out), l = a.next_out - c, u = Ze(a.output, c);
					a.next_out = l, a.avail_out = o - l, l && a.output.set(a.output.subarray(c, c + l), 0), this.onData(u);
				} else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out)), a.avail_out = 0, a.next_out = 0;
				if (n !== tn && n !== cn || i !== 0) {
					if (n === nn) return n = Xt.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, !0;
					if (a.avail_in === 0) {
						if (r === en) return n = Xt.inflateEnd(this.strm), this.onEnd(n === tn ? cn : n), this.ended = !0, !1;
						break;
					}
				}
			}
			return !0;
		}, un.prototype.onData = function(e) {
			this.chunks.push(e);
		}, un.prototype.onEnd = function(e) {
			e === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ke(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
		};
		var fn = {
			Inflate: un,
			inflate: dn,
			inflateRaw: function(e, t) {
				return (t ||= {}).raw = !0, dn(e, t);
			},
			ungzip: dn,
			constants: R
		}, pn = ut.Deflate, mn = ut.deflate, hn = ut.deflateRaw, gn = ut.gzip, _n = fn.Inflate, vn = fn.inflate, yn = fn.inflateRaw, bn = fn.ungzip, xn = R, Sn = {
			Deflate: pn,
			deflate: mn,
			deflateRaw: hn,
			gzip: gn,
			Inflate: _n,
			inflate: vn,
			inflateRaw: yn,
			ungzip: bn,
			constants: xn
		};
		e.Deflate = pn, e.Inflate = _n, e.constants = xn, e.default = Sn, e.deflate = mn, e.deflateRaw = hn, e.gzip = gn, e.inflate = vn, e.inflateRaw = yn, e.ungzip = bn, Object.defineProperty(e, "__esModule", { value: !0 });
	}));
})), xl = /* @__PURE__ */ k(((e) => {
	var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", n = bl();
	e.uncompressInputType = t ? "uint8array" : "array", e.compressInputType = t ? "uint8array" : "array", e.magic = "\b\0", e.compress = function(e, t) {
		return n.deflateRaw(e, { level: t.level || -1 });
	}, e.uncompress = function(e) {
		return n.inflateRaw(e);
	};
})), Sl = /* @__PURE__ */ k(((e) => {
	e.STORE = {
		magic: "\0\0",
		compress: function(e) {
			return e;
		},
		uncompress: function(e) {
			return e;
		},
		compressInputType: null,
		uncompressInputType: null
	}, e.DEFLATE = xl();
})), Cl = /* @__PURE__ */ k(((e, t) => {
	t.exports = function(e, t) {
		return typeof e == "number" ? Buffer.alloc(e) : Buffer.from(e, t);
	}, t.exports.test = function(e) {
		return Buffer.isBuffer(e);
	};
})), wl = /* @__PURE__ */ k(((e) => {
	function t(e) {
		"@babel/helpers - typeof";
		return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, t(e);
	}
	var n = yl(), r = Sl(), i = Cl();
	e.string2binary = function(e) {
		for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) & 255);
		return t;
	}, e.arrayBuffer2Blob = function(t, n) {
		e.checkSupport("blob"), n ||= "application/zip";
		try {
			return new Blob([t], { type: n });
		} catch {
			try {
				var r = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)();
				return r.append(t), r.getBlob(n);
			} catch {
				throw Error("Bug : can't construct the Blob.");
			}
		}
	};
	function a(e) {
		return e;
	}
	function o(e, t) {
		for (var n = 0; n < e.length; ++n) t[n] = e.charCodeAt(n) & 255;
		return t;
	}
	function s(t) {
		var n = 65536, r = [], a = t.length, o = e.getTypeOf(t), s = 0, c = !0;
		try {
			switch (o) {
				case "uint8array":
					String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array());
					break;
				case "nodebuffer":
					String.fromCharCode.apply(null, i(0));
					break;
			}
		} catch {
			c = !1;
		}
		if (!c) {
			for (var l = "", u = 0; u < t.length; u++) l += String.fromCharCode(t[u]);
			return l;
		}
		for (; s < a && n > 1;) try {
			o === "array" || o === "nodebuffer" ? r.push(String.fromCharCode.apply(null, t.slice(s, Math.min(s + n, a)))) : r.push(String.fromCharCode.apply(null, t.subarray(s, Math.min(s + n, a)))), s += n;
		} catch {
			n = Math.floor(n / 2);
		}
		return r.join("");
	}
	e.applyFromCharCode = s;
	function c(e, t) {
		for (var n = 0; n < e.length; n++) t[n] = e[n];
		return t;
	}
	var l = {};
	l.string = {
		string: a,
		array: function(e) {
			return o(e, Array(e.length));
		},
		arraybuffer: function(e) {
			return l.string.uint8array(e).buffer;
		},
		uint8array: function(e) {
			return o(e, new Uint8Array(e.length));
		},
		nodebuffer: function(e) {
			return o(e, i(e.length));
		}
	}, l.array = {
		string: s,
		array: a,
		arraybuffer: function(e) {
			return new Uint8Array(e).buffer;
		},
		uint8array: function(e) {
			return new Uint8Array(e);
		},
		nodebuffer: function(e) {
			return i(e);
		}
	}, l.arraybuffer = {
		string: function(e) {
			return s(new Uint8Array(e));
		},
		array: function(e) {
			return c(new Uint8Array(e), Array(e.byteLength));
		},
		arraybuffer: a,
		uint8array: function(e) {
			return new Uint8Array(e);
		},
		nodebuffer: function(e) {
			return i(new Uint8Array(e));
		}
	}, l.uint8array = {
		string: s,
		array: function(e) {
			return c(e, Array(e.length));
		},
		arraybuffer: function(e) {
			return e.buffer;
		},
		uint8array: a,
		nodebuffer: function(e) {
			return i(e);
		}
	}, l.nodebuffer = {
		string: s,
		array: function(e) {
			return c(e, Array(e.length));
		},
		arraybuffer: function(e) {
			return l.nodebuffer.uint8array(e).buffer;
		},
		uint8array: function(e) {
			return c(e, new Uint8Array(e.length));
		},
		nodebuffer: a
	}, e.transformTo = function(t, n) {
		return n ||= "", t ? (e.checkSupport(t), l[e.getTypeOf(n)][t](n)) : n;
	}, e.getTypeOf = function(e) {
		if (e != null) {
			if (typeof e == "string") return "string";
			var r = Object.prototype.toString.call(e);
			if (r === "[object Array]") return "array";
			if (n.nodebuffer && i.test(e)) return "nodebuffer";
			if (n.uint8array && r === "[object Uint8Array]") return "uint8array";
			if (n.arraybuffer && r === "[object ArrayBuffer]") return "arraybuffer";
			if (r === "[object Promise]") throw Error("Cannot read data from a promise, you probably are running new PizZip(data) with a promise");
			if (t(e) === "object" && typeof e.file == "function") throw Error("Cannot read data from a pizzip instance, you probably are running new PizZip(zip) with a zipinstance");
			if (r === "[object Date]") throw Error("Cannot read data from a Date, you probably are running new PizZip(data) with a date");
			if (t(e) === "object" && e.crc32 == null) throw Error("Unsupported data given to new PizZip(data) (object given)");
		}
	}, e.checkSupport = function(e) {
		if (!n[e.toLowerCase()]) throw Error(e + " is not supported by this browser");
	}, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(e) {
		var t = "", n, r;
		for (r = 0; r < (e || "").length; r++) n = e.charCodeAt(r), t += "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
		return t;
	}, e.findCompression = function(e) {
		for (var t in r) if (r.hasOwnProperty(t) && r[t].magic === e) return r[t];
		return null;
	}, e.isRegExp = function(e) {
		return Object.prototype.toString.call(e) === "[object RegExp]";
	}, e.extend = function() {
		var e = {}, t, n;
		for (t = 0; t < arguments.length; t++) for (n in arguments[t]) arguments[t].hasOwnProperty(n) && e[n] === void 0 && (e[n] = arguments[t][n]);
		return e;
	};
})), Tl = /* @__PURE__ */ k(((e, t) => {
	var n = wl(), r = [
		0,
		1996959894,
		3993919788,
		2567524794,
		124634137,
		1886057615,
		3915621685,
		2657392035,
		249268274,
		2044508324,
		3772115230,
		2547177864,
		162941995,
		2125561021,
		3887607047,
		2428444049,
		498536548,
		1789927666,
		4089016648,
		2227061214,
		450548861,
		1843258603,
		4107580753,
		2211677639,
		325883990,
		1684777152,
		4251122042,
		2321926636,
		335633487,
		1661365465,
		4195302755,
		2366115317,
		997073096,
		1281953886,
		3579855332,
		2724688242,
		1006888145,
		1258607687,
		3524101629,
		2768942443,
		901097722,
		1119000684,
		3686517206,
		2898065728,
		853044451,
		1172266101,
		3705015759,
		2882616665,
		651767980,
		1373503546,
		3369554304,
		3218104598,
		565507253,
		1454621731,
		3485111705,
		3099436303,
		671266974,
		1594198024,
		3322730930,
		2970347812,
		795835527,
		1483230225,
		3244367275,
		3060149565,
		1994146192,
		31158534,
		2563907772,
		4023717930,
		1907459465,
		112637215,
		2680153253,
		3904427059,
		2013776290,
		251722036,
		2517215374,
		3775830040,
		2137656763,
		141376813,
		2439277719,
		3865271297,
		1802195444,
		476864866,
		2238001368,
		4066508878,
		1812370925,
		453092731,
		2181625025,
		4111451223,
		1706088902,
		314042704,
		2344532202,
		4240017532,
		1658658271,
		366619977,
		2362670323,
		4224994405,
		1303535960,
		984961486,
		2747007092,
		3569037538,
		1256170817,
		1037604311,
		2765210733,
		3554079995,
		1131014506,
		879679996,
		2909243462,
		3663771856,
		1141124467,
		855842277,
		2852801631,
		3708648649,
		1342533948,
		654459306,
		3188396048,
		3373015174,
		1466479909,
		544179635,
		3110523913,
		3462522015,
		1591671054,
		702138776,
		2966460450,
		3352799412,
		1504918807,
		783551873,
		3082640443,
		3233442989,
		3988292384,
		2596254646,
		62317068,
		1957810842,
		3939845945,
		2647816111,
		81470997,
		1943803523,
		3814918930,
		2489596804,
		225274430,
		2053790376,
		3826175755,
		2466906013,
		167816743,
		2097651377,
		4027552580,
		2265490386,
		503444072,
		1762050814,
		4150417245,
		2154129355,
		426522225,
		1852507879,
		4275313526,
		2312317920,
		282753626,
		1742555852,
		4189708143,
		2394877945,
		397917763,
		1622183637,
		3604390888,
		2714866558,
		953729732,
		1340076626,
		3518719985,
		2797360999,
		1068828381,
		1219638859,
		3624741850,
		2936675148,
		906185462,
		1090812512,
		3747672003,
		2825379669,
		829329135,
		1181335161,
		3412177804,
		3160834842,
		628085408,
		1382605366,
		3423369109,
		3138078467,
		570562233,
		1426400815,
		3317316542,
		2998733608,
		733239954,
		1555261956,
		3268935591,
		3050360625,
		752459403,
		1541320221,
		2607071920,
		3965973030,
		1969922972,
		40735498,
		2617837225,
		3943577151,
		1913087877,
		83908371,
		2512341634,
		3803740692,
		2075208622,
		213261112,
		2463272603,
		3855990285,
		2094854071,
		198958881,
		2262029012,
		4057260610,
		1759359992,
		534414190,
		2176718541,
		4139329115,
		1873836001,
		414664567,
		2282248934,
		4279200368,
		1711684554,
		285281116,
		2405801727,
		4167216745,
		1634467795,
		376229701,
		2685067896,
		3608007406,
		1308918612,
		956543938,
		2808555105,
		3495958263,
		1231636301,
		1047427035,
		2932959818,
		3654703836,
		1088359270,
		936918e3,
		2847714899,
		3736837829,
		1202900863,
		817233897,
		3183342108,
		3401237130,
		1404277552,
		615818150,
		3134207493,
		3453421203,
		1423857449,
		601450431,
		3009837614,
		3294710456,
		1567103746,
		711928724,
		3020668471,
		3272380065,
		1510334235,
		755167117
	];
	t.exports = function(e, t) {
		if (e === void 0 || !e.length) return 0;
		var i = n.getTypeOf(e) !== "string";
		t === void 0 && (t = 0);
		var a = 0, o = 0, s = 0;
		t ^= -1;
		for (var c = 0, l = e.length; c < l; c++) s = i ? e[c] : e.charCodeAt(c), o = (t ^ s) & 255, a = r[o], t = t >>> 8 ^ a;
		return t ^ -1;
	};
})), El = /* @__PURE__ */ k(((e) => {
	e.LOCAL_FILE_HEADER = "PK", e.CENTRAL_FILE_HEADER = "PK", e.CENTRAL_DIRECTORY_END = "PK", e.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", e.ZIP64_CENTRAL_DIRECTORY_END = "PK", e.DATA_DESCRIPTOR = "PK\x07\b";
})), Dl = /* @__PURE__ */ k(((e) => {
	e.base64 = !1, e.binary = !1, e.dir = !1, e.createFolders = !1, e.date = null, e.compression = null, e.compressionOptions = null, e.comment = null, e.unixPermissions = null, e.dosPermissions = null;
})), Ol = /* @__PURE__ */ k(((e, t) => {
	function n() {
		this.compressedSize = 0, this.uncompressedSize = 0, this.crc32 = 0, this.compressionMethod = null, this.compressedContent = null;
	}
	n.prototype = {
		getContent: function() {
			return null;
		},
		getCompressedContent: function() {
			return null;
		}
	}, t.exports = n;
})), kl = /* @__PURE__ */ k(((e) => {
	for (var t = wl(), n = yl(), r = Cl(), i = Array(256), a = 0; a < 256; a++) i[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
	i[254] = i[254] = 1;
	function o(e) {
		var t, r, i, a, o, s = 0, c = e.length;
		for (a = 0; a < c; a++) r = e.charCodeAt(a), (r & 64512) == 55296 && a + 1 < c && (i = e.charCodeAt(a + 1), (i & 64512) == 56320 && (r = 65536 + (r - 55296 << 10) + (i - 56320), a++)), s += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
		for (t = n.uint8array ? new Uint8Array(s) : Array(s), o = 0, a = 0; o < s; a++) r = e.charCodeAt(a), (r & 64512) == 55296 && a + 1 < c && (i = e.charCodeAt(a + 1), (i & 64512) == 56320 && (r = 65536 + (r - 55296 << 10) + (i - 56320), a++)), r < 128 ? t[o++] = r : r < 2048 ? (t[o++] = 192 | r >>> 6, t[o++] = 128 | r & 63) : r < 65536 ? (t[o++] = 224 | r >>> 12, t[o++] = 128 | r >>> 6 & 63, t[o++] = 128 | r & 63) : (t[o++] = 240 | r >>> 18, t[o++] = 128 | r >>> 12 & 63, t[o++] = 128 | r >>> 6 & 63, t[o++] = 128 | r & 63);
		return t;
	}
	function s(e, t) {
		var n;
		for (t ||= e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) == 128;) n--;
		return n < 0 || n === 0 ? t : n + i[e[n]] > t ? n : t;
	}
	function c(e) {
		var n, r, a, o, s = e.length, c = Array(s * 2);
		for (r = 0, n = 0; n < s;) {
			if (a = e[n++], a < 128) {
				c[r++] = a;
				continue;
			}
			if (o = i[a], o > 4) {
				c[r++] = 65533, n += o - 1;
				continue;
			}
			for (a &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && n < s;) a = a << 6 | e[n++] & 63, o--;
			if (o > 1) {
				c[r++] = 65533;
				continue;
			}
			a < 65536 ? c[r++] = a : (a -= 65536, c[r++] = 55296 | a >> 10 & 1023, c[r++] = 56320 | a & 1023);
		}
		return c.length !== r && (c.subarray ? c = c.subarray(0, r) : c.length = r), t.applyFromCharCode(c);
	}
	e.utf8encode = function(e) {
		return n.nodebuffer ? r(e, "utf-8") : o(e);
	}, e.utf8decode = function(e) {
		if (n.nodebuffer) return t.transformTo("nodebuffer", e).toString("utf-8");
		e = t.transformTo(n.uint8array ? "uint8array" : "array", e);
		for (var r = [], i = e.length, a = 65536, o = 0; o < i;) {
			var l = s(e, Math.min(o + a, i));
			n.uint8array ? r.push(c(e.subarray(o, l))) : r.push(c(e.slice(o, l))), o = l;
		}
		return r.join("");
	};
})), Al = /* @__PURE__ */ k(((e, t) => {
	var n = wl();
	function r() {
		this.data = [];
	}
	r.prototype = {
		append: function(e) {
			e = n.transformTo("string", e), this.data.push(e);
		},
		finalize: function() {
			return this.data.join("");
		}
	}, t.exports = r;
})), jl = /* @__PURE__ */ k(((e, t) => {
	var n = wl();
	function r(e) {
		this.data = new Uint8Array(e), this.index = 0;
	}
	r.prototype = {
		append: function(e) {
			e.length !== 0 && (e = n.transformTo("uint8array", e), this.data.set(e, this.index), this.index += e.length);
		},
		finalize: function() {
			return this.data;
		}
	}, t.exports = r;
})), Ml = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = r(e)) || t && e && typeof e.length == "number") {
				n && (e = n);
				var i = 0, a = function() {};
				return {
					s: a,
					n: function() {
						return i >= e.length ? { done: !0 } : {
							done: !1,
							value: e[i++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: a
				};
			}
			throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var o, s = !0, c = !1;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return s = e.done, e;
			},
			e: function(e) {
				c = !0, o = e;
			},
			f: function() {
				try {
					s || n.return == null || n.return();
				} finally {
					if (c) throw o;
				}
			}
		};
	}
	function r(e, t) {
		if (e) {
			if (typeof e == "string") return i(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(e, t) : void 0;
		}
	}
	function i(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var a = yl(), o = wl(), s = Tl(), c = El(), l = Dl(), u = vl(), d = Sl(), f = Ol(), p = Cl(), m = kl(), h = Al(), g = jl();
	function _(e) {
		if (e._data instanceof f && (e._data = e._data.getContent(), e.options.binary = !0, e.options.base64 = !1, o.getTypeOf(e._data) === "uint8array")) {
			var t = e._data;
			e._data = new Uint8Array(t.length), t.length !== 0 && e._data.set(t, 0);
		}
		return e._data;
	}
	function v(e) {
		var t = _(e);
		return o.getTypeOf(t) === "string" ? !e.options.binary && a.nodebuffer ? p(t, "utf-8") : e.asBinary() : t;
	}
	var y = {
		load: function() {
			throw Error("Load method is not defined. Is the file pizzip-load.js included ?");
		},
		filter: function(e) {
			var t = [], n, r, i, a;
			for (n in this.files) this.files.hasOwnProperty(n) && (i = this.files[n], a = new x(i.name, i._data, o.extend(i.options)), r = n.slice(this.root.length, n.length), n.slice(0, this.root.length) === this.root && e(r, a) && t.push(a));
			return t;
		},
		file: function(e, t, n) {
			if (arguments.length === 1) {
				if (o.isRegExp(e)) {
					var r = e;
					return this.filter(function(e, t) {
						return !t.dir && r.test(e);
					});
				}
				return this.filter(function(t, n) {
					return !n.dir && t === e;
				})[0] || null;
			}
			return e = this.root + e, w.call(this, e, t, n), this;
		},
		folder: function(e) {
			if (!e) return this;
			if (o.isRegExp(e)) return this.filter(function(t, n) {
				return n.dir && e.test(t);
			});
			var t = this.root + e, n = D.call(this, t), r = this.shallowClone();
			return r.root = n.name, r;
		},
		remove: function(e) {
			e = this.root + e;
			var t = this.files[e];
			if (t ||= (e.slice(-1) !== "/" && (e += "/"), this.files[e]), t && !t.dir) delete this.files[e];
			else for (var n = this.filter(function(t, n) {
				return n.name.slice(0, e.length) === e;
			}), r = 0; r < n.length; r++) delete this.files[n[r].name];
			return this;
		},
		generate: function(e) {
			e = o.extend(e || {}, {
				base64: !0,
				compression: "STORE",
				compressionOptions: null,
				type: "base64",
				platform: "DOS",
				comment: null,
				mimeType: "application/zip",
				encodeFileName: m.utf8encode
			}), o.checkSupport(e.type), (e.platform === "darwin" || e.platform === "freebsd" || e.platform === "linux" || e.platform === "sunos") && (e.platform = "UNIX"), e.platform === "win32" && (e.platform = "DOS");
			var t = [], r = o.transformTo("string", e.encodeFileName(e.comment || this.comment || "")), i = 0, a = 0, s, l, f = [];
			for (var p in e.fileOrder instanceof Array && (f = e.fileOrder), this.files) f.indexOf(p) === -1 && f.push(p);
			typeof e.fileOrder == "function" && (f = e.fileOrder(this.files));
			var _ = n(f), v;
			try {
				for (_.s(); !(v = _.n()).done;) {
					var y = v.value;
					if (this.files.hasOwnProperty(y)) {
						var b = this.files[y], x = b.options.compression || e.compression.toUpperCase(), C = d[x];
						if (!C) throw Error(x + " is not a valid compression method !");
						var w = b.options.compressionOptions || e.compressionOptions || {}, T = O.call(this, b, C, w), E = j.call(this, y, b, T, i, e.platform, e.encodeFileName);
						i += E.fileRecord.length + T.compressedSize, a += E.dirRecord.length, t.push(E);
					}
				}
			} catch (e) {
				_.e(e);
			} finally {
				_.f();
			}
			var D = "";
			D = c.CENTRAL_DIRECTORY_END + "\0\0\0\0" + S(t.length, 2) + S(t.length, 2) + S(a, 4) + S(i, 4) + S(r.length, 2) + r;
			var k = e.type.toLowerCase();
			for (s = k === "uint8array" || k === "arraybuffer" || k === "blob" || k === "nodebuffer" ? new g(i + a + D.length) : new h(i + a + D.length), l = 0; l < t.length; l++) s.append(t[l].fileRecord), s.append(t[l].compressedObject.compressedContent);
			for (l = 0; l < t.length; l++) s.append(t[l].dirRecord);
			s.append(D);
			var A = s.finalize();
			switch (e.type.toLowerCase()) {
				case "uint8array":
				case "arraybuffer":
				case "nodebuffer": return o.transformTo(e.type.toLowerCase(), A);
				case "blob": return o.arrayBuffer2Blob(o.transformTo("arraybuffer", A), e.mimeType);
				case "base64": return e.base64 ? u.encode(A) : A;
				default: return A;
			}
		},
		crc32: function(e, t) {
			return s(e, t);
		},
		utf8encode: function(e) {
			return o.transformTo("string", m.utf8encode(e));
		},
		utf8decode: function(e) {
			return m.utf8decode(e);
		}
	};
	function b(e) {
		var t = _(this);
		return t == null ? "" : (this.options.base64 && (t = u.decode(t)), t = e && this.options.binary ? y.utf8decode(t) : o.transformTo("string", t), !e && !this.options.binary && (t = o.transformTo("string", y.utf8encode(t))), t);
	}
	function x(e, t, n) {
		this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this.options = n, this._initialMetadata = {
			dir: n.dir,
			date: n.date
		};
	}
	x.prototype = {
		asText: function() {
			return b.call(this, !0);
		},
		asBinary: function() {
			return b.call(this, !1);
		},
		asNodeBuffer: function() {
			var e = v(this);
			return o.transformTo("nodebuffer", e);
		},
		asUint8Array: function() {
			var e = v(this);
			return o.transformTo("uint8array", e);
		},
		asArrayBuffer: function() {
			return this.asUint8Array().buffer;
		}
	};
	function S(e, t) {
		var n = "", r;
		for (r = 0; r < t; r++) n += String.fromCharCode(e & 255), e >>>= 8;
		return n;
	}
	function C(e) {
		return e ||= {}, e.base64 === !0 && (e.binary === null || e.binary === void 0) && (e.binary = !0), e = o.extend(e, l), e.date = e.date || /* @__PURE__ */ new Date(), e.compression !== null && (e.compression = e.compression.toUpperCase()), e;
	}
	function w(e, t, n) {
		var r = o.getTypeOf(t), i;
		if (n = C(n), typeof n.unixPermissions == "string" && (n.unixPermissions = parseInt(n.unixPermissions, 8)), n.unixPermissions && n.unixPermissions & 16384 && (n.dir = !0), n.dosPermissions && n.dosPermissions & 16 && (n.dir = !0), n.dir && (e = E(e)), n.createFolders && (i = T(e)) && D.call(this, i, !0), n.dir || t == null) n.base64 = !1, n.binary = !1, t = null, r = null;
		else if (r === "string") n.binary && !n.base64 && n.optimizedBinaryString !== !0 && (t = o.string2binary(t));
		else {
			if (n.base64 = !1, n.binary = !0, !r && !(t instanceof f)) throw Error("The data of '" + e + "' is in an unsupported format !");
			r === "arraybuffer" && (t = o.transformTo("uint8array", t));
		}
		var a = new x(e, t, n);
		return this.files[e] = a, a;
	}
	function T(e) {
		e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
		var t = e.lastIndexOf("/");
		return t > 0 ? e.substring(0, t) : "";
	}
	function E(e) {
		return e.slice(-1) !== "/" && (e += "/"), e;
	}
	function D(e, t) {
		return t = t !== void 0 && t, e = E(e), this.files[e] || w.call(this, e, null, {
			dir: !0,
			createFolders: t
		}), this.files[e];
	}
	function O(e, t, n) {
		var r = new f(), i;
		return e._data instanceof f ? (r.uncompressedSize = e._data.uncompressedSize, r.crc32 = e._data.crc32, r.uncompressedSize === 0 || e.dir ? (t = d.STORE, r.compressedContent = "", r.crc32 = 0) : e._data.compressionMethod === t.magic ? r.compressedContent = e._data.getCompressedContent() : (i = e._data.getContent(), r.compressedContent = t.compress(o.transformTo(t.compressInputType, i), n))) : (i = v(e), (!i || i.length === 0 || e.dir) && (t = d.STORE, i = ""), r.uncompressedSize = i.length, r.crc32 = s(i), r.compressedContent = t.compress(o.transformTo(t.compressInputType, i), n)), r.compressedSize = r.compressedContent.length, r.compressionMethod = t.magic, r;
	}
	function k(e, t) {
		var n = e;
		return e || (n = t ? 16893 : 33204), (n & 65535) << 16;
	}
	function A(e) {
		return (e || 0) & 63;
	}
	function j(e, t, n, r, i, a) {
		var l = a !== m.utf8encode, u = o.transformTo("string", a(t.name)), d = o.transformTo("string", m.utf8encode(t.name)), f = t.comment || "", p = o.transformTo("string", a(f)), h = o.transformTo("string", m.utf8encode(f)), g = d.length !== t.name.length, _ = h.length !== f.length, v = t.options, y, b, x = "", C = "", w = "", T = t._initialMetadata.dir === t.dir ? v.dir : t.dir, E = t._initialMetadata.date === t.date ? v.date : t.date, D = 0, O = 0;
		T && (D |= 16), i === "UNIX" ? (O = 798, D |= k(t.unixPermissions, T)) : (O = 20, D |= A(t.dosPermissions, T)), y = E.getHours(), y <<= 6, y |= E.getMinutes(), y <<= 5, y |= E.getSeconds() / 2, b = E.getFullYear() - 1980, b <<= 4, b |= E.getMonth() + 1, b <<= 5, b |= E.getDate(), g && (C = S(1, 1) + S(s(u), 4) + d, x += "up" + S(C.length, 2) + C), _ && (w = S(1, 1) + S(this.crc32(p), 4) + h, x += "uc" + S(w.length, 2) + w);
		var j = "";
		return j += "\n\0", j += !l && (g || _) ? "\0\b" : "\0\0", j += n.compressionMethod, j += S(y, 2), j += S(b, 2), j += S(n.crc32, 4), j += S(n.compressedSize, 4), j += S(n.uncompressedSize, 4), j += S(u.length, 2), j += S(x.length, 2), {
			fileRecord: c.LOCAL_FILE_HEADER + j + u + x,
			dirRecord: c.CENTRAL_FILE_HEADER + S(O, 2) + j + S(p.length, 2) + "\0\0\0\0" + S(D, 4) + S(r, 4) + u + x + p,
			compressedObject: n
		};
	}
	t.exports = y;
})), Nl = /* @__PURE__ */ k(((e, t) => {
	var n = wl();
	function r() {
		this.data = null, this.length = 0, this.index = 0, this.zero = 0;
	}
	r.prototype = {
		checkOffset: function(e) {
			this.checkIndex(this.index + e);
		},
		checkIndex: function(e) {
			if (this.length < this.zero + e || e < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
		},
		setIndex: function(e) {
			this.checkIndex(e), this.index = e;
		},
		skip: function(e) {
			this.setIndex(this.index + e);
		},
		byteAt: function() {},
		readInt: function(e) {
			var t = 0, n;
			for (this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--) t = (t << 8) + this.byteAt(n);
			return this.index += e, t;
		},
		readString: function(e) {
			return n.transformTo("string", this.readData(e));
		},
		readData: function() {},
		lastIndexOfSignature: function() {},
		readDate: function() {
			var e = this.readInt(4);
			return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
		}
	}, t.exports = r;
})), Pl = /* @__PURE__ */ k(((e, t) => {
	var n = Nl(), r = wl();
	function i(e, t) {
		this.data = e, t || (this.data = r.string2binary(this.data)), this.length = this.data.length, this.index = 0, this.zero = 0;
	}
	i.prototype = new n(), i.prototype.byteAt = function(e) {
		return this.data.charCodeAt(this.zero + e);
	}, i.prototype.lastIndexOfSignature = function(e) {
		return this.data.lastIndexOf(e) - this.zero;
	}, i.prototype.readData = function(e) {
		this.checkOffset(e);
		var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = i;
})), Fl = /* @__PURE__ */ k(((e, t) => {
	var n = Nl();
	function r(e) {
		if (e) {
			this.data = e, this.length = this.data.length, this.index = 0, this.zero = 0;
			for (var t = 0; t < this.data.length; t++) e[t] &= e[t];
		}
	}
	r.prototype = new n(), r.prototype.byteAt = function(e) {
		return this.data[this.zero + e];
	}, r.prototype.lastIndexOfSignature = function(e) {
		for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; a >= 0; --a) if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i) return a - this.zero;
		return -1;
	}, r.prototype.readData = function(e) {
		if (this.checkOffset(e), e === 0) return [];
		var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = r;
})), Il = /* @__PURE__ */ k(((e, t) => {
	var n = Fl();
	function r(e) {
		e && (this.data = e, this.length = this.data.length, this.index = 0, this.zero = 0);
	}
	r.prototype = new n(), r.prototype.readData = function(e) {
		if (this.checkOffset(e), e === 0) return /* @__PURE__ */ new Uint8Array();
		var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = r;
})), Ll = /* @__PURE__ */ k(((e, t) => {
	var n = Il();
	function r(e) {
		this.data = e, this.length = this.data.length, this.index = 0, this.zero = 0;
	}
	r.prototype = new n(), r.prototype.readData = function(e) {
		this.checkOffset(e);
		var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = r;
})), Rl = /* @__PURE__ */ k(((e, t) => {
	var n = Pl(), r = wl(), i = Ol(), a = Ml(), o = yl(), s = 0, c = 3;
	function l(e, t) {
		this.options = e, this.loadOptions = t;
	}
	l.prototype = {
		isEncrypted: function() {
			return (this.bitFlag & 1) == 1;
		},
		useUTF8: function() {
			return (this.bitFlag & 2048) == 2048;
		},
		prepareCompressedContent: function(e, t, n) {
			return function() {
				var r = e.index;
				e.setIndex(t);
				var i = e.readData(n);
				return e.setIndex(r), i;
			};
		},
		prepareContent: function(e, t, n, i, a) {
			return function() {
				var e = r.transformTo(i.uncompressInputType, this.getCompressedContent()), t = i.uncompress(e);
				if (t.length !== a) throw Error("Bug : uncompressed data size mismatch");
				return t;
			};
		},
		readLocalPart: function(e) {
			e.skip(22), this.fileNameLength = e.readInt(2);
			var t = e.readInt(2);
			if (this.fileName = e.readData(this.fileNameLength), e.skip(t), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
			var n = r.findCompression(this.compressionMethod);
			if (n === null) throw Error("Corrupted zip : compression " + r.pretty(this.compressionMethod) + " unknown (inner file : " + r.transformTo("string", this.fileName) + ")");
			if (this.decompressed = new i(), this.decompressed.compressedSize = this.compressedSize, this.decompressed.uncompressedSize = this.uncompressedSize, this.decompressed.crc32 = this.crc32, this.decompressed.compressionMethod = this.compressionMethod, this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, n), this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, n, this.uncompressedSize), this.loadOptions.checkCRC32 && (this.decompressed = r.transformTo("string", this.decompressed.getContent()), a.crc32(this.decompressed) !== this.crc32)) throw Error("Corrupted zip : CRC32 mismatch");
		},
		readCentralPart: function(e) {
			if (this.versionMadeBy = e.readInt(2), this.versionNeeded = e.readInt(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4), this.fileNameLength = e.readInt(2), this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
			this.fileName = e.readData(this.fileNameLength), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
		},
		processAttributes: function() {
			this.unixPermissions = null, this.dosPermissions = null;
			var e = this.versionMadeBy >> 8;
			this.dir = !!(this.externalFileAttributes & 16), e === s && (this.dosPermissions = this.externalFileAttributes & 63), e === c && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
		},
		parseZIP64ExtraField: function() {
			if (this.extraFields[1]) {
				var e = new n(this.extraFields[1].value);
				this.uncompressedSize === r.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === r.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === r.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === r.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
			}
		},
		readExtraFields: function(e) {
			var t = e.index, n, r, i;
			for (this.extraFields = this.extraFields || {}; e.index < t + this.extraFieldsLength;) n = e.readInt(2), r = e.readInt(2), i = e.readString(r), this.extraFields[n] = {
				id: n,
				length: r,
				value: i
			};
		},
		handleUTF8: function() {
			var e = o.uint8array ? "uint8array" : "array";
			if (this.useUTF8()) this.fileNameStr = a.utf8decode(this.fileName), this.fileCommentStr = a.utf8decode(this.fileComment);
			else {
				var t = this.findExtraFieldUnicodePath();
				if (t !== null) this.fileNameStr = t;
				else {
					var n = r.transformTo(e, this.fileName);
					this.fileNameStr = this.loadOptions.decodeFileName(n);
				}
				var i = this.findExtraFieldUnicodeComment();
				if (i !== null) this.fileCommentStr = i;
				else {
					var s = r.transformTo(e, this.fileComment);
					this.fileCommentStr = this.loadOptions.decodeFileName(s);
				}
			}
		},
		findExtraFieldUnicodePath: function() {
			var e = this.extraFields[28789];
			if (e) {
				var t = new n(e.value);
				return t.readInt(1) !== 1 || a.crc32(this.fileName) !== t.readInt(4) ? null : a.utf8decode(t.readString(e.length - 5));
			}
			return null;
		},
		findExtraFieldUnicodeComment: function() {
			var e = this.extraFields[25461];
			if (e) {
				var t = new n(e.value);
				return t.readInt(1) !== 1 || a.crc32(this.fileComment) !== t.readInt(4) ? null : a.utf8decode(t.readString(e.length - 5));
			}
			return null;
		}
	}, t.exports = l;
})), zl = /* @__PURE__ */ k(((e, t) => {
	var n = Pl(), r = Ll(), i = Il(), a = Fl(), o = wl(), s = El(), c = Rl(), l = yl();
	function u(e, t) {
		this.files = [], this.loadOptions = t, e && this.load(e);
	}
	u.prototype = {
		checkSignature: function(e) {
			var t = this.reader.readString(4);
			if (t !== e) throw Error("Corrupted zip or bug : unexpected signature (" + o.pretty(t) + ", expected " + o.pretty(e) + ")");
		},
		isSignature: function(e, t) {
			var n = this.reader.index;
			this.reader.setIndex(e);
			var r = this.reader.readString(4) === t;
			return this.reader.setIndex(n), r;
		},
		readBlockEndOfCentral: function() {
			this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
			var e = this.reader.readData(this.zipCommentLength), t = l.uint8array ? "uint8array" : "array", n = o.transformTo(t, e);
			this.zipComment = this.loadOptions.decodeFileName(n);
		},
		readBlockZip64EndOfCentral: function() {
			this.zip64EndOfCentralSize = this.reader.readInt(8), this.versionMadeBy = this.reader.readString(2), this.versionNeeded = this.reader.readInt(2), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
			for (var e = this.zip64EndOfCentralSize - 44, t = 0, n, r, i; t < e;) n = this.reader.readInt(2), r = this.reader.readInt(4), i = this.reader.readString(r), this.zip64ExtensibleData[n] = {
				id: n,
				length: r,
				value: i
			};
		},
		readBlockZip64EndOfCentralLocator: function() {
			if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw Error("Multi-volumes zip are not supported");
		},
		readLocalFiles: function() {
			var e, t;
			for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
		},
		readCentralDir: function() {
			var e;
			for (this.reader.setIndex(this.centralDirOffset); this.reader.readString(4) === s.CENTRAL_FILE_HEADER;) e = new c({ zip64: this.zip64 }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
			if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
		},
		readEndOfCentral: function() {
			var e = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
			if (e < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? Error("Corrupted zip : can't find end of central directory") : Error("Can't find end of central directory : is this a zip file ?");
			this.reader.setIndex(e);
			var t = e;
			if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
				if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0) throw Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
				if (this.reader.setIndex(e), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw Error("Corrupted zip : can't find the ZIP64 end of central directory");
				this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
			}
			var n = this.centralDirOffset + this.centralDirSize;
			this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
			var r = t - n;
			if (r > 0) this.isSignature(t, s.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
			else if (r < 0) throw Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
		},
		prepareReader: function(e) {
			var t = o.getTypeOf(e);
			if (o.checkSupport(t), t === "string" && !l.uint8array) this.reader = new n(e, this.loadOptions.optimizedBinaryString);
			else if (t === "nodebuffer") this.reader = new r(e);
			else if (l.uint8array) this.reader = new i(o.transformTo("uint8array", e));
			else if (l.array) this.reader = new a(o.transformTo("array", e));
			else throw Error("Unexpected error: unsupported type '" + t + "'");
		},
		load: function(e) {
			this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
		}
	}, t.exports = u;
})), Bl = /* @__PURE__ */ k(((e, t) => {
	var n = vl(), r = kl(), i = wl(), a = zl();
	t.exports = function(e, t) {
		var o, s;
		t = i.extend(t || {}, {
			base64: !1,
			checkCRC32: !1,
			optimizedBinaryString: !1,
			createFolders: !1,
			decodeFileName: r.utf8decode
		}), t.base64 && (e = n.decode(e));
		var c = new a(e, t), l = c.files;
		for (o = 0; o < l.length; o++) s = l[o], this.file(s.fileNameStr, s.decompressed, {
			binary: !0,
			optimizedBinaryString: !0,
			date: s.date,
			dir: s.dir,
			comment: s.fileCommentStr.length ? s.fileCommentStr : null,
			unixPermissions: s.unixPermissions,
			dosPermissions: s.dosPermissions,
			createFolders: t.createFolders
		});
		return c.zipComment.length && (this.comment = c.zipComment), this;
	};
})), Vl = /* @__PURE__ */ k(((e) => {
	var t = wl();
	e.string2binary = function(e) {
		return t.string2binary(e);
	}, e.string2Uint8Array = function(e) {
		return t.transformTo("uint8array", e);
	}, e.uint8Array2String = function(e) {
		return t.transformTo("string", e);
	}, e.string2Blob = function(e) {
		var n = t.transformTo("arraybuffer", e);
		return t.arrayBuffer2Blob(n);
	}, e.arrayBuffer2Blob = function(e) {
		return t.arrayBuffer2Blob(e);
	}, e.transformTo = function(e, n) {
		return t.transformTo(e, n);
	}, e.getTypeOf = function(e) {
		return t.getTypeOf(e);
	}, e.checkSupport = function(e) {
		return t.checkSupport(e);
	}, e.MAX_VALUE_16BITS = t.MAX_VALUE_16BITS, e.MAX_VALUE_32BITS = t.MAX_VALUE_32BITS, e.pretty = function(e) {
		return t.pretty(e);
	}, e.findCompression = function(e) {
		return t.findCompression(e);
	}, e.isRegExp = function(e) {
		return t.isRegExp(e);
	};
})), Hl = /* @__PURE__ */ k(((e, t) => {
	var n = vl();
	function r(e, t) {
		if (!(this instanceof r)) return new r(e, t);
		this.files = {}, this.comment = null, this.root = "", e && this.load(e, t), this.clone = function() {
			var e = this, t = new r();
			return Object.keys(this.files).forEach(function(n) {
				t.file(n, e.files[n].asUint8Array());
			}), t;
		}, this.shallowClone = function() {
			var e = new r();
			for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
			return e;
		};
	}
	r.prototype = Ml(), r.prototype.load = Bl(), r.support = yl(), r.defaults = Dl(), r.utils = Vl(), r.base64 = {
		encode: function(e) {
			return n.encode(e);
		},
		decode: function(e) {
			return n.decode(e);
		}
	}, r.compressions = Sl(), t.exports = r, t.exports.default = r;
})), Ul = /* @__PURE__ */ j(_l(), 1), Wl = /* @__PURE__ */ j(Hl(), 1), Gl = /^data:image\/png;base64,([a-z0-9+/=\s]+)$/i, Kl = (e) => e.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&apos;", "'"), ql = (e) => e.replace(/<w:p\b[\s\S]*?<\/w:p>/g, (e) => e.includes("w:pStyle w:val=\"CellTerminator\"") || e.includes("<w:drawing") || Array.from(e.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Kl(e[1]).trim()).join("") ? e : ""), Jl = (e) => {
	if (e.length < 24 || e.toString("ascii", 1, 4) !== "PNG") return {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};
	let t = e.readUInt32BE(16), n = e.readUInt32BE(20);
	if (!t || !n || t === n) return {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};
	if (t > n) {
		let e = Math.round((t - n) / (2 * t) * 1e5);
		return {
			left: e,
			top: 0,
			right: e,
			bottom: 0
		};
	}
	let r = Math.round((n - t) / (2 * n) * 1e5);
	return {
		left: 0,
		top: r,
		right: 0,
		bottom: r
	};
}, Yl = (e, t) => {
	let n = e?.replace("#", "").toUpperCase();
	return n && /^[0-9A-F]{6}$/.test(n) ? n : t;
}, Xl = (e, t, n) => {
	let r = e === bc.id ? /* @__PURE__ */ new Map([
		["0A3485", Yl(n.DESIGN_PRIMARY, "0A3485")],
		["FF6500", Yl(n.DESIGN_ACCENT, "FF6500")],
		["FFD8BF", Yl(n.DESIGN_SOFT_ACCENT, "FFD8BF")]
	]) : e === yc.id ? /* @__PURE__ */ new Map([
		["154F45", Yl(n.DESIGN_PRIMARY, "154F45")],
		["39B774", Yl(n.DESIGN_PRIMARY, "39B774")],
		["E4EBE8", Yl(n.DESIGN_SOFT_ACCENT, "E4EBE8")]
	]) : /* @__PURE__ */ new Map([
		["0F5B4A", Yl(n.DESIGN_PRIMARY, "0F5B4A")],
		["36B779", Yl(n.DESIGN_ACCENT, "36B779")],
		["CDEEDF", Yl(n.DESIGN_SOFT_ACCENT, "CDEEDF")],
		["9DDBB9", Yl(n.DESIGN_TITLE_BACKGROUND, "9DDBB9")]
	]), i = n.DESIGN_FONT?.trim() || "Arial";
	for (let e of Object.keys(t.files)) {
		if (!/^word\/.*\.xml$/i.test(e)) continue;
		let n = t.file(e);
		if (!n) continue;
		let a = n.asText();
		for (let [e, t] of r) a = a.replaceAll(e, t);
		a = a.replaceAll("w:ascii=\"Arial\"", `w:ascii="${i}"`).replaceAll("w:hAnsi=\"Arial\"", `w:hAnsi="${i}"`).replaceAll("w:cs=\"Arial\"", `w:cs="${i}"`), t.file(e, a);
	}
}, Zl = (e) => e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Ql = (e) => {
	let t = e.trim();
	return t ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? `mailto:${t}` : /^\+?[\d\s()./-]{7,}$/.test(t) ? `tel:${t.replace(/[^\d+]/g, "")}` : /^https?:\/\//i.test(t) ? t : /^(?:www\.|linkedin\.com\/|github\.com\/|[\w.-]+\.[a-z]{2,}\/)/i.test(t) ? `https://${t}` : null : null;
}, $l = (e, t) => {
	let n = e.file("word/document.xml"), r = e.file("word/_rels/document.xml.rels");
	if (!n || !r) return;
	let i = n.asText(), a = r.asText(), o = Number(t.DESIGN_MARGIN_VERTICAL_MM), s = Number(t.DESIGN_MARGIN_HORIZONTAL_MM);
	if (Number.isFinite(o) && o >= 10 && o <= 25 && Number.isFinite(s) && s >= 13 && s <= 25) {
		let e = Math.round(o / 25.4 * 1440), t = Math.round(s / 25.4 * 1440);
		i = i.replace(/<w:pgMar\b[^>]*\/>/, (n) => n.replace(/w:top="[^"]*"/, `w:top="${e}"`).replace(/w:bottom="[^"]*"/, `w:bottom="${e}"`).replace(/w:left="[^"]*"/, `w:left="${t}"`).replace(/w:right="[^"]*"/, `w:right="${t}"`));
	}
	if (t.DEKORATION_AKTIV?.trim().toLowerCase() === "false") {
		let e = i.match(/<w:drawing>[\s\S]*?<\/w:drawing>/g)?.find((e) => e.includes("KOMPAKT_DEKORATION"));
		e && (i = ql(i.replace(e, "")));
	}
	let c = 0;
	i = i.replace(/<w:p\b[\s\S]*?<\/w:p>/g, (e) => {
		if (!e.includes("w:pStyle w:val=\"ContactLink\"") || e.includes("<w:hyperlink")) return e;
		let t = Ql(Array.from(e.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Kl(e[1])).join("").trim());
		if (!t) return e;
		c += 1;
		let n = `rIdKompaktLink${c}`;
		return a = a.replace("</Relationships>", `<Relationship Id="${n}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${Zl(t)}" TargetMode="External"/></Relationships>`), e.replace(/(<w:r\b[\s\S]*?<\/w:r>)/, `<w:hyperlink r:id="${n}" w:history="1">$1</w:hyperlink>`);
	}), e.file("word/document.xml", i), e.file("word/_rels/document.xml.rels", a);
}, eu = (t, n) => {
	let r = t.file("word/document.xml"), i = t.file("word/_rels/document.xml.rels");
	if (!r || !i) return { found: !1 };
	let a = r.asText(), o = a.match(/<w:drawing>[\s\S]*?<\/w:drawing>/g)?.find((e) => /<wp:docPr\b[^>]*(?:descr|title)="PROFILFOTO"[^>]*\/>/.test(e));
	if (!o) return { found: !1 };
	let s = o.match(/<a:blip\b[^>]*r:embed="([^"]+)"/)?.[1], c = n.match(Gl)?.[1];
	if (!s || !c) return a = a.replace(o, ""), t.file("word/document.xml", ql(a)), { found: !0 };
	let l = i.asText(), u = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), d = l.match(RegExp(`<Relationship\\b(?=[^>]*\\bId="${u}")(?=[^>]*\\bTarget="([^"]+)")[^>]*/>`))?.[1];
	if (!d) return a = a.replace(o, ""), t.file("word/document.xml", ql(a)), { found: !0 };
	let f = Buffer.from(c.replace(/\s/g, ""), "base64");
	t.file(e.posix.join("word", d), f);
	let p = Jl(f), m = `<a:srcRect l="${p.left}" t="${p.top}" r="${p.right}" b="${p.bottom}"/>`, h = o.replace(/(<a:blip\b[^>]*\/>)(?:<a:srcRect\b[^>]*\/>)?/, `$1${m}`);
	return a = a.replace(o, h), t.file("word/document.xml", ql(a)), { found: !0 };
}, tu = class {
	async createDocument(t, r, i) {
		if (t.extension === ".doc") return await n(t.filePath, r), {
			templateId: t.id,
			fileName: e.basename(r),
			filePath: r,
			extension: ".doc",
			replacedPlaceholders: [],
			warning: "Das ältere DOC-Format wurde sicher kopiert. Platzhalter werden in DOC-Dateien nicht automatisch ersetzt."
		};
		try {
			let n = new Wl.default(await a(t.filePath));
			if (t.extension === ".dotx") {
				let e = n.file("[Content_Types].xml");
				e && n.file("[Content_Types].xml", e.asText().replace("application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"));
			}
			let o = new Ul.default(n, {
				paragraphLoop: !0,
				linebreaks: !0,
				delimiters: {
					start: "{{",
					end: "}}"
				},
				nullGetter: (e) => `{{${e.value}}}`
			}), s = o.getFullText(), c = Object.keys(Sc), l = Object.fromEntries([
				...Object.entries(i),
				...Ec.map((e) => [e, i[e] ?? ""]),
				...c.map((e) => [e, i[e] ?? i[Sc[e]] ?? ""])
			]), d = [...Ec, ...c].filter((e) => s.includes(`{{${e}}}`));
			o.render(l);
			let f = o.getZip();
			if ((t.id === gc.id || t.id === yc.id || t.id === bc.id || t.id === _c.id) && Xl(t.id, f, i), t.id === bc.id && $l(f, i), eu(f, i.PROFILFOTO ?? "").found) d.push("PROFILFOTO");
			else {
				let e = f.file("word/document.xml");
				e && f.file("word/document.xml", ql(e.asText()));
			}
			return await u(r, f.generate({
				type: "nodebuffer",
				compression: "DEFLATE"
			})), {
				templateId: t.id,
				fileName: e.basename(r),
				filePath: r,
				extension: ".docx",
				replacedPlaceholders: d
			};
		} catch (e) {
			throw e instanceof Dc ? e : new Dc(`Die Word-Vorlage ist beschädigt oder enthält ungültige Platzhalter. ${Oc(e).message}`, "CORRUPT");
		}
	}
}, nu = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;"), ru = class {
	constructor(e) {
		this.paths = e;
	}
	async generate(t) {
		await r(this.paths.previewCache, { recursive: !0 });
		let n = new Date(t.modifiedAt ?? 0).getTime(), i = t.id === hc.id ? hc : t.id === gc.id ? gc : t.id === yc.id ? yc : t.id === bc.id ? bc : t.id === _c.id ? _c : void 0;
		if (i && this.paths.bundledTemplatesRoot) try {
			let r = await a(e.join(this.paths.bundledTemplatesRoot, i.previewFileName)), o = e.join(this.paths.previewCache, `${t.id}-${n}.png`);
			return await u(o, r), {
				previewImagePath: o,
				previewDataUrl: `data:image/png;base64,${r.toString("base64")}`
			};
		} catch {}
		let o = `${t.id}-${n}.svg`, s = e.join(this.paths.previewCache, o), l = t.documentType === "anschreiben" ? "ANSCHREIBEN" : t.documentType === "deckblatt" ? "DECKBLATT" : "LEBENSLAUF", d = t.modifiedAt ? new Intl.DateTimeFormat("de-DE", {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(t.modifiedAt)) : "Änderungsdatum unbekannt", f = fc[t.source], p = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="594" viewBox="0 0 420 594">
      <rect width="420" height="594" rx="8" fill="#fff"/>
      <rect x="34" y="38" width="352" height="5" rx="2.5" fill="#2b579a"/>
      <text x="34" y="76" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#2b579a">${l}</text>
      <rect x="34" y="92" width="44" height="50" rx="4" fill="#2b579a"/>
      <text x="48" y="126" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#fff">W</text>
      <text x="92" y="116" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="#1d2927">${nu(t.name.slice(0, 23))}</text>
      <text x="92" y="138" font-family="Arial,sans-serif" font-size="11" fill="#71807c">${nu(t.format.toUpperCase())} &#183; ${nu(f)}</text>
      <rect x="34" y="160" width="330" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="174" width="310" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="218" width="170" height="9" rx="4" fill="#9aaba6"/>
      ${Array.from({ length: 12 }, (e, t) => `<rect x="34" y="${246 + t * 20}" width="${t % 3 == 0 ? 330 : 300}" height="6" rx="3" fill="#e5ebe9"/>`).join("")}
      <text x="34" y="540" font-family="Arial,sans-serif" font-size="12" fill="#71807c">Geändert: ${nu(d)}</text>
      <text x="34" y="560" font-family="Arial,sans-serif" font-size="12" fill="#71807c">${nu(t.format.toUpperCase())} &#183; ${nu(f)}</text>
    </svg>`;
		try {
			await a(s);
		} catch {
			await u(s, p, "utf8");
			let n = await import("node:fs/promises").then((e) => e.readdir(this.paths.previewCache));
			await Promise.all(n.filter((e) => e.startsWith(`${t.id}-`) && e !== o).map((t) => c(e.join(this.paths.previewCache, t), { force: !0 })));
		}
		return {
			previewImagePath: s,
			previewDataUrl: `data:image/svg+xml;base64,${Buffer.from(p).toString("base64")}`
		};
	}
}, iu = (t) => S("sha256").update(e.resolve(t).toLocaleLowerCase("de-DE")).digest("hex"), au = ({ filePath: t, extension: n, documentType: r, source: i, fileSize: a, createdAt: o, modifiedAt: s, metadata: c }) => {
	let l = e.basename(t), u = e.basename(t, n).replaceAll("_", " ").replaceAll("-", " ");
	return {
		id: c.id?.trim() || iu(t),
		name: c.name?.trim() || u,
		fileName: l,
		filePath: t,
		extension: n,
		format: c.format ?? n.slice(1),
		documentType: c.documentType ?? r,
		source: c.source ?? i,
		sortOrder: c.sortOrder ?? 1e3,
		createdAt: o,
		modifiedAt: s,
		fileSize: a,
		description: c.description?.trim() || void 0,
		tags: Array.from(new Set((c.tags ?? []).map((e) => e.trim()).filter(Boolean))),
		isFavorite: c.isFavorite ?? !1,
		isSystemTemplate: c.isSystemTemplate ?? !1,
		supportsPreview: c.supportsPreview ?? !0,
		supportsPlaceholders: c.supportsPlaceholders ?? n !== ".doc",
		editableInWord: c.editableInWord ?? !0,
		isProtected: c.isProtected ?? !1,
		category: c.category?.trim() || void 0,
		layout: c.layout?.trim() || void 0,
		atsFriendly: c.atsFriendly ?? !1,
		supportsPhoto: c.supportsPhoto ?? !1,
		supportsBackground: c.supportsBackground ?? !1,
		supportsAtsMode: c.supportsAtsMode ?? !1,
		emphasis: c.emphasis?.trim() || void 0
	};
}, ou = (t) => {
	let n = e.extname(t).toLowerCase();
	if (!dc.has(n)) throw new Dc("Dieses Dateiformat wird nicht als Word-Vorlage unterstützt.", "INVALID_FORMAT");
	return n;
}, su = (t, n) => {
	let r = e.resolve(t), i = e.resolve(n);
	return i === r || i.startsWith(`${r}${e.sep}`);
}, cu = (e, t) => {
	if (![
		e.anschreibenTemplates,
		e.deckblattTemplates,
		e.lebenslaufTemplates,
		e.anschreibenDocuments,
		e.systemTemplateCache
	].some((e) => su(e, t))) throw new Dc("Ungültiger Vorlagenpfad.", "INVALID_PATH");
	ou(t);
}, lu = async (e, t) => {
	cu(e, t);
	let n = await l(t);
	if (!n.isFile()) throw new Dc("Die Vorlage ist keine Datei.", "INVALID_FORMAT");
	if (n.size > 26214400) throw new Dc("Die Vorlage darf höchstens 25 MB groß sein.", "FILE_TOO_LARGE");
	return n;
}, uu = async (e, t = 3) => {
	let n;
	for (let r = 0; r < t; r += 1) try {
		return await e();
	} catch (e) {
		n = e;
		let t = typeof e == "object" && e && "code" in e ? String(e.code) : "";
		if (![
			"EBUSY",
			"EPERM",
			"EACCES",
			"EIO",
			"ENODATA"
		].includes(t)) break;
		await new Promise((e) => setTimeout(e, 120 * (r + 1)));
	}
	throw Oc(n);
}, du = (t) => `${t.slice(0, -e.extname(t).length)}.template.json`, fu = async (e) => {
	try {
		let t = JSON.parse(await a(du(e), "utf8"));
		if (!t || typeof t != "object") return {};
		let n = t;
		return {
			id: typeof n.id == "string" ? n.id : void 0,
			name: typeof n.name == "string" ? n.name : void 0,
			documentType: n.documentType === "anschreiben" || n.documentType === "deckblatt" || n.documentType === "lebenslauf" ? n.documentType : void 0,
			format: n.format === "docx" || n.format === "dotx" || n.format === "doc" ? n.format : void 0,
			source: n.source === "muster-folder" || n.source === "existing-document" || n.source === "uploaded-word-template" || n.source === "system-word-template" ? n.source : void 0,
			sortOrder: typeof n.sortOrder == "number" && Number.isFinite(n.sortOrder) ? n.sortOrder : void 0,
			description: typeof n.description == "string" ? n.description : void 0,
			tags: Array.isArray(n.tags) ? n.tags.filter((e) => typeof e == "string") : void 0,
			isFavorite: typeof n.isFavorite == "boolean" ? n.isFavorite : void 0,
			isSystemTemplate: typeof n.isSystemTemplate == "boolean" ? n.isSystemTemplate : void 0,
			supportsPreview: typeof n.supportsPreview == "boolean" ? n.supportsPreview : void 0,
			supportsPlaceholders: typeof n.supportsPlaceholders == "boolean" ? n.supportsPlaceholders : void 0,
			editableInWord: typeof n.editableInWord == "boolean" ? n.editableInWord : void 0,
			isProtected: typeof n.isProtected == "boolean" ? n.isProtected : void 0,
			category: typeof n.category == "string" ? n.category : void 0,
			layout: typeof n.layout == "string" ? n.layout : void 0,
			atsFriendly: typeof n.atsFriendly == "boolean" ? n.atsFriendly : void 0,
			supportsPhoto: typeof n.supportsPhoto == "boolean" ? n.supportsPhoto : void 0,
			supportsBackground: typeof n.supportsBackground == "boolean" ? n.supportsBackground : void 0,
			supportsAtsMode: typeof n.supportsAtsMode == "boolean" ? n.supportsAtsMode : void 0,
			emphasis: typeof n.emphasis == "string" ? n.emphasis : void 0
		};
	} catch {
		return {};
	}
}, pu = async (t) => {
	let n = [], r = [t];
	for (; r.length;) {
		let t = r.pop(), i = await o(t, { withFileTypes: !0 });
		for (let a of i) {
			let i = e.join(t, a.name);
			a.isDirectory() && r.push(i), a.isFile() && n.push(i);
		}
	}
	return n;
}, mu = (e) => {
	let t = e.filter((e) => e.id !== mc.id && e.id !== gc.id && e.id !== yc.id && e.id !== bc.id && e.id !== _c.id && e.id !== vc.id).sort((e, t) => e.sortOrder - t.sortOrder || e.name.localeCompare(t.name, "de")), n = [
		{
			id: mc.id,
			index: 1
		},
		{
			id: gc.id,
			index: 2
		},
		{
			id: yc.id,
			index: 3
		},
		{
			id: bc.id,
			index: 4
		},
		{
			id: _c.id,
			index: 5
		},
		{
			id: vc.id,
			index: 6
		}
	], r = [...t];
	for (let t of n) {
		let n = e.find((e) => e.id === t.id);
		n && r.splice(Math.min(t.index, r.length), 0, n);
	}
	return r;
}, hu = class {
	constructor(e) {
		this.paths = e;
	}
	locations() {
		return [
			{
				root: this.paths.anschreibenTemplates,
				documentType: "anschreiben",
				source: "muster-folder"
			},
			{
				root: this.paths.deckblattTemplates,
				documentType: "deckblatt",
				source: "muster-folder"
			},
			{
				root: this.paths.lebenslaufTemplates,
				documentType: "lebenslauf",
				source: "muster-folder"
			},
			{
				root: this.paths.anschreibenDocuments,
				documentType: "anschreiben",
				source: "existing-document"
			}
		];
	}
	async scanAllTemplates() {
		let t = [], n = [];
		for (let r of this.locations()) {
			let i = [];
			try {
				i = await uu(() => pu(r.root));
			} catch (t) {
				n.push(t instanceof Error ? `${e.basename(r.root)}: ${t.message}` : `${e.basename(r.root)} konnte nicht gelesen werden.`);
				continue;
			}
			for (let a of i) {
				let i;
				try {
					i = ou(a);
				} catch {
					continue;
				}
				try {
					let e = await uu(() => lu(this.paths, a));
					if (e.size > 26214400) continue;
					t.push(au({
						filePath: a,
						extension: i,
						documentType: r.documentType,
						source: r.source,
						fileSize: e.size,
						createdAt: e.birthtime.toISOString(),
						modifiedAt: e.mtime.toISOString(),
						metadata: await fu(a)
					}));
				} catch (t) {
					n.push(t instanceof Error ? `${e.basename(a)}: ${t.message}` : `${e.basename(a)} konnte nicht gelesen werden.`);
				}
			}
		}
		return {
			templates: mu(t),
			warnings: n
		};
	}
	async scanTemplatesByType(e) {
		return (await this.scanAllTemplates()).templates.filter((t) => t.documentType === e);
	}
	async scanExistingAnschreiben() {
		return (await this.scanAllTemplates()).templates.filter((e) => e.source === "existing-document");
	}
}, gu = (e) => typeof e == "object" && e && "code" in e ? String(e.code) : "", _u = class {
	constructor(e) {
		this.paths = e, this.templates = [], this.scanner = new hu(e), this.previewService = new ru(e);
	}
	async initialize() {
		return await Promise.all([
			this.paths.musterRoot,
			this.paths.anschreibenTemplates,
			this.paths.deckblattTemplates,
			this.paths.lebenslaufTemplates,
			this.paths.anschreibenDocuments,
			this.paths.previewCache,
			this.paths.systemTemplateCache
		].map((e) => r(e, { recursive: !0 }))), await this.ensureWordMusterTemplate(), await this.ensureZeitgenoessischLebenslaufTemplate(), await this.ensureKreativLebenslaufTemplate(), await this.ensureKompaktLebenslaufTemplate(), await this.ensureElegantLebenslaufTemplate(), await this.ensureGepflegtLebenslaufTemplate(), await this.ensureModernLebenslaufTemplate(), this.refresh();
	}
	async ensureWordMusterTemplate() {
		let r = e.join(this.paths.anschreibenTemplates, mc.fileName);
		try {
			await t(r);
		} catch {
			let i = e.join(this.paths.anschreibenDocuments, mc.fileName);
			try {
				await t(i);
			} catch {
				return;
			}
			await uu(() => n(i, r));
		}
		await this.writeMetadata(r, {
			id: mc.id,
			name: mc.name,
			documentType: mc.documentType,
			format: mc.format,
			source: mc.source,
			sortOrder: mc.sortOrder,
			description: mc.description,
			tags: [...mc.tags],
			isSystemTemplate: mc.isSystemTemplate,
			supportsPreview: mc.supportsPreview,
			supportsPlaceholders: mc.supportsPlaceholders,
			editableInWord: mc.editableInWord,
			isProtected: mc.isProtected
		});
	}
	async copyBundledTemplateIfMissing(r, i) {
		try {
			return await t(i), !0;
		} catch (e) {
			if (gu(e) !== "ENOENT") throw e;
		}
		if (!this.paths.bundledTemplatesRoot) return !1;
		let a = e.join(this.paths.bundledTemplatesRoot, r);
		try {
			await t(a);
		} catch (e) {
			if (gu(e) === "ENOENT") return !1;
			throw e;
		}
		return await uu(async () => {
			try {
				await n(a, i, x.COPYFILE_EXCL);
			} catch (e) {
				if (gu(e) !== "EEXIST") throw e;
			}
		}), !0;
	}
	async ensureElegantLebenslaufTemplate() {
		let t = e.join(this.paths.lebenslaufTemplates, hc.fileName);
		await this.copyBundledTemplateIfMissing(hc.fileName, t) && (await this.copyBundledTemplateIfMissing(hc.atsFileName, e.join(this.paths.systemTemplateCache, hc.atsFileName)), await this.writeMetadata(t, {
			id: hc.id,
			name: hc.name,
			documentType: hc.documentType,
			format: hc.format,
			source: hc.source,
			sortOrder: hc.sortOrder,
			description: hc.description,
			tags: [...hc.tags],
			isSystemTemplate: hc.isSystemTemplate,
			supportsPreview: hc.supportsPreview,
			supportsPlaceholders: hc.supportsPlaceholders,
			editableInWord: hc.editableInWord,
			isProtected: hc.isProtected,
			category: hc.category,
			layout: hc.layout,
			atsFriendly: hc.atsFriendly,
			supportsPhoto: hc.supportsPhoto,
			supportsAtsMode: hc.supportsAtsMode
		}));
	}
	async ensureZeitgenoessischLebenslaufTemplate() {
		let t = gc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
		await this.copyBundledTemplateIfMissing(t.fileName, n) && (await this.copyBundledTemplateIfMissing(t.atsFileName, e.join(this.paths.systemTemplateCache, t.atsFileName)), await this.writeMetadata(n, {
			id: t.id,
			name: t.name,
			documentType: t.documentType,
			format: t.format,
			source: t.source,
			sortOrder: t.sortOrder,
			description: t.description,
			tags: [...t.tags],
			isSystemTemplate: t.isSystemTemplate,
			supportsPreview: t.supportsPreview,
			supportsPlaceholders: t.supportsPlaceholders,
			editableInWord: t.editableInWord,
			isProtected: t.isProtected,
			category: t.category,
			layout: t.layout,
			atsFriendly: t.atsFriendly,
			supportsPhoto: t.supportsPhoto,
			supportsAtsMode: t.supportsAtsMode
		}));
	}
	async ensureKreativLebenslaufTemplate() {
		let t = yc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
		await this.copyBundledTemplateIfMissing(t.fileName, n) && (await this.copyBundledTemplateIfMissing(t.atsFileName, e.join(this.paths.systemTemplateCache, t.atsFileName)), await this.writeMetadata(n, {
			id: t.id,
			name: t.name,
			documentType: t.documentType,
			format: t.format,
			source: t.source,
			sortOrder: t.sortOrder,
			description: t.description,
			tags: [...t.tags],
			isSystemTemplate: t.isSystemTemplate,
			supportsPreview: t.supportsPreview,
			supportsPlaceholders: t.supportsPlaceholders,
			editableInWord: t.editableInWord,
			isProtected: t.isProtected,
			category: t.category,
			layout: t.layout,
			atsFriendly: t.atsFriendly,
			supportsPhoto: t.supportsPhoto,
			supportsBackground: t.supportsBackground,
			supportsAtsMode: t.supportsAtsMode,
			emphasis: t.emphasis
		}));
	}
	async ensureKompaktLebenslaufTemplate() {
		let t = bc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
		await this.copyBundledTemplateIfMissing(t.fileName, n) && (await this.copyBundledTemplateIfMissing(t.atsFileName, e.join(this.paths.systemTemplateCache, t.atsFileName)), await this.writeMetadata(n, {
			id: t.id,
			name: t.name,
			documentType: t.documentType,
			format: t.format,
			source: t.source,
			sortOrder: t.sortOrder,
			description: t.description,
			tags: [...t.tags],
			isSystemTemplate: t.isSystemTemplate,
			supportsPreview: t.supportsPreview,
			supportsPlaceholders: t.supportsPlaceholders,
			editableInWord: t.editableInWord,
			isProtected: t.isProtected,
			category: t.category,
			layout: t.layout,
			atsFriendly: t.atsFriendly,
			supportsPhoto: t.supportsPhoto,
			supportsBackground: t.supportsBackground,
			supportsAtsMode: t.supportsAtsMode,
			emphasis: t.emphasis
		}));
	}
	async ensureGepflegtLebenslaufTemplate() {
		let t = _c, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
		await this.copyBundledTemplateIfMissing(t.fileName, n) && (await this.copyBundledTemplateIfMissing(t.atsFileName, e.join(this.paths.systemTemplateCache, t.atsFileName)), await this.writeMetadata(n, {
			id: t.id,
			name: t.name,
			documentType: t.documentType,
			format: t.format,
			source: t.source,
			sortOrder: t.sortOrder,
			description: t.description,
			tags: [...t.tags],
			isSystemTemplate: t.isSystemTemplate,
			supportsPreview: t.supportsPreview,
			supportsPlaceholders: t.supportsPlaceholders,
			editableInWord: t.editableInWord,
			isProtected: t.isProtected,
			category: t.category,
			layout: t.layout,
			atsFriendly: t.atsFriendly,
			supportsPhoto: t.supportsPhoto,
			supportsAtsMode: t.supportsAtsMode
		}));
	}
	async ensureModernLebenslaufTemplate() {
		let t = vc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
		await this.copyBundledTemplateIfMissing(t.fileName, n) && (await this.copyBundledTemplateIfMissing(t.atsFileName, e.join(this.paths.systemTemplateCache, t.atsFileName)), await this.writeMetadata(n, {
			id: t.id,
			name: t.name,
			documentType: t.documentType,
			format: t.format,
			source: t.source,
			sortOrder: t.sortOrder,
			description: t.description,
			tags: [...t.tags],
			isSystemTemplate: t.isSystemTemplate,
			supportsPreview: t.supportsPreview,
			supportsPlaceholders: t.supportsPlaceholders,
			editableInWord: t.editableInWord,
			isProtected: t.isProtected,
			category: t.category,
			layout: t.layout,
			atsFriendly: t.atsFriendly,
			supportsPhoto: t.supportsPhoto,
			supportsAtsMode: t.supportsAtsMode
		}));
	}
	async refresh() {
		let e = await this.scanner.scanAllTemplates();
		return this.templates = await Promise.all(e.templates.map(async (e) => ({
			...e,
			...await this.previewService.generate(e)
		}))), {
			templates: structuredClone(this.templates),
			scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
			warnings: e.warnings
		};
	}
	list() {
		return structuredClone(this.templates);
	}
	async getById(e) {
		let t = this.templates.find((t) => t.id === e);
		return t ||= (await this.refresh(), this.templates.find((t) => t.id === e)), t ? structuredClone(t) : null;
	}
	async listByType(e) {
		return this.templates.length || await this.refresh(), structuredClone(this.templates.filter((t) => t.documentType === e));
	}
	async listExistingDocuments() {
		return this.templates.length || await this.refresh(), structuredClone(this.templates.filter((e) => e.source === "existing-document"));
	}
	async readMetadata(e) {
		try {
			return JSON.parse(await a(du(e), "utf8"));
		} catch {
			return {};
		}
	}
	async writeMetadata(e, t) {
		let n = {
			...await this.readMetadata(e),
			...t
		};
		await uu(() => u(du(e), JSON.stringify(n, null, 2), "utf8"));
	}
}, vu = class {
	constructor(e) {
		this.paths = e, this.placeholderService = new tu(), this.repository = new _u(e);
	}
	initialize() {
		return this.repository.initialize();
	}
	scanAllTemplates() {
		return this.repository.refresh();
	}
	scanTemplatesByType(e) {
		return this.repository.listByType(e);
	}
	scanExistingAnschreiben() {
		return this.repository.listExistingDocuments();
	}
	getTemplateById(e) {
		return this.repository.getById(e);
	}
	rootForType(e) {
		return e === "anschreiben" ? this.paths.anschreibenTemplates : e === "deckblatt" ? this.paths.deckblattTemplates : this.paths.lebenslaufTemplates;
	}
	async addExternalTemplate(t, i, a) {
		let o = ou(t), s = await l(t);
		if (!s.isFile()) throw new Dc("Die ausgewählte Vorlage ist keine Datei.", "INVALID_FORMAT");
		if (s.size > 26214400) throw new Dc("Die Vorlage darf höchstens 25 MB groß sein.", "FILE_TOO_LARGE");
		let c = this.rootForType(i);
		await r(c, { recursive: !0 });
		let u = a || e.basename(t, o), d = await jc(c, u, o);
		await uu(() => n(t, d)), await this.repository.writeMetadata(d, {
			name: u.replaceAll("_", " "),
			documentType: i,
			tags: [],
			isFavorite: !1,
			isSystemTemplate: !1,
			sortOrder: pc,
			supportsPreview: !0,
			supportsPlaceholders: o !== ".doc",
			editableInWord: !0,
			isProtected: !1
		}), await this.repository.refresh();
		let f = this.repository.list().find((e) => e.filePath === d);
		if (!f) throw new Dc("Die Vorlage konnte nicht hinzugefügt werden.", "NOT_FOUND");
		return f;
	}
	async copyExistingDocumentToTemplates(e, t) {
		cu(this.paths, e);
		let n = this.repository.list().find((t) => t.filePath === e && t.source === "existing-document");
		if (!n) throw new Dc("Das Anschreiben wurde nicht in den eigenen Dokumenten gefunden.", "NOT_FOUND");
		return this.addExternalTemplate(n.filePath, "anschreiben", t || n.name);
	}
	async copyExistingTemplateById(e, t) {
		let n = await this.requireTemplate(e);
		if (n.source !== "existing-document") throw new Dc("Nur eigene Anschreiben können zu Muster hinzugefügt werden.", "INVALID_PATH");
		return this.copyExistingDocumentToTemplates(n.filePath, t);
	}
	async duplicateTemplate(t) {
		let r = await this.requireTemplate(t), i = await jc(r.source === "existing-document" ? this.paths.anschreibenDocuments : e.dirname(r.filePath), `${e.basename(r.fileName, r.extension)}_Kopie`, r.extension);
		return await uu(() => n(r.filePath, i)), r.source !== "existing-document" && await this.repository.writeMetadata(i, {
			...await this.repository.readMetadata(r.filePath),
			id: void 0,
			name: `${r.name} Kopie`,
			source: "muster-folder",
			sortOrder: pc,
			isSystemTemplate: !1,
			isProtected: !1
		}), await this.repository.refresh(), this.repository.list().find((e) => e.filePath === i) ?? null;
	}
	async createDocumentFromTemplate(t, n, i, a, o = {}) {
		let s = await this.requireTemplate(t);
		if (!su(e.join(this.paths.dataRoot, "Bewerbungen"), n)) throw new Dc("Ungültiger Zielordner.", "INVALID_PATH");
		let c = s, l, u = s.id === hc.id ? hc : s.id === gc.id ? gc : s.id === yc.id ? yc : s.id === bc.id ? bc : s.id === _c.id ? _c : void 0;
		if (u && o.atsMode) {
			let t = e.join(this.paths.systemTemplateCache, u.atsFileName);
			try {
				await lu(this.paths, t), c = {
					...s,
					filePath: t
				};
			} catch {
				l = `Die ATS-Variante war nicht verfügbar. Die Standardvorlage „${u.name}“ wurde verwendet.`;
			}
		}
		await lu(this.paths, c.filePath), await r(n, { recursive: !0 });
		let d = s.extension === ".doc" ? ".doc" : ".docx", f = await jc(n, `${kc(u ? `Lebenslauf_${a.VORNAME ?? ""}_${a.NACHNAME ?? ""}` : i)}_${Ac()}`, d), p = await uu(() => this.placeholderService.createDocument(c, f, a)), m = Object.entries(a).filter(([e]) => /^(ZUSAMMENFASSUNG|BESCHREIBUNG_\d+|ERFOLG_\d+_\d+|ERFOLG_HIGHLIGHT_\d+_(?:TITEL|BESCHREIBUNG)|STAERKE_\d+_BESCHREIBUNG|KENNTNIS_EINTRAEGE_\d+)$/.test(e)).reduce((e, [, t]) => e + t.trim().length, 0), h = Array.from({ length: 8 }, (e, t) => a[`POSITION_${t + 1}`]?.trim() ?? "").filter(Boolean).length, g = s.id === yc.id && !o.atsMode && (m > 3200 || h > 4) ? "Der Inhalt passt möglicherweise nicht vollständig auf eine Seite. Bitte kürzen Sie einzelne Beschreibungen oder erlauben Sie eine zweite Seite." : void 0, _ = s.id === bc.id && !o.atsMode && (m > 3700 || h > 5) ? "Der Inhalt passt nicht vollständig auf eine Seite. Bitte kürzen Sie einzelne Beschreibungen oder erlauben Sie eine zweite Seite." : void 0, v = s.id === bc.id && (a.ZUSAMMENFASSUNG?.trim().length ?? 0) > 600 ? "Die Zusammenfassung überschreitet die empfohlenen 600 Zeichen." : void 0, y = (e) => e.toLocaleLowerCase("de-DE").replace(/[^\p{L}\p{N}]+/gu, " ").trim(), b = new Set(Object.entries(a).filter(([e, t]) => /^ERFOLG_\d+_\d+$/.test(e) && !!t.trim()).map(([, e]) => y(e))), x = s.id === bc.id && Object.entries(a).filter(([e, t]) => /^ERFOLG_HIGHLIGHT_\d+_BESCHREIBUNG$/.test(e) && !!t.trim()).some(([, e]) => b.has(y(e))) ? "Ein hervorgehobener Erfolg wird bereits in der Berufserfahrung verwendet." : void 0, S = [
			l,
			g,
			_,
			v,
			x
		].filter((e) => !!e).join(" ");
		return S ? {
			...p,
			warning: S
		} : p;
	}
	async toggleTemplateFavorite(e) {
		let t = await this.requireTemplate(e);
		return await this.repository.writeMetadata(t.filePath, { isFavorite: !t.isFavorite }), this.repository.refresh();
	}
	async deleteCustomTemplate(e) {
		let t = await this.requireTemplate(e);
		if (t.isProtected) throw new Dc("Diese Word-Vorlage ist geschützt und kann nicht gelöscht werden.", "PROTECTED_TEMPLATE");
		if (t.isSystemTemplate) throw new Dc("Systemvorlagen können nicht gelöscht werden.", "SYSTEM_TEMPLATE");
		if (t.source !== "muster-folder") throw new Dc("Eigene Dokumente werden an dieser Stelle nicht gelöscht.", "INVALID_PATH");
		return await c(t.filePath), await c(du(t.filePath), { force: !0 }), this.repository.refresh();
	}
	async generateTemplatePreview(e) {
		return (await this.requireTemplate(e)).previewDataUrl ?? null;
	}
	async requireTemplate(e) {
		let t = await this.repository.getById(e);
		if (!t) throw new Dc("Vorlage wurde nicht gefunden.", "NOT_FOUND");
		return t;
	}
}, yu = null, $, bu, xu = /* @__PURE__ */ new Set(), Su = "de.bewerbungsmanager.desktop", Cu = d(import.meta.url), wu = e.dirname(Cu), Tu = !!process.env.VITE_DEV_SERVER_URL;
process.platform === "win32" && h.setAppUserModelId(Su);
var Eu = async () => {
	yu = new p({
		width: 1480,
		height: 940,
		minWidth: 1060,
		minHeight: 720,
		show: !1,
		backgroundColor: "#f3f1ec",
		titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
		webPreferences: {
			preload: e.join(wu, "preload.mjs"),
			contextIsolation: !0,
			nodeIntegration: !1,
			sandbox: !0,
			webSecurity: !0
		}
	}), yu.webContents.setWindowOpenHandler(({ url: e }) => (/^https?:\/\//i.test(e) && y.openExternal(e), { action: "deny" })), yu.webContents.on("will-navigate", (t, n) => {
		(Tu ? n.startsWith(process.env.VITE_DEV_SERVER_URL) : n.startsWith(f(e.join(wu, "../dist/index.html")).toString())) || t.preventDefault();
	}), yu.once("ready-to-show", () => yu?.show()), Tu ? await yu.loadURL(process.env.VITE_DEV_SERVER_URL) : await yu.loadFile(e.join(wu, "../dist/index.html"));
}, Du = () => {
	_.handle("workspace:get", () => $.getWorkspace()), _.handle("applications:create", (e, t) => $.createApplication(as.parse(t))), _.handle("applications:save", (e, t) => $.saveApplication(is.parse(t))), _.handle("applications:remove", (e, t) => $.removeApplication(String(t))), _.handle("applications:duplicate", (e, t) => $.duplicateApplication(String(t))), _.handle("applications:change-status", (e, t, n, r) => {
		let i = Wo.find((e) => e === n), a = Go.find((e) => e === r);
		if (!i) throw Error("Ungültiger Bewerbungsstatus.");
		return $.changeStatus(String(t), i, a);
	}), _.handle("applications:open-folder", async (e, t) => {
		let n = await y.openPath($.getApplicationPath(String(t)));
		if (n) throw Error(n);
	}), _.handle("profiles:save", (e, t) => $.saveProfile(os.parse(t))), _.handle("templates:scan", () => bu.scanAllTemplates()), _.handle("templates:add", async (e, t) => {
		let n = t ?? {};
		if (n.documentType !== "anschreiben" && n.documentType !== "deckblatt" && n.documentType !== "lebenslauf") throw Error("Ungültiger Dokumenttyp.");
		let r = await g.showOpenDialog(yu, {
			title: "Word-Vorlage hinzufügen",
			properties: ["openFile"],
			filters: [{
				name: "Word-Dokumente",
				extensions: [
					"docx",
					"dotx",
					"doc"
				]
			}]
		}), i = r.filePaths[0];
		return r.canceled || !i ? null : bu.addExternalTemplate(i, n.documentType, typeof n.requestedName == "string" ? n.requestedName : void 0);
	}), _.handle("templates:use", async (e, t) => {
		let n = t ?? {};
		if (!n.templateId || !n.applicationId) throw Error("Vorlage und Bewerbung sind erforderlich.");
		let r = await bu.getTemplateById(n.templateId);
		if (!r) throw Error("Vorlage wurde nicht gefunden.");
		let i = $.getTemplateDocumentContext(n.applicationId);
		if (r.supportsPhoto && i.data.PROFILFOTO) {
			let e = v.createFromDataURL(i.data.PROFILFOTO);
			i.data.PROFILFOTO = e.isEmpty() ? "" : `data:image/png;base64,${e.toPNG().toString("base64")}`;
		}
		let a = await bu.createDocumentFromTemplate(r.id, i.targetDirectories[r.documentType], i.requestedBaseName, i.data, { atsMode: n.atsMode === !0 }), o = await y.openPath(a.filePath);
		if (o) throw Error(o);
		return a;
	}), _.handle("templates:duplicate", (e, t) => bu.duplicateTemplate(String(t))), _.handle("templates:copy-to-muster", (e, t) => bu.copyExistingTemplateById(String(t))), _.handle("templates:toggle-favorite", (e, t) => bu.toggleTemplateFavorite(String(t))), _.handle("templates:remove", (e, t) => bu.deleteCustomTemplate(String(t))), _.handle("templates:open", async (e, t) => {
		let n = await bu.getTemplateById(String(t));
		if (!n) throw Error("Vorlage wurde nicht gefunden.");
		let r = await y.openPath(n.filePath);
		if (r) throw Error(r);
	}), _.handle("templates:open-folder", async (e, t) => {
		let n = await bu.getTemplateById(String(t));
		if (!n) throw Error("Vorlage wurde nicht gefunden.");
		y.showItemInFolder(n.filePath);
	}), _.handle("media:pick-profile-image", async (e, t) => {
		let n = t === "photo" || t === "signature" ? t : null;
		if (!n) throw Error("Ungültiger Bildtyp.");
		let r = await g.showOpenDialog(yu, {
			title: n === "photo" ? "Bewerbungsfoto auswählen" : "Unterschrift auswählen",
			properties: ["openFile"],
			filters: [{
				name: "Bilddateien",
				extensions: [
					"png",
					"jpg",
					"jpeg",
					"webp"
				]
			}]
		}), i = r.filePaths[0];
		if (r.canceled || !i) return null;
		let o = await a(i);
		if (o.byteLength > 8 * 1024 * 1024) throw Error("Das Bild darf höchstens 8 MB groß sein.");
		let s = i.split(".").pop()?.toLowerCase();
		return {
			dataUrl: `data:${s === "png" ? "image/png" : s === "webp" ? "image/webp" : "image/jpeg"};base64,${o.toString("base64")}`,
			fileName: i.split(/[\\/]/).pop() ?? "Bild"
		};
	}), _.handle("settings:save", (e, t) => $.saveSettings(ls.parse(t))), _.handle("events:save", (e, t) => $.saveEvent(ss.parse(t))), _.handle("attachments:add", async (e, t, n) => {
		let r = Jo.find((e) => e === n);
		if (!r) throw Error("Ungültige Dokumentkategorie.");
		let i = await g.showOpenDialog(yu, {
			title: `${r} hinzufügen`,
			properties: ["openFile"],
			filters: [{
				name: "PDF-Dokumente",
				extensions: ["pdf"]
			}]
		});
		return i.canceled || !i.filePaths[0] ? $.getWorkspace() : $.addAttachment(String(t), r, i.filePaths[0]);
	}), _.handle("attachments:save", (e, t) => $.saveAttachment(cs.parse(t))), _.handle("attachments:move", (e, t, n) => {
		let r = Number(n);
		if (r !== -1 && r !== 1) throw Error("Ungültige Sortierrichtung.");
		return $.moveAttachment(String(t), r);
	}), _.handle("attachments:remove", (e, t) => $.removeAttachment(String(t))), _.handle("attachments:open", async (e, t) => {
		let n = await y.openPath($.getAttachmentPathById(String(t)));
		if (n) throw Error(n);
	}), _.handle("export:pdf", async (e, t, n, r) => {
		let i = [
			"deckblatt",
			"anschreiben",
			"lebenslauf",
			"mappe"
		].find((e) => e === n);
		if (!i) throw Error("Ungültiges Exportziel.");
		let o = String(t), s = r === void 0 ? void 0 : is.parse(r);
		if (s && s.id !== o) throw Error("Die Exportdaten gehören nicht zur ausgewählten Bewerbung.");
		let c = await g.showSaveDialog(yu, {
			title: "PDF exportieren",
			defaultPath: $.getExportDefaultName(o, i),
			filters: [{
				name: "PDF",
				extensions: ["pdf"]
			}]
		});
		if (c.canceled || !c.filePath) return null;
		let l = new p({
			show: !1,
			webPreferences: {
				sandbox: !0,
				contextIsolation: !0,
				nodeIntegration: !1
			}
		});
		try {
			let e = $.getExportHtml(o, i, s);
			await l.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(e)}`);
			let t = await l.webContents.printToPDF({
				pageSize: "A4",
				preferCSSPageSize: !0,
				printBackground: !0,
				margins: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
			}), n = i === "mappe" ? await uc(t, await Promise.all($.getPackageAttachmentPaths(o).map(async (e) => ({
				fileName: e.fileName,
				bytes: await a(e.path)
			})))) : t;
			return await u(c.filePath, n), c.filePath;
		} finally {
			l.destroy();
		}
	}), _.handle("export:backup", async () => {
		let e = await g.showSaveDialog(yu, {
			title: "JSON-Sicherung exportieren",
			defaultPath: `BewerbungsManager_Backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`,
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePath ? null : (await $.writeBackup(e.filePath), e.filePath);
	}), _.handle("export:import-backup", async () => {
		let e = await g.showOpenDialog(yu, {
			title: "JSON-Sicherung wiederherstellen",
			properties: ["openFile"],
			filters: [{
				name: "BewerbungsManager JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePaths[0] ? null : $.importBackup(e.filePaths[0]);
	}), _.handle("export:settings", async () => {
		let e = await g.showSaveDialog(yu, {
			title: "Einstellungen exportieren",
			defaultPath: "BewerbungsManager_Einstellungen.json",
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePath ? null : (await $.writeSettings(e.filePath), e.filePath);
	}), _.handle("export:import-settings", async () => {
		let e = await g.showOpenDialog(yu, {
			title: "Einstellungen importieren",
			properties: ["openFile"],
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePaths[0] ? null : $.importSettings(e.filePaths[0]);
	}), _.handle("system:open-external", async (e, t) => {
		let n = new URL(String(t));
		if (!["http:", "https:"].includes(n.protocol)) throw Error("Nur HTTP- und HTTPS-Links sind erlaubt.");
		await y.openExternal(n.toString());
	}), _.handle("system:data-path", () => $.dataPath);
}, Ou = () => {
	let e = $.getWorkspace();
	if (!e.settings.notificationsEnabled || !m.isSupported()) return;
	let t = Date.now();
	e.events.filter((e) => !e.cancelled && !e.completed).forEach((e) => {
		let n = new Date(e.startAt).getTime(), r = e.reminderMinutes.some((e) => {
			let r = n - e * 6e4;
			return r <= t && r > t - 65e3;
		}), i = `${e.id}:${Math.floor(t / 6e4)}`;
		r && !xu.has(i) && (xu.add(i), new m({
			title: "BewerbungsManager",
			body: e.title
		}).show());
	});
};
h.whenReady().then(async () => {
	$ = new cc(h.getPath("documents")), await $.initialize(), bu = new vu(fs(h.getPath("documents"), e.join(wu, Tu ? "../public/templates" : "../dist/templates"))), await bu.initialize(), Du(), await Eu(), Ou(), setInterval(Ou, 6e4).unref(), h.on("activate", () => {
		p.getAllWindows().length === 0 && Eu();
	});
}), h.on("window-all-closed", () => {
	process.platform !== "darwin" && h.quit();
});
//#endregion
