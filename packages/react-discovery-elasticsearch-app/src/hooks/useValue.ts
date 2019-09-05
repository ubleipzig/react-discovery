import {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import {useFirebaseApp as _useFirebaseApp} from '@use-firebase/app'

export const useValue = (path: string, eventType = 'value', initialValue = null, useFirebaseApp = _useFirebaseApp) => {
  const app = useFirebaseApp();
  const ref = useMemo(() => app.database().ref(path), [app, path]);
  const [value, setValue] = useState(initialValue);

  const set = useCallback(
    (newValueOrFunction) => {
      const method = typeof newValueOrFunction === 'function'
        ? 'transaction'
        : 'update';

      return ref[method](newValueOrFunction);
    },
    [ref]
  );

  useEffect(
    () => {
      const handler = (snapshot: any) => {
        const val = snapshot.val();
        setValue(val);
      };

      ref.on(eventType, handler);
      return () => {
        ref.off(eventType, handler);
      };
    },
    [ref, eventType]
  );

  return [value, set];
};

