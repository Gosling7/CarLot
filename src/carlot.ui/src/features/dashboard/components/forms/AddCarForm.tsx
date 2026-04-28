import { setErrorsInForm } from "@/lib/FormUtils";
import { AddCarSchema, type AddCarFormValues } from "@/lib/validation/addCar.schema";
import type { AddCarRequest } from "@/types/AddCarRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { Section } from "@/components/Section";
import { InputZod } from "@/components/Input";
import { SelectRHF } from "@/components/Select";
import { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "@/types/CarDto";
import { useState } from "react";
import { Form } from "@/components/Form";
import { useCreateCar } from "../../hooks/useCreateCar";
import { useFetchEquipment } from "../../hooks/useFetchEquipment";
import { CarEquipment } from "../CarEquipment";
import { Button } from "@/components/Button";
import { CloseModalButton } from "../CloseModalButton";
import { DashboardModal } from "../DashboardModal";
import type { EquipmentDto } from "@/types/EquipmentDto";

const initialAddCarRequest: AddCarRequest = {
  vin: "",
  make: "",
  model: "",
  year: 0,
  fuelType: FuelType.Petrol,
  additionalFuelType: AdditionalFuelType.None,
  transmission: TransmissionType.Manual,
  powerHp: 0,
  engineDisplacement: undefined,
  turbocharged: false,
  body: "",
  registrationPlate: "",
  driveType: DriveType.FWD,
  mileageKm: 0,
  location: "",
  equipmentCodes: [],
};

export const AddCarForm = () => {
  const [equipmentSearch, setEquipmentSearch] = useState("");

  const { data: equipment = [] } = useFetchEquipment({ enabled: true })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors }
  } = useForm<AddCarFormValues>({
    resolver: zodResolver(AddCarSchema),
    defaultValues: initialAddCarRequest,
    mode: "onBlur"
  });

  const { mutate } = useCreateCar();
  const onSubmit = (newCar: AddCarRequest) => {
    mutate(newCar, {
      onError: (err: AxiosError) => {
        const problemDetails = err.response?.data as ProblemDetails;
        setErrorsInForm(problemDetails, setError);
      },
    });
  };

  const equipmentCodes = getValues("equipmentCodes") ?? [];
  const filteredEquipment = equipment.filter(e =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  ) as EquipmentDto[];
  const sortedEquipment = [
    ...filteredEquipment.filter((eq) => equipmentCodes.includes(eq.code)),
    ...filteredEquipment.filter((eq) => !equipmentCodes.includes(eq.code))
  ];

  function onToggle(code: string) {
    const current = getValues("equipmentCodes") ?? [];
    const updated = current.includes(code)
      ? current.filter(c => c !== code)
      : [...current, code];
    setValue("equipmentCodes", updated);
  }

  return (
    <DashboardModal>
      <CloseModalButton />

      <Form
        header="Add Car"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Section header="Basic Info">
            <InputZod
              label="VIN" {...register("vin")}
              error={errors.vin?.message}
            />
            <InputZod
              label="Make" {...register("make")}
              error={errors.make?.message}
            />
            <InputZod
              label="Model" {...register("model")}
              error={errors.model?.message}
            />
            <InputZod
              label="Year" {...register("year", { valueAsNumber: true })}
              error={errors.year?.message}
            />
            <InputZod
              label="Mileage" {...register("mileageKm", { valueAsNumber: true })}
              error={errors.mileageKm?.message}
            />
            <InputZod
              label="Location" {...register("location")}
              error={errors.location?.message}
            />
          </Section>

          <Section header="Engine & Details">
            <InputZod
              label="Power (HP)"  {...register("powerHp", { valueAsNumber: true })}
              error={errors.powerHp?.message}
            />
            <InputZod
              label="Engine Displacement"  {...register("engineDisplacement", { valueAsNumber: true })}
              error={errors.engineDisplacement?.message}
            />
            <SelectRHF
              label={"Transmission"}
              options={TransmissionType} {...register("transmission")}
            />
            <SelectRHF
              label={"Fuel Type"}
              options={FuelType} {...register("fuelType")}
            />
            <SelectRHF
              label={"Additional Fuel Type"}
              options={AdditionalFuelType} {...register("additionalFuelType")}
            />
            <SelectRHF
              label={"Drive Type"}
              options={DriveType} {...register("driveType")}
            />
            <InputZod
              label="Body Type"  {...register("body")}
              error={errors.body?.message}
            />
            <InputZod
              label="Registration"  {...register("registrationPlate")}
              error={errors.registrationPlate?.message}
            />
          </Section>
        </div>

        <Section header="Equipment">
          <InputZod
            label="Search"
            placeholder="Search equipment..."
            value={equipmentSearch}
            onChange={(e) => setEquipmentSearch(e.target.value)}
          />

          <CarEquipment
            equipment={sortedEquipment}
            onToggle={onToggle}
          />
        </Section>

        <Button label={"Save Changes"} type="submit" />
      </Form >
    </DashboardModal>
  );
}
