import { encode } from "blurhash";
const IMG_URL = import.meta.env.VITE_S3_MEDIA_URL

const getImageData = (image: HTMLImageElement): ImageData => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error('Could not get 2D context');
  }
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      try {
        const imageData = getImageData(img)
      const blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
      resolve(blurHash)
      } catch (error) {
        reject(error)
      }
    };
    img.onerror = (error) => reject(new Error(`Error loading image: ${error}`));
  });

export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const defaultAvatarHash = () => {
  return [
    "UFG,6GxGGcI:NQoyxUs99Ds,00bv.AIpMws.",
    "ULKc6T}]0L-UE1O=-Vs9019[S]NF],v%9tV@",
    "UJLghSxuL2Rj%#t7Q-Rj00WB4TM{~WM{9ZRj",
    "UOIWK9W;IAoLnPShNtsA1Hso5*so}ZW;9uR*",
    "UFH_}W:]PC-p~psq4nNF00EK4TNxojxn%2tS",
    "UGHV3hRj0Nj]AdRO-Poz00s;*xtS~DtS56x]",
    "UCJ?]$f80DbE0af8}$f$0Jf70Jf%I~ays4kB",
    "UCLWtpxV00$w9Qfi-|br00S#uls+5_RVISxV",
    "UEK^4s$|B1Wmo{t5wIja02IX03oz~9Ir57j]",
  ];
};

export const defaultAvatar = () => {
  return [
    {"url": `${IMG_URL}images/avatar/1.png`, "hash": "UFG,6GxGGcI:NQoyxUs99Ds,00bv.AIpMws."},
    {"url": `${IMG_URL}images/avatar/2.png`, "hash": "ULKc6T}]0L-UE1O=-Vs9019[S]NF],v%9tV@"},
    {"url": `${IMG_URL}images/avatar/3.png`, "hash": "UJLghSxuL2Rj%#t7Q-Rj00WB4TM{~WM{9ZRj"},
    {"url": `${IMG_URL}images/avatar/4.png`, "hash": "UOIWK9W;IAoLnPShNtsA1Hso5*so}ZW;9uR*"},
    {"url": `${IMG_URL}images/avatar/5.png`, "hash": "UFH_}W:]PC-p~psq4nNF00EK4TNxojxn%2tS"},
    {"url": `${IMG_URL}images/avatar/6.png`, "hash": "UGHV3hRj0Nj]AdRO-Poz00s;*xtS~DtS56x]"},
    {"url": `${IMG_URL}images/avatar/7.png`, "hash": "UCJ?]$f80DbE0af8}$f$0Jf70Jf%I~ays4kB"},
    {"url": `${IMG_URL}images/avatar/8.png`, "hash": "UCLWtpxV00$w9Qfi-|br00S#uls+5_RVISxV"},
    {"url": `${IMG_URL}images/avatar/9.png`, "hash": "UEK^4s$|B1Wmo{t5wIja02IX03oz~9Ir57j]"},
  ];
};

export default encodeImageToBlurhash;
