/**
 * Asynchronous function chain.
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
  var Scheduler = global.Scheduler;

  /**
   * Asynchronous function chain.
   * @class Chain
   * @example
   * Chain.append(function(success, failure) {
   *   setTimeout(function() { 
   *     success()
   *   }, 1000)
   * })
   * .success(function() {
   *   // Do stuff when completed.
   * })
   * .failure(function(reasons) {
   *   // Do stuff when failed.
   * })
   * .commit()
   */
  var Chain = function() {
    this.clear();
  }

  /**
   * Append a link to the end of the chain.
   * @function append
   * @memberof Chain
   * @instance
   * @param {function} link - A function link. Invoked with two function parameters for signalling success or failure.
   * @returns {Chain}
   */
  Chain.prototype.append = function(link) {
    this.links.push(link);
    return this;
  }

  /**
   * Add a success callback.
   * @function success
   * @memberof Chain
   * @instance
   * @param {function} callback
   * @returns {Chain}
   */
  Chain.prototype.success = function(callback) {
    this.successCallbacks.push(callback);
    return this;
  }

  /**
   * Add a failure callback.
   * @function failure
   * @memberof Chain
   * @instance
   * @param {function} callback - Called with an array of all thrown exceptions.
   * @returns {Chain}
   */
  Chain.prototype.failure = function(callback) {
    this.failureCallbacks.push(callback);
    return this;
  }

  /**
   * Commit the chain. This will copy the current state of the chain into a closure and clear the current state. Any 
   * modifications prior to calling commit() will only be applicable to the next call of commit().
   * @function commit
   * @memberof Chain
   * @instance
   * @returns {Chain}
   */
  Chain.prototype.commit = function() {
    if (this.links.length > 0) {
      /*
       * Snapshot of current state, any modifications after commit() will not be applicable.
       */
      var links = this.links;
      var successCallbacks = this.successCallbacks;
      var failureCallbacks = this.failureCallbacks;
      var ordered = this.ordered;

      /*
       * List of exceptions (reasons) for failure.
      */
      var failureReasons = [];

      /*
       * Can't rely entirely on the size of failureReasons due to the chance the caller may not provide a reason of failure.
       */
      var anyFailure = false;

      /*
       * Invoke a chain link.
       */
      function invoke(link) {
        Scheduler.deferred(link.bind(null, success.bind(null, link), failure.bind(null, link)));
      }

      /*
       * Invoke the next chain link.
       */
      function next() {
        invoke(links.shift());
      }

      /**
       * Remove a chain link.
       */
      function remove(link) {
        var i = links.indexOf(link);

        if (i != -1) {
          links.splice(i, 1);
        }
      }

      /*
       * Handles success of a chain link and final (all links have completed) success.
       */
      function onSuccess() {
        if (ordered && links.length > 0) {
          next();
        } else if (links.length == 0) {
          // Any failures are treated as a whole failure of the chain.
          if (anyFailure) {
            onFailure();
          } else {
            successCallbacks.forEach(function(callback) {
              callback();
            });
          }
        }
      }

      /*
       * Handles failure of a chain link.
       */
      function onFailure() {
        if (ordered && links.length > 0) {
          next();
        } else if (links.length == 0) {
          failureCallbacks.forEach(function(callback) {
            callback(failureReasons);
          });
        }
      }

      /*
       * Link success callback.
       */
      function success(link) {
        remove(link);
        onSuccess();
      }

      /*
       * Link failure callback.
       */
      function failure(link, exception) {
        /*
         * Mark for later.
         */
        anyFailure = true;

        /*
         * Store if a reason is provided.
         */
        if (exception) {
          failureReasons.push(exception);
        }

        remove(link);
        onFailure();
      }

      if (ordered) {
        /*
         * Invoke one at a time, in order.
         */
        next();
      } else {
        /*
         * Invoke everything now.
         */
        links.forEach(invoke);
      }
    } else {
      /*
       * Empty chain, so nothing to do here other than signal success.
       */
      this.successCallbacks.forEach(function(callback) {
        Scheduler.deferred(callback);
      });
    }

    /*
     * Clear and return a new chain for possible reuse.
     */
    return this.clear();
  }

  /**
   * Sets if the chain should invoke all links in blocking order.
   * @function setOrdered
   * @memberof Chain
   * @instance
   * @param {Boolean} ordered
   * @returns {Chain}
   */
  Chain.prototype.setOrdered = function(ordered) {
    this.ordered = ordered;
    return this;
  }

  /**
   * Returns if the chain is ordered.
   * @function isOrdered
   * @memberof Chain
   * @instance
   * @returns {Boolean} Whether or not the chain is ordered.
   */
  Chain.prototype.isOrdered = function() {
    return this.ordered;
  }

  /**
   * Clear the current state of the chain.
   * @function clear
   * @memberof Chain
   * @instance
   * @returns {Chain}
   */
  Chain.prototype.clear = function() {
    this.links = [];
    this.successCallbacks = [];
    this.failureCallbacks = [];
    this.ordered = false;
    return this;
  }

  /**
   * @function append
   * @memberof Chain
   * @static
   * @see Chain#append
   * @returns {Chain}
   */
  Chain.append = Util.makeDaisyChain(Chain, Chain.prototype.append);

  /**
   * @function success
   * @memberof Chain
   * @static
   * @see Chain#success
   * @returns {Chain}
   */
  Chain.success = Util.makeDaisyChain(Chain, Chain.prototype.success);

  /**
   * @function failure
   * @memberof Chain
   * @static
   * @see Chain#failure
   * @returns {Chain}
   */
  Chain.failure = Util.makeDaisyChain(Chain, Chain.prototype.failure);

  /**
   * @function commit
   * @memberof Chain
   * @static
   * @see Chain#commit
   * @returns {Chain}
   */
  Chain.commit = Util.makeDaisyChain(Chain, Chain.prototype.commit);

  /**
   * @function setOrdered
   * @memberof Chain
   * @static
   * @see Chain#setOrdered
   * @returns {Chain}
   */
  Chain.setOrdered = Util.makeDaisyChain(Chain, Chain.prototype.setOrdered);

  /**
   * @function clear
   * @memberof Chain
   * @static
   * @see Chain#clear
   * @returns {Chain}
   */
  Chain.clear = Util.makeDaisyChain(Chain, Chain.prototype.clear);

  /*
   * Exports
   */
  global.Chain = Chain;
})(window);
