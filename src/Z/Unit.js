/**
 * CSS unit utility.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length}
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
   * @description CSS unit utility.
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length}
   * @namespace Unit
   * @example
   * // Generates '1px'.
   * Unit.px(1)
   *
   * // Generates '100%'.
   * Unit.pct(100)
   */
  var Unit = {}

  function make(unit, value) {
    return value + unit;
  }

  /**
   * A basic, non-annotated value.
   * @function val
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.val = make.bind(null, '');

  /**
   * One millimeter.
   * @function mm
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.mm = make.bind(null, 'mm');

  /**
   * One centimeter (10 millimeters).
   * @function cm
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.cm = make.bind(null, 'cm');

  /**
   * This unit represents the width, or more precisely the advance measure, of the glyph '0' (zero, the Unicode character U+0030) in the element's font.
   * @function ex
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.ch = make.bind(null, 'ch');

  /**
   * This unit represents the font-size of the root element (e.g. the font-size of the <html> element). When used on the font-size on this root element, it represents its initial value.
   * @function rem
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.rem = make.bind(null, 'rem');

  /**
   * 1/100th of the height of the viewport.
   * @function vh
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.vh = make.bind(null, 'vh');

  /**
   * 1/100th of the width of the viewport.
   * @function vw
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.vw = make.bind(null, 'vw');

  /**
   * 1/100th of the minimum value between the height and the width of the viewport.
   * @function vmin
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.vmin = make.bind(null, 'vmin');

  /**
   * 1/100th of the maximum value between the height and the width of the viewport.
   * @function vmax
   * @memberof Unit
   * @static
   * @returns {String}
   */
  Unit.vmax = make.bind(null, 'vmax');

  /**
   * One inch (2.54 centimeters).
   * @function in
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.in = make.bind(null, 'in');

  /**
   * One pica (which is 12 points).
   * @function pc
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.pc = make.bind(null, 'pc');

  /**
   * One point (which is 1/72 of an inch).
   * @function pt
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.pt = make.bind(null, 'pt');

  /**
   * This unit represents the x-height of the element's font. On fonts with the 'x' letter, this is generally the height of lowercase letters in the font; 1ex ≈ 0.5em in many fonts.
   * @function ex
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.ex = make.bind(null, 'ex');

  /**
   * This unit represents the calculated font-size of the element. If used on the font-size property itself, it represents the inherited font-size of the element.
   * @function em
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.em = make.bind(null, 'em');

  /**
   * @description This unit is calculated in terms of the parent object's properties.
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/percentage}
   * @function pct
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.pct = make.bind(null, '%');

  /**
   * @description Relative to the viewing device.
   * <br>
   * For screen display, typically one device pixel (dot) of the display.
   * <br>
   * For printers and very high resolution screens one CSS pixel implies multiple device pixels, so that the number of pixel per inch stays around 96.
   * @function px
   * @memberof Unit
   * @static
   * @returns {String}
  */
  Unit.px = make.bind(null, 'px');

  Unit.Zero = Unit.px(0);

  /*
   * Exports
   */
  global.Unit = Unit;
})(window);
