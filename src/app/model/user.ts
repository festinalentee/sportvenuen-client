import {Role} from "./role";

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  roles: Role[];
}
