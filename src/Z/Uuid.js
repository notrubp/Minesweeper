/**
 * Universially unique identifier utility.
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
  var Random = global.Random;

  /**
   * Universially unique identifier utility.
   * @namespace Uuid
  */
  var Uuid = {};

  var chars = '0123456789abcdef';

  function rfc4122Replacer(match, offset, string) {
    var j = Random.range(chars.length);
    return chars[offset == 19 ? (j & 0x3) | 0x8 : j & 0xf];
  }

  /**
   * @description Generate a RFC4122 Version 4 UUID.
   * <br>
   * {@link https://www.ietf.org/rfc/rfc4122.txt}
   * @function rfc4122
   * @memberof Uuid
   * @static
   * @returns {String}
  */
  Uuid.rfc4122 = function() {
    return '00000000-0000-4000-0000-000000000000'.replace(/0/g, rfc4122Replacer);
  }

  var letters = 'abcdefghijklmnopqrstuvwxyz';

  /**
   * Generate a random string of letters.
   * @function letters
   * @memberof Uuid
   * @static
   * @param {Number} [length=36] - Length of the string.
   * @returns {String}
   */
  Uuid.letters = function(length) {
    length = length || 36;

    var out = '';

    for (var i = 0; i < length; ++i) {
      var j = Random.range(letters.length);
      out += letters[j];
    }

    return out;
  }

  /*
   * Exports
   */
  global.Uuid = Uuid;
})(window);
