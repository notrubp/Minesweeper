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

  /**
   * Imports
   */

  function Board(x, y, width, height, numberOfMines) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.numberOfMines = numberOfMines;
    this.nodes = [];
  }

  Board.prototype.load = function(game, success, failure) {
    var loader = new Chain();

    // Create node grid.

    for (var row = 0; row < this.width; ++row) {
      var y = this.y + row * 16;

      for (var col = 0; col < this.height; ++col) {
        var x = this.x + col * 16;

        var node = new Node(row * this.width + col, x, y);

        loader.append(Node.prototype.load.bind(node, game, this));

        this.nodes.push(node);
      }
    }

    // Build graph.

    loader.append((function(success, failure) {
      // Connects two nodes by index.
      // Spatial difference doesnt matter for this game, so the 
      // node will not know where the neighbors are. Only that
      // they are neighbors.
      var connect = (function(i, j) {
        if (i < 0 || i >= this.nodes.length) {
          return;
        }

        var node = this.nodes[i];

        if (j >= 0 && j < this.nodes.length) {
          node.neighbors.push(this.nodes[j]);
        }
      }).bind(this);

      for (var i = 0; i < this.nodes.length; ++i) {
        var row = Math.floor(i / this.width);

        // Top
        var t = i - this.width;

        // Top row
        var trow = Math.floor(t / this.width);

        // Top right
        var tr = t + 1;

        // Right
        var r = i + 1;
        
        // Bottom 
        var b = i + this.width;

        // Bottom row
        var brow = Math.floor(b / this.width);

        // Bottom right
        var br = b + 1;

        // Bottom left
        var bl = b - 1;

        // Left
        var l = i - 1;

        // Top left
        var tl = t - 1;

        // Connect in clockwise order from top.

        // Top
        connect(i, t);

        // Top right
        if (trow == Math.floor(tr / this.width)) {
          connect(i, tr);
        }

        // Right
        if (row == Math.floor(r / this.width)) {
          connect(i, r);
        }

        // Bottom right
        if (brow == Math.floor(br / this.width)) {
          connect(i, br);
        }

        // Bottom
        connect(i, b);

        // Bottom left
        if (brow == Math.floor(bl / this.width)) {
          connect(i, bl);
        }

        // Left
        if (row == Math.floor(l / this.width)) {
          connect(i, l);
        }

        // Top left
        if (trow == Math.floor(tl / this.width)) {
          connect(i, tl);
        }
      }

      // Next.
      success();
    }).bind(this));

    // Randomly choose mines.

    loader.append((function(success, failure) {
      var available = this.nodes.slice();

      for (var i = 0; i < this.numberOfMines; ++i) {
        if (available.length > 0) {
          // Choose.
          var j = Random.range(available.length);

          // Mark.
          available[j].mine = true;

          // Remove.
          available.splice(j, 1);
        } else {
          // Ran out of nodes to choose from.
          break;
        }
      }

      // Next.
      success();
    }).bind(this));

    // Setup adjacent nodes.
    
    loader.append((function(success, failure) {
      this.nodes.forEach((function(v) {
        if (!v.mine) {
          v.numberOfAdjacentMines = v.neighbors.reduce(function(n, v) {
            if (v.mine) {
              ++n;
            }

            return n;
          }, 0);
        }
      }).bind(this));

      // Next.
      success();
    }).bind(this));

    loader.success(success)
      .failure(failure)
      .commit();
  }

  Board.prototype.expand = function(i) {
    if (i < 0 || i >= this.nodes.length) {
      return;
    }

    this.nodes[i].sprite.gotoAndStop("node_empty");
  }

  /**
   * Exports
   */
  global.Board = Board;
})(window);
