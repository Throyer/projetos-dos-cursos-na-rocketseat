export type Status = 'Concluído' | 'Em andamento' | 'Interrompido';

export interface Cycle {
  id: string;
  title: string;
  started_at: string;
  minutes_amount: number,
  status: Status;
}