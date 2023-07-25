import { Cycle } from "./reducer"

export enum ActionsTypes {
  add_new_cycle = 'add_new_cycle',
  interrupt_current_cycle = 'interrupt_current_cycle',
  mark_current_cycle_as_finish = 'mark_current_cycle_as_finish'
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsTypes.add_new_cycle,
    payload: { newCycle }
  }
}

export function MarkeCurrentCycleAsFinishAction() {
  return (
    {
      type: ActionsTypes.mark_current_cycle_as_finish,

    }
  )
}

export function InterruptCurrentCycleAction() {
  return (
    {
      type: ActionsTypes.interrupt_current_cycle,
    }
  )
}

