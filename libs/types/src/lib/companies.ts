import { request } from "./fetch";
import { Sector } from "./sectors";



export interface Company {
    ID:number;
    CreatedAt:string;
    UpdatedAt:string;
    DeletedAt:string;
    Name:string;
    Description:string;
    Email:string;
    Sector:Sector[];
}


export async function getAll() {
    return await request("admin/companies",
    {
     method:"GET"
    })
 
 }
 
 export async function get(id: string | number) {
 
   return await request(`admin/companies/${id}`,{
     method:"GET"
   })
 
 }

 
 
 export async  function update(id:string | number,value:Company) {
   console.log(JSON.stringify(value))
     return await request(`admin/companies/${id}`,
     {method: "POST", 
     body: JSON.stringify(value)})
 
 }



 export const Companies = {
  get,getAll,update
 }