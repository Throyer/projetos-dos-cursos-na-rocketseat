import { Cycle } from "@pages/home/components/cycle";
import { nanoid } from "nanoid";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface CyclesContextProps {
  createNewCycle: (props: Pick<Cycle, 'title' | 'minutes_amount'>) => void;
  finishCurrentCycle: () => void;
  interruptCurrentCycle: () => void;
  currentCycle?: Cycle;
  cycles: Cycle[];
}

export const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider = ({ children }: PropsWithChildren) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [currentCycleId, setCurrentCycleId] = useState<string|null>(null);

    const createNewCycle = ({ minutes_amount, title }: Pick<Cycle, 'title' | 'minutes_amount'>) => {
      const cycle: Cycle = {
        id: nanoid(),
        title,
        started_at: new Date().toJSON(),
        minutes_amount,
        status: 'Em andamento'
      }
  
      setCycles(state => [cycle, ...state]);
      setCurrentCycleId(cycle.id);
    }

    const interruptCurrentCycle = () => {
      if (currentCycle) {
        setCycles(state => state.map(cycle => {
          if (cycle.id !== currentCycle.id) {
            return cycle;
          }
  
          cycle.status = 'Interrompido';
          cycle.interrupted_at = new Date().toJSON();
  
          return cycle;
        }))
  
        setCurrentCycleId(null);
      }
    }

    const finishCurrentCycle = () => {
      setCycles(state => state.map(cycle => {
        if (cycle.id !== currentCycleId) {
          return cycle;
        }
  
        cycle.status = 'Concluído';
        cycle.finished_at = new Date().toJSON();
  
        return cycle;
      }))
  
      setCurrentCycleId(null);
    }
  
    const currentCycle = cycles.find(cycle => cycle.id === currentCycleId);

  return (
    <CyclesContext.Provider value={{
      createNewCycle,
      interruptCurrentCycle,
      finishCurrentCycle,
      currentCycle,
      cycles
    }}>
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycles = (): CyclesContextProps => {
  const context = useContext(CyclesContext);

  if (!context) {
      throw new Error("o useCycles deve ser utilizado dentro de um CyclesProvider");
  }

  return context;
}