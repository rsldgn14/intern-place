import { request } from "./fetch";
import { Sector } from "./sectors";
import { User } from "./users";


export interface Student {
    ID:number;
    CreatedAt:string;
    UpdatedAt:string;
    BirthDate:string;
    Sectors:Sector[];
    University:string;
    Grade:number;
    Experience:string;
    User:User;
}



export async function getAll() {
    return await request("admin/students",
    {
     method:"GET"
    })
 
 }
 
 export async function get(id: string | number) {
 
   return await request(`admin/students/${id}`,{
     method:"GET"
   })
 
 }

 
 
 export async  function update(id:string | number,value:Student) {
   console.log(JSON.stringify(value))
     return await request(`admin/students/${id}`,
     {method: "POST", 
     body: JSON.stringify(value)})
 
 }



