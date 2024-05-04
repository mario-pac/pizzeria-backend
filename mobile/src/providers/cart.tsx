import { Models } from 'api/index';
import React, { createContext, useContext, useState } from 'react';



interface CartProps {
    children: JSX.Element;
}

interface CartData {
    order: Models.Order | undefined
    items: Models.OrderItem[];
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

    const [order, setOrder] = useState<
        Models.Order | undefined
    >();

    const addToCart = (item: Models.OrderItem) => {
        setItems([...items, item]);
    };

    const updateItemCart = (item: Models.OrderItem) => {
        const newItemsCart = items.filter(cartItem => cartItem.ProductId !== item.ProductId);
        setItems([...newItemsCart, item]);
    };

    const removeFromCart = (item: Models.OrderItem) => {
        const newItemsCart = items.filter(cartItem => cartItem.ProductId !== item.ProductId);
        setItems(newItemsCart);
    };

    const updateCart = (cartItems: Models.OrderItem[]) => {
        setItems(cartItems);
    };

    const cleanCart = () => {
        setItems([]);
        setOrder(undefined);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateItemCart,
                updateCart,
                cleanCart,
                order,
                setOrder
            }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = (): CartData => {
    const context = useContext(CartContext);

    return context;
};

export { CartProvider, useCart };