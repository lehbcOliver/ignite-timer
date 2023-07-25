import { ActionsTypes } from "./action";
import { produce } from 'immer';

interface CyclesState {
  cycles: Cycle[],
  activeCycleId: string | null
}
export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}



/*eslint-disable*/
export function cycleReducer(state: CyclesState, action: any) {
  if (action.type === ActionsTypes.add_new_cycle) {

    return produce(state, draft => {
      draft.cycles.push(action.payload.newCycle);
      draft.activeCycleId = action.payload.newCycle.id
    })
  }

  if (action.type === ActionsTypes.interrupt_current_cycle) {
    const currentCycleIndex = state.cycles.findIndex(cycle => {
      return cycle.id === state.activeCycleId
    });
    if (currentCycleIndex < 0) {
      return state;
    }
    return produce(state, draft => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].interruptedDate = new Date()

    })
  }
  if (action.type === ActionsTypes.mark_current_cycle_as_finish) {
    const currentCycleIndex = state.cycles.findIndex(cycle => {
      return cycle.id === state.activeCycleId
    });
    if (currentCycleIndex < 0) {
      return state;
    }
    return produce(state, draft => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].finishedDate = new Date()

    })


  }

  return state
}