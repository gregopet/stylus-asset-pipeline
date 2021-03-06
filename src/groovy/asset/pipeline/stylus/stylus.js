/**
 * constructor.name polyfill
 */

if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function() {
      var regex = /function\s([^(]{1,})\(/
        , match = regex.exec(this.toString());
      return match && match.length > 1 ? match[1].trim() : '';
    }
  });
}

/**
 * String.prototype.trimRight polyfill
 */

if (String.prototype.trimRight === undefined) {
  String.prototype.trimRight = function() {
    return String(this).replace(/\s+$/, '');
  };
}

var stylus = (function(){
function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }


var bifs = "called-from = ()\n\
\n\
vendors = moz webkit o ms official\n\
\n\
// stringify the given arg\n\
\n\
-string(arg)\n\
  type(arg) + ' ' + arg\n\
\n\
// require a color\n\
\n\
require-color(color)\n\
  unless color is a 'color'\n\
    error('RGB or HSL value expected, got a ' + -string(color))\n\
\n\
// require a unit\n\
\n\
require-unit(n)\n\
  unless n is a 'unit'\n\
    error('unit expected, got a ' + -string(n))\n\
\n\
// require a string\n\
\n\
require-string(str)\n\
  unless str is a 'string' or str is a 'ident'\n\
    error('string expected, got a ' + -string(str))\n\
\n\
// Math functions\n\
\n\
abs(n) { math(n, 'abs') }\n\
min(a, b) { a < b ? a : b }\n\
max(a, b) { a > b ? a : b }\n\
\n\
// Trigonometrics\n\
PI = -math-prop('PI')\n\
\n\
radians-to-degrees(angle)\n\
  angle * (180 / PI)\n\
\n\
degrees-to-radians(angle)\n\
  unit(angle * (PI / 180),'')\n\
\n\
sin(n)\n\
  n = degrees-to-radians(n) if unit(n) == 'deg'\n\
  round(math(n, 'sin'), 9)\n\
\n\
cos(n)\n\
  n = degrees-to-radians(n) if unit(n) == 'deg'\n\
  round(math(n, 'cos'), 9)\n\
\n\
// Rounding Math functions\n\
\n\
ceil(n, precision = 0)\n\
  multiplier = 10 ** precision\n\
  math(n * multiplier, 'ceil') / multiplier\n\
\n\
floor(n, precision = 0)\n\
  multiplier = 10 ** precision\n\
  math(n * multiplier, 'floor') / multiplier\n\
\n\
round(n, precision = 0)\n\
  multiplier = 10 ** precision\n\
  math(n * multiplier, 'round') / multiplier\n\
\n\
// return the sum of the given numbers\n\
\n\
sum(nums)\n\
  sum = 0\n\
  sum += n for n in nums\n\
\n\
// return the average of the given numbers\n\
\n\
avg(nums)\n\
  sum(nums) / length(nums)\n\
\n\
// return a unitless number, or pass through\n\
\n\
remove-unit(n)\n\
  if typeof(n) is 'unit'\n\
    unit(n, '')\n\
  else\n\
    n\n\
\n\
// convert a percent to a decimal, or pass through\n\
\n\
percent-to-decimal(n)\n\
  if unit(n) is '%'\n\
    remove-unit(n) / 100\n\
  else\n\
    n\n\
\n\
// check if n is an odd number\n\
\n\
odd(n)\n\
  1 == n % 2\n\
\n\
// check if n is an even number\n\
\n\
even(n)\n\
  0 == n % 2\n\
\n\
// check if color is light\n\
\n\
light(color)\n\
  lightness(color) >= 50%\n\
\n\
// check if color is dark\n\
\n\
dark(color)\n\
  lightness(color) < 50%\n\
\n\
// desaturate color by amount\n\
\n\
desaturate(color, amount)\n\
  adjust(color, 'saturation', - amount)\n\
\n\
// saturate color by amount\n\
\n\
saturate(color = '', amount = 100%)\n\
  if color is a 'color'\n\
    adjust(color, 'saturation', amount)\n\
  else\n\
    unquote( 'saturate(' + color + ')' )\n\
\n\
// darken by the given amount\n\
\n\
darken(color, amount)\n\
  adjust(color, 'lightness', - amount)\n\
\n\
// lighten by the given amount\n\
\n\
lighten(color, amount)\n\
  adjust(color, 'lightness', amount)\n\
\n\
// decrease opacity by amount\n\
\n\
fade-out(color, amount)\n\
  color - rgba(black, percent-to-decimal(amount))\n\
\n\
// increase opacity by amount\n\
\n\
fade-in(color, amount)\n\
  color + rgba(black, percent-to-decimal(amount))\n\
\n\
// spin hue by a given amount\n\
\n\
spin(color, amount)\n\
  color + unit(amount, deg)\n\
\n\
// mix two colors by a given amount\n\
\n\
mix(color1, color2, weight = 50%)\n\
  unless weight in 0..100\n\
    error('Weight must be between 0% and 100%')\n\
\n\
  if length(color1) == 2\n\
    weight = color1[0]\n\
    color1 = color1[1]\n\
\n\
  else if length(color2) == 2\n\
    weight = 100 - color2[0]\n\
    color2 = color2[1]\n\
\n\
  require-color(color1)\n\
  require-color(color2)\n\
\n\
  p = unit(weight / 100, '')\n\
  w = p * 2 - 1\n\
\n\
  a = alpha(color1) - alpha(color2)\n\
\n\
  w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2\n\
  w2 = 1 - w1\n\
\n\
  channels = (red(color1) red(color2)) (green(color1) green(color2)) (blue(color1) blue(color2))\n\
  rgb = ()\n\
\n\
  for pair in channels\n\
    push(rgb, floor(pair[0] * w1 + pair[1] * w2))\n\
\n\
  a1 = alpha(color1) * p\n\
  a2 = alpha(color1) * (1 - p)\n\
  alpha = a1 + a2\n\
\n\
  rgba(rgb[0], rgb[1], rgb[2], alpha)\n\
\n\
// invert colors, leave alpha intact\n\
\n\
invert(color = '')\n\
  if color is a 'color'\n\
    rgba(#fff - color, alpha(color))\n\
  else\n\
    unquote( 'invert(' + color + ')' )\n\
\n\
// give complement of the given color\n\
\n\
complement( color )\n\
  spin( color, 180 )\n\
\n\
// give grayscale of the given color\n\
\n\
grayscale( color = '' )\n\
  if color is a 'color'\n\
    desaturate( color, 100% )\n\
  else\n\
    unquote( 'grayscale(' + color + ')' )\n\
\n\
// mix the given color with white\n\
\n\
tint( color, percent )\n\
  mix( white, color, percent )\n\
\n\
// mix the given color with black\n\
\n\
shade( color, percent )\n\
  mix( black, color, percent )\n\
\n\
// return the last value in the given expr\n\
\n\
last(expr)\n\
  expr[length(expr) - 1]\n\
\n\
// return keys in the given pairs or object\n\
\n\
keys(pairs)\n\
  ret = ()\n\
  if type(pairs) == 'object'\n\
    for key in pairs\n\
      push(ret, key)\n\
  else\n\
    for pair in pairs\n\
      push(ret, pair[0]);\n\
  ret\n\
\n\
// return values in the given pairs or object\n\
\n\
values(pairs)\n\
  ret = ()\n\
  if type(pairs) == 'object'\n\
    for key, val in pairs\n\
      push(ret, val)\n\
  else\n\
    for pair in pairs\n\
      push(ret, pair[1]);\n\
  ret\n\
\n\
// join values with the given delimiter\n\
\n\
join(delim, vals...)\n\
  buf = ''\n\
  vals = vals[0] if length(vals) == 1\n\
  for val, i in vals\n\
    buf += i ? delim + val : val\n\
\n\
// add a CSS rule to the containing block\n\
\n\
// - This definition allows add-property to be used as a mixin\n\
// - It has the same effect as interpolation but allows users\n\
//   to opt for a functional style\n\
\n\
add-property-function = add-property\n\
add-property(name, expr)\n\
  if mixin\n\
    {name} expr\n\
  else\n\
    add-property-function(name, expr)\n\
\n\
prefix-classes(prefix)\n\
  -prefix-classes(prefix, block)\n\
\n\
// Caching mixin, use inside your functions to enable caching by extending.\n\
\n\
$stylus_mixin_cache = {}\n\
cache()\n\
  $key = (current-media() or 'no-media') + '__' + called-from[0] + '__' + arguments\n\
  if $key in $stylus_mixin_cache\n\
    @extend {'$cache_placeholder_for_' + $stylus_mixin_cache[$key]}\n\
  else if 'cache' in called-from\n\
    {block}\n\
  else\n\
    $id = length($stylus_mixin_cache)\n\
\n\
    &,\n\
    /$cache_placeholder_for_{$id}\n\
      $stylus_mixin_cache[$key] = $id\n\
      {block}\n\
";
require.modules = {};


require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };


require.register = function (path, fn){
    require.modules[path] = fn;
  };


require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);
      
      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();
      
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };



