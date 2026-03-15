import Card from "@/components/Card"

const mockCars: Car[] = [
  { vin: "5N1AT2MK4FC824170", make: "Audi", model: "A3", status: "needs-listing" },
  { vin: "1HGCM82633A004352", make: "Toyota", model: "Camry", status: "needs-edit" },
  { vin: "JHMFA16586S000000", make: "Honda", model: "Civic", status: "draft" },
  { vin: "WAUZZZ8V4KA000000", make: "Audi", model: "A4", status: "live" },
];

// TODO: Mockup component, to be implemented correctly
export const DraftListingsMainTabTable = () => {

  const drafts = mockCars.filter(c => c.status === "draft");

  return (
    <Card label="Draft Listings">
      <Table
        rows={drafts}
        actionLabel="Edit"
      />
    </Card>
  )
}

function Table({ rows, actionLabel }: { rows: Car[]; actionLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Car</th>
            <th>VIN</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(car => (
            <tr key={car.vin}>
              <td className="font-medium">{car.make} {car.model}</td>
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
