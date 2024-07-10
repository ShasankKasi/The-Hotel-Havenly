import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const currPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const { isLoading, data, error } = useQuery({
    queryKey: ["Bookings", filter, sortBy, currPage],
    queryFn: () => getBookings({ filter, sortBy, currPage }),
  });
  const bookings = data ? data.data : [];
  const count = data ? data.count : 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortBy, currPage + 1],
      queryFn: () => getBookings({ filter, sortBy, currPage: currPage + 1 }),
    });
  if (currPage > 0)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortBy, currPage - 1],
      queryFn: () => getBookings({ filter, sortBy, currPage: currPage - 1 }),
    });
  return { isLoading, error, bookings, count };
}
