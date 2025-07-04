import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItem: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItem[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItem[itemIndex].title} product quantity`, {
                    position: "bottom-left",
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItem.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left",
                });
            }
            state.cartTotalAmount += action.payload.price;
            state.cartTotalQuantity += 1;
        },
        removeFromCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (itemIndex >= 0) {
                const removedItem = state.cartItem[itemIndex];
                state.cartTotalAmount -= removedItem.price * removedItem.cartQuantity;
                state.cartTotalQuantity -= removedItem.cartQuantity;

                state.cartItem = state.cartItem.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );

                toast.error(`${action.payload.title} removed from cart`, {
                    position: "bottom-left",
                });
            }
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (itemIndex >= 0) {
                if (state.cartItem[itemIndex].cartQuantity > 1) {
                    state.cartItem[itemIndex].cartQuantity -= 1;
                    state.cartTotalAmount -= action.payload.price;
                    state.cartTotalQuantity -= 1;

                    toast.info(`Decreased ${action.payload.title} cart quantity`, {
                        position: "bottom-left",
                    });
                } else {
                    state.cartTotalAmount -= action.payload.price;
                    state.cartTotalQuantity -= 1;

                    state.cartItem = state.cartItem.filter(
                        (cartItem) => cartItem.id !== action.payload.id
                    );

                    toast.warning(`${action.payload.title} removed from cart`, {
                        position: "bottom-left",
                    });
                }
            }
        },
        increaseCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItem[itemIndex].cartQuantity += 1;
                state.cartTotalAmount += action.payload.price;
                state.cartTotalQuantity += 1;

                toast.info(`Increased ${action.payload.title} cart quantity`, {
                    position: "bottom-left",
                });
            }
        },
    },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart } = cartSlice.actions;
export default cartSlice.reducer;
