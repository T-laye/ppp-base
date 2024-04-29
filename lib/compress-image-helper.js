import sharp from "sharp";

export async function CompressImageHelper(
  image,
  MAX_WIDTH = 450,
  MAX_HEIGHT = 450,
  MAX_SIZE = 50 * 1024
) {
  const buffer = await image.arrayBuffer();
  const metadata = await sharp(buffer).metadata();
  let w = metadata.width;
  let h = metadata.height;
  if (w > h) {
    if (w > MAX_WIDTH) {
      h *= MAX_WIDTH / w;
      w = MAX_WIDTH;
    }
  } else {
    if (h > MAX_HEIGHT) {
      w *= MAX_HEIGHT / h;
      h = MAX_HEIGHT;
    }
  }
  w = Math.round(w);
  h = Math.round(h);

  let imageQuality = getInitialImageQuality(buffer, MAX_SIZE);
  const compressed = await sharp(buffer)
    .resize(w, h)
    .jpeg({ imageQuality })
    .toBuffer();

  // console.log("the compressed file", compressed.length);
  //   const getP = (1 - compressed.length / image.size) * 100;
  //   console.log("Compression percentage:", getP.toFixed(2), "%");

  const resizedBase64 = compressed.toString("base64");
    // `data:image/jpeg;base64,${compressed.toString("base64")}`;
  return resizedBase64;
}

function getInitialImageQuality(buffer, MAX_SIZE) {
  const sizeRatio = MAX_SIZE / buffer.length;
  const qualityRatio = Math.pow(sizeRatio, 1 / 3);
  return Math.max(Math.min(qualityRatio * 100, 100), 1);
}
