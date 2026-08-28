import e from "node:path";
import { constants as t, mkdirSync as n, watch as r } from "node:fs";
import { access as i, appendFile as a, copyFile as o, mkdir as s, open as c, readFile as l, readdir as u, rename as d, rm as f, rmdir as p, stat as m, writeFile as h } from "node:fs/promises";
import { fileURLToPath as g, pathToFileURL as _ } from "node:url";
import { BrowserWindow as v, Notification as y, app as b, dialog as x, ipcMain as S, nativeImage as C, shell as w } from "electron";
import { PDFDocument as T } from "pdf-lib";
import { createHash as E } from "node:crypto";
import { promisify as D } from "node:util";
import { execFile as O } from "node:child_process";
//#region \0rolldown/runtime.js
var k = Object.create, A = Object.defineProperty, j = Object.getOwnPropertyDescriptor, ee = Object.getOwnPropertyNames, M = Object.getPrototypeOf, te = Object.prototype.hasOwnProperty, N = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ne = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = ee(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !te.call(e, s) && s !== n && A(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = j(t, s)) || r.enumerable
	});
	return e;
}, P = (e, t, n) => (n = e == null ? {} : k(M(e)), ne(t || !e || !e.__esModule ? A(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), F;
function I(e, t, n) {
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
var L = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, R = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(F = globalThis).__zod_globalConfig ?? (F.__zod_globalConfig = {});
var z = globalThis.__zod_globalConfig;
function B(e) {
	return e && Object.assign(z, e), z;
}
//#endregion
//#region node_modules/zod/v4/core/util.js
function re(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function ie(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function ae(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function oe(e) {
	return e == null;
}
function se(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function V(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var ce = /* @__PURE__*/ Symbol("evaluating");
function H(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== ce) return r === void 0 && (r = ce, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function U(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function le(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ue(e) {
	return JSON.stringify(e);
}
function de(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var fe = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function pe(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var me = /* @__PURE__*/ ae(() => {
	if (z.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function he(e) {
	if (pe(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(pe(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function ge(e) {
	return he(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var _e = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function ve(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ye(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function W(e) {
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
function be(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var xe = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Se(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return ye(e, le(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return U(this, "shape", e), e;
		},
		checks: []
	}));
}
function Ce(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return ye(e, le(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return U(this, "shape", r), r;
		},
		checks: []
	}));
}
function we(e, t) {
	if (!he(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ye(e, le(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return U(this, "shape", n), n;
	} }));
}
function Te(e, t) {
	if (!he(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return ye(e, le(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return U(this, "shape", n), n;
	} }));
}
function Ee(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ye(e, le(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return U(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function De(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return ye(t, le(t._zod.def, {
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
			return U(this, "shape", i), i;
		},
		checks: []
	}));
}
function Oe(e, t, n) {
	return ye(t, le(t._zod.def, { get shape() {
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
		return U(this, "shape", i), i;
	} }));
}
function ke(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Ae(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function G(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function je(e) {
	return typeof e == "string" ? e : e?.message;
}
function Me(e, t, n) {
	let r = e.message ? e.message : je(e.inst?._zod.def?.error?.(e)) ?? je(t?.error?.(e)) ?? je(n.customError?.(e)) ?? je(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function Ne(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Pe(...e) {
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
var Fe = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, ie, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, Ie = I("$ZodError", Fe), Le = I("$ZodError", Fe, { Parent: Error });
function Re(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function ze(e, t = (e) => e.message) {
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
var Be = (e) => (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new L();
	if (o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => Me(e, a, B())));
		throw fe(t, i?.callee), t;
	}
	return o.value;
}, Ve = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => Me(e, a, B())));
		throw fe(t, i?.callee), t;
	}
	return o.value;
}, He = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new L();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? Ie)(a.issues.map((e) => Me(e, i, B())))
	} : {
		success: !0,
		data: a.value
	};
}, Ue = /* @__PURE__*/ He(Le), We = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => Me(e, i, B())))
	} : {
		success: !0,
		data: a.value
	};
}, Ge = /* @__PURE__*/ We(Le), Ke = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Be(e)(t, n, i);
}, qe = (e) => (t, n, r) => Be(e)(t, n, r), Je = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ve(e)(t, n, i);
}, Ye = (e) => async (t, n, r) => Ve(e)(t, n, r), Xe = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return He(e)(t, n, i);
}, Ze = (e) => (t, n, r) => He(e)(t, n, r), Qe = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return We(e)(t, n, i);
}, $e = (e) => async (t, n, r) => We(e)(t, n, r), et = /^[cC][0-9a-z]{6,}$/, tt = /^[0-9a-z]+$/, nt = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, rt = /^[0-9a-vA-V]{20}$/, it = /^[A-Za-z0-9]{27}$/, at = /^[a-zA-Z0-9_-]{21}$/, ot = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, st = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, ct = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, lt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, ut = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function dt() {
	return new RegExp(ut, "u");
}
var ft = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, pt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, mt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ht = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, gt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, _t = /^[A-Za-z0-9_-]*$/, vt = /^https?$/, yt = /^\+[1-9]\d{6,14}$/, bt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", xt = /*@__PURE__*/ RegExp(`^${bt}$`);
function St(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Ct(e) {
	return RegExp(`^${St(e)}$`);
}
function K(e) {
	let t = St({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${bt}T(?:${r})$`);
}
var wt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, Tt = /^-?\d+$/, Et = /^-?\d+(?:\.\d+)?$/, Dt = /^(?:true|false)$/i, Ot = /^[^A-Z]*$/, kt = /^[^a-z]*$/, At = /*@__PURE__*/ I("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), jt = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, Mt = /*@__PURE__*/ I("$ZodCheckLessThan", (e, t) => {
	At.init(e, t);
	let n = jt[typeof t.value];
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
}), Nt = /*@__PURE__*/ I("$ZodCheckGreaterThan", (e, t) => {
	At.init(e, t);
	let n = jt[typeof t.value];
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
}), Pt = /*@__PURE__*/ I("$ZodCheckMultipleOf", (e, t) => {
	At.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : V(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ft = /*@__PURE__*/ I("$ZodCheckNumberFormat", (e, t) => {
	At.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = xe[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = Tt);
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
}), It = /*@__PURE__*/ I("$ZodCheckMaxLength", (e, t) => {
	var n;
	At.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !oe(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Ne(r);
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
}), Lt = /*@__PURE__*/ I("$ZodCheckMinLength", (e, t) => {
	var n;
	At.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !oe(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Ne(r);
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
}), Rt = /*@__PURE__*/ I("$ZodCheckLengthEquals", (e, t) => {
	var n;
	At.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !oe(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Ne(r), o = i > t.length;
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
}), zt = /*@__PURE__*/ I("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	At.init(e, t), e._zod.onattach.push((e) => {
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
}), Bt = /*@__PURE__*/ I("$ZodCheckRegex", (e, t) => {
	zt.init(e, t), e._zod.check = (n) => {
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
}), Vt = /*@__PURE__*/ I("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= Ot, zt.init(e, t);
}), Ht = /*@__PURE__*/ I("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= kt, zt.init(e, t);
}), Ut = /*@__PURE__*/ I("$ZodCheckIncludes", (e, t) => {
	At.init(e, t);
	let n = ve(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
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
}), Wt = /*@__PURE__*/ I("$ZodCheckStartsWith", (e, t) => {
	At.init(e, t);
	let n = RegExp(`^${ve(t.prefix)}.*`);
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
}), Gt = /*@__PURE__*/ I("$ZodCheckEndsWith", (e, t) => {
	At.init(e, t);
	let n = RegExp(`.*${ve(t.suffix)}$`);
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
}), Kt = /*@__PURE__*/ I("$ZodCheckOverwrite", (e, t) => {
	At.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), qt = class {
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
}, Jt = {
	major: 4,
	minor: 4,
	patch: 3
}, Yt = /*@__PURE__*/ I("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Jt;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = ke(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (Ae(e) || !a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new L();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= ke(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= ke(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (ke(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new L();
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
				if (a.async === !1) throw new L();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	H(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Ue(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Ge(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Xt = /*@__PURE__*/ I("$ZodString", (e, t) => {
	Yt.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? wt(e._zod.bag), e._zod.parse = (n, r) => {
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
}), Zt = /*@__PURE__*/ I("$ZodStringFormat", (e, t) => {
	zt.init(e, t), Xt.init(e, t);
}), Qt = /*@__PURE__*/ I("$ZodGUID", (e, t) => {
	t.pattern ??= st, Zt.init(e, t);
}), $t = /*@__PURE__*/ I("$ZodUUID", (e, t) => {
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
		t.pattern ??= ct(e);
	} else t.pattern ??= ct();
	Zt.init(e, t);
}), en = /*@__PURE__*/ I("$ZodEmail", (e, t) => {
	t.pattern ??= lt, Zt.init(e, t);
}), tn = /*@__PURE__*/ I("$ZodURL", (e, t) => {
	Zt.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === vt.source && !/^https?:\/\//i.test(r)) {
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
}), nn = /*@__PURE__*/ I("$ZodEmoji", (e, t) => {
	t.pattern ??= dt(), Zt.init(e, t);
}), rn = /*@__PURE__*/ I("$ZodNanoID", (e, t) => {
	t.pattern ??= at, Zt.init(e, t);
}), an = /*@__PURE__*/ I("$ZodCUID", (e, t) => {
	t.pattern ??= et, Zt.init(e, t);
}), on = /*@__PURE__*/ I("$ZodCUID2", (e, t) => {
	t.pattern ??= tt, Zt.init(e, t);
}), sn = /*@__PURE__*/ I("$ZodULID", (e, t) => {
	t.pattern ??= nt, Zt.init(e, t);
}), cn = /*@__PURE__*/ I("$ZodXID", (e, t) => {
	t.pattern ??= rt, Zt.init(e, t);
}), ln = /*@__PURE__*/ I("$ZodKSUID", (e, t) => {
	t.pattern ??= it, Zt.init(e, t);
}), un = /*@__PURE__*/ I("$ZodISODateTime", (e, t) => {
	t.pattern ??= K(t), Zt.init(e, t);
}), dn = /*@__PURE__*/ I("$ZodISODate", (e, t) => {
	t.pattern ??= xt, Zt.init(e, t);
}), fn = /*@__PURE__*/ I("$ZodISOTime", (e, t) => {
	t.pattern ??= Ct(t), Zt.init(e, t);
}), pn = /*@__PURE__*/ I("$ZodISODuration", (e, t) => {
	t.pattern ??= ot, Zt.init(e, t);
}), mn = /*@__PURE__*/ I("$ZodIPv4", (e, t) => {
	t.pattern ??= ft, Zt.init(e, t), e._zod.bag.format = "ipv4";
}), hn = /*@__PURE__*/ I("$ZodIPv6", (e, t) => {
	t.pattern ??= pt, Zt.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
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
}), gn = /*@__PURE__*/ I("$ZodCIDRv4", (e, t) => {
	t.pattern ??= mt, Zt.init(e, t);
}), _n = /*@__PURE__*/ I("$ZodCIDRv6", (e, t) => {
	t.pattern ??= ht, Zt.init(e, t), e._zod.check = (n) => {
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
function vn(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var yn = /*@__PURE__*/ I("$ZodBase64", (e, t) => {
	t.pattern ??= gt, Zt.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		vn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function bn(e) {
	if (!_t.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return vn(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var xn = /*@__PURE__*/ I("$ZodBase64URL", (e, t) => {
	t.pattern ??= _t, Zt.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		bn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Sn = /*@__PURE__*/ I("$ZodE164", (e, t) => {
	t.pattern ??= yt, Zt.init(e, t);
});
function Cn(e, t = null) {
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
var wn = /*@__PURE__*/ I("$ZodJWT", (e, t) => {
	Zt.init(e, t), e._zod.check = (n) => {
		Cn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Tn = /*@__PURE__*/ I("$ZodNumber", (e, t) => {
	Yt.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Et, e._zod.parse = (n, r) => {
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
}), En = /*@__PURE__*/ I("$ZodNumberFormat", (e, t) => {
	Ft.init(e, t), Tn.init(e, t);
}), Dn = /*@__PURE__*/ I("$ZodBoolean", (e, t) => {
	Yt.init(e, t), e._zod.pattern = Dt, e._zod.parse = (n, r) => {
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
}), On = /*@__PURE__*/ I("$ZodUnknown", (e, t) => {
	Yt.init(e, t), e._zod.parse = (e) => e;
}), kn = /*@__PURE__*/ I("$ZodNever", (e, t) => {
	Yt.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function An(e, t, n) {
	e.issues.length && t.issues.push(...G(n, e.issues)), t.value[n] = e.value;
}
var jn = /*@__PURE__*/ I("$ZodArray", (e, t) => {
	Yt.init(e, t), e._zod.parse = (n, r) => {
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
			s instanceof Promise ? a.push(s.then((t) => An(t, n, e))) : An(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function Mn(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...G(n, e.issues));
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
function Nn(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = be(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function Pn(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => Mn(e, n, i, t, u, d))) : Mn(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Fn = /*@__PURE__*/ I("$ZodObject", (e, t) => {
	if (Yt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = ae(() => Nn(t));
	H(e._zod, "propValues", () => {
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
	let r = pe, i = t.catchall, a;
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
			a instanceof Promise ? c.push(a.then((n) => Mn(n, t, e, s, r, i))) : Mn(a, t, e, s, r, i);
		}
		return i ? Pn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), In = /*@__PURE__*/ I("$ZodObjectJIT", (e, t) => {
	Fn.init(e, t);
	let n = e._zod.parse, r = ae(() => Nn(t)), i = (e) => {
		let t = new qt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ue(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ue(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
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
	}, a, o = pe, s = !z.jitless, c = s && me.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let p = d.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? Pn([], p, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), d);
	};
});
function Ln(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !ke(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Me(e, r, B())))
	}), t);
}
var Rn = /*@__PURE__*/ I("$ZodUnion", (e, t) => {
	Yt.init(e, t), H(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), H(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), H(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), H(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => se(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => Ln(t, r, e, i)) : Ln(o, r, e, i);
	};
}), zn = /*@__PURE__*/ I("$ZodIntersection", (e, t) => {
	Yt.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Vn(e, t, n)) : Vn(e, i, a);
	};
});
function Bn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (he(e) && he(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Bn(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Bn(i, a);
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
function Vn(e, t, n) {
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
	}), ke(e)) return e;
	let o = Bn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Hn = /*@__PURE__*/ I("$ZodRecord", (e, t) => {
	Yt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!he(i)) return n.issues.push({
			expected: "record",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		let a = [], o = t.keyType._zod.values;
		if (o) {
			n.value = {};
			let s = /* @__PURE__ */ new Set();
			for (let c of o) if (typeof c == "string" || typeof c == "number" || typeof c == "symbol") {
				s.add(typeof c == "number" ? c.toString() : c);
				let o = t.keyType._zod.run({
					value: c,
					issues: []
				}, r);
				if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (o.issues.length) {
					n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: o.issues.map((e) => Me(e, r, B())),
						input: c,
						path: [c],
						inst: e
					});
					continue;
				}
				let l = o.value, u = t.valueType._zod.run({
					value: i[c],
					issues: []
				}, r);
				u instanceof Promise ? a.push(u.then((e) => {
					e.issues.length && n.issues.push(...G(c, e.issues)), n.value[l] = e.value;
				})) : (u.issues.length && n.issues.push(...G(c, u.issues)), n.value[l] = u.value);
			}
			let c;
			for (let e in i) s.has(e) || (c ??= [], c.push(e));
			c && c.length > 0 && n.issues.push({
				code: "unrecognized_keys",
				input: i,
				inst: e,
				keys: c
			});
		} else {
			n.value = {};
			for (let o of Reflect.ownKeys(i)) {
				if (o === "__proto__" || !Object.prototype.propertyIsEnumerable.call(i, o)) continue;
				let s = t.keyType._zod.run({
					value: o,
					issues: []
				}, r);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof o == "string" && Et.test(o) && s.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(o),
						issues: []
					}, r);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (s = e);
				}
				if (s.issues.length) {
					t.mode === "loose" ? n.value[o] = i[o] : n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => Me(e, r, B())),
						input: o,
						path: [o],
						inst: e
					});
					continue;
				}
				let c = t.valueType._zod.run({
					value: i[o],
					issues: []
				}, r);
				c instanceof Promise ? a.push(c.then((e) => {
					e.issues.length && n.issues.push(...G(o, e.issues)), n.value[s.value] = e.value;
				})) : (c.issues.length && n.issues.push(...G(o, c.issues)), n.value[s.value] = c.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), Un = /*@__PURE__*/ I("$ZodEnum", (e, t) => {
	Yt.init(e, t);
	let n = re(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => _e.has(typeof e)).map((e) => typeof e == "string" ? ve(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Wn = /*@__PURE__*/ I("$ZodLiteral", (e, t) => {
	if (Yt.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? ve(e) : e ? ve(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Gn = /*@__PURE__*/ I("$ZodTransform", (e, t) => {
	Yt.init(e, t), e._zod.optin = "optional", e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new R(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n.fallback = !0, n));
		if (i instanceof Promise) throw new L();
		return n.value = i, n.fallback = !0, n;
	};
});
function Kn(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var qn = /*@__PURE__*/ I("$ZodOptional", (e, t) => {
	Yt.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", H(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), H(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${se(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => Kn(e, r)) : Kn(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Jn = /*@__PURE__*/ I("$ZodExactOptional", (e, t) => {
	qn.init(e, t), H(e._zod, "values", () => t.innerType._zod.values), H(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Yn = /*@__PURE__*/ I("$ZodNullable", (e, t) => {
	Yt.init(e, t), H(e._zod, "optin", () => t.innerType._zod.optin), H(e._zod, "optout", () => t.innerType._zod.optout), H(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${se(e.source)}|null)$`) : void 0;
	}), H(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Xn = /*@__PURE__*/ I("$ZodDefault", (e, t) => {
	Yt.init(e, t), e._zod.optin = "optional", H(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Zn(e, t)) : Zn(r, t);
	};
});
function Zn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Qn = /*@__PURE__*/ I("$ZodPrefault", (e, t) => {
	Yt.init(e, t), e._zod.optin = "optional", H(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), $n = /*@__PURE__*/ I("$ZodNonOptional", (e, t) => {
	Yt.init(e, t), H(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => er(t, e)) : er(i, e);
	};
});
function er(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var tr = /*@__PURE__*/ I("$ZodCatch", (e, t) => {
	Yt.init(e, t), e._zod.optin = "optional", H(e._zod, "optout", () => t.innerType._zod.optout), H(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Me(e, n, B())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Me(e, n, B())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), nr = /*@__PURE__*/ I("$ZodPipe", (e, t) => {
	Yt.init(e, t), H(e._zod, "values", () => t.in._zod.values), H(e._zod, "optin", () => t.in._zod.optin), H(e._zod, "optout", () => t.out._zod.optout), H(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => rr(e, t.in, n)) : rr(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => rr(e, t.out, n)) : rr(r, t.out, n);
	};
});
function rr(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var ir = /*@__PURE__*/ I("$ZodReadonly", (e, t) => {
	Yt.init(e, t), H(e._zod, "propValues", () => t.innerType._zod.propValues), H(e._zod, "values", () => t.innerType._zod.values), H(e._zod, "optin", () => t.innerType?._zod?.optin), H(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(ar) : ar(r);
	};
});
function ar(e) {
	return e.value = Object.freeze(e.value), e;
}
var or = /*@__PURE__*/ I("$ZodCustom", (e, t) => {
	At.init(e, t), Yt.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => sr(t, n, r, e));
		sr(i, n, r, e);
	};
});
function sr(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Pe(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var cr, lr = class {
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
function ur() {
	return new lr();
}
(cr = globalThis).__zod_globalRegistry ?? (cr.__zod_globalRegistry = ur());
var dr = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t) {
	return new e({
		type: "boolean",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hr(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Ur(e, t) {
	return new e({
		type: "never",
		...W(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wr(e, t) {
	return new Mt({
		check: "less_than",
		...W(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Gr(e, t) {
	return new Mt({
		check: "less_than",
		...W(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t) {
	return new Nt({
		check: "greater_than",
		...W(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function qr(e, t) {
	return new Nt({
		check: "greater_than",
		...W(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Jr(e, t) {
	return new Pt({
		check: "multiple_of",
		...W(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yr(e, t) {
	return new It({
		check: "max_length",
		...W(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Xr(e, t) {
	return new Lt({
		check: "min_length",
		...W(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Zr(e, t) {
	return new Rt({
		check: "length_equals",
		...W(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Qr(e, t) {
	return new Bt({
		check: "string_format",
		format: "regex",
		...W(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function $r(e) {
	return new Vt({
		check: "string_format",
		format: "lowercase",
		...W(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ei(e) {
	return new Ht({
		check: "string_format",
		format: "uppercase",
		...W(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ti(e, t) {
	return new Ut({
		check: "string_format",
		format: "includes",
		...W(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function ni(e, t) {
	return new Wt({
		check: "string_format",
		format: "starts_with",
		...W(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ri(e, t) {
	return new Gt({
		check: "string_format",
		format: "ends_with",
		...W(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ii(e) {
	return new Kt({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function ai(e) {
	return /* @__PURE__ */ ii((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function oi() {
	return /* @__PURE__ */ ii((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function si() {
	return /* @__PURE__ */ ii((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function ci() {
	return /* @__PURE__ */ ii((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function li() {
	return /* @__PURE__ */ ii((e) => de(e));
}
// @__NO_SIDE_EFFECTS__
function ui(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...W(n)
	});
}
// @__NO_SIDE_EFFECTS__
function di(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...W(n)
	});
}
// @__NO_SIDE_EFFECTS__
function fi(e, t) {
	let n = /* @__PURE__ */ pi((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Pe(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Pe(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function pi(e, t) {
	let n = new At({
		check: "custom",
		...W(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function mi(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? dr,
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
function hi(e, t, n = {
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
		a && (o.ref ||= a, hi(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && vi(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function gi(e, t) {
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
function _i(e, t) {
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
					input: bi(t, "input", e.processors),
					output: bi(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function vi(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return vi(r.element, n);
	if (r.type === "set") return vi(r.valueType, n);
	if (r.type === "lazy") return vi(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return vi(r.innerType, n);
	if (r.type === "intersection") return vi(r.left, n) || vi(r.right, n);
	if (r.type === "record" || r.type === "map") return vi(r.keyType, n) || vi(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : vi(r.in, n) || vi(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (vi(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (vi(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (vi(e, n)) return !0;
		return !!(r.rest && vi(r.rest, n));
	}
	return !1;
}
var yi = (e, t = {}) => (n) => {
	let r = mi({
		...n,
		processors: t
	});
	return hi(e, r), gi(r, e), _i(r, e);
}, bi = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = mi({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return hi(e, o), gi(o, e), _i(o, e);
}, xi = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, Si = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = xi[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, Ci = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, wi = (e, t, n, r) => {
	n.type = "boolean";
}, Ti = (e, t, n, r) => {
	n.not = {};
}, Ei = (e, t, n, r) => {
	let i = e._zod.def, a = re(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, Di = (e, t, n, r) => {
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
}, Oi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, ki = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, Ai = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = hi(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, ji = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = hi(o[e], t, {
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
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = hi(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Mi = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => hi(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Ni = (e, t, n, r) => {
	let i = e._zod.def, a = hi(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = hi(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Pi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = hi(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = hi(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = hi(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, Fi = (e, t, n, r) => {
	let i = e._zod.def, a = hi(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Ii = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Li = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Ri = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, zi = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, Bi = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	hi(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Vi = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Hi = (e, t, n, r) => {
	let i = e._zod.def;
	hi(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ui = /*@__PURE__*/ I("ZodISODateTime", (e, t) => {
	un.init(e, t), ha.init(e, t);
});
function Wi(e) {
	return /* @__PURE__ */ Fr(Ui, e);
}
var Gi = /*@__PURE__*/ I("ZodISODate", (e, t) => {
	dn.init(e, t), ha.init(e, t);
});
function Ki(e) {
	return /* @__PURE__ */ Ir(Gi, e);
}
var qi = /*@__PURE__*/ I("ZodISOTime", (e, t) => {
	fn.init(e, t), ha.init(e, t);
});
function Ji(e) {
	return /* @__PURE__ */ Lr(qi, e);
}
var Yi = /*@__PURE__*/ I("ZodISODuration", (e, t) => {
	pn.init(e, t), ha.init(e, t);
});
function Xi(e) {
	return /* @__PURE__ */ Rr(Yi, e);
}
var Zi = /*@__PURE__*/ I("ZodError", (e, t) => {
	Ie.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => ze(e, t) },
		flatten: { value: (t) => Re(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, ie, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, ie, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), Qi = /* @__PURE__ */ Be(Zi), $i = /* @__PURE__ */ Ve(Zi), ea = /* @__PURE__ */ He(Zi), ta = /* @__PURE__ */ We(Zi), na = /* @__PURE__ */ Ke(Zi), ra = /* @__PURE__ */ qe(Zi), ia = /* @__PURE__ */ Je(Zi), aa = /* @__PURE__ */ Ye(Zi), oa = /* @__PURE__ */ Xe(Zi), sa = /* @__PURE__ */ Ze(Zi), ca = /* @__PURE__ */ Qe(Zi), la = /* @__PURE__ */ $e(Zi), ua = /* @__PURE__ */ new WeakMap();
function da(e, t, n) {
	let r = Object.getPrototypeOf(e), i = ua.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), ua.set(r, i)), !i.has(t)) {
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
var fa = /*@__PURE__*/ I("ZodType", (e, t) => (Yt.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: bi(e, "input"),
	output: bi(e, "output")
} }), e.toJSONSchema = yi(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => Qi(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => ea(e, t, n), e.parseAsync = async (t, n) => $i(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => ta(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => na(e, t, n), e.decode = (t, n) => ra(e, t, n), e.encodeAsync = async (t, n) => ia(e, t, n), e.decodeAsync = async (t, n) => aa(e, t, n), e.safeEncode = (t, n) => oa(e, t, n), e.safeDecode = (t, n) => sa(e, t, n), e.safeEncodeAsync = async (t, n) => ca(e, t, n), e.safeDecodeAsync = async (t, n) => la(e, t, n), da(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(le(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return ye(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Oo(e, t));
	},
	superRefine(e, t) {
		return this.check(ko(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ ii(e));
	},
	optional() {
		return lo(this);
	},
	exactOptional() {
		return fo(this);
	},
	nullable() {
		return mo(this);
	},
	nullish() {
		return lo(mo(this));
	},
	nonoptional(e) {
		return bo(this, e);
	},
	array() {
		return J(this);
	},
	or(e) {
		return Za([this, e]);
	},
	and(e) {
		return $a(this, e);
	},
	transform(e) {
		return wo(this, so(e));
	},
	default(e) {
		return go(this, e);
	},
	prefault(e) {
		return vo(this, e);
	},
	catch(e) {
		return So(this, e);
	},
	pipe(e) {
		return wo(this, e);
	},
	readonly() {
		return Eo(this);
	},
	describe(e) {
		let t = this.clone();
		return dr.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return dr.get(this);
		let t = this.clone();
		return dr.add(t, e[0]), t;
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
		return dr.get(e)?.description;
	},
	configurable: !0
}), e)), pa = /*@__PURE__*/ I("_ZodString", (e, t) => {
	Xt.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, da(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ Qr(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ ti(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ ni(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ ri(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Xr(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ Yr(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Zr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Xr(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ $r(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ ei(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ oi());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ ai(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ si());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ ci());
		},
		slugify() {
			return this.check(/* @__PURE__ */ li());
		}
	});
}), ma = /*@__PURE__*/ I("ZodString", (e, t) => {
	Xt.init(e, t), pa.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ pr(ga, t)), e.url = (t) => e.check(/* @__PURE__ */ yr(xa, t)), e.jwt = (t) => e.check(/* @__PURE__ */ Pr(La, t)), e.emoji = (t) => e.check(/* @__PURE__ */ br(Ca, t)), e.guid = (t) => e.check(/* @__PURE__ */ mr(va, t)), e.uuid = (t) => e.check(/* @__PURE__ */ hr(ya, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ gr(ya, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ _r(ya, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ vr(ya, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ xr(wa, t)), e.guid = (t) => e.check(/* @__PURE__ */ mr(va, t)), e.cuid = (t) => e.check(/* @__PURE__ */ Sr(Ta, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ Cr(Ea, t)), e.ulid = (t) => e.check(/* @__PURE__ */ wr(Da, t)), e.base64 = (t) => e.check(/* @__PURE__ */ jr(Pa, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Mr(Fa, t)), e.xid = (t) => e.check(/* @__PURE__ */ Tr(Oa, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ Er(ka, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ Dr(Aa, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ Or(ja, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ kr(Ma, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ Ar(Na, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Nr(Ia, t)), e.datetime = (t) => e.check(Wi(t)), e.date = (t) => e.check(Ki(t)), e.time = (t) => e.check(Ji(t)), e.duration = (t) => e.check(Xi(t));
});
function q(e) {
	return /* @__PURE__ */ fr(ma, e);
}
var ha = /*@__PURE__*/ I("ZodStringFormat", (e, t) => {
	Zt.init(e, t), pa.init(e, t);
}), ga = /*@__PURE__*/ I("ZodEmail", (e, t) => {
	en.init(e, t), ha.init(e, t);
});
function _a(e) {
	return /* @__PURE__ */ pr(ga, e);
}
var va = /*@__PURE__*/ I("ZodGUID", (e, t) => {
	Qt.init(e, t), ha.init(e, t);
}), ya = /*@__PURE__*/ I("ZodUUID", (e, t) => {
	$t.init(e, t), ha.init(e, t);
});
function ba(e) {
	return /* @__PURE__ */ hr(ya, e);
}
var xa = /*@__PURE__*/ I("ZodURL", (e, t) => {
	tn.init(e, t), ha.init(e, t);
});
function Sa(e) {
	return /* @__PURE__ */ yr(xa, e);
}
var Ca = /*@__PURE__*/ I("ZodEmoji", (e, t) => {
	nn.init(e, t), ha.init(e, t);
}), wa = /*@__PURE__*/ I("ZodNanoID", (e, t) => {
	rn.init(e, t), ha.init(e, t);
}), Ta = /*@__PURE__*/ I("ZodCUID", (e, t) => {
	an.init(e, t), ha.init(e, t);
}), Ea = /*@__PURE__*/ I("ZodCUID2", (e, t) => {
	on.init(e, t), ha.init(e, t);
}), Da = /*@__PURE__*/ I("ZodULID", (e, t) => {
	sn.init(e, t), ha.init(e, t);
}), Oa = /*@__PURE__*/ I("ZodXID", (e, t) => {
	cn.init(e, t), ha.init(e, t);
}), ka = /*@__PURE__*/ I("ZodKSUID", (e, t) => {
	ln.init(e, t), ha.init(e, t);
}), Aa = /*@__PURE__*/ I("ZodIPv4", (e, t) => {
	mn.init(e, t), ha.init(e, t);
}), ja = /*@__PURE__*/ I("ZodIPv6", (e, t) => {
	hn.init(e, t), ha.init(e, t);
}), Ma = /*@__PURE__*/ I("ZodCIDRv4", (e, t) => {
	gn.init(e, t), ha.init(e, t);
}), Na = /*@__PURE__*/ I("ZodCIDRv6", (e, t) => {
	_n.init(e, t), ha.init(e, t);
}), Pa = /*@__PURE__*/ I("ZodBase64", (e, t) => {
	yn.init(e, t), ha.init(e, t);
}), Fa = /*@__PURE__*/ I("ZodBase64URL", (e, t) => {
	xn.init(e, t), ha.init(e, t);
}), Ia = /*@__PURE__*/ I("ZodE164", (e, t) => {
	Sn.init(e, t), ha.init(e, t);
}), La = /*@__PURE__*/ I("ZodJWT", (e, t) => {
	wn.init(e, t), ha.init(e, t);
}), Ra = /*@__PURE__*/ I("ZodNumber", (e, t) => {
	Tn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), da(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ Kr(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ qr(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ qr(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ Wr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ Gr(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Gr(e, t));
		},
		int(e) {
			return this.check(Va(e));
		},
		safe(e) {
			return this.check(Va(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ Kr(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ qr(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ Wr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ Gr(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Jr(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Jr(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function za(e) {
	return /* @__PURE__ */ zr(Ra, e);
}
var Ba = /*@__PURE__*/ I("ZodNumberFormat", (e, t) => {
	En.init(e, t), Ra.init(e, t);
});
function Va(e) {
	return /* @__PURE__ */ Br(Ba, e);
}
var Ha = /*@__PURE__*/ I("ZodBoolean", (e, t) => {
	Dn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r);
});
function Ua(e) {
	return /* @__PURE__ */ Vr(Ha, e);
}
var Wa = /*@__PURE__*/ I("ZodUnknown", (e, t) => {
	On.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Ga() {
	return /* @__PURE__ */ Hr(Wa);
}
var Ka = /*@__PURE__*/ I("ZodNever", (e, t) => {
	kn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r);
});
function qa(e) {
	return /* @__PURE__ */ Ur(Ka, e);
}
var Ja = /*@__PURE__*/ I("ZodArray", (e, t) => {
	jn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.element = t.element, da(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ Xr(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Xr(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Yr(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Zr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function J(e, t) {
	return /* @__PURE__ */ ui(Ja, e, t);
}
var Ya = /*@__PURE__*/ I("ZodObject", (e, t) => {
	In.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), H(e, "shape", () => t.shape), da(e, "ZodObject", {
		keyof() {
			return ro(Object.keys(this._zod.def.shape));
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
				catchall: Ga()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Ga()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: qa()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return we(this, e);
		},
		safeExtend(e) {
			return Te(this, e);
		},
		merge(e) {
			return Ee(this, e);
		},
		pick(e) {
			return Se(this, e);
		},
		omit(e) {
			return Ce(this, e);
		},
		partial(...e) {
			return De(co, this, e[0]);
		},
		required(...e) {
			return Oe(yo, this, e[0]);
		}
	});
});
function Y(e, t) {
	return new Ya({
		type: "object",
		shape: e ?? {},
		...W(t)
	});
}
var Xa = /*@__PURE__*/ I("ZodUnion", (e, t) => {
	Rn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mi(e, t, n, r), e.options = t.options;
});
function Za(e, t) {
	return new Xa({
		type: "union",
		options: e,
		...W(t)
	});
}
var Qa = /*@__PURE__*/ I("ZodIntersection", (e, t) => {
	zn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ni(e, t, n, r);
});
function $a(e, t) {
	return new Qa({
		type: "intersection",
		left: e,
		right: t
	});
}
var eo = /*@__PURE__*/ I("ZodRecord", (e, t) => {
	Hn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pi(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function to(e, t, n) {
	return !t || !t._zod ? new eo({
		type: "record",
		keyType: q(),
		valueType: e,
		...W(t)
	}) : new eo({
		type: "record",
		keyType: e,
		valueType: t,
		...W(n)
	});
}
var no = /*@__PURE__*/ I("ZodEnum", (e, t) => {
	Un.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new no({
			...t,
			checks: [],
			...W(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new no({
			...t,
			checks: [],
			...W(r),
			entries: i
		});
	};
});
function ro(e, t) {
	return new no({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...W(t)
	});
}
var io = /*@__PURE__*/ I("ZodLiteral", (e, t) => {
	Wn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function ao(e, t) {
	return new io({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...W(t)
	});
}
var oo = /*@__PURE__*/ I("ZodTransform", (e, t) => {
	Gn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new R(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Pe(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(Pe(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = i, n.fallback = !0, n);
	};
});
function so(e) {
	return new oo({
		type: "transform",
		transform: e
	});
}
var co = /*@__PURE__*/ I("ZodOptional", (e, t) => {
	qn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function lo(e) {
	return new co({
		type: "optional",
		innerType: e
	});
}
var uo = /*@__PURE__*/ I("ZodExactOptional", (e, t) => {
	Jn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function fo(e) {
	return new uo({
		type: "optional",
		innerType: e
	});
}
var po = /*@__PURE__*/ I("ZodNullable", (e, t) => {
	Yn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function mo(e) {
	return new po({
		type: "nullable",
		innerType: e
	});
}
var ho = /*@__PURE__*/ I("ZodDefault", (e, t) => {
	Xn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Li(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function go(e, t) {
	return new ho({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ge(t);
		}
	});
}
var _o = /*@__PURE__*/ I("ZodPrefault", (e, t) => {
	Qn.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ri(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function vo(e, t) {
	return new _o({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ge(t);
		}
	});
}
var yo = /*@__PURE__*/ I("ZodNonOptional", (e, t) => {
	$n.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ii(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function bo(e, t) {
	return new yo({
		type: "nonoptional",
		innerType: e,
		...W(t)
	});
}
var xo = /*@__PURE__*/ I("ZodCatch", (e, t) => {
	tr.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => zi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function So(e, t) {
	return new xo({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var Co = /*@__PURE__*/ I("ZodPipe", (e, t) => {
	nr.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bi(e, t, n, r), e.in = t.in, e.out = t.out;
});
function wo(e, t) {
	return new Co({
		type: "pipe",
		in: e,
		out: t
	});
}
var To = /*@__PURE__*/ I("ZodReadonly", (e, t) => {
	ir.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Eo(e) {
	return new To({
		type: "readonly",
		innerType: e
	});
}
var Do = /*@__PURE__*/ I("ZodCustom", (e, t) => {
	or.init(e, t), fa.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r);
});
function Oo(e, t = {}) {
	return /* @__PURE__ */ di(Do, e, t);
}
function ko(e, t) {
	return /* @__PURE__ */ fi(e, t);
}
//#endregion
//#region src/shared/documentDesign.ts
var Ao = [
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
], jo = [
	"small",
	"medium",
	"large"
], Mo = ["visual", "ats"], No = [
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
], Po = [
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
	"programming-languages-bg",
	"classic-soft-blue-waves"
], Fo = {
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
}, Io = [
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
], Lo = [
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
	"CSS",
	"PHP"
], Ro = {
	1: 11,
	2: 14,
	3: 17,
	4: 20,
	5: 23
}, zo = {
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
}, Bo = {
	1: 3.5,
	2: 4.5,
	3: 5.5,
	4: 7,
	5: 8.5
}, Vo = {
	1: 1.2,
	2: 1.3,
	3: 1.4,
	4: 1.52,
	5: 1.65
}, Ho = {
	small: 8.4,
	medium: 9.2,
	large: 10
}, Uo = (e) => Io.find((t) => t.id === e) ?? Io.find((e) => e.id === "source-sans") ?? Io[0], Wo = {
	none: "",
	basic: "Grundkenntnisse",
	good: "Gute Kenntnisse",
	advanced: "Fortgeschrittene Kenntnisse",
	expert: "Expertenkenntnisse"
}, Go = {
	none: 0,
	basic: 2,
	good: 3,
	advanced: 4,
	expert: 5
}, Ko = {
	title: "Kenntnisse & Zusatzangaben",
	categories: [],
	isVisible: !0
}, qo = [
	"comma-separated",
	"one-per-line",
	"tags",
	"bullets",
	"level-bars",
	"level-dots"
], Jo = [
	"basic",
	"good",
	"advanced",
	"expert",
	"none"
], Yo = [
	"it",
	"engineering",
	"business",
	"language",
	"software",
	"method",
	"certificate",
	"additional",
	"custom"
], Xo = za().nonnegative().optional(), Zo = Y({
	id: ba(),
	name: q().trim(),
	description: q().trim().optional(),
	level: ro(Jo),
	yearsOfExperience: Xo,
	lastUsedYear: za().int().min(1900).max(2200).optional(),
	isVisible: Ua(),
	sortOrder: za().int().nonnegative()
}), Qo = Y({
	id: ba(),
	title: q().trim(),
	items: J(Zo),
	displayMode: ro(qo).optional(),
	isVisible: Ua(),
	sortOrder: za().int().nonnegative()
}), $o = Y({
	id: ba(),
	title: q().trim(),
	type: ro(Yo),
	subtitle: q().trim().optional(),
	items: J(Zo),
	subcategories: J(Qo),
	displayMode: ro(qo),
	showLevels: Ua(),
	showYearsOfExperience: Ua(),
	isVisible: Ua(),
	sortOrder: za().int().nonnegative()
}), es = Y({
	title: q().trim().default("Kenntnisse & Zusatzangaben"),
	categories: J($o).default([]),
	isVisible: Ua().default(!0)
}), ts = [
	"summary",
	"strengths",
	"experience",
	"education",
	"projects",
	"knowledge",
	"certifications",
	"languages",
	"additional",
	"references"
], ns = [
	"main",
	"sidebar",
	"full",
	"left-sidebar",
	"right-sidebar"
], rs = {
	summary: "Zusammenfassung",
	strengths: "Stärken",
	experience: "Berufserfahrung",
	education: "Ausbildung",
	projects: "Projekte",
	knowledge: "Kenntnisse",
	certifications: "Zertifikate",
	languages: "Sprachen",
	additional: "Zusatzangaben",
	references: "Referenzen"
}, is = {
	summary: "Zusammenfassung",
	strengths: "Stärken",
	experience: "Berufserfahrung",
	education: "Ausbildung",
	languages: "Sprachen",
	certifications: "Zertifikate"
}, as = (e, t) => {
	if (t === "knowledge") return e?.knowledgeSection.title.trim() || rs.knowledge;
	if (t in is) {
		let n = t;
		return e?.resumeSectionTitles?.[n]?.trim() || is[n];
	}
	return rs[t];
}, os = [
	"summary",
	"strengths",
	"experience",
	"education",
	"projects",
	"knowledge",
	"certifications",
	"languages",
	"additional",
	"references"
], ss = (e, t = {}) => ({
	templateId: e,
	availableZones: ["main"],
	lockedSectionTypes: [],
	allowedZonesBySection: Object.fromEntries(ts.map((e) => [e, ["main"]])),
	defaultSectionOrder: os,
	defaultZoneBySection: Object.fromEntries(ts.map((e) => [e, "main"])),
	...t
}), cs = (e) => ({
	templateId: e,
	availableZones: [
		"main",
		"sidebar",
		"full"
	],
	lockedSectionTypes: [],
	allowedZonesBySection: {
		summary: ["sidebar", "full"],
		strengths: ["sidebar", "full"],
		experience: ["main"],
		education: ["main"],
		projects: ["main"],
		knowledge: ["sidebar", "main"],
		certifications: ["main", "sidebar"],
		languages: ["sidebar"],
		additional: [
			"main",
			"sidebar",
			"full"
		],
		references: [
			"main",
			"sidebar",
			"full"
		]
	},
	defaultSectionOrder: os,
	defaultZoneBySection: {
		summary: "sidebar",
		strengths: "sidebar",
		experience: "main",
		education: "main",
		projects: "main",
		knowledge: "sidebar",
		certifications: "sidebar",
		languages: "sidebar",
		additional: "main",
		references: "main"
	}
}), ls = (e) => ({
	templateId: e,
	availableZones: [
		"main",
		"left-sidebar",
		"right-sidebar"
	],
	lockedSectionTypes: [],
	allowedZonesBySection: {
		summary: ["left-sidebar", "right-sidebar"],
		strengths: ["left-sidebar", "right-sidebar"],
		experience: ["main"],
		education: ["main"],
		projects: ["main"],
		knowledge: [
			"left-sidebar",
			"right-sidebar",
			"main"
		],
		certifications: [
			"left-sidebar",
			"right-sidebar",
			"main"
		],
		languages: ["left-sidebar", "right-sidebar"],
		additional: [
			"main",
			"left-sidebar",
			"right-sidebar"
		],
		references: [
			"main",
			"left-sidebar",
			"right-sidebar"
		]
	},
	defaultSectionOrder: os,
	defaultZoneBySection: {
		summary: "left-sidebar",
		strengths: "right-sidebar",
		experience: "main",
		education: "main",
		projects: "main",
		knowledge: "left-sidebar",
		certifications: "right-sidebar",
		languages: "left-sidebar",
		additional: "main",
		references: "main"
	}
}), us = {
	"ivy-league": {
		...ss("ivy-league"),
		defaultSectionOrder: [
			"summary",
			"experience",
			"education",
			"knowledge",
			"languages",
			"strengths",
			"certifications",
			"projects",
			"additional",
			"references"
		]
	},
	stilvoll: ss("stilvoll"),
	kompakt: ss("kompakt", { compactSinglePage: !0 }),
	einspaltig: ss("einspaltig"),
	klassisch: ss("klassisch"),
	tabellarisch: ss("tabellarisch", { timelineSections: ["experience", "education"] }),
	zweispaltig: cs("zweispaltig"),
	gepflegt: cs("gepflegt"),
	modern: cs("modern"),
	elegant: cs("elegant"),
	zeitgenoessisch: cs("zeitgenoessisch"),
	kreativ: cs("kreativ"),
	mehrspaltig: ls("mehrspaltig")
}, ds = (e) => us[e] ?? ss(e), fs = (e) => {
	let t = ds(e);
	return t.defaultSectionOrder.map((e) => ({
		type: e,
		zone: t.defaultZoneBySection[e] ?? "main"
	}));
}, ps = (e, t) => {
	let n = ds(e), r = fs(e), i = /* @__PURE__ */ new Set();
	return [...(t ?? []).flatMap((e) => {
		if (!ts.includes(e.type) || i.has(e.type)) return [];
		i.add(e.type);
		let t = n.allowedZonesBySection[e.type] ?? ["main"];
		return [{
			type: e.type,
			zone: t.includes(e.zone) ? e.zone : t[0] ?? "main"
		}];
	}), ...r.filter(({ type: e }) => !i.has(e))];
}, ms = (e, t) => ps(t, e?.resumeSectionLayouts?.[t] ?? e?.resumeSectionLayout), hs = (e, t) => !!(e?.resumeSectionLayouts?.[t]?.length || e?.resumeSectionLayout?.length), gs = [
	"Entwurf",
	"Selbst erstellt",
	"Bewerbungsbereit",
	"Gesendet",
	"Beworben",
	"Eingangsbestätigung",
	"In Prüfung",
	"Vorstellungsgespräch",
	"Zweites Gespräch",
	"Zusage",
	"Absage",
	"Zurückgezogen",
	"Archiviert"
], _s = [
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
], vs = [
	"Vor Ort",
	"Hybrid",
	"Remote"
], ys = [
	"Unbefristet",
	"Befristet",
	"Praktikum",
	"Ausbildung",
	"Werkstudent",
	"Freelance"
], bs = ["Zeugnisse", "Zertifikate"], xs = [
	"application-sent",
	"application-rejected",
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
], Ss = [
	"projects",
	"internships",
	"trainings",
	"internationalExperience",
	"scholarships",
	"awards",
	"publications",
	"volunteer",
	"interests",
	"drivingLicenses",
	"additional",
	"references",
	"custom"
], X = q().trim().optional().default(""), Cs = Wi().optional(), ws = Y({
	id: ba(),
	label: X,
	url: X
}), Ts = Y({
	id: ba(),
	title: X,
	subtitle: X,
	from: X,
	to: X,
	date: X,
	location: X,
	url: X,
	description: X,
	bullets: J(q()).default([])
}), Es = Y({
	id: ba(),
	kind: ro(Ss),
	title: q().trim().min(1),
	isVisible: Ua().default(!0),
	entries: J(Ts).default([])
}), Ds = Y({
	id: ba(),
	title: q().trim().min(1),
	description: X
}), Os = Y({
	summary: q().trim().min(1).default(is.summary),
	strengths: q().trim().min(1).default(is.strengths),
	experience: q().trim().min(1).default(is.experience),
	education: q().trim().min(1).default(is.education),
	languages: q().trim().min(1).default(is.languages),
	certifications: q().trim().min(1).default(is.certifications)
}).default(is), ks = Y({
	name: q().trim().min(1, "Unternehmen ist erforderlich."),
	street: X,
	postalCode: X,
	city: q().trim().min(1, "Ort ist erforderlich."),
	country: q().trim().default("Deutschland"),
	website: Za([Sa(), ao("")]).default("")
}), As = Y({
	salutation: ro([
		"Frau",
		"Herr",
		"Divers",
		""
	]).default(""),
	firstName: X,
	lastName: X,
	position: X,
	email: Za([_a(), ao("")]).default(""),
	phone: X
}), js = Y({
	title: q().trim().min(1, "Position ist erforderlich."),
	source: X,
	url: Za([Sa(), ao("")]).default(""),
	fullText: X,
	workModel: ro(vs).default("Hybrid"),
	contractType: ro(ys).default("Unbefristet"),
	salaryExpectation: X
}), Ms = Y({
	at: Wi(),
	from: ro(gs).optional(),
	to: ro(gs),
	note: X
}), Ns = Y({
	coverSubject: X,
	coverIntroduction: X,
	coverMotivation: X,
	coverQualification: X,
	coverCompanyFit: X,
	coverExtraParagraph: X,
	coverClosing: X,
	resumeProfile: X,
	deckblattStatement: X
}), Ps = Za([
	ao(1),
	ao(2),
	ao(3),
	ao(4),
	ao(5)
]), Fs = Y({
	marginLevel: Ps,
	sectionSpacingLevel: Ps,
	fontSize: ro(jo),
	lineHeightLevel: Ps,
	fontId: ro(Ao),
	headingFontId: ro(Ao),
	columnLayout: ro(No),
	resumeOutputMode: ro(Mo).default(Fo.resumeOutputMode),
	backgroundId: ro(Po),
	showBackgroundInPrint: Ua()
}), Is = Y({
	schemaVersion: ao(1),
	id: ba(),
	folderName: q().min(1),
	company: ks,
	contact: As,
	job: js,
	status: ro(gs),
	templateId: q().min(1),
	accentColor: q().regex(/^#[0-9a-fA-F]{6}$/),
	secondaryColor: q().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
	designSettings: Fs.default(Fo),
	profileId: ba().optional(),
	notes: X,
	sentAt: Cs,
	deadlineAt: Cs,
	interviewAt: Cs,
	secondInterviewAt: Cs,
	startAt: Cs,
	contractEndAt: Cs,
	fixedTermEndAt: Cs,
	probationEndAt: Cs,
	rejectionAt: Cs,
	rejectionReason: ro(_s).optional(),
	acceptedAt: Cs,
	withdrawnAt: Cs,
	archivedAt: Cs,
	documents: Ns,
	attachmentIds: J(ba()).default([]),
	statusHistory: J(Ms),
	createdAt: Wi(),
	updatedAt: Wi()
}), Ls = Y({
	company: ks,
	contact: As,
	job: js,
	templateId: q().min(1),
	accentColor: q().regex(/^#[0-9a-fA-F]{6}$/),
	secondaryColor: q().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
	designSettings: Fs.default(Fo),
	profileId: ba().optional(),
	notes: X,
	sentAt: Cs,
	deadlineAt: Cs,
	interviewAt: Cs,
	startAt: Cs
}), Rs = Y({
	company: Y({
		name: q().optional(),
		street: q().optional(),
		postalCode: q().optional(),
		city: q().optional(),
		country: q().optional(),
		website: q().optional()
	}).optional(),
	contact: Y({
		salutation: ro([
			"Frau",
			"Herr",
			"Divers",
			""
		]).optional(),
		firstName: q().optional(),
		lastName: q().optional(),
		position: q().optional(),
		email: q().optional(),
		phone: q().optional()
	}).optional(),
	job: Y({
		title: q().optional(),
		source: q().optional(),
		url: q().optional(),
		fullText: q().optional(),
		workModel: ro(vs).optional(),
		contractType: ro(ys).optional(),
		salaryExpectation: q().optional()
	}).optional(),
	templateId: q().optional(),
	accentColor: q().regex(/^#[0-9a-fA-F]{6}$/).optional(),
	secondaryColor: q().regex(/^#[0-9a-fA-F]{6}$/).optional(),
	designSettings: Fs.partial().optional(),
	profileId: ba().optional(),
	notes: q().optional(),
	sentAt: Cs,
	deadlineAt: Cs,
	interviewAt: Cs,
	startAt: Cs
}), zs = Y({
	id: ba(),
	isDefault: Ua(),
	firstName: q().trim().min(1),
	lastName: q().trim().min(1),
	title: X,
	street: X,
	postalCode: X,
	city: X,
	country: q().default("Deutschland"),
	phone: X,
	email: Za([_a(), ao("")]).default(""),
	linkedin: X,
	github: X,
	portfolio: X,
	onlineProfiles: J(ws).default([]),
	birthDate: X,
	birthPlace: X,
	nationality: X,
	familyStatus: X,
	children: X,
	photoPath: X,
	signaturePath: X,
	summary: X,
	strengths: J(Ds).default([]),
	skills: J(q()).default([]),
	knowledgeSection: es.default(Ko),
	experiences: J(Y({
		id: ba(),
		from: q(),
		to: q(),
		role: q(),
		company: q(),
		city: X,
		isCurrent: Ua().default(!1),
		legalForm: X,
		employmentType: X,
		description: X,
		teamSize: X,
		tasks: J(q()).default([]),
		projects: J(q()).default([]),
		technologies: J(q()).default([]),
		achievements: J(q())
	})).default([]),
	education: J(Y({
		id: ba(),
		from: q(),
		to: q(),
		degree: q(),
		institution: q(),
		city: X,
		country: X,
		type: X,
		fieldOfStudy: X,
		grade: X,
		status: X,
		description: X
	})).default([]),
	languages: J(q()).default([]),
	certifications: J(q()).default([]),
	specialSections: J(Es).default([]),
	applicationPlace: X,
	applicationDate: X,
	resumeSectionTitles: Os,
	resumeSections: Y({
		profile: Ua(),
		strengths: Ua().default(!0),
		experience: Ua(),
		education: Ua(),
		skills: Ua(),
		languages: Ua(),
		certifications: Ua()
	}).default({
		profile: !0,
		strengths: !0,
		experience: !0,
		education: !0,
		skills: !0,
		languages: !0,
		certifications: !0
	}),
	resumeSectionLayout: J(Y({
		type: ro(ts),
		zone: ro(ns)
	})).default([]),
	resumeSectionLayouts: to(q(), J(Y({
		type: ro(ts),
		zone: ro(ns)
	}))).default({}),
	updatedAt: Wi()
}), Bs = Y({
	id: ba(),
	applicationId: ba().optional(),
	type: ro(xs),
	title: q().min(1),
	description: X,
	startAt: Wi(),
	endAt: Cs,
	allDay: Ua(),
	completed: Ua(),
	cancelled: Ua(),
	reminderMinutes: J(za().int().nonnegative()),
	createdAt: Wi(),
	updatedAt: Wi()
}), Vs = Y({
	id: ba(),
	applicationId: ba(),
	category: ro(bs),
	fileName: q().min(1),
	storedName: q().min(1).optional(),
	archiveRelativePath: q().min(1).optional(),
	description: X,
	documentDate: X,
	order: za().int().nonnegative(),
	includedInPackage: Ua().default(!0),
	createdAt: Wi()
}), Hs = Y({
	followUpDays: za().int().positive().nullable(),
	notificationsEnabled: Ua(),
	theme: ro([
		"light",
		"dark",
		"system"
	]),
	archiveAccepted: Ua(),
	autoBackupEnabled: Ua().default(!0),
	backupRetention: za().int().min(3).max(50).default(10),
	autoSaveDelaySeconds: za().int().min(1).max(30).default(2),
	sidebarCollapsed: Ua().default(!1),
	language: ao("de")
}), Us = Y({
	schemaVersion: ao(1),
	applications: J(Is),
	profiles: J(zs),
	events: J(Bs),
	attachments: J(Vs),
	settings: Hs,
	updatedAt: Wi()
}), Ws = Y({
	deletedAt: Wi(),
	application: Is,
	events: J(Bs),
	attachments: J(Vs)
}), Gs = Y({
	schemaVersion: ao(1),
	deletedApplications: J(Ws),
	updatedAt: Wi()
}), Ks = {
	followUpDays: 14,
	notificationsEnabled: !0,
	theme: "system",
	archiveAccepted: !1,
	autoBackupEnabled: !0,
	backupRetention: 10,
	autoSaveDelaySeconds: 2,
	sidebarCollapsed: !1,
	language: "de"
}, qs = /* @__PURE__ */ new Set([
	".docx",
	".dotx",
	".doc"
]), Js = {
	"muster-folder": "Musterordner",
	"existing-document": "Eigenes Dokument",
	"uploaded-word-template": "Eigene Word-Vorlage",
	"system-word-template": "System Word-Vorlage"
}, Ys = 1e3, Xs = {
	id: "word-muster-anschreiben",
	fileName: "Anschreiben_Muster.docx",
	name: "Anschreiben Mustafa Özdemir",
	documentType: "anschreiben",
	format: "docx",
	source: "uploaded-word-template",
	sortOrder: 2,
	isSystemTemplate: !1,
	supportsPreview: !0,
	supportsPlaceholders: !0,
	editableInWord: !0,
	isProtected: !0,
	description: "Persönliche Word-Vorlage nach dem Anschreiben von Mustafa Özdemir. Beim Verwenden wird eine neue, ausgefüllte Kopie im Firmen-Datumsordner erstellt.",
	tags: [
		"Word",
		"DOCX",
		"Anschreiben"
	]
}, Zs = {
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
	description: "Zweispaltige Word-Lebenslaufvorlage mit breiter Hauptspalte für Berufserfahrung und eleganter dunkelblauer Seitenleiste für persönliche Highlights.",
	tags: [
		"Elegant",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Dunkelblau"
	],
	cardHighlights: ["Breite Hauptspalte für Berufserfahrung", "Dunkelblaue Seitenleiste für persönliche Highlights"]
}, Qs = {
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
}, $s = {
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
}, ec = {
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
}, tc = {
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
}, nc = {
	id: "word-lebenslauf-ivy-league",
	fileName: "Ivy_League_Lebenslauf_Muster.docx",
	atsFileName: "Ivy_League_Lebenslauf_ATS.docx",
	previewFileName: "Ivy_League_Lebenslauf_Muster.preview.png",
	name: "Ivy League",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 9,
	category: "classic-professional",
	layout: "single-column-watercolor",
	atsFriendly: !0,
	supportsPhoto: !1,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "classic-single-column",
	description: "Die klassische Harvard-Lebenslaufvorlage, aktualisiert für das 21. Jahrhundert mit einem raffinierten, ATS-freundlichen Design.",
	tags: [
		"Ivy League",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Ohne Foto",
		"Einspaltig",
		"Klassisch"
	],
	cardHighlights: ["Klassische Serifentypografie mit ruhiger Einspaltenstruktur", "Pastell-Hintergrund · Ohne Foto · ATS-freundlich"]
}, rc = {
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
}, ic = {
	id: "word-lebenslauf-stilvoll",
	fileName: "Stilvoll_Lebenslauf_Muster.docx",
	atsFileName: "Stilvoll_Lebenslauf_ATS.docx",
	previewFileName: "Stilvoll_Lebenslauf_Muster.preview.png",
	name: "Stilvoll",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 10,
	category: "modern-professional",
	layout: "two-column-right-wide",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "skills-and-career",
	description: "Stilvolle Word-Lebenslaufvorlage mit kompakter linker Informationsspalte, breiter Karrierespalte und geometrischem Hintergrund.",
	tags: [
		"Stilvoll",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Zweispaltig",
		"Grün"
	],
	cardHighlights: ["Kompakte Profilspalte und breite Karrierespalte", "Geometrisches Muster · Mit Foto · ATS-freundlich"]
}, ac = {
	id: "word-lebenslauf-einspaltig",
	fileName: "Einfach_Lebenslauf_Muster.docx",
	atsFileName: "Einfach_Lebenslauf_ATS.docx",
	previewFileName: "Einfach_Lebenslauf_Muster.preview.png",
	name: "Einspaltig",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 11,
	category: "single-column",
	layout: "single-column",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "simple-ats-readable",
	description: "Einfache Word-Lebenslaufvorlage mit klarer einspaltiger Struktur, blauer Hierarchie und separater ATS-Ausgabe.",
	tags: [
		"Einspaltig",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Alle Branchen",
		"Blau"
	],
	cardHighlights: ["Klare Einspaltenstruktur mit kräftigen Abschnittslinien", "Mit Foto · Geometrisches Dekor · ATS-freundlich"]
}, oc = {
	id: "word-lebenslauf-klassisch",
	fileName: "Klassisch_Lebenslauf_Muster.docx",
	atsFileName: "Klassisch_Lebenslauf_ATS.docx",
	previewFileName: "Klassisch_Lebenslauf_Muster.preview.png",
	name: "Klassisch",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 8,
	category: "classic",
	layout: "single-column-classic",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "traditional-professional",
	description: "Traditionelle Word-Lebenslaufvorlage mit klarer Einspaltenstruktur, modernem hellblauem Wellendekor und separater ATS-Ausgabe.",
	tags: [
		"Klassisch",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Einspaltig",
		"Konservative Branchen"
	],
	cardHighlights: ["Traditionelles Layout mit modernem hellblauem Wellendekor", "Einspaltig · Mit Foto · ATS-freundlich · DOCX"]
}, sc = {
	id: "word-lebenslauf-mehrspaltig",
	fileName: "Mehrspaltig_Lebenslauf_Muster.docx",
	atsFileName: "Mehrspaltig_Lebenslauf_ATS.docx",
	previewFileName: "Mehrspaltig_Lebenslauf_Muster.preview.png",
	name: "Mehrspaltig",
	documentType: "lebenslauf",
	format: "docx",
	source: "system-word-template",
	sortOrder: 12,
	category: "multi-column",
	layout: "three-column-executive",
	atsFriendly: !0,
	supportsPhoto: !0,
	supportsBackground: !0,
	supportsPlaceholders: !0,
	supportsPreview: !0,
	supportsAtsMode: !0,
	editableInWord: !0,
	isSystemTemplate: !0,
	isProtected: !0,
	emphasis: "executive-information-density",
	description: "Dreispaltige Word-Lebenslaufvorlage mit klarer Executive-Hierarchie, Farbakzenten und separater ATS-Ausgabe.",
	tags: [
		"Mehrspaltig",
		"Word",
		"DOCX",
		"Lebenslauf",
		"ATS",
		"Foto",
		"Führungskräfte",
		"Blau"
	],
	cardHighlights: ["Dreispaltiges Layout für hohe Informationsdichte", "Mit Foto · ATS-freundlich · DOCX"]
}, cc = /* @__PURE__ */ "BEWERBER_NAME.BEWERBER_VORNAME.BEWERBER_NACHNAME.BEWERBER_ADRESSE.BEWERBER_PLZ.BEWERBER_ORT.BEWERBER_TELEFON.BEWERBER_EMAIL.FIRMA_NAME.FIRMA_ADRESSE.FIRMA_PLZ.FIRMA_ORT.ANSPRECHPARTNER.STELLENBEZEICHNUNG.STELLENNUMMER.BEWERBUNGSDATUM.BETREFF.ANREDE.EINLEITUNG.MOTIVATION.FACHLICHE_EIGNUNG.UNTERNEHMENSBEZUG.ZUSATZABSATZ.HAUPTTEXT.SCHLUSSTEXT.GRUSSFORMEL.UNTERSCHRIFT.KENNTNISSE".split("."), lc = {
	FIRMA_ADI: "FIRMA_NAME",
	FIRMA_ADRESI: "FIRMA_ADRESSE",
	POSTA_KODU: "FIRMA_PLZ",
	SEHIR: "FIRMA_ORT",
	TARIH: "BEWERBUNGSDATUM",
	STELLE: "STELLENBEZEICHNUNG",
	REFERENZNUMMER: "STELLENNUMMER",
	ANSCHREIBEN_METNI: "HAUPTTEXT",
	EK_PARAGRAF: "ZUSATZABSATZ",
	KAPANIS: "SCHLUSSTEXT"
}, uc = /* @__PURE__ */ "VORNAME.NACHNAME.BERUFSBEZEICHNUNG.FACHGEBIET_1.FACHGEBIET_2.FACHGEBIETE.TELEFON.EMAIL.WEBSITE.LINKEDIN.ORT.GEBURTSDATUM.GEBURTSORT.GEBURTSZEILE.GITHUB.KONTAKTDATEN_TITEL.KONTAKT_ZEILE_1.KONTAKT_ZEILE_2.KONTAKT_ZEILE_3.KONTAKTE_TITEL.HEADER_KONTAKT_1.HEADER_KONTAKT_2.HEADER_KONTAKT_3.HEADER_KONTAKT_4.HEADER_KONTAKT_5.HEADER_KONTAKT_6.TELEFON_ZEILE.EMAIL_ZEILE.WEBSITE_ZEILE.LINKEDIN_ZEILE.ORT_ZEILE.PROFILFOTO.ZUSAMMENFASSUNG_TITEL.ZUSAMMENFASSUNG.STAERKEN_TITEL.STAERKEN_ATS.ERFOLGE_TITEL.ERFOLGE_ATS.ERFOLG_HIGHLIGHT_1_TITEL.ERFOLG_HIGHLIGHT_1_BESCHREIBUNG.ERFOLG_HIGHLIGHT_2_TITEL.ERFOLG_HIGHLIGHT_2_BESCHREIBUNG.KENNTNISSE_TITEL.SPRACHEN_TITEL.SPRACHEN_ATS.BERUFSERFAHRUNG_TITEL.ERFAHRUNG_TITEL.AUSBILDUNG_TITEL.PROJEKTE_TITEL.PROJEKTE.WEITERBILDUNGEN_TITEL.WEITERBILDUNGEN.ZERTIFIKATE_TITEL.ZERTIFIKATE.VEROEFFENTLICHUNGEN_TITEL.VEROEFFENTLICHUNGEN.EHRENAMT_TITEL.EHRENAMT.SOFTWARE_TITEL.SOFTWARE.ZUSATZANGABEN_TITEL.ZUSATZANGABEN.FUEHRERSCHEIN_TITEL.FUEHRERSCHEIN.INTERESSEN_TITEL.INTERESSEN.LEBENSLAUF_ORT.LEBENSLAUF_DATUM.LEBENSLAUF_UNTERSCHRIFT.ATS_MODUS".split("."), dc = (e, t) => Array.from({ length: e }, (e, n) => t.map((e) => `${e}_${n + 1}`)).flat(), fc = [
	...uc,
	...dc(8, [
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
	...dc(3, [
		"ABSCHLUSS",
		"FACHRICHTUNG",
		"HOCHSCHULE",
		"AUSBILDUNG_START",
		"AUSBILDUNG_DATUM_TRENNER",
		"AUSBILDUNG_ENDE",
		"AUSBILDUNG_ORT",
		"AUSBILDUNG_METADATA_TRENNER"
	]),
	...dc(3, ["SPRACHE", "SPRACHNIVEAU"]),
	...Array.from({ length: 3 }, (e, t) => `SPRACHE_${t + 1}_PUNKTE`),
	...Array.from({ length: 4 }, (e, t) => [`STAERKE_${t + 1}_TITEL`, `STAERKE_${t + 1}_BESCHREIBUNG`]).flat(),
	...dc(6, ["KENNTNIS_KATEGORIE", "KENNTNIS_EINTRAEGE"])
], pc = [...cc, ...fc], mc = "BEWERBUNG_ROOT_PATH", hc = (t = process.env) => {
	let n = t[mc]?.trim();
	return e.resolve(n || "D:\\bewerbung_mustafa");
}, gc = (t = hc(), n) => {
	let r = e.resolve(t), i = e.join(r, "data"), a = e.join(i, "Muster");
	return {
		root: r,
		dataRoot: i,
		applicationsData: e.join(i, "Bewerbungen"),
		musterRoot: a,
		anschreibenTemplates: e.join(a, "Anschreiben"),
		deckblattTemplates: e.join(a, "Deckblatt"),
		lebenslaufTemplates: e.join(a, "Lebenslauf"),
		anschreibenDocuments: e.join(r, "Anschreiben"),
		lebenslaufDocuments: e.join(r, "Lebenslauf"),
		zeugnisseArchive: e.join(r, "Zeugnisse"),
		zertifikateArchive: e.join(r, "Zertifikate"),
		absagenRoot: e.join(r, "Absagen"),
		interviewsRoot: e.join(r, "Vorstellungsgespräch"),
		previewCache: e.join(i, "cache", "template-previews"),
		systemTemplateCache: e.join(i, "cache", "system-templates"),
		bundledTemplatesRoot: n
	};
}, _c = [
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
		description: "Kostenlose, zweispaltige Lebenslauf-Vorlage. Perfekt für jede Branche.",
		accent: "#0B3D86",
		secondary: "#58B5F7",
		font: "Source Sans 3",
		layout: "split-clean",
		features: [
			"Zwei klare Spalten",
			"A4-optimiert",
			"ATS-Variante"
		],
		category: "business",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .38,
		atsInfo: "Zweispaltig unterstützt eine separate, lineare ATS-Ausgabe ohne Foto oder dekorative Spalten.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 3,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "template",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "zeitgenoessisch",
		name: "Zeitgenössisch",
		description: "Eine saubere, moderne Lebenslaufvorlage, die zentrale Erfolge, Erfahrungen und Fähigkeiten hervorhebt.",
		accent: "#2FB478",
		secondary: "#CBECDD",
		font: "Source Sans 3",
		layout: "sidebar-left",
		features: [
			"Organische Fotofläche",
			"Zwei Spalten",
			"ATS-Variante"
		],
		category: "modern-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .31,
		atsInfo: "Zeitgenössisch unterstützt eine separate, lineare ATS-Ausgabe ohne Foto, organische Formen oder Abschnittssymbole.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "left-sidebar",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "kreativ",
		name: "Kreativ",
		description: "Schöne Lebenslauf-Vorlage. Stellen Sie Ihre Qualifikationen auf elegante Weise in den Mittelpunkt.",
		accent: "#37B978",
		secondary: "#D9F2E5",
		font: "Source Sans 3",
		layout: "bold-grid",
		features: [
			"Grüner Profilkopf",
			"Zwei Spalten",
			"ATS-Variante"
		],
		category: "creative-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .38,
		atsInfo: "Kreativ unterstützt eine separate, lineare ATS-Ausgabe ohne Profilfoto, Farbband oder dekorative Kreise.",
		designDefaults: {
			marginLevel: 2,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "two-column-left-wide",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "ivy-league",
		name: "Ivy League",
		description: "Klassische einspaltige Lebenslaufvorlage mit eleganter Typografie und ATS-freundlicher Struktur.",
		accent: "#073C8C",
		secondary: "#FF6A00",
		font: "Georgia",
		layout: "centered",
		features: [
			"Klassische Serifentypografie",
			"Pastell-Suluboya",
			"ATS-Variante"
		],
		category: "classic-professional",
		supportsAtsMode: !0,
		supportsPhoto: !1,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Ivy League unterstützt eine separate lineare ATS-Ausgabe ohne Suluboya-Hintergrund, Symbole oder Sprachniveau-Punkte.",
		designDefaults: {
			marginLevel: 2,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "single",
			resumeOutputMode: "visual",
			backgroundId: "pastel-gradient",
			showBackgroundInPrint: !0,
			fontId: "source-sans",
			headingFontId: "georgia"
		}
	},
	{
		id: "stilvoll",
		name: "Stilvoll",
		description: "Eine stilvolle, übersichtliche Lebenslaufvorlage für Professionals mit umfangreichen Fähigkeiten und Berufserfahrung.",
		accent: "#36B873",
		secondary: "#075E50",
		font: "Source Sans 3",
		layout: "split-clean",
		features: [
			"Links kompakt",
			"Karriere rechts",
			"Geometrisches Muster"
		],
		category: "modern-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .3,
		atsInfo: "Stilvoll bietet eine lineare ATS-Ausgabe ohne Foto, Geometriemuster, Symbole oder grafische Sprachniveaus.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "two-column-right-wide",
			resumeOutputMode: "visual",
			backgroundId: "geometric",
			showBackgroundInPrint: !0,
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "kompakt",
		name: "Kompakt",
		description: "Einseitige Lebenslaufvorlage mit kleineren Seitenrändern und platzsparender Informationsstruktur.",
		accent: "#073D96",
		secondary: "#FF6200",
		font: "Source Sans 3",
		layout: "bold-grid",
		features: [
			"Einseitig optimiert",
			"Hohe Informationsdichte",
			"ATS-Variante"
		],
		category: "compact-professional",
		supportsAtsMode: !0,
		supportsPhoto: !1,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .36,
		atsInfo: "Kompakt bietet eine lineare ATS-Ausgabe ohne Flusslinien, Symbole, Skill-Tags oder Sprachniveau-Punkte.",
		designDefaults: {
			marginLevel: 1,
			sectionSpacingLevel: 2,
			fontSize: "small",
			lineHeightLevel: 1,
			columnLayout: "two-column-left-wide",
			resumeOutputMode: "visual",
			backgroundId: "abstract",
			showBackgroundInPrint: !0,
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "einspaltig",
		name: "Einspaltig",
		description: "Kostenlose, einfache Lebenslauf-Vorlage. Durchläuft mühelos die ATS-Prüfungen.",
		accent: "#0B3485",
		secondary: "#4AAAF4",
		font: "Source Sans 3",
		layout: "centered",
		features: [
			"Einspaltig",
			"Klarer Profilkopf",
			"ATS-freundlich"
		],
		category: "simple-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Einspaltig bietet eine lineare ATS-Ausgabe ohne Foto, geometrische Flächen, Symbole oder Sprachniveau-Punkte.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "single",
			resumeOutputMode: "visual",
			backgroundId: "geometric",
			showBackgroundInPrint: !0,
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "klassisch",
		name: "Klassisch",
		description: "Traditionelle Lebenslaufvorlage für konservative Branchen, ohne auf ein modernes Erscheinungsbild zu verzichten.",
		accent: "#2B2F32",
		secondary: "#00AFC5",
		font: "Source Sans 3",
		layout: "centered",
		features: [
			"Klassische Einspaltenstruktur",
			"Organische blaue Wellen",
			"ATS-Variante"
		],
		category: "classic-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Klassisch bietet eine lineare ATS-Ausgabe ohne Foto, blaue Wellen oder mehrspaltige Stärkenblöcke.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 3,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "single",
			resumeOutputMode: "visual",
			backgroundId: "classic-soft-blue-waves",
			showBackgroundInPrint: !0,
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	},
	{
		id: "mehrspaltig",
		name: "Mehrspaltig",
		description: "Dreispaltige Lebenslaufvorlage mit hoher Informationsdichte für erfahrene Fach- und Führungskräfte.",
		accent: "#003C96",
		secondary: "#57ADF4",
		font: "Source Sans 3",
		layout: "centered",
		features: [
			"Dreispaltige Executive-Struktur",
			"Farbige Akzentlinien",
			"ATS-Variante"
		],
		category: "executive",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Mehrspaltig bietet eine lineare ATS-Ausgabe ohne Foto, Farbakzente oder Spaltenlayout.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 3,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "template",
			resumeOutputMode: "visual",
			backgroundId: "classic-soft-blue-waves",
			showBackgroundInPrint: !0,
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
		id: "elegant",
		name: "Elegant",
		description: "Moderne Lebenslauf-Vorlage. Schönes, stilvolles Design, das Ihren Hintergrund und Ihre Leistungen hervorhebt.",
		accent: "#FE6201",
		secondary: "#8A0202",
		font: "Source Sans 3",
		layout: "sidebar-right",
		features: [
			"Rechte Farbfläche",
			"A4-optimiert",
			"ATS-Variante"
		],
		category: "executive",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		sidebarWidthRatio: .333,
		atsInfo: "Elegant unterstützt eine separate, lineare ATS-Ausgabe ohne Foto, Seitenleiste oder dekorative Elemente.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 4,
			fontSize: "small",
			lineHeightLevel: 2,
			columnLayout: "right-sidebar",
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
			"Klare Kontaktzeile",
			"Professionell"
		],
		category: "creative-professional",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Modern-Template unterstützt ATS-freundliche Ausgabe mit einspaltigem Layout und entfernten visuellen Elementen.",
		designDefaults: {
			columnLayout: "two-column-left-wide",
			resumeOutputMode: "visual",
			backgroundId: "white",
			showBackgroundInPrint: !1,
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
		layout: "timeline",
		features: [
			"Einspaltige Zeitleiste",
			"A4-optimiert",
			"ATS-Variante"
		],
		category: "modern",
		supportsAtsMode: !0,
		supportsPhoto: !0,
		supportsFreeform: !0,
		supportsMultiplePages: !0,
		atsInfo: "Tabellarisch-Template unterstützt ATS-Modus mit einspaltigem Layout und ausgeblendeten Designelementen wie Timeline-Grafiken.",
		designDefaults: {
			marginLevel: 3,
			sectionSpacingLevel: 3,
			fontSize: "medium",
			lineHeightLevel: 3,
			columnLayout: "timeline",
			resumeOutputMode: "visual",
			backgroundId: "white",
			fontId: "source-sans",
			headingFontId: "source-sans"
		}
	}
], vc = /* @__PURE__ */ new Set([
	"zweispaltig",
	"gepflegt",
	"tabellarisch",
	"modern",
	"elegant",
	"zeitgenoessisch",
	"kreativ",
	"ivy-league",
	"stilvoll",
	"kompakt",
	"einspaltig",
	"klassisch",
	"mehrspaltig"
]), yc = _c.filter((e) => vc.has(e.id)), bc = { einfach: "einspaltig" }, xc = (e) => {
	let t = bc[e] ?? e;
	return _c.find((e) => e.id === t) ?? yc[0];
}, Sc = (e) => {
	let t = e.replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(t)) return "#ffffff";
	let [n, r, i] = [
		0,
		2,
		4
	].map((e) => Number.parseInt(t.slice(e, e + 2), 16) / 255).map((e) => e <= .03928 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4);
	return .2126 * n + .7152 * r + .0722 * i > .46 ? "#26313a" : "#ffffff";
}, Cc = (e) => new Date(e.sentAt ?? e.createdAt), wc = (e) => new Intl.DateTimeFormat("de-DE", {
	day: "numeric",
	month: "long",
	year: "numeric"
}).format(Cc(e)), Tc = (e, t) => t.map((t) => ({
	title: t,
	type: e
}));
Tc("it", [
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
]), Tc("engineering", [
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
]), Tc("engineering", [
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
]), Tc("engineering", [
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
]), Tc("business", [
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
var Ec = (e = "", t = 0) => ({
	id: crypto.randomUUID(),
	name: e,
	description: "",
	level: "none",
	isVisible: !0,
	sortOrder: t
}), Dc = (e = "", t = 0, n = "custom") => ({
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
}), Oc = (e) => e.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder), kc = (e, t, n, r) => {
	let i = [];
	if (t && e.level !== "none") if (r === "level-dots") {
		let t = Go[e.level];
		i.push(`${"●".repeat(t)}${"○".repeat(5 - t)} ${Wo[e.level]}`);
	} else i.push(Wo[e.level]);
	return n && e.yearsOfExperience !== void 0 && i.push(`${e.yearsOfExperience} ${e.yearsOfExperience === 1 ? "Jahr" : "Jahre"}`), e.lastUsedYear !== void 0 && i.push(`zuletzt ${e.lastUsedYear}`), e.description?.trim() && i.push(e.description.trim()), `${e.name}${i.length ? ` – ${i.join(", ")}` : ""}`;
}, Ac = (e) => e.categories.filter((e) => e.isVisible).flatMap((e) => [...Oc(e.items).map((e) => e.name), ...e.subcategories.filter((e) => e.isVisible).flatMap((e) => Oc(e.items).map((e) => e.name))]), jc = (e, t = !1) => e.isVisible ? e.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => {
	let n = [], r = t ? "comma-separated" : e.displayMode, i = Oc(e.items);
	if (i.length) {
		let t = i.map((t) => kc(t, e.showLevels, e.showYearsOfExperience, r));
		n.push(r === "comma-separated" || r === "tags" ? `${e.title}: ${t.join(", ")}` : `${e.title}\n${t.map((e) => `• ${e}`).join("\n")}`);
	}
	return e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).forEach((i) => {
		let a = Oc(i.items);
		if (!a.length) return;
		let o = t ? "comma-separated" : i.displayMode ?? r, s = a.map((t) => kc(t, e.showLevels, e.showYearsOfExperience, o));
		n.push(o === "comma-separated" || o === "tags" ? `${e.title} – ${i.title}: ${s.join(", ")}` : `${e.title} – ${i.title}\n${s.map((e) => `• ${e}`).join("\n")}`);
	}), n;
}).filter(Boolean).join("\n") : "", Mc = (e, t) => {
	if (e?.categories.length) return structuredClone(e);
	if (!t.filter(Boolean).length) return structuredClone(e ?? Ko);
	let n = Dc("Kenntnisse", 0, "custom");
	return n.items = t.filter(Boolean).map((e, t) => Ec(e, t)), {
		title: e?.title || Ko.title,
		categories: [n],
		isVisible: e?.isVisible ?? !0
	};
}, Nc = [
	{
		value: "A1",
		label: "A1 – Anfänger"
	},
	{
		value: "A2",
		label: "A2 – Grundlegende Kenntnisse"
	},
	{
		value: "B1",
		label: "B1 – Fortgeschrittene Sprachverwendung"
	},
	{
		value: "B2",
		label: "B2 – Selbstständige Sprachverwendung"
	},
	{
		value: "C1",
		label: "C1 – Fachkundige Sprachkenntnisse"
	},
	{
		value: "C2",
		label: "C2 – Annähernd muttersprachlich"
	}
];
Nc.length;
var Pc = "B1", Fc = (e) => {
	let t = e.trim().toLocaleLowerCase("de-DE"), n = t.match(/(?:^|\s)(a1|a2|b1|b2|c1|c2)(?:\s|$)/i)?.[1];
	return n ? n.toLocaleUpperCase("de-DE") : /muttersprache|native/.test(t) ? "C2" : /verhandlung|fließ|fliess|fachkund/.test(t) ? "C1" : /fortgeschritten|advanced|erweitert|versiert/.test(t) ? "B2" : /gut|mittelstufe/.test(t) ? "B1" : /grundkennt/.test(t) ? "A2" : /anfänger|anfaenger|einsteiger|beginner/.test(t) ? "A1" : Pc;
}, Ic = (e) => Nc.findIndex((t) => t.value === Fc(e)) + 1, Lc = 30, Rc = 38, zc = 3300, Bc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Vc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Hc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Uc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Wc = {
	firstPageCapacity: 48,
	secondPageCapacity: 52,
	preserveItemOrder: !0
}, Gc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Kc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, qc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Jc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Yc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Xc = {
	firstPageCapacity: 42,
	secondPageCapacity: 50,
	preserveItemOrder: !0
}, Zc = {
	firstPageCapacity: 50,
	secondPageCapacity: 54,
	preserveItemOrder: !0
}, Qc = (e, t = 95) => Math.max(0, Math.ceil(e.trim().length / t)), $c = (e) => 4 + Qc(`${e.role} ${e.company}`, 70) + e.achievements.filter((e) => e.trim()).reduce((e, t) => e + 1 + Qc(t), 0), el = (e) => 2 + Qc(`${e.degree} ${e.institution}`, 80), tl = (e, t) => {
	if (!e) return 4;
	let n = t || e.summary, r = Ac(Mc(e.knowledgeSection, e.skills)).length;
	return Qc(n, 105) + Math.ceil(r / 3) + Math.ceil(e.languages.length / 2) + Math.ceil(e.certifications.length / 2);
}, nl = (e, t) => e > t * 1.3 ? "dense" : e > t * .9 ? "compact" : "standard", rl = (e, t = "", n = {}) => {
	let r = n.firstPageCapacity ?? Lc, i = n.secondPageCapacity ?? Rc, a = [...(e?.experiences ?? []).map((e) => ({
		kind: "experience",
		id: e.id,
		weight: $c(e)
	})), ...(e?.education ?? []).map((e) => ({
		kind: "education",
		id: e.id,
		weight: el(e)
	}))], o = a.reduce((e, t) => e + t.weight, 0), s = Math.max(o, tl(e, t));
	if (s <= r || a.length <= 1) return [{
		pageNumber: 1,
		items: a,
		density: nl(s, r)
	}];
	let c = [], l = [], u = 0, d = !1;
	for (let e of a) !d && (c.length === 0 || u + e.weight <= r) ? (c.push(e), u += e.weight) : (l.push(e), d = n.preserveItemOrder ?? !1);
	l.length === 0 && c.length > 1 && (l.unshift(c.pop()), u = c.reduce((e, t) => e + t.weight, 0));
	let f = l.reduce((e, t) => e + t.weight, 0);
	return [{
		pageNumber: 1,
		items: c,
		density: nl(Math.max(u, tl(e, t)), r)
	}, {
		pageNumber: 2,
		items: l,
		density: nl(f, i)
	}];
}, il = (e) => {
	let t = [
		e.coverSubject,
		e.coverIntroduction,
		e.coverMotivation,
		e.coverQualification,
		e.coverCompanyFit,
		e.coverExtraParagraph,
		e.coverClosing
	].reduce((e, t) => e + t.trim().length, 0);
	return {
		characterCount: t,
		recommendedMaximum: zc,
		density: t > zc ? "dense" : t > 2500 ? "compact" : "standard",
		isOverRecommendedLength: t > zc
	};
}, al = /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=\s]+$/i, ol = (e) => e && al.test(e) ? e : "", sl = (e) => `<svg viewBox="0 0 32 32" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${e}</svg>`, cl = (e, t = "rounded") => sl(`${t === "hexagon" ? "<path d=\"M16 2 28 9v14l-12 7L4 23V9z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>" : t === "oval" ? "<ellipse cx=\"16\" cy=\"16\" rx=\"14\" ry=\"9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>" : "<rect x=\"3\" y=\"3\" width=\"26\" height=\"26\" rx=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>"}<text x="16" y="19" text-anchor="middle" fill="currentColor" font-family="Arial,sans-serif" font-size="${e.length > 3 ? 7 : 10}" font-weight="700">${e}</text>`), ll = (e) => {
	let t = e.trim().toLocaleLowerCase("en-US");
	return t === "react" ? sl("<circle cx=\"16\" cy=\"16\" r=\"2.3\" fill=\"currentColor\"/><ellipse cx=\"16\" cy=\"16\" rx=\"13\" ry=\"5.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><ellipse cx=\"16\" cy=\"16\" rx=\"13\" ry=\"5.2\" transform=\"rotate(60 16 16)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><ellipse cx=\"16\" cy=\"16\" rx=\"13\" ry=\"5.2\" transform=\"rotate(120 16 16)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/>") : t === "electron" ? sl("<circle cx=\"16\" cy=\"16\" r=\"2\" fill=\"currentColor\"/><path d=\"M8 8c7-4 16 0 18 8M5 18c1 8 10 12 17 8M21 5c-7 0-14 7-14 15\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\"1.6\" fill=\"currentColor\"/><circle cx=\"25\" cy=\"17\" r=\"1.6\" fill=\"currentColor\"/><circle cx=\"21\" cy=\"26\" r=\"1.6\" fill=\"currentColor\"/>") : t === "java" ? sl("<path d=\"M11 20h12v2.5c0 3-2.5 5.5-5.5 5.5h-1A5.5 5.5 0 0 1 11 22.5zM23 21h2a3 3 0 0 1 0 6h-3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M14 17c-4-4 5-5 1-9M19 17c-3-3 4-4 1-8M18 7c1-2 3-3 5-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"/>") : t === "python" ? sl("<path d=\"M16 3c-7 0-8 3-8 7v4h9v2H6c-3 0-4 2-4 6s2 7 5 7h4v-5c0-4 3-6 7-6h7c3 0 5-3 5-7s-2-8-7-8z\" fill=\"currentColor\" opacity=\".82\"/><circle cx=\"13\" cy=\"8\" r=\"1.3\" fill=\"white\"/><circle cx=\"21\" cy=\"24\" r=\"1.3\" fill=\"white\"/>") : t === "rust" ? sl("<circle cx=\"16\" cy=\"16\" r=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-dasharray=\"3 2\"/><text x=\"16\" y=\"20\" text-anchor=\"middle\" fill=\"currentColor\" font-family=\"Georgia,serif\" font-size=\"13\" font-weight=\"700\">R</text>") : t === "html" ? cl("5", "hexagon") : t === "css" ? cl("3", "hexagon") : t === "c#" ? cl("C#", "hexagon") : t === "c++" ? cl("C++", "hexagon") : t === "c" ? cl("C", "hexagon") : t === "php" ? cl("php", "oval") : t === "go" ? sl("<path d=\"M3 10h7M1 14h8M4 18h6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"21\" y=\"20\" text-anchor=\"middle\" fill=\"currentColor\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-style=\"italic\" font-weight=\"800\">GO</text>") : cl(t === ".net" ? ".NET" : t === "typescript" ? "TS" : e.slice(0, 3).toLocaleUpperCase("en-US"));
}, Z = (e = "") => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;"), Q = (e = "") => {
	let t = e.trim();
	return t ? /^https?:\/\//i.test(t) ? t : `https://${t.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "")}` : "";
}, ul = (e) => Array.from(new Set(e.map((e) => e.trim()).filter(Boolean))), dl = (e, t) => {
	let n = e.trim(), r = t.trim();
	return n ? r ? `${n} – ${r}` : n : r;
}, fl = (e, t) => e.backgroundId === "programming-languages-bg" && !t ? `<div class="document-background-layer programming-languages-layer" aria-hidden="true">${Lo.map((e) => `<span class="programming-language-token"><i>${ll(e)}</i><b>${Z(e)}</b></span>`).join("")}</div>` : "", pl = (e, t, n) => {
	let r = Oc(e);
	if (!r.length) return "";
	let i = r.map((e) => kc(e, t.showLevels, t.showYearsOfExperience, n));
	if (n === "comma-separated") return `<p class="knowledge-comma">${i.map(Z).join(", ")}</p>`;
	if (n === "tags") return `<div class="knowledge-tags">${i.map((e) => `<span>${Z(e)}</span>`).join("")}</div>`;
	if (n === "level-bars" || n === "level-dots") return `<div class="knowledge-level-list ${n}">${r.map((e) => {
		let r = Go[e.level], i = e.level === "none" ? "" : Wo[e.level], a = t.showYearsOfExperience && e.yearsOfExperience !== void 0 ? ` · ${e.yearsOfExperience} Jahre` : "", o = n === "level-bars" ? `<i class="knowledge-level-bar"><b style="width:${r * 20}%"></b></i>` : `<i class="knowledge-level-dots">${"●".repeat(r)}<em>${"○".repeat(5 - r)}</em></i>`;
		return `<div class="knowledge-level-row"><span>${Z(e.name)}</span>${o}<small>${Z(i + a)}</small></div>`;
	}).join("")}</div>`;
	let a = n === "bullets" ? "ul" : "div";
	return `<${a} class="knowledge-lines ${n}">${i.map((e) => n === "bullets" ? `<li>${Z(e)}</li>` : `<p>${Z(e)}</p>`).join("")}</${a}>`;
}, ml = (e, t) => {
	if (!e) return "";
	let n = Mc(e.knowledgeSection, e.skills);
	if (!n.isVisible) return "";
	let r = n.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => {
		let n = t ? "comma-separated" : e.displayMode, r = pl(e.items, e, n), i = e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).map((r) => {
			let i = pl(r.items, e, t ? "comma-separated" : r.displayMode ?? n);
			return i ? `<div class="knowledge-subcategory"><h5>${Z(r.title)}</h5>${i}</div>` : "";
		}).join("");
		return !r && !i ? "" : `<div class="knowledge-category"><h4>${Z(e.title)}</h4>${e.subtitle ? `<small>${Z(e.subtitle)}</small>` : ""}${r}${i}</div>`;
	}).join(""), i = t ? "Kenntnisse" : n.title;
	return r ? `<section class="knowledge-section"><h3>${Z(i)}</h3>${r}</section>` : "";
}, hl = (e) => e ? `${e.firstName} ${e.lastName}`.trim() : "Vorname Nachname", gl = (e) => [e.contact.firstName, e.contact.lastName].filter(Boolean).join(" "), _l = (e) => {
	let t = gl(e);
	return t ? e.contact.salutation === "Frau" ? `Sehr geehrte Frau ${e.contact.lastName}` : e.contact.salutation === "Herr" ? `Sehr geehrter Herr ${e.contact.lastName}` : `Guten Tag ${t}` : "Sehr geehrte Damen und Herren";
}, vl = (e) => [
	e.company.name,
	gl(e),
	e.company.street,
	`${e.company.postalCode} ${e.company.city}`.trim()
].filter(Boolean).map(Z).join("<br>"), yl = (e) => e ? [
	hl(e),
	e.street,
	`${e.postalCode} ${e.city}`.trim(),
	e.phone,
	e.email
].filter(Boolean).map(Z).join(" · ") : "Bitte unter Profile Ihre Absenderdaten ergänzen.", bl = (e) => {
	if (!e) return "<span class=\"sender-name\">Vorname Nachname</span><span class=\"sender-contact\">E-Mail · Telefon</span>";
	let t = [
		e.street,
		`${e.postalCode} ${e.city}`.trim(),
		e.email,
		e.phone
	].filter(Boolean).map(Z).join(" · "), n = e.title?.trim();
	return `<span class="sender-name">${Z(hl(e))}</span>` + (n ? `<span class="sender-title">${Z(n)}</span>` : "") + `<span class="sender-contact">${t}</span>`;
}, xl = (e, t, n, r) => {
	let i = Uo(r.fontId), a = Uo(r.headingFontId);
	return `
  :root{--accent:${e};--secondary:${t};--on-secondary:${n};--ink:#172026;--muted:#5c6870;--line:#d9e0e3;--doc-margin:${Ro[r.marginLevel]}mm;--section-gap:${Bo[r.sectionSpacingLevel]}mm;--body-size:${Ho[r.fontSize]}pt;--body-line:${Vo[r.lineHeightLevel]};--body-font:${i.family};--heading-font:${a.family};--heading-weight:${a.headingWeight}}
  @page{size:A4;margin:0}
  *{box-sizing:border-box}body{margin:0;background:#eef1f1;color:var(--ink);font-family:var(--body-font)}
  .page{width:210mm;height:297mm;min-height:297mm;max-height:297mm;margin:0 auto 8mm;overflow:hidden;background:#fff;break-after:page;page-break-after:always;position:relative;print-color-adjust:exact;-webkit-print-color-adjust:exact}
  .page:last-child{break-after:auto;page-break-after:auto}.page-content{position:relative;z-index:1;width:100%;height:100%;transform-origin:top left}.standard-page-content{padding:var(--doc-margin)}
  .document-background-layer{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}.programming-languages-layer{color:color-mix(in srgb,var(--accent),#70808a 45%);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;opacity:.105}.programming-languages-layer:before,.programming-languages-layer:after{position:absolute;border:1px solid currentColor;border-radius:4mm;content:""}.programming-languages-layer:before{width:54mm;height:37mm;right:-15mm;top:-9mm}.programming-languages-layer:after{width:61mm;height:42mm;left:-20mm;bottom:-12mm}.programming-languages-layer span{position:absolute;display:flex;align-items:center;gap:1.3mm;padding:1.2mm 2.3mm;border:1px solid currentColor;border-radius:2.5mm;font-size:7.8pt;font-weight:650;letter-spacing:.025em;white-space:nowrap}.programming-languages-layer span>i{display:grid;width:5mm;height:5mm;flex:0 0 5mm;place-items:center;font-style:normal}.programming-languages-layer span>i svg{display:block;width:100%;height:100%}.programming-languages-layer span>b{font-weight:700}.programming-languages-layer span:nth-child(1){right:9mm;top:12mm}.programming-languages-layer span:nth-child(2){right:31mm;top:23mm}.programming-languages-layer span:nth-child(3){right:7mm;top:38mm}.programming-languages-layer span:nth-child(4){right:26mm;top:52mm}.programming-languages-layer span:nth-child(5){right:8mm;top:68mm}.programming-languages-layer span:nth-child(6){left:8mm;bottom:77mm}.programming-languages-layer span:nth-child(7){left:25mm;bottom:62mm}.programming-languages-layer span:nth-child(8){left:7mm;bottom:47mm}.programming-languages-layer span:nth-child(9){left:31mm;bottom:33mm}.programming-languages-layer span:nth-child(10){left:8mm;bottom:18mm}.programming-languages-layer span:nth-child(11){left:51mm;bottom:13mm}.programming-languages-layer span:nth-child(12){right:8mm;bottom:16mm}.programming-languages-layer span:nth-child(13){right:26mm;bottom:31mm}.programming-languages-layer span:nth-child(14){right:8mm;bottom:47mm}
  .rule{height:4px;background:var(--accent);margin-bottom:22mm}
  .kicker{color:var(--accent);font-size:10pt;text-transform:uppercase;letter-spacing:.16em;font-weight:700}
  h1,h2,h3{font-family:var(--heading-font);font-weight:var(--heading-weight)}h1{font-size:29pt;line-height:1.05;margin:8mm 0 4mm}h2{font-size:14pt;color:var(--accent);margin:8mm 0 3mm}
  h3{font-size:11pt;margin:0 0 1mm}.muted{color:var(--muted)}p,li{font-size:var(--body-size);line-height:var(--body-line)}
  .cover-content{display:flex;flex-direction:column;justify-content:flex-end}.cover-content h1{font-size:36pt;max-width:145mm}
  .contact{padding-top:8mm;border-top:1px solid var(--line)}.sender{margin-bottom:2mm;color:var(--muted);text-align:center}.sender-name,.sender-title,.sender-contact{display:block}.sender-name{color:var(--ink);font-size:11pt;font-weight:700;line-height:1.2}.sender-title{margin-top:.8mm;color:var(--accent);font-size:11pt;font-weight:700;line-height:1.2}.sender-contact{margin-top:.8mm;font-size:11pt;line-height:1.25}
  .recipient{margin-top:12mm;min-height:36mm;font-size:11pt;line-height:1.42}.date{text-align:right}.subject{color:var(--accent);font-weight:800;font-size:14pt;margin:8mm 0 5mm}
  .signature{display:flex;flex-direction:column;align-items:flex-start;margin-top:8mm}.signature p{margin:0;font-size:11pt}.signature-image{display:block;width:auto;max-width:48mm;height:auto;max-height:14mm;margin:1mm 0 .5mm;object-fit:contain;object-position:left center}.signature-name{font-size:11pt;font-weight:400;line-height:1.2}
  .letter-content{padding:var(--doc-margin)}.letter-content>p:not(.subject){font-size:11pt;line-height:1.42}.letter-content>p:not(.date,.subject){margin:0 0 calc(var(--section-gap) * .72)}.letter-content .signature{font-size:11pt;line-height:1.42}.letter-body{text-align:justify;text-justify:inter-word;hyphens:auto;overflow-wrap:break-word}
  .letter-page.layout-split-clean .rule{height:2px}.letter-page.layout-sidebar-left .letter-content{padding-left:calc(var(--doc-margin) + 7mm);border-left:5mm solid var(--secondary)}.letter-page.layout-sidebar-right .letter-content{padding-right:calc(var(--doc-margin) + 7mm);border-right:5mm solid var(--secondary)}.letter-page.layout-bold-grid .rule{height:7mm}.letter-page.layout-timeline .subject{padding-left:3mm;border-left:1mm solid var(--accent)}.letter-page.layout-minimal .rule{height:1px;background:var(--line)}
  .letter-compact .letter-content{padding:16mm 20mm}.letter-compact .rule{margin-bottom:15mm}.letter-compact .recipient{margin-top:10mm;min-height:30mm}.letter-compact .letter-content>p:not(.subject){font-size:11pt;line-height:1.38}.letter-compact .signature{margin-top:6mm}
  .letter-dense .letter-content{padding:14mm 18mm}.letter-dense .rule{height:3px;margin-bottom:10mm}.letter-dense .recipient{margin-top:7mm;min-height:24mm;font-size:11pt}.letter-dense .letter-content>p:not(.subject){font-size:11pt;line-height:1.32}.letter-dense .letter-content>p:not(.date,.subject){margin-bottom:2.6mm}.letter-dense .subject{margin:5mm 0 3mm}.letter-dense .signature{margin-top:4mm}
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
}, Sl = "\n  .elegant-pdf{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;--elegant-sidebar-muted:#f6eaea;display:grid;grid-template-columns:minmax(0,140mm) 70mm;width:100%;height:100%;color:var(--elegant-text);background:#fff;font-family:var(--body-font)}\n  .elegant-pdf *{box-sizing:border-box}\n  .elegant-pdf-main{position:relative;min-width:0;height:100%;padding:max(14mm,calc(var(--doc-margin) - 2mm)) max(10mm,calc(var(--doc-margin) - 6mm)) max(13mm,calc(var(--doc-margin) - 4mm)) var(--doc-margin);overflow:hidden;background:#fff}\n  .elegant-pdf-header{position:relative;padding-bottom:0}\n  .elegant-pdf-header-compact{padding-bottom:3.2mm;border-bottom:.3mm solid var(--elegant-line)}\n  .elegant-pdf-header .kicker{margin:0 0 2.2mm;color:var(--accent);font-size:7.7pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}\n  .elegant-pdf-header h1{margin:0;color:var(--elegant-heading);font-size:22pt;font-weight:500;letter-spacing:.01em;line-height:1.05;text-transform:uppercase;overflow-wrap:anywhere}\n  .elegant-pdf-header h2{margin:2mm 0 0;color:var(--accent);font-size:12pt;font-weight:400;line-height:1.25;overflow-wrap:anywhere}\n  .elegant-pdf-contacts{display:flex;flex-wrap:wrap;gap:1.2mm 3.5mm;margin:3.3mm 0 0;color:var(--elegant-text);font-size:8pt;font-style:normal;line-height:1.3}\n  .elegant-pdf-contacts a,.elegant-pdf-contacts>span{display:inline-flex;align-items:baseline;gap:1mm;min-width:0;color:inherit;text-decoration:none}\n  .elegant-pdf-contacts i{color:var(--elegant-line);font-size:9pt;font-style:normal}\n  .elegant-pdf-contacts span{min-width:0;overflow-wrap:anywhere}\n  .elegant-pdf-section{margin-top:var(--section-gap)}\n  .elegant-pdf-section>h3,.elegant-pdf-ats .knowledge-section>h3{display:block;margin:0 0 3.2mm;padding-bottom:1.5mm;border-bottom:.3mm solid var(--elegant-line);color:var(--elegant-heading);font-size:12pt;font-weight:500;letter-spacing:.055em;line-height:1.1;text-transform:uppercase}\n  .elegant-pdf-list{display:flex;flex-direction:column;gap:5mm}\n  .elegant-pdf-entry{break-inside:avoid;page-break-inside:avoid}\n  .elegant-pdf-entry-head{display:grid;grid-template-columns:minmax(0,1fr) max-content;gap:5mm;align-items:start}\n  .elegant-pdf-entry-head h4{margin:0;color:var(--elegant-heading);font-family:var(--heading-font);font-size:11pt;font-weight:500;line-height:1.2;overflow-wrap:anywhere}\n  .elegant-pdf-entry-head p{margin:.8mm 0 0;color:var(--accent);font-size:11pt;font-weight:400;line-height:1.2;overflow-wrap:anywhere}\n  .elegant-pdf-entry-meta{min-width:24mm;color:var(--elegant-muted);font-size:8pt;line-height:1.3;text-align:right}\n  .elegant-pdf-entry-meta strong,.elegant-pdf-entry-meta span{display:block}\n  .elegant-pdf-entry-meta span{margin-top:.6mm;overflow-wrap:anywhere}\n  .elegant-pdf-entry ul{margin:1.8mm 0 0;padding-left:4.5mm}\n  .elegant-pdf-entry li{margin:.6mm 0;padding-left:.4mm;color:var(--elegant-text);font-size:var(--body-size);line-height:var(--body-line)}\n  .elegant-pdf-entry li::marker{color:var(--accent)}\n  .elegant-pdf-sidebar{position:relative;display:flex;flex-direction:column;gap:var(--section-gap);min-width:0;height:100%;padding:max(13mm,calc(var(--doc-margin) - 3mm)) max(12mm,calc(var(--doc-margin) - 5mm));overflow:hidden;color:#fff;background:var(--secondary);box-shadow:inset 0 3.5mm 0 #600101}\n  .elegant-pdf-photo{display:block;width:27mm;height:27mm;margin:0 auto 8mm;overflow:hidden;border-radius:1.5mm;background:color-mix(in srgb,var(--secondary),white 12%);object-fit:cover}\n  .elegant-pdf-sidebar section{margin:0;break-inside:avoid;page-break-inside:avoid}\n  .elegant-pdf-sidebar section>h3{position:relative;margin:0 0 2.4mm;padding-bottom:1.6mm;border-bottom:.3mm solid rgb(255 255 255 / 75%);color:#fff;font-size:11.5pt;font-weight:400;letter-spacing:.075em;line-height:1.15;text-transform:uppercase}\n  .elegant-pdf-sidebar section p,.elegant-pdf-sidebar section li{color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line)}\n  .elegant-pdf-sidebar section p{margin:0}\n  .elegant-pdf-sidebar section ul{margin:0;padding-left:4mm}\n  .elegant-pdf-sidebar .knowledge-category{margin-bottom:2.5mm}\n  .elegant-pdf-sidebar .knowledge-category h4,.elegant-pdf-sidebar .knowledge-subcategory h5{color:#fff;font-size:8.7pt}\n  .elegant-pdf-sidebar .knowledge-tags span{border-color:color-mix(in srgb,white,transparent 50%);color:#fff}\n  .elegant-pdf-strengths{display:grid;gap:3mm}\n  .elegant-pdf-strength{display:grid;grid-template-columns:6mm minmax(0,1fr);gap:2mm;align-items:start}\n  .elegant-pdf-strength i{color:#fff;font-size:11pt;font-style:normal;line-height:1}\n  .elegant-pdf-strength h4{margin:0 0 1.2mm;color:#fff;font-size:10pt;font-weight:400;line-height:1.2}\n  .elegant-pdf-strength p{margin:0;color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line);overflow-wrap:anywhere}\n  .elegant-pdf-languages{display:grid;gap:3mm}\n  .elegant-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1.8mm;align-items:center;color:var(--elegant-sidebar-muted)}\n  .elegant-pdf-language strong{color:#fff;font-size:var(--body-size);font-weight:400}\n  .elegant-pdf-language span{font-size:8pt}\n  .elegant-pdf-language-dots{display:flex;gap:.8mm}\n  .elegant-pdf-language-dots i{display:block;width:1.5mm;height:1.5mm;border-radius:50%;background:rgb(255 255 255 / 28%)}\n  .elegant-pdf-language-dots i.filled{background:#fff}\n  .elegant-pdf-continuation .kicker{color:var(--accent);font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}\n  .elegant-pdf-continuation h2{margin:3.5mm 0 0;color:#fff;font-size:18pt;line-height:1.05;overflow-wrap:anywhere}\n  .elegant-pdf-continuation p{margin:1.8mm 0 0;color:var(--elegant-sidebar-muted)}\n  .elegant-pdf-continuation hr{width:18mm;height:.6mm;margin:6mm 0;border:0;background:var(--accent)}\n  .elegant-pdf-continuation a{display:block;margin-top:1.7mm;color:#fff;font-size:8.3pt;text-decoration:none;overflow-wrap:anywhere}\n  .elegant-pdf-footer{position:absolute;right:max(10mm,calc(var(--doc-margin) - 6mm));bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;color:var(--elegant-muted);font-size:7.2pt}\n  .elegant-pdf-footer a{color:var(--accent);text-decoration:none}\n  .elegant-pdf-footer span:last-child{margin-left:auto}\n  .elegant-pdf-ats{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--elegant-text);background:#fff}\n  .elegant-pdf-ats .elegant-pdf-contacts{display:block}\n  .elegant-pdf-ats .elegant-pdf-contacts a,.elegant-pdf-ats .elegant-pdf-contacts span{display:block;margin-top:.8mm}\n  .elegant-pdf-ats .elegant-pdf-entry-head{display:block}\n  .elegant-pdf-ats .elegant-pdf-entry-meta{margin-top:.8mm;text-align:left}\n  .elegant-pdf-ats .elegant-pdf-entry-meta strong,.elegant-pdf-ats .elegant-pdf-entry-meta span{display:inline}\n  .elegant-pdf-ats .elegant-pdf-entry-meta span:before{content:\" · \"}\n  .elegant-pdf-ats .knowledge-section{margin-top:var(--section-gap)}\n  .elegant-pdf-ats .knowledge-category h4,.elegant-pdf-ats .knowledge-subcategory h5{color:var(--elegant-heading)}\n", Cl = "\n  .zweispaltig-pdf{--zweispaltig-primary:var(--accent);--zweispaltig-accent:var(--secondary);--zweispaltig-heading:var(--accent);--zweispaltig-text:#4a555c;--zweispaltig-muted:#667178;--zweispaltig-divider:#d6dce0;--zweispaltig-section-gap:max(6.5mm,var(--section-gap));--zweispaltig-entry-gap:3.5mm;position:relative;width:100%;height:100%;padding:max(16mm,calc(var(--doc-margin) - 1mm)) var(--doc-margin) max(13mm,calc(var(--doc-margin) - 4mm));overflow:hidden;color:var(--zweispaltig-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}\n  .zweispaltig-pdf *{box-sizing:border-box}\n  .zweispaltig-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:8mm;min-width:0}\n  .zweispaltig-pdf-header h1{margin:0;color:var(--zweispaltig-heading);font-size:24pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}\n  .zweispaltig-pdf-header h2{display:flex;flex-wrap:wrap;gap:0 1.8mm;margin:1.5mm 0 0;color:var(--zweispaltig-accent);font-size:11.5pt;font-weight:700;letter-spacing:0;line-height:1.2;overflow-wrap:anywhere}\n  .zweispaltig-pdf-header h2 span+span:before{margin-right:1.8mm;color:var(--zweispaltig-accent);content:\"|\"}\n  .zweispaltig-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1.1mm 8mm;width:100%;max-width:132mm;margin:2.2mm 0 0;color:var(--zweispaltig-text);font-size:7.8pt;font-style:normal;line-height:1.2}\n  .zweispaltig-pdf-contacts a,.zweispaltig-pdf-contacts>span{display:grid;grid-template-columns:3.2mm minmax(0,1fr);align-items:center;gap:1.1mm;min-width:0;color:inherit;text-decoration:none}\n  .zweispaltig-pdf-contacts svg{width:3mm;height:3mm;color:var(--zweispaltig-accent);fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.4}\n  .zweispaltig-pdf-contacts a>span,.zweispaltig-pdf-contacts>span>span{min-width:0;overflow-wrap:anywhere}\n  .zweispaltig-pdf-contacts [data-contact-kind=\"linkedin\"]>span,.zweispaltig-pdf-contacts [data-contact-kind=\"github\"]>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}\n  .zweispaltig-pdf-photo{display:block;width:30mm;height:30mm;overflow:hidden;border:.35mm solid color-mix(in srgb,var(--zweispaltig-primary),white 25%);border-radius:50%;background:#eaf5fd;object-fit:cover}\n  .zweispaltig-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.5mm 4mm;padding-bottom:3.5mm}\n  .zweispaltig-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--accent);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}\n  .zweispaltig-pdf-header.compact h1{font-size:15pt}\n  .zweispaltig-pdf-header.compact h2{margin:0;color:var(--zweispaltig-muted);font-size:8.6pt}\n  .zweispaltig-pdf-columns{display:grid;grid-template-columns:minmax(0,62fr) minmax(0,38fr);column-gap:11mm;min-width:0}\n  .zweispaltig-pdf-columns.continuation{grid-template-columns:minmax(0,1fr)}\n  .zweispaltig-pdf-main,.zweispaltig-pdf-sidebar{min-width:0}\n  .zweispaltig-pdf-section,.zweispaltig-pdf-sidebar>section,.zweispaltig-pdf-sidebar>.knowledge-section{min-width:0;margin-top:var(--zweispaltig-section-gap);break-inside:avoid;page-break-inside:avoid}\n  .zweispaltig-pdf-section>h3,.zweispaltig-pdf-sidebar section>h3,.zweispaltig-pdf-ats section>h3,.zweispaltig-pdf-ats .knowledge-section>h3{margin:0 0 2.5mm;padding-bottom:1mm;border-bottom:.65mm solid var(--zweispaltig-heading);color:var(--zweispaltig-heading);font-size:14pt;font-weight:750;letter-spacing:.015em;line-height:1;text-transform:uppercase}\n  .zweispaltig-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}\n  .zweispaltig-pdf-list{display:flex;flex-direction:column;gap:var(--zweispaltig-entry-gap)}\n  .zweispaltig-pdf-entry{min-width:0;padding-bottom:3mm;border-bottom:.25mm dashed var(--zweispaltig-divider);break-inside:avoid;page-break-inside:avoid}\n  .zweispaltig-pdf-entry:last-child{padding-bottom:0;border-bottom:0}\n  .zweispaltig-pdf-entry h4{margin:0;color:var(--zweispaltig-heading);font-size:11.5pt;font-weight:600;line-height:1.18;overflow-wrap:anywhere}\n  .zweispaltig-pdf-entry-organization{margin:.7mm 0 0;color:var(--zweispaltig-accent);font-size:9.5pt;font-weight:750;line-height:1.18;overflow-wrap:anywhere}\n  .zweispaltig-pdf-entry-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 0;color:var(--zweispaltig-muted);font-size:7.8pt;line-height:1.2}\n  .zweispaltig-pdf-entry-meta span{display:inline-flex;align-items:center;gap:1mm}\n  .zweispaltig-pdf-entry-meta svg{width:2.8mm;height:2.8mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3}\n  .zweispaltig-pdf-entry ul,.zweispaltig-pdf-sidebar ul,.zweispaltig-pdf-ats ul{margin:1.5mm 0 0;padding-left:4.5mm}\n  .zweispaltig-pdf-entry li,.zweispaltig-pdf-sidebar li,.zweispaltig-pdf-ats li{margin:.5mm 0;padding-left:.3mm;hyphens:auto;overflow-wrap:break-word}\n  .zweispaltig-pdf-entry li::marker,.zweispaltig-pdf-sidebar li::marker,.zweispaltig-pdf-ats li::marker{color:var(--zweispaltig-primary)}\n  .zweispaltig-pdf-sidebar .knowledge-category{margin-bottom:2.3mm}\n  .zweispaltig-pdf-sidebar .knowledge-category h4,.zweispaltig-pdf-sidebar .knowledge-subcategory h5{color:var(--zweispaltig-heading);font-size:8.4pt}\n  .zweispaltig-pdf-sidebar .knowledge-section p,.zweispaltig-pdf-sidebar .knowledge-section li{font-size:var(--body-size);line-height:var(--body-line)}\n  .zweispaltig-pdf-strengths{display:grid}\n  .zweispaltig-pdf-strength{display:grid;grid-template-columns:7mm minmax(0,1fr);align-items:start;gap:2mm;padding:0 0 3mm;margin-bottom:3mm;border-bottom:.25mm dashed var(--zweispaltig-divider)}\n  .zweispaltig-pdf-strength:last-child{margin-bottom:0;padding-bottom:0;border-bottom:0}\n  .zweispaltig-pdf-strength>svg{width:5.5mm;height:5.5mm;color:var(--zweispaltig-accent);fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2}\n  .zweispaltig-pdf-strength h4{margin:0;color:var(--zweispaltig-heading);font-size:9.5pt;font-weight:750;line-height:1.2;overflow-wrap:anywhere}\n  .zweispaltig-pdf-strength p{margin:1.5mm 0 0;color:var(--zweispaltig-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .zweispaltig-pdf-languages{display:grid;gap:2.5mm}\n  .zweispaltig-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:3mm}\n  .zweispaltig-pdf-language h4{margin:0;color:var(--zweispaltig-heading);font-size:8.8pt;font-weight:750;line-height:1.15}\n  .zweispaltig-pdf-language-dots{display:flex;gap:.8mm}\n  .zweispaltig-pdf-language-dots i{display:block;width:2.5mm;height:2.5mm;border-radius:50%;background:var(--zweispaltig-divider)}\n  .zweispaltig-pdf-language-dots i.filled{background:var(--zweispaltig-accent)}\n  .zweispaltig-pdf-footer{position:absolute;right:var(--doc-margin);bottom:6mm;left:var(--doc-margin);display:flex;align-items:center;justify-content:space-between;gap:6mm;color:var(--zweispaltig-muted);font-size:7pt;line-height:1.2}\n  .zweispaltig-pdf-footer a{color:var(--zweispaltig-heading);text-decoration:none;overflow-wrap:anywhere}\n  .zweispaltig-pdf-footer span:last-child{margin-left:auto}\n  .zweispaltig-pdf[data-density=\"compact\"]{--zweispaltig-section-gap:max(4mm,calc(var(--section-gap) - 1mm));--zweispaltig-entry-gap:3mm}\n  .zweispaltig-pdf[data-density=\"dense\"]{--zweispaltig-section-gap:max(3.2mm,calc(var(--section-gap) - 2mm));--zweispaltig-entry-gap:2.4mm;padding-top:max(11mm,calc(var(--doc-margin) - 6mm))}\n  .zweispaltig-pdf[data-density=\"dense\"] .zweispaltig-pdf-header h1{font-size:21pt}\n  .zweispaltig-pdf-ats{--zweispaltig-heading:#263641;--zweispaltig-text:#303c44;--zweispaltig-divider:#c8d0d6;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--zweispaltig-text);background:#fff}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-header{display:block}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts{display:block}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts a,.zweispaltig-pdf-ats .zweispaltig-pdf-contacts span{display:block;margin-top:.7mm}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts strong{margin-right:1.3mm}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta{margin-top:.7mm;text-align:left}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta svg{display:none}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta span+span:before{content:\" · \"}\n  .zweispaltig-pdf-ats .zweispaltig-pdf-section>h3,.zweispaltig-pdf-ats section>h3,.zweispaltig-pdf-ats .knowledge-section>h3{border-bottom-color:var(--zweispaltig-divider)}\n", wl = "\n  .zeit-pdf{--zeit-dark:#075e4e;--zeit-soft:#cbeccd;--zeit-pale:#e5f5ec;--zeit-heading:#374247;--zeit-text:#434d52;--zeit-muted:#687277;--zeit-divider:#d5deda;position:relative;width:100%;height:100%;padding:max(15mm,calc(var(--doc-margin) - 2mm)) var(--doc-margin) max(14mm,calc(var(--doc-margin) - 3mm));overflow:hidden;color:var(--zeit-text);background:#fff;font-family:var(--body-font)}\n  .zeit-pdf *{box-sizing:border-box}\n  .zeit-pdf-header{display:grid;grid-template-columns:minmax(0,28.4%) minmax(0,6.25%) minmax(0,65.35%);min-height:36.5mm;margin-bottom:1.5mm}\n  .zeit-pdf-identity{grid-column:3;min-width:0;padding-top:4mm}\n  .zeit-pdf-identity h1{margin:0;color:var(--zeit-heading);font-size:25pt;font-weight:350;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}\n  .zeit-pdf-identity h2{display:inline-block;width:100%;max-width:100%;margin:4mm 0 0;padding:2.6mm 4mm;border-radius:3.8mm;color:var(--zeit-dark);background:var(--zeit-soft);font-size:12.5pt;font-weight:600;letter-spacing:.045em;line-height:1.15;text-transform:uppercase;overflow-wrap:anywhere}\n  .zeit-pdf-photo-composition{position:relative;grid-column:1;width:50mm;max-width:100%;height:42mm}\n  .zeit-pdf-photo-composition span{position:absolute;display:block}\n  .zeit-pdf-photo-pale{top:1mm;left:0;width:42mm;height:39mm;border-radius:48% 52% 45% 55%/57% 40% 60% 43%;background:var(--zeit-pale);transform:rotate(-13deg)}\n  .zeit-pdf-photo-soft{top:-2mm;right:0;width:31mm;height:30mm;border-radius:58% 42% 62% 38%/44% 62% 38% 56%;background:color-mix(in srgb,var(--zeit-soft),var(--accent) 15%);transform:rotate(17deg)}\n  .zeit-pdf-photo-accent{right:2mm;bottom:0;width:24mm;height:23mm;border-radius:54% 46% 44% 56%/41% 55% 45% 59%;background:var(--accent);opacity:.92;transform:rotate(-11deg)}\n  .zeit-pdf-photo{position:absolute;top:3mm;left:5mm;z-index:2;display:block;width:36mm;height:36mm;border:1.8mm solid #fff;border-radius:50%;object-fit:cover}\n  .zeit-pdf-header.no-photo{min-height:29mm}.zeit-pdf-header.no-photo .zeit-pdf-identity{grid-column:1/-1;padding-top:0}\n  .zeit-pdf-header.compact{display:block;min-height:auto;margin-bottom:5mm;padding-bottom:3mm;border-bottom:.35mm solid var(--zeit-divider)}\n  .zeit-pdf-header.compact .zeit-pdf-identity{padding:0}.zeit-pdf-header.compact .kicker{margin:0 0 1.5mm;color:var(--zeit-dark);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}\n  .zeit-pdf-header.compact h1{font-size:15pt;font-weight:600}.zeit-pdf-header.compact h2{margin:0 0 0 3mm;padding:0;color:var(--zeit-muted);background:transparent;font-size:8.5pt}\n  .zeit-pdf-columns{position:relative;display:grid;grid-template-columns:minmax(0,28.4%) minmax(0,6.25%) minmax(0,65.35%)}\n  .zeit-pdf-columns:before{display:none}\n  .zeit-pdf-columns.continuation{display:block}.zeit-pdf-columns.continuation:before{display:none}\n  .zeit-pdf-left{grid-column:1;min-width:0;padding-top:12mm}.zeit-pdf-main{grid-column:3;min-width:0}\n  .zeit-pdf-section,.zeit-pdf-left>section{margin-top:var(--section-gap);break-inside:avoid;page-break-inside:avoid}\n  .zeit-pdf-left>section:first-child,.zeit-pdf-main>.zeit-pdf-section:first-child{margin-top:0}\n  .zeit-pdf-heading{display:flex;align-items:center;gap:2mm;margin:0 0 3mm}\n  .zeit-pdf-heading i{display:grid;flex:none;width:6.5mm;height:6.5mm;place-items:center;border-radius:1.5mm;color:var(--zeit-dark);background:var(--zeit-soft);font-style:normal}\n  .zeit-pdf-heading i svg{width:4mm;height:4mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.9}\n  .zeit-pdf-heading h3{margin:0;color:var(--zeit-dark);font-size:11pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}\n  .zeit-pdf-summary{margin:0;color:var(--zeit-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .zeit-pdf-contacts{display:grid;gap:2.3mm}\n  .zeit-pdf-contact{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;min-width:0;color:inherit;font-size:7.7pt;letter-spacing:-.01em;line-height:1.28;text-decoration:none}\n  .zeit-pdf-contact i{display:grid;place-items:start center;color:var(--accent);font-style:normal}.zeit-pdf-contact i svg{width:3.8mm;height:3.8mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5}.zeit-pdf-contact span{overflow-wrap:anywhere}\n  .zeit-pdf-strengths{display:grid;gap:4.5mm}.zeit-pdf-strength{display:grid;grid-template-columns:3.5mm minmax(0,1fr);gap:1.5mm;align-items:start}\n  .zeit-pdf-strength>i{width:2mm;height:2mm;margin-top:1.2mm;border-radius:50%;background:var(--accent)}.zeit-pdf-strength h4{margin:0;color:var(--zeit-heading);font-size:9.5pt;font-weight:700;line-height:1.2;overflow-wrap:anywhere}.zeit-pdf-strength p{margin:1.2mm 0 0;color:var(--zeit-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .zeit-pdf-languages{display:grid;gap:3mm}.zeit-pdf-language>div{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:1.5mm;min-width:0}.zeit-pdf-language h4{margin:0;color:var(--zeit-dark);font-size:8.8pt;font-weight:750;line-height:1.15;text-transform:uppercase;overflow-wrap:anywhere}\n  .zeit-pdf-dots{display:flex;gap:.7mm}.zeit-pdf-dots i{display:block;width:1.35mm;height:1.35mm;border:.25mm solid var(--zeit-muted);border-radius:50%}.zeit-pdf-dots i.filled{border-color:var(--zeit-dark);background:var(--zeit-dark)}\n  .zeit-pdf-list{display:flex;flex-direction:column;gap:5mm}.zeit-pdf-entry{break-inside:avoid;page-break-inside:avoid}\n  .zeit-pdf-entry-top,.zeit-pdf-entry-role{display:grid;grid-template-columns:minmax(0,1fr) minmax(25mm,35mm);gap:5mm;align-items:start}\n  .zeit-pdf-entry-top h4,.zeit-pdf-entry-role h5{margin:0;overflow-wrap:anywhere}.zeit-pdf-entry-top h4{color:var(--zeit-heading);font-size:10.5pt;font-weight:750;line-height:1.2}\n  .zeit-pdf-entry-top span,.zeit-pdf-entry-role span{color:var(--zeit-muted);font-size:7.8pt;line-height:1.2;text-align:right;overflow-wrap:anywhere}\n  .zeit-pdf-entry-role{margin-top:.8mm}.zeit-pdf-entry-role h5{color:var(--zeit-heading);font-size:9.2pt;font-weight:400;line-height:1.2}\n  .zeit-pdf-entry ul,.zeit-pdf-left ul,.zeit-pdf-ats ul{margin:1.5mm 0 0;padding-left:4.5mm}.zeit-pdf-entry li,.zeit-pdf-left li,.zeit-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.zeit-pdf-entry li::marker,.zeit-pdf-left li::marker,.zeit-pdf-ats li::marker{color:var(--accent)}\n  .zeit-pdf-footer{position:absolute;right:var(--doc-margin);bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;color:var(--zeit-muted);font-size:7.2pt}.zeit-pdf-footer a{color:var(--zeit-dark);text-decoration:none}.zeit-pdf-footer span:last-child{margin-left:auto}\n  .zeit-pdf-ats{--zeit-dark:#075e4e;--zeit-heading:#263a35;--zeit-text:#303c39;--zeit-muted:#687277;--zeit-divider:#ccd6d2;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--zeit-text);background:#fff}\n  .zeit-pdf-ats .zeit-pdf-header{display:block;min-height:auto;margin:0;padding-bottom:4mm;border-bottom:.35mm solid var(--zeit-divider)}.zeit-pdf-ats .zeit-pdf-identity{padding:0}.zeit-pdf-ats .zeit-pdf-identity h1{font-size:20pt;font-weight:600}.zeit-pdf-ats .zeit-pdf-identity h2{margin:1.5mm 0 0;padding:0;background:transparent;font-size:10pt}\n  .zeit-pdf-ats-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 5mm;margin-top:3mm;font-size:7.8pt;font-style:normal}.zeit-pdf-ats-contacts a,.zeit-pdf-ats-contacts span{color:inherit;text-decoration:none;overflow-wrap:anywhere}\n  .zeit-pdf-ats .zeit-pdf-heading i{display:none}.zeit-pdf-ats .zeit-pdf-heading{gap:0;padding-bottom:1.4mm;border-bottom:.45mm solid var(--zeit-divider)}\n  .zeit-pdf-ats>section,.zeit-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.zeit-pdf-ats>section>h3,.zeit-pdf-ats .knowledge-section>h3{margin:0 0 3mm;padding-bottom:1.4mm;border-bottom:.45mm solid var(--zeit-divider);color:var(--zeit-dark);font-size:11pt;font-weight:750;text-transform:uppercase}\n", Tl = "\n  .kreativ-pdf{--kreativ-dark:#075d4e;--kreativ-text:#465156;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;--kreativ-light:#d7dfdc;--kreativ-inactive:#e1e5e3;--kreativ-margin:calc(var(--doc-margin) + 1mm);--kreativ-column-gap:11mm;--kreativ-section-gap:var(--section-gap);--kreativ-entry-gap:4.5mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--kreativ-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}\n  .kreativ-pdf *{box-sizing:border-box}\n  .kreativ-pdf-header{position:relative;z-index:3;display:grid;grid-template-columns:minmax(0,1fr) 28mm;align-items:center;gap:10mm;width:100%;height:46mm;padding:12mm var(--kreativ-margin) 6mm;color:#fff;background:var(--accent)}\n  .kreativ-pdf-identity{min-width:0}.kreativ-pdf-identity h1{margin:0;color:inherit;font-size:23pt;font-weight:750;letter-spacing:.015em;line-height:1;overflow-wrap:anywhere}.kreativ-pdf-identity h2{margin:1.5mm 0 0;color:inherit;font-size:11.5pt;font-weight:650;line-height:1.15;overflow-wrap:anywhere}\n  .kreativ-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1mm 8mm;width:100%;max-width:132mm;margin:2.2mm 0 0;font-size:7.8pt;font-style:normal;line-height:1.15}.kreativ-pdf-contacts a,.kreativ-pdf-contacts>span{display:grid;grid-template-columns:3.2mm minmax(0,1fr);align-items:center;gap:1.1mm;min-width:0;color:inherit;text-decoration:none}.kreativ-pdf-contacts svg{width:3mm;height:3mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.4}.kreativ-pdf-contacts i{min-width:0;font-style:normal;overflow-wrap:anywhere}.kreativ-pdf-contacts [data-contact-kind=\"linkedin\"] i{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}\n  .kreativ-pdf-photo{display:block;width:28mm;height:28mm;overflow:hidden;border-radius:1.8mm;background:rgba(255,255,255,.18);object-fit:cover}\n  .kreativ-pdf-header.no-photo{grid-template-columns:minmax(0,1fr)}\n  .kreativ-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.5mm 4mm;height:auto;min-height:24mm;padding:12mm var(--kreativ-margin) 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}\n  .kreativ-pdf-header.compact .kreativ-pdf-identity{display:contents}.kreativ-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--accent);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.kreativ-pdf-header.compact h1{font-size:15pt}.kreativ-pdf-header.compact h2{margin:0;color:var(--kreativ-muted);font-size:8.7pt}\n  .kreativ-pdf-background{position:absolute;top:46mm;right:-9mm;z-index:1;width:78mm;height:78mm;fill:none;stroke:color-mix(in srgb,var(--accent),transparent 85%);stroke-width:.9;pointer-events:none}.kreativ-pdf-background .wide{stroke-dasharray:1.2 1.5}.kreativ-pdf-background .tight{stroke-dasharray:.8 1.2}\n  .kreativ-pdf-content{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,105fr) minmax(0,64fr);column-gap:var(--kreativ-column-gap);align-items:start;padding:10mm var(--kreativ-margin) max(13mm,calc(var(--kreativ-margin) - 2mm))}\n  .kreativ-pdf-content.continuation{display:block;padding-top:7mm}.kreativ-pdf-left{grid-column:1;min-width:0}.kreativ-pdf-right{position:relative;grid-column:2;min-width:0}\n  .kreativ-pdf-section,.kreativ-pdf-right>section{margin:0 0 var(--kreativ-section-gap);break-inside:avoid;page-break-inside:avoid}\n  .kreativ-pdf-title,.kreativ-pdf-right section>h3,.kreativ-pdf-ats>section>h3,.kreativ-pdf-ats .knowledge-section>h3{margin:0 0 3.5mm;padding-bottom:1.2mm;border-bottom:.65mm solid var(--kreativ-dark);color:var(--kreativ-dark);font-family:var(--heading-font);font-size:14pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase}\n  .kreativ-pdf-summary{margin:0;color:var(--kreativ-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .kreativ-pdf-list{display:flex;flex-direction:column;gap:var(--kreativ-entry-gap)}.kreativ-pdf-entry{padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light);break-inside:avoid;page-break-inside:avoid}.kreativ-pdf-entry:last-child{padding-bottom:0;border-bottom:0}\n  .kreativ-pdf-entry h4,.kreativ-pdf-entry h5{margin:0;overflow-wrap:anywhere}.kreativ-pdf-entry h4{color:var(--kreativ-dark);font-size:11pt;font-weight:600;line-height:1.15}.kreativ-pdf-entry h5{margin-top:1mm;color:var(--accent);font-size:9.5pt;font-weight:750;line-height:1.2}\n  .kreativ-pdf-entry-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm;color:var(--kreativ-muted);font-size:7.8pt;line-height:1.2}.kreativ-pdf-entry-meta span+span:before{margin-right:1.5mm;color:var(--accent);content:\"·\"}\n  .kreativ-pdf-entry ul,.kreativ-pdf-right ul,.kreativ-pdf-ats ul{margin:0;padding-left:4.5mm}.kreativ-pdf-entry li,.kreativ-pdf-right li,.kreativ-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.kreativ-pdf-entry li::marker,.kreativ-pdf-right li::marker,.kreativ-pdf-ats li::marker{color:var(--accent)}\n  .kreativ-pdf-strengths{display:grid}.kreativ-pdf-strength{display:grid;grid-template-columns:7mm minmax(0,1fr);align-items:start;gap:2.5mm;min-width:0;margin-bottom:3mm;padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light)}.kreativ-pdf-strength:last-child{margin:0;padding:0;border:0}.kreativ-pdf-strength svg{width:5.5mm;height:5.5mm;color:var(--accent);fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2}.kreativ-pdf-strength i{display:grid;place-items:center;width:5.5mm;height:5.5mm;color:var(--accent);font-size:9pt;font-style:normal}.kreativ-pdf-strength h4,.kreativ-pdf-strength span{margin:0;color:var(--kreativ-dark);font-size:9.4pt;font-weight:750;line-height:1.2;overflow-wrap:anywhere}.kreativ-pdf-strength p{margin:1.5mm 0 0;color:var(--kreativ-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .kreativ-pdf-languages{display:grid;gap:3mm}.kreativ-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:2mm}.kreativ-pdf-language h4{margin:0;color:var(--kreativ-dark);font-size:8.8pt;font-weight:750;line-height:1.15}.kreativ-pdf-language>div{display:flex;align-items:center}.kreativ-pdf-dots{display:flex;gap:1mm}.kreativ-pdf-dots i{display:block;width:3.5mm;height:3.5mm;border-radius:50%;background:var(--kreativ-inactive)}.kreativ-pdf-dots i.filled{background:var(--accent)}\n  .kreativ-pdf-skills{display:flex;flex-wrap:wrap;gap:2.5mm 4mm}.kreativ-pdf-skill{max-width:100%;padding:0 1.5mm 1.2mm;border-bottom:.3mm solid var(--kreativ-divider);color:var(--kreativ-text);font-size:8.4pt;font-weight:700;overflow-wrap:anywhere}\n  .kreativ-pdf-footer{position:absolute;right:var(--kreativ-margin);bottom:6mm;left:var(--kreativ-margin);z-index:3;display:flex;justify-content:space-between;gap:6mm;color:var(--kreativ-muted);font-size:7.2pt}.kreativ-pdf-footer a{color:var(--kreativ-dark);text-decoration:none}.kreativ-pdf-footer span:last-child{margin-left:auto}\n  .kreativ-pdf-ats{--kreativ-dark:#173b33;--kreativ-text:#303d3a;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--kreativ-text);background:#fff}\n  .kreativ-pdf-ats .kreativ-pdf-header{display:block;height:auto;min-height:auto;padding:0 0 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}.kreativ-pdf-ats .kreativ-pdf-identity h1{font-size:20pt}.kreativ-pdf-ats .kreativ-pdf-identity h2{font-size:10pt}.kreativ-pdf-ats .kreativ-pdf-contacts{color:var(--kreativ-text)}\n  .kreativ-pdf-ats>section,.kreativ-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.kreativ-pdf-ats .knowledge-category h4,.kreativ-pdf-ats .knowledge-subcategory h5{color:var(--kreativ-dark)}\n  .kreativ-pdf[data-density=\"compact\"]{--kreativ-section-gap:max(5mm,calc(var(--section-gap) - 1mm));--kreativ-entry-gap:3.7mm}.kreativ-pdf[data-density=\"dense\"]{--kreativ-section-gap:max(3.7mm,calc(var(--section-gap) - 2mm));--kreativ-entry-gap:2.8mm}.kreativ-pdf[data-density=\"dense\"] .kreativ-pdf-header{height:42mm;padding-top:6mm;padding-bottom:5mm}.kreativ-pdf[data-density=\"dense\"] .kreativ-pdf-identity h1{font-size:21pt}.kreativ-pdf[data-density=\"dense\"] .kreativ-pdf-content{padding-top:6mm}\n", El = "\n  .ivy-pdf{--ivy-heading:var(--accent);--ivy-accent:var(--secondary);--ivy-text:#3f4b50;--ivy-muted:#667177;--ivy-divider:color-mix(in srgb,var(--accent),#0b459a 38%);--ivy-inactive:#dce9e8;--ivy-margin:var(--doc-margin);position:relative;width:100%;height:100%;overflow:hidden;color:var(--ivy-text);background:transparent;font-family:var(--body-font)}\n  .ivy-pdf *{box-sizing:border-box}.ivy-pdf-watercolor{position:absolute;inset:0;z-index:0;width:100%;height:100%;pointer-events:none}.ivy-pdf-content{position:relative;z-index:2;height:100%;padding:max(11mm,calc(var(--ivy-margin) - 1mm)) var(--ivy-margin) max(13mm,calc(var(--ivy-margin) + 1mm))}\n  .ivy-pdf-header{min-height:19mm;margin:0 0 5.5mm;text-align:center}.ivy-pdf-header .kicker{margin:0 0 1.2mm;color:var(--ivy-muted);font-size:7.2pt}.ivy-pdf-header h1{margin:0;color:var(--ivy-heading);font-family:Georgia,\"Times New Roman\",serif;font-size:17.5pt;font-weight:700;letter-spacing:.015em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.ivy-pdf-header h2{margin:1.5mm 0 1.3mm;color:var(--ivy-accent);font-size:11.5pt;font-weight:400;line-height:1.2;overflow-wrap:anywhere}\n  .ivy-pdf-contacts{display:flex;flex-wrap:wrap;justify-content:center;gap:.7mm 2.3mm;margin:0;color:var(--ivy-text);font-size:7.8pt;font-style:normal;line-height:1.25}.ivy-pdf-contacts a,.ivy-pdf-contacts span{color:inherit;text-decoration:none;overflow-wrap:anywhere}.ivy-pdf-contacts i{color:var(--ivy-text);font-style:normal}.ivy-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;min-height:auto;margin-bottom:5mm;padding-bottom:2.5mm;border-bottom:.3mm solid var(--ivy-divider);text-align:left}.ivy-pdf-header.compact .kicker{flex-basis:100%}.ivy-pdf-header.compact h1{font-size:14pt}.ivy-pdf-header.compact h2{max-width:96mm;margin:0;font-size:8.5pt;text-align:right}\n  .ivy-pdf-section,.ivy-pdf>.ivy-pdf-content>.knowledge-section{position:relative;z-index:2;min-width:0;margin:0 0 var(--section-gap)}.ivy-pdf-title,.ivy-pdf .knowledge-section>h3{position:relative;margin:0 0 2.5mm;padding:0 0 1.5mm;border-bottom:.3mm solid var(--ivy-divider);color:var(--ivy-heading);font-family:Georgia,\"Times New Roman\",serif;font-size:13.5pt;font-weight:700;line-height:1.05;text-align:center;text-transform:none;break-after:avoid;page-break-after:avoid}.ivy-pdf-summary{margin:0;color:var(--ivy-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}\n  .ivy-pdf-strengths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3.5mm 8mm}.ivy-pdf-strength{display:grid;grid-template-columns:5.5mm minmax(0,1fr);gap:1.5mm;min-width:0;break-inside:avoid}.ivy-pdf-strength i{color:var(--ivy-accent);font-size:13pt;font-style:normal;line-height:1}.ivy-pdf-strength h3{margin:0 0 .8mm;color:var(--ivy-heading);font-size:9.5pt;font-weight:600;line-height:1.15;overflow-wrap:anywhere}.ivy-pdf-strength p{margin:0;font-size:var(--body-size);line-height:var(--body-line)}\n  .ivy-pdf-list{display:flex;flex-direction:column;gap:4.5mm}.ivy-pdf-entry{min-width:0;break-inside:avoid;page-break-inside:avoid}.ivy-pdf-entry-top,.ivy-pdf-entry-role{display:grid;grid-template-columns:minmax(0,1fr) minmax(32mm,auto);gap:8mm;align-items:baseline}.ivy-pdf-entry h3,.ivy-pdf-entry h4{margin:0;overflow-wrap:anywhere}.ivy-pdf-entry-top h3{color:var(--ivy-accent);font-size:10.5pt;font-weight:500;line-height:1.15}.ivy-pdf-entry-top span,.ivy-pdf-entry-role span{color:var(--ivy-text);font-size:var(--body-size);line-height:1.2;text-align:right;overflow-wrap:anywhere}.ivy-pdf-entry-role{margin-top:.7mm}.ivy-pdf-entry-role h4{color:var(--ivy-heading);font-size:9.7pt;font-weight:500;line-height:1.18}.ivy-pdf-entry-role span{white-space:nowrap}\n  .ivy-pdf-entry ul,.ivy-pdf-certifications ul,.ivy-pdf-ats ul{margin:1.3mm 0 0;padding-left:4.5mm}.ivy-pdf-entry li,.ivy-pdf-certifications li,.ivy-pdf-ats li{margin:.35mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.ivy-pdf-entry li::marker,.ivy-pdf-certifications li::marker{color:var(--ivy-heading)}.ivy-pdf-education .ivy-pdf-list{gap:3.2mm}.ivy-pdf-knowledge{margin:0;overflow-wrap:anywhere}\n  .ivy-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 20mm}.ivy-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2mm;align-items:center;min-width:0}.ivy-pdf-language strong{color:var(--ivy-heading);font-weight:600}.ivy-pdf-dots{display:flex;gap:1mm}.ivy-pdf-dots i{display:block;width:2.1mm;height:2.1mm;border-radius:50%;background:var(--ivy-inactive)}.ivy-pdf-dots i.filled{background:var(--ivy-heading)}\n  .ivy-pdf-footer{position:absolute;right:var(--ivy-margin);bottom:6mm;left:var(--ivy-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--ivy-muted);font-size:7.1pt}.ivy-pdf-footer a{color:var(--ivy-muted);text-decoration:none}.ivy-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}\n  .ivy-pdf-ats{--ivy-heading:#173b63;--ivy-accent:#173b63;--ivy-text:#303b42;--ivy-divider:#aeb8bf;padding:max(11mm,calc(var(--doc-margin) - 1mm)) var(--doc-margin) 13mm;background:#fff;font-family:Arial,sans-serif}.ivy-pdf-ats .ivy-pdf-header{padding-bottom:3.5mm;border-bottom:.3mm solid var(--ivy-divider)}.ivy-pdf-ats .ivy-pdf-header h1{font-family:Arial,sans-serif;font-size:19pt}.ivy-pdf-ats .ivy-pdf-header h2{color:var(--ivy-heading);font-size:10pt}.ivy-pdf-ats .ivy-pdf-title,.ivy-pdf-ats .knowledge-section>h3{font-family:Arial,sans-serif;font-size:11pt;text-align:left}.ivy-pdf-ats .knowledge-category h4,.ivy-pdf-ats .knowledge-subcategory h5{color:var(--ivy-heading)}\n  .ivy-pdf[data-density=\"compact\"]{--section-gap:max(4.5mm,calc(var(--doc-section-gap) - 1mm))}.ivy-pdf[data-density=\"compact\"] .ivy-pdf-list{gap:3.6mm}.ivy-pdf[data-density=\"dense\"]{--section-gap:max(3.8mm,calc(var(--doc-section-gap) - 2mm))}.ivy-pdf[data-density=\"dense\"] .ivy-pdf-list{gap:3mm}.ivy-pdf[data-density=\"dense\"] .ivy-pdf-title{margin-bottom:2mm;font-size:12.5pt}\n  @media print{.no-print-background .ivy-pdf-watercolor{display:none!important}}\n", Dl = "\n  .managed-pdf{position:relative;width:100%;height:100%;overflow:hidden;color:var(--managed-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}\n  .managed-pdf *{box-sizing:border-box}.managed-pdf a{color:inherit;text-decoration:none}.managed-pdf-content{position:relative;z-index:2;height:100%}.managed-pdf-background{position:absolute;inset:0;z-index:0;width:100%;height:100%;pointer-events:none}.managed-pdf-section{min-width:0;margin:0 0 var(--managed-section-gap);break-inside:avoid}.managed-pdf-title{margin:0 0 3mm;color:var(--managed-muted);font-size:9pt;font-weight:500;line-height:1;text-transform:uppercase;break-after:avoid}.managed-pdf-list{display:flex;flex-direction:column;gap:var(--managed-entry-gap)}.managed-pdf-entry{break-inside:avoid}.managed-pdf-entry h3,.managed-pdf-entry h4{margin:0;overflow-wrap:anywhere}.managed-pdf-entry ul,.managed-pdf-ats ul{margin:1mm 0 0;padding-left:4mm}.managed-pdf-entry li,.managed-pdf-ats li{margin:.25mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.managed-pdf-footer{position:absolute;right:var(--managed-margin);bottom:6mm;left:var(--managed-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--managed-muted);font-size:7pt}.managed-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}\n  .stilvoll-pdf{--managed-primary:var(--accent);--managed-dark:var(--secondary);--managed-text:#465156;--managed-muted:#6d777c;--managed-divider:#aeb8b5;--managed-pattern:#dce2df;--managed-margin:max(15mm,var(--doc-margin));--managed-section-gap:var(--section-gap);--managed-entry-gap:5mm}.stilvoll-pdf .managed-pdf-background{color:var(--managed-pattern);opacity:.62}.stilvoll-pdf .managed-pdf-background path{fill:none;stroke:currentColor;stroke-width:.45}.stilvoll-pdf-header{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) 28mm;gap:10mm;min-height:36mm;padding:14mm var(--managed-margin) 0}.stilvoll-pdf-header.no-photo{grid-template-columns:1fr}.stilvoll-pdf-header h1{margin:0;color:var(--managed-dark);font-size:23pt;font-weight:400;line-height:1;letter-spacing:.015em;text-transform:uppercase;overflow-wrap:anywhere}.stilvoll-pdf-header h2{margin:2mm 0 2.5mm;color:var(--managed-primary);font-size:12pt;font-weight:400;line-height:1.2}.stilvoll-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 3.5mm;margin:0;color:var(--managed-text);font-size:7.8pt;font-style:normal}.stilvoll-pdf-contacts span{display:inline-flex;gap:1mm}.stilvoll-pdf-contacts i{color:var(--managed-muted);font-style:normal}.stilvoll-pdf-photo{width:26mm;height:26mm;overflow:hidden;border-radius:1.5mm;object-fit:cover}.stilvoll-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:24mm;padding-top:11mm;padding-bottom:3mm;border-bottom:.3mm solid var(--managed-divider)}.stilvoll-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-primary);font-size:7pt;text-transform:uppercase}.stilvoll-pdf-header.compact h1{font-size:15pt}.stilvoll-pdf-header.compact h2{margin:0;font-size:8.5pt}.stilvoll-pdf-columns{display:grid;grid-template-columns:54mm minmax(0,115mm);gap:11mm;padding:10mm var(--managed-margin) 16mm}.stilvoll-pdf-columns.continuation{display:block;padding-top:6mm}.stilvoll-pdf .managed-pdf-title{padding-bottom:1mm;border-bottom:.3mm solid var(--managed-divider)}.stilvoll-pdf-strength{display:grid;grid-template-columns:9mm minmax(0,1fr);gap:3mm;margin-bottom:5mm}.stilvoll-pdf-strength i{display:grid;place-items:center;width:8mm;height:8mm;border-radius:50%;color:var(--managed-primary);background:#f1f3f2;font-style:normal}.stilvoll-pdf-strength h3{margin:0 0 1mm;color:var(--managed-dark);font-size:9.5pt;font-weight:500}.stilvoll-pdf-strength p{margin:0}.stilvoll-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) 11mm;gap:2mm;align-items:center;margin-bottom:3mm}.managed-pdf-dots{display:flex;gap:.6mm}.managed-pdf-dots i{display:block;width:1.5mm;height:1.5mm;border-radius:50%;background:#dde2e0}.managed-pdf-dots i.filled{background:var(--managed-dark)}.stilvoll-pdf-entry h3{color:var(--managed-dark);font-size:11pt;font-weight:400}.stilvoll-pdf-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm}.stilvoll-pdf-meta strong{margin-right:auto;color:var(--managed-primary);font-size:9.8pt;font-weight:400}.stilvoll-pdf-meta span{color:var(--managed-muted);font-size:7.8pt}\n  .kompakt-pdf{isolation:isolate;--managed-primary:var(--accent);--managed-accent:var(--secondary);--managed-text:#3f494f;--managed-muted:#6d757a;--managed-divider:#aeb6ba;--managed-pattern:#ffd7bc;--managed-margin:max(13mm,calc(var(--doc-margin) - 1mm));--managed-section-gap:max(3.5mm,calc(var(--section-gap) - 1mm));--managed-entry-gap:4mm}.kompakt-pdf .managed-pdf-background{z-index:-1;color:var(--managed-pattern);opacity:.72}.kompakt-pdf .managed-pdf-background path,.kompakt-pdf .managed-pdf-background circle{fill:none;stroke:currentColor;stroke-width:.7}.kompakt-pdf-header{position:relative;z-index:2;min-height:22mm;padding:13mm var(--managed-margin) 0}.kompakt-pdf-header h1{max-width:112mm;margin:0;color:var(--managed-primary);font-size:20pt;font-weight:450;line-height:1}.kompakt-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 4mm;padding-top:10mm;border-bottom:.25mm solid var(--managed-divider)}.kompakt-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-accent);font-size:7pt;text-transform:uppercase}.kompakt-pdf-header.compact h1{font-size:14pt}.kompakt-pdf-header h2{margin:0;color:var(--managed-muted);font-size:8.5pt}.kompakt-pdf-columns{display:grid;grid-template-columns:108mm 66mm;gap:10mm;padding:9mm var(--managed-margin) 15mm}.kompakt-pdf-columns.continuation{display:block;padding-top:6mm}.kompakt-pdf-entry h3{color:var(--managed-primary);font-size:10.5pt;font-weight:550}.kompakt-pdf-meta{display:flex;flex-wrap:wrap;gap:.7mm 4mm;margin:.7mm 0 1mm;color:var(--managed-muted);font-size:7.4pt}.kompakt-pdf-meta strong{color:var(--managed-accent);font-size:8.4pt}.kompakt-pdf-contacts{display:grid;gap:3.5mm;margin:0;font-style:normal}.kompakt-pdf-contact{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;align-items:center;color:var(--managed-primary);font-size:8.8pt}.kompakt-pdf-contact i{color:var(--managed-accent);font-size:11pt;font-style:normal}.kompakt-pdf-strength{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;margin-bottom:4mm}.kompakt-pdf-strength i{color:var(--managed-accent);font-size:11pt;font-style:normal}.kompakt-pdf-strength h3{margin:0 0 1mm;color:var(--managed-primary);font-size:9pt}.kompakt-pdf-strength p{margin:0}.kompakt-pdf-skills{display:flex;flex-wrap:wrap;gap:2mm 3mm}.kompakt-pdf-skill{padding:0 1.5mm 1mm;border-bottom:.3mm solid var(--managed-divider);color:var(--managed-primary);font-size:7.8pt;font-weight:700}.kompakt-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 8mm}.kompakt-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:1.5mm;align-items:center}.kompakt-pdf-language strong{color:var(--managed-primary)}.kompakt-pdf-language .managed-pdf-dots i{width:2.2mm;height:2.2mm}.kompakt-pdf-language .managed-pdf-dots i.filled{background:var(--managed-accent)}\n  .einfach-pdf{isolation:isolate;--managed-primary:var(--accent);--managed-accent:var(--secondary);--managed-text:#3e484e;--managed-muted:#68747a;--managed-divider:var(--accent);--managed-pattern:#eaf5fd;--managed-margin:max(15mm,var(--doc-margin));--managed-section-gap:calc(var(--section-gap) + 1.5mm);--managed-entry-gap:4.5mm;font-size:calc(var(--body-size) + 1.2pt);line-height:clamp(1.1,calc(var(--body-line) - .25),1.18)}.einfach-pdf p,.einfach-pdf li{font-size:inherit;line-height:inherit}.einfach-pdf .managed-pdf-background{z-index:-1;color:var(--managed-pattern);opacity:.78}.einfach-pdf .managed-pdf-background path{fill:none;stroke:currentColor;stroke-width:4.2}.einfach-pdf-inner{position:relative;z-index:2;height:100%;padding:max(14mm,calc(var(--managed-margin) - 1mm)) var(--managed-margin) 16mm}.einfach-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 36mm;gap:8mm;min-height:35mm;margin-bottom:5.5mm}.einfach-pdf-header.no-photo{grid-template-columns:1fr}.einfach-pdf-header h1{margin:0;color:var(--managed-primary);font-size:24pt;font-weight:750;line-height:1;text-transform:uppercase}.einfach-pdf-header h2{margin:2mm 0;color:var(--managed-accent);font-size:11.5pt;line-height:1.2}.einfach-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1mm 8mm;width:100%;max-width:132mm;margin:0;font-size:8.2pt;font-style:normal;line-height:1.18}.einfach-pdf-contact{display:grid;grid-template-columns:4mm minmax(0,1fr);gap:1mm;min-width:0}.einfach-pdf-contact i{color:var(--managed-accent);font-style:normal;font-weight:700}.einfach-pdf-contact a,.einfach-pdf-contact span{min-width:0;overflow-wrap:anywhere}.einfach-pdf-contact[data-contact-kind=\"linkedin\"] a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}.einfach-pdf-photo{width:34mm;height:34mm;border-radius:50%;object-fit:cover}.einfach-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:6mm;padding-bottom:3mm;border-bottom:.5mm solid var(--managed-primary)}.einfach-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-accent);font-size:7pt;text-transform:uppercase}.einfach-pdf-header.compact h1{font-size:16pt}.einfach-pdf-header.compact h2{margin:0;font-size:9pt}.einfach-pdf .managed-pdf-section>p{margin:0;hyphens:auto;overflow-wrap:break-word}.einfach-pdf .managed-pdf-title{margin-bottom:3.5mm;padding-bottom:1mm;border-bottom:.65mm solid var(--managed-primary);color:var(--managed-primary);font-size:13.5pt;font-weight:750}.einfach-pdf-strengths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4mm 15mm}.einfach-pdf-strength{display:grid;grid-template-columns:7mm minmax(0,1fr);gap:2mm}.einfach-pdf-strength i{color:var(--managed-accent);font-size:14pt;font-style:normal}.einfach-pdf-strength h3{margin:0 0 1.5mm;color:var(--managed-primary);font-size:9.5pt}.einfach-pdf-strength p{margin:0}.einfach-pdf-entry{padding-bottom:3mm;border-bottom:.25mm dashed #d4d9dc}.einfach-pdf-entry:last-child{padding-bottom:0;border-bottom:0}.einfach-pdf-entry h3{color:var(--managed-primary);font-size:11.5pt;font-weight:500;line-height:1.15}.einfach-pdf-entry h4{margin-top:1mm;color:var(--managed-accent);font-size:10pt;line-height:1.15}.einfach-pdf-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm;color:var(--managed-muted);font-size:8.1pt}.einfach-pdf-meta span:first-child:before{margin-right:1.5mm;color:var(--managed-accent);content:\"▦\"}.einfach-pdf-meta span+span:before{margin-right:1.5mm;color:var(--managed-accent);content:\"⌖\"}.einfach-pdf-entry li{margin:.3mm 0}.einfach-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 15mm}.einfach-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3mm;align-items:center}.einfach-pdf-language strong{color:var(--managed-primary);font-size:9.5pt}.einfach-pdf-language .managed-pdf-dots{gap:1mm}.einfach-pdf-language .managed-pdf-dots i{width:2.8mm;height:2.8mm}.einfach-pdf-language .managed-pdf-dots i.filled{background:var(--managed-accent)}\n  .managed-pdf[data-density=\"compact\"]{--managed-entry-gap:max(3.2mm,calc(var(--managed-entry-gap) - 1mm));--managed-section-gap:max(4mm,calc(var(--managed-section-gap) - 1mm))}.managed-pdf[data-density=\"dense\"]{--managed-entry-gap:3mm;--managed-section-gap:4mm}.kompakt-pdf[data-density=\"dense\"]{--managed-entry-gap:2.5mm;--managed-section-gap:3.5mm;font-size:max(7.5pt,calc(var(--body-size) - .5pt));line-height:max(1.18,calc(var(--body-line) - .07))}.einfach-pdf[data-density=\"compact\"]{--managed-section-gap:max(5mm,var(--section-gap));--managed-entry-gap:3.8mm}.einfach-pdf[data-density=\"dense\"]{--managed-section-gap:max(4.5mm,calc(var(--section-gap) - .5mm));--managed-entry-gap:3mm}\n  .managed-pdf-ats{--managed-primary:#173b63;--managed-dark:#173b63;--managed-accent:#173b63;--managed-text:#303b42;--managed-muted:#626e75;--managed-divider:#aeb8bf;padding:14mm var(--managed-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.managed-pdf-ats .managed-pdf-header{display:block;min-height:auto;margin:0;padding:0 0 4mm;border-bottom:.3mm solid var(--managed-divider)}.managed-pdf-ats .managed-pdf-header h1{max-width:none;font-size:19pt}.managed-pdf-ats .managed-pdf-header h2{margin-top:1mm;color:var(--managed-primary);font-size:10pt}.managed-pdf-ats .managed-pdf-section{margin-top:var(--managed-section-gap);margin-bottom:0}.managed-pdf-ats .managed-pdf-title{margin-bottom:2mm;padding-bottom:1mm;border-bottom:.3mm solid var(--managed-divider);color:var(--managed-primary);font-size:10.5pt;font-weight:700}.managed-pdf-ats .managed-pdf-list{gap:var(--managed-entry-gap)}\n  @media print{.no-print-background .managed-pdf-background{display:none!important}}\n", Ol = "\n  .klassisch-pdf{isolation:isolate;--klassisch-primary:var(--accent);--klassisch-accent:var(--secondary);--klassisch-heading:#5a6267;--klassisch-text:#3f484d;--klassisch-muted:#68747a;--klassisch-soft:#cdeff3;--klassisch-border:#d5dbde;--klassisch-margin:max(15mm,var(--doc-margin));--klassisch-section-gap:var(--section-gap);--klassisch-entry-gap:4.2mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--klassisch-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}\n  .klassisch-pdf *{box-sizing:border-box}.klassisch-pdf a{color:inherit;text-decoration:none}.klassisch-pdf-background{position:absolute;inset:0;z-index:-1;width:100%;height:100%;pointer-events:none}.klassisch-pdf-background .fill{fill:var(--klassisch-soft)}.klassisch-pdf-background .line{fill:none;stroke:rgba(255,255,255,.92);stroke-width:.28;vector-effect:non-scaling-stroke}.klassisch-pdf-content{position:relative;z-index:2;height:100%;padding:14mm var(--klassisch-margin) 17mm}\n  .klassisch-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 34mm;gap:8mm;align-items:start;min-height:33mm;margin-bottom:7mm}.klassisch-pdf-header.no-photo{grid-template-columns:1fr}.klassisch-pdf-header h1{max-width:138mm;margin:0;color:var(--klassisch-primary);font-size:26pt;font-weight:750;letter-spacing:-.01em;line-height:1;overflow-wrap:anywhere}.klassisch-pdf-header h2{margin:2mm 0 1.5mm;color:var(--klassisch-text);font-size:12.2pt;font-weight:400;line-height:1.12;overflow-wrap:anywhere}.klassisch-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:.8mm 8mm;width:100%;max-width:132mm;margin:0;color:var(--klassisch-text);font-size:8pt;font-style:normal;line-height:1.25}.klassisch-pdf-contacts span{min-width:0;overflow-wrap:anywhere}.klassisch-pdf-contacts [data-contact-kind=\"linkedin\"]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}.klassisch-pdf-photo{justify-self:end;width:32mm;height:32mm;border-radius:50%;object-fit:cover;background:#edf1f3}\n  .klassisch-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:6mm;padding-bottom:2.5mm;border-bottom:.3mm solid var(--klassisch-border)}.klassisch-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--klassisch-accent);font-size:7pt;font-weight:700;letter-spacing:.09em;text-transform:uppercase}.klassisch-pdf-header.compact h1{font-size:15.5pt}.klassisch-pdf-header.compact h2{margin:0;font-size:8.8pt}\n  .klassisch-pdf-section{min-width:0;margin:0 0 var(--klassisch-section-gap);break-inside:avoid;page-break-inside:avoid}.klassisch-pdf-title{margin:0 0 3mm;color:var(--klassisch-heading);font-size:10.4pt;font-weight:750;letter-spacing:.01em;line-height:1;text-transform:uppercase;break-after:avoid}.klassisch-pdf-section>p{margin:0;hyphens:auto;overflow-wrap:break-word}\n  .klassisch-pdf-strengths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4mm 9mm}.klassisch-pdf-strength h3{margin:0 0 1.2mm;color:var(--klassisch-accent);font-size:9.8pt;font-weight:750;line-height:1.1;overflow-wrap:anywhere}.klassisch-pdf-strength p{margin:0;hyphens:auto}\n  .klassisch-pdf-list{display:flex;flex-direction:column;gap:var(--klassisch-entry-gap)}.klassisch-pdf-entry{min-width:0;break-inside:avoid}.klassisch-pdf-entry-head{display:grid;grid-template-columns:minmax(0,1fr) 34mm;gap:7mm;align-items:start}.klassisch-pdf-entry h3,.klassisch-pdf-entry h4{margin:0;overflow-wrap:anywhere}.klassisch-pdf-entry h3{color:var(--klassisch-primary);font-size:12.2pt;font-weight:450;line-height:1.08}.klassisch-pdf-entry h4{margin-top:1mm;color:var(--klassisch-accent);font-size:10pt;font-weight:650;line-height:1.12}.klassisch-pdf-entry-meta{display:flex;flex-direction:column;gap:2mm;margin:0;color:var(--klassisch-muted);font-size:7.8pt;line-height:1.15;text-align:right}.klassisch-pdf-entry ul,.klassisch-pdf-certifications{margin:1.2mm 0 0;padding-left:4.3mm}.klassisch-pdf-entry li,.klassisch-pdf-certifications li{margin:.15mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.klassisch-pdf-education .klassisch-pdf-list{gap:3.5mm}.klassisch-pdf-education .klassisch-pdf-entry h3{font-size:11.7pt}.klassisch-pdf-education .klassisch-pdf-entry h4{color:var(--klassisch-text);font-size:9.4pt;font-weight:450}\n  .klassisch-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2mm 18mm;max-width:112mm}.klassisch-pdf-language{display:flex;gap:3mm;margin:0;color:var(--klassisch-text);font-size:9pt}.klassisch-pdf-language strong{color:var(--klassisch-primary);font-weight:500}.klassisch-pdf-footer{position:absolute;right:var(--klassisch-margin);bottom:6mm;left:var(--klassisch-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--klassisch-muted);font-size:7pt}.klassisch-pdf-footer span:last-child{margin-left:auto}\n  .klassisch-pdf[data-density=\"compact\"]{--klassisch-section-gap:max(4.8mm,calc(var(--section-gap) - 1mm));--klassisch-entry-gap:3.5mm}.klassisch-pdf[data-density=\"dense\"]{--klassisch-section-gap:max(3.8mm,calc(var(--section-gap) - 2mm));--klassisch-entry-gap:2.8mm;font-size:max(8pt,calc(var(--body-size) - .3pt))}.klassisch-pdf[data-density=\"dense\"] .klassisch-pdf-header{min-height:29mm;margin-bottom:5mm}.klassisch-pdf[data-density=\"dense\"] .klassisch-pdf-header h1{font-size:23pt}\n  .klassisch-pdf-ats{--klassisch-primary:#173b63;--klassisch-accent:#173b63;--klassisch-heading:#173b63;--klassisch-text:#303b42;--klassisch-muted:#626e75;--klassisch-border:#aeb8bf;padding:14mm var(--klassisch-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.klassisch-pdf-ats .klassisch-pdf-header{display:block;min-height:auto;margin:0 0 5mm;padding-bottom:3mm;border-bottom:.3mm solid var(--klassisch-border)}.klassisch-pdf-ats .klassisch-pdf-header h1{font-size:19pt}.klassisch-pdf-ats .klassisch-pdf-header h2{color:var(--klassisch-primary);font-size:10pt}.klassisch-pdf-ats .klassisch-pdf-title{margin-bottom:2mm;padding-bottom:1mm;border-bottom:.3mm solid var(--klassisch-border);font-size:10.5pt}.klassisch-pdf-ats .klassisch-pdf-strengths,.klassisch-pdf-ats .klassisch-pdf-languages{display:block;max-width:none}.klassisch-pdf-ats .klassisch-pdf-strength,.klassisch-pdf-ats .klassisch-pdf-language{margin:.7mm 0}\n  @media print{.no-print-background .klassisch-pdf-background{display:none!important}}\n", kl = `${Ol.replaceAll("klassisch", "mehrspaltig")}
  .mehrspaltig-pdf{--mehrspaltig-primary:#003c96;--mehrspaltig-accent:#57adf4;--mehrspaltig-heading:#003c96;--mehrspaltig-border:#d7dee3;--mehrspaltig-margin:max(15mm,var(--doc-margin));font-size:calc(var(--body-size) + .1pt);line-height:min(1.22,var(--body-line))}.mehrspaltig-pdf-background .fill,.mehrspaltig-pdf-background .line{display:none}.mehrspaltig-pdf-background .ribbon{fill:none;stroke-width:2.3;stroke-linecap:round}.mehrspaltig-pdf-background .red{stroke:#f26b67}.mehrspaltig-pdf-background .orange{stroke:#f7a24c}.mehrspaltig-pdf-background .yellow{stroke:#f3cf54}.mehrspaltig-pdf-background .green{stroke:#73bf80}.mehrspaltig-pdf-background .blue{stroke:#59afe9}.mehrspaltig-pdf-background .purple{stroke:#a686cc}
  .mehrspaltig-pdf-content{padding:14mm var(--mehrspaltig-margin) 16mm}.mehrspaltig-pdf-header{position:relative;grid-template-columns:minmax(0,1fr) 30mm;gap:7mm;min-height:31mm;margin-bottom:5mm}.mehrspaltig-pdf-header h1,.mehrspaltig-pdf-title,.mehrspaltig-pdf-entry h3,.mehrspaltig-pdf-strength h3{font-family:Georgia,"Times New Roman",serif}.mehrspaltig-pdf-header h1{max-width:none;color:var(--mehrspaltig-primary);font-size:25pt;font-weight:700;letter-spacing:.012em;line-height:.96;text-transform:uppercase}.mehrspaltig-pdf-header h2{margin:2.2mm 0 2mm;color:var(--mehrspaltig-accent);font-family:Georgia,"Times New Roman",serif;font-size:11.4pt;font-weight:700}.mehrspaltig-pdf-contacts{gap:1mm 8mm;width:100%;max-width:132mm;font-size:7.7pt;line-height:1.15}.mehrspaltig-pdf-photo{width:30mm;height:30mm}.mehrspaltig-pdf-header.compact{margin-bottom:5mm;border-color:var(--mehrspaltig-primary)}
  .mehrspaltig-pdf-columns{display:grid;grid-template-columns:40mm minmax(0,1fr) 40mm;gap:9mm;align-items:start}.mehrspaltig-pdf-columns.continuation{display:block}.mehrspaltig-pdf-column{min-width:0}.mehrspaltig-pdf-section{margin:0 0 5.4mm}.mehrspaltig-pdf-title{margin:0 0 2.4mm;padding-bottom:1.2mm;border-bottom:.45mm solid var(--mehrspaltig-primary);color:var(--mehrspaltig-primary);font-size:10.6pt;font-weight:700}.mehrspaltig-pdf-section>p{margin:0}.mehrspaltig-pdf-skills{display:flex;flex-direction:column;gap:1.5mm}.mehrspaltig-pdf-skills strong{padding-bottom:1.1mm;border-bottom:.25mm solid var(--mehrspaltig-border);color:var(--mehrspaltig-primary);font-size:8.1pt}
  .mehrspaltig-pdf-strengths{display:flex;flex-direction:column;gap:4.2mm}.mehrspaltig-pdf-strength{display:grid;grid-template-columns:8mm minmax(0,1fr);column-gap:2mm}.mehrspaltig-pdf-strength i{grid-row:span 2;display:grid;place-items:center;width:7.5mm;height:7.5mm;border-radius:50%;color:var(--mehrspaltig-accent);background:#f0f2f3;font-size:12pt;font-style:normal}.mehrspaltig-pdf-strength h3{margin:0 0 .8mm;color:var(--mehrspaltig-primary);font-size:9.4pt;font-weight:700}.mehrspaltig-pdf-strength p{margin:0}
  .mehrspaltig-pdf-list{gap:4mm}.mehrspaltig-pdf-entry-head{display:block}.mehrspaltig-pdf-entry h3{color:var(--mehrspaltig-primary);font-size:12.2pt;font-weight:400;line-height:1.06}.mehrspaltig-pdf-entry h4{margin-top:.9mm;color:var(--mehrspaltig-accent);font-size:9.5pt;font-weight:700}.mehrspaltig-pdf-entry-meta{display:flex;flex-direction:row;flex-wrap:wrap;gap:1mm 4mm;margin:1.2mm 0;color:var(--mehrspaltig-muted);font-size:7.2pt;text-align:left}.mehrspaltig-pdf-entry ul{margin:0;padding-left:3.5mm}.mehrspaltig-pdf-entry li::marker{color:var(--mehrspaltig-primary)}.mehrspaltig-pdf-education .mehrspaltig-pdf-entry h3{font-size:11.3pt}.mehrspaltig-pdf-education .mehrspaltig-pdf-entry h4{color:var(--mehrspaltig-text);font-weight:400}
  .mehrspaltig-pdf-languages{display:flex;flex-direction:column;gap:2.3mm;max-width:none}.mehrspaltig-pdf-language{display:block;margin:0;font-size:8pt}.mehrspaltig-pdf-language strong{color:var(--mehrspaltig-primary);font-weight:700}.mehrspaltig-pdf-language span{display:block;color:var(--mehrspaltig-muted)}.mehrspaltig-pdf-footer{bottom:5.5mm}.mehrspaltig-pdf[data-density="dense"] .mehrspaltig-pdf-columns{gap:7mm}.mehrspaltig-pdf-ats .mehrspaltig-pdf-title{border-color:var(--mehrspaltig-border);font-family:Arial,sans-serif}.mehrspaltig-pdf-ats .mehrspaltig-pdf-columns{display:block}
`, Al = "\n  .modern-pdf{--modern-primary:var(--accent);--modern-soft:var(--secondary);--modern-heading:#303437;--modern-text:#444b4f;--modern-muted:#686f73;--modern-divider:#aeb4b6;--modern-icon-bg:#f2f3f3;--modern-margin:15mm;--modern-section-gap:7mm;--modern-entry-gap:4.5mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--modern-text);background:#fff;font-family:var(--body-font);font-size:8.4pt;line-height:1.27}\n  .modern-pdf *{box-sizing:border-box}.modern-pdf a{color:inherit;text-decoration:none}.modern-pdf-content{position:relative;z-index:2;height:100%;padding:14mm var(--modern-margin) 14mm}\n  .modern-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 29mm;gap:9mm;align-items:start;min-height:25mm;margin-bottom:4mm}.modern-pdf-header.no-photo{grid-template-columns:1fr}.modern-pdf-identity{min-width:0}.modern-pdf-header h1{margin:0;color:var(--modern-heading);font-size:24pt;font-weight:700;letter-spacing:.01em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.modern-pdf-header h2{margin:2mm 0 0;color:var(--modern-primary);font-size:12pt;font-weight:500;line-height:1.18;overflow-wrap:anywhere}.modern-pdf-photo{justify-self:end;width:25mm;height:25mm;border-radius:50%;object-fit:cover;background:var(--modern-icon-bg)}\n  .modern-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:7mm;padding-bottom:3mm;border-bottom:.35mm solid var(--modern-divider)}.modern-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--modern-primary);font-size:7pt;letter-spacing:.08em;text-transform:uppercase}.modern-pdf-header.compact h1{font-size:15pt}.modern-pdf-header.compact h2{margin:0;font-size:9pt}\n  .modern-pdf-columns{display:grid;grid-template-columns:102mm 67mm;gap:11mm;align-items:start}.modern-pdf-columns.continuation{display:block}.modern-pdf-left,.modern-pdf-right{display:flex;min-width:0;flex-direction:column;gap:var(--modern-section-gap)}\n  .modern-pdf-section{min-width:0;break-inside:auto}.modern-pdf-title{margin:0 0 3.2mm;padding-bottom:1mm;border-bottom:.35mm solid var(--modern-divider);color:var(--modern-muted);font-size:9.2pt;font-weight:500;letter-spacing:.025em;line-height:1;text-transform:uppercase;break-after:avoid}.modern-pdf-list{display:flex;flex-direction:column;gap:var(--modern-entry-gap)}\n  .modern-pdf-entry{break-inside:auto}.modern-pdf-entry h3{margin:0 0 1mm;color:var(--modern-heading);font-size:11pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere;break-after:avoid}.modern-pdf-entry-meta{display:flex;flex-wrap:wrap;align-items:center;gap:1mm 4mm;margin:0 0 1.5mm;color:var(--modern-muted);font-size:7.9pt;line-height:1.2;break-after:avoid}.modern-pdf-entry-meta strong{margin-right:auto;color:var(--modern-primary);font-weight:600}.modern-pdf-entry-meta span{display:flex;align-items:center;gap:1mm;white-space:nowrap}.modern-pdf-entry-meta i{color:var(--modern-muted);font-size:6.8pt;font-style:normal}.modern-pdf-entry ul,.modern-pdf-certifications,.modern-pdf-ats ul{margin:0;padding-left:4mm}.modern-pdf-entry li,.modern-pdf-certifications li,.modern-pdf-ats li{margin:.35mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word;break-inside:avoid}\n  .modern-pdf-contacts{display:grid;gap:3.2mm;margin:0;font-style:normal}.modern-pdf-contact{display:grid;grid-template-columns:8.5mm minmax(0,1fr);gap:3mm;align-items:center;min-width:0}.modern-pdf-contact i{display:grid;place-items:center;width:8.5mm;height:8.5mm;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:7pt;font-style:normal;font-weight:700}.modern-pdf-contact span,.modern-pdf-contact a{min-width:0;color:var(--modern-text);font-size:8.4pt;line-height:1.2;overflow-wrap:anywhere}\n  .modern-pdf-contacts.inline{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1mm 8mm;width:100%;max-width:132mm;margin-top:3mm}.modern-pdf-contacts.inline .modern-pdf-contact{display:grid;grid-template-columns:3.2mm minmax(0,1fr);gap:.8mm;min-width:0}.modern-pdf-contacts.inline .modern-pdf-contact i{display:block;width:3.2mm;height:auto;border-radius:0;color:var(--modern-muted);background:transparent;font-size:6.8pt;line-height:1.2}.modern-pdf-contacts.inline .modern-pdf-contact span,.modern-pdf-contacts.inline .modern-pdf-contact a{display:block;min-width:0;color:var(--modern-muted);font-size:7.4pt;overflow-wrap:anywhere}.modern-pdf-contacts.inline .modern-pdf-contact[data-contact-kind=\"linkedin\"] a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}\n  .modern-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}.modern-pdf-strengths{display:flex;flex-direction:column;gap:4mm}.modern-pdf-strength{display:grid;grid-template-columns:10mm minmax(0,1fr);gap:3mm;align-items:start}.modern-pdf-strength>i{display:grid;width:9mm;height:9mm;place-items:center;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:10pt;font-style:normal;font-weight:700}.modern-pdf-strength h3{margin:0 0 .5mm;color:var(--modern-heading);font-size:9.5pt;font-weight:600}.modern-pdf-strength p{margin:0;hyphens:auto;overflow-wrap:break-word}.modern-pdf-languages{display:flex;flex-direction:column;gap:2.5mm}.modern-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4mm;align-items:center}.modern-pdf-language>div{display:flex;min-width:0;justify-content:space-between;gap:2mm}.modern-pdf-language strong{color:var(--modern-heading);font-weight:600}.modern-pdf-language em{color:var(--modern-muted);font-size:7.9pt;font-style:normal}.modern-pdf-dots{display:flex;gap:1.1mm;color:var(--modern-primary);font-size:6pt;white-space:nowrap}\n  .modern-pdf-knowledge{display:flex;flex-wrap:wrap;gap:2.5mm 3mm}.modern-pdf-knowledge span{padding:0 2mm 1mm;border-bottom:.3mm solid var(--modern-divider);color:var(--modern-text);font-size:8.2pt;line-height:1.15}.modern-pdf-achievements{display:flex;flex-direction:column;gap:4mm}.modern-pdf-achievements article{display:grid;grid-template-columns:9mm minmax(0,1fr);gap:3mm;align-items:start}.modern-pdf-achievements i{display:grid;width:9mm;height:9mm;place-items:center;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:8pt;font-style:normal}.modern-pdf-achievements p{margin:0;line-height:1.25}\n  .modern-pdf-footer{position:absolute;right:var(--modern-margin);bottom:6mm;left:var(--modern-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--modern-muted);font-size:7.2pt}.modern-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}\n  .modern-pdf[data-density=\"compact\"]{--modern-section-gap:5mm;--modern-entry-gap:3.7mm;font-size:8.1pt}.modern-pdf[data-density=\"dense\"]{--modern-section-gap:4mm;--modern-entry-gap:3mm;font-size:7.7pt;line-height:1.2}.modern-pdf[data-density=\"dense\"] .modern-pdf-title{margin-bottom:2.5mm}.modern-pdf[data-density=\"dense\"] .modern-pdf-contacts{gap:2.5mm}.modern-pdf[data-density=\"dense\"] .modern-pdf-strengths{gap:3mm}\n  .modern-pdf-ats{--modern-primary:#173b63;--modern-heading:#26343e;--modern-text:#303b42;--modern-muted:#626e75;--modern-divider:#aeb8bf;padding:14mm var(--modern-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.modern-pdf-ats .modern-pdf-header{display:block;min-height:auto;margin-bottom:5mm;padding-bottom:3mm;border-bottom:.35mm solid var(--modern-divider)}.modern-pdf-ats .modern-pdf-header h1{font-size:19pt}.modern-pdf-ats .modern-pdf-header h2{margin-top:1mm;color:var(--modern-heading);font-size:10pt}.modern-pdf-ats .modern-pdf-section{margin-bottom:5mm}.modern-pdf-ats .modern-pdf-title{margin-bottom:2mm;color:var(--modern-heading);font-size:10.5pt;font-weight:700}.modern-pdf-ats .modern-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 5mm}.modern-pdf-ats .modern-pdf-contact{display:block}.modern-pdf-ats .modern-pdf-contact i{display:none}.modern-pdf-ats .modern-pdf-language{display:block}.modern-pdf-ats .modern-pdf-dots{display:none}\n  @media print{.no-print-background .modern-pdf-background{display:none!important}}\n", jl = "\n  .gepflegt-pdf{--gepflegt-sidebar:var(--secondary);--gepflegt-accent:var(--accent);--gepflegt-heading:#354147;--gepflegt-text:#3f494e;--gepflegt-muted:#657075;--gepflegt-divider:#c7ced1;--gepflegt-sidebar-text:#fff;--gepflegt-sidebar-muted:#d8f0ef;--gepflegt-sidebar-width:72mm;--gepflegt-section-gap:7mm;--gepflegt-entry-gap:4.5mm;position:relative;display:grid;grid-template-columns:var(--gepflegt-sidebar-width) minmax(0,1fr);width:100%;height:100%;overflow:hidden;color:var(--gepflegt-text);background:#fff;font-family:var(--body-font);font-size:8.8pt;line-height:1.28}\n  .gepflegt-pdf *{box-sizing:border-box}.gepflegt-pdf a{color:inherit;text-decoration:none}.gepflegt-pdf:before{position:absolute;top:0;right:0;left:0;z-index:4;height:3.5mm;background:color-mix(in srgb,var(--gepflegt-sidebar),#003f3e 32%);content:\"\"}\n  .gepflegt-pdf-sidebar{min-width:0;height:100%;overflow:hidden;padding:9mm 10mm 13mm;color:var(--gepflegt-sidebar-text);background:var(--gepflegt-sidebar)}.gepflegt-pdf-photo{display:block;width:26mm;height:26mm;margin:0 auto 16mm;border-radius:1.5mm;background:rgba(255,255,255,.16);object-fit:cover}.gepflegt-pdf-sidebar section{margin:0 0 8.5mm;break-inside:avoid}.gepflegt-pdf-sidebar h3{margin:0 0 3.5mm;padding:0 0 2.2mm;border-bottom:.35mm solid rgba(255,255,255,.78);color:var(--gepflegt-sidebar-text);font-size:12.5pt;font-weight:500;letter-spacing:.01em;line-height:1.05;text-transform:uppercase}.gepflegt-pdf-summary,.gepflegt-pdf-knowledge{margin:0;color:var(--gepflegt-sidebar-text);font-size:8.8pt;line-height:1.3;hyphens:auto;overflow-wrap:break-word}\n  .gepflegt-pdf-strengths{display:flex;flex-direction:column;gap:5mm}.gepflegt-pdf-strength{display:grid;grid-template-columns:5.5mm minmax(0,1fr);gap:2mm;align-items:start}.gepflegt-pdf-strength svg{width:4mm;height:4mm;margin-top:.4mm;fill:none;stroke:var(--gepflegt-sidebar-text);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3}.gepflegt-pdf-strength h4{margin:0 0 1.5mm;color:var(--gepflegt-sidebar-text);font-size:10.2pt;font-weight:600;line-height:1.15}.gepflegt-pdf-strength p{margin:0;color:var(--gepflegt-sidebar-muted);font-size:8.5pt;line-height:1.28;hyphens:auto}.gepflegt-pdf-languages{display:flex;flex-direction:column;gap:3.2mm}.gepflegt-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2.5mm;align-items:center}.gepflegt-pdf-language>div{display:flex;min-width:0;justify-content:space-between;gap:2mm}.gepflegt-pdf-language strong,.gepflegt-pdf-language span{font-size:8.6pt;font-weight:400}.gepflegt-pdf-language em{color:var(--gepflegt-sidebar-muted);font-style:normal}.gepflegt-pdf-dots{display:flex;gap:1.05mm}.gepflegt-pdf-dots i{width:1.7mm;height:1.7mm;border:.3mm solid rgba(255,255,255,.7);border-radius:50%}.gepflegt-pdf-dots i.filled{border-color:#fff;background:#fff}.gepflegt-pdf-certifications{margin:0;padding-left:4mm}.gepflegt-pdf-certifications li{margin:0 0 1.3mm;padding-left:.7mm;color:var(--gepflegt-sidebar-text);font-size:8.5pt;line-height:1.25}\n  .gepflegt-pdf-content{position:relative;min-width:0;height:100%;overflow:hidden;padding:9mm 10mm 13mm 9mm}.gepflegt-pdf-header{min-width:0;margin:0 0 12mm}.gepflegt-pdf-header h1{margin:0;color:var(--gepflegt-heading);font-family:var(--heading-font);font-size:24pt;font-weight:750;letter-spacing:.005em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.gepflegt-pdf-header h2{max-width:120mm;margin:2.4mm 0 0;color:var(--gepflegt-accent);font-size:13.5pt;font-weight:500;line-height:1.15;overflow-wrap:break-word}.gepflegt-pdf-contacts{display:flex;flex-wrap:wrap;gap:2.1mm 4mm;margin:4mm 0 0;color:var(--gepflegt-text);font-size:8.2pt;font-style:normal;font-weight:500;line-height:1.2}.gepflegt-pdf-contact{display:inline-flex;min-width:0;max-width:90mm;align-items:center;gap:1.4mm}.gepflegt-pdf-contact svg{width:3.4mm;height:3.4mm;flex:0 0 auto;fill:none;stroke:#b9bec0;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.7}.gepflegt-pdf-contact span{min-width:0;overflow-wrap:anywhere;white-space:nowrap}\n  .gepflegt-pdf-main{display:flex;min-width:0;flex-direction:column;gap:var(--gepflegt-section-gap)}.gepflegt-pdf-section{min-width:0;break-inside:auto}.gepflegt-pdf-title{margin:0 0 3.6mm;padding:0 0 2.2mm;border-bottom:.35mm solid var(--gepflegt-divider);color:var(--gepflegt-heading);font-family:var(--heading-font);font-size:14.5pt;font-weight:500;letter-spacing:.015em;line-height:1;text-transform:uppercase;break-after:avoid}.gepflegt-pdf-list{display:flex;flex-direction:column;gap:var(--gepflegt-entry-gap)}.gepflegt-pdf-entry{min-width:0;break-inside:avoid}.gepflegt-pdf-entry-heading,.gepflegt-pdf-entry-subheading{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5mm;align-items:baseline}.gepflegt-pdf-entry-heading h4{min-width:0;margin:0;color:var(--gepflegt-heading);font-size:11.5pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere}.gepflegt-pdf-entry-heading span,.gepflegt-pdf-entry-subheading span{max-width:31mm;color:var(--gepflegt-text);font-size:8.8pt;line-height:1.15;text-align:right}.gepflegt-pdf-entry-subheading{margin-top:1.5mm}.gepflegt-pdf-entry-subheading strong{color:var(--gepflegt-accent);font-size:9.8pt;font-weight:600;line-height:1.15;overflow-wrap:anywhere}.gepflegt-pdf-entry ul{margin:2mm 0 0;padding-left:4.8mm}.gepflegt-pdf-entry li{margin:.45mm 0;padding-left:.6mm;color:var(--gepflegt-text);font-size:8.8pt;line-height:1.28;hyphens:auto;overflow-wrap:break-word}\n  .gepflegt-pdf-footer{position:absolute;right:10mm;bottom:5.5mm;left:9mm;display:flex;justify-content:flex-end;gap:8mm;color:var(--gepflegt-muted);font-size:7.2pt}.gepflegt-pdf-footer span:first-child{margin-right:auto}.gepflegt-pdf-sidebar-continuation{display:flex;align-items:center}.gepflegt-pdf-sidebar-continuation p,.gepflegt-pdf-sidebar-continuation h2,.gepflegt-pdf-sidebar-continuation span,.gepflegt-pdf-sidebar-continuation small{display:block;margin:0}.gepflegt-pdf-sidebar-continuation p{font-size:8pt;letter-spacing:.12em;text-transform:uppercase}.gepflegt-pdf-sidebar-continuation h2{margin-top:2mm;color:#fff;font-size:16pt;line-height:1.05;text-transform:uppercase}.gepflegt-pdf-sidebar-continuation span{margin-top:2mm;color:var(--gepflegt-sidebar-muted)}.gepflegt-pdf-sidebar-continuation i{display:block;width:16mm;height:.5mm;margin:8mm 0;background:#fff}.gepflegt-pdf-header.compact{margin-bottom:8mm;padding-bottom:3mm;border-bottom:.35mm solid var(--gepflegt-divider)}.gepflegt-pdf-header.compact .kicker{margin:0 0 1mm;color:var(--gepflegt-accent);font-size:7.3pt}.gepflegt-pdf-header.compact h1{font-size:16pt}.gepflegt-pdf-header.compact h2{margin-top:1mm;font-size:9.5pt}\n  .gepflegt-pdf[data-density=\"compact\"]{--gepflegt-section-gap:5.7mm;--gepflegt-entry-gap:3.6mm;font-size:8.35pt;line-height:1.23}.gepflegt-pdf[data-density=\"compact\"] .gepflegt-pdf-header{margin-bottom:9mm}.gepflegt-pdf[data-density=\"compact\"] .gepflegt-pdf-sidebar section{margin-bottom:6.5mm}.gepflegt-pdf[data-density=\"compact\"] .gepflegt-pdf-entry li{font-size:8.35pt;line-height:1.23}.gepflegt-pdf[data-density=\"dense\"]{--gepflegt-section-gap:4.4mm;--gepflegt-entry-gap:2.8mm;font-size:7.8pt;line-height:1.18}.gepflegt-pdf[data-density=\"dense\"] .gepflegt-pdf-header{margin-bottom:7mm}.gepflegt-pdf[data-density=\"dense\"] .gepflegt-pdf-photo{margin-bottom:10mm}.gepflegt-pdf[data-density=\"dense\"] .gepflegt-pdf-sidebar section{margin-bottom:5mm}.gepflegt-pdf[data-density=\"dense\"] .gepflegt-pdf-entry li{font-size:7.8pt;line-height:1.18}\n  .gepflegt-pdf-ats{display:block;padding:14mm 16mm 16mm;background:#fff;font-family:Arial,sans-serif}.gepflegt-pdf-ats:before{display:none}.gepflegt-pdf-ats .gepflegt-pdf-header{margin-bottom:6mm;padding-bottom:3mm;border-bottom:.35mm solid var(--gepflegt-divider)}.gepflegt-pdf-ats .gepflegt-pdf-header h1{font-size:20pt}.gepflegt-pdf-ats .gepflegt-pdf-header h2{color:var(--gepflegt-heading);font-size:10.5pt}.gepflegt-pdf-ats .gepflegt-pdf-contacts{gap:1mm 5mm;margin-top:2mm}.gepflegt-pdf-ats .gepflegt-pdf-contact{max-width:none}.gepflegt-pdf-ats-summary{margin-bottom:var(--gepflegt-section-gap)}.gepflegt-pdf-ats-summary p{margin:0}.gepflegt-pdf-ats-extra{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5mm 10mm;margin-top:var(--gepflegt-section-gap)}.gepflegt-pdf-ats-extra section{margin:0}.gepflegt-pdf-ats-extra h3{margin:0 0 2mm;padding-bottom:1.5mm;border-bottom:.35mm solid var(--gepflegt-divider);color:var(--gepflegt-heading);font-size:10.5pt;text-transform:uppercase}.gepflegt-pdf-ats-extra p,.gepflegt-pdf-ats-extra li{font-size:8.5pt}.gepflegt-pdf-ats-extra ul{margin:0;padding-left:4mm}\n", Ml = "\n  .tabellarisch-pdf{--tab-primary:var(--secondary);--tab-accent:var(--accent);--tab-text:#3f4850;--tab-muted:#6d747a;--tab-line:#c8cdd1;--tab-margin:max(15mm,var(--doc-margin));--tab-section-gap:max(6.3mm,var(--section-gap));--tab-entry-gap:4.4mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--tab-text);background:#fff;font-family:var(--body-font);font-size:max(8.7pt,var(--body-size));line-height:max(1.28,var(--body-line))}\n  .tabellarisch-pdf *{box-sizing:border-box}.tabellarisch-pdf a{color:inherit;text-decoration:none}.tabellarisch-pdf-content{position:relative;z-index:2;height:100%;padding:max(15mm,var(--doc-margin)) var(--tab-margin) max(19mm,calc(var(--doc-margin) + 5mm))}\n  .tabellarisch-pdf-background{position:absolute;top:0;right:0;z-index:0;width:100%;height:58mm;fill:none;stroke:var(--tab-line);stroke-width:1.15;opacity:.62;pointer-events:none}\n  .tabellarisch-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 32mm;gap:10mm;align-items:start;min-height:30mm}.tabellarisch-pdf-header.no-photo{grid-template-columns:1fr}.tabellarisch-pdf-identity{min-width:0;padding-top:1mm}.tabellarisch-pdf-header h1{margin:0;color:var(--tab-primary);font-family:var(--heading-font);font-size:25pt;font-weight:750;letter-spacing:.015em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.tabellarisch-pdf-header h2{margin:2.3mm 0 0;color:var(--tab-accent);font-family:var(--heading-font);font-size:13.5pt;font-weight:650;line-height:1.15;overflow-wrap:anywhere}.tabellarisch-pdf-photo{display:block;width:30mm;height:30mm;justify-self:end;border-radius:50%;background:#e8ebed;object-fit:cover}\n  .tabellarisch-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1.15mm 7mm;width:100%;max-width:132mm;margin:2.5mm 0 0;color:var(--tab-text);font-size:8.4pt;font-style:normal;font-weight:600;line-height:1.2}.tabellarisch-pdf-contact{display:grid;grid-template-columns:3.2mm minmax(0,1fr);gap:1.2mm;align-items:center;min-width:0}.tabellarisch-pdf-contact svg{width:3mm;height:3mm;fill:none;stroke:var(--tab-accent);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.4}.tabellarisch-pdf-contact span,.tabellarisch-pdf-contact a{min-width:0;overflow-wrap:anywhere}.tabellarisch-pdf-contact[data-contact-kind=\"linkedin\"] a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}\n  .tabellarisch-pdf-section{min-width:0;margin-top:var(--tab-section-gap);break-inside:auto}.tabellarisch-pdf-title{display:flex;align-items:baseline;gap:2.5mm;margin:0 0 3.5mm;color:var(--tab-primary);font-family:var(--heading-font);font-size:15pt;font-weight:750;letter-spacing:.01em;line-height:1.05;text-transform:uppercase;break-after:avoid}.tabellarisch-pdf-title small{color:var(--tab-muted);font-size:7.5pt;font-weight:600;text-transform:none}.tabellarisch-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}\n  .tabellarisch-pdf-strengths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5mm 12mm}.tabellarisch-pdf-strength{display:grid;grid-template-columns:8mm minmax(0,1fr);gap:2.5mm;align-items:start;break-inside:avoid}.tabellarisch-pdf-strength svg{width:6mm;height:6mm;fill:none;stroke:var(--tab-accent);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.1}.tabellarisch-pdf-strength h3{margin:0 0 1.5mm;color:var(--tab-primary);font-size:10.3pt;font-weight:700;line-height:1.2}.tabellarisch-pdf-strength p{margin:0;hyphens:auto;overflow-wrap:break-word}\n  .tabellarisch-pdf-timeline{display:flex;flex-direction:column}.tabellarisch-pdf-entry{display:grid;grid-template-columns:minmax(30mm,35mm) 7mm minmax(0,1fr);gap:4mm;min-width:0;padding-bottom:var(--tab-entry-gap);break-inside:avoid}.tabellarisch-pdf-entry:last-child{padding-bottom:0}.tabellarisch-pdf-meta{padding-top:.45mm}.tabellarisch-pdf-date,.tabellarisch-pdf-location{margin:0}.tabellarisch-pdf-date{color:var(--tab-primary);font-size:10pt;font-weight:750;line-height:1.15}.tabellarisch-pdf-location{margin-top:2mm;color:var(--tab-text);font-size:8.4pt;line-height:1.3}.tabellarisch-pdf-rail{position:relative;display:block;min-height:100%}.tabellarisch-pdf-rail:before{position:absolute;top:2.5mm;bottom:-1mm;left:50%;width:.35mm;background:var(--tab-line);content:\"\";transform:translateX(-50%)}.tabellarisch-pdf-rail:after{position:absolute;top:.6mm;left:50%;width:2.3mm;height:2.3mm;border-radius:50%;background:var(--tab-primary);content:\"\";transform:translateX(-50%)}.tabellarisch-pdf-entry-content{min-width:0}.tabellarisch-pdf-entry h3{margin:0;color:var(--tab-primary);font-family:var(--heading-font);font-size:12pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere}.tabellarisch-pdf-organization{margin:1mm 0 1.5mm;color:var(--tab-accent);font-size:10.2pt;font-weight:700;line-height:1.2;overflow-wrap:anywhere}.tabellarisch-pdf-entry ul,.tabellarisch-pdf-list ul,.tabellarisch-pdf-ats ul{margin:0;padding-left:4.5mm}.tabellarisch-pdf-entry li,.tabellarisch-pdf-list li,.tabellarisch-pdf-ats li{margin:.45mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.tabellarisch-pdf-entry li::marker{color:var(--tab-muted)}\n  .tabellarisch-pdf-additional{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 12mm}.tabellarisch-pdf-list ul.inline{display:flex;flex-wrap:wrap;gap:1mm 6mm;padding:0;list-style:none}.tabellarisch-pdf-list ul.inline li:before{margin-right:1.5mm;color:var(--tab-accent);content:\"•\"}\n  .tabellarisch-pdf-continuation{display:flex;align-items:baseline;justify-content:space-between;gap:8mm;margin-bottom:6mm;padding-bottom:2.5mm;border-bottom:.35mm solid var(--tab-line)}.tabellarisch-pdf-continuation strong{color:var(--tab-primary);font-family:var(--heading-font);font-size:13pt}.tabellarisch-pdf-continuation span{color:var(--tab-accent);font-size:9pt;font-weight:600;text-align:right}.tabellarisch-pdf-footer{position:absolute;right:var(--tab-margin);bottom:6mm;left:var(--tab-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--tab-muted);font-size:7.5pt}.tabellarisch-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}\n  .tabellarisch-pdf[data-density=\"compact\"]{--tab-section-gap:5.2mm;--tab-entry-gap:3.4mm;font-size:max(8.3pt,var(--body-size));line-height:max(1.24,var(--body-line))}.tabellarisch-pdf[data-density=\"dense\"]{--tab-section-gap:4.1mm;--tab-entry-gap:2.6mm;--tab-margin:max(13mm,var(--doc-margin));font-size:8pt;line-height:1.22}.tabellarisch-pdf[data-density=\"dense\"] .tabellarisch-pdf-content{padding-top:13mm}.tabellarisch-pdf[data-density=\"dense\"] .tabellarisch-pdf-header{min-height:29mm}.tabellarisch-pdf[data-density=\"dense\"] .tabellarisch-pdf-header h1{font-size:22pt}.tabellarisch-pdf[data-density=\"dense\"] .tabellarisch-pdf-header h2{font-size:12pt}.tabellarisch-pdf[data-density=\"dense\"] .tabellarisch-pdf-title{margin-bottom:2.4mm;font-size:13.5pt}\n  .tabellarisch-pdf-ats{--tab-primary:#222b30;--tab-accent:#222b30;--tab-line:#cfd4d7;padding:14mm var(--tab-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.tabellarisch-pdf-ats .tabellarisch-pdf-header{display:block;min-height:0;padding-bottom:4mm;border-bottom:.35mm solid var(--tab-line)}.tabellarisch-pdf-ats .tabellarisch-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 5mm}.tabellarisch-pdf-ats .tabellarisch-pdf-contact{display:block}.tabellarisch-pdf-ats .tabellarisch-pdf-contact svg{display:none}.tabellarisch-pdf-ats .tabellarisch-pdf-title{font-size:11pt}.tabellarisch-pdf-ats .tabellarisch-pdf-entry{display:block}.tabellarisch-pdf-ats .tabellarisch-pdf-entry h3{font-size:11pt}.tabellarisch-pdf-ats .tabellarisch-pdf-organization{margin-bottom:1mm}.tabellarisch-pdf-ats-meta{margin:0 0 1.5mm;color:var(--tab-muted);font-size:8.3pt}\n  @media print{.no-print-background .tabellarisch-pdf-background{display:none!important}}\n", Nl = "\n  <script>\n    (() => {\n      const fit = (page) => {\n        const content = page.querySelector(\".page-content\");\n        if (!content) return;\n        if (page.dataset.noFit === \"true\") {\n          content.dataset.fitScale = \"1.000\";\n          return;\n        }\n        content.style.transform = \"\";\n        content.style.width = \"100%\";\n        const heightRatio = page.clientHeight / Math.max(content.scrollHeight, 1);\n        const widthRatio = page.clientWidth / Math.max(content.scrollWidth, 1);\n        const scale = Math.min(1, heightRatio, widthRatio);\n        if (scale < 0.999) {\n          content.style.transform = \"scale(\" + scale + \")\";\n          content.style.width = 100 / scale + \"%\";\n          content.dataset.fitScale = scale.toFixed(3);\n        } else {\n          content.dataset.fitScale = \"1.000\";\n        }\n      };\n      document.querySelectorAll(\".page\").forEach(fit);\n    })();\n  <\/script>", Pl = (e, t, n) => {
	let r = xc(e.templateId), i = e.accentColor || r.accent, a = e.secondaryColor || r.secondary, o = Sc(a), s = e.designSettings, c = s.resumeOutputMode === "ats" || s.columnLayout === "compact-ats", l = c ? "compact-ats" : s.columnLayout, u = `background-${s.backgroundId} ${s.showBackgroundInPrint ? "print-background" : "no-print-background"}`, d = fl(s, c), f = e.documents, p = t?.resumeSections ?? {
		profile: !0,
		strengths: !0,
		experience: !0,
		education: !0,
		skills: !0,
		languages: !0,
		certifications: !0
	}, m = hl(t), h = e.job.title, g = e.company.name, _ = t ? `${t.firstName.charAt(0)}${t.lastName.charAt(0)}`.toUpperCase() : "VN", v = ol(t?.photoPath), y = ol(t?.signaturePath), b = (e = !1) => c ? "" : v ? `<span class="cv-avatar${e ? " side-avatar" : ""} has-image"><img class="cv-avatar-image" src="${Z(v)}" alt=""></span>` : `<span class="cv-avatar${e ? " side-avatar" : ""}">${Z(_)}</span>`, x = t ? [
		t.phone,
		t.email,
		t.city,
		t.linkedin
	].filter(Boolean).map(Z).join(" · ") : "Telefon · E-Mail · Ort", S = wc(e), C = il(f), w = `layout-${r.layout}`, T = `
    <section class="page cover-page ${u}">
      ${d}
      <div class="page-content standard-page-content cover-content">
        <div class="rule"></div>
        <p class="kicker">Bewerbung</p>
        <h1>${Z(h)}</h1>
        <p class="muted">bei ${Z(g)}</p>
        <h2>${Z(m)}</h2>
        <p>${Z(f.deckblattStatement || t?.summary || "Motiviert, strukturiert und bereit für die nächste berufliche Aufgabe.")}</p>
        <div class="contact"><p>${yl(t)}</p></div>
      </div>
    </section>`, E = `
    <section class="page letter-page letter-${C.density} ${w} ${u}" data-resume-template="${Z(r.id)}">
      ${d}
      <div class="page-content letter-content">
        <div class="sender">${bl(t)}</div>
        <div class="rule"></div>
        <div class="recipient">${vl(e)}</div>
        <p class="date">${Z(t?.city || e.company.city)}, den ${S}</p>
        <p class="subject">${Z(f.coverSubject || `Bewerbung als ${h}`)}</p>
        <p>${Z(_l(e))},</p>
        <p class="letter-body">${Z(f.coverIntroduction || `die ausgeschriebene Position als ${h} bei ${g} spricht mich besonders an, weil sie fachliche Verantwortung mit konkretem Gestaltungsspielraum verbindet.`)}</p>
        <p class="letter-body">${Z(f.coverMotivation || "Meine Motivation entsteht aus der Möglichkeit, vorhandene Erfahrung gezielt einzusetzen, mich fachlich weiterzuentwickeln und gemeinsam mit Ihrem Team messbare Ergebnisse zu erzielen.")}</p>
        <p class="letter-body">${Z(f.coverQualification || t?.summary || "Ich arbeite strukturiert, zuverlässig und lösungsorientiert. Neue Anforderungen erfasse ich schnell und überführe sie in nachvollziehbare, belastbare Ergebnisse.")}</p>
        <p class="letter-body">${Z(f.coverCompanyFit || `An ${g} überzeugt mich besonders die Verbindung aus professionellem Anspruch und zukunftsorientierter Arbeitsweise.`)}</p>
        ${f.coverExtraParagraph ? `<p class="letter-body">${Z(f.coverExtraParagraph)}</p>` : ""}
        <p class="letter-body">${Z(f.coverClosing || "Gerne überzeuge ich Sie in einem persönlichen Gespräch davon, welchen konkreten Beitrag ich in Ihrem Team leisten kann. Auf Ihren Terminvorschlag freue ich mich.")}</p>
        <div class="signature"><p>Mit freundlichen Grüßen</p>${y ? `<img class="signature-image" src="${Z(y)}" alt="">` : ""}<span class="signature-name">${Z(m)}</span></div>
      </div>
    </section>`, D = new Map((t?.experiences ?? []).map((e) => [e.id, e])), O = new Map((t?.education ?? []).map((e) => [e.id, e])), k = p.profile ? `<section><h3>Zusammenfassung</h3><p>${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", A = p.skills ? ml(t, c) : "", j = p.languages && t?.languages.length ? `<section><h3>Sprachen</h3>${t.languages.map((e) => c ? `<p class="language language-plain"><span>${Z(e)}</span></p>` : `<p class="language"><span>${Z(e)}</span><i>●●●●○</i></p>`).join("")}</section>` : "", ee = p.certifications && t?.certifications.length ? `<section><h3>Zertifikate</h3><ul>${t.certifications.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", M = rl(t ? {
		...t,
		experiences: p.experience ? t.experiences : [],
		education: p.education ? t.education : []
	} : void 0, f.resumeProfile, r.id === "elegant" ? Vc : r.id === "zweispaltig" ? Bc : r.id === "kompakt" ? Hc : r.id === "kreativ" ? Uc : r.id === "gepflegt" ? Kc : r.id === "zeitgenoessisch" ? qc : r.id === "ivy-league" ? Jc : r.id === "stilvoll" ? Yc : r.id === "einspaltig" ? Xc : r.id === "klassisch" ? Zc : r.id === "tabellarisch" ? Wc : r.id === "modern" ? Gc : void 0), te = (e) => {
		let t = D.get(e);
		return t ? `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${Z(t.role)}</strong><p>${Z(t.company)}</p></div>
          <small>${Z(t.from)} – ${Z(t.to)}${t.city ? `<br>${Z(t.city)}` : ""}</small>
        </div>
        <ul>${t.achievements.filter(Boolean).map((e) => `<li>${Z(e)}</li>`).join("")}</ul>
      </article>` : "";
	}, N = (e) => {
		let t = O.get(e);
		return t ? `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${Z(t.degree)}</strong><p>${Z(t.institution)}</p></div>
          <small>${Z(t.from)} – ${Z(t.to)}${t.city ? `<br>${Z(t.city)}` : ""}</small>
        </div>
      </article>` : "";
	}, ne = () => {
		if (!t) return "";
		let e = [t.city, t.country].filter(Boolean).join(", "), n = [t.postalCode, e].filter(Boolean).join(" "), r = t.birthDate || t.birthPlace ? `${t.birthDate || ""}${t.birthPlace ? ` in ${t.birthPlace}` : ""}`.trim() : "", i = t.portfolio || t.github || "", a = [
			{
				icon: "☎",
				value: t.phone,
				href: t.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
			},
			{
				icon: "@",
				value: t.email,
				href: t.email ? `mailto:${t.email}` : ""
			},
			{
				icon: "↗",
				value: Q(t.linkedin),
				href: Q(t.linkedin)
			},
			{
				icon: "⌖",
				value: Q(i),
				href: Q(i)
			},
			{
				icon: "◆",
				value: n,
				href: ""
			},
			{
				icon: "☆",
				value: r,
				href: ""
			}
		].filter((e) => e.value?.trim());
		return a.length ? `<address class="elegant-pdf-contacts">${a.map((e) => {
			let t = `<i aria-hidden="true">${e.icon}</i><span>${Z(e.value)}</span>`;
			return e.href ? `<a href="${Z(e.href)}">${t}</a>` : `<span>${t}</span>`;
		}).join("")}</address>` : "";
	}, P = (e) => `
    <header class="elegant-pdf-header${e ? " elegant-pdf-header-compact" : ""}">
      ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
      <h1>${Z(m)}</h1>
      ${t?.title || h ? `<h2>${Z(t?.title || h)}</h2>` : ""}
      ${e ? "" : ne()}
    </header>`, F = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `
      <article class="elegant-pdf-entry">
        <div class="elegant-pdf-entry-head">
          <div>
            <h4>${Z(n.title)}</h4>
            <p>${Z(n.organization)}</p>
          </div>
          <div class="elegant-pdf-entry-meta">
            <strong>${Z(dl(n.from, n.to))}</strong>
            ${n.city ? `<span>${Z(n.city)}</span>` : ""}
          </div>
        </div>
        ${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}
      </article>` : "";
	}, I = ul(t?.skills ?? []).slice(0, 3), L = I.map((e) => {
		let [t, ...n] = e.split(/\s+(?:–|—|:)\s+/);
		return {
			title: t.trim(),
			description: n.join(" – ").trim()
		};
	}), R = L.length ? `<section><h3>Stärken</h3><div class="elegant-pdf-strengths">${L.map((e, t) => `<article class="elegant-pdf-strength"><i aria-hidden="true">${t ? "♥" : "◉"}</i><div><h4>${Z(e.title)}</h4>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>` : "", z = L.length ? `<section class="elegant-pdf-section"><h3>Stärken</h3><ul>${L.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul></section>` : "", B = ul(t?.languages ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+[–—-]\s+/), r = n.join(" – ").trim(), i = Ic(r);
		return {
			raw: e,
			name: t.trim() || e,
			level: r,
			score: i
		};
	}), re = p.languages && B.length ? `<section><h3>Sprachen</h3><div class="elegant-pdf-languages">${B.map((e) => `<article class="elegant-pdf-language"><strong>${Z(e.name)}</strong><span class="elegant-pdf-language-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e.score ? "filled" : ""}"></i>`).join("")}</span></article>`).join("")}</div></section>` : "", ie = t?.portfolio || t?.github || t?.linkedin || "", ae = (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => F(e.id, "experience")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => F(e.id, "education")).join(""), i = e.pageNumber > 1, a = e.pageNumber === M.length, o = `
      ${n ? `<section class="elegant-pdf-section"><h3>Berufserfahrung${i ? " · Fortsetzung" : ""}</h3><div class="elegant-pdf-list">${n}</div></section>` : ""}
      ${r ? `<section class="elegant-pdf-section"><h3>Ausbildung</h3><div class="elegant-pdf-list">${r}</div></section>` : ""}`;
		if (c) {
			let n = p.profile && !i ? `<section class="elegant-pdf-section"><h3>Zusammenfassung</h3><p>${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "";
			return `
        <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="elegant" data-no-fit="true">
          <div class="page-content elegant-pdf-ats">
            ${P(i)}
            ${n}
            ${o}
            ${a ? `${A}${j}${z}${ee}` : ""}
            <span class="page-number">${e.pageNumber} / ${M.length}</span>
          </div>
        </section>`;
		}
		let s = ie ? `<a href="${Z(Q(ie))}">${Z(Q(ie))}</a>` : "", l = i ? `<aside class="elegant-pdf-sidebar elegant-pdf-continuation">
          <p class="kicker">Lebenslauf</p>
          <h2>${Z(m)}</h2>
          ${t?.title ? `<p>${Z(t.title)}</p>` : ""}
          <hr>
          <p>Fortsetzung · Seite ${e.pageNumber} von ${M.length}</p>
          ${t?.email ? `<a href="mailto:${Z(t.email)}">${Z(t.email)}</a>` : ""}
          ${t?.phone ? `<a href="tel:${Z(t.phone.replace(/[^\d+]/g, ""))}">${Z(t.phone)}</a>` : ""}
          ${s}
        </aside>` : `<aside class="elegant-pdf-sidebar">
          ${v ? `<img class="elegant-pdf-photo" src="${Z(v)}" alt="">` : ""}
          ${k}
          ${R}
          ${A}
          ${re}
          ${ee}
        </aside>`, d = ie ? `<a href="${Z(Q(ie))}">${Z(Q(ie))}</a>` : "<span></span>";
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="elegant" data-no-fit="true">
        <div class="page-content elegant-pdf">
          <main class="elegant-pdf-main">
            ${P(i)}
            ${o}
            ${!n && !r && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
            <footer class="elegant-pdf-footer">${d}${M.length > 1 ? `<span>Seite ${e.pageNumber} von ${M.length}</span>` : ""}</footer>
          </main>
          ${l}
        </div>
      </section>`;
	}, oe = (e) => `<svg aria-hidden="true" viewBox="0 0 24 24">${{
		phone: "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.98.72 2.9a2 2 0 0 1-.45 2.11L8.1 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.35 1.9.59 2.9.72A2 2 0 0 1 22 16.92z\"/>",
		email: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"/>",
		linkedin: "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>",
		location: "<path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>",
		birth: "<path d=\"M4 12h16v8H4zM7 12V9h10v3M8 6V4M12 6V4M16 6V4\"/>",
		github: "<path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.28-.36 6.72-1.61 6.72-7.25A5.7 5.7 0 0 0 19.22 3.3 5.3 5.3 0 0 0 19.07.1S17.88-.3 15 1.6a13.4 13.4 0 0 0-7 0C5.12-.3 3.93.1 3.93.1a5.3 5.3 0 0 0-.15 3.2 5.7 5.7 0 0 0-1.5 3.95c0 5.63 3.44 6.88 6.72 7.25A4.8 4.8 0 0 0 8 18v4\"/><path d=\"M8 19c-3 .92-3-1.5-4-2\"/>",
		portfolio: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20\"/>",
		calendar: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M16 3v4M8 3v4M3 11h18\"/>"
	}[e]}</svg>`, se = () => {
		if (!t) return "";
		let e = [
			t.postalCode,
			t.city,
			t.country
		].filter(Boolean).join(" "), n = [t.birthDate, t.birthPlace].filter(Boolean).join(", "), r = [
			{
				kind: "phone",
				label: "Telefon",
				value: t.phone,
				href: t.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
			},
			{
				kind: "email",
				label: "E-Mail",
				value: t.email,
				href: t.email ? `mailto:${t.email}` : ""
			},
			{
				kind: "linkedin",
				label: "LinkedIn",
				value: t.linkedin,
				href: Q(t.linkedin)
			},
			{
				kind: "location",
				label: "Wohnort",
				value: e,
				href: ""
			},
			{
				kind: "birth",
				label: "Geboren",
				value: n,
				href: ""
			},
			{
				kind: "github",
				label: "GitHub",
				value: t.github,
				href: Q(t.github)
			},
			{
				kind: "portfolio",
				label: "Portfolio",
				value: t.portfolio,
				href: Q(t.portfolio)
			}
		].filter((e) => e.value?.trim());
		return r.length ? `<address class="zweispaltig-pdf-contacts">${r.map((e) => {
			let t = c ? `<strong>${Z(e.label)}</strong><span>${Z(e.value)}</span>` : `${oe(e.kind)}<span>${Z(e.value)}</span>`;
			return e.href ? `<a data-contact-kind="${e.kind}" href="${Z(e.href)}">${t}</a>` : `<span data-contact-kind="${e.kind}">${t}</span>`;
		}).join("")}</address>` : "";
	}, V = (e, n) => {
		let r = ul(t?.skills ?? []).slice(0, 3), i = [t?.title || (r.length ? "" : h), ...e ? [] : r].filter(Boolean);
		return `
      <header class="zweispaltig-pdf-header${e ? " compact" : ""}">
        <div>
          ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
          <h1>${Z(m)}</h1>
          ${i.length ? `<h2>${i.map((e) => `<span>${Z(e)}</span>`).join("")}</h2>` : ""}
          ${e ? "" : se()}
        </div>
        ${n && v ? `<img class="zweispaltig-pdf-photo" src="${Z(v)}" alt="">` : ""}
      </header>`;
	}, ce = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `
      <article class="zweispaltig-pdf-entry">
        <h4>${Z(n.title)}</h4>
        <p class="zweispaltig-pdf-entry-organization">${Z(n.organization)}</p>
        <p class="zweispaltig-pdf-entry-meta">
          <span>${oe("calendar")}${Z(dl(n.from, n.to))}</span>
          ${n.city ? `<span>${oe("location")}${Z(n.city)}</span>` : ""}
        </p>
        ${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}
      </article>` : "";
	}, H = (t?.strengths ?? []).map((e) => ({
		title: e.title.trim(),
		description: e.description.trim()
	})).filter((e) => e.title).slice(0, 3), U = H.length ? H : L, le = [
		"<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\"/></svg>",
		"<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><path d=\"m15 4 5 5L7 22l-4 1 1-4Z\"/><path d=\"m14 5 5 5M6 3v4M4 5h4M19 16v4M17 18h4\"/></svg>",
		"<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><path d=\"M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z\"/><path d=\"m9 12 2 2 4-4\"/></svg>"
	], ue = U.length ? `<section><h3>${Z(as(t, "strengths"))}</h3><div class="zweispaltig-pdf-strengths">${U.map((e, t) => `<article class="zweispaltig-pdf-strength">${le[t] ?? le[2]}<div><h4>${Z(e.title)}</h4>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>` : "", de = U.length ? `<section class="zweispaltig-pdf-section"><h3>${Z(as(t, "strengths"))}</h3><ul>${U.map((e) => `<li>${Z(e.title)}${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul></section>` : "", fe = ul(t?.languages ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+[–—-]\s+/), r = n.join(" – ").trim();
		return {
			raw: e,
			name: t.trim() || e,
			score: Ic(r)
		};
	}), pe = p.languages && fe.length ? `<section><h3>${Z(as(t, "languages"))}</h3><div class="zweispaltig-pdf-languages">${fe.map((e) => `<article class="zweispaltig-pdf-language"><h4>${Z(e.name)}</h4><span class="zweispaltig-pdf-language-dots" aria-label="${Z(e.raw)}">${Array.from({ length: 6 }, (t, n) => `<i${n < e.score ? " class=\"filled\"" : ""}></i>`).join("")}</span></article>`).join("")}</div></section>` : "", me = t?.portfolio || t?.github || t?.linkedin || "", he = (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => ce(e.id, "experience")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => ce(e.id, "education")).join(""), i = e.pageNumber > 1, a = e.pageNumber === M.length, o = n ? `<section class="zweispaltig-pdf-section"><h3>${Z(as(t, "experience"))}${i ? " · Fortsetzung" : ""}</h3><div class="zweispaltig-pdf-list">${n}</div></section>` : "", s = r ? `<section class="zweispaltig-pdf-section"><h3>${Z(as(t, "education"))}</h3><div class="zweispaltig-pdf-list">${r}</div></section>` : "", l = `${o}${s}`;
		if (c) {
			let n = p.profile && !i ? `<section class="zweispaltig-pdf-section"><h3>${Z(as(t, "summary"))}</h3><p class="zweispaltig-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "";
			return `
        <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="zweispaltig" data-no-fit="true">
          <div class="page-content zweispaltig-pdf zweispaltig-pdf-ats" data-density="${e.density}">
            ${V(i, !1)}
            ${n}
            ${l}
            ${a ? `${A}${j}${de}${ee}` : ""}
            <span class="page-number">${e.pageNumber} / ${M.length}</span>
          </div>
        </section>`;
		}
		let d = p.profile && !i ? `<section class="zweispaltig-pdf-section"><h3>${Z(as(t, "summary"))}</h3><p class="zweispaltig-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", m = hs(t, "zweispaltig"), h = ms(t, "zweispaltig"), g = (e) => e === "summary" ? d : e === "experience" ? o : e === "education" ? s : e === "strengths" ? p.strengths ? ue : "" : e === "knowledge" ? A : e === "languages" ? pe : e === "certifications" ? ee : "", _ = m ? h.filter(({ zone: e }) => e === "main" || e === "full").map(({ type: e }) => g(e)).join("") : l, v = m ? h.filter(({ zone: e }) => e === "sidebar").map(({ type: e }) => g(e)).join("") : `${d}${ue}${A}${pe}${ee}`, y = i ? "" : `<aside class="zweispaltig-pdf-sidebar">
          ${v}
        </aside>`, b = me ? `<a href="${Z(Q(me))}">${Z(me)}</a>` : "<span></span>";
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="zweispaltig" data-no-fit="true">
        <div class="page-content zweispaltig-pdf" data-density="${e.density}">
          ${V(i, !i)}
          <div class="zweispaltig-pdf-columns${i ? " continuation" : ""}">
            <main class="zweispaltig-pdf-main">
              ${_}
              ${!n && !r && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
            </main>
            ${y}
          </div>
          <footer class="zweispaltig-pdf-footer">${b}<span>Seite ${e.pageNumber} von ${M.length}</span></footer>
        </div>
      </section>`;
	}, ge = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true">${{
		contacts: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/>",
		strengths: "<path d=\"m12 3 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z\"/>",
		languages: "<path d=\"M4 5h10M9 5c0 6-2 10-5 13M6 10c2 3 4 5 7 7M14 9h6M17 7v11M14 15h6\"/>",
		summary: "<circle cx=\"12\" cy=\"8\" r=\"3\"/><path d=\"M6 20v-2a6 6 0 0 1 12 0v2\"/>",
		experience: "<path d=\"M4 7h16v12H4zM9 7V4h6v3M4 12h16M10 12v2h4v-2\"/>",
		education: "<path d=\"m3 9 9-5 9 5-9 5zM6 11v5c3 2 9 2 12 0v-5\"/>",
		certifications: "<path d=\"M7 4h10v16l-5-3-5 3zM9 8h6M9 11h6\"/>",
		phone: "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z\"/>",
		email: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"/>",
		link: "<path d=\"M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1\"/>",
		location: "<path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>"
	}[e]}</svg>`, _e = (e, t) => `<header class="zeit-pdf-heading"><i aria-hidden="true">${ge(t)}</i><h3>${Z(e)}</h3></header>`, ve = [
		{
			kind: "phone",
			label: "Telefon",
			icon: "phone",
			value: t?.phone,
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			kind: "email",
			label: "E-Mail",
			icon: "email",
			value: t?.email,
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			label: "Portfolio",
			icon: "link",
			value: t?.portfolio ? Q(t.portfolio) : "",
			href: Q(t?.portfolio)
		},
		{
			kind: "linkedin",
			label: "LinkedIn",
			icon: "link",
			value: t?.linkedin ? Q(t.linkedin) : "",
			href: Q(t?.linkedin)
		},
		{
			kind: "location",
			label: "Wohnort",
			icon: "location",
			value: [
				t?.postalCode,
				t?.city,
				t?.country
			].filter(Boolean).join(" "),
			href: ""
		},
		{
			label: "GitHub",
			icon: "link",
			value: t?.github ? Q(t.github) : "",
			href: Q(t?.github)
		}
	].filter((e) => e.value?.trim()), ye = (e) => ve.length ? e ? `<address class="zeit-pdf-ats-contacts">${ve.map((e) => {
		let t = `<strong>${Z(e.label)}:</strong> ${Z(e.value)}`;
		return e.href ? `<a href="${Z(e.href)}">${t}</a>` : `<span>${t}</span>`;
	}).join("")}</address>` : `<section>${_e("Kontakte", "contacts")}<div class="zeit-pdf-contacts">${ve.map((e) => {
		let t = e.value ?? "", n = e.label === "LinkedIn" ? "/in/" : e.label === "GitHub" ? "github.com/" : "", r = n ? t.indexOf(n) + n.length : 0, i = r > n.length ? `${Z(t.slice(0, r))}<br>${Z(t.slice(r))}` : Z(t), a = `<i aria-hidden="true">${ge(e.icon)}</i><span>${i}</span>`;
		return e.href ? `<a class="zeit-pdf-contact" href="${Z(e.href)}">${a}</a>` : `<span class="zeit-pdf-contact">${a}</span>`;
	}).join("")}</div></section>` : "", W = (e, n) => {
		let r = !e && !n && v ? `<div class="zeit-pdf-photo-composition">
            <span class="zeit-pdf-photo-pale"></span>
            <span class="zeit-pdf-photo-soft"></span>
            <span class="zeit-pdf-photo-accent"></span>
            <img class="zeit-pdf-photo" src="${Z(v)}" alt="">
          </div>` : "";
		return `
      <header class="zeit-pdf-header${e ? " compact" : ""}${r ? "" : " no-photo"}">
        ${r}
        <div class="zeit-pdf-identity">
          ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
          <h1>${Z(m)}</h1>
          ${t?.title || h ? `<h2>${Z(t?.title || h)}</h2>` : ""}
          ${n && !e ? ye(!0) : ""}
        </div>
      </header>`;
	}, be = ul(t?.languages ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+[–—-]\s+/), r = n.join(" – ").trim();
		return {
			raw: e,
			name: t.trim() || e,
			level: r,
			score: Ic(r)
		};
	}), xe = be.length ? `<section>${_e("Sprachen", "languages")}<div class="zeit-pdf-languages">${be.map((e) => `<article class="zeit-pdf-language"><div><h4>${Z(e.name)}</h4><span class="zeit-pdf-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e.score ? "filled" : ""}"></i>`).join("")}</span></div></article>`).join("")}</div></section>` : "", Se = be.length ? `<section class="zeit-pdf-section">${_e("Sprachen", "languages")}<ul>${be.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul></section>` : "", Ce = I.map((e) => {
		let [t, ...n] = e.split(/\s+(?:–|—|:)\s+/);
		return {
			title: t.trim(),
			description: n.join(" – ").trim()
		};
	}), we = Ce.length ? `<section>${_e("Stärken", "strengths")}<div class="zeit-pdf-strengths">${Ce.map((e) => `<article class="zeit-pdf-strength"><i aria-hidden="true"></i><div><h4>${Z(e.title)}</h4>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>` : "", Te = Ce.length ? `<section class="zeit-pdf-section">${_e("Stärken", "strengths")}<ul>${Ce.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul></section>` : "", Ee = ul(t?.certifications ?? []), De = Ee.length ? `<section>${_e("Zertifikate", "certifications")}<ul>${Ee.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", Oe = Ee.length ? `<section class="zeit-pdf-section">${_e("Zertifikate", "certifications")}<ul>${Ee.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", ke = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `
      <article class="zeit-pdf-entry">
        <div class="zeit-pdf-entry-top">
          <h4>${Z(n.organization)}</h4>
          <span>${Z(n.city)}</span>
        </div>
        <div class="zeit-pdf-entry-role">
          <h5>${Z(n.title)}</h5>
          <span>${Z(dl(n.from, n.to))}</span>
        </div>
        ${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}
      </article>` : "";
	}, Ae = t?.portfolio || t?.github || t?.linkedin || "", G = (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => ke(e.id, "experience")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => ke(e.id, "education")).join(""), i = e.pageNumber > 1, a = e.pageNumber === M.length, o = n ? `<section class="zeit-pdf-section">${_e(c ? "Berufserfahrung" : "Erfahrung", "experience")}<div class="zeit-pdf-list">${n}</div></section>` : "", s = r ? `<section class="zeit-pdf-section">${_e("Ausbildung", "education")}<div class="zeit-pdf-list">${r}</div></section>` : "";
		if (c) {
			let n = p.profile && !i ? `<section class="zeit-pdf-section">${_e("Zusammenfassung", "summary")}<p class="zeit-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "";
			return `
        <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="zeitgenoessisch" data-no-fit="true">
          <div class="page-content zeit-pdf zeit-pdf-ats">
            ${W(i, !0)}
            ${n}
            ${o}
            ${s}
            ${a ? `${A}${p.languages ? Se : ""}${p.strengths ? Te : ""}${p.certifications ? Oe : ""}` : ""}
            <span class="page-number">${e.pageNumber} / ${M.length}</span>
          </div>
        </section>`;
		}
		let l = p.profile && !i ? `<section class="zeit-pdf-section">${_e("Zusammenfassung", "summary")}<p class="zeit-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", d = i ? "" : `<aside class="zeit-pdf-left">
          ${ye(!1)}
          ${p.strengths ? we : ""}
          ${A}
          ${p.languages ? xe : ""}
          ${p.certifications ? De : ""}
        </aside>`, m = Ae ? `<a href="${Z(Q(Ae))}">${Z(Ae)}</a>` : "<span></span>";
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="zeitgenoessisch" data-no-fit="true">
        <div class="page-content zeit-pdf">
          ${W(i, !1)}
          <div class="zeit-pdf-columns${i ? " continuation" : ""}">
            ${d}
            <main class="zeit-pdf-main">
              ${l}
              ${o}
              ${s}
              ${!n && !r && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
            </main>
          </div>
          <footer class="zeit-pdf-footer">${m}${M.length > 1 ? `<span>Seite ${e.pageNumber} von ${M.length}</span>` : ""}</footer>
        </div>
      </section>`;
	}, je = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true">${{
		phone: "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z\"/>",
		mail: "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-10 6L2 7\"/>",
		linkedin: "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z\"/><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/>",
		location: "<path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
		birth: "<path d=\"M4 21h16M7 21V10h10v11M9 10V7h6v3M12 7V3M10 5h4\"/>",
		strength: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8.5 12 2.2 2.2 4.8-5\"/>"
	}[e]}</svg>`, Me = [
		{
			kind: "phone",
			label: "Telefon",
			icon: je("phone"),
			value: t?.phone,
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			kind: "email",
			label: "E-Mail",
			icon: je("mail"),
			value: t?.email,
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			kind: "linkedin",
			label: "LinkedIn",
			icon: je("linkedin"),
			value: t?.linkedin,
			href: Q(t?.linkedin)
		},
		{
			kind: "location",
			label: "Wohnort",
			icon: je("location"),
			value: [
				t?.postalCode,
				t?.city,
				t?.country
			].filter(Boolean).join(" "),
			href: ""
		},
		{
			kind: "birth",
			label: "Geboren",
			icon: je("birth"),
			value: [t?.birthDate, t?.birthPlace].filter(Boolean).join(", "),
			href: ""
		}
	].filter((e) => e.value?.trim()), Ne = () => Me.length ? `<address class="kreativ-pdf-contacts">${Me.map((e) => {
		let t = `${e.icon}<i>${Z(e.value)}</i>`;
		return e.href ? `<a aria-label="${Z(e.label)}" data-contact-kind="${e.kind}" href="${Z(e.href)}">${t}</a>` : `<span aria-label="${Z(e.label)}" data-contact-kind="${e.kind}">${t}</span>`;
	}).join("")}</address>` : "", Pe = (e, n) => {
		let r = !e && !n && v ? `<img class="kreativ-pdf-photo" src="${Z(v)}" alt="">` : "";
		return `
      <header class="kreativ-pdf-header${e ? " compact" : ""}${r ? "" : " no-photo"}">
        <div class="kreativ-pdf-identity">
          ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
          <h1>${Z(m)}</h1>
          ${t?.title || h ? `<h2>${Z(t?.title || h)}</h2>` : ""}
          ${e ? "" : Ne()}
        </div>
        ${r}
      </header>`;
	}, Fe = ul(t?.languages ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+[–—-]\s+/), r = n.join(" – ").trim();
		return {
			raw: e,
			name: t.trim() || e,
			level: r,
			score: Ic(r)
		};
	}), Ie = Fe.length ? `<section><h3>Sprachen</h3><div class="kreativ-pdf-languages">${Fe.map((e) => `<article class="kreativ-pdf-language"><h4>${Z(e.name)}</h4><div><span class="kreativ-pdf-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e.score ? "filled" : ""}"></i>`).join("")}</span></div></article>`).join("")}</div></section>` : "", Le = Fe.length ? `<section><h3>Sprachen</h3><ul>${Fe.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul></section>` : "", Re = t ? Mc(t.knowledgeSection, t.skills) : void 0, ze = (Re?.categories ?? []).filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => [...Oc(e.items), ...e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => Oc(e.items))]).slice(0, 3), Be = ze.length ? `<section><h3>Stärken</h3><div class="kreativ-pdf-strengths">${ze.map((e) => `<article class="kreativ-pdf-strength">${je("strength")}<div><h4>${Z(e.name)}</h4>${e.description?.trim() ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>` : "", Ve = ze.length ? `<section><h3>Stärken</h3><ul>${ze.map((e) => `<li>${Z(e.name)}</li>`).join("")}</ul></section>` : "", He = ul((Re?.categories ?? []).filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => [...Oc(e.items).map((t) => kc(t, e.showLevels, e.showYearsOfExperience, "comma-separated")), ...e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((t) => Oc(t.items).map((t) => kc(t, e.showLevels, e.showYearsOfExperience, "comma-separated")))])), Ue = He.length ? `<section><h3>Fähigkeiten</h3><div class="kreativ-pdf-skills">${He.map((e) => `<span class="kreativ-pdf-skill">${Z(e)}</span>`).join("")}</div></section>` : "", We = ul(t?.certifications ?? []), Ge = We.length ? `<section><h3>Zertifikate</h3><ul>${We.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", Ke = We.length ? `<section><h3>Zertifikate</h3><ul>${We.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", qe = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `
      <article class="kreativ-pdf-entry">
        <h4>${Z(n.title)}</h4>
        <h5>${Z(n.organization)}</h5>
        <p class="kreativ-pdf-entry-meta">
          <span>${Z(dl(n.from, n.to))}</span>
          ${n.city ? `<span>${Z(n.city)}</span>` : ""}
        </p>
        ${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}
      </article>` : "";
	}, Je = t?.portfolio || t?.github || t?.linkedin || "", Ye = (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => qe(e.id, "experience")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => qe(e.id, "education")).join(""), i = e.pageNumber > 1, a = e.pageNumber === M.length, o = n ? `<section class="kreativ-pdf-section"><h3 class="kreativ-pdf-title">${c ? "Berufserfahrung" : "Erfahrung"}</h3><div class="kreativ-pdf-list">${n}</div></section>` : "", s = r ? `<section class="kreativ-pdf-section"><h3 class="kreativ-pdf-title">Ausbildung</h3><div class="kreativ-pdf-list">${r}</div></section>` : "";
		if (c) {
			let n = p.profile && !i ? `<section><h3>Zusammenfassung</h3><p class="kreativ-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "";
			return `
        <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="kreativ" data-no-fit="true">
          <div class="page-content kreativ-pdf kreativ-pdf-ats" data-density="${e.density}">
            ${Pe(i, !0)}
            ${n}
            ${o}
            ${s}
            ${a ? `${A}${p.languages ? Le : ""}${p.skills ? Ve : ""}${p.certifications ? Ke : ""}` : ""}
            <span class="page-number">${e.pageNumber} / ${M.length}</span>
          </div>
        </section>`;
		}
		let l = p.profile && !i ? `<section><h3>Zusammenfassung</h3><p class="kreativ-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", d = i ? "" : "<svg class=\"kreativ-pdf-background\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><g class=\"wide\"><circle cx=\"58\" cy=\"30\" r=\"37\"/><circle cx=\"72\" cy=\"44\" r=\"31\"/><circle cx=\"84\" cy=\"59\" r=\"25\"/></g><g class=\"tight\"><circle cx=\"96\" cy=\"70\" r=\"21\"/><circle cx=\"65\" cy=\"21\" r=\"24\"/><circle cx=\"89\" cy=\"35\" r=\"18\"/><circle cx=\"99\" cy=\"49\" r=\"14\"/></g></svg>", m = i ? "" : `<aside class="kreativ-pdf-right">
          ${l}
          ${p.skills ? Be : ""}
          ${p.languages ? Ie : ""}
          ${p.skills ? Ue : ""}
          ${p.certifications ? Ge : ""}
        </aside>`, h = Je ? `<a href="${Z(Q(Je))}">${Z(Je)}</a>` : "<span></span>";
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="kreativ" data-no-fit="true">
        <div class="page-content kreativ-pdf" data-density="${e.density}">
          ${d}
          ${Pe(i, !1)}
          <div class="kreativ-pdf-content${i ? " continuation" : ""}">
            <main class="kreativ-pdf-left">
              ${o}
              ${s}
              ${!n && !r && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
            </main>
            ${m}
          </div>
          <footer class="kreativ-pdf-footer">${h}<span>Seite ${e.pageNumber} / ${M.length}</span></footer>
        </div>
      </section>`;
	}, Xe = t?.linkedin || t?.portfolio || t?.github || "", Ze = [
		{
			value: t?.phone || "",
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			value: t?.email || "",
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			value: Xe ? Q(Xe) : "",
			href: Xe ? Q(Xe) : ""
		},
		{
			value: [t?.city, t?.country].filter(Boolean).join(", "),
			href: ""
		},
		{
			value: t?.birthDate || t?.birthPlace ? `Geb. ${t?.birthDate || ""}${t?.birthPlace ? ` in ${t.birthPlace}` : ""}`.trim() : "",
			href: ""
		}
	].filter((e) => e.value.trim()), Qe = ul(t?.skills ?? []).slice(0, 3).map((e) => e.split(/\s+(?:–|—|:)\s+/)[0]).join(" | "), $e = [t?.title || h, Qe].filter(Boolean).join(" | "), et = Ze.length ? `<address class="ivy-pdf-contacts">${Ze.map((e, t) => {
		let n = e.href ? `<a href="${Z(e.href)}">${Z(e.value)}</a>` : `<span>${Z(e.value)}</span>`;
		return `${t ? "<i aria-hidden=\"true\">•</i>" : ""}${n}`;
	}).join("")}</address>` : "", tt = (e) => `
    <header class="ivy-pdf-header${e ? " compact" : ""}">
      ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
      <h1>${Z(m)}</h1>
      ${$e ? `<h2>${Z($e)}</h2>` : ""}
      ${e ? "" : et}
    </header>`, nt = (t?.strengths ?? []).map(({ title: e, description: t }) => ({
		title: e.trim(),
		description: t.trim()
	})).filter(({ title: e }) => e), rt = (nt.length ? nt : ul(t?.skills ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+(?:–|—|:)\s+/);
		return {
			title: t.trim(),
			description: n.join(" – ").trim()
		};
	})).slice(0, 6), it = rt.length ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Stärken</h3><div class="ivy-pdf-strengths">${rt.map((e, t) => `<article class="ivy-pdf-strength"><i aria-hidden="true">${[
		"♥",
		"✦",
		"⚑",
		"◆",
		"★",
		"✣"
	][t]}</i><div><h3>${Z(e.title)}</h3>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>` : "", at = rt.length ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Stärken</h3><ul>${rt.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul></section>` : "", ot = Fe.length ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Sprachen</h3><div class="ivy-pdf-languages">${Fe.map((e) => `<article class="ivy-pdf-language"><strong>${Z(e.name)}</strong><span class="ivy-pdf-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e.score ? "filled" : ""}"></i>`).join("")}</span></article>`).join("")}</div></section>` : "", st = Fe.length ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Sprachen</h3><ul>${Fe.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul></section>` : "", ct = He.length ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Kenntnisse</h3><p class="ivy-pdf-knowledge">${He.map(Z).join(" · ")}</p></section>` : "", lt = We.length ? `<section class="ivy-pdf-section ivy-pdf-certifications"><h3 class="ivy-pdf-title">Zertifikate</h3><ul>${We.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", ut = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `<article class="ivy-pdf-entry">
      <div class="ivy-pdf-entry-top"><h3>${Z(n.organization)}</h3>${n.city ? `<span>${Z(n.city)}</span>` : "<span></span>"}</div>
      <div class="ivy-pdf-entry-role"><h4>${Z(n.title)}</h4><span>${Z(dl(n.from, n.to))}</span></div>
      ${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}
    </article>` : "";
	}, dt = t?.portfolio || t?.github || t?.linkedin || "", ft = ms(t, "ivy-league"), pt = hs(t, "ivy-league"), mt = (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => ut(e.id, "experience")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => ut(e.id, "education")).join(""), i = e.pageNumber > 1, a = e.pageNumber === M.length, o = n ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">${c ? "Berufserfahrung" : "Erfahrung"}${i ? "<small class=\"muted\"> · Fortsetzung</small>" : ""}</h3><div class="ivy-pdf-list">${n}</div></section>` : "", l = r ? `<section class="ivy-pdf-section ivy-pdf-education"><h3 class="ivy-pdf-title">Ausbildung</h3><div class="ivy-pdf-list">${r}</div></section>` : "", d = p.profile && !i ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Zusammenfassung</h3><p class="ivy-pdf-summary">${Z(f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>` : "", m = (pt ? ft.map(({ type: e }) => e) : c ? [
			"summary",
			"experience",
			"education",
			"knowledge",
			"languages",
			"strengths",
			"certifications"
		] : [
			"summary",
			"strengths",
			"experience",
			"education",
			"knowledge",
			"languages",
			"certifications"
		]).map((e) => e === "summary" ? d : e === "strengths" ? p.strengths && !i ? c ? at : it : "" : e === "experience" ? p.experience ? o : "" : e === "education" ? p.education ? l : "" : e === "knowledge" ? a && p.skills ? ct : "" : e === "languages" ? a && p.languages ? c ? st : ot : "" : e === "certifications" && a && p.certifications ? lt : "").join(""), h = dt ? `<a href="${Z(Q(dt))}">${Z(Q(dt))}</a>` : "<span></span>";
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="ivy-league" data-no-fit="true">
      <div class="page-content ivy-pdf${c ? " ivy-pdf-ats" : ""}" data-density="${e.density}">
        ${!c && s.backgroundId === "pastel-gradient" ? "\n    <svg class=\"ivy-pdf-watercolor\" viewBox=\"0 0 210 297\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n      <defs><filter id=\"ivy-pdf-watercolor\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\"><feTurbulence type=\"fractalNoise\" baseFrequency=\".012 .025\" numOctaves=\"3\" seed=\"17\" result=\"noise\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"6\" xChannelSelector=\"R\" yChannelSelector=\"B\"/><feGaussianBlur stdDeviation=\"3.4\"/></filter><linearGradient id=\"ivy-pdf-paper\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#eef9f8\"/><stop offset=\".48\" stop-color=\"#fbfdf9\"/><stop offset=\"1\" stop-color=\"#fff8e9\"/></linearGradient></defs>\n      <rect width=\"210\" height=\"297\" fill=\"url(#ivy-pdf-paper)\"/>\n      <g filter=\"url(#ivy-pdf-watercolor)\" opacity=\".52\">\n        <path d=\"M-18 4C18-9 48 1 73 24c16 15 15 38-4 55-25 23-63 30-91 12z\" fill=\"#d9f1f4\"/>\n        <path d=\"M123-15c34 4 78 1 106 30v59c-34 7-79-8-97-31-13-17-15-38-9-58z\" fill=\"#fff1d8\"/>\n        <path d=\"M-12 93c38-20 81-12 101 17 20 28-3 56-42 62-28 5-52-2-66-20z\" fill=\"#e3f5ed\"/>\n        <path d=\"M133 85c31-12 74 1 91 28v67c-23 14-68 4-89-24-19-25-18-56-2-71z\" fill=\"#e4f3f3\"/>\n        <path d=\"M-20 191c28-18 65-18 89 7 24 26 19 58-8 78-22 16-55 15-81 3z\" fill=\"#e9f6f4\"/>\n        <path d=\"M93 185c34-24 83-20 118 6 29 22 31 69 10 102H116c-24-22-42-78-23-108z\" fill=\"#fff1d4\"/>\n        <path d=\"M144 247c29-13 67 1 84 25v36h-89c-10-22-7-48 5-61z\" fill=\"#d8f1f2\"/>\n      </g>\n    </svg>" : ""}
        <div class="ivy-pdf-content">
          ${tt(i)}
          ${m}
          ${!n && !r && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
        </div>
        <footer class="ivy-pdf-footer">${h}${M.length > 1 ? `<span>Seite ${e.pageNumber} / ${M.length}</span>` : ""}</footer>
      </div>
    </section>`;
	}, ht = f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.", gt = t?.portfolio || t?.github || t?.linkedin || "", _t = (t?.strengths ?? []).map(({ title: e, description: t }) => ({
		title: e.trim(),
		description: t.trim()
	})).filter(({ title: e }) => e), vt = (_t.length ? _t : ul(t?.skills ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+(?:–|—|:)\s+/);
		return {
			title: t.trim(),
			description: n.join(" – ").trim()
		};
	})).slice(0, 4), yt = [
		{
			kind: "phone",
			icon: "☎",
			value: t?.phone || "",
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			kind: "email",
			icon: "@",
			value: t?.email || "",
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			kind: "linkedin",
			icon: "↗",
			value: t?.linkedin ? Q(t.linkedin) : "",
			href: t?.linkedin ? Q(t.linkedin) : ""
		},
		{
			kind: "website",
			icon: "⌖",
			value: t?.portfolio || t?.github ? Q(t?.portfolio || t?.github || "") : "",
			href: t?.portfolio || t?.github ? Q(t?.portfolio || t?.github || "") : ""
		},
		{
			kind: "location",
			icon: "◆",
			value: [t?.city, t?.country].filter(Boolean).join(", "),
			href: ""
		},
		{
			kind: "birth",
			icon: "☆",
			value: t?.birthDate || t?.birthPlace ? `Geb. ${t?.birthDate || ""}${t?.birthPlace ? ` in ${t.birthPlace}` : ""}`.trim() : "",
			href: ""
		}
	].filter((e) => e.value.trim()), bt = [t?.title || h, ...vt.slice(0, 3).map((e) => e.title)].filter(Boolean).join(" | "), xt = (e, t = !1) => `<footer class="managed-pdf-footer">${gt ? `<a href="${Z(Q(gt))}">${Z(Q(gt))}</a>` : "<span></span>"}${!t || M.length > 1 ? `<span>Seite ${e.pageNumber} / ${M.length}</span>` : ""}</footer>`, St = (e) => `<span class="managed-pdf-dots">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e ? "filled" : ""}"></i>`).join("")}</span>`, Ct = (e, t, n) => {
		let r = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.role,
				organization: t.company,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				from: t.from,
				to: t.to,
				title: t.degree,
				organization: t.institution,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		if (!r) return "";
		let i = r.achievements.length ? `<ul>${r.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : "";
		return n === "einfach" ? `<article class="managed-pdf-entry einfach-pdf-entry"><h3>${Z(r.title)}</h3><h4>${Z(r.organization)}</h4><p class="einfach-pdf-meta"><span>${Z(dl(r.from, r.to))}</span>${r.city ? `<span>${Z(r.city)}</span>` : ""}</p>${i}</article>` : n === "kompakt" ? `<article class="managed-pdf-entry kompakt-pdf-entry"><h3>${Z(r.title)}</h3><p class="kompakt-pdf-meta"><strong>${Z(r.organization)}</strong><span>${Z(dl(r.from, r.to))}</span>${r.city ? `<span>${Z(r.city)}</span>` : ""}</p>${i}</article>` : `<article class="managed-pdf-entry stilvoll-pdf-entry"><h3>${Z(r.title)}</h3><p class="stilvoll-pdf-meta"><strong>${Z(r.organization)}</strong><span>${Z(dl(r.from, r.to))}${r.city ? ` · ${Z(r.city)}` : ""}</span></p>${i}</article>`;
	}, K = (e, t, n = "") => t ? `<section class="managed-pdf-section ${n}"><h3 class="managed-pdf-title">${e}</h3>${t}</section>` : "", wt = yt.map((e) => {
		let t = Z(e.value);
		return e.href ? `<a href="${Z(e.href)}">${t}</a>` : t;
	}).join(" · "), Tt = vt.length ? `<ul>${vt.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul>` : "", Et = Fe.length ? `<ul>${Fe.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul>` : "", Dt = Re?.isVisible && He.length ? `<p>${He.map(Z).join(" · ")}</p>` : "", Ot = We.length ? `<ul>${We.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : "", kt = (e, t, n = t) => {
		let r = e.pageNumber > 1, i = e.pageNumber === M.length, a = e.items.filter((e) => e.kind === "experience").map((e) => Ct(e.id, "experience", t)).join(""), o = e.items.filter((e) => e.kind === "education").map((e) => Ct(e.id, "education", t)).join("");
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="${n}" data-no-fit="true"><div class="page-content managed-pdf ${t}-pdf managed-pdf-ats" data-density="${e.density}">
      <header class="managed-pdf-header ${t}-pdf-header${r ? " compact" : ""}">
        ${r ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
        <h1>${Z(m)}</h1>${bt ? `<h2>${Z(bt)}</h2>` : ""}
      </header>
      ${r ? "" : K("Persönliche Daten", `<p>${wt}</p>`)}
      ${p.profile && !r ? K("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}
      ${p.experience && a ? K(`Berufserfahrung${r ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${a}</div>`) : ""}
      ${p.education && o ? K("Ausbildung", `<div class="managed-pdf-list">${o}</div>`) : ""}
      ${i && p.skills ? K("Kenntnisse", Dt) : ""}
      ${i && p.languages ? K("Sprachen", Et) : ""}
      ${i && p.strengths ? K("Stärken", Tt) : ""}
      ${i && p.certifications ? K(t === "kompakt" ? "Erfolge und Zertifikate" : "Zertifikate", Ot) : ""}
      ${xt(e)}
    </div></section>`;
	}, At = (e, t) => {
		let n = e === "stilvoll" ? "stilvoll-pdf-contacts" : "einfach-pdf-contacts", r = e === "stilvoll" ? "" : "einfach-pdf-contact", i = yt.map((e) => {
			let t = e.href ? `<a href="${Z(e.href)}">${Z(e.value)}</a>` : `<span>${Z(e.value)}</span>`;
			return `<span class="${r}" data-contact-kind="${e.kind}"><i aria-hidden="true">${e.icon}</i>${t}</span>`;
		}).join(""), a = !t && v ? `<img class="${e === "stilvoll" ? "stilvoll-pdf-photo" : "einfach-pdf-photo"}" src="${Z(v)}" alt="">` : "";
		return `<header class="managed-pdf-header ${e}-pdf-header${t ? " compact" : ""}${a ? "" : " no-photo"}">
      <div>${t ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}<h1>${Z(m)}</h1>${bt ? `<h2>${Z(bt)}</h2>` : ""}${!t && yt.length ? `<address class="${n}">${i}</address>` : ""}</div>${a}
    </header>`;
	}, jt = (e) => vt.length ? `<div class="${e}-pdf-strengths">${vt.map((t, n) => `<article class="${e}-pdf-strength"><i aria-hidden="true">${[
		"★",
		"⚑",
		"↗",
		"◇"
	][n]}</i><div><h3>${Z(t.title)}</h3>${t.description ? `<p>${Z(t.description)}</p>` : ""}</div></article>`).join("")}</div>` : "", Mt = (e) => We.length ? `<div class="${e}-pdf-strengths">${We.slice(0, 2).map((t, n) => `<article class="${e}-pdf-strength"><i aria-hidden="true">${n ? "&#9733;" : "&#9873;"}</i><div><h3>${Z(t)}</h3></div></article>`).join("")}</div>` : "", Nt = (e) => Fe.length ? `<div class="${e}-pdf-languages">${Fe.map((t) => `<article class="${e}-pdf-language"><strong>${Z(t.name)}</strong>${St(t.score)}</article>`).join("")}</div>` : "", Pt = (e) => {
		if (c) return kt(e, "stilvoll");
		let t = e.pageNumber > 1, n = e.items.filter((e) => e.kind === "experience").map((e) => Ct(e.id, "experience", "stilvoll")).join(""), r = e.items.filter((e) => e.kind === "education").map((e) => Ct(e.id, "education", "stilvoll")).join(""), i = t ? "" : `<aside>${p.profile ? K("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${p.strengths ? K("Stärken", jt("stilvoll")) : ""}${p.languages ? K("Sprachen", Nt("stilvoll")) : ""}</aside>`;
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="stilvoll" data-no-fit="true"><div class="page-content managed-pdf stilvoll-pdf" data-density="${e.density}">${s.backgroundId === "geometric" && !t ? "<svg class=\"managed-pdf-background\" viewBox=\"0 0 210 297\" aria-hidden=\"true\"><defs><pattern id=\"stilvoll-pdf-chevron\" width=\"34\" height=\"25\" patternUnits=\"userSpaceOnUse\"><path d=\"M0 22 17 6l17 16M0 16 17 0l17 16\"/></pattern></defs><rect x=\"50\" y=\"-5\" width=\"160\" height=\"105\" fill=\"url(#stilvoll-pdf-chevron)\"/><rect x=\"118\" y=\"48\" width=\"92\" height=\"83\" fill=\"url(#stilvoll-pdf-chevron)\"/></svg>" : ""}${At("stilvoll", t)}<div class="stilvoll-pdf-columns${t ? " continuation" : ""}">${i}<main>${p.experience ? K(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${n}</div>`) : ""}${p.education ? K("Ausbildung", `<div class="managed-pdf-list">${r}</div>`) : ""}</main></div>${xt(e, !0)}</div></section>`;
	}, Ft = (e) => {
		if (c) return kt(e, "kompakt");
		let t = e.pageNumber > 1, n = e.pageNumber === M.length, r = e.items.filter((e) => e.kind === "experience").map((e) => Ct(e.id, "experience", "kompakt")).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => Ct(e.id, "education", "kompakt")).join(""), a = yt.map((e) => {
			let t = e.href ? `<a href="${Z(e.href)}">${Z(e.value)}</a>` : Z(e.value);
			return `<span class="kompakt-pdf-contact"><i aria-hidden="true">${e.icon}</i>${t}</span>`;
		}).join(""), o = p.skills ? jt("kompakt") : "", l = p.certifications ? Mt("kompakt") : "", d = p.skills && He.length ? `<div class="kompakt-pdf-skills">${He.map((e) => `<span class="kompakt-pdf-skill">${Z(e)}</span>`).join("")}</div>` : "", f = t ? "" : `<aside>${K("Kontaktdaten", `<address class="kompakt-pdf-contacts">${a}</address>`)}${p.profile ? K("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${K("Stärken", o)}${K("Erfolge", l)}${K("Fähigkeiten", d)}</aside>`;
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="kompakt" data-no-fit="true"><div class="page-content managed-pdf kompakt-pdf" data-density="${e.density}">${s.backgroundId === "abstract" && !t ? "<svg class=\"managed-pdf-background\" viewBox=\"0 0 210 297\" aria-hidden=\"true\"><path d=\"M72-10c2 32 10 48 38 62 31 16 58 22 111 64M80-10c2 28 11 43 38 56 34 16 62 24 103 59M89-10c2 25 12 38 37 50 35 17 64 25 95 54M98-10c3 22 12 33 35 44 36 18 63 26 88 49M144 0v16c0 7 5 12 12 12h25c7 0 12 5 12 12v2M159 49h50M177 71h33\"/><circle cx=\"144\" cy=\"28\" r=\"3.2\"/><circle cx=\"176\" cy=\"49\" r=\"2.2\"/><circle cx=\"198\" cy=\"71\" r=\"2.2\"/></svg>" : ""}<header class="managed-pdf-header kompakt-pdf-header${t ? " compact" : ""}">${t ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}<h1>${Z(m)}</h1>${t && bt ? `<h2>${Z(bt)}</h2>` : ""}</header><div class="kompakt-pdf-columns${t ? " continuation" : ""}"><main>${p.experience ? K(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${r}</div>`) : ""}${p.education ? K("Ausbildung", `<div class="managed-pdf-list">${i}</div>`) : ""}${n && p.languages ? K("Sprachen", Nt("kompakt")) : ""}</main>${f}</div>${xt(e, !0)}</div></section>`;
	}, It = (e) => {
		if (c) return kt(e, "einfach", "einspaltig");
		let t = e.pageNumber > 1, n = e.pageNumber === M.length, r = e.items.filter((e) => e.kind === "experience").map((e) => Ct(e.id, "experience", "einfach")).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => Ct(e.id, "education", "einfach")).join("");
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="einspaltig" data-no-fit="true"><div class="page-content managed-pdf einfach-pdf" data-density="${e.density}">${s.backgroundId === "geometric" && !t ? "<svg class=\"managed-pdf-background\" viewBox=\"0 0 210 297\" aria-hidden=\"true\"><path d=\"M128-8v21h14V-8M148 21v19h16V26M71 20v24h16V31M98 39v20h16V48M152 57v22h16V67M174 79v23h20V89M101 112a11 11 0 1 0 22 0M174 251v29h-14v17M82 261h18v25h15M8 276a9 9 0 1 1 18 0\"/></svg>" : ""}<div class="einfach-pdf-inner">${At("einfach", t)}${p.profile && !t ? K("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${p.strengths && !t ? K("Stärken", jt("einfach")) : ""}${p.experience && r ? K(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${r}</div>`) : ""}${p.education && i ? K("Ausbildung", `<div class="managed-pdf-list">${i}</div>`) : ""}${n && p.skills ? K("Kenntnisse", Dt) : ""}${n && p.languages ? K("Sprachen", Nt("einfach")) : ""}${n && p.certifications ? K("Zertifikate", Ot) : ""}</div>${xt(e, !0)}</div></section>`;
	}, Lt = (e, t, n = "") => t ? `<section class="klassisch-pdf-section ${n}"><h3 class="klassisch-pdf-title">${Z(e)}</h3>${t}</section>` : "", Rt = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				title: t.role,
				organization: t.company,
				city: t.city,
				from: t.from,
				to: t.to,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				title: t.degree,
				organization: t.institution,
				city: t.city,
				from: t.from,
				to: t.to,
				achievements: []
			} : void 0;
		})();
		if (!n) return "";
		let r = n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : "";
		return `<article class="klassisch-pdf-entry"><div class="klassisch-pdf-entry-head"><div><h3>${Z(n.title)}</h3><h4>${Z(n.organization)}</h4></div><p class="klassisch-pdf-entry-meta">${n.city ? `<span>${Z(n.city)}</span>` : ""}<time>${Z(dl(n.from, n.to))}</time></p></div>${r}</article>`;
	}, zt = [t?.title || h, ...vt.slice(0, 2).map((e) => e.title)].filter(Boolean).join(" | "), Bt = yt.map((e) => {
		let t = Z(e.value);
		return `<span data-contact-kind="${e.kind}">${e.href ? `<a href="${Z(e.href)}">${t}</a>` : t}</span>`;
	}).join(""), Vt = vt.length ? `<div class="klassisch-pdf-strengths">${vt.slice(0, 3).slice(0, 6).map((e) => `<article class="klassisch-pdf-strength"><h3>${Z(e.title)}</h3>${e.description ? `<p>${Z(e.description)}</p>` : ""}</article>`).join("")}</div>` : "", Ht = vt.length ? `<ul>${vt.slice(0, 3).map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul>` : "", Ut = He.filter((e) => !ul(t?.skills ?? []).slice(0, 3).includes(e)), Wt = Ut.length ? `<p>${Ut.map(Z).join(" · ")}</p>` : "", Gt = Fe.length ? `<div class="klassisch-pdf-languages">${Fe.map((e) => `<p class="klassisch-pdf-language"><strong>${Z(e.name)}</strong>${e.level ? `<span>(${Z(e.level)})</span>` : ""}</p>`).join("")}</div>` : "", Kt = (e, t) => {
		let n = t && !e && v ? `<img class="klassisch-pdf-photo" src="${Z(v)}" alt="">` : "";
		return `<header class="klassisch-pdf-header${e ? " compact" : ""}${n ? "" : " no-photo"}"><div>${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}<h1>${Z(m)}</h1>${zt ? `<h2>${Z(zt)}</h2>` : ""}${t && !e && Bt ? `<address class="klassisch-pdf-contacts">${Bt}</address>` : ""}</div>${n}</header>`;
	}, qt = (e) => `<footer class="klassisch-pdf-footer">${gt ? `<a href="${Z(Q(gt))}">${Z(gt)}</a>` : "<span></span>"}${M.length > 1 ? `<span>Seite ${e.pageNumber} / ${M.length}</span>` : ""}</footer>`, Jt = (e) => {
		let t = e.pageNumber > 1, n = e.pageNumber === M.length, r = e.items.filter((e) => e.kind === "experience").map((e) => Rt(e.id, "experience")).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => Rt(e.id, "education")).join("");
		return c ? `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="klassisch" data-no-fit="true"><div class="page-content klassisch-pdf klassisch-pdf-ats" data-density="${e.density}">${Kt(t, !1)}${t ? "" : Lt("Persönliche Daten", `<p>${wt}</p>`)}${p.profile && !t ? Lt("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${p.experience && r ? Lt(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="klassisch-pdf-list">${r}</div>`) : ""}${p.education && i ? Lt("Ausbildung", `<div class="klassisch-pdf-list">${i}</div>`, "klassisch-pdf-education") : ""}${n && p.skills ? Lt("Kenntnisse", Wt) : ""}${n && p.languages ? Lt("Sprachen", Gt) : ""}${n && p.strengths ? Lt("Stärken", Ht) : ""}${n && p.certifications ? Lt("Zertifikate", Ot) : ""}</div></section>` : `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="klassisch" data-no-fit="true"><div class="page-content klassisch-pdf" data-density="${e.density}">${s.backgroundId === "classic-soft-blue-waves" && !t ? "<svg class=\"klassisch-pdf-background\" viewBox=\"0 0 210 297\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path class=\"fill\" d=\"M34 0c18 20 35 20 61 16 43-7 70-4 115 35V0Z\"/><path class=\"line\" d=\"M66-4c11 19 21 16 43 10 32-9 51 1 76 19 9 7 18 10 25 10\"/><path class=\"line\" d=\"M51-4c14 23 31 25 56 17 35-12 54 0 82 18 8 5 15 7 21 7\"/><circle class=\"line\" cx=\"197\" cy=\"0\" r=\"13.5\"/><path class=\"fill\" d=\"M0 251c27-2 43 15 62 31 7 6 14 11 22 15H0Z\"/><path class=\"line\" d=\"M-4 263c20-8 35 3 51 17 9 8 18 14 27 19\"/><path class=\"line\" d=\"M-5 271c15-9 30-2 43 9 9 8 17 14 25 19\"/><circle class=\"line\" cx=\"12\" cy=\"297\" r=\"13\"/></svg>" : ""}<div class="klassisch-pdf-content">${Kt(t, !0)}${p.profile && !t ? Lt("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${p.strengths && !t ? Lt("Stärken", Vt) : ""}${p.experience && r ? Lt(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="klassisch-pdf-list">${r}</div>`) : ""}${p.education && i ? Lt("Ausbildung", `<div class="klassisch-pdf-list">${i}</div>`, "klassisch-pdf-education") : ""}${n && p.skills ? Lt("Kenntnisse", Wt) : ""}${n && p.languages ? Lt("Sprachen", Gt) : ""}${n && p.certifications ? Lt("Zertifikate", Ot) : ""}</div>${qt(e)}</div></section>`;
	}, Yt = (e) => {
		let t = e.pageNumber > 1, n = e.pageNumber === M.length;
		if (c) return Jt(e).replaceAll("klassisch", "mehrspaltig");
		let r = e.items.filter((e) => e.kind === "experience").map((e) => Rt(e.id, "experience").replaceAll("klassisch", "mehrspaltig")).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => Rt(e.id, "education").replaceAll("klassisch", "mehrspaltig")).join(""), a = (e, t, n = "") => t ? `<section class="mehrspaltig-pdf-section ${n}"><h3 class="mehrspaltig-pdf-title">${Z(e)}</h3>${t}</section>` : "", o = Kt(t, !0).replaceAll("klassisch", "mehrspaltig"), l = qt(e).replaceAll("klassisch", "mehrspaltig"), d = Ut.length ? `<div class="mehrspaltig-pdf-skills">${Ut.map((e) => `<strong>${Z(e)}</strong>`).join("")}</div>` : "", f = vt.length ? `<div class="mehrspaltig-pdf-strengths">${vt.slice(0, 4).map((e, t) => `<article class="mehrspaltig-pdf-strength"><i aria-hidden="true">${[
			"✦",
			"⚑",
			"♡",
			"↗"
		][t]}</i><div><h3>${Z(e.title)}</h3>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div>` : "", m = Gt.replaceAll("klassisch", "mehrspaltig"), h = t ? "" : `${p.profile ? a("Zusammenfassung", `<p>${Z(ht)}</p>`) : ""}${p.skills ? a("Fähigkeiten", d) : ""}${n && p.languages ? a("Sprachen", m) : ""}`, g = `${p.experience && r ? a(`Erfahrung${t ? " · Fortsetzung" : ""}`, `<div class="mehrspaltig-pdf-list">${r}</div>`) : ""}${p.education && i ? a("Ausbildung", `<div class="mehrspaltig-pdf-list">${i}</div>`, "mehrspaltig-pdf-education") : ""}${n && p.certifications ? a("Zertifizierung", Ot.replaceAll("klassisch", "mehrspaltig")) : ""}`, _ = !t && p.strengths ? a("Stärken", f) : "";
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="mehrspaltig" data-no-fit="true"><div class="page-content mehrspaltig-pdf" data-density="${e.density}">${s.backgroundId === "classic-soft-blue-waves" && !t ? "<svg class=\"mehrspaltig-pdf-background\" viewBox=\"0 0 210 297\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><g><path class=\"ribbon red\" d=\"M168 5l28 16\"/><path class=\"ribbon orange\" d=\"M169 10l28 16\"/><path class=\"ribbon yellow\" d=\"M170 15l28 16\"/><path class=\"ribbon green\" d=\"M171 20l28 16\"/><path class=\"ribbon blue\" d=\"M172 25l28 16\"/><path class=\"ribbon purple\" d=\"M173 30l28 16\"/></g><g><path class=\"ribbon red\" d=\"M7 269l21 12\"/><path class=\"ribbon orange\" d=\"M8 273l21 12\"/><path class=\"ribbon yellow\" d=\"M9 277l21 12\"/><path class=\"ribbon green\" d=\"M10 281l21 12\"/><path class=\"ribbon blue\" d=\"M11 285l21 12\"/><path class=\"ribbon purple\" d=\"M12 289l21 12\"/></g></svg>" : ""}<div class="mehrspaltig-pdf-content">${o}<div class="mehrspaltig-pdf-columns${t ? " continuation" : ""}">${t ? "" : `<aside class="mehrspaltig-pdf-column">${h}</aside>`}<main class="mehrspaltig-pdf-column">${g}</main>${t ? "" : `<aside class="mehrspaltig-pdf-column">${_}</aside>`}</div></div>${l}</div></section>`;
	}, Xt = (e, t, n = "") => t ? `<section class="modern-pdf-section ${n}"><h3 class="modern-pdf-title">${Z(e)}</h3>${t}</section>` : "", Zt = t?.title || h, Qt = [Zt, ...Zt.length < 48 ? vt.slice(0, 2).map((e) => e.title) : []].filter(Boolean).join(" | "), $t = [
		{
			kind: "phone",
			icon: "T",
			value: t?.phone || "",
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			kind: "email",
			icon: "@",
			value: t?.email || "",
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			kind: "linkedin",
			icon: "in",
			value: t?.linkedin || "",
			href: Q(t?.linkedin)
		},
		{
			kind: "website",
			icon: "W",
			value: t?.portfolio || t?.github || "",
			href: Q(t?.portfolio || t?.github)
		},
		{
			kind: "location",
			icon: "O",
			value: [t?.city, t?.country].filter(Boolean).join(", "),
			href: ""
		},
		{
			kind: "birth",
			icon: "G",
			value: t?.birthDate || t?.birthPlace ? `Geb. ${t?.birthDate || ""}${t?.birthPlace ? ` in ${t.birthPlace}` : ""}`.trim() : "",
			href: ""
		}
	].filter((e) => e.value.trim()), en = (e = !1, t = !1) => {
		if (!$t.length) return "";
		let n = t ? $t.filter((e) => [
			"phone",
			"email",
			"linkedin",
			"location"
		].includes(e.kind)).slice(0, 4) : $t;
		return `<address class="modern-pdf-contacts${t ? " inline" : ""}">${n.map((t) => {
			let n = Z(t.value), r = t.href ? `<a href="${Z(t.href)}">${n}</a>` : `<span>${n}</span>`;
			return `<span class="modern-pdf-contact" data-contact-kind="${t.kind}">${e ? "" : `<i aria-hidden="true">${t.icon}</i>`}${r}</span>`;
		}).join("")}</address>`;
	}, tn = (e, t = !1) => {
		let n = !e && !t && v ? `<img class="modern-pdf-photo" src="${Z(v)}" alt="">` : "";
		return `<header class="modern-pdf-header${e ? " compact" : ""}${n ? "" : " no-photo"}"><div class="modern-pdf-identity">${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}<h1>${Z(m)}</h1>${Qt ? `<h2>${Z(Qt)}</h2>` : ""}${!e && !t ? en(!1, !0) : ""}</div>${n}</header>`;
	}, nn = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				title: t.role,
				organization: t.company,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				title: t.degree,
				organization: t.institution,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `<article class="modern-pdf-entry"><h3>${Z(n.title)}</h3><p class="modern-pdf-entry-meta"><strong>${Z(n.organization)}</strong><span class="modern-pdf-entry-date"><i aria-hidden="true">▦</i>${Z(dl(n.from, n.to))}</span>${n.city ? `<span class="modern-pdf-entry-location"><i aria-hidden="true">●</i>${Z(n.city)}</span>` : ""}</p>${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}</article>` : "";
	}, rn = vt.filter((e) => e.description), an = rn.length ? `<div class="modern-pdf-strengths">${rn.map((e, t) => `<article class="modern-pdf-strength"><i aria-hidden="true">${t % 2 == 0 ? "✓" : "⚑"}</i><div><h3>${Z(e.title)}</h3><p>${Z(e.description)}</p></div></article>`).join("")}</div>` : "", on = He.length ? `<div class="modern-pdf-knowledge">${He.map((e) => `<span>${Z(e)}</span>`).join("")}</div>` : "", sn = We.length ? `<div class="modern-pdf-achievements">${We.map((e) => `<article><i aria-hidden="true">★</i><p>${Z(e)}</p></article>`).join("")}</div>` : "", cn = Fe.length ? `<div class="modern-pdf-languages">${Fe.map((e) => `<article class="modern-pdf-language"><div><strong>${Z(e.name)}</strong></div><span class="modern-pdf-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => n < e.score ? "●" : "○").join("")}</span></article>`).join("")}</div>` : "", ln = Fe.length ? `<ul>${Fe.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul>` : "", un = vt.length ? `<ul>${vt.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` – ${Z(e.description)}` : ""}</li>`).join("")}</ul>` : "", dn = He.length ? `<p>${He.map(Z).join(" · ")}</p>` : "", fn = We.length ? `<ul class="modern-pdf-certifications">${We.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : "", pn = (e) => `<footer class="modern-pdf-footer">${gt ? `<a href="${Z(Q(gt))}">${Z(gt)}</a>` : "<span></span>"}<span>Seite ${e.pageNumber} / ${M.length}</span></footer>`, mn = (e) => {
		let n = e.pageNumber > 1, r = e.pageNumber === M.length, i = e.items.filter((e) => e.kind === "experience").map((e) => nn(e.id, "experience")).join(""), a = e.items.filter((e) => e.kind === "education").map((e) => nn(e.id, "education")).join(""), o = p.experience && i ? Xt(`${c ? "Berufserfahrung" : "Erfahrung"}${n ? " · Fortsetzung" : ""}`, `<div class="modern-pdf-list">${i}</div>`) : "", s = p.education && a ? Xt("Ausbildung", `<div class="modern-pdf-list">${a}</div>`) : "", l = hs(t, "modern"), d = ms(t, "modern"), f = (e, t) => e === "summary" ? p.profile && !n ? Xt("Zusammenfassung", `<p class="modern-pdf-summary">${Z(ht)}</p>`) : "" : e === "experience" ? o : e === "education" ? s : r ? e === "knowledge" ? p.strengths ? Xt(t === "ats" ? "Kenntnisse" : "Fähigkeiten", t === "ats" ? dn : on) : "" : e === "languages" ? p.languages ? Xt("Sprachen", t === "ats" ? ln : cn) : "" : e === "strengths" ? p.skills ? Xt("Stärken", t === "ats" ? un : an) : "" : e === "certifications" && p.certifications ? Xt(t === "ats" ? "Zertifikate" : "Erfolge", t === "ats" ? fn : sn) : "" : "";
		if (c) {
			let t = l ? d.map(({ type: e }) => f(e, "ats")).join("") : `${p.profile && !n ? Xt("Zusammenfassung", `<p class="modern-pdf-summary">${Z(ht)}</p>`) : ""}${o}${s}${r && p.skills ? Xt("Kenntnisse", dn) : ""}${r && p.languages ? Xt("Sprachen", ln) : ""}${r && p.strengths ? Xt("Stärken", un) : ""}${r && p.certifications ? Xt("Zertifikate", fn) : ""}`;
			return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="modern" data-no-fit="true"><div class="page-content modern-pdf modern-pdf-ats" data-density="${e.density}">${tn(n, !0)}${n ? "" : Xt("Persönliche Daten", en(!0))}${t}${pn(e)}</div></section>`;
		}
		let m = n ? "" : `<aside class="modern-pdf-right">${l ? d.filter(({ zone: e }) => e === "sidebar").map(({ type: e }) => f(e, "visual")).join("") : `${p.strengths ? Xt("Stärken", an) : ""}${p.languages ? Xt("Sprachen", cn) : ""}${p.skills ? Xt("Fähigkeiten", on) : ""}${p.certifications ? Xt("Erfolge", sn) : ""}`}</aside>`, h = p.profile && !n ? Xt("Zusammenfassung", `<p class="modern-pdf-summary">${Z(ht)}</p>`) : "", g = l ? d.filter(({ zone: e }) => e === "main" || e === "full").map(({ type: e }) => f(e, "visual")).join("") : `${h}${o}${s}`;
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="modern" data-no-fit="true"><div class="page-content modern-pdf" data-density="${e.density}"><div class="modern-pdf-content">${tn(n)}<div class="modern-pdf-columns${n ? " continuation" : ""}"><main class="modern-pdf-left">${g}${!i && !a && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}</main>${m}</div></div>${pn(e)}</div></section>`;
	}, hn = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true">${{
		profile: "<path d=\"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1\"/><path d=\"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1\"/>",
		flag: "<path d=\"M5 22V4\"/><path d=\"M5 5c5-4 9 4 14 0v10c-5 4-9-4-14 0\"/>",
		trophy: "<path d=\"M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z\"/><path d=\"M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4\"/>"
	}[e]}</svg>`, gn = [
		{
			kind: "phone",
			label: "Telefon",
			icon: je("phone"),
			value: t?.phone || "",
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			kind: "email",
			label: "E-Mail",
			icon: je("mail"),
			value: t?.email || "",
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			kind: "linkedin",
			label: "Profil",
			icon: hn("profile"),
			value: t?.linkedin || t?.portfolio || t?.github || "",
			href: Q(t?.linkedin || t?.portfolio || t?.github)
		},
		{
			kind: "location",
			label: "Wohnort",
			icon: je("location"),
			value: [t?.city, t?.country].filter(Boolean).join(", "),
			href: ""
		},
		{
			kind: "birth",
			label: "Geboren",
			icon: je("birth"),
			value: [t?.birthDate, t?.birthPlace].filter(Boolean).join(" in "),
			href: ""
		}
	].filter((e) => e.value.trim()), _n = (e = !1) => `<address class="tabellarisch-pdf-contacts">${gn.map((t) => {
		let n = t.href ? `<a href="${Z(t.href)}">${Z(t.value)}</a>` : `<span>${Z(t.value)}</span>`;
		return `<span class="tabellarisch-pdf-contact" data-contact-kind="${t.kind}">${e ? `<strong>${Z(t.label)}:</strong>` : t.icon}${n}</span>`;
	}).join("")}</address>`, vn = (e, t, n = "", r = !1) => t ? `<section class="tabellarisch-pdf-section ${n}"><h2 class="tabellarisch-pdf-title">${Z(e)}${r ? "<small>Fortsetzung</small>" : ""}</h2>${t}</section>` : "", yn = ze.slice(0, 2), bn = (e = !1) => yn.length ? e ? `<ul>${yn.map((e) => `<li><strong>${Z(e.name)}</strong>${e.description?.trim() ? ` - ${Z(e.description)}` : ""}</li>`).join("")}</ul>` : `<div class="tabellarisch-pdf-strengths">${yn.map((e, t) => `<article class="tabellarisch-pdf-strength">${hn(t === 0 ? "flag" : "trophy")}<div><h3>${Z(e.name)}</h3>${e.description?.trim() ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div>` : "", xn = (e, t) => {
		let n = e.trim(), r = t.trim();
		return n ? r ? `${n} - ${r}` : n : r;
	}, Sn = (e, t, n = !1) => {
		let r = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				title: t.role,
				organization: t.company,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				title: t.degree,
				organization: t.institution,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		if (!r) return "";
		let i = r.achievements.length ? `<ul>${r.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : "";
		return n ? `<article class="tabellarisch-pdf-entry"><div class="tabellarisch-pdf-entry-content"><h3>${Z(r.title)}</h3><p class="tabellarisch-pdf-organization">${Z(r.organization)}</p><p class="tabellarisch-pdf-ats-meta">${Z(xn(r.from, r.to))}${r.city ? ` - ${Z(r.city)}` : ""}</p>${i}</div></article>` : `<article class="tabellarisch-pdf-entry"><div class="tabellarisch-pdf-meta"><p class="tabellarisch-pdf-date">${Z(xn(r.from, r.to))}</p>${r.city ? `<p class="tabellarisch-pdf-location">${Z(r.city)}</p>` : ""}</div><span class="tabellarisch-pdf-rail" aria-hidden="true"></span><div class="tabellarisch-pdf-entry-content"><h3>${Z(r.title)}</h3><p class="tabellarisch-pdf-organization">${Z(r.organization)}</p>${i}</div></article>`;
	}, Cn = (e) => `<footer class="tabellarisch-pdf-footer">${gt ? `<a href="${Z(Q(gt))}">${Z(gt)}</a>` : "<span></span>"}<span>Seite ${e.pageNumber} / ${M.length}</span></footer>`, wn = (e) => {
		let n = e.pageNumber > 1, r = e.pageNumber === M.length, i = e.items.filter((e) => e.kind === "experience").map((e) => Sn(e.id, "experience", c)).join(""), a = e.items.filter((e) => e.kind === "education").map((e) => Sn(e.id, "education", c)).join(""), o = !c && !n && v ? `<img class="tabellarisch-pdf-photo" src="${Z(v)}" alt="">` : "", s = n ? `<header class="tabellarisch-pdf-continuation"><strong>${Z(m)}</strong><span>${Z(t?.title || h)}</span></header>` : `<header class="tabellarisch-pdf-header${o ? "" : " no-photo"}"><div class="tabellarisch-pdf-identity"><h1>${Z(m)}</h1>${t?.title || h ? `<h2>${Z(t?.title || h)}</h2>` : ""}${_n(c)}</div>${o}</header>`, l = p.profile && !n ? vn("Zusammenfassung", `<p class="tabellarisch-pdf-summary">${Z(ht)}</p>`) : "", d = p.strengths && !n ? vn("Stärken", bn(c)) : "", f = p.experience && i ? vn("Erfahrung", `<div class="tabellarisch-pdf-timeline${r ? "" : " continues"}">${i}</div>`, "", n) : "", g = p.education && a ? vn("Ausbildung", `<div class="tabellarisch-pdf-timeline">${a}</div>`) : "", _ = r && c ? `<div class="tabellarisch-pdf-additional">${c && p.skills ? vn("Kenntnisse", Dt, "tabellarisch-pdf-list") : ""}${p.certifications ? vn("Zertifikate", Ot, "tabellarisch-pdf-list") : ""}${p.languages ? vn("Sprachen", `<ul class="inline">${Fe.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul>`, "tabellarisch-pdf-list") : ""}</div>` : "";
		return c ? `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="tabellarisch" data-no-fit="true"><div class="page-content tabellarisch-pdf tabellarisch-pdf-ats" data-density="${e.density}">${s}${l}${d}${f}${g}${_}</div></section>` : `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="tabellarisch" data-no-fit="true"><div class="page-content tabellarisch-pdf" data-density="${e.density}">${n ? "" : "<svg class=\"tabellarisch-pdf-background\" viewBox=\"0 0 1000 260\" preserveAspectRatio=\"xMidYMin slice\" aria-hidden=\"true\"><defs><pattern id=\"tabellarisch-pdf-cubes\" width=\"144\" height=\"84\" patternUnits=\"userSpaceOnUse\"><path d=\"M72 0 144 42 72 84 0 42 72 0v84M0 42l72 42 72-42\"/></pattern><linearGradient id=\"tabellarisch-pdf-fade\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"white\" stop-opacity=\"0\"/><stop offset=\".25\" stop-color=\"white\" stop-opacity=\".45\"/><stop offset=\".48\" stop-color=\"white\" stop-opacity=\"1\"/></linearGradient><mask id=\"tabellarisch-pdf-mask\"><rect width=\"1000\" height=\"260\" fill=\"url(#tabellarisch-pdf-fade)\"/></mask></defs><rect x=\"210\" y=\"-44\" width=\"850\" height=\"310\" fill=\"url(#tabellarisch-pdf-cubes)\" mask=\"url(#tabellarisch-pdf-mask)\"/></svg>"}<div class="tabellarisch-pdf-content">${s}${l}${d}${f}${g}${_}</div>${Cn(e)}</div></section>`;
	}, Tn = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true">${{
		phone: "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z\"/>",
		mail: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M16 8v5a2 2 0 0 0 4 0v-1a8 8 0 1 0-3.3 6.5\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
		link: "<path d=\"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1\"/><path d=\"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1\"/>",
		location: "<path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
		strength: "<path d=\"M9 18h6M10 22h4M8.5 14.5A6 6 0 1 1 15.5 14.5c-1 .7-1.5 1.5-1.5 2.5h-4c0-1-.5-1.8-1.5-2.5Z\"/>"
	}[e]}</svg>`, En = [t?.city, t?.country].filter(Boolean).join(", "), Dn = t?.linkedin || t?.github || t?.portfolio || "", On = [
		{
			icon: Tn("phone"),
			value: t?.phone || "",
			href: t?.phone ? `tel:${t.phone.replace(/[^\d+]/g, "")}` : ""
		},
		{
			icon: Tn("mail"),
			value: t?.email || "",
			href: t?.email ? `mailto:${t.email}` : ""
		},
		{
			icon: Tn("link"),
			value: Q(Dn),
			href: Q(Dn)
		},
		{
			icon: Tn("location"),
			value: En,
			href: ""
		}
	].filter((e) => e.value.trim()), kn = (e = !1) => On.length ? `<address class="gepflegt-pdf-contacts">${On.map((t) => {
		let n = `<span>${Z(t.value)}</span>`, r = `${e ? "" : t.icon}${n}`;
		return t.href ? `<a class="gepflegt-pdf-contact" href="${Z(t.href)}">${r}</a>` : `<span class="gepflegt-pdf-contact">${r}</span>`;
	}).join("")}</address>` : "", An = f.resumeProfile || t?.summary || "Kurzprofil im Dokumenteditor ergänzen.", jn = ul(t?.skills ?? []).slice(0, 3).map((e) => {
		let [t, ...n] = e.split(/\s+(?:\u2013|\u2014|:)\s+/);
		return {
			title: t.trim(),
			description: n.join(" - ").trim()
		};
	}), Mn = t ? ul(Mc(t.knowledgeSection, t.skills).categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => [...Oc(e.items).map((t) => kc(t, e.showLevels, e.showYearsOfExperience, "comma-separated")), ...e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((t) => Oc(t.items).map((t) => kc(t, e.showLevels, e.showYearsOfExperience, "comma-separated")))])) : [], Nn = ul(t?.languages ?? []).map((e) => {
		let [t, ...n] = e.split(/\s+(?:\u2013|\u2014|-)\s+/), r = n.join(" - ").trim();
		return {
			raw: e,
			name: t.trim() || e,
			level: r,
			score: Ic(r)
		};
	}), Pn = ul(t?.certifications ?? []), Fn = (e = !1) => !p.skills || !jn.length ? "" : e ? `<section><h3>Stärken</h3><ul>${jn.map((e) => `<li><strong>${Z(e.title)}</strong>${e.description ? ` - ${Z(e.description)}` : ""}</li>`).join("")}</ul></section>` : `<section><h3>Stärken</h3><div class="gepflegt-pdf-strengths">${jn.map((e) => `<article class="gepflegt-pdf-strength">${Tn("strength")}<div><h4>${Z(e.title)}</h4>${e.description ? `<p>${Z(e.description)}</p>` : ""}</div></article>`).join("")}</div></section>`, In = (e = !1) => !p.languages || !Nn.length ? "" : e ? `<section><h3>Sprachen</h3><ul>${Nn.map((e) => `<li>${Z(e.raw)}</li>`).join("")}</ul></section>` : `<section><h3>Sprachen</h3><div class="gepflegt-pdf-languages">${Nn.map((e) => `<div class="gepflegt-pdf-language"><div><strong>${Z(e.name)}</strong></div><span class="gepflegt-pdf-dots" aria-label="${Z(`${e.name}: ${e.level}`)}">${Array.from({ length: 6 }, (t, n) => `<i class="${n < e.score ? "filled" : ""}"></i>`).join("")}</span></div>`).join("")}</div></section>`, Ln = (e = !1) => p.skills && Mn.length ? `<section><h3>Fähigkeiten</h3><p class="${e ? "" : "gepflegt-pdf-knowledge"}">${Mn.map(Z).join(" · ")}</p></section>` : "", Rn = (e = !1) => p.certifications && Pn.length ? `<section><h3>Zertifikate</h3><ul class="${e ? "" : "gepflegt-pdf-certifications"}">${Pn.map((e) => `<li>${Z(e)}</li>`).join("")}</ul></section>` : "", zn = (e = !1, n = !1) => `
    <header class="gepflegt-pdf-header${e ? " compact" : ""}">
      ${e ? "<p class=\"kicker\">Lebenslauf · Fortsetzung</p>" : ""}
      <h1>${Z(m)}</h1>
      ${t?.title || h ? `<h2>${Z(t?.title || h)}</h2>` : ""}
      ${e ? "" : kn(n)}
    </header>`, Bn = (e, t) => {
		let n = e.trim(), r = t.trim();
		return n ? r ? `${n} - ${r}` : n : r;
	}, Vn = (e, t) => {
		let n = t === "experience" ? (() => {
			let t = D.get(e);
			return t ? {
				title: t.role,
				organization: t.company,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: t.achievements.filter(Boolean)
			} : void 0;
		})() : (() => {
			let t = O.get(e);
			return t ? {
				title: t.degree,
				organization: t.institution,
				from: t.from,
				to: t.to,
				city: t.city,
				achievements: []
			} : void 0;
		})();
		return n ? `<article class="gepflegt-pdf-entry"><div class="gepflegt-pdf-entry-heading"><h4>${Z(n.title)}</h4><span>${Z(Bn(n.from, n.to))}</span></div><div class="gepflegt-pdf-entry-subheading"><strong>${Z(n.organization)}</strong>${n.city ? `<span>${Z(n.city)}</span>` : ""}</div>${n.achievements.length ? `<ul>${n.achievements.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}</article>` : "";
	}, Hn = t?.portfolio || t?.github || t?.linkedin || "", Un = M.map(r.id === "modern" ? mn : r.id === "stilvoll" ? Pt : r.id === "kompakt" ? Ft : r.id === "einspaltig" ? It : r.id === "klassisch" ? Jt : r.id === "mehrspaltig" ? Yt : r.id === "elegant" ? ae : r.id === "gepflegt" ? (e) => {
		let n = e.pageNumber > 1, r = e.pageNumber === M.length, i = e.items.filter((e) => e.kind === "experience").map((e) => Vn(e.id, "experience")).join(""), a = e.items.filter((e) => e.kind === "education").map((e) => Vn(e.id, "education")).join(""), o = `<main class="gepflegt-pdf-main">${p.experience && i ? `<section class="gepflegt-pdf-section"><h3 class="gepflegt-pdf-title">${c ? "Berufserfahrung" : "Erfahrung"}${n ? " · Fortsetzung" : ""}</h3><div class="gepflegt-pdf-list">${i}</div></section>` : ""}${p.education && a ? `<section class="gepflegt-pdf-section"><h3 class="gepflegt-pdf-title">Ausbildung</h3><div class="gepflegt-pdf-list">${a}</div></section>` : ""}${!i && !a && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}</main>`;
		if (c) {
			let t = p.profile && !n ? `<section class="gepflegt-pdf-section gepflegt-pdf-ats-summary"><h3 class="gepflegt-pdf-title">Zusammenfassung</h3><p>${Z(An)}</p></section>` : "", i = r ? `<div class="gepflegt-pdf-ats-extra">${Fn(!0)}${In(!0)}${Ln(!0)}${Rn(!0)}</div>` : "";
			return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="gepflegt" data-no-fit="true"><div class="page-content gepflegt-pdf gepflegt-pdf-ats" data-density="${e.density}">${zn(n, !0)}${t}${o}${i}</div></section>`;
		}
		let s = n ? `<aside class="gepflegt-pdf-sidebar gepflegt-pdf-sidebar-continuation"><div><p>Lebenslauf</p><h2>${Z(m)}</h2>${t?.title ? `<span>${Z(t.title)}</span>` : ""}<i aria-hidden="true"></i><small>Fortsetzung · Seite ${e.pageNumber} von ${M.length}</small>${t?.email || t?.phone ? `<span>${Z(t.email || t.phone)}</span>` : ""}</div></aside>` : `<aside class="gepflegt-pdf-sidebar">${v ? `<img class="gepflegt-pdf-photo" src="${Z(v)}" alt="">` : ""}${p.profile ? `<section><h3>Zusammenfassung</h3><p class="gepflegt-pdf-summary">${Z(An)}</p></section>` : ""}${Fn()}${In()}${Ln()}${Rn()}</aside>`, l = Hn || M.length > 1 ? `<footer class="gepflegt-pdf-footer">${M.length > 1 ? `<span>Seite ${e.pageNumber} von ${M.length}</span>` : ""}${Hn ? `<a href="${Z(Q(Hn))}">${Z(Hn)}</a>` : ""}</footer>` : "";
		return `<section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}" data-template="gepflegt" data-no-fit="true"><div class="page-content gepflegt-pdf" data-density="${e.density}">${s}<div class="gepflegt-pdf-content">${zn(n)}${o}${l}</div></div></section>`;
	} : r.id === "ivy-league" ? mt : r.id === "kreativ" ? Ye : r.id === "zeitgenoessisch" ? G : r.id === "zweispaltig" ? he : r.id === "tabellarisch" ? wn : (e) => {
		let n = e.items.filter((e) => e.kind === "experience").map((e) => te(e.id)).join(""), i = e.items.filter((e) => e.kind === "education").map((e) => N(e.id)).join(""), a = e.pageNumber === 2, o = e.density === "standard" ? "" : ` cv-${e.density}`, s = `
          <main class="cv-primary">
            ${n ? `<section><h3>Berufserfahrung${a ? " · Fortsetzung" : ""}</h3>${n}</section>` : ""}
            ${i ? `<section><h3>Ausbildung</h3>${i}</section>` : ""}
            ${!n && !i && e.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
          </main>`, f = a ? "" : `<aside class="cv-secondary">
                  ${b(!0)}
                  ${k}
                  ${A}
                  ${j}
                  ${ee}
                </aside>`;
		return `
      <section class="page cv-sheet ${u}" data-resume-page="${e.pageNumber}">
        ${d}
        <div class="page-content cv-page cv-${r.layout} column-${l}${a ? " cv-continuation" : ""}${o}">
          <header class="cv-header">
            <div>
              <p class="kicker">${a ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}</p>
              <h1>${Z(m)}</h1>
              <h2>${Z(t?.title || h)}</h2>
              <p class="cv-contact-line">${x}</p>
            </div>
            ${b()}
          </header>
          ${c ? `${f}${s}` : `${s}${f}`}
          <span class="page-number">${e.pageNumber} / ${M.length}</span>
        </div>
      </section>`;
	}).join(""), Wn = n === "mappe" ? [
		T,
		E,
		Un
	] : n === "deckblatt" ? [T] : n === "anschreiben" ? [E] : [Un];
	return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${Z(g)} – ${Z(h)}</title><style>${xl(i, a, o, s)}${Sl}${Cl}${wl}${Tl}${El}${Dl}${Ol}${kl}${Al}${jl}${Ml}</style></head><body>${Wn.join("")}${Nl}</body></html>`;
}, Fl = /^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i, Il = (e) => {
	let t = e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[<>:"/\\|?*\u0000-\u001F]+/g, "_").replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").replace(/^[. ]+|[. ]+$/g, "").slice(0, 80);
	return t ? Fl.test(t) ? `_${t}` : t : "Bewerbung";
}, Ll = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`, Rl = (t, n) => {
	let r = e.resolve(t), i = e.resolve(n);
	return i === r || i.startsWith(`${r}${e.sep}`);
}, zl = async (e) => {
	try {
		return await i(e), !0;
	} catch {
		return !1;
	}
}, Bl = "Bitte schließen Sie alle geöffneten Word-, PDF- oder sonstigen Dateien dieser Bewerbung und speichern Sie den Bereich „Termine“ anschließend erneut.", Vl = class extends Error {
	constructor() {
		super(Bl), this.code = "APPLICATION_FOLDER_LOCKED", this.name = "ApplicationFolderLockedError";
	}
}, Hl = (e) => !e || typeof e != "object" || !("code" in e) ? !1 : [
	"EACCES",
	"EBUSY",
	"EPERM"
].includes(String(e.code)), Ul = class {
	constructor(e) {
		this.paths = e;
	}
	async initialize() {
		let t = [
			this.paths.root,
			this.paths.dataRoot,
			this.paths.applicationsData,
			this.paths.anschreibenDocuments,
			this.paths.lebenslaufDocuments,
			this.paths.zeugnisseArchive,
			this.paths.zertifikateArchive,
			this.paths.absagenRoot,
			this.paths.interviewsRoot,
			this.paths.anschreibenTemplates,
			this.paths.deckblattTemplates,
			this.paths.lebenslaufTemplates,
			this.paths.previewCache,
			this.paths.systemTemplateCache,
			e.join(this.paths.dataRoot, "Profile"),
			e.join(this.paths.dataRoot, "Settings"),
			e.join(this.paths.dataRoot, "Backups")
		];
		await Promise.all(t.map((e) => s(e, { recursive: !0 })));
	}
	applicationDataPath(t) {
		let n = e.resolve(this.paths.applicationsData, t);
		if (!Rl(this.paths.applicationsData, n)) throw Error("Ungültiger Bewerbungsordner.");
		return n;
	}
	rejectionPath(t) {
		let n = e.resolve(this.paths.absagenRoot, t);
		if (!Rl(this.paths.absagenRoot, n)) throw Error("Ungültiger Absageordner.");
		return n;
	}
	interviewPath(t) {
		let n = t.interviewAt ? Ll(new Date(t.interviewAt)) : "Termin_offen", r = `${Il(t.company.name)}_${n}`, i = e.resolve(this.paths.interviewsRoot, r);
		if (!Rl(this.paths.interviewsRoot, i)) throw Error("Ungültiger Vorstellungsgesprächsordner.");
		return i;
	}
	async syncInterviewFolder(e, t) {
		if (t.status !== "Vorstellungsgespräch") return;
		let n = this.interviewPath(t), r = e?.status === "Vorstellungsgespräch" ? this.interviewPath(e) : void 0;
		if (r === n || !r || !await zl(r)) {
			await s(n, { recursive: !0 });
			return;
		}
		await zl(n) || await d(r, n);
	}
	documentDirectories(t) {
		let n = this.applicationDataPath(t.folderName);
		if (t.status === "Absage") {
			let r = this.rejectionPath(t.folderName);
			return {
				anschreiben: r,
				lebenslauf: e.join(r, "Lebenslauf"),
				deckblatt: e.join(n, "Deckblatt")
			};
		}
		return {
			anschreiben: e.join(this.paths.anschreibenDocuments, t.folderName),
			lebenslauf: e.join(this.paths.lebenslaufDocuments, t.folderName),
			deckblatt: e.join(n, "Deckblatt")
		};
	}
	async allocateApplicationFolderName(t, n, r = /* @__PURE__ */ new Date()) {
		let i = `${Il(t)}_${Ll(r)}`, a = Il(n);
		for (let t = 1; t < 1e4; t += 1) {
			let n = t === 1 ? a : `${a}_${t}`, r = e.join(i, n);
			if (!(await Promise.all([
				zl(this.applicationDataPath(r)),
				zl(e.join(this.paths.anschreibenDocuments, r)),
				zl(e.join(this.paths.lebenslaufDocuments, r)),
				zl(this.rejectionPath(r))
			])).some(Boolean)) try {
				return await s(e.join(this.paths.anschreibenDocuments, r), { recursive: !0 }), r;
			} catch (e) {
				if ((typeof e == "object" && e && "code" in e ? String(e.code) : "") !== "EEXIST") throw e;
			}
		}
		throw Error("Für die Bewerbung konnte kein eindeutiger Ordner erstellt werden.");
	}
	applicationArtifactPaths(t) {
		return [
			this.paths.applicationsData,
			this.paths.anschreibenDocuments,
			this.paths.lebenslaufDocuments,
			this.paths.absagenRoot
		].map((n) => {
			let r = e.resolve(n), i = e.resolve(r, t);
			if (i === r || !Rl(r, i)) throw Error("Ungültiger Bewerbungsordner.");
			return {
				root: r,
				path: i
			};
		});
	}
	async applicationFolderOccupied(e) {
		return (await Promise.all(this.applicationArtifactPaths(e).map(({ path: e }) => zl(e)))).some(Boolean);
	}
	async relocateApplicationFolders(t, n) {
		let r = `${Il(t.company.name)}_${Ll(n)}`, i = Il(t.job.title), a = "";
		for (let n = 1; n < 1e4; n += 1) {
			let o = n === 1 ? i : `${i}_${n}`, s = e.join(r, o);
			if (s === t.folderName) return t.folderName;
			if (!await this.applicationFolderOccupied(s)) {
				a = s;
				break;
			}
		}
		if (!a) throw Error("Für die Bewerbung konnte kein eindeutiger Ordner erstellt werden.");
		let o = this.applicationArtifactPaths(t.folderName), c = this.applicationArtifactPaths(a), l = (await Promise.all(o.map(async (e, t) => ({
			source: e,
			target: c[t],
			exists: await zl(e.path)
		})))).filter((e) => e.exists), u = [];
		try {
			for (let t of l) {
				if (await zl(t.target.path)) throw Error(`Der Zielordner existiert bereits: ${t.target.path}`);
				await s(e.dirname(t.target.path), { recursive: !0 }), await d(t.source.path, t.target.path), u.push(t);
			}
		} catch (t) {
			for (let t of u.reverse()) try {
				await s(e.dirname(t.source.path), { recursive: !0 }), await d(t.target.path, t.source.path);
			} catch {}
			throw await this.removeEmptyArtifactParents(c), Hl(t) ? new Vl() : t;
		}
		return await this.removeEmptyArtifactParents(o), a;
	}
	async removeEmptyArtifactParents(t) {
		let n = new Map(t.map(({ root: t, path: n }) => [e.dirname(n), t]));
		await Promise.all([...n].map(async ([t, n]) => {
			let r = t;
			for (; r !== n && Rl(n, r);) {
				try {
					await p(r);
				} catch (t) {
					let n = typeof t == "object" && t && "code" in t ? String(t.code) : "";
					if (n === "ENOENT") {
						r = e.dirname(r);
						continue;
					}
					if ([
						"ENOTEMPTY",
						"EEXIST",
						"EACCES",
						"EBUSY",
						"EPERM"
					].includes(n)) break;
					throw t;
				}
				r = e.dirname(r);
			}
		}));
	}
	async containsNestedApplications(t) {
		let n = this.applicationDataPath(t), r;
		try {
			r = await u(n, { withFileTypes: !0 });
		} catch (e) {
			if ((typeof e == "object" && e && "code" in e ? String(e.code) : "") === "ENOENT") return !1;
			throw e;
		}
		return (await Promise.all(r.filter((e) => e.isDirectory()).map((t) => zl(e.join(n, t.name, "bewerbung.json"))))).some(Boolean);
	}
	async ensureApplicationDataDirectories(t) {
		let n = this.applicationDataPath(t.folderName);
		return await s(e.join(n, "Stellenanzeige"), { recursive: !0 }), { dataRoot: n };
	}
	archiveRootForCategory(e) {
		return e === "Zeugnisse" ? this.paths.zeugnisseArchive : this.paths.zertifikateArchive;
	}
	archiveRelativePath(t, n) {
		let r = this.archiveRootForCategory(t), i = e.resolve(n);
		if (!Rl(r, i) || i === e.resolve(r)) throw Error(`Bitte wählen Sie eine Datei aus dem zentralen Ordner „${t}“.`);
		return e.relative(r, i);
	}
	resolveArchivePath(t, n) {
		let r = this.archiveRootForCategory(t), i = e.resolve(r, n);
		if (!Rl(r, i) || i === e.resolve(r)) throw Error("Ungültiger Dokumentpfad.");
		return i;
	}
	async transitionApplicationDocuments(t, n) {
		let r = t.status === "Absage";
		if (r === (n === "Absage")) return;
		if (await this.containsNestedApplications(t.folderName)) throw Error("Dieser ältere Bewerbungsordner enthält weitere positionsbezogene Bewerbungen und kann nicht als Ganzes verschoben werden.");
		let i = this.documentDirectories(t), a = this.documentDirectories({
			...t,
			status: n
		}), o = r ? [[i.lebenslauf, a.lebenslauf], [i.anschreiben, a.anschreiben]] : [[i.anschreiben, a.anschreiben], [i.lebenslauf, a.lebenslauf]], c = [];
		try {
			for (let [t, n] of o) if (await zl(t)) {
				if (await zl(n)) throw Error(`Der Zielordner existiert bereits: ${n}`);
				await s(e.dirname(n), { recursive: !0 }), await d(t, n), c.push([t, n]);
			}
		} catch (e) {
			for (let [e, t] of c.reverse()) try {
				await d(t, e);
			} catch {}
			throw e;
		}
		let l = r ? [this.paths.absagenRoot, this.paths.absagenRoot] : [this.paths.anschreibenDocuments, this.paths.lebenslaufDocuments];
		await this.removeEmptyArtifactParents(o.map(([t], n) => ({
			root: e.resolve(l[n]),
			path: t
		})));
	}
	async removeApplicationArtifacts(t) {
		let n = t.folderName;
		if (await this.containsNestedApplications(n)) throw Error("Dieser ältere Bewerbungsordner enthält weitere positionsbezogene Bewerbungen und kann nicht als Ganzes gelöscht werden.");
		let r = [
			this.paths.applicationsData,
			this.paths.anschreibenDocuments,
			this.paths.lebenslaufDocuments,
			this.paths.absagenRoot
		], i = r.map((t) => {
			let r = e.resolve(t), i = e.resolve(t, n);
			if (i === r || !Rl(r, i)) throw Error("Ungültiger Bewerbungsordner.");
			return i;
		});
		await Promise.all(i.map((e) => f(e, {
			recursive: !0,
			force: !0
		}))), await this.removeEmptyArtifactParents(i.map((t, n) => ({
			root: e.resolve(r[n]),
			path: t
		})));
	}
}, Wl = async (e) => {
	try {
		return await m(e), !0;
	} catch {
		return !1;
	}
}, Gl = async (e, t) => {
	let [n, r] = await Promise.all([m(e), m(t)]);
	if (n.size !== r.size) return !1;
	let [i, a] = await Promise.all([l(e), l(t)]);
	return i.equals(a);
}, Kl = async (t) => {
	if (!await Wl(t)) return t;
	let n = e.extname(t), r = e.basename(t, n), i = e.dirname(t);
	for (let t = 2; t < 1e4; t += 1) {
		let a = e.join(i, `${r}_${t}${n}`);
		if (!await Wl(a)) return a;
	}
	throw Error(`Für „${t}“ konnte kein eindeutiger Dateiname erzeugt werden.`);
}, ql = async (t) => {
	let n = [], r = [t];
	for (; r.length;) {
		let t = r.pop();
		for (let i of await u(t, { withFileTypes: !0 })) {
			let a = e.join(t, i.name);
			i.isDirectory() && r.push(a), i.isFile() && n.push(a);
		}
	}
	return n;
}, Jl = async (t, n) => {
	if (await s(e.dirname(n), { recursive: !0 }), await Wl(n)) {
		if (await Gl(t, n)) return n;
		let e = await Kl(n);
		return await o(t, e), e;
	}
	return await o(t, n), n;
}, Yl = async (t, n, r = () => !0) => {
	if (await Wl(t)) for (let i of await ql(t)) {
		let a = e.relative(t, i);
		if (r(a)) {
			if (!Rl(t, i)) throw Error("Ungültiger Migrationsquellpfad.");
			await Jl(i, e.join(n, a));
		}
	}
}, Xl = /* @__PURE__ */ new Set([
	"Anschreiben",
	"Lebenslauf",
	"Zeugnisse",
	"Zertifikate"
]), Zl = (t, n) => {
	let r = [...n].sort((e, t) => t.length - e.length).find((n) => t === n || t.startsWith(`${n}${e.sep}`));
	if (!r) return !0;
	let [i] = e.relative(r, t).split(e.sep);
	return !Xl.has(i);
}, Ql = class {
	constructor(e) {
		this.paths = e, this.files = new Ul(e);
	}
	async readWorkspace(t) {
		let n = e.resolve(t);
		if (n === this.paths.dataRoot || Rl(this.paths.root, n)) throw Error("Der Migrationsquellordner muss außerhalb des neuen Hauptordners liegen.");
		let r = e.join(n, "Settings", "workspace.json"), i = JSON.parse(await l(r, "utf8"));
		return {
			sourcePath: n,
			workspace: Us.parse(i)
		};
	}
	async preview(e) {
		let t = await this.readWorkspace(e), n = await ql(t.sourcePath), r = 0;
		for (let e of n) r += (await m(e)).size;
		return {
			sourcePath: t.sourcePath,
			fileCount: n.length,
			totalBytes: r,
			applications: t.workspace.applications.length,
			attachments: t.workspace.attachments.length
		};
	}
	async copyLegacyData(t, n) {
		for (let r of [
			"Bewerbungen",
			"Muster",
			"Profile",
			"Backups"
		]) await Yl(e.join(t, r), r === "Bewerbungen" ? this.paths.applicationsData : e.join(this.paths.dataRoot, r), r === "Bewerbungen" ? (e) => Zl(e, n.applications.map((e) => e.folderName)) : void 0);
		await Yl(e.join(t, "Settings"), e.join(this.paths.dataRoot, "Settings"), (e) => !["workspace.json", "workspace.json.bak"].includes(e)), await Yl(e.join(t, "Anschreiben"), e.join(this.paths.anschreibenDocuments, "Bestand")), await Yl(e.join(t, "Lebenslauf"), e.join(this.paths.lebenslaufDocuments, "Bestand")), await Yl(e.join(t, "Zeugnisse"), this.paths.zeugnisseArchive), await Yl(e.join(t, "Zertifikate"), this.paths.zertifikateArchive);
	}
	async migrateApplicationDocuments(t, n) {
		for (let r of n.applications) {
			let n = e.join(t, "Bewerbungen", r.folderName), i = this.files.documentDirectories(r);
			await Yl(e.join(n, "Anschreiben"), i.anschreiben), await Yl(e.join(n, "Lebenslauf"), i.lebenslauf);
		}
	}
	async migrateAttachment(t, n, r) {
		if (r.archiveRelativePath || !r.storedName) return r;
		let i = n.applications.find((e) => e.id === r.applicationId);
		if (!i) return r;
		let a = e.join(t, "Bewerbungen", i.folderName, r.category, r.storedName);
		if (!await Wl(a)) return r;
		let o = this.files.archiveRootForCategory(r.category), s = await Jl(a, e.join(o, Il(r.fileName)));
		return {
			...r,
			archiveRelativePath: e.relative(o, s)
		};
	}
	async migrate(e) {
		let t = await this.readWorkspace(e);
		await this.files.initialize(), await this.copyLegacyData(t.sourcePath, t.workspace), await this.migrateApplicationDocuments(t.sourcePath, t.workspace);
		let n = await Promise.all(t.workspace.attachments.map((e) => this.migrateAttachment(t.sourcePath, t.workspace, e)));
		return Us.parse({
			...t.workspace,
			attachments: n
		});
	}
}, $l = () => (/* @__PURE__ */ new Date()).toISOString(), eu = () => crypto.randomUUID(), tu = /* @__PURE__ */ new Set([
	"Zusage",
	"Absage",
	"Zurückgezogen",
	"Archiviert"
]), nu = (e, t) => JSON.stringify({
	...e,
	folderName: "",
	updatedAt: ""
}) !== JSON.stringify({
	...t,
	folderName: "",
	updatedAt: ""
}), ru = (e) => e === "Absage" ? "absage" : e === "Vorstellungsgespräch" ? "vorstellungsgespraech" : e === "Beworben" || e === "Gesendet" ? "bewerbung" : "update", iu = (e, t) => t?.trim() ? `${e}: ${t.trim()}` : "", au = (e) => {
	let t = e ? Ic(e) : 0;
	return `${"●".repeat(t)}${"○".repeat(6 - t)}`;
}, ou = (e) => Uo(e).family.match(/"([^"]+)"|([^,]+)/)?.[1] ?? Uo(e).family.match(/"([^"]+)"|([^,]+)/)?.[2]?.trim() ?? "Arial", su = (e, t, n) => {
	let r = (e) => [
		1,
		3,
		5
	].map((t) => Number.parseInt(e.replace("#", "").slice(t - 1, t + 1), 16)), i = r(e), a = r(t);
	return `#${i.map((e, t) => Math.round(e * (1 - n) + a[t] * n).toString(16).padStart(2, "0")).join("")}`;
}, cu = {
	"application-sent": [],
	"application-rejected": [],
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
}, lu = () => ({
	schemaVersion: 1,
	applications: [],
	profiles: [],
	events: [],
	attachments: [],
	settings: Ks,
	updatedAt: $l()
}), uu = () => ({
	schemaVersion: 1,
	deletedApplications: [],
	updatedAt: $l()
}), du = () => (/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(0, 14), fu = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), n.setHours(9, 0, 0, 0), n.toISOString();
}, pu = (e, t = " | ") => e.map((e) => e?.trim()).filter(Boolean).join(t), mu = (e) => {
	let [t, ...n] = e.split(/\s+(?:\||–|—|:)\s+|\s+-\s+/).map((e) => e.trim());
	return {
		name: t ?? "",
		level: n.join(" – ")
	};
}, hu = (e) => [
	pu([e.date || pu([e.from, e.to], " – "), pu([
		e.title,
		e.subtitle,
		e.location
	], " | ")], " | "),
	e.description,
	...e.bullets.map((e) => `• ${e}`),
	e.url
].filter(Boolean).join("\n"), gu = (e, t) => (e?.specialSections ?? []).filter((e) => e.isVisible && t.includes(e.kind)).flatMap((e) => e.entries.map(hu)).filter(Boolean).join("\n\n"), _u = (e, t, n) => {
	let r = (e?.specialSections ?? []).filter((e) => e.isVisible && t.includes(e.kind) && e.entries.some((e) => hu(e)));
	return r[0]?.title || (r.length ? n : "");
}, vu = class {
	constructor(t, n) {
		this.gitAutomation = n, this.workspace = lu();
		let r = typeof t == "string" ? gc(t) : t;
		this.files = new Ul(r), this.migration = new Ql(r), this.dataPath = r.dataRoot, this.workspacePath = e.join(this.dataPath, "Settings", "workspace.json"), this.applicationDraftPath = e.join(this.dataPath, "Settings", "new-application-draft.json"), this.deletedApplicationsPath = e.join(this.dataPath, "Silinenler", "silinenler.json");
	}
	async initialize() {
		await this.files.initialize(), this.workspace = await this.loadWorkspace(), this.workspace.applications.forEach((e) => this.syncEvents(e)), await this.persist();
	}
	getWorkspace() {
		return structuredClone(this.workspace);
	}
	async getApplicationDraft() {
		try {
			let e = JSON.parse(await l(this.applicationDraftPath, "utf8"));
			return Rs.parse(e);
		} catch {
			return null;
		}
	}
	async saveApplicationDraft(e) {
		let t = Rs.parse(e);
		await this.atomicWrite(this.applicationDraftPath, JSON.stringify(t, null, 2));
	}
	async clearApplicationDraft() {
		await f(this.applicationDraftPath, { force: !0 }), await f(`${this.applicationDraftPath}.bak`, { force: !0 });
	}
	async loadWorkspace() {
		for (let e of [this.workspacePath, `${this.workspacePath}.bak`]) try {
			let t = JSON.parse(await l(e, "utf8")), n = Us.safeParse(t);
			if (n.success) return n.data;
		} catch {}
		return lu();
	}
	async loadDeletedApplicationsArchive() {
		let e = !1;
		for (let t of [this.deletedApplicationsPath, `${this.deletedApplicationsPath}.bak`]) try {
			let n = JSON.parse(await l(t, "utf8"));
			e = !0;
			let r = Gs.safeParse(n);
			if (r.success) return r.data;
		} catch (t) {
			(typeof t == "object" && t && "code" in t ? String(t.code) : "") !== "ENOENT" && (e = !0);
		}
		if (e) throw Error("Das Archiv der gelöschten Bewerbungen konnte nicht gelesen werden.");
		return uu();
	}
	async archiveDeletedApplication(e) {
		let t = await this.loadDeletedApplicationsArchive(), n = {
			deletedAt: $l(),
			application: structuredClone(e),
			events: structuredClone(this.workspace.events.filter((t) => t.applicationId === e.id)),
			attachments: structuredClone(this.workspace.attachments.filter((t) => t.applicationId === e.id))
		};
		t.deletedApplications = [n, ...t.deletedApplications.filter((t) => t.application.id !== e.id)], t.updatedAt = n.deletedAt;
		let r = Gs.parse(t);
		await this.atomicWrite(this.deletedApplicationsPath, JSON.stringify(r, null, 2));
	}
	async atomicWrite(t, n) {
		await s(e.dirname(t), { recursive: !0 });
		let r = `${t}.${eu()}.tmp`, i = `${t}.bak`, a = await c(r, "w");
		try {
			await a.writeFile(n, "utf8"), await a.sync();
		} finally {
			await a.close();
		}
		try {
			await o(t, i);
		} catch {}
		try {
			await d(r, t);
		} catch {
			await f(t, { force: !0 }), await d(r, t);
		}
	}
	async persist(e = []) {
		this.workspace.updatedAt = $l();
		let t = Us.parse(this.workspace);
		await this.atomicWrite(this.workspacePath, JSON.stringify(t, null, 2)), await Promise.all(e.map((e) => this.persistApplicationFiles(Is.parse(e)))), await this.createAutomaticBackup();
	}
	async createAutomaticBackup() {
		if (!this.workspace.settings.autoBackupEnabled) return;
		let t = e.join(this.dataPath, "Backups");
		await s(t, { recursive: !0 });
		let n = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), r = e.join(t, `workspace-${n}.json`);
		try {
			await m(r);
		} catch {
			await o(this.workspacePath, r);
		}
		let i = (await u(t, { withFileTypes: !0 })).filter((e) => e.isFile() && /^workspace-\d{4}-\d{2}-\d{2}\.json$/.test(e.name)).map((e) => e.name).sort().reverse();
		for (let n of i.slice(this.workspace.settings.backupRetention)) {
			let r = e.resolve(t, n);
			if (!r.startsWith(`${e.resolve(t)}${e.sep}`)) throw Error("Ungültiger Sicherungspfad.");
			await f(r, { force: !0 });
		}
	}
	queueGitCommit(e, t) {
		let n = this.getApplication(e);
		this.gitAutomation?.queueCommit(n.company.name, t);
	}
	queueApplicationGitCommit(e, t) {
		this.gitAutomation?.queueCommit(e.company.name, t);
	}
	applicationPath(e) {
		return this.files.applicationDataPath(e.folderName);
	}
	getApplicationAnschreibenPath(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		return this.files.documentDirectories(t).anschreiben;
	}
	async ensureApplicationDataDirectories(e) {
		return this.files.ensureApplicationDataDirectories(e);
	}
	async persistApplicationFiles(t) {
		await s(this.files.documentDirectories(t).anschreiben, { recursive: !0 });
		let { dataRoot: n } = await this.ensureApplicationDataDirectories(t);
		await Promise.all([
			this.atomicWrite(e.join(n, "bewerbung.json"), JSON.stringify(Is.parse(t), null, 2)),
			this.atomicWrite(e.join(n, "Stellenanzeige", "stellenanzeige.json"), JSON.stringify(t.job, null, 2)),
			this.atomicWrite(e.join(n, "Stellenanzeige", "stellenanzeige.txt"), t.job.fullText)
		]);
	}
	createEvent(e, t, n, r, i) {
		let a = $l();
		return {
			id: eu(),
			applicationId: e,
			type: t,
			title: n,
			description: "",
			startAt: r,
			allDay: i,
			completed: !1,
			cancelled: !1,
			reminderMinutes: cu[t],
			createdAt: a,
			updatedAt: a
		};
	}
	ensureEvent(e, t, n, r, i = !1) {
		let a = this.workspace.events.find((n) => n.applicationId === e.id && n.type === t);
		if (!r) {
			a && (a.cancelled = !0, a.updatedAt = $l());
			return;
		}
		if (a) {
			Object.assign(a, {
				title: n,
				startAt: r,
				allDay: i,
				cancelled: !1,
				updatedAt: $l()
			});
			return;
		}
		this.workspace.events.push(this.createEvent(e.id, t, n, r, i));
	}
	syncEvents(e) {
		let t = e.company.name;
		this.ensureEvent(e, "application-sent", `${t} · Bewerbung gesendet`, e.sentAt, !0), this.ensureEvent(e, "application-rejected", `${t} · Absage`, e.status === "Absage" ? e.rejectionAt : void 0, !0), this.ensureEvent(e, "application-deadline", `Bewerbungsfrist · ${t}`, e.deadlineAt, !0), this.ensureEvent(e, "interview", `Vorstellungsgespräch · ${t}`, e.interviewAt), this.ensureEvent(e, "second-interview", `Zweites Gespräch · ${t}`, e.secondInterviewAt), this.ensureEvent(e, "contract-start", `Vertragsbeginn · ${t}`, e.startAt, !0), this.ensureEvent(e, "contract-end", `Vertragsende · ${t}`, e.contractEndAt, !0), this.ensureEvent(e, "fixed-term-end", `Befristungsende · ${t}`, e.fixedTermEndAt, !0), this.ensureEvent(e, "probation-end", `Probezeitende · ${t}`, e.probationEndAt, !0);
		let n = (e.status === "Beworben" || e.status === "Gesendet") && e.sentAt && this.workspace.settings.followUpDays !== null ? fu(e.sentAt, this.workspace.settings.followUpDays) : void 0;
		if (this.ensureEvent(e, "follow-up-call", `${t} · Nachfassen`, n), tu.has(e.status)) {
			let t = /* @__PURE__ */ new Set([
				"application-sent",
				"application-rejected",
				"contract-start",
				"contract-end",
				"fixed-term-end",
				"probation-end"
			]);
			this.workspace.events.forEach((n) => {
				n.applicationId === e.id && !t.has(n.type) && new Date(n.startAt) > /* @__PURE__ */ new Date() && (n.cancelled = !0, n.updatedAt = $l());
			});
		}
	}
	async createApplication(e) {
		let t = Ls.parse(e), n = $l(), r = await this.files.allocateApplicationFolderName(t.company.name, t.job.title, t.sentAt ? new Date(t.sentAt) : /* @__PURE__ */ new Date()), i = {
			schemaVersion: 1,
			id: eu(),
			folderName: r,
			...t,
			status: t.sentAt ? "Beworben" : "Entwurf",
			documents: {
				coverSubject: `Bewerbung als ${t.job.title}`,
				coverIntroduction: `die Position als ${t.job.title} bei ${t.company.name} verbindet genau die Aufgaben, in denen ich meine Erfahrung gezielt einbringen möchte.`,
				coverMotivation: "",
				coverQualification: "",
				coverCompanyFit: "",
				coverExtraParagraph: "",
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
		return this.workspace.applications.unshift(Is.parse(i)), this.syncEvents(i), await this.persist([i]), this.queueApplicationGitCommit(i, t.sentAt ? "bewerbung" : "create"), this.getWorkspace();
	}
	async saveApplication(e) {
		let t = Is.parse(e), n = this.workspace.applications.findIndex((e) => e.id === t.id);
		if (n < 0) throw Error("Bewerbung wurde nicht gefunden.");
		let r = this.workspace.applications[n], i = nu(r, t);
		return t.folderName = await this.files.relocateApplicationFolders({
			...t,
			folderName: r.folderName
		}, new Date(t.sentAt ?? r.createdAt)), await this.files.syncInterviewFolder(r, t), t.updatedAt = $l(), this.workspace.applications[n] = t, this.syncEvents(t), await this.persist([t]), i && this.queueApplicationGitCommit(t, "update"), this.getWorkspace();
	}
	async changeStatus(e, t, n) {
		let r = this.workspace.applications.find((t) => t.id === e);
		if (!r) throw Error("Bewerbung wurde nicht gefunden.");
		if (r.status !== t) {
			let e = $l(), i = r.status;
			await this.files.syncInterviewFolder(void 0, {
				...r,
				status: t
			}), await this.files.transitionApplicationDocuments(r, t), r.status = t, r.updatedAt = e, r.statusHistory.push({
				at: e,
				from: i,
				to: t,
				note: ""
			}), t === "Absage" && (r.rejectionAt = e, r.rejectionReason = n ?? "Keine Begründung"), t === "Zusage" && (r.acceptedAt = e), t === "Zurückgezogen" && (r.withdrawnAt = e), t === "Archiviert" && (r.archivedAt = e), this.syncEvents(r), await this.persist([r]), this.queueApplicationGitCommit(r, ru(t));
		}
		return this.getWorkspace();
	}
	async removeApplication(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		return await this.archiveDeletedApplication(t), await this.files.removeApplicationArtifacts(t), this.workspace.applications = this.workspace.applications.filter((t) => t.id !== e), this.workspace.events = this.workspace.events.filter((t) => t.applicationId !== e), this.workspace.attachments = this.workspace.attachments.filter((t) => t.applicationId !== e), await this.persist(), this.queueApplicationGitCommit(t, "delete"), this.getWorkspace();
	}
	async duplicateApplication(e) {
		let t = this.workspace.applications.find((t) => t.id === e);
		if (!t) throw Error("Bewerbung wurde nicht gefunden.");
		let n = $l(), r = await this.files.allocateApplicationFolderName(t.company.name, t.job.title), i = {
			...structuredClone(t),
			id: eu(),
			folderName: r,
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
		return this.workspace.applications.unshift(i), this.syncEvents(i), await this.persist([i]), this.queueApplicationGitCommit(i, "create"), this.getWorkspace();
	}
	async saveProfile(e) {
		let t = zs.parse(e);
		t.isDefault && this.workspace.profiles.forEach((e) => {
			e.isDefault = !1;
		});
		let n = this.workspace.profiles.findIndex((e) => e.id === t.id);
		return n >= 0 ? this.workspace.profiles[n] = t : this.workspace.profiles.push(t), await this.persist(), this.getWorkspace();
	}
	async removeProfile(e) {
		let t = this.workspace.profiles.findIndex((t) => t.id === e);
		if (t < 0) throw Error("Profil wurde nicht gefunden.");
		this.workspace.profiles.splice(t, 1), this.workspace.profiles.length > 0 && !this.workspace.profiles.some((e) => e.isDefault) && (this.workspace.profiles[0].isDefault = !0);
		let n = this.workspace.profiles.find((e) => e.isDefault) ?? this.workspace.profiles[0], r = $l(), i = this.workspace.applications.filter((t) => t.profileId === e);
		return i.forEach((e) => {
			e.profileId = n?.id, e.updatedAt = r;
		}), await this.persist(i), this.getWorkspace();
	}
	async saveSettings(e) {
		return this.workspace.settings = Hs.parse(e), this.workspace.applications.forEach((e) => this.syncEvents(e)), await this.persist(), this.getWorkspace();
	}
	async saveEvent(e) {
		let t = this.workspace.events.findIndex((t) => t.id === e.id);
		if (t < 0) throw Error("Termin wurde nicht gefunden.");
		return this.workspace.events[t] = e, await this.persist(), e.applicationId && this.queueGitCommit(e.applicationId, "update"), this.getWorkspace();
	}
	async addAttachment(t, n, r) {
		let i = this.workspace.applications.find((e) => e.id === t);
		if (!i) throw Error("Bewerbung wurde nicht gefunden.");
		let a = e.basename(r), o = this.files.archiveRelativePath(n, r), s = {
			id: eu(),
			applicationId: t,
			category: n,
			fileName: a,
			archiveRelativePath: o,
			description: "",
			documentDate: "",
			order: i.attachmentIds.length,
			includedInPackage: !0,
			createdAt: $l()
		};
		return this.workspace.attachments.push(s), i.attachmentIds.push(s.id), await this.persist([i]), this.queueApplicationGitCommit(i, "update"), this.getWorkspace();
	}
	getAttachmentPath(t) {
		if (t.archiveRelativePath) return this.files.resolveArchivePath(t.category, t.archiveRelativePath);
		if (!t.storedName) throw Error("Der Dokumentverweis ist unvollständig.");
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
		let n = Vs.parse(t), r = this.workspace.attachments.findIndex((e) => e.id === n.id);
		if (r < 0) throw Error("Dokument wurde nicht gefunden.");
		let i = this.workspace.attachments[r];
		if (i.applicationId !== n.applicationId) throw Error("Die Zuordnung einer Datei kann nicht frei geändert werden.");
		if (i.category !== n.category) {
			if (i.archiveRelativePath) throw Error("Die Kategorie eines Archivdokuments kann nicht nachträglich geändert werden.");
			let t = this.getAttachmentPath(i), r = this.getAttachmentPath(n);
			await s(e.dirname(r), { recursive: !0 }), await d(t, r);
		}
		return this.workspace.attachments[r] = n, await this.persist(), this.queueGitCommit(n.applicationId, "update"), this.getWorkspace();
	}
	async moveAttachment(e, t) {
		let n = this.workspace.attachments.find((t) => t.id === e);
		if (!n) throw Error("Dokument wurde nicht gefunden.");
		let r = this.workspace.attachments.filter((e) => e.applicationId === n.applicationId && e.category === n.category).sort((e, t) => e.order - t.order), i = r.findIndex((t) => t.id === e), a = i + t;
		if (i < 0 || a < 0 || a >= r.length) return this.getWorkspace();
		let o = r[a], s = n.order;
		return n.order = o.order, o.order = s, await this.persist(), this.queueGitCommit(n.applicationId, "update"), this.getWorkspace();
	}
	async removeAttachment(e) {
		let t = this.workspace.attachments.find((t) => t.id === e);
		if (!t) throw Error("Dokument wurde nicht gefunden.");
		t.archiveRelativePath || await f(this.getAttachmentPath(t), { force: !0 }), this.workspace.attachments = this.workspace.attachments.filter((t) => t.id !== e);
		let n = this.getApplication(t.applicationId);
		return n.attachmentIds = n.attachmentIds.filter((t) => t !== e), await this.persist([n]), this.queueApplicationGitCommit(n, "update"), this.getWorkspace();
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
	getTemplateDocumentContext(e) {
		let t = this.getApplication(e), n = this.getProfileForApplication(t), r = n ? `${n.firstName} ${n.lastName}`.trim() : "", i = [t.contact.firstName, t.contact.lastName].filter(Boolean).join(" "), a = i ? t.contact.salutation === "Herr" ? `Herrn ${i}` : t.contact.salutation === "Frau" ? `Frau ${i}` : i : "", o = t.contact.lastName ? t.contact.salutation === "Herr" ? `Sehr geehrter Herr ${t.contact.lastName},` : t.contact.salutation === "Frau" ? `Sehr geehrte Frau ${t.contact.lastName},` : `Guten Tag ${i},` : "Sehr geehrte Damen und Herren,", s = Mc(n?.knowledgeSection, n?.skills ?? []), c = jc(s, !1), l = n?.strengths.length ? n.strengths : (n?.skills ?? []).map((e) => {
			let [t, ...n] = e.split(/\s+(?:–|—|:)\s+/);
			return {
				id: "",
				title: t.trim(),
				description: n.join(" – ").trim()
			};
		}), u = (n?.onlineProfiles ?? []).filter((e) => e.url).map((e) => pu([e.label, e.url], ": ")), d = gu(n, ["projects"]), f = gu(n, ["trainings"]), p = gu(n, ["publications"]), m = gu(n, ["volunteer"]), h = gu(n, ["drivingLicenses"]), g = gu(n, ["interests"]), _ = [
			gu(n, [
				"internships",
				"internationalExperience",
				"scholarships",
				"awards",
				"additional",
				"references",
				"custom"
			]),
			n?.nationality ? `Staatsangehörigkeit: ${n.nationality}` : "",
			n?.familyStatus ? `Familienstand: ${n.familyStatus}` : "",
			n?.children ? `Kinder: ${n.children}` : ""
		].filter(Boolean).join("\n"), v = {
			VORNAME: n?.firstName ?? "",
			NACHNAME: n?.lastName ?? "",
			BERUFSBEZEICHNUNG: n?.title || t.job.title,
			FACHGEBIET_1: n?.skills[0] ?? "",
			FACHGEBIET_2: n?.skills[1] ?? "",
			FACHGEBIETE: (n?.skills ?? []).slice(0, 3).join(" | "),
			TELEFON: n?.phone ?? "",
			EMAIL: n?.email ?? "",
			WEBSITE: n?.portfolio || n?.github || u[0] || "",
			GITHUB: n?.github ?? "",
			LINKEDIN: n?.linkedin ?? "",
			ORT: n?.city ?? "",
			GEBURTSDATUM: n?.birthDate ?? "",
			GEBURTSORT: n?.birthPlace ?? "",
			GEBURTSZEILE: n?.birthDate || n?.birthPlace ? `Geb. ${n?.birthDate ?? ""}${n?.birthDate && n?.birthPlace ? " in " : ""}${n?.birthPlace ?? ""}` : "",
			KONTAKT_ZEILE_1: pu([n?.phone, n?.email]),
			KONTAKT_ZEILE_2: pu([
				n?.portfolio || n?.github,
				n?.linkedin,
				...u
			]),
			KONTAKT_ZEILE_3: pu([
				n?.city,
				n?.birthDate,
				n?.birthPlace
			]),
			KONTAKTE_TITEL: n?.phone || n?.email || n?.portfolio || n?.github || n?.linkedin || u.length || n?.city ? "KONTAKTE" : "",
			KONTAKTDATEN_TITEL: n?.phone || n?.email || n?.portfolio || n?.github || n?.linkedin || u.length || n?.city || n?.birthDate || n?.birthPlace ? "KONTAKTDATEN" : "",
			TELEFON_ZEILE: iu("Telefon", n?.phone),
			EMAIL_ZEILE: iu("E-Mail", n?.email),
			WEBSITE_ZEILE: iu("Website", n?.portfolio || n?.github),
			LINKEDIN_ZEILE: iu("LinkedIn", n?.linkedin),
			ORT_ZEILE: iu("Ort", n?.city),
			HEADER_KONTAKT_1: n?.phone ?? "",
			HEADER_KONTAKT_2: n?.email ?? "",
			HEADER_KONTAKT_3: n?.linkedin ?? "",
			HEADER_KONTAKT_4: pu([n?.city, n?.country]),
			HEADER_KONTAKT_5: n?.birthDate || n?.birthPlace ? `Geb. ${n?.birthDate ?? ""}${n?.birthDate && n?.birthPlace ? " in " : ""}${n?.birthPlace ?? ""}` : "",
			HEADER_KONTAKT_6: n?.portfolio || n?.github || u[0] || "",
			PROFILFOTO: n?.photoPath ?? "",
			ZUSAMMENFASSUNG_TITEL: t.documents.resumeProfile || n?.summary ? as(n, "summary").toLocaleUpperCase("de-DE") : "",
			ZUSAMMENFASSUNG: t.documents.resumeProfile || n?.summary || "",
			STAERKEN_TITEL: n && (n.strengths.length || n.skills.length) ? as(n, "strengths").toLocaleUpperCase("de-DE") : "",
			STAERKEN_ATS: l.slice(0, 3).map((e) => pu([e.title, e.description], " – ")).join("\n"),
			ERFOLGE_TITEL: "",
			ERFOLGE_ATS: "",
			ERFOLG_HIGHLIGHT_1_TITEL: "",
			ERFOLG_HIGHLIGHT_1_BESCHREIBUNG: "",
			ERFOLG_HIGHLIGHT_2_TITEL: "",
			ERFOLG_HIGHLIGHT_2_BESCHREIBUNG: "",
			KENNTNISSE_TITEL: c ? as(n, "knowledge").toLocaleUpperCase("de-DE") : "",
			KENNTNISSE: c,
			SPRACHEN_TITEL: n?.languages.length ? as(n, "languages").toLocaleUpperCase("de-DE") : "",
			SPRACHEN_ATS: (n?.languages ?? []).join("\n"),
			BERUFSERFAHRUNG_TITEL: n?.experiences.length ? as(n, "experience").toLocaleUpperCase("de-DE") : "",
			ERFAHRUNG_TITEL: n?.experiences.length ? as(n, "experience").toLocaleUpperCase("de-DE") : "",
			AUSBILDUNG_TITEL: n?.education.length ? as(n, "education").toLocaleUpperCase("de-DE") : "",
			PROJEKTE_TITEL: _u(n, ["projects"], "PROJEKTE"),
			PROJEKTE: d,
			WEITERBILDUNGEN_TITEL: _u(n, ["trainings"], "WEITERBILDUNGEN"),
			WEITERBILDUNGEN: f,
			ZERTIFIKATE_TITEL: n?.certifications.length ? as(n, "certifications").toLocaleUpperCase("de-DE") : "",
			ZERTIFIKATE: (n?.certifications ?? []).join("\n"),
			VEROEFFENTLICHUNGEN_TITEL: _u(n, ["publications"], "VERÖFFENTLICHUNGEN"),
			VEROEFFENTLICHUNGEN: p,
			EHRENAMT_TITEL: _u(n, ["volunteer"], "EHRENAMT"),
			EHRENAMT: m,
			SOFTWARE_TITEL: "",
			SOFTWARE: "",
			ZUSATZANGABEN_TITEL: _ ? "ZUSATZANGABEN" : "",
			ZUSATZANGABEN: _,
			FUEHRERSCHEIN_TITEL: _u(n, ["drivingLicenses"], "FÜHRERSCHEIN"),
			FUEHRERSCHEIN: h,
			INTERESSEN_TITEL: _u(n, ["interests"], "INTERESSEN"),
			INTERESSEN: g,
			LEBENSLAUF_ORT: n?.applicationPlace || n?.city || "",
			LEBENSLAUF_DATUM: n?.applicationDate ?? "",
			LEBENSLAUF_UNTERSCHRIFT: n?.signaturePath ?? "",
			DESIGN_PRIMARY: t.accentColor,
			DESIGN_ACCENT: t.secondaryColor,
			DESIGN_SOFT_ACCENT: su(t.accentColor, "#ffffff", .78),
			DESIGN_TITLE_BACKGROUND: su(t.accentColor, "#ffffff", .62),
			DESIGN_FONT: ou(t.designSettings.fontId),
			DESIGN_MARGIN_VERTICAL_MM: String(zo[t.designSettings.marginLevel].vertical),
			DESIGN_MARGIN_HORIZONTAL_MM: String(zo[t.designSettings.marginLevel].horizontal),
			DEKORATION_AKTIV: t.designSettings.showBackgroundInPrint ? "true" : "false",
			ATS_MODUS: t.designSettings.columnLayout === "compact-ats" ? "true" : ""
		}, y = Math.min((n?.experiences.length ?? 0) - 1, 7);
		for (let e = 0; e < 8; e += 1) {
			let t = e + 1, r = n?.experiences[e];
			v[`POSITION_${t}`] = r?.role ?? "", v[`UNTERNEHMEN_${t}`] = pu([r?.company, r?.legalForm], " "), v[`STARTDATUM_${t}`] = r?.from ?? "", v[`DATUM_TRENNER_${t}`] = r?.from && r.to ? " – " : "", v[`ENDDATUM_${t}`] = r?.to ?? "", v[`ARBEITSORT_${t}`] = r?.city ?? "", v[`BESCHREIBUNG_${t}`] = pu([
				r?.employmentType,
				r?.teamSize ? `Team/Verantwortung: ${r.teamSize}` : "",
				r?.description
			], "\n"), v[`METADATA_TRENNER_${t}`] = (r?.from || r?.to) && r?.city ? "·" : "", v[`TECHNOLOGIEN_${t}`] = r?.technologies.join(" · ") ?? "", v[`ERFAHRUNG_TRENNER_${t}`] = r && e < y ? "​" : "";
			let i = r ? [
				...r.tasks,
				...r.projects.map((e) => `Projekt: ${e}`),
				...r.achievements
			].filter(Boolean) : [];
			for (let e = 0; e < 5; e += 1) v[`ERFOLG_${t}_${e + 1}`] = i[e] ?? "";
		}
		for (let e = 0; e < 3; e += 1) {
			let t = e + 1, r = n?.education[e];
			v[`ABSCHLUSS_${t}`] = r?.degree || r?.type || "", v[`FACHRICHTUNG_${t}`] = pu([
				r?.fieldOfStudy,
				r?.grade,
				r?.status,
				r?.description
			], " · "), v[`HOCHSCHULE_${t}`] = r?.institution ?? "", v[`AUSBILDUNG_START_${t}`] = r?.from ?? "", v[`AUSBILDUNG_DATUM_TRENNER_${t}`] = r?.from && r.to ? " – " : "", v[`AUSBILDUNG_ENDE_${t}`] = r?.to ?? "", v[`AUSBILDUNG_ORT_${t}`] = pu([r?.city, r?.country], ", "), v[`AUSBILDUNG_METADATA_TRENNER_${t}`] = (r?.from || r?.to) && r?.city ? "·" : "";
			let i = l[e];
			v[`STAERKE_${t}_TITEL`] = i?.title ?? "", v[`STAERKE_${t}_BESCHREIBUNG`] = i?.description ?? "";
			let a = mu(n?.languages[e] ?? "");
			v[`SPRACHE_${t}`] = a.name, v[`SPRACHNIVEAU_${t}`] = "", v[`SPRACHE_${t}_PUNKTE`] = au(a.level);
		}
		s.categories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).slice(0, 6).forEach((e, t) => {
			let n = [...e.items.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => e.name), ...e.subcategories.filter((e) => e.isVisible).sort((e, t) => e.sortOrder - t.sortOrder).flatMap((e) => e.items.filter((e) => e.isVisible && e.name.trim()).sort((e, t) => e.sortOrder - t.sortOrder).map((e) => e.name))];
			v[`KENNTNIS_KATEGORIE_${t + 1}`] = n.length ? e.title : "", v[`KENNTNIS_EINTRAEGE_${t + 1}`] = n.join(" · ");
		});
		let b = {
			BEWERBER_NAME: r,
			BEWERBER_VORNAME: n?.firstName ?? "",
			BEWERBER_NACHNAME: n?.lastName ?? "",
			BEWERBER_ADRESSE: n?.street ?? "",
			BEWERBER_PLZ: n?.postalCode ?? "",
			BEWERBER_ORT: n?.city ?? "",
			BEWERBER_TELEFON: n?.phone ?? "",
			BEWERBER_EMAIL: n?.email ?? "",
			FIRMA_NAME: t.company.name,
			FIRMA_ADRESSE: t.company.street,
			FIRMA_PLZ: t.company.postalCode,
			FIRMA_ORT: t.company.city,
			ANSPRECHPARTNER: a,
			STELLENBEZEICHNUNG: t.job.title,
			STELLENNUMMER: "",
			BEWERBUNGSDATUM: wc(t),
			BETREFF: t.documents.coverSubject || `Bewerbung als ${t.job.title}`,
			ANREDE: o,
			EINLEITUNG: t.documents.coverIntroduction,
			MOTIVATION: t.documents.coverMotivation,
			FACHLICHE_EIGNUNG: t.documents.coverQualification,
			UNTERNEHMENSBEZUG: t.documents.coverCompanyFit,
			ZUSATZABSATZ: t.documents.coverExtraParagraph,
			HAUPTTEXT: [
				t.documents.coverMotivation,
				t.documents.coverQualification,
				t.documents.coverCompanyFit
			].filter(Boolean).join("\n\n"),
			SCHLUSSTEXT: t.documents.coverClosing,
			GRUSSFORMEL: "Mit freundlichen Grüßen",
			UNTERSCHRIFT: r,
			KENNTNISSE: c,
			...v
		}, x = this.files.documentDirectories(t);
		return {
			application: t,
			targetDirectories: {
				anschreiben: x.anschreiben,
				deckblatt: x.deckblatt,
				lebenslauf: x.lebenslauf
			},
			requestedBaseName: t.company.name,
			data: b
		};
	}
	getExportHtml(e, t, n) {
		let r = n ? Is.parse(n) : this.getApplication(e);
		if (r.id !== e) throw Error("Die Exportdaten gehören nicht zur ausgewählten Bewerbung.");
		return Pl(r, this.getProfileForApplication(r), t);
	}
	getExportDefaultName(e, t) {
		let n = this.getApplication(e);
		return `${Il(n.company.name)}_${Il(n.job.title)}_${t}.pdf`;
	}
	async writeBackup(e) {
		await h(e, JSON.stringify(Us.parse(this.workspace), null, 2), "utf8");
	}
	previewLegacyMigration(e) {
		return this.migration.preview(e);
	}
	async migrateLegacyData(t) {
		if (this.workspace.applications.length > 0 || this.workspace.profiles.length > 0 || this.workspace.events.length > 0 || this.workspace.attachments.length > 0) throw Error("Eine Migration ist nur möglich, solange der neue Datenbestand leer ist.");
		let n = e.join(this.dataPath, "Backups", `vor-migration-${du()}-${eu()}.json`);
		await o(this.workspacePath, n);
		let r = await this.migration.preview(t), i = this.workspace;
		try {
			return this.workspace = await this.migration.migrate(t), await this.persist(this.workspace.applications), await this.atomicWrite(e.join(this.dataPath, "Backups", `migration-${du()}-${eu()}.json`), JSON.stringify({
				migratedAt: $l(),
				sourcePath: r.sourcePath,
				targetPath: this.dataPath,
				fileCount: r.fileCount,
				totalBytes: r.totalBytes,
				applications: r.applications,
				attachments: r.attachments,
				sourceFilesDeleted: !1
			}, null, 2)), this.getWorkspace();
		} catch (e) {
			throw this.workspace = i, e;
		}
	}
	async importBackup(t) {
		let n = JSON.parse(await l(t, "utf8")), r = Us.parse(n), i = e.join(this.dataPath, "Backups", `vor-import-${du()}.json`);
		await o(this.workspacePath, i);
		let a = this.workspace;
		try {
			this.workspace = r;
			let e = [];
			for (let t of this.workspace.attachments) try {
				await m(this.getAttachmentPath(t)), e.push(t);
			} catch {}
			this.workspace.attachments = e;
			let t = new Set(e.map((e) => e.id));
			return this.workspace.applications.forEach((e) => {
				e.attachmentIds = e.attachmentIds.filter((e) => t.has(e));
			}), await this.persist(this.workspace.applications), this.getWorkspace();
		} catch (e) {
			this.workspace = a;
			try {
				await this.persist();
			} catch {}
			throw e;
		}
	}
	async writeSettings(e) {
		await h(e, JSON.stringify(Hs.parse(this.workspace.settings), null, 2), "utf8");
	}
	async importSettings(e) {
		let t = JSON.parse(await l(e, "utf8"));
		return this.workspace.settings = Hs.parse(t), this.workspace.applications.forEach((e) => this.syncEvents(e)), await this.persist(), this.getWorkspace();
	}
	getTemplateIds() {
		return new Set(yc.map((e) => e.id));
	}
}, yu = async (e, t, n) => {
	try {
		let n = await T.load(t);
		(await e.copyPages(n, n.getPageIndices())).forEach((t) => e.addPage(t));
	} catch (e) {
		let t = e instanceof Error ? e.message : "Unbekannter Fehler";
		throw Error(`PDF „${n}“ konnte nicht verarbeitet werden: ${t}`);
	}
}, bu = async (e, t) => {
	let n = await T.create();
	await yu(n, e, "Bewerbungsunterlagen");
	for (let e of t) await yu(n, e.bytes, e.fileName);
	return n.save();
}, xu = class extends Error {
	code;
	constructor(e, t) {
		super(e), this.code = t, this.name = "TemplateError";
	}
}, Su = (e) => {
	if (e instanceof xu) return e;
	let t = typeof e == "object" && e && "code" in e ? String(e.code) : "";
	return [
		"EBUSY",
		"EPERM",
		"EACCES"
	].includes(t) ? new xu("Die Datei wird von einem anderen Programm verwendet.", "LOCKED") : [
		"ENOENT",
		"ENODATA",
		"EIO"
	].includes(t) ? new xu("Die Vorlage ist derzeit nicht lokal verfügbar. Die Datei wird möglicherweise noch von OneDrive synchronisiert.", "NOT_LOCAL") : new xu("Die Vorlage konnte nicht gelesen werden.", "CORRUPT");
}, Cu = (e) => e.replaceAll("Ä", "Ae").replaceAll("Ö", "Oe").replaceAll("Ü", "Ue").replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue").replaceAll("ß", "ss").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/\s+/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Vorlage", wu = (e = /* @__PURE__ */ new Date()) => {
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
}, Tu = async (t, n, r) => {
	let a = Cu(n), o = e.join(t, `${a}${r}`);
	try {
		await i(o);
	} catch {
		return o;
	}
	for (let n = 2; n < 1e4; n += 1) {
		let o = e.join(t, `${a}_Kopie_${n}${r}`);
		try {
			await i(o);
		} catch {
			return o;
		}
	}
	return e.join(t, `${a}_${wu()}${r}`);
}, Eu = /* @__PURE__ */ N(((e) => {
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
})), Du = /* @__PURE__ */ N(((e) => {
	var t = Eu();
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
})), Ou = /* @__PURE__ */ N(((e) => {
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
	var h = a("[", r(m), r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), g = a(m, h, "*"), _ = a(h, "+"), v = o(a("&", g, ";"), "|", o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)), y = a("%", g, ";"), b = o(a("\"", o(/[^%&"]/, "|", y, "|", v), "*", "\""), "|", a("'", o(/[^%&']/, "|", y, "|", v), "*", "'")), x = o("\"", o(/[^<&"]/, "|", v), "*", "\"", "|", "'", o(/[^<&']/, "|", v), "*", "'"), S = a(i(m, ":"), i(h, ":"), "*"), C = a(S, o(":", S), "?"), w = a("^", C, "$"), T = a("(", C, ")"), E = o(/"[^"]*"|'[^']*'/), D = a(/^<\?/, "(", g, ")", o(f, "(", c, "*?)"), "?", /\?>/), O = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, k = o("\"", O, "*\"", "|", "'", i(O, "'"), "*'"), A = "<!--", j = "-->", ee = a(A, o(i(c, "-"), "|", a("-", i(c, "-"))), "*", j), M = "#PCDATA", te = o("EMPTY", "|", "ANY", "|", o(a(/\(/, p, M, o(p, /\|/, p, C), "*", p, /\)\*/), "|", a(/\(/, p, M, p, /\)/)), "|", a(/\([^>]+\)/, /[?*+]?/)), N = a("<!ELEMENT", f, o(C, "|", y), f, o(te, "|", y), p, ">"), ne = a("<!ATTLIST", f, g, o(f, g, f, o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", o(a("NOTATION", f, /\(/, p, g, o(p, /\|/, p, g), "*", p, /\)/), "|", a(/\(/, p, _, o(p, /\|/, p, _), "*", p, /\)/))), f, o(/#REQUIRED|#IMPLIED/, "|", o(o("#FIXED", f), "?", x))), "*", p, ">"), P = "about:legacy-compat", F = o("\"" + P + "\"", "|", "'" + P + "'"), I = "SYSTEM", L = "PUBLIC", R = o(o(I, f, E), "|", o(L, f, k, f, E)), z = a("^", o(o(I, f, "(?<SystemLiteralOnly>", E, ")"), "|", o(L, f, "(?<PubidLiteral>", k, ")", f, "(?<SystemLiteral>", E, ")"))), B = a("^", k, "$"), re = a("^", E, "$"), ie = o(b, "|", o(R, o(f, "NDATA", f, g), "?")), ae = "<!ENTITY", oe = o(a(ae, f, g, f, ie, p, ">"), "|", a(ae, f, "%", f, g, f, o(b, "|", R), p, ">")), se = a("<!NOTATION", f, g, f, o(R, "|", a(L, f, k)), p, ">"), V = a(p, "=", p), ce = /1[.]\d+/, H = a(f, "version", V, o("'", ce, "'", "|", "\"", ce, "\"")), U = /[A-Za-z][-A-Za-z0-9._]*/, le = a(/^<\?xml/, H, o(f, "encoding", V, o("\"", U, "\"", "|", "'", U, "'")), "?", o(f, "standalone", V, o("'", o("yes", "|", "no"), "'", "|", "\"", o("yes", "|", "no"), "\"")), "?", p, /\?>/), ue = "<!DOCTYPE", de = "<![CDATA[", fe = "]]>", pe = a(/<!\[CDATA\[/, a(c, "*?", /\]\]>/));
	e.chars = r, e.chars_without = i, e.detectUnicodeSupport = t, e.reg = a, e.regg = o, e.ABOUT_LEGACY_COMPAT = P, e.ABOUT_LEGACY_COMPAT_SystemLiteral = F, e.AttlistDecl = ne, e.CDATA_START = de, e.CDATA_END = fe, e.CDSect = pe, e.Char = c, e.Comment = ee, e.COMMENT_START = A, e.COMMENT_END = j, e.DOCTYPE_DECL_START = ue, e.elementdecl = N, e.EntityDecl = oe, e.EntityValue = b, e.ExternalID = R, e.ExternalID_match = z, e.Name = g, e.NotationDecl = se, e.Reference = v, e.PEReference = y, e.PI = D, e.PUBLIC = L, e.PubidLiteral = k, e.PubidLiteral_match = B, e.QName = C, e.QName_exact = w, e.QName_group = T, e.S = f, e.SChar_s = d, e.S_OPT = p, e.SYSTEM = I, e.SystemLiteral = E, e.SystemLiteral_match = re, e.InvalidChar = l, e.UNICODE_REPLACEMENT_CHARACTER = s, e.UNICODE_SUPPORT = n, e.XMLDecl = le;
})), ku = /* @__PURE__ */ N(((e) => {
	var t = Eu(), n = t.find, r = t.hasDefaultHTMLNamespace, i = t.hasOwn, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.isHTMLVoidElement, c = t.MIME_TYPE, l = t.NAMESPACE, u = Symbol(), d = Du(), f = d.DOMException, p = d.DOMExceptionName, m = Ou();
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
	var T = {}, E = T.ELEMENT_NODE = 1, D = T.ATTRIBUTE_NODE = 2, O = T.TEXT_NODE = 3, k = T.CDATA_SECTION_NODE = 4, A = T.ENTITY_REFERENCE_NODE = 5, j = T.ENTITY_NODE = 6, ee = T.PROCESSING_INSTRUCTION_NODE = 7, M = T.COMMENT_NODE = 8, te = T.DOCUMENT_NODE = 9, N = T.DOCUMENT_TYPE_NODE = 10, ne = T.DOCUMENT_FRAGMENT_NODE = 11, P = T.NOTATION_NODE = 12, F = t.freeze({
		DOCUMENT_POSITION_DISCONNECTED: 1,
		DOCUMENT_POSITION_PRECEDING: 2,
		DOCUMENT_POSITION_FOLLOWING: 4,
		DOCUMENT_POSITION_CONTAINS: 8,
		DOCUMENT_POSITION_CONTAINED_BY: 16,
		DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
	});
	function I(e, t) {
		if (t.length < e.length) return I(t, e);
		var n = null;
		for (var r in e) {
			if (e[r] !== t[r]) return n;
			n = e[r];
		}
		return n;
	}
	function L(e) {
		return e.guid ||= Math.random(), e.guid;
	}
	function R() {}
	R.prototype = {
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
			}, n = [], r = 0; r < this.length; r++) ze(this[r], n, null, t);
			return n.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	}, R.prototype[Symbol.iterator] = function() {
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
	function z(e, t) {
		this._node = e, this._refresh = t, B(this);
	}
	function B(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (He(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) i(e, r) && delete e[r];
			C(n, e), e._inc = t;
		}
	}
	z.prototype.item = function(e) {
		return B(this), this[e] || null;
	}, w(z, R);
	function re() {}
	function ie(e, t) {
		for (var n = 0; n < e.length;) {
			if (e[n] === t) return n;
			n++;
		}
	}
	function ae(e, t, n, r) {
		if (r ? t[ie(t, r)] = n : (t[t.length] = n, t.length++), e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && de(i, e, r), ue(i, e, n));
		}
	}
	function oe(e, t, n) {
		var r = ie(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r <= i;) t[r] = t[++r];
			if (t.length = i, e) {
				var a = e.ownerDocument;
				a && de(a, e, n), n.ownerElement = null;
			}
		}
	}
	re.prototype = {
		length: 0,
		item: R.prototype.item,
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
			return n === e ? e : (ae(this._ownerElement, this, e, n), n);
		},
		setNamedItemNS: function(e) {
			return this.setNamedItem(e);
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			if (!t) throw new f(f.NOT_FOUND_ERR, e);
			return oe(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			if (!n) throw new f(f.NOT_FOUND_ERR, e ? e + " : " + t : t);
			return oe(this._ownerElement, this, n), n;
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
	}, re.prototype[Symbol.iterator] = function() {
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
	function se() {}
	se.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = c.XML_APPLICATION;
			e === l.HTML ? r = c.XML_XHTML_APPLICATION : e === l.SVG && (r = c.XML_SVG_IMAGE);
			var i = new le(u, { contentType: r });
			if (i.implementation = this, i.childNodes = new R(), i.doctype = n || null, n && i.appendChild(n), t) {
				var a = i.createElementNS(e, t);
				i.appendChild(a);
			}
			return i;
		},
		createDocumentType: function(e, t, n, r) {
			x(e);
			var i = new Ae(u);
			return i.name = e, i.nodeName = e, i.publicId = t || "", i.systemId = n || "", i.internalSubset = r || "", i.childNodes = new R(), i;
		},
		createHTMLDocument: function(e) {
			var t = new le(u, { contentType: c.HTML });
			if (t.implementation = this, t.childNodes = new R(), e !== !1) {
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
	function V(e) {
		h(e);
	}
	V.prototype = {
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
			return Ce(this, e, t);
		},
		replaceChild: function(e, t) {
			Ce(this, e, t, Se), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return pe(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return Ve(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			U(this, null, { enter: function(e) {
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
			if (t instanceof Te && (r = t, t = r.ownerElement), n instanceof Te && (i = n, n = i.ownerElement, r && t && n === t)) for (var a = 0, o; o = n.attributes[a]; a++) {
				if (o === r) return F.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + F.DOCUMENT_POSITION_PRECEDING;
				if (o === i) return F.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + F.DOCUMENT_POSITION_FOLLOWING;
			}
			if (!t || !n || n.ownerDocument !== t.ownerDocument) return F.DOCUMENT_POSITION_DISCONNECTED + F.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (L(n.ownerDocument) > L(t.ownerDocument) ? F.DOCUMENT_POSITION_FOLLOWING : F.DOCUMENT_POSITION_PRECEDING);
			if (i && t === n) return F.DOCUMENT_POSITION_CONTAINS + F.DOCUMENT_POSITION_PRECEDING;
			if (r && t === n) return F.DOCUMENT_POSITION_CONTAINED_BY + F.DOCUMENT_POSITION_FOLLOWING;
			for (var s = [], c = t.parentNode; c;) {
				if (!i && c === n) return F.DOCUMENT_POSITION_CONTAINED_BY + F.DOCUMENT_POSITION_FOLLOWING;
				s.push(c), c = c.parentNode;
			}
			s.reverse();
			for (var l = [], u = n.parentNode; u;) {
				if (!r && u === t) return F.DOCUMENT_POSITION_CONTAINS + F.DOCUMENT_POSITION_PRECEDING;
				l.push(u), u = u.parentNode;
			}
			l.reverse();
			var d = I(s, l);
			for (var f in d.childNodes) {
				var p = d.childNodes[f];
				if (p === n) return F.DOCUMENT_POSITION_FOLLOWING;
				if (p === t) return F.DOCUMENT_POSITION_PRECEDING;
				if (l.indexOf(p) >= 0) return F.DOCUMENT_POSITION_FOLLOWING;
				if (s.indexOf(p) >= 0) return F.DOCUMENT_POSITION_PRECEDING;
			}
			return 0;
		}
	};
	function ce(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	C(T, V), C(T, V.prototype), C(F, V), C(F, V.prototype);
	function H(e, t) {
		U(e, null, { enter: function(e) {
			return !t(e) || U.STOP;
		} });
	}
	function U(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: U.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === U.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === U.STOP) return U.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: U.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: U.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	U.STOP = Symbol("walkDOM.STOP"), U.ENTER = 0, U.EXIT = 1;
	function le(e, t) {
		h(e);
		var n = t || {};
		this.ownerDocument = this, this.contentType = n.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
	}
	function ue(e, t, n) {
		e && e._inc++, n.namespaceURI === l.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function de(e, t, n, r) {
		e && e._inc++, n.namespaceURI === l.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function fe(e, t, n) {
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
	function pe(e, t) {
		if (e !== t.parentNode) throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, fe(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
	}
	function me(e) {
		return e && (e.nodeType === V.DOCUMENT_NODE || e.nodeType === V.DOCUMENT_FRAGMENT_NODE || e.nodeType === V.ELEMENT_NODE);
	}
	function he(e) {
		return e && (e.nodeType === V.CDATA_SECTION_NODE || e.nodeType === V.COMMENT_NODE || e.nodeType === V.DOCUMENT_FRAGMENT_NODE || e.nodeType === V.DOCUMENT_TYPE_NODE || e.nodeType === V.ELEMENT_NODE || e.nodeType === V.PROCESSING_INSTRUCTION_NODE || e.nodeType === V.TEXT_NODE);
	}
	function ge(e) {
		return e && e.nodeType === V.DOCUMENT_TYPE_NODE;
	}
	function _e(e) {
		return e && e.nodeType === V.ELEMENT_NODE;
	}
	function ve(e) {
		return e && e.nodeType === V.TEXT_NODE;
	}
	function ye(e, t) {
		var r = e.childNodes || [];
		if (n(r, _e) || ge(t)) return !1;
		var i = n(r, ge);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function W(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return _e(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, ge);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function be(e, t, n) {
		if (!me(e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new f(f.NOT_FOUND_ERR, "child not in parent");
		if (!he(t) || ge(t) && e.nodeType !== V.DOCUMENT_NODE) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function xe(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === V.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(_e);
			if (o.length > 1 || n(a, ve)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !ye(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (_e(t) && !ye(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (ge(t)) {
			if (n(i, ge)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, _e);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			if (!r && s) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
		}
	}
	function Se(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === V.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(_e);
			if (o.length > 1 || n(a, ve)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !W(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (_e(t) && !W(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (ge(t)) {
			function e(e) {
				return ge(e) && e !== r;
			}
			if (n(i, e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, _e);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
		}
	}
	function Ce(e, t, n, r) {
		be(e, t, n), e.nodeType === V.DOCUMENT_NODE && (r || xe)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === ne) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do
			a.parentNode = e;
		while (a !== o && (a = a.nextSibling));
		return fe(e.ownerDocument || e, e, t), t.nodeType == ne && (t.firstChild = t.lastChild = null), t;
	}
	le.prototype = {
		implementation: null,
		nodeName: "#document",
		nodeType: te,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType === ne) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return Ce(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === E && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			var t = pe(this, e);
			return t === this.documentElement && (this.documentElement = null), t;
		},
		replaceChild: function(e, t) {
			Ce(this, e, t, Se), e.ownerDocument = this, t && this.removeChild(t), _e(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return Be(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return H(this.documentElement, function(n) {
				if (n.nodeType == E && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		createElement: function(e) {
			var t = new we(u);
			t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = l.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new R();
			var n = t.attributes = new re();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new Ne(u);
			return e.ownerDocument = this, e.childNodes = new R(), e;
		},
		createTextNode: function(e) {
			var t = new De(u);
			return t.ownerDocument = this, t.childNodes = new R(), t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new Oe(u);
			return t.ownerDocument = this, t.childNodes = new R(), t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new f(f.INVALID_CHARACTER_ERR, "data contains \"]]>\"");
			var t = new ke(u);
			return t.ownerDocument = this, t.childNodes = new R(), t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new Pe(u);
			return n.ownerDocument = this, n.childNodes = new R(), n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in name \"" + e + "\"");
			return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
		},
		_createAttribute: function(e) {
			var t = new Te(u);
			return t.ownerDocument = this, t.childNodes = new R(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			if (!m.Name.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "not a valid xml name \"" + e + "\"");
			if (this.type === "html") throw new f("document is an html document", p.NotSupportedError);
			var t = new Me(u);
			return t.ownerDocument = this, t.childNodes = new R(), t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = S(e, t), r = new we(u), i = r.attributes = new re();
			return r.childNodes = new R(), r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], i._ownerElement = r, r;
		},
		createAttributeNS: function(e, t) {
			var n = S(e, t), r = new Te(u);
			return r.ownerDocument = this, r.childNodes = new R(), r.nodeName = t, r.name = t, r.specified = !0, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], r;
		}
	}, w(le, V);
	function we(e) {
		h(e), this._nsMap = Object.create(null);
	}
	we.prototype = {
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
			return new z(this, function(n) {
				var r = [];
				return t.length > 0 && H(n, function(i) {
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
			var t = (this.nodeType === te ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
			return new z(this, function(r) {
				var i = [];
				return H(r, function(a) {
					a === r || a.nodeType !== E || (e === "*" || a.getQualifiedName() === (t && a.namespaceURI === l.HTML ? n : e)) && i.push(a);
				}), i;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new z(this, function(n) {
				var r = [];
				return H(n, function(i) {
					i !== n && i.nodeType === E && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
				}), r;
			});
		}
	}, le.prototype.getElementsByClassName = we.prototype.getElementsByClassName, le.prototype.getElementsByTagName = we.prototype.getElementsByTagName, le.prototype.getElementsByTagNameNS = we.prototype.getElementsByTagNameNS, w(we, V);
	function Te(e) {
		h(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
	}
	Te.prototype.nodeType = D, w(Te, V);
	function Ee(e) {
		h(e);
	}
	Ee.prototype = {
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
	}, w(Ee, V);
	function De(e) {
		h(e);
	}
	De.prototype = {
		nodeName: "#text",
		nodeType: O,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, w(De, Ee);
	function Oe(e) {
		h(e);
	}
	Oe.prototype = {
		nodeName: "#comment",
		nodeType: M
	}, w(Oe, Ee);
	function ke(e) {
		h(e);
	}
	ke.prototype = {
		nodeName: "#cdata-section",
		nodeType: k
	}, w(ke, De);
	function Ae(e) {
		h(e);
	}
	Ae.prototype.nodeType = N, w(Ae, V);
	function G(e) {
		h(e);
	}
	G.prototype.nodeType = P, w(G, V);
	function je(e) {
		h(e);
	}
	je.prototype.nodeType = j, w(je, V);
	function Me(e) {
		h(e);
	}
	Me.prototype.nodeType = A, w(Me, V);
	function Ne(e) {
		h(e);
	}
	Ne.prototype.nodeName = "#document-fragment", Ne.prototype.nodeType = ne, w(Ne, V);
	function Pe(e) {
		h(e);
	}
	Pe.prototype.nodeType = ee, w(Pe, Ee);
	function Fe() {}
	Fe.prototype.serializeToString = function(e, t) {
		return Ie.call(e, t);
	}, V.prototype.toString = Ie;
	function Ie(e) {
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
		}, n = [], r = this.nodeType === te && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
		if (a && i == null) {
			var i = r.lookupPrefix(a);
			if (i == null) var o = [{
				namespace: a,
				prefix: null
			}];
		}
		return ze(this, n, o, t), n.join("");
	}
	function Le(e, t, n) {
		var r = e.prefix || "", i = e.namespaceURI;
		if (!i || r === "xml" && i === l.XML || i === l.XMLNS) return !1;
		for (var a = n.length; a--;) {
			var o = n[a];
			if (o.prefix === r) return o.namespace !== i;
		}
		return !0;
	}
	function Re(e, t, n) {
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, ce), "\"");
	}
	function ze(e, t, n, r) {
		n ||= [];
		var i = r.nodeFilter, a = r.requireWellFormed, c = r.splitCDATASections, u = (e.nodeType === te ? e : e.ownerDocument).type === "html";
		U(e, { ns: n }, {
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
							if (Le(T, u, C)) {
								var j = T.prefix || "", P = T.namespaceURI;
								Re(t, j ? "xmlns:" + j : "xmlns", P), C.push({
									prefix: j,
									namespace: P
								});
							}
							var F = i ? i(T) : T;
							F && (typeof F == "string" ? t.push(F) : Re(t, F.name, F.value));
						}
						if (_ === v && Le(e, u, C)) {
							var I = e.prefix || "", P = e.namespaceURI;
							Re(t, I ? "xmlns:" + I : "xmlns", P), C.push({
								prefix: I,
								namespace: P
							});
						}
						var L = !e.firstChild;
						if (L && (u || e.namespaceURI === l.HTML) && (L = s(_)), L) return t.push("/>"), null;
						if (t.push(">"), u && o(_)) {
							for (var R = e.firstChild; R;) R.data ? t.push(R.data) : ze(R, t, C.slice(), r), R = R.nextSibling;
							return t.push("</", v, ">"), null;
						}
						return {
							ns: C,
							tag: v
						};
					case te:
					case ne:
						if (a && e.nodeType === te && e.documentElement == null) throw new f("The Document has no documentElement", p.InvalidStateError);
						return { ns: d };
					case D: return Re(t, e.name, e.value), null;
					case O:
						if (a && m.InvalidChar.test(e.data)) throw new f("The Text node data contains characters outside the XML Char production", p.InvalidStateError);
						return t.push(e.data.replace(/[<&>]/g, ce)), null;
					case k:
						if (a && e.data.indexOf("]]>") !== -1) throw new f("The CDATASection data contains \"]]>\"", p.InvalidStateError);
						return c ? t.push(m.CDATA_START, e.data.replace(/]]>/g, "]]]]><![CDATA[>"), m.CDATA_END) : t.push(m.CDATA_START, e.data, m.CDATA_END), null;
					case M:
						if (a) {
							if (m.InvalidChar.test(e.data)) throw new f("The comment node data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("--") !== -1 || e.data[e.data.length - 1] === "-") throw new f("The comment node data contains \"--\" or ends with \"-\"", p.InvalidStateError);
						}
						return t.push(m.COMMENT_START, e.data, m.COMMENT_END), null;
					case N:
						var z = e.publicId, B = e.systemId;
						if (a) {
							if (z && !m.PubidLiteral_match.test(z)) throw new f("DocumentType publicId is not a valid PubidLiteral", p.InvalidStateError);
							if (B && B !== "." && !m.SystemLiteral_match.test(B)) throw new f("DocumentType systemId is not a valid SystemLiteral", p.InvalidStateError);
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new f("DocumentType internalSubset contains \"]>\"", p.InvalidStateError);
						}
						return t.push(m.DOCTYPE_DECL_START, " ", e.name), z ? (t.push(" ", m.PUBLIC, " ", z), B && B !== "." && t.push(" ", B)) : B && B !== "." && t.push(" ", m.SYSTEM, " ", B), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">"), null;
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
	function Be(e, t, n) {
		var r;
		return U(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === D || n ? a : null;
		} }), r;
	}
	function Ve(e, t, n) {
		var r;
		return U(t, null, { enter: function(t, a) {
			var o = new t.constructor(u);
			for (var s in t) if (i(t, s)) {
				var c = t[s];
				typeof c != "object" && c != o[s] && (o[s] = c);
			}
			t.childNodes && (o.childNodes = new R()), o.ownerDocument = e;
			var l = n;
			switch (o.nodeType) {
				case E:
					var d = t.attributes, f = o.attributes = new re(), p = d.length;
					f._ownerElement = o;
					for (var m = 0; m < p; m++) o.setAttributeNode(Ve(e, d.item(m), !0));
					break;
				case D: l = !0;
			}
			return a === null ? r = o : a.appendChild(o), l ? o : null;
		} }), r;
	}
	function He(e, t, n) {
		e[t] = n;
	}
	function Ue(e) {
		for (var t = [], n = e.firstChild; n;) n.nodeType === E && t.push(n), n = n.nextSibling;
		return t;
	}
	try {
		Object.defineProperty && (Object.defineProperty(z.prototype, "length", { get: function() {
			return B(this), this.$$length;
		} }), Object.defineProperty(V.prototype, "textContent", {
			get: function() {
				if (this.nodeType === E || this.nodeType === ne) {
					var e = [];
					return U(this, null, { enter: function(t) {
						if (t.nodeType === E || t.nodeType === ne) return !0;
						if (t.nodeType === ee || t.nodeType === M) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case E:
					case ne:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), Object.defineProperty(we.prototype, "children", { get: function() {
			return new z(this, Ue);
		} }), Object.defineProperty(le.prototype, "children", { get: function() {
			return new z(this, Ue);
		} }), Object.defineProperty(Ne.prototype, "children", { get: function() {
			return new z(this, Ue);
		} }), He = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e._updateLiveList = B, e.Attr = Te, e.CDATASection = ke, e.CharacterData = Ee, e.Comment = Oe, e.Document = le, e.DocumentFragment = Ne, e.DocumentType = Ae, e.DOMImplementation = se, e.Element = we, e.Entity = je, e.EntityReference = Me, e.LiveNodeList = z, e.NamedNodeMap = re, e.Node = V, e.NodeList = R, e.Notation = G, e.Text = De, e.ProcessingInstruction = Pe, e.walkDOM = U, e.XMLSerializer = Fe;
})), Au = /* @__PURE__ */ N(((e) => {
	var t = Eu().freeze;
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
})), ju = /* @__PURE__ */ N(((e) => {
	var t = Eu(), n = Ou(), r = Du(), i = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.hasOwn, c = t.NAMESPACE, l = r.ParseError, u = r.DOMException, d = 0, f = 1, p = 2, m = 3, h = 4, g = 5, _ = 6, v = 7;
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
					var te = e.substring(D, O);
					!d && E.length === 0 && (te = te.replace(new RegExp(n.S_OPT.source, "g"), ""), te && c.error("Unexpected content outside root element: '" + te + "'")), m(O);
				}
				switch (e.charAt(O + 1)) {
					case "/":
						var N = e.indexOf(">", O + 2), ne = e.substring(O + 2, N > 0 ? N : void 0);
						if (!ne) return c.fatalError("end tag name missing");
						var P = N > 0 && n.reg("^", n.QName_group, n.S_OPT, "$").exec(ne);
						if (!P) return c.fatalError("end tag name contains invalid characters: \"" + ne + "\"");
						if (!o.currentElement && !o.doc.documentElement) return;
						var F = E[E.length - 1] || o.currentElement.tagName || o.doc.documentElement.tagName || "";
						if (F !== P[1]) {
							var I = P[1].toLowerCase();
							if (!d || F.toLowerCase() !== I) return c.fatalError("Opening and ending tag mismatch: \"" + F + "\" != \"" + ne + "\"");
						}
						var L = x.pop();
						E.pop();
						var R = L.localNSMap;
						if (o.endElement(L.uri, L.localName, F), R) for (var z in R) s(R, z) && o.endPrefixMapping(z);
						N++;
						break;
					case "?":
						v && y(O), N = A(e, O, o, c);
						break;
					case "!":
						v && y(O), N = k(e, O, o, c, d);
						break;
					default:
						v && y(O);
						var B = new j(), re = x[x.length - 1].currentNSMap, N = C(e, O, B, re, p, c, d), ie = B.length;
						if (B.closed || (d && t.isHTMLVoidElement(B.tagName) ? B.closed = !0 : E.push(B.tagName)), v && ie) {
							for (var ae = S(v, {}), oe = 0; oe < ie; oe++) {
								var se = B[oe];
								y(se.offset), se.locator = S(v, {});
							}
							o.locator = ae, w(B, o, re) && x.push(B), o.locator = v;
						} else w(B, o, re) && x.push(B);
						d && !B.closed ? N = T(e, N, B.tagName, p, o) : N++;
				}
			} catch (e) {
				if (e instanceof l) throw e;
				if (e instanceof u) throw new l(e.name + ": " + e.message, o.locator, e);
				c.error("element parse error: " + e), N = -1;
			}
			N > D ? D = N : m(Math.max(O, D) + 1);
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
})), Mu = /* @__PURE__ */ N(((e) => {
	var t = Eu(), n = ku(), r = Du(), i = Au(), a = ju(), o = n.DOMImplementation, s = t.hasDefaultHTMLNamespace, c = t.isHTMLMimeType, l = t.isValidMimeType, u = t.MIME_TYPE, d = t.NAMESPACE, f = r.ParseError, p = a.XMLReader;
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
})), Nu = /* @__PURE__ */ N(((e) => {
	var t = Eu();
	e.assign = t.assign, e.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, e.isHTMLMimeType = t.isHTMLMimeType, e.isValidMimeType = t.isValidMimeType, e.MIME_TYPE = t.MIME_TYPE, e.NAMESPACE = t.NAMESPACE;
	var n = Du();
	e.DOMException = n.DOMException, e.DOMExceptionName = n.DOMExceptionName, e.ExceptionCode = n.ExceptionCode, e.ParseError = n.ParseError;
	var r = ku();
	e.Attr = r.Attr, e.CDATASection = r.CDATASection, e.CharacterData = r.CharacterData, e.Comment = r.Comment, e.Document = r.Document, e.DocumentFragment = r.DocumentFragment, e.DocumentType = r.DocumentType, e.DOMImplementation = r.DOMImplementation, e.Element = r.Element, e.Entity = r.Entity, e.EntityReference = r.EntityReference, e.LiveNodeList = r.LiveNodeList, e.NamedNodeMap = r.NamedNodeMap, e.Node = r.Node, e.NodeList = r.NodeList, e.Notation = r.Notation, e.ProcessingInstruction = r.ProcessingInstruction, e.Text = r.Text, e.XMLSerializer = r.XMLSerializer;
	var i = Mu();
	e.DOMParser = i.DOMParser, e.normalizeLineEndings = i.normalizeLineEndings, e.onErrorStopParsing = i.onErrorStopParsing, e.onWarningStopParsing = i.onWarningStopParsing;
})), Pu = /* @__PURE__ */ N(((e, t) => {
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
})), Fu = /* @__PURE__ */ N(((e, t) => {
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
	var c = Pu(), l = c.last, u = c.first;
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
	function te(e) {
		var t = e.tags, n = new f("Closing tag does not match opening tag");
		return n.properties = {
			id: "closing_tag_does_not_match_opening_tag",
			explanation: `The tag "${t[0].value}" is closed by the tag "${t[1].value}"`,
			openingtag: u(t).value,
			offset: [u(t).offset, l(t).offset],
			closingtag: l(t).value
		}, u(t).square && (n.properties.square = [u(t).square, l(t).square]), n;
	}
	function N(e) {
		var t = e.tag, n = e.offset, r = new f(`The position of the loop tags "${t}" would produce invalid XML`);
		return r.properties = {
			xtag: t,
			id: "loop_position_invalid",
			explanation: `The tags "${t}" are misplaced in the document, for example one of them is in a table and the other one outside the table`,
			offset: n
		}, r;
	}
	function ne(e) {
		var t = e.tag, n = e.rootError, r = e.offset, i = new m("Scope parser compilation failed");
		return i.properties = {
			id: "scopeparser_compilation_failed",
			offset: r,
			xtag: t,
			explanation: `The scope parser for the tag "${t}" failed to compile`,
			rootError: n
		}, i;
	}
	function P(e) {
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
	function F(e, t) {
		var n = `Unimplemented tag type "${e.type}"`;
		e.module && (n += ` "${e.module}"`);
		var r = new f(n);
		throw r.properties = {
			part: e,
			index: t,
			id: "unimplemented_tag_type"
		}, r;
	}
	function I() {
		var e = new h("Malformed xml");
		throw e.properties = {
			explanation: "The template contains malformed xml",
			id: "malformed_xml"
		}, e;
	}
	function L() {
		var e = new h("You must run `.compile()` before running `.resolveData()`");
		throw e.properties = {
			id: "resolve_before_compile",
			explanation: "You must run `.compile()` before running `.resolveData()`"
		}, e;
	}
	function R() {
		var e = new h("You should not call .render on a document that had compilation errors");
		throw e.properties = {
			id: "render_on_invalid_template",
			explanation: "You should not call .render on a document that had compilation errors"
		}, e;
	}
	function z() {
		var e = new h("You should not call .render twice on the same Docxtemplater instance");
		throw e.properties = {
			id: "render_twice",
			explanation: "You should not call .render twice on the same Docxtemplater instance"
		}, e;
	}
	function B(e, t) {
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
		getClosingTagNotMatchOpeningTag: te,
		getLoopPositionProducesInvalidXMLError: N,
		getScopeCompilationError: ne,
		getScopeParserExecutionError: P,
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
		throwMalformedXml: I,
		throwMultiError: b,
		throwExpandNotFound: A,
		throwRawTagShouldBeOnlyTextInParagraph: j,
		throwUnimplementedTagType: F,
		throwXmlTagNotFound: T,
		throwXmlInvalid: B,
		throwResolveBeforeCompile: L,
		throwRenderInvalidTemplate: R,
		throwRenderTwice: z
	};
})), Iu = /* @__PURE__ */ N(((e, t) => {
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
	var c = Nu(), l = c.DOMParser, u = c.XMLSerializer, d = Fu().throwXmlTagNotFound, f = Pu(), p = f.last, m = f.first, h = Object.prototype.hasOwnProperty, g = Function.prototype.bind, _ = Function.prototype.call, v = _.bind(_, g)(_, _, h);
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
	], te = M.map(function(e) {
		var t = n(e, 2), r = t[0], i = t[1];
		return {
			rstart: new RegExp(i, "g"),
			rend: new RegExp(r, "g"),
			start: i,
			end: r
		};
	});
	function N(e) {
		for (var t = te.length - 1; t >= 0; t--) {
			var n = te[t];
			e = e.replace(n.rstart, n.end);
		}
		return e;
	}
	function ne(e) {
		var t;
		e = (t = e) != null && t.toString ? e.toString() : "";
		for (var n, r = 0, i = te.length; r < i; r++) n = te[r], e = e.replace(n.rend, n.start);
		return e;
	}
	function P(e) {
		for (var t = [], n = 0; n < e.length; n++) for (var r = e[n], i = 0; i < r.length; i++) {
			var a = r[i];
			t.push(a);
		}
		return t;
	}
	function F(e, t) {
		if (!t) return e;
		for (var n = 0, r = t.length; n < r; n++) e.push(t[n]);
		return e;
	}
	var I = /* @__PURE__ */ RegExp("\xA0", "g");
	function L(e) {
		return e.replace(I, " ");
	}
	function R(e, t) {
		for (var n = [], r; (r = e.exec(t)) != null;) n.push({
			array: r,
			offset: r.index
		});
		return n;
	}
	function z(e, t) {
		return e === "</" + t + ">";
	}
	function B(e, t) {
		return e.indexOf("<" + t) === 0 && [
			">",
			" ",
			"/"
		].indexOf(e[t.length + 1]) !== -1;
	}
	function re(e, t, n) {
		var r = ie(e, t, n);
		if (r !== null) return r;
		d({
			position: "right",
			element: t,
			parsed: e,
			index: n
		});
	}
	function ie(e, t, n) {
		typeof t == "string" && (t = [t]);
		for (var r = 1, i = n, a = e.length; i < a; i++) for (var o = e[i], s = 0, c = t; s < c.length; s++) {
			var l = c[s];
			if (z(o.value, l) && r--, B(o.value, l) && r++, r === 0) return i;
		}
		return null;
	}
	function ae(e, t, n) {
		var r = oe(e, t, n);
		if (r !== null) return r;
		d({
			position: "left",
			element: t,
			parsed: e,
			index: n
		});
	}
	function oe(e, t, n) {
		typeof t == "string" && (t = [t]);
		for (var r = 1, i = n; i >= 0; i--) for (var a = e[i], o = 0, s = t; o < s.length; o++) {
			var c = s[o];
			if (B(a.value, c) && r--, z(a.value, c) && r++, r === 0) return i;
		}
		return null;
	}
	function se(e, t) {
		var n = t.type, r = t.tag, i = t.position;
		return n === "tag" && r === e && (i === "start" || i === "selfclosing");
	}
	function V(e, t) {
		var n = t.type, r = t.tag, i = t.position;
		return n === "tag" && r === e && i === "end";
	}
	function ce(e) {
		var t = e.type, n = e.tag, r = e.position;
		return [
			"w:p",
			"a:p",
			"text:p"
		].indexOf(n) !== -1 && t === "tag" && r === "start";
	}
	function H(e) {
		var t = e.type, n = e.tag, r = e.position;
		return [
			"w:p",
			"a:p",
			"text:p"
		].indexOf(n) !== -1 && t === "tag" && r === "end";
	}
	function U(e) {
		var t = e.type, n = e.tag, r = e.position;
		return ["w:br", "a:br"].indexOf(n) !== -1 && t === "tag" && (r === "start" || r === "selfclosing");
	}
	function le(e) {
		var t = e.type, n = e.position;
		return e.text && t === "tag" && n === "start";
	}
	function ue(e) {
		var t = e.type, n = e.position;
		return e.text && t === "tag" && n === "end";
	}
	function de(e) {
		var t = e.type, n = e.position;
		return t === "placeholder" || t === "content" && n === "insidetag";
	}
	function fe(e, t) {
		var n = e.module, r = e.type;
		return t instanceof Array || (t = [t]), r === "placeholder" && t.indexOf(n) !== -1;
	}
	var pe = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
	function me(e) {
		return pe.lastIndex = 0, pe.test(e);
	}
	function he(e) {
		return typeof e != "string" && (e = String(e)), e.replace(pe, "");
	}
	function ge(e) {
		var t = {};
		for (var n in e) {
			var r = e[n];
			t[r] || (t[r] = []), t[r].push(n);
		}
		return t;
	}
	function _e(e, t) {
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
	function ve(e, t) {
		return t.delimiters.start + e.raw + t.delimiters.end;
	}
	t.exports = {
		getPartWithDelimiters: ve,
		endsWith: T,
		startsWith: E,
		isContent: de,
		isParagraphStart: ce,
		isParagraphEnd: H,
		isBreakTag: U,
		isTagStart: se,
		isTagEnd: V,
		isTextStart: le,
		isTextEnd: ue,
		isStarting: B,
		isEnding: z,
		isModule: fe,
		uniq: O,
		getDuplicates: D,
		chunkBy: k,
		last: p,
		first: m,
		xml2str: j,
		str2xml: ee,
		getRightOrNull: ie,
		getRight: re,
		getLeftOrNull: oe,
		getLeft: ae,
		pregMatchAll: R,
		convertSpaces: L,
		charMapRegexes: te,
		hasCorruptCharacters: me,
		removeCorruptCharacters: he,
		getDefaults: A,
		wordToUtf8: N,
		utf8ToWord: ne,
		concatArrays: P,
		pushArray: F,
		invertMap: ge,
		charMap: M,
		getSingleAttribute: w,
		setSingleAttribute: C,
		isWhiteSpace: y,
		stableSort: _e
	};
})), Lu = /* @__PURE__ */ N(((e, t) => {
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
})), Ru = /* @__PURE__ */ N(((e, t) => {
	var n = Iu().str2xml, r = "_rels/.rels";
	function i(e) {
		for (var t = e.files[r], i = t ? n(t.asText()) : null, a = i ? i.getElementsByTagName("Relationship") : [], o = {}, s = 0; s < a.length; s++) {
			var c = a[s];
			o[c.getAttribute("Target")] = c.getAttribute("Type");
		}
		return o;
	}
	t.exports = { getRelsTypes: i };
})), zu = /* @__PURE__ */ N(((e, t) => {
	var n = Iu().str2xml, r = "[Content_Types].xml";
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
})), Bu = /* @__PURE__ */ N(((e, t) => {
	var n = Fu().XTInternalError;
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
})), Vu = /* @__PURE__ */ N(((e, t) => {
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
	var v = Iu(), y = v.getRightOrNull, b = v.getRight, x = v.getLeft, S = v.getLeftOrNull, C = v.chunkBy, w = v.isTagStart, T = v.isTagEnd, E = v.isContent, D = v.last, O = v.first, k = Fu(), A = k.XTTemplateError, j = k.throwExpandNotFound, ee = k.getLoopPositionProducesInvalidXMLError;
	function M(e, t) {
		return e.length !== 0 && D(e).substr(1).indexOf(t) === 0;
	}
	function te(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n], i = r.position, a = r.value, o = r.tag;
			o && (i === "end" ? M(t, o) ? t.pop() : t.push(a) : i === "start" && t.push(a));
		}
		return t;
	}
	function N(e, t) {
		for (var n = 0; n < t.length; n++) if (t[n].indexOf(`<${e}`) === 0) return !0;
		return !1;
	}
	function ne(e, t, n) {
		for (var r = te(e.slice(t[0].offset, t[1].offset)), i = function() {
			var i = n[o], a = i.contains, s = i.expand, c = i.onlyTextInTag;
			if (N(a, r)) {
				if (c) {
					var l = S(e, a, t[0].offset), u = y(e, a, t[1].offset);
					if (l === null || u === null) return 0;
					var d = C(e.slice(l, u), function(e) {
						return w(a, e) ? "start" : T(a, e) ? "end" : null;
					}), f = O(d), p = D(d), m = f.filter(E), h = p.filter(E);
					if (m.length !== 1 || h.length !== 1) return 0;
				}
				for (var g = P(r), _ = 0, v = 0; v < g.length; v++) {
					var b = g[v], x = b.tag, k = b.position;
					x === s && (k === "start" && _++, k === "end" && _--);
				}
				return _ === 0 ? { v: { value: s } } : { v: { error: ee({
					tag: O(t).part.value,
					offset: [O(t).part.offset, D(t).part.offset]
				}) } };
			}
		}, a, o = 0; o < n.length; o++) if (a = i(), a !== 0 && a) return a.v;
		return I(r) ? {} : { error: ee({
			tag: O(t).part.value,
			offset: [O(t).part.offset, D(t).part.offset]
		}) };
	}
	function P(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n], i = F(r), a = /^\s*<\//.test(r) ? "end" : "start";
			t.push({
				tag: i,
				position: a
			});
		}
		return t;
	}
	function F(e) {
		return e.replace(/^\s*<\/?([a-zA-Z:]+).*/, "$1");
	}
	function I(e) {
		if (e.length % 2 == 1) return !1;
		for (var t = 0, n = e.length / 2; t < n; t++) {
			var r = e[t], i = e[e.length - t - 1];
			if (F(r) !== F(i)) return !1;
		}
		return !0;
	}
	function L(e, t, n, r) {
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
	function R(e, t, n, r) {
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
	function z(e, t) {
		var n = [];
		e.errors && (n = e.errors, e = e.postparsed);
		for (var i = [], a = 0, o = e.length; a < o; a++) {
			var c = e[a];
			if (c.type === "placeholder" && c.module === t.moduleName && !c.subparsed && !c.expanded) try {
				var l = L(c, a, e, t);
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
					b = R([y.left + h, y.right + h], y.part, e, t);
				} catch (r) {
					if (t.onError && t.onError(m({
						part: y.part,
						rootError: r,
						postparsed: e,
						expandOne: R
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
		expandToOne: z,
		getExpandToDefault: ne
	};
})), Hu = /* @__PURE__ */ N(((e, t) => {
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
})), Uu = /* @__PURE__ */ N(((e, t) => {
	t.exports = {
		settingsContentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml",
		coreContentType: "application/vnd.openxmlformats-package.core-properties+xml",
		appContentType: "application/vnd.openxmlformats-officedocument.extended-properties+xml",
		customContentType: "application/vnd.openxmlformats-officedocument.custom-properties+xml",
		diagramDataContentType: "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml",
		diagramDrawingContentType: "application/vnd.ms-office.drawingml.diagramDrawing+xml"
	};
})), Wu = /* @__PURE__ */ N(((e, t) => {
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
	var c = Iu().pushArray, l = Bu(), u = Hu(), d = Uu(), f = [
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
})), Gu = /* @__PURE__ */ N(((e, t) => {
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
	var c = Fu().getScopeParserExecutionError, l = Pu().last, u = Iu().concatArrays;
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
})), Ku = /* @__PURE__ */ N(((e, t) => {
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
	var m = Fu(), h = m.getUnclosedTagException, g = m.getUnopenedTagException, _ = m.getDuplicateOpenTagException, v = m.getDuplicateCloseTagException, y = m.throwMalformedXml, b = m.throwXmlInvalid, x = m.XTTemplateError, S = Iu(), C = S.isTextStart, w = S.isTextEnd, T = S.wordToUtf8, E = S.pushArray, D = 0, O = 1, k = 2, A = 3;
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
	function te(e, t, n) {
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
	function N(e, t, n) {
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
	function ne(e, t) {
		return e === -1 && t === -1 ? D : e === t ? O : e === -1 || t === -1 ? t < e ? k : A : e < t ? k : A;
	}
	function P(e) {
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
	function F(e, t, n) {
		var i = [], a = t.start, o = t.end, s = -1, c = !1;
		if (a == null && o == null) return [];
		for (;;) {
			var l = e.indexOf(a, s + 1), u = e.indexOf(o, s + 1), d = null, f = void 0, p = ne(l, u);
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
				var g = r(P(e.substr(s + a.length + 1, m - s - a.length - 1)), 2);
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
	function I(e, t, n) {
		for (var r = "", i = 0; i < e.length; i++) {
			var a = e[i];
			r += a.value;
		}
		for (var o = F(r, t, n), s = 0, c = [], l = 0; l < e.length; l++) {
			var u = e[l];
			s += u.value.length, c.push({
				offset: s - u.value.length,
				lIndex: u.lIndex
			});
		}
		for (var d = N(o, r, n), f = d.delimiterWithErrors, p = d.errors, m = 0, h = 0, g = [], _ = 0; _ < c.length; _++) {
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
	function L(e) {
		return e.type === "content" && e.position === "insidetag";
	}
	function R(e) {
		return e.filter(L);
	}
	function z(e, t) {
		for (var n = !1, r = 0; r < e.length; r++) {
			var i = e[r];
			n = ee(i, n), i.type === "content" && (i.position = n ? "insidetag" : "outsidetag"), t !== "text" && L(i) && (i.value = i.value.replace(/>/g, "&gt;"));
		}
	}
	t.exports = {
		parseDelimiters: I,
		parse: function(e, t, n, r) {
			z(e, r);
			for (var i = I(R(e), t, n), a = i.parsed, o = i.errors, s = [], c = 0, l = 0, u = 0; u < e.length; u++) {
				var d = e[u];
				if (L(d)) {
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
			for (var n = te(e, t.text, t.other), r = 0, i = [], a = 0; a < n.length; a++) {
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
})), qu = /* @__PURE__ */ N(((e, t) => {
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
})), Ju = /* @__PURE__ */ N(((e, t) => {
	var n = Iu().pushArray;
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
})), Yu = /* @__PURE__ */ N(((e, t) => {
	var n = Iu().pregMatchAll;
	t.exports = function(e, t) {
		var r = { content: e }, i = t.join("|");
		return r.matches = n(RegExp(`(?:(<(?:${i})[^>]*>)([^<>]*)</(?:${i})>)|(<(?:${i})[^>]*/>)`, "g"), r.content), r;
	};
})), Xu = /* @__PURE__ */ N(((e, t) => {
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
})), Zu = /* @__PURE__ */ N(((e, t) => {
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
	var m = Iu(), h = m.wordToUtf8, g = m.pushArray, _ = m.isParagraphStart, v = m.isBreakTag, y = Xu(), b = y.match, x = y.getValue, S = y.getValues;
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
})), Qu = /* @__PURE__ */ N(((e, t) => {
	function n(e, t) {
		if (e.lIndex == null) return null;
		var n = t.scopeManager.scopePathItem;
		return e.parentPart && (n = n.slice(0, n.length - 1)), t.filePath + "@" + e.lIndex.toString() + "-" + n.join("-");
	}
	t.exports = n;
})), $u = /* @__PURE__ */ N(((e, t) => {
	var n = Fu(), r = n.throwUnimplementedTagType, i = n.XTScopeParserError, a = Iu().pushArray, o = Qu();
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
})), ed = /* @__PURE__ */ N(((e, t) => {
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
})), td = /* @__PURE__ */ N(((e, t) => {
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
	var c = Iu().pushArray, l = Qu();
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
})), nd = /* @__PURE__ */ N(((e, t) => {
	var n = Iu(), r = n.startsWith, i = n.endsWith, a = n.isStarting, o = n.isEnding, s = n.isWhiteSpace, c = Hu();
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
})), rd = /* @__PURE__ */ N(((e, t) => {
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
	var c = Iu(), l = c.pushArray, u = c.wordToUtf8, d = c.convertSpaces, f = Yu(), p = Ku(), m = Zu(), h = $u(), g = ed(), _ = td(), v = nd(), y = Function.prototype.bind, b = Function.prototype.call, x = b.bind(b, y);
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
})), id = /* @__PURE__ */ N(((e, t) => {
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
	var _ = Iu(), v = _.chunkBy, y = _.last, b = _.isParagraphStart, x = _.isModule, S = _.pushArray, C = _.isParagraphEnd, w = _.isContent, T = _.startsWith, E = _.isTagEnd, D = _.isTagStart, O = _.getSingleAttribute, k = _.setSingleAttribute, A = Hu(), j = Bu(), ee = Iu().isWhiteSpace, M = "loop";
	function te(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (w(n)) return !0;
		}
		return !1;
	}
	function N(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (n.type !== "content") return n;
		}
		return null;
	}
	function ne(e) {
		var t = N(e.subparsed);
		return t != null && t.tag !== "w:t";
	}
	function P(e) {
		return e.hasPageBreak && ne(e) ? "<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>" : "";
	}
	function F(e) {
		return e.length && b(e[0]) && C(y(e));
	}
	function I(e) {
		return te(e) ? 0 : e.length;
	}
	function L(e) {
		var t = e.parts.length - 1;
		e.parts[t] === "</w:p>" ? e.parts.splice(t, 0, "<w:r><w:br w:type=\"page\"/></w:r>") : e.parts.push("<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>");
	}
	function R(e) {
		e.parts.unshift("<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>");
	}
	function z(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (D("w:type", n) && n.value.indexOf("continuous") !== -1) return !0;
		}
		return !1;
	}
	function B(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (D("w:type", n) && n.value.indexOf("w:val=\"nextPage\"") !== -1) return !0;
		}
		return !1;
	}
	function re(e, t) {
		for (var n = "", r = 0; r < t.length; r++) {
			var i = t[r].value;
			n += i;
		}
		e.unshift(`<w:p><w:pPr>${n}</w:pPr></w:p>`);
	}
	function ie(e) {
		for (var t = !1, n = !1, r = 0; r < e.length; r++) {
			var i = e[r];
			!t && T(i, "<w:sectPr") && (n = !0), n && (T(i, "<w:type") && (t = !0), !t && T(i, "</w:sectPr") && (e.splice(r, 0, "<w:type w:val=\"continuous\"/>"), r++));
		}
		return e;
	}
	function ae(e) {
		for (var t = 0, n = 0; n < e.length; n++) !T(e[n], "<w:headerReference") && !T(e[n], "<w:footerReference") && (e[t] = e[n], t++);
		return e.length = t, e;
	}
	function oe(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (n.tag === "w:br" && n.value.indexOf("w:type=\"page\"") !== -1) return !0;
		}
		return !1;
	}
	function se(e) {
		for (var t = 0; t < e.length; t++) if (e[t].tag === "w:drawing") return !0;
		return !1;
	}
	function V(e) {
		for (var t = [], n = null, r = 0; r < e.length; r++) {
			var i = e[r];
			D("w:sectPr", i) && (n = [], t.push(n)), n !== null && n.push(i), E("w:sectPr", i) && (n = null);
		}
		return t;
	}
	function ce(e) {
		for (var t = !1, n = 0, r = 0; r < e.length; r++) {
			var i = e[r];
			D("w:sectPr", i) && (t = !0), t && (i.tag === "w:headerReference" || i.tag === "w:footerReference") && (n++, t = !1), E("w:sectPr", i) && (t = !1);
		}
		return n;
	}
	function H(e) {
		for (var t = [], n = !1, r = e.length - 1; r >= 0; r--) {
			var i = e[r];
			if (E("w:sectPr", i) && (n = !0), D("w:sectPr", i) && (t.unshift(i.value), n = !1), n && t.unshift(i.value), b(i)) {
				if (t.length > 0) return t.join("");
				break;
			}
		}
		return "";
	}
	var U = /*#__PURE__*/ function() {
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
					A.main.indexOf(n) !== -1 && (this.sects = V(e));
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
						n.sectPrCount = ce(e), this.totalSectPr += n.sectPrCount;
						for (var r = this.sects, i = 0, a = r.length; i < a; i++) {
							var o = r[i];
							if (n.lIndex < o[0].lIndex) {
								i + 1 < r.length && z(r[i + 1]) && (n.addContinuousType = !0);
								break;
							}
							if (e[0].lIndex < o[0].lIndex && o[0].lIndex < n.lIndex) {
								B(r[i]) && (n.addNextPage = { index: i });
								break;
							}
						}
						n.lastParagrapSectPr = H(e);
					}
					if (!n || n.expandTo !== "auto" || n.module !== M || !F(e)) return e;
					n.paragraphLoop = !0;
					var s = 0, c = v(e, function(e) {
						return b(e) && (s++, s === 1) ? "start" : C(e) && (s--, s === 0) ? "end" : null;
					}), l = c[0], u = y(c), d = I(l), f = I(u);
					return d > 0 && c[1][0].type === "content" && ee(c[1][0].value) && (d += 1), f > 0 && y(c[c.length - 2]).type === "content" && ee(y(c[c.length - 2]).value) && (f += 1), n.hasPageBreakBeginning = oe(l), n.hasPageBreak = oe(u), se(l) && (d = 0), se(u) && (f = 0), e.slice(d, e.length - f);
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
					var l = 0, u = ne(e);
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
						e.hasPageBreak && d === f - 1 && u && L(v), p.scopePathItem.some(function(e) {
							return e !== 0;
						}) ? (e.sectPrCount === 1 && (v.parts = ae(v.parts)), e.addContinuousType && (v.parts = ie(v.parts))) : e.addNextPage && re(v.parts, n.sects[e.addNextPage.index]), e.addNextPage && L(v), e.hasPageBreakBeginning && u && R(v);
						for (var y = 0, b = v.parts; y < b.length; y++) {
							var x = b[y];
							r.push(x);
						}
						S(a, v.errors);
					}
					var f = t.scopeManager.getValue(e.value, { part: e });
					if (f ??= t.nullGetter(e), t.scopeManager.loopOverValue(f, d, e.inverted) === !1) return e.lastParagrapSectPr ? e.paragraphLoop ? { value: `<w:p><w:pPr>${e.lastParagrapSectPr}</w:pPr></w:p>` } : { value: `</w:t></w:r></w:p><w:p><w:pPr>${e.lastParagrapSectPr}</w:pPr><w:r><w:t>` } : {
						value: P(e) || "",
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
		return j(new U());
	};
})), ad = /* @__PURE__ */ N(((e, t) => {
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
	var c = Bu(), l = Iu(), u = l.isTextStart, d = l.isTextEnd, f = l.endsWith, p = l.startsWith, m = l.pushArray, h = "<w:t xml:space=\"preserve\">", g = h.length, _ = "</w:t>", v = _.length;
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
})), od = /* @__PURE__ */ N(((e, t) => {
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
	var c = Vu(), l = Iu(), u = l.isContent, d = l.getPartWithDelimiters, f = Fu(), p = f.throwRawTagShouldBeOnlyTextInParagraph, m = f.getInvalidRawXMLValueException, h = Bu(), g = "rawxml";
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
})), sd = /* @__PURE__ */ N(((e, t) => {
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
})), cd = /* @__PURE__ */ N(((e, t) => {
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
	var c = sd(), l = Iu(), u = l.getLeft, d = l.getRight, f = l.pushArray, p = Bu(), m = Vu().getExpandToDefault, h = Fu(), g = h.getUnmatchedLoopException, _ = h.getClosingTagNotMatchOpeningTag, v = h.getUnbalancedLoopException;
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
})), ld = /* @__PURE__ */ N(((e, t) => {
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
	var c = Bu(), l = Fu(), u = l.getScopeCompilationError, d = l.getCorruptCharactersException, f = Iu(), p = f.utf8ToWord, m = f.hasCorruptCharacters, h = f.removeCorruptCharacters, g = Uu(), _ = [
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
})), ud = /* @__PURE__ */ N(((e, t) => {
	var n = id(), r = ad(), i = od(), a = cd(), o = ld();
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
})), dd = /* @__PURE__ */ N(((e, t) => {
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
	var b = Iu(), x = Lu(), S = x.object({
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
	}).strict(), w = Ru().getRelsTypes, T = zu(), E = T.collectContentTypes, D = T.getContentTypes, O = Bu(), k = Vu(), A = Wu(), j = Gu(), ee = Ku(), M = qu().getTags, te = Ju(), N = Fu(), ne = N.throwMultiError, P = N.throwResolveBeforeCompile, F = N.throwRenderInvalidTemplate, I = N.throwRenderTwice, L = N.XTInternalError, R = N.XTTemplateError, z = N.throwFileTypeNotIdentified, B = N.throwFileTypeNotHandled, re = N.throwApiVersionError;
	b.getRelsTypes = w, b.traits = k, b.moduleWrapper = O, b.collectContentTypes = E, b.getContentTypes = D;
	var ie = b.getDefaults, ae = b.str2xml, oe = b.xml2str, se = b.concatArrays, V = b.uniq, ce = b.getDuplicates, H = b.stableSort, U = b.pushArray, le = b.utf8ToWord, ue = b.invertMap, de = "[Content_Types].xml", fe = "_rels/.rels", pe = [
		3,
		47,
		2
	];
	function me(e) {
		for (var t = [], n = 0; n < e.length; n++) {
			var r = e[n];
			t.push(r.name);
		}
		var i = ce(t);
		if (i.length > 0) throw new L(`Detected duplicate module "${i[0]}"`);
	}
	function he(e) {
		for (var t = 0, n = e.modules; t < n.length; t++) for (var r = n[t], i = 0, a = r.xmlContentTypes || []; i < a.length; i++) for (var o = a[i], s = e.invertedContentTypes[o] || [], c = 0; c < s.length; c++) {
			var l = s[c];
			e.zip.files[l] && e.options.xmlFileNames.push(l);
		}
	}
	function ge(e) {
		return H(e, function(e, t) {
			return (t.priority || 0) - (e.priority || 0);
		});
	}
	function _e(e) {
		var t = [];
		for (var n in e) t.push(n);
		for (var r = [de, fe], i = [
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
	function ve(e, t) {
		e.hideDeprecations !== !0 && console.warn(t);
	}
	function ye(e, t) {
		if (e.hideDeprecations !== !0) return ve(e, `Deprecated method ".${t}", view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ${(/* @__PURE__ */ Error()).stack}`);
	}
	function W(e) {
		e.modules = e.modules.filter(function(t) {
			if (!t.supportedFileTypes) return !0;
			if (!Array.isArray(t.supportedFileTypes)) throw Error("The supportedFileTypes field of the module must be an array");
			var n = t.supportedFileTypes.includes(e.fileType);
			return n || t.on("detached"), n;
		});
	}
	function be(e) {
		var t = e.compiled;
		e.errors = se(Object.keys(t).map(function(e) {
			return t[e].allErrors;
		})), e.errors.length !== 0 && (e.options.errorLogging && te(e.errors, e.options.errorLogging), ne(e.errors));
	}
	function xe(e) {
		return typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(e);
	}
	var Se = /*#__PURE__*/ function() {
		function e(t) {
			var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.modules, a = i === void 0 ? [] : i, o = p(r, n);
			if (h(this, e), this.targets = [], this.rendered = !1, this.scopeManagers = {}, this.compiled = {}, this.modules = [A()], this.xmlDocuments = {}, arguments.length === 0) ve(this, `Deprecated docxtemplater constructor with no arguments, view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ${(/* @__PURE__ */ Error()).stack}`), this.hideDeprecations = !0, this.setOptions(o);
			else {
				if (this.hideDeprecations = !0, this.setOptions(o), xe(t)) throw Error("You passed a Buffer to the Docxtemplater constructor. The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
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
					return e.length !== 3 && re("neededVersion is not a valid version", {
						neededVersion: e,
						explanation: "the neededVersion must be an array of length 3"
					}), e[0] !== pe[0] && re("The major api version do not match, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: pe,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${pe.join(".")}`
					}), e[1] > pe[1] && re("The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: pe,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${pe.join(".")}`
					}), e[1] === pe[1] && e[2] > pe[2] && re("The patch api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
						neededVersion: e,
						currentModuleApiVersion: pe,
						explanation: `moduleAPIVersionMismatch : needed=${e.join(".")}, current=${pe.join(".")}`
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
					if (this.v4Constructor) throw new L("attachModule() should not be called manually when using the v4 constructor");
					ye(this, "attachModule");
					var t = f(e);
					if (t === "function") throw new L("Cannot attach a class/function as a module. Most probably you forgot to instantiate the module by using `new` on the module.");
					if (!e || t !== "object") throw new L("Cannot attachModule with a falsy value");
					if (e.requiredAPIVersion && this.verifyApiVersion(e.requiredAPIVersion), e.attached === !0) if (typeof e.clone == "function") e = e.clone();
					else throw Error(`Cannot attach a module that was already attached : "${e.name}". The most likely cause is that you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater`);
					e.attached = !0;
					var n = O(e);
					return this.modules.push(n), n.on("attached"), this.fileType && W(this), this;
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
					ye(this, "setOptions"), this.options = {};
					var i = ie();
					for (var a in i) {
						var o = i[a];
						this.options[a] = e[a] == null ? this[a] || o : e[a], this[a] = this.options[a];
					}
					return (t = this.delimiters).start && (t.start = le(this.delimiters.start)), (n = this.delimiters).end && (n.end = le(this.delimiters.end)), this;
				}
			},
			{
				key: "loadZip",
				value: function(e) {
					if (this.v4Constructor) throw Error("loadZip() should not be called manually when using the v4 constructor");
					if (ye(this, "loadZip"), e.loadAsync) throw new L("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
					e.xtRendered && this.options.warnFn([/* @__PURE__ */ Error("This zip file appears to be the outcome of a previous docxtemplater generation. This typically indicates that docxtemplater was integrated by reusing the same zip file. It is recommended to create a new Pizzip instance for each docxtemplater generation.")]), this.zip = e, this.updateFileTypeConfig(), this.modules = se([this.fileTypeConfig.baseModules.map(function(e) {
						return e();
					}), this.modules]);
					for (var t = 0, n = this.modules; t < n.length; t++) {
						var r = n[t];
						r.zip = this.zip, r.docxtemplater = this, r.fileTypeConfig = this.fileTypeConfig, r.fileType = this.fileType, r.xtOptions = this.options, r.modules = this.modules;
					}
					return W(this), this;
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
					ye(this, "resolveData");
					var n = [];
					return Object.keys(this.compiled).length || P(), Promise.resolve(e).then(function(e) {
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
									U(n, e);
								});
							}));
						}, a = 0, o = Object.keys(t.mapper); a < o.length; a++) i();
						return Promise.all(r).then(function(e) {
							return n.length !== 0 && (t.options.errorLogging && te(n, t.options.errorLogging), ne(n)), se(e);
						});
					});
				}
			},
			{
				key: "compile",
				value: function() {
					if (ye(this, "compile"), this.updateFileTypeConfig(), me(this.modules), this.modules = ge(this.modules), Object.keys(this.compiled).length) return this;
					for (var e = this.options, t = 0, n = this.modules; t < n.length; t++) e = n[t].optionsTransformer(e, this);
					this.options = e, this.options.xmlFileNames = V(this.options.xmlFileNames);
					for (var r = 0, i = this.options.xmlFileNames; r < i.length; r++) {
						var a = i[r], o = this.zip.files[a].asText();
						this.xmlDocuments[a] = ae(o);
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
					return this.sendEvent("after-postparse"), this.setModules({ compiled: this.compiled }), be(this), this;
				}
			},
			{
				key: "updateFileTypeConfig",
				value: function() {
					this.relsTypes = w(this.zip);
					var t = D(this.zip), n = t.overrides, r = t.defaults, i = t.contentTypes, a = t.contentTypeXml;
					a && (this.filesContentTypes = E(n, r, this.zip), this.invertedContentTypes = ue(this.filesContentTypes), this.setModules({
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
					if (this.fileType = o, o === "odt" && B(o), o || z(this.zip), he(this), W(this), this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig, !this.fileTypeConfig) if (e.FileTypeConfig[this.fileType]) this.fileTypeConfig = e.FileTypeConfig[this.fileType]();
					else {
						var l = `Filetype "${this.fileType}" is not supported`, u = "filetype_not_supported";
						this.fileType === "xlsx" && (l = `Filetype "${this.fileType}" is supported only with the paid XlsxModule`, u = "xlsx_filetype_needs_xlsx_module");
						var d = new R(l);
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
					this.zip.xtRendered = !0, this.rendered && I(), this.rendered = !0, Object.keys(this.compiled).length === 0 && this.compile(), this.errors.length > 0 && F(), arguments.length > 0 && (this.data = e), this.setModules({
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
					return be(this), this.sendEvent("syncing-zip"), this.syncZip(), this.sendEvent("synced-zip"), this;
				}
			},
			{
				key: "syncZip",
				value: function() {
					for (var e in this.xmlDocuments) {
						this.zip.remove(e);
						var t = oe(this.xmlDocuments[e]);
						this.zip.file(e, t, { createFolders: !0 });
					}
				}
			},
			{
				key: "setData",
				value: function(e) {
					return ye(this, "setData"), this.data = e, this;
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
					}, i = ie(), a = U(Object.keys(i), [
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
					this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip), U(this.templatedFiles, this.targets);
					var e = this.fileTypeConfig.templatedNs || [];
					if (e.length > 0) {
						for (var t in this.filesContentTypes) if (/^customXml\/item\d+\.xml$/.test(t)) for (var n = 0; n < e.length; n++) {
							var r = e[n];
							this.zip.file(t).asText().indexOf(`xmlns="${r}"`) !== -1 && this.templatedFiles.push(t);
						}
					}
					return this.templatedFiles = V(this.templatedFiles), this.templatedFiles;
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
						fileOrder: _e
					}, e), {}, { type: "nodebuffer" }));
				}
			},
			{
				key: "toBlob",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: _e
					}, e), {}, { type: "blob" }));
				}
			},
			{
				key: "toBase64",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: _e
					}, e), {}, { type: "base64" }));
				}
			},
			{
				key: "toUint8Array",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: _e
					}, e), {}, { type: "uint8array" }));
				}
			},
			{
				key: "toArrayBuffer",
				value: function(e) {
					return this.zip.generate(i(i({
						compression: "DEFLATE",
						fileOrder: _e
					}, e), {}, { type: "arraybuffer" }));
				}
			}
		]);
	}();
	Se.DocUtils = b, Se.Errors = Fu(), Se.XmlTemplater = rd(), Se.FileTypeConfig = ud(), Se.XmlMatcher = Yu(), t.exports = Se, t.exports.default = Se;
})), fd = /* @__PURE__ */ N(((e) => {
	var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	e.encode = function(e) {
		for (var n = "", r, i, a, o, s, c, l, u = 0; u < e.length;) r = e.charCodeAt(u++), i = e.charCodeAt(u++), a = e.charCodeAt(u++), o = r >> 2, s = (r & 3) << 4 | i >> 4, c = (i & 15) << 2 | a >> 6, l = a & 63, isNaN(i) ? c = l = 64 : isNaN(a) && (l = 64), n = n + t.charAt(o) + t.charAt(s) + t.charAt(c) + t.charAt(l);
		return n;
	}, e.decode = function(e) {
		var n = "", r, i, a, o, s, c, l, u = 0;
		for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length;) o = t.indexOf(e.charAt(u++)), s = t.indexOf(e.charAt(u++)), c = t.indexOf(e.charAt(u++)), l = t.indexOf(e.charAt(u++)), r = o << 2 | s >> 4, i = (s & 15) << 4 | c >> 2, a = (c & 3) << 6 | l, n += String.fromCharCode(r), c !== 64 && (n += String.fromCharCode(i)), l !== 64 && (n += String.fromCharCode(a));
		return n;
	};
})), pd = /* @__PURE__ */ N(((e) => {
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
})), md = /* @__PURE__ */ N(((e, t) => {
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
		}, te = {
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
		}, N = function(e, t, n, r) {
			for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0;) {
				n -= o = n > 2e3 ? 2e3 : n;
				do
					a = a + (i = i + t[r++] | 0) | 0;
				while (--o);
				i %= 65521, a %= 65521;
			}
			return i | a << 16 | 0;
		}, ne = new Uint32Array(function() {
			for (var e, t = [], n = 0; n < 256; n++) {
				e = n;
				for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
				t[n] = e;
			}
			return t;
		}()), P = function(e, t, n, r) {
			var i = ne, a = r + n;
			e ^= -1;
			for (var o = r; o < a; o++) e = e >>> 8 ^ i[255 & (e ^ t[o])];
			return -1 ^ e;
		}, F = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version"
		}, I = {
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
		}, L = te._tr_init, R = te._tr_stored_block, z = te._tr_flush_block, B = te._tr_tally, re = te._tr_align, ie = I.Z_NO_FLUSH, ae = I.Z_PARTIAL_FLUSH, oe = I.Z_FULL_FLUSH, se = I.Z_FINISH, V = I.Z_BLOCK, ce = I.Z_OK, H = I.Z_STREAM_END, U = I.Z_STREAM_ERROR, le = I.Z_DATA_ERROR, ue = I.Z_BUF_ERROR, de = I.Z_DEFAULT_COMPRESSION, fe = I.Z_FILTERED, pe = I.Z_HUFFMAN_ONLY, me = I.Z_RLE, he = I.Z_FIXED, ge = I.Z_DEFAULT_STRATEGY, _e = I.Z_UNKNOWN, ve = I.Z_DEFLATED, ye = 258, W = 262, be = 42, xe = 113, Se = 666, Ce = function(e, t) {
			return e.msg = F[t], t;
		}, we = function(e) {
			return 2 * e - (e > 4 ? 9 : 0);
		}, Te = function(e) {
			for (var t = e.length; --t >= 0;) e[t] = 0;
		}, Ee = function(e) {
			var t, n, r, i = e.w_size;
			r = t = e.hash_size;
			do
				n = e.head[--r], e.head[r] = n >= i ? n - i : 0;
			while (--t);
			r = t = i;
			do
				n = e.prev[--r], e.prev[r] = n >= i ? n - i : 0;
			while (--t);
		}, De = function(e, t, n) {
			return (t << e.hash_shift ^ n) & e.hash_mask;
		}, Oe = function(e, t) {
			var n;
			if (e.legacy_hash) n = e.ins_h = De(e, e.ins_h, e.window[t + 3 - 1]);
			else {
				var r = e.window, i = r[t] | r[t + 1] << 8 | r[t + 2] << 16 | r[t + 3] << 24;
				n = e.ins_h = Math.imul(i, 66521) + 66521 >>> 16 & e.hash_mask;
			}
			var a = e.prev[t & e.w_mask] = e.head[n];
			return e.head[n] = t, a;
		}, ke = function(e) {
			var t = e.state, n = t.pending;
			n > e.avail_out && (n = e.avail_out), n !== 0 && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
		}, Ae = function(e, t) {
			z(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, ke(e.strm);
		}, G = function(e, t) {
			e.pending_buf[e.pending++] = t;
		}, je = function(e, t) {
			e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
		}, Me = function(e, t, n, r) {
			var i = e.avail_in;
			return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, t.set(e.input.subarray(e.next_in, e.next_in + i), n), e.state.wrap === 1 ? e.adler = N(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = P(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
		}, Ne = function(e, t) {
			var n, r, i = e.max_chain_length, a = e.strstart, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - W ? e.strstart - (e.w_size - W) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + ye, p = l[a + o - 1], m = l[a + o];
			e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
			do
				if (l[(n = t) + o] === m && l[n + o - 1] === p && l[n] === l[a] && l[++n] === l[a + 1]) {
					a += 2, n++;
					do					;
while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < f);
					if (r = ye - (f - a), a = f - ye, r > o) {
						if (e.match_start = t, o = r, r >= s) break;
						p = l[a + o - 1], m = l[a + o];
					}
				}
			while ((t = d[t & u]) > c && --i != 0);
			return o <= e.lookahead ? o : e.lookahead;
		}, Pe = function(e) {
			var t, n, r, i = e.w_size;
			do {
				if (n = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - W) && (e.window.set(e.window.subarray(i, i + i - n), 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, e.insert > e.strstart && (e.insert = e.strstart), Ee(e), n += i), e.strm.avail_in === 0) break;
				if (t = Me(e.strm, e.window, e.strstart + e.lookahead, n), e.lookahead += t, e.legacy_hash) {
					if (e.lookahead + e.insert >= 3) for (r = e.strstart - e.insert, e.ins_h = e.window[r], e.ins_h = De(e, e.ins_h, e.window[r + 1]); e.insert && (Oe(e, r), r++, e.insert--, !(e.lookahead + e.insert < 3)););
				} else if (e.lookahead + e.insert > 3) for (r = e.strstart - e.insert; e.insert && (Oe(e, r), r++, e.insert--, !(e.lookahead + e.insert <= 3)););
			} while (e.lookahead < W && e.strm.avail_in !== 0);
		}, Fe = function(e, t) {
			var n, r, i, a = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, o = 0, s = e.strm.avail_in;
			do {
				if (n = 65535, i = e.bi_valid + 42 >> 3, e.strm.avail_out < i || (i = e.strm.avail_out - i, n > (r = e.strstart - e.block_start) + e.strm.avail_in && (n = r + e.strm.avail_in), n > i && (n = i), n < a && (n === 0 && t !== se || t === ie || n !== r + e.strm.avail_in))) break;
				o = +(t === se && n === r + e.strm.avail_in), R(e, 0, 0, o), e.pending_buf[e.pending - 4] = n, e.pending_buf[e.pending - 3] = n >> 8, e.pending_buf[e.pending - 2] = ~n, e.pending_buf[e.pending - 1] = ~n >> 8, ke(e.strm), r && (r > n && (r = n), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + r), e.strm.next_out), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r, e.block_start += r, n -= r), n && (Me(e.strm, e.strm.output, e.strm.next_out, n), e.strm.next_out += n, e.strm.avail_out -= n, e.strm.total_out += n);
			} while (o === 0);
			return (s -= e.strm.avail_in) && (s >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= s && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - s, e.strm.next_in), e.strstart), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), o ? 4 : t !== ie && t !== se && e.strm.avail_in === 0 && e.strstart === e.block_start ? 2 : (i = e.window_size - e.strstart, e.strm.avail_in > i && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, i += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), i > e.strm.avail_in && (i = e.strm.avail_in), i && (Me(e.strm, e.window, e.strstart, i), e.strstart += i, e.insert += i > e.w_size - e.insert ? e.w_size - e.insert : i), e.high_water < e.strstart && (e.high_water = e.strstart), i = e.bi_valid + 42 >> 3, a = (i = e.pending_buf_size - i > 65535 ? 65535 : e.pending_buf_size - i) > e.w_size ? e.w_size : i, ((r = e.strstart - e.block_start) >= a || (r || t === se) && t !== ie && e.strm.avail_in === 0 && r <= i) && (n = r > i ? i : r, o = +(t === se && e.strm.avail_in === 0 && n === r), R(e, e.block_start, n, o), e.block_start += n, ke(e.strm)), o ? 3 : 1);
		}, Ie = function(e, t) {
			for (var n, r;;) {
				if (e.lookahead < W) {
					if (Pe(e), e.lookahead < W && t === ie) return 1;
					if (e.lookahead === 0) break;
				}
				if (n = 0, e.lookahead >= 3 && (n = Oe(e, e.strstart)), n !== 0 && e.strstart - n <= e.w_size - W && (e.match_length = Ne(e, n)), e.match_length >= 3) if (r = B(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
					e.match_length--;
					do
						e.strstart++, n = Oe(e, e.strstart);
					while (--e.match_length != 0);
					e.strstart++;
				} else e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = De(e, e.ins_h, e.window[e.strstart + 1]));
				else r = B(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
				if (r && (Ae(e, !1), e.strm.avail_out === 0)) return 1;
			}
			return e.insert = e.strstart < 2 ? e.strstart : 2, t === se ? (Ae(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (Ae(e, !1), e.strm.avail_out === 0) ? 1 : 2;
		}, Le = function(e, t) {
			for (var n, r, i;;) {
				if (e.lookahead < W) {
					if (Pe(e), e.lookahead < W && t === ie) return 1;
					if (e.lookahead === 0) break;
				}
				if (n = 0, e.lookahead >= 3 && (n = Oe(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - W && (e.match_length = Ne(e, n), e.match_length <= 5 && (e.strategy === fe || e.match_length === 3 && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
					i = e.strstart + e.lookahead - 3, r = B(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
					do
						++e.strstart <= i && (n = Oe(e, e.strstart));
					while (--e.prev_length != 0);
					if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (Ae(e, !1), e.strm.avail_out === 0)) return 1;
				} else if (e.match_available) {
					if ((r = B(e, 0, e.window[e.strstart - 1])) && Ae(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return 1;
				} else e.match_available = 1, e.strstart++, e.lookahead--;
			}
			return e.match_available &&= (r = B(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === se ? (Ae(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (Ae(e, !1), e.strm.avail_out === 0) ? 1 : 2;
		};
		function Re(e, t, n, r, i) {
			this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
		}
		var ze = [
			new Re(0, 0, 0, 0, Fe),
			new Re(4, 4, 8, 4, Ie),
			new Re(4, 5, 16, 8, Ie),
			new Re(4, 6, 32, 32, Ie),
			new Re(4, 4, 16, 16, Le),
			new Re(8, 16, 32, 32, Le),
			new Re(8, 16, 128, 128, Le),
			new Re(8, 32, 128, 256, Le),
			new Re(32, 128, 258, 1024, Le),
			new Re(32, 258, 258, 4096, Le)
		];
		function Be() {
			this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ve, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = /* @__PURE__ */ new Uint16Array(1146), this.dyn_dtree = /* @__PURE__ */ new Uint16Array(122), this.bl_tree = /* @__PURE__ */ new Uint16Array(78), Te(this.dyn_ltree), Te(this.dyn_dtree), Te(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = /* @__PURE__ */ new Uint16Array(16), this.heap = /* @__PURE__ */ new Uint16Array(573), Te(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = /* @__PURE__ */ new Uint16Array(573), Te(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
		}
		var Ve = function(e) {
			if (!e) return 1;
			var t = e.state;
			return +(!t || t.strm !== e || t.status !== be && t.status !== 57 && t.status !== 69 && t.status !== 73 && t.status !== 91 && t.status !== 103 && t.status !== xe && t.status !== Se);
		}, He = function(e) {
			if (Ve(e)) return Ce(e, U);
			e.total_in = e.total_out = 0, e.data_type = _e;
			var t = e.state;
			return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap === 2 ? 57 : t.wrap ? be : xe, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = -2, L(t), ce;
		}, Ue = function(e) {
			var t, n = He(e);
			return n === ce && ((t = e.state).window_size = 2 * t.w_size, Te(t.head), t.max_lazy_match = ze[t.level].max_lazy, t.good_match = ze[t.level].good_length, t.nice_match = ze[t.level].nice_length, t.max_chain_length = ze[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = 2, t.match_available = 0, t.ins_h = 0), n;
		}, We = function(e, t, n, r, i, a, o) {
			if (!e) return U;
			var s = 1;
			if (t === de && (t = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > 9 || n !== ve || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > he || r === 8 && s !== 1) return Ce(e, U);
			r === 8 && (r = 9);
			var c = new Be();
			return e.state = c, c.strm = e, c.status = be, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.legacy_hash = +!!o, c.hash_bits = i + 7, !c.legacy_hash && c.hash_bits < 15 && (c.hash_bits = 15), c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + 3 - 1) / 3), c.window = new Uint8Array(2 * c.w_size), c.head = new Uint16Array(c.hash_size), c.prev = new Uint16Array(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new Uint8Array(c.pending_buf_size), c.sym_buf = c.lit_bufsize, c.sym_end = 3 * (c.lit_bufsize - 1), c.level = t, c.strategy = a, c.method = n, Ue(e);
		}, Ge = {
			deflateInit: function(e, t) {
				return We(e, t, ve, 15, 8, ge);
			},
			deflateInit2: We,
			deflateReset: Ue,
			deflateResetKeep: He,
			deflateSetHeader: function(e, t) {
				return Ve(e) || e.state.wrap !== 2 ? U : (e.state.gzhead = t, ce);
			},
			deflate: function(e, t) {
				if (Ve(e) || t > V || t < 0) return e ? Ce(e, U) : U;
				var n = e.state;
				if (!e.output || e.avail_in !== 0 && !e.input || n.status === Se && t !== se) return Ce(e, e.avail_out === 0 ? ue : U);
				var r = n.last_flush;
				if (n.last_flush = t, n.pending !== 0) {
					if (ke(e), e.avail_out === 0) return n.last_flush = -1, ce;
				} else if (e.avail_in === 0 && we(t) <= we(r) && t !== se) return Ce(e, ue);
				if (n.status === Se && e.avail_in !== 0) return Ce(e, ue);
				if (n.status === be && n.wrap === 0 && (n.status = xe), n.status === be) {
					var i = ve + (n.w_bits - 8 << 4) << 8;
					if (i |= (n.strategy >= pe || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3) << 6, n.strstart !== 0 && (i |= 32), je(n, i += 31 - i % 31), n.strstart !== 0 && (je(n, e.adler >>> 16), je(n, 65535 & e.adler)), e.adler = 1, n.status = xe, ke(e), n.pending !== 0) return n.last_flush = -1, ce;
				}
				if (n.status === 57) {
					if (e.adler = 0, G(n, 31), G(n, 139), G(n, 8), n.gzhead) G(n, +!!n.gzhead.text + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), G(n, 255 & n.gzhead.time), G(n, n.gzhead.time >> 8 & 255), G(n, n.gzhead.time >> 16 & 255), G(n, n.gzhead.time >> 24 & 255), G(n, n.level === 9 ? 2 : n.strategy >= pe || n.level < 2 ? 4 : 0), G(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (G(n, 255 & n.gzhead.extra.length), G(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = P(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69;
					else if (G(n, 0), G(n, 0), G(n, 0), G(n, 0), G(n, 0), G(n, n.level === 9 ? 2 : n.strategy >= pe || n.level < 2 ? 4 : 0), G(n, 3), n.status = xe, ke(e), n.pending !== 0) return n.last_flush = -1, ce;
				}
				if (n.status === 69) {
					if (n.gzhead.extra) {
						for (var a = n.pending, o = (65535 & n.gzhead.extra.length) - n.gzindex; n.pending + o > n.pending_buf_size;) {
							var s = n.pending_buf_size - n.pending;
							if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + s), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > a && (e.adler = P(e.adler, n.pending_buf, n.pending - a, a)), n.gzindex += s, ke(e), n.pending !== 0) return n.last_flush = -1, ce;
							a = 0, o -= s;
						}
						var c = new Uint8Array(n.gzhead.extra);
						n.pending_buf.set(c.subarray(n.gzindex, n.gzindex + o), n.pending), n.pending += o, n.gzhead.hcrc && n.pending > a && (e.adler = P(e.adler, n.pending_buf, n.pending - a, a)), n.gzindex = 0;
					}
					n.status = 73;
				}
				if (n.status === 73) {
					if (n.gzhead.name) {
						var l, u = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > u && (e.adler = P(e.adler, n.pending_buf, n.pending - u, u)), ke(e), n.pending !== 0) return n.last_flush = -1, ce;
								u = 0;
							}
							l = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, G(n, l);
						} while (l !== 0);
						n.gzhead.hcrc && n.pending > u && (e.adler = P(e.adler, n.pending_buf, n.pending - u, u)), n.gzindex = 0;
					}
					n.status = 91;
				}
				if (n.status === 91) {
					if (n.gzhead.comment) {
						var d, f = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > f && (e.adler = P(e.adler, n.pending_buf, n.pending - f, f)), ke(e), n.pending !== 0) return n.last_flush = -1, ce;
								f = 0;
							}
							d = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, G(n, d);
						} while (d !== 0);
						n.gzhead.hcrc && n.pending > f && (e.adler = P(e.adler, n.pending_buf, n.pending - f, f));
					}
					n.status = 103;
				}
				if (n.status === 103) {
					if (n.gzhead.hcrc) {
						if (n.pending + 2 > n.pending_buf_size && (ke(e), n.pending !== 0)) return n.last_flush = -1, ce;
						G(n, 255 & e.adler), G(n, e.adler >> 8 & 255), e.adler = 0;
					}
					if (n.status = xe, ke(e), n.pending !== 0) return n.last_flush = -1, ce;
				}
				if (e.avail_in !== 0 || n.lookahead !== 0 || t !== ie && n.status !== Se) {
					var p = n.level === 0 ? Fe(n, t) : n.strategy === pe ? function(e, t) {
						for (var n;;) {
							if (e.lookahead === 0 && (Pe(e), e.lookahead === 0)) {
								if (t === ie) return 1;
								break;
							}
							if (e.match_length = 0, n = B(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (Ae(e, !1), e.strm.avail_out === 0)) return 1;
						}
						return e.insert = 0, t === se ? (Ae(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (Ae(e, !1), e.strm.avail_out === 0) ? 1 : 2;
					}(n, t) : n.strategy === me ? function(e, t) {
						for (var n, r, i, a, o = e.window;;) {
							if (e.lookahead <= ye) {
								if (Pe(e), e.lookahead <= ye && t === ie) return 1;
								if (e.lookahead === 0) break;
							}
							if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (r = o[i = e.strstart - 1]) === o[++i] && r === o[++i] && r === o[++i]) {
								a = e.strstart + ye;
								do								;
while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
								e.match_length = ye - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
							}
							if (e.match_length >= 3 ? (n = B(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = B(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (Ae(e, !1), e.strm.avail_out === 0)) return 1;
						}
						return e.insert = 0, t === se ? (Ae(e, !0), e.strm.avail_out === 0 ? 3 : 4) : e.sym_next && (Ae(e, !1), e.strm.avail_out === 0) ? 1 : 2;
					}(n, t) : ze[n.level].func(n, t);
					if (p !== 3 && p !== 4 || (n.status = Se), p === 1 || p === 3) return e.avail_out === 0 && (n.last_flush = -1), ce;
					if (p === 2 && (t === ae ? re(n) : t !== V && (R(n, 0, 0, !1), t === oe && (Te(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), ke(e), e.avail_out === 0)) return n.last_flush = -1, ce;
				}
				return t === se ? n.wrap <= 0 ? H : (n.wrap === 2 ? (G(n, 255 & e.adler), G(n, e.adler >> 8 & 255), G(n, e.adler >> 16 & 255), G(n, e.adler >> 24 & 255), G(n, 255 & e.total_in), G(n, e.total_in >> 8 & 255), G(n, e.total_in >> 16 & 255), G(n, e.total_in >> 24 & 255)) : (je(n, e.adler >>> 16), je(n, 65535 & e.adler)), ke(e), n.wrap > 0 && (n.wrap = -n.wrap), n.pending === 0 ? H : ce) : ce;
			},
			deflateEnd: function(e) {
				if (Ve(e)) return U;
				var t = e.state.status;
				return e.state = null, t === xe ? Ce(e, le) : ce;
			},
			deflateSetDictionary: function(e, t) {
				var n = t.length;
				if (Ve(e)) return U;
				var r = e.state, i = r.wrap;
				if (i === 2 || i === 1 && r.status !== be || r.lookahead) return U;
				if (i === 1 && (e.adler = N(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size) {
					i === 0 && (Te(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
					var a = new Uint8Array(r.w_size);
					a.set(t.subarray(n - r.w_size, n), 0), t = a, n = r.w_size;
				}
				var o = e.avail_in, s = e.next_in, c = e.input;
				for (e.avail_in = n, e.next_in = 0, e.input = t, Pe(r); r.lookahead >= 3;) {
					var l = r.strstart, u = r.lookahead - 2;
					do
						Oe(r, l), l++;
					while (--u);
					r.strstart = l, r.lookahead = 2, Pe(r);
				}
				return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = s, e.input = c, e.avail_in = o, r.wrap = i, ce;
			},
			deflateInfo: "pako deflate (from Nodeca project)"
		};
		function Ke(e) {
			return Ke = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, Ke(e);
		}
		var qe = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}, Je = function(e) {
			for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
				var n = t.shift();
				if (n) {
					if (Ke(n) !== "object") throw TypeError(n + "must be non-object");
					for (var r in n) qe(n, r) && (e[r] = n[r]);
				}
			}
			return e;
		}, Ye = function(e) {
			for (var t = 0, n = 0, r = e.length; n < r; n++) t += e[n].length;
			for (var i = new Uint8Array(t), a = 0, o = 0, s = e.length; a < s; a++) {
				var c = e[a];
				i.set(c, o), o += c.length;
			}
			return i;
		}, Xe = !0;
		try {
			String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
		} catch {
			Xe = !1;
		}
		for (var Ze = /* @__PURE__ */ new Uint8Array(256), Qe = 0; Qe < 256; Qe++) Ze[Qe] = Qe >= 252 ? 6 : Qe >= 248 ? 5 : Qe >= 240 ? 4 : Qe >= 224 ? 3 : Qe >= 192 ? 2 : 1;
		Ze[254] = Ze[255] = 1;
		var $e = function(e) {
			if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(e);
			var t, n, r, i, a, o = e.length, s = 0;
			for (i = 0; i < o; i++) (64512 & (n = e.charCodeAt(i))) == 55296 && i + 1 < o && (64512 & (r = e.charCodeAt(i + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
			for (t = new Uint8Array(s), a = 0, i = 0; a < s; i++) (64512 & (n = e.charCodeAt(i))) == 55296 && i + 1 < o && (64512 & (r = e.charCodeAt(i + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n);
			return t;
		}, et = function(e, t) {
			var n, r, i = t || e.length;
			if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(e.subarray(0, t));
			var a = Array(2 * i);
			for (r = 0, n = 0; n < i;) {
				var o = e[n++];
				if (o < 128) a[r++] = o;
				else {
					var s = Ze[o];
					if (s > 4) a[r++] = 65533, n += s - 1;
					else {
						for (o &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && n < i;) o = o << 6 | 63 & e[n++], s--;
						s > 1 ? a[r++] = 65533 : o < 65536 ? a[r++] = o : (o -= 65536, a[r++] = 55296 | o >> 10 & 1023, a[r++] = 56320 | 1023 & o);
					}
				}
			}
			return function(e, t) {
				if (t < 65534 && e.subarray && Xe) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
				for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
				return n;
			}(a, r);
		}, tt = function(e, t) {
			(t ||= e.length) > e.length && (t = e.length);
			for (var n = t - 1; n >= 0 && (192 & e[n]) == 128;) n--;
			return n < 0 || n === 0 ? t : n + Ze[e[n]] > t ? n : t;
		}, nt = function() {
			this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
		}, rt = Object.prototype.toString, it = I.Z_NO_FLUSH, at = I.Z_SYNC_FLUSH, ot = I.Z_FULL_FLUSH, st = I.Z_FINISH, ct = I.Z_OK, lt = I.Z_STREAM_END, ut = {
			level: I.Z_DEFAULT_COMPRESSION,
			method: I.Z_DEFLATED,
			chunkSize: 16384,
			windowBits: 15,
			memLevel: 8,
			strategy: I.Z_DEFAULT_STRATEGY,
			legacyHash: !0
		};
		function dt(e) {
			this.options = Je({}, ut, e || {});
			var t = this.options;
			t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new nt(), this.strm.avail_out = 0;
			var n = Ge.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy, t.legacyHash);
			if (n !== ct) throw Error(F[n]);
			if (t.header && Ge.deflateSetHeader(this.strm, t.header), t.dictionary) {
				var r;
				if (r = typeof t.dictionary == "string" ? $e(t.dictionary) : rt.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, (n = Ge.deflateSetDictionary(this.strm, r)) !== ct) throw Error(F[n]);
				this._dict_set = !0;
			}
		}
		function ft(e, t) {
			var n = new dt(t);
			if (n.push(e, !0), n.err) throw n.msg || F[n.err];
			return n.result;
		}
		dt.prototype.push = function(e, t) {
			var n, r, i = this.strm, a = this.options.chunkSize;
			if (this.ended) return !1;
			for (r = t === ~~t ? t : !0 === t ? st : it, typeof e == "string" ? i.input = $e(e) : rt.call(e) === "[object ArrayBuffer]" ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;;) if (i.avail_out === 0 && (i.output = new Uint8Array(a), i.next_out = 0, i.avail_out = a), (r === at || r === ot) && i.avail_out <= 6) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
			else {
				if ((n = Ge.deflate(i, r)) === lt) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), n = Ge.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === ct;
				if (i.avail_out !== 0) {
					if (r > 0 && i.next_out > 0) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
					else if (i.avail_in === 0) break;
				} else this.onData(i.output);
			}
			return !0;
		}, dt.prototype.onData = function(e) {
			this.chunks.push(e);
		}, dt.prototype.onEnd = function(e) {
			e === ct && (this.result = Ye(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
		};
		var pt = {
			Deflate: dt,
			deflate: ft,
			deflateRaw: function(e, t) {
				return (t ||= {}).raw = !0, ft(e, t);
			},
			gzip: function(e, t) {
				return (t ||= {}).gzip = !0, ft(e, t);
			},
			constants: I
		}, mt = 16209, ht = function(e, t) {
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
							e.msg = "invalid literal/length code", E.mode = mt;
							break t;
						}
						b = 65535 & v, (y &= 15) && (p < y && (f += w[n++] << p, p += 8), b += f & (1 << y) - 1, f >>>= y, p -= y), p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = h[f & _];
						a: for (;;) {
							if (f >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
								if (!(64 & y)) {
									v = h[(65535 & v) + (f & (1 << y) - 1)];
									continue a;
								}
								e.msg = "invalid distance code", E.mode = mt;
								break t;
							}
							if (x = 65535 & v, p < (y &= 15) && (f += w[n++] << p, (p += 8) < y && (f += w[n++] << p, p += 8)), (x += f & (1 << y) - 1) > s) {
								e.msg = "invalid distance too far back", E.mode = mt;
								break t;
							}
							if (f >>>= y, p -= y, x > (y = i - a)) {
								if ((y = x - y) > l && E.sane) {
									e.msg = "invalid distance too far back", E.mode = mt;
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
		}, gt = 15, _t = new Uint16Array([
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
		]), vt = new Uint8Array([
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
		]), yt = new Uint16Array([
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
		]), bt = new Uint8Array([
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
		]), xt = function(e, t, n, r, i, a, o, s) {
			var c, l, u, d, f, p, m, h, g, _ = s.bits, v = 0, y = 0, b = 0, x = 0, S = 0, C = 0, w = 0, T = 0, E = 0, D = 0, O = null, k = /* @__PURE__ */ new Uint16Array(16), A = /* @__PURE__ */ new Uint16Array(16), j = null;
			for (v = 0; v <= gt; v++) k[v] = 0;
			for (y = 0; y < r; y++) k[t[n + y]]++;
			for (S = _, x = gt; x >= 1 && k[x] === 0; x--);
			if (S > x && (S = x), x === 0) return i[a++] = 20971520, i[a++] = 20971520, s.bits = 1, 0;
			for (b = 1; b < x && k[b] === 0; b++);
			for (S < b && (S = b), T = 1, v = 1; v <= gt; v++) if (T <<= 1, (T -= k[v]) < 0) return -1;
			if (T > 0 && (e === 0 || x !== 1)) return -1;
			for (A[1] = 0, v = 1; v < gt; v++) A[v + 1] = A[v] + k[v];
			for (y = 0; y < r; y++) t[n + y] !== 0 && (o[A[t[n + y]]++] = y);
			if (e === 0 ? (O = j = o, p = 20) : e === 1 ? (O = _t, j = vt, p = 257) : (O = yt, j = bt, p = 0), D = 0, y = 0, v = b, f = a, C = S, w = 0, u = -1, d = (E = 1 << S) - 1, e === 1 && E > 852 || e === 2 && E > 592) return 1;
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
		}, St = I.Z_FINISH, Ct = I.Z_BLOCK, K = I.Z_TREES, wt = I.Z_OK, Tt = I.Z_STREAM_END, Et = I.Z_NEED_DICT, Dt = I.Z_STREAM_ERROR, Ot = I.Z_DATA_ERROR, kt = I.Z_MEM_ERROR, At = I.Z_BUF_ERROR, jt = I.Z_DEFLATED, Mt = 16180, Nt = 16190, Pt = 16191, Ft = 16192, It = 16194, Lt = 16199, Rt = 16200, zt = 16206, Bt = 16209, Vt = function(e) {
			return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
		};
		function Ht() {
			this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = /* @__PURE__ */ new Uint16Array(320), this.work = /* @__PURE__ */ new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
		}
		var Ut, Wt, Gt = function(e) {
			if (!e) return 1;
			var t = e.state;
			return +(!t || t.strm !== e || t.mode < Mt || t.mode > 16211);
		}, Kt = function(e) {
			if (Gt(e)) return Dt;
			var t = e.state;
			return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = Mt, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = /* @__PURE__ */ new Int32Array(852), t.distcode = t.distdyn = /* @__PURE__ */ new Int32Array(592), t.sane = 1, t.back = -1, wt;
		}, qt = function(e) {
			if (Gt(e)) return Dt;
			var t = e.state;
			return t.wsize = 0, t.whave = 0, t.wnext = 0, Kt(e);
		}, Jt = function(e, t) {
			var n;
			if (Gt(e)) return Dt;
			var r = e.state;
			return t < 0 ? (n = 0, t = -t) : (n = 5 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? Dt : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, qt(e));
		}, Yt = function(e, t) {
			if (!e) return Dt;
			var n = new Ht();
			e.state = n, n.strm = e, n.window = null, n.mode = Mt;
			var r = Jt(e, t);
			return r !== wt && (e.state = null), r;
		}, Xt = !0, Zt = function(e) {
			if (Xt) {
				Ut = /* @__PURE__ */ new Int32Array(512), Wt = /* @__PURE__ */ new Int32Array(32);
				for (var t = 0; t < 144;) e.lens[t++] = 8;
				for (; t < 256;) e.lens[t++] = 9;
				for (; t < 280;) e.lens[t++] = 7;
				for (; t < 288;) e.lens[t++] = 8;
				for (xt(1, e.lens, 0, 288, Ut, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
				xt(2, e.lens, 0, 32, Wt, 0, e.work, { bits: 5 }), Xt = !1;
			}
			e.lencode = Ut, e.lenbits = 9, e.distcode = Wt, e.distbits = 5;
		}, Qt = function(e, t, n, r) {
			var i, a = e.state;
			return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(t.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : ((i = a.wsize - a.wnext) > r && (i = r), a.window.set(t.subarray(n - r, n - r + i), a.wnext), (r -= i) ? (a.window.set(t.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
		}, $t = {
			inflateReset: qt,
			inflateReset2: Jt,
			inflateResetKeep: Kt,
			inflateInit: function(e) {
				return Yt(e, 15);
			},
			inflateInit2: Yt,
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
				if (Gt(e) || !e.output || !e.input && e.avail_in !== 0) return Dt;
				(n = e.state).mode === Pt && (n.mode = Ft), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, d = s, f = c, C = wt;
				t: for (;;) switch (n.mode) {
					case Mt:
						if (n.wrap === 0) {
							n.mode = Ft;
							break;
						}
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (2 & n.wrap && l === 35615) {
							n.wbits === 0 && (n.wbits = 15), n.check = 0, D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = P(n.check, D, 2, 0), l = 0, u = 0, n.mode = 16181;
							break;
						}
						if (n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & l) << 8) + (l >> 8)) % 31) {
							e.msg = "incorrect header check", n.mode = Bt;
							break;
						}
						if ((15 & l) !== jt) {
							e.msg = "unknown compression method", n.mode = Bt;
							break;
						}
						if (u -= 4, S = 8 + (15 & (l >>>= 4)), n.wbits === 0 && (n.wbits = S), S > 15 || S > n.wbits) {
							e.msg = "invalid window size", n.mode = Bt;
							break;
						}
						n.dmax = 1 << n.wbits, n.flags = 0, e.adler = n.check = 1, n.mode = 512 & l ? 16189 : Pt, l = 0, u = 0;
						break;
					case 16181:
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (n.flags = l, (255 & n.flags) !== jt) {
							e.msg = "unknown compression method", n.mode = Bt;
							break;
						}
						if (57344 & n.flags) {
							e.msg = "unknown header flags set", n.mode = Bt;
							break;
						}
						n.head && (n.head.text = l >> 8 & 1), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = P(n.check, D, 2, 0)), l = 0, u = 0, n.mode = 16182;
					case 16182:
						for (; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						n.head && (n.head.time = l), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, D[2] = l >>> 16 & 255, D[3] = l >>> 24 & 255, n.check = P(n.check, D, 4, 0)), l = 0, u = 0, n.mode = 16183;
					case 16183:
						for (; u < 16;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						n.head && (n.head.xflags = 255 & l, n.head.os = l >> 8), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = P(n.check, D, 2, 0)), l = 0, u = 0, n.mode = 16184;
					case 16184:
						if (1024 & n.flags) {
							for (; u < 16;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							n.length = l, n.head && (n.head.extra_len = l), 512 & n.flags && 4 & n.wrap && (D[0] = 255 & l, D[1] = l >>> 8 & 255, n.check = P(n.check, D, 2, 0)), l = 0, u = 0;
						} else n.head && (n.head.extra = null);
						n.mode = 16185;
					case 16185:
						if (1024 & n.flags && ((p = n.length) > s && (p = s), p && (n.head && (S = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(r.subarray(a, a + p), S)), 512 & n.flags && 4 & n.wrap && (n.check = P(n.check, r, p, a)), s -= p, a += p, n.length -= p), n.length)) break t;
						n.length = 0, n.mode = 16186;
					case 16186:
						if (2048 & n.flags) {
							if (s === 0) break t;
							p = 0;
							do
								S = r[a + p++], n.head && S && n.length < 65536 && (n.head.name += String.fromCharCode(S));
							while (S && p < s);
							if (512 & n.flags && 4 & n.wrap && (n.check = P(n.check, r, p, a)), s -= p, a += p, S) break t;
						} else n.head && (n.head.name = null);
						n.length = 0, n.mode = 16187;
					case 16187:
						if (4096 & n.flags) {
							if (s === 0) break t;
							p = 0;
							do
								S = r[a + p++], n.head && S && n.length < 65536 && (n.head.comment += String.fromCharCode(S));
							while (S && p < s);
							if (512 & n.flags && 4 & n.wrap && (n.check = P(n.check, r, p, a)), s -= p, a += p, S) break t;
						} else n.head && (n.head.comment = null);
						n.mode = 16188;
					case 16188:
						if (512 & n.flags) {
							for (; u < 16;) {
								if (s === 0) break t;
								s--, l += r[a++] << u, u += 8;
							}
							if (4 & n.wrap && l !== (65535 & n.check)) {
								e.msg = "header crc mismatch", n.mode = Bt;
								break;
							}
							l = 0, u = 0;
						}
						n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = Pt;
						break;
					case 16189:
						for (; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						e.adler = n.check = Vt(l), l = 0, u = 0, n.mode = Nt;
					case Nt:
						if (n.havedict === 0) return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, Et;
						e.adler = n.check = 1, n.mode = Pt;
					case Pt: if (t === Ct || t === K) break t;
					case Ft:
						if (n.last) {
							l >>>= 7 & u, u -= 7 & u, n.mode = zt;
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
								if (Zt(n), n.mode = Lt, t === K) {
									l >>>= 2, u -= 2;
									break t;
								}
								break;
							case 2:
								n.mode = 16196;
								break;
							case 3: e.msg = "invalid block type", n.mode = Bt;
						}
						l >>>= 2, u -= 2;
						break;
					case 16193:
						for (l >>>= 7 & u, u -= 7 & u; u < 32;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if ((65535 & l) != (l >>> 16 ^ 65535)) {
							e.msg = "invalid stored block lengths", n.mode = Bt;
							break;
						}
						if (n.length = 65535 & l, l = 0, u = 0, n.mode = It, t === K) break t;
					case It: n.mode = 16195;
					case 16195:
						if (p = n.length) {
							if (p > s && (p = s), p > c && (p = c), p === 0) break t;
							i.set(r.subarray(a, a + p), o), s -= p, a += p, c -= p, o += p, n.length -= p;
							break;
						}
						n.mode = Pt;
						break;
					case 16196:
						for (; u < 14;) {
							if (s === 0) break t;
							s--, l += r[a++] << u, u += 8;
						}
						if (n.nlen = 257 + (31 & l), l >>>= 5, u -= 5, n.ndist = 1 + (31 & l), l >>>= 5, u -= 5, n.ncode = 4 + (15 & l), l >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
							e.msg = "too many length or distance symbols", n.mode = Bt;
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
						if (n.lencode = n.lendyn, n.lenbits = 7, w = { bits: n.lenbits }, C = xt(0, n.lens, 0, 19, n.lencode, 0, n.work, w), n.lenbits = w.bits, C) {
							e.msg = "invalid code lengths set", n.mode = Bt;
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
										e.msg = "invalid bit length repeat", n.mode = Bt;
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
									e.msg = "invalid bit length repeat", n.mode = Bt;
									break;
								}
								for (; p--;) n.lens[n.have++] = S;
							}
						}
						if (n.mode === Bt) break;
						if (n.lens[256] === 0) {
							e.msg = "invalid code -- missing end-of-block", n.mode = Bt;
							break;
						}
						if (n.lenbits = 9, w = { bits: n.lenbits }, C = xt(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, w), n.lenbits = w.bits, C) {
							e.msg = "invalid literal/lengths set", n.mode = Bt;
							break;
						}
						if (n.distbits = 6, n.distcode = n.distdyn, w = { bits: n.distbits }, C = xt(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, w), n.distbits = w.bits, C) {
							e.msg = "invalid distances set", n.mode = Bt;
							break;
						}
						if (n.mode = Lt, t === K) break t;
					case Lt: n.mode = Rt;
					case Rt:
						if (s >= 6 && c >= 258) {
							e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, ht(e, f), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, n.mode === Pt && (n.back = -1);
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
							n.back = -1, n.mode = Pt;
							break;
						}
						if (64 & _) {
							e.msg = "invalid literal/length code", n.mode = Bt;
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
							e.msg = "invalid distance code", n.mode = Bt;
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
							e.msg = "invalid distance too far back", n.mode = Bt;
							break;
						}
						n.mode = 16204;
					case 16204:
						if (c === 0) break t;
						if (p = f - c, n.offset > p) {
							if ((p = n.offset - p) > n.whave && n.sane) {
								e.msg = "invalid distance too far back", n.mode = Bt;
								break;
							}
							p > n.wnext ? (p -= n.wnext, m = n.wsize - p) : m = n.wnext - p, p > n.length && (p = n.length), h = n.window;
						} else h = i, m = o - n.offset, p = n.length;
						p > c && (p = c), c -= p, n.length -= p;
						do
							i[o++] = h[m++];
						while (--p);
						n.length === 0 && (n.mode = Rt);
						break;
					case 16205:
						if (c === 0) break t;
						i[o++] = n.length, c--, n.mode = Rt;
						break;
					case zt:
						if (n.wrap) {
							for (; u < 32;) {
								if (s === 0) break t;
								s--, l |= r[a++] << u, u += 8;
							}
							if (f -= c, e.total_out += f, n.total += f, 4 & n.wrap && f && (e.adler = n.check = n.flags ? P(n.check, i, f, o - f) : N(n.check, i, f, o - f)), f = c, 4 & n.wrap && (n.flags ? l : Vt(l)) !== n.check) {
								e.msg = "incorrect data check", n.mode = Bt;
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
								e.msg = "incorrect length check", n.mode = Bt;
								break;
							}
							l = 0, u = 0;
						}
						n.mode = 16208;
					case 16208:
						C = Tt;
						break t;
					case Bt:
						C = Ot;
						break t;
					case 16210: return kt;
					default: return Dt;
				}
				return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, (n.wsize || f !== e.avail_out && n.mode < Bt && (n.mode < zt || t !== St)) && Qt(e, e.output, e.next_out, f - e.avail_out), d -= e.avail_in, f -= e.avail_out, e.total_in += d, e.total_out += f, n.total += f, 4 & n.wrap && f && (e.adler = n.check = n.flags ? P(n.check, i, f, e.next_out - f) : N(n.check, i, f, e.next_out - f)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Pt ? 128 : 0) + (n.mode === Lt || n.mode === It ? 256 : 0), (d === 0 && f === 0 || t === St) && C === wt && (C = At), C;
			},
			inflateEnd: function(e) {
				if (Gt(e)) return Dt;
				var t = e.state;
				return t.window &&= null, e.state = null, wt;
			},
			inflateGetHeader: function(e, t) {
				if (Gt(e)) return Dt;
				var n = e.state;
				return 2 & n.wrap ? (n.head = t, t.done = !1, wt) : Dt;
			},
			inflateSetDictionary: function(e, t) {
				var n, r = t.length;
				return Gt(e) || (n = e.state).wrap !== 0 && n.mode !== Nt ? Dt : n.mode === Nt && N(1, t, r, 0) !== n.check ? Ot : Qt(e, t, r, r) ? (n.mode = 16210, kt) : (n.havedict = 1, wt);
			},
			inflateInfo: "pako inflate (from Nodeca project)"
		}, en = function() {
			this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
		}, tn = Object.prototype.toString, nn = I.Z_NO_FLUSH, rn = I.Z_FINISH, an = I.Z_OK, on = I.Z_STREAM_END, sn = I.Z_NEED_DICT, cn = I.Z_STREAM_ERROR, ln = I.Z_DATA_ERROR, un = I.Z_MEM_ERROR, dn = I.Z_BUF_ERROR, fn = {
			chunkSize: 65536,
			windowBits: 15,
			to: ""
		};
		function pn(e) {
			this.options = Je({}, fn, e || {});
			var t = this.options;
			t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && !(15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new nt(), this.strm.avail_out = 0;
			var n = $t.inflateInit2(this.strm, t.windowBits);
			if (n !== an || (this.header = new en(), $t.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = $e(t.dictionary) : tn.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = $t.inflateSetDictionary(this.strm, t.dictionary)) !== an))) throw Error(F[n]);
		}
		function mn(e, t) {
			var n = new pn(t);
			if (n.push(e, !0), n.err) throw n.msg || F[n.err];
			return n.result;
		}
		pn.prototype.push = function(e, t) {
			var n, r, i, a = this.strm, o = this.options.chunkSize, s = this.options.dictionary;
			if (this.ended) return !1;
			for (r = t === ~~t ? t : !0 === t ? rn : nn, tn.call(e) === "[object ArrayBuffer]" ? a.input = new Uint8Array(e) : a.input = e, a.next_in = 0, a.avail_in = a.input.length;;) {
				for (a.avail_out === 0 && (a.output = new Uint8Array(o), a.next_out = 0, a.avail_out = o), (n = $t.inflate(a, r)) === sn && s && ((n = $t.inflateSetDictionary(a, s)) === an ? n = $t.inflate(a, r) : n === ln && (n = sn)); a.avail_in > 0 && n === on && 2 & a.state.wrap && a.state.flags !== 0 && a.input[a.next_in] !== 0;) $t.inflateReset(a), n = $t.inflate(a, r);
				switch (n) {
					case cn:
					case ln:
					case sn:
					case un: return this.onEnd(n), this.ended = !0, !1;
				}
				if (i = a.avail_out, a.next_out && (a.avail_out === 0 || n === on || r > 0)) if (this.options.to === "string") {
					var c = tt(a.output, a.next_out), l = a.next_out - c, u = et(a.output, c);
					a.next_out = l, a.avail_out = o - l, l && a.output.set(a.output.subarray(c, c + l), 0), this.onData(u);
				} else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out)), a.avail_out = 0, a.next_out = 0;
				if (n !== an && n !== dn || i !== 0) {
					if (n === on) return n = $t.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, !0;
					if (a.avail_in === 0) {
						if (r === rn) return n = $t.inflateEnd(this.strm), this.onEnd(n === an ? dn : n), this.ended = !0, !1;
						break;
					}
				}
			}
			return !0;
		}, pn.prototype.onData = function(e) {
			this.chunks.push(e);
		}, pn.prototype.onEnd = function(e) {
			e === an && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ye(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
		};
		var hn = {
			Inflate: pn,
			inflate: mn,
			inflateRaw: function(e, t) {
				return (t ||= {}).raw = !0, mn(e, t);
			},
			ungzip: mn,
			constants: I
		}, gn = pt.Deflate, _n = pt.deflate, vn = pt.deflateRaw, yn = pt.gzip, bn = hn.Inflate, xn = hn.inflate, Sn = hn.inflateRaw, Cn = hn.ungzip, wn = I, Tn = {
			Deflate: gn,
			deflate: _n,
			deflateRaw: vn,
			gzip: yn,
			Inflate: bn,
			inflate: xn,
			inflateRaw: Sn,
			ungzip: Cn,
			constants: wn
		};
		e.Deflate = gn, e.Inflate = bn, e.constants = wn, e.default = Tn, e.deflate = _n, e.deflateRaw = vn, e.gzip = yn, e.inflate = xn, e.inflateRaw = Sn, e.ungzip = Cn, Object.defineProperty(e, "__esModule", { value: !0 });
	}));
})), hd = /* @__PURE__ */ N(((e) => {
	var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", n = md();
	e.uncompressInputType = t ? "uint8array" : "array", e.compressInputType = t ? "uint8array" : "array", e.magic = "\b\0", e.compress = function(e, t) {
		return n.deflateRaw(e, { level: t.level || -1 });
	}, e.uncompress = function(e) {
		return n.inflateRaw(e);
	};
})), gd = /* @__PURE__ */ N(((e) => {
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
	}, e.DEFLATE = hd();
})), _d = /* @__PURE__ */ N(((e, t) => {
	t.exports = function(e, t) {
		return typeof e == "number" ? Buffer.alloc(e) : Buffer.from(e, t);
	}, t.exports.test = function(e) {
		return Buffer.isBuffer(e);
	};
})), vd = /* @__PURE__ */ N(((e) => {
	function t(e) {
		"@babel/helpers - typeof";
		return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, t(e);
	}
	var n = pd(), r = gd(), i = _d();
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
})), yd = /* @__PURE__ */ N(((e, t) => {
	var n = vd(), r = [
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
})), bd = /* @__PURE__ */ N(((e) => {
	e.LOCAL_FILE_HEADER = "PK", e.CENTRAL_FILE_HEADER = "PK", e.CENTRAL_DIRECTORY_END = "PK", e.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", e.ZIP64_CENTRAL_DIRECTORY_END = "PK", e.DATA_DESCRIPTOR = "PK\x07\b";
})), xd = /* @__PURE__ */ N(((e) => {
	e.base64 = !1, e.binary = !1, e.dir = !1, e.createFolders = !1, e.date = null, e.compression = null, e.compressionOptions = null, e.comment = null, e.unixPermissions = null, e.dosPermissions = null;
})), Sd = /* @__PURE__ */ N(((e, t) => {
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
})), Cd = /* @__PURE__ */ N(((e) => {
	for (var t = vd(), n = pd(), r = _d(), i = Array(256), a = 0; a < 256; a++) i[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
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
})), wd = /* @__PURE__ */ N(((e, t) => {
	var n = vd();
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
})), Td = /* @__PURE__ */ N(((e, t) => {
	var n = vd();
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
})), Ed = /* @__PURE__ */ N(((e, t) => {
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
	var a = pd(), o = vd(), s = yd(), c = bd(), l = xd(), u = fd(), d = gd(), f = Sd(), p = _d(), m = Cd(), h = wd(), g = Td();
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
})), Dd = /* @__PURE__ */ N(((e, t) => {
	var n = vd();
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
})), Od = /* @__PURE__ */ N(((e, t) => {
	var n = Dd(), r = vd();
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
})), kd = /* @__PURE__ */ N(((e, t) => {
	var n = Dd();
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
})), Ad = /* @__PURE__ */ N(((e, t) => {
	var n = kd();
	function r(e) {
		e && (this.data = e, this.length = this.data.length, this.index = 0, this.zero = 0);
	}
	r.prototype = new n(), r.prototype.readData = function(e) {
		if (this.checkOffset(e), e === 0) return /* @__PURE__ */ new Uint8Array();
		var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = r;
})), jd = /* @__PURE__ */ N(((e, t) => {
	var n = Ad();
	function r(e) {
		this.data = e, this.length = this.data.length, this.index = 0, this.zero = 0;
	}
	r.prototype = new n(), r.prototype.readData = function(e) {
		this.checkOffset(e);
		var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
		return this.index += e, t;
	}, t.exports = r;
})), Md = /* @__PURE__ */ N(((e, t) => {
	var n = Od(), r = vd(), i = Sd(), a = Ed(), o = pd(), s = 0, c = 3;
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
})), Nd = /* @__PURE__ */ N(((e, t) => {
	var n = Od(), r = jd(), i = Ad(), a = kd(), o = vd(), s = bd(), c = Md(), l = pd();
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
})), Pd = /* @__PURE__ */ N(((e, t) => {
	var n = fd(), r = Cd(), i = vd(), a = Nd();
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
})), Fd = /* @__PURE__ */ N(((e) => {
	var t = vd();
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
})), Id = /* @__PURE__ */ N(((e, t) => {
	var n = fd();
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
	r.prototype = Ed(), r.prototype.load = Pd(), r.support = pd(), r.defaults = xd(), r.utils = Fd(), r.base64 = {
		encode: function(e) {
			return n.encode(e);
		},
		decode: function(e) {
			return n.decode(e);
		}
	}, r.compressions = gd(), t.exports = r, t.exports.default = r;
})), Ld = /* @__PURE__ */ P(dd(), 1), Rd = /* @__PURE__ */ P(Id(), 1), zd = /^data:image\/png;base64,([a-z0-9+/=\s]+)$/i, Bd = (e) => e.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&apos;", "'"), Vd = (e) => e.replace(/<w:p\b[\s\S]*?<\/w:p>/g, (e) => e.includes("w:pStyle w:val=\"CellTerminator\"") || e.includes("<w:drawing") || Array.from(e.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Bd(e[1]).trim()).join("") ? e : ""), Hd = /* @__PURE__ */ new Set([
	"EINLEITUNG",
	"MOTIVATION",
	"FACHLICHE_EIGNUNG",
	"UNTERNEHMENSBEZUG",
	"ZUSATZABSATZ",
	"HAUPTTEXT",
	"SCHLUSSTEXT",
	"ANSCHREIBEN_METNI",
	"EK_PARAGRAF",
	"KAPANIS"
]), Ud = (e) => {
	let t = e.file("word/document.xml");
	if (!t) return;
	let n = t.asText().replace(/<w:p\b[\s\S]*?<\/w:p>/g, (e) => {
		let t = Array.from(e.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Bd(e[1])).join("");
		if (!Array.from(t.matchAll(/\{\{([A-Z0-9_]+)\}\}/g), (e) => e[1]).some((e) => Hd.has(e))) return e;
		let n = "<w:jc w:val=\"both\"/>", r = e;
		return r = /<w:pPr\b[^>]*>[\s\S]*?<\/w:pPr>/.test(r) ? r.replace(/<w:pPr\b([^>]*)>([\s\S]*?)<\/w:pPr>/, (e, t, r) => `<w:pPr${t}>${/<w:jc\b[^>]*(?:\/>|>[\s\S]*?<\/w:jc>)/.test(r) ? r.replace(/<w:jc\b[^>]*(?:\/>|>[\s\S]*?<\/w:jc>)/, n) : `${r}${n}`}</w:pPr>`) : /<w:pPr\b[^>]*\/>/.test(r) ? r.replace(/<w:pPr\b([^>]*)\/>/, `<w:pPr$1>${n}</w:pPr>`) : r.replace(/^(<w:p\b[^>]*>)/, `$1<w:pPr>${n}</w:pPr>`), r;
	});
	e.file("word/document.xml", n);
}, Wd = (e) => {
	let t = [], n = [];
	for (let r of e.matchAll(/<\/?w:tbl\b[^>]*>/g)) if (r[0].startsWith("</")) {
		let e = n.pop();
		e !== void 0 && t.push({
			start: e,
			end: r.index + r[0].length
		});
	} else r[0].endsWith("/>") || n.push(r.index);
	let r = t.filter(({ start: t, end: n }) => {
		let r = e.slice(t, n);
		return !r.includes("<w:drawing") && !Array.from(r.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Bd(e[1]).trim()).join("");
	}), i = Array.from(e.matchAll(/<w:p\b[\s\S]*?<\/w:p>/g), (e) => {
		let n = e[0], r = e.index, i = r + n.length, a = Array.from(n.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Bd(e[1]).trim()).join(""), o = t.some((e) => e.start < r && e.end > i);
		return !a && !n.includes("<w:drawing") && (!o || n.includes("w:pStyle w:val=\"ListBullet\"")) ? {
			start: r,
			end: i
		} : null;
	}).filter((e) => !!e);
	return [...r, ...i].filter((e, t, n) => !n.some((t) => t.start < e.start && t.end > e.end)).sort((e, t) => t.start - e.start).reduce((e, t) => e.slice(0, t.start) + e.slice(t.end), e);
}, Gd = (e) => {
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
}, Kd = (e, t) => {
	let n = e?.replace("#", "").toUpperCase();
	return n && /^[0-9A-F]{6}$/.test(n) ? n : t;
}, qd = (e, t, n) => {
	let r = e === nc.id ? /* @__PURE__ */ new Map([["073C8C", Kd(n.DESIGN_PRIMARY, "073C8C")], ["FF6A00", Kd(n.DESIGN_ACCENT, "FF6A00")]]) : e === rc.id ? /* @__PURE__ */ new Map([
		["0A3485", Kd(n.DESIGN_PRIMARY, "0A3485")],
		["FF6500", Kd(n.DESIGN_ACCENT, "FF6500")],
		["FFD8BF", Kd(n.DESIGN_SOFT_ACCENT, "FFD8BF")]
	]) : e === ic.id ? /* @__PURE__ */ new Map([
		["36B873", Kd(n.DESIGN_PRIMARY, "36B873")],
		["075E50", Kd(n.DESIGN_ACCENT, "075E50")],
		["D9F2E5", Kd(n.DESIGN_SOFT_ACCENT, "D9F2E5")]
	]) : e === ac.id ? /* @__PURE__ */ new Map([
		["073B8F", Kd(n.DESIGN_PRIMARY, "0B3485")],
		["4AA7F5", Kd(n.DESIGN_ACCENT, "4AAAF4")],
		["EAF6FD", Kd(n.DESIGN_SOFT_ACCENT, "EAF5FD")]
	]) : e === oc.id ? /* @__PURE__ */ new Map([
		["2B2F32", Kd(n.DESIGN_PRIMARY, "2B2F32")],
		["00AFC5", Kd(n.DESIGN_ACCENT, "00AFC5")],
		["CDEFF3", Kd(n.DESIGN_SOFT_ACCENT, "CDEFF3")]
	]) : e === tc.id ? /* @__PURE__ */ new Map([
		["154F45", Kd(n.DESIGN_PRIMARY, "154F45")],
		["39B774", Kd(n.DESIGN_PRIMARY, "39B774")],
		["E4EBE8", Kd(n.DESIGN_SOFT_ACCENT, "E4EBE8")]
	]) : /* @__PURE__ */ new Map([
		["0F5B4A", Kd(n.DESIGN_PRIMARY, "0F5B4A")],
		["36B779", Kd(n.DESIGN_ACCENT, "36B779")],
		["CDEEDF", Kd(n.DESIGN_SOFT_ACCENT, "CDEEDF")],
		["9DDBB9", Kd(n.DESIGN_TITLE_BACKGROUND, "9DDBB9")]
	]), i = n.DESIGN_FONT?.trim() || "Arial";
	for (let e of Object.keys(t.files)) {
		if (!/^word\/.*\.xml$/i.test(e)) continue;
		let n = t.file(e);
		if (!n) continue;
		let a = n.asText();
		for (let [e, t] of r) a = a.replaceAll(e, t);
		a = a.replaceAll("w:ascii=\"Arial\"", `w:ascii="${i}"`).replaceAll("w:hAnsi=\"Arial\"", `w:hAnsi="${i}"`).replaceAll("w:cs=\"Arial\"", `w:cs="${i}"`), t.file(e, a);
	}
}, Jd = (e) => e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Yd = (e) => {
	let t = e.trim();
	return t ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? `mailto:${t}` : /^\+?[\d\s()./-]{7,}$/.test(t) ? `tel:${t.replace(/[^\d+]/g, "")}` : /^https?:\/\//i.test(t) ? t : /^(?:www\.|linkedin\.com\/|github\.com\/|[\w.-]+\.[a-z]{2,}(?:\/|$))/i.test(t) ? `https://${t}` : null : null;
}, Xd = (e, t) => {
	for (let n of Object.keys(e.files)) {
		if (!/^word\/_rels\/.*\.rels$/i.test(n)) continue;
		let r = e.file(n);
		if (!r) continue;
		let i = r.asText().replace(/Target="([^"]*(?:\{\{|%7B%7B)[A-Z0-9_]+(?:\}\}|%7D%7D)[^"]*)"/gi, (e, n) => {
			let r = n;
			try {
				r = decodeURIComponent(n);
			} catch {}
			let i = r.match(/\{\{([A-Z0-9_]+)\}\}/i)?.[1];
			if (!i) return e;
			let a = Yd(t[i] ?? "");
			return a ? `Target="${Jd(a)}"` : "Target=\"about:blank\"";
		});
		e.file(n, i);
	}
}, Zd = (e, t) => {
	let n = e.file("word/document.xml"), r = e.file("word/_rels/document.xml.rels");
	if (!n || !r) return;
	let i = n.asText(), a = r.asText(), o = Number(t.DESIGN_MARGIN_VERTICAL_MM), s = Number(t.DESIGN_MARGIN_HORIZONTAL_MM);
	if (Number.isFinite(o) && o >= 10 && o <= 25 && Number.isFinite(s) && s >= 13 && s <= 25) {
		let e = Math.round(o / 25.4 * 1440), t = Math.round(s / 25.4 * 1440);
		i = i.replace(/<w:pgMar\b[^>]*\/>/, (n) => n.replace(/w:top="[^"]*"/, `w:top="${e}"`).replace(/w:bottom="[^"]*"/, `w:bottom="${e}"`).replace(/w:left="[^"]*"/, `w:left="${t}"`).replace(/w:right="[^"]*"/, `w:right="${t}"`));
	}
	if (t.DEKORATION_AKTIV?.trim().toLowerCase() === "false") {
		let e = i.match(/<w:drawing>[\s\S]*?<\/w:drawing>/g)?.find((e) => e.includes("KOMPAKT_DEKORATION"));
		e && (i = Vd(i.replace(e, "")));
	}
	let c = 0;
	i = i.replace(/<w:p\b[\s\S]*?<\/w:p>/g, (e) => {
		if (!e.includes("w:pStyle w:val=\"ContactLink\"") || e.includes("<w:hyperlink")) return e;
		let t = Yd(Array.from(e.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g), (e) => Bd(e[1])).join("").trim());
		if (!t) return e;
		c += 1;
		let n = `rIdKompaktLink${c}`;
		return a = a.replace("</Relationships>", `<Relationship Id="${n}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${Jd(t)}" TargetMode="External"/></Relationships>`), e.replace(/(<w:r\b[\s\S]*?<\/w:r>)/, `<w:hyperlink r:id="${n}" w:history="1">$1</w:hyperlink>`);
	}), e.file("word/document.xml", i), e.file("word/_rels/document.xml.rels", a);
}, Qd = (t, n, r = !0) => {
	let i = t.file("word/document.xml"), a = t.file("word/_rels/document.xml.rels");
	if (!i || !a) return { found: !1 };
	let o = i.asText(), s = o.match(/<w:drawing>[\s\S]*?<\/w:drawing>/g)?.find((e) => /<wp:docPr\b[^>]*(?:descr|title)="PROFILFOTO"[^>]*\/>/.test(e));
	if (!s) return { found: !1 };
	let c = s.match(/<a:blip\b[^>]*r:embed="([^"]+)"/)?.[1], l = n.match(zd)?.[1];
	if (!c || !l) return o = o.replace(s, ""), t.file("word/document.xml", r ? Vd(o) : o), { found: !0 };
	let u = a.asText(), d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), f = u.match(RegExp(`<Relationship\\b(?=[^>]*\\bId="${d}")(?=[^>]*\\bTarget="([^"]+)")[^>]*/>`))?.[1];
	if (!f) return o = o.replace(s, ""), t.file("word/document.xml", r ? Vd(o) : o), { found: !0 };
	let p = Buffer.from(l.replace(/\s/g, ""), "base64");
	t.file(e.posix.join("word", f), p);
	let m = Gd(p), h = `<a:srcRect l="${m.left}" t="${m.top}" r="${m.right}" b="${m.bottom}"/>`, g = s.replace(/(<a:blip\b[^>]*\/>)(?:<a:srcRect\b[^>]*\/>)?/, `$1${h}`);
	return o = o.replace(s, g), t.file("word/document.xml", r ? Vd(o) : o), { found: !0 };
}, $d = class {
	async createDocument(t, n, r) {
		if (t.extension === ".doc") return await o(t.filePath, n), {
			templateId: t.id,
			fileName: e.basename(n),
			filePath: n,
			extension: ".doc",
			replacedPlaceholders: [],
			warning: "Das ältere DOC-Format wurde sicher kopiert. Platzhalter werden in DOC-Dateien nicht automatisch ersetzt."
		};
		try {
			let i = new Rd.default(await l(t.filePath));
			if (t.extension === ".dotx") {
				let e = i.file("[Content_Types].xml");
				e && i.file("[Content_Types].xml", e.asText().replace("application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"));
			}
			t.documentType === "anschreiben" && Ud(i);
			let a = new Ld.default(i, {
				paragraphLoop: !0,
				linebreaks: !0,
				delimiters: {
					start: "{{",
					end: "}}"
				},
				nullGetter: (e) => `{{${e.value}}}`
			}), o = a.getFullText(), s = Object.keys(lc), c = Object.fromEntries([
				...Object.entries(r),
				...pc.map((e) => [e, r[e] ?? ""]),
				...s.map((e) => [e, r[e] ?? r[lc[e]] ?? ""])
			]);
			if (t.documentType === "anschreiben" && !o.includes("{{ZUSATZABSATZ}}") && !o.includes("{{EK_PARAGRAF}}") && c.ZUSATZABSATZ?.trim() && (c.SCHLUSSTEXT = [c.ZUSATZABSATZ, c.SCHLUSSTEXT].filter((e) => e?.trim()).join("\n\n")), t.id === oc.id) for (let [e, t] of [
				["KENNTNISSE_TITEL", ["KENNTNISSE"]],
				["SPRACHEN_TITEL", [
					"SPRACHEN_ATS",
					"SPRACHE_1",
					"SPRACHE_2",
					"SPRACHE_3"
				]],
				["STAERKEN_TITEL", [
					"STAERKEN_ATS",
					"STAERKE_1_TITEL",
					"STAERKE_2_TITEL",
					"STAERKE_3_TITEL"
				]],
				["ZERTIFIKATE_TITEL", ["ZERTIFIKATE"]]
			]) t.some((e) => c[e]?.trim()) || (c[e] = "");
			let u = [...pc, ...s].filter((e) => o.includes(`{{${e}}}`));
			a.render(c);
			let d = a.getZip();
			if ((t.id === Qs.id || t.id === tc.id || t.id === nc.id || t.id === rc.id || t.id === ic.id || t.id === ac.id || t.id === oc.id || t.id === $s.id) && qd(t.id, d, r), t.id === rc.id && Zd(d, r), !Qd(d, r.PROFILFOTO ?? "", t.id !== oc.id).found && t.documentType === "lebenslauf" && t.id !== oc.id) {
				let e = d.file("word/document.xml");
				e && d.file("word/document.xml", Vd(e.asText()));
			} else u.push("PROFILFOTO");
			if (t.id === oc.id) {
				Xd(d, r);
				let e = d.file("word/document.xml");
				if (e) {
					let t = e.asText();
					d.file("word/document.xml", Wd(t));
				}
			}
			return await h(n, d.generate({
				type: "nodebuffer",
				compression: "DEFLATE"
			})), {
				templateId: t.id,
				fileName: e.basename(n),
				filePath: n,
				extension: ".docx",
				replacedPlaceholders: u
			};
		} catch (e) {
			throw e instanceof xu ? e : new xu(`Die Word-Vorlage ist beschädigt oder enthält ungültige Platzhalter. ${Su(e).message}`, "CORRUPT");
		}
	}
}, ef = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;"), tf = class {
	constructor(e) {
		this.paths = e;
	}
	async generate(t) {
		await s(this.paths.previewCache, { recursive: !0 });
		let n = new Date(t.modifiedAt ?? 0).getTime(), r = t.id === Zs.id ? Zs : t.id === Qs.id ? Qs : t.id === tc.id ? tc : t.id === nc.id ? nc : t.id === rc.id ? rc : t.id === ic.id ? ic : t.id === ac.id ? ac : t.id === oc.id ? oc : t.id === sc.id ? sc : t.id === $s.id ? $s : void 0;
		if (r && this.paths.bundledTemplatesRoot) try {
			let i = await l(e.join(this.paths.bundledTemplatesRoot, r.previewFileName)), a = e.join(this.paths.previewCache, `${t.id}-${n}.png`);
			return await h(a, i), {
				previewImagePath: a,
				previewDataUrl: `data:image/png;base64,${i.toString("base64")}`
			};
		} catch {}
		let i = `${t.id}-${n}.svg`, a = e.join(this.paths.previewCache, i), o = t.documentType === "anschreiben" ? "ANSCHREIBEN" : t.documentType === "deckblatt" ? "DECKBLATT" : "LEBENSLAUF", c = t.modifiedAt ? new Intl.DateTimeFormat("de-DE", {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(t.modifiedAt)) : "Änderungsdatum unbekannt", u = Js[t.source], d = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="594" viewBox="0 0 420 594">
      <rect width="420" height="594" rx="8" fill="#fff"/>
      <rect x="34" y="38" width="352" height="5" rx="2.5" fill="#2b579a"/>
      <text x="34" y="76" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#2b579a">${o}</text>
      <rect x="34" y="92" width="44" height="50" rx="4" fill="#2b579a"/>
      <text x="48" y="126" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#fff">W</text>
      <text x="92" y="116" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="#1d2927">${ef(t.name.slice(0, 23))}</text>
      <text x="92" y="138" font-family="Arial,sans-serif" font-size="11" fill="#71807c">${ef(t.format.toUpperCase())} &#183; ${ef(u)}</text>
      <rect x="34" y="160" width="330" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="174" width="310" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="218" width="170" height="9" rx="4" fill="#9aaba6"/>
      ${Array.from({ length: 12 }, (e, t) => `<rect x="34" y="${246 + t * 20}" width="${t % 3 == 0 ? 330 : 300}" height="6" rx="3" fill="#e5ebe9"/>`).join("")}
      <text x="34" y="540" font-family="Arial,sans-serif" font-size="12" fill="#71807c">Geändert: ${ef(c)}</text>
      <text x="34" y="560" font-family="Arial,sans-serif" font-size="12" fill="#71807c">${ef(t.format.toUpperCase())} &#183; ${ef(u)}</text>
    </svg>`;
		try {
			await l(a);
		} catch {
			await h(a, d, "utf8");
			let n = await import("node:fs/promises").then((e) => e.readdir(this.paths.previewCache));
			await Promise.all(n.filter((e) => e.startsWith(`${t.id}-`) && e !== i).map((t) => f(e.join(this.paths.previewCache, t), { force: !0 })));
		}
		return {
			previewImagePath: a,
			previewDataUrl: `data:image/svg+xml;base64,${Buffer.from(d).toString("base64")}`
		};
	}
}, nf = (t) => E("sha256").update(e.resolve(t).toLocaleLowerCase("de-DE")).digest("hex"), rf = ({ filePath: t, extension: n, documentType: r, source: i, fileSize: a, createdAt: o, modifiedAt: s, metadata: c }) => {
	let l = e.basename(t), u = e.basename(t, n).replaceAll("_", " ").replaceAll("-", " ");
	return {
		id: c.id?.trim() || nf(t),
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
}, af = (t) => {
	let n = e.extname(t).toLowerCase();
	if (!qs.has(n)) throw new xu("Dieses Dateiformat wird nicht als Word-Vorlage unterstützt.", "INVALID_FORMAT");
	return n;
}, of = (t, n) => {
	let r = e.resolve(t), i = e.resolve(n);
	return i === r || i.startsWith(`${r}${e.sep}`);
}, sf = (e, t) => {
	if (![
		e.anschreibenTemplates,
		e.deckblattTemplates,
		e.lebenslaufTemplates,
		e.anschreibenDocuments,
		e.systemTemplateCache
	].some((e) => of(e, t))) throw new xu("Ungültiger Vorlagenpfad.", "INVALID_PATH");
	af(t);
}, cf = async (e, t) => {
	sf(e, t);
	let n = await m(t);
	if (!n.isFile()) throw new xu("Die Vorlage ist keine Datei.", "INVALID_FORMAT");
	if (n.size > 26214400) throw new xu("Die Vorlage darf höchstens 25 MB groß sein.", "FILE_TOO_LARGE");
	return n;
}, lf = async (e, t = 3) => {
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
	throw Su(n);
}, uf = (t) => `${t.slice(0, -e.extname(t).length)}.template.json`, df = async (e) => {
	try {
		let t = JSON.parse(await l(uf(e), "utf8"));
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
}, ff = async (t) => {
	let n = [], r = [t];
	for (; r.length;) {
		let t = r.pop(), i = await u(t, { withFileTypes: !0 });
		for (let a of i) {
			let i = e.join(t, a.name);
			a.isDirectory() && r.push(i), a.isFile() && n.push(i);
		}
	}
	return n;
}, pf = (e) => [...e].sort((e, t) => e.name.localeCompare(t.name, "de", { sensitivity: "base" })), mf = class {
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
				i = await lf(() => ff(r.root));
			} catch (t) {
				n.push(t instanceof Error ? `${e.basename(r.root)}: ${t.message}` : `${e.basename(r.root)} konnte nicht gelesen werden.`);
				continue;
			}
			for (let a of i) {
				let i;
				try {
					i = af(a);
				} catch {
					continue;
				}
				try {
					let e = await lf(() => cf(this.paths, a));
					if (e.size > 26214400) continue;
					t.push(rf({
						filePath: a,
						extension: i,
						documentType: r.documentType,
						source: r.source,
						fileSize: e.size,
						createdAt: e.birthtime.toISOString(),
						modifiedAt: e.mtime.toISOString(),
						metadata: await df(a)
					}));
				} catch (t) {
					n.push(t instanceof Error ? `${e.basename(a)}: ${t.message}` : `${e.basename(a)} konnte nicht gelesen werden.`);
				}
			}
		}
		return {
			templates: pf(t),
			warnings: n
		};
	}
	async scanTemplatesByType(e) {
		return (await this.scanAllTemplates()).templates.filter((t) => t.documentType === e);
	}
	async scanExistingAnschreiben() {
		return (await this.scanAllTemplates()).templates.filter((e) => e.source === "existing-document");
	}
}, hf = (e) => typeof e == "object" && e && "code" in e ? String(e.code) : "", gf = (e) => e === "word-lebenslauf-einfach" ? ac.id : e, _f = class {
	constructor(e) {
		this.paths = e, this.templates = [], this.scanner = new mf(e), this.previewService = new tf(e);
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
		].map((e) => s(e, { recursive: !0 }))), await this.ensureWordMusterTemplate(), await this.ensureZeitgenoessischLebenslaufTemplate(), await this.ensureKreativLebenslaufTemplate(), await this.ensureIvyLeagueLebenslaufTemplate(), await this.ensureKompaktLebenslaufTemplate(), await this.ensureStilvollLebenslaufTemplate(), await this.ensureEinspaltigLebenslaufTemplate(), await this.ensureKlassischLebenslaufTemplate(), await this.ensureMehrspaltigLebenslaufTemplate(), await this.ensureElegantLebenslaufTemplate(), await this.ensureGepflegtLebenslaufTemplate(), await this.ensureModernLebenslaufTemplate(), this.refresh();
	}
	async ensureWordMusterTemplate() {
		let t = e.join(this.paths.anschreibenTemplates, Xs.fileName);
		try {
			await i(t);
		} catch {
			let n = e.join(this.paths.anschreibenDocuments, Xs.fileName);
			try {
				await i(n);
			} catch {
				return;
			}
			await lf(() => o(n, t));
		}
		await this.writeMetadata(t, {
			id: Xs.id,
			name: Xs.name,
			documentType: Xs.documentType,
			format: Xs.format,
			source: Xs.source,
			sortOrder: Xs.sortOrder,
			description: Xs.description,
			tags: [...Xs.tags],
			isSystemTemplate: Xs.isSystemTemplate,
			supportsPreview: Xs.supportsPreview,
			supportsPlaceholders: Xs.supportsPlaceholders,
			editableInWord: Xs.editableInWord,
			isProtected: Xs.isProtected
		});
	}
	async copyBundledTemplateIfMissing(n, r) {
		try {
			return await i(r), !0;
		} catch (e) {
			if (hf(e) !== "ENOENT") throw e;
		}
		if (!this.paths.bundledTemplatesRoot) return !1;
		let a = e.join(this.paths.bundledTemplatesRoot, n);
		try {
			await i(a);
		} catch (e) {
			if (hf(e) === "ENOENT") return !1;
			throw e;
		}
		return await lf(async () => {
			try {
				await o(a, r, t.COPYFILE_EXCL);
			} catch (e) {
				if (hf(e) !== "EEXIST") throw e;
			}
		}), !0;
	}
	async ensureElegantLebenslaufTemplate() {
		let t = e.join(this.paths.lebenslaufTemplates, Zs.fileName);
		await this.copyBundledTemplateIfMissing(Zs.fileName, t) && (await this.copyBundledTemplateIfMissing(Zs.atsFileName, e.join(this.paths.systemTemplateCache, Zs.atsFileName)), await this.writeMetadata(t, {
			id: Zs.id,
			name: Zs.name,
			documentType: Zs.documentType,
			format: Zs.format,
			source: Zs.source,
			sortOrder: Zs.sortOrder,
			description: Zs.description,
			tags: [...Zs.tags],
			isSystemTemplate: Zs.isSystemTemplate,
			supportsPreview: Zs.supportsPreview,
			supportsPlaceholders: Zs.supportsPlaceholders,
			editableInWord: Zs.editableInWord,
			isProtected: Zs.isProtected,
			category: Zs.category,
			layout: Zs.layout,
			atsFriendly: Zs.atsFriendly,
			supportsPhoto: Zs.supportsPhoto,
			supportsAtsMode: Zs.supportsAtsMode
		}));
	}
	async ensureZeitgenoessischLebenslaufTemplate() {
		let t = Qs, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
		let t = tc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
	async ensureIvyLeagueLebenslaufTemplate() {
		let t = nc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
		let t = rc, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
	async ensureStilvollLebenslaufTemplate() {
		await this.ensureManagedResumeTemplate(ic);
	}
	async ensureEinspaltigLebenslaufTemplate() {
		await this.ensureManagedResumeTemplate(ac);
	}
	async ensureKlassischLebenslaufTemplate() {
		await this.ensureManagedResumeTemplate(oc);
	}
	async ensureMehrspaltigLebenslaufTemplate() {
		await this.ensureManagedResumeTemplate(sc);
	}
	async ensureManagedResumeTemplate(t) {
		let n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
		let t = $s, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
		let t = ec, n = e.join(this.paths.lebenslaufTemplates, t.fileName);
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
		let t = gf(e), n = this.templates.find((e) => e.id === t);
		return n ||= (await this.refresh(), this.templates.find((e) => e.id === t)), n ? structuredClone(n) : null;
	}
	async listByType(e) {
		return this.templates.length || await this.refresh(), structuredClone(this.templates.filter((t) => t.documentType === e));
	}
	async listExistingDocuments() {
		return this.templates.length || await this.refresh(), structuredClone(this.templates.filter((e) => e.source === "existing-document"));
	}
	async readMetadata(e) {
		try {
			return JSON.parse(await l(uf(e), "utf8"));
		} catch {
			return {};
		}
	}
	async writeMetadata(e, t) {
		let n = {
			...await this.readMetadata(e),
			...t
		};
		await lf(() => h(uf(e), JSON.stringify(n, null, 2), "utf8"));
	}
}, vf = class {
	constructor(e) {
		this.paths = e, this.placeholderService = new $d(), this.repository = new _f(e);
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
	async addExternalTemplate(t, n, r) {
		let i = af(t), a = await m(t);
		if (!a.isFile()) throw new xu("Die ausgewählte Vorlage ist keine Datei.", "INVALID_FORMAT");
		if (a.size > 26214400) throw new xu("Die Vorlage darf höchstens 25 MB groß sein.", "FILE_TOO_LARGE");
		let c = this.rootForType(n);
		await s(c, { recursive: !0 });
		let l = r || e.basename(t, i), u = await Tu(c, l, i);
		await lf(() => o(t, u)), await this.repository.writeMetadata(u, {
			name: l.replaceAll("_", " "),
			documentType: n,
			tags: [],
			isFavorite: !1,
			isSystemTemplate: !1,
			sortOrder: Ys,
			supportsPreview: !0,
			supportsPlaceholders: i !== ".doc",
			editableInWord: !0,
			isProtected: !1
		}), await this.repository.refresh();
		let d = this.repository.list().find((e) => e.filePath === u);
		if (!d) throw new xu("Die Vorlage konnte nicht hinzugefügt werden.", "NOT_FOUND");
		return d;
	}
	async copyExistingDocumentToTemplates(e, t) {
		sf(this.paths, e);
		let n = this.repository.list().find((t) => t.filePath === e && t.source === "existing-document");
		if (!n) throw new xu("Das Anschreiben wurde nicht in den eigenen Dokumenten gefunden.", "NOT_FOUND");
		return this.addExternalTemplate(n.filePath, "anschreiben", t || n.name);
	}
	async copyExistingTemplateById(e, t) {
		let n = await this.requireTemplate(e);
		if (n.source !== "existing-document") throw new xu("Nur eigene Anschreiben können zu Muster hinzugefügt werden.", "INVALID_PATH");
		return this.copyExistingDocumentToTemplates(n.filePath, t);
	}
	async duplicateTemplate(t) {
		let n = await this.requireTemplate(t), r = await Tu(e.dirname(n.filePath), `${e.basename(n.fileName, n.extension)}_Kopie`, n.extension);
		return await lf(() => o(n.filePath, r)), n.source !== "existing-document" && await this.repository.writeMetadata(r, {
			...await this.repository.readMetadata(n.filePath),
			id: void 0,
			name: `${n.name} Kopie`,
			source: "muster-folder",
			sortOrder: Ys,
			isSystemTemplate: !1,
			isProtected: !1
		}), await this.repository.refresh(), this.repository.list().find((e) => e.filePath === r) ?? null;
	}
	async createDocumentFromTemplate(t, n, r, i, a = {}) {
		let o = await this.requireTemplate(t);
		if (![
			this.paths.applicationsData,
			this.paths.anschreibenDocuments,
			this.paths.lebenslaufDocuments,
			this.paths.absagenRoot
		].some((e) => of(e, n))) throw new xu("Ungültiger Zielordner.", "INVALID_PATH");
		let c = o, l, u = o.id === Zs.id ? Zs : o.id === Qs.id ? Qs : o.id === tc.id ? tc : o.id === nc.id ? nc : o.id === rc.id ? rc : o.id === ic.id ? ic : o.id === ac.id ? ac : o.id === oc.id ? oc : o.id === sc.id ? sc : o.id === $s.id ? $s : void 0;
		if (u && a.atsMode) {
			let t = e.join(this.paths.systemTemplateCache, u.atsFileName);
			try {
				await cf(this.paths, t), c = {
					...o,
					filePath: t
				};
			} catch {
				l = `Die ATS-Variante war nicht verfügbar. Die Standardvorlage „${u.name}“ wurde verwendet.`;
			}
		}
		await cf(this.paths, c.filePath), await s(n, { recursive: !0 });
		let d = o.extension === ".doc" ? ".doc" : ".docx", f = i.BEWERBER_VORNAME ?? i.VORNAME ?? "", p = i.BEWERBER_NACHNAME ?? i.NACHNAME ?? "", m = await Tu(n, `${Cu(u ? `Lebenslauf_${f}_${p}` : r)}_${wu()}`, d), h = await lf(() => this.placeholderService.createDocument(c, m, i)), g = Object.entries(i).filter(([e]) => /^(ZUSAMMENFASSUNG|BESCHREIBUNG_\d+|ERFOLG_\d+_\d+|ERFOLG_HIGHLIGHT_\d+_(?:TITEL|BESCHREIBUNG)|STAERKE_\d+_BESCHREIBUNG|KENNTNIS_EINTRAEGE_\d+)$/.test(e)).reduce((e, [, t]) => e + t.trim().length, 0), _ = Array.from({ length: 8 }, (e, t) => i[`POSITION_${t + 1}`]?.trim() ?? "").filter(Boolean).length, v = o.id === tc.id && !a.atsMode && (g > 3200 || _ > 4) ? "Der Inhalt passt möglicherweise nicht vollständig auf eine Seite. Bitte kürzen Sie einzelne Beschreibungen oder erlauben Sie eine zweite Seite." : void 0, y = o.id === rc.id && !a.atsMode && (g > 3700 || _ > 5) ? "Der Inhalt passt nicht vollständig auf eine Seite. Bitte kürzen Sie einzelne Beschreibungen oder erlauben Sie eine zweite Seite." : void 0, b = o.id === rc.id && (i.ZUSAMMENFASSUNG?.trim().length ?? 0) > 600 ? "Die Zusammenfassung überschreitet die empfohlenen 600 Zeichen." : void 0, x = (e) => e.toLocaleLowerCase("de-DE").replace(/[^\p{L}\p{N}]+/gu, " ").trim(), S = new Set(Object.entries(i).filter(([e, t]) => /^ERFOLG_\d+_\d+$/.test(e) && !!t.trim()).map(([, e]) => x(e))), C = o.id === rc.id && Object.entries(i).filter(([e, t]) => /^ERFOLG_HIGHLIGHT_\d+_BESCHREIBUNG$/.test(e) && !!t.trim()).some(([, e]) => S.has(x(e))) ? "Ein hervorgehobener Erfolg wird bereits in der Berufserfahrung verwendet." : void 0, w = [
			l,
			v,
			y,
			b,
			C
		].filter((e) => !!e).join(" ");
		return w ? {
			...h,
			warning: w
		} : h;
	}
	async synchronizeDocumentFromTemplate(t, n, r, i) {
		let a = await this.requireTemplate(t);
		if (![
			this.paths.applicationsData,
			this.paths.anschreibenDocuments,
			this.paths.lebenslaufDocuments,
			this.paths.absagenRoot
		].some((e) => of(e, n))) throw new xu("Ungültiger Zielordner.", "INVALID_PATH");
		await cf(this.paths, a.filePath), await s(n, { recursive: !0 });
		let o = a.extension === ".doc" ? ".doc" : ".docx", c = e.join(n, `${Cu(r)}${o}`);
		return lf(() => this.placeholderService.createDocument(a, c, i));
	}
	async toggleTemplateFavorite(e) {
		let t = await this.requireTemplate(e);
		return await this.repository.writeMetadata(t.filePath, { isFavorite: !t.isFavorite }), this.repository.refresh();
	}
	async deleteCustomTemplate(e) {
		let t = await this.requireTemplate(e);
		if (t.isProtected) throw new xu("Diese Word-Vorlage ist geschützt und kann nicht gelöscht werden.", "PROTECTED_TEMPLATE");
		if (t.isSystemTemplate) throw new xu("Systemvorlagen können nicht gelöscht werden.", "SYSTEM_TEMPLATE");
		if (t.source !== "muster-folder") throw new xu("Eigene Dokumente werden an dieser Stelle nicht gelöscht.", "INVALID_PATH");
		return await f(t.filePath), await f(uf(t.filePath), { force: !0 }), this.repository.refresh();
	}
	async generateTemplatePreview(e) {
		return (await this.requireTemplate(e)).previewDataUrl ?? null;
	}
	async requireTemplate(e) {
		let t = await this.repository.getById(e);
		if (!t) throw new xu("Vorlage wurde nicht gefunden.", "NOT_FOUND");
		return t;
	}
}, yf = D(O), bf = "param(\n  [Parameter(Mandatory = $true)][string]$RepositoryPath,\n  [Parameter(Mandatory = $true)][string]$RemoteUrl,\n  [Parameter(Mandatory = $true)][string]$CommitMessage\n)\n\n$ErrorActionPreference = \"Stop\"\n\nfunction Invoke-Git {\n  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArguments)\n  & git -C $RepositoryPath @GitArguments\n  if ($LASTEXITCODE -ne 0) {\n    throw \"git $($GitArguments -join ' ') failed with exit code $LASTEXITCODE.\"\n  }\n}\n\n$insideWorkTree = & git -C $RepositoryPath rev-parse --is-inside-work-tree 2>$null\nif ($LASTEXITCODE -ne 0 -or $insideWorkTree.Trim() -ne \"true\") {\n  throw \"No Git repository found at $RepositoryPath.\"\n}\n\n$remotes = @(& git -C $RepositoryPath remote)\nif ($LASTEXITCODE -ne 0) {\n  throw \"Unable to list Git remotes.\"\n}\nif ($remotes -notcontains \"origin\") {\n  Invoke-Git remote add origin $RemoteUrl\n} else {\n  $originUrl = & git -C $RepositoryPath remote get-url origin\n  if ($LASTEXITCODE -ne 0) {\n    throw \"Unable to read the origin URL.\"\n  }\n  if ($originUrl.Trim() -ne $RemoteUrl) {\n    Invoke-Git remote set-url origin $RemoteUrl\n  }\n}\n\n$remoteMain = @(& git -C $RepositoryPath ls-remote --heads origin main)\nif ($LASTEXITCODE -ne 0) {\n  throw \"Unable to read origin/main.\"\n}\nif ($remoteMain.Count -gt 0) {\n  Invoke-Git pull --rebase --autostash origin main\n}\n\nInvoke-Git add --all\n& git -C $RepositoryPath diff --cached --quiet\n$diffExitCode = $LASTEXITCODE\nif ($diffExitCode -eq 0) {\n  exit 0\n}\nif ($diffExitCode -ne 1) {\n  throw \"git diff --cached --quiet failed with exit code $diffExitCode.\"\n}\n\nInvoke-Git commit --message $CommitMessage\n& git -C $RepositoryPath push origin HEAD:main\nif ($LASTEXITCODE -ne 0) {\n  Invoke-Git pull --rebase --autostash origin main\n  Invoke-Git push origin HEAD:main\n}\n", xf = async (e, t, n, r) => {
	await yf("powershell.exe", [
		"-NoProfile",
		"-NonInteractive",
		"-ExecutionPolicy",
		"Bypass",
		"-File",
		e,
		"-RepositoryPath",
		t,
		"-RemoteUrl",
		n,
		"-CommitMessage",
		r
	], {
		windowsHide: !0,
		timeout: 12e4,
		maxBuffer: 1024 * 1024
	});
}, Sf = (e) => {
	let t = (e) => String(e).padStart(2, "0");
	return [`${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, `${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`].join(" ");
}, Cf = (e, t, n = /* @__PURE__ */ new Date()) => `${e.replace(/[\r\n|]+/g, " ").replace(/\s+/g, " ").trim() || "Bewerbung"} | ${Sf(n)} | ${t}`, wf = (e) => {
	let t = e.split(/[\\/]+/).filter(Boolean), n = t.findIndex((e, n) => [
		"Anschreiben",
		"Lebenslauf",
		"Absagen",
		"Vorstellungsgespräch"
	].includes(e) || e === "Bewerbungen" && t[n - 1] === "data");
	return (n >= 0 ? t[n + 1] : void 0)?.replace(/_(?:\d{4}-\d{2}-\d{2}|Termin_offen)$/, "").replace(/_/g, " ") || "BewerbungsManager";
}, Tf = (t) => {
	let n = t.replace(/\\/g, "/"), r = e.basename(n);
	return n.startsWith(".git/") || n.startsWith("data/Logs/") || n.startsWith("data/Electron/") || n.startsWith("data/ElectronSession/") || n.startsWith("data/CrashDumps/") || n.startsWith("data/cache/") || r.startsWith("~$") || /\.(?:tmp|temp|log|bak)$/i.test(r);
}, Ef = class {
	constructor(t, n = {}) {
		this.repositoryPath = t, this.pending = Promise.resolve(), this.pendingWatchCompany = "BewerbungsManager", this.remoteUrl = n.remoteUrl ?? "https://github.com/mustafa-oezdemir/bewerbung.git", this.runner = n.runner ?? xf, this.watchFileChanges = n.watchFileChanges ?? !0, this.now = n.now ?? (() => /* @__PURE__ */ new Date()), this.scriptPath = e.join(t, "data", "Settings", "auto-git-sync.ps1"), this.logPath = e.join(t, "data", "Logs", "git-automation.log");
	}
	async initialize() {
		await s(e.dirname(this.scriptPath), { recursive: !0 }), await s(e.dirname(this.logPath), { recursive: !0 }), await h(this.scriptPath, bf, "utf8"), this.watchFileChanges && this.startWatcher();
	}
	queueCommit(e, t) {
		let n = Cf(e, t, this.now());
		this.pending = this.pending.then(() => this.runner(this.scriptPath, this.repositoryPath, this.remoteUrl, n)).catch((e) => (this.lastError = e instanceof Error ? e : Error(String(e)), this.logFailure(n, e)));
	}
	async waitForIdle() {
		if (await this.pending, this.lastError) {
			let e = this.lastError;
			throw this.lastError = void 0, e;
		}
	}
	dispose() {
		this.watchTimer && (clearTimeout(this.watchTimer), this.watchTimer = void 0, this.queueCommit(this.pendingWatchCompany, "update")), this.watcher?.close(), this.watcher = void 0;
	}
	startWatcher() {
		try {
			this.watcher = r(this.repositoryPath, { recursive: !0 }, (e, t) => {
				if (!t) return;
				let n = String(t);
				Tf(n) || (this.pendingWatchCompany = wf(n), this.watchTimer && clearTimeout(this.watchTimer), this.watchTimer = setTimeout(() => {
					this.watchTimer = void 0, this.queueCommit(this.pendingWatchCompany, "update");
				}, 2500), this.watchTimer.unref());
			}), this.watcher.on("error", (e) => {
				this.logFailure("Dateiüberwachung", e);
			});
		} catch (e) {
			this.logFailure("Dateiüberwachung", e);
		}
	}
	async logFailure(e, t) {
		let n = t instanceof Error ? t.message : String(t);
		await a(this.logPath, `[${(/* @__PURE__ */ new Date()).toISOString()}] ${e}: ${n}\n`, "utf8").catch(() => void 0);
	}
}, Df = null, $, Of, kf, Af = !1, jf = !1, Mf = /* @__PURE__ */ new Set(), Nf = "de.bewerbungsmanager.desktop", Pf = g(import.meta.url), Ff = e.dirname(Pf), If = !!process.env.VITE_DEV_SERVER_URL, Lf = gc(void 0, e.join(Ff, If ? "../public/templates" : "../dist/templates")), Rf = e.join(Lf.dataRoot, "Electron"), zf = e.join(Lf.dataRoot, "ElectronSession"), Bf = e.join(Lf.dataRoot, "Logs"), Vf = e.join(Lf.dataRoot, "CrashDumps");
for (let e of [
	Rf,
	zf,
	Bf,
	Vf
]) n(e, { recursive: !0 });
b.setPath("userData", Rf), b.setPath("sessionData", zf), b.setPath("logs", Bf), b.setPath("crashDumps", Vf), process.platform === "win32" && b.setAppUserModelId(Nf);
var Hf = async () => {
	Df = new v({
		width: 1480,
		height: 940,
		minWidth: 1060,
		minHeight: 720,
		show: !1,
		backgroundColor: "#f3f1ec",
		titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
		webPreferences: {
			preload: e.join(Ff, "preload.mjs"),
			contextIsolation: !0,
			nodeIntegration: !1,
			sandbox: !0,
			webSecurity: !0
		}
	}), Df.webContents.setWindowOpenHandler(({ url: e }) => (/^https?:\/\//i.test(e) && w.openExternal(e), { action: "deny" })), Df.webContents.on("will-navigate", (t, n) => {
		(If ? n.startsWith(process.env.VITE_DEV_SERVER_URL) : n.startsWith(_(e.join(Ff, "../dist/index.html")).toString())) || t.preventDefault();
	}), Df.once("ready-to-show", () => Df?.show()), If ? await Df.loadURL(process.env.VITE_DEV_SERVER_URL) : await Df.loadFile(e.join(Ff, "../dist/index.html"));
}, Uf = () => {
	S.handle("workspace:get", () => $.getWorkspace()), S.handle("application-draft:get", () => $.getApplicationDraft()), S.handle("application-draft:save", (e, t) => $.saveApplicationDraft(Rs.parse(t))), S.handle("application-draft:clear", () => $.clearApplicationDraft()), S.handle("applications:create", (e, t) => $.createApplication(Ls.parse(t))), S.handle("applications:save", async (e, t) => {
		try {
			return await $.saveApplication(Is.parse(t));
		} catch (e) {
			throw e instanceof Vl && Df && await x.showMessageBox(Df, {
				type: "warning",
				title: "Dokument noch geöffnet",
				message: "Der Bewerbungsordner konnte nicht umbenannt werden.",
				detail: e.message,
				buttons: ["OK"],
				defaultId: 0
			}), e;
		}
	}), S.handle("applications:remove", (e, t) => $.removeApplication(String(t))), S.handle("applications:duplicate", (e, t) => $.duplicateApplication(String(t))), S.handle("applications:change-status", (e, t, n, r) => {
		let i = gs.find((e) => e === n), a = _s.find((e) => e === r);
		if (!i) throw Error("Ungültiger Bewerbungsstatus.");
		return $.changeStatus(String(t), i, a);
	}), S.handle("applications:open-folder", async (e, t) => {
		let n = await w.openPath($.getApplicationAnschreibenPath(String(t)));
		if (n) throw Error(n);
	}), S.handle("profiles:save", (e, t) => $.saveProfile(zs.parse(t))), S.handle("profiles:remove", (e, t) => $.removeProfile(String(t))), S.handle("templates:scan", () => Of.scanAllTemplates()), S.handle("templates:add", async (e, t) => {
		let n = t ?? {};
		if (n.documentType !== "anschreiben" && n.documentType !== "deckblatt" && n.documentType !== "lebenslauf") throw Error("Ungültiger Dokumenttyp.");
		let r = await x.showOpenDialog(Df, {
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
		return r.canceled || !i ? null : Of.addExternalTemplate(i, n.documentType, typeof n.requestedName == "string" ? n.requestedName : void 0);
	}), S.handle("templates:use", async (e, t) => {
		let n = t ?? {};
		if (!n.templateId || !n.applicationId) throw Error("Vorlage und Bewerbung sind erforderlich.");
		let r = await Of.getTemplateById(n.templateId);
		if (!r) throw Error("Vorlage wurde nicht gefunden.");
		let i = $.getTemplateDocumentContext(n.applicationId);
		if (r.supportsPhoto && i.data.PROFILFOTO) {
			let e = C.createFromDataURL(i.data.PROFILFOTO);
			i.data.PROFILFOTO = e.isEmpty() ? "" : `data:image/png;base64,${e.toPNG().toString("base64")}`;
		}
		let a = await Of.createDocumentFromTemplate(r.id, i.targetDirectories[r.documentType], i.requestedBaseName, i.data, { atsMode: n.atsMode === !0 });
		$.queueGitCommit(n.applicationId, r.documentType === "anschreiben" ? "anschreiben" : "update");
		let o = await w.openPath(a.filePath);
		if (o) throw Error(o);
		return a;
	}), S.handle("templates:sync-anschreiben", async (e, t) => {
		let n = String(t), r = await Of.getTemplateById(Xs.id);
		if (!r) throw Error("Die Anschreiben-Word-Vorlage wurde nicht gefunden.");
		let i = $.getTemplateDocumentContext(n), a = [i.data.BEWERBER_VORNAME, i.data.BEWERBER_NACHNAME].filter(Boolean).join("_"), o = await Of.synchronizeDocumentFromTemplate(r.id, i.targetDirectories.anschreiben, a ? `Anschreiben_${a}` : "Anschreiben", i.data);
		return $.queueGitCommit(n, "anschreiben"), o;
	}), S.handle("templates:duplicate", (e, t) => Of.duplicateTemplate(String(t))), S.handle("templates:copy-to-muster", (e, t) => Of.copyExistingTemplateById(String(t))), S.handle("templates:toggle-favorite", (e, t) => Of.toggleTemplateFavorite(String(t))), S.handle("templates:remove", (e, t) => Of.deleteCustomTemplate(String(t))), S.handle("templates:open", async (e, t) => {
		let n = await Of.getTemplateById(String(t));
		if (!n) throw Error("Vorlage wurde nicht gefunden.");
		let r = await w.openPath(n.filePath);
		if (r) throw Error(r);
	}), S.handle("templates:open-folder", async (e, t) => {
		let n = await Of.getTemplateById(String(t));
		if (!n) throw Error("Vorlage wurde nicht gefunden.");
		w.showItemInFolder(n.filePath);
	}), S.handle("media:pick-profile-image", async (e, t) => {
		let n = t === "photo" || t === "signature" ? t : null;
		if (!n) throw Error("Ungültiger Bildtyp.");
		let r = await x.showOpenDialog(Df, {
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
		let a = await l(i);
		if (a.byteLength > 8 * 1024 * 1024) throw Error("Das Bild darf höchstens 8 MB groß sein.");
		let o = i.split(".").pop()?.toLowerCase();
		return {
			dataUrl: `data:${o === "png" ? "image/png" : o === "webp" ? "image/webp" : "image/jpeg"};base64,${a.toString("base64")}`,
			fileName: i.split(/[\\/]/).pop() ?? "Bild"
		};
	}), S.handle("settings:save", (e, t) => $.saveSettings(Hs.parse(t))), S.handle("events:save", (e, t) => $.saveEvent(Bs.parse(t))), S.handle("attachments:add", async (e, t, n) => {
		let r = bs.find((e) => e === n);
		if (!r) throw Error("Ungültige Dokumentkategorie.");
		let i = await x.showOpenDialog(Df, {
			defaultPath: $.files.archiveRootForCategory(r),
			title: `${r} hinzufügen`,
			properties: ["openFile"],
			filters: [{
				name: "PDF-Dokumente",
				extensions: ["pdf"]
			}]
		});
		return i.canceled || !i.filePaths[0] ? $.getWorkspace() : $.addAttachment(String(t), r, i.filePaths[0]);
	}), S.handle("attachments:save", (e, t) => $.saveAttachment(Vs.parse(t))), S.handle("attachments:move", (e, t, n) => {
		let r = Number(n);
		if (r !== -1 && r !== 1) throw Error("Ungültige Sortierrichtung.");
		return $.moveAttachment(String(t), r);
	}), S.handle("attachments:remove", (e, t) => $.removeAttachment(String(t))), S.handle("attachments:open", async (e, t) => {
		let n = await w.openPath($.getAttachmentPathById(String(t)));
		if (n) throw Error(n);
	}), S.handle("export:pdf", async (e, t, n, r) => {
		let i = [
			"deckblatt",
			"anschreiben",
			"lebenslauf",
			"mappe"
		].find((e) => e === n);
		if (!i) throw Error("Ungültiges Exportziel.");
		let a = String(t), o = r === void 0 ? void 0 : Is.parse(r);
		if (o && o.id !== a) throw Error("Die Exportdaten gehören nicht zur ausgewählten Bewerbung.");
		let s = await x.showSaveDialog(Df, {
			title: "PDF exportieren",
			defaultPath: $.getExportDefaultName(a, i),
			filters: [{
				name: "PDF",
				extensions: ["pdf"]
			}]
		});
		if (s.canceled || !s.filePath) return null;
		let c = new v({
			show: !1,
			webPreferences: {
				sandbox: !0,
				contextIsolation: !0,
				nodeIntegration: !1
			}
		});
		try {
			let e = $.getExportHtml(a, i, o);
			await c.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(e)}`);
			let t = await c.webContents.printToPDF({
				pageSize: "A4",
				preferCSSPageSize: !0,
				printBackground: !0,
				margins: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
			}), n = i === "mappe" ? await bu(t, await Promise.all($.getPackageAttachmentPaths(a).map(async (e) => ({
				fileName: e.fileName,
				bytes: await l(e.path)
			})))) : t;
			return await h(s.filePath, n), $.queueGitCommit(a, i === "anschreiben" ? "anschreiben" : "update"), s.filePath;
		} finally {
			c.destroy();
		}
	}), S.handle("export:backup", async () => {
		let e = await x.showSaveDialog(Df, {
			title: "JSON-Sicherung exportieren",
			defaultPath: `BewerbungsManager_Backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`,
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePath ? null : (await $.writeBackup(e.filePath), e.filePath);
	}), S.handle("export:import-backup", async () => {
		let e = await x.showOpenDialog(Df, {
			title: "JSON-Sicherung wiederherstellen",
			properties: ["openFile"],
			filters: [{
				name: "BewerbungsManager JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePaths[0] ? null : $.importBackup(e.filePaths[0]);
	}), S.handle("export:settings", async () => {
		let e = await x.showSaveDialog(Df, {
			title: "Einstellungen exportieren",
			defaultPath: "BewerbungsManager_Einstellungen.json",
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePath ? null : (await $.writeSettings(e.filePath), e.filePath);
	}), S.handle("export:import-settings", async () => {
		let e = await x.showOpenDialog(Df, {
			title: "Einstellungen importieren",
			properties: ["openFile"],
			filters: [{
				name: "JSON",
				extensions: ["json"]
			}]
		});
		return e.canceled || !e.filePaths[0] ? null : $.importSettings(e.filePaths[0]);
	}), S.handle("migration:import-legacy", async () => {
		let e = await x.showOpenDialog(Df, {
			title: "Bisherigen data-Ordner auswählen",
			properties: ["openDirectory"]
		});
		if (e.canceled || !e.filePaths[0]) return null;
		let t = await $.previewLegacyMigration(e.filePaths[0]), n = (t.totalBytes / 1024 / 1024).toFixed(1);
		return (await x.showMessageBox(Df, {
			type: "warning",
			title: "Datenmigration bestätigen",
			message: "Bestehende Bewerbungsdaten in den neuen Hauptordner kopieren?",
			detail: [
				`Quelle: ${t.sourcePath}`,
				`${t.applications} Bewerbungen, ${t.attachments} Dokumentverknüpfungen`,
				`${t.fileCount} Dateien (${n} MB)`,
				"",
				"Die Quelldateien bleiben unverändert. Vorhandene Zieldateien werden nicht überschrieben."
			].join("\n"),
			buttons: ["Sicher kopieren", "Abbrechen"],
			defaultId: 1,
			cancelId: 1,
			noLink: !0
		})).response === 0 ? $.migrateLegacyData(t.sourcePath) : null;
	}), S.handle("system:open-external", async (e, t) => {
		let n = new URL(String(t));
		if (!["http:", "https:"].includes(n.protocol)) throw Error("Nur HTTP- und HTTPS-Links sind erlaubt.");
		await w.openExternal(n.toString());
	}), S.handle("system:data-path", () => $.dataPath);
}, Wf = () => {
	let e = $.getWorkspace();
	if (!e.settings.notificationsEnabled || !y.isSupported()) return;
	let t = Date.now();
	e.events.filter((e) => !e.cancelled && !e.completed).forEach((e) => {
		let n = new Date(e.startAt).getTime(), r = e.reminderMinutes.some((e) => {
			let r = n - e * 6e4;
			return r <= t && r > t - 65e3;
		}), i = `${e.id}:${Math.floor(t / 6e4)}`;
		r && !Mf.has(i) && (Mf.add(i), new y({
			title: "BewerbungsManager",
			body: e.title
		}).show());
	});
};
b.whenReady().then(async () => {
	kf = new Ef(Lf.root), $ = new vu(Lf, kf), await $.initialize(), await kf.initialize(), Of = new vf(Lf), await Of.initialize(), Uf(), await Hf(), Wf(), setInterval(Wf, 6e4).unref(), b.on("activate", () => {
		v.getAllWindows().length === 0 && Hf();
	});
}), b.on("window-all-closed", () => {
	process.platform !== "darwin" && b.quit();
}), b.on("before-quit", (e) => {
	!kf || jf || (e.preventDefault(), !Af && (Af = !0, kf.dispose(), kf.waitForIdle().catch(() => void 0).finally(() => {
		jf = !0, b.quit();
	})));
});
//#endregion
