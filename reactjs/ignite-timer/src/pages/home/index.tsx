import { Play } from "@phosphor-icons/react"

import * as Styles from "./styles";

export const Home = () => {
  return (
    <Styles.Container>
      <form>
        <Styles.Inputs>

          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </Styles.Inputs>

        <Styles.Countdown>
          <span>0</span>
          <span>0</span>
          <Styles.Separator>:</Styles.Separator>
          <span>0</span>
          <span>0</span>
        </Styles.Countdown>

        <button type="submit">
          <Play size={24} />
          começar
        </button>
      </form>
    </Styles.Container>
  )
}