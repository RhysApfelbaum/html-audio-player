var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/css-filter-converter/lib/shared/consts/errors.js
var require_errors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MUST_INSTALL_PUPPETEER = exports.DEFAULT_CONVERSION_ERROR_MESSAGE = exports.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION = exports.UNEXPECTED_ERROR_MESSAGE_LINK = exports.UNEXPECTED_ERROR_MESSAGE_PREFIX = undefined;
  exports.UNEXPECTED_ERROR_MESSAGE_PREFIX = "Unexpected error has occurred, please report this by using the following link: ";
  exports.UNEXPECTED_ERROR_MESSAGE_LINK = "https://github.com/OvidijusParsiunas/css-filter-converter/issues/new";
  exports.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION = exports.UNEXPECTED_ERROR_MESSAGE_PREFIX + exports.UNEXPECTED_ERROR_MESSAGE_LINK;
  exports.DEFAULT_CONVERSION_ERROR_MESSAGE = "Input value is invalid";
  exports.MUST_INSTALL_PUPPETEER = "To convert filter values to color in Node - you will first need to install 'puppeteer' by running:" + ` 
 npm install puppeteer`;
});

// node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js
var require_errorHandling = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ErrorHandling = undefined;
  var errors_1 = require_errors();

  class ErrorHandling {
    static generateErrorResult(message) {
      return { color: null, error: { message } };
    }
    static generateInputErrorMessage(colorType, colorString, format) {
      const errorPrefix = `Input ${colorType} color string could not be parsed.`;
      const actualStringReceived = `String received: ${colorString}.`;
      const messageStrings = [errorPrefix, actualStringReceived];
      if (format) {
        const expectedFormat = `Expected format: ${format}.`;
        messageStrings.splice(1, 0, expectedFormat);
      }
      return messageStrings.join(" ");
    }
    static generateUnexpectedError(error) {
      const errorMessage = `${errors_1.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION}: 
${error.message}`;
      return ErrorHandling.generateErrorResult(errorMessage);
    }
    static hasError(param) {
      return !!param.errorMessage;
    }
  }
  exports.ErrorHandling = ErrorHandling;
});

// node_modules/css-filter-converter/lib/shared/functionality/sheen/sheenUtil.js
var require_sheenUtil = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SheenUtil = undefined;

  class SheenUtil {
    static parseSheenFromOptions(options) {
      if (options) {
        if (typeof options.sheen === "boolean")
          return options.sheen;
      }
      return true;
    }
  }
  exports.SheenUtil = SheenUtil;
  SheenUtil.SHEEN_FILTER_PREFIX = "brightness(0) saturate(100%)";
});

// node_modules/css-filter-converter/lib/shared/consts/colorTypes.js
var require_colorTypes = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorTypes = undefined;
  var ColorTypes;
  (function(ColorTypes2) {
    ColorTypes2["HEX"] = "hex";
    ColorTypes2["RGB"] = "rgb";
    ColorTypes2["HSL"] = "hsl";
    ColorTypes2["KEYWORD"] = "keyword";
    ColorTypes2["FILTER"] = "filter";
  })(ColorTypes = exports.ColorTypes || (exports.ColorTypes = {}));
});

// node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbColor.js
var require_rgbColor = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RgbColor = undefined;

  class RgbColor {
    constructor(rgb = [0, 0, 0]) {
      this.r = this.clamp(rgb[0]);
      this.g = this.clamp(rgb[1]);
      this.b = this.clamp(rgb[2]);
    }
    clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      return value;
    }
    setRgb(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }
    multiply(matrix) {
      const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }
    hueRotate(angle = 0) {
      angle = angle / 180 * Math.PI;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      this.multiply([
        0.213 + cos * 0.787 - sin * 0.213,
        0.715 - cos * 0.715 - sin * 0.715,
        0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143,
        0.715 + cos * 0.285 + sin * 0.14,
        0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787,
        0.715 - cos * 0.715 + sin * 0.715,
        0.072 + cos * 0.928 + sin * 0.072
      ]);
    }
    sepia(value = 1) {
      this.multiply([
        0.393 + 0.607 * (1 - value),
        0.769 - 0.769 * (1 - value),
        0.189 - 0.189 * (1 - value),
        0.349 - 0.349 * (1 - value),
        0.686 + 0.314 * (1 - value),
        0.168 - 0.168 * (1 - value),
        0.272 - 0.272 * (1 - value),
        0.534 - 0.534 * (1 - value),
        0.131 + 0.869 * (1 - value)
      ]);
    }
    saturate(value = 1) {
      this.multiply([
        0.213 + 0.787 * value,
        0.715 - 0.715 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 + 0.285 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 - 0.715 * value,
        0.072 + 0.928 * value
      ]);
    }
    linear(slope = 1, intercept = 0) {
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }
    brightness(value = 1) {
      this.linear(value);
    }
    contrast(value = 1) {
      this.linear(value, -(0.5 * value) + 0.5);
    }
    invert(value = 1) {
      this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }
  }
  exports.RgbColor = RgbColor;
});

// node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilterWorker.js
var require_rgbToFilterWorker = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RgbToFilterWorker = undefined;
  var sheenUtil_1 = require_sheenUtil();
  var rgbColor_1 = require_rgbColor();

  class RgbToFilterWorker {
    constructor(targetRgbColor, addSheen) {
      this.targetRgbColor = targetRgbColor;
      this.reusedRgbColor = new rgbColor_1.RgbColor;
      this.addSheen = addSheen;
    }
    static fmt(filters, idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    generateCss(filters) {
      const prefix = this.addSheen ? `${sheenUtil_1.SheenUtil.SHEEN_FILTER_PREFIX} ` : "";
      return `${prefix}invert(${RgbToFilterWorker.fmt(filters, 0)}%) sepia(${RgbToFilterWorker.fmt(filters, 1)}%) saturate(${RgbToFilterWorker.fmt(filters, 2)}%) hue-rotate(${RgbToFilterWorker.fmt(filters, 3, 3.6)}deg) brightness(${RgbToFilterWorker.fmt(filters, 4)}%) contrast(${RgbToFilterWorker.fmt(filters, 5)}%)`;
    }
    loss(filters) {
      this.reusedRgbColor.setRgb(0, 0, 0);
      this.reusedRgbColor.invert(filters[0] / 100);
      this.reusedRgbColor.sepia(filters[1] / 100);
      this.reusedRgbColor.saturate(filters[2] / 100);
      this.reusedRgbColor.hueRotate(filters[3] * 3.6);
      this.reusedRgbColor.brightness(filters[4] / 100);
      this.reusedRgbColor.contrast(filters[5] / 100);
      return Math.abs(this.reusedRgbColor.r - this.targetRgbColor.r) + Math.abs(this.reusedRgbColor.g - this.targetRgbColor.g) + Math.abs(this.reusedRgbColor.b - this.targetRgbColor.b);
    }
    static fixSpsa(value, idx) {
      let max = 100;
      if (idx === 2) {
        max = 7500;
      } else if (idx === 4 || idx === 5) {
        max = 200;
      }
      if (idx === 3) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
    spsa(A, a, c, values, iters) {
      const alpha = 1;
      const gamma = 0.16666666666666666;
      let best = [];
      let bestLoss = Infinity;
      const deltas = new Array(6);
      const highArgs = new Array(6);
      const lowArgs = new Array(6);
      for (let k = 0;k < iters; k += 1) {
        const ck = c / Math.pow(k + 1, gamma);
        for (let i = 0;i < 6; i += 1) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }
        const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (let i = 0;i < 6; i += 1) {
          const g = lossDiff / (2 * ck) * deltas[i];
          const ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = RgbToFilterWorker.fixSpsa(values[i] - ak * g, i);
        }
        const loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return { values: best, loss: bestLoss };
    }
    solveNarrow(wide) {
      const A = wide.loss;
      const c = 2;
      const A1 = A + 1;
      const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }
    solveWide() {
      const A = 5;
      const c = 15;
      const a = [60, 180, 18000, 600, 1.2, 1.2];
      let best = { values: [], loss: Infinity };
      for (let i = 0;best.loss > 25 && i < 3; i += 1) {
        const initial = [50, 20, 3750, 50, 100, 100];
        const result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }
    convert() {
      const result = this.solveNarrow(this.solveWide());
      return {
        loss: result.loss,
        color: this.generateCss(result.values)
      };
    }
  }
  exports.RgbToFilterWorker = RgbToFilterWorker;
});

// node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilter.js
var require_rgbToFilter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RgbToFilter = undefined;
  var errorHandling_1 = require_errorHandling();
  var errors_1 = require_errors();
  var rgbToFilterWorker_1 = require_rgbToFilterWorker();
  var rgbColor_1 = require_rgbColor();

  class RgbToFilter {
    static generateConversionError(conversionErrorMessage) {
      const errorMessage = conversionErrorMessage || errors_1.DEFAULT_CONVERSION_ERROR_MESSAGE;
      return errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
    }
    static generateValidateAndParseError(errorMessage) {
      return errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
    }
    static execute(rgb, addSheen) {
      const rgbColor = new rgbColor_1.RgbColor(rgb);
      const rgbToFilter = new rgbToFilterWorker_1.RgbToFilterWorker(rgbColor, addSheen);
      return rgbToFilter.convert();
    }
    static convertToRGB(parseResultColor, convertToRgb) {
      if (parseResultColor && convertToRgb) {
        return convertToRgb(parseResultColor);
      }
      return null;
    }
    static convert(conversionProps) {
      try {
        const { colorString, validateAndParse, convertToRgb, conversionErrorMessage, addSheen } = conversionProps;
        const trimmedString = colorString.trim().toLocaleLowerCase();
        const parseResult = (validateAndParse === null || validateAndParse === undefined ? undefined : validateAndParse(trimmedString)) || { color: trimmedString };
        if (errorHandling_1.ErrorHandling.hasError(parseResult))
          return RgbToFilter.generateValidateAndParseError(parseResult.errorMessage);
        const rgbColor = RgbToFilter.convertToRGB(parseResult.color, convertToRgb) || parseResult.color;
        if (!rgbColor)
          return RgbToFilter.generateConversionError(conversionErrorMessage);
        return RgbToFilter.execute(rgbColor, addSheen);
      } catch (error) {
        return errorHandling_1.ErrorHandling.generateUnexpectedError(error);
      }
    }
  }
  exports.RgbToFilter = RgbToFilter;
});

// node_modules/css-filter-converter/lib/shared/consts/regex.js
var require_regex = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MATCH_HEXADECIMAL = exports.MATCH_INTEGER_AND_FLOAT_NUMBERS = undefined;
  exports.MATCH_INTEGER_AND_FLOAT_NUMBERS = /(-?\d+(?:\.\d+)?)/g;
  exports.MATCH_HEXADECIMAL = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
});

// node_modules/css-filter-converter/lib/shared/consts/inputLimits.js
var require_inputLimits = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MAX_COLOR_INPUT_STRING_LENGTH = undefined;
  exports.MAX_COLOR_INPUT_STRING_LENGTH = 25;
});

// node_modules/css-filter-converter/lib/shared/consts/colorFormats.js
var require_colorFormats = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorFormats = undefined;
  var ColorFormats;
  (function(ColorFormats2) {
    ColorFormats2["HEX"] = "#ffffff or #fff";
    ColorFormats2["RGB"] = "rgb([0-255], [0-255], [0-255]) or rgb([0-255], [0-255], [0-255], [0-1]) or rgb([0-100%], [0-100%], [0-100%]) or rgb([0-100%], [0-100%], [0-100%], [0-100%]) or [0-255], [0-255], [0-255] or [0-255] [0-255] [0-255]";
    ColorFormats2["HSL"] = "hsl([0-360], [0-100], [0-100]) or hsl([0-360], [0-100%], [0-100%]) or [0-360], [0-100], [0-100] or [0-360] [0-100] [0-100]";
    ColorFormats2["FILTER"] = "blur(), brightness(), contrast(), drop-shadow(), grayscale(), hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%)";
    ColorFormats2["KEYWORD"] = "Generic color string. See the following link for all available colors: https://github.com/colorjs/color-name/blob/master/index.js";
  })(ColorFormats = exports.ColorFormats || (exports.ColorFormats = {}));
});

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/css-filter-converter/lib/colorToFilter/colorParser/colorParser.js
var require_colorParser = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorParser = undefined;
  var regex_1 = require_regex();
  var errorHandling_1 = require_errorHandling();
  var inputLimits_1 = require_inputLimits();
  var colorFormats_1 = require_colorFormats();
  var colorTypes_1 = require_colorTypes();
  var color_name_1 = __importDefault(require_color_name());

  class ColorParser {
    static validateAndParseHex(hexString) {
      if (hexString.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
        const isValid = hexString.match(regex_1.MATCH_HEXADECIMAL);
        if (isValid)
          return { color: hexString };
      }
      return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.HEX, hexString, colorFormats_1.ColorFormats.HEX) };
    }
    static parseFirstThreeIntegersFromString(color) {
      if (color.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
        const regexResult = color.match(regex_1.MATCH_INTEGER_AND_FLOAT_NUMBERS);
        regex_1.MATCH_INTEGER_AND_FLOAT_NUMBERS.lastIndex = 0;
        if (regexResult && regexResult.length >= 3) {
          return regexResult.slice(0, 3).map((numberString) => Number.parseInt(numberString));
        }
      }
      return null;
    }
    static validateAndParseRgb(rgbString) {
      const rgb = ColorParser.parseFirstThreeIntegersFromString(rgbString);
      if (rgb && rgb[0] >= 0 && rgb[0] <= 255 && rgb[1] >= 0 && rgb[1] <= 255 && rgb[2] >= 0 && rgb[2] <= 255) {
        return { color: rgb };
      }
      return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.RGB, rgbString, colorFormats_1.ColorFormats.RGB) };
    }
    static validateAndParseHsl(hslString) {
      const hsl = ColorParser.parseFirstThreeIntegersFromString(hslString);
      if (hsl && hsl[0] >= 0 && hsl[0] <= 360 && hsl[1] >= 0 && hsl[1] <= 100 && hsl[2] >= 0 && hsl[2] <= 100) {
        return { color: hsl };
      }
      return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.HSL, hslString, colorFormats_1.ColorFormats.HSL) };
    }
    static validateAndParseKeyword(keyword) {
      if (keyword.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
        const isValid = color_name_1.default[keyword];
        if (isValid)
          return { color: keyword };
      }
      return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.KEYWORD, keyword, colorFormats_1.ColorFormats.KEYWORD) };
    }
  }
  exports.ColorParser = ColorParser;
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  module.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0;i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0;i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0;i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0;i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0;i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert;
});

// node_modules/css-filter-converter/lib/colorToFilter/colorToFilter.js
var require_colorToFilter = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorToFilter = undefined;
  var errorHandling_1 = require_errorHandling();
  var sheenUtil_1 = require_sheenUtil();
  var colorTypes_1 = require_colorTypes();
  var rgbToFilter_1 = require_rgbToFilter();
  var colorParser_1 = require_colorParser();
  var color_convert_1 = __importDefault(require_color_convert());

  class ColorToFilter {
    static rgbToFilter(rgbString, options) {
      return rgbToFilter_1.RgbToFilter.convert({
        colorString: rgbString,
        validateAndParse: colorParser_1.ColorParser.validateAndParseRgb,
        addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options)
      });
    }
    static hexToFilter(hexString, options) {
      return rgbToFilter_1.RgbToFilter.convert({
        colorString: hexString,
        validateAndParse: colorParser_1.ColorParser.validateAndParseHex,
        convertToRgb: color_convert_1.default.hex.rgb,
        addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options)
      });
    }
    static hslToFilter(hslString, options) {
      return rgbToFilter_1.RgbToFilter.convert({
        colorString: hslString,
        validateAndParse: colorParser_1.ColorParser.validateAndParseHsl,
        convertToRgb: color_convert_1.default.hsl.rgb,
        addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options)
      });
    }
    static keywordToFilter(keyword, options) {
      return rgbToFilter_1.RgbToFilter.convert({
        colorString: keyword,
        validateAndParse: colorParser_1.ColorParser.validateAndParseKeyword,
        convertToRgb: color_convert_1.default.keyword.rgb,
        conversionErrorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.KEYWORD, keyword),
        addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options)
      });
    }
  }
  exports.ColorToFilter = ColorToFilter;
});

