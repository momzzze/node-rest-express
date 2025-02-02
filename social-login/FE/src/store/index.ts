import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"; // ✅ Import reducer correctly

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

// TypeScript types for Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
