import { request } from "./fetch";

export interface Image {
    ID:number;
    Content:string;
}






export async function create(value: Image) {
    return await request<never>(`public/images`, {
      method: 'POST',
      body: JSON.stringify(value),
    });
  }
  