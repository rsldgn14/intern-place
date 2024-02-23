import { request } from './fetch';

export interface Image {
  ID: number;
  Content: string;
  EntityID: number;
  OwnerID: number;
}

export async function create(value: Partial<Image>) {
  return await request<never>(`public/images`, {
    method: 'POST',
    body: JSON.stringify(value),
  });
}

export enum EntityType {
  Avatar = +1,
  Notice,
}
