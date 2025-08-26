import { Role } from "firebase/ai";

export interface Employee {
  id: number;
  hoTen: string;
  tuoi: number;
  gmail: string;
  sdt: string;
  roles?: Role[];
}

export interface Role {
  id: number;
  tenVaiTro: string;
}
