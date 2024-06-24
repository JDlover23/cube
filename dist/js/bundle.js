/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(1);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("" + _data2.default.site.blocks[0].code);
var blocks = _data2.default.site.blocks;
var menu = _data2.default.site.menuItems;
//debounce
function debounce(callback, delay) {
  var timer = void 0;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback();
    }, delay);
  };
}

//background
var layout = document.querySelector(".layout");
var totalCols = 19;
var gap = 5;
var colors = ["white", "yellow", "red", "green", "blue", "orange"];
var width = 100;

var totalWidth = layout.offsetWidth;
var squareWidth = Math.ceil(layout.offsetWidth / totalCols);
var totalRows = Math.ceil(layout.offsetHeight / squareWidth);

function calcBackground() {
  totalWidth = layout.offsetWidth;
  squareWidth = Math.ceil(totalWidth / totalCols);
  totalRows = Math.ceil(layout.offsetHeight / squareWidth);

  var rects = "";
  //let prevColorItem = 0;
  var colorItem = 0;
  if (totalWidth > 600) {
    for (var row = 0; row < totalRows; row++) {
      for (var col = 0; col < totalCols; col++) {
        colorItem = Math.floor(Math.random() * colors.length);
        // while (colorItem == prevColorItem) {
        //   colorItem = Math.floor(Math.random() * 6);
        // }
        var rect = "<rect x='" + col * (width + gap) + "' y='" + row * (width + gap) + "' width='" + width + "' height='" + width + "' rx='10' style='fill: " + colors[colorItem] + "; stroke: black' opacity='0.3' />";
        rects = rects + rect;
        // prevColorItem = colorItem;
      }
    }
  }
  return rects;
}
function setBackground() {
  var viewBox = "0 0 " + (width + gap) * totalCols + " " + (width + gap) * totalRows;
  var rects = calcBackground();
  var mySVG = "<svg viewBox='" + viewBox + "' xmlns='http://www.w3.org/2000/svg' style='background-color: #222222;'>" + rects + "</svg>";
  var mySVG64 = window.btoa(mySVG);
  var background = "url('data:image/svg+xml;base64," + mySVG64 + "')";
  layout.style.backgroundImage = background;
  layout.style.backgroundSize = "cover";
}

function calcHeight(width) {
  var header = document.querySelector(".header");
  var footer = document.querySelector(".footer");
  var height = squareWidth - 1 + "px";
  var xsHeight = (squareWidth - 1) * 2 + "px";
  if (width > 1200) {
    header.style.height = footer.style.height = height;
  } else {
    header.style.height = xsHeight;
    footer.style.height = height;
  }
}
setInterval(function () {
  setBackground();
}, 2000);

window.addEventListener("load", function () {
  calcHeight(layout.offsetWidth);
  setBackground();
}, false);

window.addEventListener("resize", function () {
  calcHeight(layout.offsetWidth);
  debounce(setBackground(), 5000);
}, false);

//tooltip
var tooltippable = document.querySelectorAll(".tooltippable");
tooltippable.forEach(function (item, index) {
  var tooltip = '';
  if (item.querySelector(".tooltip")) {
    tooltip = item.querySelector(".tooltip");
    console.log(tooltip);
  } else {
    tooltip = document.querySelector(".menu-tooltip");
  }
  var tooltipped = item.querySelector(".tooltipped");
  tooltipped.onmouseover = function () {
    tooltip.textContent = menu[index].title;
    tooltip.style.display = "block";
  };
  tooltipped.onmouseout = function () {
    tooltip.textContent = '\xa0';
  };
});

//fill the necessary cells
var turns_rows = document.querySelectorAll(".turns-row");
for (var i = 0; i < blocks.length; i++) {
  var variants = turns_rows[i].querySelectorAll(".variant");
  var codeParts = blocks[i].code;
  for (var j = 0; j < codeParts.length; j++) {
    for (var k = 0; k < variants.length; k++) {
      var cells = variants[k].querySelectorAll(".cell");
      for (var l = 0; l < cells.length; l++) {
        var cellType = cells[l].classList.toString();
        if (cellType.includes("" + codeParts[j])) {
          cells[l].style.backgroundColor = "red";
        }
      }
    }
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  site: __webpack_require__(2)
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  title: "Rubic's cube",
  menuItems: [{
    title: "Главная",
    icon: "mdi-home",
    link: "index.html",
    hovered: false
  }, {
    title: "Простая сборка",
    icon: "mdi-cube-outline",
    link: "beginner.html",
    hovered: false
  }, {
    title: "Метод Фридрих",
    icon: "mdi-cube-scan",
    link: "friedrich.html",
    hovered: false
  }, {
    title: "Конструктор положений",
    icon: "mdi-cube-unfolded",
    link: "constructor.html",
    hovered: false
  }],
  blocks: [{
    code: ["x__c", "y__c", "z"],
    variants: [{
      title: "R",
      arrow: "mdi-arrow-up"
    }, {
      title: "R'",
      arrow: "mdi-arrow-down"
    }, {
      title: "R2",
      arrow: "mdi-arrow-up"
    }]
  }, {
    code: ["x__a", "y__a"],
    variants: [{
      title: "L",
      arrow: "mdi-arrow-down"
    }, {
      title: "L'",
      arrow: "mdi-arrow-up"
    }, {
      title: "L2",
      arrow: "mdi-arrow-down"
    }]
  }, {
    code: ["x", "y__1", "z__1"],
    variants: [{
      title: "U",
      arrow: "mdi-arrow-left"
    }, {
      title: "U'",
      arrow: "mdi-arrow-right"
    }, {
      title: "U2",
      arrow: "mdi-arrow-left"
    }]
  }, {
    code: ["y__3", "z__3"],
    variants: [{
      title: "D",
      arrow: "mdi-arrow-right"
    }, {
      title: "D'",
      arrow: "mdi-arrow-left"
    }, {
      title: "D2",
      arrow: "mdi-arrow-right"
    }]
  }, {
    code: ["x__3", "y", "z__a"],
    variants: [{
      title: "F",
      arrow: "mdi-arrow-down"
    }, {
      title: "F'",
      arrow: "mdi-arrow-up"
    }, {
      title: "F2",
      arrow: "mdi-arrow-down"
    }]
  }, {
    code: ["x__1", "z__c"],
    variants: [{
      title: "B",
      arrow: "mdi-arrow-up"
    }, {
      title: "B'",
      arrow: "mdi-arrow-down"
    }, {
      title: "B2",
      arrow: "mdi-arrow-up"
    }]
  }]
};

/***/ })
/******/ ]);