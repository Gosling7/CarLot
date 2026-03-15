import { DashboardHeader } from "./DashboardHeader";
import { DashboardMainStats } from "./DashboardMainStats";
import { DashboardTablesSection } from "./DashboardTablesSection";
import { CarsReadyForListingMainTabTable } from "./CarsReadyForListingMainTabTable";
import { CarsNeedEditMainTabTable } from "./CarsNeedEditMainTabTable";
import { DraftListingsMainTabTable } from "./DraftListingsMainTabTable";

export const MainDashboardTab = () => {

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Dashboard"
        description="Overview of inventory and listings"
      />

      <DashboardMainStats />

      <DashboardTablesSection>
        <CarsReadyForListingMainTabTable />
        <CarsNeedEditMainTabTable />
        <DraftListingsMainTabTable />
      </DashboardTablesSection>

    </div >
  );
}
