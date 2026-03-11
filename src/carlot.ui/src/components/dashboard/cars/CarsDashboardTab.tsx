import { useMemo, useState } from "react";
import StatCard from "../../StatCard";
import { useFetchCars } from "../../../features/cars/hooks/useFetchCars";
import { StatCardsSection } from "../../StatCardsSection";
import { ActionsSection } from "../../ActionsSection";
import { AddCarForm } from "../../../features/cars/AddCarForm";
import { ButtonWithModal } from "../../ButtonWithModal";
import { UpdateCarForm } from "../../../features/cars/UpdateCarForm";
import { EditCarForm } from "../../../features/cars/EditCarForm";
import { TablesSection } from "../../TablesSection";
import Card from "../../Card";
import { ExpandableSection } from "../../ExpandableSection";
import { Table } from "../../Table";
import { InputZod } from "../../Input";
import { ArchivedCarsSection } from "./ArchivedCarsSection";

interface Car {
  vin: string;
  make: string;
  model: string;
  year: number;
  price?: number;
  mileageKm?: number;
  color?: string;
  status: "needs-listing" | "draft" | "live" | "needs-edit";
}

const mockCars: Car[] = [
  { vin: "5N1AT2MK4FC824170", make: "Audi", model: "A3", year: 2019, price: 21000, mileage: 30000, color: "Red", status: "needs-listing" },
  { vin: "1HGCM82633A004352", make: "Toyota", model: "Camry", year: 2020, price: 18000, mileage: 20000, color: "Blue", status: "needs-edit" },
  { vin: "JHMFA16586S000000", make: "Honda", model: "Civic", year: 2018, price: 15000, mileage: 40000, color: "Black", status: "draft" },
  { vin: "WAUZZZ8V4KA000000", make: "Audi", model: "A4", year: 2021, price: 30000, mileage: 10000, color: "White", status: "live" },
];

