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

  function CounterText(game, x, y, length, charWidth, charHeight) {
    this.Container_constructor();
    this.game = game;
    this.lookup = this.game.spriteSheet.numbers;
    this.x = x;
    this.y = y;
    this.sprites = [];
    this.length = length;
    this.charWidth = charWidth;
    this.charHeight = charHeight;
  }

  var prototype = createjs.extend(CounterText, createjs.Container);

  prototype.load = function() {
    // Build sprites.
    for (var i = 0; i < this.length; ++i) {
      var sprite = new createjs.Sprite(this.game.spriteSheet, this.lookup[0]);
      sprite.x = i * this.charWidth;

      this.sprites.push(sprite);
      this.addChild(sprite);
    }
  }

  prototype.setValue = function(n) {
    // Split the number into individual characters.
    n = Math.floor(n);
    n = String(n);
    n = n.split("");

    for (var i = 0; i < this.length; ++i) {
      var j = n.length - (this.length - i);

      // Pad zeroes on the left.
      var m = j < 0 ? 0 : Number(n[j]);

      this.sprites[i].gotoAndStop(this.lookup[m]);
    }
  }

  /*
   * Exports
   */
  global.CounterText = createjs.promote(CounterText, "Container");
})(window);
