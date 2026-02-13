import type { CarTableRowDto } from "../types/CarTableRowDto";

export default function Table({
  rows,
  actionLabel,
}: {
  rows: CarTableRowDto[];
  actionLabel: string;
}) {
  actionLabel
  const headers = Object.keys(rows[0]);

  // ["Car", "Year", "Price", "Mileage", "Color", "VIN"];
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          {headers.map(header => (
            <th>{header}</th>
          ))}
          <th className="text-right"></th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr>
            {headers.map(header => (
              <td>{row[header].to}</td>
            ))}
          </tr>
        ))}

      </tbody>
    </table>


    // <div className="overflow-x-auto">
    //   <table className="table table-sm">
    //     <thead>
    //       <tr>
    //         {headers.map(h => (
    //           <th>{h}</th>
    //         ))}
    //         <th className="text-right"></th>

    //       </tr>
    //     </thead>
    //     <tbody>
    //       {rows.map(data => (
    //         <tr key={data.vin}>
    //           <td className="font-medium">{data.make} {data.model}</td>
    //           <td>{data.year}</td>
    //           <td className="font-mono text-xs">{data.vin}</td>
    //           <td className="text-right">
    //             <button className="btn btn-xs">
    //               {actionLabel}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //       {rows.length === 0 && (
    //         <tr>
    //           <td colSpan={4} className="text-center text-base-content/50">
    //             Nothing here
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
}


