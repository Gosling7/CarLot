import { ArchivedCarsExpandable } from "@/features/dashboard/components/ArchivedCarsExpandable";
import { DashboardCarsStats } from "./DashboardCarsStats";
import { DashboardTablesSection } from "./DashboardTablesSection";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardActionsSection } from "@/features/dashboard/components/DashboardActionsSection";
import { DashboardActionButton } from "@/features/dashboard/components/DashboardActionButton";
import { UpdateCarForm } from "./forms/UpdateCarForm";
import { EditCarForm } from "./forms/EditCarForm";
import { NeedEditCarsTable } from "./NeedEditCarsTable";
import { ReadyForListingCarsTable } from "./ReadyForListingCarsTable";
import { AllCarsExpandable } from "./AllCarsExpandable";
import { AddCarForm } from "./forms/AddCarForm";

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
