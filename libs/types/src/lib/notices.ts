import { QApis } from "..";
import { Company } from "./companies";
import { request } from "./fetch"
import { Sector } from "./sectors";


export interface Notice {
    ID:number;
    CreatedAt:string;
    UpdatedAt:string;
    Title:string;
    Description:string;
    Company:Company;
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
     return await request<Notice>(`admin/notices/${id}`,
     {method: "POST", 
     body: JSON.stringify(value)})
 
 }



 export async  function publicList(qapi?:QApis.QApi) {
  return await request<Notice[]>(`public/notices${QApis.toQueryParam(qapi)}`,{
    method:"GET"
  })
 }


