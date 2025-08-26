import { Order } from "./order";

export interface Invoice {
  id: number;
  ngayLap: Date;
  tongTien: number;
  trangThai: string;
  khachHangId: number;
  orders: Order[];
}
