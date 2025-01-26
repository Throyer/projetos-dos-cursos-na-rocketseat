import { useContext } from "react";
import { CyclesContext, CyclesContextProps } from ".";

export const useCycles = (): CyclesContextProps => {
  const context = useContext(CyclesContext);

  if (!context) {
    throw new Error("o useCycles deve ser utilizado dentro de um CyclesProvider");
  }

  return context;
}