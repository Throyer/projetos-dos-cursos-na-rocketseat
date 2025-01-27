import { Cycle, UpdateCycleProps } from "@pages/home/components/cycle";
import { nanoid } from "nanoid";
import { CycleAction } from ".";

const addNewCycle = ({ minutes_amount, title }: UpdateCycleProps): CycleAction<Cycle> => {
  const cycle: Cycle = {
    id: nanoid(),
    title,
    started_at: new Date().toJSON(),
    minutes_amount,
    status: 'Em andamento'
  }

  return {
    type: 'ADD',
    payload: {
      data: cycle
    }
  };
}

const stopCycle = (cycle: Cycle): CycleAction<Cycle> => {
  return {
    type: 'STOP',
    payload: {
      data: cycle
    }
  }
}

const finishCycle = (cycle: Cycle): CycleAction<Cycle> => {
  return {
    type: 'FINISHED',
    payload: {
      data: cycle
    }
  }
}

const removeCycle = (id: string): CycleAction<string> => {
  return {
    type: 'REMOVE',
    payload: {
      data: id
    }
  }
}

const restartCycle = (id: string): CycleAction<string> => {
  return {
    type: 'RESTART',
    payload: {
      data: id
    }
  }
}

export const Actions = {
  addNewCycle,
  stopCycle,
  finishCycle,
  removeCycle,
  restartCycle
}