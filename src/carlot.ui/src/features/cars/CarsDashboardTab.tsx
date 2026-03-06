import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card";
import { ButtonWithModal } from "../../components/ButtonWithModal";
import StatCard from "../../components/StatCard";
import { UpdateCarForm } from "../cars/UpdateCarForm";
import { EditCarForm } from "../cars/EditCarForm";
import { AddCarForm } from "./AddCarForm";
import { ActionsSection } from "../../components/ActionsSection";
import { StatCardsSection } from "../../components/StatCardsSection";
import { TablesSection } from "../../components/TablesSection";
import { ExpandableSection } from "../../components/ExpandableSection";
import { useFetchCars } from "./hooks/useFetchCars";

interface Car {
  vin: string;
  make: string;
  model: string;
  year: number;
  price?: number;
  mileage?: number;
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

  function handleAllCarsExpand(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;

    if (checked && !isAllCarsFetched) {
      fetchCars();
    }
  }

  function fetchArchivedCars() {
    /*
      useQuery({enabled: isArchivedExpanded})
      start with enabled: false, true when expanding the section
      for both lists

        const {
          isLoading: isArchivedCarsLoadingQ,
          data: archivedCarsQ
        } = useFetchCars(isArchivedCarsExpanded);
    */

    console.log("Starting fetch");
    setIsArchivedCarsLoading(true);

    setTimeout(() => {
      setIsArchivedCarsLoading(false);
      setIsArchivedCarsFetched(true);
      console.log("Fetched cars");
    }, 1000);
  }

  const {
    isLoading: isArchivedCarsLoadingQ,
    data: archivedCarsQ
  } = useFetchCars(isArchivedCarsExpanded);

  useEffect(() => {
    if (isArchivedCarsExpanded && !isArchivedCarsFetched) {
      fetchArchivedCars();
    }
  }, [isArchivedCarsExpanded])

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
        <StatCard label={"Cars ready for listings"} data={needsListing.length} />
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

      <ExpandableSection
        label="Cars in Catalog"
        onChange={handleAllCarsExpand}
      >
        <div className="collapse-content text-sm">
          {isAllCarsLoading && <p>Loading cars...</p>}

          {!isAllCarsLoading && isAllCarsFetched && (
            <AllCarsTable rows={needsEdit} actionLabel="Edit" />
          )}
        </div>
      </ExpandableSection>

      <ExpandableSection
        label="Archived Cars"
        onChange={(e) => setIsArchivedCarsExpanded(e.target.checked)}
      >
        <div className="collapse-content text-sm">
          {isArchivedCarsLoadingQ && console.log(archivedCarsQ)}

          {/* {isArchivedCarsLoading && <p>Loading cars...</p>}

          {isArchivedCarsFetched && (
            <AllCarsTable rows={needsEdit} actionLabel="Edit" />
          )} */}
        </div>
      </ExpandableSection>
    </div >
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

function AllCarsTable({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <input placeholder="VIN"></input>

      <table className="table">
        <thead>
          <tr>
            <th>Car</th>
            <th>Year</th>
            <th>Price</th>
            <th>Mileage</th>
            <th>Color</th>
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
              <td>{car.color || "—"}</td>
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

