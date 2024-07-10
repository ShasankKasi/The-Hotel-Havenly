import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Checked out - Successfully ✅ `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Error Checking out the room ❌ "),
  });
  return {
    checkout,
    isCheckOut,
  };
}
