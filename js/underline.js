import baselineRatio from "./baseline-ratio";
import SingleUnderline from "./single-underline";
import MultipleUnderline from "./multiple-underline";
import { getElementStyles } from "./utils";

var myUnderlines = [];
const underline = (
  querySelector = ".underline",
  underlineStyles = {
    "text-underline-color": "#000",
    "text-underline-position": "auto", // could be ratio or todo: px
    "text-underline-skip": true,
    "text-underline-width": "auto" // could be auto or px or ratio
  }
) => {
  var underlineElements = document.querySelectorAll(querySelector);
  for (const element of underlineElements) {
    // single line or multiple line?
    const elementStyles = getElementStyles(element);
    if (elementStyles.height > elementStyles.lineHeight) {
      // multiple lines
      // console.log('multiple lines');
      var myUnderline = new MultipleUnderline(element, underlineStyles);
    } else {
      // single line
      var myUnderline = new SingleUnderline(element, underlineStyles);
    }
    myUnderlines.push(myUnderline);
  }
};
window.onload = () => {
  underline();
};

function animate(underlines) {
  for (const underline of underlines) {
    // clear
    underline.clear();

    // update
    underline.update();

    // draw stuff
    underline.draw();
  }

  // request new frame  var element = element;

  requestAnimationFrame(() => animate(underlines));
}
animate(myUnderlines);
