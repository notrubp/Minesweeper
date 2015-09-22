/**
 * Represents a 2-dimentional rectangle.
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
  var Point = global.Point;

  /**
   * Represents a 2-dimentional rectangle.
   * @class Rect
   * @param {Number=} t
   * @param {Number=} l
   * @param {Number=} b
   * @param {Number=} r
   */
  var Rect = function(t, l, b, r) {
    this.tl = new Point(t, l);
    this.br = new Point(b, r);
  }

  /*
   * Property hook.
   */
  Rect.prototype.__propertyHook = function() {
    return 'rect(' + this.tl.x + ',' + this.tl.y + ',' + this.br.x + ',' + this.br.y + ')';
  }

  /**
   * Set values.
   * @function set
   * @memberof Rect
   * @instance
   * @param {Number} t
   * @param {Number} l
   * @param {Number} b
   * @param {Number} r
   * @returns {Rect}
   */
  Rect.prototype.set = function(t, l, b, r) {
    this.tl.set(t, l);
    this.br.set(b, r);
    return this;
  }

  /**
   * Copy values from another {@link Rect}.
   * @function copy
   * @memberof Rect
   * @instance
   * @param {Rect} r
   * @returns {Rect}
   */
  Rect.prototype.copy = function(r) {
    this.tl.copy(r.tl);
    this.br.copy(r.br);
    return this;
  }

  /**
   * Set the left value.
   * @function setLeft
   * @memberof Rect
   * @instance
   * @param {Number} l
   * @returns {Rect}
   */
  Rect.prototype.setLeft = function(l) {
    this.tl.x = l;
    return this;
  }

  /**
   * Get the left value.
   * @function getLeft
   * @memberof Rect
   * @instance
   * @returns {Number} The left value.
   */
  Rect.prototype.getLeft = function() {
    return this.tl.x;
  }

  /**
   * Set the top value.
   * @function setTop
   * @memberof Rect
   * @instance
   * @param {Number} t
   * @returns {Rect}
   */
  Rect.prototype.setTop = function(t) {
    this.tl.y = t;
    return this;
  }

  /**
   * Get the top value.
   * @function getTop
   * @memberof Rect
   * @instance
   * @returns {Number} The top value.
   */
  Rect.prototype.getTop = function() {
    return this.tl.y;
  }

  /**
   * Set the right value.
   * @function setRight
   * @memberof Rect
   * @instance
   * @param {Number} r
   * @returns {Rect}
   */
  Rect.prototype.setRight = function(r) {
    this.br.x = r;
    return this;
  }

  /**
   * Get the right value.
   * @function getRight
   * @memberof Rect
   * @instance
   * @returns {Number} The right value.
   */
  Rect.prototype.getRight = function() {
    return this.br.x;
  }

  /**
   * Set the bottom value.
   * @function setBottom
   * @memberof Rect
   * @instance
   * @param {Number} b
   * @returns {Rect}
   */
  Rect.prototype.setBottom = function(b) {
    this.br.y = b;
    return this;
  }

  /**
   * Get the bottom value.
   * @function getBottom
   * @memberof Rect
   * @instance
   * @returns {Number} The bottom value.
   */
  Rect.prototype.getBottom = function() {
    return this.br.y;
  }

  /**
   * Set the width.
   * @function setWidth
   * @memberof Rect
   * @instance
   * @param {Number} w
   * @returns {Rect}
   */
  Rect.prototype.setWidth = function(w) {
    this.setRight(this.tl.x + w);
    return this;
  }

  /**
   * Get the width.
   * @function getWidth
   * @memberof Rect
   * @instance
   * @returns {Number} The width.
   */
  Rect.prototype.getWidth = function() {
    return this.br.x - this.tl.x;
  }

  /**
   * Set the height.
   * @function setHeight
   * @memberof Rect
   * @instance
   * @param {Number} h
   * @returns {Rect}
   */
  Rect.prototype.setHeight = function(h) {
    this.setBottom(this.tl.y + h);
    return this;
  }

  /**
   * Get the height.
   * @function getHeight
   * @memberof Rect
   * @instance
   * @returns {Number} The height.
   */
  Rect.prototype.getHeight = function() {
    return this.br.y - this.tl.y;
  }

  /**
   * Calculate the centroid.
   * {@link http://en.wikipedia.org/wiki/Centroid}
   * @function centroid
   * @memberof Rect
   * @instance
   * @returns {Point} The centroid.
   */
  Rect.prototype.centroid = function() {
    return new Point((this.tl.x + this.br.x) / 2, (this.tl.y + this.br.y) / 2);
  }

  /**
   * Determines whether or not this {@link Rect} contains the provided {@link Rect}.
   * @function contains
   * @memberof Rect
   * @instance
   * @param {Rect} r
   * @returns {Boolean} Whether or not this {@link Rect} contains the provided {@link Rect}.
   */
  Rect.prototype.contains = function(r) {
    return r.tl.x >= this.tl.x && r.tl.x <= this.br.x && r.tl.y >= this.tl.y && r.tl.y <= this.br.y;
  }

  /**
   * Determines whether or not this {@link Rect} intersects the provided {@link Rect}.
   * @function intersects
   * @memberof Rect
   * @instance
   * @param {Rect} r
   * @returns {Boolean} Whether or not this {@link Rect} intersects the provided {@link Rect}.
   */
  Rect.prototype.intersects = function(r) {
    return !(r.tl.x > this.br.x || r.br.x < this.tl.x || r.tl.y > this.br.y || r.br.y < this.tl.y);
  }

  /**
   * @function set
   * @memberof Rect
   * @static
   * @see Rect#set
   * @returns {Rect}
   */
  Rect.set = Util.makeDaisyChain(Rect, Rect.prototype.set);

  /**
   * @function copy 
   * @memberof Rect
   * @static
   * @see Rect#copy
   * @returns {Rect}
   */
  Rect.copy = Util.makeDaisyChain(Rect, Rect.prototype.copy);

  /**
   * @function setLeft 
   * @memberof Rect
   * @static
   * @see Rect#setLeft
   * @returns {Rect}
   */
  Rect.setLeft = Util.makeDaisyChain(Rect, Rect.prototype.setLeft);

  /**
   * @function setTop 
   * @memberof Rect
   * @static
   * @see Rect#setTop
   * @returns {Rect}
   */
  Rect.setTop = Util.makeDaisyChain(Rect, Rect.prototype.setTop);

  /**
   * @function setRight 
   * @memberof Rect
   * @static
   * @see Rect#setRight
   * @returns {Rect}
   */
  Rect.setRight = Util.makeDaisyChain(Rect, Rect.prototype.setRight);

  /**
   * @function setBottom 
   * @memberof Rect
   * @static
   * @see Rect#setBottom
   * @returns {Rect}
   */
  Rect.setBottom = Util.makeDaisyChain(Rect, Rect.prototype.setBottom);

  /**
   * @function setWidth 
   * @memberof Rect
   * @static
   * @see Rect#setWidth
   * @returns {Rect}
   */
  Rect.setWidth = Util.makeDaisyChain(Rect, Rect.prototype.setWidth);

  /**
   * @function setHeight 
   * @memberof Rect
   * @static
   * @see Rect#setHeight
   * @returns {Rect}
   */
  Rect.setHeight = Util.makeDaisyChain(Rect, Rect.prototype.setHeight);

  /**
   * Create a rect.
   * * @function make
   * @memberof Rect
   * @static
   * @param {Number} l
   * @param {Number} t
   * @param {Number} r
   * @param {Number} b
   * @returns {Rect}
   */
  Rect.make = function(l, t, r, b) {
    return new Rect(l, t, r, b);
  }

  /**
   * Create a rect from a coordinate (x, y) and size (width, height).
   * @function makeXywh
   * @memberof Rect
   * @static
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   * @returns {Rect}
   */
  Rect.makeXywh = function(x, y, w, h) {
    return new Rect(x, y, x + w, y + h);
  }

  /*
   * Exports
  */
  global.Rect = Rect;
})(window);
