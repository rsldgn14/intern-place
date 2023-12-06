export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Description: string;
  Address: string;
  RoleID: number;
}

export enum Role {
  ADMIN = +1,
  COMPANY,
  STUDENT,
}
