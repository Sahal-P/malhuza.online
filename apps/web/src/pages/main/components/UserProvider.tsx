import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, {
  FC,
  createContext,
  useContext,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  restored: string | null;
  setRestored: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [restored, setRestored] = useState<string | null>(null);
  useQuery({
    queryKey: ["GetUser"],
    enabled: true,
    queryFn: async () => {
      const {data} = await axios.get(`api/auth/user/`)
      setUser(data);
      return data
    },
    refetchOnWindowFocus: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser, restored, setRestored}}>
      <Helmet >
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
