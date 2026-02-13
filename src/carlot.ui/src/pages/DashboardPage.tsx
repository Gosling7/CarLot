import CarsDashboardTab from "../features/components/CarsDashboardTab";
import ListingsDashboardTab from "../features/components/ListingsDashboardTab";
import MainDashboardTab from "../features/components/MainDashboardTab";

export default function DashboardPage() {

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
