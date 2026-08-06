import { Input } from "@/components/Input";
import { CarStatus } from "@/types/CarDto";
import { useState, type ReactNode } from "react";
import { useFetchCarByVin } from "../../hooks/useFetchCarByVin";
import { useUpdateMileage } from "../../hooks/useUpdateMileage";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";
import Select from "@/components/Select";
import { useUpdateEquipment } from "../../hooks/useUpdateEquipment";
import { useFetchEquipment } from "../../hooks/useFetchEquipment";
import { DashboardSuccessMessage } from "../DashboardSuccessMessage";
import { Section } from "@/components/Section";
import { SectionButton } from "@/components/SectionButton";
import { Button } from "@/components/Button";
import { CarEquipment } from "../CarEquipment";
import { CloseModalButton } from "../CloseModalButton";
import { DashboardModal } from "../DashboardModal";

type CarUpdateSection = "status" | "mileage" | "equipment";

const sections: { section: CarUpdateSection; label: string }[] = [
  { section: "status", label: "Status" },
  { section: "mileage", label: "Mileage" },
  { section: "equipment", label: "Equipment" },
];

export const UpdateCarForm = () => {
  const [selectedSection, setSelectedSection] = useState<CarUpdateSection | null>(null);
  const [mileage, setMileage] = useState<number>(0);
  const [status, setStatus] = useState(CarStatus.Received);
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [equipmentCodes, setEquipmentCodes] = useState<string[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fetchedVin, setFetchedVin] = useState("");
  const [vinSearch, setVinSearch] = useState<string>("");

  const { data: car, isFetched: isCarFetched } = useFetchCarByVin({
    vin: fetchedVin,
    enabled: fetchedVin !== ""
  });

  const selectedCodes = equipmentCodes ?? car?.equipment?.map(eq => eq.code) ?? [];
  const { data: equipment = [] } = useFetchEquipment({ enabled: true })

  const filteredEquipment = equipment.filter(e =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );

  function handleCheckboxToggle(code: string) {
    setEquipmentCodes(prev => {
      const current = prev ?? car?.equipment?.map(eq => eq.code) ?? [];
      return current.includes(code)
        ? current.filter(c => c !== code)
        : [...current, code]
    });
  }

  const sortedEquipment = [
    ...filteredEquipment.filter(eq => selectedCodes.includes(eq.code)),
    ...filteredEquipment.filter(eq => !selectedCodes.includes(eq.code)),
  ];

  function handleSelectSection(section: CarUpdateSection) {
    setSelectedSection(section);
    setSuccessMessage(null);
  };

  const { mutate: updateMileage } = useUpdateMileage({
    vin: fetchedVin,
    mileage: mileage,
    onSuccess: () => setSuccessMessage("Mileage successfully updated.")
  });

  const { mutate: updateStatus } = useUpdateStatus({
    vin: fetchedVin,
    status: status,
    onSuccess: () => setSuccessMessage("Status successfully updated.")
  });

  const { mutate: updateEquipment } = useUpdateEquipment({
    vin: fetchedVin,
    equipmentCodes: equipmentCodes ?? [],
    onSuccess: () => setSuccessMessage("Equipment successfully updated.")
  });

  function onSearch() {
    setFetchedVin(vinSearch);
    setEquipmentCodes(null);
    setSuccessMessage(null);
    setSelectedSection(null);
  }

  const sectionContent: Record<CarUpdateSection, ReactNode> = {
    status: (
      <Section header="Update Status">
        <Select
          label="Status"
          options={CarStatus}
          onChange={(e) => setStatus(e)}
          value={status}
        />
        <Button label="Save Status" onClick={() => updateStatus()} />
      </Section>
    ),
    mileage: (
      <Section header="Update Mileage">
        <Input
          label="New Mileage (KM)"
          type="number"
          value={mileage}
          onChange={(e) => setMileage(Number(e.target.value))}
        />
        <Button label="Save Mileage" onClick={() => updateMileage()} />
      </Section>
    ),
    equipment: (
      <Section header="Update Equipment">
        <Input
          placeholder="Search equipment..."
          value={equipmentSearch}
          onChange={(e) => setEquipmentSearch(e.target.value)}
        />

        <CarEquipment
          equipment={sortedEquipment}
          checkedEquipmentCodes={selectedCodes}
          onToggle={handleCheckboxToggle}
        />

        <Button label="Save Equipment" onClick={() => updateEquipment()} />
      </Section>
    ),
  };

  return (
    <DashboardModal>
      <CloseModalButton />

      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-bold">Update Car</h2>

        <Section header="Find in Catalog">
          <div className="flex gap-4 items-end">
            <div className="w-full">
              <Input
                label="VIN"
                value={vinSearch}
                onChange={(e) => setVinSearch(e.target.value)}
              />
            </div>

            <Button label={"Search"} onClick={onSearch} />
          </div>
        </Section>

        {isCarFetched && car && (
          <Section header="Current Car Info">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <CarPreviewInfo label={"Make / Model"} value={`${car.make} ${car.model}`} />
              <CarPreviewInfo label={"Year"} value={car.year} />
              <CarPreviewInfo label={"Mileage"} value={`${car.mileageKm.toLocaleString()} km`} />

              <div>
                <p className="opacity-60">Status</p>
                <span className="badge badge-outline">
                  {CarStatus[car.status]}
                </span>
              </div>

              <div className="md:col-span-3">
                <p className="opacity-60">Equipment</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {car.equipment.map(eq => (
                    <span key={eq.code} className="badge badge-outline">
                      {equipment.find(e => e.code === eq.code)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        )}

        {isCarFetched && car && (
          <Section header="What do you want to update?">
            <div className="flex flex-wrap gap-4">
              {sections.map(({ section, label }) => (
                <SectionButton
                  key={section}
                  label={label}
                  isActive={selectedSection === section}
                  onClick={() => handleSelectSection(section)}
                />
              ))}
            </div>
          </Section>
        )}

        {selectedSection && sectionContent[selectedSection]}

        {successMessage && (
          <DashboardSuccessMessage
            header={"Update Successful"}
            message={successMessage}
          />
        )}
      </div>
    </DashboardModal>
  );
};

const CarPreviewInfo = ({ label, value }: { label: string, value: string }) => {
  return (
    <div>
      <p className="opacity-60">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}