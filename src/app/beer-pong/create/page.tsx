import { PanelRightCloseIcon, XIcon } from "lucide-react";
import { CreateTournamentForm } from "../../../components/tournament/create-tournament/form";
import { Button } from "../../../components/ui/button";

export default function CreateTournamentPage() {
  return (
    <main className="flex h-full flex-col items-center justify-between overflow-y-auto overflow-x-clip p-10 pt-4 text-xl font-semibold">
      <div className="flex w-full max-w-md justify-between">
        <h1>Ny turnering</h1>
        <Button variant="outline" size="icon">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <CreateTournamentForm />
    </main>
  );
}
