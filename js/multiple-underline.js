import GuitarString from "./guitar-string";
import { is_chrome, Point } from "./utils";
import CommonUnderline from "./commonUnderline";

export default class MultipleUnderline extends CommonUnderline {
  constructor(element, underlineStyles) {
    super(element, underlineStyles);
    //ctor
    this.canvas.style.left = this.elementStyles.canvasLeft + "px";

    this.multipleRedrawActive = false;
    if (is_chrome) {
      // chrome floor the lineheight when it is not a whole number
      // this.elementStyles.lineHeight = Math.floor(this.elementStyles.lineHeight * this.ratio);
      this.elementStyles.lineHeight =
        this.elementStyles.lineHeight * this.ratio;
    } else {
      this.elementStyles.lineHeight =
        this.elementStyles.lineHeight * this.ratio;
    }

    this.lines = [];
    this.myStrings = [];

    var words = this.text.match(/[^\s-]+-?\s?/g) || [];
    var line = "";

    var linePositionY = 0;
    var firstLineCount = 0;
    for (var n = 0; n < words.length; n++) {
      // add the whitespace after getting the width measurement
      if (words[n].match(/\s+$/)) {
        // the last character of words[n] is whitespace
        var newWord = words[n].replace(/\s+$/, "");
        var testLine = line + newWord;
        var testLineMetrics = this.ctx.measureText(testLine);
        var testLineWidth = testLineMetrics.width;
        testLine = testLine + " ";
      } else {
        var testLine = line + words[n];
        var testLineMetrics = this.ctx.measureText(testLine);
        var testLineWidth = testLineMetrics.width;
      }

      if (!firstLineCount) {
        //the first line, should consider startingPointX
        if (
          testLineWidth + this.elementStyles.textIndent * this.ratio >
            this.elementStyles.parentWidth * this.ratio &&
          n > 0
        ) {
          //  draw the underline
          if (line.match(/\s+$/)) {
            // the last character of line is whitespace
            var lineMetrics = this.ctx.measureText(line.replace(/\s+$/, ""));
            var lineWidth = lineMetrics.width;
          } else {
            var lineMetrics = this.ctx.measureText(line);
            var lineWidth = lineMetrics.width;
          }

          var tempLine = {
            lineText: line,
            lineTextIndent: this.elementStyles.textIndent * this.ratio - 0.2,
            linePositionY: linePositionY,
            lineMeasureWidth: lineWidth
          };
          this.lines.push(tempLine);

          line = words[n];
          linePositionY += this.elementStyles.lineHeight;
          firstLineCount++;
        } else {
          line = testLine;
        }
      } else {
        if (
          testLineWidth > this.elementStyles.parentWidth * this.ratio &&
          n > 0
        ) {
          //  draw the underline
          if (line.match(/\s+$/)) {
            // the last character of line is whitespace
            var lineMetrics = this.ctx.measureText(line.replace(/\s+$/, ""));
            var lineWidth = lineMetrics.width;
          } else {
            var lineMetrics = this.ctx.measureText(line);
            var lineWidth = lineMetrics.width;
          }

          var tempLine = {
            lineText: line,
            lineTextIndent: -0.2,
            linePositionY: linePositionY,
            lineMeasureWidth: lineWidth
          };
          this.lines.push(tempLine);

          line = words[n];
          linePositionY += this.elementStyles.lineHeight;
        } else {
          line = testLine;
        }
      }
    }
    // draw the last line
    //  draw the underline
    if (line.match(/\s+$/)) {
      // the last character of line is whitespace
      var lineMetrics = this.ctx.measureText(line.replace(/\s+$/, ""));
      var lineWidth = lineMetrics.width;
    } else {
      var lineMetrics = this.ctx.measureText(line);
      var lineWidth = lineMetrics.width;
    }

    var tempLine = {
      lineText: line,
      lineTextIndent: -0.2,
      linePositionY: linePositionY,
      lineMeasureWidth: lineWidth
    };
    this.lines.push(tempLine);
    for (var i = 0; i < this.lines.length; i++) {
      var tempLine = this.lines[i];
      var myString = new GuitarString(
        this.ctx,
        new Point(
          tempLine.lineTextIndent,
          tempLine.linePositionY + this.underlinePosition
        ),
        new Point(
          tempLine.lineTextIndent + tempLine.lineMeasureWidth,
          tempLine.linePositionY + this.underlinePosition
        ),
        this.strokeWidth,
        this.underlineStyles["text-underline-color"],
        this.ratio
      );
      this.myStrings.push(myString);
    }

    this.drawUnderline();
  }

  drawUnderline() {
    // draw the underline
    for (var i = 0; i < this.myStrings.length; i++) {
      var tempString = this.myStrings[i];
      // tempString.clear();
      tempString.update();
      tempString.draw();
    }
  }

  drawHoles() {
    // draw the font stroke
    for (var i = 0; i < this.lines.length; i++) {
      var tempLine = this.lines[i];

      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.font = this.font;

      this.ctx.fillStyle = "green";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(
        tempLine.lineText,
        tempLine.lineTextIndent,
        tempLine.linePositionY
      );

      this.ctx.lineWidth = 2 * this.ratio + this.strokeWidth * 3.6;
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeText(
        tempLine.lineText,
        tempLine.lineTextIndent,
        tempLine.linePositionY
      );
    }
  }

  clear() {
    // clear
    var lastMultipleRedrawActive = this.multipleRedrawActive;
    this.multipleRedrawActive = false;
    for (var i = 0; i < this.myStrings.length; i++) {
      var tempString = this.myStrings[i];
      // this.myString.clear();
      // console.log(tempString.redrawActive);
      if (tempString.redrawActive) {
        this.multipleRedrawActive = true;
      }
    }
    // console.log(this.multipleRedrawActive);
    if (this.multipleRedrawActive) {
      console.log("clear now!");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // if (!lastMultipleRedrawActive && this.multipleRedrawActive) {
    //     for(var i = 0; i < this.myStrings.length; i++) {
    //         var tempString = this.myStrings[i];
    //         tempString.drawLine();
    //     }
    // }
  }

  update() {
    //update
  }

  draw() {
    // draw
    if (this.multipleRedrawActive) {
      this.drawUnderline();
      this.drawHoles();
    }
  }
}
