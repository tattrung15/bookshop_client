import { ValidatorHelpers } from "./validator.helper";

const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};

const isStringEmpty = (value: string): boolean => {
  return ValidatorHelpers.isNullOrUndefined(value) || value.trim() === "";
};

export const StringHelpers = {
  isString,
  isStringEmpty,
};
