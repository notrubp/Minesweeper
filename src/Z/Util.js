/**
 * Various code level utilities.
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
   * Various code level utilities.
   * @namespace Util
   */
  var Util = {};

  /**
   * Syntax utility for creating a static "daisy chain" function for an instance method.
   * @function makeDaisyChain
   * @memberof Util
   * @static
   * @param {constructor} ctor - Object constructor.
   * @param {function} member - Member function.
   * @returns {function}
   * @example
   * function A() {
   *   this.value = 0
   * }
   *
   * A.prototype.set = funciton(value) {
   *   this.value = value;
   *   return this;
   * }
   *
   * A.prototype.add = function(value) {
   *   this.value += value;
   *   return this;
   * }
   *
   * A.prototype.mul = function(value) {
   *   this.value *= value;
   *   return this;
   * }
   *
   * A.prototype.get = function() {
   *   return this.value;
   * }
   *
   * A.set = Util.makeDaisyChain(A, A.prototype.set)
   * A.add = Util.makeDaisyChain(A, A.prototype.add)
   * A.mul = Util.makeDaisyChain(A, A.prototype.mul)
   *
   * // Returns 8.
   * A.set(2).add(2).mul(2).get()
   */
  Util.makeDaisyChain = function(ctor, member) {
    return function() {
      return member.apply(new ctor(), arguments);
    }
  }

  /**
   * Inherit from a parent class.
   * @function inherit
   * @memberof Util
   * @static
   * @param {Object} parent
   * @param {Object} child
   */
  Util.inherit = function(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }

  /**
   * Merge two objects.
   * @function merge
   * @memberof Util
   * @static
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} Returns dest.
   */
  Util.merge = function(dest, src) {
    for (var k in src) {
      if (src.hasOwnProperty(k)) {
        dest[k] = src[k];
      }
    }

    return dest;
  }

  /**
   * Extend an object's prototype with the provided prototype.
   * @function extend
   * @memberof Util
   * @static
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} Returns dest.
   */
  Util.extend = function(dest, src) {
    return Util.merge(dest.prototype, src);
  }

  /*
   * Exports
   */
  global.Util = Util;
})(window);
