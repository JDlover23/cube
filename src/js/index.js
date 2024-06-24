import data from "../data";

console.log(`${data.site.blocks[0].code}`);
const blocks = data.site.blocks;
const menu = data.site.menuItems;
//debounce
function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

//background
const layout = document.querySelector(".layout");
const totalCols = 19;
const gap = 5;
const colors = ["white", "yellow", "red", "green", "blue", "orange"];
const width = 100;

let totalWidth = layout.offsetWidth
let squareWidth = Math.ceil(layout.offsetWidth / totalCols);
let totalRows = Math.ceil(layout.offsetHeight / squareWidth);

function calcBackground() {
  totalWidth = layout.offsetWidth;
  squareWidth = Math.ceil(totalWidth / totalCols);
  totalRows = Math.ceil(layout.offsetHeight / squareWidth);

  let rects = "";
  //let prevColorItem = 0;
  let colorItem = 0;
  if (totalWidth > 600) {
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        colorItem = Math.floor(Math.random() * colors.length);
        // while (colorItem == prevColorItem) {
        //   colorItem = Math.floor(Math.random() * 6);
        // }
        const rect = `<rect x='${col * (width + gap)}' y='${
          row * (width + gap)
        }' width='${width}' height='${width}' rx='10' style='fill: ${
          colors[colorItem]
        }; stroke: black' opacity='0.3' />`;
        rects = rects + rect;
        // prevColorItem = colorItem;
      }
    }
  }
  return rects;
}
function setBackground() {
  let viewBox = `0 0 ${(width + gap) * totalCols} ${(width + gap) * totalRows}`;
  const rects = calcBackground();
  const mySVG = `<svg viewBox='${viewBox}' xmlns='http://www.w3.org/2000/svg' style='background-color: #222222;'>${rects}</svg>`;
  const mySVG64 = window.btoa(mySVG);
  const background = "url('data:image/svg+xml;base64," + mySVG64 + "')";
  layout.style.backgroundImage = background;
  layout.style.backgroundSize = "cover";
}


function calcHeight(width) {
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  let height = `${squareWidth - 1}px`;
  let xsHeight = `${(squareWidth - 1)*2}px`;
  if(width > 1200) {
    header.style.height = footer.style.height = height;
  }
  else {
    header.style.height = xsHeight
    footer.style.height = height;
  }
}
setInterval(function () {
  setBackground();
}, 2000);

window.addEventListener(
  "load",
  function () {
    calcHeight(layout.offsetWidth)
    setBackground();
  },
  false
);

window.addEventListener(
  "resize",
  function () {
    calcHeight(layout.offsetWidth)
    debounce(setBackground(), 5000);
  },
  false
);

//tooltip
const tooltippable = document.querySelectorAll(".tooltippable");
tooltippable.forEach((item, index) => {
  let tooltip = ''
  if (item.querySelector(".tooltip")) {
    tooltip = item.querySelector(".tooltip");
    console.log(tooltip)
  } else {
    tooltip = document.querySelector(".menu-tooltip");
  }
  const tooltipped = item.querySelector(".tooltipped");
  tooltipped.onmouseover = () => {
    tooltip.textContent = menu[index].title
    tooltip.style.display = "block";
  };
  tooltipped.onmouseout = () => {
    tooltip.textContent = '\xa0'
  };
});

//fill the necessary cells
let turns_rows = document.querySelectorAll(".turns-row");
for (let i = 0; i < blocks.length; i++) {
  let variants = turns_rows[i].querySelectorAll(".variant");
  let codeParts = blocks[i].code;
  for (let j = 0; j < codeParts.length; j++) {
    for (let k = 0; k < variants.length; k++) {
      const cells = variants[k].querySelectorAll(".cell");
      for (let l = 0; l < cells.length; l++) {
        const cellType = cells[l].classList.toString();
        if (cellType.includes(`${codeParts[j]}`)) {
          cells[l].style.backgroundColor = "red";
        }
      }
    }
  }
}
