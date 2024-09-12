import * as React from "react";
import type { TToggleFetchDataContext } from "@/entities";

export const ToggleFetchDataContext =
  React.createContext<TToggleFetchDataContext | null>(null);
