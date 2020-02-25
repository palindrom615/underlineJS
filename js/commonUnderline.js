import {
    multiplyValue,
    optimalStrokeWidthPos,
    getElementStyles
  } from "./utils";

export default class CommonUnderline {
  constructor(element, underlineStyles) {
    this.element = element;

    this.text = this.element.textContent;

    this.underlineStyles = underlineStyles;

    this.elementStyles = getElementStyles(element);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ratio = window.devicePixelRatio;
    this.canvas.width = this.elementStyles.width * this.ratio;
    this.canvas.height = this.elementStyles.height * this.ratio;
    this.element.appendChild(this.canvas);
    this.canvas.style.width = this.elementStyles.width + "px";

    this.ctx.font = this.font =
      this.elementStyles.fontStyle +
      " " +
      multiplyValue(this.elementStyles.fontSize, this.ratio) +
      " " +
      this.elementStyles.fontFamily;

    // determine the text-underline-width / strokeWidth
    var dotWidth = this.ctx.measureText(".")["width"];
    if (this.underlineStyles["text-underline-width"] == "auto") {
      // if set to auto, calculate the optimized width based on font
      this.strokeWidth = dotWidth / 12;
    } else {
      //if set to px value, todo: other unit such as em?
      this.strokeWidth = this.underlineStyles["text-underline-width"];
      //get number value
      this.strokeWidth = parseFloat(this.strokeWidth) * this.ratio;
    }

    // determine the text-underline-position / underlinePosition
    // text-underline-position in ratio, todo: default and user set position ratio
    if (this.underlineStyles["text-underline-position"] == "auto") {
      // if set to auto, calculate the optimized width based on font
      this.underlinePosition =
        parseFloat(this.elementStyles.fontSize) *
          this.ratio *
          (1 -
            this.elementStyles.baselinePositionRatio +
            this.elementStyles.baselinePositionRatio * 0.4) +
        this.strokeWidth / 2;
    } else {
      //if set to ratio value, todo: other unit such as em, px?
      var userUnderlinePosition = parseFloat(
        this.underlineStyles["text-underline-position"]
      );
      // console.log(userUnderlinePosition);
      this.underlinePosition =
        parseFloat(this.elementStyles.fontSize) *
          this.ratio *
          (1 -
            this.elementStyles.baselinePositionRatio +
            this.elementStyles.baselinePositionRatio * userUnderlinePosition) +
        this.strokeWidth / 2;
    }

    var adjustValue = optimalStrokeWidthPos(
      this.strokeWidth,
      this.underlinePosition
    );
    this.strokeWidth = adjustValue.strokeWidth;
    this.underlinePosition = adjustValue.posY;
  }
}
