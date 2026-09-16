import { ResultCode } from "@/common/enums"
import { z } from "zod/v4"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type GlobalError = string | null

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

type FieldError = z.infer<typeof fieldErrorSchema>

export type BaseResponse<T = {}> = {
  data: T
  resultCode: ResultCode
  messages: string[]
  fieldsErrors: FieldError[]
}

export const baseResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export const defaultResponseSchema = baseResponseSchema(z.object({}))
export type DefaultResponse = z.infer<typeof defaultResponseSchema>
