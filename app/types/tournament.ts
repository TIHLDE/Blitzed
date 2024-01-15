export interface RequestResponse {
    detail?: string;
}

export interface AnonymousUser {
    id?: number;
    name?: string;
}

export interface User {
    user_id?: string;
}

export interface PongTeam {
    id?: number;
    team_name?: string;
    members?: User[];
    anonymous_members?: AnonymousUser[] | number[];
    tournament?: number;
}

export interface PongResult {
    id?: number;
    match?: number;
    winner?: PongTeam | number;
    result?: string;
}

export interface PongMatch {
    id?: number;
    team1?: PongTeam | number;
    team2?: PongTeam | number;
    result?: PongResult;
    future_match?: number;
    tournament?: number;
}

export interface PongTournament {
    id?: number;
    name?: string;
    matches?: PongMatch[];
}