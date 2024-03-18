import { Company } from './companies';
import { request } from './fetch';
import { Notice } from './notices';
import { Student } from './students';

export interface Application {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Notice?: Notice;
  NoticeID: number;
  StudentID: number;
  CompanyID: number;
  Student?: Student;
  Company?: Company;
  Status: number;
}

export interface ApplicationFilterItemIconsItem {
  Count: number;
  Icon: string;
}

export interface ApplicationFilterItemIcons {
  Approved: ApplicationFilterItemIconsItem;
  Rejected: ApplicationFilterItemIconsItem;
  Waiting: ApplicationFilterItemIconsItem;
}

export interface StudentApplicationContextProps {
  applications?: Application[];
}

export enum Status {
  Waiting = +1,
  Rejected,
  Approved,
}

export const StatusInfo = [
  { ID: Status.Waiting, Name: 'Waiting' },
  { ID: Status.Rejected, Name: 'Rejected' },
  { ID: Status.Approved, Name: 'Approved' },
];

export enum ApplicationStatus {
  WAITING = +1,
  REJECTED,
  APPROVED,
}

export function getStatus(id: Status) {
  return StatusInfo.find((si) => si.ID === id);
}

export async function getAll() {
  return await request<Application[]>('admin/applications', {
    method: 'GET',
  });
}

export async function get(id: string | number) {
  return await request<Application>(`admin/applications/${id}`, {
    method: 'GET',
  });
}

export async function create(body: Partial<Application>) {
  return await request<Application>('students/applications', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function approve(id: string | number) {
  return await request<never>(`companies/applications/${id}/approve`, {
    method: 'PATCH',
  });
}

export async function reject(id: string | number) {
  return await request<never>(`companies/applications/${id}/reject`, {
    method: 'PATCH',
  });
}
