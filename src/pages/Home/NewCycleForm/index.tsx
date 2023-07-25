import { useContext } from 'react';
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../contexts/Cyclecontext';

export function NewCycleForm() {

  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput type="text" list="task-suggestions" id="task" placeholder="De um nome para seu projeto"
        {...register('task')} disabled={!!activeCycle} />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60}
        {...register('minutesAmount', { valueAsNumber: true })} disabled={!!activeCycle} />
      <span>minutos.</span>
    </FormContainer>
  );
}