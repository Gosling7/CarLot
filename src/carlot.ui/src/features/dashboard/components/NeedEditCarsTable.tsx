import Card from "@/components/Card"
import { useFetchCars } from "../hooks/useFetchCars";

export const NeedEditCarsTable = () => {

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
    <Card label="Need Edit">
      {isNeedEditCarsFetched && (
        <CarsTable rows={needEditCars?.pages[0].items} actionLabel="Edit" />
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