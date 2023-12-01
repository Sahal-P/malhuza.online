import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface useSidebarProps {}

const useSidebar = () => {
  return useQuery({
    queryKey: ['sidebar'],
    queryFn: async () => {
      const { data } = await axios.post("api/docs/");
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    
    
  });
};

export default useSidebar;
