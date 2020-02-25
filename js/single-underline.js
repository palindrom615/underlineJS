import GuitarString from "./guitar-string";
import { Point } from "./utils";
import CommonUnderline from "./commonUnderline";

export default class SingleUnderline extends CommonUnderline {
  constructor(element, underlineStyles) {
    super(element, underlineStyles);
    //ctor
    this.redrawActive = false;

    // todo: if last character is a space, remove the space
    const textWidth = this.ctx.measureText(this.text).width;

    this.myString = new GuitarString(
      this.ctx,
      new Point(0, this.underlinePosition),
      new Point(textWidth, this.underlinePosition),
      this.strokeWidth,
      this.underlineStyles["text-underline-color"],
      this.ratio
    );
    this.drawHoles();
  }

  drawUnderline() {
    //  draw the underline
    this.myString.draw();
  }

  drawHoles() {
    // draw the font stroke
    this.ctx.font = this.font;
    this.ctx.textBaseline = "top";

    this.ctx.globalCompositeOperation = "destination-out";

    this.ctx.lineWidth = 2 * this.ratio + this.strokeWidth * 3.6;
    this.ctx.strokeStyle = "blue";
    this.ctx.beginPath();
    this.ctx.strokeText(this.text, -0.2, 0);

    this.ctx.fillStyle = "green";
    this.ctx.beginPath();
    this.ctx.fillText(this.text, -0.2, 0);
  }

  clear() {
    this.redrawActive = this.myString.redrawActive;
    // clear
    if (this.myString.redrawActive) {
      // this.myString.clear();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  update() {
    // update
    if (this.myString.redrawActive) {
      this.myString.update();
    }
  }

  draw() {
    // draw
    if (this.redrawActive) {
      this.drawUnderline();
      this.drawHoles();
    }
  }
}
