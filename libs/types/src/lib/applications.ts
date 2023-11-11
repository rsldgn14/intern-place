import { Company } from "./companies";
import { request } from "./fetch";
import { Notice } from "./notices";
import { Student } from "./students";


export interface Application {
        ID: number;
        CreatedAt:string;
        UpdatedAt:string;
        Notice:Notice;
        Student:Student;
        Company:Company;
        Status:number;
    }   



export enum Status {
    Waiting = +1,
    Rejected,
    Approved

}


export const StatusInfo = [
    {ID:Status.Waiting,Name:"Waiting"},
    {ID:Status.Rejected,Name:"Rejected"},
    {ID:Status.Approved,Name:"Approved"}
]

export function getStatus(id:Status) {
    return StatusInfo.find(si => si.ID === id)
}



export async function getAll() {
    return await request<Application[]>("admin/applications",
    {
     method:"GET"
    })
 
 }
 
 export async function get(id: string | number) {
 
   return await request<Application>(`admin/applications/${id}`,{
     method:"GET"
   })
 
 }