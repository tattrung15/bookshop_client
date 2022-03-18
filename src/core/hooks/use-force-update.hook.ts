import { useCallback, useState } from "react";

export default function useForceUpdate(): [number, () => void] {
  const [value, setValue] = useState(0);
  const update = useCallback(() => setValue((value) => value + 1), []);
  return [value, update];
}
