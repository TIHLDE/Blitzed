import { IFetch } from '@/app/api/fetch';
import { URLSearchParams } from 'url';

const TOURNAMENT_ENDPOINT = 'tournament';
const MATCH_ENDPOINT = 'match';
const TEAM_ENDPOINT = 'team';
const RESULT_ENDPOINT = 'result';

interface Response {
    detail?: string;
}

interface AnonymousUser {
    id?: number;
    name?: string;
}

interface User {
    user_id?: string;
}

interface PongTeam {
    id?: number;
    team_name?: string;
    members?: User[];
    anonymous_members?: AnonymousUser[];
    tournament?: number;
}

interface PongResult {
    id?: number;
    match?: number;
    winner?: PongTeam;
    result?: string;
}

interface PongMatch {
    id?: number;
    team1?: PongTeam;
    team2?: PongTeam;
    result?: PongResult;
    future_match?: number;
    tournament?: number;
}

interface PongTournament {
    id?: number;
    name?: string;
    matches?: PongMatch[];
}

export const Tournament = {
    getTournamentItem: async (id: number): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getTournamentList: async (filters?: any): Promise<PongTournament[]> => IFetch<PongTournament[]>(`${TOURNAMENT_ENDPOINT}/${filters ? `?${new URLSearchParams(filters)}` : ''}`, { method: 'GET' }),
    createTournamentItem: async (name: string): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/`, { method: 'POST', data: {name: name}}),
    updateTournamentItem: async (id: number, name: string): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(id)}/`, { method: 'PUT', data: {name: name}}),
    generateTournament: async (id: number): Promise<PongTournament> => IFetch<PongTournament>(`${TOURNAMENT_ENDPOINT}/${String(id)}/generate/`, { method: 'POST'}),
    deleteTournamentItem: async (id: number): Promise<Response> => IFetch<Response>(`${TOURNAMENT_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),
};

export const PongMatch = {
    getMatchItem: async (id: number): Promise<PongMatch> => IFetch<PongMatch>(`${MATCH_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
};

export const PongTeam = {
    getTeamItem: async (id: number): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    getTeamList: async (filters?: any): Promise<PongTeam[]> => IFetch<PongTeam[]>(`${TEAM_ENDPOINT}/${filters ? `?${new URLSearchParams(filters)}` : ''}`, { method: 'GET' }),
    createTeamItem: async (team_name: string, tournament: number, members: string[], anonymous_members: AnonymousUser[]): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/`, { method: 'POST', data: {team_name, members, anonymous_members, tournament}}),
    updateTeamItem: async (id: number, team_name: string, members: string[], anonymous_members: AnonymousUser[], tournament: number): Promise<PongTeam> => IFetch<PongTeam>(`${TEAM_ENDPOINT}/${String(id)}/`, { method: 'PUT', data: {team_name, members, anonymous_members, tournament}}),
    deleteTeamItem: async (id: number): Promise<Response> => IFetch<Response>(`${TEAM_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),
};

export const PongResult = {
    getResultItem: async (id: number): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/${String(id)}/`, { method: 'GET'}),
    createResultItem: async (match: number, result: string): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/`, { method: 'POST', data: {match, result}}),
    updateResultItem: async (id: number, match: number, result: string): Promise<PongResult> => IFetch<PongResult>(`${RESULT_ENDPOINT}/${String(id)}/`, { method: 'PUT', data: {match, result}}),
    deleteResultItem: async (id: number): Promise<Response> => IFetch<Response>(`${RESULT_ENDPOINT}/${String(id)}/`, { method: 'DELETE'}),
};
