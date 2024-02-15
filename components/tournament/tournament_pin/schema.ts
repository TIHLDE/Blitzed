import * as z from 'zod';

export default z.object({
  one: z.string({ required_error: '👆' }).max(1),
  two: z.string({ required_error: '👆' }).max(1),
  three: z.string({ required_error: '👆' }).max(1),
  four: z.string({ required_error: '👆' }).max(1),
});
