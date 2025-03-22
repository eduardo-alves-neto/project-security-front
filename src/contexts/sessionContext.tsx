import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import { IUser } from "../auth/services/auth";
import { authService } from "../auth/services/auth";

interface SessionContextType {
  user: IUser | null;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isAuthenticated: false,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Aqui você pode fazer uma chamada para obter os dados do usuário
      setUser({ id: "1", email: "user@example.com" });
    }
    setIsLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={{ user, isAuthenticated: !!user }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
