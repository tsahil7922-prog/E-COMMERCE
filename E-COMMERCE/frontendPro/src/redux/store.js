//set up the redux store to manage the state in a RAM(app ki memory me)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // path check karo
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkOutSlice";
import orderReducers from "./slices/orderSlice";
import adminReducers from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrderReducer from "./slices/adminOrderSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducers,
    admin: adminReducers,
    adminProducts:adminProductReducer,
    adminOrders:adminOrderReducer,
  },
});

export default store;
