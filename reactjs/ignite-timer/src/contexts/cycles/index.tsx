import { createContext, PropsWithChildren, useReducer } from "react";
import { Cycle } from "@pages/home/components/cycle";
import { nanoid } from "nanoid";

export interface CyclesContextProps {
  createNewCycle: (props: Pick<Cycle, 'title' | 'minutes_amount'>) => void;
  finishCurrentCycle: () => void;
  interruptCurrentCycle: () => void;
  currentCycle?: Cycle;
  cycles: Cycle[];
}

interface CycleState {
  cycles: Cycle[];
  currentCycleId: string | null;
}

interface CycleAction<T> {
  type: 'add' | 'stop' | 'finished',
  payload: {
    data: T
  }
};

export const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider = ({ children }: PropsWithChildren) => {
  const [{ cycles, currentCycleId }, dispatch] = useReducer((state: CycleState, action: CycleAction<Cycle>) => {
    const { type, payload } = action;

    if (type === 'add') {
      return {
        ...state,
        cycles: [...state.cycles, payload.data],
        currentCycleId: payload.data.id
      };
    }

    if (type === 'stop') {
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id !== state.currentCycleId) {
            return cycle;
          }
  
          cycle.status = 'Interrompido';
          cycle.interrupted_at = new Date().toJSON();
  
          return cycle;
        }),
        currentCycleId: null
      };
    }

    if (type === 'finished') {
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id !== state.currentCycleId) {
            return cycle;
          }
  
          cycle.status = 'Concluído';
          cycle.finished_at = new Date().toJSON();
  
          return cycle;
        }),
        currentCycleId: null
      };
    }
    
    return state;
  },
  { 
    cycles: [],
    currentCycleId: null
  });

  const currentCycle = cycles.find(cycle => cycle.id === currentCycleId);

  const createNewCycle = ({ minutes_amount, title }: Pick<Cycle, 'title' | 'minutes_amount'>) => {
    const cycle: Cycle = {
      id: nanoid(),
      title,
      started_at: new Date().toJSON(),
      minutes_amount,
      status: 'Em andamento'
    }

    dispatch({
      type: 'add',
      payload: {
        data: cycle
      }
    });
  }

  const interruptCurrentCycle = () => {
    if (currentCycle) {
      dispatch({
        type: 'stop',
        payload: {
          data: currentCycle
        }
      })
    }
  }

  const finishCurrentCycle = () => {
    if (currentCycle) {
      dispatch({
        type: 'finished',
        payload: {
          data: currentCycle
        }
      });
    }
  }

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