import * as z from 'zod';

export default z.object({
  first: z.coerce.number().min(0).max(9),
  second: z.coerce.number().min(0).max(9),
  third: z.coerce.number().min(0).max(9),
  fourth: z.coerce.number().min(0).max(9),
});
