interface Repositories {
  full_name: string;
  description: string;
  forks: number;
  id: number;
  language: string;
  stargazers_count: number;
  name: string;
  owner: { login: string };
}

export type { Repositories };
