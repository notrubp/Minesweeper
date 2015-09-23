/**
 *
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
  var Scheduler = global.Scheduler;

  /**
   * UI container and manager.
   */
  function Ui(game) {
    this.Container_constructor();
    this.game = game;
  }

  var prototype = createjs.extend(Ui, createjs.Container);

  /**
   * Load and initialize.
   */
  prototype.load = function(success, failure) {
    this.left = new CounterText(this.game, 
      this.game.config.ui.left.x, 
      this.game.config.ui.left.y, 
      this.game.config.ui.left.length, 
      this.game.config.ui.left.charWidth, 
      this.game.config.ui.left.charHeight);
    this.left.load();
    this.addChild(this.left);

    this.right = new CounterText(this.game, 
      this.game.config.ui.right.x, 
      this.game.config.ui.right.y, 
      this.game.config.ui.right.length, 
      this.game.config.ui.right.charWidth, 
      this.game.config.ui.right.charHeight);
    this.right.load();
    this.addChild(this.right);

    this.smiley = new Smiley(this.game, 
      this.game.config.ui.smiley.x,
      this.game.config.ui.smiley.y);
    this.smiley.load();
    this.addChild(this.smiley);

    if (success) {
      success();
    }
  }

  /**
   * Reset to default states.
   */
  prototype.reset = function(success, failure) {
    // Kill timer(s).
    this.stop();

    this.seconds = 0;

    var loop = (function() {
      ++this.seconds;

      if (this.seconds < 1000) {
        this.right.setValue(this.seconds);
      }
    }).bind(this);

    // Schedule a looping timer every second.
    this.timer = Scheduler.interval(1000, loop);

    // Update text.
    this.right.setValue(this.seconds);

    // Reset smiley.
    this.smiley.reset();

    if (success) {
      success();
    }
  }

  /**
   * Stop timer(s).
   */
  prototype.stop = function() {
    if (this.timer != null) {
      this.timer.cancel();
      this.timer = null;
    }
  }

  /**
   * Handler for when a node was flagged or unflagged.
   */
  prototype.onNumberOfNodesFlaggedChanged = function(numberOfNodesFlagged) {
    this.left.setValue(this.game.config.board.numberOfMines - numberOfNodesFlagged);
  }

  /*
   * Exports
   */
  global.Ui = createjs.promote(Ui, "Container");
})(window);
