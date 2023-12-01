import { getUser } from "@/apis";
import { User } from "@/types/user";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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

  useEffect(() => {
    const promis = getUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      toast.promise(promis, {
        loading: 'loading.......',
        success: "success",
        error: "Failed",
      })
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
