import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import { authService, IUser } from "../auth/services/auth";

interface SessionContextType {
  user: Partial<IUser> | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => null,
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
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = authService.getToken();

    if (token) setIsLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={{ user, isAuthenticated: !!user, setUser }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
