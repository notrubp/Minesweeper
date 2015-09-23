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
(function() {
  "use strict";

  Dom.listen(document, "DOMContentLoaded", function() {
    Log.Tags.enable("game");

    // Application-level fields.
    var game = new Game();
    var sprites = null;
    var background = null;
    var canvas = null;

    var chain = new Chain();

    // Load sprite sheet.

    chain.append((function(success, failure) {
      sprites = Dom.createImage();
      sprites.onload = success;
      sprites.onerror = success;
      Dom.setImageSrc(sprites, "img/sprites.png");
    }).bind(this));

    // Load board background.

    chain.append((function(success, failure) {
      background = Dom.createImage();
      background.onload = success;
      background.onerror = success;
      Dom.setImageSrc(background, "img/board.png");
      Property.set(background, "display", "none");
      Dom.append(document.body, background);
    }).bind(this));

    // Start loading game after images are complete.

    chain.success(function() {
      // Create canvas.
      canvas = Dom.createCanvas(Rect.makeXywh(0, 0, 288, 322));
      Property.set(canvas, "display", "none");
      Dom.append(document.body, canvas);

      // Cancel default context menu behavior, we're using
      // right clicks in the game.
      canvas.oncontextmenu = function() {
        return false;
      }

      // Create stage
      var stage = new createjs.Stage(canvas);
      stage.enableMouseOver(10);
      createjs.Touch.enable(stage);

      var config = {
        // CreateJS sprite sheet config.
        spriteSheet: {
          // Sprite sheet image.
          images: [ sprites ], 

          // Frame definitions.
          frames: [
            // [ x, y, width, height ]
            [ 87, 0, 13, 23 ], // one
            [ 87, 23, 13, 23 ], // two
            [ 100, 0, 13, 23 ], // three
            [ 74, 0, 13, 23 ], // four
            [ 100, 23, 13, 23 ], // five
            [ 87, 69, 13, 23 ], // six
            [ 74, 69, 13, 23 ], // seven
            [ 87, 46, 13, 23 ], // eight
            [ 74, 23, 13, 23 ], // nine
            [ 74, 46, 13, 23 ], // zero
            [ 0, 78, 26, 26 ], // smiley
            [ 0, 0, 26, 26 ], // smiley_pressed
            [ 0, 26, 26, 26 ], // smiley_scared
            [ 26, 0, 26, 26 ], // smiley_cool
            [ 0, 52, 26, 26 ], // smiley_dead
            [ 52, 0, 16, 16 ], // node_blank
            [ 58, 64, 16, 16 ], // node_empty
            [ 42, 90, 16, 16 ], // node_flagged
            [ 58, 80, 16, 16 ], // node_question
            [ 42, 42, 16, 16 ], // node_question_pressed
            [ 26, 90, 16, 16 ], // node_mine
            [ 26, 42, 16, 16 ], // node_hit
            [ 26, 26, 16, 16 ], // node_minemarked
            [ 58, 16, 16, 16 ], // node_1
            [ 58, 48, 16, 16 ], // node_2
            [ 42, 58, 16, 16 ], // node_3
            [ 58, 32, 16, 16 ], // node_4
            [ 42, 74, 16, 16 ], // node_5
            [ 26, 74, 16, 16 ], // node_6
            [ 42, 26, 16, 16 ], // node_7
            [ 26, 58, 16, 16 ] // node_8
          ],

          // Animation lookup table.
          animations: {    
            "one": 0,
            "two": 1,
            "three": 2,
            "four": 3,
            "five": 4,
            "six": 5,
            "seven": 6,
            "eight": 7,
            "nine": 8,
            "zero": 9,
            "smiley": 10,
            "smiley_pressed": 11,
            "smiley_scared": 12,
            "smiley_cool": 13,
            "smiley_dead": 14,
            "node_blank": 15,
            "node_empty": 16,
            "node_flagged": 17,
            "node_question": 18,
            "node_question_pressed": 19,
            "node_mine": 20,
            "node_hit": 21,
            "node_minemarked": 22,
            "node_1": 23,
            "node_2": 24,
            "node_3": 25,
            "node_4": 26,
            "node_5": 27,
            "node_6": 28,
            "node_7": 29,
            "node_8": 30
          }
        },

        // Game board config.
        board: {
          // X position.
          x: 15, 

          // Y position.
          y: 50, 

          // Width of board in number of nodes.
          width: 16, 

          // Height of board in number of nodes.
          height: 16, 

          // Width of one node in pixels.
          nodeWidth: 16,

          // Height of one node in pixels. 
          nodeHeight: 16, 

          // Number of mines.
          numberOfMines: 10
        },

        // Game UI config.
        ui: {
          // Left counter text.
          left: {
            // X position.
            x: 16,

            // Y position.
            y: 18, 

            // Text length.
            length: 3, 

            // Width of one character in pixels.
            charWidth: 13, 
            
            // Height of one character in pixels.
            charHeight: 18
          },

          // Right counter text config.
          right: {
            // X position.
            x: 233,

            // Y position.
            y: 18, 

            // Text length.
            length: 3, 

            // Width of one character in pixels.
            charWidth: 13, 
            
            // Height of one character in pixels.
            charHeight: 18
          },

          // Smiley config.
          smiley: {
            // X position.
            x: 130,

            // Y position.
            y: 15
          }
        }
      };

      // Begin load.
      game.load(config, function() {
        // Show canvas.
        Property.remove(background, "display");
        Property.remove(canvas, "display");

        // Hide spinner.
        Property.set(document.querySelector(".loading"), "display", "none");

        var loop = function() {
          stage.update();
          Scheduler.raf(loop);
        }

        // Begin loop.
        loop();
      });

      // Attach
      stage.addChild(game);
    });

    // Start
    chain.commit();
  });
})();
