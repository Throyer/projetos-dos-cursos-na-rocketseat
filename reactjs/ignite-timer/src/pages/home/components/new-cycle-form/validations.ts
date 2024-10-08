import * as zod from 'zod'

export const newCycleValidationSchema = zod.object({
  title: zod.string().min(1, 'Informe a tarefa'),
  minutes_amount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});