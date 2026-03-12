type Props = {
  data: any;
  isFetched?: boolean;
}

export const Table = ({ data, isFetched }: Props) => {
  return (
    <table className="table table-zebra table-sm table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th></th>
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
        {isFetched && (
          data.map((car, index: number) => (
            <tr key={car.vin}>
              <td>{index + 1}</td>
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
          ))
        )}

        {data.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center text-base-content/50">Nothing here 🎉</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

