/**
 * CSS transform generator.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform}
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
  var Unit = global.Unit;

  function fixup(_this) {
    if (_this.css === 'none') {
      _this.css = '';
    } else if (_this.css.length > 0) {
      _this.css += ' ';
    }
  }

  /**
   * @description CSS transform generator.
   * <p>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform}
   * @class Transform
   * @example
   * Transform.translate(Unit.px(100), Unit.px(100))
   *   .rotate(Math.PI)
   *   .scale(2, 2)
   */
  var Transform = function() {
    this.none();
  }

  /*
   * Property hook.
   */
  Transform.prototype.__propertyHook = function() {
    return this.css;
  }

  /*
   * Java style equals()
   */
  Transform.prototype.equals = function(that) {
    if (that == null) {
      return false;
    }

    if (this === that) {
      return true;
    }

    if (that instanceof Transform) {
      return this.css === that.css;
    }

    return false;
  }
  
  /**
   * Set to no transform.
   * @function none
   * @memberof Transform
   * @instance
   * @returns {Transform}
   */
  Transform.prototype.none = function() {
    this.css = 'none';
    return this;
  }

  /**
   * 2x3 matrix.
   * @function matrix
   * @memberof Transform
   * @instance
   * @param {Number} xx
   * @param {Number} xy
   * @param {Number} yx
   * @param {Number} yy
   * @param {Number} tx
   * @param {Number} ty
   * @returns {Transform}
   */
  Transform.prototype.matrix = function(xx, xy, yx, yy, tx, ty) {
    fixup(this);
    this.css += 'matrix(' + xx + ',' + xy + ',' + yx + ',' + yy + ',' + tx + ',' + ty + ')';
    return this;
  }

  /**
   * 4x4 matrix.
   * @function matrix3d
   * @memberof Transform
   * @instance
   * @param {Number} xx
   * @param {Number} xy
   * @param {Number} xz
   * @param {Number} xw
   * @param {Number} yx
   * @param {Number} yy
   * @param {Number} yz
   * @param {Number} yw
   * @param {Number} zx
   * @param {Number} zy
   * @param {Number} zz
   * @param {Number} zw
   * @param {Number} tx
   * @param {Number} ty
   * @param {Number} tz
   * @param {Number} tw
   * @returns {Transform}
   */
  Transform.prototype.matrix3d = function(xx, xy, xz, xw, yx, yy, yz, yw, zx, zy, zz, zw, tx, ty, tz, tw) {
    fixup(this);
    this.css += 'matrix3d(' + xx + ',' + xy + ',' + xz + ',' + xw + ',' + yx + ',' + yy + ',' + yz + ',' + yw + ',' + zx + ',' + zy + ',' + zz + ',' + zw + ',' + tx + ',' + ty + ',' + tz + ',' + tw + ')';
    return this;
  }

  /**
   * 2D translate.
   * @function translate
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @param {Number} y
   * @returns {Transform}
   */
  Transform.prototype.translate = function(x, y) {
    fixup(this);
    this.css += 'translate(' + x + ',' + y + ')';
    return this;
  }

  /**
   * 3D translate.
   * @function translate3d
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Transform}
   */
  Transform.prototype.translate3d = function(x, y, z) {
    fixup(this);
    this.css += 'translate3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /**
   * Translate on X axis.
   * @function translateX
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @returns {Transform}
   */
  Transform.prototype.translateX = function(x) {
    fixup(this);
    this.css += 'translateX(' + x + ')';
    return this;
  }

  /**
   * Translate on Y axis.
   * @function translateY
   * @memberof Transform
   * @instance
   * @param {Number} y
   * @returns {Transform}
   */
  Transform.prototype.translateY = function(y) {
    fixup(this);
    this.css += 'translateY(' + y + ')';
    return this;
  }

  /**
   * Translate on Z axis.
   * @function translateZ
   * @memberof Transform
   * @instance
   * @param {Number} z
   * @returns {Transform}
   */
  Transform.prototype.translateZ = function(z) {
    fixup(this);
    this.css += 'translateZ(' + z + ')';
    return this;
  }

  /**
   * 2D scale.
   * @function scale
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @param {Number} y
   * @returns {Transform}
   */
  Transform.prototype.scale = function(x, y) {
    fixup(this);
    this.css += 'scale(' + x + ',' + y + ')';
    return this;
  }

  /**
   * 3D scale.
   * @function scale3d
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Transform}
   */
  Transform.prototype.scale3d = function(x, y, z) {
    fixup(this);
    this.css += 'scale3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /**
   * Scale on X axis.
   * @function scaleX
   * @memberof Transform
   * @instance
   * @param {Number} x
   * @returns {Transform}
   */
  Transform.prototype.scaleX = function(x) {
    fixup(this);
    this.css += 'scaleX(' + x + ')';
    return this;
  }

  /**
   * Scale on Y axis.
   * @function scaleY
   * @memberof Transform
   * @instance
   * @param {Number} y
   * @returns {Transform}
   */
  Transform.prototype.scaleY = function(y) {
    fixup(this);
    this.css += 'scaleY(' + y + ')';
    return this;
  }

  /**
   * Scale on Z axis.
   * @function scaleZ
   * @memberof Transform
   * @instance
   * @param {Number} z
   * @returns {Transform}
   */
  Transform.prototype.scaleZ = function(z) {
    fixup(this);
    this.css += 'scaleZ(' + z + ')';
    return this;
  }

  /**
   * 2D rotate (Z axis).
   * @function rotate
   * @memberof Transform
   * @instance
   * @param {Number} a - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.rotate = function(a) {
    fixup(this);
    this.css += 'rotate(' + a + 'rad)';
    return this;
  }

  /**
   * 3D rotate.
   * @function rotate3d
   * @memberof Transform
   * @instance
   * @param {Number} x - Angle in radians.
   * @param {Number} y - Angle in radians.
   * @param {Number} z - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.rotate3d = function(x, y, z) {
    fixup(this);
    this.css += 'rotate3d(' + x + 'rad,' + y + 'rad,' + z + 'rad)';
    return this;
  }

  /**
   * Rotate on X axis.
   * @function rotateX
   * @memberof Transform
   * @instance
   * @param {Number} x - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.rotateX = function(x) {
    fixup(this);
    this.css += 'rotateX(' + x + 'rad)';
    return this;
  }

  /**
   * Rotate on Y axis.
   * @function rotateY
   * @memberof Transform
   * @instance
   * @param {Number} y - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.rotateY = function(y) {
    fixup(this);
    this.css += 'rotateY(' + y + 'rad)';
    return this;
  }

  /**
   * Rotate on Z axis.
   * @function rotateZ
   * @memberof Transform
   * @instance
   * @param {Number} z - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.rotateZ = function(z) {
    fixup(this);
    this.css += 'rotateZ(' + z + 'rad)';
    return this;
  }

  /**
   * 2D skew.
   * @function skew
   * @memberof Transform
   * @instance
   * @param {Number} x - Angle in radians.
   * @param {Number} y - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.skew = function(x, y) {
    fixup(this);
    this.css += 'skew(' + x + 'rad,' + y + 'rad)';
    return this;
  }

  /**
   * Skew on X axis.
   * @function skewX
   * @memberof Transform
   * @instance
   * @param {Number} x - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.skewX = function(x) {
    fixup(this);
    this.css += 'skewX(' + x + 'rad)';
    return this;
  }

  /**
   * Skew on Y axis.
   * @function skewY
   * @memberof Transform
   * @instance
   * @param {Number} y - Angle in radians.
   * @returns {Transform}
   */
  Transform.prototype.skewY = function(y) {
    fixup(this);
    this.css += 'skewY(' + y + 'rad)';
    return this;
  }

  /**
   * @function none
   * @memberof Transform
   * @static
   * @see Transform#none
   * @returns {Transform}
   */
  Transform.none = Util.makeDaisyChain(Transform, Transform.prototype.none);

  /**
   * @function matrix
   * @memberof Transform
   * @static
   * @see Transform#matrix
   * @returns {Transform}
   */
  Transform.matrix = Util.makeDaisyChain(Transform, Transform.prototype.matrix);

  /**
   * @function matrix3d
   * @memberof Transform
   * @static
   * @see Transform#matrix3d
   * @returns {Transform}
   */
  Transform.matrix3d = Util.makeDaisyChain(Transform, Transform.prototype.matrix3d);

  /**
   * @function translate
   * @memberof Transform
   * @static
   * @see Transform#translate
   * @returns {Transform}
   */
  Transform.translate = Util.makeDaisyChain(Transform, Transform.prototype.translate);

  /**
   * @function translate3d
   * @memberof Transform
   * @static
   * @see Transform#translate3d
   * @returns {Transform}
   */
  Transform.translate3d = Util.makeDaisyChain(Transform, Transform.prototype.translate3d);

  /**
   * @function translateX
   * @memberof Transform
   * @static
   * @see Transform#translateX
   * @returns {Transform}
   */
  Transform.translateX = Util.makeDaisyChain(Transform, Transform.prototype.translateX);

  /**
   * @function translateY
   * @memberof Transform
   * @static
   * @see Transform#translateY
   * @returns {Transform}
   */
  Transform.translateY = Util.makeDaisyChain(Transform, Transform.prototype.translateY);

  /**
   * @function translateZ
   * @memberof Transform
   * @static
   * @see Transform#translateZ
   * @returns {Transform}
   */
  Transform.translateZ = Util.makeDaisyChain(Transform, Transform.prototype.translateZ);

  /**
   * @function scale
   * @memberof Transform
   * @static
   * @see Transform#scale
   * @returns {Transform}
   */
  Transform.scale = Util.makeDaisyChain(Transform, Transform.prototype.scale);

  /**
   * @function scale3d
   * @memberof Transform
   * @static
   * @see Transform#scale3d
   * @returns {Transform}
   */
  Transform.scale3d = Util.makeDaisyChain(Transform, Transform.prototype.scale3d);

  /**
   * @function scaleX
   * @memberof Transform
   * @static
   * @see Transform#scaleX
   * @returns {Transform}
   */
  Transform.scaleX = Util.makeDaisyChain(Transform, Transform.prototype.scaleX);

  /**
   * @function scaleY
   * @memberof Transform
   * @static
   * @see Transform#scaleY
   * @returns {Transform}
   */
  Transform.scaleY = Util.makeDaisyChain(Transform, Transform.prototype.scaleY);

  /**
   * @function scaleZ
   * @memberof Transform
   * @static
   * @see Transform#scaleZ
   * @returns {Transform}
   */
  Transform.scaleZ = Util.makeDaisyChain(Transform, Transform.prototype.scaleZ);

  /**
   * @function rotate
   * @memberof Transform
   * @static
   * @see Transform#rotate
   * @returns {Transform}
   */
  Transform.rotate = Util.makeDaisyChain(Transform, Transform.prototype.rotate);

  /**
   * @function rotate3d
   * @memberof Transform
   * @static
   * @see Transform#rotate3d
   * @returns {Transform}
   */
  Transform.rotate3d = Util.makeDaisyChain(Transform, Transform.prototype.rotate3d);

  /**
   * @function rotateX
   * @memberof Transform
   * @static
   * @see Transform#rotateX
   * @returns {Transform}
   */
  Transform.rotateX = Util.makeDaisyChain(Transform, Transform.prototype.rotateX);

  /**
   * @function rotateY
   * @memberof Transform
   * @static
   * @see Transform#rotateY
   * @returns {Transform}
   */
  Transform.rotateY = Util.makeDaisyChain(Transform, Transform.prototype.rotateY);

  /**
   * @function rotateZ
   * @memberof Transform
   * @static
   * @see Transform#rotateZ
   * @returns {Transform}
   */
  Transform.rotateZ = Util.makeDaisyChain(Transform, Transform.prototype.rotateZ);

  /**
   * @function skew
   * @memberof Transform
   * @static
   * @see Transform#skew
   * @returns {Transform}
   */
  Transform.skew = Util.makeDaisyChain(Transform, Transform.prototype.skew);

  /**
   * @function skewX
   * @memberof Transform
   * @static
   * @see Transform#skewX
   * @returns {Transform}
   */
  Transform.skewX = Util.makeDaisyChain(Transform, Transform.prototype.skewX);

  /**
   * @function skewY
   * @memberof Transform
   * @static
   * @see Transform#skewY
   * @returns {Transform}
   */
  Transform.skewY = Util.makeDaisyChain(Transform, Transform.prototype.skewY);

  /**
   * Origin (0, 0).
   * @constant {Transform} Origin
   * @memberof Transform
   * @static
   */
  Transform.Origin = Transform.translate('0px', '0px');

  /*
   * Exports
   */
  global.Transform = Transform;
})(window);
