import { Play } from "@phosphor-icons/react"

import * as Styles from "./styles";

export const Home = () => {
  return (
    <Styles.Container>
      <form>
        <Styles.Inputs>

          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
          />

          <label htmlFor="minutesAmount">durante</label>
          <Styles.MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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

        <Styles.StartButton disabled type="submit">
          <Play size={24} />
          começar
        </Styles.StartButton>
      </form>
    </Styles.Container>
  )
}