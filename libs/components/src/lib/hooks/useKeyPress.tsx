import { useCallback, useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string, callback: () => void): void => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        setKeyPressed(true);
        callback();
      }
    },
    [callback, targetKey]
  );
  const upHandler = useCallback(
    ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, callback, downHandler, upHandler]);
};
