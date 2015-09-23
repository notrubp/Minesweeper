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
  var Dom = global.Dom;

  function Game() {
    this.Container_constructor();
  }

  var prototype = createjs.extend(Game, createjs.Container);

  prototype.load = function(config, success, failure) {
    this.config = config;

    // Register handlers.
    this.on("reset", (function() {
      this.reset();
    }).bind(this));

    this.on("gameOver", (function(e) {
      this.gameOver(e.win);
    }).bind(this));

    var chain = new Chain();

    // Create sprite sheet.

    chain.append((function(success, failure) {
      this.spriteSheet = new createjs.SpriteSheet(this.config.spriteSheet);

      // Lookup table for number -> sprite sheet animation name
      this.spriteSheet.numbers = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];

      // Lookup table for number -> numbered node animation name
      this.spriteSheet.nodeNumbers = [
        "node_empty",
        "node_1",
        "node_2",
        "node_3",
        "node_4",
        "node_5",
        "node_6",
        "node_7",
        "node_8",
      ];

      // Next
      success();
    }).bind(this))

    // Initialize board.

    chain.append((function(success, failure) {
      this.board = new Board(this, 
        config.board.x, 
        config.board.y, 
        config.board.width,
        config.board.height, 
        config.board.nodeWidth, 
        config.board.nodeHeight, 
        config.board.numberOfMines);

      this.board.load(success, failure);

      // Attach.
      this.addChild(this.board);
    }).bind(this))
    
    // Initialize UI.

    chain.append((function(success, failure) {
      this.ui = new Ui(this);
      this.ui.load(success, failure);

      // Attach.
      this.addChild(this.ui);
    }).bind(this))

    // Reset.

    this.reset(chain);

    // Show the game.
    
    chain.success((function() {
      // Signal that game has fully loaded.
      if (success) {
        success();
      }
    }).bind(this))

    chain.failure((function() {
      // Signal that game has failed to load.
      if (failure) {
        failure();
      }
    }).bind(this))

    // Start in order (non-async).

    chain.setOrdered(true)
    chain.commit();
  }

  prototype.reset = function(chain) {
    this.mouseEnabled = false;

    // Allow this function to support being
    // inserted into a chain (for load()).
    var inserted = chain != null;

    if (!inserted) {
      chain = new Chain();
    }

    // Reset board.

    chain.append((function(success, failure) {
      this.board.reset(success, failure);
    }).bind(this))

    // Reset UI.

    chain.append((function(success, failure) {
      this.ui.reset(success, failure);
    }).bind(this))

    // Reset.
    
    chain.append((function(success, failure) {
      this.minesLeft = this.board.numberOfMines;
      this.ui.left.setValue(this.minesLeft);

      success();
    }).bind(this))

    chain.success((function() {
      this.mouseEnabled = true;
      this.board.mouseEnabled = true;
    }).bind(this))

    if (!inserted) {
      chain.setOrdered(true)
      chain.commit();
    }
  }

  prototype.gameOver = function(win) {
    // Disable any more input on the board.
    this.board.mouseEnabled = false;

    // Stop the UI counters.
    this.ui.stop();

    if (win) {
      this.ui.smiley.cool();
      this.board.flagAllMines();
    } else {
      this.ui.smiley.dead();
      this.board.showAllMines();
    }
  }

  /*
   * Exports
   */
  global.Game = createjs.promote(Game, "Container");
})(window);

