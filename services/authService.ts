// Authentication Service
const ADMIN_CREDENTIALS = {
    email: 'saikiranavusula89@gmail.com',
    password: 'Saikiran@89'
};

const AUTH_KEY = 'portfolio_auth';

export const authService = {
    login: (email: string, password: string): boolean => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    },

    logout: (): void => {
        localStorage.removeItem(AUTH_KEY);
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem(AUTH_KEY) === 'true';
    }
};
