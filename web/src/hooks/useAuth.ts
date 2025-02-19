import { authStorage } from "@/storage/auth/auth.storage";

export function useAuth() {
    const isAuthenticated = authStorage(state => state.isAuthenticated);
    const setIsAuthenticated = authStorage(state => state.setIsAuthenticated);

    const authenticate = () => {
        setIsAuthenticated(true);
    }

    const unauthenticate = () => {
        setIsAuthenticated(false);
    }
    return { isAuthenticated, authenticate, unauthenticate };
}