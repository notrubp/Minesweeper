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

  function Node(i, x, y) {
    this.neighbors = [];
    this.index = i;
    this.x = x;
    this.y = y;
    this.mine = false;
    this.state = Node.State.Hidden;
    this.numberOfAdjacentMines = 0;
  }

  Node.prototype.load = function(game, board, success, failure) {
    this.nodeNumbers = game.spriteSheet.nodeNumbers;
    this.board = board;

    this.sprite = new createjs.Sprite(game.spriteSheet, "node_blank");
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.sprite.buttonHelper = new createjs.ButtonHelper(this.sprite, 
      "node_blank",
      null,
      "node_empty",
      false);

    this.sprite.on("mouseout", (function() {
      if (this.sprite.buttonHelper.enabled) {
        this.sprite.gotoAndStop("node_blank");
      }
    }).bind(this));

    this.sprite.addEventListener("click", (function() {
      this.choose();
    }).bind(this));

    game.stage.addChild(this.sprite);

    // Signal load is complete.
    if (success) {
      success();
    }
  }

  Node.prototype.choose = function() {
    this.setState(Node.State.Touched);

    if (this.mine) {
      this.sprite.gotoAndStop("node_mine");
    } else if (this.numberOfAdjacentMines > 0) {
      this.sprite.gotoAndStop(this.nodeNumbers[this.numberOfAdjacentMines]);
    } else {
      this.board.expand(this.index);
    }
  }

  Node.prototype.setState = function(state) {
    this.state = state;

    switch(state) {
      case Node.State.Hidden:
        this.sprite.gotoAndStop("node_blank");
        break;
      case Node.State.Flagged:
        this.sprite.gotoAndStop("node_flagged");
        break;
      case Node.State.Touched:
        this.sprite.buttonHelper.enabled = false;
        break;
    }
  }

  Node.State = {
    Hidden : 0,
    Flagged : 1,
    Touched : 2
  };

  Object.freeze(Node.State);

  /*
   * Exports
   */
  global.Node = Node;
})(window);

