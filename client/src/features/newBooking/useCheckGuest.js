import { useGuests } from "../guests/useGuests";

export function useCheckGuests() {
  const { isLoading, guests, error } = useGuests();

  // Function to check if guest.id is present in guests
  const isGuestIdPresent = (guestId) => {
    if (!guests) return false;
    return guests.some((guest) => guest.id === guestId);
  };

  return { isLoading, guests, error, isGuestIdPresent };
}
