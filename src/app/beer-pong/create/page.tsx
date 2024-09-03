import { CreateTournamentForm } from "../../../components/tournament/create_tournament/form";

export default async function CreateTournamentPage() {
  return (
    <main>
      <div className="h-fit">
        <div className="flex h-full flex-col items-center justify-between overflow-y-auto overflow-x-clip p-10 pt-4 text-xl font-semibold">
          <div className="text-gray-500">Ny turnering</div>
          <CreateTournamentForm />
        </div>
      </div>
    </main>
  );
}
