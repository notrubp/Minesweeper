/**
 * Exception handling helper.
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
  var Log = global.Log;
  var Scheduler = global.Scheduler;

  /**
   * Exception handling helper.
   * @namespace Exception
   */
  var Exception = {};

  /**
   * Handle an exception.
   * @function handle
   * @memberof Exception
   * @static
   * @param {*} exception
   */
  Exception.handle = function(exception) {
    Log.error('exception', exception.hasOwnProperty('stack') ? exception.stack : exception);
  }

  /**
   * Handle an exception later. Good for non-blocking exception handling in places where performance is key.
   * @function deferred
   * @memberof Exception
   * @static
   * @param {*} exception
   */
  Exception.deferred = function(exception) {
    Scheduler.deferred(this.handle.bind(this, exception));
  }

  /*
   * Exports
   */
  global.Exception = Exception;
})(window);
