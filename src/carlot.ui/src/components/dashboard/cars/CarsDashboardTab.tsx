import { TablesSection } from "@/components/TablesSection";
import { ArchivedCarsSection } from "@/features/dashboard/components/ArchivedCarsSection";
import Card from "@/components/Card";
import { StatCardsSection } from "@/components/StatCardsSection";
import StatCard from "@/components/StatCard";
import { ActionsSection } from "@/components/ActionsSection";
import { AddCarForm } from "@/features/dashboard/components/AddCarForm";
import { ButtonWithModal } from "@/components/ButtonWithModal";
import { UpdateCarForm } from "@/features/dashboard/components/UpdateCarForm";
import { EditCarForm } from "@/features/dashboard/components/EditCarForm";
import { useFetchCars } from "@/features/dashboard";

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

  const needsListingMock = mockCars.filter(c => c.status === "needs-listing");
  const liveMock = mockCars.filter(c => c.status === "live");
  const needsEditMock = mockCars.filter(c => c.status === "needs-edit");

  const {
    data: needEditCars,
    isFetched: isNeedEditCarsFetched,
  } = useFetchCars({ isExpanded: true, pageSize: 20, statuses: [1], search: "", queryKey: ["needEditCars"] })

  const {
    data: needListingCars,
    isFetched: isNeedListingCarsFetched,
  } = useFetchCars({ isExpanded: true, pageSize: 20, statuses: [0], search: "", queryKey: ["needListingCars"] })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cars Management</h1>
        <p className="text-base-content/60">Full inventory and car details</p>
      </div>

      <StatCardsSection>
        <StatCard label={"Cars in Catalog"} data={mockCars.length} />
        <StatCard label={"Cars with Live Listings"} data={liveMock.length} />
        <StatCard label={"Cars ready for Listing"} data={needsListingMock.length} />
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
          {isNeedEditCarsFetched && (
            <CarsTable rows={needEditCars?.pages[0].items} actionLabel="Edit" />
          )}
        </Card>
        <Card label="Ready for Listing">
          {isNeedListingCarsFetched && (
            <CarsTable rows={needListingCars?.pages[0].items} actionLabel="Edit" />
          )}
        </Card>
      </TablesSection>

      <ArchivedCarsSection />
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
