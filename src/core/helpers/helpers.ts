export const nullSafetyJSONStringify = (obj: any): string => {
  return JSON.stringify(obj, (k, v) => (v === null ? undefined : v));
};

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isStrEmpty(value: string): boolean {
  return isNullOrUndefined(value) || value.trim() === "";
}
