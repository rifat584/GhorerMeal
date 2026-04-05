import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import queryFetch from "../utilitis/queryFetch";

const useRole = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`user/${user?.email}`),
  });

  return {
    role: data?.role,
    isRoleLoading: !!user?.email && isLoading,
  };
};
export default useRole;
