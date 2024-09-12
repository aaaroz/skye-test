export type TToggleFetchDataContext = {
  shouldFetchNewData: boolean;
  toggleShouldFetchNewData: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TToggleFetchDataContextProvider = {
  children: React.ReactNode;
};
