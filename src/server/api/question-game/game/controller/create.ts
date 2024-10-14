import { z } from "zod";
import { adminProcedure, Controller } from '~/server/api/trpc';
import { assertHasCreateQuestionGameControl } from "../../middleware";
import { InputSchema, OutputSchema } from "../schema/create";
import { db } from "~/server/db";


const handler: Controller<
    z.infer<typeof InputSchema>,
    z.infer<typeof OutputSchema>
> = async ({input, ctx}) => {
    await assertHasCreateQuestionGameControl({ctx});

    const game = await db.questionGame.create({
        data: {
            title: input.title,
        },
        select: {
            id: true
        }
    });
    
    return {
        questionGameId: game.id
    }
}

export default adminProcedure
    .input(InputSchema)
    .output(OutputSchema)
    .mutation(handler);


