import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

class SvgToPng {
  async render(data) {
    let svgString;
    if (typeof data.content === "string") {
      svgString = data.content;
    } else {
      svgString = renderToStaticMarkup(data.content);
    }
    const baseImage = sharp(Buffer.from(svgString));
    if (data.width) {
      return baseImage
        .clone()
        .resize({
          width: typeof data.width === "number" ? data.width : data.width(data),
        })
        .toBuffer();
    } else {
      return baseImage.clone().toBuffer();
    }
  }
}
module.exports = SvgToPng;
