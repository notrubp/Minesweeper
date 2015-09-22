/**
 * CSS @keyframes animation generator.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes}
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
  var Uuid = global.Uuid;
  var Platform = global.Platform;
  var Property = global.Property;

  /**
   * @description CSS @keyframes animation generator.
   * <br>
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes}
   * @class Keyframes
   * @param {String=} name
   * @example
   * Keyframes.at(0, 'background-color', 'white')
   *   .at(1, 'background-color', 'black')
   *   .inject()
   */
  var Keyframes = function(name) {
    this.name = name || Uuid.letters();
    this.keyframes = {};
  }

  /**
   * Create a new keyframe at the specified ratio of the animation.
   * @function at
   * @memberof Keyframes
   * @instance
   * @param {Number} ratio - The ratio where this keyframe is positioned.
   * @param {String} prop - The CSS property.
   * @param {*} value - A CSS property value or property value object.
   * @returns {Keyframes}
   */
  Keyframes.prototype.at = function(ratio, prop, value) {
    // Clamp.
    ratio = Math.min(1, ratio);
    ratio = Math.max(0, ratio);

    // Ensure it exists.
    this.keyframes[ratio] = this.keyframes[ratio] || [];

    // Evaluate property fixups.
    prop = Property.fixupNocc(prop);

    // Fixup.
    value = value != null && typeof value.__propertyHook === 'function' ? value.__propertyHook() : value;

    // Append.
    this.keyframes[ratio].push({ 'property' : prop, 'value' : value });

    return this;
  }

  /**
   * Create a new keyframe after the specified ratio of the animation.
   * @function after
   * @memberof Keyframes
   * @instance
   * @param {Number} ratio - The ratio where this keyframe is positioned.
   * @param {String} prop - The CSS property.
   * @param {*} value - A CSS property value or property value object.
   * @returns {Keyframes}
   */
  Keyframes.prototype.after = function(ratio, property, value) {
    return this.at(ratio + 0.001, property, value);
  }

  /**
   * Create a new keyframe before the specified ratio of the animation.
   * @function after
   * @memberof Keyframes
   * @instance
   * @param {Number} ratio - The ratio where this keyframe is positioned.
   * @param {String} prop - The CSS property.
   * @param {*} value - A CSS property value or property value object.
   * @returns {Keyframes}
   */
  Keyframes.prototype.before = function(ratio, property, value) {
    return this.at(ratio - 0.001, property, value);
  }

  /**
   * Set the name.
   * @function setName
   * @memberof Keyframes
   * @instance
   * @param {String} name
   * @returns {Keyframes}
  */
  Keyframes.prototype.setName = function(name) {
    this.name = name;
    return this;
  }

  /**
   * Clear all keyframes.
   * @function clear
   * @memberof Keyframes
   * @instance
   * @returns {Keyframes}
   */
  Keyframes.prototype.clear = function() {
    this.keyframes = {};
    return this;
  }

  /**
   * Get the name.
   * @function getName
   * @memberof Keyframes
   * @instance
   * @returns {String} The name.
   */
  Keyframes.prototype.getName = function() {
    return this.name;
  }

  function generate(keyframes, p, v) {
    p += ' ' + (Number(v) * 100.0) + '% {';

    var array = keyframes[v];

    var suffix = ' ';
    for (var i = 0; i < array.length; ++i) {
      var o = array[i];
      p += suffix + o.property + ': ' + o.value;
      suffix = '; ';
    }

    p += suffix + '}';

    return p;
  }

  var rulename = Platform.isWebKit ? '@-webkit-keyframes' : '@keyframes';

  /**
   * Generate CSS with the current keyframes.
   * @function generate
   * @memberof Keyframes
   * @instance
   * @return {String} A CSS @keyframes rule.
  */
  Keyframes.prototype.generate = function() {
    return Object.keys(this.keyframes)
      .sort()
      .reduce(generate.bind(null, this.keyframes), rulename + ' ' + this.name + ' {') + '}';
  }

  /*
   * Remember injected animations by name.
   */
  var injected = [];

  /**
   * Inject CSS into the document.
   * @function inject
   * @memberof Keyframes
   * @instance
   * @return {Keyframes}
   */
  Keyframes.prototype.inject = function() {
    var style = document.createElement('style');
    style.language = 'text/css';
    style.appendChild(document.createTextNode(this.generate()));
    document.getElementsByTagName('head')[0].appendChild(style);

    if (Keyframes.isNotInjected(this.name)) {
      injected.push(this.name);
    }

    return this;
  }

  /**
   * @function at 
   * @memberof Keyframes
   * @static
   * @see Keyframes#at
   * @returns {Keyframes}
   */
  Keyframes.at = Util.makeDaisyChain(Keyframes, Keyframes.prototype.at);

  /**
   * @function after 
   * @memberof Keyframes
   * @static
   * @see Keyframes#after
   * @returns {Keyframes}
   */
  Keyframes.after = Util.makeDaisyChain(Keyframes, Keyframes.prototype.after);


  /**
   * @function before 
   * @memberof Keyframes
   * @static
   * @see Keyframes#before
   * @returns {Keyframes}
   */
  Keyframes.before = Util.makeDaisyChain(Keyframes, Keyframes.prototype.before);

  /**
   * @function setName 
   * @memberof Keyframes
   * @static
   * @see Keyframes#setName
   * @returns {Keyframes}
   */
  Keyframes.setName = Util.makeDaisyChain(Keyframes, Keyframes.prototype.setName);

  /**
   * @function clear
   * @memberof Keyframes
   * @static
   * @see Keyframes#clear
   * @returns {Keyframes}
   */
  Keyframes.clear = Util.makeDaisyChain(Keyframes, Keyframes.prototype.clear);

  /**
   * Check whether the keyframes by name have already been injected.
   * @function isNotInjected
   * @memberof Keyframes
   * @static
   * @param {String} name
   * @returns {Boolean} Whether or not the keyframes by name have already been injected.
   */
  Keyframes.isNotInjected = function(name) {
    return injected.indexOf(name) == -1;
  }

  /*
   * Exports
  */
  global.Keyframes = Keyframes;
})(window);
