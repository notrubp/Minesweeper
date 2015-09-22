/**
 * Random numbers utility.
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

  /*
   * Random number utility.
   * @namespace Random
   */
  var Random = {};

  /*
   * Generate a random ratio.
   * @function ratio
   * @memberof Random
   * @static
   * @returns {Number} A random ratio.
   */
  Random.ratio = function() {
    return Math.random();
  }

  /*
   * Generate a random signed 32-bit number.
   * @function number
   * @memberof Random
   * @static
   * @returns {Number} A random signed 32-bit number.
   */
  Random.number = function() {
    return Math.floor(Math.random() * 4294967296) - 2147483648;
  }

  /*
   * Generate a random range.
   * @function range
   * @memberof Random
   * @static
   * @param {Number} upperBound - The upper bound of the range.
   * @returns {Number} A random range.
  */
  Random.range = function(upperBound) {
    return Math.floor(Math.random() * upperBound);
  }

  /*
   * Exports
   */
  global.Random = Random;
})(window);
