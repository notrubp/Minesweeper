/**
 * Implementation of a CSS3 transition strip animation.
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
  var Pair = global.Pair;
  var Rect = global.Rect;
  var Transform = global.Transform;
  var Keyframes = global.Keyframes;
  var SpriteAnimation = global.SpriteAnimation;
  var DomSprite = global.DomSprite;

  /*
   * Make a transform from a frame definition.
   */
  var f2t = function(frame) {
    return Transform.translate(Unit.px(-frame.x), Unit.px(-frame.y));
  }

  /*
   * Make a rect from a frame definition.
   */
  var f2r = function(frame) {
    return new Rect(-frame.x, -frame.y, frame.width, frame.height);
  }

  /*
   * Create a list of codirectional frame ranges.
   */
  var createOptimizedCss3Frames = function(def) {
    /*
     * Final frames.
     */
    var frames = [];

    /*
     * Scratch space.
     */
    var transforms = [];

    /*
     * Range.
     */
    var i = 0;
    var j = 0;

    /*
     * last frame.
     */
    var n = def.frames.length;

    /*
     * Last directional vector.
     */
    var v0 = null;

    for (; j < n; ++j) {
      var f0 = def.frames[j];

      /*
       * Add to set.
       */
      transforms.push(f2t(f0));

      var v1 = null;

      if (j + 1 < n) {
        /*
         * Find the difference between the next and current frame.
         */
        var c0 = f2r(f0).centroid();

        var f1 = def.frames[j + 1];

        var c1 = f2r(f1).centroid();

        v1 = c1.sub(c0);

        var v2 = v0;

        /*
         * Store previous.
         */
        v0 = v1;

        /*
         * Moving in the same direction and length?
         * If not need a new set of codirectional transforms.
         */
        if (v2 != null) {
          var dot = v1.dot(v2);
          var sq1 = v1.lengthSq();
          var sq2 = v2.lengthSq();

          if (dot != sq2 || sq1 != sq2) {
            frames.push(new Frame(i, j, transforms));

            /*
             * New Set.
             */
            transforms = [];

            /*
             * New inclusive range.
             */
            i = j + 1;

            /*
             * Reset.
             */
            v0 = null;
          }
        }
      }
    }

    /*
     * Tail frame.
     */
    frames.push(new Frame(i, n - 1, transforms));

    return frames;
  }

  /*
   * Ensure CSS3 animation keyframes.
   */
  var ensureKeyframes = function(name, actualNumberOfFrames, frames) {
    if (Keyframes.isNotInjected(name)) {
      var n = actualNumberOfFrames;
      var a = 1 / n;

      var keyframes = new Keyframes(name);

      var i = 0;

      for (var j = 0; j < frames.length; ++j) {
        var frame = frames[j];
        var range = frame.getRange();
        var steps = range.second - range.first;
        var p = steps / n;

        i = i > 0 ? i + a : 0;

        keyframes.at(i, 'transform', frame.getStart());
        keyframes.at(i, 'animation-timing-function', Steps.make(steps));

        i = range.second == n - 1 ? 1 : i + a + p;

        keyframes.at(i, 'transform', frame.getEnd());
        keyframes.at(i, 'animation-timing-function', Steps.make(1));
      }

      keyframes.inject();
    }
  }

  /*
   * Animation definition.
   */
  var Defs = function() {
    this.selection = null;
    this.defs = {};
  }

  Defs.prototype.keyOf = function(maybe) {
    return typeof maybe === 'object' ? maybe.name : maybe;
  }

  Defs.prototype.has = function(maybe) {
    return this.keyOf(maybe) in this.defs;
  }

  Defs.prototype.add = function(def) {
    if (!this.has(def)) {
      var frames = createOptimizedCss3Frames(def);
      ensureKeyframes(def.name, def.frames.length, frames);

      this.defs[this.keyOf(def)] = { 'info' : def, 'frames' : frames };
    }
  }

  Defs.prototype.remove = function(maybe) {
    this.defs[this.keyOf(maybe)] = null;
  }

  Defs.prototype.select = function(maybe) {
    if (this.has(maybe)) {
      this.selection = this.defs[this.keyOf(maybe)];
    }
  }

  /*
   * Frame definition.
   */
  var Frame = function(s, e, transforms) {
    this.range = Pair.make(s, e);

    if (transforms.length > 0) {
      this.start = transforms[0];

      if (transforms.length > 1) {
        this.end = transforms[transforms.length - 1];
      } else {
        this.end = this.start;
      }
    } else {
      this.start = this.end = null;
    }

    this.startEqualToEnd = this.start != null && this.start.equals(this.end);
  }

  Frame.prototype.getRange = function() {
    return this.range;
  }

  Frame.prototype.getStart = function() {
    return this.start;
  }

  Frame.prototype.getEnd = function() {
    return this.end;
  }

  Frame.prototype.isStartEqualToEnd = function() {
    return this.startEqualToEnd;
  }

  /*
   * Ensures the mask's rect is properly set.
   */
  var ensureMaskRect = function() {
    if (this.defs.selection != null) {
      var info = this.defs.selection.info.frames[0];
      Property.set(this.sprite.mask, 'width', Unit.px(info.width));
      Property.set(this.sprite.mask, 'height', Unit.px(info.height));
    }
  }

  /*
   * Ensure the right image source is properly set.
   */
  var ensureSrc = function(src) {
    if (this.ensureSrc && this.sprite.image.src != src.url) {
      Dom.setImageSrc(this.sprite.image, src);
    }
  }

  /**
   * CSS3 transition strip animation.
   * @class SpriteAnimationCss
   * @extends SpriteAnimation
   */
  var SpriteAnimationCss = function() {
    SpriteAnimation.call(this);

    this.ensureSrc = false;
    this.playing = false;
    this.useCss3 = true;
    this.lastStoppedFrame = -1;
    this.defs = new Defs();

    this.sprite = new DomSprite();

    ensureMaskRect.call(this);
  }

  Util.inherit(SpriteAnimation, SpriteAnimationCss);

  /**
   * @inheritdoc
   */
  SpriteAnimationCss.prototype.isPlaying = function() {
    return this.playing;
  }

  /**
   * Enabled or disable ensure image source feature. This is disabled by 
   * default as an optimization and is used for when an animation has multiple
   * types that reference different source images.
   * @function setEnsureSrc
   * @memberof SpriteAnimation
   * @instance
   * @param {Boolean} ensureSrc
   */
  SpriteAnimationCss.prototype.setEnsureSrc = function(ensureSrc) {
    this.ensureSrc = ensureSrc;
  }

  /**
   * Get whether or not ensure image source feature is enabled or disabled.
   * @function isEnsureSrc
   * @memberof SpriteAnimation
   * @instance
   * @returns {Boolean}
   */
  SpriteAnimationCss.prototype.isEnsureSrc = function() {
    return this.ensureSrc;
  }

  /**
   * Enable or disable CSS3 features, if any.
   * @function setCss3Enabled
   * @memberof SpriteAnimation
   * @instance
   * @param {Boolean} css3enabled
   */
  SpriteAnimationCss.prototype.setCss3Enabled = function(useCss3) {
    this.useCss3 = useCss3;
  }

  /**
   * Get whether or not CSS3 features are enabled.
   * @function isCss3Enabled
   * @memberof SpriteAnimation
   * @instance
   * @returns {Boolean}
   */
  SpriteAnimationCss.prototype.isCss3Enabled = function() {
    return this.useCss3;
  }

  /**
   * @inheritdoc
   */
  SpriteAnimationCss.prototype.playAt = function(frame) {
    if (this.defs.selection != null &&
        this.isWithinBoundsOfSelection(frame)) {
      this.clear();
      this.lastStoppedFrame = -1;
      this.playing = true;

      var def = this.defs.selection;

      if (!this.useCss3 || Platform.isExplorer9) {
        for (var i = 0; i < def.frames.length; ++i) {
          var f = def.frames[i];
          var range = f.getRange();

          if (range.first <= frame && range.second >= frame) {
            playNoCss3.call(this, def, f);
            break;
          }
        }
      } else {
        playCss3.call(this, def);
      }
    }
  }

  /**
   * @inheritdoc
   */
  SpriteAnimationCss.prototype.stopAt = function(frame) {
    if (this.defs.selection != null && 
        this.lastStoppedFrame != frame &&
        this.isWithinBoundsOfSelection(frame)) {
      this.clear();
      this.lastStoppedFrame = frame;
      this.applyFrameImmediately(this.defs.selection);
    }
  }

  var completeCss3 = function() {
  }

  var playCss3 = function(def) {
    var total = def.info.frames.length;
    var src = def.info.src;
    var name = def.info.name;
    var duration = this.ms * total / 1000;

    /*
     * Have to wipe the animation properties (which will wipe the transforms) but also keep it 
     * at the last frame. 
     * An infinite iteration count will never hit this, as the event is never fired.
     */
    completeCss3.frame = total - 1;

    this.applyAsCss3Animation(src, 
      name, 
      duration + 's',
      this.playback === SpriteAnimation.Playback.Loop ? 'infinite' : 1,
      'both',
      completeCss3);
  }

  SpriteAnimationCss.prototype.playNoCss3 = function(def, frame) {
  }

  SpriteAnimationCss.prototype.isWithinBoundsOfSelection = function(frame) {
    return true;
  }

  SpriteAnimationCss.prototype.applyAsCss3Animation = function(src, name, duration, iterations, fill, callback) {
    ensureMaskRect.call(this);
    ensureSrc.call(this, src);

    Property.set(this.sprite.image, 'animation-name', name);
    Property.set(this.sprite.image, 'animation-duration', duration);
    Property.set(this.sprite.image, 'animation-iteration-count', iterations);
    Property.set(this.sprite.image, 'animation-fill-mode', fill);

    this.listener = Dom.listen(this.sprite.image, 'animationend', callback);

  }

  SpriteAnimationCss.prototype.applyAsTransition = function(src, transition, start, end, callback) {
  }

  SpriteAnimationCss.prototype.applyFrameWithEnqueuedCallback = function(src, start, callback) {
  }

  SpriteAnimationCss.prototype.applyFrameImmediately = function(src, frame) {
  }

  SpriteAnimationCss.prototype.clear = function() {
    if (this.listener != null) {
      this.listener.detach();
      this.listener = null;
    }

    Property.clear(this.sprite.mask);
    Property.clear(this.sprite.image);

    Property.remove(this.sprite.image, 'animation-name');
    Property.remove(this.sprite.image, 'animation-duration');
    Property.remove(this.sprite.image, 'animation-iteration-count');
    Property.remove(this.sprite.image, 'animation-fill-mode');

    Property.forceReflow(this.sprite.image);

    this.playing = false;
  }

  /*
   * Exports.
   */
  global.SpriteAnimationCss = SpriteAnimationCss;
})(window);
