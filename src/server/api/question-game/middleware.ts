import { TRPCError } from "@trpc/server";
import { ProcedureCtx } from "../trpc"

export interface AssertHasCreateQuestionGameProps {
    ctx: ProcedureCtx;
}

/**
 * Throws an error if the user is not admin
 * 
 */
export const assertHasCreateQuestionGameControl = async ({
    ctx
}:AssertHasCreateQuestionGameProps) => {
    if(ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Du har ikke lov til å opprette et spill av 100 spørsmål"
        })
    }
}