require.register("path.js", function(module, exports, require){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var isWindows = false;


// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length-1; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}


 // Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^([\s\S]+\/(?!$)|\/)?((?:[\s\S]+?)?(\.[^.]*)?)$/;

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = path.charAt(0) === '/',
      trailingSlash = path.slice(-1) === '/';

  // Normalize the path
  path = normalizeArray(path.split('/').filter(function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(paths.filter(function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};


});// module: path.js


require.register("colors.js", function(module, exports, require){


/*!
 * Stylus - colors
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

module.exports = {
    aliceblue: [240, 248, 255]
  , antiquewhite: [250, 235, 215]
  , aqua: [0, 255, 255]
  , aquamarine: [127, 255, 212]
  , azure: [240, 255, 255]
  , beige: [245, 245, 220]
  , bisque: [255, 228, 196]
  , black: [0, 0, 0]
  , blanchedalmond: [255, 235, 205]
  , blue: [0, 0, 255]
  , blueviolet: [138, 43, 226]
  , brown: [165, 42, 42]
  , burlywood: [222, 184, 135]
  , cadetblue: [95, 158, 160]
  , chartreuse: [127, 255, 0]
  , chocolate: [210, 105, 30]
  , coral: [255, 127, 80]
  , cornflowerblue: [100, 149, 237]
  , cornsilk: [255, 248, 220]
  , crimson: [220, 20, 60]
  , cyan: [0, 255, 255]
  , darkblue: [0, 0, 139]
  , darkcyan: [0, 139, 139]
  , darkgoldenrod: [184, 134, 11]
  , darkgray: [169, 169, 169]
  , darkgreen: [0, 100, 0]
  , darkgrey: [169, 169, 169]
  , darkkhaki: [189, 183, 107]
  , darkmagenta: [139, 0, 139]
  , darkolivegreen: [85, 107, 47]
  , darkorange: [255, 140, 0]
  , darkorchid: [153, 50, 204]
  , darkred: [139, 0, 0]
  , darksalmon: [233, 150, 122]
  , darkseagreen: [143, 188, 143]
  , darkslateblue: [72, 61, 139]
  , darkslategray: [47, 79, 79]
  , darkslategrey: [47, 79, 79]
  , darkturquoise: [0, 206, 209]
  , darkviolet: [148, 0, 211]
  , deeppink: [255, 20, 147]
  , deepskyblue: [0, 191, 255]
  , dimgray: [105, 105, 105]
  , dimgrey: [105, 105, 105]
  , dodgerblue: [30, 144, 255]
  , firebrick: [178, 34, 34]
  , floralwhite: [255, 250, 240]
  , forestgreen: [34, 139, 34]
  , fuchsia: [255, 0, 255]
  , gainsboro: [220, 220, 220]
  , ghostwhite: [248, 248, 255]
  , gold: [255, 215, 0]
  , goldenrod: [218, 165, 32]
  , gray: [128, 128, 128]
  , green: [0, 128, 0]
  , greenyellow: [173, 255, 47]
  , grey: [128, 128, 128]
  , honeydew: [240, 255, 240]
  , hotpink: [255, 105, 180]
  , indianred: [205, 92, 92]
  , indigo: [75, 0, 130]
  , ivory: [255, 255, 240]
  , khaki: [240, 230, 140]
  , lavender: [230, 230, 250]
  , lavenderblush: [255, 240, 245]
  , lawngreen: [124, 252, 0]
  , lemonchiffon: [255, 250, 205]
  , lightblue: [173, 216, 230]
  , lightcoral: [240, 128, 128]
  , lightcyan: [224, 255, 255]
  , lightgoldenrodyellow: [250, 250, 210]
  , lightgray: [211, 211, 211]
  , lightgreen: [144, 238, 144]
  , lightgrey: [211, 211, 211]
  , lightpink: [255, 182, 193]
  , lightsalmon: [255, 160, 122]
  , lightseagreen: [32, 178, 170]
  , lightskyblue: [135, 206, 250]
  , lightslategray: [119, 136, 153]
  , lightslategrey: [119, 136, 153]
  , lightsteelblue: [176, 196, 222]
  , lightyellow: [255, 255, 224]
  , lime: [0, 255, 0]
  , limegreen: [50, 205, 50]
  , linen: [250, 240, 230]
  , magenta: [255, 0, 255]
  , maroon: [128, 0, 0]
  , mediumaquamarine: [102, 205, 170]
  , mediumblue: [0, 0, 205]
  , mediumorchid: [186, 85, 211]
  , mediumpurple: [147, 112, 219]
  , mediumseagreen: [60, 179, 113]
  , mediumslateblue: [123, 104, 238]
  , mediumspringgreen: [0, 250, 154]
  , mediumturquoise: [72, 209, 204]
  , mediumvioletred: [199, 21, 133]
  , midnightblue: [25, 25, 112]
  , mintcream: [245, 255, 250]
  , mistyrose: [255, 228, 225]
  , moccasin: [255, 228, 181]
  , navajowhite: [255, 222, 173]
  , navy: [0, 0, 128]
  , oldlace: [253, 245, 230]
  , olive: [128, 128, 0]
  , olivedrab: [107, 142, 35]
  , orange: [255, 165, 0]
  , orangered: [255, 69, 0]
  , orchid: [218, 112, 214]
  , palegoldenrod: [238, 232, 170]
  , palegreen: [152, 251, 152]
  , paleturquoise: [175, 238, 238]
  , palevioletred: [219, 112, 147]
  , papayawhip: [255, 239, 213]
  , peachpuff: [255, 218, 185]
  , peru: [205, 133, 63]
  , pink: [255, 192, 203]
  , plum: [221, 160, 221]
  , powderblue: [176, 224, 230]
  , purple: [128, 0, 128]
  , red: [255, 0, 0]
  , rosybrown: [188, 143, 143]
  , royalblue: [65, 105, 225]
  , saddlebrown: [139, 69, 19]
  , salmon: [250, 128, 114]
  , sandybrown: [244, 164, 96]
  , seagreen: [46, 139, 87]
  , seashell: [255, 245, 238]
  , sienna: [160, 82, 45]
  , silver: [192, 192, 192]
  , skyblue: [135, 206, 235]
  , slateblue: [106, 90, 205]
  , slategray: [112, 128, 144]
  , slategrey: [112, 128, 144]
  , snow: [255, 250, 250]
  , springgreen: [0, 255, 127]
  , steelblue: [70, 130, 180]
  , tan: [210, 180, 140]
  , teal: [0, 128, 128]
  , thistle: [216, 191, 216]
  , tomato: [255, 99, 71]
  , turquoise: [64, 224, 208]
  , violet: [238, 130, 238]
  , wheat: [245, 222, 179]
  , white: [255, 255, 255]
  , whitesmoke: [245, 245, 245]
  , yellow: [255, 255, 0]
  , yellowgreen: [154, 205, 50]
  , rebeccapurple: [102, 51, 153]
};


});// module: colors.js


require.register("errors.js", function(module, exports, require){


/*!
 * Stylus - errors
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Expose constructors.
 */

exports.ParseError = ParseError;
exports.SyntaxError = SyntaxError;

/**
 * Inherit from `Error.prototype`.
 */

SyntaxError.prototype.__proto__ = Error.prototype;

/**
 * Initialize a new `ParseError` with the given `msg`.
 *
 * @param {String} msg
 * @api private
 */

function ParseError(msg) {
  this.name = 'ParseError';
  this.message = msg;
  Error.captureStackTrace(this, ParseError);
}

/**
 * Inherit from `Error.prototype`.
 */

ParseError.prototype.__proto__ = Error.prototype;

/**
 * Initialize a new `SyntaxError` with the given `msg`.
 *
 * @param {String} msg
 * @api private
 */

function SyntaxError(msg) {
  this.name = 'SyntaxError';
  this.message = msg;
  Error.captureStackTrace(this, ParseError);
}

/**
 * Inherit from `Error.prototype`.
 */

SyntaxError.prototype.__proto__ = Error.prototype;



});// module: errors.js


require.register("units.js", function(module, exports, require){


/*!
 * Stylus - units
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

// units found in http://www.w3.org/TR/css3-values

module.exports = [
    'em', 'ex', 'ch', 'rem' // relative lengths
  , 'vw', 'vh', 'vmin', 'vmax' // relative viewport-percentage lengths
  , 'cm', 'mm', 'in', 'pt', 'pc', 'px' // absolute lengths
  , 'deg', 'grad', 'rad', 'turn' // angles
  , 's', 'ms' // times
  , 'Hz', 'kHz' // frequencies
  , 'dpi', 'dpcm', 'dppx', 'x' // resolutions
  , '%' // percentage type
  , 'fr' // grid-layout (http://www.w3.org/TR/css3-grid-layout/)
];


});// module: units.js


require.register("functions/index.js", function(module, exports, require){


/*!
 * Stylus - Evaluator - built-in functions
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Compiler = require('../visitor/compiler')
  , nodes = require('../nodes')
  , utils = require('../utils')
  , Image = require('./image')
  , units = require('../units')
  , colors = require('../colors');

/**
 * Color component name map.
 */

var componentMap = {
    red: 'r'
  , green: 'g'
  , blue: 'b'
  , alpha: 'a'
  , hue: 'h'
  , saturation: 's'
  , lightness: 'l'
};

/**
 * Color component unit type map.
 */

var unitMap = {
    hue: 'deg'
  , saturation: '%'
  , lightness: '%'
};

/**
 * Color type map.
 */

var typeMap = {
    red: 'rgba'
  , blue: 'rgba'
  , green: 'rgba'
  , alpha: 'rgba'
  , hue: 'hsla'
  , saturation: 'hsla'
  , lightness: 'hsla'
};

/**
 * Convert the given `color` to an `HSLA` node,
 * or h,s,l,a component values.
 *
 * Examples:
 *
 *    hsla(10deg, 50%, 30%, 0.5)
 *    // => HSLA
 *
 *    hsla(#ffcc00)
 *    // => HSLA
 *
 * @param {RGBA|HSLA|Unit} hue
 * @param {Unit} saturation
 * @param {Unit} lightness
 * @param {Unit} alpha
 * @return {HSLA}
 * @api public
 */

exports.hsla = function hsla(hue, saturation, lightness, alpha){
  switch (arguments.length) {
    case 1:
      utils.assertColor(hue);
      return hue.hsla;
    case 2:
      utils.assertColor(hue);
      var color = hue.hsla;
      utils.assertType(saturation, 'unit', 'alpha');
      var alpha = saturation.clone();
      if ('%' == alpha.type) alpha.val /= 100;
      return new nodes.HSLA(
          color.h
        , color.s
        , color.l
        , alpha.val);
    default:
      utils.assertType(hue, 'unit', 'hue');
      utils.assertType(saturation, 'unit', 'saturation');
      utils.assertType(lightness, 'unit', 'lightness');
      utils.assertType(alpha, 'unit', 'alpha');
      var alpha = alpha.clone();
      if (alpha && '%' == alpha.type) alpha.val /= 100;
      return new nodes.HSLA(
          hue.val
        , saturation.val
        , lightness.val
        , alpha.val);
  }
};

/**
 * Convert the given `color` to an `HSLA` node,
 * or h,s,l component values.
 *
 * Examples:
 *
 *    hsl(10, 50, 30)
 *    // => HSLA
 *
 *    hsl(#ffcc00)
 *    // => HSLA
 *
 * @param {Unit|HSLA|RGBA} hue
 * @param {Unit} saturation
 * @param {Unit} lightness
 * @return {HSLA}
 * @api public
 */

exports.hsl = function hsl(hue, saturation, lightness){
  if (1 == arguments.length) {
    utils.assertColor(hue, 'color');
    return hue.hsla;
  } else {
    return exports.hsla(
        hue
      , saturation
      , lightness
      , new nodes.Unit(1));
  }
};

/**
 * Return type of `node`.
 *
 * Examples:
 * 
 *    type(12)
 *    // => 'unit'
 *
 *    type(#fff)
 *    // => 'color'
 *
 *    type(type)
 *    // => 'function'
 *
 *    type(unbound)
 *    typeof(unbound)
 *    type-of(unbound)
 *    // => 'ident'
 *
 * @param {Node} node
 * @return {String}
 * @api public
 */

exports.type =
exports['typeof'] =
exports['type-of'] = function type(node){
  utils.assertPresent(node, 'expression');
  return node.nodeName;
};

/**
 * Return component `name` for the given `color`.
 *
 * @param {RGBA|HSLA} color
 * @param {String} name
 * @return {Unit}
 * @api public
 */

exports.component = function component(color, name) {
  utils.assertColor(color, 'color');
  utils.assertString(name, 'name');
  var name = name.string
    , unit = unitMap[name]
    , type = typeMap[name]
    , name = componentMap[name];
  if (!name) throw new Error('invalid color component "' + name + '"');
  return new nodes.Unit(color[type][name], unit);
};

/**
 * Return the basename of `path`.
 *
 * @param {String} path
 * @return {String}
 * @api public
 */

exports.basename = function basename(p, ext){
  utils.assertString(p, 'path');
  return path.basename(p.val, ext && ext.val);
};

/**
 * Return the dirname of `path`.
 *
 * @param {String} path
 * @return {String}
 * @api public
 */

exports.dirname = function dirname(p){
  utils.assertString(p, 'path');
  return path.dirname(p.val);
};

/**
 * Return the extname of `path`.
 *
 * @param {String} path
 * @return {String}
 * @api public
 */

exports.extname = function extname(p){
  utils.assertString(p, 'path');
  return path.extname(p.val);
};

/**
 * Peform a path join.
 *
 * @param {String} path
 * @return {String}
 * @api public
 */

(exports.pathjoin = function pathjoin(){
  var paths = [].slice.call(arguments).map(function(path){
    return path.first.string;
  });
  return path.join.apply(null, paths);
}).raw = true;

/**
 * Return the red component of the given `color`,
 * or set the red component to the optional second `value` argument.
 *
 * Examples:
 *
 *    red(#c00)
 *    // => 204
 *
 *    red(#000, 255)
 *    // => #f00
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.red = function red(color, value){
  color = color.rgba;
  if (value) {
    return exports.rgba(
      value,
      new nodes.Unit(color.g),
      new nodes.Unit(color.b),
      new nodes.Unit(color.a)
    );
  }
  return new nodes.Unit(color.r, '');
};

/**
 * Return the green component of the given `color`,
 * or set the green component to the optional second `value` argument.
 *
 * Examples:
 *
 *    green(#0c0)
 *    // => 204
 *
 *    green(#000, 255)
 *    // => #0f0
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.green = function green(color, value){
  color = color.rgba;
  if (value) {
    return exports.rgba(
      new nodes.Unit(color.r),
      value,
      new nodes.Unit(color.b),
      new nodes.Unit(color.a)
    );
  }
  return new nodes.Unit(color.g, '');
};

/**
 * Return the blue component of the given `color`,
 * or set the blue component to the optional second `value` argument.
 *
 * Examples:
 *
 *    blue(#00c)
 *    // => 204
 *
 *    blue(#000, 255)
 *    // => #00f
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.blue = function blue(color, value){
  color = color.rgba;
  if (value) {
    return exports.rgba(
      new nodes.Unit(color.r),
      new nodes.Unit(color.g),
      value,
      new nodes.Unit(color.a)
    );
  }
  return new nodes.Unit(color.b, '');
};

/**
 * Return the alpha component of the given `color`,
 * or set the alpha component to the optional second `value` argument.
 *
 * Examples:
 *
 *    alpha(#fff)
 *    // => 1
 *
 *    alpha(rgba(0,0,0,0.3))
 *    // => 0.3
 *
 *    alpha(#fff, 0.5)
 *    // => rgba(255,255,255,0.5)
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.alpha = function alpha(color, value){
  color = color.rgba;
  if (value) {
    return exports.rgba(
      new nodes.Unit(color.r),
      new nodes.Unit(color.g),
      new nodes.Unit(color.b),
      value
    );
  }
  return new nodes.Unit(color.a, '');
};

/**
 * Return the hue component of the given `color`,
 * or set the hue component to the optional second `value` argument.
 *
 * Examples:
 *
 *    hue(#00c)
 *    // => 240deg
 *
 *    hue(#00c, 90deg)
 *    // => #6c0
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.hue = function hue(color, value){
  if (value) {
    var hslaColor = color.hsla;
    return exports.hsla(
      value,
      new nodes.Unit(hslaColor.s),
      new nodes.Unit(hslaColor.l),
      new nodes.Unit(hslaColor.a)
    )
  }
  return exports.component(color, new nodes.String('hue'));
};

/**
 * Return the saturation component of the given `color`,
 * or set the saturation component to the optional second `value` argument.
 *
 * Examples:
 *
 *    saturation(#00c)
 *    // => 100%
 *
 *    saturation(#00c, 50%)
 *    // => #339
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.saturation = function saturation(color, value){
  if (value) {
    var hslaColor = color.hsla;
    return exports.hsla(
      new nodes.Unit(hslaColor.h),
      value,
      new nodes.Unit(hslaColor.l),
      new nodes.Unit(hslaColor.a)
    )
  }
  return exports.component(color, new nodes.String('saturation'));
};

/**
 * Return the lightness component of the given `color`,
 * or set the lightness component to the optional second `value` argument.
 *
 * Examples:
 *
 *    lightness(#00c)
 *    // => 100%
 *
 *    lightness(#00c, 80%)
 *    // => #99f
 *
 * @param {RGBA|HSLA} color
 * @param {Unit} [value]
 * @return {Unit|RGBA}
 * @api public
 */

exports.lightness = function lightness(color, value){
  if (value) {
    var hslaColor = color.hsla;
    return exports.hsla(
      new nodes.Unit(hslaColor.h),
      new nodes.Unit(hslaColor.s),
      value,
      new nodes.Unit(hslaColor.a)
    )
  }
  return exports.component(color, new nodes.String('lightness'));
};

/**
 * Return a `RGBA` from the r,g,b,a channels.
 *
 * Examples:
 *
 *    rgba(255,0,0,0.5)
 *    // => rgba(255,0,0,0.5)
 *
 *    rgba(255,0,0,1)
 *    // => #ff0000
 *
 *    rgba(#ffcc00, 50%)
 *    // rgba(255,204,0,0.5)
 *
 * @param {Unit|RGBA|HSLA} red
 * @param {Unit} green
 * @param {Unit} blue
 * @param {Unit} alpha
 * @return {RGBA}
 * @api public
 */

exports.rgba = function rgba(red, green, blue, alpha){
  switch (arguments.length) {
    case 1:
      utils.assertColor(red);
      return red.rgba;
    case 2:
      utils.assertColor(red);
      var color = red.rgba;
      utils.assertType(green, 'unit', 'alpha');
      alpha = green.clone();
      if ('%' == alpha.type) alpha.val /= 100;
      return new nodes.RGBA(
          color.r
        , color.g
        , color.b
        , alpha.val);
    default:
      utils.assertType(red, 'unit', 'red');
      utils.assertType(green, 'unit', 'green');
      utils.assertType(blue, 'unit', 'blue');
      utils.assertType(alpha, 'unit', 'alpha');
      var r = '%' == red.type ? Math.round(red.val * 2.55) : red.val
        , g = '%' == green.type ? Math.round(green.val * 2.55) : green.val
        , b = '%' == blue.type ? Math.round(blue.val * 2.55) : blue.val;

      alpha = alpha.clone();
      if (alpha && '%' == alpha.type) alpha.val /= 100;
      return new nodes.RGBA(
          r
        , g
        , b
        , alpha.val);
  }
};

/**
 * Return a `RGBA` from the r,g,b channels.
 *
 * Examples:
 *
 *    rgb(255,204,0)
 *    // => #ffcc00
 *
 *    rgb(#fff)
 *    // => #fff
 *
 * @param {Unit|RGBA|HSLA} red
 * @param {Unit} green
 * @param {Unit} blue
 * @return {RGBA}
 * @api public
 */

exports.rgb = function rgb(red, green, blue){
  switch (arguments.length) {
    case 1:
      utils.assertColor(red);
      var color = red.rgba;
      return new nodes.RGBA(
          color.r
        , color.g
        , color.b
        , 1);
    default:
      return exports.rgba(
          red
        , green
        , blue
        , new nodes.Unit(1));
  }
};

/**
 * Blend the `top` color over the `bottom`
 *
 * Examples:
 *
 *     blend(rgba(#FFF, 0.5), #000)
 *     // => #808080
 * 
 *     blend(rgba(#FFDE00,.42), #19C261)
 *     // => #7ace38
 * 
 *     blend(rgba(lime, 0.5), rgba(red, 0.25))
 *     // => rgba(128,128,0,0.625)
 *
 * @param {RGBA|HSLA} top
 * @param {RGBA|HSLA} [bottom=#fff]
 * @return {RGBA}
 * @api public
 */

exports.blend = function blend(top, bottom){
  // TODO: different blend modes like overlay etc.
  utils.assertColor(top);
  top = top.rgba;
  bottom = bottom || new nodes.RGBA(255, 255, 255, 1);
  utils.assertColor(bottom);
  bottom = bottom.rgba;

  return new nodes.RGBA(
    top.r * top.a + bottom.r * (1 - top.a),
    top.g * top.a + bottom.g * (1 - top.a),
    top.b * top.a + bottom.b * (1 - top.a),
    top.a + bottom.a - top.a * bottom.a);
};

/**
 * Returns the relative luminance of the given `color`,
 * see http://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * Examples:
 *
 *     luminosity(white)
 *     // => 1
 * 
 *     luminosity(#000)
 *     // => 0
 * 
 *     luminosity(red)
 *     // => 0.2126
 *
 * @param {RGBA|HSLA} color
 * @return {Unit}
 * @api public
 */

exports.luminosity = function luminosity(color){
  utils.assertColor(color);
  color = color.rgba;
  function processChannel(channel) {
    channel = channel / 255;
    return (0.03928 > channel)
      ? channel / 12.92
      : Math.pow(((channel + 0.055) / 1.055), 2.4);
  }
  return new nodes.Unit(
    0.2126 * processChannel(color.r)
    + 0.7152 * processChannel(color.g)
    + 0.0722 * processChannel(color.b)
  );
}

/**
 * Returns the contrast ratio object between `top` and `bottom` colors,
 * based on http://leaverou.github.io/contrast-ratio/
 * and https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/color.js#L108
 *
 * Examples:
 *
 *     contrast(#000, #fff).ratio
 *     => 21
 *
 *     contrast(#000, rgba(#FFF, 0.5))
 *     => { "ratio": "13.15;", "error": "7.85", "min": "5.3", "max": "21" }
 *
 * @param {RGBA|HSLA} top
 * @param {RGBA|HSLA} [bottom=#fff]
 * @return {Object}
 * @api public
 */

exports.contrast = function contrast(top, bottom){
  var result = new nodes.Object();
  utils.assertColor(top);
  top = top.rgba;
  bottom = bottom || new nodes.RGBA(255, 255, 255, 1);
  utils.assertColor(bottom);
  bottom = bottom.rgba;
  function contrast(top, bottom) {
    if (1 > top.a) {
      top = exports.blend(top, bottom);
    }
    var l1 = exports.luminosity(bottom).val + 0.05
      , l2 = exports.luminosity(top).val + 0.05
      , ratio = l1 / l2;

    if (l2 > l1) {
      ratio = 1 / ratio;
    }
    return Math.round(ratio * 10) / 10;
  }

  if (1 <= bottom.a) {
    var resultRatio = new nodes.Unit(contrast(top, bottom));
    result.set('ratio', resultRatio);
    result.set('error', new nodes.Unit(0));
    result.set('min', resultRatio);
    result.set('max', resultRatio);
  } else {
    var onBlack = contrast(top, exports.blend(bottom, new nodes.RGBA(0, 0, 0, 1)))
      , onWhite = contrast(top, exports.blend(bottom, new nodes.RGBA(255, 255, 255, 1)))
      , max = Math.max(onBlack, onWhite);
    function processChannel(topChannel, bottomChannel) {
      return Math.min(Math.max(0, (topChannel - bottomChannel * bottom.a) / (1 - bottom.a)), 255);
    }
    var closest = new nodes.RGBA(
      processChannel(top.r, bottom.r),
      processChannel(top.g, bottom.g),
      processChannel(top.b, bottom.b),
      1
    );
    var min = contrast(top, exports.blend(bottom, closest));

    result.set('ratio', new nodes.Unit(Math.round((min + max) * 50) / 100));
    result.set('error', new nodes.Unit(Math.round((max - min) * 50) / 100));
    result.set('min', new nodes.Unit(min));
    result.set('max', new nodes.Unit(max));
  }
  return result;
}

/**
 * Returns the transparent version of the given `top` color,
 * as if it was blend over the given `bottom` color.
 *
 * Examples:
 *
 *     transparentify(#808080)
 *     => rgba(0,0,0,0.5)
 *
 *     transparentify(#414141, #000)
 *     => rgba(255,255,255,0.25)
 *
 *     transparentify(#91974C, #F34949, 0.5)
 *     => rgba(47,229,79,0.5)
 *
 * @param {RGBA|HSLA} top
 * @param {RGBA|HSLA} [bottom=#fff]
 * @param {Unit} [alpha]
 * @return {RGBA}
 * @api public
 */
exports.transparentify = function transparentify(top, bottom, alpha){
  utils.assertColor(top);
  top = top.rgba;
  // Handle default arguments
  bottom = bottom || new nodes.RGBA(255, 255, 255, 1);
  if (!alpha && bottom && !bottom.rgba) {
    alpha = bottom;
    bottom = new nodes.RGBA(255, 255, 255, 1);
  }
  utils.assertColor(bottom);
  bottom = bottom.rgba;
  var bestAlpha = ['r', 'g', 'b'].map(function(channel){
    return (top[channel] - bottom[channel]) / ((0 < (top[channel] - bottom[channel]) ? 255 : 0) - bottom[channel]);
  }).sort(function(a, b){return a < b;})[0];
  if (alpha) {
    utils.assertType(alpha, 'unit', 'alpha');
    if ('%' == alpha.type) {
      bestAlpha = alpha.val / 100;
    } else if (!alpha.type) {
      bestAlpha = alpha = alpha.val;
    }
  }
  bestAlpha = Math.max(Math.min(bestAlpha, 1), 0);
  // Calculate the resulting color
  function processChannel(channel) {
    if (0 == bestAlpha) {
      return bottom[channel]
    } else {
      return bottom[channel] + (top[channel] - bottom[channel]) / bestAlpha
    }
  }
  return new nodes.RGBA(
    processChannel('r'),
    processChannel('g'),
    processChannel('b'),
    Math.round(bestAlpha * 100) / 100
  );
}

/**
 * Convert a .json file into stylus variables or object.
 * Nested variable object keys are joined with a dash (-)
 *
 * Given this sample media-queries.json file:
 * {
 *   "small": "screen and (max-width:400px)",
 *   "tablet": {
 *     "landscape": "screen and (min-width:600px) and (orientation:landscape)",
 *     "portrait": "screen and (min-width:600px) and (orientation:portrait)"
 *   }
 * }
 *
 * Examples:
 *
 *    json('media-queries.json')
 *
 *    @media small
 *    // => @media screen and (max-width:400px)
 *
 *    @media tablet-landscape
 *    // => @media screen and (min-width:600px) and (orientation:landscape)
 *
 *    vars = json('vars.json', { hash: true })
 *    body
 *      width: vars.width
 *
 * @param {String} path
 * @param {Boolean} [local]
 * @param {String} [namePrefix]
 * @api public
*/

exports.json = function(path, local, namePrefix){
  utils.assertString(path, 'path');

  // lookup
  path = path.string;
  var found = utils.lookup(path, this.options.paths, this.options.filename);
  if (!found) throw new Error('failed to locate .json file ' + path);

  // read
  var json = JSON.parse(fs.readFileSync(found, 'utf8'));

  if (local && 'object' == local.nodeName) {
    return convert(json);
  } else {
    exports['-old-json'].call(this, json, local, namePrefix);
  }

  function convert(obj){
    var ret = new nodes.Object();
    for (var key in obj) {
      var val = obj[key];
      if ('object' == typeof val) {
        ret.set(key, convert(val));
      } else {
        val = utils.coerce(val);
        if ('string' == val.nodeName) val = parseString(val.string);
        ret.set(key, val);
      }
    }
    return ret;
  }
};

/**
 * Old `json` BIF.
 *
 * @api private
 */

exports['-old-json'] = function(json, local, namePrefix){
  if (namePrefix) {
    utils.assertString(namePrefix, 'namePrefix');
    namePrefix = namePrefix.val;
  } else {
    namePrefix = '';
  }
  local = local ? local.toBoolean() : new nodes.Boolean(local);
  var scope = local.isTrue ? this.currentScope : this.global.scope;

  convert(json);
  return;

  function convert(obj, prefix){
    prefix = prefix ? prefix + '-' : '';
    for (var key in obj){
      var val = obj[key];
      var name = prefix + key;
      if ('object' == typeof val) {
        convert(val, name);
      } else {
        val = utils.coerce(val);
        if ('string' == val.nodeName) val = parseString(val.string);
        scope.add({ name: namePrefix + name, val: val });
      }
    }
  }
};

/**
*  Use the given `plugin`
*  
*  Examples:
*
*     use("plugins/add.js")
*
*     width add(10, 100)
*     // => width: 110
*/

exports.use = function(plugin, options){
  utils.assertString(plugin, 'plugin');

  if (options) {
    utils.assertType(options, 'object', 'options');
    options = parseObject(options);
  }

  // lookup
  plugin = plugin.string;
  var found = utils.lookup(plugin, this.options.paths, this.options.filename);
  if (!found) throw new Error('failed to locate plugin file "' + plugin + '"');

  // use
  var fn = require(path.resolve(found));
  if ('function' != typeof fn) {
    throw new Error('plugin "' + plugin + '" does not export a function');
  }
  this.renderer.use(fn(options || this.options));
}

/**
 * Unquote the given `string`.
 *
 * Examples:
 *
 *    unquote("sans-serif")
 *    // => sans-serif
 *
 *    unquote(sans-serif)
 *    // => sans-serif
 *
 * @param {String|Ident} string
 * @return {Literal}
 * @api public
 */

exports.unquote = function unquote(string){
  utils.assertString(string, 'string');
  return new nodes.Literal(string.string);
};

/**
 * Like `unquote` but tries to convert
 * the given `str` to a Stylus node.
 *
 * @param {String} str
 * @return {Node}
 * @api public
 */

exports.convert = function convert(str){
  utils.assertString(str, 'str');
  return parseString(str.string);
};

/**
 * Assign `type` to the given `unit` or return `unit`'s type.
 *
 * @param {Unit} unit
 * @param {String|Ident} type
 * @return {Unit}
 * @api public
 */

exports.unit = function unit(unit, type){
  utils.assertType(unit, 'unit', 'unit');

  // Assign
  if (type) {
    utils.assertString(type, 'type');
    return new nodes.Unit(unit.val, type.string);
  } else {
    return unit.type || '';
  }
};

/**
 * Lookup variable `name` or return Null.
 *
 * @param {String} name
 * @return {Mixed}
 * @api public
 */

exports.lookup = function lookup(name){
  utils.assertType(name, 'string', 'name');
  var node = this.lookup(name.val);
  if (!node) return nodes.nil;
  return this.visit(node);
};

/**
 * Set a variable `name` on current scope.
 *
 * @param {String} name
 * @param {Expression} expr
 * @api public
 */

exports.define = function define(name, expr){
  utils.assertType(name, 'string', 'name');
  expr = utils.unwrap(expr);
  var scope = this.currentScope;
  var node = new nodes.Ident(name.val, expr);
  scope.add(node);
  return nodes.nil;
};

/**
 * Perform `op` on the `left` and `right` operands.
 *
 * @param {String} op
 * @param {Node} left
 * @param {Node} right
 * @return {Node}
 * @api public
 */

exports.operate = function operate(op, left, right){
  utils.assertType(op, 'string', 'op');
  utils.assertPresent(left, 'left');
  utils.assertPresent(right, 'right');
  return left.operate(op.val, right);
};

/**
 * Test if `val` matches the given `pattern`.
 *
 * Examples:
 *
 *     match('^foo(bar)?', foo)
 *     match('^foo(bar)?', foobar)
 *     match('^foo(bar)?', 'foo')
 *     match('^foo(bar)?', 'foobar')
 *     // => true
 *
 *     match('^foo(bar)?', 'bar')
 *     // => false
 *
 * @param {String} pattern
 * @param {String|Ident} val
 * @return {Boolean}
 * @api public
 */

exports.match = function match(pattern, val){
  utils.assertType(pattern, 'string', 'pattern');
  utils.assertString(val, 'val');
  var re = new RegExp(pattern.val);
  return new nodes.Boolean(re.test(val.string));
};

/**
 * Returns substring of the given `val`.
 *
 * @param {String|Ident} val
 * @param {Number} start
 * @param {Number} [length]
 * @return {String|Ident}
 * @api public
 */

(exports.substr = function substr(val, start, length){
  utils.assertPresent(val, 'string');
  utils.assertPresent(start, 'start');
  var valNode = utils.unwrap(val).nodes[0];
  start = utils.unwrap(start).nodes[0].val;
  if (length) {
    length = utils.unwrap(length).nodes[0].val;
  }
  var res = valNode.string.substr(start, length);
  return valNode instanceof nodes.Ident
      ? new nodes.Ident(res)
      : new nodes.String(res);
}).raw = true;

/**
 * Returns string with all matches of `pattern` replaced by `replacement` in given `val`
 *
 * @param {String} pattern
 * @param {String} replacement
 * @param {String|Ident} val
 * @return {String|Ident}
 * @api public
 */

(exports.replace = function replace(pattern, replacement, val){
  utils.assertPresent(pattern, 'pattern');
  utils.assertPresent(replacement, 'replacement');
  utils.assertPresent(val, 'val');
  pattern = new RegExp(utils.unwrap(pattern).nodes[0].string, 'g');
  replacement = utils.unwrap(replacement).nodes[0].string;
  var valNode = utils.unwrap(val).nodes[0];
  var res = valNode.string.replace(pattern, replacement);
  return valNode instanceof nodes.Ident
    ? new nodes.Ident(res)
    : new nodes.String(res);
}).raw = true;

/**
 * Splits the given `val` by `delim`
 *
 * @param {String} delim
 * @param {String|Ident} val
 * @return {Expression}
 * @api public
 */
(exports.split = function split(delim, val){
  utils.assertPresent(delim, 'delimiter');
  utils.assertPresent(val, 'val');
  delim = utils.unwrap(delim).nodes[0].string;
  var valNode = utils.unwrap(val).nodes[0];
  var splitted = valNode.string.split(delim);
  var expr = new nodes.Expression();
  var ItemNode = valNode instanceof nodes.Ident
    ? nodes.Ident
    : nodes.String;
  for (var i = 0, len = splitted.length; i < len; ++i) {
    expr.nodes.push(new ItemNode(splitted[i]));
  }
  return expr;
}).raw = true;

/**
 * Return length of the given `expr`.
 *
 * @param {Expression} expr
 * @return {Unit}
 * @api public
 */

(exports.length = function length(expr){
  if (expr) {
    if (expr.nodes) {
      var nodes = utils.unwrap(expr).nodes;
      if (1 == nodes.length && 'object' == nodes[0].nodeName) {
        return nodes[0].length;
      } else {
        return nodes.length;
      }
    } else {
      return 1;
    }
  }
  return 0;
}).raw = true;

/**
 * Inspect the given `expr`.
 *
 * @param {Expression} expr
 * @api public
 */

(exports.p = function p(){
  [].slice.call(arguments).forEach(function(expr){
    expr = utils.unwrap(expr);
    if (!expr.nodes.length) return;
    console.log('\033[90minspect:\033[0m %s', expr.toString().replace(/^\(|\)$/g, ''));
  })
  return nodes.nil;
}).raw = true;

/**
 * Throw an error with the given `msg`.
 *
 * @param {String} msg
 * @api public
 */

exports.error = function error(msg){
  utils.assertType(msg, 'string', 'msg');
  var err = new Error(msg.val);
  err.fromStylus = true;
  throw err;
};

/**
 * Warn with the given `msg` prefixed by "Warning: ".
 *
 * @param {String} msg
 * @api public
 */

exports.warn = function warn(msg){
  utils.assertType(msg, 'string', 'msg');
  console.warn('Warning: %s', msg.val);
  return nodes.nil;
};

/**
 * Output stack trace.
 *
 * @api public
 */

exports.trace = function trace(){
  console.log(this.stack);
  return nodes.nil;
};

/**
 * Push the given args to `expr`.
 *
 * @param {Expression} expr
 * @param {Node} ...
 * @return {Unit}
 * @api public
 */

(exports.push = exports.append = function(expr){
  expr = utils.unwrap(expr);
  for (var i = 1, len = arguments.length; i < len; ++i) {
    expr.nodes.push(utils.unwrap(arguments[i]).clone());
  }
  return expr.nodes.length;
}).raw = true;

/**
 * Pop a value from `expr`.
 *
 * @param {Expression} expr
 * @return {Node}
 * @api public
 */

(exports.pop = function pop(expr) {
  expr = utils.unwrap(expr);
  return expr.nodes.pop();
}).raw = true;

/**
 * Unshift the given args to `expr`.
 *
 * @param {Expression} expr
 * @param {Node} ...
 * @return {Unit}
 * @api public
 */

(exports.unshift = exports.prepend = function(expr){
  expr = utils.unwrap(expr);
  for (var i = 1, len = arguments.length; i < len; ++i) {
    expr.nodes.unshift(utils.unwrap(arguments[i]));
  }
  return expr.nodes.length;
}).raw = true;

/**
 * Shift an element from `expr`.
 *
 * @param {Expression} expr
 * @return {Node}
 * @api public
 */

 (exports.shift = function(expr){
   expr = utils.unwrap(expr);
   return expr.nodes.shift();
 }).raw = true;

/**
 * Return a `Literal` with the given `fmt`, and
 * variable number of arguments.
 *
 * @param {String} fmt
 * @param {Node} ...
 * @return {Literal}
 * @api public
 */

(exports.s = function s(fmt){
  fmt = utils.unwrap(fmt).nodes[0];
  utils.assertString(fmt);
  var self = this
    , str = fmt.string
    , args = arguments
    , i = 1;

  // format
  str = str.replace(/%(s|d)/g, function(_, specifier){
    var arg = args[i++] || nodes.nil;
    switch (specifier) {
      case 's':
        return new Compiler(arg, self.options).compile();
      case 'd':
        arg = utils.unwrap(arg).first;
        if ('unit' != arg.nodeName) throw new Error('%d requires a unit');
        return arg.val;
    }
  });

  return new nodes.Literal(str);
}).raw = true;

/**
 * Return a `Literal` `num` converted to the provided `base`, padded to `width`
 * with zeroes (default width is 2)
 *
 * @param {Number} num
 * @param {Number} base
 * @param {Number} width
 * @return {Literal}
 * @api public
 */

(exports['base-convert'] = function(num, base, width) {
  utils.assertPresent(num, 'number');
  utils.assertPresent(base, 'base');
  num = utils.unwrap(num).nodes[0].val;
  base = utils.unwrap(base).nodes[0].val;
  width = (width && utils.unwrap(width).nodes[0].val) || 2;
  var result = Number(num).toString(base);
  while (result.length < width) {
    result = "0" + result;
  }
  return new nodes.Literal(result);
}).raw = true;

/**
 * Return the opposites of the given `positions`.
 *
 * Examples:
 *
 *    opposite-position(top left)
 *    // => bottom right
 *
 * @param {Expression} positions
 * @return {Expression}
 * @api public
 */

(exports['opposite-position'] = function oppositePosition(positions){
  var expr = [];
  utils.unwrap(positions).nodes.forEach(function(pos, i){
    utils.assertString(pos, 'position ' + i);
    pos = (function(){ switch (pos.string) {
      case 'top': return 'bottom';
      case 'bottom': return 'top';
      case 'left': return 'right';
      case 'right': return 'left';
      case 'center': return 'center';
      default: throw new Error('invalid position ' + pos);
    }})();
    expr.push(new nodes.Literal(pos));
  });
  return expr;
}).raw = true;

/**
 * Return the width and height of the given `img` path.
 *
 * Examples:
 *
 *    image-size('foo.png')
 *    // => 200px 100px
 *
 *    image-size('foo.png')[0]
 *    // => 200px
 *
 *    image-size('foo.png')[1]
 *    // => 100px
 *
 * Can be used to test if the image exists,
 * using an optional argument set to `true`
 * (without this argument this function throws error
 * if there is no such image).
 *
 * Example:
 *
 *    image-size('nosuchimage.png', true)[0]
 *    // => 0
 *
 * @param {String} img
 * @param {Boolean} ignoreErr
 * @return {Expression}
 * @api public
 */

exports['image-size'] = function imageSize(img, ignoreErr) {
  utils.assertType(img, 'string', 'img');
  try {
    var img = new Image(this, img.string);
  } catch (err) {
    if (ignoreErr) {
      return [new nodes.Unit(0), new nodes.Unit(0)];
    } else {
      throw err;
    }
  }

  // Read size
  img.open();
  var size = img.size();
  img.close();

  // Return (w h)
  var expr = [];
  expr.push(new nodes.Unit(size[0], 'px'));
  expr.push(new nodes.Unit(size[1], 'px'));

  return expr;
};

/**
 * Return the tangent of the given `angle`.
 *
 * @param {Unit} angle
 * @return {Unit}
 * @api public
 */
exports.tan = function tan(angle) {
  utils.assertType(angle, 'unit', 'angle');

  var radians = angle.val;

  if (angle.type === 'deg') {
    radians *= Math.PI / 180;
  }

  var m = Math.pow(10, 9);

  var sin = Math.round(Math.sin(radians) * m) / m
    , cos = Math.round(Math.cos(radians) * m) / m
    , tan = Math.round(m * sin / cos ) / m;

  return new nodes.Unit(tan, '');
}

/**
 * Apply Math `fn` to `n`.
 *
 * @param {Unit} n
 * @param {String} fn
 * @return {Unit}
 * @api private
 */

exports.math = function math(n, fn){
  utils.assertType(n, 'unit', 'n');
  utils.assertString(fn, 'fn');
  return new nodes.Unit(Math[fn.string](n.val), n.type);
};

/**
 * Get Math `prop`.
 *
 * @param {String} prop
 * @return {Unit}
 * @api private
 */

exports['-math-prop'] = function math(prop){
  return new nodes.Unit(Math[prop.string]);
};

/**
 * Adjust HSL `color` `prop` by `amount`.
 *
 * @param {RGBA|HSLA} color
 * @param {String} prop
 * @param {Unit} amount
 * @return {RGBA}
 * @api private
 */

exports.adjust = function adjust(color, prop, amount){
  utils.assertColor(color, 'color');
  utils.assertString(prop, 'prop');
  utils.assertType(amount, 'unit', 'amount');
  var hsl = color.hsla.clone();
  prop = { hue: 'h', saturation: 's', lightness: 'l' }[prop.string];
  if (!prop) throw new Error('invalid adjustment property');
  var val = amount.val;
  if ('%' == amount.type){
    val = 'l' == prop && val > 0
      ? (100 - hsl[prop]) * val / 100
      : hsl[prop] * (val / 100);
  }
  hsl[prop] += val;
  return hsl.rgba;
};

/**
 * Return a clone of the given `expr`.
 *
 * @param {Expression} expr
 * @return {Node}
 * @api public
 */

(exports.clone = function clone(expr){
  utils.assertPresent(expr, 'expr');
  return expr.clone();
}).raw = true;

/**
 * Add property `name` with the given `expr`
 * to the mixin-able block.
 *
 * @param {String|Ident|Literal} name
 * @param {Expression} expr
 * @return {Property}
 * @api public
 */

(exports['add-property'] = function addProperty(name, expr){
  utils.assertType(name, 'expression', 'name');
  name = utils.unwrap(name).first;
  utils.assertString(name, 'name');
  utils.assertType(expr, 'expression', 'expr');
  var prop = new nodes.Property([name], expr);
  var block = this.closestBlock;

  var len = block.nodes.length
    , head = block.nodes.slice(0, block.index)
    , tail = block.nodes.slice(block.index++, len);
  head.push(prop);
  block.nodes = head.concat(tail);
  
  return prop;
}).raw = true;

/**
 * Merge the object `dest` with the given args.
 *
 * @param {Object} dest
 * @param {Object} ...
 * @return {Object} dest
 * @api public
 */

(exports.merge = exports.extend = function merge(dest){
  utils.assertPresent(dest, 'dest');
  dest = utils.unwrap(dest).first;
  utils.assertType(dest, 'object', 'dest');
  for (var i = 1, len = arguments.length; i < len; ++i) {
    utils.merge(dest.vals, utils.unwrap(arguments[i]).first.vals);
  }
  return dest;
}).raw = true;

/**
 * Return the current selector or compile `sel` selector.
 *
 * @param {String} [sel]
 * @return {String}
 * @api public
 */

exports.selector = function selector(sel){
  var stack = this.selectorStack
    , group;
  if (sel && 'string' == sel.nodeName) {
    if (!~sel.val.indexOf('&') && '/' !== sel.val.charAt(0)) return sel.val;
    group = new nodes.Group;
    sel = new nodes.Selector([sel.val]);
    sel.val = sel.segments.join('');
    group.push(sel);
    stack.push(group.nodes);
  }
  return stack.length ? utils.compileSelectors(stack).join(',') : '&';
};

/**
 * Prefix css classes in a block
 *
 * @param {String} prefix
 * @param {Block} block
 * @return {Block}
 * @api private
 */

exports['-prefix-classes'] = function prefixClasses(prefix, block){
  utils.assertString(prefix, 'prefix');
  utils.assertType(block, 'block', 'block');

  var _prefix = this.prefix;

  this.options.prefix = this.prefix = prefix.string;
  block = this.visit(block);
  this.options.prefix = this.prefix = _prefix;
  return block;
};

/**
 * Returns the @media string for the current block
 *
 * @return {String}
 * @api public
 */

exports['current-media'] = function currentMedia(){
  return new nodes.String(lookForMedia(this.closestBlock.node) || '');

  function lookForMedia(node){
    if ('media' == node.nodeName) {
      return node.toString();
    } else if (node.block.parent.node) {
      return lookForMedia(node.block.parent.node);
    }
  }
};

/**
 * Return the separator of the given `list`.
 *
 * Examples:
 *
 *    list1 = a b c
 *    list-separator(list1)
 *    // => ' '
 *
 *    list2 = a, b, c
 *    list-separator(list2)
 *    // => ','
 *
 * @param {Experssion} list
 * @return {String}
 * @api public
 */

(exports['list-separator'] = function listSeparator(list){
  list = utils.unwrap(list);
  return new nodes.String(list.isList ? ',' : ' ');
}).raw = true;

/**
 * Attempt to parse unit `str`.
 *
 * @param {String} str
 * @return {Unit}
 * @api private
 */

function parseUnit(str){
  var m = str.match(/^(\d+)(.*)/);
  if (!m) return;
  var n = parseInt(m[1], 10);
  var type = m[2];
  return new nodes.Unit(n, type);
}

/**
 * Attempt to parse color.
 *
 * @param {String} str
 * @return {RGBA}
 * @api private
 */

function parseColor(str){
  if (str.substr(0,1) === '#') {
    // Handle color shorthands (like #abc)
    var shorthand = str.length === 4,
        m = str.match(shorthand ? /\w/g : /\w{2}/g);

    if (!m) return;
    m = m.map(function(s) { return parseInt(shorthand ? s+s : s, 16) });
    return new nodes.RGBA(m[0],m[1],m[2],1);
  }
  else if (str.substr(0,3) === 'rgb'){
    var m = str.match(/([0-9]*\.?[0-9]+)/g);
    if (!m) return;
    m = m.map(function(s){return parseFloat(s, 10)});
    return new nodes.RGBA(m[0], m[1], m[2], m[3] || 1);
  }
  else {
    var rgb = colors[str];
    if (!rgb) return;
    return new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1);
  }
}

/**
 * Attempt to parse string.
 *
 * @param {String} str
 * @return {Unit|RGBA|Literal}
 * @api private
 */

function parseString(str){
  return parseUnit(str) || parseColor(str) || new nodes.Literal(str);
}

/**
 * Attempt to parse object node to the javascript object.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function parseObject(obj){
  obj = obj.vals;
  for (var key in obj) {
    var nodes = obj[key].nodes[0].nodes;
    if (nodes && nodes.length) {
      obj[key] = [];
      for (var i = 0, len = nodes.length; i < len; ++i) {
        obj[key].push(convert(nodes[i]));
      }
    } else {
      obj[key] = convert(obj[key].first);
    }
  }
  return obj;

  function convert(node){
    switch (node.nodeName) {
      case 'object':
        return parseObject(node);
      case 'boolean':
        return node.isTrue;
      case 'unit':
        return node.type ? node.toString() : +node.val;
      case 'string':
      case 'literal':
        return node.val;
      default:
        return node.toString();
    }
  }
}


});// module: functions/index.js


require.register("functions/image.js", function(module, exports, require){



/*!
 * Stylus - plugin - url
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('../utils')
  , nodes = require('../nodes')
  , path  = require('path');

/**
 * Initialize a new `Image` with the given `ctx` and `path.
 *
 * @param {Evaluator} ctx
 * @param {String} path
 * @api private
 */

var Image = module.exports = function Image(ctx, path) {
  this.ctx = ctx;
  this.path = utils.lookup(path, ctx.paths);
  if (!this.path) throw new Error('failed to locate file ' + path);
};

/**
 * Open the image for reading.
 *
 * @api private
 */

Image.prototype.open = function(){
  this.fd = fs.openSync(this.path, 'r');
  this.length = fs.fstatSync(this.fd).size;
  this.extname = path.extname(this.path).slice(1);
};

/**
 * Close the file.
 *
 * @api private
 */

Image.prototype.close = function(){
  if (this.fd) fs.closeSync(this.fd);
};

/**
 * Return the type of image, supports:
 *
 *  - gif
 *  - png
 *  - jpeg
 *  - svg
 *
 * @return {String}
 * @api private
 */

Image.prototype.type = function(){
  var type
    , buf = new Buffer(4);
  
  fs.readSync(this.fd, buf, 0, 4, 0);

  // GIF
  if (0x47 == buf[0] && 0x49 == buf[1] && 0x46 == buf[2]) type = 'gif';

  // PNG
  else if (0x50 == buf[1] && 0x4E == buf[2] && 0x47 == buf[3]) type = 'png';

  // JPEG
  else if (0xff == buf[0] && 0xd8 == buf[1]) type = 'jpeg';

  // SVG
  else if ('svg' == this.extname) type = this.extname;

  return type;
};

/**
 * Return image dimensions `[width, height]`.
 *
 * @return {Array}
 * @api private
 */

Image.prototype.size = function(){
  var type = this.type()
    , width
    , height
    , buf
    , offset
    , blockSize
    , parser;

  function uint16(b) { return b[1] << 8 | b[0]; }
  function uint32(b) { return b[0] << 24 | b[1] << 16 | b[2] << 8 | b[3]; } 

  // Determine dimensions
  switch (type) {
    case 'jpeg':
      buf = new Buffer(this.length);
      fs.readSync(this.fd, buf, 0, this.length, 0);
      offset = 4;
      blockSize = buf[offset] << 8 | buf[offset + 1];

      while (offset < this.length) {
        offset += blockSize;
        if (offset >= this.length || 0xff != buf[offset]) break;
        // SOF0 or SOF2 (progressive)
        if (0xc0 == buf[offset + 1] || 0xc2 == buf[offset + 1]) {
          height = buf[offset + 5] << 8 | buf[offset + 6];
          width = buf[offset + 7] << 8 | buf[offset + 8];
        } else {
          offset += 2;
          blockSize = buf[offset] << 8 | buf[offset + 1];
        }
      }
      break;
    case 'png':
      buf = new Buffer(8);
      // IHDR chunk width / height uint32_t big-endian
      fs.readSync(this.fd, buf, 0, 8, 16);
      width = uint32(buf);
      height = uint32(buf.slice(4, 8));
      break;
    case 'gif':
      buf = new Buffer(4);
      // width / height uint16_t little-endian
      fs.readSync(this.fd, buf, 0, 4, 6);
      width = uint16(buf);
      height = uint16(buf.slice(2, 4));
      break;
    case 'svg':
      offset = Math.min(this.length, 1024);
      buf = new Buffer(offset);
      fs.readSync(this.fd, buf, 0, offset, 0);
      buf = buf.toString('utf8');
      parser = sax.parser(true);
      parser.onopentag = function(node) {
        if ('svg' == node.name && node.attributes.width && node.attributes.height) {
          width = parseInt(node.attributes.width, 10);
          height = parseInt(node.attributes.height, 10);
        }
      };
      parser.write(buf).close();
      break;
  }

  if ('number' != typeof width) throw new Error('failed to find width of "' + this.path + '"');
  if ('number' != typeof height) throw new Error('failed to find height of "' + this.path + '"');

  return [width, height];
};


});// module: functions/image.js


require.register("functions/url.js", function(module, exports, require){


/*!
 * Stylus - plugin - url
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Compiler = require('../visitor/compiler')
  , events = require('../renderer').events
  , nodes = require('../nodes')
  // , parse = require('url').parse
  , extname = require('../path').extname
  , utils = require('../utils')
  // , fs = require('fs');

/**
 * Mime table.
 */

var defaultMimes = {
    '.gif': 'image/gif'
  , '.png': 'image/png'
  , '.jpg': 'image/jpeg'
  , '.jpeg': 'image/jpeg'
  , '.svg': 'image/svg+xml'
  , '.webp': 'image/webp'
  , '.ttf': 'application/x-font-ttf'
  , '.eot': 'application/vnd.ms-fontobject'
  , '.woff': 'application/font-woff'
  , '.woff2': 'application/font-woff2'
};

/**
 * Return a url() function with the given `options`.
 *
 * Options:
 *
 *    - `limit` bytesize limit defaulting to 30Kb
 *    - `paths` image resolution path(s), merged with general lookup paths
 *
 * Examples:
 *
 *    stylus(str)
 *      .set('filename', __dirname + '/css/test.styl')
 *      .define('url', stylus.url({ paths: [__dirname + '/public'] }))
 *      .render(function(err, css){ ... })
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function(options) {
  options = options || {};

  var _paths = options.paths || [];
  var sizeLimit = null != options.limit ? options.limit : 30000;
  var mimes = options.mimes || defaultMimes;

  function fn(url){
    // Compile the url
    var compiler = new Compiler(url);
    compiler.isURL = true;
    url = url.nodes.map(function(node){
      return compiler.visit(node);
    }).join('');

    // Parse literal
    url = parse(url);
    var ext = extname(url.pathname)
      , mime = mimes[ext]
      , hash = url.hash || ''
      , literal = new nodes.Literal('url("' + url.href + '")')
      , paths = _paths.concat(this.paths)
      , buf;

    // Not supported
    if (!mime) return literal;

    // Absolute
    if (url.protocol) return literal;

    // Lookup
    var found = utils.lookup(url.pathname, paths);

    // Failed to lookup
    if (!found) {
      events.emit(
          'file not found'
        , 'File ' + literal + ' could not be found, literal url retained!'
      );

      return literal;
    }

    // Read data
    buf = fs.readFileSync(found);

    // Too large
    if (false !== sizeLimit && buf.length > sizeLimit) return literal;

    // Encode
    return new nodes.Literal('url("data:' + mime + ';base64,' + buf.toString('base64') + hash + '")');
  };

  fn.raw = true;
  return fn;
};

// Exporting default mimes so we could easily access them
module.exports.mimes = defaultMimes;



});// module: functions/url.js


require.register("lexer.js", function(module, exports, require){


/*!
 * Stylus - Lexer
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Token = require('./token')
  , nodes = require('./nodes')
  , errors = require('./errors')
  , units = require('./units');

/**
 * Expose `Lexer`.
 */

exports = module.exports = Lexer;

/**
 * Operator aliases.
 */

var alias = {
    'and': '&&'
  , 'or': '||'
  , 'is': '=='
  , 'isnt': '!='
  , 'is not': '!='
  , ':=': '?='
};

/**
 * Units.
 */

units = units.join('|');

/**
 * Unit RegExp.
 */

var unit = new RegExp('^(-)?(\\d+\\.\\d+|\\d+|\\.\\d+)(' + units + ')?[ \\t]*');

/**
 * Initialize a new `Lexer` with the given `str` and `options`.
 *
 * @param {String} str
 * @param {Object} options
 * @api private
 */

function Lexer(str, options) {
  options = options || {};
  this.stash = [];
  this.indentStack = [];
  this.indentRe = null;
  this.lineno = 1;
  this.column = 1;

  // HACK!
  function comment(str, val, offset, s) {
    var inComment = s.lastIndexOf('/*', offset) > s.lastIndexOf('*/', offset)
      , commentIdx = s.lastIndexOf('//', offset)
      , i = s.lastIndexOf('\n', offset)
      , double = 0
      , single = 0;

    if (~commentIdx && commentIdx > i) {
      while (i != offset) {
        if ("'" == s[i]) single ? single-- : single++;
        if ('"' == s[i]) double ? double-- : double++;

        if ('/' == s[i] && '/' == s[i + 1]) {
          inComment = !single && !double;
          break;
        }
        ++i;
      }
    }

    return inComment
      ? str
      : val + '\r';
  };

  // Remove UTF-8 BOM.
  if ('\uFEFF' == str.charAt(0)) str = str.slice(1);

  this.str = str
    .replace(/\s+$/, '\n')
    .replace(/\r\n?/g, '\n')
    .replace(/\\ *\n/g, '\r')
    .replace(/([,(:](?!\/\/[^ ])) *(?:\/\/[^\n]*)?\n\s*/g, comment)
    .replace(/\s*\n[ \t]*([,)])/g, comment);
};

/**
 * Lexer prototype.
 */

Lexer.prototype = {
  
  /**
   * Custom inspect.
   */
  
  inspect: function(){
    var tok
      , tmp = this.str
      , buf = [];
    while ('eos' != (tok = this.next()).type) {
      buf.push(tok.inspect());
    }
    this.str = tmp;
    return buf.concat(tok.inspect()).join('\n');
  },

  /**
   * Lookahead `n` tokens.
   *
   * @param {Number} n
   * @return {Object}
   * @api private
   */
  
  lookahead: function(n){
    var fetch = n - this.stash.length;
    while (fetch-- > 0) this.stash.push(this.advance());
    return this.stash[--n];
  },
  
  /**
   * Consume the given `len`.
   *
   * @param {Number|Array} len
   * @api private
   */

  skip: function(len){
    var chunk = len[0];
    len = chunk ? chunk.length : len;
    this.str = this.str.substr(len);
    if (chunk) {
      this.move(chunk);
    } else {
      this.column += len;
    }
  },

  /**
   * Move current line and column position.
   *
   * @param {String} str
   * @api private
   */

  move: function(str){
    var lines = str.match(/\n/g)
      , idx = str.lastIndexOf('\n');

    if (lines) this.lineno += lines.length;
    this.column = ~idx
      ? str.length - idx
      : this.column + str.length;
  },

  /**
   * Fetch next token including those stashed by peek.
   *
   * @return {Token}
   * @api private
   */

  next: function() {
    var tok = this.stashed() || this.advance();
    this.prev = tok;
    return tok;
  },

  /**
   * Check if the current token is a part of selector.
   *
   * @return {Boolean}
   * @api private
   */

  isPartOfSelector: function() {
    var tok = this.stash[this.stash.length - 1] || this.prev;
    switch (tok && tok.type) {
      // #for
      case 'color':
        return 2 == tok.val.raw.length;
      // .or
      case '.':
      // [is]
      case '[':
        return true;
    }
    return false;
  },

  /**
   * Fetch next token.
   *
   * @return {Token}
   * @api private
   */

  advance: function() {
    var column = this.column
      , line = this.lineno
      , tok = this.eos()
      || this.nil()
      || this.sep()
      || this.keyword()
      || this.urlchars()
      || this.comment()
      || this.newline()
      || this.escaped()
      || this.important()
      || this.literal()
      || this.fun()
      || this.anonFunc()
      || this.atrule()
      || this.brace()
      || this.paren()
      || this.color()
      || this.string()
      || this.unit()
      || this.namedop()
      || this.boolean()
      || this.unicode()
      || this.ident()
      || this.op()
      || this.eol()
      || this.space()
      || this.selector();
    tok.lineno = line;
    tok.column = column;
    return tok;
  },

  /**
   * Lookahead a single token.
   *
   * @return {Token}
   * @api private
   */
  
  peek: function() {
    return this.lookahead(1);
  },
  
  /**
   * Return the next possibly stashed token.
   *
   * @return {Token}
   * @api private
   */

  stashed: function() {
    return this.stash.shift();
  },

  /**
   * EOS | trailing outdents.
   */

  eos: function() {
    if (this.str.length) return;
    if (this.indentStack.length) {
      this.indentStack.shift();
      return new Token('outdent');
    } else {
      return new Token('eos');
    }
  },

  /**
   * url char
   */

  urlchars: function() {
    var captures;
    if (!this.isURL) return;
    if (captures = /^[\/:@.;?&=*!,<>#%0-9]+/.exec(this.str)) {
      this.skip(captures);
      return new Token('literal', new nodes.Literal(captures[0]));
    }
  },

  /**
   * ';' [ \t]*
   */

  sep: function() {
    var captures;
    if (captures = /^;[ \t]*/.exec(this.str)) {
      this.skip(captures);
      return new Token(';');
    }
  },

  /**
   * '\r'
   */

  eol: function() {
    if ('\r' == this.str[0]) {
      ++this.lineno;
      this.skip(1);
      return this.advance();
    }
  },
  
  /**
   * ' '+
   */

  space: function() {
    var captures;
    if (captures = /^([ \t]+)/.exec(this.str)) {
      this.skip(captures);
      return new Token('space');
    }
  },
  
  /**
   * '\\' . ' '*
   */
   
  escaped: function() {
    var captures;
    if (captures = /^\\(.)[ \t]*/.exec(this.str)) {
      var c = captures[1];
      this.skip(captures);
      return new Token('ident', new nodes.Literal(c));
    }
  },
  
  /**
   * '@css' ' '* '{' .* '}' ' '*
   */
  
  literal: function() {
    // HACK attack !!!
    var captures;
    if (captures = /^@css[ \t]*\{/.exec(this.str)) {
      this.skip(captures);
      var c
        , braces = 1
        , css = ''
        , node;
      while (c = this.str[0]) {
        this.str = this.str.substr(1);
        switch (c) {
          case '{': ++braces; break;
          case '}': --braces; break;
          case '\n': ++this.lineno; break;
        }
        css += c;
        if (!braces) break;
      }
      css = css.replace(/\s*}$/, '');
      node = new nodes.Literal(css);
      node.css = true;
      return new Token('literal', node);
    }
  },
  
  /**
   * '!important' ' '*
   */
  
  important: function() {
    var captures;
    if (captures = /^!important[ \t]*/.exec(this.str)) {
      this.skip(captures);
      return new Token('ident', new nodes.Literal('!important'));
    }
  },
  
  /**
   * '{' | '}'
   */
  
  brace: function() {
    var captures;
    if (captures = /^([{}])/.exec(this.str)) {
      this.skip(1);
      var brace = captures[1];
      return new Token(brace, brace);
    }
  },
  
  /**
   * '(' | ')' ' '*
   */
  
  paren: function() {
    var captures;
    if (captures = /^([()])([ \t]*)/.exec(this.str)) {
      var paren = captures[1];
      this.skip(captures);
      if (')' == paren) this.isURL = false;
      var tok = new Token(paren, paren);
      tok.space = captures[2];
      return tok;
    }
  },
  
  /**
   * 'null'
   */
  
  nil: function() {
    var captures
      , tok;
    if (captures = /^(null)\b[ \t]*/.exec(this.str)) {
      this.skip(captures);
      if (this.isPartOfSelector()) {
        tok = new Token('ident', new nodes.Ident(captures[0]));
      } else {
        tok = new Token('null', nodes.nil);
      }
      return tok;
    }
  },
  
  /**
   *   'if'
   * | 'else'
   * | 'unless'
   * | 'return'
   * | 'for'
   * | 'in'
   */
  
  keyword: function() {
    var captures
      , tok;
    if (captures = /^(return|if|else|unless|for|in)\b[ \t]*/.exec(this.str)) {
      var keyword = captures[1];
      this.skip(captures);
      if (this.isPartOfSelector()) {
        tok = new Token('ident', new nodes.Ident(captures[0]));
      } else {
        tok = new Token(keyword, keyword);
      }
      return tok;
    }
  },
  
  /**
   *   'not'
   * | 'and'
   * | 'or'
   * | 'is'
   * | 'is not'
   * | 'isnt'
   * | 'is a'
   * | 'is defined'
   */
  
  namedop: function() {
    var captures
      , tok;
    if (captures = /^(not|and|or|is a|is defined|isnt|is not|is)(?!-)\b([ \t]*)/.exec(this.str)) {
      var op = captures[1];
      this.skip(captures);
      if (this.isPartOfSelector()) {
        tok = new Token('ident', new nodes.Ident(captures[0]));
      } else {
        op = alias[op] || op;
        tok = new Token(op, op);
      }
      tok.space = captures[2];
      return tok;
    }
  },

  /**
   *   ','
   * | '+'
   * | '+='
   * | '-'
   * | '-='
   * | '*'
   * | '*='
   * | '/'
   * | '/='
   * | '%'
   * | '%='
   * | '**'
   * | '!'
   * | '&'
   * | '&&'
   * | '||'
   * | '>'
   * | '>='
   * | '<'
   * | '<='
   * | '='
   * | '=='
   * | '!='
   * | '!'
   * | '~'
   * | '?='
   * | ':='
   * | '?'
   * | ':'
   * | '['
   * | ']'
   * | '.'
   * | '..'
   * | '...'
   */
  
  op: function() {
    var captures;
    if (captures = /^([.]{1,3}|&&|\|\||[!<>=?:]=|\*\*|[-+*\/%]=?|[,=?:!~<>&\[\]])([ \t]*)/.exec(this.str)) {
      var op = captures[1];
      this.skip(captures);
      op = alias[op] || op;
      var tok = new Token(op, op);
      tok.space = captures[2];
      this.isURL = false;
      return tok;
    }
  },

  /**
   * '@('
   */

  anonFunc: function() {
    var tok;
    if ('@' == this.str[0] && '(' == this.str[1]) {
      this.skip(2);
      tok = new Token('function', new nodes.Ident('anonymous'));
      tok.anonymous = true;
      return tok;
    }
  },

  /**
   * '@' (-(\w+)-)?[a-zA-Z0-9-_]+
   */

  atrule: function() {
    var captures;
    if (captures = /^@(?:-(\w+)-)?([a-zA-Z0-9-_]+)[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var vendor = captures[1]
        , type = captures[2]
        , tok;
      switch (type) {
        case 'require':
        case 'import':
        case 'charset':
        case 'namespace':
        case 'media':
        case 'scope':
        case 'supports':
          return new Token(type);
        case 'document':
          return new Token('-moz-document');
        case 'block':
          return new Token('atblock');
        case 'extend':
        case 'extends':
          return new Token('extend');
        case 'keyframes':
          return new Token(type, vendor);
        default:
          return new Token('atrule', (vendor ? '-' + vendor + '-' + type : type));
      }
    }
  },

  /**
   * '//' *
   */
  
  comment: function() {
    // Single line
    if ('/' == this.str[0] && '/' == this.str[1]) {
      var end = this.str.indexOf('\n');
      if (-1 == end) end = this.str.length;
      this.skip(end);
      return this.advance();
    }

    // Multi-line
    if ('/' == this.str[0] && '*' == this.str[1]) {
      var end = this.str.indexOf('*/');
      if (-1 == end) end = this.str.length;
      var str = this.str.substr(0, end + 2)
        , lines = str.split('\n').length - 1
        , suppress = true
        , inline = false;
      this.lineno += lines;
      this.skip(end + 2);
      // output
      if ('!' == str[2]) {
        str = str.replace('*!', '*');
        suppress = false;
      }
      if (this.prev && ';' == this.prev.type) inline = true;
      return new Token('comment', new nodes.Comment(str, suppress, inline));
    }
  },

  /**
   * 'true' | 'false'
   */
  
  boolean: function() {
    var captures;
    if (captures = /^(true|false)\b([ \t]*)/.exec(this.str)) {
      var val = nodes.Boolean('true' == captures[1]);
      this.skip(captures);
      var tok = new Token('boolean', val);
      tok.space = captures[2];
      return tok;
    }
  },

  /**
   * 'U+' [0-9A-Fa-f?]{1,6}(?:-[0-9A-Fa-f]{1,6})?
   */

  unicode: function() {
    var captures;
    if (captures = /^u\+[0-9a-f?]{1,6}(?:-[0-9a-f]{1,6})?/i.exec(this.str)) {
      this.skip(captures);
      return new Token('literal', new nodes.Literal(captures[0]));
    }
  },

  /**
   * -*[_a-zA-Z$] [-\w\d$]* '('
   */
  
  fun: function() {
    var captures;
    if (captures = /^(-*[_a-zA-Z$][-\w\d$]*)\(([ \t]*)/.exec(this.str)) {
      var name = captures[1];
      this.skip(captures);
      this.isURL = 'url' == name;
      var tok = new Token('function', new nodes.Ident(name));
      tok.space = captures[2];
      return tok;
    } 
  },

  /**
   * -*[_a-zA-Z$] [-\w\d$]*
   */
  
  ident: function() {
    var captures;
    if (captures = /^-*[_a-zA-Z$][-\w\d$]*/.exec(this.str)) {
      this.skip(captures);
      return new Token('ident', new nodes.Ident(captures[0]));
    }
  },

  /**
   * '\n' ' '+
   */

  newline: function() {
    var captures, re;

    // we have established the indentation regexp
    if (this.indentRe){
      captures = this.indentRe.exec(this.str);
    // figure out if we are using tabs or spaces
    } else {
      // try tabs
      re = /^\n([\t]*)[ \t]*/;
      captures = re.exec(this.str);

      // nope, try spaces
      if (captures && !captures[1].length) {
        re = /^\n([ \t]*)/;
        captures = re.exec(this.str);
      }

      // established
      if (captures && captures[1].length) this.indentRe = re;
    }


    if (captures) {
      var tok
        , indents = captures[1].length;

      this.skip(captures);
      if (this.str[0] === ' ' || this.str[0] === '\t') {
        throw new errors.SyntaxError('Invalid indentation. You can use tabs or spaces to indent, but not both.');
      }

      // Blank line
      if ('\n' == this.str[0]) return this.advance();

      // Outdent
      if (this.indentStack.length && indents < this.indentStack[0]) {
        while (this.indentStack.length && this.indentStack[0] > indents) {
          this.stash.push(new Token('outdent'));
          this.indentStack.shift();
        }
        tok = this.stash.pop();
      // Indent
      } else if (indents && indents != this.indentStack[0]) {
        this.indentStack.unshift(indents);
        tok = new Token('indent');
      // Newline
      } else {
        tok = new Token('newline');
      }

      return tok;
    }
  },

  /**
   * '-'? (digit+ | digit* '.' digit+) unit
   */

  unit: function() {
    var captures;
    if (captures = unit.exec(this.str)) {
      this.skip(captures);
      var n = parseFloat(captures[2]);
      if ('-' == captures[1]) n = -n;
      var node = new nodes.Unit(n, captures[3]);
      node.raw = captures[0];
      return new Token('unit', node);
    }
  },

  /**
   * '"' [^"]+ '"' | "'"" [^']+ "'"
   */

  string: function() {
    var captures;
    if (captures = /^("[^"]*"|'[^']*')[ \t]*/.exec(this.str)) {
      var str = captures[1]
        , quote = captures[0][0];
      this.skip(captures);
      str = str.slice(1,-1).replace(/\\n/g, '\n');
      return new Token('string', new nodes.String(str, quote));
    }
  },

  /**
   * #rrggbbaa | #rrggbb | #rgba | #rgb | #nn | #n
   */

  color: function() {
    return this.rrggbbaa()
      || this.rrggbb()
      || this.rgba()
      || this.rgb()
      || this.nn()
      || this.n()
  },

  /**
   * #n
   */
  
  n: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{1})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var n = parseInt(captures[1] + captures[1], 16)
        , color = new nodes.RGBA(n, n, n, 1);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },

  /**
   * #nn
   */
  
  nn: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{2})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var n = parseInt(captures[1], 16)
        , color = new nodes.RGBA(n, n, n, 1);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },

  /**
   * #rgb
   */
  
  rgb: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{3})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var rgb = captures[1]
        , r = parseInt(rgb[0] + rgb[0], 16)
        , g = parseInt(rgb[1] + rgb[1], 16)
        , b = parseInt(rgb[2] + rgb[2], 16)
        , color = new nodes.RGBA(r, g, b, 1);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },
  
  /**
   * #rgba
   */
  
  rgba: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{4})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var rgb = captures[1]
        , r = parseInt(rgb[0] + rgb[0], 16)
        , g = parseInt(rgb[1] + rgb[1], 16)
        , b = parseInt(rgb[2] + rgb[2], 16)
        , a = parseInt(rgb[3] + rgb[3], 16)
        , color = new nodes.RGBA(r, g, b, a/255);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },
  
  /**
   * #rrggbb
   */
  
  rrggbb: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{6})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var rgb = captures[1]
        , r = parseInt(rgb.substr(0, 2), 16)
        , g = parseInt(rgb.substr(2, 2), 16)
        , b = parseInt(rgb.substr(4, 2), 16)
        , color = new nodes.RGBA(r, g, b, 1);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },
  
  /**
   * #rrggbbaa
   */
  
  rrggbbaa: function() {
    var captures;
    if (captures = /^#([a-fA-F0-9]{8})[ \t]*/.exec(this.str)) {
      this.skip(captures);
      var rgb = captures[1]
        , r = parseInt(rgb.substr(0, 2), 16)
        , g = parseInt(rgb.substr(2, 2), 16)
        , b = parseInt(rgb.substr(4, 2), 16)
        , a = parseInt(rgb.substr(6, 2), 16)
        , color = new nodes.RGBA(r, g, b, a/255);
      color.raw = captures[0];
      return new Token('color', color); 
    }
  },
  
  /**
   * [^\n,;]+
   */
  
  selector: function() {
    var captures;
    if (captures = /^.*?(?=\/\/(?![^\[]*\])|[,\n{])/.exec(this.str)) {
      var selector = captures[0];
      this.skip(captures);
      return new Token('selector', selector);
    }
  }
};


});// module: lexer.js


