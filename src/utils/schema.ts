import * as z from "zod"
 
export const roulletConfigSchema = z.object({
  backgroundColorGeral: z.string().min(3),
  backgroundColorRoullet: z.string().min(3),
  titleRoullet: z.string().min(2),
  subtitleRoullet: z.string(),
  names: z.array(z.string())
})