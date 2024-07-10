import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";

export default function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("New Booking created Successfully");
      queryClient.invalidateQueries({ queryKey: ["Bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBooking };
}
