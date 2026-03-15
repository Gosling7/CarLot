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
  { vin: "5N1AT2MK4FC824170", make: "Audi", model: "A3", year: 2019, status: "needs-listing" },
  { vin: "1HGCM82633A004352", make: "Toyota", model: "Camry", year: 2020, status: "needs-edit" },
  { vin: "JHMFA16586S000000", make: "Honda", model: "Civic", year: 2018, status: "draft" },
  { vin: "WAUZZZ8V4KA000000", make: "Audi", model: "A4", year: 2021, status: "live" },
];

export const DashboardMainStats = () => {

  const needsListing = mockCars.filter(c => c.status === "needs-listing");
  const drafts = mockCars.filter(c => c.status === "draft");
  const needsEdit = mockCars.filter(c => c.status === "needs-edit");
  const liveListing = mockCars.filter(c => c.status === "live");


  return (
    <StatCardsSection>
      <StatCard label="Cars in Catalog" data={mockCars.length} />
      <StatCard label="Active Listings" data={liveListing.length} />
      <StatCard label="Cars ready for Listing" data={needsListing.length} />
      <StatCard label="Draft Listings" data={drafts.length} />
      <StatCard label="Cars to Edit" data={needsEdit.length} />
    </StatCardsSection>
  )
}
