import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardMainStats } from "@/features/dashboard/components/DashboardMainStats";
import { DashboardTablesSection } from "@/features/dashboard/components/DashboardTablesSection";
import { CarsReadyForListingMainTabTable, CarsNeedEditMainTabTable } from "@/features/cars";
import { DraftListingsMainTabTable } from "@/features/listings";

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
