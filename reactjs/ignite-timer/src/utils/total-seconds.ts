import { Cycle } from "@pages/home/components/cycle";

export const totalSecondsInCycle = (cycle: Cycle | undefined): number => {
  if (!cycle) {
    return 0;
  }

  return cycle.minutes_amount * 60;
}

export const remainingSecondsInCycle = (elapsedSeconds: number, cycle: Cycle | undefined): number => {
  const totalSeconds = totalSecondsInCycle(cycle);

  if (totalSeconds === 0) {
    return 0
  }
  
  return totalSeconds - elapsedSeconds;
}