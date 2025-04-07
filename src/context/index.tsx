import { createContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

interface userProps {
  uid: string;
  name: string | null;
  email: string | null;
}

type ContextProviderProps = {
  children: ReactNode;
};

type authContextData = {
  signed: boolean;
  user?: userProps | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  openModal: boolean;
  setOpenModal: (modal: boolean) => void;
};

export const authContext = createContext({} as authContextData);

function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<userProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        setLoading,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
