import { useMemo, useState } from "react";
import Card from "../../components/Card";
import StatCard from "../../components/StatCard";

interface Car {
  vin: string;
  make: string;
  model: string;
  year: number;
  price?: number;
  status: "needs-listing" | "draft" | "live" | "needs-edit";
}

const mockCars: Car[] = [
  { vin: "5N1AT2MK4FC824170", make: "Audi", model: "A3", year: 2019, status: "needs-listing" },
  { vin: "1HGCM82633A004352", make: "Toyota", model: "Camry", year: 2020, status: "needs-edit" },
  { vin: "JHMFA16586S000000", make: "Honda", model: "Civic", year: 2018, status: "draft" },
  { vin: "WAUZZZ8V4KA000000", make: "Audi", model: "A4", year: 2021, status: "live" },
];

const tableHeaders: string[] = ["Car", "Year", "Vin"];

export default function MainDashboardTab() {
  const [search, setSearch] = useState("");

  const filteredCars = useMemo(() => {
    return mockCars.filter(c =>
      `${c.make} ${c.model} ${c.vin} ${c.year}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const needsListing = filteredCars.filter(c => c.status === "needs-listing");
  const drafts = filteredCars.filter(c => c.status === "draft");
  const needsEdit = filteredCars.filter(c => c.status === "needs-edit");
  const liveListing = filteredCars.filter(c => c.status === "live");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-base-content/60">Overview of inventory and listings</p>
        </div>

        <div className="join">
          <div className="relative">
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Cars in Catalog" data={mockCars.length} />
        <StatCard label="Active Listings" data={liveListing.length} />
        <StatCard label="Cars ready for Listing" data={needsListing.length} />
        <StatCard label="Draft Listings" data={drafts.length} />
        <StatCard label="Cars to Edit" data={needsEdit.length} />
      </div>

      <input
        type="text"
        placeholder="Search by VIN, make, model, year"
        className="input border-base-300 shadow-none rounded-xl"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card label="Cars ready for Listing">
          <Table
            headers={tableHeaders}
            rows={needsListing}
            actionLabel="Create"
          />
        </Card>

        <Card label="Draft Listings">
          <Table
            headers={tableHeaders}
            rows={drafts}
            actionLabel="Edit"
          />
        </Card>

        <Card label="Cars to Edit">
          <Table
            headers={tableHeaders}
            rows={needsEdit}
            actionLabel="Edit"
          />
        </Card>
      </div>
    </div >
  );
}

function Table({
  headers,
  rows,
  actionLabel,
}: {
  headers: string[]
  rows: Car[];
  actionLabel: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            {headers.map(h => (
              <th>{h}</th>
            ))}
            <th className="text-right"></th>

          </tr>
        </thead>
        <tbody>
          {rows.map(car => (
            <tr key={car.vin}>
              <td className="font-medium">{car.make} {car.model}</td>
              <td>{car.year}</td>
              <td className="font-mono text-xs">{car.vin}</td>
              <td className="text-right">
                <button className="btn btn-xs">
                  {actionLabel}
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-base-content/50">
                Nothing here
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
