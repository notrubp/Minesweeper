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

  /**
   * The game board.
   */
  function Board(game, x, y, width, height, nodeWidth, nodeHeight, numberOfMines) {
    this.Container_constructor();
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nodeWidth = nodeWidth;
    this.nodeHeight = nodeHeight;
    this.numberOfMines = numberOfMines;
    this.numberOfNodesLeft = 0;
    this.numberOfNodesFlagged = 0;
    this.nodes = [];
  }

  var prototype = createjs.extend(Board, createjs.Container);

  /**
   * Load and initialize the board.
   */
  prototype.load = function(success, failure) {
    var chain = new Chain();

    // Create node grid.

    for (var row = 0; row < this.width; ++row) {
      var y = row * this.nodeHeight;

      for (var col = 0; col < this.height; ++col) {
        var x = col * this.nodeWidth;

        var node = new Node(this.game, this, row * this.width + col, x, y);
        chain.append(Node.prototype.load.bind(node));

        this.nodes.push(node);
        this.addChild(node);
      }
    }

    // Build graph.

    chain.append((function(success, failure) {
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

        // Top right (ensure it's on the right row)
        if (trow == Math.floor(tr / this.width)) {
          connect(i, tr);
        }

        // Right (ensure it's on the right row)
        if (row == Math.floor(r / this.width)) {
          connect(i, r);
        }

        // Bottom right (ensure it's on the right row)
        if (brow == Math.floor(br / this.width)) {
          connect(i, br);
        }

        // Bottom
        connect(i, b);

        // Bottom left (ensure it's on the right row)
        if (brow == Math.floor(bl / this.width)) {
          connect(i, bl);
        }

        // Left (ensure it's on the right row)
        if (row == Math.floor(l / this.width)) {
          connect(i, l);
        }

        // Top left (ensure it's on the right row)
        if (trow == Math.floor(tl / this.width)) {
          connect(i, tl);
        }
      }

      // Next.
      success();
    }).bind(this));

    chain.success(success)
      .failure(failure)
      .setOrdered(true)
      .commit();
  }

  /**
   * Reset the board.
   */
  prototype.reset = function(success, failure) {
    // Reset nodes.

    Chain.append((function(success, failure) {
      this.nodes.forEach(function(v) {
        v.reset();
      });

      // Next.
      success();
    }).bind(this))

    // Randomly choose mines.

    .append((function(success, failure) {
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
    }).bind(this))

    // Setup adjacent nodes.

    .append((function(success, failure) {
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

      // Reset
      this.numberOfNodesLeft = this.nodes.length;
      this.numberOfNodesFlagged = 0;

      // Next.
      success();
    }).bind(this))

    .success(success)
      .failure(failure)
      .setOrdered(true)
      .commit();
  }

  /**
   * Show all hidden mines.
   */
  prototype.showAllMines = function() {
    this.nodes.forEach(function(v) {
      if (v.mine) {
        if (v.state == Node.State.Hidden) {
          v.sprite.gotoAndStop("node_mine");
        } else if (v.state == Node.State.Flagged) {
          v.sprite.gotoAndStop("node_minemarked");
        }
      }
    });
  }

  /**
   * Flag all hidden mines.
   */
  prototype.flagAllMines = function() {
    this.nodes.forEach(function(v) {
      if (v.mine && v.state == Node.State.Hidden) {
        v.sprite.gotoAndStop("node_flagged");
      }
    });

    // Update UI to show all mines are flagged.
    this.game.ui.onNumberOfNodesFlaggedChanged(this.numberOfMines);
  }

  /**
   * Evaluate the board to see if a game over
   * state has been reached.
   */
  prototype.evaluate = function(i) {
    var numberOfFlaggedMines = this.nodes.reduce(function(p, v) {
      if (v.mine && v.state == Node.State.Flagged) {
        ++p;
      }

      return p;
    }, 0);

    if (numberOfFlaggedMines == this.numberOfMines || this.numberOfNodesLeft <= this.numberOfMines) {
      // Signal to the game that the game is over and
      // was won.
      var e = new createjs.Event("gameOver");
      e.win = true;

      this.game.dispatchEvent(e);
    }
  }

  /**
   * Called by Nodes when their state changes,
   * good spot for an Observer...
   */
  prototype.onNodeStateChanged = function(node, oldState, state) {
    if (oldState == Node.State.Flagged) {
      --this.numberOfNodesFlagged;

      // Signal to UI that a node was unflagged.
      this.game.ui.onNumberOfNodesFlaggedChanged(this.numberOfNodesFlagged);
    } else {
      switch (state) {
        case Node.State.Touched:
          // One less. Keep track so when there are only
          // mines left, the game is won.
          --this.numberOfNodesLeft;
          break;
        case Node.State.Flagged:
          ++this.numberOfNodesFlagged;

          // Signal to UI that a node was flagged.
          this.game.ui.onNumberOfNodesFlaggedChanged(this.numberOfNodesFlagged);

          // Check for game over.
          this.evaluate();

          break;
      }
    }
  }

  /**
   * Expand all blank nodes at the provided index.
   */
  prototype.expand = function(i, callback) {
    // This can potentially take a long time 
    // depending on the size of the board, don't
    // allow input while it's running.
    this.mouseEnabled = false;

    if (i < 0 || i >= this.nodes.length) {
      return;
    }

    var expand = function(evaluated, node, callback) {
      if (evaluated.indexOf(node) != -1) {
        if (callback) {
          callback();
        }

        return;
      } else {
        var chain = new Chain();

        evaluated.push(node);

        if (node.isBlank()) {
          node.setState(Node.State.Touched);

          node.neighbors.forEach(function(v) {
            chain.append(expand.bind(null, evaluated, v));
          });
        } else if (!node.mine) {
          // Touch but do not recurse into neighbors.
          node.setState(Node.State.Touched);
        }

        chain.success(callback);
        chain.commit();
      }
    };

    expand([], this.nodes[i], (function() {
      this.mouseEnabled = true;

      if (callback) {
        callback();
      }
    }).bind(this));
  }

  /**
   * Exports
   */
  global.Board = createjs.promote(Board, "Container");
})(window);
