import * as Styles from "./styles";

import { useFormContext } from "react-hook-form";
import { useCycles } from "../../../../contexts/cycles";

export const NewCycleForm = () => {
  const { currentCycle } = useCycles();
  const { register } = useFormContext();

  return (
    <Styles.Inputs>

      <label htmlFor="task">Vou trabalhar em</label>
      <Styles.TaskInput
        id="task"
        type="text"
        list="task-suggestions"            
        placeholder="Dê um nome para o seu projeto"
        disabled={Boolean(currentCycle)}
        {...register('title')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <Styles.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={Boolean(currentCycle)}
        {...register('minutes_amount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </Styles.Inputs>
  )
}