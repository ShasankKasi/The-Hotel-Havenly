import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export default function GuestTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="nationality"
        options={[
          { value: "all", label: "All" },
          { value: "Indians", label: "Indians" },
          { value: "Foreigners", label: "Foreigners" },
        ]}
      />
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          {
            value: "created_at-asc",
            label: "Sort by created date (Oldest first)",
          },
          {
            value: "created_at-desc",
            label: "Sort by created date (Newest first)",
          },
        ]}
      />
    </TableOperations>
  );
}