// node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/shared.js
var require_shared = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FilterToHexShared = undefined;
  var errorHandling_1 = require_errorHandling();
  var colorFormats_1 = require_colorFormats();
  var colorTypes_1 = require_colorTypes();

  class FilterToHexShared {
    static generateInputErrorMessage(filterString) {
      return errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.FILTER, filterString, colorFormats_1.ColorFormats.FILTER);
    }
    static addSVGElementsToDOMAndValidateFilter(filterString, svgSideLength = 1) {
      function createSVGElement() {
        const xmlns = "http://www.w3.org/2000/svg";
        const svgElement2 = document.createElementNS(xmlns, "svg");
        svgElement2.style.height = "inherit";
        svgElement2.style.width = "inherit";
        svgElement2.style.float = "left";
        svgElement2.style.filter = filterString;
        const rect = document.createElementNS(xmlns, "rect");
        rect.setAttributeNS(null, "width", svgSideLength.toString());
        rect.setAttributeNS(null, "height", svgSideLength.toString());
        svgElement2.appendChild(rect);
        return svgElement2;
      }
      function createSVGContainerElement() {
        const svgContainerElement2 = document.createElement("div");
        svgContainerElement2.style.height = `${svgSideLength}px`;
        svgContainerElement2.style.width = `${svgSideLength}px`;
        svgContainerElement2.style.position = "absolute";
        svgContainerElement2.style.top = "0px";
        svgContainerElement2.style.left = "0px";
        return svgContainerElement2;
      }
      const svgContainerElement = createSVGContainerElement();
      const svgElement = createSVGElement();
      if (svgElement.style.filter === "")
        return { errorMessage: "error indicator", svgContainerElement };
      svgContainerElement.appendChild(svgElement);
      document.body.appendChild(svgContainerElement);
      return { svgContainerElement };
    }
    static async getColorViaImageDataURL(base64EncodedDataURL) {
      function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
          throw new Error("Invalid color component");
        return (r << 16 | g << 8 | b).toString(16);
      }
      function getData(canvasElement2) {
        const canvasStartCoordinate = 0;
        const canvasFinalCoordinate = canvasElement2.width;
        return canvasElement2.getContext("2d").getImageData(canvasStartCoordinate, canvasStartCoordinate, canvasFinalCoordinate, canvasFinalCoordinate).data;
      }
      function getCanvasHexColor(canvasElement2) {
        const data = getData(canvasElement2);
        const hex = rgbToHex(data[0], data[1], data[2]);
        return `#${`000000${hex}`.slice(-6)}`;
      }
      function createCanvasElement(imageElement2) {
        const canvasElement2 = document.createElement("canvas");
        canvasElement2.width = imageElement2.width;
        canvasElement2.height = imageElement2.height;
        canvasElement2.getContext("2d").drawImage(imageElement2, 0, 0, imageElement2.width, imageElement2.height);
        return canvasElement2;
      }
      async function createImage() {
        const imageElement2 = new Image;
        imageElement2.src = base64EncodedDataURL;
        return new Promise((resolve) => {
          setTimeout(() => resolve(imageElement2));
        });
      }
      const imageElement = await createImage();
      const canvasElement = createCanvasElement(imageElement);
      return getCanvasHexColor(canvasElement);
    }
  }
  exports.FilterToHexShared = FilterToHexShared;
});

// node_modules/dom-to-image/src/dom-to-image.js
var require_dom_to_image = __commonJS((exports, module) => {
  (function(global) {
    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();
    var defaultOptions = {
      imagePlaceholder: undefined,
      cacheBust: false
    };
    var domtoimage = {
      toSvg,
      toPng,
      toJpeg,
      toBlob,
      toPixelData,
      impl: {
        fontFaces,
        images,
        util,
        inliner,
        options: {}
      }
    };
    if (typeof module !== "undefined")
      module.exports = domtoimage;
    else
      global.domtoimage = domtoimage;
    function toSvg(node, options) {
      options = options || {};
      copyOptions(options);
      return Promise.resolve(node).then(function(node2) {
        return cloneNode(node2, options.filter, true);
      }).then(embedFonts).then(inlineImages).then(applyOptions).then(function(clone) {
        return makeSvgDataUri(clone, options.width || util.width(node), options.height || util.height(node));
      });
      function applyOptions(clone) {
        if (options.bgcolor)
          clone.style.backgroundColor = options.bgcolor;
        if (options.width)
          clone.style.width = options.width + "px";
        if (options.height)
          clone.style.height = options.height + "px";
        if (options.style)
          Object.keys(options.style).forEach(function(property) {
            clone.style[property] = options.style[property];
          });
        return clone;
      }
    }
    function toPixelData(node, options) {
      return draw(node, options || {}).then(function(canvas) {
        return canvas.getContext("2d").getImageData(0, 0, util.width(node), util.height(node)).data;
      });
    }
    function toPng(node, options) {
      return draw(node, options || {}).then(function(canvas) {
        return canvas.toDataURL();
      });
    }
    function toJpeg(node, options) {
      options = options || {};
      return draw(node, options).then(function(canvas) {
        return canvas.toDataURL("image/jpeg", options.quality || 1);
      });
    }
    function toBlob(node, options) {
      return draw(node, options || {}).then(util.canvasToBlob);
    }
    function copyOptions(options) {
      if (typeof options.imagePlaceholder === "undefined") {
        domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
      } else {
        domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
      }
      if (typeof options.cacheBust === "undefined") {
        domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
      } else {
        domtoimage.impl.options.cacheBust = options.cacheBust;
      }
    }
    function draw(domNode, options) {
      return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function(image) {
        var canvas = newCanvas(domNode);
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
      });
      function newCanvas(domNode2) {
        var canvas = document.createElement("canvas");
        canvas.width = options.width || util.width(domNode2);
        canvas.height = options.height || util.height(domNode2);
        if (options.bgcolor) {
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = options.bgcolor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return canvas;
      }
    }
    function cloneNode(node, filter, root) {
      if (!root && filter && !filter(node))
        return Promise.resolve();
      return Promise.resolve(node).then(makeNodeCopy).then(function(clone) {
        return cloneChildren(node, clone, filter);
      }).then(function(clone) {
        return processClone(node, clone);
      });
      function makeNodeCopy(node2) {
        if (node2 instanceof HTMLCanvasElement)
          return util.makeImage(node2.toDataURL());
        return node2.cloneNode(false);
      }
      function cloneChildren(original, clone, filter2) {
        var children = original.childNodes;
        if (children.length === 0)
          return Promise.resolve(clone);
        return cloneChildrenInOrder(clone, util.asArray(children), filter2).then(function() {
          return clone;
        });
        function cloneChildrenInOrder(parent, children2, filter3) {
          var done = Promise.resolve();
          children2.forEach(function(child) {
            done = done.then(function() {
              return cloneNode(child, filter3);
            }).then(function(childClone) {
              if (childClone)
                parent.appendChild(childClone);
            });
          });
          return done;
        }
      }
      function processClone(original, clone) {
        if (!(clone instanceof Element))
          return clone;
        return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function() {
          return clone;
        });
        function cloneStyle() {
          copyStyle(window.getComputedStyle(original), clone.style);
          function copyStyle(source, target) {
            if (source.cssText)
              target.cssText = source.cssText;
            else
              copyProperties(source, target);
            function copyProperties(source2, target2) {
              util.asArray(source2).forEach(function(name) {
                target2.setProperty(name, source2.getPropertyValue(name), source2.getPropertyPriority(name));
              });
            }
          }
        }
        function clonePseudoElements() {
          [":before", ":after"].forEach(function(element) {
            clonePseudoElement(element);
          });
          function clonePseudoElement(element) {
            var style = window.getComputedStyle(original, element);
            var content = style.getPropertyValue("content");
            if (content === "" || content === "none")
              return;
            var className = util.uid();
            clone.className = clone.className + " " + className;
            var styleElement = document.createElement("style");
            styleElement.appendChild(formatPseudoElementStyle(className, element, style));
            clone.appendChild(styleElement);
            function formatPseudoElementStyle(className2, element2, style2) {
              var selector = "." + className2 + ":" + element2;
              var cssText = style2.cssText ? formatCssText(style2) : formatCssProperties(style2);
              return document.createTextNode(selector + "{" + cssText + "}");
              function formatCssText(style3) {
                var content2 = style3.getPropertyValue("content");
                return style3.cssText + " content: " + content2 + ";";
              }
              function formatCssProperties(style3) {
                return util.asArray(style3).map(formatProperty).join("; ") + ";";
                function formatProperty(name) {
                  return name + ": " + style3.getPropertyValue(name) + (style3.getPropertyPriority(name) ? " !important" : "");
                }
              }
            }
          }
        }
        function copyUserInput() {
          if (original instanceof HTMLTextAreaElement)
            clone.innerHTML = original.value;
          if (original instanceof HTMLInputElement)
            clone.setAttribute("value", original.value);
        }
        function fixSvg() {
          if (!(clone instanceof SVGElement))
            return;
          clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          if (!(clone instanceof SVGRectElement))
            return;
          ["width", "height"].forEach(function(attribute) {
            var value = clone.getAttribute(attribute);
            if (!value)
              return;
            clone.style.setProperty(attribute, value);
          });
        }
      }
    }
    function embedFonts(node) {
      return fontFaces.resolveAll().then(function(cssText) {
        var styleNode = document.createElement("style");
        node.appendChild(styleNode);
        styleNode.appendChild(document.createTextNode(cssText));
        return node;
      });
    }
    function inlineImages(node) {
      return images.inlineAll(node).then(function() {
        return node;
      });
    }
    function makeSvgDataUri(node, width, height) {
      return Promise.resolve(node).then(function(node2) {
        node2.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        return new XMLSerializer().serializeToString(node2);
      }).then(util.escapeXhtml).then(function(xhtml) {
        return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + "</foreignObject>";
      }).then(function(foreignObject) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + "</svg>";
      }).then(function(svg) {
        return "data:image/svg+xml;charset=utf-8," + svg;
      });
    }
    function newUtil() {
      return {
        escape,
        parseExtension,
        mimeType,
        dataAsUrl,
        isDataUrl,
        canvasToBlob,
        resolveUrl,
        getAndEncode,
        uid: uid(),
        delay,
        asArray,
        escapeXhtml,
        makeImage,
        width,
        height
      };
      function mimes() {
        var WOFF = "application/font-woff";
        var JPEG = "image/jpeg";
        return {
          woff: WOFF,
          woff2: WOFF,
          ttf: "application/font-truetype",
          eot: "application/vnd.ms-fontobject",
          png: "image/png",
          jpg: JPEG,
          jpeg: JPEG,
          gif: "image/gif",
          tiff: "image/tiff",
          svg: "image/svg+xml"
        };
      }
      function parseExtension(url) {
        var match = /\.([^\.\/]*?)$/g.exec(url);
        if (match)
          return match[1];
        else
          return "";
      }
      function mimeType(url) {
        var extension = parseExtension(url).toLowerCase();
        return mimes()[extension] || "";
      }
      function isDataUrl(url) {
        return url.search(/^(data:)/) !== -1;
      }
      function toBlob2(canvas) {
        return new Promise(function(resolve) {
          var binaryString = window.atob(canvas.toDataURL().split(",")[1]);
          var length = binaryString.length;
          var binaryArray = new Uint8Array(length);
          for (var i = 0;i < length; i++)
            binaryArray[i] = binaryString.charCodeAt(i);
          resolve(new Blob([binaryArray], {
            type: "image/png"
          }));
        });
      }
      function canvasToBlob(canvas) {
        if (canvas.toBlob)
          return new Promise(function(resolve) {
            canvas.toBlob(resolve);
          });
        return toBlob2(canvas);
      }
      function resolveUrl(url, baseUrl) {
        var doc = document.implementation.createHTMLDocument();
        var base = doc.createElement("base");
        doc.head.appendChild(base);
        var a = doc.createElement("a");
        doc.body.appendChild(a);
        base.href = baseUrl;
        a.href = url;
        return a.href;
      }
      function uid() {
        var index = 0;
        return function() {
          return "u" + fourRandomChars() + index++;
          function fourRandomChars() {
            return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
          }
        };
      }
      function makeImage(uri) {
        return new Promise(function(resolve, reject) {
          var image = new Image;
          image.onload = function() {
            resolve(image);
          };
          image.onerror = reject;
          image.src = uri;
        });
      }
      function getAndEncode(url) {
        var TIMEOUT = 30000;
        if (domtoimage.impl.options.cacheBust) {
          url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
        }
        return new Promise(function(resolve) {
          var request = new XMLHttpRequest;
          request.onreadystatechange = done;
          request.ontimeout = timeout;
          request.responseType = "blob";
          request.timeout = TIMEOUT;
          request.open("GET", url, true);
          request.send();
          var placeholder;
          if (domtoimage.impl.options.imagePlaceholder) {
            var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
            if (split && split[1]) {
              placeholder = split[1];
            }
          }
          function done() {
            if (request.readyState !== 4)
              return;
            if (request.status !== 200) {
              if (placeholder) {
                resolve(placeholder);
              } else {
                fail("cannot fetch resource: " + url + ", status: " + request.status);
              }
              return;
            }
            var encoder = new FileReader;
            encoder.onloadend = function() {
              var content = encoder.result.split(/,/)[1];
              resolve(content);
            };
            encoder.readAsDataURL(request.response);
          }
          function timeout() {
            if (placeholder) {
              resolve(placeholder);
            } else {
              fail("timeout of " + TIMEOUT + "ms occured while fetching resource: " + url);
            }
          }
          function fail(message) {
            console.error(message);
            resolve("");
          }
        });
      }
      function dataAsUrl(content, type) {
        return "data:" + type + ";base64," + content;
      }
      function escape(string) {
        return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
      }
      function delay(ms) {
        return function(arg) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              resolve(arg);
            }, ms);
          });
        };
      }
      function asArray(arrayLike) {
        var array = [];
        var length = arrayLike.length;
        for (var i = 0;i < length; i++)
          array.push(arrayLike[i]);
        return array;
      }
      function escapeXhtml(string) {
        return string.replace(/#/g, "%23").replace(/\n/g, "%0A");
      }
      function width(node) {
        var leftBorder = px(node, "border-left-width");
        var rightBorder = px(node, "border-right-width");
        return node.scrollWidth + leftBorder + rightBorder;
      }
      function height(node) {
        var topBorder = px(node, "border-top-width");
        var bottomBorder = px(node, "border-bottom-width");
        return node.scrollHeight + topBorder + bottomBorder;
      }
      function px(node, styleProperty) {
        var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
        return parseFloat(value.replace("px", ""));
      }
    }
    function newInliner() {
      var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll,
        shouldProcess,
        impl: {
          readUrls,
          inline
        }
      };
      function shouldProcess(string) {
        return string.search(URL_REGEX) !== -1;
      }
      function readUrls(string) {
        var result = [];
        var match;
        while ((match = URL_REGEX.exec(string)) !== null) {
          result.push(match[1]);
        }
        return result.filter(function(url) {
          return !util.isDataUrl(url);
        });
      }
      function inline(string, url, baseUrl, get) {
        return Promise.resolve(url).then(function(url2) {
          return baseUrl ? util.resolveUrl(url2, baseUrl) : url2;
        }).then(get || util.getAndEncode).then(function(data) {
          return util.dataAsUrl(data, util.mimeType(url));
        }).then(function(dataUrl) {
          return string.replace(urlAsRegex(url), "$1" + dataUrl + "$3");
        });
        function urlAsRegex(url2) {
          return new RegExp(`(url\\(['"]?)(` + util.escape(url2) + `)(['"]?\\))`, "g");
        }
      }
      function inlineAll(string, baseUrl, get) {
        if (nothingToInline())
          return Promise.resolve(string);
        return Promise.resolve(string).then(readUrls).then(function(urls) {
          var done = Promise.resolve(string);
          urls.forEach(function(url) {
            done = done.then(function(string2) {
              return inline(string2, url, baseUrl, get);
            });
          });
          return done;
        });
        function nothingToInline() {
          return !shouldProcess(string);
        }
      }
    }
    function newFontFaces() {
      return {
        resolveAll,
        impl: {
          readAll
        }
      };
      function resolveAll() {
        return readAll(document).then(function(webFonts) {
          return Promise.all(webFonts.map(function(webFont) {
            return webFont.resolve();
          }));
        }).then(function(cssStrings) {
          return cssStrings.join(`
`);
        });
      }
      function readAll() {
        return Promise.resolve(util.asArray(document.styleSheets)).then(getCssRules).then(selectWebFontRules).then(function(rules) {
          return rules.map(newWebFont);
        });
        function selectWebFontRules(cssRules) {
          return cssRules.filter(function(rule) {
            return rule.type === CSSRule.FONT_FACE_RULE;
          }).filter(function(rule) {
            return inliner.shouldProcess(rule.style.getPropertyValue("src"));
          });
        }
        function getCssRules(styleSheets) {
          var cssRules = [];
          styleSheets.forEach(function(sheet) {
            try {
              util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
            } catch (e) {
              console.log("Error while reading CSS rules from " + sheet.href, e.toString());
            }
          });
          return cssRules;
        }
        function newWebFont(webFontRule) {
          return {
            resolve: function resolve() {
              var baseUrl = (webFontRule.parentStyleSheet || {}).href;
              return inliner.inlineAll(webFontRule.cssText, baseUrl);
            },
            src: function() {
              return webFontRule.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    function newImages() {
      return {
        inlineAll,
        impl: {
          newImage
        }
      };
      function newImage(element) {
        return {
          inline
        };
        function inline(get) {
          if (util.isDataUrl(element.src))
            return Promise.resolve();
          return Promise.resolve(element.src).then(get || util.getAndEncode).then(function(data) {
            return util.dataAsUrl(data, util.mimeType(element.src));
          }).then(function(dataUrl) {
            return new Promise(function(resolve, reject) {
              element.onload = resolve;
              element.onerror = reject;
              element.src = dataUrl;
            });
          });
        }
      }
      function inlineAll(node) {
        if (!(node instanceof Element))
          return Promise.resolve(node);
        return inlineBackground(node).then(function() {
          if (node instanceof HTMLImageElement)
            return newImage(node).inline();
          else
            return Promise.all(util.asArray(node.childNodes).map(function(child) {
              return inlineAll(child);
            }));
        });
        function inlineBackground(node2) {
          var background = node2.style.getPropertyValue("background");
          if (!background)
            return Promise.resolve(node2);
          return inliner.inlineAll(background).then(function(inlined) {
            node2.style.setProperty("background", inlined, node2.style.getPropertyPriority("background"));
          }).then(function() {
            return node2;
          });
        }
      }
    }
  })(exports);
});

// node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/browser.js
var require_browser = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FilterToHexBrowser = undefined;
  var errorHandling_1 = require_errorHandling();
  var shared_1 = require_shared();

  class FilterToHexBrowser extends shared_1.FilterToHexShared {
    static cleanup(svgContainerElement) {
      svgContainerElement.remove();
    }
    static returnInputError(filterString, svgContainerElement) {
      const errorMessage = shared_1.FilterToHexShared.generateInputErrorMessage(filterString);
      const errorResult = errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
      FilterToHexBrowser.cleanup(svgContainerElement);
      return errorResult;
    }
    static async getImageBase64ViaSVG(svgContainerElement) {
      const domToImage = await Promise.resolve().then(() => __importStar(require_dom_to_image()));
      return domToImage.toPng(svgContainerElement);
    }
    static async convert(filterString) {
      const { errorMessage, svgContainerElement } = shared_1.FilterToHexShared.addSVGElementsToDOMAndValidateFilter(filterString);
      if (errorMessage)
        return FilterToHexBrowser.returnInputError(filterString, svgContainerElement);
      const base64EncodedDataURL = await FilterToHexBrowser.getImageBase64ViaSVG(svgContainerElement);
      const hexColor = await shared_1.FilterToHexShared.getColorViaImageDataURL(base64EncodedDataURL);
      FilterToHexBrowser.cleanup(svgContainerElement);
      return { color: hexColor };
    }
  }
  exports.FilterToHexBrowser = FilterToHexBrowser;
});

