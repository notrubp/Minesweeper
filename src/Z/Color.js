/**
 * RGBA color object.
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
  var Util = global.Util;
  var Random = global.Random;

  /**
   * RGBA color.
   * @class Color
   * @param {Number=} r
   * @param {Number=} g
   * @param {Number=} b
   * @param {Number=} a
   */
  var Color = function(r, g, b, a) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
  }

  /*
   * Property hook.
   */
  Color.prototype.__propertyHook = function() {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  }

  /**
   * Set RGB values.
   * @function rgb
   * @memberof Color
   * @instance
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @returns {Color}
   */
  Color.prototype.rgb = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /**
   * Set RGBA values.
   * @function rgba
   * @memberof Color
   * @instance
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   * @returns {Color}
   */
  Color.prototype.rgba = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  /**
   * Set to random RGB values.
   * @function randomRgb
   * @memberof Color
   * @instance
   * @returns {Color}
   */
  Color.prototype.randomRgb = function() {
    return this.randomRgba(1);
  }

  /**
   * Set to random RGB values with option to set alpha.
   * @function randomRgba
   * @memberof Color
   * @instance
   * @param {Number} a
   * @returns {Color}
   */
  Color.prototype.randomRgba = function(a) {
    return this.rgba(Random.range(255), Random.range(255), Random.range(255), a);
  }

  /**
   * Set the red value.
   * @function setRed
   * @memberof Color
   * @instance
   * @param {Number} r
   * @returns {Color}
   */
  Color.prototype.setRed = function(r) {
    this.r = r;
    return this;
  }

  /**
   * Get the red value.
   * @function getRed
   * @memberof Color
   * @instance
   * @returns {Number} The red value.
   */
  Color.prototype.getRed = function() {
    return this.r;
  }

  /**
   * Set the green value.
   * @function setGreen
   * @memberof Color
   * @instance
   * @param {Number} g
   * @returns {Color}
   */
  Color.prototype.setGreen = function(g) {
    this.g = g;
    return this;
  }

  /**
   * Get the green value.
   * @function getGreen
   * @memberof Color
   * @instance
   * @returns {Number} The green value.
   */
  Color.prototype.getGreen = function() {
    return this.g;
  }

  /**
   * Set the blue value.
   * @function setBlue
   * @memberof Color
   * @instance
   * @param {Number} b
   * @returns {Color}
   */
  Color.prototype.setBlue = function(b) {
    this.b = b;
    return this;
  }

  /**
   * Get the blue value.
   * @function getBlue
   * @memberof Color
   * @instance
   * @returns {Number} The blue value.
   */
  Color.prototype.getBlue = function() {
    return this.b;
  }

  /**
   * Set the alpha value.
   * @function setAlpha
   * @memberof Color
   * @instance
   * @param {Number} a
   * @returns {Color}
   */
  Color.prototype.setAlpha = function(a) {
    this.a = a;
    return this;
  }

  /**
   * Get the alpha value.
   * @function getAlpha
   * @memberof Color
   * @instance
   * @returns {Number} The alpha value.
   */
  Color.prototype.getAlpha = function() {
    return this.a;
  }
  
  /**
   * @function rgb
   * @memberof Color
   * @static
   * @see Color#rgb
   * @returns {Color}
   */
  Color.rgb = Util.makeDaisyChain(Color, Color.prototype.rgb);

  /**
   * @function rgba
   * @memberof Color
   * @static
   * @see Color#rgba
   * @returns {Color}
   */
  Color.rgba = Util.makeDaisyChain(Color, Color.prototype.rgba);

  /**
   * @function randomRgb
   * @memberof Color
   * @static
   * @see Color#randomRgb
   * @returns {Color}
   */
  Color.randomRgb = Util.makeDaisyChain(Color, Color.prototype.randomRgb);

  /**
   * @function randomRgba
   * @memberof Color
   * @static
   * @see Color#randomRgba
   * @returns {Color}
   */
  Color.randomRgba = Util.makeDaisyChain(Color, Color.prototype.randomRgba);

  /**
   * @function setRed
   * @memberof Color
   * @static
   * @see Color#setRed
   * @returns {Color}
   */
  Color.setRed = Util.makeDaisyChain(Color, Color.prototype.setRed);

  /**
   * @function setGreen
   * @memberof Color
   * @static
   * @see Color#setGreen
   * @returns {Color}
   */
  Color.setGreen = Util.makeDaisyChain(Color, Color.prototype.setGreen);

  /**
   * @function setBlue
   * @memberof Color
   * @static
   * @see Color#setBlue
   * @returns {Color}
   */
  Color.setBlue = Util.makeDaisyChain(Color, Color.prototype.setBlue);

  /**
   * @function setAlpha
   * @memberof Color
   * @static
   * @see Color#setAlpha
   * @returns {Color}
   */
  Color.setAlpha = Util.makeDaisyChain(Color, Color.prototype.setAlpha);

  /**
   * Transparent color.
   * @constant {Color} Transparent
   * @memberof Color
   * @static
   */
  Color.Transparent = Color.rgba(0, 0, 0, 0);

  /**
   * Black color.
   * @constant {Color} Black
   * @memberof Color
   * @static
   */
  Color.Black = Color.rgb(0, 0, 0);

  /**
   * White color.
   * @constant {Color} White
   * @memberof Color
   * @static
   */
  Color.White = Color.rgb(1, 1, 1);

  /**
   * Red color.
   * @constant {Color} Red
   * @memberof Color
   * @static
   */
  Color.Red = Color.rgb(1, 0, 0);

  /**
   * Green color.
   * @constant {Color} Green
   * @memberof Color
   * @static
   */
  Color.Green = Color.rgb(0, 1, 0);

  /**
   * Blue color.
   * @constant {Color} Blue
   * @memberof Color
   * @static
   */
  Color.Blue = Color.rgb(0, 0, 1);
  
  /*
   * Exports
   */
  global.Color = Color;
})(window);
