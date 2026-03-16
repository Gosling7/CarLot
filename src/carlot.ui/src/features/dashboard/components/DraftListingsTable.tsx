import Card from "@/components/Card";
import { useFetchCars } from "../hooks/useFetchCars";

const mockListings: Listing[] = [
  { id: "1", carName: "Audi A3", vin: "5N1AT2MK4FC824170", status: "draft", price: 21000, createdAt: "2026-01-15" },
  { id: "2", carName: "Honda Civic", vin: "JHMFA16586S000000", status: "live", price: 15000, createdAt: "2026-01-10" },
  { id: "3", carName: "Toyota Camry", vin: "1HGCM82633A004352", status: "draft", price: 18000, createdAt: "2026-01-12" },
  { id: "4", carName: "Audi A4", vin: "WAUZZZ8V4KA000000", status: "live", price: 30000, createdAt: "2026-01-08" },
];

const drafts = mockListings.filter(l => l.status === "draft");
const live = mockListings.filter(l => l.status === "live");
const archived = mockListings.filter(l => l.status === "archived");

// TODO: Mockup component, to be implemented correctly
export const DraftListingsTable = () => {

  const {
    data: needEditCars,
    isFetched: isNeedEditCarsFetched,
  } = useFetchCars({
    isExpanded: true,
    pageSize: 20,
    statuses: [1],
    search: "",
    queryKey: ["needEditCars"]
  })

  return (
    <Card label="Draft Listings">
      {isNeedEditCarsFetched && (
        <CarsTable rows={drafts} actionLabel="Edit" />
      )}
    </Card>
  )
}

function CarsTable({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
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
            <tr key={listing.vin}>
              <td className="font-medium">{listing.carName}</td>
              <td className="font-mono text-xs">{listing.vin}</td>
              <td>{listing.price ? `$${listing.price}` : "—"}</td>
              <td className="font-mono text-xs">{listing.createdAt}</td>
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
