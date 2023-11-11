import { Company } from "./companies";
import { request } from "./fetch"
import { Sector } from "./sectors";


export interface Notice {
    ID:number;
    CreatedTime:string;
    UpdatedTime:string;
    Title:string;
    Description:string;
    Compnay:Company;
    Sector:Sector;
    StartTime:string;
    EndTime:string;
    InternCount:number;
    Active:boolean;

}





export async function getAll() {
    return await request("admin/notices",
    {
     method:"GET"
    })
 
 }
 
 export async function get(id: string | number) {
 
   return await request(`admin/notices/${id}`,{
     method:"GET"
   })
 
 }

 
 
 export async  function update(id:string | number,value:Notice) {
   console.log(JSON.stringify(value))
     return await request<Notice>(`admin/notices/${id}`,
     {method: "POST", 
     body: JSON.stringify(value)})
 
 }



