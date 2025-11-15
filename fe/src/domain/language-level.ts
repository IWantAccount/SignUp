import {z} from "zod";
export const languageLevelEnum = z.enum([
    "A1",
    "A2",
    "B1",
    "B2"
])

export type LanguageLevelType = z.infer<typeof languageLevelEnum>;