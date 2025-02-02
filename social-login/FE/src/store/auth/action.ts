/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInterface";
import { User } from "./interface";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ identifier, password }: { identifier: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { identifier, password });

            if (!response.data.success) {
                return rejectWithValue(response.data.message);
            }

            return {
                user: response.data.user as User,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
        } catch (error) {
            return rejectWithValue("Login failed. Please try again.");
        }
    }
)

export const refreshAccessToken = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                return rejectWithValue("No refresh token available.");
            }

            const response = await api.post("/auth/refresh-token", { refreshToken });

            if (!response.data.success) {
                return rejectWithValue("Failed to refresh token.");
            }

            return { accessToken: response.data.accessToken };
        } catch (error) {
            return rejectWithValue("Session expired. Please log in again.");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ username, email, password, confirmPassword }: { username: string; email: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", { username, email, password, confirmPassword });

            if (!response.data.success) {
                return rejectWithValue(response.data.message);
            }

            return {
                user: response.data.user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
        } catch (error) {
            return rejectWithValue("Registration failed. Please try again.");
        }
    }
);
