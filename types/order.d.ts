import { Product } from "./product";

export interface Order {
  id: number;
  ngayDat: Date;
  tongTien: number;
  trangThai: string;
  diaChiNhan: Date;
  ngayVanChuyen: Date;
  khachHangId: number;
  items: OrderItem[];
}
export interface OrderItem {
  donHangId: number;
  sanPhamId: number;
  soLuong: number;
  product?: Product;
}
