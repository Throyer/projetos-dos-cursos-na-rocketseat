import * as Styles from "./styles";

import { useCycles } from "../../../../contexts/cycles/use-cycles";

export const Countdown = () => {
  const { remainingTime: { minute, second } } = useCycles();

  return (
    <Styles.Countdown>
      <span>{minute[0]}</span>
      <span>{minute[1]}</span>
      <Styles.Separator>{':'}</Styles.Separator>
      <span>{second[0]}</span>
      <span>{second[1]}</span>
    </Styles.Countdown>
  )
}