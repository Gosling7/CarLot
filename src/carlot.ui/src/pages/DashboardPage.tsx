import { MainDashboardTab, CarsDashboardTab, ListingsDashboardTab } from "@/features/dashboard";


export default function DashboardPage() {
  console.log("DashboardPage rendered");
  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="flex justify-center tabs tabs-border">
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Dashboard" defaultChecked />
        <div className="tab-content border-base-300 bg-base-200 p-10">
          <MainDashboardTab />
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Cars" />
        <div className="tab-content border-base-300 bg-base-200 p-10">
          <CarsDashboardTab />
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Listings" />
        <div className="tab-content border-base-300 bg-base-200 p-10">
          <ListingsDashboardTab />
        </div>
      </div>
    </>
  )
}
