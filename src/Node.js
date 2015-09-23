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

  /**
   * Node states
   */
  Node.State = {
    Hidden : 0,
    Flagged : 1,
    Touched : 2
  };

  Object.freeze(Node.State);

  /**
   * A game board node
   */
  function Node(game, board, i, x, y) {
    this.Container_constructor();
    this.game = game;
    this.lookup = game.spriteSheet.nodeNumbers;
    this.board = board;
    this.neighbors = [];
    this.index = i;
    this.x = x;
    this.y = y;
    this.mine = false;
    this.state = Node.State.Hidden;
    this.numberOfAdjacentMines = 0;
    this.flagging = false;
  }

  var prototype = createjs.extend(Node, createjs.Container);

  /**
   * Load and initialize.
   */
  prototype.load = function(success, failure) {
    this.sprite = new createjs.Sprite(this.game.spriteSheet, "node_blank");

    // Mouse down event handler

    this.sprite.on("mousedown", (function(e) {
      // Mark if right button is down.
      this.flagging = e.nativeEvent.button == 2;

      Log.info("game", "mousedown flagging=" + this.flagging);

      // Do not allow flagged mines to be touched.
      if (!this.flagging && this.state != Node.State.Flagged) {
        this.sprite.gotoAndStop("node_empty");

        // Uh oh!
        this.game.ui.smiley.scared();
      }
    }).bind(this));

    // Mouse leave event handler

    this.sprite.on("mouseout", (function() {
      if (!this.mouseEnabled) {
        // CreateJS apparently still sends these events 
        // even with input disabled.
       return;
      }
     
      if (this.state != Node.State.Flagged) {
        this.sprite.gotoAndStop("node_blank");

        // Reset.
        this.game.ui.smiley.reset();
      }

      this.flagging = false;
    }).bind(this));

    // Click event handler

    this.sprite.addEventListener("click", (function() {
      this.game.ui.smiley.reset();

      if (this.flagging) {
        // Toggle flag.
        if (this.state == Node.State.Hidden && this.board.numberOfNodesFlagged < this.board.numberOfMines) {
          this.setState(Node.State.Flagged);
        } else {
          this.setState(Node.State.Hidden);
        }

        this.flagging = false;
      } else if (this.state != Node.State.Flagged) {
        // Disable input.
        this.mouseEnabled = false;

        // Choose this node.
        this.choose();
      }
    }).bind(this));

    // Attach.
    this.addChild(this.sprite);

    // Signal load is complete.
    if (success) {
      success();
    }
  }

  /**
   * Reset to default state.
   */
  prototype.reset = function() {
    this.mouseEnabled = true;
    this.flagging = false;
    this.mine = false;
    this.numberOfAdjacentMines = 0;
    this.setState(Node.State.Hidden);
    this.sprite.gotoAndStop("node_blank");
  }

  /**
   * Choose this node and change state.
   */
  prototype.choose = function() {
    this.setState(Node.State.Touched);

    if (this.mine) {
      // Signal to the game that the game is over and
      // was lost.
      var e = new createjs.Event("gameOver");
      e.win = false;

      this.game.dispatchEvent(e);
    } else {
      // Expand is async (with input forced to disabled), so evaluate once it's done.
      this.board.expand(this.index, (function() {
        this.board.evaluate();
      }).bind(this));
    }
  }

  /**
   * True if this node is a blank node. (Not a mine and has none adjacent)
   */
  prototype.isBlank = function() {
    return !this.mine && this.numberOfAdjacentMines == 0;
  }

  /**
   * Change this node's state.
   */
  prototype.setState = function(state) {
    if (this.state == state) {
      return;
    }

    var oldState = this.state;

    this.state = state;

    switch(state) {
      case Node.State.Hidden:
        this.sprite.gotoAndStop("node_blank");
        break;
      case Node.State.Flagged:
        this.sprite.gotoAndStop("node_flagged");
        break;
      case Node.State.Touched:
        if (this.numberOfAdjacentMines > 0) {
          this.sprite.gotoAndStop(this.lookup[this.numberOfAdjacentMines]);
        } else if (this.mine) {
          this.sprite.gotoAndStop("node_hit");
        } else {
          this.sprite.gotoAndStop("node_empty");
        }

        this.mouseEnabled = false;
        break;
    }

    // Signal to the board that this node's state has changed.
    this.board.onNodeStateChanged(this, oldState, state);
  }

  /*
   * Exports
   */
  global.Node = createjs.promote(Node, "Container");
})(window);

