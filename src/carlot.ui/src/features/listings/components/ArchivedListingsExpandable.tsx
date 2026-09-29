import { CarStatus, useFetchCars } from "@/features/cars";
import { useDebounce } from "@/shared/hooks";
import { useState } from "react";
import { ExpandableSection } from "@/shared/ui/ExpandableSection";
import { InputZod } from "@/shared/ui/Input";
import { Table } from "@/shared/ui/Table";

// TODO: Mockup component, to be implemented correctly
export const ArchivedListingsExpandable = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const PAGE_SIZE = 20;

  const debouncedSearch = useDebounce(search, 600);

  const {
    data,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchCars({ isExpanded: isExpanded, search: debouncedSearch, pageSize: PAGE_SIZE, queryKey: ["archivedCars", debouncedSearch], statuses: [CarStatus.Received, CarStatus.NeedUpdate] });

  const cars = data?.pages.flatMap((page) => page.items) ?? [];
  const totalItems = data?.pages[0]?.totalItemsCount ?? 0;

  return (
    <ExpandableSection
      label="Archived Listings"
      onChange={(e) => setIsExpanded(e.target.checked)}
    >
      <InputZod
        placeholder="Search by VIN, make, model"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto min-h-180 max-h-180 my-4">
        <Table data={cars} isFetched={isFetched} />
      </div>

      <div className="flex items-center justify-between mx-2 my-2">
        <span>
          Showing {cars.length} of {totalItems} archived cars
        </span>
        {hasNextPage && (
          <button
            className="btn rounded-xl"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </ExpandableSection>
  );
}
