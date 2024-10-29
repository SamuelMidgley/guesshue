import { RGB, ColorGame } from "../types";

const randInt = (toNum: number): number => {
  return Math.floor(Math.random() * (toNum + 1));
};

const generateRGBVal = (): RGB => {
  return {
    r: randInt(255),
    g: randInt(255),
    b: randInt(255),
  };
};

const generateRandomRGB = (): string => {
  const rgbVals = generateRGBVal();

  return `rgb(${rgbVals.r}, ${rgbVals.g}, ${rgbVals.b})`;
};

const generateHexCode = () => {
  const rgbVals = generateRGBVal();

  return (
    "#" +
    ((1 << 24) | (rgbVals.r << 16) | (rgbVals.g << 8) | rgbVals.b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};

const getColorList = (correctCount: number): string[] => {
  if (correctCount !== 0 && correctCount % 5 === 0) {
    return [generateHexCode(), generateHexCode(), generateHexCode()];
  }
  return [generateRandomRGB(), generateRandomRGB(), generateRandomRGB()];
};

export const createNewGame = (): ColorGame => {
  const colorOptions = getColorList(0);
  const correctIdx = randInt(2);

  return {
    colorOptions,
    correctColor: colorOptions[correctIdx],
    votes: [],
  };
};
