import { useMemo, useState } from "react";
import Card from "../../components/Card";
import StatCard from "../../components/StatCard";

interface Listing {
  id: string;
  carName: string;
  vin: string;
  status: "draft" | "live" | "archived";
  price?: number;
  createdAt: string;
}

const mockListings: Listing[] = [
  { id: "1", carName: "Audi A3", vin: "5N1AT2MK4FC824170", status: "draft", price: 21000, createdAt: "2026-01-15" },
  { id: "2", carName: "Honda Civic", vin: "JHMFA16586S000000", status: "live", price: 15000, createdAt: "2026-01-10" },
  { id: "3", carName: "Toyota Camry", vin: "1HGCM82633A004352", status: "draft", price: 18000, createdAt: "2026-01-12" },
  { id: "4", carName: "Audi A4", vin: "WAUZZZ8V4KA000000", status: "live", price: 30000, createdAt: "2026-01-08" },
];

export default function ListingsDashboardTab() {
  const [search, setSearch] = useState("");

  const filteredListings = useMemo(() => {
    return mockListings.filter(l =>
      `${l.carName} ${l.vin}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const drafts = filteredListings.filter(l => l.status === "draft");
  const live = filteredListings.filter(l => l.status === "live");
  const archived = filteredListings.filter(l => l.status === "archived");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Listings Management</h1>
          <p className="text-base-content/60">Manage car listings and their statuses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label={"Live Listings"} data={filteredListings.length} />
        <StatCard label={"Drafts"} data={drafts.length} />
      </div>

      <div className="p-4 bg-base-100 border border-base-300 rounded-xl">
        <h2>Actions</h2>
        <div className="flex gap-4">

          <button className="btn">Create</button>
          <button className="btn">Edit</button>

        </div>

      </div>

      <input
        type="text"
        placeholder="Search by VIN, make, model, year"
        className="input border-base-300 shadow-none rounded-xl"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-6">
        <Card label="Draft Listings">
          <ListingsTable rows={drafts} actionLabel="Edit" />
        </Card>

        <div className="collapse bg-base-100 collapse-arrow border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Live Listings</div>
          <div className="collapse-content text-sm">
            Pobrac ogloszenia dopiero po rozwinieciu
            <ListingsTable rows={live} actionLabel="View" />
          </div>
        </div>

        <div className="collapse bg-base-100 collapse-arrow border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Archived Listings</div>
          <div className="collapse-content text-sm">
            Pobrac ogloszenia dopiero po rozwinieciu
            <ListingsTable rows={live} actionLabel="View" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingsTable({ rows, actionLabel }: { rows: Listing[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Car</th>
            <th>VIN</th>
            <th>Price</th>
            <th>Created At</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(listing => (
            <tr key={listing.id}>
              <td className="font-medium">{listing.carName}</td>
              <td className="font-mono text-xs">{listing.vin}</td>
              <td>{listing.price ? `$${listing.price}` : "—"}</td>
              <td>{listing.createdAt}</td>
              <td className="text-right">
                <button className="btn btn-xs btn-outline">{actionLabel}</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-base-content/50">Nothing here 🎉</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
