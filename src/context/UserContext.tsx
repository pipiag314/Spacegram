import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser, UserContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const INITIAL_USER_INFO = {
  name: "",
  username: "",
  email: "",
  bio: "",
  id: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER_INFO,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async (): Promise<boolean> => false,
};

export const UserContext = createContext<UserContextType>(INITIAL_STATE);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER_INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentLoggedInAccount = await getCurrentUser();
      if (!currentLoggedInAccount) return false;
      if (currentLoggedInAccount) {
        setUser({
          id: currentLoggedInAccount.$id,
          name: currentLoggedInAccount.name,
          username: currentLoggedInAccount.username,
          email: currentLoggedInAccount.email,
          bio: currentLoggedInAccount.bio,
          imageUrl: currentLoggedInAccount.imageUrl,
        });

        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === null ||
      localStorage.getItem("cookieFallback") === "[]"
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


export const useUserContext = () => useContext(UserContext);