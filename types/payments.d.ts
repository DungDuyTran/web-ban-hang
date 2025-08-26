export interface PaymentMethod {
  id: number;
  tenPhuongThuc: string;
}

export interface PaymentHistory {
  id: number;
  ngayThanhToan: Date;
  phuongThucThanhToanId: number;
  hoaDonId: number;
}
