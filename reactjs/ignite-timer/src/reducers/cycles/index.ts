import { Cycle } from "@pages/home/components/cycle";
import { produce } from "immer";

export interface CycleState {
  cycles: Cycle[];
  currentCycleId: string | null;
}

export type CycleActionType = 'ADD' | 'REMOVE' | 'STOP' | 'FINISHED' | 'RESTART';

export interface CycleAction<T> {
  type: CycleActionType,
  payload: {
    data: T
  }
};

export const cyclesReducer = (state: CycleState, action: CycleAction<Cycle | string>): CycleState => {
  const { type, payload: { data } } = action;

  if (typeof data === 'string') {
    if (type === 'REMOVE') {
      if (state.currentCycleId === data) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles = state.cycles.filter(cycle => cycle.id !== data);
      })
    }

    if (type === 'RESTART') {
      if (state.currentCycleId === data) {
        return state;
      }

      const index = state.cycles
        .findIndex(cycle => cycle.id === data);
    
      if (index < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.currentCycleId = data;
        draft.cycles[index].status = 'Em andamento';
        draft.cycles[index].started_at = new Date().toJSON();
        draft.cycles[index].interrupted_at = undefined;
      })
    }

    return state;
  }

  if (type === 'ADD') {
    return produce(state, (draft) => {
      draft.cycles.unshift(data);
      draft.currentCycleId = data.id;
    })
  }

  const index = state.cycles
    .findIndex(cycle => cycle.id === state.currentCycleId);

  if (index < 0) {
    return state;
  }

  if (type === 'STOP') {
    return produce(state, draft => {
      draft.currentCycleId = null;
      draft.cycles[index].status = 'Interrompido';
      draft.cycles[index].interrupted_at = new Date().toJSON();
    })
  }

  if (type === 'FINISHED') {
    return produce(state, draft => {
      draft.currentCycleId = null;
      draft.cycles[index].status = 'Concluído';
      draft.cycles[index].finished_at = new Date().toJSON();
    })
  }

  return state;
}