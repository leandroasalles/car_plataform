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
};

export const authContext = createContext({} as authContextData);

function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
      }
    });
  }),
    [user];
  return (
    <authContext.Provider value={{ signed: !!user }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
