import { useEffect, useState } from "react";
import { Subject } from "rxjs";

export default function useDestroy(): HookResult {
  const [destroy$, setDestroy] = useState(new Subject<void>());

  useEffect(
    () => () => {
      if (!destroy$.closed) {
        destroy$.next();
        destroy$.complete();
      }
    },
    [destroy$]
  );

  return { destroy$, setDestroy };
}

type HookResult = {
  destroy$: Subject<void>;
  setDestroy: React.Dispatch<React.SetStateAction<Subject<void>>>;
};