// node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/node.js
var require_node = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FilterToHexNode = undefined;
  var errorHandling_1 = require_errorHandling();
  var errors_1 = require_errors();
  var colorFormats_1 = require_colorFormats();
  var colorTypes_1 = require_colorTypes();
  var shared_1 = require_shared();

  class FilterToHexNode extends shared_1.FilterToHexShared {
    static cleanup(browser) {
      if (FilterToHexNode.IS_HEADLESS)
        browser === null || browser === undefined || browser.close();
    }
    static returnError(errorMsg, browser) {
      const errorResult = errorHandling_1.ErrorHandling.generateErrorResult(errorMsg);
      FilterToHexNode.cleanup(browser);
      return errorResult;
    }
    static async getImageBase64ViaSVG(page) {
      const endodedScreenshotData = await page.screenshot({ encoding: FilterToHexNode.BASE_64_ENCODING });
      return `${FilterToHexNode.ENCODED_DATA_URL_PREFIX}${endodedScreenshotData}`;
    }
    static async openBrowserPage(browser) {
      const page = await browser.newPage();
      await page.setViewport({
        width: FilterToHexNode.SVG_SIDE_LENGTH_PX,
        height: FilterToHexNode.SVG_SIDE_LENGTH_PX
      });
      return page;
    }
    static async addSVGAndValidateFilter(page, filterString) {
      const svgAddResult = await page.evaluate(shared_1.FilterToHexShared.addSVGElementsToDOMAndValidateFilter, filterString, FilterToHexNode.SVG_SIDE_LENGTH_PX);
      if (svgAddResult.errorMessage) {
        return {
          errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.FILTER, filterString, colorFormats_1.ColorFormats.FILTER)
        };
      }
      return svgAddResult;
    }
    static async getPuppeteerDependency() {
      try {
        const pathPadding = "";
        return __require("puppeteer" + pathPadding);
      } catch (e) {
        return { errorMessage: errors_1.MUST_INSTALL_PUPPETEER };
      }
    }
    static async preparePuppeteerBrowser() {
      const puppeteer = await FilterToHexNode.getPuppeteerDependency();
      if (errorHandling_1.ErrorHandling.hasError(puppeteer))
        return puppeteer;
      return puppeteer.launch({ headless: FilterToHexNode.IS_HEADLESS });
    }
    static async convert(filterString) {
      const browser = await FilterToHexNode.preparePuppeteerBrowser();
      if (errorHandling_1.ErrorHandling.hasError(browser))
        return FilterToHexNode.returnError(browser.errorMessage);
      const page = await FilterToHexNode.openBrowserPage(browser);
      const addSvgResult = await FilterToHexNode.addSVGAndValidateFilter(page, filterString);
      if (errorHandling_1.ErrorHandling.hasError(addSvgResult))
        return FilterToHexNode.returnError(addSvgResult.errorMessage, browser);
      const base64EncodedDataURL = await FilterToHexNode.getImageBase64ViaSVG(page);
      const hexColor = await page.evaluate(shared_1.FilterToHexShared.getColorViaImageDataURL, base64EncodedDataURL);
      FilterToHexNode.cleanup(browser);
      return { color: hexColor };
    }
  }
  exports.FilterToHexNode = FilterToHexNode;
  FilterToHexNode.BASE_64_ENCODING = "base64";
  FilterToHexNode.ENCODED_DATA_URL_PREFIX = `data:image/png;${FilterToHexNode.BASE_64_ENCODING},`;
  FilterToHexNode.IS_HEADLESS = true;
  FilterToHexNode.SVG_SIDE_LENGTH_PX = 2;
});

// node_modules/css-filter-converter/lib/filterToColor/filterToHex/filterToHex.js
var require_filterToHex = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FilterToHex = undefined;
  var errorHandling_1 = require_errorHandling();
  var browser_1 = require_browser();

  class FilterToHex {
    static async convert(filterString, convertFromHex, options) {
      try {
        let result;
        if (typeof window === "undefined") {
          const { FilterToHexNode } = await Promise.resolve().then(() => __importStar(require_node()));
          result = await FilterToHexNode.convert(filterString);
        } else {
          result = await browser_1.FilterToHexBrowser.convert(filterString);
        }
        if (result.color && convertFromHex && typeof result.color === "string") {
          result.color = convertFromHex(result.color, options);
        }
        return result;
      } catch (error) {
        return errorHandling_1.ErrorHandling.generateUnexpectedError(error);
      }
    }
  }
  exports.FilterToHex = FilterToHex;
});

// node_modules/css-filter-converter/lib/shared/functionality/colorFormatter/colorFormatter.js
var require_colorFormatter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorFormatter = undefined;

  class ColorFormatter {
    static arrayToRgbString(rgbArray) {
      return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    }
    static arrayToHslString(hslArray) {
      return `hsl(${hslArray[0]}deg, ${hslArray[1]}%, ${hslArray[2]}%)`;
    }
  }
  exports.ColorFormatter = ColorFormatter;
});

// node_modules/css-filter-converter/lib/filterToColor/hexToColor/hexToColor.js
var require_hexToColor = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HexToColor = undefined;
  var colorFormatter_1 = require_colorFormatter();
  var color_convert_1 = __importDefault(require_color_convert());

  class HexToColor {
    static convertToRgb(color, options) {
      const result = color_convert_1.default.hex.rgb(color);
      return (options === null || options === undefined ? undefined : options.resultType) === "string" ? colorFormatter_1.ColorFormatter.arrayToRgbString(result) : result;
    }
    static convertToHsl(color, options) {
      const result = color_convert_1.default.hex.hsl(color);
      return (options === null || options === undefined ? undefined : options.resultType) === "string" ? colorFormatter_1.ColorFormatter.arrayToHslString(result) : result;
    }
  }
  exports.HexToColor = HexToColor;
});

// node_modules/css-filter-converter/lib/filterToColor/filterToColor.js
var require_filterToColor = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FilterToColor = undefined;
  var filterToHex_1 = require_filterToHex();
  var hexToColor_1 = require_hexToColor();

  class FilterToColor {
    static async filterToHex(filterString) {
      const result = await filterToHex_1.FilterToHex.convert(filterString);
      if (result.color)
        result.color = result.color.toUpperCase();
      return result;
    }
    static async filterToRgb(filterString, options) {
      return filterToHex_1.FilterToHex.convert(filterString, hexToColor_1.HexToColor.convertToRgb, options);
    }
    static async filterToHsl(filterString, options) {
      return filterToHex_1.FilterToHex.convert(filterString, hexToColor_1.HexToColor.convertToHsl, options);
    }
  }
  exports.FilterToColor = FilterToColor;
});

// node_modules/css-filter-converter/lib/index.js
var require_lib = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var colorToFilter_1 = require_colorToFilter();
  var filterToColor_1 = require_filterToColor();

  class CssFilterConverter {
    static rgbToFilter(rgbString, options) {
      return colorToFilter_1.ColorToFilter.rgbToFilter(rgbString, options);
    }
    static hexToFilter(hexString, options) {
      return colorToFilter_1.ColorToFilter.hexToFilter(hexString, options);
    }
    static hslToFilter(hslString, options) {
      return colorToFilter_1.ColorToFilter.hslToFilter(hslString, options);
    }
    static keywordToFilter(keyword, options) {
      return colorToFilter_1.ColorToFilter.keywordToFilter(keyword, options);
    }
    static async filterToHex(filterString) {
      return filterToColor_1.FilterToColor.filterToHex(filterString);
    }
    static async filterToRgb(filterString, options) {
      return filterToColor_1.FilterToColor.filterToRgb(filterString, options);
    }
    static async filterToHsl(filterString, options) {
      return filterToColor_1.FilterToColor.filterToHsl(filterString, options);
    }
  }
  exports.default = CssFilterConverter;
  module.exports = CssFilterConverter;
});

// node_modules/audiomotion-analyzer/src/audioMotion-analyzer.js
var VERSION = "4.5.4";
var PI = Math.PI;
var TAU = 2 * PI;
var HALF_PI = PI / 2;
var C_1 = 8.17579892;
var CHANNEL_COMBINED = "dual-combined";
var CHANNEL_HORIZONTAL = "dual-horizontal";
var CHANNEL_SINGLE = "single";
var CHANNEL_VERTICAL = "dual-vertical";
var COLOR_BAR_INDEX = "bar-index";
var COLOR_BAR_LEVEL = "bar-level";
var COLOR_GRADIENT = "gradient";
var DEBOUNCE_TIMEOUT = 60;
var EVENT_CLICK = "click";
var EVENT_FULLSCREENCHANGE = "fullscreenchange";
var EVENT_RESIZE = "resize";
var GRADIENT_DEFAULT_BGCOLOR = "#111";
var FILTER_NONE = "";
var FILTER_A = "A";
var FILTER_B = "B";
var FILTER_C = "C";
var FILTER_D = "D";
var FILTER_468 = "468";
var FONT_FAMILY = "sans-serif";
var FPS_COLOR = "#0f0";
var LEDS_UNLIT_COLOR = "#7f7f7f22";
var MODE_GRAPH = 10;
var REASON_CREATE = "create";
var REASON_FSCHANGE = "fschange";
var REASON_LORES = "lores";
var REASON_RESIZE = EVENT_RESIZE;
var REASON_USER = "user";
var SCALEX_BACKGROUND_COLOR = "#000c";
var SCALEX_LABEL_COLOR = "#fff";
var SCALEX_HIGHLIGHT_COLOR = "#4f4";
var SCALEY_LABEL_COLOR = "#888";
var SCALEY_MIDLINE_COLOR = "#555";
var SCALE_BARK = "bark";
var SCALE_LINEAR = "linear";
var SCALE_LOG = "log";
var SCALE_MEL = "mel";
var PRISM = ["#a35", "#c66", "#e94", "#ed0", "#9d5", "#4d8", "#2cb", "#0bc", "#09c", "#36b"];
var GRADIENTS = [
  ["classic", {
    colorStops: [
      "red",
      { color: "yellow", level: 0.85, pos: 0.6 },
      { color: "lime", level: 0.475 }
    ]
  }],
  ["prism", {
    colorStops: PRISM
  }],
  ["rainbow", {
    dir: "h",
    colorStops: ["#817", ...PRISM, "#639"]
  }],
  ["orangered", {
    bgColor: "#3e2f29",
    colorStops: ["OrangeRed"]
  }],
  ["steelblue", {
    bgColor: "#222c35",
    colorStops: ["SteelBlue"]
  }]
];
var DEFAULT_SETTINGS = {
  alphaBars: false,
  ansiBands: false,
  barSpace: 0.1,
  bgAlpha: 0.7,
  channelLayout: CHANNEL_SINGLE,
  colorMode: COLOR_GRADIENT,
  fadePeaks: false,
  fftSize: 8192,
  fillAlpha: 1,
  frequencyScale: SCALE_LOG,
  gradient: GRADIENTS[0][0],
  gravity: 3.8,
  height: undefined,
  ledBars: false,
  linearAmplitude: false,
  linearBoost: 1,
  lineWidth: 0,
  loRes: false,
  lumiBars: false,
  maxDecibels: -25,
  maxFPS: 0,
  maxFreq: 22000,
  minDecibels: -85,
  minFreq: 20,
  mirror: 0,
  mode: 0,
  noteLabels: false,
  outlineBars: false,
  overlay: false,
  peakFadeTime: 750,
  peakHoldTime: 500,
  peakLine: false,
  radial: false,
  radialInvert: false,
  radius: 0.3,
  reflexAlpha: 0.15,
  reflexBright: 1,
  reflexFit: true,
  reflexRatio: 0,
  roundBars: false,
  showBgColor: true,
  showFPS: false,
  showPeaks: true,
  showScaleX: true,
  showScaleY: false,
  smoothing: 0.5,
  spinSpeed: 0,
  splitGradient: false,
  start: true,
  trueLeds: false,
  useCanvas: true,
  volume: 1,
  weightingFilter: FILTER_NONE,
  width: undefined
};
var ERR_AUDIO_CONTEXT_FAIL = ["ERR_AUDIO_CONTEXT_FAIL", "Could not create audio context. Web Audio API not supported?"];
var ERR_INVALID_AUDIO_CONTEXT = ["ERR_INVALID_AUDIO_CONTEXT", "Provided audio context is not valid"];
var ERR_UNKNOWN_GRADIENT = ["ERR_UNKNOWN_GRADIENT", "Unknown gradient"];
var ERR_FREQUENCY_TOO_LOW = ["ERR_FREQUENCY_TOO_LOW", "Frequency values must be >= 1"];
var ERR_INVALID_MODE = ["ERR_INVALID_MODE", "Invalid mode"];
var ERR_REFLEX_OUT_OF_RANGE = ["ERR_REFLEX_OUT_OF_RANGE", "Reflex ratio must be >= 0 and < 1"];
var ERR_INVALID_AUDIO_SOURCE = ["ERR_INVALID_AUDIO_SOURCE", "Audio source must be an instance of HTMLMediaElement or AudioNode"];
var ERR_GRADIENT_INVALID_NAME = ["ERR_GRADIENT_INVALID_NAME", "Gradient name must be a non-empty string"];
var ERR_GRADIENT_NOT_AN_OBJECT = ["ERR_GRADIENT_NOT_AN_OBJECT", "Gradient options must be an object"];
var ERR_GRADIENT_MISSING_COLOR = ["ERR_GRADIENT_MISSING_COLOR", "Gradient colorStops must be a non-empty array"];

