import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsState = (init) => {
  const [searchParams, _setSearchParams] = useSearchParams(init);
  useEffect(() => {
    if (!init) return;
    _setSearchParams(init);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSearchParams = (newParams) => {
    const newState = [...searchParams.entries()].reduce(
      (state, [key, value]) => {
        state[key] = value;
        return state;
      },
      {}
    );

    _setSearchParams({ ...newState, ...newParams });
  };

  return [searchParams, setSearchParams];
};
