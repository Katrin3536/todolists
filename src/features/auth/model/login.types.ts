import { loginSchema } from "@/features/auth/model/schemas"
import * as z from "zod"

export type LoginInputs = z.infer<typeof loginSchema>
