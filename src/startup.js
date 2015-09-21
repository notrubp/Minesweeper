window.init = function() {
  "use strict";

  function f() {
    var sheet = new createjs.SpriteSheet({
      images: [ sprites ], 
      frames: [
        // x, y, width, height
        [ 87, 0, 13, 23 ], // 1
        [ 87, 23, 13, 23 ], // 2
        [ 100, 0, 13, 23 ], // 3
        [ 74, 0, 13, 23 ], // 4
        [ 100, 23, 13, 23 ], // 5
        [ 87, 69, 13, 23 ], // 6
        [ 74, 69, 13, 23 ], // 7
        [ 87, 46, 13, 23 ], // 8
        [ 74, 23, 13, 23 ], // 9
        [ 74, 46, 13, 23 ], // 0
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
      animations: {    
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
        "i": 8,
        "j": 9,
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
    });

    var stage = new createjs.Stage("canvas");
    stage.enableMouseOver(10);

    createjs.Ticker.addEventListener("tick", function() {
      stage.update();
    });

    // 16, 18 <-- UI left
    var left = [];

    for (var i = 0; i < 3; ++i) {
      var sprite = new createjs.Sprite(sheet, "j");
      sprite.x = 16 + (i * 13);
      sprite.y = 18;

      left.push(sprite);

      stage.addChild(sprite);
    }

    // 233, 18 <-- UI right
    var right = [];

    for (var i = 0; i < 3; ++i) {
      var sprite = new createjs.Sprite(sheet, "j");
      sprite.x = 233 + (i * 13);
      sprite.y = 18;

      right.push(sprite);

      stage.addChild(sprite);
    }

    // 130, 15 <-- smiley
    var smiley = new createjs.Sprite(sheet, "smiley_cool");
    smiley.x = 130;
    smiley.y = 15;

    var helper = new createjs.ButtonHelper(smiley, 
      "smiley",
      "smiley_scared",
      "smiley_pressed",
      false);

    smiley.addEventListener("click", function() {
      console.log("click");
    });
    
    stage.addChild(smiley);

    // 15, 50 <-- top left board
    
    var nodes = [];

    for (var row = 0; row < 16; ++row) {
      var y = 50 + row * 16;

      for (var col = 0; col < 16; ++col) {
        var x = 15 + col * 16;

        var sprite = new createjs.Sprite(sheet, "node_blank");
        sprite.x = x;
        sprite.y = y;

        nodes.push(sprite);

        stage.addChild(sprite);
      }
    }

    var n = 0;

    var lookup = [
      "j",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
    ];

    function draw(ui, n) {
      var width = ui.length;

      n = Math.floor(n);
      n = String(n);
      n = n.split("");

      for (var i = 0; i < width; ++i) {
        var j = n.length - (width - i);

        var m = j < 0 ? 0 : Number.parseInt(n[j]);

        ui[i].gotoAndStop(lookup[m]);
      }
    }

    setInterval(function() {
      if (nodes.length > 0) {
        var i = Math.floor(Math.random() * nodes.length);
        nodes[i].gotoAndStop("node_hit");
        nodes.splice(i, 1);
      }

      if (n < 1000) {
        draw(left, n);
        draw(right, n);
      }

      ++n;
    }, 33);

    stage.update();
  }

  var sprites = new Image();
  sprites.onload = f;
  sprites.onerror = f;
  sprites.src = "img/sprites.png";
};
