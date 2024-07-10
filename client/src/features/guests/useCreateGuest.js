import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";

export default function useCreateGuest() {
  const queryClient = useQueryClient();
  const { mutate: createguest, isCreating } = useMutation({
    mutationFn: createGuest,
    onSuccess: () => {
      toast.success("New Guest created Successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createguest };
}