class AudioMotionError extends Error {
  constructor(error, value) {
    const [code, message] = error;
    super(message + (value !== undefined ? `: ${value}` : ""));
    this.name = "AudioMotionError";
    this.code = code;
  }
}
var deprecate = (name, alternative) => console.warn(`${name} is deprecated. Use ${alternative} instead.`);
var isEmpty = (obj) => {
  for (const p in obj)
    return false;
  return true;
};
var validateFromList = (value, list, modifier = "toLowerCase") => list[Math.max(0, list.indexOf(("" + value)[modifier]()))];
var findY = (x1, y1, x2, y2, x) => y1 + (y2 - y1) * (x - x1) / (x2 - x1);
if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function(callback) {
    let index = this.length;
    while (index-- > 0) {
      if (callback(this[index]))
        return index;
    }
    return -1;
  };
}

class AudioMotionAnalyzer {
  constructor(container, options = {}) {
    this._ready = false;
    this._aux = {};
    this._canvasGradients = [];
    this._destroyed = false;
    this._energy = { val: 0, peak: 0, hold: 0 };
    this._flg = {};
    this._fps = 0;
    this._gradients = {};
    this._last = 0;
    this._outNodes = [];
    this._ownContext = false;
    this._selectedGrads = [];
    this._sources = [];
    if (!(container instanceof Element)) {
      if (isEmpty(options) && !isEmpty(container))
        options = container;
      container = null;
    }
    this._ownCanvas = !(options.canvas instanceof HTMLCanvasElement);
    const canvas = this._ownCanvas ? document.createElement("canvas") : options.canvas;
    canvas.style = "max-width: 100%;";
    this._ctx = canvas.getContext("2d");
    for (const [name, options2] of GRADIENTS)
      this.registerGradient(name, options2);
    this._container = container || !this._ownCanvas && canvas.parentElement || document.body;
    this._defaultWidth = this._container.clientWidth || 640;
    this._defaultHeight = this._container.clientHeight || 270;
    let audioCtx;
    if (options.source && (audioCtx = options.source.context)) {} else if (audioCtx = options.audioCtx) {} else {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this._ownContext = true;
      } catch (err) {
        throw new AudioMotionError(ERR_AUDIO_CONTEXT_FAIL);
      }
    }
    if (!audioCtx.createGain)
      throw new AudioMotionError(ERR_INVALID_AUDIO_CONTEXT);
    const analyzer = this._analyzer = [audioCtx.createAnalyser(), audioCtx.createAnalyser()];
    const splitter = this._splitter = audioCtx.createChannelSplitter(2);
    const merger = this._merger = audioCtx.createChannelMerger(2);
    this._input = audioCtx.createGain();
    this._output = audioCtx.createGain();
    if (options.source)
      this.connectInput(options.source);
    for (const i of [0, 1])
      splitter.connect(analyzer[i], i);
    merger.connect(this._output);
    if (options.connectSpeakers !== false)
      this.connectOutput();
    for (const ctx of ["_scaleX", "_scaleR"])
      this[ctx] = document.createElement("canvas").getContext("2d");
    this._fsEl = options.fsElement || canvas;
    const onResize = () => {
      if (!this._fsTimeout) {
        this._fsTimeout = window.setTimeout(() => {
          if (!this._fsChanging) {
            this._setCanvas(REASON_RESIZE);
            this._fsTimeout = 0;
          }
        }, DEBOUNCE_TIMEOUT);
      }
    };
    if (window.ResizeObserver) {
      this._observer = new ResizeObserver(onResize);
      this._observer.observe(this._container);
    }
    this._controller = new AbortController;
    const signal = this._controller.signal;
    window.addEventListener(EVENT_RESIZE, onResize, { signal });
    canvas.addEventListener(EVENT_FULLSCREENCHANGE, () => {
      this._fsChanging = true;
      if (this._fsTimeout)
        window.clearTimeout(this._fsTimeout);
      this._setCanvas(REASON_FSCHANGE);
      this._fsTimeout = window.setTimeout(() => {
        this._fsChanging = false;
        this._fsTimeout = 0;
      }, DEBOUNCE_TIMEOUT);
    }, { signal });
    const unlockContext = () => {
      if (audioCtx.state == "suspended")
        audioCtx.resume().then(() => window.removeEventListener(EVENT_CLICK, unlockContext));
    };
    window.addEventListener(EVENT_CLICK, unlockContext);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState != "hidden") {
        this._frames = 0;
        this._time = performance.now();
      }
    }, { signal });
    this._setProps(options, true);
    if (this.useCanvas && this._ownCanvas)
      this._container.appendChild(canvas);
    this._ready = true;
    this._setCanvas(REASON_CREATE);
  }
  get alphaBars() {
    return this._alphaBars;
  }
  set alphaBars(value) {
    this._alphaBars = !!value;
    this._calcBars();
  }
  get ansiBands() {
    return this._ansiBands;
  }
  set ansiBands(value) {
    this._ansiBands = !!value;
    this._calcBars();
  }
  get barSpace() {
    return this._barSpace;
  }
  set barSpace(value) {
    this._barSpace = +value || 0;
    this._calcBars();
  }
  get channelLayout() {
    return this._chLayout;
  }
  set channelLayout(value) {
    this._chLayout = validateFromList(value, [CHANNEL_SINGLE, CHANNEL_HORIZONTAL, CHANNEL_VERTICAL, CHANNEL_COMBINED]);
    this._input.disconnect();
    this._input.connect(this._chLayout != CHANNEL_SINGLE ? this._splitter : this._analyzer[0]);
    this._analyzer[0].disconnect();
    if (this._outNodes.length)
      this._analyzer[0].connect(this._chLayout != CHANNEL_SINGLE ? this._merger : this._output);
    this._calcBars();
    this._makeGrad();
  }
  get colorMode() {
    return this._colorMode;
  }
  set colorMode(value) {
    this._colorMode = validateFromList(value, [COLOR_GRADIENT, COLOR_BAR_INDEX, COLOR_BAR_LEVEL]);
  }
  get fadePeaks() {
    return this._fadePeaks;
  }
  set fadePeaks(value) {
    this._fadePeaks = !!value;
  }
  get fftSize() {
    return this._analyzer[0].fftSize;
  }
  set fftSize(value) {
    for (const i of [0, 1])
      this._analyzer[i].fftSize = value;
    const binCount = this._analyzer[0].frequencyBinCount;
    this._fftData = [new Float32Array(binCount), new Float32Array(binCount)];
    this._calcBars();
  }
  get frequencyScale() {
    return this._frequencyScale;
  }
  set frequencyScale(value) {
    this._frequencyScale = validateFromList(value, [SCALE_LOG, SCALE_BARK, SCALE_MEL, SCALE_LINEAR]);
    this._calcBars();
  }
  get gradient() {
    return this._selectedGrads[0];
  }
  set gradient(value) {
    this._setGradient(value);
  }
  get gradientLeft() {
    return this._selectedGrads[0];
  }
  set gradientLeft(value) {
    this._setGradient(value, 0);
  }
  get gradientRight() {
    return this._selectedGrads[1];
  }
  set gradientRight(value) {
    this._setGradient(value, 1);
  }
  get gravity() {
    return this._gravity;
  }
  set gravity(value) {
    this._gravity = value > 0 ? +value : this._gravity || DEFAULT_SETTINGS.gravity;
  }
  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
    this._setCanvas(REASON_USER);
  }
  get ledBars() {
    return this._showLeds;
  }
  set ledBars(value) {
    this._showLeds = !!value;
    this._calcBars();
  }
  get linearAmplitude() {
    return this._linearAmplitude;
  }
  set linearAmplitude(value) {
    this._linearAmplitude = !!value;
  }
  get linearBoost() {
    return this._linearBoost;
  }
  set linearBoost(value) {
    this._linearBoost = value >= 1 ? +value : 1;
  }
  get lineWidth() {
    return this._lineWidth;
  }
  set lineWidth(value) {
    this._lineWidth = +value || 0;
  }
  get loRes() {
    return this._loRes;
  }
  set loRes(value) {
    this._loRes = !!value;
    this._setCanvas(REASON_LORES);
  }
  get lumiBars() {
    return this._lumiBars;
  }
  set lumiBars(value) {
    this._lumiBars = !!value;
    this._calcBars();
    this._makeGrad();
  }
  get maxDecibels() {
    return this._analyzer[0].maxDecibels;
  }
  set maxDecibels(value) {
    for (const i of [0, 1])
      this._analyzer[i].maxDecibels = value;
  }
  get maxFPS() {
    return this._maxFPS;
  }
  set maxFPS(value) {
    this._maxFPS = value < 0 ? 0 : +value || 0;
  }
  get maxFreq() {
    return this._maxFreq;
  }
  set maxFreq(value) {
    if (value < 1)
      throw new AudioMotionError(ERR_FREQUENCY_TOO_LOW);
    else {
      this._maxFreq = Math.min(value, this.audioCtx.sampleRate / 2);
      this._calcBars();
    }
  }
  get minDecibels() {
    return this._analyzer[0].minDecibels;
  }
  set minDecibels(value) {
    for (const i of [0, 1])
      this._analyzer[i].minDecibels = value;
  }
  get minFreq() {
    return this._minFreq;
  }
  set minFreq(value) {
    if (value < 1)
      throw new AudioMotionError(ERR_FREQUENCY_TOO_LOW);
    else {
      this._minFreq = +value;
      this._calcBars();
    }
  }
  get mirror() {
    return this._mirror;
  }
  set mirror(value) {
    this._mirror = Math.sign(value) | 0;
    this._calcBars();
    this._makeGrad();
  }
  get mode() {
    return this._mode;
  }
  set mode(value) {
    const mode = value | 0;
    if (mode >= 0 && mode <= 10 && mode != 9) {
      this._mode = mode;
      this._calcBars();
      this._makeGrad();
    } else
      throw new AudioMotionError(ERR_INVALID_MODE, value);
  }
  get noteLabels() {
    return this._noteLabels;
  }
  set noteLabels(value) {
    this._noteLabels = !!value;
    this._createScales();
  }
  get outlineBars() {
    return this._outlineBars;
  }
  set outlineBars(value) {
    this._outlineBars = !!value;
    this._calcBars();
  }
  get peakFadeTime() {
    return this._peakFadeTime;
  }
  set peakFadeTime(value) {
    this._peakFadeTime = value >= 0 ? +value : this._peakFadeTime || DEFAULT_SETTINGS.peakFadeTime;
  }
  get peakHoldTime() {
    return this._peakHoldTime;
  }
  set peakHoldTime(value) {
    this._peakHoldTime = +value || 0;
  }
  get peakLine() {
    return this._peakLine;
  }
  set peakLine(value) {
    this._peakLine = !!value;
  }
  get radial() {
    return this._radial;
  }
  set radial(value) {
    this._radial = !!value;
    this._calcBars();
    this._makeGrad();
  }
  get radialInvert() {
    return this._radialInvert;
  }
  set radialInvert(value) {
    this._radialInvert = !!value;
    this._calcBars();
    this._makeGrad();
  }
  get radius() {
    return this._radius;
  }
  set radius(value) {
    this._radius = +value || 0;
    this._calcBars();
    this._makeGrad();
  }
  get reflexRatio() {
    return this._reflexRatio;
  }
  set reflexRatio(value) {
    value = +value || 0;
    if (value < 0 || value >= 1)
      throw new AudioMotionError(ERR_REFLEX_OUT_OF_RANGE);
    else {
      this._reflexRatio = value;
      this._calcBars();
      this._makeGrad();
    }
  }
  get roundBars() {
    return this._roundBars;
  }
  set roundBars(value) {
    this._roundBars = !!value;
    this._calcBars();
  }
  get smoothing() {
    return this._analyzer[0].smoothingTimeConstant;
  }
  set smoothing(value) {
    for (const i of [0, 1])
      this._analyzer[i].smoothingTimeConstant = value;
  }
  get spinSpeed() {
    return this._spinSpeed;
  }
  set spinSpeed(value) {
    value = +value || 0;
    if (this._spinSpeed === undefined || value == 0)
      this._spinAngle = -HALF_PI;
    this._spinSpeed = value;
  }
  get splitGradient() {
    return this._splitGradient;
  }
  set splitGradient(value) {
    this._splitGradient = !!value;
    this._makeGrad();
  }
  get stereo() {
    deprecate("stereo", "channelLayout");
    return this._chLayout != CHANNEL_SINGLE;
  }
  set stereo(value) {
    deprecate("stereo", "channelLayout");
    this.channelLayout = value ? CHANNEL_VERTICAL : CHANNEL_SINGLE;
  }
  get trueLeds() {
    return this._trueLeds;
  }
  set trueLeds(value) {
    this._trueLeds = !!value;
  }
  get volume() {
    return this._output.gain.value;
  }
  set volume(value) {
    this._output.gain.value = value;
  }
  get weightingFilter() {
    return this._weightingFilter;
  }
  set weightingFilter(value) {
    this._weightingFilter = validateFromList(value, [FILTER_NONE, FILTER_A, FILTER_B, FILTER_C, FILTER_D, FILTER_468], "toUpperCase");
  }
  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this._setCanvas(REASON_USER);
  }
  get audioCtx() {
    return this._input.context;
  }
  get canvas() {
    return this._ctx.canvas;
  }
  get canvasCtx() {
    return this._ctx;
  }
  get connectedSources() {
    return this._sources;
  }
  get connectedTo() {
    return this._outNodes;
  }
  get fps() {
    return this._fps;
  }
  get fsHeight() {
    return this._fsHeight;
  }
  get fsWidth() {
    return this._fsWidth;
  }
  get isAlphaBars() {
    return this._flg.isAlpha;
  }
  get isBandsMode() {
    return this._flg.isBands;
  }
  get isDestroyed() {
    return this._destroyed;
  }
  get isFullscreen() {
    return this._fsEl && (document.fullscreenElement || document.webkitFullscreenElement) === this._fsEl;
  }
  get isLedBars() {
    return this._flg.isLeds;
  }
  get isLumiBars() {
    return this._flg.isLumi;
  }
  get isOctaveBands() {
    return this._flg.isOctaves;
  }
  get isOn() {
    return !!this._runId;
  }
  get isOutlineBars() {
    return this._flg.isOutline;
  }
  get pixelRatio() {
    return this._pixelRatio;
  }
  get isRoundBars() {
    return this._flg.isRound;
  }
  static get version() {
    return VERSION;
  }
  connectInput(source) {
    const isHTML = source instanceof HTMLMediaElement;
    if (!(isHTML || source.connect))
      throw new AudioMotionError(ERR_INVALID_AUDIO_SOURCE);
    const node = isHTML ? this.audioCtx.createMediaElementSource(source) : source;
    if (!this._sources.includes(node)) {
      node.connect(this._input);
      this._sources.push(node);
    }
    return node;
  }
  connectOutput(node = this.audioCtx.destination) {
    if (this._outNodes.includes(node))
      return;
    this._output.connect(node);
    this._outNodes.push(node);
    if (this._outNodes.length == 1) {
      for (const i of [0, 1])
        this._analyzer[i].connect(this._chLayout == CHANNEL_SINGLE && !i ? this._output : this._merger, 0, i);
    }
  }
  destroy() {
    if (!this._ready)
      return;
    const { audioCtx, canvas, _controller, _input, _merger, _observer, _ownCanvas, _ownContext, _splitter } = this;
    this._destroyed = true;
    this._ready = false;
    this.stop();
    _controller.abort();
    if (_observer)
      _observer.disconnect();
    this.onCanvasResize = null;
    this.onCanvasDraw = null;
    this._fsEl = null;
    this.disconnectInput();
    this.disconnectOutput();
    _input.disconnect();
    _splitter.disconnect();
    _merger.disconnect();
    if (_ownContext)
      audioCtx.close();
    if (_ownCanvas)
      canvas.remove();
    this._calcBars();
  }
  disconnectInput(sources, stopTracks) {
    if (!sources)
      sources = Array.from(this._sources);
    else if (!Array.isArray(sources))
      sources = [sources];
    for (const node of sources) {
      const idx = this._sources.indexOf(node);
      if (stopTracks && node.mediaStream) {
        for (const track of node.mediaStream.getAudioTracks()) {
          track.stop();
        }
      }
      if (idx >= 0) {
        node.disconnect(this._input);
        this._sources.splice(idx, 1);
      }
    }
  }
  disconnectOutput(node) {
    if (node && !this._outNodes.includes(node))
      return;
    this._output.disconnect(node);
    this._outNodes = node ? this._outNodes.filter((e) => e !== node) : [];
    if (this._outNodes.length == 0) {
      for (const i of [0, 1])
        this._analyzer[i].disconnect();
    }
  }
  getBars() {
    return Array.from(this._bars, ({ posX, freq, freqLo, freqHi, hold, peak, value }) => ({ posX, freq, freqLo, freqHi, hold, peak, value }));
  }
  getEnergy(startFreq, endFreq) {
    if (startFreq === undefined)
      return this._energy.val;
    if (startFreq != +startFreq) {
      if (startFreq == "peak")
        return this._energy.peak;
      const presets = {
        bass: [20, 250],
        lowMid: [250, 500],
        mid: [500, 2000],
        highMid: [2000, 4000],
        treble: [4000, 16000]
      };
      if (!presets[startFreq])
        return null;
      [startFreq, endFreq] = presets[startFreq];
    }
    const startBin = this._freqToBin(startFreq), endBin = endFreq ? this._freqToBin(endFreq) : startBin, chnCount = this._chLayout == CHANNEL_SINGLE ? 1 : 2;
    let energy = 0;
    for (let channel = 0;channel < chnCount; channel++) {
      for (let i = startBin;i <= endBin; i++)
        energy += this._normalizedB(this._fftData[channel][i]);
    }
    return energy / (endBin - startBin + 1) / chnCount;
  }
  getOptions(ignore) {
    if (!Array.isArray(ignore))
      ignore = [ignore];
    let options = {};
    for (const prop of Object.keys(DEFAULT_SETTINGS)) {
      if (!ignore.includes(prop)) {
        if (prop == "gradient" && this.gradientLeft != this.gradientRight) {
          options.gradientLeft = this.gradientLeft;
          options.gradientRight = this.gradientRight;
        } else if (prop != "start")
          options[prop] = this[prop];
      }
    }
    return options;
  }
  registerGradient(name, options) {
    if (typeof name != "string" || name.trim().length == 0)
      throw new AudioMotionError(ERR_GRADIENT_INVALID_NAME);
    if (typeof options != "object")
      throw new AudioMotionError(ERR_GRADIENT_NOT_AN_OBJECT);
    const { colorStops } = options;
    if (!Array.isArray(colorStops) || !colorStops.length)
      throw new AudioMotionError(ERR_GRADIENT_MISSING_COLOR);
    const count = colorStops.length, isInvalid = (val) => +val != val || val < 0 || val > 1;
    colorStops.forEach((colorStop, index) => {
      const pos = index / Math.max(1, count - 1);
      if (typeof colorStop != "object")
        colorStops[index] = { pos, color: colorStop };
      else if (isInvalid(colorStop.pos))
        colorStop.pos = pos;
      if (isInvalid(colorStop.level))
        colorStops[index].level = 1 - index / count;
    });
    colorStops.sort((a, b) => a.level < b.level ? 1 : a.level > b.level ? -1 : 0);
    colorStops[0].level = 1;
    this._gradients[name] = {
      bgColor: options.bgColor || GRADIENT_DEFAULT_BGCOLOR,
      dir: options.dir,
      colorStops
    };
    if (this._selectedGrads.includes(name))
      this._makeGrad();
  }
  setCanvasSize(w, h) {
    this._width = w;
    this._height = h;
    this._setCanvas(REASON_USER);
  }
  setFreqRange(min, max) {
    if (min < 1 || max < 1)
      throw new AudioMotionError(ERR_FREQUENCY_TOO_LOW);
    else {
      this._minFreq = Math.min(min, max);
      this.maxFreq = Math.max(min, max);
    }
  }
  setLedParams(params) {
    let maxLeds, spaceV, spaceH;
    if (params) {
      maxLeds = params.maxLeds | 0, spaceV = +params.spaceV, spaceH = +params.spaceH;
    }
    this._ledParams = maxLeds > 0 && spaceV > 0 && spaceH >= 0 ? [maxLeds, spaceV, spaceH] : undefined;
    this._calcBars();
  }
  setOptions(options) {
    this._setProps(options);
  }
  setSensitivity(min, max) {
    for (const i of [0, 1]) {
      this._analyzer[i].minDecibels = Math.min(min, max);
      this._analyzer[i].maxDecibels = Math.max(min, max);
    }
  }
  start() {
    this.toggleAnalyzer(true);
  }
  stop() {
    this.toggleAnalyzer(false);
  }
  toggleAnalyzer(force) {
    const hasStarted = this.isOn;
    if (force === undefined)
      force = !hasStarted;
    if (hasStarted && !force) {
      cancelAnimationFrame(this._runId);
      this._runId = 0;
    } else if (!hasStarted && force && !this._destroyed) {
      this._frames = 0;
      this._time = performance.now();
      this._runId = requestAnimationFrame((timestamp) => this._draw(timestamp));
    }
    return this.isOn;
  }
  toggleFullscreen() {
    if (this.isFullscreen) {
      if (document.exitFullscreen)
        document.exitFullscreen();
      else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    } else {
      const fsEl = this._fsEl;
      if (!fsEl)
        return;
      if (fsEl.requestFullscreen)
        fsEl.requestFullscreen();
      else if (fsEl.webkitRequestFullscreen)
        fsEl.webkitRequestFullscreen();
    }
  }
  _binToFreq(bin) {
    return bin * this.audioCtx.sampleRate / this.fftSize || 1;
  }
  _calcBars() {
    const bars = this._bars = [];
    if (!this._ready) {
      this._flg = { isAlpha: false, isBands: false, isLeds: false, isLumi: false, isOctaves: false, isOutline: false, isRound: false, noLedGap: false };
      return;
    }
    const { _ansiBands, _barSpace, canvas, _chLayout, _maxFreq, _minFreq, _mirror, _mode, _radial, _radialInvert, _reflexRatio } = this, centerX = canvas.width >> 1, centerY = canvas.height >> 1, isDualVertical = _chLayout == CHANNEL_VERTICAL && !_radial, isDualHorizontal = _chLayout == CHANNEL_HORIZONTAL, isBands = _mode % 10 != 0, isOctaves = isBands && this._frequencyScale == SCALE_LOG, isLeds = this._showLeds && isBands && !_radial, isLumi = this._lumiBars && isBands && !_radial, isAlpha = this._alphaBars && !isLumi && _mode != MODE_GRAPH, isOutline = this._outlineBars && isBands && !isLumi && !isLeds, isRound = this._roundBars && isBands && !isLumi && !isLeds, noLedGap = _chLayout != CHANNEL_VERTICAL || _reflexRatio > 0 && !isLumi, channelHeight = canvas.height - (isDualVertical && !isLeds ? 0.5 : 0) >> isDualVertical, analyzerHeight = channelHeight * (isLumi || _radial ? 1 : 1 - _reflexRatio) | 0, analyzerWidth = canvas.width - centerX * (isDualHorizontal || _mirror != 0), channelGap = isDualVertical ? canvas.height - channelHeight * 2 : 0, initialX = centerX * (_mirror == -1 && !isDualHorizontal && !_radial);
    let innerRadius = Math.min(canvas.width, canvas.height) * 0.375 * (_chLayout == CHANNEL_VERTICAL ? 1 : this._radius) | 0, outerRadius = Math.min(centerX, centerY);
    if (_radialInvert && _chLayout != CHANNEL_VERTICAL)
      [innerRadius, outerRadius] = [outerRadius, innerRadius];
    const barsPush = (args) => bars.push({ ...args, peak: [0, 0], hold: [0], alpha: [0], value: [0] });
    const calcRatio = (freq) => {
      const bin = this._freqToBin(freq, "floor"), lower = this._binToFreq(bin), upper = this._binToFreq(bin + 1), ratio = Math.log2(freq / lower) / Math.log2(upper / lower);
      return [bin, ratio];
    };
    let barWidth, scaleMin, unitWidth;
    if (isOctaves) {
      const roundSD = (value, digits, atLeast) => +value.toPrecision(atLeast ? Math.max(digits, 1 + Math.log10(value) | 0) : digits);
      const nearestPreferred = (value) => {
        const preferred = [1, 1.12, 1.25, 1.4, 1.6, 1.8, 2, 2.24, 2.5, 2.8, 3.15, 3.55, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10], power = Math.log10(value) | 0, normalized = value / 10 ** power;
        let i = 1;
        while (i < preferred.length && normalized > preferred[i])
          i++;
        if (normalized - preferred[i - 1] < preferred[i] - normalized)
          i--;
        return (preferred[i] * 10 ** (power + 5) | 0) / 1e5;
      };
      const bands = [0, 24, 12, 8, 6, 4, 3, 2, 1][_mode], bandWidth = _ansiBands ? 10 ** (3 / (bands * 10)) : 2 ** (1 / bands), halfBand = bandWidth ** 0.5;
      let analyzerBars = [], currFreq = _ansiBands ? 7.94328235 / (bands % 2 ? 1 : halfBand) : C_1;
      do {
        let freq = currFreq;
        const freqLo = roundSD(freq / halfBand, 4, true), freqHi = roundSD(freq * halfBand, 4, true), [binLo, ratioLo] = calcRatio(freqLo), [binHi, ratioHi] = calcRatio(freqHi);
        if (_ansiBands)
          freq = bands < 4 ? nearestPreferred(freq) : roundSD(freq, freq.toString()[0] < 5 ? 3 : 2);
        else
          freq = roundSD(freq, 4, true);
        if (freq >= _minFreq)
          barsPush({ posX: 0, freq, freqLo, freqHi, binLo, binHi, ratioLo, ratioHi });
        currFreq *= bandWidth;
      } while (currFreq <= _maxFreq);
      barWidth = analyzerWidth / bars.length;
      bars.forEach((bar, index) => bar.posX = initialX + index * barWidth);
      const firstBar = bars[0], lastBar = bars[bars.length - 1];
      scaleMin = this._freqScaling(firstBar.freqLo);
      unitWidth = analyzerWidth / (this._freqScaling(lastBar.freqHi) - scaleMin);
      if (firstBar.freqLo < _minFreq) {
        firstBar.freqLo = _minFreq;
        [firstBar.binLo, firstBar.ratioLo] = calcRatio(_minFreq);
      }
      if (lastBar.freqHi > _maxFreq) {
        lastBar.freqHi = _maxFreq;
        [lastBar.binHi, lastBar.ratioHi] = calcRatio(_maxFreq);
      }
    } else if (isBands) {
      const bands = [0, 24, 12, 8, 6, 4, 3, 2, 1][_mode] * 10;
      const invFreqScaling = (x) => {
        switch (this._frequencyScale) {
          case SCALE_BARK:
            return 1960 / (26.81 / (x + 0.53) - 1);
          case SCALE_MEL:
            return 700 * (2 ** x - 1);
          case SCALE_LINEAR:
            return x;
        }
      };
      barWidth = analyzerWidth / bands;
      scaleMin = this._freqScaling(_minFreq);
      unitWidth = analyzerWidth / (this._freqScaling(_maxFreq) - scaleMin);
      for (let i = 0, posX = 0;i < bands; i++, posX += barWidth) {
        const freqLo = invFreqScaling(scaleMin + posX / unitWidth), freq = invFreqScaling(scaleMin + (posX + barWidth / 2) / unitWidth), freqHi = invFreqScaling(scaleMin + (posX + barWidth) / unitWidth), [binLo, ratioLo] = calcRatio(freqLo), [binHi, ratioHi] = calcRatio(freqHi);
        barsPush({ posX: initialX + posX, freq, freqLo, freqHi, binLo, binHi, ratioLo, ratioHi });
      }
    } else {
      barWidth = 1;
      scaleMin = this._freqScaling(_minFreq);
      unitWidth = analyzerWidth / (this._freqScaling(_maxFreq) - scaleMin);
      const minIndex = this._freqToBin(_minFreq, "floor"), maxIndex = this._freqToBin(_maxFreq);
      let lastPos = -999;
      for (let i = minIndex;i <= maxIndex; i++) {
        const freq = this._binToFreq(i), posX = initialX + Math.round(unitWidth * (this._freqScaling(freq) - scaleMin));
        if (posX > lastPos) {
          barsPush({ posX, freq, freqLo: freq, freqHi: freq, binLo: i, binHi: i, ratioLo: 0, ratioHi: 0 });
          lastPos = posX;
        } else if (bars.length) {
          const lastBar = bars[bars.length - 1];
          lastBar.binHi = i;
          lastBar.freqHi = freq;
          lastBar.freq = (lastBar.freqLo * freq) ** 0.5;
        }
      }
    }
    let spaceH = 0, spaceV = 0;
    if (isLeds) {
      const dPR = this._pixelRatio / (window.devicePixelRatio > 1 && window.screen.height <= 540 ? 2 : 1);
      const params = [
        [],
        [128, 3, 0.45],
        [128, 4, 0.225],
        [96, 6, 0.225],
        [80, 6, 0.225],
        [80, 6, 0.125],
        [64, 6, 0.125],
        [48, 8, 0.125],
        [24, 16, 0.125]
      ];
      const customParams = this._ledParams, [maxLeds, spaceVRatio, spaceHRatio] = customParams || params[_mode];
      let ledCount, maxHeight = analyzerHeight;
      if (customParams) {
        const minHeight = 2 * dPR;
        let blockHeight;
        ledCount = maxLeds + 1;
        do {
          ledCount--;
          blockHeight = maxHeight / ledCount / (1 + spaceVRatio);
          spaceV = blockHeight * spaceVRatio;
        } while ((blockHeight < minHeight || spaceV < minHeight) && ledCount > 1);
      } else {
        const refRatio = 540 / spaceVRatio;
        spaceV = Math.min(spaceVRatio * dPR, Math.max(2, maxHeight / refRatio + 0.1 | 0));
      }
      if (noLedGap)
        maxHeight += spaceV;
      if (!customParams)
        ledCount = Math.min(maxLeds, maxHeight / (spaceV * 2) | 0);
      spaceH = spaceHRatio >= 1 ? spaceHRatio : barWidth * spaceHRatio;
      this._leds = [
        ledCount,
        spaceH,
        spaceV,
        maxHeight / ledCount - spaceV
      ];
    }
    const barSpacePx = Math.min(barWidth - 1, _barSpace * (_barSpace > 0 && _barSpace < 1 ? barWidth : 1));
    if (isBands)
      barWidth -= Math.max(isLeds ? spaceH : 0, barSpacePx);
    bars.forEach((bar, index) => {
      let posX = bar.posX, width = barWidth;
      if (isBands) {
        if (_barSpace == 0 && !isLeds) {
          posX |= 0;
          width |= 0;
          if (index > 0 && posX > bars[index - 1].posX + bars[index - 1].width) {
            posX--;
            width++;
          }
        } else
          posX += Math.max(isLeds ? spaceH : 0, barSpacePx) / 2;
        bar.posX = posX;
      }
      bar.barCenter = posX + (barWidth == 1 ? 0 : width / 2);
      bar.width = width;
    });
    const channelCoords = [];
    for (const channel of [0, 1]) {
      const channelTop = _chLayout == CHANNEL_VERTICAL ? (channelHeight + channelGap) * channel : 0, channelBottom = channelTop + channelHeight, analyzerBottom = channelTop + analyzerHeight - (!isLeds || noLedGap ? 0 : spaceV);
      channelCoords.push({ channelTop, channelBottom, analyzerBottom });
    }
    this._aux = { analyzerHeight, analyzerWidth, centerX, centerY, channelCoords, channelHeight, channelGap, initialX, innerRadius, outerRadius, scaleMin, unitWidth };
    this._flg = { isAlpha, isBands, isLeds, isLumi, isOctaves, isOutline, isRound, noLedGap };
    this._createScales();
  }
  _createScales() {
    if (!this._ready)
      return;
    const { analyzerWidth, initialX, innerRadius, scaleMin, unitWidth } = this._aux, { canvas, _frequencyScale, _mirror, _noteLabels, _radial, _scaleX, _scaleR } = this, canvasX = _scaleX.canvas, canvasR = _scaleR.canvas, freqLabels = [], isDualHorizontal = this._chLayout == CHANNEL_HORIZONTAL, isDualVertical = this._chLayout == CHANNEL_VERTICAL, minDimension = Math.min(canvas.width, canvas.height), scale = ["C", , "D", , "E", "F", , "G", , "A", , "B"], scaleHeight = minDimension / 34 | 0, fontSizeX = canvasX.height >> 1, fontSizeR = scaleHeight >> 1, labelWidthX = fontSizeX * (_noteLabels ? 0.7 : 1.5), labelWidthR = fontSizeR * (_noteLabels ? 1 : 2), root12 = 2 ** (1 / 12);
    if (!_noteLabels && (this._ansiBands || _frequencyScale != SCALE_LOG)) {
      freqLabels.push(16, 31.5, 63, 125, 250, 500, 1000, 2000, 4000);
      if (_frequencyScale == SCALE_LINEAR)
        freqLabels.push(6000, 8000, 1e4, 12000, 14000, 16000, 18000, 20000, 22000);
      else
        freqLabels.push(8000, 16000);
    } else {
      let freq = C_1;
      for (let octave = -1;octave < 11; octave++) {
        for (let note = 0;note < 12; note++) {
          if (freq >= this._minFreq && freq <= this._maxFreq) {
            const pitch = scale[note], isC = pitch == "C";
            if (pitch && _noteLabels && !_mirror && !isDualHorizontal || isC)
              freqLabels.push(_noteLabels ? [freq, pitch + (isC ? octave : "")] : freq);
          }
          freq *= root12;
        }
      }
    }
    canvasR.width = canvasR.height = Math.max(minDimension * 0.15, (innerRadius << 1) + isDualVertical * scaleHeight);
    const centerR = canvasR.width >> 1, radialY = centerR - scaleHeight * 0.7;
    const radialLabel = (x, label) => {
      const angle = TAU * (x / canvas.width), adjAng = angle - HALF_PI, posX = radialY * Math.cos(adjAng), posY = radialY * Math.sin(adjAng);
      _scaleR.save();
      _scaleR.translate(centerR + posX, centerR + posY);
      _scaleR.rotate(angle);
      _scaleR.fillText(label, 0, 0);
      _scaleR.restore();
    };
    canvasX.width |= 0;
    _scaleX.fillStyle = _scaleR.strokeStyle = SCALEX_BACKGROUND_COLOR;
    _scaleX.fillRect(0, 0, canvasX.width, canvasX.height);
    _scaleR.arc(centerR, centerR, centerR - scaleHeight / 2, 0, TAU);
    _scaleR.lineWidth = scaleHeight;
    _scaleR.stroke();
    _scaleX.fillStyle = _scaleR.fillStyle = SCALEX_LABEL_COLOR;
    _scaleX.font = `${fontSizeX}px ${FONT_FAMILY}`;
    _scaleR.font = `${fontSizeR}px ${FONT_FAMILY}`;
    _scaleX.textAlign = _scaleR.textAlign = "center";
    let prevX = -labelWidthX / 4, prevR = -labelWidthR;
    for (const item of freqLabels) {
      const [freq, label] = Array.isArray(item) ? item : [item, item < 1000 ? item | 0 : `${(item / 100 | 0) / 10}k`], x = unitWidth * (this._freqScaling(freq) - scaleMin), y = canvasX.height * 0.75, isC = label[0] == "C", maxW = fontSizeX * (_noteLabels && !_mirror && !isDualHorizontal ? isC ? 1.2 : 0.6 : 3);
      _scaleX.fillStyle = _scaleR.fillStyle = isC && !_mirror && !isDualHorizontal ? SCALEX_HIGHLIGHT_COLOR : SCALEX_LABEL_COLOR;
      if (_noteLabels) {
        const isLog = _frequencyScale == SCALE_LOG, isLinear = _frequencyScale == SCALE_LINEAR;
        let allowedLabels = ["C"];
        if (isLog || freq > 2000 || !isLinear && freq > 250 || (!_radial || isDualVertical) && (!isLinear && freq > 125 || freq > 1000))
          allowedLabels.push("G");
        if (isLog || freq > 4000 || !isLinear && freq > 500 || (!_radial || isDualVertical) && (!isLinear && freq > 250 || freq > 2000))
          allowedLabels.push("E");
        if (isLinear && freq > 4000 || (!_radial || isDualVertical) && (isLog || freq > 2000 || !isLinear && freq > 500))
          allowedLabels.push("D", "F", "A", "B");
        if (!allowedLabels.includes(label[0]))
          continue;
      }
      if (x >= prevX + labelWidthX / 2 && x <= analyzerWidth) {
        _scaleX.fillText(label, isDualHorizontal && _mirror == -1 ? analyzerWidth - x : initialX + x, y, maxW);
        if (isDualHorizontal || _mirror && (x > labelWidthX || _mirror == 1))
          _scaleX.fillText(label, isDualHorizontal && _mirror != 1 ? analyzerWidth + x : (initialX || canvas.width) - x, y, maxW);
        prevX = x + Math.min(maxW, _scaleX.measureText(label).width) / 2;
      }
      if (x >= prevR + labelWidthR && x < analyzerWidth - labelWidthR) {
        radialLabel(isDualHorizontal && _mirror == 1 ? analyzerWidth - x : x, label);
        if (isDualHorizontal || _mirror && (x > labelWidthR || _mirror == 1))
          radialLabel(isDualHorizontal && _mirror != -1 ? analyzerWidth + x : -x, label);
        prevR = x;
      }
    }
  }
  _draw(timestamp) {
    this._runId = requestAnimationFrame((timestamp2) => this._draw(timestamp2));
    const elapsed = timestamp - this._time, frameTime = timestamp - this._last, targetInterval = this._maxFPS ? 975 / this._maxFPS : 0;
    if (frameTime < targetInterval)
      return;
    this._last = timestamp - (targetInterval ? frameTime % targetInterval : 0);
    this._frames++;
    if (elapsed >= 1000) {
      this._fps = this._frames / elapsed * 1000;
      this._frames = 0;
      this._time = timestamp;
    }
    const {
      isAlpha,
      isBands,
      isLeds,
      isLumi,
      isOctaves,
      isOutline,
      isRound,
      noLedGap
    } = this._flg, {
      analyzerHeight,
      centerX,
      centerY,
      channelCoords,
      channelHeight,
      channelGap,
      initialX,
      innerRadius,
      outerRadius
    } = this._aux, {
      _bars,
      canvas,
      _canvasGradients,
      _chLayout,
      _colorMode,
      _ctx,
      _energy,
      _fadePeaks,
      fillAlpha,
      _fps,
      _linearAmplitude,
      _lineWidth,
      maxDecibels,
      minDecibels,
      _mirror,
      _mode,
      overlay,
      _radial,
      showBgColor,
      showPeaks,
      useCanvas,
      _weightingFilter
    } = this, canvasX = this._scaleX.canvas, canvasR = this._scaleR.canvas, fadeFrames = _fps * this._peakFadeTime / 1000, fpsSquared = _fps ** 2, gravity = this._gravity * 1000, holdFrames = _fps * this._peakHoldTime / 1000, isDualCombined = _chLayout == CHANNEL_COMBINED, isDualHorizontal = _chLayout == CHANNEL_HORIZONTAL, isDualVertical = _chLayout == CHANNEL_VERTICAL, isSingle = _chLayout == CHANNEL_SINGLE, isTrueLeds = isLeds && this._trueLeds && _colorMode == COLOR_GRADIENT, analyzerWidth = _radial ? canvas.width : this._aux.analyzerWidth, finalX = initialX + analyzerWidth, showPeakLine = showPeaks && this._peakLine && _mode == MODE_GRAPH, maxBarHeight = _radial ? outerRadius - innerRadius : analyzerHeight, nominalMaxHeight = maxBarHeight / this._pixelRatio, dbRange = maxDecibels - minDecibels, [ledCount, ledSpaceH, ledSpaceV, ledHeight] = this._leds || [];
    if (_energy.val > 0 && _fps > 0)
      this._spinAngle += this._spinSpeed * TAU / 60 / _fps;
    const doReflex = (channel) => {
      if (this._reflexRatio > 0 && !isLumi && !_radial) {
        let posY, height;
        if (this.reflexFit || isDualVertical) {
          posY = isDualVertical && channel == 0 ? channelHeight + channelGap : 0;
          height = channelHeight - analyzerHeight;
        } else {
          posY = canvas.height - analyzerHeight * 2;
          height = analyzerHeight;
        }
        _ctx.save();
        _ctx.globalAlpha = this.reflexAlpha;
        if (this.reflexBright != 1)
          _ctx.filter = `brightness(${this.reflexBright})`;
        _ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
        _ctx.drawImage(canvas, 0, channelCoords[channel].channelTop, canvas.width, analyzerHeight, 0, posY, canvas.width, height);
        _ctx.restore();
      }
    };
    const drawScaleX = () => {
      if (this.showScaleX) {
        if (_radial) {
          _ctx.save();
          _ctx.translate(centerX, centerY);
          if (this._spinSpeed)
            _ctx.rotate(this._spinAngle + HALF_PI);
          _ctx.drawImage(canvasR, -canvasR.width >> 1, -canvasR.width >> 1);
          _ctx.restore();
        } else
          _ctx.drawImage(canvasX, 0, canvas.height - canvasX.height);
      }
    };
    const weightingdB = (freq) => {
      const f2 = freq ** 2, SQ20_6 = 424.36, SQ107_7 = 11599.29, SQ158_5 = 25122.25, SQ737_9 = 544496.41, SQ12194 = 148693636, linearTodB = (value) => 20 * Math.log10(value);
      switch (_weightingFilter) {
        case FILTER_A:
          const rA = SQ12194 * f2 ** 2 / ((f2 + SQ20_6) * Math.sqrt((f2 + SQ107_7) * (f2 + SQ737_9)) * (f2 + SQ12194));
          return 2 + linearTodB(rA);
        case FILTER_B:
          const rB = SQ12194 * f2 * freq / ((f2 + SQ20_6) * Math.sqrt(f2 + SQ158_5) * (f2 + SQ12194));
          return 0.17 + linearTodB(rB);
        case FILTER_C:
          const rC = SQ12194 * f2 / ((f2 + SQ20_6) * (f2 + SQ12194));
          return 0.06 + linearTodB(rC);
        case FILTER_D:
          const h = ((1037918.48 - f2) ** 2 + 1080768.16 * f2) / ((9837328 - f2) ** 2 + 11723776 * f2), rD = freq / 0.000068966888496476 * Math.sqrt(h / ((f2 + 79919.29) * (f2 + 1345600)));
          return linearTodB(rD);
        case FILTER_468:
          const h1 = -0.000000000000000000000004737338981378384 * freq ** 6 + 0.000000000000002043828333606125 * freq ** 4 - 0.0000001363894795463638 * f2 + 1, h2 = 0.0000000000000000001306612257412824 * freq ** 5 - 0.00000000002118150887518656 * freq ** 3 + 0.0005559488023498642 * freq, rI = 0.0001246332637532143 * freq / Math.hypot(h1, h2);
          return 18.2 + linearTodB(rI);
      }
      return 0;
    };
    const strokeBar = (x, y1, y2) => {
      _ctx.beginPath();
      _ctx.moveTo(x, y1);
      _ctx.lineTo(x, y2);
      _ctx.stroke();
    };
    const strokeIf = (flag) => {
      if (flag && _lineWidth) {
        const alpha = _ctx.globalAlpha;
        _ctx.globalAlpha = 1;
        _ctx.stroke();
        _ctx.globalAlpha = alpha;
      }
    };
    const ledPosY = (value) => Math.max(0, (value * ledCount | 0) * (ledHeight + ledSpaceV) - ledSpaceV);
    const updateEnergy = (newVal) => {
      _energy.val = newVal;
      if (_energy.peak > 0) {
        _energy.hold--;
        if (_energy.hold < 0)
          _energy.peak += _energy.hold * gravity / fpsSquared / canvas.height * this._pixelRatio;
      }
      if (newVal >= _energy.peak) {
        _energy.peak = newVal;
        _energy.hold = holdFrames;
      }
    };
    if (overlay)
      _ctx.clearRect(0, 0, canvas.width, canvas.height);
    let currentEnergy = 0;
    const nBars = _bars.length, nChannels = isSingle ? 1 : 2;
    for (let channel = 0;channel < nChannels; channel++) {
      const { channelTop, channelBottom, analyzerBottom } = channelCoords[channel], channelGradient = this._gradients[this._selectedGrads[channel]], colorStops = channelGradient.colorStops, colorCount = colorStops.length, bgColor = !showBgColor || isLeds && !overlay ? "#000" : channelGradient.bgColor, radialDirection = isDualVertical && _radial && channel ? -1 : 1, invertedChannel = !channel && _mirror == -1 || channel && _mirror == 1, radialOffsetX = !isDualHorizontal || channel && _mirror != 1 ? 0 : analyzerWidth >> (channel || !invertedChannel), angularDirection = isDualHorizontal && invertedChannel ? -1 : 1;
      const drawScaleY = () => {
        const scaleWidth = canvasX.height, fontSize = scaleWidth >> 1, max = _linearAmplitude ? 100 : maxDecibels, min = _linearAmplitude ? 0 : minDecibels, incr = _linearAmplitude ? 20 : 5, interval = analyzerHeight / (max - min), atStart = _mirror != -1 && (!isDualHorizontal || channel == 0 || _mirror == 1), atEnd = _mirror != 1 && (!isDualHorizontal || channel != _mirror);
        _ctx.save();
        _ctx.fillStyle = SCALEY_LABEL_COLOR;
        _ctx.font = `${fontSize}px ${FONT_FAMILY}`;
        _ctx.textAlign = "right";
        _ctx.lineWidth = 1;
        for (let val = max;val > min; val -= incr) {
          const posY = channelTop + (max - val) * interval, even = val % 2 == 0 | 0;
          if (even) {
            const labelY = posY + fontSize * (posY == channelTop ? 0.8 : 0.35);
            if (atStart)
              _ctx.fillText(val, scaleWidth * 0.85, labelY);
            if (atEnd)
              _ctx.fillText(val, (isDualHorizontal ? analyzerWidth : canvas.width) - scaleWidth * 0.1, labelY);
            _ctx.strokeStyle = SCALEY_LABEL_COLOR;
            _ctx.setLineDash([2, 4]);
            _ctx.lineDashOffset = 0;
          } else {
            _ctx.strokeStyle = SCALEY_MIDLINE_COLOR;
            _ctx.setLineDash([2, 8]);
            _ctx.lineDashOffset = 1;
          }
          _ctx.beginPath();
          _ctx.moveTo(initialX + scaleWidth * even * atStart, ~~posY + 0.5);
          _ctx.lineTo(finalX - scaleWidth * even * atEnd, ~~posY + 0.5);
          _ctx.stroke();
        }
        _ctx.restore();
      };
      const interpolate = (bin, ratio) => {
        const value = fftData[bin] + (bin < fftData.length - 1 ? (fftData[bin + 1] - fftData[bin]) * ratio : 0);
        return isNaN(value) ? -Infinity : value;
      };
      const getAngle = (x, dir = angularDirection) => dir * TAU * ((x + radialOffsetX) / canvas.width) + this._spinAngle;
      const radialXY = (x, y, dir) => {
        const height = innerRadius + y * radialDirection, angle = getAngle(x, dir);
        return [centerX + height * Math.cos(angle), centerY + height * Math.sin(angle)];
      };
      const radialPoly = (x, y, w, h, stroke) => {
        _ctx.beginPath();
        for (const dir of _mirror && !isDualHorizontal ? [1, -1] : [angularDirection]) {
          const [startAngle, endAngle] = isRound ? [getAngle(x, dir), getAngle(x + w, dir)] : [];
          _ctx.moveTo(...radialXY(x, y, dir));
          _ctx.lineTo(...radialXY(x, y + h, dir));
          if (isRound)
            _ctx.arc(centerX, centerY, innerRadius + (y + h) * radialDirection, startAngle, endAngle, dir != 1);
          else
            _ctx.lineTo(...radialXY(x + w, y + h, dir));
          _ctx.lineTo(...radialXY(x + w, y, dir));
          if (isRound && !stroke)
            _ctx.arc(centerX, centerY, innerRadius + y * radialDirection, endAngle, startAngle, dir == 1);
        }
        strokeIf(stroke);
        _ctx.fill();
      };
      const setBarColor = (value = 0, barIndex = 0) => {
        let color;
        if (_colorMode == COLOR_GRADIENT && !isTrueLeds || _mode == MODE_GRAPH)
          color = _canvasGradients[channel];
        else {
          const selectedIndex = _colorMode == COLOR_BAR_INDEX ? barIndex % colorCount : colorStops.findLastIndex((item) => isLeds ? ledPosY(value) <= ledPosY(item.level) : value <= item.level);
          color = colorStops[selectedIndex].color;
        }
        _ctx.fillStyle = _ctx.strokeStyle = color;
      };
      if (useCanvas) {
        if (isDualHorizontal && !_radial) {
          const translateX = analyzerWidth * (channel + invertedChannel), flipX = invertedChannel ? -1 : 1;
          _ctx.setTransform(flipX, 0, 0, 1, translateX, 0);
        }
        if (!overlay || showBgColor) {
          if (overlay)
            _ctx.globalAlpha = this.bgAlpha;
          _ctx.fillStyle = bgColor;
          if (channel == 0 || !_radial && !isDualCombined)
            _ctx.fillRect(initialX, channelTop - channelGap, analyzerWidth, (overlay && this.reflexAlpha == 1 ? analyzerHeight : channelHeight) + channelGap);
          _ctx.globalAlpha = 1;
        }
        if (this.showScaleY && !isLumi && !_radial && (channel == 0 || !isDualCombined))
          drawScaleY();
        if (isLeds) {
          _ctx.setLineDash([ledHeight, ledSpaceV]);
          _ctx.lineWidth = _bars[0].width;
        } else
          _ctx.lineWidth = isOutline ? Math.min(_lineWidth, _bars[0].width / 2) : _lineWidth;
        _ctx.save();
        if (!_radial) {
          const region = new Path2D;
          region.rect(0, channelTop, canvas.width, analyzerHeight);
          _ctx.clip(region);
        }
      }
      let fftData = this._fftData[channel];
      this._analyzer[channel].getFloatFrequencyData(fftData);
      if (_weightingFilter)
        fftData = fftData.map((val, idx) => val + weightingdB(this._binToFreq(idx)));
      _ctx.beginPath();
      let points = [];
      for (let barIndex = 0;barIndex < nBars; barIndex++) {
        const bar = _bars[barIndex], { posX, barCenter, width, freq, binLo, binHi, ratioLo, ratioHi } = bar;
        let barValue = Math.max(interpolate(binLo, ratioLo), interpolate(binHi, ratioHi));
        for (let j = binLo + 1;j < binHi; j++) {
          if (fftData[j] > barValue)
            barValue = fftData[j];
        }
        barValue = this._normalizedB(barValue);
        bar.value[channel] = barValue;
        currentEnergy += barValue;
        if (bar.peak[channel] > 0 && bar.alpha[channel] > 0) {
          bar.hold[channel]--;
          if (bar.hold[channel] < 0) {
            if (_fadePeaks && !showPeakLine) {
              const initialAlpha = !isAlpha || isOutline && _lineWidth > 0 ? 1 : isAlpha ? bar.peak[channel] : fillAlpha;
              bar.alpha[channel] = initialAlpha * (1 + bar.hold[channel] / fadeFrames);
            } else
              bar.peak[channel] += bar.hold[channel] * gravity / fpsSquared / Math.abs(nominalMaxHeight);
            if (bar.alpha[channel] <= 0)
              bar.peak[channel] = 0;
          }
        }
        if (barValue >= bar.peak[channel]) {
          bar.peak[channel] = barValue;
          bar.hold[channel] = holdFrames;
          bar.alpha[channel] = !isAlpha || isOutline && _lineWidth > 0 ? 1 : isAlpha ? barValue : fillAlpha;
        }
        if (!useCanvas)
          continue;
        _ctx.globalAlpha = isLumi || isAlpha ? barValue : isOutline ? fillAlpha : 1;
        setBarColor(barValue, barIndex);
        const barHeight = isLumi ? maxBarHeight : isLeds ? ledPosY(barValue) : barValue * maxBarHeight | 0;
        if (_mode == MODE_GRAPH) {
          const nextBarAvg = barIndex ? 0 : (this._normalizedB(fftData[_bars[1].binLo]) * maxBarHeight + barHeight) / 2;
          if (_radial) {
            if (barIndex == 0) {
              if (isDualHorizontal)
                _ctx.moveTo(...radialXY(0, 0));
              _ctx.lineTo(...radialXY(0, posX < 0 ? nextBarAvg : barHeight));
            }
            if (posX >= 0) {
              const point = [posX, barHeight];
              _ctx.lineTo(...radialXY(...point));
              points.push(point);
            }
          } else {
            if (barIndex == 0) {
              if (_mirror == -1 && !isDualHorizontal)
                _ctx.moveTo(initialX, analyzerBottom - (posX < initialX ? nextBarAvg : barHeight));
              else {
                const prevFFTData = binLo ? this._normalizedB(fftData[binLo - 1]) * maxBarHeight : barHeight;
                _ctx.moveTo(initialX - _lineWidth, analyzerBottom - prevFFTData);
              }
            }
            if (isDualHorizontal || _mirror != -1 || posX >= initialX)
              _ctx.lineTo(posX, analyzerBottom - barHeight);
          }
        } else {
          if (isLeds) {
            if (showBgColor && !overlay && (channel == 0 || !isDualCombined)) {
              const alpha = _ctx.globalAlpha;
              _ctx.strokeStyle = LEDS_UNLIT_COLOR;
              _ctx.globalAlpha = 1;
              strokeBar(barCenter, channelTop, analyzerBottom);
              _ctx.strokeStyle = _ctx.fillStyle;
              _ctx.globalAlpha = alpha;
            }
            if (isTrueLeds) {
              const colorIndex = isLumi ? 0 : colorStops.findLastIndex((item) => ledPosY(barValue) <= ledPosY(item.level));
              let last = analyzerBottom;
              for (let i = colorCount - 1;i >= colorIndex; i--) {
                _ctx.strokeStyle = colorStops[i].color;
                let y = analyzerBottom - (i == colorIndex ? barHeight : ledPosY(colorStops[i].level));
                strokeBar(barCenter, last, y);
                last = y - ledSpaceV;
              }
            } else
              strokeBar(barCenter, analyzerBottom, analyzerBottom - barHeight);
          } else if (posX >= initialX) {
            if (_radial)
              radialPoly(posX, 0, width, barHeight, isOutline);
            else if (isRound) {
              const halfWidth = width / 2, y = analyzerBottom + halfWidth;
              _ctx.beginPath();
              _ctx.moveTo(posX, y);
              _ctx.lineTo(posX, y - barHeight);
              _ctx.arc(barCenter, y - barHeight, halfWidth, PI, TAU);
              _ctx.lineTo(posX + width, y);
              strokeIf(isOutline);
              _ctx.fill();
            } else {
              const offset = isOutline ? _ctx.lineWidth : 0;
              _ctx.beginPath();
              _ctx.rect(posX, analyzerBottom + offset, width, -barHeight - offset);
              strokeIf(isOutline);
              _ctx.fill();
            }
          }
        }
        const peakValue = bar.peak[channel], peakAlpha = bar.alpha[channel];
        if (peakValue > 0 && peakAlpha > 0 && showPeaks && !showPeakLine && !isLumi && posX >= initialX && posX < finalX) {
          if (_fadePeaks)
            _ctx.globalAlpha = peakAlpha;
          else if (isOutline && _lineWidth > 0)
            _ctx.globalAlpha = 1;
          else if (isAlpha)
            _ctx.globalAlpha = peakValue;
          if (_colorMode == COLOR_BAR_LEVEL || isTrueLeds)
            setBarColor(peakValue);
          if (isLeds) {
            const ledPeak = ledPosY(peakValue);
            if (ledPeak >= ledSpaceV)
              _ctx.fillRect(posX, analyzerBottom - ledPeak, width, ledHeight);
          } else if (!_radial)
            _ctx.fillRect(posX, analyzerBottom - peakValue * maxBarHeight, width, 2);
          else if (_mode != MODE_GRAPH) {
            const y = peakValue * maxBarHeight;
            radialPoly(posX, y, width, !this._radialInvert || isDualVertical || y + innerRadius >= 2 ? -2 : 2);
          }
        }
      }
      if (!useCanvas)
        continue;
      _ctx.globalAlpha = 1;
      if (_mode == MODE_GRAPH) {
        setBarColor();
        if (_radial && !isDualHorizontal) {
          if (_mirror) {
            let p;
            while (p = points.pop())
              _ctx.lineTo(...radialXY(...p, -1));
          }
          _ctx.closePath();
        }
        if (_lineWidth > 0)
          _ctx.stroke();
        if (fillAlpha > 0) {
          if (_radial) {
            const start = isDualHorizontal ? getAngle(analyzerWidth >> 1) : 0, end = isDualHorizontal ? getAngle(analyzerWidth) : TAU;
            _ctx.moveTo(...radialXY(isDualHorizontal ? analyzerWidth >> 1 : 0, 0));
            _ctx.arc(centerX, centerY, innerRadius, start, end, isDualHorizontal ? !invertedChannel : true);
          } else {
            _ctx.lineTo(finalX, analyzerBottom);
            _ctx.lineTo(initialX, analyzerBottom);
          }
          _ctx.globalAlpha = fillAlpha;
          _ctx.fill();
          _ctx.globalAlpha = 1;
        }
        if (showPeakLine || _radial && showPeaks) {
          points = [];
          _ctx.beginPath();
          _bars.forEach((b, i) => {
            let x = b.posX, h = b.peak[channel], m = i ? "lineTo" : "moveTo";
            if (_radial && x < 0) {
              const nextBar = _bars[i + 1];
              h = findY(x, h, nextBar.posX, nextBar.peak[channel], 0);
              x = 0;
            }
            h *= maxBarHeight;
            if (showPeakLine) {
              _ctx[m](..._radial ? radialXY(x, h) : [x, analyzerBottom - h]);
              if (_radial && _mirror && !isDualHorizontal)
                points.push([x, h]);
            } else if (b.peak[channel] > 0) {
              if (_fadePeaks)
                _ctx.globalAlpha = b.alpha[channel];
              radialPoly(x, h, 1, -2);
            }
          });
          if (showPeakLine) {
            let p;
            while (p = points.pop())
              _ctx.lineTo(...radialXY(...p, -1));
            _ctx.lineWidth = 1;
            _ctx.stroke();
          }
        }
      }
      _ctx.restore();
      if (isDualHorizontal && !_radial)
        _ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (!isDualHorizontal && !isDualCombined || channel)
        doReflex(channel);
    }
    updateEnergy(currentEnergy / (nBars << nChannels - 1));
    if (useCanvas) {
      if (_mirror && !_radial && !isDualHorizontal) {
        _ctx.setTransform(-1, 0, 0, 1, canvas.width - initialX, 0);
        _ctx.drawImage(canvas, initialX, 0, centerX, canvas.height, 0, 0, centerX, canvas.height);
        _ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      _ctx.setLineDash([]);
      drawScaleX();
    }
    if (this.showFPS) {
      const size = canvasX.height;
      _ctx.font = `bold ${size}px ${FONT_FAMILY}`;
      _ctx.fillStyle = FPS_COLOR;
      _ctx.textAlign = "right";
      _ctx.fillText(Math.round(_fps), canvas.width - size, size * 2);
    }
    if (this.onCanvasDraw) {
      _ctx.save();
      _ctx.fillStyle = _ctx.strokeStyle = _canvasGradients[0];
      this.onCanvasDraw(this, { timestamp, canvasGradients: _canvasGradients });
      _ctx.restore();
    }
  }
  _freqScaling(freq) {
    switch (this._frequencyScale) {
      case SCALE_LOG:
        return Math.log2(freq);
      case SCALE_BARK:
        return 26.81 * freq / (1960 + freq) - 0.53;
      case SCALE_MEL:
        return Math.log2(1 + freq / 700);
      case SCALE_LINEAR:
        return freq;
    }
  }
  _freqToBin(freq, method = "round") {
    const max = this._analyzer[0].frequencyBinCount - 1, bin = Math[method](freq * this.fftSize / this.audioCtx.sampleRate);
    return bin < max ? bin : max;
  }
  _makeGrad() {
    if (!this._ready)
      return;
    const { canvas, _ctx, _radial, _reflexRatio } = this, { analyzerWidth, centerX, centerY, initialX, innerRadius, outerRadius } = this._aux, { isLumi } = this._flg, isDualVertical = this._chLayout == CHANNEL_VERTICAL, analyzerRatio = 1 - _reflexRatio, gradientHeight = isLumi ? canvas.height : canvas.height * (1 - _reflexRatio * !isDualVertical) | 0;
    for (const channel of [0, 1]) {
      const currGradient = this._gradients[this._selectedGrads[channel]], colorStops = currGradient.colorStops, isHorizontal = currGradient.dir == "h";
      let grad;
      if (_radial)
        grad = _ctx.createRadialGradient(centerX, centerY, outerRadius, centerX, centerY, innerRadius - (outerRadius - innerRadius) * isDualVertical);
      else
        grad = _ctx.createLinearGradient(...isHorizontal ? [initialX, 0, initialX + analyzerWidth, 0] : [0, 0, 0, gradientHeight]);
      if (colorStops) {
        const dual = isDualVertical && !this._splitGradient && (!isHorizontal || _radial);
        for (let channelArea = 0;channelArea < 1 + dual; channelArea++) {
          const maxIndex = colorStops.length - 1;
          colorStops.forEach((colorStop, index) => {
            let offset = colorStop.pos;
            if (dual)
              offset /= 2;
            if (isDualVertical && !isLumi && !_radial && !isHorizontal) {
              offset *= analyzerRatio;
              if (!dual && offset > 0.5 * analyzerRatio)
                offset += 0.5 * _reflexRatio;
            }
            if (channelArea == 1) {
              if (_radial || isLumi) {
                const revIndex = maxIndex - index;
                colorStop = colorStops[revIndex];
                offset = 1 - colorStop.pos / 2;
              } else {
                if (index == 0 && offset > 0)
                  grad.addColorStop(0.5, colorStop.color);
                offset += 0.5;
              }
            }
            grad.addColorStop(offset, colorStop.color);
            if (isDualVertical && index == maxIndex && offset < 0.5)
              grad.addColorStop(0.5, colorStop.color);
          });
        }
      }
      this._canvasGradients[channel] = grad;
    }
  }
  _normalizedB(value) {
    const isLinear = this._linearAmplitude, boost = isLinear ? 1 / this._linearBoost : 1, clamp = (val, min, max) => val <= min ? min : val >= max ? max : val, dBToLinear = (val) => 10 ** (val / 20);
    let maxValue = this.maxDecibels, minValue = this.minDecibels;
    if (isLinear) {
      maxValue = dBToLinear(maxValue);
      minValue = dBToLinear(minValue);
      value = dBToLinear(value) ** boost;
    }
    return clamp((value - minValue) / (maxValue - minValue) ** boost, 0, 1);
  }
  _setCanvas(reason) {
    if (!this._ready)
      return;
    const { canvas, _ctx } = this, canvasX = this._scaleX.canvas, pixelRatio = window.devicePixelRatio / (this._loRes + 1);
    let screenWidth = window.screen.width * pixelRatio, screenHeight = window.screen.height * pixelRatio;
    if (Math.abs(window.orientation) == 90 && screenWidth < screenHeight)
      [screenWidth, screenHeight] = [screenHeight, screenWidth];
    const isFullscreen = this.isFullscreen, isCanvasFs = isFullscreen && this._fsEl == canvas, newWidth = isCanvasFs ? screenWidth : (this._width || this._container.clientWidth || this._defaultWidth) * pixelRatio | 0, newHeight = isCanvasFs ? screenHeight : (this._height || this._container.clientHeight || this._defaultHeight) * pixelRatio | 0;
    this._pixelRatio = pixelRatio;
    this._fsWidth = screenWidth;
    this._fsHeight = screenHeight;
    if (reason != REASON_CREATE && canvas.width == newWidth && canvas.height == newHeight)
      return;
    canvas.width = newWidth;
    canvas.height = newHeight;
    if (!this.overlay) {
      _ctx.fillStyle = "#000";
      _ctx.fillRect(0, 0, newWidth, newHeight);
    }
    _ctx.lineJoin = "bevel";
    canvasX.width = newWidth;
    canvasX.height = Math.max(20 * pixelRatio, Math.min(newWidth, newHeight) / 32 | 0);
    this._calcBars();
    this._makeGrad();
    if (this._fsStatus !== undefined && this._fsStatus !== isFullscreen)
      reason = REASON_FSCHANGE;
    this._fsStatus = isFullscreen;
    if (this.onCanvasResize)
      this.onCanvasResize(reason, this);
  }
  _setGradient(name, channel) {
    if (!this._gradients.hasOwnProperty(name))
      throw new AudioMotionError(ERR_UNKNOWN_GRADIENT, name);
    if (![0, 1].includes(channel)) {
      this._selectedGrads[1] = name;
      channel = 0;
    }
    this._selectedGrads[channel] = name;
    this._makeGrad();
  }
  _setProps(options, useDefaults) {
    const callbacks = ["onCanvasDraw", "onCanvasResize"];
    const extraProps = ["gradientLeft", "gradientRight", "stereo"];
    const validProps = Object.keys(DEFAULT_SETTINGS).filter((e) => e != "start").concat(callbacks, extraProps);
    if (useDefaults || options === undefined)
      options = { ...DEFAULT_SETTINGS, ...options };
    for (const prop of Object.keys(options)) {
      if (callbacks.includes(prop) && typeof options[prop] !== "function")
        this[prop] = undefined;
      else if (validProps.includes(prop))
        this[prop] = options[prop];
    }
    if (options.start !== undefined)
      this.toggleAnalyzer(options.start);
  }
}
var audioMotion_analyzer_default = AudioMotionAnalyzer;

