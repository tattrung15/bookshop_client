import { isNullOrUndefined } from "./helpers";

const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};

const isStringEmpty = (value: string): boolean => {
  return isNullOrUndefined(value) || value.trim() === "";
};

export const StringHelpers = {
  isString,
  isStringEmpty,
};
