import { QApis } from '..';
import { Company } from './companies';
import { request } from './fetch';
import { Sector } from './sectors';

export interface Notice {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Description: string;
  Company: Company;
  Sector: Sector;
  StartTime: string;
  EndTime: string;
  InternCount: number;
  Status: number;
  SectorID: number;
  CompanyID: number;
  Published: boolean;
}

export enum Status {
  Draft,
  Aprroved,
  Rejected,
}

export const StatusArray = [
  { ID: Status.Draft, Name: 'Draft' },
  { ID: Status.Aprroved, Name: 'Aprroved' },
  { ID: Status.Rejected, Name: 'Rejected' },
];

export async function getAll() {
  return await request('admin/notices', {
    method: 'GET',
  });
}

export async function get(id: string | number) {
  return await request(`admin/notices/${id}`, {
    method: 'GET',
  });
}

export async function update(id: string | number, value: Notice) {
  return await request<Notice>(`admin/notices/${id}`, {
    method: 'POST',
    body: JSON.stringify(value),
  });
}

export async function companyUpdate(id: string | number, value: Notice) {
  return await request<Notice>(`companies/notices/${id}`, {
    method: 'POST',
    body: JSON.stringify(value),
  });
}

export async function del(noticeID: number | string) {
  return await request<never>(`companies/notices/${noticeID}`, {
    method: 'DELETE',
  });
}

export async function publicList(qapi?: QApis.QApi) {
  return await request<Notice[]>(`public/notices${QApis.toQueryParam(qapi)}`, {
    method: 'GET',
  });
}

export async function publicIncreaseView(id: string | number) {
  return await request<never>(`public/notices/${id}/increase-view-count`, {
    method: 'PATCH',
  });
}

export async function create(value: Notice) {
  return await request<never>(`companies/notices`, {
    method: 'POST',
    body: JSON.stringify(value),
  });
}

export async function mine(options?: RequestInit, qapi?: QApis.QApi) {
  return await request<Notice[]>(
    `companies/notices/mine${QApis.toQueryParam(qapi)}`,
    {
      method: 'GET',
      ...options,
    }
  );
}

export async function approve(noticeID: number) {
  return await request<Notice[]>(`admin/notices/${noticeID}/approve`, {
    method: 'PATCH',
  });
}

export async function reject(noticeID: number) {
  return await request<Notice[]>(`admin/notices/${noticeID}/reject`, {
    method: 'PATCH',
  });
}

export async function publish(noticeID: number) {
  return await request<Notice[]>(`companies/notices/${noticeID}/publish`, {
    method: 'PATCH',
  });
}

export async function unpublish(noticeID: number) {
  return await request<Notice[]>(`companies/notices/${noticeID}/unpublish`, {
    method: 'PATCH',
  });
}
