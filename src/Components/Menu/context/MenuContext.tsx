"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Order, initialMenuOrders } from "@/lib/static-data/menu";

interface MenuContextType {
  menuItems: Order[];
  addMenuItem: (item: Order) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<Order[]>(initialMenuOrders);

  const addMenuItem = (item: Order) => {
    setMenuItems((prev) => [...prev, item]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};
