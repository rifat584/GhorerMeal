import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import queryFetch from "../utilitis/queryFetch";

const useRole = () => {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`user/${user?.email}`),
  });
  const role = data?.role;
  return role;
};
export default useRole;
