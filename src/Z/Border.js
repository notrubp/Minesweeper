/**
 * CSS border generator.
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
   * Imports
   */
  var Unit = global.Unit;

  /*
   * CSS border generator.
   * @class Border
   * @param {Number|Unit} thickness
   * @param {String} style
   * @param {Color} color
   */
  var Border = function(thickness, style, color) {
    this.css = (typeof thickness === Number ? Unit.px(thickness) : thickness) + ' ' + style + ' ' + color.__propertyHook();
  }

  /*
   * Property hook.
   */
  Border.prototype.__propertyHook = function() {
    return this.css;
  }

  /**
   * Make a new border.
   * @function make
   * @memberof Border
   * @static
   * @param {Number|Unit} thickness
   * @param {String} style
   * @param {Color} color
   */
  Border.make = function(thickness, style, color) {
    return new Border(thickness, style, color);
  }

  /*
   * Exports
   */
  global.Border = Border;
})(window);
