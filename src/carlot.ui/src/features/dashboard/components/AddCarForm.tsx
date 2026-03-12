// import { useState } from 'react'
// import type { Equipment } from "../../types/Types";
// import { SelectRHF } from "../../components/Select";
// import { Section } from "../../components/Section";
// import { InputZod } from "../../components/Input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "../../components/Form";
// import { useQuery } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import type { AddCarRequest } from "../../types/AddCarRequest";
// import { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "../../types/CarDto";
// import { useForm } from "react-hook-form";
// import { AddCarSchema, type AddCarFormValues } from "../../validation/addCar.schema";
// import type { ProblemDetails } from "../../types/ProblemDetails";
// import { setErrorsInForm } from "../../shared/FormUtils";
// import { useCreateCar } from "../cars/hooks/useCreateCar";

import { setErrorsInForm } from "@/lib/FormUtils";
import { AddCarSchema, type AddCarFormValues } from "@/lib/validation/addCar.schema";
import type { AddCarRequest } from "@/types/AddCarRequest";
import type { Equipment } from "@/types/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useCreateCar } from "../hooks/useCreateCar";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { Section } from "@/components/Section";
import { InputZod } from "@/components/Input";
import { SelectRHF } from "@/components/Select";
import { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "@/types/CarDto";
import { useState } from "react";
import { Form } from "@/components/Form";

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
  console.log("AddCarForm rendered");

  const [equipmentSearch, setEquipmentSearch] = useState("");

  const { data: equipment = [] } = useQuery<Equipment[]>({
    queryKey: ["equipment"],
    queryFn: async () => {
      const response = await axios.get("api/equipment");
      console.log(response.data);
      return response.data;
    }
  });

  const {
    register,
    handleSubmit,
    watch,
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

  const equipmentCodes = watch("equipmentCodes") ?? [];
  const filteredEquipment = equipment.filter((e) =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );
  const sortedEquipment = [
    ...filteredEquipment.filter((eq) => equipmentCodes.includes(eq.code)),
    ...filteredEquipment.filter((eq) => !equipmentCodes.includes(eq.code))
  ];

  function onToggle(code: string) {
    const current = watch("equipmentCodes") ?? [];
    const updated = current.includes(code)
      ? current.filter(c => c !== code)
      : [...current, code];
    setValue("equipmentCodes", updated);
  }

  return (
    <div className="modal-box max-w-6xl bg-base-200 animate-fadeIn relative overflow-y-auto max-h-[95vh]">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

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
          <div className="grid md:grid-cols-2 gap-2 max-h-100 overflow-y-auto mt-4">
            {sortedEquipment.map((eq) => (
              <label
                key={eq.code}
                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-base-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={equipmentCodes.includes(eq.code)}
                  onChange={() => onToggle(eq.code)}
                />
                <span className="text-sm">{eq.name}</span>
              </label>
            ))}
          </div>
        </Section>

        <button className="btn btn-lg mt-6 w-full" type="submit">
          Save Changes
        </button>

      </Form >
    </div>
  );
}
