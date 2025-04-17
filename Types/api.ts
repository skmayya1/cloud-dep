export interface RepoResponse {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    url: string;
    updated_at: string;
    html_url: string;
    branches_url: string;
    owner: {
        login: string;
    }
}

export interface BranchResponse {
    name: string;
    commit: {
        sha: string;
    }
}