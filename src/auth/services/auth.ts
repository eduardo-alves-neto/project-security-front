import api from "./api";

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface IAuthResponse {
  usuario: IUser;
  token: string;
}

export interface ISignIn {
  email: string,
  password: string,
}

export interface ISignUp extends ISignIn {
  name: string,
}

export const authService = {
  async signIn({ email, password }: ISignIn): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  async signUp({ email, name, password }: ISignUp): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },

  async signOut(): Promise<void> {
    localStorage.removeItem("token");
    window.location.href = "/auth/sign-in";
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
