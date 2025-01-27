import { Cycle } from "@pages/home/components/cycle";
import { produce } from "immer";

export interface CycleState {
  cycles: Cycle[];
  currentCycleId: string | null;
}

export enum CycleActionType {
  ADD = 'ADD',
  STOP = 'STOP',
  FINISHED = 'FINISHED'
}

export interface CycleAction<T> {
  type: CycleActionType,
  payload: {
    data: T
  }
};

export const cyclesReducer = (state: CycleState, action: CycleAction<Cycle>) => {
  const { type, payload: { data } } = action;

  switch (type) {
    case CycleActionType.ADD:
      return produce(state, (draft) => {
        draft.cycles.push(data);
        draft.currentCycleId = data.id;
      })

    case CycleActionType.STOP: {
      const index = state.cycles
        .findIndex(cycle => cycle.id === state.currentCycleId);

      if (index < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.currentCycleId = null;
        draft.cycles[index].status = 'Interrompido';
        draft.cycles[index].interrupted_at = new Date().toJSON();
      })
    }
    case CycleActionType.FINISHED: {
      const index = state.cycles
        .findIndex(cycle => cycle.id === state.currentCycleId);

      if (index < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.currentCycleId = null;
        draft.cycles[index].status = 'Concluído';
        draft.cycles[index].finished_at = new Date().toJSON();
      })
    }
  }
}