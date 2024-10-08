import { request } from './fetch';

export interface User {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Description: string;
  Address: string;
  RoleID?: number;
}

export enum Role {
  ADMIN = +1,
  COMPANY,
  STUDENT,
}

export async function me(options?: RequestInit) {
  return await request<User>(`users/me`, {
    method: 'GET',
    ...options,
  });
}

export async function update(body: User, options?: RequestInit) {
  return await request<User>(`users/update/${body.ID}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });
}
