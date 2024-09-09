"use client";

import { useEffect, useState } from "react";
import { api } from "../../../trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function JoinTournamentForm() {
  const [pinCode, setPinCode] = useState("");

  const { mutateAsync: joinTeam } = api.beerPong.team.join.useMutation();

  const joinATeam = async () => {
    await joinTeam({
      teamId: 2,
      tournamentId: "tournament id",
    });
  };

  const {
    data: tournament,
    error,
    isLoading,
  } = api.beerPong.tournament.get.useQuery(
    { pinCode },
    { enabled: pinCode.length === 4, retry: false },
  );
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (tournament) {
      router.push(`/beer-pong/${tournament!.id}`);
    }
  }, [tournament]);

  useEffect(() => {
    if (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
      setPinCode("");
    }
  }, [error]);

  return (
    <InputOTP
      maxLength={4}
      containerClassName="w-full"
      disabled={isLoading}
      pattern={REGEXP_ONLY_DIGITS}
      value={pinCode}
      onChange={setPinCode}
    >
      <InputOTPGroup className="flex w-full flex-1 justify-stretch">
        <InputOTPSlot index={0} className="h-16 w-full flex-1 text-2xl" />
        <InputOTPSlot index={1} className="h-16 w-full flex-1 text-2xl" />
        <InputOTPSlot index={2} className="h-16 w-full flex-1 text-2xl" />
        <InputOTPSlot index={3} className="h-16 w-full flex-1 text-2xl" />
      </InputOTPGroup>
    </InputOTP>
  );
}
