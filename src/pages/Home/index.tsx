import { HandPalm, Play } from "phosphor-react";
import { HomerContainer, StartCountDownButton, StoptCountDownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import { CyclesContext } from "../../contexts/Cyclecontext";



export function Home() {

  const { activeCycle, CreateNewCycle, InterruptCurrentCycle } = useContext(CyclesContext)

  const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60, 'O intervalo precisa ser de no máximo 60minutos'),
  });

  type newCycleFormData = zod.infer<typeof newCycleFormSchema>

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });
  function handleCreateNewCycle(data: newCycleFormData) {
    CreateNewCycle(data)
    reset()
  }
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomerContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>


        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />


        {activeCycle ? (
          <StoptCountDownButton type="button" onClick={InterruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StoptCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>

        )}
      </form>
    </HomerContainer>
  )
}