import axios from "axios";
import { store } from "../store";
import { logout } from "../store/auth/authSlice";
import { refreshAccessToken } from "../store/auth/actions";

const baseURL = import.meta.env.VITE_BACKEND_URL as string;

const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
});

// 📌 **Attach Access Token to Requests**
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 📌 **Handle Token Expiration & Refresh**
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const storedRefreshToken = store.getState().auth.refreshToken; // ✅ Fix name conflict

        // If 401 Unauthorized & refresh token exists, try refreshing
        if (error.response?.status === 401 && !originalRequest._retry && storedRefreshToken) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, { refreshToken: storedRefreshToken });

                if (response.data.success) {
                    store.dispatch(refreshAccessToken({ accessToken: response.data.accessToken }));

                    // Update the request with the new token & retry
                    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
