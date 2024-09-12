import * as React from "react";
import { TToggleFetchDataContextProvider } from "@/entities";
import { ToggleFetchDataContext } from "./toggle-context";

export default function ToggleFetchDataContextProvider({
  children,
}: TToggleFetchDataContextProvider) {
  const [shouldFetchNewData, toggleShouldFetchNewData] = React.useState(true);

  return (
    <ToggleFetchDataContext.Provider
      value={{ shouldFetchNewData, toggleShouldFetchNewData }}
    >
      {children}
    </ToggleFetchDataContext.Provider>
  );
}
