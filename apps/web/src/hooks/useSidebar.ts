import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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
