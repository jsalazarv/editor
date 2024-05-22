import { useCallback, useEffect, useState } from 'react';

interface ILoaderProps {
  loading?: boolean;
  label?: string;
  delay?: number;
  onHide?: () => void;
}

export const Loader = ({
  loading = false,
  label = 'Loading...',
  delay = 0,
  onHide,
}: ILoaderProps) => {
  const [isLoading, setLoading] = useState(loading);

  const changeState = useCallback(
    (loading: boolean) => {
      setLoading(loading);
      !loading && onHide?.();
    },
    [setLoading, onHide],
  );

  useEffect(() => {
    if (loading || !delay) return changeState(loading);

    const timeOut = setTimeout(() => {
      changeState(loading);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [loading, delay, changeState]);

  return (
    <>
      {isLoading && (
        <div className="z-[9999] top-0 left-0 fixed w-screen h-screen bg-white dark:bg-slate-800">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary-500"
              role="status"></div>
            <span className="mt-5 text-slate-500 dark:text-white">{label}</span>
          </div>
        </div>
      )}
    </>
  );
};
