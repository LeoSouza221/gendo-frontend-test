import { type Repositories } from './Repositories';

interface User {
  id: number;
  name: '';
  bio: string;
  avatar_url: string;
  repos: Repositories[];
  starred_repos: [];
}

export type { User };
