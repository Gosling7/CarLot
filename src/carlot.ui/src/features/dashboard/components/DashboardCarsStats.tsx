import StatCard from "@/components/StatCard"
import { StatCardsSection } from "@/components/StatCardsSection"

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

export const DashboardCarsStats = () => {

  const needsListingMock = mockCars.filter(c => c.status === "needs-listing");
  const liveMock = mockCars.filter(c => c.status === "live");

  return (
    <StatCardsSection>
      <StatCard label={"Cars in Catalog"} data={mockCars.length} />
      <StatCard label={"Cars with Live Listings"} data={liveMock.length} />
      <StatCard label={"Cars ready for Listing"} data={needsListingMock.length} />
    </StatCardsSection>
  )
}
