import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cycleReducer } from "../reducers/cycles/reducer";
import { InterruptCurrentCycleAction, MarkeCurrentCycleAsFinishAction, addNewCycleAction } from "../reducers/cycles/action";
import { differenceInSeconds } from "date-fns";

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CreateCycleData {
  task: string;
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinish: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  CreateNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}


export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cycleReducer, {
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
    const storageStateJson = localStorage.getItem('@ignite-timer:cycles-state-1.0');
    if (storageStateJson) {

      return JSON.parse(storageStateJson);
    }
    return initialState
  });

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date, new Date(activeCycle.startDate))
    }
    return 0
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0', stateJson)
  }, [cyclesState])



  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second)
  }
  function markCurrentCycleAsFinish() {
    dispatch(MarkeCurrentCycleAsFinishAction())

  }
  function CreateNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0)
  }

  function InterruptCurrentCycle() {
    dispatch(InterruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles, activeCycle, activeCycleId, markCurrentCycleAsFinish,
        amountSecondsPassed, setSecondsPassed, CreateNewCycle, InterruptCurrentCycle
      }}>
      {children}
    </CyclesContext.Provider>
  );
}
