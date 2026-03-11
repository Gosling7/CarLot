import { useEffect, useState } from "react"
import { ExpandableSection } from "../../ExpandableSection"
import { Table } from "../../Table"
import { useFetchCars } from "../../../features/cars/hooks/useFetchCars";
import { InputZod } from "../../Input";

export const ArchivedCarsSection = () => {
  console.log("ArchivedCarsSection rendered")

  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const PAGE_SIZE = 20;

  const debouncedSearch = useDebouncedValue(search, 600);

  const {
    data,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchCars(isExpanded, debouncedSearch, PAGE_SIZE);

  const cars = data?.pages.flatMap((page) => page.items) ?? [];
  const totalItems = data?.pages[0]?.totalItemsCount ?? 0;

  return (
    <ExpandableSection
      label="Archived Cars"
      onChange={(e) => setIsExpanded(e.target.checked)}
    >
      <InputZod
        placeholder="Search by VIN, make, model"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isFetched && (
        <div className="overflow-x-auto min-h-180 max-h-180 my-4">
          <Table data={cars} />
        </div>
      )}

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
  )
}

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("debounced!")
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
