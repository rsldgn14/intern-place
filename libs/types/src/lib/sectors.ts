import { request } from "./fetch";

export interface Sector {
  ID:number;
  CreatedAt:string;
  UpdatedAt:string;
  Name:string;


}



export async function getAll() {
   return await request("admin/sectors",
   {
    method:"GET"
   })

}

export async function get(id: string | number) {

  return await request<Sector>(`admin/sectors/${id}`,{
    method:"GET"
  })

}

export async function create(value:Partial<Sector>) {
  return await request<Sector>(`admin/sectors`,{
    method:"POST",
    body:JSON.stringify(value)
  })
}


export async  function update(id:string | number,value:Sector) {
  console.log(JSON.stringify(value))
    return await request<Sector>(`admin/sectors/${id}`,
    {method: "POST", 
    body: JSON.stringify(value)})

}


export const Sectors =  {
    get,getAll,update,create

}
