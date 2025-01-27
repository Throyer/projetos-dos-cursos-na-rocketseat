import { Cycle, UpdateCycleProps } from "@pages/home/components/cycle";
import { differenceInSecondsFromNow, remainingTime, Time, totalSecondsInCycle } from "@utils/total-seconds";
import { createContext, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { cyclesReducer, CycleState } from "../../reducers/cycles";
import { Actions } from "../../reducers/cycles/actions";

const AUTHOR = 'http://github.com/throyer';
const APP = 'pomodoro-timer';
const VERSION = '1.0.0-alpha';
const LOCAL_STORAGE_KEY_DESCRIPTION = 'cycles-state'
const LOCAL_STORAGE_KEY = `${AUTHOR}:${APP}-${VERSION}:${LOCAL_STORAGE_KEY_DESCRIPTION}`;

export interface CyclesContextProps {
  addNewCycle: (props: Pick<Cycle, 'title' | 'minutes_amount'>) => void;
  interruptCurrentCycle: () => void;
  remainingTime: Time;
  currentCycle?: Cycle;
  cycles: Cycle[];
}

const defaultStateValue: CycleState = {
  cycles: [],
  currentCycleId: null
}

export const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider = ({ children }: PropsWithChildren) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, defaultStateValue, (initialState) => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!json) {
      return initialState
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

    document.title = 'Pomodoro Timer';
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