import { useCallback, useEffect, useState } from "react";
import { Observable, Subject, take, takeUntil } from "rxjs";

export default function useObservable<T>() {
  const [destroy$] = useState(new Subject<void>());

  useEffect(
    () => () => {
      if (!destroy$.closed) {
        destroy$.next();
        destroy$.complete();
      }
    },
    [destroy$]
  );

  const subscribeOnce = useCallback(
    (observable: Observable<T>, callback: (data: any) => void) =>
      observable.pipe(take(1)).subscribe((data) => callback(data)),
    []
  );

  const subscribeUntilDestroy = useCallback(
    (observable: Observable<T>, callback: (data: any) => void) =>
      observable.pipe(takeUntil(destroy$)).subscribe((data) => callback(data)),
    [destroy$]
  );

  return { subscribeOnce, subscribeUntilDestroy };
}
