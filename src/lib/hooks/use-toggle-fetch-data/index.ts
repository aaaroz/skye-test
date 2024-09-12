import * as React from "react";
import { ToggleFetchDataContext } from "@/context";

export const useToggleFetchData = () => {
  const context = React.useContext(ToggleFetchDataContext);
  if (!context) {
    throw new Error(
      "useToggleFetchDataContext should be used within <ToggleFetchDataContextProvider>"
    );
  }
  return context;
};
