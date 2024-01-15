import { Tournament } from '@/app/api/tournament';
import { PongMatch, PongResult, PongTeam, PongTournament } from '@/app/types/tournament';

export const useGetTournament = async(id: number) => {
  try {
    return await Tournament.getTournamentItem(id);
  } catch (err: any) {
    console.error('Failed to get tournament:', err);
  }
};

export const useGetTournamentList = async(filters?: any) => {
  try {
    return await Tournament.getTournamentList(filters);
  } catch (err: any) {
    console.error('Failed to get tournament list:', err);
  }
};

export const useCreateTournament = async(name: string) => {
  try {
    return await Tournament.createTournamentItem(name);
  } catch (err: any) {
    console.error('Failed to create tournament:', err);
  }
};

export const useUpdateTournament = async(tournament: PongTournament) => {
  try {
    return await Tournament.updateTournamentItem(tournament);
  } catch (err: any) {
    console.error('Failed to update tournament:', err);
  }
};

export const useGenerateTournament = async(id: number) => {
  try {
    return await Tournament.generateTournament(id);
  } catch (err: any) {
    console.error('Failed to generate tournament:', err);
  }
};

export const useDeleteTournament = async(id: number) => {
  try {
    return await Tournament.deleteTournamentItem(id);
  } catch (err: any) {
    console.error('Failed to delete tournament:', err);
  }
};

export const useCreatePongMatch = async(newMatch: PongMatch) => {
  try {
    return await Tournament.createMatchItem(newMatch);
  } catch (err: any) {
    console.error('Failed to create match:', err);
  }
};

export const useGetPongMatch = async(id: number) => {
  try {
    return await Tournament.getMatchItem(id);
  } catch (err: any) {
    console.error('Failed to get match:', err);
  }
};

export const useGetPongMatchList = async(filters?: any) => {
  try {
    return await Tournament.getMatchList(filters);
  } catch (err: any) {
    console.error('Failed to get match list:', err);
  }
};

export const useUpdatePongMatch = async(match: PongMatch) => {
  try {
    return await Tournament.updateMatchItem(match);
  } catch (err: any) {
    console.error('Failed to update match:', err);
  }
};

export const useDeletePongMatch = async(id: number) => {
  try {
    return await Tournament.deleteMatchItem(id);
  } catch (err: any) {
    console.error('Failed to delete match:', err);
  }
};

export const useCreatePongResult = async(match: number, result: string) => {
  try {
    console.log('useCreatePongResult', match, result);
    return await Tournament.createResultItem(match, result);
  } catch (err: any) {
    console.error('Failed to create result:', err);
  }
};

export const useGetPongResult = async(id: number) => {
  try {
    return await Tournament.getResultItem(id);
  } catch (err: any) {
    console.error('Failed to get result:', err);
  }
};

export const useGetPongResultList = async(filters?: any) => {
  try {
    return await Tournament.getResultList(filters);
  } catch (err: any) {
    console.error('Failed to get result list:', err);
  }
};

export const useUpdatePongResult = async(result: PongResult) => {
  try {
    return await Tournament.updateResultItem(result);
  } catch (err: any) {
    console.error('Failed to update result:', err);
  }
};

export const useDeletePongResult = async(id: number) => {
  try {
    return await Tournament.deleteResultItem(id);
  } catch (err: any) {
    console.error('Failed to delete result:', err);
  }
};

export const useCreatePongTeam = async(team: PongTeam) => {
  try {
    return await Tournament.createTeamItem(team);
  } catch (err: any) {
    console.error('Failed to create team:', err);
  }
};

export const useGetPongTeam = async(id: number) => {
  try {
    return await Tournament.getTeamItem(id);
  } catch (err: any) {
    console.error('Failed to get team:', err);
  }
};

export const useGetPongTeamList = async(filters?: any) => {
  try {
    return await Tournament.getTeamList(filters);
  } catch (err: any) {
    console.error('Failed to get team list:', err);
  }
};

export const useUpdatePongTeam = async(team: PongTeam) => {
  try {
    return await Tournament.updateTeamItem(team);
  } catch (err: any) {
    console.error('Failed to update team:', err);
  }
};

export const useDeletePongTeam = async(id: number) => {
  try {
    return await Tournament.deleteTeamItem(id);
  } catch (err: any) {
    console.error('Failed to delete team:', err);
  }
};