export interface User {
    avatar_url: string;
    id: number;
    login: string;
  }
  
  export interface UserState {
    users: User[];
    selectedUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  }