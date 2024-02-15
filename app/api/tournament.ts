import { IFetch } from '@/app/api/fetch';
import queryString from 'query-string';
import { PongTournament, PongMatch, PongTeam, PongResult, AnonymousUser, RequestResponse, User } from '@/app/types/tournament';

const BASE_URL = 'blitzed/';
const TOURNAMENT_ENDPOINT = BASE_URL + 'tournament';
const MATCH_ENDPOINT = BASE_URL + 'match';
const TEAM_ENDPOINT = BASE_URL + 'team';
const RESULT_ENDPOINT = BASE_URL + 'result';


export const Tournament = {
    /* Tournament */
    getTournamentItem: async (id: number): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getTournamentList: async (filters?: any): Promise<PongTournament[]> => IFetch<PongTournament[]>(`${TOURNAMENT_ENDPOINT}/${filters ? `?${queryString.stringify(filters)}` : ''}`, { method: 'GET' }),
    createTournamentItem: async (name: string): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/`, { method: 'POST', data: {name}}),
    updateTournamentItem: async (tournament: PongTournament): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(tournament.id)}/`, { method: 'PUT', data: tournament}),
    generateTournament: async (id: number): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(id)}/generate/`, { method: 'GET'}),
    deleteTournamentItem: async (id: number): Promise<RequestResponse> => IFetch<RequestResponse>(`${TOURNAMENT_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),

    /* Match */
    getMatchItem: async (id: number): Promise<PongMatch> => IFetch<PongMatch>(`${MATCH_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getMatchList: async (filters?: any): Promise<PongMatch[]> => IFetch<PongMatch[]>(`${MATCH_ENDPOINT}/${filters ? `?${queryString.stringify(filters)}` : ''}`, { method: 'GET' }),
    createMatchItem: async (match: PongMatch): Promise<PongMatch> => IFetch<PongMatch>(`${MATCH_ENDPOINT}/`, { method: 'POST', data: match}),
    updateMatchItem: async (match: PongMatch): Promise<PongMatch> => IFetch<PongMatch>(`${MATCH_ENDPOINT}/${String(match.id)}/`, { method: 'PUT', data: match}),
    deleteMatchItem: async (id: number): Promise<RequestResponse> => IFetch<RequestResponse>(`${MATCH_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),

    /* Team */
    getTeamItem: async (id: number): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getTeamList: async (filters?: any): Promise<PongTeam[]> => IFetch<PongTeam[]>(`${TEAM_ENDPOINT}/${filters ? `?${queryString.stringify(filters)}` : ''}`, { method: 'GET' }),
    createTeamItem: async (team: PongTeam): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/`, { method: 'POST', data: team}),
    updateTeamItem: async (team: PongTeam): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/${String(team.id)}/`, { method: 'PUT', data: team}),
    deleteTeamItem: async (id: number): Promise<RequestResponse> => IFetch<RequestResponse>(`${TEAM_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),

    /* Result */
    getResultItem: async (id: number): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getResultList: async (filters?: any): Promise<PongResult[]> => IFetch<PongResult[]>(`${RESULT_ENDPOINT}/${filters ? `?${queryString.stringify(filters)}` : ''}`, { method: 'GET' }),
    createResultItem: async (match: number, result: string): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/`, { method: 'POST', data: {match, result}}),
    updateResultItem: async (res: PongResult): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/${String(res.id)}/`, { method: 'PUT', data: res}),
    deleteResultItem: async (id: number): Promise<RequestResponse> => IFetch<RequestResponse>(`${RESULT_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),
};
