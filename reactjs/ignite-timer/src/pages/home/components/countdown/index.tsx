import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

import * as Styles from "./styles";

import { remainingTime, totalSecondsInCycle } from "@utils/total-seconds";
import { useCycles } from "../../../../contexts/cycles/use-cycles";

export const Countdown = () => {
  const { currentCycle, finishCurrentCycle } = useCycles();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { minute, second } = remainingTime(elapsedSeconds, currentCycle);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (currentCycle) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(currentCycle.started_at);
        const difference = differenceInSeconds(now, start); 

        if (difference >= totalSecondsInCycle(currentCycle)) {
          finishCurrentCycle();
          clearInterval(interval);
          return;
        }

        setElapsedSeconds(difference);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [currentCycle, finishCurrentCycle])

  useEffect(() => {
    if (currentCycle) {
      document.title = `▶️ ${minute}:${second}`;
      return;
    }

    document.title = 'Ignite Timer';
  }, [currentCycle, minute, second])

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