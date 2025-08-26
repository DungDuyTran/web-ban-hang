export interface ShippingUnit {
  id: number;
  tenDonViVanChuyen: string;
  sdt: string;
  gmail: string;
  diaChi: string;
}

export interface OrderShipment {
  donHangId: number;
  donViVanChuyenId: number;
}
