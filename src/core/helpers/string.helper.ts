import { isNullOrUndefined } from "./helpers";

const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};

const isStringEmpty = (value: string): boolean => {
  return isNullOrUndefined(value) || value.trim() === "";
};

const titleCase = (str: string): string => {
  const splitStr = str.toLowerCase().split(/\s+/g);
  for (let i = 0; i < splitStr.length; i++) {
    const word = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    splitStr[i] = word;
  }
  return splitStr.join(" ");
};

export { isString, isStringEmpty, titleCase };
