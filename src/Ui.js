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

  function CounterText(x, y, length, charWidth, charHeight) {
    this.x = x;
    this.y = y;
    this.sprites = [];
    this.length = length;
    this.charWidth = charWidth;
    this.charHeight = charHeight;
  }

  CounterText.prototype.load = function(game) {
    // Keep a reference to the numbers lookup table, going to be using this
    // very often in draw().
    this.numbers = game.spriteSheet.numbers;

    // Build sprites.
    for (var i = 0; i < this.length; ++i) {
      var sprite = new createjs.Sprite(game.spriteSheet, this.numbers[0]);
      sprite.x = this.x + (i * this.charWidth);
      sprite.y = this.y;

      this.sprites.push(sprite);
      game.stage.addChild(sprite);
    }
  }

  CounterText.prototype.draw = function(n) {
    // Split the number into individual characters.
    n = Math.floor(n);
    n = String(n);
    n = n.split("");

    for (var i = 0; i < this.length; ++i) {
      var j = n.length - (this.length - i);

      // Pad zeroes on the left.
      var m = j < 0 ? 0 : Number(n[j]);

      this.sprites[i].gotoAndStop(this.numbers[m]);
    }
  }

  function Smiley(x, y) {
    this.x = x;
    this.y = y;
  }

  Smiley.prototype.load = function(game) {
    this.sprite = new createjs.Sprite(game.spriteSheet, "smiley_cool");
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.sprite.buttonHelper = new createjs.ButtonHelper(this.sprite, 
      "smiley",
      "smiley_scared",
      "smiley_pressed",
      false);

    this.sprite.addEventListener("click", function() {
      console.log("click");
    });
    
    game.stage.addChild(this.sprite);
  }

  function Ui() {
  }

  Ui.prototype.load = function(game, success, failure) {
    this.left = new CounterText(16, 18, 3, 13, 18);
    this.left.load(game);

    this.right = new CounterText(233, 18, 3, 13, 18);
    this.right.load(game);

    this.smiley = new Smiley(130, 15);
    this.smiley.load(game);

    if (success) {
      success();
    }
  }

  /*
   * Exports
   */
  global.Ui = Ui;
})(window);
