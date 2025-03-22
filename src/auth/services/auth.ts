import api from './api';

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface ISignIn {
  email: string;
  senha: string;
}

export interface ISignUp extends ISignIn {
  nome: string;
}

export const authService = {
  async signIn({ email, senha }: ISignIn): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/auth/login', {
      email,
      senha,
    });
    return response.data;
  },

  async signUp({ email, senha, nome }: ISignUp): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/auth/registro', {
      email,
      senha,
      nome,
    });
    return response.data;
  },

  async signOut(): Promise<void> {
    localStorage.removeItem('token');
    window.location.href = '/auth/sign-in';
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
}; 