import { useObjectVal } from "react-firebase-hooks/database";

export const getIsomorphicUseObjectVal = () => {
  if (process.browser) {
    return useObjectVal;
  }
  const useObjectValHook: typeof useObjectVal = v => [
    undefined,
    false,
    undefined
  ];
  return useObjectValHook;
};
