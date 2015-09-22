/**
 * Platform utilities.
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
   * Platform utilities.
   * @namespace Platform
   */
  var Platform = { }

  var browser = [
    {
      string: navigator.userAgent,
      substring: "Chrome",
      versionSearch: "Chrome",
      identity: "chrome"
    },
    {
      string: navigator.userAgent,
      substring: "OmniWeb",
      identity: "omniweb",
      versionSearch: "OmniWeb/"
    },
    {
      string: navigator.userAgent,
      substring: "Android",
      identity: "safari",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      substring: "Apple",
      identity: "safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      substring: "iCab",
      identity: "icab",
      versionSearch: "iCab"
    },
    {
      string: navigator.vendor,
      substring: "KDE",
      identity: "konqueror",
      versionSearch: "Konqueror"
    },
    {
      string: navigator.userAgent,
      substring: "Firefox",
      identity: "firefox",
      versionSearch: "Firefox"
    },
    {
      string: navigator.vendor,
      substring: "Camino",
      identity: "camino",
      versionSearch: "Camino"
    },
    {
      string: navigator.userAgent,
      substring: "Netscape",
      identity: "netscape",
      versionSearch: "netscape"
    },
    {
      string: navigator.userAgent,
      substring: "MSIE",
      identity: "explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      substring: "Trident/7.0",
      identity: "explorer11",
      versionSearch: "rv"
    },
    {
      string: navigator.userAgent,
      substring: "Gecko",
      identity: "mozilla",
      versionSearch: "rv"
    }, 
    {
      string: navigator.userAgent,
      substring: "Mozilla",
      identity: "netscape",
      versionSearch: "Mozilla"
    }
  ];

  var os = [
    {
      string: navigator.userAgent,
      substring: "Windows Phone",
      identity: "windowsphone"

    }, 
    {
      string: navigator.platform,
      substring: "Win",
      identity: "windows"
    },
    {
      string: navigator.platform,
      substring: "Mac",
      identity: "mac",
      versionSearch: "X"
    },
    {
      string: navigator.userAgent,
      substring: "iPhone",
      identity: "iphone"
    },
    {
      string: navigator.userAgent,
      substring: "iPod",
      identity: "ipod"
    },
    {
      string: navigator.userAgent,
      substring: "iPad",
      identity: "ipad"
    },
    {
      string: navigator.userAgent,
      substring: "Android",
      identity: "android"
    },
    {
      string: navigator.platform,
      substring: "Linux",
      identity: "linux"
    }
  ];

  var versionSearch;

  function searchString(data) {
    for (var i = 0; i < data.length; i++) {
      var string = data[i].string;
      var prop = data[i].prop;
      versionSearch = data[i].versionSearch || data[i].identity;

      if (string) {
        if (string.indexOf(data[i].substring) != -1) {
          return data[i].identity;
        }
      } else if (prop) {
        return data[i].identity;
      }
    }
  }

  function searchVersion(string) {
    var index = string.indexOf(versionSearch);

    if (index == -1) {
      return;
    }

    return parseFloat(string.substring(index + versionSearch.length + 1));
  }

  /**
   * Browser vendor.
   * @constant {String} browser
   * @memberof Platform
   * @static
   */
  Platform.browser = searchString(browser) || "unknown";

  /**
   * Browser version.
   * @constant {Number} version
   * @memberof Platform
   * @static
   */
  Platform.version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 0;

  /**
   * Operating system.
   * @constant {String} os
   * @memberof Platform
   * @static
   */
  Platform.os = searchString(os) || "unknown";

  /**
   * Operating system version
   * @constant {String} osVersion
   * @memberof Platform
   * @static
   */
  Platform.osVersion = "" + (searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 0);

  /**
   * Whether or not the browser is Google Chrome.
   * @constant {Boolean} isChrome
   * @memberof Platform
   * @static
   */
  Platform.isChrome = Platform.browser === 'chrome';

  /**
   * Whether or not the browser is OmniWeb.
   * @constant {Boolean} isOmniweb
   * @memberof Platform
   * @static
   */
  Platform.isOmniweb = Platform.browser === 'omniweb';

  /**
   * Whether or not the browser is Apple Safari.
   * @constant {Boolean} isSafari
   * @memberof Platform
   * @static
   */
  Platform.isSafari = Platform.browser === 'safari';

  /**
   * Whether or not the browser is Opera.
   * @constant {Boolean} isOpera
   * @memberof Platform
   * @static
   */
  Platform.isOpera = Platform.browser === 'opera';

  /**
   * Whether or not the browser is iCab.
   * @constant {Boolean} isiCab
   * @memberof Platform
   * @static
   */
  Platform.isiCab = Platform.browser === 'icab';

  /**
   * Whether or not the browser is Konqueror.
   * @constant {Boolean} isKonqueror
   * @memberof Platform
   * @static
   */
  Platform.isKonqueror = Platform.browser === 'konqueror';

  /**
   * Whether or not the browser is Mozilla Firefox.
   * @constant {Boolean} isFirefox
   * @memberof Platform
   * @static
   */
  Platform.isFirefox = Platform.browser === 'firefox';

  /**
   * Whether or not the browser is Camino.
   * @constant {Boolean} isCamino
   * @memberof Platform
   * @static
   */
  Platform.isCamino = Platform.browser === 'camino';

  /**
   * Whether or not the browser is Netscape.
   * @constant {Boolean} isNetscape
   * @memberof Platform
   * @static
   */
  Platform.isNetscape = Platform.browser === 'netscape';

  /**
   * Whether or not the browser is Interet Explorer.
   * @constant {Boolean} isExplorer
   * @memberof Platform
   * @static
   */
  Platform.isExplorer = Platform.browser === 'explorer';

  /**
   * Whether or not the browser is Interet Explorer 9.
   * @constant {Boolean} isExplorer9
   * @memberof Platform
   * @static
   */
  Platform.isExplorer9 = Platform.isExplorer && Platform.version === 9;

  /**
   * Whether or not the browser is Interet Explorer 10.
   * @constant {Boolean} isExplorer10
   * @memberof Platform
   * @static
   */
  Platform.isExplorer10 = Platform.isExplorer && Platform.version === 10;

  /**
   * Whether or not the browser is Interet Explorer 11.
   * @constant {Boolean} isExplorer11
   * @memberof Platform
   * @static
   */
  Platform.isExplorer11 = Platform.browser === 'explorer11';

  /**
   * Whether or not the browser is Mozilla.
   * @constant {Boolean} isMozilla
   * @memberof Platform
   * @static
   */
  Platform.isMozilla = Platform.browser === 'mozilla';

  /**
   * Whether or not the browser is using the Mozilla Gecko engine.
   * @constant {Boolean} isGecko
   * @memberof Platform
   * @static
   */
  Platform.isGecko = Platform.isFirefox || Platform.isMozilla || Platform.isKonqueror;

  /**
   * Whether or not the browser is using the Microsoft Trident engine.
   * @constant {Boolean} isTrident
   * @memberof Platform
   * @static
   */
  Platform.isTrident = Platform.isExplorer;

  /**
   * Whether or not the browser is using the Apple WebKit engine.
   * @constant {Boolean} isWebKit
   * @memberof Platform
   * @static
   */
  Platform.isWebKit = Platform.isSafari || Platform.isChrome || Platform.isOmniweb || Platform.isOpera || Platform.isCamino;

  /**
   * Whether or not the OS is Microsoft Windows.
   * @constant {Boolean} isWindows
   * @memberof Platform
   * @static
   */
  Platform.isWindows = Platform.os === 'windows';

  /**
   * Whether or not the OS is Apple OSX.
   * @constant {Boolean} isMac
   * @memberof Platform
   * @static
   */
  Platform.isMac = Platform.os === 'mac';

  /**
   * Whether or not the OS is Apple iPod.
   * @constant {Boolean} isiPod
   * @memberof Platform
   * @static
   */
  Platform.isiPod = Platform.os == 'ipod';

  /**
   * Whether or not the OS is Apple isiPhone.
   * @constant {Boolean} isiPhone
   * @memberof Platform
   * @static
   */
  Platform.isiPhone = Platform.os === 'iphone';

  /**
   * Whether or not the OS is Apple isiPad.
   * @constant {Boolean} isiPad
   * @memberof Platform
   * @static
   */
  Platform.isiPad = Platform.os === 'ipad';

  /**
   * Whether or not the OS is Linux. Android reports itsself as Linux depending on the device, so be wary of this.
   * @constant {Boolean} isLinux
   * @memberof Platform
   * @static
   */
  Platform.isLinux = Platform.os === 'linux';

  /**
   * Whether or not the OS is Android.
   * @constant {Boolean} isAndroid
   * @memberof Platform
   * @static
   */
  Platform.isAndroid = Platform.os === 'android';

  /**
   * Whether or not the OS is Windows Phone.
   * @constant {Boolean} isWindowsPhone
   * @memberof Platform
   * @static
   */
  Platform.isWindowsPhone = Platform.os === 'windowsphone';

  /**
   * Whether or not the OS is Apple iOS.
   * @constant {Boolean} isiOS
   * @memberof Platform
   * @static
   */
  Platform.isiOS = Platform.isIpod || Platform.isIphone || Platform.isIpad;
  
  var iOSVersion = (function() {
    return 0;
  })();

  /**
   * Whether or not the OS is Apple iOS version 5.
   * @constant {Boolean} isiOS5
   * @memberof Platform
   * @static
   */
  Platform.isiOS5 = iOSVersion >= 5 && iOSVersion < 6;

  /**
   * Whether or not the OS is Apple iOS version 6.
   * @constant {Boolean} isiOS6
   * @memberof Platform
   * @static
   */
  Platform.isiOS6 = iOSVersion >= 6 && iOSVersion < 7;

  /**
   * Whether or not the OS is Apple iOS version 7.
   * @constant {Boolean} isiOS7
   * @memberof Platform
   * @static
   */
  Platform.isiOS7 = iOSVersion >= 7 && iOSVersion < 8;

  /**
   * Whether or not the OS is Apple iOS version 8.
   * @constant {Boolean} isiOS8
   * @memberof Platform
   * @static
   */
  Platform.isiOS8 = iOSVersion >= 8/* && iOSVersion < 9*/; // iOS8+

  var androidVersion = (function() {
    var s = 'Android';
    var ua = navigator.userAgent;
    var i = ua.indexOf(s);

    if (i != -1) {
      return parseFloat(ua.substring(i + s.length));
    }

    return 0;
  })();

  /**
   * Whether or not the OS is Android API version 15.
   * @constant {Boolean} isAndroid15
   * @memberof Platform
   * @static
   */
  Platform.isAndroid15 = androidVersion >= 4.4 && androidVersion < 4.4;

  /**
   * Whether or not the OS is Android API version 16.
   * @constant {Boolean} isAndroid16
   * @memberof Platform
   * @static
   */
  Platform.isAndroid16 = androidVersion >= 4.4 && androidVersion < 4.4;

  /**
   * Whether or not the OS is Android API version 17.
   * @constant {Boolean} isAndroid17
   * @memberof Platform
   * @static
   */
  Platform.isAndroid17 = androidVersion >= 4.4 && androidVersion < 4.4;

  /**
   * Whether or not the OS is Android API version 18.
   * @constant {Boolean} isAndroid18
   * @memberof Platform
   * @static
   */
  Platform.isAndroid18 = androidVersion >= 4.4 && androidVersion < 4.4;

  /**
   * Whether or not the OS is Android API version 19.
   * @constant {Boolean} isAndroid19
   * @memberof Platform
   * @static
   */
  Platform.isAndroid19 = androidVersion >= 4.4 && androidVersion < 4.4;

  /**
   * Whether or not the OS is Android API version 20.
   * @constant {Boolean} isAndroid20
   * @memberof Platform
   * @static
   */
  Platform.isAndroid20 = androidVersion >= 5.0/* && androidVersion < 4.4*/; // 20+

  /**
   * Whether or not the browser supports touch events.
   * @constant {Boolean} isTouch
   * @memberof Platform
   * @static
   */  
  Platform.isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;

  /**
   * Whether or not the OS is a desktop. In this context basically anything that is not a phone or tablet.
   * @constant {Boolean} isDesktop
   * @memberof Platform
   * @static
   */
  Platform.isDesktop = Platform.isWindows || Platform.isMac || Platform.isLinux;

  /**
   * Whether or not the OS is a phone or tablet.
   * @constant {Boolean} isMobile
   * @memberof Platform
   * @static
   */
  Platform.isMobile = Platform.isiOS || Platform.isAndroid || Platform.isWindowsphone;

  /*
   * Exports
  */
  global.Platform = Platform;
})(window);
