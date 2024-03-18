import { request } from './fetch';
import { User, Role } from './users';

export interface LoginReq {
  Username: string;
  Password: string;
  token?: string;
}

export interface RegisterReq {
  Username: string;
  FirstName: string;
  LastName: string;
  Role: Role;
  Password: string;
}

export interface AuthContextProps {
  company: any;
  user: User | undefined;
  isAuthenticated: boolean;

  setUser: (user: User | undefined) => void;
  setAuthenticated: (auth: boolean) => void;
  loading?: boolean;
}

export async function auth(body: LoginReq) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Username': body.Username,
  };
  return await request<User>('public/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
}

export async function logout() {
  return await request('public/auth/logout', {
    method: 'GET',
  });
}

export async function register(body: RegisterReq) {
  return await request<never>('public/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
