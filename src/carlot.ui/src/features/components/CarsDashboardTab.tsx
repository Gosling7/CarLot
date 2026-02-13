import { useEffect, useMemo, useState, type EventHandler } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import StatCard from "../../components/StatCard";
import { CarForm } from "../cars/CarForm";

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
  const [search, setSearch] = useState("");
  //const [isAllCarsExpanded, setIsAllCarsExpanded] = useState(false);
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
    //setIsAllCarsExpanded(checked);

    if (checked && !isAllCarsFetched) {
      fetchCars();
    }
  }

  function fetchArchivedCars() {
    console.log("Starting fetch");
    setIsArchivedCarsLoading(true);

    setTimeout(() => {
      setIsArchivedCarsLoading(false);
      setIsArchivedCarsFetched(true);
      console.log("Fetched cars");
    }, 1000);
  }

  useEffect(() => {
    if (isArchivedCarsExpanded && !isArchivedCarsFetched) {
      fetchArchivedCars();
    }
  }, [isArchivedCarsExpanded])

  const needsListing = filteredCars.filter(c => c.status === "needs-listing");
  const drafts = filteredCars.filter(c => c.status === "draft");
  const live = filteredCars.filter(c => c.status === "live");
  const needsEdit = filteredCars.filter(c => c.status === "needs-edit");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cars Management</h1>
          <p className="text-base-content/60">Full inventory and car details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={"Cars in Catalog"} data={mockCars.length} />
        <StatCard label={"Cars with Listings"} data={live.length} />
        <StatCard label={"Cars ready for listings"} data={needsListing.length} />
      </div>


      <div className="p-4 bg-base-100 border border-base-300 rounded-xl">
        <h2>Actions</h2>
        <div className="flex gap-4">
          <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Car</button>
          <dialog id="my_modal_2" className="modal">
            <CarForm />
          </dialog>

          <ActionButton label="Update Car" />

          <ActionButton label="Complete Edit Car" />

        </div>

      </div>

      <input
        type="text"
        placeholder="Search by VIN, make, model, year"
        className="input border-base-300 shadow-none rounded-xl"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card label="Needs Edit">
          <CarsTable rows={needsEdit} actionLabel="Edit" />
        </Card>
        <Card label="Ready for Listing">
          <CarsTable rows={needsEdit} actionLabel="Edit" />
        </Card>
      </div>

      <div className="collapse bg-base-100 collapse-arrow border-base-300 border">
        <input type="checkbox" onChange={handleAllCarsExpand} />
        <div className="collapse-title font-semibold">All Cars</div>
        <div className="collapse-content text-sm">
          Pobrac auta dopiero po rozwinieciu
          {isAllCarsLoading && <p>Loading cars...</p>}

          {!isAllCarsLoading && isAllCarsFetched && (
            <AllCarsTable rows={needsEdit} actionLabel="Edit" />
          )}
        </div>
      </div>

      <div className="collapse bg-base-100 collapse-arrow border-base-300 border">
        <input type="checkbox" onChange={(e) => setIsArchivedCarsExpanded(e.target.checked)} />
        <div className="collapse-title font-semibold">Archived Cars</div>
        <div className="collapse-content text-sm">
          {isArchivedCarsLoading && <p>Loading cars...</p>}

          {isArchivedCarsFetched && (
            <AllCarsTable rows={needsEdit} actionLabel="Edit" />
          )}
        </div>
      </div>

    </div >
  );
}

function ActionButton({ label }) {
  return (
    <button className="btn">{label}</button>
    // <div className="stat bg-base-100 border border-base-300 rounded-xl max-h-30 max-w-50">
    //   <button className="btn">{label}</button>
    // </div>
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

