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
    default_branch: string;
    branches: BranchResponse[];
    branch :string | null;
}

export interface BranchResponse {
    name: string;
    commit: {
        sha: string;
    }
}