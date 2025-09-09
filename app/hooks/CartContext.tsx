"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  tenSanPham: string;
  gia: number;
  hinhAnh: string;
  soLuong: number;
  mau?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProductId: number | null; // 👈 thêm
  setSelectedProductId: React.Dispatch<React.SetStateAction<number | null>>; // 👈 thêm
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  ); // 👈 thêm

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exist = prev.find(
        (p) => p.id === item.id && p.size === item.size && p.mau === item.mau
      );
      if (exist) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size && p.mau === item.mau
            ? { ...p, soLuong: p.soLuong + item.soLuong }
            : p
        );
      }
      return [...prev, item];
    });

    // 👇 Khi thêm sản phẩm thì set id cho dialog chỉ hiện cái đó
    setSelectedProductId(item.id);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCartItem = (id: number, updates: Partial<CartItem>) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProductId, // 👈 thêm
        setSelectedProductId, // 👈 thêm
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
