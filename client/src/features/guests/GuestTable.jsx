import Spinner from "../../ui/Spinner";
import { useGuests } from "./useGuests";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import GuestRow from "./GuestRow";

export default function GuestTable() {
  const { isLoading, guests } = useGuests();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const filtered = searchParams.get("nationality") || "all";

  let filteredGuests;
  if (filtered === "all") filteredGuests = guests;
  if (filtered === "Indians")
    filteredGuests = guests.filter((guest) => guest.nationality === "India");
  if (filtered === "Foreigners")
    filteredGuests = guests.filter((guest) => guest.nationality !== "India");

  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedGuests = filteredGuests.sort(
    (a, b) => a[field].localeCompare(b[field]) * modifier
  );
  if (!guests.length) return <Empty resource="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Guest Id</div>
          <div>Full Name</div>
          <div>email</div>
          <div>nationalID</div>
          <div>nationality</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedGuests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}
