/**
 * CSS transition generator.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition}
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
  var Property = global.Property;

  /**
   * @description CSS transition generator.
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition}
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions}
   * @class Transition
   * @example
   * Transition.set('transform', 5, 'linear')
   *   .set('background-color', 5, 'linear')
   */
  var Transition = function() {
    this.clear();
  }

  /*
   * Property hook.
   */
  Transition.prototype.__propertyHook = function() {
    return this.css;
  }

  /**
   * Clear all currently set properties.
   * @function clear
   * @memberof Transition
   * @instance
   * @returns {Transition}
   */
  Transition.prototype.clear = function() {
    this.css = '';
    return this;
  }

  /**
   * Set a transition property.
   * @function set
   * @memberof Transition
   * @instance
   * @param {String} prop - A CSS property.
   * @param {Number} [duration=1] - Duration in seconds.
   * @param {String} [timing=ease] - CSS timing function. 
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function}
   * @param {Number} [delay=0] - Delay in seconds.
   * @returns {Transition}
   */
  Transition.prototype.set = function(prop, duration, timing, delay) {
    duration = duration || 1;
    timing = timing || 'ease';
    delay = delay || 0;

    if (this.css.length > 0) {
      this.css += ', ';
    }

    // Evaluate property fixups.
    prop = Property.fixupNocc(prop);

    this.css += prop + ' ' + duration + 's ' + timing + ' ' + delay + 's';

    return this;
  }

  /**
   * @function clear
   * @memberof Transition
   * @static
   * @see Transition#clear
   * @returns {Transition}
   */
  Transition.clear = Util.makeDaisyChain(Transition, Transition.prototype.clear);

  /**
   * @function set
   * @memberof Transition
   * @static
   * @see Transition#set
   * @returns {Transition}
   */
  Transition.set = Util.makeDaisyChain(Transition, Transition.prototype.set);

  /*
   * Exports
   */
  global.Transition = Transition;
})(window);
