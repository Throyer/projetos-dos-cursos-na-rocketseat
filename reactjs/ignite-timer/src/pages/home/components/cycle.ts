export type Status = 'Concluído' | 'Em andamento' | 'Interrompido';

export interface Cycle {
  id: string;
  title: string;
  started_at: string;
  finished_at?: string | undefined;
  minutes_amount: number,
  status: Status;
}