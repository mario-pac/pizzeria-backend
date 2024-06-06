import { Models } from "api/index";
import React, { createContext, useContext, useState } from "react";

interface CartProps {
  children: JSX.Element;
}

interface CartData {
  order: Models.Order | undefined;
  items: Models.OrderItem[];
  itemsDeleted: number[];
  addItemDeleted: (item: number) => void;
  addToCart: (item: Models.OrderItem) => void;
  removeFromCart: (item: Models.OrderItem) => void;
  updateItemCart: (item: Models.OrderItem) => void;
  updateCart: (products: Models.OrderItem[]) => void;
  setOrder: (order: Models.Order | undefined) => void;
  cleanCart: () => void;
}

const CartContext = createContext({} as CartData);

const CartProvider: React.FC<CartProps> = ({ children }) => {
  const [items, setItems] = useState<Models.OrderItem[]>([]);
  const [itemsDeleted, setItemsDeleted] = useState<number[]>([]);

  const [order, setOrder] = useState<Models.Order | undefined>();

  const addToCart = (item: Models.OrderItem) => {
    setItems([...items, item]);
  };

  const addItemDeleted = (item: number) => {
    setItemsDeleted([...itemsDeleted, item]);
  };

  const updateItemCart = (item: Models.OrderItem) => {
    const newItemsCart = items.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setItems([...newItemsCart, item]);
  };

  const removeFromCart = (item: Models.OrderItem) => {
    const newItemsCart = items.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setItems(newItemsCart);
  };

  const updateCart = (cartItems: Models.OrderItem[]) => {
    setItems(cartItems);
  };

  const cleanCart = () => {
    setItems([]);
    setItemsDeleted([]);
    setOrder(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        itemsDeleted,
        addItemDeleted,
        removeFromCart,
        updateItemCart,
        updateCart,
        cleanCart,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartData => {
  const context = useContext(CartContext);

  return context;
};

export { CartProvider, useCart };
