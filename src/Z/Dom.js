/**
 * DOM utility.
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
  var Unit = global.Unit;
  var Color = global.Color;
  var Border = global.Border;
  var Transform = global.Transform;
  var Property = global.Property;

  /**
   * DOM utility.
   * @namespace Dom
   */
  var Dom = {};

  /**
   * Create a new rectangle.
   * @function createRect
   * @memberof Dom
   * @static
   * @param {Rect=} rect
   * @param {Transform=} transform
   * @param {Color=} color
   * @param {Border=} border
   * @return {HTMLDivElement}
   */
  Dom.createRect = function(rect, transform, color, border) {
    var div = document.createElement('div');

    Property.set(div, '-ms-backface-visibility', 'hidden');
    Property.set(div, '-moz-backface-visibility', 'hidden');
    Property.set(div, '-webkit-backface-visibility', 'hidden');
    Property.set(div, '-transform-style', 'preserve-3d');
    Property.set(div, '-webkit-transform-style', 'preserve-3d');
    Property.set(div, 'perspective', '500px');
    Property.set(div, '-webkit-perspective', '500px');
    Property.set(div, 'position', 'absolute');
    Property.set(div, 'margin', Unit.Zero);
    Property.set(div, 'transform', transform || Transform.Origin);
    Property.set(div, 'background-color', color || Color.Transparent);
    Property.set(div, 'border', border || Border.make(Unit.Zero, 'none', Color.Black));

    if (rect != null) {
      Property.set(div, 'left', Unit.px(rect.getLeft()));
      Property.set(div, 'top', Unit.px(rect.getTop()));
      Property.set(div, 'width', Unit.px(rect.getWidth()));
      Property.set(div, 'height', Unit.px(rect.getHeight()));
    } else {
      Property.set(div, 'left', Unit.Zero);
      Property.set(div, 'top', Unit.Zero);
      Property.set(div, 'width', Unit.Zero);
      Property.set(div, 'height', Unit.Zero);
    }

    Property.set(div, 'right', 'auto');
    Property.set(div, 'bottom', 'auto');

    Dom.setSelectable(div, false);

    return div;
  }

  /**
   * Create a new image.
   * @function createImage
   * @memberof Dom
   * @static
   * @param {Rect=} rect
   * @param {String|Object=} src - A source URL or an image source definition.
   * @param {Transform=} transform
   * @return {HTMLImageElement}
   */
  Dom.createImage = function(rect, src, transform) {
    var img = document.createElement('img');

    if (src != null) {
      Dom.setImageSrc(img, src);
    }

    Property.set(img, '-ms-backface-visibility', 'hidden');
    Property.set(img, '-moz-backface-visibility', 'hidden');
    Property.set(img, '-webkit-backface-visibility', 'hidden');
    Property.set(img, '-transform-style', 'preserve-3d');
    Property.set(img, '-moz-transform-style', 'preserve-3d');
    Property.set(img, '-webkit-transform-style', 'preserve-3d');
    Property.set(img, 'perspective', '500px');
    Property.set(img, '-moz-perspective', '500px');
    Property.set(img, '-webkit-perspective', '500px');
    Property.set(img, 'position', 'absolute');
    Property.set(img, 'margin', '0px');
    Property.set(img, 'transform', transform || Transform.Origin);

    if (rect != null) {
      img.width = rect.getWidth();
      img.height = rect.getHeight();

      Property.set(img, 'left', Unit.px(rect.getLeft()));
      Property.set(img, 'top', Unit.px(rect.getTop()));
      Property.set(img, 'width', Unit.px(rect.getWidth()));
      Property.set(img, 'height', Unit.px(rect.getHeight()));
    } else {
      Property.set(img, 'left', Unit.Zero);
      Property.set(img, 'top', Unit.Zero);
    }

    Property.set(img, 'right', 'auto');
    Property.set(img, 'bottom', 'auto');

    Dom.setSelectable(img, false);

    return img;
  }

  /*
   * Create a new text box.
   */
  Dom.createTextBox = function(rect, text, clipped, nowrap, valign, halign) {
  }

  /**
   *
   */
  Dom.createCanvas = function(rect) {
    var canvas = document.createElement('canvas');

    Property.set(canvas, '-ms-backface-visibility', 'hidden');
    Property.set(canvas, '-moz-backface-visibility', 'hidden');
    Property.set(canvas, '-webkit-backface-visibility', 'hidden');
    Property.set(canvas, '-transform-style', 'preserve-3d');
    Property.set(canvas, '-webkit-transform-style', 'preserve-3d');
    Property.set(canvas, 'perspective', '500px');
    Property.set(canvas, '-webkit-perspective', '500px');
    Property.set(canvas, 'position', 'absolute');
    Property.set(canvas, 'margin', Unit.Zero);
    Property.set(canvas, 'right', 'auto');
    Property.set(canvas, 'bottom', 'auto');

    canvas.width = rect.getWidth();
    canvas.height = rect.getHeight();

    Dom.setSelectable(canvas, false);

    return canvas;
  }

  Dom.setSelectable = function(element, selectable) {
    if (selectable) {
      Property.set(element, '-webkit-user-select', 'text');
      Property.set(element, '-khtml-user-select', 'text');
      Property.set(element, '-moz-user-select', 'text');
      Property.set(element, '-ms-user-select', 'text');
      Property.set(element, 'user-select', 'text');

      /* 
       * -webkit-touch-callout: On iOS, when you touch and hold a touch target 
       * such as a link, Safari displays a callout containing information about 
       * the link. This property allows you to disable that callout.
       */
      Property.set(element, '-webkit-touch-callout', 'default');

      /*
       * < IE 10 & Opera
       */
      element.removeAttribute('unselectable');
    } else {
      Property.set(element, '-webkit-user-select', 'none');
      Property.set(element, '-khtml-user-select', 'none');

      /*
       * -moz-none: The text of the element and sub-elements cannot be selected, 
       * but selection can be enabled on sub-elements using -moz-user-select:text.
       */
      Property.set(element, '-moz-user-select', '-moz-none');

      Property.set(element, '-ms-user-select', 'none');
      Property.set(element, 'user-select', 'none');

      Property.set(element, '-webkit-touch-callout', 'none');

      /*
       * < IE 10 & Opera
       */
      element.setAttribute('unselectable', 'on');
    }
  }

  Dom.setImageSrc = function(img, src) {
    if (typeof src == 'string') {
      img.src = src;
    } else {
      img.src = src.url;

      img.width = src.width;
      img.height = src.height;

      Property.set(img, 'width', Unit.px(src.width));
      Property.set(img, 'height', Unit.px(src.height));
    }
  }

  Dom.append = function(parent, child) {
    parent.appendChild(child);
  }

  Dom.remove = function(parent, child) {
    parent.removeChild(child);
  }

  Dom.insertBefore = function(parent, insert, child) {
    parent.insertBefore(sibling, child);
  }

  Dom.insertAfter = function(parent, insert, child) {
    var next = child.nextSibling;
    if (next != null) {
      Dom.insertBefore(parent, insert, next);
    } else {
      Dom.append(parent, insert);
    }
  }

  Dom.replace = function(parent, child, replace) {
    parent.replaceChild(child, replace);
  }

  Dom.listen = function(element, type, callback) {
    element.addEventListener(type, callback, false);

    return function() {
      element.removeEventListener(type, callback, false);
    }
  }

  /*
   * Exports
   */
  global.Dom = Dom;
})(window);
