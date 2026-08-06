import { CreateListingForm } from "./forms/CreateListingForm";
import { EditListingForm } from "./forms/EditListingForm";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardListingsStats } from "./DashboardListingsStats";
import { DashboardActionsSection } from "./DashboardActionsSection";
import { DashboardActionButton } from "./DashboardActionButton";
import { DashboardTablesSection } from "./DashboardTablesSection";
import { DraftListingsTable } from "./DraftListingsTable";
import { LiveListingsExpandable } from "./LiveListingsExpandable";
import { ArchivedListingsExpandable } from "./ArchivedListingsExpandable";

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
