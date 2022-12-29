import { useSearchParams } from "react-router-dom";

export const useSearchParamsState = (initialState) => {
  const [searchParams, _setSearchParams] = useSearchParams(initialState);

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
