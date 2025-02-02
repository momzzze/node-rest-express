import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./interface";
import { loginUser, registerUser } from "./action";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
                console.log("🔹 Login Fulfilled Payload:", action.payload); // ✅ Debug Redux payload

                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;

                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
                console.log("🔹 Register Fulfilled Payload:", action.payload); // ✅ Debug Redux payload

                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;

                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            });
    }

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
