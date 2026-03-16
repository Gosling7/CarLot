import StatCard from "@/components/StatCard"
import { StatCardsSection } from "@/components/StatCardsSection"

const mockListings: Listing[] = [
  { id: "1", carName: "Audi A3", vin: "5N1AT2MK4FC824170", status: "draft", price: 21000, createdAt: "2026-01-15" },
  { id: "2", carName: "Honda Civic", vin: "JHMFA16586S000000", status: "live", price: 15000, createdAt: "2026-01-10" },
  { id: "3", carName: "Toyota Camry", vin: "1HGCM82633A004352", status: "draft", price: 18000, createdAt: "2026-01-12" },
  { id: "4", carName: "Audi A4", vin: "WAUZZZ8V4KA000000", status: "live", price: 30000, createdAt: "2026-01-08" },
];

const drafts = mockListings.filter(l => l.status === "draft");

export const DashboardListingsStats = () => {
  return (
    <StatCardsSection>
      <StatCard label={"Live Listings"} data={mockListings.length} />
      <StatCard label={"Drafts"} data={drafts.length} />
    </StatCardsSection>
  )
}