require.register("nodes/arguments.js", function(module, exports, require){


/*!
 * Stylus - Arguments
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('../nodes')
  , utils = require('../utils');

/**
 * Initialize a new `Arguments`.
 *
 * @api public
 */

var Arguments = module.exports = function Arguments(){
  nodes.Expression.call(this);
  this.map = {};
};

/**
 * Inherit from `nodes.Expression.prototype`.
 */

Arguments.prototype.__proto__ = nodes.Expression.prototype;

/**
 * Initialize an `Arguments` object with the nodes
 * from the given `expr`.
 *
 * @param {Expression} expr
 * @return {Arguments}
 * @api public
 */

Arguments.fromExpression = function(expr){
  var args = new Arguments
    , len = expr.nodes.length;
  args.lineno = expr.lineno;
  args.column = expr.column;
  args.isList = expr.isList;
  for (var i = 0; i < len; ++i) {
    args.push(expr.nodes[i]);
  }
  return args;
};

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Arguments.prototype.clone = function(parent){
  var clone = nodes.Expression.prototype.clone.call(this, parent);
  clone.map = {};
  for (var key in this.map) {
    clone.map[key] = this.map[key].clone(parent, clone);
  }
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Arguments.prototype.toJSON = function(){
  return {
    __type: 'Arguments',
    map: this.map,
    isList: this.isList,
    preserve: this.preserve,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename,
    nodes: this.nodes
  };
};


});// module: nodes/arguments.js


require.register("nodes/binop.js", function(module, exports, require){


/*!
 * Stylus - BinOp
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `BinOp` with `op`, `left` and `right`.
 *
 * @param {String} op
 * @param {Node} left
 * @param {Node} right
 * @api public
 */

var BinOp = module.exports = function BinOp(op, left, right){
  Node.call(this);
  this.op = op;
  this.left = left;
  this.right = right;
};

/**
 * Inherit from `Node.prototype`.
 */

BinOp.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

BinOp.prototype.clone = function(parent){
  var clone = new BinOp(this.op);
  clone.left = this.left.clone(parent, clone);
  clone.right = this.right && this.right.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  if (this.val) clone.val = this.val.clone(parent, clone);
  return clone;
};

/**
 * Return <left> <op> <right>
 *
 * @return {String}
 * @api public
 */
BinOp.prototype.toString = function() {
  return this.left.toString() + ' ' + this.op + ' ' + this.right.toString();
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

BinOp.prototype.toJSON = function(){
  var json = {
    __type: 'BinOp',
    left: this.left,
    right: this.right,
    op: this.op,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.val) json.val = this.val;
  return json;
};


});// module: nodes/binop.js


require.register("nodes/block.js", function(module, exports, require){


/*!
 * Stylus - Block
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Block` node with `parent` Block.
 *
 * @param {Block} parent
 * @api public
 */

var Block = module.exports = function Block(parent, node){
  Node.call(this);
  this.nodes = [];
  this.parent = parent;
  this.node = node;
  this.scope = true;
};

/**
 * Inherit from `Node.prototype`.
 */

Block.prototype.__proto__ = Node.prototype;

/**
 * Check if this block has properties..
 *
 * @return {Boolean}
 * @api public
 */

Block.prototype.__defineGetter__('hasProperties', function(){
  for (var i = 0, len = this.nodes.length; i < len; ++i) {
    if ('property' == this.nodes[i].nodeName) {
      return true;
    }
  }
});

/**
 * Check if this block has @media nodes.
 *
 * @return {Boolean}
 * @api public
 */

Block.prototype.__defineGetter__('hasMedia', function(){
  for (var i = 0, len = this.nodes.length; i < len; ++i) {
    var nodeName = this.nodes[i].nodeName;
    if ('media' == nodeName) {
      return true;
    }
  }
  return false;
});

/**
 * Check if this block is empty.
 *
 * @return {Boolean}
 * @api public
 */

Block.prototype.__defineGetter__('isEmpty', function(){
  return !this.nodes.length;
});

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Block.prototype.clone = function(parent, node){
  parent = parent || this.parent;
  var clone = new Block(parent, node || this.node);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.scope = this.scope;
  this.nodes.forEach(function(node){
    clone.push(node.clone(clone, clone));
  });
  return clone;
};

/**
 * Push a `node` to this block.
 *
 * @param {Node} node
 * @api public
 */

Block.prototype.push = function(node){
  this.nodes.push(node);
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Block.prototype.toJSON = function(){
  return {
    __type: 'Block',
    // parent: this.parent,
    // node: this.node,
    scope: this.scope,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename,
    nodes: this.nodes
  };
};


});// module: nodes/block.js


require.register("nodes/boolean.js", function(module, exports, require){


/*!
 * Stylus - Boolean
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Boolean` node with the given `val`.
 *
 * @param {Boolean} val
 * @api public
 */

var Boolean = module.exports = function Boolean(val){
  Node.call(this);
  if (this.nodeName) {
    this.val = !!val;
  } else {
    return new Boolean(val);
  }
};

/**
 * Inherit from `Node.prototype`.
 */

Boolean.prototype.__proto__ = Node.prototype;

/**
 * Return `this` node.
 *
 * @return {Boolean}
 * @api public
 */

Boolean.prototype.toBoolean = function(){
  return this;
};

/**
 * Return `true` if this node represents `true`.
 *
 * @return {Boolean}
 * @api public
 */

Boolean.prototype.__defineGetter__('isTrue', function(){
  return this.val;
});

/**
 * Return `true` if this node represents `false`.
 *
 * @return {Boolean}
 * @api public
 */

Boolean.prototype.__defineGetter__('isFalse', function(){
  return ! this.val;
});

/**
 * Negate the value.
 *
 * @return {Boolean}
 * @api public
 */

Boolean.prototype.negate = function(){
  return new Boolean(!this.val);
};

/**
 * Return 'Boolean'.
 *
 * @return {String}
 * @api public
 */

Boolean.prototype.inspect = function(){
  return '[Boolean ' + this.val + ']';
};

/**
 * Return 'true' or 'false'.
 *
 * @return {String}
 * @api public
 */

Boolean.prototype.toString = function(){
  return this.val
    ? 'true'
    : 'false';
};

/**
 * Return a JSON representaiton of this node.
 *
 * @return {Object}
 * @api public
 */

Boolean.prototype.toJSON = function(){
  return {
    __type: 'Boolean',
    val: this.val
  };
};


});// module: nodes/boolean.js


require.register("nodes/call.js", function(module, exports, require){


/*!
 * Stylus - Call
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Call` with `name` and `args`.
 *
 * @param {String} name
 * @param {Expression} args
 * @api public
 */

var Call = module.exports = function Call(name, args){
  Node.call(this);
  this.name = name;
  this.args = args;
};

/**
 * Inherit from `Node.prototype`.
 */

Call.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Call.prototype.clone = function(parent){
  var clone = new Call(this.name);
  clone.args = this.args.clone(parent, clone);
  if (this.block) clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return <name>(param1, param2, ...).
 *
 * @return {String}
 * @api public
 */

Call.prototype.toString = function(){
  var args = this.args.nodes.map(function(node) {
    var str = node.toString();
    return str.slice(1, str.length - 1);
  }).join(', ');

  return this.name + '(' + args + ')';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Call.prototype.toJSON = function(){
  var json = {
    __type: 'Call',
    name: this.name,
    args: this.args,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.block) json.block = this.block;
  return json;
};


});// module: nodes/call.js


require.register("nodes/charset.js", function(module, exports, require){


/*!
 * Stylus - Charset
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Charset` with the given `val`
 *
 * @param {String} val
 * @api public
 */

var Charset = module.exports = function Charset(val){
  Node.call(this);
  this.val = val;
};

/**
 * Inherit from `Node.prototype`.
 */

Charset.prototype.__proto__ = Node.prototype;

/**
 * Return @charset "val".
 *
 * @return {String}
 * @api public
 */

Charset.prototype.toString = function(){
  return '@charset ' + this.val;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Charset.prototype.toJSON = function(){
  return {
    __type: 'Charset',
    val: this.val,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/charset.js


require.register("nodes/namespace.js", function(module, exports, require){

/*!
 * Stylus - Namespace
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Namespace` with the given `val` and `prefix`
 *
 * @param {String|Call} val
 * @param {String} [prefix]
 * @api public
 */

var Namespace = module.exports = function Namespace(val, prefix){
  Node.call(this);
  this.val = val;
  this.prefix = prefix;
};

/**
 * Inherit from `Node.prototype`.
 */

Namespace.prototype.__proto__ = Node.prototype;

/**
 * Return @namespace "val".
 *
 * @return {String}
 * @api public
 */

Namespace.prototype.toString = function(){
  return '@namespace ' + (this.prefix ? this.prefix + ' ' : '') + this.val;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Namespace.prototype.toJSON = function(){
  return {
    __type: 'Namespace',
    val: this.val,
    prefix: this.prefix,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/namespace.js


require.register("nodes/comment.js", function(module, exports, require){


/*!
 * Stylus - Comment
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Comment` with the given `str`.
 *
 * @param {String} str
 * @param {Boolean} suppress
 * @param {Boolean} inline
 * @api public
 */

var Comment = module.exports = function Comment(str, suppress, inline){
  Node.call(this);
  this.str = str;
  this.suppress = suppress;
  this.inline = inline;
};

/**
 * Inherit from `Node.prototype`.
 */

Comment.prototype.__proto__ = Node.prototype;

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Comment.prototype.toJSON = function(){
  return {
    __type: 'Comment',
    str: this.str,
    suppress: this.suppress,
    inline: this.inline,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return comment.
 *
 * @return {String}
 * @api public
 */

Comment.prototype.toString = function(){
  return this.str;
};


});// module: nodes/comment.js


require.register("nodes/each.js", function(module, exports, require){


/*!
 * Stylus - Each
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Each` node with the given `val` name,
 * `key` name, `expr`, and `block`.
 *
 * @param {String} val
 * @param {String} key
 * @param {Expression} expr
 * @param {Block} block
 * @api public
 */

var Each = module.exports = function Each(val, key, expr, block){
  Node.call(this);
  this.val = val;
  this.key = key;
  this.expr = expr;
  this.block = block;
};

/**
 * Inherit from `Node.prototype`.
 */

Each.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Each.prototype.clone = function(parent){
  var clone = new Each(this.val, this.key);
  clone.expr = this.expr.clone(parent, clone);
  clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Each.prototype.toJSON = function(){
  return {
    __type: 'Each',
    val: this.val,
    key: this.key,
    expr: this.expr,
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/each.js


require.register("nodes/expression.js", function(module, exports, require){


/*!
 * Stylus - Expression
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('../nodes')
  , utils = require('../utils');

/**
 * Initialize a new `Expression`.
 *
 * @param {Boolean} isList
 * @api public
 */

var Expression = module.exports = function Expression(isList){
  Node.call(this);
  this.nodes = [];
  this.isList = isList;
};

/**
 * Check if the variable has a value.
 *
 * @return {Boolean}
 * @api public
 */

Expression.prototype.__defineGetter__('isEmpty', function(){
  return !this.nodes.length;
});

/**
 * Return the first node in this expression.
 *
 * @return {Node}
 * @api public
 */

Expression.prototype.__defineGetter__('first', function(){
  return this.nodes[0]
    ? this.nodes[0].first
    : nodes.nil;
});

/**
 * Hash all the nodes in order.
 *
 * @return {String}
 * @api public
 */

Expression.prototype.__defineGetter__('hash', function(){
  return this.nodes.map(function(node){
    return node.hash;
  }).join('::');
});

/**
 * Inherit from `Node.prototype`.
 */

Expression.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Expression.prototype.clone = function(parent){
  var clone = new this.constructor(this.isList);
  clone.preserve = this.preserve;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.nodes = this.nodes.map(function(node) {
    return node.clone(parent, clone);
  });
  return clone;
};

/**
 * Push the given `node`.
 *
 * @param {Node} node
 * @api public
 */

Expression.prototype.push = function(node){
  this.nodes.push(node);
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Expression.prototype.operate = function(op, right, val){
  switch (op) {
    case '[]=':
      var self = this
        , range = utils.unwrap(right).nodes
        , val = utils.unwrap(val)
        , len
        , node;
      range.forEach(function(unit){
        len = self.nodes.length;
        if ('unit' == unit.nodeName) {
          var i = unit.val < 0 ? len + unit.val : unit.val
            , n = i;
          while (i-- > len) self.nodes[i] = nodes.nil;
          self.nodes[n] = val;
        } else if ('string' == unit.nodeName) {
          node = self.nodes[0];
          if (node && 'object' == node.nodeName) node.set(unit.val, val.clone());
        }
      });
      return val;
    case '[]':
      var expr = new nodes.Expression
        , vals = utils.unwrap(this).nodes
        , range = utils.unwrap(right).nodes
        , node;
      range.forEach(function(unit){
        if ('unit' == unit.nodeName) {
          node = vals[unit.val < 0 ? vals.length + unit.val : unit.val];
        } else if ('string' == unit.nodeName && 'object' == vals[0].nodeName) {
          node = vals[0].get(unit.val);
        }
        if (node) expr.push(node);
      });
      return expr.isEmpty
        ? nodes.nil
        : utils.unwrap(expr);
    case '||':
      return this.toBoolean().isTrue
        ? this
        : right;
    case 'in':
      return Node.prototype.operate.call(this, op, right);
    case '!=':
      return this.operate('==', right, val).negate();
    case '==':
      var len = this.nodes.length
        , right = right.toExpression()
        , a
        , b;
      if (len != right.nodes.length) return nodes.no;
      for (var i = 0; i < len; ++i) {
        a = this.nodes[i];
        b = right.nodes[i];
        if (a.operate(op, b).isTrue) continue;
        return nodes.no;
      }
      return nodes.yes;
      break;
    default:
      return this.first.operate(op, right, val);
  }
};

/**
 * Expressions with length > 1 are truthy,
 * otherwise the first value's toBoolean()
 * method is invoked.
 *
 * @return {Boolean}
 * @api public
 */

Expression.prototype.toBoolean = function(){
  if (this.nodes.length > 1) return nodes.yes;
  return this.first.toBoolean();
};

/**
 * Return "<a> <b> <c>" or "<a>, <b>, <c>" if
 * the expression represents a list.
 *
 * @return {String}
 * @api public
 */

Expression.prototype.toString = function(){
  return '(' + this.nodes.map(function(node){
    return node.toString();
  }).join(this.isList ? ', ' : ' ') + ')';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Expression.prototype.toJSON = function(){
  return {
    __type: 'Expression',
    isList: this.isList,
    preserve: this.preserve,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename,
    nodes: this.nodes
  };
};


});// module: nodes/expression.js


require.register("nodes/function.js", function(module, exports, require){


/*!
 * Stylus - Function
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Function` with `name`, `params`, and `body`.
 *
 * @param {String} name
 * @param {Params|Function} params
 * @param {Block} body
 * @api public
 */

var Function = module.exports = function Function(name, params, body){
  Node.call(this);
  this.name = name;
  this.params = params;
  this.block = body;
  if ('function' == typeof params) this.fn = params;
};

/**
 * Check function arity.
 *
 * @return {Boolean}
 * @api public
 */

Function.prototype.__defineGetter__('arity', function(){
  return this.params.length;
});

/**
 * Inherit from `Node.prototype`.
 */

Function.prototype.__proto__ = Node.prototype;

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

Function.prototype.__defineGetter__('hash', function(){
  return 'function ' + this.name;
});

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Function.prototype.clone = function(parent){
  if (this.fn) {
    var clone = new Function(
        this.name
      , this.fn);
  } else {
    var clone = new Function(this.name);
    clone.params = this.params.clone(parent, clone);
    clone.block = this.block.clone(parent, clone);
  }
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return <name>(param1, param2, ...).
 *
 * @return {String}
 * @api public
 */

Function.prototype.toString = function(){
  if (this.fn) {
    return this.name
      + '('
      + this.fn.toString()
        .match(/^function *\w*\((.*?)\)/)
        .slice(1)
        .join(', ')
      + ')';
  } else {
    return this.name
      + '('
      + this.params.nodes.join(', ')
      + ')';
  }
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Function.prototype.toJSON = function(){
  var json = {
    __type: 'Function',
    name: this.name,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.fn) {
    json.fn = this.fn;
  } else {
    json.params = this.params;
    json.block = this.block;
  }
  return json;
};


});// module: nodes/function.js


require.register("nodes/group.js", function(module, exports, require){


/*!
 * Stylus - Group
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Group`.
 *
 * @api public
 */

var Group = module.exports = function Group(){
  Node.call(this);
  this.nodes = [];
  this.extends = [];
};

/**
 * Inherit from `Node.prototype`.
 */

Group.prototype.__proto__ = Node.prototype;

/**
 * Push the given `selector` node.
 *
 * @param {Selector} selector
 * @api public
 */

Group.prototype.push = function(selector){
  this.nodes.push(selector);
};

/**
 * Return this set's `Block`.
 */

Group.prototype.__defineGetter__('block', function(){
  return this.nodes[0].block;
});

/**
 * Assign `block` to each selector in this set.
 *
 * @param {Block} block
 * @api public
 */

Group.prototype.__defineSetter__('block', function(block){
  for (var i = 0, len = this.nodes.length; i < len; ++i) {
    this.nodes[i].block = block;
  }
});

/**
 * Check if this set has only placeholders.
 *
 * @return {Boolean}
 * @api public
 */

Group.prototype.__defineGetter__('hasOnlyPlaceholders', function(){
  return this.nodes.every(function(selector) { return selector.isPlaceholder; });
});

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Group.prototype.clone = function(parent){
  var clone = new Group;
  clone.lineno = this.lineno;
  clone.column = this.column;
  this.nodes.forEach(function(node){
    clone.push(node.clone(parent, clone));
  });
  clone.filename = this.filename;
  clone.block = this.block.clone(parent, clone);
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Group.prototype.toJSON = function(){
  return {
    __type: 'Group',
    nodes: this.nodes,
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/group.js


require.register("nodes/hsla.js", function(module, exports, require){


/*!
 * Stylus - HSLA
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `HSLA` with the given h,s,l,a component values.
 *
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @param {Number} a
 * @api public
 */

var HSLA = exports = module.exports = function HSLA(h,s,l,a){
  Node.call(this);
  this.h = clampDegrees(h);
  this.s = clampPercentage(s);
  this.l = clampPercentage(l);
  this.a = clampAlpha(a);
  this.hsla = this;
};

/**
 * Inherit from `Node.prototype`.
 */

HSLA.prototype.__proto__ = Node.prototype;

/**
 * Return hsla(n,n,n,n).
 *
 * @return {String}
 * @api public
 */

HSLA.prototype.toString = function(){
  return 'hsla('
    + this.h + ','
    + this.s.toFixed(0) + '%,'
    + this.l.toFixed(0) + '%,'
    + this.a + ')';
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

HSLA.prototype.clone = function(parent){
  var clone = new HSLA(
      this.h
    , this.s
    , this.l
    , this.a);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

HSLA.prototype.toJSON = function(){
  return {
    __type: 'HSLA',
    h: this.h,
    s: this.s,
    l: this.l,
    a: this.a,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return rgba `RGBA` representation.
 *
 * @return {RGBA}
 * @api public
 */

HSLA.prototype.__defineGetter__('rgba', function(){
  return nodes.RGBA.fromHSLA(this);
});

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

HSLA.prototype.__defineGetter__('hash', function(){
  return this.rgba.toString();
});

/**
 * Add h,s,l to the current component values.
 *
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {HSLA} new node
 * @api public
 */

HSLA.prototype.add = function(h,s,l){
  return new HSLA(
      this.h + h
    , this.s + s
    , this.l + l
    , this.a);
};

/**
 * Subtract h,s,l from the current component values.
 *
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {HSLA} new node
 * @api public
 */

HSLA.prototype.sub = function(h,s,l){
  return this.add(-h, -s, -l);
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

HSLA.prototype.operate = function(op, right){
  switch (op) {
    case '==':
    case '!=':
    case '<=':
    case '>=':
    case '<':
    case '>':
    case 'is a':
    case '||':
    case '&&':
      return this.rgba.operate(op, right);
    default:
      return this.rgba.operate(op, right).hsla;
  }
};

/**
 * Return `HSLA` representation of the given `color`.
 *
 * @param {RGBA} color
 * @return {HSLA}
 * @api public
 */

exports.fromRGBA = function(rgba){
  var r = rgba.r / 255
    , g = rgba.g / 255
    , b = rgba.b / 255
    , a = rgba.a;

  var min = Math.min(r,g,b)
    , max = Math.max(r,g,b)
    , l = (max + min) / 2
    , d = max - min
    , h, s;

  switch (max) {
    case min: h = 0; break;
    case r: h = 60 * (g-b) / d; break;
    case g: h = 60 * (b-r) / d + 120; break;
    case b: h = 60 * (r-g) / d + 240; break;
  }

  if (max == min) {
    s = 0;
  } else if (l < .5) {
    s = d / (2 * l);
  } else {
    s = d / (2 - 2 * l);
  }

  h %= 360;
  s *= 100;
  l *= 100;

  return new HSLA(h,s,l,a);
};

/**
 * Adjust lightness by `percent`.
 *
 * @param {Number} percent
 * @return {HSLA} for chaining
 * @api public
 */

HSLA.prototype.adjustLightness = function(percent){
  this.l = clampPercentage(this.l + this.l * (percent / 100));
  return this;
};

/**
 * Adjust hue by `deg`.
 *
 * @param {Number} deg
 * @return {HSLA} for chaining
 * @api public
 */

HSLA.prototype.adjustHue = function(deg){
  this.h = clampDegrees(this.h + deg);
  return this;
};

/**
 * Clamp degree `n` >= 0 and <= 360.
 *
 * @param {Number} n
 * @return {Number}
 * @api private
 */

function clampDegrees(n) {
  n = n % 360;
  return n >= 0 ? n : 360 + n;
}

/**
 * Clamp percentage `n` >= 0 and <= 100.
 *
 * @param {Number} n
 * @return {Number}
 * @api private
 */

function clampPercentage(n) {
  return Math.max(0, Math.min(n, 100));
}

/**
 * Clamp alpha `n` >= 0 and <= 1.
 *
 * @param {Number} n
 * @return {Number}
 * @api private
 */

function clampAlpha(n) {
  return Math.max(0, Math.min(n, 1));
}


});// module: nodes/hsla.js


require.register("nodes/ident.js", function(module, exports, require){


/*!
 * Stylus - Ident
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Ident` by `name` with the given `val` node.
 *
 * @param {String} name
 * @param {Node} val
 * @api public
 */

var Ident = module.exports = function Ident(name, val, mixin){
  Node.call(this);
  this.name = name;
  this.string = name;
  this.val = val || nodes.nil;
  this.mixin = !!mixin;
};

/**
 * Check if the variable has a value.
 *
 * @return {Boolean}
 * @api public
 */

Ident.prototype.__defineGetter__('isEmpty', function(){
  return undefined == this.val;
});

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

Ident.prototype.__defineGetter__('hash', function(){
  return this.name;
});

/**
 * Inherit from `Node.prototype`.
 */

Ident.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Ident.prototype.clone = function(parent){
  var clone = new Ident(this.name);
  clone.val = this.val.clone(parent, clone);
  clone.mixin = this.mixin;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.property = this.property;
  clone.rest = this.rest;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Ident.prototype.toJSON = function(){
  return {
    __type: 'Ident',
    name: this.name,
    val: this.val,
    mixin: this.mixin,
    property: this.property,
    rest: this.rest,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return <name>.
 *
 * @return {String}
 * @api public
 */

Ident.prototype.toString = function(){
  return this.name;
};

/**
 * Coerce `other` to an ident.
 *
 * @param {Node} other
 * @return {String}
 * @api public
 */

Ident.prototype.coerce = function(other){
  switch (other.nodeName) {
    case 'ident':
    case 'string':
    case 'literal':
      return new Ident(other.string);
    case 'unit':
      return new Ident(other.toString());
    default:
      return Node.prototype.coerce.call(this, other);
  }
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Ident.prototype.operate = function(op, right){
  var val = right.first;
  switch (op) {
    case '-':
      if ('unit' == val.nodeName) {
        var expr = new nodes.Expression;
        val = val.clone();
        val.val = -val.val;
        expr.push(this);
        expr.push(val);
        return expr;
      }
    case '+':
      return new nodes.Ident(this.string + this.coerce(val).string);
  }
  return Node.prototype.operate.call(this, op, right);
};


});// module: nodes/ident.js


require.register("nodes/if.js", function(module, exports, require){


/*!
 * Stylus - If
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `If` with the given `cond`.
 *
 * @param {Expression} cond
 * @param {Boolean|Block} negate, block
 * @api public
 */

var If = module.exports = function If(cond, negate){
  Node.call(this);
  this.cond = cond;
  this.elses = [];
  if (negate && negate.nodeName) {
    this.block = negate;
  } else {
    this.negate = negate;
  }
};

/**
 * Inherit from `Node.prototype`.
 */

If.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

If.prototype.clone = function(parent){
  var clone = new If();
  clone.cond = this.cond.clone(parent, clone);
  clone.block = this.block.clone(parent, clone);
  clone.elses = this.elses.map(function(node){ return node.clone(parent, clone); });
  clone.negate = this.negate;
  clone.postfix = this.postfix;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

If.prototype.toJSON = function(){
  return {
    __type: 'If',
    cond: this.cond,
    block: this.block,
    elses: this.elses,
    negate: this.negate,
    postfix: this.postfix,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/if.js


require.register("nodes/import.js", function(module, exports, require){


/*!
 * Stylus - Import
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Import` with the given `expr`.
 *
 * @param {Expression} expr
 * @api public
 */

var Import = module.exports = function Import(expr, once){
  Node.call(this);
  this.path = expr;
  this.once = once || false;
};

/**
 * Inherit from `Node.prototype`.
 */

Import.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Import.prototype.clone = function(parent){
  var clone = new Import();
  clone.path = this.path.nodeName ? this.path.clone(parent, clone) : this.path;
  clone.once = this.once;
  clone.mtime = this.mtime;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Import.prototype.toJSON = function(){
  return {
    __type: 'Import',
    path: this.path,
    once: this.once,
    mtime: this.mtime,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/import.js


require.register("nodes/extend.js", function(module, exports, require){


/*!
 * Stylus - Extend
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Extend` with the given `selectors` array.
 *
 * @param {Array} selectors array of the selectors
 * @api public
 */

var Extend = module.exports = function Extend(selectors){
  Node.call(this);
  this.selectors = selectors;
};

/**
 * Inherit from `Node.prototype`.
 */

Extend.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Extend.prototype.clone = function(){
  return new Extend(this.selectors);
};

/**
 * Return `@extend selectors`.
 *
 * @return {String}
 * @api public
 */

Extend.prototype.toString = function(){
  return '@extend ' + this.selectors.join(', ');
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Extend.prototype.toJSON = function(){
  return {
    __type: 'Extend',
    selectors: this.selectors,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/extend.js


require.register("nodes/index.js", function(module, exports, require){


/*!
 * Stylus - nodes
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Constructors
 */

exports.Node = require('./node');
exports.Root = require('./root');
exports.Null = require('./null');
exports.Each = require('./each');
exports.If = require('./if');
exports.Call = require('./call');
exports.UnaryOp = require('./unaryop');
exports.BinOp = require('./binop');
exports.Ternary = require('./ternary');
exports.Block = require('./block');
exports.Unit = require('./unit');
exports.String = require('./string');
exports.HSLA = require('./hsla');
exports.RGBA = require('./rgba');
exports.Ident = require('./ident');
exports.Group = require('./group');
exports.Literal = require('./literal');
exports.Boolean = require('./boolean');
exports.Return = require('./return');
exports.Media = require('./media');
exports.QueryList = require('./query-list');
exports.Query = require('./query');
exports.Feature = require('./feature');
exports.Params = require('./params');
exports.Comment = require('./comment');
exports.Keyframes = require('./keyframes');
exports.Member = require('./member');
exports.Charset = require('./charset');
exports.Namespace = require('./namespace');
exports.Import = require('./import');
exports.Extend = require('./extend');
exports.Object = require('./object');
exports.Function = require('./function');
exports.Property = require('./property');
exports.Selector = require('./selector');
exports.Expression = require('./expression');
exports.Arguments = require('./arguments');
exports.Atblock = require('./atblock');
exports.Atrule = require('./atrule');
exports.Supports = require('./supports');

/**
 * Singletons.
 */

exports.yes = new exports.Boolean(true);
exports.no = new exports.Boolean(false);
exports.nil = new exports.Null;


});// module: nodes/index.js


require.register("nodes/keyframes.js", function(module, exports, require){


/*!
 * Stylus - Keyframes
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Atrule = require('./atrule');

/**
 * Initialize a new `Keyframes` with the given `segs`,
 * and optional vendor `prefix`.
 *
 * @param {Array} segs
 * @param {String} prefix
 * @api public
 */

var Keyframes = module.exports = function Keyframes(segs, prefix){
  Atrule.call(this, 'keyframes');
  this.segments = segs;
  this.prefix = prefix || 'official';
};

/**
 * Inherit from `Atrule.prototype`.
 */

Keyframes.prototype.__proto__ = Atrule.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Keyframes.prototype.clone = function(parent){
  var clone = new Keyframes;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.segments = this.segments.map(function(node) { return node.clone(parent, clone); });
  clone.prefix = this.prefix;
  clone.block = this.block.clone(parent, clone);
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Keyframes.prototype.toJSON = function(){
  return {
    __type: 'Keyframes',
    segments: this.segments,
    prefix: this.prefix,
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return `@keyframes name`.
 *
 * @return {String}
 * @api public
 */

Keyframes.prototype.toString = function(){
  return '@keyframes ' + this.segments.join('');
};


});// module: nodes/keyframes.js


require.register("nodes/literal.js", function(module, exports, require){


/*!
 * Stylus - Literal
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Literal` with the given `str`.
 *
 * @param {String} str
 * @api public
 */

var Literal = module.exports = function Literal(str){
  Node.call(this);
  this.val = str;
  this.string = str;
  this.prefixed = false;
};

/**
 * Inherit from `Node.prototype`.
 */

Literal.prototype.__proto__ = Node.prototype;

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

Literal.prototype.__defineGetter__('hash', function(){
  return this.val;
});

/**
 * Return literal value.
 *
 * @return {String}
 * @api public
 */

Literal.prototype.toString = function(){
  return this.val;
};

/**
 * Coerce `other` to a literal.
 *
 * @param {Node} other
 * @return {String}
 * @api public
 */

Literal.prototype.coerce = function(other){
  switch (other.nodeName) {
    case 'ident':
    case 'string':
    case 'literal':
      return new Literal(other.string);
    default:
      return Node.prototype.coerce.call(this, other);
  }
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Literal.prototype.operate = function(op, right){
  var val = right.first;
  switch (op) {
    case '+':
      return new nodes.Literal(this.string + this.coerce(val).string);
    default:
      return Node.prototype.operate.call(this, op, right);
  }
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Literal.prototype.toJSON = function(){
  return {
    __type: 'Literal',
    val: this.val,
    string: this.string,
    prefixed: this.prefixed,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/literal.js


require.register("nodes/media.js", function(module, exports, require){


/*!
 * Stylus - Media
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Atrule = require('./atrule');

/**
 * Initialize a new `Media` with the given `val`
 *
 * @param {String} val
 * @api public
 */

var Media = module.exports = function Media(val){
  Atrule.call(this, 'media');
  this.val = val;
};

/**
 * Inherit from `Atrule.prototype`.
 */

Media.prototype.__proto__ = Atrule.prototype;

/**
 * Clone this node.
 *
 * @return {Media}
 * @api public
 */

Media.prototype.clone = function(parent){
  var clone = new Media;
  clone.val = this.val.clone(parent, clone);
  clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Media.prototype.toJSON = function(){
  return {
    __type: 'Media',
    val: this.val,
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return @media "val".
 *
 * @return {String}
 * @api public
 */

Media.prototype.toString = function(){
  return '@media ' + this.val;
};


});// module: nodes/media.js


require.register("nodes/query-list.js", function(module, exports, require){


/*!
 * Stylus - QueryList
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `QueryList`.
 *
 * @api public
 */

var QueryList = module.exports = function QueryList(){
  Node.call(this);
  this.nodes = [];
};

/**
 * Inherit from `Node.prototype`.
 */

QueryList.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

QueryList.prototype.clone = function(parent){
  var clone = new QueryList;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  for (var i = 0; i < this.nodes.length; ++i) {
    clone.push(this.nodes[i].clone(parent, clone));
  }
  return clone;
};

/**
 * Push the given `node`.
 *
 * @param {Node} node
 * @api public
 */

QueryList.prototype.push = function(node){
  this.nodes.push(node);
};

/**
 * Merges this query list with the `other`.
 *
 * @param {QueryList} other
 * @return {QueryList}
 * @api private
 */

QueryList.prototype.merge = function(other){
  var list = new QueryList
    , merged;
  this.nodes.forEach(function(query){
    for (var i = 0, len = other.nodes.length; i < len; ++i){
      merged = query.merge(other.nodes[i]);
      if (merged) list.push(merged);
    }
  });
  return list;
};

/**
 * Return "<a>, <b>, <c>"
 *
 * @return {String}
 * @api public
 */

QueryList.prototype.toString = function(){
  return '(' + this.nodes.map(function(node){
    return node.toString();
  }).join(', ') + ')';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

QueryList.prototype.toJSON = function(){
  return {
    __type: 'QueryList',
    nodes: this.nodes,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/query-list.js


require.register("nodes/query.js", function(module, exports, require){


/*!
 * Stylus - Query
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Query`.
 *
 * @api public
 */

var Query = module.exports = function Query(){
  Node.call(this);
  this.nodes = [];
  this.type = '';
  this.predicate = '';
};

/**
 * Inherit from `Node.prototype`.
 */

Query.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Query.prototype.clone = function(parent){
  var clone = new Query;
  clone.predicate = this.predicate;
  clone.type = this.type;
  for (var i = 0, len = this.nodes.length; i < len; ++i) {
    clone.push(this.nodes[i].clone(parent, clone));
  }
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Push the given `feature`.
 *
 * @param {Feature} feature
 * @api public
 */

Query.prototype.push = function(feature){
  this.nodes.push(feature);
};

/**
 * Return resolved type of this query.
 *
 * @return {String}
 * @api private
 */

Query.prototype.__defineGetter__('resolvedType', function(){
  if (this.type) {
    return this.type.nodeName
      ? this.type.string
      : this.type;
  }
});

/**
 * Return resolved predicate of this query.
 *
 * @return {String}
 * @api private
 */

Query.prototype.__defineGetter__('resolvedPredicate', function(){
  if (this.predicate) {
    return this.predicate.nodeName
      ? this.predicate.string
      : this.predicate;
  }
});

/**
 * Merges this query with the `other`.
 *
 * @param {Query} other
 * @return {Query}
 * @api private
 */

Query.prototype.merge = function(other){
  var query = new Query
    , p1 = this.resolvedPredicate
    , p2 = other.resolvedPredicate
    , t1 = this.resolvedType
    , t2 = other.resolvedType
    , type, pred;

  // Stolen from Sass :D
  t1 = t1 || t2;
  t2 = t2 || t1;
  if (('not' == p1) ^ ('not' == p2)) {
    if (t1 == t2) return;
    type = ('not' == p1) ? t2 : t1;
    pred = ('not' == p1) ? p2 : p1;
  } else if (('not' == p1) && ('not' == p2)) {
    if (t1 != t2) return;
    type = t1;
    pred = 'not';
  } else if (t1 != t2) {
    return;
  } else {
    type = t1;
    pred = p1 || p2;
  }
  query.predicate = pred;
  query.type = type;
  query.nodes = this.nodes.concat(other.nodes);
  return query;
};

/**
 * Return "<a> and <b> and <c>"
 *
 * @return {String}
 * @api public
 */

Query.prototype.toString = function(){
  var pred = this.predicate ? this.predicate + ' ' : ''
    , type = this.type || ''
    , len = this.nodes.length
    , str = pred + type;
  if (len) {
    str += (type && ' and ') + this.nodes.map(function(expr){
      return expr.toString();
    }).join(' and ');
  }
  return str;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Query.prototype.toJSON = function(){
  return {
    __type: 'Query',
    predicate: this.predicate,
    type: this.type,
    nodes: this.nodes,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/query.js


require.register("nodes/feature.js", function(module, exports, require){


/*!
 * Stylus - Feature
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Feature` with the given `segs`.
 *
 * @param {Array} segs
 * @api public
 */

var Feature = module.exports = function Feature(segs){
  Node.call(this);
  this.segments = segs;
  this.expr = null;
};

/**
 * Inherit from `Node.prototype`.
 */

Feature.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Feature.prototype.clone = function(parent){
  var clone = new Feature;
  clone.segments = this.segments.map(function(node){ return node.clone(parent, clone); });
  if (this.expr) clone.expr = this.expr.clone(parent, clone);
  if (this.name) clone.name = this.name;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return "<ident>" or "(<ident>: <expr>)"
 *
 * @return {String}
 * @api public
 */

Feature.prototype.toString = function(){
  if (this.expr) {
    return '(' + this.segments.join('') + ': ' + this.expr.toString() + ')';
  } else {
    return this.segments.join('');
  }
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Feature.prototype.toJSON = function(){
  var json = {
    __type: 'Feature',
    segments: this.segments,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.expr) json.expr = this.expr;
  if (this.name) json.name = this.name;
  return json;
};


});// module: nodes/feature.js


require.register("nodes/node.js", function(module, exports, require){


/*!
 * Stylus - Node
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Evaluator = require('../visitor/evaluator')
  , utils = require('../utils')
  , nodes = require('./index');

/**
 * Initialize a new `CoercionError` with the given `msg`.
 *
 * @param {String} msg
 * @api private
 */

function CoercionError(msg) {
  this.name = 'CoercionError'
  this.message = msg
  Error.captureStackTrace(this, CoercionError);
}

/**
 * Inherit from `Error.prototype`.
 */

CoercionError.prototype.__proto__ = Error.prototype;

/**
 * Node constructor.
 *
 * @api public
 */

var Node = module.exports = function Node(){
  this.lineno = nodes.lineno || 1;
  this.column = nodes.column || 1;
  this.filename = nodes.filename;
};

Node.prototype = {
  constructor: Node,

  /**
   * Return this node.
   *
   * @return {Node}
   * @api public
   */

  get first() {
    return this;
  },

  /**
   * Return hash.
   *
   * @return {String}
   * @api public
   */

  get hash() {
    return this.val;
  },

  /**
   * Return node name.
   *
   * @return {String}
   * @api public
   */

  get nodeName() {
    return this.constructor.name.toLowerCase();
  },

  /**
   * Return this node.
   * 
   * @return {Node}
   * @api public
   */

  clone: function(){
    return this;
  },

  /**
   * Return a JSON representation of this node.
   *
   * @return {Object}
   * @api public
   */

  toJSON: function(){
    return {
      lineno: this.lineno,
      column: this.column,
      filename: this.filename
    };
  },

  /**
   * Nodes by default evaluate to themselves.
   *
   * @return {Node}
   * @api public
   */

  eval: function(){
    return new Evaluator(this).evaluate();
  },

  /**
   * Return true.
   *
   * @return {Boolean}
   * @api public
   */

  toBoolean: function(){
    return nodes.yes;
  },

  /**
   * Return the expression, or wrap this node in an expression.
   *
   * @return {Expression}
   * @api public
   */

  toExpression: function(){
    if ('expression' == this.nodeName) return this;
    var expr = new nodes.Expression;
    expr.push(this);
    return expr;
  },

  /**
   * Return false if `op` is generally not coerced.
   *
   * @param {String} op
   * @return {Boolean}
   * @api private
   */

  shouldCoerce: function(op){
    switch (op) {
      case 'is a':
      case 'in':
      case '||':
      case '&&':
        return false;
      default:
        return true;
    }
  },

  /**
   * Operate on `right` with the given `op`.
   *
   * @param {String} op
   * @param {Node} right
   * @return {Node}
   * @api public
   */

  operate: function(op, right){
    switch (op) {
      case 'is a':
        if ('string' == right.nodeName) {
          return nodes.Boolean(this.nodeName == right.val);
        } else {
          throw new Error('"is a" expects a string, got ' + right.toString());
        }
      case '==':
        return nodes.Boolean(this.hash == right.hash);
      case '!=':
        return nodes.Boolean(this.hash != right.hash);
      case '>=':
        return nodes.Boolean(this.hash >= right.hash);
      case '<=':
        return nodes.Boolean(this.hash <= right.hash);
      case '>':
        return nodes.Boolean(this.hash > right.hash);
      case '<':
        return nodes.Boolean(this.hash < right.hash);
      case '||':
        return this.toBoolean().isTrue
          ? this
          : right;
      case 'in':
        var vals = utils.unwrap(right).nodes
          , len = vals && vals.length
          , hash = this.hash;
        if (!vals) throw new Error('"in" given invalid right-hand operand, expecting an expression');

        // 'prop' in obj
        if (1 == len && 'object' == vals[0].nodeName) {
          return nodes.Boolean(vals[0].has(this.hash));
        }

        for (var i = 0; i < len; ++i) {
          if (hash == vals[i].hash) {
            return nodes.yes;
          }
        }
        return nodes.no;
      case '&&':
        var a = this.toBoolean()
          , b = right.toBoolean();
        return a.isTrue && b.isTrue
          ? right
          : a.isFalse
            ? this
            : right;
      default:
        if ('[]' == op) {
          var msg = 'cannot perform '
            + this
            + '[' + right + ']';
        } else {
          var msg = 'cannot perform'
            + ' ' + this
            + ' ' + op
            + ' ' + right;
        }
        throw new Error(msg);
    }
  },

  /**
   * Default coercion throws.
   *
   * @param {Node} other
   * @return {Node}
   * @api public
   */

  coerce: function(other){
    if (other.nodeName == this.nodeName) return other;
    throw new CoercionError('cannot coerce ' + other + ' to ' + this.nodeName);
  }
};


});// module: nodes/node.js


require.register("nodes/null.js", function(module, exports, require){


/*!
 * Stylus - Null
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Null` node.
 *
 * @api public
 */

var Null = module.exports = function Null(){};

/**
 * Inherit from `Node.prototype`.
 */

Null.prototype.__proto__ = Node.prototype;

/**
 * Return 'Null'.
 *
 * @return {String}
 * @api public
 */

Null.prototype.inspect = 
Null.prototype.toString = function(){
  return 'null';
};

/**
 * Return false.
 *
 * @return {Boolean}
 * @api public
 */

Null.prototype.toBoolean = function(){
  return nodes.no;
};

/**
 * Check if the node is a null node.
 *
 * @return {Boolean}
 * @api public
 */

Null.prototype.__defineGetter__('isNull', function(){
  return true;
});

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

Null.prototype.__defineGetter__('hash', function(){
  return null;
});

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Null.prototype.toJSON = function(){
  return {
    __type: 'Null',
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/null.js


require.register("nodes/params.js", function(module, exports, require){


/*!
 * Stylus - Params
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Params` with `name`, `params`, and `body`.
 *
 * @param {String} name
 * @param {Params} params
 * @param {Expression} body
 * @api public
 */

var Params = module.exports = function Params(){
  Node.call(this);
  this.nodes = [];
};

/**
 * Check function arity.
 *
 * @return {Boolean}
 * @api public
 */

Params.prototype.__defineGetter__('length', function(){
  return this.nodes.length;
});

/**
 * Inherit from `Node.prototype`.
 */

Params.prototype.__proto__ = Node.prototype;

/**
 * Push the given `node`.
 *
 * @param {Node} node
 * @api public
 */

Params.prototype.push = function(node){
  this.nodes.push(node);
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Params.prototype.clone = function(parent){
  var clone = new Params;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  this.nodes.forEach(function(node){
    clone.push(node.clone(parent, clone));
  });
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Params.prototype.toJSON = function(){
  return {
    __type: 'Params',
    nodes: this.nodes,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};



});// module: nodes/params.js


require.register("nodes/property.js", function(module, exports, require){


/*!
 * Stylus - Property
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Property` with the given `segs` and optional `expr`.
 *
 * @param {Array} segs
 * @param {Expression} expr
 * @api public
 */

var Property = module.exports = function Property(segs, expr){
  Node.call(this);
  this.segments = segs;
  this.expr = expr;
};

/**
 * Inherit from `Node.prototype`.
 */

Property.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Property.prototype.clone = function(parent){
  var clone = new Property(this.segments);
  clone.name = this.name;
  if (this.literal) clone.literal = this.literal;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.segments = this.segments.map(function(node){ return node.clone(parent, clone); });
  if (this.expr) clone.expr = this.expr.clone(parent, clone);
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Property.prototype.toJSON = function(){
  var json = {
    __type: 'Property',
    segments: this.segments,
    name: this.name,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.expr) json.expr = this.expr;
  if (this.literal) json.literal = this.literal;
  return json;
};

/**
 * Return string representation of this node.
 *
 * @return {String}
 * @api public
 */

Property.prototype.toString = function(){
  return 'property(' + this.segments.join('') + ', ' + this.expr + ')';
};

/**
 * Operate on the property expression.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Property.prototype.operate = function(op, right, val){
  return this.expr.operate(op, right, val);
};


});// module: nodes/property.js


require.register("nodes/return.js", function(module, exports, require){


/*!
 * Stylus - Return
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Initialize a new `Return` node with the given `expr`.
 *
 * @param {Expression} expr
 * @api public
 */

var Return = module.exports = function Return(expr){
  this.expr = expr || nodes.nil;
};

/**
 * Inherit from `Node.prototype`.
 */

Return.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Return.prototype.clone = function(parent){
  var clone = new Return();
  clone.expr = this.expr.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Return.prototype.toJSON = function(){
  return {
    __type: 'Return',
    expr: this.expr,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/return.js


require.register("nodes/rgba.js", function(module, exports, require){


/*!
 * Stylus - RGBA
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , HSLA = require('./hsla')
  , functions = require('../functions')
  , adjust = functions.adjust
  , nodes = require('./index');

/**
 * Initialize a new `RGBA` with the given r,g,b,a component values.
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @api public
 */

var RGBA = exports = module.exports = function RGBA(r,g,b,a){
  Node.call(this);
  this.r = clamp(r);
  this.g = clamp(g);
  this.b = clamp(b);
  this.a = clampAlpha(a);
  this.rgba = this;
};

/**
 * Inherit from `Node.prototype`.
 */

RGBA.prototype.__proto__ = Node.prototype;

/**
 * Return an `RGBA` without clamping values.
 * 
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @return {RGBA}
 * @api public
 */

RGBA.withoutClamping = function(r,g,b,a){
  var rgba = new RGBA(0,0,0,0);
  rgba.r = r;
  rgba.g = g;
  rgba.b = b;
  rgba.a = a;
  return rgba;
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

RGBA.prototype.clone = function(){
  var clone = new RGBA(
      this.r
    , this.g
    , this.b
    , this.a);
  clone.raw = this.raw;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

RGBA.prototype.toJSON = function(){
  return {
    __type: 'RGBA',
    r: this.r,
    g: this.g,
    b: this.b,
    a: this.a,
    raw: this.raw,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return true.
 *
 * @return {Boolean}
 * @api public
 */

RGBA.prototype.toBoolean = function(){
  return nodes.yes;
};

/**
 * Return `HSLA` representation.
 *
 * @return {HSLA}
 * @api public
 */

RGBA.prototype.__defineGetter__('hsla', function(){
  return HSLA.fromRGBA(this);
});

/**
 * Return hash.
 *
 * @return {String}
 * @api public
 */

RGBA.prototype.__defineGetter__('hash', function(){
  return this.toString();
});

/**
 * Add r,g,b,a to the current component values.
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @return {RGBA} new node
 * @api public
 */

RGBA.prototype.add = function(r,g,b,a){
  return new RGBA(
      this.r + r
    , this.g + g
    , this.b + b
    , this.a + a);
};

/**
 * Subtract r,g,b,a from the current component values.
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @return {RGBA} new node
 * @api public
 */

RGBA.prototype.sub = function(r,g,b,a){
  return new RGBA(
      this.r - r
    , this.g - g
    , this.b - b
    , a == 1 ? this.a : this.a - a);
};

/**
 * Multiply rgb components by `n`.
 *
 * @param {String} n
 * @return {RGBA} new node
 * @api public
 */

RGBA.prototype.multiply = function(n){
  return new RGBA(
      this.r * n
    , this.g * n
    , this.b * n
    , this.a); 
};

/**
 * Divide rgb components by `n`.
 *
 * @param {String} n
 * @return {RGBA} new node
 * @api public
 */

RGBA.prototype.divide = function(n){
  return new RGBA(
      this.r / n
    , this.g / n
    , this.b / n
    , this.a); 
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

RGBA.prototype.operate = function(op, right){
  if ('in' != op) right = right.first

  switch (op) {
    case 'is a':
      if ('string' == right.nodeName && 'color' == right.string) {
        return nodes.yes;
      }
      break;
    case '+':
      switch (right.nodeName) {
        case 'unit':
          var n = right.val;
          switch (right.type) {
            case '%': return adjust(this, new nodes.String('lightness'), right);
            case 'deg': return this.hsla.adjustHue(n).rgba;
            default: return this.add(n,n,n,0);
          }
        case 'rgba':
          return this.add(right.r, right.g, right.b, right.a);
        case 'hsla':
          return this.hsla.add(right.h, right.s, right.l);
      }
      break;
    case '-':
      switch (right.nodeName) {
        case 'unit':
          var n = right.val;
          switch (right.type) {
            case '%': return adjust(this, new nodes.String('lightness'), new nodes.Unit(-n, '%'));
            case 'deg': return this.hsla.adjustHue(-n).rgba;
            default: return this.sub(n,n,n,0);
          }
        case 'rgba':
          return this.sub(right.r, right.g, right.b, right.a);
        case 'hsla':
          return this.hsla.sub(right.h, right.s, right.l);
      }
      break;
    case '*':
      switch (right.nodeName) {
        case 'unit':
          return this.multiply(right.val);
      }
      break;
    case '/':
      switch (right.nodeName) {
        case 'unit':
          return this.divide(right.val);
      }
      break;
  }
  return Node.prototype.operate.call(this, op, right);
};

/**
 * Return #nnnnnn, #nnn, or rgba(n,n,n,n) string representation of the color.
 *
 * @return {String}
 * @api public
 */

RGBA.prototype.toString = function(){
  function pad(n) {
    return n < 16
      ? '0' + n.toString(16)
      : n.toString(16);
  }

  if (1 == this.a) {
    var r = pad(this.r)
      , g = pad(this.g)
      , b = pad(this.b);

    // Compress
    if (r[0] == r[1] && g[0] == g[1] && b[0] == b[1]) {
      return '#' + r[0] + g[0] + b[0];
    } else {
      return '#' + r + g + b;
    }
  } else {
    return 'rgba('
      + this.r + ','
      + this.g + ','
      + this.b + ','
      + (+this.a.toFixed(3)) + ')';
  }
};

/**
 * Return a `RGBA` from the given `hsla`.
 *
 * @param {HSLA} hsla
 * @return {RGBA}
 * @api public
 */

exports.fromHSLA = function(hsla){
  var h = hsla.h / 360
    , s = hsla.s / 100
    , l = hsla.l / 100
    , a = hsla.a;

  var m2 = l <= .5 ? l * (s + 1) : l + s - l * s
    , m1 = l * 2 - m2;

  var r = hue(h + 1/3) * 0xff
    , g = hue(h) * 0xff
    , b = hue(h - 1/3) * 0xff;

  function hue(h) {
    if (h < 0) ++h;
    if (h > 1) --h;
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
    return m1;
  }
  
  return new RGBA(r,g,b,a);
};

/**
 * Clamp `n` >= 0 and <= 255.
 *
 * @param {Number} n
 * @return {Number}
 * @api private
 */

function clamp(n) {
  return Math.max(0, Math.min(n.toFixed(0), 255));
}

/**
 * Clamp alpha `n` >= 0 and <= 1.
 *
 * @param {Number} n
 * @return {Number}
 * @api private
 */

function clampAlpha(n) {
  return Math.max(0, Math.min(n, 1));
}


});// module: nodes/rgba.js


require.register("nodes/root.js", function(module, exports, require){


/*!
 * Stylus - Root
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Root` node.
 *
 * @api public
 */

var Root = module.exports = function Root(){
  this.nodes = [];
};

/**
 * Inherit from `Node.prototype`.
 */

Root.prototype.__proto__ = Node.prototype;

/**
 * Push a `node` to this block.
 *
 * @param {Node} node
 * @api public
 */

Root.prototype.push = function(node){
  this.nodes.push(node);
};

/**
 * Unshift a `node` to this block.
 *
 * @param {Node} node
 * @api public
 */

Root.prototype.unshift = function(node){
  this.nodes.unshift(node);
};

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Root.prototype.clone = function(){
  var clone = new Root();
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  this.nodes.forEach(function(node){
    clone.push(node.clone(clone, clone));
  });
  return clone;
};

/**
 * Return "root".
 *
 * @return {String}
 * @api public
 */

Root.prototype.toString = function(){
  return '[Root]';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Root.prototype.toJSON = function(){
  return {
    __type: 'Root',
    nodes: this.nodes,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/root.js


require.register("nodes/selector.js", function(module, exports, require){


/*!
 * Stylus - Selector
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Block = require('./block')
  , Node = require('./node');

/**
 * Initialize a new `Selector` with the given `segs`.
 *
 * @param {Array} segs
 * @api public
 */

var Selector = module.exports = function Selector(segs){
  Node.call(this);
  this.inherits = true;
  this.segments = segs;
};

/**
 * Inherit from `Node.prototype`.
 */

Selector.prototype.__proto__ = Node.prototype;

/**
 * Return the selector string.
 *
 * @return {String}
 * @api public
 */

Selector.prototype.toString = function(){
  return this.segments.join('');
};

/**
 * Check if this is placeholder selector.
 *
 * @return {Boolean}
 * @api public
 */

Selector.prototype.__defineGetter__('isPlaceholder', function(){
  return this.val && ~this.val.substr(0, 2).indexOf('$');
});

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Selector.prototype.clone = function(parent){
  var clone = new Selector;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  clone.inherits = this.inherits;
  clone.val = this.val;
  clone.segments = this.segments.map(function(node){ return node.clone(parent, clone); });
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Selector.prototype.toJSON = function(){
  return {
    __type: 'Selector',
    inherits: this.inherits,
    segments: this.segments,
    val: this.val,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/selector.js


require.register("nodes/string.js", function(module, exports, require){

/*!
 * Stylus - String
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , sprintf = require('../functions').s
  , utils = require('../utils')
  , nodes = require('./index');

/**
 * Initialize a new `String` with the given `val`.
 *
 * @param {String} val
 * @param {String} quote
 * @api public
 */

var String = module.exports = function String(val, quote){
  Node.call(this);
  this.val = val;
  this.string = val;
  this.prefixed = false;
  if (typeof quote !== 'string') {
    this.quote = "'";
  } else {
    this.quote = quote;
  }
};

/**
 * Inherit from `Node.prototype`.
 */

String.prototype.__proto__ = Node.prototype;

/**
 * Return quoted string.
 *
 * @return {String}
 * @api public
 */

String.prototype.toString = function(){
  return this.quote + this.val + this.quote;
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

String.prototype.clone = function(){
  var clone = new String(this.val, this.quote);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

String.prototype.toJSON = function(){
  return {
    __type: 'String',
    val: this.val,
    quote: this.quote,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return Boolean based on the length of this string.
 *
 * @return {Boolean}
 * @api public
 */

String.prototype.toBoolean = function(){
  return nodes.Boolean(this.val.length);
};

/**
 * Coerce `other` to a string.
 *
 * @param {Node} other
 * @return {String}
 * @api public
 */

String.prototype.coerce = function(other){
  switch (other.nodeName) {
    case 'string':
      return other;
    case 'expression':
      return new String(other.nodes.map(function(node){
        return this.coerce(node).val;
      }, this).join(' '));
    default:
      return new String(other.toString());
  }
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

String.prototype.operate = function(op, right){
  switch (op) {
    case '%':
      var expr = new nodes.Expression;
      expr.push(this);

      // constructargs
      var args = 'expression' == right.nodeName
        ? utils.unwrap(right).nodes
        : [right];

      // apply
      return sprintf.apply(null, [expr].concat(args));
    case '+':
      var expr = new nodes.Expression;
      expr.push(new String(this.val + this.coerce(right).val));
      return expr;
    default:
      return Node.prototype.operate.call(this, op, right);
  }
};


});// module: nodes/string.js


require.register("nodes/ternary.js", function(module, exports, require){


/*!
 * Stylus - Ternary
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Ternary` with `cond`, `trueExpr` and `falseExpr`.
 *
 * @param {Expression} cond
 * @param {Expression} trueExpr
 * @param {Expression} falseExpr
 * @api public
 */

var Ternary = module.exports = function Ternary(cond, trueExpr, falseExpr){
  Node.call(this);
  this.cond = cond;
  this.trueExpr = trueExpr;
  this.falseExpr = falseExpr;
};

/**
 * Inherit from `Node.prototype`.
 */

Ternary.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Ternary.prototype.clone = function(parent){
  var clone = new Ternary();
  clone.cond = this.cond.clone(parent, clone);
  clone.trueExpr = this.trueExpr.clone(parent, clone);
  clone.falseExpr = this.falseExpr.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Ternary.prototype.toJSON = function(){
  return {
    __type: 'Ternary',
    cond: this.cond,
    trueExpr: this.trueExpr,
    falseExpr: this.falseExpr,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/ternary.js


require.register("nodes/unaryop.js", function(module, exports, require){


/*!
 * Stylus - UnaryOp
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `UnaryOp` with `op`, and `expr`.
 *
 * @param {String} op
 * @param {Node} expr
 * @api public
 */

var UnaryOp = module.exports = function UnaryOp(op, expr){
  Node.call(this);
  this.op = op;
  this.expr = expr;
};

/**
 * Inherit from `Node.prototype`.
 */

UnaryOp.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

UnaryOp.prototype.clone = function(parent){
  var clone = new UnaryOp(this.op);
  clone.expr = this.expr.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

UnaryOp.prototype.toJSON = function(){
  return {
    __type: 'UnaryOp',
    op: this.op,
    expr: this.expr,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};


});// module: nodes/unaryop.js


require.register("nodes/unit.js", function(module, exports, require){


/*!
 * Stylus - Unit
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index');

/**
 * Unit conversion table.
 */

var FACTOR_TABLE = {
  'mm': {val: 1, label: 'mm'},
  'cm': {val: 10, label: 'mm'},
  'in': {val: 25.4, label: 'mm'},
  'pt': {val: 25.4/72, label: 'mm'},
  'ms': {val: 1, label: 'ms'},
  's': {val: 1000, label: 'ms'},
  'Hz': {val: 1, label: 'Hz'},
  'kHz': {val: 1000, label: 'Hz'}
};

/**
 * Initialize a new `Unit` with the given `val` and unit `type`
 * such as "px", "pt", "in", etc.
 *
 * @param {String} val
 * @param {String} type
 * @api public
 */

var Unit = module.exports = function Unit(val, type){
  Node.call(this);
  this.val = parseFloat( val.toFixed( 15 ) );
  this.type = type;
};

/**
 * Inherit from `Node.prototype`.
 */

Unit.prototype.__proto__ = Node.prototype;

/**
 * Return Boolean based on the unit value.
 *
 * @return {Boolean}
 * @api public
 */

Unit.prototype.toBoolean = function(){
  return nodes.Boolean(this.type
      ? true
      : this.val);
};

/**
 * Return unit string.
 *
 * @return {String}
 * @api public
 */

Unit.prototype.toString = function(){
  var n = this.val;
  if ('px' == this.type) n = n.toFixed(0);
  return n + (this.type || '');
};

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Unit.prototype.clone = function(){
  var clone = new Unit(this.val, this.type);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Unit.prototype.toJSON = function(){
  return {
    __type: 'Unit',
    val: this.val,
    type: this.type,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Unit.prototype.operate = function(op, right){
  var type = this.type || right.first.type;

  // swap color
  if ('rgba' == right.nodeName || 'hsla' == right.nodeName) {
    return right.operate(op, this);
  }

  // operate
  if (this.shouldCoerce(op)) {
    right = right.first;
    // percentages
    if ('%' != this.type && ('-' == op || '+' == op) && '%' == right.type) {
      right = new Unit(this.val * (right.val / 100), '%');
    } else {
      right = this.coerce(right);
    }

    switch (op) {
      case '-':
        return new Unit(this.val - right.val, type);
      case '+':
        // keyframes interpolation
        type = type || (right.type == '%' && right.type);
        return new Unit(this.val + right.val, type);
      case '/':
        return new Unit(this.val / right.val, type);
      case '*':
        return new Unit(this.val * right.val, type);
      case '%':
        return new Unit(this.val % right.val, type);
      case '**':
        return new Unit(Math.pow(this.val, right.val), type);
      case '..':
      case '...':
        var start = this.val
          , end = right.val
          , expr = new nodes.Expression
          , inclusive = '..' == op;
        if (start < end) {
          do {
            expr.push(new nodes.Unit(start));
          } while (inclusive ? ++start <= end : ++start < end);
        } else {
          do {
            expr.push(new nodes.Unit(start));
          } while (inclusive ? --start >= end : --start > end);
        }
        return expr;
    }
  }

  return Node.prototype.operate.call(this, op, right);
};

/**
 * Coerce `other` unit to the same type as `this` unit.
 *
 * Supports:
 *
 *    mm -> cm | in
 *    cm -> mm | in
 *    in -> mm | cm
 *
 *    ms -> s
 *    s  -> ms
 *
 *    Hz  -> kHz
 *    kHz -> Hz
 *
 * @param {Unit} other
 * @return {Unit}
 * @api public
 */

Unit.prototype.coerce = function(other){
  if ('unit' == other.nodeName) {
    var a = this
      , b = other
      , factorA = FACTOR_TABLE[a.type]
      , factorB = FACTOR_TABLE[b.type];

    if (factorA && factorB && (factorA.label == factorB.label)) {
      var bVal = b.val * (factorB.val / factorA.val);
      return new nodes.Unit(bVal, a.type);
    } else {
      return new nodes.Unit(b.val, a.type);
    }
  } else if ('string' == other.nodeName) {
    // keyframes interpolation
    if ('%' == other.val) return new nodes.Unit(0, '%');
    var val = parseFloat(other.val);
    if (isNaN(val)) Node.prototype.coerce.call(this, other);
    return new nodes.Unit(val);
  } else {
    return Node.prototype.coerce.call(this, other);
  }
};


});// module: nodes/unit.js


require.register("nodes/object.js", function(module, exports, require){


/*!
 * Stylus - Object
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./index')
  , nativeObj = {}.constructor;

/**
 * Initialize a new `Object`.
 *
 * @api public
 */

var Object = module.exports = function Object(){
  Node.call(this);
  this.vals = {};
};

/**
 * Inherit from `Node.prototype`.
 */

Object.prototype.__proto__ = Node.prototype;

/**
 * Set `key` to `val`.
 *
 * @param {String} key
 * @param {Node} val
 * @return {Object} for chaining
 * @api public
 */

Object.prototype.set = function(key, val){
  this.vals[key] = val;
  return this;
};

/**
 * Return length.
 *
 * @return {Number}
 * @api public
 */

Object.prototype.__defineGetter__('length', function() {
  return nativeObj.keys(this.vals).length;
});

/**
 * Get `key`.
 *
 * @param {String} key
 * @return {Node}
 * @api public
 */

Object.prototype.get = function(key){
  return this.vals[key] || nodes.nil;
};

/**
 * Has `key`?
 *
 * @param {String} key
 * @return {Boolean}
 * @api public
 */

Object.prototype.has = function(key){
  return key in this.vals;
};

/**
 * Operate on `right` with the given `op`.
 *
 * @param {String} op
 * @param {Node} right
 * @return {Node}
 * @api public
 */

Object.prototype.operate = function(op, right){
  switch (op) {
    case '.':
    case '[]':
      return this.get(right.hash);
    default:
      return Node.prototype.operate.call(this, op, right);
  }
};

/**
 * Return Boolean based on the length of this object.
 *
 * @return {Boolean}
 * @api public
 */

Object.prototype.toBoolean = function(){
  return nodes.Boolean(this.length);
};

/**
 * Convert object to string with properties.
 *
 * @return {String}
 * @api private
 */

Object.prototype.toBlock = function(){
  var str = '{'
    , key
    , val;
  for (key in this.vals) {
    val = this.get(key);
    if ('object' == val.first.nodeName) {
      str += key + ' ' + this.toBlock.call(val.first);
    } else {
      switch (key) {
        case '@charset':
          str += key + ' ' + val.first.toString() + ';';
          break;
        default:
          str += key + ':' + val.toString().replace(/ , /g, '\\,') + ';';
      }
    }
  }
  str += '}';
  return str;
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Object.prototype.clone = function(parent){
  var clone = new Object;
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  for (var key in this.vals) {
    clone.vals[key] = this.vals[key].clone(parent, clone);
  }
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Object.prototype.toJSON = function(){
  return {
    __type: 'Object',
    vals: this.vals,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return "{ <prop>: <val> }"
 *
 * @return {String}
 * @api public
 */

Object.prototype.toString = function(){
  var obj = {};
  for (var prop in this.vals) {
    obj[prop] = this.vals[prop].toString();
  }
  return JSON.stringify(obj);
};


});// module: nodes/object.js


require.register("nodes/supports.js", function(module, exports, require){

/*!
 * Stylus - supports
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Atrule = require('./atrule');

/**
 * Initialize a new supports node.
 *
 * @param {Expression} condition
 * @api public
 */

var Supports = module.exports = function Supports(condition){
  Atrule.call(this, 'supports');
  this.condition = condition;
};

/**
 * Inherit from `Atrule.prototype`.
 */

Supports.prototype.__proto__ = Atrule.prototype;

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Supports.prototype.clone = function(parent){
  var clone = new Supports;
  clone.condition = this.condition.clone(parent, clone);
  clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Supports.prototype.toJSON = function(){
  return {
    __type: 'Supports',
    condition: this.condition,
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
};

/**
 * Return @supports
 *
 * @return {String}
 * @api public
 */

Supports.prototype.toString = function(){
  return '@supports ' + this.condition;
};


});// module: nodes/supports.js


require.register("nodes/member.js", function(module, exports, require){


/*!
 * Stylus - Member
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Member` with `left` and `right`.
 *
 * @param {Node} left
 * @param {Node} right
 * @api public
 */

var Member = module.exports = function Member(left, right){
  Node.call(this);
  this.left = left;
  this.right = right;
};

/**
 * Inherit from `Node.prototype`.
 */

Member.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Member.prototype.clone = function(parent){
  var clone = new Member;
  clone.left = this.left.clone(parent, clone);
  clone.right = this.right.clone(parent, clone);
  if (this.val) clone.val = this.val.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Member.prototype.toJSON = function(){
  var json = {
    __type: 'Member',
    left: this.left,
    right: this.right,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.val) json.val = this.val;
  return json;
};

/**
 * Return a string representation of this node.
 *
 * @return {String}
 * @api public
 */

Member.prototype.toString = function(){
  return this.left.toString()
    + '.' + this.right.toString();
};


});// module: nodes/member.js


require.register("nodes/atblock.js", function(module, exports, require){

/*!
 * Stylus - @block
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `@block` node.
 *
 * @api public
 */

var Atblock = module.exports = function Atblock(){
  Node.call(this);
};

/**
 * Return `block` nodes.
 */

Atblock.prototype.__defineGetter__('nodes', function(){
  return this.block.nodes;
});

/**
 * Inherit from `Node.prototype`.
 */

Atblock.prototype.__proto__ = Node.prototype;

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Atblock.prototype.clone = function(parent){
  var clone = new Atblock;
  clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return @block.
 *
 * @return {String}
 * @api public
 */

Atblock.prototype.toString = function(){
  return '@block';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Atblock.prototype.toJSON = function(){
  return {
    __type: 'Atblock',
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    fileno: this.fileno
  };
};


});// module: nodes/atblock.js


require.register("nodes/atrule.js", function(module, exports, require){

/*!
 * Stylus - at-rule
 * Copyright(c) 2014 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new at-rule node.
 *
 * @param {String} type
 * @api public
 */

var Atrule = module.exports = function Atrule(type){
  Node.call(this);
  this.type = type;
};

/**
 * Inherit from `Node.prototype`.
 */

Atrule.prototype.__proto__ = Node.prototype;

/**
 * Check if at-rule's block has only properties.
 *
 * @return {Boolean}
 * @api public
 */

Atrule.prototype.__defineGetter__('hasOnlyProperties', function(){
  var nodes = this.block.nodes;
  for (var i = 0, len = nodes.length; i < len; ++i) {
    var nodeName = nodes[i].nodeName;
    switch(nodes[i].nodeName) {
      case 'property':
      case 'expression':
      case 'comment':
        continue;
      default:
        return false;
    }
  }
  return true;
});

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Atrule.prototype.clone = function(parent){
  var clone = new Atrule(this.type);
  if (this.block) clone.block = this.block.clone(parent, clone);
  clone.segments = this.segments.map(function(node){ return node.clone(parent, clone); });
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Atrule.prototype.toJSON = function(){
  var json = {
    __type: 'Atrule',
    type: this.type,
    segments: this.segments,
    lineno: this.lineno,
    column: this.column,
    filename: this.filename
  };
  if (this.block) json.block = this.block;
  return json;
};

/**
 * Return @<type>.
 *
 * @return {String}
 * @api public
 */

Atrule.prototype.toString = function(){
  return '@' + this.type;
};

/**
 * Check if the at-rule's block has properties.
 *
 * @return {Boolean}
 * @api public
 */

Atrule.prototype.__defineGetter__('hasProperties', function(){
  return hasProperties(this.block);
});

function hasProperties(block) {
  return block.nodes.some(function(node) {
    switch (node.nodeName) {
      case 'property':
        return true;
      case 'group':
        return !node.hasOnlyPlaceholders && hasProperties(node.block);
      case 'block':
        return hasProperties(node);
      default:
        if (node.block) return hasProperties(node.block);
    }
  });
}


});// module: nodes/atrule.js


require.register("parser.js", function(module, exports, require){

/*!
 * Stylus - Parser
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Lexer = require('./lexer')
  , nodes = require('./nodes')
  , Token = require('./token')
  , units = require('./units')
  , errors = require('./errors');

/**
 * Selector composite tokens.
 */

var selectorTokens = [
    'ident'
  , 'string'
  , 'selector'
  , 'function'
  , 'comment'
  , 'boolean'
  , 'space'
  , 'color'
  , 'unit'
  , 'for'
  , 'in'
  , '['
  , ']'
  , '('
  , ')'
  , '+'
  , '-'
  , '*'
  , '*='
  , '<'
  , '>'
  , '='
  , ':'
  , '&'
  , '~'
  , '{'
  , '}'
  , '.'
  , '/'
];

/**
 * CSS pseudo-classes and pseudo-elements.
 * See http://dev.w3.org/csswg/selectors4/
 */

var pseudoSelectors = [
  // Logical Combinations
    'matches'
  , 'not'

  // Linguistic Pseudo-classes
  , 'dir'
  , 'lang'

  // Location Pseudo-classes
  , 'any-link'
  , 'link'
  , 'visited'
  , 'local-link'
  , 'target'
  , 'scope'

  // User Action Pseudo-classes
  , 'hover'
  , 'active'
  , 'focus'
  , 'drop'

  // Time-dimensional Pseudo-classes
  , 'current'
  , 'past'
  , 'future'

  // The Input Pseudo-classes
  , 'enabled'
  , 'disabled'
  , 'read-only'
  , 'read-write'
  , 'placeholder-shown'
  , 'checked'
  , 'indeterminate'
  , 'valid'
  , 'invalid'
  , 'in-range'
  , 'out-of-range'
  , 'required'
  , 'optional'
  , 'user-error'

  // Tree-Structural pseudo-classes
  , 'root'
  , 'empty'
  , 'blank'
  , 'nth-child'
  , 'nth-last-child'
  , 'first-child'
  , 'last-child'
  , 'only-child'
  , 'nth-of-type'
  , 'nth-last-of-type'
  , 'first-of-type'
  , 'last-of-type'
  , 'only-of-type'
  , 'nth-match'
  , 'nth-last-match'

  // Grid-Structural Selectors
  , 'nth-column'
  , 'nth-last-column'

  // Pseudo-elements
  , 'first-line'
  , 'first-letter'
  , 'before'
  , 'after'

  // Non-standard
  , 'selection'
];

/**
 * Initialize a new `Parser` with the given `str` and `options`.
 *
 * @param {String} str
 * @param {Object} options
 * @api private
 */

var Parser = module.exports = function Parser(str, options) {
  var self = this;
  options = options || {};
  this.lexer = new Lexer(str, options);
  this.prefix = options.prefix || '';
  this.root = options.root || new nodes.Root;
  this.state = ['root'];
  this.stash = [];
  this.parens = 0;
  this.css = 0;
  this.state.pop = function(){
    self.prevState = [].pop.call(this);
  };
};

/**
 * Parser prototype.
 */

Parser.prototype = {

  /**
   * Constructor.
   */

  constructor: Parser,

  /**
   * Return current state.
   *
   * @return {String}
   * @api private
   */

  currentState: function() {
    return this.state[this.state.length - 1];
  },

  /**
   * Return previous state.
   *
   * @return {String}
   * @api private
   */

  previousState: function() {
    return this.state[this.state.length - 2];
  },

  /**
   * Parse the input, then return the root node.
   *
   * @return {Node}
   * @api private
   */

  parse: function(){
    var block = this.parent = this.root;
    while ('eos' != this.peek().type) {
      this.skipWhitespace();
      if ('eos' == this.peek().type) break;
      var stmt = this.statement();
      this.accept(';');
      if (!stmt) this.error('unexpected token {peek}, not allowed at the root level');
      block.push(stmt);
    }
    return block;
  },

  /**
   * Throw an `Error` with the given `msg`.
   *
   * @param {String} msg
   * @api private
   */

  error: function(msg){
    var type = this.peek().type
      , val = undefined == this.peek().val
        ? ''
        : ' ' + this.peek().toString();
    if (val.trim() == type.trim()) val = '';
    throw new errors.ParseError(msg.replace('{peek}', '"' + type + val + '"'));
  },

  /**
   * Accept the given token `type`, and return it,
   * otherwise return `undefined`.
   *
   * @param {String} type
   * @return {Token}
   * @api private
   */

  accept: function(type){
    if (type == this.peek().type) {
      return this.next();
    }
  },

  /**
   * Expect token `type` and return it, throw otherwise.
   *
   * @param {String} type
   * @return {Token}
   * @api private
   */

  expect: function(type){
    if (type != this.peek().type) {
      this.error('expected "' + type + '", got {peek}');
    }
    return this.next();
  },

  /**
   * Get the next token.
   *
   * @return {Token}
   * @api private
   */

  next: function() {
    var tok = this.stash.length
      ? this.stash.pop()
      : this.lexer.next()
      , line = tok.lineno
      , column = tok.column || 1;

    if (tok.val && tok.val.nodeName) {
      tok.val.lineno = line;
      tok.val.column = column;
    }
    nodes.lineno = line;
    nodes.column = column;
    return tok;
  },

  /**
   * Peek with lookahead(1).
   *
   * @return {Token}
   * @api private
   */

  peek: function() {
    return this.lexer.peek();
  },

  /**
   * Lookahead `n` tokens.
   *
   * @param {Number} n
   * @return {Token}
   * @api private
   */

  lookahead: function(n){
    return this.lexer.lookahead(n);
  },

  /**
   * Check if the token at `n` is a valid selector token.
   *
   * @param {Number} n
   * @return {Boolean}
   * @api private
   */

  isSelectorToken: function(n) {
    var la = this.lookahead(n).type;
    switch (la) {
      case 'for':
        return this.bracketed;
      case '[':
        this.bracketed = true;
        return true;
      case ']':
        this.bracketed = false;
        return true;
      default:
        return ~selectorTokens.indexOf(la);
    }
  },

  /**
   * Check if the token at `n` is a pseudo selector.
   *
   * @param {Number} n
   * @return {Boolean}
   * @api private
   */

  isPseudoSelector: function(n){
    var val = this.lookahead(n).val;
    return val && ~pseudoSelectors.indexOf(val.name);
  },

  /**
   * Check if the current line contains `type`.
   *
   * @param {String} type
   * @return {Boolean}
   * @api private
   */

  lineContains: function(type){
    var i = 1
      , la;

    while (la = this.lookahead(i++)) {
      if (~['indent', 'outdent', 'newline', 'eos'].indexOf(la.type)) return;
      if (type == la.type) return true;
    }
  },

  /**
   * Valid selector tokens.
   */

  selectorToken: function() {
    if (this.isSelectorToken(1)) {
      if ('{' == this.peek().type) {
        // unclosed, must be a block
        if (!this.lineContains('}')) return;
        // check if ':' is within the braces.
        // though not required by Stylus, chances
        // are if someone is using {} they will
        // use CSS-style props, helping us with
        // the ambiguity in this case
        var i = 0
          , la;
        while (la = this.lookahead(++i)) {
          if ('}' == la.type) {
            // Check empty block.
            if (i == 2 || (i == 3 && this.lookahead(i - 1).type == 'space'))
              return;
            break;
          }
          if (':' == la.type) return;
        }
      }
      return this.next();
    }
  },

  /**
   * Skip the given `tokens`.
   *
   * @param {Array} tokens
   * @api private
   */

  skip: function(tokens) {
    while (~tokens.indexOf(this.peek().type))
      this.next();
  },

  /**
   * Consume whitespace.
   */

  skipWhitespace: function() {
    this.skip(['space', 'indent', 'outdent', 'newline']);
  },

  /**
   * Consume newlines.
   */

  skipNewlines: function() {
    while ('newline' == this.peek().type)
      this.next();
  },

  /**
   * Consume spaces.
   */

  skipSpaces: function() {
    while ('space' == this.peek().type)
      this.next();
  },

  /**
   * Consume spaces and comments.
   */

  skipSpacesAndComments: function() {
    while ('space' == this.peek().type
      || 'comment' == this.peek().type)
      this.next();
  },

  /**
   * Check if the following sequence of tokens
   * forms a function definition, ie trailing
   * `{` or indentation.
   */

  looksLikeFunctionDefinition: function(i) {
    return 'indent' == this.lookahead(i).type
      || '{' == this.lookahead(i).type;
  },

  /**
   * Check if the following sequence of tokens
   * forms a selector.
   *
   * @param {Boolean} [fromProperty]
   * @return {Boolean}
   * @api private
   */

  looksLikeSelector: function(fromProperty) {
    var i = 1
      , brace;

    // Real property
    if (fromProperty && ':' == this.lookahead(i + 1).type
      && (this.lookahead(i + 1).space || 'indent' == this.lookahead(i + 2).type))
      return false;

    // Assume selector when an ident is
    // followed by a selector
    while ('ident' == this.lookahead(i).type
      && 'newline' == this.lookahead(i + 1).type) i += 2;

    while (this.isSelectorToken(i)
      || ',' == this.lookahead(i).type) {

      if ('selector' == this.lookahead(i).type)
        return true;

      if ('.' == this.lookahead(i).type && 'ident' == this.lookahead(i + 1).type)
        return true;

      if ('*' == this.lookahead(i).type && 'newline' == this.lookahead(i + 1).type)
        return true;

      if (':' == this.lookahead(i).type
        && ':' == this.lookahead(i + 1).type)
        return true;

      if (this.looksLikeAttributeSelector(i))
        return true;

      if (('=' == this.lookahead(i).type || 'function' == this.lookahead(i).type)
        && '{' == this.lookahead(i + 1).type)
        return false;

      if (':' == this.lookahead(i).type
        && !this.isPseudoSelector(i + 1)
        && this.lineContains('.'))
        return false;

      // the ':' token within braces signifies
      // a selector. ex: "foo{bar:'baz'}"
      if ('{' == this.lookahead(i).type) brace = true;
      else if ('}' == this.lookahead(i).type) brace = false;
      if (brace && ':' == this.lookahead(i).type) return true;

      // '}' preceded by a space is considered a selector.
      // for example "foo{bar}{baz}" may be a property,
      // however "foo{bar} {baz}" is a selector
      if ('space' == this.lookahead(i).type
        && '{' == this.lookahead(i + 1).type)
        return true;

      // Assume pseudo selectors are NOT properties
      // as 'td:th-child(1)' may look like a property
      // and function call to the parser otherwise
      if (':' == this.lookahead(i++).type
        && !this.lookahead(i-1).space
        && this.isPseudoSelector(i))
        return true;

      if (',' == this.lookahead(i).type
        && 'newline' == this.lookahead(i + 1).type)
        return true;
    }

    // Trailing comma
    if (',' == this.lookahead(i).type
      && 'newline' == this.lookahead(i + 1).type)
      return true;

    // Trailing brace
    if ('{' == this.lookahead(i).type
      && 'newline' == this.lookahead(i + 1).type)
      return true;

    // css-style mode, false on ; }
    if (this.css) {
      if (';' == this.lookahead(i).type ||
          '}' == this.lookahead(i - 1).type)
        return false;
    }

    // Trailing separators
    while (!~[
        'indent'
      , 'outdent'
      , 'newline'
      , 'for'
      , 'if'
      , ';'
      , '}'
      , 'eos'].indexOf(this.lookahead(i).type))
      ++i;

    if ('indent' == this.lookahead(i).type)
      return true;
  },

  /**
   * Check if the following sequence of tokens
   * forms an attribute selector.
   */

  looksLikeAttributeSelector: function(n) {
    var type = this.lookahead(n).type;
    if ('=' == type && this.bracketed) return true;
    return ('ident' == type || 'string' == type)
      && ']' == this.lookahead(n + 1).type
      && ('newline' == this.lookahead(n + 2).type || this.isSelectorToken(n + 2))
      && !this.lineContains(':')
      && !this.lineContains('=');
  },

  /**
   * Check if the following sequence of tokens
   * forms a keyframe block.
   */

  looksLikeKeyframe: function() {
    var i = 2
      , type;
    switch (this.lookahead(i).type) {
      case '{':
      case 'indent':
      case ',':
        return true;
      case 'newline':
        while ('unit' == this.lookahead(++i).type
            || 'newline' == this.lookahead(i).type) ;
        type = this.lookahead(i).type;
        return 'indent' == type || '{' == type;
    }
  },

  /**
   * Check if the current state supports selectors.
   */

  stateAllowsSelector: function() {
    switch (this.currentState()) {
      case 'root':
      case 'atblock':
      case 'selector':
      case 'conditional':
      case 'function':
      case 'atrule':
      case 'for':
        return true;
    }
  },

  /**
   * Try to assign @block to the node.
   *
   * @param {Expression} expr
   * @private
   */

  assignAtblock: function(expr) {
    try {
      expr.push(this.atblock(expr));
    } catch(err) {
      this.error('invalid right-hand side operand in assignment, got {peek}');
    }
  },

  /**
   *   statement
   * | statement 'if' expression
   * | statement 'unless' expression
   */

  statement: function() {
    var stmt = this.stmt()
      , state = this.prevState
      , block
      , op;

    // special-case statements since it
    // is not an expression. We could
    // implement postfix conditionals at
    // the expression level, however they
    // would then fail to enclose properties
    if (this.allowPostfix) {
      this.allowPostfix = false;
      state = 'expression';
    }

    switch (state) {
      case 'assignment':
      case 'expression':
      case 'function arguments':
        while (op =
             this.accept('if')
          || this.accept('unless')
          || this.accept('for')) {
          switch (op.type) {
            case 'if':
            case 'unless':
              stmt = new nodes.If(this.expression(), stmt);
              stmt.postfix = true;
              stmt.negate = 'unless' == op.type;
              this.accept(';');
              break;
            case 'for':
              var key
                , val = this.id().name;
              if (this.accept(',')) key = this.id().name;
              this.expect('in');
              var each = new nodes.Each(val, key, this.expression());
              block = new nodes.Block(this.parent, each);
              block.push(stmt);
              each.block = block;
              stmt = each;
          }
        }
    }

    return stmt;
  },

  /**
   *    ident
   *  | selector
   *  | literal
   *  | charset
   *  | namespace
   *  | import
   *  | require
   *  | media
   *  | atrule
   *  | scope
   *  | keyframes
   *  | mozdocument
   *  | for
   *  | if
   *  | unless
   *  | comment
   *  | expression
   *  | 'return' expression
   */

  stmt: function() {
    var type = this.peek().type;
    switch (type) {
      case 'keyframes':
        return this.keyframes();
      case '-moz-document':
        return this.mozdocument();
      case 'comment':
      case 'selector':
      case 'extend':
      case 'literal':
      case 'charset':
      case 'namespace':
      case 'require':
      case 'extend':
      case 'media':
      case 'atrule':
      case 'ident':
      case 'scope':
      case 'supports':
      case 'unless':
        return this[type]();
      case 'function':
        return this.fun();
      case 'import':
        return this.atimport();
      case 'if':
        return this.ifstmt();
      case 'for':
        return this.forin();
      case 'return':
        return this.ret();
      case '{':
        return this.property();
      default:
        // Contextual selectors
        if (this.stateAllowsSelector()) {
          switch (type) {
            case 'color':
            case '~':
            case '>':
            case '<':
            case ':':
            case '&':
            case '[':
            case '.':
            case '/':
              return this.selector();
            case '+':
              return 'function' == this.lookahead(2).type
                ? this.functionCall()
                : this.selector();
            case '*':
              return this.property();
            // keyframe blocks (10%, 20% { ... })
            case 'unit':
              if (this.looksLikeKeyframe()) return this.selector();
            case '-':
              if ('{' == this.lookahead(2).type)
                return this.property();
          }
        }

        // Expression fallback
        var expr = this.expression();
        if (expr.isEmpty) this.error('unexpected {peek}');
        return expr;
    }
  },

  /**
   * indent (!outdent)+ outdent
   */

  block: function(node, scope) {
    var delim
      , stmt
      , block = this.parent = new nodes.Block(this.parent, node);

    if (false === scope) block.scope = false;

    this.accept('newline');

    // css-style
    if (this.accept('{')) {
      this.css++;
      delim = '}';
      this.skipWhitespace();
    } else {
      delim = 'outdent';
      this.expect('indent');
    }

    while (delim != this.peek().type) {
      // css-style
      if (this.css) {
        if (this.accept('newline') || this.accept('indent')) continue;
        stmt = this.statement();
        this.accept(';');
        this.skipWhitespace();
      } else {
        if (this.accept('newline') || this.accept('indent')) continue;
        stmt = this.statement();
        this.accept(';');
      }
      if (!stmt) this.error('unexpected token {peek} in block');
      block.push(stmt);
    }

    // css-style
    if (this.css) {
      this.skipWhitespace();
      this.expect('}');
      this.skipSpaces();
      this.css--;
    } else {
      this.expect('outdent');
    }

    this.parent = block.parent;
    return block;
  },

  /**
   * comment space*
   */

  comment: function(){
    var node = this.next().val;
    this.skipSpaces();
    return node;
  },

  /**
   * for val (',' key) in expr
   */
  
  forin: function() {
    this.expect('for');
    var key
      , val = this.id().name;
    if (this.accept(',')) key = this.id().name;
    this.expect('in');
    this.state.push('for');
    this.cond = true;
    var each = new nodes.Each(val, key, this.expression());
    this.cond = false;
    each.block = this.block(each, false);
    this.state.pop();
    return each;
  },

  /**
   * return expression
   */
  
  ret: function() {
    this.expect('return');
    var expr = this.expression();
    return expr.isEmpty
      ? new nodes.Return
      : new nodes.Return(expr);
  },

  /**
   * unless expression block
   */

  unless: function() {
    this.expect('unless');
    this.state.push('conditional');
    this.cond = true;
    var node = new nodes.If(this.expression(), true);
    this.cond = false;
    node.block = this.block(node, false);
    this.state.pop();
    return node;
  },

  /**
   * if expression block (else block)?
   */

  ifstmt: function() {
    this.expect('if');
    this.state.push('conditional');
    this.cond = true;
    var node = new nodes.If(this.expression())
      , cond
      , block;
    this.cond = false;
    node.block = this.block(node, false);
    // ignore newlines and comments
    while ('newline' == this.peek().type
      || 'comment' == this.peek().type) this.next();
    while (this.accept('else')) {
      if (this.accept('if')) {
        this.cond = true;
        cond = this.expression();
        this.cond = false;
        block = this.block(node, false);
        node.elses.push(new nodes.If(cond, block));
      } else {
        node.elses.push(this.block(node, false));
        break;
      }
    }
    this.state.pop();
    return node;
  },

  /**
   * @block
   *
   * @param {Expression} [node]
   */

  atblock: function(node){
    if (!node) this.expect('atblock');
    node = new nodes.Atblock;
    this.state.push('atblock');
    node.block = this.block(node, false);
    this.state.pop();
    return node;
  },

  /**
   * atrule selector? block
   */

  atrule: function(){
    var type = this.expect('atrule').val
      , node = new nodes.Atrule(type);
    this.skipSpacesAndComments();
    node.segments = this.selectorParts();
    this.skipSpacesAndComments();
    this.state.push('atrule');
    node.block = this.block(node);
    this.state.pop();
    return node;
  },

  /**
   * scope
   */

  scope: function(){
    this.expect('scope');
    var selector = this.selectorParts()
      .map(function(selector) { return selector.val; })
      .join('');
    this.selectorScope = selector.trim();
    return nodes.nil;
  },

  /**
   * supports
   */

  supports: function(){
    this.expect('supports');
    var node = new nodes.Supports(this.supportsCondition());
    this.state.push('atrule');
    node.block = this.block(node);
    this.state.pop();
    return node;
  },

  /**
   *   supports negation
   * | supports op
   * | expression
   */

  supportsCondition: function(){
    var node = this.supportsNegation()
      || this.supportsOp();
    if (!node) {
      this.cond = true;
      node = this.expression();
      this.cond = false;
    }
    return node;
  },

  /**
   * 'not' supports feature
   */

  supportsNegation: function(){
    if (this.accept('not')) {
      var node = new nodes.Expression;
      node.push(new nodes.Literal('not'));
      node.push(this.supportsFeature());
      return node;
    }
  },

  /**
   * supports feature (('and' | 'or') supports feature)+
   */

  supportsOp: function(){
    var feature = this.supportsFeature()
      , op
      , expr;
    if (feature) {
      expr = new nodes.Expression;
      expr.push(feature);
      while (op = this.accept('&&') || this.accept('||')) {
        expr.push(new nodes.Literal('&&' == op.val ? 'and' : 'or'));
        expr.push(this.supportsFeature());
      }
      return expr;
    }
  },

  /**
   *   ('(' supports condition ')')
   * | feature
   */

  supportsFeature: function(){
    this.skipSpacesAndComments();
    if ('(' == this.peek().type) {
      if ('(' == this.lookahead(2).type) {
        this.expect('(');
        var node = new nodes.Expression;
        node.push(new nodes.Literal('('));
        node.push(this.supportsCondition());
        this.expect(')')
        node.push(new nodes.Literal(')'));
        this.skipSpacesAndComments();
        return node;
      }
      return this.feature();
    }
  },

  /**
   * extend
   */

  extend: function(){
    var tok = this.expect('extend')
      , selectors = []
      , node
      , arr;

    do {
      arr = this.selectorParts();
      if (arr.length) selectors.push(new nodes.Selector(arr));
    } while(this.accept(','));

    node = new nodes.Extend(selectors);
    node.lineno = tok.lineno;
    node.column = tok.column;
    return node;
  },

  /**
   * media queries
   */

  media: function() {
    this.expect('media');
    this.state.push('atrule');
    var media = new nodes.Media(this.queries());
    media.block = this.block(media);
    this.state.pop();
    return media;
  },

  /**
   * query (',' query)*
   */

  queries: function() {
    var queries = new nodes.QueryList
      , skip = ['comment', 'newline', 'space'];

    do {
      this.skip(skip);
      queries.push(this.query());
      this.skip(skip);
    } while (this.accept(','));
    return queries;
  },

  /**
   *   expression
   * | (ident | 'not')? ident ('and' feature)*
   * | feature ('and' feature)*
   */

  query: function() {
    var query = new nodes.Query
      , expr
      , pred
      , id;

    // hash values support
    if ('ident' == this.peek().type
      && ('.' == this.lookahead(2).type
      || '[' == this.lookahead(2).type)) {
      this.cond = true;
      expr = this.expression();
      this.cond = false;
      query.push(new nodes.Feature(expr.nodes));
      return query;
    }

    if (pred = this.accept('ident') || this.accept('not')) {
      pred = new nodes.Literal(pred.val.string || pred.val);

      this.skipSpacesAndComments();
      if (id = this.accept('ident')) {
        query.type = id.val;
        query.predicate = pred;
      } else {
        query.type = pred;
      }
      this.skipSpacesAndComments();

      if (!this.accept('&&')) return query;
    }

    do {
      query.push(this.feature());
    } while (this.accept('&&'));

    return query;
  },

  /**
   * '(' ident ( ':'? expression )? ')'
   */

  feature: function() {
    this.skipSpacesAndComments();
    this.expect('(');
    this.skipSpacesAndComments();
    var node = new nodes.Feature(this.interpolate());
    this.skipSpacesAndComments();
    this.accept(':')
    this.skipSpacesAndComments();
    this.inProperty = true;
    node.expr = this.expression();
    this.inProperty = false;
    this.skipSpacesAndComments();
    this.expect(')');
    this.skipSpacesAndComments();
    return node;
  },

  /**
   * @-moz-document call (',' call)* block
   */

  mozdocument: function(){
    this.expect('-moz-document');
    var mozdocument = new nodes.Atrule('-moz-document')
      , calls = [];
    do {
      this.skipSpacesAndComments();
      calls.push(this.functionCall());
      this.skipSpacesAndComments();
    } while (this.accept(','));
    mozdocument.segments = [new nodes.Literal(calls.join(', '))];
    this.state.push('atrule');
    mozdocument.block = this.block(mozdocument, false);
    this.state.pop();
    return mozdocument;
  },

  /**
   * import expression
   */
   
  atimport: function() {
    this.expect('import');
    this.allowPostfix = true;
    return new nodes.Import(this.expression(), false);
  },

  /**
   * require expression
   */

  require: function() {
    this.expect('require');
    this.allowPostfix = true;
    return new nodes.Import(this.expression(), true);
  },

  /**
   * charset string
   */

  charset: function() {
    this.expect('charset');
    var str = this.expect('string').val;
    this.allowPostfix = true;
    return new nodes.Charset(str);
  },

  /**
   * namespace ident? (string | url)
   */

  namespace: function() {
    var str
      , prefix;
    this.expect('namespace');

    this.skipSpacesAndComments();
    if (prefix = this.accept('ident')) {
      prefix = prefix.val;
    }
    this.skipSpacesAndComments();

    str = this.accept('string') || this.url();
    this.allowPostfix = true;
    return new nodes.Namespace(str, prefix);
  },

  /**
   * keyframes name block
   */

  keyframes: function() {
    var tok = this.expect('keyframes')
      , keyframes;

    this.skipSpacesAndComments();
    keyframes = new nodes.Keyframes(this.interpolate(), tok.val);
    this.skipSpacesAndComments();

    // block
    this.state.push('atrule');
    keyframes.block = this.block(keyframes);
    this.state.pop();

    return keyframes;
  },

  /**
   * literal
   */

  literal: function() {
    return this.expect('literal').val;
  },

  /**
   * ident space?
   */

  id: function() {
    var tok = this.expect('ident');
    this.accept('space');
    return tok.val;
  },

  /**
   *   ident
   * | assignment
   * | property
   * | selector
   */

  ident: function() {
    var i = 2
      , la = this.lookahead(i).type;

    while ('space' == la) la = this.lookahead(++i).type;

    switch (la) {
      // Assignment
      case '=':
      case '?=':
      case '-=':
      case '+=':
      case '*=':
      case '/=':
      case '%=':
        return this.assignment();
      // Member
      case '.':
        if ('space' == this.lookahead(i - 1).type) return this.selector();
        if (this._ident == this.peek()) return this.id();
        while ('=' != this.lookahead(++i).type
          && !~['[', ',', 'newline', 'indent', 'eos'].indexOf(this.lookahead(i).type)) ;
        if ('=' == this.lookahead(i).type) {
          this._ident = this.peek();
          return this.expression();
        } else if (this.looksLikeSelector() && this.stateAllowsSelector()) {
          return this.selector();
        }
      // Assignment []=
      case '[':
        if (this._ident == this.peek()) return this.id();
        while (']' != this.lookahead(i++).type
          && 'selector' != this.lookahead(i).type
          && 'eos' != this.lookahead(i).type) ;
        if ('=' == this.lookahead(i).type) {
          this._ident = this.peek();
          return this.expression();
        } else if (this.looksLikeSelector() && this.stateAllowsSelector()) {
          return this.selector();
        }
      // Operation
      case '-':
      case '+':
      case '/':
      case '*':
      case '%':
      case '**':
      case '&&':
      case '||':
      case '>':
      case '<':
      case '>=':
      case '<=':
      case '!=':
      case '==':
      case '?':
      case 'in':
      case 'is a':
      case 'is defined':
        // Prevent cyclic .ident, return literal
        if (this._ident == this.peek()) {
          return this.id();
        } else {
          this._ident = this.peek();
          switch (this.currentState()) {
            // unary op or selector in property / for
            case 'for':
            case 'selector':
              return this.property();
            // Part of a selector
            case 'root':
            case 'atblock':
            case 'atrule':
              return '[' == la
                ? this.subscript()
                : this.selector();
            case 'function':
            case 'conditional':
              return this.looksLikeSelector()
                ? this.selector()
                : this.expression();
            // Do not disrupt the ident when an operand
            default:
              return this.operand
                ? this.id()
                : this.expression();
          }
        }
      // Selector or property
      default:
        switch (this.currentState()) {
          case 'root':
            return this.selector();
          case 'for':
          case 'selector':
          case 'function':
          case 'conditional':
          case 'atblock':
          case 'atrule':
            return this.property();
          default:
            var id = this.id();
            if ('interpolation' == this.previousState()) id.mixin = true;
            return id;
        }
    }
  },

  /**
   * '*'? (ident | '{' expression '}')+
   */

  interpolate: function() {
    var node
      , segs = []
      , star;

    star = this.accept('*');
    if (star) segs.push(new nodes.Literal('*'));

    while (true) {
      if (this.accept('{')) {
        this.state.push('interpolation');
        segs.push(this.expression());
        this.expect('}');
        this.state.pop();
      } else if (node = this.accept('-')){
        segs.push(new nodes.Literal('-'));
      } else if (node = this.accept('ident')){
        segs.push(node.val);
      } else {
        break;
      }
    }
    if (!segs.length) this.expect('ident');
    return segs;
  },

  /**
   *   property ':'? expression
   * | ident
   */

  property: function() {
    if (this.looksLikeSelector(true)) return this.selector();

    // property
    var ident = this.interpolate()
      , prop = new nodes.Property(ident)
      , ret = prop;

    // optional ':'
    this.accept('space');
    if (this.accept(':')) this.accept('space');

    this.state.push('property');
    this.inProperty = true;
    prop.expr = this.list();
    if (prop.expr.isEmpty) ret = ident[0];
    this.inProperty = false;
    this.allowPostfix = true;
    this.state.pop();

    // optional ';'
    this.accept(';');

    return ret;
  },

  /**
   *   selector ',' selector
   * | selector newline selector
   * | selector block
   */

  selector: function() {
    var arr
      , group = new nodes.Group
      , scope = this.selectorScope
      , isRoot = 'root' == this.currentState()
      , selector;

    do {
      // Clobber newline after ,
      this.accept('newline');

      arr = this.selectorParts();

      // Push the selector
      if (isRoot && scope) arr.unshift(new nodes.Literal(scope + ' '));
      if (arr.length) {
        selector = new nodes.Selector(arr);
        selector.lineno = arr[0].lineno;
        selector.column = arr[0].column;
        group.push(selector);
      }
    } while (this.accept(',') || this.accept('newline'));

    this.state.push('selector');
    group.block = this.block(group);
    this.state.pop();

    return group;
  },

  selectorParts: function(){
    var tok
      , arr = [];

    // Selector candidates,
    // stitched together to
    // form a selector.
    while (tok = this.selectorToken()) {
      // Selector component
      switch (tok.type) {
        case '{':
          this.skipSpaces();
          var expr = this.expression();
          this.skipSpaces();
          this.expect('}');
          arr.push(expr);
          break;
        case this.prefix && '.':
          var literal = new nodes.Literal(tok.val + this.prefix);
          literal.prefixed = true;
          arr.push(literal);
          break;
        case 'comment':
          // ignore comments
          break;
        case 'color':
        case 'unit':
          arr.push(new nodes.Literal(tok.val.raw));
          break;
        case 'space':
          arr.push(new nodes.Literal(' '));
          break;
        case 'function':
          arr.push(new nodes.Literal(tok.val.name + '('));
          break;
        case 'ident':
          arr.push(new nodes.Literal(tok.val.name || tok.val.string));
          break;
        default:
          arr.push(new nodes.Literal(tok.val));
          if (tok.space) arr.push(new nodes.Literal(' '));
      }
    }

    return arr;
  },

  /**
   * ident ('=' | '?=') expression
   */

  assignment: function() {
    var op
      , node
      , name = this.id().name;

    if (op =
         this.accept('=')
      || this.accept('?=')
      || this.accept('+=')
      || this.accept('-=')
      || this.accept('*=')
      || this.accept('/=')
      || this.accept('%=')) {
      this.state.push('assignment');
      var expr = this.list();
      // @block support
      if (expr.isEmpty) this.assignAtblock(expr);
      node = new nodes.Ident(name, expr);
      this.state.pop();

      switch (op.type) {
        case '?=':
          var defined = new nodes.BinOp('is defined', node)
            , lookup = new nodes.Ident(name);
          node = new nodes.Ternary(defined, lookup, node);
          break;
        case '+=':
        case '-=':
        case '*=':
        case '/=':
        case '%=':
          node.val = new nodes.BinOp(op.type[0], new nodes.Ident(name), expr);
          break;
      }
    }

    return node;
  },

  /**
   *   definition
   * | call
   */
  
  fun: function() {
    var parens = 1
      , i = 2
      , tok;

    // Lookahead and determine if we are dealing
    // with a function call or definition. Here
    // we pair parens to prevent false negatives
    out:
    while (tok = this.lookahead(i++)) {
      switch (tok.type) {
        case 'function':
        case '(':
          ++parens;
          break;
        case ')':
          if (!--parens) break out;
          break;
        case 'eos':
          this.error('failed to find closing paren ")"');
      }
    }

    // Definition or call
    switch (this.currentState()) {
      case 'expression':
        return this.functionCall();
      default:
        return this.looksLikeFunctionDefinition(i)
          ? this.functionDefinition()
          : this.expression();
    }
  },

  /**
   * url '(' (expression | urlchars)+ ')'
   */

  url: function() {
    this.expect('function');
    this.state.push('function arguments');
    var args = this.args();
    this.expect(')');
    this.state.pop();
    return new nodes.Call('url', args);
  },

  /**
   * '+'? ident '(' expression ')' block?
   */

  functionCall: function() {
    var withBlock = this.accept('+');
    if ('url' == this.peek().val.name) return this.url();
    var name = this.expect('function').val.name;
    this.state.push('function arguments');
    this.parens++;
    var args = this.args();
    this.expect(')');
    this.parens--;
    this.state.pop();
    var call = new nodes.Call(name, args);
    if (withBlock) {
      this.state.push('function');
      call.block = this.block(call);
      this.state.pop();
    }
    return call;
  },

  /**
   * ident '(' params ')' block
   */

  functionDefinition: function() {
    var name = this.expect('function').val.name;

    // params
    this.state.push('function params');
    this.skipWhitespace();
    var params = this.params();
    this.skipWhitespace();
    this.expect(')');
    this.state.pop();

    // Body
    this.state.push('function');
    var fn = new nodes.Function(name, params);
    fn.block = this.block(fn);
    this.state.pop();
    return new nodes.Ident(name, fn);
  },

  /**
   *   ident
   * | ident '...'
   * | ident '=' expression
   * | ident ',' ident
   */

  params: function() {
    var tok
      , node
      , params = new nodes.Params;
    while (tok = this.accept('ident')) {
      this.accept('space');
      params.push(node = tok.val);
      if (this.accept('...')) {
        node.rest = true;
      } else if (this.accept('=')) {
        node.val = this.expression();
      }
      this.skipWhitespace();
      this.accept(',');
      this.skipWhitespace();
    }
    return params;
  },

  /**
   * (ident ':')? expression (',' (ident ':')? expression)*
   */

  args: function() {
    var args = new nodes.Arguments
      , keyword;

    do {
      // keyword
      if ('ident' == this.peek().type && ':' == this.lookahead(2).type) {
        keyword = this.next().val.string;
        this.expect(':');
        args.map[keyword] = this.expression();
      // arg
      } else {
        args.push(this.expression());
      }
    } while (this.accept(','));

    return args;
  },

  /**
   * expression (',' expression)*
   */

  list: function() {
    var node = this.expression();

    while (this.accept(',')) {
      if (node.isList) {
        list.push(this.expression());
      } else {
        var list = new nodes.Expression(true);
        list.push(node);
        list.push(this.expression());
        node = list;
      }
    }
    return node;
  },

  /**
   * negation+
   */

  expression: function() {
    var node
      , expr = new nodes.Expression;
    this.state.push('expression');
    while (node = this.negation()) {
      if (!node) this.error('unexpected token {peek} in expression');
      expr.push(node);
    }
    this.state.pop();
    if (expr.nodes.length) {
      expr.lineno = expr.nodes[0].lineno;
      expr.column = expr.nodes[0].column;
    }
    return expr;
  },

  /**
   *   'not' ternary
   * | ternary
   */

  negation: function() {
    if (this.accept('not')) {
      return new nodes.UnaryOp('!', this.negation());
    }
    return this.ternary();
  },

  /**
   * logical ('?' expression ':' expression)?
   */

  ternary: function() {
    var node = this.logical();
    if (this.accept('?')) {
      var trueExpr = this.expression();
      this.expect(':');
      var falseExpr = this.expression();
      node = new nodes.Ternary(node, trueExpr, falseExpr);
    }
    return node;
  },

  /**
   * typecheck (('&&' | '||') typecheck)*
   */

  logical: function() {
    var op
      , node = this.typecheck();
    while (op = this.accept('&&') || this.accept('||')) {
      node = new nodes.BinOp(op.type, node, this.typecheck());
    }
    return node;
  },

  /**
   * equality ('is a' equality)*
   */

  typecheck: function() {
    var op
      , node = this.equality();
    while (op = this.accept('is a')) {
      this.operand = true;
      if (!node) this.error('illegal unary "' + op + '", missing left-hand operand');
      node = new nodes.BinOp(op.type, node, this.equality());
      this.operand = false;
    }
    return node;
  },

  /**
   * in (('==' | '!=') in)*
   */

  equality: function() {
    var op
      , node = this.inop();
    while (op = this.accept('==') || this.accept('!=')) {
      this.operand = true;
      if (!node) this.error('illegal unary "' + op + '", missing left-hand operand');
      node = new nodes.BinOp(op.type, node, this.inop());
      this.operand = false;
    }
    return node;
  },

  /**
   * relational ('in' relational)*
   */

  inop: function() {
    var node = this.relational();
    while (this.accept('in')) {
      this.operand = true;
      if (!node) this.error('illegal unary "in", missing left-hand operand');
      node = new nodes.BinOp('in', node, this.relational());
      this.operand = false;
    }
    return node;
  },

  /**
   * range (('>=' | '<=' | '>' | '<') range)*
   */

  relational: function() {
    var op
      , node = this.range();
    while (op =
         this.accept('>=')
      || this.accept('<=')
      || this.accept('<')
      || this.accept('>')
      ) {
      this.operand = true;
      if (!node) this.error('illegal unary "' + op + '", missing left-hand operand');
      node = new nodes.BinOp(op.type, node, this.range());
      this.operand = false;
    }
    return node;
  },

  /**
   * additive (('..' | '...') additive)*
   */

  range: function() {
    var op
      , node = this.additive();
    if (op = this.accept('...') || this.accept('..')) {
      this.operand = true;
      if (!node) this.error('illegal unary "' + op + '", missing left-hand operand');
      node = new nodes.BinOp(op.val, node, this.additive());
      this.operand = false;
    }
    return node;
  },

  /**
   * multiplicative (('+' | '-') multiplicative)*
   */

  additive: function() {
    var op
      , node = this.multiplicative();
    while (op = this.accept('+') || this.accept('-')) {
      this.operand = true;
      node = new nodes.BinOp(op.type, node, this.multiplicative());
      this.operand = false;
    }
    return node;
  },

  /**
   * defined (('**' | '*' | '/' | '%') defined)*
   */

  multiplicative: function() {
    var op
      , node = this.defined();
    while (op =
         this.accept('**')
      || this.accept('*')
      || this.accept('/')
      || this.accept('%')) {
      this.operand = true;
      if ('/' == op && this.inProperty && !this.parens) {
        this.stash.push(new Token('literal', new nodes.Literal('/')));
        this.operand = false;
        return node;
      } else {
        if (!node) this.error('illegal unary "' + op + '", missing left-hand operand');
        node = new nodes.BinOp(op.type, node, this.defined());
        this.operand = false;
      }
    }
    return node;
  },

  /**
   *    unary 'is defined'
   *  | unary
   */

  defined: function() {
    var node = this.unary();
    if (this.accept('is defined')) {
      if (!node) this.error('illegal unary "is defined", missing left-hand operand');
      node = new nodes.BinOp('is defined', node);
    }
    return node;
  },

  /**
   *   ('!' | '~' | '+' | '-') unary
   * | subscript
   */

  unary: function() {
    var op
      , node;
    if (op =
         this.accept('!')
      || this.accept('~')
      || this.accept('+')
      || this.accept('-')) {
      this.operand = true;
      node = new nodes.UnaryOp(op.type, this.unary());
      this.operand = false;
      return node;
    }
    return this.subscript();
  },

  /**
   *   member ('[' expression ']' ('.' id)? '='?)+
   * | member
   */

  subscript: function() {
    var node = this.member()
      , id;
    while (this.accept('[')) {
      node = new nodes.BinOp('[]', node, this.expression());
      this.expect(']');
      if (this.accept('.')) {
        id = new nodes.Ident(this.expect('ident').val.string);
        node = new nodes.Member(node, id);
      }
      // TODO: TernaryOp :)
      if (this.accept('=')) {
        node.op += '=';
        node.val = this.expression();
        // @block support
        if (node.val.isEmpty) this.assignAtblock(node.val);
      }
    }
    return node;
  },

  /**
   *   primary ('.' id)+ '='?
   * | primary
   */
  
  member: function() {
    var node = this.primary();
    if (node) {
      while (this.accept('.')) {
        var id = new nodes.Ident(this.expect('ident').val.string);
        node = new nodes.Member(node, id);
      }
      this.skipSpaces();
      if (this.accept('=')) {
        node.val = this.expression();
        // @block support
        if (node.val.isEmpty) this.assignAtblock(node.val);
      }
    }
    return node;
  },

  /**
   *   '{' '}'
   * | '{' pair (ws pair)* '}'
   */

  object: function(){
    var obj = new nodes.Object
      , id, val, comma;
    this.expect('{');
    this.skipWhitespace();

    while (!this.accept('}')) {
      if (this.accept('comment')
        || this.accept('newline')) continue;

      if (!comma) this.accept(',');
      id = this.accept('ident') || this.accept('string');
      if (!id) this.error('expected "ident" or "string", got {peek}');
      id = id.val.hash;
      this.skipSpacesAndComments();
      this.expect(':');
      val = this.expression();
      obj.set(id, val);
      comma = this.accept(',');
      this.skipWhitespace();
    }

    return obj;
  },

  /**
   *   unit
   * | null
   * | color
   * | string
   * | ident
   * | boolean
   * | literal
   * | object
   * | atblock
   * | atrule
   * | '(' expression ')' '%'?
   */

  primary: function() {
    var tok;
    this.skipSpacesAndComments();

    // Parenthesis
    if (this.accept('(')) {
      ++this.parens;
      var expr = this.expression()
        , paren = this.expect(')');
      --this.parens;
      if (this.accept('%')) expr.push(new nodes.Ident('%'));
      tok = this.peek();
      // (1 + 2)px, (1 + 2)em, etc.
      if (!paren.space
        && 'ident' == tok.type
        && ~units.indexOf(tok.val.string)) {
        expr.push(new nodes.Ident(tok.val.string));
        this.next();
      }
      return expr;
    }

    tok = this.peek();

    // Primitive
    switch (tok.type) {
      case 'null':
      case 'unit':
      case 'color':
      case 'string':
      case 'literal':
      case 'boolean':
        return this.next().val;
      case !this.cond && '{':
        return this.object();
      case 'atblock':
        return this.atblock();
      // property lookup
      case 'atrule':
        var id = new nodes.Ident(this.next().val);
        id.property = true;
        return id;
      case 'ident':
        return this.ident();
      case 'function':
        return tok.anonymous
          ? this.functionDefinition()
          : this.functionCall();
    }
  }
};


});// module: parser.js


require.register("renderer.js", function(module, exports, require){


/*!
 * Stylus - Renderer
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Parser = require('./parser')
  , Evaluator = require('./visitor/evaluator')
  , Normalizer = require('./visitor/normalizer')
  , utils = require('./utils')
  , nodes = require('./nodes')
  , join = require('./path').join;

/**
 * Expose `Renderer`.
 */

module.exports = Renderer;

/**
 * Initialize a new `Renderer` with the given `str` and `options`.
 *
 * @param {String} str
 * @param {Object} options
 * @api public
 */

function Renderer(str, options) {
  options = options || {};
  options.globals = options.globals || {};
  options.functions = options.functions || {};
  options.use = options.use || [];
  options.use = Array.isArray(options.use) ? options.use : [options.use];
  options.imports = [];
  options.paths = options.paths || [];
  options.filename = options.filename || 'stylus';
  options.Evaluator = options.Evaluator || Evaluator;
  this.options = options;
  this.str = str;
};

/**
 * Parse and evaluate AST, then callback `fn(err, css, js)`.
 *
 * @param {Function} fn
 * @api public
 */

Renderer.prototype.render = function(fn){
  var parser = this.parser = new Parser(this.str, this.options);

  // use plugin(s)
  for (var i = 0, len = this.options.use.length; i < len; i++) {
    this.use(this.options.use[i]);
  }

  try {
    nodes.filename = this.options.filename;
    // parse
    var ast = parser.parse();

    // evaluate
    this.evaluator = new this.options.Evaluator(ast, this.options);
    this.nodes = nodes;
    this.evaluator.renderer = this;
    ast = this.evaluator.evaluate();

    // normalize
    var normalizer = new Normalizer(ast, this.options);
    ast = normalizer.normalize();

    // compile
    var compiler = this.options.sourcemap
      ? new (require('./visitor/sourcemapper'))(ast, this.options)
      : new (require('./visitor/compiler'))(ast, this.options)
      , css = compiler.compile();

    // expose sourcemap
    if (this.options.sourcemap) this.sourcemap = compiler.map.toJSON();

    if (!fn) return css;
    fn(null, css);
  } catch (err) {
    var options = {};
    options.input = err.input || this.str;
    options.filename = err.filename || this.options.filename;
    options.lineno = err.lineno || parser.lexer.prev.lineno;
    options.column = err.column || parser.lexer.prev.column;
    if (!fn) throw utils.formatException(err, options);
    fn(utils.formatException(err, options));
  }
};

/**
 * Get dependencies of the compiled file.
 *
 * @param {String} [filename]
 * @return {Array}
 * @api public
 */

Renderer.prototype.deps = function(filename){
  if (filename) this.options.filename = filename;

  var DepsResolver = require('./visitor/deps-resolver')
    , parser = new Parser(this.str, this.options);

  try {
    nodes.filename = this.options.filename;
    // parse
    var ast = parser.parse()
      , resolver = new DepsResolver(ast, this.options);

    // resolve dependencies
    return resolver.resolve();
  } catch (err) {
    var options = {};
    options.input = err.input || this.str;
    options.filename = err.filename || this.options.filename;
    options.lineno = err.lineno || parser.lexer.prev.lineno;
    options.column = err.column || parser.lexer.prev.column;
    throw utils.formatException(err, options);
  }
};

/**
 * Set option `key` to `val`.
 *
 * @param {String} key
 * @param {Mixed} val
 * @return {Renderer} for chaining
 * @api public
 */

Renderer.prototype.set = function(key, val){
  this.options[key] = val;
  return this;
};

/**
 * Get option `key`.
 *
 * @param {String} key
 * @return {Mixed} val
 * @api public
 */

Renderer.prototype.get = function(key){
  return this.options[key];
};

/**
 * Include the given `path` to the lookup paths array.
 *
 * @param {String} path
 * @return {Renderer} for chaining
 * @api public
 */

Renderer.prototype.include = function(path){
  this.options.paths.push(path);
  return this;
};

/**
 * Use the given `fn`.
 *
 * This allows for plugins to alter the renderer in
 * any way they wish, exposing paths etc.
 *
 * @param {Function}
 * @return {Renderer} for chaining
 * @api public
 */

Renderer.prototype.use = function(fn){
  fn.call(this, this);
  return this;
};

/**
 * Define function or global var with the given `name`. Optionally
 * the function may accept full expressions, by setting `raw`
 * to `true`.
 *
 * @param {String} name
 * @param {Function|Node} fn
 * @return {Renderer} for chaining
 * @api public
 */

Renderer.prototype.define = function(name, fn, raw){
  fn = utils.coerce(fn, raw);

  if (fn.nodeName) {
    this.options.globals[name] = fn;
    return this;
  }

  // function
  this.options.functions[name] = fn;
  if (undefined != raw) fn.raw = raw;
  return this;
};

/**
 * Import the given `file`.
 *
 * @param {String} file
 * @return {Renderer} for chaining
 * @api public
*/
 
Renderer.prototype.import = function(file){
  this.options.imports.push(file);
  return this;
};




});// module: renderer.js


require.register("stack/index.js", function(module, exports, require){


/*!
 * Stylus - Stack
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Stack`.
 *
 * @api private
 */

var Stack = module.exports = function Stack() {
  Array.apply(this, arguments);
};

/**
 * Inherit from `Array.prototype`.
 */

Stack.prototype.__proto__ = Array.prototype;

/**
 * Push the given `frame`.
 *
 * @param {Frame} frame
 * @api public
 */

Stack.prototype.push = function(frame){
  frame.stack = this;
  frame.parent = this.currentFrame;
  return [].push.apply(this, arguments);
};

/**
 * Return the current stack `Frame`.
 *
 * @return {Frame}
 * @api private
 */

Stack.prototype.__defineGetter__('currentFrame', function(){
  return this[this.length - 1];
});

/**
 * Lookup stack frame for the given `block`.
 *
 * @param {Block} block
 * @return {Frame}
 * @api private
 */

Stack.prototype.getBlockFrame = function(block){
  for (var i = 0; i < this.length; ++i) {
    if (block == this[i].block) {
      return this[i];
    }
  }
};

/**
 * Lookup the given local variable `name`, relative
 * to the lexical scope of the current frame's `Block`.
 *
 * When the result of a lookup is an identifier
 * a recursive lookup is performed, defaulting to
 * returning the identifier itself.
 *
 * @param {String} name
 * @return {Node}
 * @api private
 */

Stack.prototype.lookup = function(name){
  var block = this.currentFrame.block
    , val
    , ret;

  do {
    var frame = this.getBlockFrame(block);
    if (frame && (val = frame.lookup(name))) {
      return val;
    }
  } while (block = block.parent);
};

/**
 * Custom inspect.
 *
 * @return {String}
 * @api private
 */

Stack.prototype.inspect = function(){
  return this.reverse().map(function(frame){
    return frame.inspect();
  }).join('\n');
};

/**
 * Return stack string formatted as:
 *
 *   at <context> (<filename>:<lineno>:<column>)
 *
 * @return {String}
 * @api private
 */

Stack.prototype.toString = function(){
  var block
    , node
    , buf = []
    , location
    , len = this.length;

  while (len--) {
    block = this[len].block;
    if (node = block.node) {
      location = '(' + node.filename + ':' + (node.lineno + 1) + ':' + node.column + ')';
      switch (node.nodeName) {
        case 'function':
          buf.push('    at ' + node.name + '() ' + location);
          break;
        case 'group':
          buf.push('    at "' + node.nodes[0].val + '" ' + location);
          break;
      }
    }
  }

  return buf.join('\n');
};


});// module: stack/index.js


require.register("stack/frame.js", function(module, exports, require){


/*!
 * Stylus - stack - Frame
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Scope = require('./scope');

/**
 * Initialize a new `Frame` with the given `block`.
 *
 * @param {Block} block
 * @api private
 */

var Frame = module.exports = function Frame(block) {
  this._scope = false === block.scope
    ? null
    : new Scope;
  this.block = block;
};

/**
 * Return this frame's scope or the parent scope
 * for scope-less blocks.
 *
 * @return {Scope}
 * @api public
 */

Frame.prototype.__defineGetter__('scope', function(){
  return this._scope || this.parent.scope;
});

/**
 * Lookup the given local variable `name`.
 *
 * @param {String} name
 * @return {Node}
 * @api private
 */

Frame.prototype.lookup = function(name){
  return this.scope.lookup(name)
};

/**
 * Custom inspect.
 *
 * @return {String}
 * @api public
 */

Frame.prototype.inspect = function(){
  return '[Frame '
    + (false === this.block.scope
        ? 'scope-less'
        : this.scope.inspect())
    + ']';
};


});// module: stack/frame.js


require.register("stack/scope.js", function(module, exports, require){


/*!
 * Stylus - stack - Scope
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Scope`.
 *
 * @api private
 */

var Scope = module.exports = function Scope() {
  this.locals = {};
};

/**
 * Add `ident` node to the current scope.
 *
 * @param {Ident} ident
 * @api private
 */

Scope.prototype.add = function(ident){
  this.locals[ident.name] = ident.val;
};

/**
 * Lookup the given local variable `name`.
 *
 * @param {String} name
 * @return {Node}
 * @api private
 */

Scope.prototype.lookup = function(name){
  return this.locals[name];
};

/**
 * Custom inspect.
 *
 * @return {String}
 * @api public
 */

Scope.prototype.inspect = function(){
  var keys = Object.keys(this.locals).map(function(key){ return '@' + key; });
  return '[Scope'
    + (keys.length ? ' ' + keys.join(', ') : '')
    + ']';
};


});// module: stack/scope.js


require.register("stylus.js", function(module, exports, require){

/*!
 * Stylus
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Renderer = require('./renderer')
  , nodes = require('./nodes')
  , utils = require('./utils');

/**
 * Export render as the module.
 */

exports = module.exports = render;

/**
 * Library version.
 */

exports.version = '0.49.2';

/**
 * Expose nodes.
 */

exports.nodes = nodes;

/**
 * Expose BIFs.
 */

exports.functions = require('./functions');

/**
 * Expose utils.
 */

exports.utils = require('./utils');

/**
 * Expose constructors.
 */

exports.Visitor = require('./visitor');
exports.Parser = require('./parser');
exports.Evaluator = require('./visitor/evaluator');
exports.Compiler = require('./visitor/compiler');

/**
 * Render the given `str` with `options` and callback `fn(err, css)`.
 *
 * @param {String} str
 * @param {Object|Function} options
 * @param {Function} fn
 * @api public
 */

exports.render = function(str, options, fn){
  if ('function' == typeof options) fn = options, options = {};
  //if (bifs) str = bifs + str;
  return new Renderer(str, options).render(fn);
};

/**
 * Return a new `Renderer` for the given `str` and `options`.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Renderer}
 * @api public
 */

function render(str, options) {
  //if (bifs) str = bifs + str;
  return new Renderer(str, options);
}

/**
 * Expose optional functions.
 */

exports.url = require('./functions/url');


});// module: stylus.js


require.register("token.js", function(module, exports, require){


/*!
 * Stylus - Token
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Token` with the given `type` and `val`.
 *
 * @param {String} type
 * @param {Mixed} val
 * @api private
 */

var Token = exports = module.exports = function Token(type, val) {
  this.type = type;
  this.val = val;
};

/**
 * Custom inspect.
 *
 * @return {String}
 * @api public
 */

Token.prototype.inspect = function(){
  var val = ' ' + this.val;
  return '[Token:' + this.lineno + ':' + this.column + ' '
    + '\x1b[32m' + this.type + '\x1b[0m'
    + '\x1b[33m' + (this.val ? val : '') + '\x1b[0m'
    + ']';
};

/**
 * Return type or val.
 *
 * @return {String}
 * @api public
 */

Token.prototype.toString = function(){
  return (undefined === this.val
    ? this.type
    : this.val).toString();
};


});// module: token.js


require.register("utils.js", function(module, exports, require){


/*!
 * Stylus - utils
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var nodes = require('./nodes')
  , join = require('./path').join
  , path = require('./path');

/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

exports.absolute = function(path){
  // On Windows the path could start with a drive letter, i.e. a:\\ or two leading backslashes
  return path.substr(0, 2) == '\\\\' || '/' === path.charAt(0) || /^[a-z]:\\/i.test(path);
};

/**
 * Attempt to lookup `path` within `paths` from tail to head.
 * Optionally a path to `ignore` may be passed.
 *
 * @param {String} path
 * @param {String} paths
 * @param {String} ignore
 * @param {Boolean} resolveURL
 * @return {String}
 * @api private
 */

exports.lookup = function(targetPath, paths, ignore, resolveURL){
  var lookup
    , method = resolveURL ? path.resolve : path.join
    , i = paths.length;

  // Absolute
  if (exports.absolute(targetPath)) {
    try {
      fs.statSync(targetPath);
      return targetPath;
    } catch (err) {
      // Ignore, continue on
      // to trying relative lookup.
      // Needed for url(/images/foo.png)
      // for example
    }
  }

  // Relative
  while (i--) {
    try {
      lookup = method(paths[i], targetPath);
      if (ignore == lookup) continue;
      fs.statSync(lookup);
      return lookup;
    } catch (err) {
      // Ignore
    }
  }
};

/**
 * Like `utils.lookup` but uses `glob` to find files.
 *
 * @param {String} path
 * @param {String} paths
 * @param {String} ignore
 * @return {Array}
 * @api private
 */
exports.find = function(path, paths, ignore) {
  var lookup
    , found
    , i = paths.length;

  // Absolute
  if (exports.absolute(path)) {
    if ((found = glob.sync(path)).length) {
      return found;
    }
  }

  // Relative
  while (i--) {
    lookup = join(paths[i], path);
    if (ignore == lookup) continue;
    if ((found = glob.sync(lookup)).length) {
      return found;
    }
  }
};

/**
 * Lookup index file inside dir with given `name`.
 *
 * @param {String} name
 * @return {Array}
 * @api private
 */

exports.lookupIndex = function(name, paths, filename){
  // foo/index.styl
  var found = exports.find(join(name, 'index.styl'), paths, filename);
  if (!found) {
    // foo/foo.styl
    found = exports.find(join(name, path.basename(name).replace(/\.styl/i, '') + '.styl'), paths, filename);
  }
  if (!found && !~name.indexOf('node_modules')) {
    // node_modules/foo/.. or node_modules/foo.styl/..
    found = lookupPackage(join('node_modules', name));
  }
  return found;

  function lookupPackage(dir) {
    var package = exports.lookup(join(dir, 'package.json'), paths, filename);
    if (!package) {
      return /\.styl$/i.test(dir) ? exports.lookupIndex(dir, paths, filename) : lookupPackage(dir + '.styl');
    }
    var main = require(path.relative(__dirname, package)).main;
    if (main) {
      found = exports.find(join(dir, main), paths, filename);
    } else {
      found = exports.lookupIndex(dir, paths, filename);
    }
    return found;
  }
};

/**
 * Format the given `err` with the given `options`.
 *
 * Options:
 *
 *   - `filename`   context filename
 *   - `context`    context line count [8]
 *   - `lineno`     context line number
 *   - `column`     context column number
 *   - `input`        input string
 *
 * @param {Error} err
 * @param {Object} options
 * @return {Error}
 * @api private
 */

exports.formatException = function(err, options){
  var lineno = options.lineno
    , column = options.column
    , filename = options.filename
    , str = options.input
    , context = options.context || 8
    , context = context / 2
    , lines = ('\n' + str).split('\n')
    , start = Math.max(lineno - context, 1)
    , end = Math.min(lines.length, lineno + context)
    , pad = end.toString().length;

  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start;
    return '   '
      + Array(pad - curr.toString().length + 1).join(' ')
      + curr
      + '| '
      + line
      + (curr == lineno
        ? '\n' + Array(curr.toString().length + 5 + column).join('-') + '^'
        : '');
  }).join('\n');

  // Don't show JS stack trace for Stylus errors
  if (err.fromStylus) err.stack = '';

  err.message = filename
    + ':' + lineno
    + ':' + column
    + '\n' + context
    + '\n\n' + err.message + '\n'
    + (err.stylusStack ? err.stylusStack + '\n' : '');

  return err;
};

/**
 * Assert that `node` is of the given `type`, or throw.
 *
 * @param {Node} node
 * @param {Function} type
 * @param {String} param
 * @api public
 */

exports.assertType = function(node, type, param){
  exports.assertPresent(node, param);
  if (node.nodeName == type) return;
  var actual = node.nodeName
    , msg = 'expected "'
      + param + '" to be a '
      + type + ', but got '
      + actual + ':' + node;
  throw new Error('TypeError: ' + msg);
};

/**
 * Assert that `node` is a `String` or `Ident`.
 *
 * @param {Node} node
 * @param {String} param
 * @api public
 */

exports.assertString = function(node, param){
  exports.assertPresent(node, param);
  switch (node.nodeName) {
    case 'string':
    case 'ident':
    case 'literal':
      return;
    default:
      var actual = node.nodeName
        , msg = 'expected string, ident or literal, but got ' + actual + ':' + node;
      throw new Error('TypeError: ' + msg);
  }
};

/**
 * Assert that `node` is a `RGBA` or `HSLA`.
 *
 * @param {Node} node
 * @param {String} param
 * @api public
 */

exports.assertColor = function(node, param){
  exports.assertPresent(node, param);
  switch (node.nodeName) {
    case 'rgba':
    case 'hsla':
      return;
    default:
      var actual = node.nodeName
        , msg = 'expected rgba or hsla, but got ' + actual + ':' + node;
      throw new Error('TypeError: ' + msg);
  }
};

/**
 * Assert that param `name` is given, aka the `node` is passed.
 *
 * @param {Node} node
 * @param {String} name
 * @api public
 */

exports.assertPresent = function(node, name){
  if (node) return;
  if (name) throw new Error('"' + name + '" argument required');
  throw new Error('argument missing');
};

/**
 * Unwrap `expr`.
 *
 * Takes an expressions with length of 1
 * such as `((1 2 3))` and unwraps it to `(1 2 3)`.
 *
 * @param {Expression} expr
 * @return {Node}
 * @api public
 */

exports.unwrap = function(expr){
  // explicitly preserve the expression
  if (expr.preserve) return expr;
  if ('arguments' != expr.nodeName && 'expression' != expr.nodeName) return expr;
  if (1 != expr.nodes.length) return expr;
  if ('arguments' != expr.nodes[0].nodeName && 'expression' != expr.nodes[0].nodeName) return expr;
  return exports.unwrap(expr.nodes[0]);
};

/**
 * Coerce JavaScript values to their Stylus equivalents.
 *
 * @param {Mixed} val
 * @param {Boolean} [raw]
 * @return {Node}
 * @api public
 */

exports.coerce = function(val, raw){
  switch (typeof val) {
    case 'function':
      return val;
    case 'string':
      return new nodes.String(val);
    case 'boolean':
      return new nodes.Boolean(val);
    case 'number':
      return new nodes.Unit(val);
    default:
      if (null == val) return nodes.nil;
      if (Array.isArray(val)) return exports.coerceArray(val, raw);
      if (val.nodeName) return val;
      return exports.coerceObject(val, raw);
  }
};

/**
 * Coerce a javascript `Array` to a Stylus `Expression`.
 *
 * @param {Array} val
 * @param {Boolean} [raw]
 * @return {Expression}
 * @api private
 */

exports.coerceArray = function(val, raw){
  var expr = new nodes.Expression;
  val.forEach(function(val){
    expr.push(exports.coerce(val, raw));
  });
  return expr;
};

/**
 * Coerce a javascript object to a Stylus `Expression` or `Object`.
 *
 * For example `{ foo: 'bar', bar: 'baz' }` would become
 * the expression `(foo 'bar') (bar 'baz')`. If `raw` is true
 * given `obj` would become a Stylus hash object.
 *
 * @param {Object} obj
 * @param {Boolean} [raw]
 * @return {Expression|Object}
 * @api public
 */

exports.coerceObject = function(obj, raw){
  var node = raw ? new nodes.Object : new nodes.Expression
    , val;

  for (var key in obj) {
    val = exports.coerce(obj[key], raw);
    key = new nodes.Ident(key);
    if (raw) {
      node.set(key, val);
    } else {
      node.push(exports.coerceArray([key, val]));
    }
  }

  return node;
};

/**
 * Return param names for `fn`.
 *
 * @param {Function} fn
 * @return {Array}
 * @api private
 */

exports.params = function(fn){
  return fn
    .toString()
    .match(/\(([^)]*)\)/)[1].split(/ *, */);
};

/**
 * Merge object `b` with `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function(a, b){
  for (var k in b) a[k] = b[k];
  return a;
};

/**
 * Returns an array with unique values.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

exports.uniq = function(arr){
  var obj = {}
    , ret = [];

  for (var i = 0, len = arr.length; i < len; ++i) {
    if (arr[i] in obj) continue;

    obj[arr[i]] = true;
    ret.push(arr[i]);
  }
  return ret;
};

/**
 * Compile selector strings in `arr` from the bottom-up
 * to produce the selector combinations. For example
 * the following Stylus:
 *
 *    ul
 *      li
 *      p
 *        a
 *          color: red
 *
 * Would return:
 *
 *      [ 'ul li a', 'ul p a' ]
 *
 * @param {Array} arr
 * @param {Boolean} leaveHidden
 * @return {Array}
 * @api private
 */

var HIDDEN_SELECTOR_RX = /^\s*\/?\$/
  , ROOT_SELECTOR_RX = /^\//g
  , PARENT_SELECTOR_RX = /^&|([^\\])&/g
  , ESCAPED_PARENT_SELECTOR_RX = /\\&/g;

exports.compileSelectors = function(arr, leaveHidden){
  var self = this
    , selectors = []
    , buf = [];

  function interpolateParent(selector, buf) {
    var str = selector.val.replace(ROOT_SELECTOR_RX, '').trim();
    if (buf.length) {
      for (var i = 0, len = buf.length; i < len; ++i) {
        if (~buf[i].indexOf('&') || '/' === buf[i].charAt(0)) {
          str = buf[i].replace(PARENT_SELECTOR_RX, '$1' + str).replace(ROOT_SELECTOR_RX, '').trim();
        } else {
          str += ' ' + buf[i].trim();
        }
      }
    }
    return str.trim();
  }

  function compile(arr, i) {
    if (i) {
      arr[i].forEach(function(selector){
        if (!leaveHidden && selector.val.match(HIDDEN_SELECTOR_RX)) return;
        if (selector.inherits) {
          buf.unshift(selector.val);
          compile(arr, i - 1);
          buf.shift();
        } else {
          selectors.push(interpolateParent(selector, buf));
        }
      });
    } else {
      arr[0].forEach(function(selector){
        if (!leaveHidden && selector.val.match(HIDDEN_SELECTOR_RX)) return;
        var str = interpolateParent(selector, buf);
        if (~str.indexOf('&')) str = str.replace(PARENT_SELECTOR_RX, '$1').replace(ESCAPED_PARENT_SELECTOR_RX, '&').trim();
        if (!str.length) return;
        selectors.push((self.indent || '') + str.trimRight());
      });
    }
  }

  compile(arr, arr.length - 1);

  // Return the list with unique selectors only
  return exports.uniq(selectors);
};


});// module: utils.js


require.register("visitor/index.js", function(module, exports, require){


/*!
 * Stylus - Visitor
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Visitor` with the given `root` Node.
 *
 * @param {Node} root
 * @api private
 */

var Visitor = module.exports = function Visitor(root) {
  this.root = root;
};

/**
 * Visit the given `node`.
 *
 * @param {Node|Array} node
 * @api public
 */

Visitor.prototype.visit = function(node, fn){
  var method = 'visit' + node.constructor.name;
  if (this[method]) return this[method](node);
  return node;
};



});// module: visitor/index.js


require.register("visitor/compiler.js", function(module, exports, require){

/*!
 * Stylus - Compiler
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Visitor = require('./index')
  , utils = require('../utils');

/**
 * Initialize a new `Compiler` with the given `root` Node
 * and the following `options`.
 *
 * Options:
 *
 *   - `compress`  Compress the CSS output (default: false)
 *
 * @param {Node} root
 * @api public
 */

var Compiler = module.exports = function Compiler(root, options) {
  options = options || {};
  this.compress = options.compress;
  this.firebug = options.firebug;
  this.linenos = options.linenos;
  this.spaces = options['indent spaces'] || 2;
  this.includeCSS = options['include css'];
  this.indents = 1;
  Visitor.call(this, root);
  this.stack = [];
};

/**
 * Inherit from `Visitor.prototype`.
 */

Compiler.prototype.__proto__ = Visitor.prototype;

/**
 * Compile to css, and return a string of CSS.
 *
 * @return {String}
 * @api private
 */

Compiler.prototype.compile = function(){
  return this.visit(this.root);
};

/**
 * Output `str`
 *
 * @param {String} str
 * @param {Node} node
 * @return {String}
 * @api private
 */

Compiler.prototype.out = function(str, node){
  return str;
};

/**
 * Return indentation string.
 *
 * @return {String}
 * @api private
 */

Compiler.prototype.__defineGetter__('indent', function(){
  if (this.compress) return '';
  return new Array(this.indents).join(Array(this.spaces + 1).join(' '));
});

/**
 * Check if given `node` needs brackets.
 *
 * @param {Node} node
 * @return {Boolean}
 * @api private
 */

Compiler.prototype.needBrackets = function(node){
  return 1 == this.indents
    || 'atrule' != node.nodeName
    || node.hasOnlyProperties;
};

/**
 * Visit Root.
 */

Compiler.prototype.visitRoot = function(block){
  this.buf = '';
  for (var i = 0, len = block.nodes.length; i < len; ++i) {
    var node = block.nodes[i];
    if (this.linenos || this.firebug) this.debugInfo(node);
    var ret = this.visit(node);
    if (ret) this.buf += this.out(ret + '\n', node);
  }
  return this.buf;
};

/**
 * Visit Block.
 */

Compiler.prototype.visitBlock = function(block){
  var node
    , separator = this.compress ? '' : '\n'
    , needBrackets;

  if (block.hasProperties && !block.lacksRenderedSelectors) {
    needBrackets = this.needBrackets(block.node);

    if (needBrackets) {
      this.buf += this.out(this.compress ? '{' : ' {\n');
      ++this.indents;
    }
    for (var i = 0, len = block.nodes.length; i < len; ++i) {
      this.last = len - 1 == i;
      node = block.nodes[i];
      switch (node.nodeName) {
        case 'null':
        case 'expression':
        case 'function':
        case 'group':
        case 'block':
        case 'unit':
        case 'media':
        case 'keyframes':
        case 'atrule':
        case 'supports':
          continue;
        // inline comments
        case !this.compress && node.inline && 'comment':
          this.buf = this.buf.slice(0, -1);
          this.buf += this.out(' ' + this.visit(node) + '\n', node);
          break;
        case 'property':
          var ret = this.visit(node) + separator;
          this.buf += this.compress ? ret : this.out(ret, node);
          break;
        default:
          this.buf += this.out(this.visit(node) + separator, node);
      }
    }
    if (needBrackets) {
      --this.indents;
      this.buf += this.out(this.indent + '}' + separator);
    }
  }

  // Nesting
  for (var i = 0, len = block.nodes.length; i < len; ++i) {
    node = block.nodes[i];
    switch (node.nodeName) {
      case 'group':
      case 'block':
      case 'keyframes':
        if (this.linenos || this.firebug) this.debugInfo(node);
        this.visit(node);
        break;
      case 'media':
      case 'import':
      case 'atrule':
      case 'supports':
        this.visit(node);
        break;
      case 'comment':
        // only show comments inside when outside of scope and unsuppressed
        if (!block.scope && !node.suppress) {
          this.buf += this.out(this.visit(node) + '\n', node);
        }
        break;
      case 'literal':
        this.buf += this.out(this.visit(node) + '\n', node);
        break;
    }
  }
};

/**
 * Visit Keyframes.
 */

Compiler.prototype.visitKeyframes = function(node){
  if (!node.frames) return;

  var prefix = 'official' == node.prefix
    ? ''
    : '-' + node.prefix + '-';

  this.buf += this.out('@' + prefix + 'keyframes '
    + this.visit(node.val)
    + (this.compress ? '{' : ' {\n'), node);

  this.keyframe = true;
  ++this.indents;
  this.visit(node.block);
  --this.indents;
  this.keyframe = false;

  this.buf += this.out('}' + (this.compress ? '' : '\n'));
};

/**
 * Visit Media.
 */

Compiler.prototype.visitMedia = function(media){
  var val = media.val;
  if (!media.hasProperties || !val.nodes.length) return;

  this.buf += this.out('@media ', media);
  this.visit(val);
  this.buf += this.out(this.compress ? '{' : ' {\n');
  ++this.indents;
  this.visit(media.block);
  --this.indents;
  this.buf += this.out('}' + (this.compress ? '' : '\n'));
};

/**
 * Visit QueryList.
 */

Compiler.prototype.visitQueryList = function(queries){
  for (var i = 0, len = queries.nodes.length; i < len; ++i) {
    this.visit(queries.nodes[i]);
    if (len - 1 != i) this.buf += this.out(',' + (this.compress ? '' : ' '));
  }
};

/**
 * Visit Query.
 */

Compiler.prototype.visitQuery = function(node){
  var len = node.nodes.length;
  if (node.predicate) this.buf += this.out(node.predicate + ' ');
  if (node.type) this.buf += this.out(node.type + (len ? ' and ' : ''));
  for (var i = 0; i < len; ++i) {
    this.buf += this.out(this.visit(node.nodes[i]));
    if (len - 1 != i) this.buf += this.out(' and ');
  }
};

/**
 * Visit Feature.
 */

Compiler.prototype.visitFeature = function(node){
  if (!node.expr) {
    return node.name;
  } else if (node.expr.isEmpty) {
    return '(' + node.name + ')';
  } else {
    return '(' + node.name + ':' + (this.compress ? '' : ' ') + this.visit(node.expr) + ')';
  }
};

/**
 * Visit Import.
 */

Compiler.prototype.visitImport = function(imported){
  this.buf += this.out('@import ' + this.visit(imported.path) + ';\n', imported);
};

/**
 * Visit Atrule.
 */

Compiler.prototype.visitAtrule = function(atrule){
  this.buf += this.out(this.indent + '@' + atrule.type, atrule);

  if (atrule.val) this.buf += this.out(' ' + atrule.val.trim());

  if (atrule.hasOnlyProperties) {
    this.visit(atrule.block);
  } else {
    this.buf += this.out(this.compress ? '{' : ' {\n');
    ++this.indents;
    this.visit(atrule.block);
    --this.indents;
    this.buf += this.out(this.indent + '}' + (this.compress ? '' : '\n'));
  }
};

/**
 * Visit Supports.
 */

Compiler.prototype.visitSupports = function(node){
  if (!node.hasProperties) return;

  this.buf += this.out(this.indent + '@supports ', node);
  this.isCondition = true;
  this.buf += this.out(this.visit(node.condition));
  this.isCondition = false;
  this.buf += this.out(this.compress ? '{' : ' {\n');
  ++this.indents;
  this.visit(node.block);
  --this.indents;
  this.buf += this.out(this.indent + '}' + (this.compress ? '' : '\n'));
},

/**
 * Visit Comment.
 */

Compiler.prototype.visitComment = function(comment){
  return this.compress
    ? comment.suppress
      ? ''
      : comment.str
    : comment.str;
};

/**
 * Visit Function.
 */

Compiler.prototype.visitFunction = function(fn){
  return fn.name;
};

/**
 * Visit Charset.
 */

Compiler.prototype.visitCharset = function(charset){
  return '@charset ' + this.visit(charset.val) + ';';
};

/**
 * Visit Namespace.
 */

Compiler.prototype.visitNamespace = function(namespace){
  return '@namespace '
    + (namespace.prefix ? this.visit(namespace.prefix) + ' ' : '')
    + this.visit(namespace.val) + ';';
};

/**
 * Visit Literal.
 */

Compiler.prototype.visitLiteral = function(lit){
  var val = lit.val;
  if (lit.css) val = val.replace(/^  /gm, '');
  return val;
};

/**
 * Visit Boolean.
 */

Compiler.prototype.visitBoolean = function(bool){
  return bool.toString();
};

/**
 * Visit RGBA.
 */

Compiler.prototype.visitRGBA = function(rgba){
  return rgba.toString();
};

/**
 * Visit HSLA.
 */

Compiler.prototype.visitHSLA = function(hsla){
  return hsla.rgba.toString();
};

/**
 * Visit Unit.
 */

Compiler.prototype.visitUnit = function(unit){
  var type = unit.type || ''
    , n = unit.val
    , float = n != (n | 0);

  // Compress
  if (this.compress) {
    // Always return '0' unless the unit is a percentage or time
    if ('%' != type && 's' != type && 'ms' != type && 0 == n) return '0';
    // Omit leading '0' on floats
    if (float && n < 1 && n > -1) {
      return n.toString().replace('0.', '.') + type;
    }
  }

  return n.toString() + type;
};

/**
 * Visit Group.
 */

Compiler.prototype.visitGroup = function(group){
  var stack = this.keyframe ? [] : this.stack
    , comma = this.compress ? ',' : ',\n';

  stack.push(group.nodes);

  // selectors
  if (group.block.hasProperties) {
    var selectors = utils.compileSelectors.call(this, stack)
      , len = selectors.length;

    if (len) {
      if (this.keyframe) comma = this.compress ? ',' : ', ';

      for (var i = 0; i < len; ++i) {
        var selector = selectors[i]
          , last = (i == len - 1);

        // keyframe blocks (10%, 20% { ... })
        if (this.keyframe) selector = i ? selector.trim() : selector;

        this.buf += this.out(selector + (last ? '' : comma), group.nodes[i]);
      }
    } else {
      group.block.lacksRenderedSelectors = true;
    }
  }

  // output block
  this.visit(group.block);
  stack.pop();
};

/**
 * Visit Ident.
 */

Compiler.prototype.visitIdent = function(ident){
  return ident.name;
};

/**
 * Visit String.
 */

Compiler.prototype.visitString = function(string){
  return this.isURL
    ? string.val
    : string.toString();
};

/**
 * Visit Null.
 */

Compiler.prototype.visitNull = function(node){
  return '';
};

/**
 * Visit Call.
 */

Compiler.prototype.visitCall = function(call){
  this.isURL = 'url' == call.name;
  var args = call.args.nodes.map(function(arg){
    return this.visit(arg);
  }, this).join(this.compress ? ',' : ', ');
  if (this.isURL) args = '"' + args + '"';
  this.isURL = false;
  return call.name + '(' + args + ')';
};

/**
 * Visit Expression.
 */

Compiler.prototype.visitExpression = function(expr){
  var buf = []
    , self = this
    , len = expr.nodes.length
    , nodes = expr.nodes.map(function(node){ return self.visit(node); });

  nodes.forEach(function(node, i){
    var last = i == len - 1;
    buf.push(node);
    if ('/' == nodes[i + 1] || '/' == node) return;
    if (last) return;

    var space = self.isURL || (self.isCondition
        && (')' == nodes[i + 1] || '(' == node))
        ? '' : ' ';

    buf.push(expr.isList
      ? (self.compress ? ',' : ', ')
      : space);
  });

  return buf.join('');
};

/**
 * Visit Arguments.
 */

Compiler.prototype.visitArguments = Compiler.prototype.visitExpression;

/**
 * Visit Property.
 */

Compiler.prototype.visitProperty = function(prop){
  var val = this.visit(prop.expr).trim()
    , name = (prop.name || prop.segments.join(''))
    , arr = [];
  arr.push(
    this.out(this.indent),
    this.out(name + (this.compress ? ':' : ': '), prop),
    this.out(val, prop.expr),
    this.out(this.compress ? (this.last ? '' : ';') : ';')
  );
  return arr.join('');
};

/**
 * Debug info.
 */

Compiler.prototype.debugInfo = function(node){

  var path = node.filename == 'stdin' ? 'stdin' : fs.realpathSync(node.filename)
    , line = (node.nodes && node.nodes.length ? node.nodes[0].lineno : node.lineno) || 1;

  if (this.linenos){
    this.buf += '\n/* ' + 'line ' + line + ' : ' + path + ' */\n';
  }

  if (this.firebug){
    // debug info for firebug, the crazy formatting is needed
    path = 'file\\\:\\\/\\\/' + path.replace(/([.:/\\])/g, function(m) {
      return '\\' + (m === '\\' ? '\/' : m)
    });
    line = '\\00003' + line;
    this.buf += '\n@media -stylus-debug-info'
      + '{filename{font-family:' + path
      + '}line{font-family:' + line + '}}\n';
  }
}


});// module: visitor/compiler.js


require.register("visitor/evaluator.js", function(module, exports, require){


/*!
 * Stylus - Evaluator
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Visitor = require('./index')
  , nodes = require('../nodes')
  , Stack = require('../stack')
  , Frame = require('../stack/frame')
  , utils = require('../utils')
  , bifs = require('../functions')
  , dirname = require('../path').dirname
  , colors = require('../colors')
  , units = require('../units');

/**
 * Clone the block node within the each loop so we don't keep
 * extending the same block in multiple contexts
 *
 * @param {Node}
 * @return {Node}
 */
function cloneNode (node) {
  if (node.block && node.block.node) {
    node.block.node = node.block.node.clone();
  }
  if (node.nodes && node.nodes.length) {
    node.nodes.map(cloneNode);
  }
  return node;
}

/**
 * Import `file` and return Block node.
 *
 * @api private
 */
function importFile(node, file, literal, index) {
  var importStack = this.importStack
    , Parser = require('../parser')
    , stat;

  // Handling the `require`
  if (node.once) {
    if (this.requireHistory[file]) return nodes.nil;
    this.requireHistory[file] = true;

    if (literal && !this.includeCSS) {
      return node;
    }
  }

  // Expose imports
  node.path = file;
  node.dirname = dirname(file);
  // Store the modified time
  stat = fs.statSync(file);
  node.mtime = stat.mtime;
  this.paths.push(node.dirname);

  // Avoid overflows from importing the same file over again
  if (file === importStack[importStack.length - 1]) return nodes.nil;

  if (this.options._imports) this.options._imports.push(node.clone());

  // Parse the file
  importStack.push(file);
  nodes.filename = file;

  var str = fs.readFileSync(file, 'utf8');
  if (literal) {
    literal = new nodes.Literal(str.replace(/\r\n?/g, '\n'));
    literal.lineno = literal.column = 1;
    if (!this.resolveURL) return literal;
  }

  // parse
  var block = new nodes.Block
    , parser = new Parser(str, utils.merge({ root: block }, this.options));

  try {
    block = parser.parse();
  } catch (err) {
    var line = parser.lexer.prev.lineno
      , column = parser.lexer.prev.column;

    if (this.includeCSS && this.resolveURL) {
      this.warn('ParseError: ' + file + ':' + line + ':' + column + '. This file included as-is');
      return literal;
    } else {
      err.filename = file;
      err.lineno = line;
      err.column = column;
      err.input = str;
      throw err;
    }
  }

  // Evaluate imported "root"
  block = block.clone(this.root);
  block.parent = this.root;
  block.scope = false;
  var ret = this.visit(block);
  importStack.pop();
  if (importStack.length || index) this.paths.pop();

  return ret;
}

/**
 * Initialize a new `Evaluator` with the given `root` Node
 * and the following `options`.
 *
 * Options:
 *
 *   - `compress`  Compress the css output, defaults to false
 *   - `warn`  Warn the user of duplicate function definitions etc
 *
 * @param {Node} root
 * @api private
 */

var Evaluator = module.exports = function Evaluator(root, options) {
  options = options || {};
  Visitor.call(this, root);
  this.stack = new Stack;
  this.imports = options.imports || [];
  this.functions = options.functions || {};
  this.globals = options.globals || {};
  this.paths = options.paths || [];
  this.prefix = options.prefix || '';
  this.filename = options.filename;
  this.includeCSS = options['include css'];
  this.resolveURL = options['resolve url'];
  this.paths.push(dirname(options.filename || '.'));
  this.stack.push(this.global = new Frame(root));
  this.warnings = options.warn;
  this.options = options;
  this.calling = []; // TODO: remove, use stack
  this.importStack = [];
  this.ret = 0;
  this.requireHistory = {};
};

/**
 * Inherit from `Visitor.prototype`.
 */

Evaluator.prototype.__proto__ = Visitor.prototype;

/**
 * Proxy visit to expose node line numbers.
 *
 * @param {Node} node
 * @return {Node}
 * @api private
 */

var visit = Visitor.prototype.visit;
Evaluator.prototype.visit = function(node){
  try {
    return visit.call(this, node);
  } catch (err) {
    if (err.filename) throw err;
    err.lineno = node.lineno;
    err.column = node.column;
    err.filename = node.filename;
    err.stylusStack = this.stack.toString();
    try {
      err.input = fs.readFileSync(err.filename, 'utf8');
    } catch (err) {
      // ignore
    }
    throw err;
  }
};

/**
 * Perform evaluation setup:
 *
 *   - populate global scope
 *   - iterate imports
 *
 * @api private
 */

Evaluator.prototype.setup = function(){
  var root = this.root;
  var imports = [];

  this.populateGlobalScope();
  this.imports.forEach(function(file){
    var expr = new nodes.Expression;
    expr.push(new nodes.String(file));
    imports.push(new nodes.Import(expr));
  }, this);

  root.nodes = imports.concat(root.nodes);
};

/**
 * Populate the global scope with:
 *
 *   - css colors
 *   - user-defined globals
 *
 * @api private
 */

Evaluator.prototype.populateGlobalScope = function(){
  var scope = this.global.scope;

  // colors
  Object.keys(colors).forEach(function(name){
    var rgb = colors[name]
      , rgba = new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1)
      , node = new nodes.Ident(name, rgba);
    scope.add(node);
  });

  // user-defined globals
  var globals = this.globals;
  Object.keys(globals).forEach(function(name){
    scope.add(new nodes.Ident(name, globals[name]));
  });
};

/**
 * Evaluate the tree.
 *
 * @return {Node}
 * @api private
 */

Evaluator.prototype.evaluate = function(){
  this.setup();
  return this.visit(this.root);
};

/**
 * Visit Group.
 */

Evaluator.prototype.visitGroup = function(group){
  group.nodes = group.nodes.map(function(selector){
    selector.val = this.interpolate(selector);
    return selector;
  }, this);

  group.block = this.visit(group.block);
  return group;
};

/**
 * Visit Return.
 */

Evaluator.prototype.visitReturn = function(ret){
  ret.expr = this.visit(ret.expr);
  throw ret;
};

/**
 * Visit Media.
 */

Evaluator.prototype.visitMedia = function(media){
  media.block = this.visit(media.block);
  media.val = this.visit(media.val);
  return media;
};

/**
 * Visit QueryList.
 */

Evaluator.prototype.visitQueryList = function(queries){
  var val, query;
  queries.nodes.forEach(this.visit, this);

  if (1 == queries.nodes.length) {
    query = queries.nodes[0];
    if (val = this.lookup(query.type)) {
      val = val.first.string;
      if (!val) return queries;
      var Parser = require('../parser')
        , parser = new Parser(val, this.options);
      queries = this.visit(parser.queries());
    }
  }
  return queries;
};

/**
 * Visit Query.
 */

Evaluator.prototype.visitQuery = function(node){
  node.predicate = this.visit(node.predicate);
  node.type = this.visit(node.type);
  node.nodes.forEach(this.visit, this);
  return node;
};

/**
 * Visit Feature.
 */

Evaluator.prototype.visitFeature = function(node){
  node.name = this.interpolate(node);
  if (node.expr) {
    this.ret++;
    node.expr = this.visit(node.expr);
    this.ret--;
  }
  return node;
};

/**
 * Visit Object.
 */

Evaluator.prototype.visitObject = function(obj){
  for (var key in obj.vals) {
    obj.vals[key] = this.visit(obj.vals[key]);
  }
  return obj;
};

/**
 * Visit Member.
 */

Evaluator.prototype.visitMember = function(node){
  var left = node.left
    , right = node.right
    , obj = this.visit(left).first;

  if ('object' != obj.nodeName) {
    throw new Error(left.toString() + ' has no property .' + right);
  }
  if (node.val) {
    this.ret++;
    obj.set(right.name, this.visit(node.val));
    this.ret--;
  }
  return obj.get(right.name);
};

/**
 * Visit Keyframes.
 */

Evaluator.prototype.visitKeyframes = function(keyframes){
  var val;
  if (keyframes.fabricated) return keyframes;
  keyframes.val = this.interpolate(keyframes);
  if (val = this.lookup(keyframes.val)) {
    keyframes.val = val.first.string || val.first.name;
  }
  keyframes.block = this.visit(keyframes.block);

  if ('official' != keyframes.prefix) return keyframes;

  this.vendors.forEach(function(prefix){
    // IE never had prefixes for keyframes
    if ('ms' == prefix) return;
    var node = keyframes.clone();
    node.val = keyframes.val;
    node.prefix = prefix;
    node.block = keyframes.block;
    node.fabricated = true;
    this.currentBlock.push(node);
  }, this);

  return nodes.nil;
};

/**
 * Visit Function.
 */

Evaluator.prototype.visitFunction = function(fn){
  // check local
  var local = this.stack.currentFrame.scope.lookup(fn.name);
  if (local) this.warn('local ' + local.nodeName + ' "' + fn.name + '" previously defined in this scope');

  // user-defined
  var user = this.functions[fn.name];
  if (user) this.warn('user-defined function "' + fn.name + '" is already defined');

  // BIF
  var bif = bifs[fn.name];
  if (bif) this.warn('built-in function "' + fn.name + '" is already defined');

  return fn;
};

/**
 * Visit Each.
 */

Evaluator.prototype.visitEach = function(each){
  this.ret++;
  var expr = utils.unwrap(this.visit(each.expr))
    , len = expr.nodes.length
    , val = new nodes.Ident(each.val)
    , key = new nodes.Ident(each.key || '__index__')
    , scope = this.currentScope
    , block = this.currentBlock
    , vals = []
    , self = this
    , body
    , obj;
  this.ret--;

  each.block.scope = false;

  function visitBody(key, val) {
    scope.add(val);
    scope.add(key);
    body = self.visit(each.block.clone());
    vals = vals.concat(body.nodes);
  }

  // for prop in obj
  if (1 == len && 'object' == expr.nodes[0].nodeName) {
    obj = expr.nodes[0];
    for (var prop in obj.vals) {
      val.val = new nodes.String(prop);
      key.val = obj.get(prop);
      visitBody(key, val);
    }
  } else {
    for (var i = 0; i < len; ++i) {
      val.val = expr.nodes[i];
      key.val = new nodes.Unit(i);
      visitBody(key, val);
    }
  }

  this.mixin(vals, block);
  return vals[vals.length - 1] || nodes.nil;
};

/**
 * Visit Call.
 */

Evaluator.prototype.visitCall = function(call){
  var fn = this.lookup(call.name)
    , literal
    , ret;

  // url()
  this.ignoreColors = 'url' == call.name;

  // Variable function
  if (fn && 'expression' == fn.nodeName) {
    fn = fn.nodes[0];
  }

  // Not a function? try user-defined or built-ins
  if (fn && 'function' != fn.nodeName) {
    fn = this.lookupFunction(call.name);
  }

  // Undefined function? render literal CSS
  if (!fn || fn.nodeName != 'function') {
    // Special case for `calc`
    if ('calc' == this.unvendorize(call.name)) {
      literal = call.args.nodes && call.args.nodes[0];
      if (literal) ret = new nodes.Literal(call.name + literal);
    } else {
      ret = this.literalCall(call);
    }
    this.ignoreColors = false;
    return ret;
  }

  this.calling.push(call.name);

  // Massive stack
  if (this.calling.length > 200) {
    throw new RangeError('Maximum stylus call stack size exceeded');
  }

  // First node in expression
  if ('expression' == fn.nodeName) fn = fn.first;

  // Evaluate arguments
  this.ret++;
  var args = this.visit(call.args);

  for (var key in args.map) {
    args.map[key] = this.visit(args.map[key].clone());
  }
  this.ret--;

  // Built-in
  if (fn.fn) {
    ret = this.invokeBuiltin(fn.fn, args);
  // User-defined
  } else if ('function' == fn.nodeName) {
    // Evaluate mixin block
    if (call.block) call.block = this.visit(call.block);
    ret = this.invokeFunction(fn, args, call.block);
  }

  this.calling.pop();
  this.ignoreColors = false;
  return ret;
};

/**
 * Visit Ident.
 */

Evaluator.prototype.visitIdent = function(ident){
  var prop;
  // Property lookup
  if (ident.property) {
    if (prop = this.lookupProperty(ident.name)) {
      return this.visit(prop.expr.clone());
    }
    return nodes.nil;
  // Lookup
  } else if (ident.val.isNull) {
    var val = this.lookup(ident.name);
    // Object or Block mixin
    if (val && ident.mixin) this.mixinNode(val);
    return val ? this.visit(val) : ident;
  // Assign
  } else {
    this.ret++;
    ident.val = this.visit(ident.val);
    this.ret--;
    this.currentScope.add(ident);
    return ident.val;
  }
};

/**
 * Visit BinOp.
 */

Evaluator.prototype.visitBinOp = function(binop){
  // Special-case "is defined" pseudo binop
  if ('is defined' == binop.op) return this.isDefined(binop.left);

  this.ret++;
  // Visit operands
  var op = binop.op
    , left = this.visit(binop.left)
    , right = ('||' == op || '&&' == op)
      ? binop.right : this.visit(binop.right);

  // HACK: ternary
  var val = binop.val
    ? this.visit(binop.val)
    : null;
  this.ret--;

  // Operate
  try {
    return this.visit(left.operate(op, right, val));
  } catch (err) {
    // disregard coercion issues in equality
    // checks, and simply return false
    if ('CoercionError' == err.name) {
      switch (op) {
        case '==':
          return nodes.no;
        case '!=':
          return nodes.yes;
      }
    }
    throw err;
  }
};

/**
 * Visit UnaryOp.
 */

Evaluator.prototype.visitUnaryOp = function(unary){
  var op = unary.op
    , node = this.visit(unary.expr);

  if ('!' != op) {
    node = node.first.clone();
    utils.assertType(node, 'unit');
  }

  switch (op) {
    case '-':
      node.val = -node.val;
      break;
    case '+':
      node.val = +node.val;
      break;
    case '~':
      node.val = ~node.val;
      break;
    case '!':
      return node.toBoolean().negate();
  }

  return node;
};

/**
 * Visit TernaryOp.
 */

Evaluator.prototype.visitTernary = function(ternary){
  var ok = this.visit(ternary.cond).toBoolean();
  return ok.isTrue
    ? this.visit(ternary.trueExpr)
    : this.visit(ternary.falseExpr);
};

/**
 * Visit Expression.
 */

Evaluator.prototype.visitExpression = function(expr){
  for (var i = 0, len = expr.nodes.length; i < len; ++i) {
    expr.nodes[i] = this.visit(expr.nodes[i]);
  }

  // support (n * 5)px etc
  if (this.castable(expr)) expr = this.cast(expr);

  return expr;
};

/**
 * Visit Arguments.
 */

Evaluator.prototype.visitArguments = Evaluator.prototype.visitExpression;

/**
 * Visit Property.
 */

Evaluator.prototype.visitProperty = function(prop){
  var name = this.interpolate(prop)
    , fn = this.lookup(name)
    , call = fn && 'function' == fn.first.nodeName
    , literal = ~this.calling.indexOf(name)
    , _prop = this.property;

  // Function of the same name
  if (call && !literal && !prop.literal) {
    var args = nodes.Arguments.fromExpression(utils.unwrap(prop.expr.clone()));
    prop.name = name;
    this.property = prop;
    this.ret++;
    this.property.expr = this.visit(prop.expr);
    this.ret--;
    var ret = this.visit(new nodes.Call(name, args));
    this.property = _prop;
    return ret;
  // Regular property
  } else {
    this.ret++;
    prop.name = name;
    prop.literal = true;
    this.property = prop;
    prop.expr = this.visit(prop.expr);
    this.property = _prop;
    this.ret--;
    return prop;
  }
};

/**
 * Visit Root.
 */

Evaluator.prototype.visitRoot = function(block){
  // normalize cached imports
  if (block != this.root) {
    block.constructor = nodes.Block;
    return this.visit(block);
  }

  for (var i = 0; i < block.nodes.length; ++i) {
    block.index = i;
    block.nodes[i] = this.visit(block.nodes[i]);
  }
  return block;
};

/**
 * Visit Block.
 */

Evaluator.prototype.visitBlock = function(block){
  this.stack.push(new Frame(block));
  for (block.index = 0; block.index < block.nodes.length; ++block.index) {
    try {
      block.nodes[block.index] = this.visit(block.nodes[block.index]);
    } catch (err) {
      if ('return' == err.nodeName) {
        if (this.ret) {
          this.stack.pop();
          throw err;
        } else {
          block.nodes[block.index] = err;
          break;
        }
      } else {
        throw err;
      }
    }
  }
  this.stack.pop();
  return block;
};

/**
 * Visit Atblock.
 */

Evaluator.prototype.visitAtblock = function(atblock){
  atblock.block = this.visit(atblock.block);
  return atblock;
};

/**
 * Visit Atrule.
 */

Evaluator.prototype.visitAtrule = function(atrule){
  atrule.val = this.interpolate(atrule);
  atrule.block = this.visit(atrule.block);
  return atrule;
};

/**
 * Visit Supports.
 */

Evaluator.prototype.visitSupports = function(node){
  var condition = node.condition
    , val;

  this.ret++;
  node.condition = this.visit(condition);
  this.ret--;

  val = condition.first;
  if (1 == condition.nodes.length
    && 'string' == val.nodeName) {
    node.condition = val.string;
  }
  node.block = this.visit(node.block);
  return node;
};

/**
 * Visit If.
 */

Evaluator.prototype.visitIf = function(node){
  var ret
    , block = this.currentBlock
    , negate = node.negate;

  this.ret++;
  var ok = this.visit(node.cond).first.toBoolean();
  this.ret--;

  node.block.scope = node.block.hasMedia;

  // Evaluate body
  if (negate) {
    // unless
    if (ok.isFalse) {
      ret = this.visit(node.block);
    }
  } else {
    // if
    if (ok.isTrue) {
      ret = this.visit(node.block);
    // else
    } else if (node.elses.length) {
      var elses = node.elses
        , len = elses.length
        , cond;
      for (var i = 0; i < len; ++i) {
        // else if
        if (elses[i].cond) {
          elses[i].block.scope = elses[i].block.hasMedia;
          this.ret++;
          cond = this.visit(elses[i].cond).first.toBoolean();
          this.ret--;
          if (cond.isTrue) {
            ret = this.visit(elses[i].block);
            break;
          }
        // else
        } else {
          elses[i].scope = elses[i].hasMedia;
          ret = this.visit(elses[i]);
        }
      }
    }
  }

  // mixin conditional statements within
  // a selector group or at-rule
  if (ret && !node.postfix && block.node
    && ~['group'
       , 'atrule'
       , 'media'
       , 'supports'
       , 'keyframes'].indexOf(block.node.nodeName)) {
    this.mixin(ret.nodes, block);
    return nodes.nil;
  }

  return ret || nodes.nil;
};

/**
 * Visit Extend.
 */

Evaluator.prototype.visitExtend = function(extend){
  var block = this.currentBlock;
  if ('group' != block.node.nodeName) block = this.closestGroup;
  extend.selectors.forEach(function(selector){
    block.node.extends.push({
      // Cloning the selector for when we are in a loop and don't want it to affect
      // the selector nodes and cause the values to be different to expected
      selector: this.interpolate(selector.clone()).trim(),
      lineno: selector.lineno,
      column: selector.column
    });
  }, this);
  return nodes.nil;
};

/**
 * Visit Import.
 */

Evaluator.prototype.visitImport = function(imported){
  this.ret++;

  var path = this.visit(imported.path).first
    , nodeName = imported.once ? 'require' : 'import'
    , found
    , literal
    , index;

  this.ret--;

  // url() passed
  if ('url' == path.name) {
    if (imported.once) throw new Error('You cannot @require a url');

    return imported;
  }

  // Ensure string
  if (!path.string) throw new Error('@' + nodeName + ' string expected');

  var name = path = path.string;

  // Absolute URL
  if (/url\s*\(\s*['"]?(?:https?:)?\/\//i.test(path)) {
    if (imported.once) throw new Error('You cannot @require a url');
    return imported;
  }

  // Literal
  if (/\.css(?:"|$)/.test(path)) {
    literal = true;
    if (!imported.once && !this.includeCSS) {
      return imported;
    }
  }

  // support optional .styl
  if (!literal && !/\.styl$/i.test(path)) path += '.styl';

  // Lookup
  found = utils.find(path, this.paths, this.filename);
  if (!found) {
    found = utils.lookupIndex(name, this.paths, this.filename);
    index = true;
  }

  // Throw if import failed
  if (!found) throw new Error('failed to locate @' + nodeName + ' file ' + path);
  
  var block = new nodes.Block;

  for (var i = 0, len = found.length; i < len; ++i) {
    block.push(importFile.call(this, imported, found[i], literal, index));
  }

  return block;
};

/**
 * Invoke `fn` with `args`.
 *
 * @param {Function} fn
 * @param {Array} args
 * @return {Node}
 * @api private
 */

Evaluator.prototype.invokeFunction = function(fn, args, content){
  var block = new nodes.Block(fn.block.parent);

  // Clone the function body
  // to prevent mutation of subsequent calls
  var body = fn.block.clone(block);

  // mixin block
  var mixinBlock = this.stack.currentFrame.block;

  // new block scope
  this.stack.push(new Frame(block));
  var scope = this.currentScope;

  // normalize arguments
  if ('arguments' != args.nodeName) {
    var expr = new nodes.Expression;
    expr.push(args);
    args = nodes.Arguments.fromExpression(expr);
  }

  // arguments local
  scope.add(new nodes.Ident('arguments', args));

  // mixin scope introspection
  scope.add(new nodes.Ident('mixin', this.ret
    ? nodes.no
    : new nodes.String(mixinBlock.nodeName)));

  // current property
  if (this.property) {
    var prop = this.propertyExpression(this.property, fn.name);
    scope.add(new nodes.Ident('current-property', prop));
  } else {
    scope.add(new nodes.Ident('current-property', nodes.nil));
  }

  // current call stack
  var expr = new nodes.Expression;
  for (var i = this.calling.length - 1; i-- ; ) {
    expr.push(new nodes.Literal(this.calling[i]));
  };
  scope.add(new nodes.Ident('called-from', expr));

  // inject arguments as locals
  var i = 0
    , len = args.nodes.length;
  fn.params.nodes.forEach(function(node){
    // rest param support
    if (node.rest) {
      node.val = new nodes.Expression;
      for (; i < len; ++i) node.val.push(args.nodes[i]);
      node.val.preserve = true;
      node.val.isList = args.isList;
    // argument default support
    } else {
      var arg = args.map[node.name] || args.nodes[i++];
      node = node.clone();
      if (arg) {
        arg.isEmpty ? args.nodes[i - 1] = node.val : node.val = arg;
      } else {
        args.push(node.val);
      }

      // required argument not satisfied
      if (node.val.isNull) {
        throw new Error('argument "' + node + '" required for ' + fn);
      }
    }

    scope.add(node);
  });

  // mixin block
  if (content) scope.add(new nodes.Ident('block', content, true));

  // invoke
  return this.invoke(body, true, fn.filename);
};

/**
 * Invoke built-in `fn` with `args`.
 *
 * @param {Function} fn
 * @param {Array} args
 * @return {Node}
 * @api private
 */

Evaluator.prototype.invokeBuiltin = function(fn, args){
  // Map arguments to first node
  // providing a nicer js api for
  // BIFs. Functions may specify that
  // they wish to accept full expressions
  // via .raw
  if (fn.raw) {
    args = args.nodes;
  } else {
    args = utils.params(fn).reduce(function(ret, param){
      var arg = args.map[param] || args.nodes.shift()
      if (arg) {
        arg = utils.unwrap(arg);
        var len = arg.nodes.length;
        if (len > 1) {
          for (var i = 0; i < len; ++i) {
            ret.push(utils.unwrap(arg.nodes[i].first));
          }
        } else {
          ret.push(arg.first);
        }
      }
      return ret;
    }, []);
  }

  // Invoke the BIF
  var body = utils.coerce(fn.apply(this, args));

  // Always wrapping allows js functions
  // to return several values with a single
  // Expression node
  var expr = new nodes.Expression;
  expr.push(body);
  body = expr;

  // Invoke
  return this.invoke(body);
};

/**
 * Invoke the given function `body`.
 *
 * @param {Block} body
 * @return {Node}
 * @api private
 */

Evaluator.prototype.invoke = function(body, stack, filename){
  var self = this
    , ret;

  if (filename) this.paths.push(dirname(filename));

  // Return
  if (this.ret) {
    ret = this.eval(body.nodes);
    if (stack) this.stack.pop();
  // Mixin
  } else {
    body = this.visit(body);
    if (stack) this.stack.pop();
    this.mixin(body.nodes, this.currentBlock);
    ret = nodes.nil;
  }

  if (filename) this.paths.pop();

  return ret;
};

/**
 * Mixin the given `nodes` to the given `block`.
 *
 * @param {Array} nodes
 * @param {Block} block
 * @api private
 */

Evaluator.prototype.mixin = function(nodes, block){
  if (!nodes.length) return;
  var len = block.nodes.length
    , head = block.nodes.slice(0, block.index)
    , tail = block.nodes.slice(block.index + 1, len);
  this._mixin(nodes, head, block);
  block.nodes = head.concat(tail);
};

/**
 * Mixin the given `items` to the `dest` array.
 *
 * @param {Array} items
 * @param {Array} dest
 * @param {Block} block
 * @api private
 */

Evaluator.prototype._mixin = function(items, dest, block){
  var node
    , len = items.length;
  for (var i = 0; i < len; ++i) {
    switch ((node = items[i]).nodeName) {
      case 'return':
        return;
      case 'block':
        this._mixin(node.nodes, dest, block);
        break;
      case 'property':
        var val = node.expr;
        // prevent `block` mixin recursion
        if (node.literal && 'block' == val.first.name) {
          val = utils.unwrap(val);
          val.nodes[0] = new nodes.Literal('block');
        }
      default:
        if (0 == i) node = this.visit(node);
        // fix link to the parent block
        if (node.block) node.block.parent = block;
        dest.push(node);
    }
  }
};

/**
 * Mixin the given `node` to the current block.
 *
 * @param {Node} node
 * @api private
 */

Evaluator.prototype.mixinNode = function(node){
  node = this.visit(node.first);
  switch (node.nodeName) {
    case 'object':
      this.mixinObject(node);
      return nodes.nil;
    case 'block':
    case 'atblock':
      this.mixin(node.nodes, this.currentBlock);
      return nodes.nil;
  }
};

/**
 * Mixin the given `object` to the current block.
 *
 * @param {Object} object
 * @api private
 */

Evaluator.prototype.mixinObject = function(object){
  var Parser = require('../parser')
    , root = this.root
    , str = '$block ' + object.toBlock()
    , parser = new Parser(str, utils.merge({ root: block }, this.options))
    , block;

  try {
    block = parser.parse();
  } catch (err) {
    err.filename = this.filename;
    err.lineno = parser.lexer.prev.lineno;
    err.column = parser.lexer.prev.column;
    err.input = str;
    throw err;
  }

  block.parent = root;
  block.scope = false;
  var ret = this.visit(block)
    , vals = ret.first.nodes;
  for (var i = 0, len = vals.length; i < len; ++i) {
    if (vals[i].block) {
      this.mixin(vals[i].block.nodes, this.currentBlock);
      break;
    }
  }
};

/**
 * Evaluate the given `vals`.
 *
 * @param {Array} vals
 * @return {Node}
 * @api private
 */

Evaluator.prototype.eval = function(vals){
  if (!vals) return nodes.nil;
  var len = vals.length
    , node = nodes.nil;

  try {
    for (var i = 0; i < len; ++i) {
      node = vals[i];
      switch (node.nodeName) {
        case 'if':
          if ('block' != node.block.nodeName) {
            node = this.visit(node);
            break;
          }
        case 'each':
        case 'block':
          node = this.visit(node);
          if (node.nodes) node = this.eval(node.nodes);
          break;
        default:
          node = this.visit(node);
      }
    }
  } catch (err) {
    if ('return' == err.nodeName) {
      return err.expr;
    } else {
      throw err;
    }
  }

  return node;
};

/**
 * Literal function `call`.
 *
 * @param {Call} call
 * @return {call}
 * @api private
 */

Evaluator.prototype.literalCall = function(call){
  call.args = this.visit(call.args);
  return call;
};

/**
 * Lookup property `name`.
 *
 * @param {String} name
 * @return {Property}
 * @api private
 */

Evaluator.prototype.lookupProperty = function(name){
  var i = this.stack.length
    , index = this.currentBlock.index
    , top = i
    , nodes
    , block
    , len
    , other;

  while (i--) {
    block = this.stack[i].block;
    if (!block.node) continue;
    switch (block.node.nodeName) {
      case 'group':
      case 'function':
      case 'if':
      case 'each':
      case 'atrule':
      case 'media':
      case 'atblock':
      case 'call':
        nodes = block.nodes;
        // scan siblings from the property index up
        if (i + 1 == top) {
          while (index--) {
            // ignore current property
            if (this.property == nodes[index]) continue;
            other = this.interpolate(nodes[index]);
            if (name == other) return nodes[index].clone();
          }
        // sequential lookup for non-siblings (for now)
        } else {
          len = nodes.length;
          while (len--) {
            if ('property' != nodes[len].nodeName
              || this.property == nodes[len]) continue;
            other = this.interpolate(nodes[len]);
            if (name == other) return nodes[len].clone();
          }
        }
        break;
    }
  }

  return nodes.nil;
};

/**
 * Return the closest mixin-able `Block`.
 *
 * @return {Block}
 * @api private
 */

Evaluator.prototype.__defineGetter__('closestBlock', function(){
  var i = this.stack.length
    , block;
  while (i--) {
    block = this.stack[i].block;
    if (block.node) {
      switch (block.node.nodeName) {
        case 'group':
        case 'keyframes':
        case 'atrule':
        case 'atblock':
        case 'media':
          return block;
      }
    }
  }
});

/**
 * Return the closest group block.
 *
 * @return {Block}
 * @api private
 */

Evaluator.prototype.__defineGetter__('closestGroup', function(){
  var i = this.stack.length
    , block;
  while (i--) {
    block = this.stack[i].block;
    if (block.node && 'group' == block.node.nodeName) {
      return block;
    }
  }
});

/**
 * Return the current selectors stack.
 *
 * @return {Array}
 * @api private
 */

Evaluator.prototype.__defineGetter__('selectorStack', function(){
  var block
    , stack = [];
  for (var i = 0, len = this.stack.length; i < len; ++i) {
    block = this.stack[i].block;
    if (block.node && 'group' == block.node.nodeName) {
      block.node.nodes.forEach(function(selector) {
        if (!selector.val) selector.val = this.interpolate(selector);
      }, this);
      stack.push(block.node.nodes);
    }
  }
  return stack;
});

/**
 * Lookup `name`, with support for JavaScript
 * functions, and BIFs.
 *
 * @param {String} name
 * @return {Node}
 * @api private
 */

Evaluator.prototype.lookup = function(name){
  var val;
  if (this.ignoreColors && name in colors) return;
  if (val = this.stack.lookup(name)) {
    return utils.unwrap(val);
  } else {
    return this.lookupFunction(name);
  }
};

/**
 * Map segments in `node` returning a string.
 *
 * @param {Node} node
 * @return {String}
 * @api private
 */

Evaluator.prototype.interpolate = function(node){
  var self = this
    , isSelector = ('selector' == node.nodeName);
  function toString(node) {
    switch (node.nodeName) {
      case 'function':
      case 'ident':
        return node.name;
      case 'literal':
      case 'string':
        if (self.prefix && !node.prefixed && !node.val.nodeName) {
          node.val = node.val.replace(/\./g, '.' + self.prefix);
          node.prefixed = true;
        }
        return node.val;
      case 'unit':
        // Interpolation inside keyframes
        return '%' == node.type ? node.val + '%' : node.val;
      case 'member':
        return toString(self.visit(node));
      case 'expression':
        // Prevent cyclic `selector()` calls.
        if (self.calling && ~self.calling.indexOf('selector') && self._selector) return self._selector;
        self.ret++;
        var ret = toString(self.visit(node).first);
        self.ret--;
        if (isSelector) self._selector = ret;
        return ret;
    }
  }

  if (node.segments) {
    return node.segments.map(toString).join('');
  } else {
    return toString(node);
  }
};

/**
 * Lookup JavaScript user-defined or built-in function.
 *
 * @param {String} name
 * @return {Function}
 * @api private
 */

Evaluator.prototype.lookupFunction = function(name){
  var fn = this.functions[name] || bifs[name];
  if (fn) return new nodes.Function(name, fn);
};

/**
 * Check if the given `node` is an ident, and if it is defined.
 *
 * @param {Node} node
 * @return {Boolean}
 * @api private
 */

Evaluator.prototype.isDefined = function(node){
  if ('ident' == node.nodeName) {
    return nodes.Boolean(this.lookup(node.name));
  } else {
    throw new Error('invalid "is defined" check on non-variable ' + node);
  }
};

/**
 * Return `Expression` based on the given `prop`,
 * replacing cyclic calls to the given function `name`
 * with "__CALL__".
 *
 * @param {Property} prop
 * @param {String} name
 * @return {Expression}
 * @api private
 */

Evaluator.prototype.propertyExpression = function(prop, name){
  var expr = new nodes.Expression
    , val = prop.expr.clone();

  // name
  expr.push(new nodes.String(prop.name));

  // replace cyclic call with __CALL__
  function replace(node) {
    if ('call' == node.nodeName && name == node.name) {
      return new nodes.Literal('__CALL__');
    }

    if (node.nodes) node.nodes = node.nodes.map(replace);
    return node;
  }

  replace(val);
  expr.push(val);
  return expr;
};

/**
 * Cast `expr` to the trailing ident.
 *
 * @param {Expression} expr
 * @return {Unit}
 * @api private
 */

Evaluator.prototype.cast = function(expr){
  return new nodes.Unit(expr.first.val, expr.nodes[1].name);
};

/**
 * Check if `expr` is castable.
 *
 * @param {Expression} expr
 * @return {Boolean}
 * @api private
 */

Evaluator.prototype.castable = function(expr){
  return 2 == expr.nodes.length
    && 'unit' == expr.first.nodeName
    && ~units.indexOf(expr.nodes[1].name);
};

/**
 * Warn with the given `msg`.
 *
 * @param {String} msg
 * @api private
 */

Evaluator.prototype.warn = function(msg){
  if (!this.warnings) return;
  console.warn('\033[33mWarning:\033[0m ' + msg);
};

/**
 * Return the current `Block`.
 *
 * @return {Block}
 * @api private
 */

Evaluator.prototype.__defineGetter__('currentBlock', function(){
  return this.stack.currentFrame.block;
});

/**
 * Return an array of vendor names.
 *
 * @return {Array}
 * @api private
 */

Evaluator.prototype.__defineGetter__('vendors', function(){
  return this.lookup('vendors').nodes.map(function(node){
    return node.string;
  });
});

/**
 * Return the property name without vendor prefix.
 *
 * @param {String} prop
 * @return {String}
 * @api public
 */

Evaluator.prototype.unvendorize = function(prop){
  for (var i = 0, len = this.vendors.length; i < len; i++) {
    if ('official' != this.vendors[i]) {
      var vendor = '-' + this.vendors[i] + '-';
      if (~prop.indexOf(vendor)) return prop.replace(vendor, '');
    }
  }
  return prop;
};

/**
 * Return the current frame `Scope`.
 *
 * @return {Scope}
 * @api private
 */

Evaluator.prototype.__defineGetter__('currentScope', function(){
  return this.stack.currentFrame.scope;
});

/**
 * Return the current `Frame`.
 *
 * @return {Frame}
 * @api private
 */

Evaluator.prototype.__defineGetter__('currentFrame', function(){
  return this.stack.currentFrame;
});


});// module: visitor/evaluator.js


require.register("visitor/normalizer.js", function(module, exports, require){


/*!
 * Stylus - Normalizer
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Visitor = require('./index')
  , nodes = require('../nodes/index')
  , utils = require('../utils');

/**
 * Initialize a new `Normalizer` with the given `root` Node.
 *
 * This visitor implements the first stage of the duel-stage
 * compiler, tasked with stripping the "garbage" from
 * the evaluated nodes, ditching null rules, resolving
 * ruleset selectors etc. This step performs the logic
 * necessary to facilitate the "@extend" functionality,
 * as these must be resolved _before_ buffering output.
 *
 * @param {Node} root
 * @api public
 */

var Normalizer = module.exports = function Normalizer(root, options) {
  options = options || {};
  Visitor.call(this, root);
  this.stack = [];
  this.map = {};
};

/**
 * Inherit from `Visitor.prototype`.
 */

Normalizer.prototype.__proto__ = Visitor.prototype;

/**
 * Normalize the node tree.
 *
 * @return {Node}
 * @api private
 */

Normalizer.prototype.normalize = function(){
  return this.visit(this.root);
};

/**
 * Bubble up the given `node`.
 *
 * @param {Node} node
 * @api private
 */

Normalizer.prototype.bubble = function(node){
  var props = []
    , other = []
    , self = this;

  function filterProps(block) {
    block.nodes.forEach(function(node) {
      node = self.visit(node);

      switch (node.nodeName) {
        case 'property':
          props.push(node);
          break;
        case 'block':
          filterProps(node);
          break;
        default:
          other.push(node);
      }
    });
  }

  filterProps(node.block);

  if (props.length) {
    var selector = new nodes.Selector([new nodes.Literal('&')]);
    selector.lineno = node.lineno;
    selector.column = node.column;
    selector.filename = node.filename;
    selector.val = '&';

    var group = new nodes.Group;
    group.lineno = node.lineno;
    group.column = node.column;
    group.filename = node.filename;

    var block = new nodes.Block(node.block, group);
    block.lineno = node.lineno;
    block.column = node.column;
    block.filename = node.filename;

    props.forEach(function(prop){
      block.push(prop);
    });

    group.push(selector);
    group.block = block;

    node.block.nodes = [];
    node.block.push(group);
    other.forEach(function(n){
      node.block.push(n);
    });

    var group = this.closestGroup(node.block);
    if (!group) {
      var err = new Error('Failed to find a group that closest to the @' + node.nodeName);
      err.lineno = node.lineno;
      err.column = node.column;
      throw err;
    }

    node.group = group.clone();
    node.bubbled = true;
  }
};

/**
 * Return group closest to the given `block`.
 *
 * @param {Block} block
 * @return {Group}
 * @api private
 */

Normalizer.prototype.closestGroup = function(block){
  var parent = block.parent
    , node;
  while (parent && (node = parent.node)) {
    if ('group' == node.nodeName) return node;
    parent = node.block.parent;
  }
};

/**
 * Visit Root.
 */

Normalizer.prototype.visitRoot = function(block){
  var ret = new nodes.Root
    , node;

  for (var i = 0; i < block.nodes.length; ++i) {
    node = block.nodes[i];
    switch (node.nodeName) {
      case 'null':
      case 'expression':
      case 'function':
      case 'unit':
      case 'atblock':
        continue;
      default:
        this.rootIndex = i;
        ret.push(this.visit(node));
    }
  }

  return ret;
};

/**
 * Visit Property.
 */

Normalizer.prototype.visitProperty = function(prop){
  this.visit(prop.expr);
  return prop;
};

/**
 * Visit Expression.
 */

Normalizer.prototype.visitExpression = function(expr){
  expr.nodes = expr.nodes.map(function(node){
    // returns `block` literal if mixin's block
    // is used as part of a property value
    if ('block' == node.nodeName) {
      var literal = new nodes.Literal('block');
      literal.lineno = expr.lineno;
      literal.column = expr.column;
      return literal;
    }
    return node;
  });
  return expr;
};

/**
 * Visit Block.
 */

Normalizer.prototype.visitBlock = function(block){
  var node;

  if (block.hasProperties) {
    for (var i = 0, len = block.nodes.length; i < len; ++i) {
      node = block.nodes[i];
      switch (node.nodeName) {
        case 'null':
        case 'expression':
        case 'function':
        case 'group':
        case 'unit':
        case 'atblock':
          continue;
        default:
          this.visit(node);
      }
    }
  }

  // nesting
  for (var i = 0, len = block.nodes.length; i < len; ++i) {
    node = block.nodes[i];
    this.visit(node);
  }

  return block;
};

/**
 * Visit Group.
 */

Normalizer.prototype.visitGroup = function(group){
  var stack = this.stack
    , map = this.map
    , parts;

  // normalize interpolated selectors with comma
  group.nodes.forEach(function(selector, i){
    if (!~selector.val.indexOf(',')) return;
    if (~selector.val.indexOf('\\,')) {
      selector.val = selector.val.replace(/\\,/g, ',');
      return;
    }
    parts = selector.val.split(',');
    var root = '/' == selector.val.charAt(0)
      , part, s;
    for (var k = 0, len = parts.length; k < len; ++k){
      part = parts[k].trim();
      if (root && k > 0 && !~part.indexOf('&')) {
        part = '/' + part;
      }
      s = new nodes.Selector([new nodes.Literal(part)]);
      s.val = part;
      s.block = group.block;
      group.nodes[i++] = s;
    }
  });
  stack.push(group.nodes);

  var selectors = utils.compileSelectors(stack, true);

  // map for extension lookup
  selectors.forEach(function(selector){
    map[selector] = map[selector] || [];
    map[selector].push(group);
  });

  // extensions
  this.extend(group, selectors);

  group.block = this.visit(group.block);
  stack.pop();
  return group;
};

/**
 * Visit Function.
 */

Normalizer.prototype.visitFunction = function(){
  return nodes.nil;
};

/**
 * Visit Media.
 */

Normalizer.prototype.visitMedia = function(media){
  var medias = []
    , group = this.closestGroup(media.block)
    , parent;

  function mergeQueries(block) {
    block.nodes.forEach(function(node, i){
      switch (node.nodeName) {
        case 'media':
          node.val = media.val.merge(node.val);
          medias.push(node);
          block.nodes[i] = nodes.nil;
          break;
        case 'block':
          mergeQueries(node);
          break;
        default:
          if (node.block && node.block.nodes)
            mergeQueries(node.block);
      }
    });
  }

  mergeQueries(media.block);
  this.bubble(media);

  if (medias.length) {
    medias.forEach(function(node){
      if (group) {
        group.block.push(node);
      } else {
        this.root.nodes.splice(++this.rootIndex, 0, node);
      }
      node = this.visit(node);
      parent = node.block.parent;
      if (node.bubbled && (!group || 'group' == parent.node.nodeName)) {
        node.group.block = node.block.nodes[0].block;
        node.block.nodes[0] = node.group;
      }
    }, this);
  }
  return media;
};

/**
 * Visit Supports.
 */

Normalizer.prototype.visitSupports = function(node){
  this.bubble(node);
  return node;
};

/**
 * Visit Atrule.
 */

Normalizer.prototype.visitAtrule = function(node){
  node.block = this.visit(node.block);
  return node;
};

/**
 * Visit Keyframes.
 */

Normalizer.prototype.visitKeyframes = function(node){
  var frames = node.block.nodes.filter(function(frame){
    return frame.block && frame.block.hasProperties;
  });
  node.frames = frames.length;
  return node;
};

/**
 * Apply `group` extensions.
 *
 * @param {Group} group
 * @param {Array} selectors
 * @api private
 */

Normalizer.prototype.extend = function(group, selectors){
  var map = this.map
    , self = this;

  group.block.node.extends.forEach(function(extend){
    var groups = map[extend.selector];
    if (!groups) {
      var err = new Error('Failed to @extend "' + extend.selector + '"');
      err.lineno = extend.lineno;
      err.column = extend.column;
      throw err;
    }
    selectors.forEach(function(selector){
      var node = new nodes.Selector;
      node.val = selector;
      node.inherits = false;
      groups.forEach(function(group){
        self.extend(group, selectors);
        group.push(node);
      });
    });
  });
};


});// module: visitor/normalizer.js

  return require('stylus');
})();