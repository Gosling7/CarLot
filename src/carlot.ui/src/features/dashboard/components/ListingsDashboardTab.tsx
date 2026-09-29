import { CreateListingForm, EditListingForm, DraftListingsTable, LiveListingsExpandable, ArchivedListingsExpandable } from "@/features/listings";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardListingsStats } from "@/features/dashboard/components/DashboardListingsStats";
import { DashboardActionsSection } from "@/features/dashboard/components/DashboardActionsSection";
import { DashboardActionButton } from "@/features/dashboard/components/DashboardActionButton";
import { DashboardTablesSection } from "@/features/dashboard/components/DashboardTablesSection";

export const ListingsDashboardTab = () => {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title={"Listings Management"}
        description={"Manage car listings and their statuses"}
      />

      <DashboardListingsStats />

      <DashboardActionsSection>
        <DashboardActionButton label={"Create Listing"}>
          <CreateListingForm />
        </DashboardActionButton>

        <DashboardActionButton label={"Update Listing"}>
          <EditListingForm />
        </DashboardActionButton>
      </DashboardActionsSection>

      <DashboardTablesSection>
        <DraftListingsTable />
      </DashboardTablesSection>

      <LiveListingsExpandable />

      <ArchivedListingsExpandable />
    </div>
  );
}
