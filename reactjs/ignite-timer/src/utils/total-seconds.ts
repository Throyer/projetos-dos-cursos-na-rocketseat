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

export interface Time {
  minute: string;
  second: string;
}

export const remainingTime = (elapsedSeconds: number, cycle: Cycle | undefined): Time => {
  const remainingSeconds = remainingSecondsInCycle(elapsedSeconds, cycle);
  
  const currentMinutes = Math.floor(remainingSeconds / 60);
  const currentSeconds = remainingSeconds % 60;

  const minute = String(currentMinutes).padStart(2, '0');
  const second = String(currentSeconds).padStart(2, '0');

  return {
    minute,
    second
  }
}