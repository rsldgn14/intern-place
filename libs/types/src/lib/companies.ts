import { request } from './fetch';
import { Sector } from './sectors';
import { User } from './users';

export interface Company {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Name: string;
  Description: string;
  Email: string;
  Address: string;
  Sector: Sector[];
  User: User;
  UserID: number;
}

export async function getAll() {
  return await request('admin/companies', {
    method: 'GET',
  });
}

export async function get(id: string | number) {
  return await request(`admin/companies/${id}`, {
    method: 'GET',
  });
}

export async function update(id: string | number, value: Company) {
  console.log(JSON.stringify(value));
  return await request(`admin/companies/${id}`, {
    method: 'POST',
    body: JSON.stringify(value),
  });
}

export async function publicRead(id: string | number) {
  return await request(`public/companies/${id}`, {
    method: 'GET',
  });
}

export async function compniesApplication(options?: RequestInit) {
  return await request(`companies/applications/mine`, {
    method: 'GET',
    ...options,
  });
}

export async function me(options?: RequestInit) {
  return await request(`companies/me`, {
    method: 'GET',
    ...options,
  });
}

export const Companies = {
  get,
  getAll,
  update,
  publicRead,
  compniesApplication,
  me,
};
