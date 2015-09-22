/**
 * CSS property queue utility.
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
  var Platform = global.Platform;
  var Exception = global.Exception;
  var Time = global.Time;
  var Scheduler = global.Scheduler;
  var Log = global.Log;
  var Uuid = global.Uuid;

  /**
   * CSS property queue utility.
   * @namespace Property
   */
  var Property = {};

  /**
   * Global dummy element for hooks and queues.
   * @property {Object} global
   * @memberof Property
   * @static
   */
  Property.global = {};
  Property.global.style = {};
  Property.global.__propertyUid = Uuid.letters();

  /*
   * Hooks
   */

  var hooks = {};

  function addHook(uid, hook) {
    if (!hooks[uid]) {
      hooks[uid] = [];
    }

    hooks[uid].push(hook);

    return hook
  }

  function tryHooks(element, property, value) {
    var uid = element.__propertyUid;

    if (hooks[uid]) {
      return hooks[uid].reduce(_tryHooks.bind(null, element, property, value), false);
    }

    return false;
  }

  function _tryHooks(element, property, value, handled, hook) {
    return hook(element, property, value) === true || handled;
  }

  /**
   * Attach a property hook to an element. Whenever a property is set, it will first pass through all hooks and 
   * will only continue with applying the property if all hooks return false.
   * @function hook
   * @memberof Property
   * @static
   * @param {Object} element
   * @param {function} hook
   * @example
   * // Block all attempts to set the 'right' property.
   * Property.hook(element, function(element, property, value) {
   *   return property === 'right';
   * });
   */
  Property.hook = function(element, hook) {
    ensureUid(element);
    return addHook(element.__propertyUid, hook);
  }

  /*
   * Queue
   */

  var queues = { };

  function ensureUid(element) {
    if (!element.__propertyUid) {
      element.__propertyUid = Uuid.letters();
    }
  }

  function ensureQueue(element) {
    var uid = element.__propertyUid;
      
    if (!queues[uid]) {
      queues[uid] = [];
    }

    return queues[uid];
  }

  function insert(queue, callback, time, waitForNextFrame) {
    time = time || 0;

    var entry = { 
      'callback' : callback,
      'time' : time, 
      'breakCurrentFrame' : time > 0,
      'waitForNextFrame' : waitForNextFrame 
    };

    var i = -1;

    if (time > 0) {
      /*
       * Insert into time range.
       */
      for (var j = 0; j < queue.length; ++j) {
        if (time < queue[j].time) {
          i = j;
          break;
        }
      }
    } else {
      /*
       * Insert after the last element with time of 0.
       */
      for (var j = 0; j < queue.length; ++j) {
        if (queue[j].time > 0) {
          i = j;
          break;
        }
      }
    }

    if (i != -1) {
      queue.splice(i, 0, entry);
    } else {
      queue.push(entry);
    }
  }

  /*
   * Flush
   */

  var state = 'sleeping';

  var hasNext = false;

  var last = 0;

  function flush(timestamp) {
    Log.info('property', 'flushing');

    state = 'flushing';

    last = Time.now();

    hasNext = false;

    /*
     * Go through all the queues and evaluate the entries.
     */
    Object.keys(queues).forEach(_flush);
      
    if (hasNext) {
      schedule();
    } else {
      Log.info('property', 'sleeping');

      state = 'sleeping';
      Scheduler.raf(gc);
    }
  }

  function _flush(key) {
    var queue = queues[key];

    /*
     * Flush until there are none left or the current entry is blocking the queue.
     */
    while (queue.length > 0) {
      var entry = queue[0];

      if (entry.waitForNextFrame) {
        Log.info('property', 'blocking -> ' + key);

        /*
         * Mark as no longer blocking.
         */
        entry.waitForNextFrame = false;
        
        /* 
         * This entry needs a fresh frame before it can be applied.
         */
        break;
      }

      /*
       * apply() is a try catch block taken out of this function so compilers can 
       * optimize properly, apply() is expected to not be optimized.
       */
      var result = apply(entry);

      var shouldBreak = false;

      switch (result) {
        case 'ok' : {
          Log.info('property', 'applied -> ' + key);

          /*
           * Entry is ready to be removed.
           */
          safeRemove(queue, entry);

          /*
           * Entry has been applied break out if it's set to.
           */
          if (entry.breakCurrentFrame) {
            shouldBreak = true;
          }

          break;
        }
        case 'fail' : {
          Log.error('property', 'fail -> ' + key);

          /* 
           * Entry may have not completed correctly or an exception was thrown. Either way it 
           * needs to be removed.
           */
          safeRemove(queue, entry);
        }
        default : {
          /* 
           * This entry did not apply, wait for the next frame.
           */
          shouldBreak = true;

          break;
        }          
      }

      if (shouldBreak) {
        break;
      }
    }

    hasNext = hasNext || queue.length > 0;
  }

  function apply(entry) {
    var result = 'none';

    try {
      result = last < entry.time || entry.callback() === false ? 'none' : 'ok';
    } catch (e) {
      /*
       * Dont block flush() with exception handling.
       */
      Exception.deferred(e);

      /*
       * Signal failure.
       */
      result = 'fail';
    }

    return result;
  }

  function safeRemove(queue, entry) {
    if (queue.length > 0 && queue[0] === entry) {
      queue.shift();
    }
  }

  function gc(timestamp) {
  }

  function schedule() {
    switch (state) {
      case 'awake' : {
        break;
      }
      case 'sleeping' : {
        Log.info('property', 'awake');
        last = Time.now();
      }
      case 'flushing' : {
        state = 'awake';
        Scheduler.raf(flush);
        break;        
      }
    }
  }

  /*
   * Platform fixups.
   */

  var fixups = { };

  function camelCaseProperty(prop) {
    return prop.replace(/-(\w)/g, function(match, p1) {
      return p1.toUpperCase();
    });
  }

  var forceCamelCaseProperty = false;

  if (Platform.isGecko) {
    forceCamelCaseProperty = true;

    fixups['animation'] = '-moz-animation';
    fixups['animation-delay'] = '-moz-animation-delay';
    fixups['animation-name'] = '-moz-animation-name';
    fixups['animation-duration'] = '-moz-animation-duration';
    fixups['animation-timing-function'] = '-moz-animation-timing-function';
    fixups['animation-iteration-count'] = '-moz-animation-iteration-count';
    fixups['animation-direction'] = '-moz-animation-direction';
    fixups['animation-fill-mode'] = '-moz-animation-fill-mode';
    fixups['animation-play-state'] = '-moz-animation-play-state';
    fixups['box-sizing'] = '-moz-box-sizing';
    fixups['transform'] = '-moz-transform';
    fixups['transform-origin'] = '-moz-transform-origin';
    fixups['transition'] = '-moz-transition';
  }

  if (Platform.isTrident) {
    fixups['transform'] = '-ms-transform';
    fixups['transform-origin'] = '-ms-transform-origin';
    fixups['transition'] = '-ms-transition';
  }

  if (Platform.isOpera) {
    fixups['transform'] = '-o-transform';
    fixups['transform-origin'] = '-o-transform-origin';
    fixups['transition'] = '-o-transition';
  }

  if (Platform.isWebKit) {
    fixups['animation'] = '-webkit-animation';
    fixups['animation-delay'] = '-webkit-animation-delay';
    fixups['animation-name'] = '-webkit-animation-name';
    fixups['animation-duration'] = '-webkit-animation-duration';
    fixups['animation-timing-function'] = '-webkit-animation-timing-function';
    fixups['animation-iteration-count'] = '-webkit-animation-iteration-count';
    fixups['animation-direction'] = '-webkit-animation-direction';
    fixups['animation-fill-mode'] = '-webkit-animation-fill-mode';
    fixups['animation-play-state'] = '-webkit-animation-play-state';
    fixups['transform'] = '-webkit-transform';
    fixups['transform-origin'] = '-webkit-transform-origin';
    fixups['transition'] = '-webkit-transition';
  }

  /**
   * Fixup a CSS property.
   * @function fixup
   * @memberof Property
   * @static
   * @param {String} prop - A CSS property.
   * @return {String}
   */
  Property.fixup = function(prop) {
    prop = this.fixupNocc(prop);
    prop = forceCamelCaseProperty ? camelCaseProperty(prop) : prop;
    return prop;
  }
  
  /**
   * Fixup a CSS property with no forced camel casing.
   * @function fixupNocc
   * @memberof Property
   * @static
   * @param {String} prop - A CSS property.
   * @return {String}
   */
  Property.fixupNocc = function(prop) {
    return fixups[prop] || prop;
  }

  function set(element, prop, value) {
    ensureUid(element);

    /*
     * Evaluate property fixups.
     */
    prop = this.fixup(prop);

    /*
     * Evaluate property hook on objects.
     */
    value = value != null && typeof value.__propertyHook === 'function' ? value.__propertyHook() : value;

    Log.info('property', 'set(' + element.__propertyUid + ', ' + prop + ', ' + value + ')');

    if (!tryHooks(this.global, prop, value) && !tryHooks(element, prop, value)) {
      element.style[prop] = value;
    }
  }

  /**
   * Set an element's property.
   * @function set
   * @memberof Property
   * @static
   * @param {Object} element
   * @param {String} prop - A CSS property.
   * @param {*} value - A CSS property value or property value object.
   * @param {Number=} time - The timestamp in which this property should be applied. Null or zero will apply immediately.
   * @param {Boolean=} waitForNextFrame - Whether or not to block the current frame when this entry is applied, instead of continuing on with other entries.
   * @example
   * // Set the background color to white.
   * Property.set(element, 'background-color', 'white');
   *
   * // Set the background color to black 1 second from now.
   * Property.set(element, 
   *   'background-color', 
   *   'black', 
   *   new Date().getTime() + 1000);
   */
  Property.set = function(element, property, value, time, waitForNextFrame) {
    if (time != null) {
      this.enqueue(element, set.bind(this, element, property, value), time, waitForNextFrame);
    } else {
      set.call(this, element, property, value);
    }
  }

  /**
   * Get the value of an element's property.
   * @function get
   * @memberof Property
   * @static
   * @param {Object} element
   * @param {String} prop
   * @returns {String} The value of an element's property.
  */
  Property.get = function(element, prop) {
    return element.style[prop];
  }

  /**
   * Remove a property immediately.
   * @function remove
   * @memberof Property
   * @static
   * @param {Object} element
   * @param {String} prop
   */
  Property.remove = function(element, prop) {
    Log.info('property', 'remove(' + element.__propertyUid + ', ' + prop + ')');

    this.set(element, prop, null);
  }

  /**
   * Append a callback within the provided element's queue.
   * @function enqueue
   * @memberof Property
   * @static
   * @param {Object} element
   * @param {function} callback
   * @param {Number=} time - The timestamp in which this property should be applied.
   * @param {Boolean=} waitForNextFrame - Whether or not to block the current frame when this entry is applied, instead of continuing on with other entries.
   * @example
   * // Set the background color to white 1 second from now.
   * Property.enqueue(element, function() {
   *   Property.set(element, 'background-color', 'white')
   * }, new Date().getTime() + 1000);
   */
  Property.enqueue = function(element, callback, time, waitForNextFrame) {
    ensureUid(element);
    schedule();
    queue = ensureQueue(element);
    insert(queue, callback, time, waitForNextFrame);
  }

  /**
   * Clears all pending entries for the provided element from the queue.
   * @function clear
   * @memberof Property
   * @static
   * @param {Object} element
   */
  Property.clear = function(element) {
    ensureUid(element);
    queue = ensureQueue(element);
    queue.splice(0, queue.length);
  }

  /**
   * Forces browsers to re-evaluate the inlined CSS of the provided element. 
   * @function forceReflow
   * @memberof Property
   * @static
   * @param {Object} element
   */
  Property.forceReflow = function(element) {
    element.offsetWidth = element.offsetWidth;
  }

  /*
   * Exports
   */
  global.Property = Property;
})(window);
