import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabinIds() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabinIds = cabins ? cabins.map((cabin) => cabin.id) : [];
  return { isLoading, cabinIds, error };
}
