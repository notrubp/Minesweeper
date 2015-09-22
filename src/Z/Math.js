/**
 * Math utilities and helpers.
 *
 * MIT License
 * Copyright (c) 2015 notrubp@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @license MIT
 * @copyright notrubp@gmail.com 2015
 */
(function(global) {
  "use strict";

  /**
   * Math utilities and helpers.
   * @namespace Math
   */
  var Math = global.Math || {};

  /**
   * Linear interpolation.
   * @function lerp
   * @memberof Math
   * @static
   * @param {Number} s
   * @param {Number} e
   * @param {Number} r
   */
  Math.lerp = function(s, e, r) {
    return n + r * (e - s);
  }

  /*
   * TERMS OF USE - EASING EQUATIONS
   * 
   * Open source under the BSD License. 
   * 
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification, 
   * are permitted provided that the following conditions are met:
   * 
   * Redistributions of source code must retain the above copyright notice, this list of 
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list 
   * of conditions and the following disclaimer in the documentation and/or other materials 
   * provided with the distribution.
   * 
   * Neither the name of the author nor the names of contributors may be used to endorse 
   * or promote products derived from this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
   * OF THE POSSIBILITY OF SUCH DAMAGE. 
   */

  /**
   * Easing functions.
   * @namespace Ease
   * @memberof Math
   */
  Math.Ease = {};

  /**
   * @function inQuad
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inQuad = function(t, b, c, d) {
    return c * (t /= d) * t + b;
  }

  /**
   * @function outQuad
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outQuad = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  /**
   * @function inOutQuad
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutQuad = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  /**
   * @function inCubic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inCubic = function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  }

  /**
   * @function outCubic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outCubic = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }

  /**
   * @function inOutCubic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }

  /**
   * @function inQuart
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inQuart = function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  }

  /**
   * @function outQuart
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outQuart = function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  }

  /**
   * @function inOutQuart
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutQuart = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }

  /**
   * @function inQuint
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inQuint = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  }

  /**
   * @function outQuint
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outQuint = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  }

  /**
   * @function inOutQuint
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutQuint = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  }

  /**
   * @function inQuad
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inSine = function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  }

  /**
   * @function outSine
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outSine = function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  /**
   * @function inOutSine
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutSine = function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }

  /**
   * @function inExpo
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inExpo = function(t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  }

  /**
   * @function outExpo
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outExpo = function(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  }

  /**
   * @function inOutExpo
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutExpo = function(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  /**
   * @function inCirc
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inCirc = function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  }

  /**
   * @function outCirc
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outCirc = function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  }

  /**
   * @function inOutCirc
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutCirc = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  }

  /**
   * @function inElastic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

  /**
   * @function outElastic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  }

  /**
   * @function inOutElastic
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  }

  /**
   * @function inBack
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inBack = function(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  }

  /**
   * @function outBack
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outBack = function(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  }

  /**
   * @function inOutBack
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutBack = function(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  }

  /**
   * @function inBounce
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inBounce = function(t, b, c, d) {
    return c - Math.Ease.outBounce(d - t, 0, c, d) + b;
  }

  /**
   * @function outBounce
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.outBounce = function(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  }

  /**
   * @function inOutBounce
   * @memberof Math.Ease
   * @static
   * @param {Number} t
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   */
  Math.Ease.inOutBounce = function(t, b, c, d) {
    if (t < d / 2) return Math.Ease.inBounce(t * 2, 0, c, d) * .5 + b;
    return Math.Ease.outBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }

  /*
   * Exports
   */
  global.Math = Math;
})(window);
