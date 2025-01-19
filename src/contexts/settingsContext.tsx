import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SettingsContextProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const values = {
    openDrawer,
    setOpenDrawer,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
