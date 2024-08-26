import { Play } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import * as Styles from "./styles";

import { newCycleValidationSchema } from "./components/new-cycle-form/validations";
import { CreateCycleFormFields } from "./components/new-cycle-form/types";

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<CreateCycleFormFields>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      title: '',
      minutes_amount: 0,
    },
  });

  const handleCreateNewCycle = (createCycleData: CreateCycleFormFields) => {
    console.log(JSON.stringify(createCycleData, null, 2));
    reset();
  }

  const title = watch('title');
  const isSubmitDisabled = !title;

  return (
    <Styles.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <Styles.Inputs>

          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
            {...register('minutes_amount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </Styles.Inputs>

        <Styles.Countdown>
          <span>0</span>
          <span>0</span>
          <Styles.Separator>{':'}</Styles.Separator>
          <span>0</span>
          <span>0</span>
        </Styles.Countdown>

        <Styles.StartButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          começar
        </Styles.StartButton>
      </form>
    </Styles.Container>
  )
}