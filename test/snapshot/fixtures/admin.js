/**
 * @license
 * AddressZen <https://addresszen.com>
 * Magento Integration
 * Copyright IDDQD Limited, all rights reserved
 */
(function () {
  'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var isString$2 = function isString(input) {
    return typeof input === "string";
  };

  var hasWindow = function hasWindow() {
    return typeof window !== "undefined";
  };
  var toArray$1 = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  var loaded = function loaded(elem) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "idpc";
    return elem.getAttribute(prefix) === "true";
  };
  var markLoaded = function markLoaded(elem) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "idpc";
    return elem.setAttribute(prefix, "true");
  };
  var isTrue$1 = function isTrue() {
    return true;
  };
  var getParent = function getParent(node, entity) {
    var test = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isTrue$1;
    var parent = node;
    var tagName = entity.toUpperCase();
    while (parent.tagName !== "HTML") {
      if (parent.tagName === tagName && test(parent)) return parent;
      if (parent.parentNode === null) return null;
      parent = parent.parentNode;
    }
    return null;
  };
  var toHtmlElem = function toHtmlElem(parent, selector) {
    return selector ? parent.querySelector(selector) : null;
  };
  var toElem = function toElem(elem, context) {
    if (isString$2(elem)) return context.querySelector(elem);
    return elem;
  };
  var d$1 = function d() {
    return window.document;
  };
  var getScope = function getScope(scope) {
    if (isString$2(scope)) return d$1().querySelector(scope);
    if (scope === null) return d$1();
    return scope;
  };
  var getDocument = function getDocument(scope) {
    if (scope instanceof Document || scope.constructor.name === "HTMLDocument") return scope;
    if (scope.ownerDocument) return scope.ownerDocument;
    return d$1();
  };
  var setStyle = function setStyle(element, style) {
    var currentRules = element.getAttribute("style");
    Object.keys(style).forEach(function (key) {
      return element.style[key] = style[key];
    });
    return currentRules;
  };
  var restoreStyle = function restoreStyle(element, style) {
    element.setAttribute("style", style || "");
  };
  var hide = function hide(e) {
    e.style.display = "none";
    return e;
  };
  var show = function show(e) {
    e.style.display = "";
    return e;
  };
  var remove = function remove(elem) {
    if (elem === null || elem.parentNode === null) return;
    elem.parentNode.removeChild(elem);
  };
  var contains = function contains(scope, selector, text) {
    var elements = scope.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var e = elements[i];
      var content = e.innerText;
      if (content && content.trim() === text) return e;
    }
    return null;
  };

  function ownKeys$b(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$b(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$b(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var defaults$4 = {
    enabled: true,
    apiKey: "",
    populateCounty: false,
    autocomplete: true,
    autocompleteOverride: {},
    postcodeLookup: true,
    postcodeLookupOverride: {}
  };
  var config = function config() {
    var c = window.idpcConfig;
    if (c === undefined) return;
    return _objectSpread$b(_objectSpread$b({}, defaults$4), c);
  };
  var generateTimer = function generateTimer(_ref) {
    var pageTest = _ref.pageTest,
      bind = _ref.bind,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 1000 : _ref$interval;
    var timer = null;
    var start = function start(config) {
      if (!pageTest()) return null;
      timer = window.setInterval(function () {
        try {
          bind(config);
        } catch (e) {
          stop();
          console.log(e);
        }
      }, interval);
      return timer;
    };
    var stop = function stop() {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };
    return {
      start: start,
      stop: stop
    };
  };
  var cssEscape = function cssEscape(value) {
    value = String(value);
    var length = value.length;
    var index = -1;
    var codeUnit;
    var result = "";
    var firstCodeUnit = value.charCodeAt(0);
    while (++index < length) {
      codeUnit = value.charCodeAt(index);
      if (codeUnit == 0x0000) {
        result += "\uFFFD";
        continue;
      }
      if (codeUnit >= 0x0001 && codeUnit <= 0x001f || codeUnit == 0x007f || index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002d) {
        result += "\\" + codeUnit.toString(16) + " ";
        continue;
      }
      if (index == 0 && length == 1 && codeUnit == 0x002d) {
        result += "\\" + value.charAt(index);
        continue;
      }
      if (codeUnit >= 0x0080 || codeUnit == 0x002d || codeUnit == 0x005f || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005a || codeUnit >= 0x0061 && codeUnit <= 0x007a) {
        result += value.charAt(index);
        continue;
      }
      result += "\\" + value.charAt(index);
    }
    return result;
  };

  var isGbrAddress = function isGbrAddress(address) {
    return address.post_town !== undefined;
  };

  var loadStyle = function loadStyle(href, document) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = href;
    return link;
  };
  var injectStyle = function injectStyle(css, document) {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return style;
  };

  var newEvent = function newEvent(_ref) {
    var event = _ref.event,
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === void 0 ? true : _ref$cancelable;
    if (typeof window.Event === "function") return new window.Event(event, {
      bubbles: bubbles,
      cancelable: cancelable
    });
    var e = document.createEvent("Event");
    e.initEvent(event, bubbles, cancelable);
    return e;
  };
  var trigger = function trigger(e, event) {
    return e.dispatchEvent(newEvent({
      event: event
    }));
  };

  var isSelect = function isSelect(e) {
    if (e === null) return false;
    return e instanceof HTMLSelectElement || e.constructor.name === "HTMLSelectElement";
  };
  var isInput = function isInput(e) {
    if (e === null) return false;
    return e instanceof HTMLInputElement || e.constructor.name === "HTMLInputElement";
  };
  var isTextarea = function isTextarea(e) {
    if (e === null) return false;
    return e instanceof HTMLTextAreaElement || e.constructor.name === "HTMLTextAreaElement";
  };
  var isInputElem = function isInputElem(e) {
    return isInput(e) || isTextarea(e) || isSelect(e);
  };
  var update$1 = function update(input, value) {
    var skipTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (!input) return;
    if (!isInput(input) && !isTextarea(input)) return;
    change({
      e: input,
      value: value,
      skipTrigger: skipTrigger
    });
  };
  var hasValue = function hasValue(select, value) {
    if (value === null) return false;
    return select.querySelector("[value=\"".concat(value, "\"]")) !== null;
  };
  var optionsHasText = function optionsHasText(select, value) {
    if (value === null) return [];
    var options = select.querySelectorAll("option");
    return Array.from(options).filter(function (o) {
      return o.textContent === value;
    });
  };
  var updateSelect = function updateSelect(_ref) {
    var e = _ref.e,
      value = _ref.value,
      skipTrigger = _ref.skipTrigger;
    if (value === null) return;
    if (!isSelect(e)) return;
    setValue(e, value);
    if (!skipTrigger) trigger(e, "select");
    trigger(e, "change");
  };
  var setValue = function setValue(e, value) {
    var descriptor = Object.getOwnPropertyDescriptor(e.constructor.prototype, "value");
    if (descriptor === undefined) return;
    if (descriptor.set === undefined) return;
    var setter = descriptor.set;
    setter.call(e, value);
  };
  var updateInput = function updateInput(_ref2) {
    var e = _ref2.e,
      value = _ref2.value,
      skipTrigger = _ref2.skipTrigger;
    if (value === null) return;
    if (!isInput(e) && !isTextarea(e)) return;
    setValue(e, value);
    if (!skipTrigger) trigger(e, "input");
    trigger(e, "change");
  };
  var change = function change(options) {
    if (options.value === null) return;
    updateSelect(options);
    updateInput(options);
  };

  var UK = "United Kingdom";
  var IOM = "Isle of Man";
  var EN = "England";
  var SC = "Scotland";
  var WA = "Wales";
  var NI = "Northern Ireland";
  var CI = "Channel Islands";
  var toCountry = function toCountry(address) {
    var country = address.country;
    if (country === EN) return UK;
    if (country === SC) return UK;
    if (country === WA) return UK;
    if (country === NI) return UK;
    if (country === IOM) return IOM;
    if (isGbrAddress(address)) {
      if (country === CI) {
        if (/^GY/.test(address.postcode)) return "Guernsey";
        if (/^JE/.test(address.postcode)) return "Jersey";
      }
    }
    return country;
  };
  var updateCountry = function updateCountry(select, address) {
    if (!select) return;
    if (isSelect(select)) {
      var bcc = toCountry(address);
      if (hasValue(select, bcc)) change({
        e: select,
        value: bcc
      });
      if (hasValue(select, address.country_iso_2)) change({
        e: select,
        value: address.country_iso_2
      });
      if (hasValue(select, address.country_iso)) change({
        e: select,
        value: address.country_iso
      });
    }
    if (isInput(select)) {
      var _bcc = toCountry(address);
      change({
        e: select,
        value: _bcc
      });
    }
  };

  var g = {};
  if (hasWindow()) {
    if (window.idpcGlobal) {
      g = window.idpcGlobal;
    } else {
      window.idpcGlobal = g;
    }
  }
  var idpcState = function idpcState() {
    return g;
  };

  var idGen = function idGen() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "idpc_";
    return function () {
      var g = idpcState();
      if (!g.idGen) g.idGen = {};
      if (g.idGen[prefix] === undefined) g.idGen[prefix] = 0;
      g.idGen[prefix] += 1;
      return "".concat(prefix).concat(g.idGen[prefix]);
    };
  };

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
  }

  function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var numberOfLines = function numberOfLines(targets) {
    var line_2 = targets.line_2,
      line_3 = targets.line_3;
    if (!line_2) return 1;
    if (!line_3) return 2;
    return 3;
  };
  var join = function join(list) {
    return list.filter(function (e) {
      if (isString$2(e)) return !!e.trim();
      return !!e;
    }).join(", ");
  };
  var truncate = function truncate(line, maxLength) {
    if (line.length <= maxLength) return [line, ""];
    var words = line.split(" ");
    var truncated = "";
    var remaining = "";
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (truncated.length + word.length > maxLength) {
        remaining = words.slice(i).join(" ");
        break;
      }
      truncated += "".concat(word, " ");
    }
    return [truncated.trim(), remaining.trim()];
  };
  var prependLine = function prependLine(remaining, nextLine) {
    if (nextLine.length === 0) return remaining;
    return "".concat(remaining, ", ").concat(nextLine);
  };
  var toMaxLengthLines = function toMaxLengthLines(l, options) {
    var lineCount = options.lineCount,
      maxLineOne = options.maxLineOne,
      maxLineTwo = options.maxLineTwo,
      maxLineThree = options.maxLineThree;
    var result = ["", "", ""];
    var lines = _toConsumableArray(l);
    if (maxLineOne) {
      var _truncate = truncate(lines[0], maxLineOne),
        _truncate2 = _slicedToArray(_truncate, 2),
        newLineOne = _truncate2[0],
        remaining = _truncate2[1];
      result[0] = newLineOne;
      if (remaining) lines[1] = prependLine(remaining, lines[1]);
      if (lineCount === 1) return result;
    } else {
      result[0] = lines[0];
      if (lineCount === 1) return [join(lines), "", ""];
    }
    if (maxLineTwo) {
      var _truncate3 = truncate(lines[1], maxLineTwo),
        _truncate4 = _slicedToArray(_truncate3, 2),
        newLineTwo = _truncate4[0],
        _remaining = _truncate4[1];
      result[1] = newLineTwo;
      if (_remaining) lines[2] = prependLine(_remaining, lines[2]);
      if (lineCount === 2) return result;
    } else {
      result[1] = lines[1];
      if (lineCount === 2) return [result[0], join(lines.slice(1)), ""];
    }
    if (maxLineThree) {
      var _truncate5 = truncate(lines[2], maxLineThree),
        _truncate6 = _slicedToArray(_truncate5, 2),
        newLineThree = _truncate6[0],
        _remaining2 = _truncate6[1];
      result[2] = newLineThree;
      if (_remaining2) lines[3] = prependLine(_remaining2, lines[3]);
    } else {
      result[2] = lines[2];
    }
    return result;
  };
  var toAddressLines = function toAddressLines(lineCount, address, options) {
    var line_1 = address.line_1,
      line_2 = address.line_2;
    var line_3 = "line_3" in address ? address.line_3 : "";
    if (options.maxLineOne || options.maxLineTwo || options.maxLineThree) return toMaxLengthLines([line_1, line_2, line_3], _objectSpread$a({
      lineCount: lineCount
    }, options));
    if (lineCount === 3) return [line_1, line_2, line_3];
    if (lineCount === 2) return [line_1, join([line_2, line_3]), ""];
    return [join([line_1, line_2, line_3]), "", ""];
  };
  var extract = function extract(a, attr) {
    var result = a[attr];
    if (typeof result === "number") return result.toString();
    if (result === undefined) return "";
    return result;
  };
  var getFields = function getFields(o) {
    return _objectSpread$a(_objectSpread$a(_objectSpread$a({}, searchFields(o.outputFields || {}, o.config.scope)), searchNames(o.names || {}, o.config.scope)), searchLabels(o.labels || {}, o.config.scope));
  };
  var searchFields = function searchFields(outputFields, scope) {
    var fields = {};
    var key;
    for (key in outputFields) {
      var value = outputFields[key];
      if (value === undefined) continue;
      var field = toElem(value, scope);
      if (isInputElem(field)) fields[key] = field;
    }
    return fields;
  };
  var searchNames = function searchNames(names, scope) {
    var result = {};
    var key;
    for (key in names) {
      if (!names.hasOwnProperty(key)) continue;
      var name = names[key];
      var named = toElem("[name=\"".concat(name, "\"]"), scope);
      if (named) {
        result[key] = named;
        continue;
      }
      var ariaNamed = toElem("[aria-name=\"".concat(name, "\"]"), scope);
      if (ariaNamed) result[key] = ariaNamed;
    }
    return result;
  };
  var searchLabels = function searchLabels(labels, scope) {
    var result = {};
    if (labels === undefined) return labels;
    var key;
    for (key in labels) {
      if (!labels.hasOwnProperty(key)) continue;
      var name = labels[key];
      if (!name) continue;
      var first = contains(scope, "label", name);
      var label = toElem(first, scope);
      if (!label) continue;
      var forEl = label.getAttribute("for");
      if (forEl) {
        var byId = scope.querySelector("#".concat(cssEscape(forEl)));
        if (byId) {
          result[key] = byId;
          continue;
        }
      }
      var inner = label.querySelector("input");
      if (inner) result[key] = inner;
    }
    return result;
  };
  var skipFields = ["country", "country_iso_2", "country_iso"];
  var mutateAddress = function mutateAddress(address, config) {
    if (isGbrAddress(address)) {
      if (config.removeOrganisation) removeOrganisation(address);
    }
    var _toAddressLines = toAddressLines(config.lines || 3, address, config),
      _toAddressLines2 = _slicedToArray(_toAddressLines, 3),
      line_1 = _toAddressLines2[0],
      line_2 = _toAddressLines2[1],
      line_3 = _toAddressLines2[2];
    address.line_1 = line_1;
    address.line_2 = line_2;
    if (isGbrAddress(address)) address.line_3 = line_3;
    return address;
  };
  var populateAddress = function populateAddress(options) {
    var config = options.config;
    var fields = getFields(options);
    if (config.lines === undefined) config.lines = numberOfLines(fields);
    var address = mutateAddress(_objectSpread$a({}, options.address), config);
    var scope = config.scope,
      populateCounty = config.populateCounty;
    var skip = [].concat(skipFields);
    if (isGbrAddress(address)) {
      if (config.removeOrganisation) removeOrganisation(address);
      if (populateCounty === false) skip.push("county");
    }
    updateCountry(toElem(fields.country || null, scope), address);
    var iso2Elem = toElem(fields.country_iso_2 || null, scope);
    if (isSelect(iso2Elem)) {
      if (hasValue(iso2Elem, address.country_iso_2)) change({
        e: iso2Elem,
        value: address.country_iso_2
      });
    }
    if (isInput(iso2Elem)) {
      update$1(iso2Elem, address.country_iso_2 || "");
    }
    var iso3Elem = toElem(fields.country_iso || null, scope);
    if (isSelect(iso3Elem)) {
      if (hasValue(iso3Elem, address.country_iso)) change({
        e: iso3Elem,
        value: address.country_iso_2
      });
    }
    if (isInput(iso3Elem)) update$1(iso3Elem, address.country_iso || "");
    var countyIso = toElem(getCountyIsoSelector(fields), scope);
    var countyIsoValue = getCountyIso(address);
    var countyValue = getCounty(address);
    if (isSelect(countyIso)) {
      if (hasValue(countyIso, countyIsoValue)) {
        change({
          e: countyIso,
          value: countyIsoValue
        });
      } else if (hasValue(countyIso, countyValue || "")) {
        change({
          e: countyIso,
          value: countyValue || ""
        });
      } else {
        var text = optionsHasText(countyIso, countyValue);
        if (text.length > 0) {
          change({
            e: countyIso,
            value: text[0].value || ""
          });
        } else {
          text = optionsHasText(countyIso, countyIsoValue);
          if (text) change({
            e: countyIso,
            value: text[0].value || ""
          });
        }
      }
    }
    if (isInput(countyIso)) {
      update$1(countyIso, countyIsoValue);
    }
    var e;
    for (e in fields) {
      if (skip.includes(e)) continue;
      if (address[e] === undefined) continue;
      if (fields.hasOwnProperty(e)) {
        var value = fields[e];
        if (!value) continue;
        update$1(toElem(value, scope), extract(address, e));
      }
    }
  };
  var removeOrganisation = function removeOrganisation(address) {
    if (address.organisation_name.length === 0) return address;
    if (address.line_2.length === 0 && address.line_3.length === 0) return address;
    if (address.line_1 === address.organisation_name) {
      address.line_1 = address.line_2;
      address.line_2 = address.line_3;
      address.line_3 = "";
    }
    return address;
  };
  var isUsaOutputFields = function isUsaOutputFields(a) {
    return a.hasOwnProperty("state_abbreviation");
  };
  var getCountyIsoSelector = function getCountyIsoSelector(a) {
    if (isUsaOutputFields(a)) return a.state_abbreviation || null;
    return a.county_code || null;
  };
  var getCountyIso = function getCountyIso(a) {
    if (isGbrAddress(a)) return a.county_code;
    return a.state_abbreviation;
  };
  var getCounty = function getCounty(a) {
    if (isGbrAddress(a)) return a.county;
    return a.state;
  };

  var keyCodeMapping = {
    13: "Enter",
    38: "ArrowUp",
    40: "ArrowDown",
    36: "Home",
    35: "End",
    27: "Escape",
    8: "Backspace"
  };
  var supportedKeys = ["Enter", "ArrowUp", "ArrowDown", "Home", "End", "Escape", "Backspace"];
  var supported = function supported(k) {
    return supportedKeys.indexOf(k) !== -1;
  };
  var toKey = function toKey(event) {
    if (event.keyCode) return keyCodeMapping[event.keyCode] || null;
    return supported(event.key) ? event.key : null;
  };

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }
  function isGeneratorFunction(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  }
  function mark(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  }

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  function awrap(arg) {
    return {
      __await: arg
    };
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }
  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  function async(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }
      context.method = method;
      context.arg = arg;
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }
          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }
        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          if (record.arg === ContinueSentinel) {
            continue;
          }
          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;
      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }
    var info = record.arg;
    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }
    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };
  Gp.toString = function () {
    return "[object Generator]";
  };
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    if (1 in locs) {
      entry.catchLoc = locs[1];
    }
    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }
    this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }
  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  function keys(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
            next.value = undefined$1;
            next.done = true;
            return next;
          };
        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined$1,
      done: true
    };
  }
  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined$1;
      this.tryEntries.forEach(resetTryEntry);
      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }
      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }
        return !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }
      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;
      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }
      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }
      return ContinueSentinel;
    }
  };

  // Export a default namespace that plays well with Rollup
  var _regeneratorRuntime = {
    wrap: wrap,
    isGeneratorFunction: isGeneratorFunction,
    AsyncIterator: AsyncIterator,
    mark: mark,
    awrap: awrap,
    async: async,
    keys: keys,
    values: values
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function isObject$4(value) {
    var type = _typeof(value);
    return value != null && (type == 'object' || type == 'function');
  }
  var isObject_1 = isObject$4;

  var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$2 = freeGlobal || freeSelf || Function('return this')();
  var _root = root$2;

  var root$1 = _root;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now$1 = function now() {
    return root$1.Date.now();
  };
  var now_1 = now$1;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex$1(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }
  var _trimmedEndIndex = trimmedEndIndex$1;

  var trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
  }
  var _baseTrim = baseTrim$1;

  var root = _root;

  /** Built-in value references. */
  var _Symbol2 = root.Symbol;
  var _Symbol$2 = _Symbol2;

  var _Symbol$1 = _Symbol$2;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol$1 ? _Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var _getRawTag = getRawTag$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }
  var _objectToString = objectToString$1;

  var _Symbol = _Symbol$2,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$1(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  var _baseGetTag = baseGetTag$1;

  function isObjectLike$1(value) {
    return value != null && _typeof(value) == 'object';
  }
  var isObjectLike_1 = isObjectLike$1;

  var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol$1(value) {
    return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  var isSymbol_1 = isSymbol$1;

  var baseTrim = _baseTrim,
    isObject$3 = isObject_1,
    isSymbol = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$3(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$3(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_1 = toNumber$1;

  var isObject$2 = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
    nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject$2(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(),
        isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_1 = debounce;

  /**
   * @hidden
   */
  var update = function update(e, id) {
    e.id = id;
    e.setAttribute("role", "status");
    e.setAttribute("aria-live", "polite");
    e.setAttribute("aria-atomic", "true");
    return e;
  };
  /**
   * Applies hidden styles to a container. This is used to hide elements visually
   * while keeping them accessible to screen readers.
   *
   * @param container - The container element to style.
   */
  var setContainerFixStyle = function setContainerFixStyle(container) {
    // Apply reset styles
    container.style.border = "0px";
    container.style.padding = "0px";
    // Apply hidden styles
    container.style.clipPath = "rect(0px,0px,0px,0px)";
    container.style.height = "1px";
    container.style.marginBottom = "-1px";
    container.style.marginRight = "-1px";
    container.style.overflow = "hidden";
    container.style.position = "absolute";
    container.style.whiteSpace = "nowrap";
    container.style.width = "1px";
  };
  /**
   * Generates a screen reader compatible live area for announcements
   *
   * @hidden
   */
  var announcer = function announcer(_ref) {
    var document = _ref.document,
      idA = _ref.idA,
      idB = _ref.idB;
    var container = document.createElement("div");
    // Apply reset styles
    setContainerFixStyle(container);
    var a = update(document.createElement("div"), idA);
    var b = update(document.createElement("div"), idB);
    container.appendChild(a);
    container.appendChild(b);
    var A = true;
    var announce = debounce_1(function (message) {
      var announcer = A ? a : b;
      var backup = A ? b : a;
      A = !A;
      announcer.textContent = message;
      backup.textContent = "";
    }, 1500, {});
    return {
      container: container,
      announce: announce
    };
  };

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var defaultContexts = {
    GBR: {
      iso_2: "GB",
      iso_3: "GBR",
      emoji: "🇬🇧",
      rgeo: true,
      description: "United Kingdom"
    },
    USA: {
      iso_2: "US",
      iso_3: "USA",
      emoji: "🇺🇸",
      rgeo: false,
      description: "United States"
    }
  };
  var toContextList = function toContextList(contexts, restrictCountries) {
    var result = [];
    var codes = Object.keys(contexts);
    var _loop = function _loop() {
      var code = _codes[_i];
      if (restrictCountries.length > 0 && !restrictCountries.some(function (e) {
        return e === code;
      })) return 1; // continue
      result.push(contexts[code]);
    };
    for (var _i = 0, _codes = codes; _i < _codes.length; _i++) {
      if (_loop()) continue;
    }
    result.sort(function (b, a) {
      return b.description.localeCompare(a.description);
    });
    return result;
  };
  var toContextMap = function toContextMap(contexts) {
    var result = {};
    var _iterator = _createForOfIteratorHelper$1(contexts),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var context = _step.value;
        result[context.iso_3] = context;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return result;
  };

  function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  /**
   * @module Client
   *
   * @description HTTP API Client
   */
  /**
   * Default configuration
   */
  var defaults$3 = {
    tls: true,
    api_key: "",
    baseUrl: "api.ideal-postcodes.co.uk",
    version: "v1",
    strictAuthorisation: false,
    timeout: 10000,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    tags: [],
    agent: {}
  };
  /**
   * Client Class
   */
  var Client$1 = /*#__PURE__*/function () {
    function Client(config) {
      _classCallCheck(this, Client);
      this.config = _objectSpread$9(_objectSpread$9({}, defaults$3), config);
      this.config.header = _objectSpread$9(_objectSpread$9({}, defaults$3.header), config.header && config.header);
    }
    /**
     * Return base URL for API requests
     */
    _createClass(Client, [{
      key: "url",
      value: function url() {
        var _this$config = this.config,
          baseUrl = _this$config.baseUrl,
          version = _this$config.version;
        return "".concat(this.protocol(), "://").concat(baseUrl, "/").concat(version);
      }
    }, {
      key: "protocol",
      value: function protocol() {
        return this.config.tls ? "https" : "http";
      }
    }]);
    return Client;
  }();

  function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  /**
   * @module Utils
   */
  /**
   * toQuery
   *
   * Shallow copies object while omitting undefined attributes
   */
  var toStringMap = function toStringMap(optional) {
    if (optional === undefined) return {};
    return Object.keys(optional).reduce(function (result, key) {
      var value = optional[key];
      var reduce = reduceStringMap(value);
      if (reduce.length > 0) result[key] = reduce;
      return result;
    }, {});
  };
  var isString$1 = function isString(i) {
    return typeof i === "string";
  };
  var isArray$1 = function isArray(i) {
    return Array.isArray(i);
  };
  var reduceStringMap = function reduceStringMap(value) {
    var result = [];
    if (isArray$1(value)) {
      value.forEach(function (val) {
        if (isNumber$1(val)) result.push(val.toString());
        if (isString$1(val)) result.push(val);
      });
      return result.join(",");
    }
    if (isNumber$1(value)) return value.toString();
    if (isString$1(value)) return value;
    return "";
  };
  var isNumber$1 = function isNumber(n) {
    return typeof n === "number";
  };
  /**
   * toTimeout
   *
   * Returns timeout value from request object. Delegates to default client
   * timeout if not specified
   */
  var toTimeout = function toTimeout(_ref, client) {
    var timeout = _ref.timeout;
    if (isNumber$1(timeout)) return timeout;
    return client.config.timeout;
  };
  /**
   * toHeader
   *
   * Extracts HTTP Header object from request and client default headers
   *
   * Precendence is given to request specific headers
   */
  var toHeader$1 = function toHeader(_ref2, client) {
    var _ref2$header = _ref2.header,
      header = _ref2$header === void 0 ? {} : _ref2$header;
    return _objectSpread$8(_objectSpread$8({}, client.config.header), toStringMap(header));
  };

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _isNativeFunction(fn) {
    try {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    } catch (e) {
      return typeof fn === "function";
    }
  }

  function _isNativeReflectConstruct$2() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct$2()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * @module Errors
   *
   * @description Exports error classes which may be returned by this client
   */
  // Take note of https://github.com/Microsoft/TypeScript/issues/13965
  /**
   * IdealPostcodesError
   *
   * Base error class for all API responses that return an error. This class
   * is used where a JSON body is not provided or invalid
   * E.g. 503 rate limit response, JSON parse failure response
   */
  var IdealPostcodesError$1 = /*#__PURE__*/function (_Error) {
    _inherits(IdealPostcodesError, _Error);
    var _super = _createSuper$1(IdealPostcodesError);
    /**
     * Instantiate IdealPostcodesError
     */
    function IdealPostcodesError(options) {
      var _this;
      _classCallCheck(this, IdealPostcodesError);
      var trueProto = (this instanceof IdealPostcodesError ? this.constructor : void 0).prototype;
      _this = _super.call(this);
      _this.__proto__ = trueProto;
      var message = options.message,
        httpStatus = options.httpStatus,
        _options$metadata = options.metadata,
        metadata = _options$metadata === void 0 ? {} : _options$metadata;
      _this.message = message;
      _this.name = "Ideal Postcodes Error";
      _this.httpStatus = httpStatus;
      _this.metadata = metadata;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(_assertThisInitialized(_this), IdealPostcodesError);
      }
      return _this;
    }
    return _createClass(IdealPostcodesError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  /**
   * IdpcApiError
   *
   * Base error class for API responses with a JSON body. Typically a subclass
   * will be used to capture the error category (e.g. 400, 401, 500, etc)
   */
  var IdpcApiError = /*#__PURE__*/function (_IdealPostcodesError) {
    _inherits(IdpcApiError, _IdealPostcodesError);
    var _super2 = _createSuper$1(IdpcApiError);
    /**
     * Returns an API error instance
     */
    function IdpcApiError(httpResponse) {
      var _this2;
      _classCallCheck(this, IdpcApiError);
      _this2 = _super2.call(this, {
        httpStatus: httpResponse.httpStatus,
        message: httpResponse.body.message
      });
      _this2.response = httpResponse;
      return _this2;
    }
    return _createClass(IdpcApiError);
  }(IdealPostcodesError$1);
  /**
   * IdpcBadRequestError
   *
   * Captures API responses that return a 400 (Bad Request Error) response
   *
   * Examples include:
   * - Invalid syntax submitted
   * - Invalid date range submitted
   * - Invalid tag submitted
   */
  var IdpcBadRequestError = /*#__PURE__*/function (_IdpcApiError) {
    _inherits(IdpcBadRequestError, _IdpcApiError);
    var _super3 = _createSuper$1(IdpcBadRequestError);
    function IdpcBadRequestError() {
      _classCallCheck(this, IdpcBadRequestError);
      return _super3.apply(this, arguments);
    }
    return _createClass(IdpcBadRequestError);
  }(IdpcApiError);
  /**
   * IdpcUnauthorisedError
   *
   * Captures API responses that return a 401 (Unauthorised) response
   *
   * Examples include:
   * - Invalid api_key
   * - Invalid user_token
   * - Invalid licensee
   */
  var IdpcUnauthorisedError = /*#__PURE__*/function (_IdpcApiError2) {
    _inherits(IdpcUnauthorisedError, _IdpcApiError2);
    var _super4 = _createSuper$1(IdpcUnauthorisedError);
    function IdpcUnauthorisedError() {
      _classCallCheck(this, IdpcUnauthorisedError);
      return _super4.apply(this, arguments);
    }
    return _createClass(IdpcUnauthorisedError);
  }(IdpcApiError);
  /**
   * IpdcInvalidKeyError
   *
   * Invalid API Key presented for request
   */
  var IdpcInvalidKeyError = /*#__PURE__*/function (_IdpcUnauthorisedErro) {
    _inherits(IdpcInvalidKeyError, _IdpcUnauthorisedErro);
    var _super5 = _createSuper$1(IdpcInvalidKeyError);
    function IdpcInvalidKeyError() {
      _classCallCheck(this, IdpcInvalidKeyError);
      return _super5.apply(this, arguments);
    }
    return _createClass(IdpcInvalidKeyError);
  }(IdpcUnauthorisedError);
  /**
   * IdpcRequestFailedError
   *
   * Captures API responses that return a 402 (Request Failed) response
   *
   * Examples include:
   * - Key balance depleted
   * - Daily key limit reached
   */
  var IdpcRequestFailedError = /*#__PURE__*/function (_IdpcApiError3) {
    _inherits(IdpcRequestFailedError, _IdpcApiError3);
    var _super6 = _createSuper$1(IdpcRequestFailedError);
    function IdpcRequestFailedError() {
      _classCallCheck(this, IdpcRequestFailedError);
      return _super6.apply(this, arguments);
    }
    return _createClass(IdpcRequestFailedError);
  }(IdpcApiError);
  /**
   * IdpcBalanceDepleted
   *
   * Balance on key has been depleted
   */
  var IdpcBalanceDepletedError = /*#__PURE__*/function (_IdpcRequestFailedErr) {
    _inherits(IdpcBalanceDepletedError, _IdpcRequestFailedErr);
    var _super7 = _createSuper$1(IdpcBalanceDepletedError);
    function IdpcBalanceDepletedError() {
      _classCallCheck(this, IdpcBalanceDepletedError);
      return _super7.apply(this, arguments);
    }
    return _createClass(IdpcBalanceDepletedError);
  }(IdpcRequestFailedError);
  /**
   * IdpcLimitReachedError
   *
   * Limit reached. One of your lookup limits has been breached for today. This
   * could either be your total daily limit on your key or the individual IP
   * limit. You can either wait for for the limit to reset (after a day) or
   * manually disable or increase your limit.
   */
  var IdpcLimitReachedError = /*#__PURE__*/function (_IdpcRequestFailedErr2) {
    _inherits(IdpcLimitReachedError, _IdpcRequestFailedErr2);
    var _super8 = _createSuper$1(IdpcLimitReachedError);
    function IdpcLimitReachedError() {
      _classCallCheck(this, IdpcLimitReachedError);
      return _super8.apply(this, arguments);
    }
    return _createClass(IdpcLimitReachedError);
  }(IdpcRequestFailedError);
  /**
   * IdpcResourceNotFoundError
   *
   * Captures API responses that return a 404 (Resource Not Found) response
   *
   * Examples include:
   * - Postcode not found
   * - UDPRN not found
   * - Key not found
   */
  var IdpcResourceNotFoundError = /*#__PURE__*/function (_IdpcApiError4) {
    _inherits(IdpcResourceNotFoundError, _IdpcApiError4);
    var _super9 = _createSuper$1(IdpcResourceNotFoundError);
    function IdpcResourceNotFoundError() {
      _classCallCheck(this, IdpcResourceNotFoundError);
      return _super9.apply(this, arguments);
    }
    return _createClass(IdpcResourceNotFoundError);
  }(IdpcApiError);
  /**
   * IdpcPostcodeNotFoundError
   *
   * Requested postcode does not exist
   */
  var IdpcPostcodeNotFoundError = /*#__PURE__*/function (_IdpcResourceNotFound) {
    _inherits(IdpcPostcodeNotFoundError, _IdpcResourceNotFound);
    var _super10 = _createSuper$1(IdpcPostcodeNotFoundError);
    function IdpcPostcodeNotFoundError() {
      _classCallCheck(this, IdpcPostcodeNotFoundError);
      return _super10.apply(this, arguments);
    }
    return _createClass(IdpcPostcodeNotFoundError);
  }(IdpcResourceNotFoundError);
  /**
   * IdpcKeyNotFoundError
   *
   * Requested API Key does not exist
   */
  var IdpcKeyNotFoundError = /*#__PURE__*/function (_IdpcResourceNotFound2) {
    _inherits(IdpcKeyNotFoundError, _IdpcResourceNotFound2);
    var _super11 = _createSuper$1(IdpcKeyNotFoundError);
    function IdpcKeyNotFoundError() {
      _classCallCheck(this, IdpcKeyNotFoundError);
      return _super11.apply(this, arguments);
    }
    return _createClass(IdpcKeyNotFoundError);
  }(IdpcResourceNotFoundError);
  /**
   * IdpcUdprnNotFoundError
   *
   * Requested UDPRN does not exist
   */
  var IdpcUdprnNotFoundError = /*#__PURE__*/function (_IdpcResourceNotFound3) {
    _inherits(IdpcUdprnNotFoundError, _IdpcResourceNotFound3);
    var _super12 = _createSuper$1(IdpcUdprnNotFoundError);
    function IdpcUdprnNotFoundError() {
      _classCallCheck(this, IdpcUdprnNotFoundError);
      return _super12.apply(this, arguments);
    }
    return _createClass(IdpcUdprnNotFoundError);
  }(IdpcResourceNotFoundError);
  /**
   * IdpcUmprnNotFoundError
   *
   * Requested UMPRN does not exist
   */
  var IdpcUmprnNotFoundError = /*#__PURE__*/function (_IdpcResourceNotFound4) {
    _inherits(IdpcUmprnNotFoundError, _IdpcResourceNotFound4);
    var _super13 = _createSuper$1(IdpcUmprnNotFoundError);
    function IdpcUmprnNotFoundError() {
      _classCallCheck(this, IdpcUmprnNotFoundError);
      return _super13.apply(this, arguments);
    }
    return _createClass(IdpcUmprnNotFoundError);
  }(IdpcResourceNotFoundError);
  /**
   * IdpcServerError
   *
   * Captures API responses that return a 500 (Server Error) response
   */
  var IdpcServerError = /*#__PURE__*/function (_IdpcApiError5) {
    _inherits(IdpcServerError, _IdpcApiError5);
    var _super14 = _createSuper$1(IdpcServerError);
    function IdpcServerError() {
      _classCallCheck(this, IdpcServerError);
      return _super14.apply(this, arguments);
    }
    return _createClass(IdpcServerError);
  }(IdpcApiError);
  // 200 Responses
  var OK = 200;
  // 300 Responses
  var REDIRECT = 300;
  // 400 Responses
  var BAD_REQUEST = 400;
  // 401 Responses
  var UNAUTHORISED = 401;
  var INVALID_KEY = 4010;
  // 402 Responses
  var PAYMENT_REQUIRED = 402;
  var BALANCE_DEPLETED = 4020;
  var LIMIT_REACHED = 4021;
  // 404 Responses
  var NOT_FOUND = 404;
  var POSTCODE_NOT_FOUND = 4040;
  var KEY_NOT_FOUND = 4042;
  var UDPRN_NOT_FOUND = 4044;
  var UMPRN_NOT_FOUND = 4046;
  // 500 Responses
  var SERVER_ERROR = 500;
  var isSuccess = function isSuccess(code) {
    if (code < OK) return false;
    if (code >= REDIRECT) return false;
    return true;
  };
  var isObject$1 = function isObject(o) {
    if (o === null) return false;
    if (_typeof(o) !== "object") return false;
    return true;
  };
  var isErrorResponse = function isErrorResponse(body) {
    if (!isObject$1(body)) return false;
    if (typeof body.message !== "string") return false;
    if (typeof body.code !== "number") return false;
    return true;
  };
  /**
   * parse
   *
   * Parses API responses and returns an error for non 2xx responses
   *
   * Upon detecting an error an instance of IdealPostcodesError is returned
   */
  var parse = function parse(response) {
    var httpStatus = response.httpStatus,
      body = response.body;
    if (isSuccess(httpStatus)) return;
    if (isErrorResponse(body)) {
      // Test for specific API errors of interest
      var code = body.code;
      if (code === INVALID_KEY) return new IdpcInvalidKeyError(response);
      if (code === POSTCODE_NOT_FOUND) return new IdpcPostcodeNotFoundError(response);
      if (code === KEY_NOT_FOUND) return new IdpcKeyNotFoundError(response);
      if (code === UDPRN_NOT_FOUND) return new IdpcUdprnNotFoundError(response);
      if (code === UMPRN_NOT_FOUND) return new IdpcUmprnNotFoundError(response);
      if (code === BALANCE_DEPLETED) return new IdpcBalanceDepletedError(response);
      if (code === LIMIT_REACHED) return new IdpcLimitReachedError(response);
      // If no API errors of interest detected, fall back to http status code
      if (httpStatus === NOT_FOUND) return new IdpcResourceNotFoundError(response);
      if (httpStatus === BAD_REQUEST) return new IdpcBadRequestError(response);
      if (httpStatus === PAYMENT_REQUIRED) return new IdpcRequestFailedError(response);
      if (httpStatus === UNAUTHORISED) return new IdpcUnauthorisedError(response);
      if (httpStatus === SERVER_ERROR) return new IdpcServerError(response);
    }
    // Generate generic error (backstop)
    return new IdealPostcodesError$1({
      httpStatus: httpStatus,
      message: JSON.stringify(body)
    });
  };

  // Writes a resource to URL string
  var toRetrieveUrl = function toRetrieveUrl(options, id) {
    return [options.client.url(), options.resource, encodeURIComponent(id), options.action].filter(function (e) {
      return e !== undefined;
    }).join("/");
  };
  var retrieveMethod = function retrieveMethod(options) {
    var client = options.client;
    return function (id, request) {
      return client.config.agent.http({
        method: "GET",
        url: toRetrieveUrl(options, id),
        query: toStringMap(request.query),
        header: toHeader$1(request, client),
        timeout: toTimeout(request, client)
      }).then(function (response) {
        var error = parse(response);
        if (error) throw error;
        return response;
      });
    };
  };
  var listMethod = function listMethod(options) {
    var client = options.client,
      resource = options.resource;
    return function (request) {
      return client.config.agent.http({
        method: "GET",
        url: "".concat(client.url(), "/").concat(resource),
        query: toStringMap(request.query),
        header: toHeader$1(request, client),
        timeout: toTimeout(request, client)
      }).then(function (response) {
        var error = parse(response);
        if (error) throw error;
        return response;
      });
    };
  };

  var resource$1 = "keys";
  var retrieve = function retrieve(client, apiKey, request) {
    return retrieveMethod({
      resource: resource$1,
      client: client
    })(apiKey, request);
  };

  /**
   * @module Helper Methods
   */
  /**
   * Check Key Availability
   *
   * Checks if a key can bey used
   *
   * [API Documentation for /keys]()https://ideal-postcodes.co.uk/documentation/keys#key)
   */
  var checkKeyUsability = function checkKeyUsability(options) {
    var client = options.client,
      timeout = options.timeout;
    var api_key = options.api_key || options.client.config.api_key;
    var licensee = options.licensee;
    var query;
    if (licensee === undefined) {
      query = {};
    } else {
      query = {
        licensee: licensee
      };
    }
    var queryOptions = {
      query: query,
      header: {}
    };
    if (timeout !== undefined) queryOptions.timeout = timeout;
    return retrieve(client, api_key, queryOptions).then(function (response) {
      return response.body.result;
    }); // Assert that we're retrieving public key information as no user_token provided
  };

  var resource = "autocomplete/addresses";
  var list = function list(client, request) {
    return listMethod({
      resource: resource,
      client: client
    })(request);
  };
  // Resolves address to the GBR format
  var usa = function usa(client, id, request) {
    return retrieveMethod({
      resource: resource,
      client: client,
      action: "usa"
    })(id, request);
  };
  // Resolves address to the GBR format
  var gbr = function gbr(client, id, request) {
    return retrieveMethod({
      resource: resource,
      client: client,
      action: "gbr"
    })(id, request);
  };

  function bind$4(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;
  var getPrototypeOf = Object.getPrototypeOf;
  var kindOf = function (cache) {
    return function (thing) {
      var str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
  }(Object.create(null));
  var kindOfTest = function kindOfTest(type) {
    type = type.toLowerCase();
    return function (thing) {
      return kindOf(thing) === type;
    };
  };
  var typeOfTest = function typeOfTest(type) {
    return function (thing) {
      return _typeof(thing) === type;
    };
  };

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  var isArray = Array.isArray;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  var isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  var isArrayBuffer = kindOfTest('ArrayBuffer');

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  var isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  var isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  var isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  var isObject = function isObject(thing) {
    return thing !== null && _typeof(thing) === 'object';
  };

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  var isBoolean = function isBoolean(thing) {
    return thing === true || thing === false;
  };

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  var isPlainObject = function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
      return false;
    }
    var prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  var isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  var isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  var isStream = function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  };

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  var isFormData = function isFormData(thing) {
    var kind;
    return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
    // detect form-data instance
    kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  var isURLSearchParams = kindOfTest('URLSearchParams');
  var _map = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest),
    _map2 = _slicedToArray(_map, 4),
    isReadableStream = _map2[0],
    isRequest = _map2[1],
    isResponse = _map2[2],
    isHeaders = _map2[3];

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  var trim = function trim(str) {
    return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$allOwnKeys = _ref.allOwnKeys,
      allOwnKeys = _ref$allOwnKeys === void 0 ? false : _ref$allOwnKeys;
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
    var i;
    var l;

    // Force an array if not already something iterable
    if (_typeof(obj) !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      var keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      var len = keys.length;
      var key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    var keys = Object.keys(obj);
    var i = keys.length;
    var _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  var _global = function () {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
  }();
  var isContextDefined = function isContextDefined(context) {
    return !isUndefined(context) && context !== _global;
  };

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge( /* obj1, obj2, obj3, ... */
  ) {
    var _ref2 = isContextDefined(this) && this || {},
      caseless = _ref2.caseless;
    var result = {};
    var assignValue = function assignValue(val, key) {
      var targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (var i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  var extend = function extend(a, b, thisArg) {
    var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      allOwnKeys = _ref3.allOwnKeys;
    forEach(b, function (val, key) {
      if (thisArg && isFunction(val)) {
        a[key] = bind$4(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {
      allOwnKeys: allOwnKeys
    });
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  var stripBOM = function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  var inherits = function inherits(constructor, superConstructor, props, descriptors) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  var toFlatObject = function toFlatObject(sourceObj, destObj, filter, propFilter) {
    var props;
    var i;
    var prop;
    var merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  var endsWith = function endsWith(str, searchString, position) {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };

  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  var toArray = function toArray(thing) {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    var i = thing.length;
    if (!isNumber(i)) return null;
    var arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  var isTypedArray = function (TypedArray) {
    // eslint-disable-next-line func-names
    return function (thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  }(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  var forEachEntry = function forEachEntry(obj, fn) {
    var generator = obj && obj[Symbol.iterator];
    var iterator = generator.call(obj);
    var result;
    while ((result = iterator.next()) && !result.done) {
      var pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  var matchAll = function matchAll(regExp, str) {
    var matches;
    var arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  var isHTMLForm = kindOfTest('HTMLFormElement');
  var toCamelCase = function toCamelCase(str) {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    });
  };

  /* Creating a function that will check if an object has a property. */
  var hasOwnProperty = function (_ref4) {
    var hasOwnProperty = _ref4.hasOwnProperty;
    return function (obj, prop) {
      return hasOwnProperty.call(obj, prop);
    };
  }(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  var isRegExp = kindOfTest('RegExp');
  var reduceDescriptors = function reduceDescriptors(obj, reducer) {
    var descriptors = Object.getOwnPropertyDescriptors(obj);
    var reducedDescriptors = {};
    forEach(descriptors, function (descriptor, name) {
      var ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  var freezeMethods = function freezeMethods(obj) {
    reduceDescriptors(obj, function (descriptor, name) {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }
      var value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = function () {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };
  var toObjectSet = function toObjectSet(arrayOrString, delimiter) {
    var obj = {};
    var define = function define(arr) {
      arr.forEach(function (value) {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  var noop = function noop() {};
  var toFiniteNumber = function toFiniteNumber(value, defaultValue) {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  var ALPHA = 'abcdefghijklmnopqrstuvwxyz';
  var DIGIT = '0123456789';
  var ALPHABET = {
    DIGIT: DIGIT,
    ALPHA: ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  var generateString = function generateString() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var alphabet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ALPHABET.ALPHA_DIGIT;
    var str = '';
    var length = alphabet.length;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
  }
  var toJSONObject = function toJSONObject(obj) {
    var stack = new Array(10);
    var visit = function visit(source, i) {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!('toJSON' in source)) {
          stack[i] = source;
          var target = isArray(source) ? [] : {};
          forEach(source, function (value, key) {
            var reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = undefined;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  var isAsyncFn = kindOfTest('AsyncFunction');
  var isThenable = function isThenable(thing) {
    return thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  };

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  var _setImmediate = function (setImmediateSupported, postMessageSupported) {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? function (token, callbacks) {
      _global.addEventListener("message", function (_ref5) {
        var source = _ref5.source,
          data = _ref5.data;
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);
      return function (cb) {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    }("axios@".concat(Math.random()), []) : function (cb) {
      return setTimeout(cb);
    };
  }(typeof setImmediate === 'function', isFunction(_global.postMessage));
  var asap = typeof queueMicrotask !== 'undefined' ? queueMicrotask.bind(_global) : typeof process !== 'undefined' && process.nextTick || _setImmediate;

  // *********************

  var utils$1 = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isReadableStream: isReadableStream,
    isRequest: isRequest,
    isResponse: isResponse,
    isHeaders: isHeaders,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isRegExp: isRegExp,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isTypedArray: isTypedArray,
    isFileList: isFileList,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    forEachEntry: forEachEntry,
    matchAll: matchAll,
    isHTMLForm: isHTMLForm,
    hasOwnProperty: hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors: reduceDescriptors,
    freezeMethods: freezeMethods,
    toObjectSet: toObjectSet,
    toCamelCase: toCamelCase,
    noop: noop,
    toFiniteNumber: toFiniteNumber,
    findKey: findKey,
    global: _global,
    isContextDefined: isContextDefined,
    ALPHABET: ALPHABET,
    generateString: generateString,
    isSpecCompliantForm: isSpecCompliantForm,
    toJSONObject: toJSONObject,
    isAsyncFn: isAsyncFn,
    isThenable: isThenable,
    setImmediate: _setImmediate,
    asap: asap
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }
  utils$1.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  var prototype$1 = AxiosError.prototype;
  var descriptors = {};
  ['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(function (code) {
    descriptors[code] = {
      value: code
    };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {
    value: true
  });

  // eslint-disable-next-line func-names
  AxiosError.from = function (error, code, config, request, response, customProps) {
    var axiosError = Object.create(prototype$1);
    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, function (prop) {
      return prop !== 'isAxiosError';
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$1.isUndefined(source[option]);
    });
    var metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    var visitor = options.visitor || defaultVisitor;
    var dots = options.dots;
    var indexes = options.indexes;
    var _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    var useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }
    function convertValue(value) {
      if (value === null) return '';
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError('Blob is not supported. Use a Buffer instead.');
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      var arr = value;
      if (value && !path && _typeof(value) === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    var stack = [];
    var exposedHelpers = Object.assign(predicates, {
      defaultVisitor: defaultVisitor,
      convertValue: convertValue,
      isVisitable: isVisitable
    });
    function build(value, path) {
      if (utils$1.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }
      stack.push(value);
      utils$1.forEach(value, function each(el, key) {
        var result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }
    build(obj);
    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    var charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  var prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString(encoder) {
    var _encode = encoder ? function (value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?object} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    var _encode = options && options.encode || encode;
    var serializeFn = options && options.serialize;
    var serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  }

  var InterceptorManager = /*#__PURE__*/function () {
    function InterceptorManager() {
      _classCallCheck(this, InterceptorManager);
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    _createClass(InterceptorManager, [{
      key: "use",
      value: function use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled: fulfilled,
          rejected: rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
    }, {
      key: "eject",
      value: function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
    }, {
      key: "clear",
      value: function clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
    }, {
      key: "forEach",
      value: function forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }]);
    return InterceptorManager;
  }();
  var InterceptorManager$1 = InterceptorManager;

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  var hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';
  var _navigator = (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator || undefined;

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  var hasStandardBrowserWebWorkerEnv = function () {
    return typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
  }();
  var origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    navigator: _navigator,
    origin: origin
  });

  function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var platform = _objectSpread$7(_objectSpread$7({}, utils), platform$1);

  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function visitor(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(function (match) {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    var obj = {};
    var keys = Object.keys(arr);
    var i;
    var len = keys.length;
    var key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      var name = path[index++];
      if (name === '__proto__') return true;
      var isNumericKey = Number.isFinite(+name);
      var isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }
      var result = buildPath(path, value, target[name], index);
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      var obj = {};
      utils$1.forEachEntry(formData, function (name, value) {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults$1 = {
    transitional: transitionalDefaults,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [function transformRequest(data, headers) {
      var contentType = headers.getContentType() || '';
      var hasJSONContentType = contentType.indexOf('application/json') > -1;
      var isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      var isFormData = utils$1.isFormData(data);
      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }
      var isFileList;
      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? {
            'files[]': data
          } : data, _FormData && new _FormData(), this.formSerializer);
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      var transitional = this.transitional || defaults$1.transitional;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var JSONRequested = this.responseType === 'json';
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };
  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], function (method) {
    defaults$1.headers[method] = {};
  });
  var defaults$2 = defaults$1;

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = utils$1.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = (function (rawHeaders) {
    var parsed = {};
    var key;
    var val;
    var i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  });

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var $internals = Symbol('internals');
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    var tokens = Object.create(null);
    var tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    var match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  var isValidHeaderName = function isValidHeaderName(str) {
    return /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  };
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, function (w, char, str) {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    var accessorName = utils$1.toCamelCase(' ' + header);
    ['get', 'set', 'has'].forEach(function (methodName) {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function value(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var AxiosHeaders = /*#__PURE__*/function (_Symbol$iterator, _Symbol$toStringTag) {
    function AxiosHeaders(headers) {
      _classCallCheck(this, AxiosHeaders);
      headers && this.set(headers);
    }
    _createClass(AxiosHeaders, [{
      key: "set",
      value: function set(header, valueOrRewrite, rewrite) {
        var self = this;
        function setHeader(_value, _header, _rewrite) {
          var lHeader = normalizeHeader(_header);
          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }
          var key = utils$1.findKey(self, lHeader);
          if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
            self[key || _header] = normalizeValue(_value);
          }
        }
        var setHeaders = function setHeaders(headers, _rewrite) {
          return utils$1.forEach(headers, function (_value, _header) {
            return setHeader(_value, _header, _rewrite);
          });
        };
        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else if (utils$1.isHeaders(header)) {
          var _iterator = _createForOfIteratorHelper(header.entries()),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];
              setHeader(value, key, rewrite);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }
        return this;
      }
    }, {
      key: "get",
      value: function get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
          var key = utils$1.findKey(this, header);
          if (key) {
            var value = this[key];
            if (!parser) {
              return value;
            }
            if (parser === true) {
              return parseTokens(value);
            }
            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }
            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }
            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }
    }, {
      key: "has",
      value: function has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
          var key = utils$1.findKey(this, header);
          return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
      }
    }, {
      key: "delete",
      value: function _delete(header, matcher) {
        var self = this;
        var deleted = false;
        function deleteHeader(_header) {
          _header = normalizeHeader(_header);
          if (_header) {
            var key = utils$1.findKey(self, _header);
            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];
              deleted = true;
            }
          }
        }
        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }
        return deleted;
      }
    }, {
      key: "clear",
      value: function clear(matcher) {
        var keys = Object.keys(this);
        var i = keys.length;
        var deleted = false;
        while (i--) {
          var key = keys[i];
          if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }
        return deleted;
      }
    }, {
      key: "normalize",
      value: function normalize(format) {
        var self = this;
        var headers = {};
        utils$1.forEach(this, function (value, header) {
          var key = utils$1.findKey(headers, header);
          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }
          var normalized = format ? formatHeader(header) : String(header).trim();
          if (normalized !== header) {
            delete self[header];
          }
          self[normalized] = normalizeValue(value);
          headers[normalized] = true;
        });
        return this;
      }
    }, {
      key: "concat",
      value: function concat() {
        var _this$constructor;
        for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
          targets[_key] = arguments[_key];
        }
        return (_this$constructor = this.constructor).concat.apply(_this$constructor, [this].concat(targets));
      }
    }, {
      key: "toJSON",
      value: function toJSON(asStrings) {
        var obj = Object.create(null);
        utils$1.forEach(this, function (value, header) {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
        });
        return obj;
      }
    }, {
      key: _Symbol$iterator,
      value: function value() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }
    }, {
      key: "toString",
      value: function toString() {
        return Object.entries(this.toJSON()).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            header = _ref2[0],
            value = _ref2[1];
          return header + ': ' + value;
        }).join('\n');
      }
    }, {
      key: _Symbol$toStringTag,
      get: function get() {
        return 'AxiosHeaders';
      }
    }], [{
      key: "from",
      value: function from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }
    }, {
      key: "concat",
      value: function concat(first) {
        var computed = new this(first);
        for (var _len2 = arguments.length, targets = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          targets[_key2 - 1] = arguments[_key2];
        }
        targets.forEach(function (target) {
          return computed.set(target);
        });
        return computed;
      }
    }, {
      key: "accessor",
      value: function accessor(header) {
        var internals = this[$internals] = this[$internals] = {
          accessors: {}
        };
        var accessors = internals.accessors;
        var prototype = this.prototype;
        function defineAccessor(_header) {
          var lHeader = normalizeHeader(_header);
          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }
        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
      }
    }]);
    return AxiosHeaders;
  }(Symbol.iterator, Symbol.toStringTag);
  AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders.prototype, function (_ref3, key) {
    var value = _ref3.value;
    var mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: function get() {
        return value;
      },
      set: function set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders);
  var AxiosHeaders$1 = AxiosHeaders;

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    var config = this || defaults$2;
    var context = response || config;
    var headers = AxiosHeaders$1.from(context.headers);
    var data = context.data;
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
  }

  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }
  utils$1.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
  }

  function parseProtocol(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    var bytes = new Array(samplesCount);
    var timestamps = new Array(samplesCount);
    var head = 0;
    var tail = 0;
    var firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
      var now = Date.now();
      var startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      var i = tail;
      var bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      var passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    var timestamp = 0;
    var threshold = 1000 / freq;
    var lastArgs;
    var timer;
    var invoke = function invoke(args) {
      var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };
    var throttled = function throttled() {
      var now = Date.now();
      var passed = now - timestamp;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(function () {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    var flush = function flush() {
      return lastArgs && invoke(lastArgs);
    };
    return [throttled, flush];
  }

  var progressEventReducer = function progressEventReducer(listener, isDownloadStream) {
    var freq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var bytesNotified = 0;
    var _speedometer = speedometer(50, 250);
    return throttle(function (e) {
      var loaded = e.loaded;
      var total = e.lengthComputable ? e.total : undefined;
      var progressBytes = loaded - bytesNotified;
      var rate = _speedometer(progressBytes);
      var inRange = loaded <= total;
      bytesNotified = loaded;
      var data = _defineProperty({
        loaded: loaded,
        total: total,
        progress: total ? loaded / total : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null
      }, isDownloadStream ? 'download' : 'upload', true);
      listener(data);
    }, freq);
  };
  var progressEventDecorator = function progressEventDecorator(total, throttled) {
    var lengthComputable = total != null;
    return [function (loaded) {
      return throttled[0]({
        lengthComputable: lengthComputable,
        total: total,
        loaded: loaded
      });
    }, throttled[1]];
  };
  var asyncDecorator = function asyncDecorator(fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return utils$1.asap(function () {
        return fn.apply(void 0, args);
      });
    };
  };

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableRest();
  }

  var isURLSameOrigin = platform.hasStandardBrowserEnv ?
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    var msie = platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;
      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() :
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();

  var cookies = platform.hasStandardBrowserEnv ?
  // Standard browser envs support document.cookie
  {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [name + '=' + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push('path=' + path);
      utils$1.isString(domain) && cookie.push('domain=' + domain);
      secure === true && cookie.push('secure');
      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  } :
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var headersToObject = function headersToObject(thing) {
    return thing instanceof AxiosHeaders$1 ? _objectSpread$6({}, thing) : thing;
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({
          caseless: caseless
        }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }
    var mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: function headers(a, b) {
        return mergeDeepProperties(headersToObject(a), headersToObject(b), true);
      }
    };
    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      var merge = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge(config1[prop], config2[prop], prop);
      utils$1.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  var resolveConfig = (function (config) {
    var newConfig = mergeConfig({}, config);
    var data = newConfig.data,
      withXSRFToken = newConfig.withXSRFToken,
      xsrfHeaderName = newConfig.xsrfHeaderName,
      xsrfCookieName = newConfig.xsrfCookieName,
      headers = newConfig.headers,
      auth = newConfig.auth;
    newConfig.headers = headers = AxiosHeaders$1.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' + btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : '')));
    }
    var contentType;
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        var _ref = contentType ? contentType.split(';').map(function (token) {
            return token.trim();
          }).filter(Boolean) : [],
          _ref2 = _toArray(_ref),
          type = _ref2[0],
          tokens = _ref2.slice(1);
        headers.setContentType([type || 'multipart/form-data'].concat(_toConsumableArray(tokens)).join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
        // Add xsrf header
        var xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  });

  var isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var _config = resolveConfig(config);
      var requestData = _config.data;
      var requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      var responseType = _config.responseType,
        onUploadProgress = _config.onUploadProgress,
        onDownloadProgress = _config.onDownloadProgress;
      var onCanceled;
      var uploadThrottled, downloadThrottled;
      var flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }
      var request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        var responseHeaders = AxiosHeaders$1.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
        var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }
      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        var transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        var _progressEventReducer = progressEventReducer(onDownloadProgress, true);
        var _progressEventReducer2 = _slicedToArray(_progressEventReducer, 2);
        downloadThrottled = _progressEventReducer2[0];
        flushDownload = _progressEventReducer2[1];
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        var _progressEventReducer3 = progressEventReducer(onUploadProgress);
        var _progressEventReducer4 = _slicedToArray(_progressEventReducer3, 2);
        uploadThrottled = _progressEventReducer4[0];
        flushUpload = _progressEventReducer4[1];
        request.upload.addEventListener('progress', uploadThrottled);
        request.upload.addEventListener('loadend', flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = function onCanceled(cancel) {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }
      var protocol = parseProtocol(_config.url);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  };

  var composeSignals = function composeSignals(signals, timeout) {
    var _signals = signals = signals ? signals.filter(Boolean) : [],
      length = _signals.length;
    if (timeout || length) {
      var controller = new AbortController();
      var aborted;
      var onabort = function onabort(reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          var err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
        }
      };
      var timer = timeout && setTimeout(function () {
        timer = null;
        onabort(new AxiosError("timeout ".concat(timeout, " of ms exceeded"), AxiosError.ETIMEDOUT));
      }, timeout);
      var unsubscribe = function unsubscribe() {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach(function (signal) {
            signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
          });
          signals = null;
        }
      };
      signals.forEach(function (signal) {
        return signal.addEventListener('abort', onabort);
      });
      var signal = controller.signal;
      signal.unsubscribe = function () {
        return utils$1.asap(unsubscribe);
      };
      return signal;
    }
  };
  var composeSignals$1 = composeSignals;

  function _OverloadYield(t, e) {
    this.v = t, this.k = e;
  }

  function AsyncGenerator(e) {
    var r, t;
    function resume(r, t) {
      try {
        var n = e[r](t),
          o = n.value,
          u = o instanceof _OverloadYield;
        Promise.resolve(u ? o.v : o).then(function (t) {
          if (u) {
            var i = "return" === r ? "return" : "next";
            if (!o.k || t.done) return resume(i, t);
            t = e[i](t).value;
          }
          settle(n.done ? "return" : "normal", t);
        }, function (e) {
          resume("throw", e);
        });
      } catch (e) {
        settle("throw", e);
      }
    }
    function settle(e, n) {
      switch (e) {
        case "return":
          r.resolve({
            value: n,
            done: !0
          });
          break;
        case "throw":
          r.reject(n);
          break;
        default:
          r.resolve({
            value: n,
            done: !1
          });
      }
      (r = r.next) ? resume(r.key, r.arg) : t = null;
    }
    this._invoke = function (e, n) {
      return new Promise(function (o, u) {
        var i = {
          key: e,
          arg: n,
          resolve: o,
          reject: u,
          next: null
        };
        t ? t = t.next = i : (r = t = i, resume(e, n));
      });
    }, "function" != typeof e["return"] && (this["return"] = void 0);
  }
  AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
    return this;
  }, AsyncGenerator.prototype.next = function (e) {
    return this._invoke("next", e);
  }, AsyncGenerator.prototype["throw"] = function (e) {
    return this._invoke("throw", e);
  }, AsyncGenerator.prototype["return"] = function (e) {
    return this._invoke("return", e);
  };

  function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(e) {
    return new _OverloadYield(e, 0);
  }

  function _asyncGeneratorDelegate(t) {
    var e = {},
      n = !1;
    function pump(e, r) {
      return n = !0, r = new Promise(function (n) {
        n(t[e](r));
      }), {
        done: !1,
        value: new _OverloadYield(r, 1)
      };
    }
    return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function () {
      return this;
    }, e.next = function (t) {
      return n ? (n = !1, t) : pump("next", t);
    }, "function" == typeof t["throw"] && (e["throw"] = function (t) {
      if (n) throw n = !1, t;
      return pump("throw", t);
    }), "function" == typeof t["return"] && (e["return"] = function (t) {
      return n ? (n = !1, t) : pump("return", t);
    }), e;
  }

  function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
  function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
  var streamChunk = /*#__PURE__*/_regeneratorRuntime.mark(function streamChunk(chunk, chunkSize) {
    var len, pos, end;
    return _regeneratorRuntime.wrap(function streamChunk$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          len = chunk.byteLength;
          if (!(!chunkSize || len < chunkSize)) {
            _context.next = 5;
            break;
          }
          _context.next = 4;
          return chunk;
        case 4:
          return _context.abrupt("return");
        case 5:
          pos = 0;
        case 6:
          if (!(pos < len)) {
            _context.next = 13;
            break;
          }
          end = pos + chunkSize;
          _context.next = 10;
          return chunk.slice(pos, end);
        case 10:
          pos = end;
          _context.next = 6;
          break;
        case 13:
        case "end":
          return _context.stop();
      }
    }, streamChunk);
  });
  var readBytes = /*#__PURE__*/function () {
    var _ref = _wrapAsyncGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(iterable, chunkSize) {
      var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk;
      return _regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context2.prev = 2;
            _iterator = _asyncIterator(readStream(iterable));
          case 4:
            _context2.next = 6;
            return _awaitAsyncGenerator(_iterator.next());
          case 6:
            if (!(_iteratorAbruptCompletion = !(_step = _context2.sent).done)) {
              _context2.next = 12;
              break;
            }
            chunk = _step.value;
            return _context2.delegateYield(_asyncGeneratorDelegate(_asyncIterator(streamChunk(chunk, chunkSize))), "t0", 9);
          case 9:
            _iteratorAbruptCompletion = false;
            _context2.next = 4;
            break;
          case 12:
            _context2.next = 18;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t1 = _context2["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context2.t1;
          case 18:
            _context2.prev = 18;
            _context2.prev = 19;
            if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
              _context2.next = 23;
              break;
            }
            _context2.next = 23;
            return _awaitAsyncGenerator(_iterator.return());
          case 23:
            _context2.prev = 23;
            if (!_didIteratorError) {
              _context2.next = 26;
              break;
            }
            throw _iteratorError;
          case 26:
            return _context2.finish(23);
          case 27:
            return _context2.finish(18);
          case 28:
          case "end":
            return _context2.stop();
        }
      }, _callee, null, [[2, 14, 18, 28], [19,, 23, 27]]);
    }));
    return function readBytes(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var readStream = /*#__PURE__*/function () {
    var _ref2 = _wrapAsyncGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(stream) {
      var reader, _yield$_awaitAsyncGen, done, value;
      return _regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!stream[Symbol.asyncIterator]) {
              _context3.next = 3;
              break;
            }
            return _context3.delegateYield(_asyncGeneratorDelegate(_asyncIterator(stream)), "t0", 2);
          case 2:
            return _context3.abrupt("return");
          case 3:
            reader = stream.getReader();
            _context3.prev = 4;
          case 5:
            _context3.next = 7;
            return _awaitAsyncGenerator(reader.read());
          case 7:
            _yield$_awaitAsyncGen = _context3.sent;
            done = _yield$_awaitAsyncGen.done;
            value = _yield$_awaitAsyncGen.value;
            if (!done) {
              _context3.next = 12;
              break;
            }
            return _context3.abrupt("break", 16);
          case 12:
            _context3.next = 14;
            return value;
          case 14:
            _context3.next = 5;
            break;
          case 16:
            _context3.prev = 16;
            _context3.next = 19;
            return _awaitAsyncGenerator(reader.cancel());
          case 19:
            return _context3.finish(16);
          case 20:
          case "end":
            return _context3.stop();
        }
      }, _callee2, null, [[4,, 16, 20]]);
    }));
    return function readStream(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var trackStream = function trackStream(stream, chunkSize, onProgress, onFinish) {
    var iterator = readBytes(stream, chunkSize);
    var bytes = 0;
    var done;
    var _onFinish = function _onFinish(e) {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream({
      pull: function pull(controller) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
          var _yield$iterator$next, _done, value, len, loadedBytes;
          return _regeneratorRuntime.wrap(function _callee3$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return iterator.next();
              case 3:
                _yield$iterator$next = _context4.sent;
                _done = _yield$iterator$next.done;
                value = _yield$iterator$next.value;
                if (!_done) {
                  _context4.next = 10;
                  break;
                }
                _onFinish();
                controller.close();
                return _context4.abrupt("return");
              case 10:
                len = value.byteLength;
                if (onProgress) {
                  loadedBytes = bytes += len;
                  onProgress(loadedBytes);
                }
                controller.enqueue(new Uint8Array(value));
                _context4.next = 19;
                break;
              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                _onFinish(_context4.t0);
                throw _context4.t0;
              case 19:
              case "end":
                return _context4.stop();
            }
          }, _callee3, null, [[0, 15]]);
        }))();
      },
      cancel: function cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  };

  function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  var encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? function (encoder) {
    return function (str) {
      return encoder.encode(str);
    };
  }(new TextEncoder()) : /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(str) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = Uint8Array;
            _context.next = 3;
            return new Response(str).arrayBuffer();
          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", new _context.t0(_context.t1));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  var test = function test(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return !!fn.apply(void 0, args);
    } catch (e) {
      return false;
    }
  };
  var supportsRequestStream = isReadableStreamSupported && test(function () {
    var duplexAccessed = false;
    var hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      }
    }).headers.has('Content-Type');
    return duplexAccessed && !hasContentType;
  });
  var DEFAULT_CHUNK_SIZE = 64 * 1024;
  var supportsResponseStream = isReadableStreamSupported && test(function () {
    return utils$1.isReadableStream(new Response('').body);
  });
  var resolvers = {
    stream: supportsResponseStream && function (res) {
      return res.body;
    }
  };
  isFetchSupported && function (res) {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(function (type) {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? function (res) {
        return res[type]();
      } : function (_, config) {
        throw new AxiosError("Response type '".concat(type, "' is not supported"), AxiosError.ERR_NOT_SUPPORT, config);
      });
    });
  }(new Response());
  var getBodyLength = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(body) {
      var _request;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(body == null)) {
              _context2.next = 2;
              break;
            }
            return _context2.abrupt("return", 0);
          case 2:
            if (!utils$1.isBlob(body)) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", body.size);
          case 4:
            if (!utils$1.isSpecCompliantForm(body)) {
              _context2.next = 9;
              break;
            }
            _request = new Request(platform.origin, {
              method: 'POST',
              body: body
            });
            _context2.next = 8;
            return _request.arrayBuffer();
          case 8:
            return _context2.abrupt("return", _context2.sent.byteLength);
          case 9:
            if (!(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body))) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", body.byteLength);
          case 11:
            if (utils$1.isURLSearchParams(body)) {
              body = body + '';
            }
            if (!utils$1.isString(body)) {
              _context2.next = 16;
              break;
            }
            _context2.next = 15;
            return encodeText(body);
          case 15:
            return _context2.abrupt("return", _context2.sent.byteLength);
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getBodyLength(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var resolveBodyLength = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(headers, body) {
      var length;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            length = utils$1.toFiniteNumber(headers.getContentLength());
            return _context3.abrupt("return", length == null ? getBodyLength(body) : length);
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function resolveBodyLength(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var fetchAdapter = isFetchSupported && /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(config) {
      var _resolveConfig, url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, _resolveConfig$withCr, withCredentials, fetchOptions, composedSignal, request, unsubscribe, requestContentLength, _request, contentTypeHeader, _progressEventDecorat, _progressEventDecorat2, onProgress, flush, isCredentialsSupported, response, isStreamResponse, options, responseContentLength, _ref5, _ref6, _onProgress, _flush, responseData;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _resolveConfig = resolveConfig(config), url = _resolveConfig.url, method = _resolveConfig.method, data = _resolveConfig.data, signal = _resolveConfig.signal, cancelToken = _resolveConfig.cancelToken, timeout = _resolveConfig.timeout, onDownloadProgress = _resolveConfig.onDownloadProgress, onUploadProgress = _resolveConfig.onUploadProgress, responseType = _resolveConfig.responseType, headers = _resolveConfig.headers, _resolveConfig$withCr = _resolveConfig.withCredentials, withCredentials = _resolveConfig$withCr === void 0 ? 'same-origin' : _resolveConfig$withCr, fetchOptions = _resolveConfig.fetchOptions;
            responseType = responseType ? (responseType + '').toLowerCase() : 'text';
            composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
            unsubscribe = composedSignal && composedSignal.unsubscribe && function () {
              composedSignal.unsubscribe();
            };
            _context4.prev = 4;
            _context4.t0 = onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head';
            if (!_context4.t0) {
              _context4.next = 11;
              break;
            }
            _context4.next = 9;
            return resolveBodyLength(headers, data);
          case 9:
            _context4.t1 = requestContentLength = _context4.sent;
            _context4.t0 = _context4.t1 !== 0;
          case 11:
            if (!_context4.t0) {
              _context4.next = 15;
              break;
            }
            _request = new Request(url, {
              method: 'POST',
              body: data,
              duplex: "half"
            });
            if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
              headers.setContentType(contentTypeHeader);
            }
            if (_request.body) {
              _progressEventDecorat = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))), _progressEventDecorat2 = _slicedToArray(_progressEventDecorat, 2), onProgress = _progressEventDecorat2[0], flush = _progressEventDecorat2[1];
              data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
            }
          case 15:
            if (!utils$1.isString(withCredentials)) {
              withCredentials = withCredentials ? 'include' : 'omit';
            }

            // Cloudflare Workers throws when credentials are defined
            // see https://github.com/cloudflare/workerd/issues/902
            isCredentialsSupported = "credentials" in Request.prototype;
            request = new Request(url, _objectSpread$5(_objectSpread$5({}, fetchOptions), {}, {
              signal: composedSignal,
              method: method.toUpperCase(),
              headers: headers.normalize().toJSON(),
              body: data,
              duplex: "half",
              credentials: isCredentialsSupported ? withCredentials : undefined
            }));
            _context4.next = 20;
            return fetch(request);
          case 20:
            response = _context4.sent;
            isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
            if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
              options = {};
              ['status', 'statusText', 'headers'].forEach(function (prop) {
                options[prop] = response[prop];
              });
              responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));
              _ref5 = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [], _ref6 = _slicedToArray(_ref5, 2), _onProgress = _ref6[0], _flush = _ref6[1];
              response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, _onProgress, function () {
                _flush && _flush();
                unsubscribe && unsubscribe();
              }), options);
            }
            responseType = responseType || 'text';
            _context4.next = 26;
            return resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);
          case 26:
            responseData = _context4.sent;
            !isStreamResponse && unsubscribe && unsubscribe();
            _context4.next = 30;
            return new Promise(function (resolve, reject) {
              settle(resolve, reject, {
                data: responseData,
                headers: AxiosHeaders$1.from(response.headers),
                status: response.status,
                statusText: response.statusText,
                config: config,
                request: request
              });
            });
          case 30:
            return _context4.abrupt("return", _context4.sent);
          case 33:
            _context4.prev = 33;
            _context4.t2 = _context4["catch"](4);
            unsubscribe && unsubscribe();
            if (!(_context4.t2 && _context4.t2.name === 'TypeError' && /fetch/i.test(_context4.t2.message))) {
              _context4.next = 38;
              break;
            }
            throw Object.assign(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request), {
              cause: _context4.t2.cause || _context4.t2
            });
          case 38:
            throw AxiosError.from(_context4.t2, _context4.t2 && _context4.t2.code, config, request);
          case 39:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4, 33]]);
    }));
    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  var knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };
  utils$1.forEach(knownAdapters, function (fn, value) {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {
          value: value
        });
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {
        value: value
      });
    }
  });
  var renderReason = function renderReason(reason) {
    return "- ".concat(reason);
  };
  var isResolvedHandle = function isResolvedHandle(adapter) {
    return utils$1.isFunction(adapter) || adapter === null || adapter === false;
  };
  var adapters = {
    getAdapter: function getAdapter(adapters) {
      adapters = utils$1.isArray(adapters) ? adapters : [adapters];
      var _adapters = adapters,
        length = _adapters.length;
      var nameOrAdapter;
      var adapter;
      var rejectedReasons = {};
      for (var i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        var id = void 0;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === undefined) {
            throw new AxiosError("Unknown adapter '".concat(id, "'"));
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || '#' + i] = adapter;
      }
      if (!adapter) {
        var reasons = Object.entries(rejectedReasons).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            state = _ref2[1];
          return "adapter ".concat(id, " ") + (state === false ? 'is not supported by the environment' : 'is not available in the build');
        });
        var s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
        throw new AxiosError("There is no suitable adapter to dispatch the request " + s, 'ERR_NOT_SUPPORT');
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(config, config.transformRequest);
    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }
    var adapter = adapters.getAdapter(config.adapter || defaults$2.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, config.transformResponse, reason.response);
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  var VERSION = "1.7.7";

  var validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
    validators$1[type] = function validator(thing) {
      return _typeof(thing) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });
  var deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return function (value, opt, opts) {
      if (validator === false) {
        throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (_typeof(options) !== 'object') {
      throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator = schema[opt];
      if (validator) {
        var value = options[opt];
        var result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  var validator = {
    assertOptions: assertOptions,
    validators: validators$1
  };

  var validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  var Axios$1 = /*#__PURE__*/function () {
    function Axios(instanceConfig) {
      _classCallCheck(this, Axios);
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    _createClass(Axios, [{
      key: "request",
      value: function () {
        var _request2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(configOrUrl, config) {
          var dummy, stack;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._request(configOrUrl, config);
              case 3:
                return _context.abrupt("return", _context.sent);
              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                if (_context.t0 instanceof Error) {
                  Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();

                  // slice off the Error: ... line
                  stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
                  try {
                    if (!_context.t0.stack) {
                      _context.t0.stack = stack;
                      // match without the 2 top stack lines
                    } else if (stack && !String(_context.t0.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
                      _context.t0.stack += '\n' + stack;
                    }
                  } catch (e) {
                    // ignore the case where "stack" is an un-writable property
                  }
                }
                throw _context.t0;
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[0, 6]]);
        }));
        function request(_x, _x2) {
          return _request2.apply(this, arguments);
        }
        return request;
      }()
    }, {
      key: "_request",
      value: function _request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }
        config = mergeConfig(this.defaults, config);
        var _config = config,
          transitional = _config.transitional,
          paramsSerializer = _config.paramsSerializer,
          headers = _config.headers;
        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }
        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // Flatten headers
        var contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
        headers && utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (method) {
          delete headers[method];
        });
        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

        // filter out skipped interceptors
        var requestInterceptorChain = [];
        var synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }
          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        var responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        var promise;
        var i = 0;
        var len;
        if (!synchronousRequestInterceptors) {
          var chain = [dispatchRequest.bind(this), undefined];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;
          promise = Promise.resolve(config);
          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }
          return promise;
        }
        len = requestInterceptorChain.length;
        var newConfig = config;
        i = 0;
        while (i < len) {
          var onFulfilled = requestInterceptorChain[i++];
          var onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }
        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }
        return promise;
      }
    }, {
      key: "getUri",
      value: function getUri(config) {
        config = mergeConfig(this.defaults, config);
        var fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    }]);
    return Axios;
  }(); // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function (url, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url: url,
          data: data
        }));
      };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });
  var Axios$2 = Axios$1;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  var CancelToken = /*#__PURE__*/function () {
    function CancelToken(executor) {
      _classCallCheck(this, CancelToken);
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;

      // eslint-disable-next-line func-names
      this.promise.then(function (cancel) {
        if (!token._listeners) return;
        var i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = function (onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function (resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }
        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    _createClass(CancelToken, [{
      key: "throwIfRequested",
      value: function throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */
    }, {
      key: "subscribe",
      value: function subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }
        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */
    }, {
      key: "unsubscribe",
      value: function unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        var index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }
    }, {
      key: "toAbortSignal",
      value: function toAbortSignal() {
        var _this = this;
        var controller = new AbortController();
        var abort = function abort(err) {
          controller.abort(err);
        };
        this.subscribe(abort);
        controller.signal.unsubscribe = function () {
          return _this.unsubscribe(abort);
        };
        return controller.signal;
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
    }], [{
      key: "source",
      value: function source() {
        var cancel;
        var token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token: token,
          cancel: cancel
        };
      }
    }]);
    return CancelToken;
  }();
  var CancelToken$1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }

  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode$1 = HttpStatusCode;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios$2(defaultConfig);
    var instance = bind$4(Axios$2.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios$2.prototype, context, {
      allOwnKeys: true
    });

    // Copy context to instance
    utils$1.extend(instance, context, null, {
      allOwnKeys: true
    });

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }

  // Create the default instance to be exported
  var axios = createInstance(defaults$2);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$2;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;

  // Expose AxiosError class
  axios.AxiosError = AxiosError;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = function (thing) {
    return formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  };
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;

  // this module should only have a default export
  var Axios = axios;

  // This module is intended to unwrap Axios default export as named.
  // Keep top-level export same with static properties
  // so that it can keep same with es module or cjs
  Axios.Axios;
    Axios.AxiosError;
    Axios.CanceledError;
    Axios.isCancel;
    Axios.CancelToken;
    Axios.VERSION;
    Axios.all;
    Axios.Cancel;
    Axios.isAxiosError;
    Axios.spread;
    Axios.toFormData;
    Axios.AxiosHeaders;
    Axios.HttpStatusCode;
    Axios.formToJSON;
    Axios.getAdapter;
    Axios.mergeConfig;

  var IdealPostcodesError = IdealPostcodesError$1;
  /**
   * Converts a Got header object to one that can be used by the client
   *
   * @hidden
   */
  var toHeader = function toHeader(gotHeaders) {
    return Object.keys(gotHeaders).reduce(function (headers, key) {
      var val = gotHeaders[key];
      if (typeof val === "string") {
        headers[key] = val;
      } else if (Array.isArray(val)) {
        headers[key] = val.join(",");
      }
      return headers;
    }, {});
  };
  /**
   * Adapts got responses to a format consumable by core-interface
   *
   * @hidden
   */
  var toHttpResponse = function toHttpResponse(httpRequest, response) {
    return {
      httpRequest: httpRequest,
      body: response.data,
      httpStatus: response.status || 0,
      header: toHeader(response.headers),
      metadata: {
        response: response
      }
    };
  };
  /**
   * Catch non-response errors (e.g. network failure, DNS failure, timeout)
   * wrap in our Error class and return
   *
   * @hidden
   */
  var handleError = function handleError(error) {
    var idpcError = new IdealPostcodesError({
      message: "[".concat(error.name, "] ").concat(error.message),
      httpStatus: 0,
      metadata: {
        axios: error
      }
    });
    return Promise.reject(idpcError);
  };
  // Don't throw errors for any HTTP status code
  // Allow core-interface to absorb these and emit own errors
  var validateStatus = function validateStatus() {
    return true;
  };
  /**
   * Agent
   *
   * @hidden
   */
  var Agent = /*#__PURE__*/function () {
    function Agent() {
      _classCallCheck(this, Agent);
      this.Axios = Axios.create({
        validateStatus: validateStatus
      });
    }
    _createClass(Agent, [{
      key: "requestWithBody",
      value: function requestWithBody(httpRequest) {
        var body = httpRequest.body,
          method = httpRequest.method,
          timeout = httpRequest.timeout,
          url = httpRequest.url,
          header = httpRequest.header,
          query = httpRequest.query;
        return this.Axios.request({
          url: url,
          method: method,
          headers: header,
          params: query,
          data: body,
          timeout: timeout
        }).then(function (response) {
          return toHttpResponse(httpRequest, response);
        }).catch(handleError);
      }
    }, {
      key: "request",
      value: function request(httpRequest) {
        var method = httpRequest.method,
          timeout = httpRequest.timeout,
          url = httpRequest.url,
          header = httpRequest.header,
          query = httpRequest.query;
        return this.Axios.request({
          url: url,
          method: method,
          headers: header,
          params: query,
          timeout: timeout
        }).then(function (response) {
          return toHttpResponse(httpRequest, response);
        }).catch(handleError);
      }
    }, {
      key: "http",
      value: function http(httpRequest) {
        if (httpRequest.body !== undefined) return this.requestWithBody(httpRequest);
        return this.request(httpRequest);
      }
    }]);
    return Agent;
  }();

  function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Client = /*#__PURE__*/function (_CoreInterface) {
    _inherits(Client, _CoreInterface);
    var _super = _createSuper(Client);
    /**
     * Client constructor extends CoreInterface
     */
    function Client(config) {
      _classCallCheck(this, Client);
      var agent = new Agent();
      return _super.call(this, _objectSpread$4({
        agent: agent
      }, config));
    }
    return _createClass(Client);
  }(Client$1);

  function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  /**
   * @hidden
   */
  var ApiCache = /*#__PURE__*/function () {
    function ApiCache(client) {
      _classCallCheck(this, ApiCache);
      this.prefix = "!";
      this.client = client;
      this.cache = {};
    }
    _createClass(ApiCache, [{
      key: "key",
      value: function key(query) {
        return "".concat(this.prefix).concat(query.toLowerCase());
      }
    }, {
      key: "retrieve",
      value: function retrieve(query) {
        return this.cache[this.key(query)];
      }
    }, {
      key: "store",
      value: function store(query, data) {
        this.cache[this.key(query)] = data;
        return data;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.cache = {};
      }
      /**
       * Retrieve a list of address suggestions given a query
       *
       * Write and read from cache if previously requested
       */
    }, {
      key: "query",
      value: function query(_query) {
        var _this = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var cachedValue = this.retrieve(_query);
        if (cachedValue) return Promise.resolve(cachedValue);
        var p = list(this.client, {
          query: _objectSpread$3({
            query: _query,
            api_key: this.client.config.api_key
          }, options)
        }).then(function (response) {
          var suggestions = response.body.result.hits;
          _this.store(_query, suggestions);
          return suggestions;
        });
        this.store(_query, p);
        return p;
      }
    }, {
      key: "resolve",
      value: function resolve(suggestion, format) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (format === "usa") return this.usaResolve(suggestion, options);
        return this.gbrResolve(suggestion, options);
      }
    }, {
      key: "usaResolve",
      value: function usaResolve(suggestion) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return usa(this.client, suggestion.id, {
          query: _objectSpread$3({
            api_key: this.client.config.api_key
          }, options)
        }).then(function (response) {
          return response.body.result;
        });
      }
    }, {
      key: "gbrResolve",
      value: function gbrResolve(suggestion) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return gbr(this.client, suggestion.id, {
          query: _objectSpread$3({
            api_key: this.client.config.api_key
          }, options)
        }).then(function (response) {
          return response.body.result;
        });
      }
    }]);
    return ApiCache;
  }();

  /**
   * Default CSS
   *
   * @hidden
   */
  var d = ".idpc_af.hidden{display:none}div.idpc_autocomplete{position:relative;margin:0!important;padding:0;border:0;color:#28282b;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}div.idpc_autocomplete>input{display:block}div.idpc_af{position:absolute;left:0;z-index:2000;min-width:100%;box-sizing:border-box;border-radius:3px;background:#fff;border:1px solid rgba(0,0,0,.3);box-shadow:.05em .2em .6em rgba(0,0,0,.2);text-shadow:none;padding:0;margin-top:2px}div.idpc_af>ul{list-style:none;padding:0;max-height:250px;overflow-y:scroll;margin:0!important}div.idpc_af>ul>li{position:relative;padding:.2em .5em;cursor:pointer;margin:0!important}div.idpc_toolbar{padding:.3em .5em;border-top:1px solid rgba(0,0,0,.3);text-align:right}div.idpc_af>ul>li:hover{background-color:#e5e4e2}div.idpc_af>ul>li.idpc_error{padding:.5em;text-align:center;cursor:default!important}div.idpc_af>ul>li.idpc_error:hover{background:#fff;cursor:default!important}div.idpc_af>ul>li[aria-selected=true]{background-color:#e5e4e2;z-index:3000}div.idpc_autocomplete>.idpc-unhide{font-size:.9em;text-decoration:underline;cursor:pointer}div.idpc_af>div>span{padding:.2em .5em;border-radius:3px;cursor:pointer;font-size:110%}span.idpc_icon{font-size:1.2em;line-height:1em;vertical-align:middle}div.idpc_toolbar>span span.idpc_country{margin-right:.3em;max-width:0;font-size:.9em;-webkit-transition:max-width .5s ease-out;transition:max-width .5s ease-out;display:inline-block;vertical-align:middle;white-space:nowrap;overflow:hidden}div.idpc_autocomplete>div>div>span:hover span.idpc_country{max-width:7em}div.idpc_autocomplete>div>div>span:hover{background-color:#e5e4e2;-webkit-transition:background-color .5s ease;-ms-transition:background-color .5s ease;transition:background-color .5s ease}";
  /**
   * Injects CSS style into DOM
   *
   * Idempotent
   *
   * @hidden
   */
  var addStyle = function addStyle(c) {
    var style = c.options.injectStyle;
    if (!style) return;
    var g = idpcState();
    if (!g.afstyle) g.afstyle = {};
    if (isString$2(style) && !g.afstyle[style]) {
      g.afstyle[style] = true;
      var link = loadStyle(style, c.document);
      c.document.head.appendChild(link);
      return link;
    }
    if (style === true && !g.afstyle[""]) {
      g.afstyle[""] = true;
      return injectStyle(d, c.document);
    }
    return;
  };
  /**
   * Returns a negative offset which can be used to correctly align input box
   * @hidden
   */
  var computeOffset = function computeOffset(c) {
    var offset;
    var input = c.input;
    if (c.options.alignToInput === false) return {};
    try {
      var w = c.options.document.defaultView;
      if (!w) return {};
      offset = w.getComputedStyle(input).marginBottom;
    } catch (_) {
      return {};
    }
    if (!offset) return {};
    var nOffset = parseInt(offset.replace("px", ""), 10);
    if (isNaN(nOffset)) return {};
    if (nOffset === 0) return {};
    var negativeOffset = nOffset * -1 + c.options.offset;
    return {
      marginTop: negativeOffset + "px"
    };
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  function t(t, n) {
    var e = "function" == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var r,
      o,
      i = e.call(t),
      a = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;) a.push(r.value);
    } catch (t) {
      o = {
        error: t
      };
    } finally {
      try {
        r && !r.done && (e = i.return) && e.call(i);
      } finally {
        if (o) throw o.error;
      }
    }
    return a;
  }
  var n;
  !function (t) {
    t[t.NotStarted = 0] = "NotStarted", t[t.Running = 1] = "Running", t[t.Stopped = 2] = "Stopped";
  }(n || (n = {}));
  var e = {
    type: "xstate.init"
  };
  function r(t) {
    return void 0 === t ? [] : [].concat(t);
  }
  function i(t, n) {
    return "string" == typeof (t = "string" == typeof t && n && n[t] ? n[t] : t) ? {
      type: t
    } : "function" == typeof t ? {
      type: t.name,
      exec: t
    } : t;
  }
  function a(t) {
    return function (n) {
      return t === n;
    };
  }
  function u(t) {
    return "string" == typeof t ? {
      type: t
    } : t;
  }
  function c(t, n) {
    return {
      value: t,
      context: n,
      actions: [],
      changed: !1,
      matches: a(t)
    };
  }
  function f(t, n, e) {
    var r = n,
      o = !1;
    return [t.filter(function (t) {
      if ("xstate.assign" === t.type) {
        o = !0;
        var n = Object.assign({}, r);
        return "function" == typeof t.assignment ? n = t.assignment(r, e) : Object.keys(t.assignment).forEach(function (o) {
          n[o] = "function" == typeof t.assignment[o] ? t.assignment[o](r, e) : t.assignment[o];
        }), r = n, !1;
      }
      return !0;
    }), r, o];
  }
  function s(n, o) {
    void 0 === o && (o = {});
    var s = t(f(r(n.states[n.initial].entry).map(function (t) {
        return i(t, o.actions);
      }), n.context, e), 2),
      l = s[0],
      y = s[1],
      p = {
        config: n,
        _options: o,
        initialState: {
          value: n.initial,
          actions: l,
          context: y,
          matches: a(n.initial)
        },
        transition: function transition(e, o) {
          var s,
            l,
            y = "string" == typeof e ? {
              value: e,
              context: n.context
            } : e,
            v = y.value,
            g = y.context,
            d = u(o),
            x = n.states[v];
          if (x.on) {
            var h = r(x.on[d.type]);
            "*" in x.on && h.push.apply(h, function (t, n, e) {
              if (e || 2 === arguments.length) for (var r, o = 0, i = n.length; o < i; o++) !r && o in n || (r || (r = Array.prototype.slice.call(n, 0, o)), r[o] = n[o]);
              return t.concat(r || Array.prototype.slice.call(n));
            }([], t(r(x.on["*"])), !1));
            try {
              for (var m = function (t) {
                  var n = "function" == typeof Symbol && Symbol.iterator,
                    e = n && t[n],
                    r = 0;
                  if (e) return e.call(t);
                  if (t && "number" == typeof t.length) return {
                    next: function next() {
                      return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                      };
                    }
                  };
                  throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
                }(h), b = m.next(); !b.done; b = m.next()) {
                var S = b.value;
                if (void 0 === S) return c(v, g);
                var w = "string" == typeof S ? {
                    target: S
                  } : S,
                  j = w.target,
                  E = w.actions,
                  R = void 0 === E ? [] : E,
                  N = w.cond,
                  O = void 0 === N ? function () {
                    return !0;
                  } : N,
                  _ = void 0 === j,
                  A = null != j ? j : v,
                  k = n.states[A];
                if (O(g, d)) {
                  var T = t(f((_ ? r(R) : [].concat(x.exit, R, k.entry).filter(function (t) {
                      return t;
                    })).map(function (t) {
                      return i(t, p._options.actions);
                    }), g, d), 3),
                    q = T[0],
                    z = T[1],
                    B = T[2],
                    C = null != j ? j : v;
                  return {
                    value: C,
                    context: z,
                    actions: q,
                    changed: j !== v || q.length > 0 || B,
                    matches: a(C)
                  };
                }
              }
            } catch (t) {
              s = {
                error: t
              };
            } finally {
              try {
                b && !b.done && (l = m.return) && l.call(m);
              } finally {
                if (s) throw s.error;
              }
            }
          }
          return c(v, g);
        }
      };
    return p;
  }
  var l = function l(t, n) {
    return t.actions.forEach(function (e) {
      var r = e.exec;
      return r && r(t.context, n);
    });
  };
  function y(t) {
    var r = t.initialState,
      o = n.NotStarted,
      i = new Set(),
      c = {
        _machine: t,
        send: function send(e) {
          o === n.Running && (r = t.transition(r, e), l(r, u(e)), i.forEach(function (t) {
            return t(r);
          }));
        },
        subscribe: function subscribe(t) {
          return i.add(t), t(r), {
            unsubscribe: function unsubscribe() {
              return i.delete(t);
            }
          };
        },
        start: function start(i) {
          if (i) {
            var u = "object" == _typeof(i) ? i : {
              context: t.config.context,
              value: i
            };
            r = {
              value: u.value,
              actions: [],
              context: u.context,
              matches: a(u.value)
            };
          } else r = t.initialState;
          return o = n.Running, l(r, e), c;
        },
        stop: function stop() {
          return o = n.Stopped, i.clear(), c;
        },
        get state() {
          return r;
        },
        get status() {
          return o;
        }
      };
    return c;
  }

  // @hidden
  var create = function create(_ref) {
    var c = _ref.c;
    var machine = s({
      initial: "closed",
      states: {
        closed: {
          entry: ["close"],
          exit: ["open"],
          on: {
            COUNTRY_CHANGE_EVENT: {
              actions: ["updateContextWithCountry"]
            },
            AWAKE: [{
              target: "suggesting",
              cond: function cond() {
                return c.suggestions.length > 0;
              }
            }, {
              target: "notifying"
            }]
          }
        },
        notifying: {
          entry: ["renderNotice"],
          exit: ["clearAnnouncement"],
          on: {
            CLOSE: "closed",
            SUGGEST: {
              target: "suggesting",
              actions: ["updateSuggestions"]
            },
            NOTIFY: {
              target: "notifying",
              actions: ["updateMessage"]
            },
            INPUT: {
              actions: "input"
            },
            CHANGE_COUNTRY: {
              target: "suggesting_country"
            }
          }
        },
        suggesting_country: {
          entry: ["clearInput", "renderContexts", "gotoCurrent", "expand", "addCountryHint"],
          exit: ["resetCurrent", "gotoCurrent", "contract", "clearHint", "clearInput"],
          on: {
            CLOSE: "closed",
            NOTIFY: {
              target: "notifying",
              actions: ["updateMessage"]
            },
            NEXT: {
              actions: ["next", "gotoCurrent"]
            },
            PREVIOUS: {
              actions: ["previous", "gotoCurrent"]
            },
            RESET: {
              actions: ["resetCurrent", "gotoCurrent"]
            },
            INPUT: {
              actions: ["countryInput"]
            },
            SELECT_COUNTRY: {
              target: "notifying",
              actions: ["selectCountry"]
            }
          }
        },
        suggesting: {
          entry: ["renderSuggestions", "gotoCurrent", "expand", "addHint"],
          exit: ["resetCurrent", "gotoCurrent", "contract", "clearHint"],
          on: {
            CLOSE: "closed",
            SUGGEST: {
              target: "suggesting",
              actions: ["updateSuggestions"]
            },
            NOTIFY: {
              target: "notifying",
              actions: ["updateMessage"]
            },
            INPUT: {
              actions: "input"
            },
            CHANGE_COUNTRY: {
              target: "suggesting_country"
            },
            NEXT: {
              actions: ["next", "gotoCurrent"]
            },
            PREVIOUS: {
              actions: ["previous", "gotoCurrent"]
            },
            RESET: {
              actions: ["resetCurrent", "gotoCurrent"]
            },
            SELECT_ADDRESS: {
              target: "closed",
              actions: ["selectAddress"]
            }
          }
        }
      }
    }, {
      actions: {
        // Updates the Address Finder context
        updateContextWithCountry: function updateContextWithCountry(_, e) {
          if (e.type !== "COUNTRY_CHANGE_EVENT") return;
          if (!e.contextDetails) return;
          c.applyContext(e.contextDetails);
          c.suggestions = [];
          c.cache.clear();
        },
        addHint: function addHint() {
          c.setPlaceholder(c.options.msgPlaceholder);
        },
        addCountryHint: function addCountryHint() {
          c.setPlaceholder(c.options.msgPlaceholderCountry);
        },
        clearHint: function clearHint() {
          c.unsetPlaceholder();
        },
        // Empties current input
        clearInput: function clearInput() {
          c.clearInput();
        },
        /**
         * Updates current li in list to active descendant
         */
        gotoCurrent: function gotoCurrent() {
          c.goToCurrent();
        },
        /**
         * Unhighlights a suggestion
         */
        resetCurrent: function resetCurrent() {
          c.current = -1;
        },
        /**
         * Triggers onInput callback
         */
        input: function input(_, e) {
          if (e.type !== "INPUT") return;
          c.retrieveSuggestions(e.event);
        },
        /**
         * Narrows country search box
         */
        countryInput: function countryInput() {
          c.renderContexts();
        },
        /**
         * Clears ARIA announcement fields
         */
        clearAnnouncement: function clearAnnouncement() {
          c.announce("");
        },
        /**
         * Renders suggestion within list
         */
        renderContexts: function renderContexts(_, e) {
          if (e.type !== "CHANGE_COUNTRY") return;
          c.renderContexts();
        },
        /**
         * Renders suggestion within list
         */
        renderSuggestions: function renderSuggestions(_, e) {
          if (e.type !== "SUGGEST") return;
          c.renderSuggestions();
        },
        /**
         * Update suggestions
         */
        updateSuggestions: function updateSuggestions(_, e) {
          if (e.type !== "SUGGEST") return;
          c.updateSuggestions(e.suggestions);
        },
        /**
         * Hides list and runs callback
         */
        close: function close(_, e) {
          if (e.type === "CLOSE") return c.close(e.reason);
          c.close();
        },
        /**
         * Makes list visible and run callback
         */
        open: function open() {
          c.open();
        },
        /**
         * Marks aria component as expanded
         */
        expand: function expand() {
          c.ariaExpand();
        },
        /**
         * Marks aria component as closed
         */
        contract: function contract() {
          c.ariaContract();
        },
        /**
         * Assigns notification message
         */
        updateMessage: function updateMessage(_, e) {
          if (e.type !== "NOTIFY") return;
          c.notification = e.notification;
        },
        /**
         * Renders message container and current message
         */
        renderNotice: function renderNotice() {
          c.renderNotice();
        },
        /**
         * Selects next element in list. Wraps to top if at bottom
         */
        next: function next() {
          c.next();
        },
        /**
         * Selects previous element in list. Wraps to bottom if at top
         */
        previous: function previous() {
          c.previous();
        },
        /**
         * Triggers select on current context or clicked element
         */
        selectCountry: function selectCountry(_, e) {
          if (e.type !== "SELECT_COUNTRY") return;
          var co = e.contextDetails;
          if (!co) return;
          c.applyContext(co);
          c.notification = "Country switched to ".concat(co.description, " ").concat(co.emoji);
        },
        /**
         * Triggers select on current suggestion or clicked element
         */
        selectAddress: function selectAddress(_, e) {
          if (e.type !== "SELECT_ADDRESS") return;
          var s = e.suggestion;
          if (!s) return;
          c.applySuggestion(s);
        }
      }
    });
    return y(machine);
  };

  function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  /**
   * @hidden
   */
  var NOOP = function NOOP() {};
  /**
   * Default options assigned to controller instances
   */
  var defaults = {
    // DOM
    outputScope: null,
    // Client
    apiKey: "",
    checkKey: true,
    // WAI-ARIA compliance settings
    aria: "1.0",
    // Behaviour
    titleizePostTown: true,
    format: "gbr",
    outputFields: {},
    names: {},
    labels: {},
    removeOrganisation: false,
    injectStyle: true,
    inputField: "",
    autocomplete: "none",
    populateCounty: true,
    populateOrganisation: true,
    queryOptions: {},
    resolveOptions: {},
    alignToInput: true,
    offset: 2,
    hideToolbar: false,
    detectCountry: true,
    // Country
    defaultCountry: "GBR",
    restrictCountries: [],
    contexts: defaultContexts,
    // Messages
    msgFallback: "Please enter your address manually",
    msgInitial: "Start typing to find address",
    msgNoMatch: "No matches found",
    msgList: "Select your address",
    msgCountryToggle: "Change Country",
    // Placeholder Messages
    msgPlaceholder: "Type the first line or postal code of your address",
    msgPlaceholderCountry: "Select your country",
    // View classes
    messageClass: "idpc_error",
    containerClass: "idpc_autocomplete",
    mainClass: "idpc_af",
    listClass: "idpc_ul",
    toolbarClass: "idpc_toolbar",
    countryToggleClass: "idpc_country",
    // Syles
    mainStyle: {},
    inputStyle: {},
    listStyle: {},
    liStyle: {},
    containerStyle: {},
    // Hide / unhide
    unhide: null,
    unhideClass: "idpc-unhide",
    msgUnhide: "Enter address manually",
    hide: [],
    //change list position
    fixed: false,
    // Callbacks
    onOpen: NOOP,
    onSelect: NOOP,
    onBlur: NOOP,
    onClose: NOOP,
    onFocus: NOOP,
    onInput: NOOP,
    onLoaded: NOOP,
    onSearchError: NOOP,
    onSuggestionError: NOOP,
    onMounted: NOOP,
    onRemove: NOOP,
    onSuggestionsRetrieved: NOOP,
    onAddressSelected: NOOP,
    onAddressRetrieved: NOOP,
    onAddressPopulated: NOOP,
    onFailedCheck: NOOP,
    onMouseDown: NOOP,
    onKeyDown: NOOP,
    onUnhide: NOOP,
    onCountrySelected: NOOP,
    onContextChange: NOOP
  };
  /**
   * # Controller
   *
   * The Autocomplete Controller class acts as the public class which you may
   * wield to enable address autocomplete on your HTML address forms
   *
   * When instantiated, the controller will serve as a bridge beteen the
   * address suggestion view presented on the DOM and the Ideal
   * Postcodes Address resolution HTTP APIs
   *
   * The role of the controller is to bind to events produced by the user
   * interface and take appropriate action including querying the API,
   * modifying other aspects of the DOM.
   */
  var Controller = /*#__PURE__*/function () {
    function Controller(options) {
      var _this = this;
      _classCallCheck(this, Controller);
      this.options = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, {
        scope: window.document,
        document: window.document
      }), defaults), options);
      // Default inputField to line_1 if `inputField` not specified
      if (!options.inputField) this.options.inputField = this.options.outputFields.line_1 || "";
      // To overcome config overload - idpcConfig global config object already
      // defines autocomplete (boolean)
      //@ts-ignore
      if (this.options.autocomplete === true) this.options.autocomplete = defaults.autocomplete;
      // Scope the operations of this controller to a document or DOM subtree
      this.scope = getScope(this.options.scope);
      // Assign a parent Document for elem creation
      this.document = getDocument(this.scope);
      // Assign a document or DOM subtree to scope outputs. Defaults to controller scope
      this.outputScope = findOrCreate(this.scope, this.options.outputScope, function () {
        return _this.scope;
      });
      // Initialise state
      this.context = this.options.defaultCountry;
      this.notification = this.options.msgInitial;
      this.current = -1;
      this.suggestions = [];
      this.contextSuggestions = [];
      this.updateContexts(this.options.contexts);
      this.client = new Client(_objectSpread$2(_objectSpread$2({}, this.options), {}, {
        api_key: this.options.apiKey
      }));
      this.cache = new ApiCache(this.client);
      this.retrieveSuggestions = debounce_1(function (event) {
        _this.options.onInput.call(_this, event);
        var query = _this.query();
        if (query.trim().length === 0) {
          _this.setMessage(_this.options.msgInitial);
          return Promise.resolve(_this);
        }
        return _this.cache.query(query, _objectSpread$2(_objectSpread$2({}, _this.options.queryOptions), {}, {
          context: _this.context
        })).then(function (suggestions) {
          _this.options.onSuggestionsRetrieved.call(_this, suggestions);
          return _this.setSuggestions(suggestions, query);
        }).catch(function (error) {
          if (_this.query() === query) _this.setMessage(_this.options.msgFallback);
          _this.options.onSuggestionError.call(_this, error);
          return _this;
        });
      }, 100, {
        leading: true,
        trailing: true,
        maxWait: 100
      });
      this.ids = idGen("idpcaf");
      // Configure container
      this.container = this.options.document.createElement("div");
      this.container.className = this.options.containerClass;
      this.container.id = this.ids();
      this.container.setAttribute("aria-haspopup", "listbox");
      // Create message element
      this.message = this.options.document.createElement("li");
      this.message.textContent = this.options.msgInitial;
      this.message.className = this.options.messageClass;
      // Create button to toggle country selection
      this.countryToggle = this.options.document.createElement("span");
      this.countryToggle.className = this.options.countryToggleClass;
      this.countryToggle.addEventListener("mousedown", _onCountryToggle(this));
      this.countryIcon = this.options.document.createElement("span");
      this.countryIcon.className = "idpc_icon";
      this.countryIcon.innerText = this.currentContext().emoji;
      this.countryMessage = this.options.document.createElement("span");
      this.countryMessage.innerText = "Select Country";
      this.countryMessage.className = "idpc_country";
      this.countryToggle.appendChild(this.countryMessage);
      this.countryToggle.appendChild(this.countryIcon);
      // Create toolbar (for country selection)
      this.toolbar = this.options.document.createElement("div");
      this.toolbar.className = this.options.toolbarClass;
      this.toolbar.appendChild(this.countryToggle);
      if (this.options.hideToolbar) hide(this.toolbar);
      // Configure UL
      this.list = this.options.document.createElement("ul");
      this.list.className = this.options.listClass;
      this.list.id = this.ids();
      this.list.setAttribute("aria-label", this.options.msgList);
      this.list.setAttribute("role", "listbox");
      this.mainComponent = this.options.document.createElement("div");
      this.mainComponent.appendChild(this.list);
      this.mainComponent.appendChild(this.toolbar);
      this.mainComponent.className = this.options.mainClass;
      hide(this.mainComponent);
      //configure unhide
      this.unhideEvent = this.unhideFields.bind(this);
      this.unhide = this.createUnhide();
      // Configure input
      var input;
      if (isString$2(this.options.inputField)) {
        input = this.scope.querySelector(this.options.inputField);
      } else {
        input = this.options.inputField;
      }
      if (!input) throw new Error("Address Finder: Unable to find valid input field");
      this.input = input;
      this.input.setAttribute("autocomplete", this.options.autocomplete);
      this.input.setAttribute("aria-autocomplete", "list");
      this.input.setAttribute("aria-controls", this.list.id);
      this.input.setAttribute("aria-autocomplete", "list");
      this.input.setAttribute("aria-activedescendant", "");
      this.input.setAttribute("autocorrect", "off");
      this.input.setAttribute("autocapitalize", "off");
      this.input.setAttribute("spellcheck", "false");
      if (!this.input.id) this.input.id = this.ids();
      var countryInput = this.scope.querySelector(this.options.outputFields.country);
      this.countryInput = countryInput;
      // Apply additional accessibility improvments
      this.ariaAnchor().setAttribute("role", "combobox");
      this.ariaAnchor().setAttribute("aria-expanded", "false");
      this.ariaAnchor().setAttribute("aria-owns", this.list.id);
      this.placeholderCache = this.input.placeholder;
      // Create listeners
      this.inputListener = _onInput(this);
      this.blurListener = _onBlur(this);
      this.focusListener = _onFocus(this);
      this.keydownListener = _onKeyDown(this);
      this.countryListener = _onCountryChange(this);
      var _announcer = announcer({
          idA: this.ids(),
          idB: this.ids(),
          document: this.options.document
        }),
        container = _announcer.container,
        announce = _announcer.announce;
      this.announce = announce;
      this.alerts = container;
      this.inputStyle = setStyle(this.input, this.options.inputStyle);
      setStyle(this.container, this.options.containerStyle);
      setStyle(this.list, this.options.listStyle);
      // Apply an offset based off any margin
      var offset = computeOffset(this);
      setStyle(this.mainComponent, _objectSpread$2(_objectSpread$2({}, offset), this.options.mainStyle));
      this.fsm = create({
        c: this
      });
      this.init();
    }
    /**
     * Sets placeholder and caches previous result
     * @hidden
     */
    _createClass(Controller, [{
      key: "setPlaceholder",
      value: function setPlaceholder(msg) {
        this.input.placeholder = msg;
      }
      /**
       * Unsets any placeholder value to original
       * @hidden
       */
    }, {
      key: "unsetPlaceholder",
      value: function unsetPlaceholder() {
        if (this.placeholderCache === undefined) return this.input.removeAttribute("placeholder");
        this.input.placeholder = this.placeholderCache;
      }
      /**
       * Returns current highlighted context
       * @hidden
       */
    }, {
      key: "currentContext",
      value: function currentContext() {
        var c = this.options.contexts[this.context];
        if (c) return c;
        var first = Object.keys(this.options.contexts)[0];
        return this.options.contexts[first];
      }
      /**
       * Binds to DOM and begin DOM mutations
       * @hidden
       */
    }, {
      key: "load",
      value: function load() {
        this.attach();
        addStyle(this);
        if (this.options.fixed) {
          //set position fixed and width calculation
          setPositionFixed(this.mainComponent, this.container, this.document);
        }
        this.options.onLoaded.call(this);
      }
      /**
       * Attaches Controller to the DOM.
       *
       * If `checkKey` is enabled, a key check will be performed prioer to binding. Use the `onLoaded` and `onFailedCheck` callbacks to define follow up behaviour if the key check succeeds or fails
       */
    }, {
      key: "init",
      value: function init() {
        var _this2 = this;
        return new Promise(function (resolve) {
          if (!_this2.options.checkKey) {
            _this2.load();
            resolve();
            return;
          }
          checkKeyUsability({
            client: _this2.client,
            api_key: _this2.options.apiKey
          }).then(function (response) {
            if (!response.available) throw new Error("Key currently not usable");
            _this2.updateContexts(
            // TODO: Remove cast when openapi updated
            toContextMap(response.contexts));
            // Methods to apply context
            // 1. If detect country enabled and match, if no match
            // 2. Apply default context, if no match
            // 3. Apply first item of context list
            // If detect country enabled, set country to default
            var details = _this2.options.contexts[response.context];
            if (_this2.options.detectCountry && details) {
              _this2.applyContext(details, false);
            } else {
              _this2.applyContext(_this2.currentContext(), false);
            }
            _this2.load();
            resolve();
          }).catch(function (error) {
            _this2.options.onFailedCheck.call(_this2, error);
            resolve();
          });
        });
      }
      // Updates lists of available contexts
    }, {
      key: "updateContexts",
      value: function updateContexts(contexts) {
        this.contextSuggestions = toContextList(contexts, this.options.restrictCountries);
        this.options.contexts = contexts;
      }
    }, {
      key: "filteredContexts",
      value: function filteredContexts() {
        var q = this.query();
        if (q.trim().length === 0) return this.contextSuggestions;
        var f = q.toLowerCase().trim().replace(/\s+/g, " ");
        var regexp = new RegExp("^" + f);
        return this.contextSuggestions.filter(function (e) {
          if (regexp.test(e.description.toLowerCase())) return true;
          if (e.iso_2.toLowerCase() === f) return true;
          if (e.iso_3.toLowerCase() === f) return true;
          return false;
        });
      }
      /**
       * Render available country options
       */
    }, {
      key: "renderContexts",
      value: function renderContexts() {
        var _this3 = this;
        this.list.innerHTML = "";
        this.filteredContexts().forEach(function (contextDetails, i) {
          var description = contextDetails.description;
          var li = _this3.options.document.createElement("li");
          li.textContent = description;
          li.setAttribute("aria-selected", "false");
          li.setAttribute("tabindex", "-1");
          li.setAttribute("aria-posinset", "".concat(i + 1));
          li.setAttribute("aria-setsize", _this3.contextSuggestions.length.toString());
          li.setAttribute("role", "option");
          setStyle(li, _this3.options.liStyle);
          li.addEventListener("mousedown", function (e) {
            e.preventDefault();
            _this3.options.onMouseDown.call(_this3, e);
            _this3.fsm.send({
              type: "SELECT_COUNTRY",
              contextDetails: contextDetails
            });
          });
          li.id = "".concat(_this3.list.id, "_").concat(i);
          _this3.list.appendChild(li);
        });
        this.announce("".concat(this.contextSuggestions.length, " countries available"));
      }
      /**
       * Render current address suggestions
       */
    }, {
      key: "renderSuggestions",
      value: function renderSuggestions() {
        var _this4 = this;
        this.list.innerHTML = "";
        var s = this.suggestions;
        s.forEach(function (suggestion, i) {
          var li = _this4.options.document.createElement("li");
          li.textContent = suggestion.suggestion;
          li.setAttribute("aria-selected", "false");
          li.setAttribute("tabindex", "-1");
          li.setAttribute("title", suggestion.suggestion);
          li.setAttribute("aria-posinset", "".concat(i + 1));
          li.setAttribute("aria-setsize", s.length.toString());
          li.setAttribute("role", "option");
          setStyle(li, _this4.options.liStyle);
          li.addEventListener("mousedown", function (e) {
            e.preventDefault();
            _this4.options.onMouseDown.call(_this4, e);
            _this4.fsm.send({
              type: "SELECT_ADDRESS",
              suggestion: suggestion
            });
          });
          li.id = "".concat(_this4.list.id, "_").concat(i);
          _this4.list.appendChild(li);
        });
        this.announce("".concat(s.length, " addresses available"));
      }
      /**
       * Updates current li in list to active descendant
       */
    }, {
      key: "goToCurrent",
      value: function goToCurrent() {
        var lis = this.list.children;
        this.input.setAttribute("aria-activedescendant", "");
        for (var i = 0; i < lis.length; i += 1) {
          if (i === this.current) {
            this.input.setAttribute("aria-activedescendant", lis[i].id);
            lis[i].setAttribute("aria-selected", "true");
            this.goto(i);
          } else {
            lis[i].setAttribute("aria-selected", "false");
          }
        }
      }
      /**
       * Marks aria component as opened
       */
    }, {
      key: "ariaExpand",
      value: function ariaExpand() {
        this.ariaAnchor().setAttribute("aria-expanded", "true");
      }
      /**
       * Marks aria component as closed
       */
    }, {
      key: "ariaContract",
      value: function ariaContract() {
        this.ariaAnchor().setAttribute("aria-expanded", "false");
      }
      /**
       * Resolves a suggestion to full address and apply results to form
       */
    }, {
      key: "applySuggestion",
      value: function applySuggestion(suggestion) {
        var _this5 = this;
        this.options.onSelect.call(this, suggestion);
        this.options.onAddressSelected.call(this, suggestion);
        this.announce("The address ".concat(suggestion.suggestion, " has been applied to this form"));
        return this.cache.resolve(suggestion, this.options.format, this.options.resolveOptions).then(function (address) {
          if (address === null) throw "Unable to retrieve address";
          _this5.options.onAddressRetrieved.call(_this5, address);
          _this5.populateAddress(address);
          return _this5;
        }).catch(function (error) {
          _this5.open();
          _this5.setMessage(_this5.options.msgFallback);
          _this5.options.onSearchError.call(_this5, error);
          return error;
        });
      }
      /**
       * Writes a selected to the input fields specified in the controller config
       */
    }, {
      key: "populateAddress",
      value: function populateAddress$1(address) {
        this.unhideFields();
        populateAddress({
          address: address,
          config: _objectSpread$2(_objectSpread$2({}, this.options), {}, {
            scope: this.outputScope
          }),
          outputFields: this.options.outputFields,
          names: this.options.names,
          labels: this.options.labels
        });
        this.options.onAddressPopulated.call(this, address);
      }
      /**
       * Applies new query options to search. This process clears the existing
       * cache to prevent stale searches
       */
    }, {
      key: "setQueryOptions",
      value: function setQueryOptions(options) {
        this.cache.clear();
        this.options.queryOptions = options;
      }
      /**
       * Applies new query options to search. This process clears the existing
       * cache to prevent stale searches
       */
    }, {
      key: "setResolveOptions",
      value: function setResolveOptions(options) {
        this.cache.clear();
        this.options.resolveOptions = options;
      }
      /**
       * Adds Address Finder to DOM
       * - Wraps input with container
       * - Appends suggestion list to container
       * - Enables listeners
       * - Starts FSM
       */
    }, {
      key: "attach",
      value: function attach() {
        if (this.fsm.status === n.Running) return this;
        this.input.addEventListener("input", this.inputListener);
        this.input.addEventListener("blur", this.blurListener);
        this.input.addEventListener("focus", this.focusListener);
        this.input.addEventListener("keydown", this.keydownListener);
        this.input.addEventListener("keydown", this.keydownListener);
        if (this.countryInput) this.countryInput.addEventListener("change", this.countryListener);
        var parent = this.input.parentNode;
        if (parent) {
          // Wrap input in a div and append suggestion list
          parent.insertBefore(this.container, this.input);
          this.container.appendChild(this.input);
          this.container.appendChild(this.mainComponent);
          this.container.appendChild(this.alerts);
          if (this.options.hide.length > 0 && this.options.unhide == null) this.container.appendChild(this.unhide);
        }
        this.fsm.start();
        this.options.onMounted.call(this);
        this.hideFields();
        return this;
      }
      /**
       * Removes Address Finder from DOM
       * - Disable listeners
       * - Removes sugestion list from container
       * - Appends suggestion list to container
       * - Enables listeners
       * - Stops FSM
       */
    }, {
      key: "detach",
      value: function detach() {
        if (this.fsm.status !== n.Running) return this;
        this.input.removeEventListener("input", this.inputListener);
        this.input.removeEventListener("blur", this.blurListener);
        this.input.removeEventListener("focus", this.focusListener);
        this.input.removeEventListener("keydown", this.keydownListener);
        if (this.countryInput) this.countryInput.removeEventListener("change", this.countryListener);
        this.container.removeChild(this.mainComponent);
        this.container.removeChild(this.alerts);
        var parent = this.container.parentNode;
        if (parent) {
          parent.insertBefore(this.input, this.container);
          parent.removeChild(this.container);
        }
        this.unmountUnhide();
        this.unhideFields();
        this.fsm.stop();
        restoreStyle(this.input, this.inputStyle);
        this.options.onRemove.call(this);
        this.unsetPlaceholder();
        return this;
      }
      /**
       * Sets message as a list item, no or empty string removes any message
       */
    }, {
      key: "setMessage",
      value: function setMessage(notification) {
        this.fsm.send({
          type: "NOTIFY",
          notification: notification
        });
        return this;
      }
      /**
       * Returns HTML Element which recevies key aria attributes
       *
       * @hidden
       */
    }, {
      key: "ariaAnchor",
      value: function ariaAnchor() {
        if (this.options.aria === "1.0") return this.input;
        return this.container;
      }
      /**
       * Returns current address query
       */
    }, {
      key: "query",
      value: function query() {
        return this.input.value;
      }
    }, {
      key: "clearInput",
      value: function clearInput() {
        update$1(this.input, "");
      }
      /**
       * Set address finder suggestions
       */
    }, {
      key: "setSuggestions",
      value: function setSuggestions(suggestions, query) {
        if (query !== this.query()) return this;
        if (suggestions.length === 0) return this.setMessage(this.options.msgNoMatch);
        this.fsm.send({
          type: "SUGGEST",
          suggestions: suggestions
        });
        return this;
      }
      /**
       * Close address finder
       */
    }, {
      key: "close",
      value: function close() {
        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "blur";
        hide(this.mainComponent);
        if (reason === "esc") update$1(this.input, "");
        this.options.onClose.call(this, reason);
      }
      /**
       * Updates suggestions and resets current selection
       * @hidden
       */
    }, {
      key: "updateSuggestions",
      value: function updateSuggestions(s) {
        this.suggestions = s;
        this.current = -1;
      }
      /**
       * Applies context to API cache
       * @hidden
       */
    }, {
      key: "applyContext",
      value: function applyContext(details) {
        var announce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var context = details.iso_3;
        this.context = context;
        this.cache.clear();
        this.countryIcon.innerText = details.emoji;
        if (announce) this.announce("Country switched to ".concat(details.description));
        this.options.onContextChange.call(this, context);
      }
      /**
       * Renders notification box
       * @hidden
       */
    }, {
      key: "renderNotice",
      value: function renderNotice() {
        this.list.innerHTML = "";
        this.input.setAttribute("aria-activedescendant", "");
        this.message.textContent = this.notification;
        this.announce(this.notification);
        this.list.appendChild(this.message);
      }
      /**
       * Open address finder
       * @hidden
       */
    }, {
      key: "open",
      value: function open() {
        show(this.mainComponent);
        this.options.onOpen.call(this);
      }
      /**
       * Sets next suggestion as current
       * @hidden
       */
    }, {
      key: "next",
      value: function next() {
        if (this.current + 1 > this.list.children.length - 1) {
          // Goes over edge of list and back to start
          this.current = 0;
        } else {
          this.current += 1;
        }
        return this;
      }
      /**
       * Sets previous suggestion as current
       * @hidden
       */
    }, {
      key: "previous",
      value: function previous() {
        if (this.current - 1 < 0) {
          this.current = this.list.children.length - 1; // Wrap to last elem
        } else {
          this.current += -1;
        }
        return this;
      }
      /**
       * Given a HTMLLiElement, scroll parent until it is in view
       * @hidden
       */
    }, {
      key: "scrollToView",
      value: function scrollToView(li) {
        var liOffset = li.offsetTop;
        var ulScrollTop = this.list.scrollTop;
        if (liOffset < ulScrollTop) {
          this.list.scrollTop = liOffset;
        }
        var ulHeight = this.list.clientHeight;
        var liHeight = li.clientHeight;
        if (liOffset + liHeight > ulScrollTop + ulHeight) {
          this.list.scrollTop = liOffset - ulHeight + liHeight;
        }
        return this;
      }
      /**
       * Moves currently selected li into view
       * @hidden
       */
    }, {
      key: "goto",
      value: function goto(i) {
        var lis = this.list.children;
        var suggestion = lis[i];
        if (i > -1 && lis.length > 0) {
          this.scrollToView(suggestion);
        } else {
          this.scrollToView(lis[0]);
        }
        return this;
      }
      /**
       * Returns true if address finder is open
       */
    }, {
      key: "opened",
      value: function opened() {
        return !this.closed();
      }
      /**
       * Returs false if address finder is closed
       */
    }, {
      key: "closed",
      value: function closed() {
        return this.fsm.state.matches("closed");
      }
      /**
       * Creates a clickable element that can trigger unhiding of fields
       */
    }, {
      key: "createUnhide",
      value: function createUnhide() {
        var _this6 = this;
        var e = findOrCreate(this.scope, this.options.unhide, function () {
          var e = _this6.options.document.createElement("p");
          e.innerText = _this6.options.msgUnhide;
          e.setAttribute("role", "button");
          e.setAttribute("tabindex", "0");
          if (_this6.options.unhideClass) e.className = _this6.options.unhideClass;
          return e;
        });
        e.addEventListener("click", this.unhideEvent);
        return e;
      }
      /**
       * Removes unhide elem from DOM
       */
    }, {
      key: "unmountUnhide",
      value: function unmountUnhide() {
        this.unhide.removeEventListener("click", this.unhideEvent);
        if (this.options.unhide == null && this.options.hide.length) remove(this.unhide);
      }
    }, {
      key: "hiddenFields",
      value: function hiddenFields() {
        var _this7 = this;
        return this.options.hide.map(function (e) {
          if (isString$2(e)) return toHtmlElem(_this7.options.scope, e);
          return e;
        }).filter(function (e) {
          return e !== null;
        });
      }
      /**
       * Hides fields marked for hiding
       */
    }, {
      key: "hideFields",
      value: function hideFields() {
        this.hiddenFields().forEach(hide);
      }
      /**
       * Unhides fields marked for hiding
       */
    }, {
      key: "unhideFields",
      value: function unhideFields() {
        this.hiddenFields().forEach(show);
        this.options.onUnhide.call(this);
      }
    }]);
    return Controller;
  }();
  /**
   * Event handler: Fires when focus moves away from input field
   * @hidden
   */
  var _onBlur = function _onBlur(c) {
    return function () {
      c.options.onBlur.call(c);
      c.fsm.send({
        type: "CLOSE",
        reason: "blur"
      });
    };
  };
  /**
   * Event handler: Fires when input field is focused
   * @hidden
   */
  var _onFocus = function _onFocus(c) {
    return function (_) {
      c.options.onFocus.call(c);
      c.fsm.send("AWAKE");
    };
  };
  /**
   * Event handler: Fires when input is detected on input field
   * @hidden
   */
  var _onInput = function _onInput(c) {
    return function (event) {
      if (c.query().toLowerCase() === ":c") {
        update$1(c.input, "");
        return c.fsm.send({
          type: "CHANGE_COUNTRY"
        });
      }
      c.fsm.send({
        type: "INPUT",
        event: event
      });
    };
  };
  /**
   * Event handler: Fires when country selection is clicked
   * Triggers:
   * - Country selection menu
   *
   * @hidden
   */
  var _onCountryToggle = function _onCountryToggle(c) {
    return function (e) {
      e.preventDefault();
      c.fsm.send({
        type: "CHANGE_COUNTRY"
      });
    };
  };
  /**
   * Event handler: Fires on "keyDown" event of search field
   * @hidden
   */
  var _onKeyDown = function _onKeyDown(c) {
    return function (event) {
      // Dispatch events based on keys
      var key = toKey(event);
      if (key === "Enter") event.preventDefault();
      c.options.onKeyDown.call(c, event);
      if (c.closed()) return c.fsm.send("AWAKE");
      // When suggesting country
      if (c.fsm.state.matches("suggesting_country")) {
        if (key === "Enter") {
          var contextDetails = c.filteredContexts()[c.current];
          if (contextDetails) c.fsm.send({
            type: "SELECT_COUNTRY",
            contextDetails: contextDetails
          });
        }
        if (key === "Backspace") c.fsm.send({
          type: "INPUT",
          event: event
        });
        if (key === "ArrowUp") {
          event.preventDefault();
          c.fsm.send("PREVIOUS");
        }
        if (key === "ArrowDown") {
          event.preventDefault();
          c.fsm.send("NEXT");
        }
      }
      // When suggesting address
      if (c.fsm.state.matches("suggesting")) {
        if (key === "Enter") {
          var suggestion = c.suggestions[c.current];
          if (suggestion) c.fsm.send({
            type: "SELECT_ADDRESS",
            suggestion: suggestion
          });
        }
        if (key === "Backspace") c.fsm.send({
          type: "INPUT",
          event: event
        });
        if (key === "ArrowUp") {
          event.preventDefault();
          c.fsm.send("PREVIOUS");
        }
        if (key === "ArrowDown") {
          event.preventDefault();
          c.fsm.send("NEXT");
        }
      }
      if (key === "Escape") c.fsm.send({
        type: "CLOSE",
        reason: "esc"
      });
      if (key === "Home") c.fsm.send({
        type: "RESET"
      });
      if (key === "End") c.fsm.send({
        type: "RESET"
      });
    };
  };
  // Event handler: Fires when country selection is changed
  var _onCountryChange = function _onCountryChange(c) {
    return function (event) {
      if (event.target === null) return;
      var target = event.target;
      if (!target) return;
      var contextDetails = findMatchingContext(target.value, c.options.contexts);
      c.fsm.send({
        type: "COUNTRY_CHANGE_EVENT",
        contextDetails: contextDetails
      });
    };
  };
  /**
   * Retrieve Element
   * - If string, assumes is valid and returns first match within scope
   * - If null, invokes the create method to return a default
   * - If HTMLElement returns instance
   * @hidden
   */
  var findOrCreate = function findOrCreate(scope, q, create) {
    if (isString$2(q)) return scope.querySelector(q);
    if (create && q === null) return create();
    return q;
  };
  var setPositionFixed = function setPositionFixed(mainComponent, container, document) {
    var setMinWith = function setMinWith(scope, component) {
      if (scope === null) return;
      var box = scope.getBoundingClientRect();
      component.style.minWidth = "".concat(Math.round(box.width), "px");
    };
    var parent = container.parentElement;
    mainComponent.style.position = "fixed";
    mainComponent.style.left = "auto";
    setMinWith(parent, mainComponent);
    document.defaultView !== null && document.defaultView.addEventListener("resize", function () {
      setMinWith(parent, mainComponent);
    });
  };
  var findMatchingContext = function findMatchingContext(name, contexts) {
    var n = name.toUpperCase();
    for (var _i = 0, _Object$values = Object.values(contexts); _i < _Object$values.length; _i++) {
      var context = _Object$values[_i];
      if (context.iso_3 === n) return context;
      if (context.iso_2 === n) return context;
      if (context.description.toUpperCase() === n) return context;
    }
    return undefined;
  };

  /**
   * Configure and launch an instance of the Address Finder
   *
   * This method will create and return a new AddressFinder instance. It will also add a global reference to the controller at `AddressFinder.controllers`
   */
  var setup = function setup(config) {
    var c = new Controller(config);
    controllers.push(c);
    return c;
  };
  /**
   * Configure and launch an instance of the Address Finder
   *
   * This is equivalent to invoking `setup` except inside a DOMContentLoaded event callback
   */
  var go = function go(config, d) {
    return new Promise(function (resolve, _) {
      (d || document).addEventListener("DOMContentLoaded", function (_) {
        var c = setup(config);
        return resolve(c);
      });
    }).catch(function (_) {
      return null;
    });
  };
  /**
   * Cache of Address Finder controllers
   */
  var controllers = [];

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var isTrue = function isTrue() {
    return true;
  };
  var getAnchors = function getAnchors(config, marker) {
    var scope = getScope(config.scope || null);
    var matches = scope.querySelectorAll(config.anchor || config.inputField || (config.outputFields || {}).line_1);
    return toArray$1(matches).filter(function (e) {
      return !loaded(e, marker);
    });
  };
  var DEFAULT_INTERVAL = 1000;
  var formScope = function formScope(anchor) {
    return getParent(anchor, "FORM");
  };
  /**
   * Dynamically apply AddressFinder when relevant fields appear
   * - Exits if page test is fails
   * - Check if key usable
   * - Creates a bind method
   *  - Retrives parent scope
   *  - Marks anchor if completed
   * - Creates timer tools
   */
  var watch = function watch(config) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var client = new Client(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, defaults), config), {}, {
      api_key: config.apiKey
    }));
    var _options$pageTest = options.pageTest,
      pageTest = _options$pageTest === void 0 ? isTrue : _options$pageTest;
    if (!pageTest()) return Promise.resolve(null);
    return checkKeyUsability({
      client: client
    }).then(function (key) {
      if (!key.available) return null;
      var _options$getScope = options.getScope,
        getScope = _options$getScope === void 0 ? formScope : _options$getScope,
        _options$interval = options.interval,
        interval = _options$interval === void 0 ? DEFAULT_INTERVAL : _options$interval,
        anchor = options.anchor,
        _options$onBind = options.onBind,
        onBind = _options$onBind === void 0 ? NOOP : _options$onBind,
        _options$onAnchorFoun = options.onAnchorFound,
        onAnchorFound = _options$onAnchorFoun === void 0 ? NOOP : _options$onAnchorFoun,
        _options$onBindAttemp = options.onBindAttempt,
        onBindAttempt = _options$onBindAttemp === void 0 ? NOOP : _options$onBindAttemp,
        _options$immediate = options.immediate,
        immediate = _options$immediate === void 0 ? true : _options$immediate,
        _options$marker = options.marker,
        marker = _options$marker === void 0 ? "idpc" : _options$marker;
      var bind = function bind() {
        onBindAttempt({
          config: config,
          options: options
        });
        getAnchors(_objectSpread$1({
          anchor: anchor
        }, config), marker).forEach(function (anchor) {
          var scope = getScope(anchor);
          if (!scope) return;
          var contexts = toContextMap(key.contexts);
          var newConfig = _objectSpread$1(_objectSpread$1({
            scope: scope
          }, config), {}, {
            checkKey: false,
            contexts: contexts
          });
          onAnchorFound({
            anchor: anchor,
            scope: scope,
            config: newConfig
          });
          var c = setup(newConfig);
          var details = c.options.contexts[key.context];
          if (c.options.detectCountry && details) {
            c.applyContext(details, false);
          } else {
            c.applyContext(c.currentContext(), false);
          }
          markLoaded(anchor, marker);
          onBind(c);
        });
      };
      var _generateTimer = generateTimer({
          bind: bind,
          pageTest: pageTest,
          interval: interval
        }),
        start = _generateTimer.start,
        stop = _generateTimer.stop;
      if (immediate) start();
      return {
        start: start,
        stop: stop,
        bind: bind
      };
    }).catch(function (e) {
      // Swallow promise errors and raise via optionall onError callback
      if (options.onError) options.onError(e);
      return null;
    });
  };

  /**
   * @module Address-Finder Exports
   */
  /**
   * Namespace that exports Address Finder methods and classes
   */
  var AddressFinder = {
    setup: setup,
    controllers: controllers,
    Controller: Controller,
    defaults: defaults,
    watch: watch,
    go: go
  };

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  AddressFinder.defaults.baseUrl = "api.addresszen.com";
  AddressFinder.defaults.defaultCountry = "USA";
  AddressFinder.defaults.format = "usa";
  AddressFinder.defaults.titleizePostTown = false;
  var AddressLookup = _objectSpread({}, AddressFinder);
  var setupAutocomplete = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(config, outputFields) {
      var options,
        _args = arguments;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            if (config.autocomplete) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            if (!(outputFields.line_1 === undefined)) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return");
          case 5:
            _context.next = 7;
            return AddressLookup.watch(_objectSpread({
              apiKey: config.apiKey,
              checkKey: true,
              removeOrganisation: config.removeOrganisation,
              populateCounty: config.populateCounty,
              defaultCountry: "USA",
              outputFields: outputFields
            }, config.autocompleteOverride), options);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function setupAutocomplete(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var includes = function includes(haystack, needle) {
    return haystack.indexOf(needle) !== -1;
  };

  var billing = {
    line_1: '[name="order[billing_address][street][0]"]',
    line_2: '[name="order[billing_address][street][1]"]',
    line_3: '[name="order[billing_address][street][2]"]',
    zip_plus_4_code: '[name="order[billing_address][postcode]"]',
    city: '[name="order[billing_address][city]"]',
    organisation_name: '[name="order[billing_address][company]"]',
    state_abbreviation: '[name="order[billing_address][region_id]"]',
    country: '[name="order[billing_address][country_id]"]'
  };
  var shipping = {
    line_1: '[name="order[shipping_address][street][0]"]',
    line_2: '[name="order[shipping_address][street][1]"]',
    line_3: '[name="order[shipping_address][street][2]"]',
    zip_plus_4_code: '[name="order[shipping_address][postcode]"]',
    city: '[name="order[shipping_address][city]"]',
    organisation_name: '[name="order[shipping_address][company]"]',
    state_abbreviation: '[name="order[shipping_address][region_id]"]',
    country: '[name="order[shipping_address][country_id]"]'
  };
  var selectorList = [billing, shipping];
  var parentScope$2 = "fieldset";
  var bind$3 = function bind(config) {
    selectorList.forEach(function (selectors) {
      setupAutocomplete(config, selectors, {
        pageTest: pageTest$3,
        getScope: function getScope(anchor) {
          return getParent(anchor, parentScope$2);
        }
      });
    });
  };
  var pageTest$3 = function pageTest() {
    return includes(window.location.pathname, "/sales");
  };

  var selectors = {
    line_1: '[name="street[0]"]',
    line_2: '[name="street[1]"]',
    line_3: '[name="street[2]"]',
    zip_plus_4_code: '[name="postcode"]',
    city: '[name="city"]',
    organisation_name: '[name="company"]',
    state_abbreviation: '[name="region_id"]',
    country: '[name="country_id"]'
  };

  var bind$2 = function bind(config) {
    setupAutocomplete(config, selectors, {
      pageTest: pageTest$2
    });
  };
  var pageTest$2 = function pageTest() {
    return includes(window.location.pathname, "/sales/order");
  };

  var parentScope$1 = "fieldset";
  var parentTest$1 = function parentTest(e) {
    return e.className === "admin__fieldset";
  };
  var pageTest$1 = function pageTest() {
    return includes(window.location.pathname, "/customer");
  };
  var bind$1 = function bind(config) {
    setupAutocomplete(config, selectors, {
      pageTest: pageTest$1,
      getScope: function getScope(anchor) {
        return getParent(anchor, parentScope$1, parentTest$1);
      }
    });
  };

  var parentScope = "fieldset";
  var parentTest = function parentTest(e) {
    return e.className === "admin__fieldset";
  };
  var pageTest = function pageTest() {
    return true;
  };
  var bind = function bind(config) {
    var fields = config.customFields || [];
    fields.forEach(function (selectors) {
      setupAutocomplete(config, selectors, {
        pageTest: pageTest,
        getScope: function getScope(anchor) {
          var parent = getParent(anchor, parentScope, parentTest);
          if (parent) return parent;
          return getParent(anchor, "FORM");
        }
      });
    });
  };

  window.zenStart = function () {
    return [bind$3, bind$1, bind$2, bind].forEach(function (bind) {
      var conf = config();
      if (conf) bind(conf);
    });
  };

})();
