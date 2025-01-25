import { Play } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import * as Styles from "./styles";

import { newCycleValidationSchema } from "./components/new-cycle-form/validations";
import { CreateCycleFormFields } from "./components/new-cycle-form/types";
import { useEffect, useState } from "react";
import { Cycle } from "./components/cycle";
import { nanoid } from "nanoid";
import { remainingSecondsInCycle } from "@utils/total-seconds";
import { differenceInSeconds } from "date-fns";

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [currentCycleId, setCurrentCycleId] = useState<string|null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<CreateCycleFormFields>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      title: '',
      minutes_amount: 0,
    },
  });

  const handleCreateNewCycle = ({ minutes_amount, title }: CreateCycleFormFields) => {
    const cycle: Cycle = {
      id: nanoid(),
      title,
      started_at: new Date().toJSON(),
      minutes_amount,
      status: 'Em andamento'
    }

    setCycles(state => [cycle, ...state]);
    setCurrentCycleId(cycle.id);
    setElapsedSeconds(0);

    reset();
  }

  const currentCycle = cycles.find(cycle => cycle.id === currentCycleId);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (currentCycle) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(currentCycle.started_at);

        setElapsedSeconds(differenceInSeconds(now, start));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [currentCycle])

  const remainingSeconds = remainingSecondsInCycle(elapsedSeconds, currentCycle);
  
  const currentMinutes = Math.floor(remainingSeconds / 60);
  const currentSeconds = remainingSeconds % 60;

  const minute = String(currentMinutes).padStart(2, '0');
  const second = String(currentSeconds).padStart(2, '0');

  useEffect(() => {
    if (currentCycle) {
      document.title = `${minute}:${second}`;
      return;
    }

    document.title = 'Ignite Timer';
  }, [currentCycle, minute, second])

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
          <span>{minute[0]}</span>
          <span>{minute[1]}</span>
          <Styles.Separator>{':'}</Styles.Separator>
          <span>{second[0]}</span>
          <span>{second[1]}</span>
        </Styles.Countdown>

        <Styles.StartButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          começar
        </Styles.StartButton>
      </form>
    </Styles.Container>
  )
}