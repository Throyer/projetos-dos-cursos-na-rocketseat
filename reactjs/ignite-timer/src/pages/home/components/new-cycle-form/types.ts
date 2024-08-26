import * as zod from 'zod'

import { newCycleValidationSchema } from "./validations"

export type CreateCycleFormFields = zod.infer<typeof newCycleValidationSchema>