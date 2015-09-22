/**
 * Scheduling utility.
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
   * Scheduling utility.
   * @namespace Scheduler
   */
  var Scheduler = {};

  /**
   * Schedule a callback for later in the event loop.
   * @function deferred
   * @memberof Scheduler
   * @static
   * @param {function} callback
   * @returns {Number} A setTimeout id.
   */
  Scheduler.deferred = function(callback) {
    return setTimeout(callback, 0);
  }

  /*
   * requestAnimationFrame polyfill.
   */
  var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

  for ( var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  var last = 0;

  window.polyfillRequestAnimationFrame = function(callback) {
    var cur = new Date().getTime();
    var time = Math.max(0, 16 - (cur - last));

    var id = setTimeout(function() {
      callback(cur + time);
    }, time);

    last = cur + time;

    return id;
  };

  window.polyfillCancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  window.isPolyfillRequestAnimationFrame = !window.requestAnimationFrame;

  if (window.isPolyfillRequestAnimationFrame) {
    window.requestAnimationFrame = window.polyfillRequestAnimationFrame;
    window.cancelAnimationFrame = window.polyfillCancelAnimationFrame;
  }

  /**
   * @description Schedule a callback for the next animation frame.
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame}
   * @function raf
   * @memberof Scheduler
   * @static
   * @param {function} callback
   * @returns {Number} A requestAnimationFrame id.
   */
  Scheduler.raf = function(callback) {
    return requestAnimationFrame(callback);
  }

  /*
  */
  global.Scheduler = Scheduler;
})(window);
