import { HandPalm, Play } from "@phosphor-icons/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import * as Styles from "./styles";

import { CreateCycleFormFields } from "./components/new-cycle-form/types";
import { newCycleValidationSchema } from "./components/new-cycle-form/validations";

import { Debug } from "@utils/debug";
import { Countdown } from "./components/countdown";
import { NewCycleForm } from "./components/new-cycle-form";
import { useCycles } from "../../contexts/cycles";



export const Home = () => {
  const { currentCycle, createNewCycle, interruptCurrentCycle } = useCycles();

  const form = useForm<CreateCycleFormFields>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      title: '',
      minutes_amount: 0,
    },
  });

  const handleCreateNewCycle = ({ title, minutes_amount }: CreateCycleFormFields) => {
    createNewCycle({ title, minutes_amount });
    reset();
  }

  const handleInterruptCurrentCycle = () => {
    interruptCurrentCycle();
  }

  const { handleSubmit, watch, reset } = form;

  const disableSubmitButton = [watch('title'), watch('minutes_amount')]
  .map(value => Boolean(value))
  .some(value => !value);

  const hasActiveCycle = Boolean(currentCycle);

  return (
    <Styles.Container>
      <Debug content={{disableSubmitButton, hasActiveCycle}} />
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...form}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />

        {!hasActiveCycle && (
          <Styles.StartButton disabled={disableSubmitButton} type="submit">
            <Play size={24} />
            Começar
          </Styles.StartButton>
        )}

        {hasActiveCycle && (
          <Styles.StopButton onClick={handleInterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </Styles.StopButton>
        )}
      </form>
    </Styles.Container>
  )
}