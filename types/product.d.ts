import Image from "next/image";
export interface Product {
  id: number;
  tenSanPham: string;
  moTa: string;
  giaGoc: number;
  giaKhuyenMai?: number;
  soLuongTon?: number;
  trangthaiId: number;
  danhMucId: number;
  thuongHieuId: number;
  hinhAnhId: number;
  hinhAnhUrl?: string;
}

export interface Category {
  id: number;
  tenDanhMuc: string;
  moTa: string;
}

export interface Brand {
  id: number;
  tenThuongHieu: string;
  moTa: string;
}

export interface Image {
  id: number;
  tenHinh: string;
  hinhAnh?: string;
}
export interface Attribute {
  id: number;
  kichThuoc: string;
  mauSac: string;
}
