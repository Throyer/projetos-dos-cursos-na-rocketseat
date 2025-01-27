import { nanoid } from "nanoid";
import { Cycle, UpdateCycleProps } from "@pages/home/components/cycle";
import { CycleActionType } from ".";

const addNewCycle = ({ minutes_amount, title }: UpdateCycleProps) => {
  const cycle: Cycle = {
    id: nanoid(),
    title,
    started_at: new Date().toJSON(),
    minutes_amount,
    status: 'Em andamento'
  }

  return {
    type: CycleActionType.ADD,
    payload: {
      data: cycle
    }
  };
}

const stopCycle = (cycle: Cycle) => {
  return {
    type: CycleActionType.STOP,
    payload: {
      data: cycle
    }
  }
}

const finishCycle = (cycle: Cycle) => {
  return {
    type: CycleActionType.FINISHED,
    payload: {
      data: cycle
    }
  }
}

export const Actions = {
  addNewCycle,
  stopCycle,
  finishCycle
}