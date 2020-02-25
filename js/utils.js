export const is_chrome =
  navigator.userAgent.toLowerCase().indexOf("chrome") > -1;

export const multiplyValue = function(value, multiplier) {
  var str = value;
  var m = multiplier;
  var result = str.match(/(\d*\.?\d*)(.*)/);
  //http://stackoverflow.com/questions/2868947/split1px-into-1px-1-px-in-javascript
  return result[1] * m + result[2];
};

export const optimalStrokeWidthPos = function(strokeWidth, posY) {
  if (strokeWidth < 1) {
    posY = Math.round(posY - 0.5) + 0.5;
  } else if (strokeWidth >= 1) {
    strokeWidth = Math.round(strokeWidth);
    if (strokeWidth % 2) {
      // odd, posY -> 0.5
      posY = Math.round(posY - 0.5) + 0.5;
    } else {
      // even, posY -> 1
      posY = Math.round(posY);
    }
  }
  return {
    strokeWidth: strokeWidth,
    posY: posY
  };
};

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
