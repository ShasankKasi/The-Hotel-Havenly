import BookingForm from "../features/newBooking/BookingForm";
import Heading from "../ui/Heading";

export default function NewBooking() {
  return (
    <>
      <Heading as="h1">New Booking 🗓️</Heading>
      <BookingForm />
    </>
  );
}
