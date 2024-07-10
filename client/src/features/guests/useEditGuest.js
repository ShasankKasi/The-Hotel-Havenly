import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";

export default function useEditGuest() {
  const queryClient = useQueryClient();
  const { mutate: editGuest, isEditing } = useMutation({
    mutationFn: ({ newGuestData, id }) => createGuest(newGuestData, id),
    onSuccess: () => {
      toast.success("Guest Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editGuest };
}
