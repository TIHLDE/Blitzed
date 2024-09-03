import * as z from 'zod';

export default z.object({
  tournamentName: z.string().min(2, {
    message: 'Minst 2 tegn',
  }),
  randomTeams: z.boolean().default(false).optional(),
  thildeExclusive: z.boolean().default(false).optional(),
  bronzeFinal: z.boolean().default(false).optional(),
  maxParticipants: z.boolean().default(false).optional(),
  maxParticipantsNumber: z.coerce
    .number()
    .min(2, {
      message: 'Minst 2 spillere',
    })
    .max(64, {
      message: 'Max 64 spillere',
    })
    .default(8)
    .optional(),
  privateTournament: z.boolean().default(false).optional(),
});
