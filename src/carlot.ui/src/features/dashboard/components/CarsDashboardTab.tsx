import { ArchivedCarsExpandable, UpdateCarForm, EditCarForm, NeedEditCarsTable, ReadyForListingCarsTable, AllCarsExpandable, AddCarForm } from "@/features/cars";
import { DashboardCarsStats } from "@/features/dashboard/components/DashboardCarsStats";
import { DashboardTablesSection } from "@/features/dashboard/components/DashboardTablesSection";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardActionsSection } from "@/features/dashboard/components/DashboardActionsSection";
import { DashboardActionButton } from "@/features/dashboard/components/DashboardActionButton";

export const CarsDashboardTab = () => {
  console.log("CarsDashboardTab rendered");

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Cars Management"
        description="Full inventory and car details"
      />

      <DashboardCarsStats />

      <DashboardActionsSection>
        <DashboardActionButton label={"Add Car"}>
          <AddCarForm />
        </DashboardActionButton>

        <DashboardActionButton label={"Update Car"}>
          <UpdateCarForm />
        </DashboardActionButton>

        <DashboardActionButton label={"Edit Car"}>
          <EditCarForm />
        </DashboardActionButton>
      </DashboardActionsSection>

      <DashboardTablesSection>
        <NeedEditCarsTable />
        <ReadyForListingCarsTable />
      </DashboardTablesSection>

      <AllCarsExpandable />

      <ArchivedCarsExpandable />
    </div >
  );
}
