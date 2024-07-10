import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabinPhotos() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabinPhotos = cabins ? cabins.map((cabin) => cabin.image) : [];
  return { isLoading, cabinPhotos, error };
}
