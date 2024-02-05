import { ProfileForm } from '../../../components/tournament/createTournamentForm';

export default async function CreateTournamentPage() {
  return (
    <main>
      <div className="h-fit">
        <div className="flex flex-col items-center justify-between p-10 pt-4 h-full text-xl font-semibold overflow-y-auto overflow-x-clip">
          <div className="text-gray-500">Ny turnering</div>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}