export default function CarsDashboardTab() {
  console.log("CarsDashboardTab rendered");

  const [search, setSearch] = useState("");
  const [isAllCarsLoading, setIsAllCarsLoading] = useState(false);
  const [isAllCarsFetched, setIsAllCarsFetched] = useState(false);
  const [isCarsInCatalogExpanded, setIsCarsInCatalogExpanded] = useState(false);
  const [isArchivedCarsExpanded, setIsArchivedCarsExpanded] = useState(false);
  const [isArchivedCarsLoading, setIsArchivedCarsLoading] = useState(false);
  const [isArchivedCarsFetched, setIsArchivedCarsFetched] = useState(false);

  const filteredCars = useMemo(() => {
    return mockCars.filter(c =>
      `${c.make} ${c.model} ${c.vin}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function fetchCars() {
    console.log("Starting fetch");
    setIsAllCarsLoading(true);

    setTimeout(() => {
      setIsAllCarsLoading(false);
      setIsAllCarsFetched(true);
      console.log("Fetched cars");
    }, 1000);
  }

  // function handleAllCarsExpand(e: React.ChangeEvent<HTMLInputElement>) {
  //   const checked = e.target.checked;

  //   if (checked && !isAllCarsFetched) {
  //     fetchCars();
  //   }
  // }

  // function fetchArchivedCars() {
  //   /*
  //     useQuery({enabled: isArchivedExpanded})
  //     start with enabled: false, true when expanding the section
  //     for both lists

  //       const {
  //         isLoading: isArchivedCarsLoadingQ,
  //         data: archivedCarsQ
  //       } = useFetchCars(isArchivedCarsExpanded);
  //   */

  //   console.log("Starting fetch");
  //   setIsArchivedCarsLoading(true);

  //   setTimeout(() => {
  //     setIsArchivedCarsLoading(false);
  //     setIsArchivedCarsFetched(true);
  //     console.log("Fetched cars");
  //   }, 1000);
  // }

  const {
    isLoading: isArchivedCarsLoadingQ,
    data: archivedCarsQ,
    isFetched: isArchivedCarsFetchedQ
  } = useFetchCars(isArchivedCarsExpanded);

  const {
    isLoading: isCarsInCatalogLoadingQ,
    data: carsInCatalogQ,
    isFetched: isCarsInCatalogFetchedQ
  } = useFetchCars(isCarsInCatalogExpanded);

  // useEffect(() => {
  //   if (isArchivedCarsExpanded && !isArchivedCarsFetched) {
  //     fetchArchivedCars();
  //   }
  // }, [isArchivedCarsExpanded])

  const needsListing = mockCars.filter(c => c.status === "needs-listing");
  const live = mockCars.filter(c => c.status === "live");
  const needsEdit = filteredCars.filter(c => c.status === "needs-edit");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cars Management</h1>
        <p className="text-base-content/60">Full inventory and car details</p>
      </div>

      <StatCardsSection>
        <StatCard label={"Cars in Catalog"} data={mockCars.length} />
        <StatCard label={"Cars with Listings"} data={live.length} />
        <StatCard label={"Cars ready for Listing"} data={needsListing.length} />
      </StatCardsSection>

      <ActionsSection header={"Actions"}>
        <ButtonWithModal buttonLabel={"Add Car"}>
          <AddCarForm />
        </ButtonWithModal>

        <ButtonWithModal buttonLabel={"Update Car"}>
          <UpdateCarForm />
        </ButtonWithModal>

        <ButtonWithModal buttonLabel={"Edit Car"}>
          <EditCarForm />
        </ButtonWithModal>
      </ActionsSection>

      <TablesSection>
        <Card label="Need Edit">
          <CarsTable rows={needsEdit} actionLabel="Edit" />
        </Card>
        <Card label="Ready for Listing">
          <CarsTable rows={needsEdit} actionLabel="Edit" />
        </Card>
      </TablesSection>

      <ArchivedCarsSection />

      <ExpandableSection
        label="Cars in Catalog"
        onChange={(e) => setIsCarsInCatalogExpanded(e.target.checked)}
      >
        <div className="overflow-y-scroll min-h-200 max-h-200">
          {isCarsInCatalogFetchedQ && (
            <CarsInCatalogTable rows={carsInCatalogQ} actionLabel="Edit" />
          )}
        </div>
      </ExpandableSection>

      <ExpandableSection
        label="Archived Cars"
        onChange={(e) => setIsArchivedCarsExpanded(e.target.checked)}
      >
        <div className="overflow-y-scroll min-h-200 max-h-200">
          {isArchivedCarsFetchedQ && (
            <ArchivedCarsTable rows={archivedCarsQ} actionLabel="Edit" />
          )}

          {/* {isArchivedCarsFetchedQ && console.log(archivedCarsQ)} */}

          {/* {isArchivedCarsLoading && <p>Loading cars...</p>}

          {isArchivedCarsFetched && (
            <AllCarsTable rows={needsEdit} actionLabel="Edit" />
          )} */}
        </div>
      </ExpandableSection>

      <ExpandableSection
        label="Paginated Table"
        onChange={(e) => setIsArchivedCarsExpanded(e.target.checked)}
      >
        <InputZod label={""} placeholder="Search by Vin, make, model" />

        {isArchivedCarsFetchedQ && (
          <Table data={archivedCarsQ} />
        )}

        {/* <PageButton /> */}
        <Pagination />

      </ExpandableSection>
    </div >
  );
}

function Pagination() {
  const page = 1;
  const pageCount = 5;
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm opacity-70">
        {/* Page {page + 1} of {pageCount} */}
        Page {page} of {pageCount}
      </div>

      <div className="join">

        <button
          className="join-item btn btn-sm"
          // onClick={prevPage}
          // disabled={page === 0}
          disabled={true}
        >
          «
        </button>

        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            className={`join-item btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
          // onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="join-item btn btn-sm"
          // onClick={nextPage}
          disabled={page === pageCount - 1}
        >
          »
        </button>
      </div>
    </div>
  )
}

function TableOld({ rows }: { rows: Car[] }) {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const pageCount = Math.ceil(rows.length / pageSize);

  const paginatedRows = useMemo(() => {
    const start = page * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page]);

  function nextPage() {
    setPage(p => Math.min(p + 1, pageCount - 1));
  }

  function prevPage() {
    setPage(p => Math.max(p - 1, 0));
  }

  return (
    <>
      <input placeholder="VIN"></input>
      <div className="overflow-x-auto min-h-200 max-h-200">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Car</th>
              <th>VIN</th>
              <th>Year</th>
              <th>Mileage</th>
              <th>Engine</th>
              <th>Transmission</th>
              <th>Power</th>
              <th>Drive Type</th>
              <th>Registration Plate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(car => (
              <tr key={car.vin}>
                <td className="font-medium">{car.make} {car.model}</td>
                <td className="font-mono text-xs">{car.vin}</td>
                <td>{car.year}</td>
                <td>{car.mileageKm?.toString() ? `${car.mileageKm?.toString()} km` : "—"}</td>
                <td className="font-mono text-xs">1.9 TDI</td>
                <td className="font-mono text-xs">Automatic</td>
                <td className="font-mono text-xs">170HP</td>
                <td className="font-mono text-xs">FWD</td>
                <td className="font-mono text-xs">{car.registrationPlate}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-base-content/50">Nothing here 🎉</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm opacity-70">
          Page {page + 1} of {pageCount}
        </div>

        <div className="join">

          <button
            className="join-item btn btn-sm"
            onClick={prevPage}
            disabled={page === 0}
          >
            «
          </button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${page === i ? "btn-active" : ""}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            onClick={nextPage}
            disabled={page === pageCount - 1}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}

function CarsTable({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Car</th>
            <th>Year</th>
            <th>Price</th>
            <th>Mileage</th>
            <th>VIN</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(car => (
            <tr key={car.vin}>
              <td className="font-medium">{car.make} {car.model}</td>
              <td>{car.year}</td>
              <td>{car.price ? `$${car.price}` : "—"}</td>
              <td>{car.mileage ? `${car.mileage} mi` : "—"}</td>
              <td className="font-mono text-xs">{car.vin}</td>
              <td className="text-right">
                <button className="btn btn-xs btn-outline">{actionLabel}</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-base-content/50">Nothing here 🎉</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function CarsInCatalogTable({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <input placeholder="VIN"></input>

      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Car</th>
            <th>VIN</th>
            <th>Year</th>
            <th>Mileage</th>
            <th>Engine</th>
            <th>Transmission</th>
            <th>Power</th>
            <th>Drive Type</th>
            <th>Registration Plate</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(car => (
            <tr key={car.vin}>
              <td className="font-medium">{car.make} {car.model}</td>
              <td className="font-mono text-xs">{car.vin}</td>
              <td>{car.year}</td>
              <td>{car.mileageKm?.toString() ? `${car.mileageKm?.toString()} km` : "—"}</td>
              <td className="font-mono text-xs">1.9 TDI</td>
              <td className="font-mono text-xs">Automatic</td>
              <td className="font-mono text-xs">170HP</td>
              <td className="font-mono text-xs">FWD</td>
              <td className="font-mono text-xs">{car.registrationPlate}</td>
              <td className="text-right">
                <button className="btn btn-xs btn-outline">{actionLabel}</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-base-content/50">Nothing here 🎉</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ArchivedCarsTable({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <input placeholder="VIN"></input>

      <table className="table">
        <thead>
          <tr>
            <th>Car</th>
            <th>VIN</th>
            <th>Year</th>
            <th>Mileage</th>
            <th>Engine</th>
            <th>Transmission</th>
            <th>Power</th>
            <th>Drive Type</th>
            <th>Registration Plate</th>
            {/* <th className="text-right">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {rows.map(car => (
            <tr key={car.vin}>
              <td className="font-medium">{car.make} {car.model}</td>
              <td className="font-mono text-xs">{car.vin}</td>
              <td>{car.year}</td>
              <td>{car.mileageKm?.toString() ? `${car.mileageKm?.toString()} km` : "—"}</td>
              <td className="font-mono text-xs">1.9 TDI</td>
              <td className="font-mono text-xs">Automatic</td>
              <td className="font-mono text-xs">170HP</td>
              <td className="font-mono text-xs">FWD</td>
              <td className="font-mono text-xs">{car.registrationPlate}</td>
              {/* <td className="text-right">
                <button className="btn btn-xs btn-outline">{actionLabel}</button>
              </td> */}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-base-content/50">Nothing here 🎉</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

