import { Cycle, UpdateCycleProps } from "@pages/home/components/cycle";
import { differenceInSecondsFromNow, remainingTime, Time, totalSecondsInCycle } from "@utils/total-seconds";
import { createContext, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { cyclesReducer, CycleState } from "../../reducers/cycles";
import { Actions } from "../../reducers/cycles/actions";

const LOCAL_STORAGE_KEY = 'github.com/throyer:iginite-timer:cycles-state:1.0.0-alpha';

export interface CyclesContextProps {
  addNewCycle: (props: Pick<Cycle, 'title' | 'minutes_amount'>) => void;
  interruptCurrentCycle: () => void;
  remainingTime: Time;
  currentCycle?: Cycle;
  cycles: Cycle[];
}

export const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider = ({ children }: PropsWithChildren) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    currentCycleId: null
  }, () => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!json) {
      return {
        cycles: [],
        currentCycleId: null
      }
    }

    return JSON.parse(json) as CycleState;
  });

  const { cycles, currentCycleId } = cyclesState;
  
  const currentCycle = cycles.find(cycle => cycle.id === currentCycleId);

  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    if (currentCycle) {
      return differenceInSecondsFromNow(currentCycle);
    }

    return 0;
  });

  const time = remainingTime(elapsedSeconds, currentCycle);

  const addNewCycle = ({ minutes_amount, title }: UpdateCycleProps) => {
    dispatch(Actions.addNewCycle({ minutes_amount, title }));
  }

  const interruptCurrentCycle = () => {
    if (currentCycle) {
      dispatch(Actions.stopCycle(currentCycle));
    }
  }

  useEffect(() => {
    const json = JSON.stringify(cyclesState);
    localStorage.setItem(LOCAL_STORAGE_KEY, json);
  }, [cyclesState])

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (currentCycle) {
      interval = setInterval(() => {
        const difference = differenceInSecondsFromNow(currentCycle); 

        if (difference >= totalSecondsInCycle(currentCycle)) {
          dispatch(Actions.finishCycle(currentCycle));
          setElapsedSeconds(difference);
          clearInterval(interval);
          return;
        }

        setElapsedSeconds(difference);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [currentCycle])

  useEffect(() => {
    if (currentCycle) {
      const { minute, second } = time;
      document.title = `▶️ ${minute}:${second}`;
      return;
    }

    document.title = 'Ignite Timer';
  }, [currentCycle, time])

  return (
    <CyclesContext.Provider value={{
      addNewCycle,
      interruptCurrentCycle,
      remainingTime: time,
      currentCycle,
      cycles
    }}>
      {children}
    </CyclesContext.Provider>
  )
}