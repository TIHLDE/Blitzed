import { XIcon } from "lucide-react";
import { CreateTournamentForm } from "../../../components/tournament/create-tournament/form";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default function CreateTournamentPage() {
  return (
    <main className="flex h-full flex-col items-center justify-between overflow-y-auto overflow-x-clip p-10 pt-4 text-xl font-semibold">
      <div className="flex w-full max-w-md justify-between">
        <h1>Ny turnering</h1>
        <Link href="/beer-pong">
          <Button variant="outline" size="icon">
            <XIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <CreateTournamentForm />
    </main>
  );
}
