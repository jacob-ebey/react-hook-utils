import { useEffect, useState } from "react";

/**
 * Use a promise and receive [data, error, loading] values. It is strongly recommended to use in conjunction with useMemo.
 *
 * @param {Promise} promise The promise to use.
 * @return {[Object, Error, boolean]}
 */
export default function usePromise(promise) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!!promise);
  const [result, setResult] = useState(null);

  useEffect(
    () => {
      let canceled = false;

      if (!promise) {
        setLoading(false);
      } else {
        if (error) {
          setError(null);
        }

        if (!loading) {
          setLoading(true);
        }

        promise
          .then(r => {
            if (!canceled) {
              setResult(r);
            }
          })
          .catch(e => {
            if (!canceled) {
              setError(e);
            }
          })
          .then(() => {
            if (!canceled) {
              setLoading(false);
            }
          });
      }

      return () => {
        canceled = true;
      };
    },
    [promise]
  );

  return [result, error, loading];
}
