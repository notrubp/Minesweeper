/**
 * Logging helper.
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
   * Logging helper.
   * @namespace Log
   */
  var Log = {};

  var tags = [];

  function log(func, tag, message) {
    if (tags.indexOf(tag) != -1) {
      return func.call(this, '[' + tag + ']: ' + message);
    }
  }

  /**
   * Log to info channel.
   * @function info
   * @memberof Log
   * @static
   * @param {String} tag
   * @param {*} contents
   */
  Log.info = log.bind(console, console.info);

  /**
   * Log to debug channel.
   * @function debug
   * @memberof Log
   * @static
   * @param {String} tag
   * @param {*} contents
   */
  Log.debug = log.bind(console, console.debug); 

  /**
   * Log to warn channel.
   * @function warn
   * @memberof Log
   * @static
   * @param {String} tag
   * @param {*} contents
   */
  Log.warn = log.bind(console, console.warn);

  /**
   * Log to error channel.
   * @function error
   * @memberof Log
   * @static
   * @param {String} tag
   * @param {*} contents
   */
  Log.error = log.bind(console, console.error);


  /**
   * Logging tags.
   * @namespace Tags
   * @memberof Log
   */
  Log.Tags = {};

  /**
   * Enable a tag.
   * @function enable
   * @memberof Log.Tags
   * @static
   * @param {String} tag
   */
  Log.Tags.enable = function(tag) {
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
    }
  }

  /**
   * Disable a tag.
   * @function disable
   * @memberof Log.Tags
   * @static
   * @param {String} tag
   */
  Log.Tags.disable = function(tag) {
    var i = tags.indexOf(tag);

    if (i != -1) {
      tags.splice(i, 1);
    }
  }

  /**
   * Returns whether or not a tag is enabled.
   * @function enabled
   * @memberof Log.Tags
   * @static
   * @param {String} tag
   * @returns {Boolean} Whether or not tag is enabled.
   */
  Log.Tags.enabled = function(tag) {
    return tags.indexOf(tag) != -1;
  }

  /**
   * Disables all tags.
   * @function disableAll
   * @memberof Log.Tags
   * @static
   */
  Log.Tags.disableAll = function() {
    tags = [];
  }

  /*
   * Exports
   */
  global.Log = Log;
})(window);