// src/helpers.ts
var asset = (path) => {
  const url = new URL(path, import.meta.url).href;
  console.log(url);
  return url;
};
function mouseEnterLeave(options) {
  const opts = {
    callback: () => {},
    hoverTime: 0,
    ...options
  };
  let hovering;
  let hoverTimeout;
  opts.element.addEventListener("mouseenter", (event) => {
    event.preventDefault();
    hovering = false;
    hoverTimeout = setTimeout(() => {
      opts.callback();
      hovering = true;
    }, opts.hoverTime);
  });
  opts.element.addEventListener("mouseleave", (event) => {
    event.preventDefault();
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    if (hovering) {
      opts.callback();
    }
  });
}
function exists(value) {
  if (value === undefined || value === null) {
    throw new Error("Value not set");
  }
  return value;
}
function entries(object) {
  return Object.entries(object);
}

// src/index.ts
var import_css_filter_converter = __toESM(require_lib(), 1);
var soundEffects = {};
var DEFAULT_MUSIC_PLAYER_STATE = {
  source: new Audio
};

class MusicPlayer {
  playPause;
  reroll;
  visualizer;
  state;
  static SOUND_EFFECT_URLS = {
    buttonClick: asset("./assets/audio/button_click.mp3"),
    buttonHover: asset("./assets/audio/button_hover.mp3"),
    diceRoll: asset("./assets/audio/dice_roll.mp3")
  };
  soundEffects;
  root;
  constructor(options) {
    this.state = {
      ...DEFAULT_MUSIC_PLAYER_STATE,
      ...options.state
    };
    this.state.source.addEventListener("ended", () => this.pause());
    this.soundEffects = {};
    entries(MusicPlayer.SOUND_EFFECT_URLS).forEach(([key, url]) => {
      this.soundEffects[key] = new Audio(url);
    });
    console.log(soundEffects);
    if (!options.container) {
      const queryResult = document.querySelector(options.selector || "");
      if (!queryResult) {
        throw new Error(`MusicPlayer init error:
The selector '${options.selector}' returned no results.`);
      }
      options.container = queryResult;
    }
    this.root = options.container.attachShadow({ mode: "open" });
    this.root.innerHTML = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"

`;
    const section = document.createElement("section");
    section.style.visibility = "hidden";
    section.innerHTML = `
            <span id="volume-controls">
                <button class="volume-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M112 416L160 416L294.1 535.2C300.5 540.9 308.7 544 317.2 544C336.4 544 352 528.4 352 509.2L352 130.8C352 111.6 336.4 96 317.2 96C308.7 96 300.5 99.1 294.1 104.8L160 224L112 224C85.5 224 64 245.5 64 272L64 368C64 394.5 85.5 416 112 416zM505.1 171C494.8 162.6 479.7 164.2 471.3 174.5C462.9 184.8 464.5 199.9 474.8 208.3C507.3 234.7 528 274.9 528 320C528 365.1 507.3 405.3 474.8 431.8C464.5 440.2 463 455.3 471.3 465.6C479.6 475.9 494.8 477.4 505.1 469.1C548.3 433.9 576 380.2 576 320.1C576 260 548.3 206.3 505.1 171.1zM444.6 245.5C434.3 237.1 419.2 238.7 410.8 249C402.4 259.3 404 274.4 414.3 282.8C425.1 291.6 432 305 432 320C432 335 425.1 348.4 414.3 357.3C404 365.7 402.5 380.8 410.8 391.1C419.1 401.4 434.3 402.9 444.6 394.6C466.1 376.9 480 350.1 480 320C480 289.9 466.1 263.1 444.5 245.5z"/></svg>
                </button>
                <div class="slider">
                    <input type="range" id="volume" value="80">
                </div>
            </span>
            <span id="transport-controls">
                <button id="prev-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>
                </button>
                <button class="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>
                    <div id="spectrum"></div>
                </button>
                <button id="next-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M149 100.8C161.9 93.8 177.7 94.5 190 102.6L448 272.1L448 128C448 110.3 462.3 96 480 96C497.7 96 512 110.3 512 128L512 512C512 529.7 497.7 544 480 544C462.3 544 448 529.7 448 512L448 367.9L190 537.5C177.7 545.6 162 546.3 149 539.3C136 532.3 128 518.7 128 504L128 136C128 121.3 136.1 107.8 149 100.8z"/></svg>
                </button>
            </span>
            <span>
                <button class="random-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM192 416C192 398.3 206.3 384 224 384C241.7 384 256 398.3 256 416C256 433.7 241.7 448 224 448C206.3 448 192 433.7 192 416zM320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288zM384 224C384 206.3 398.3 192 416 192C433.7 192 448 206.3 448 224C448 241.7 433.7 256 416 256C398.3 256 384 241.7 384 224zM416 384C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448C398.3 448 384 433.7 384 416C384 398.3 398.3 384 416 384z"/></svg>
                </button>
            </span>
            <span id="time-controls">
                <p id="current-time">0:00</p>
                <div class="slider">
                    <input type="range" id="seek" value="0">
                    <!-- <div class="slider-track"></div> -->
                </div>
                <p id="total-time">0:00</p>
            </span>
        `;
    if (options.colors) {
      entries(options.colors).forEach(([colorName, value]) => {
        if (!value)
          return;
        section.style.setProperty(`--${colorName}`, value);
      });
    }
    const link = document.createElement("link");
    link.href = asset("./styles.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    Object.entries(options.colors || {}).forEach(([key, value]) => {
      section.style.setProperty(`--${key}`, value);
    });
    this.root.appendChild(link);
    this.root.appendChild(section);
    link.addEventListener("load", () => {
      section.style.visibility = "";
    });
    const spectrum = exists(this.root.getElementById("spectrum"));
    if (options.colors?.foreground) {
      const result = import_css_filter_converter.default.hexToFilter(options.colors.foreground);
      spectrum.style.setProperty("filter", result.color);
    }
    this.visualizer = new audioMotion_analyzer_default(spectrum, {
      source: this.state.source,
      showBgColor: false,
      overlay: true,
      showScaleX: false,
      showScaleY: false,
      radial: true,
      radius: 0.8,
      showPeaks: false,
      gradient: "orangered",
      ...options.visualizerOptions
    });
    const volume = exists(this.root.querySelector("#volume"));
    volume.addEventListener("input", () => {
      this.state.source.volume = volume.valueAsNumber / 100;
    });
    const volumeButton = exists(this.root.querySelector(".volume-button"));
    const volumeControls = exists(this.root.querySelector("#volume-controls"));
    volumeControls.addEventListener("focusin", () => {
      volumeControls.classList.add("visible");
    });
    volumeControls.addEventListener("focusout", () => {
      volumeControls.classList.remove("visible");
    });
    volume.addEventListener("wheel", (event) => {
      event.preventDefault();
      const step = Number(volume.step) * 5 || 5;
      const delta = event.deltaY < 0 ? step : -step;
      const newValue = volume.valueAsNumber + delta;
      const min = Number(volume.min) || 0;
      const max = Number(volume.max) || 100;
      const maxClamped = Math.min(max, newValue);
      const clamped = Math.max(min, maxClamped);
      volume.valueAsNumber = clamped;
      volume.dispatchEvent(new Event("input"));
    });
    const seekBar = exists(this.root.querySelector("#seek"));
    this.state.source.addEventListener("loadedmetadata", () => {
      if (!Number.isFinite(this.state.source.duration)) {
        seekBar.style.cursor = "not-allowed";
      }
      exists(this.root.querySelector("#total-time")).innerHTML = this.clockDisplay(this.state.source.duration);
    });
    this.state.source.addEventListener("timeupdate", (event) => {
      seekBar.valueAsNumber = this.state.source.currentTime;
      this.updateSeekBar(this.state.source.currentTime);
    });
    seekBar.addEventListener("input", (event) => {
      this.state.source.currentTime = seekBar.valueAsNumber;
      this.updateSeekBar(seekBar.valueAsNumber);
    });
    this.playPause = exists(this.root.querySelector(".play-button"));
    this.playPause.addEventListener("click", () => this.toggle());
    this.playPause.addEventListener("click", () => this.soundEffects.buttonClick?.play());
    this.reroll = exists(this.root.querySelector(".random-button"));
    this.reroll.addEventListener("click", () => this.soundEffects.diceRoll?.play());
    mouseEnterLeave({
      element: this.playPause,
      hoverTime: 100,
      callback: () => {
        this.soundEffects.buttonHover?.play();
      }
    });
    mouseEnterLeave({
      element: this.reroll,
      hoverTime: 100,
      callback: () => {
        this.soundEffects.diceRoll?.play();
      }
    });
  }
  updateState(newState) {
    this.pause();
    this.visualizer.disconnectInput();
    this.state = {
      ...this.state,
      ...newState
    };
    this.visualizer.connectInput(this.state.source);
  }
  updateSeekBar(seconds) {
    console.log("hi");
    const currentTime = exists(this.root.querySelector("#current-time"));
    currentTime.innerHTML = this.clockDisplay(seconds);
  }
  clockDisplay(seconds) {
    if (!Number.isFinite(seconds)) {
      return "--:--";
    }
    const secondDisplay = Math.floor(seconds % 60).toString().padStart(2, "0");
    const minuteDisplay = Math.floor(seconds / 60).toString();
    return minuteDisplay + ":" + secondDisplay;
  }
  pause() {
    this.state.source.pause();
    this.playPause.classList.remove("playing");
  }
  play() {
    this.state.source.play();
    this.playPause.classList.add("playing");
  }
  toggle() {
    if (!this.state.source.paused) {
      this.pause();
    } else {
      this.play();
    }
  }
}
export {
  MusicPlayer as default
};
