import { Input, InputZod } from "@/shared/ui/Input";
import { SelectRHF } from "@/shared/ui/Select";
import { type AddCarFormValues, AddCarSchema } from "@/features/cars/schemas/addCar.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/Form";
import type { AddCarRequest } from "@/features/cars/types/AddCarRequest";
import { useEditCar } from "@/features/cars/hooks/useEditCar";
import type { AxiosError } from "axios";
import type { ProblemDetails } from "@/shared/api/ProblemDetails";
import { setErrorsInForm } from "@/shared/api/formErrors";
import { Section } from "@/shared/ui/Section";
import { TransmissionType, FuelType, AdditionalFuelType, DriveType } from "@/features/cars/types/CarDto";
import { useFetchCarByVin } from "@/features/cars/hooks/useFetchCarByVin";
import { useFetchEquipment } from "@/features/equipment";
import { CarEquipment } from "@/features/cars/components/CarEquipment";
import { DashboardModal } from "@/shared/ui/Modal";
import { CloseModalButton } from "@/shared/ui/CloseModalButton";
import { Button } from "@/shared/ui/Button";

export const EditCarForm = () => {
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [fetchedVin, setFetchedVin] = useState("");
  const [vinSearch, setVinSearch] = useState<string>("");

  const { data, isFetched } = useFetchCarByVin({
    vin: fetchedVin,
    enabled: fetchedVin !== "",
  });

  const { data: equipment = [] } = useFetchEquipment({ enabled: true });

  const { mutate } = useEditCar({ vin: data?.vin });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddCarFormValues>({
    resolver: zodResolver(AddCarSchema),
    defaultValues: undefined,
    mode: "onBlur",
  });

  useEffect(() => {
    if (isFetched && data) {
      reset({
        ...data,
        equipmentCodes: data.equipment?.map((e: { code: string }) => e.code) ?? [],
      });
    }
  }, [data]);

  function onSubmit(updatedCar: AddCarRequest) {
    mutate(updatedCar, {
      onError: (err: AxiosError) => {
        const problemDetails = err.response?.data as ProblemDetails;
        setErrorsInForm(problemDetails, setError);
      },
    });
  }

  function onToggle(code: string) {
    const updated = equipmentCodes.includes(code)
      ? equipmentCodes.filter((c) => c !== code)
      : [...equipmentCodes, code];
    setValue("equipmentCodes", updated, { shouldDirty: true });
  }

  const equipmentCodes = getValues("equipmentCodes") ?? [];

  const filteredEquipment = equipment.filter((e) =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );
  const sortedEquipment = [
    ...filteredEquipment.filter((eq) => equipmentCodes.includes(eq.code)),
    ...filteredEquipment.filter((eq) => !equipmentCodes.includes(eq.code)),
  ];

  return (
    <DashboardModal>
      <div className="grid grid-cols-1 gap-6">
        <CloseModalButton />

        <h2 className="text-2xl font-bold">Edit Car</h2>

        <Section header="Find Car by VIN">
          <div className="flex gap-4 items-end">
            <div className="w-full">
              <Input
                label="VIN"
                value={vinSearch}
                onChange={(e) => setVinSearch(e.target.value)}
              />
            </div>

            <Button label={"Search"} onClick={() => setFetchedVin(vinSearch)} />
          </div>
        </Section>

        {data && (
          <Form header={""} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6">
              <Section header="Basic Info">
                <InputZod label="VIN" {...register("vin")} error={errors.vin?.message} />
                <InputZod label="Make" {...register("make")} error={errors.make?.message} />
                <InputZod label="Model" {...register("model")} error={errors.model?.message} />
                <InputZod label="Year" {...register("year", { valueAsNumber: true })} error={errors.year?.message} />
                <InputZod label="Mileage" {...register("mileageKm", { valueAsNumber: true })} error={errors.mileageKm?.message} />
                <InputZod label="Location" {...register("location")} error={errors.location?.message} />
              </Section>

              <Section header="Engine & Details">
                <InputZod label="Power (HP)" {...register("powerHp", { valueAsNumber: true })} error={errors.powerHp?.message} />
                <InputZod label="Engine Displacement" {...register("engineDisplacement", { valueAsNumber: true })} error={errors.engineDisplacement?.message} />
                <SelectRHF label="Transmission" options={TransmissionType} {...register("transmission")} />
                <SelectRHF label="Fuel Type" options={FuelType} {...register("fuelType")} />
                <SelectRHF label="Additional Fuel Type" emptyLabel={"— None —"} options={AdditionalFuelType} {...register("additionalFuelType", { setValueAs: v => v === "" ? null : v })} />
                <SelectRHF label="Drive Type" options={DriveType} {...register("driveType")} />
                <InputZod label="Body Type" {...register("body")} error={errors.body?.message} />
                <InputZod label="Registration" {...register("registrationPlate")} error={errors.registrationPlate?.message} />
              </Section>
            </div>

            <Section header="Equipment">
              <Input
                placeholder="Search equipment..."
                value={equipmentSearch}
                onChange={(e) => setEquipmentSearch(e.target.value)}
              />

              <CarEquipment
                equipment={sortedEquipment}
                checkedEquipmentCodes={equipmentCodes}
                onToggle={onToggle}
              />
            </Section>
            <button className="btn btn-lg rounded-xl w-full" type="submit">
              Save Changes
            </button>
          </Form>
        )}
      </div>
    </DashboardModal>
  );
};