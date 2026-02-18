import { useState } from 'react'
import type { Equipment } from "../../types/Types";
import Select from "../../components/Select";
import { Section } from "../../components/Section";
import { Input, InputZod } from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/Form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AddCarRequest } from "../../types/AddCarRequest";
import { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "../../types/CarDto";
import { Controller, useForm } from "react-hook-form";
import { AddCarSchema, type AddCarFormValues } from "../../validation/addCar.schema";

const equipmentDummyData: Equipment[] = [
  { name: "Air Conditioning", code: "AC" },
  { name: "Lane Assist", code: "LANE_ASSIST" },
  { name: "Adaptive Cruise Control", code: "ACC" },
  { name: "Anti-lock Braking System", code: "ABS" },
  { name: "Electronic Stability Control", code: "ESC" },
  { name: "Traction Control", code: "TCS" },
  { name: "Blind Spot Monitoring", code: "BLIND_SPOT" },
  { name: "Parking Sensors", code: "PARK_SENSORS" },
  { name: "Rear View Camera", code: "REAR_CAMERA" },
  { name: "Heated Seats", code: "HEATED_SEATS" },
  { name: "Ventilated Seats", code: "VENTILATED_SEATS" },
  { name: "Leather Upholstery", code: "LEATHER" },
  { name: "Keyless Entry", code: "KEYLESS_ENTRY" },
  { name: "Push Button Start", code: "PUSH_START" },
  { name: "Automatic Headlights", code: "AUTO_HEADLIGHTS" },
  { name: "Rain Sensing Wipers", code: "RAIN_WIPERS" },
  { name: "Sunroof", code: "SUNROOF" },
  { name: "Panoramic Roof", code: "PANORAMIC_ROOF" },
  { name: "Apple CarPlay", code: "APPLE_CARPLAY" },
  { name: "Android Auto", code: "ANDROID_AUTO" },
  { name: "Bluetooth Connectivity", code: "BLUETOOTH" }
];

export const AddCarForm = () => {
  console.log("AddCarForm rendered");

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
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AddCarFormValues>({
    resolver: zodResolver(AddCarSchema),
    defaultValues: initialAddCarRequest,
    mode: "onBlur"
  });

  const [equipmentSearch, setEquipmentSearch] = useState("");
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

  const queryClient = useQueryClient();

  const createCarMutation = useMutation({
    mutationFn: (newCar: AddCarRequest) => axios.post("api/cars", newCar).then((r) => r.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log("Car created", data);
    },
    onError: (err) => {
      console.error("Failed to create a car", err);
    }
  });

  return (
    <div className="modal-box max-w-6xl bg-base-200 animate-fadeIn relative overflow-y-auto max-h-[95vh]">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

      <form onSubmit={handleSubmit((data) => createCarMutation.mutate(data))}>
        <Form header="Add Car">

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column */}
            <Section header="Basic Info">
              <InputZod label="VIN" {...register("vin")} error={errors.vin?.message} />
              <InputZod label="Make" {...register("make")} error={errors.make?.message} />
              <InputZod label="Model" {...register("model")} error={errors.model?.message} />
              <InputZod label="Year" {...register("year", { valueAsNumber: true })} error={errors.year?.message} />
              <InputZod label="Mileage" {...register("mileageKm", { valueAsNumber: true })} error={errors.mileageKm?.message} />
              <InputZod label="Location" {...register("location")} error={errors.location?.message} />
            </Section>

            {/* Right column */}
            <Section header="Engine & Details">
              <InputZod label="Power (HP)"  {...register("powerHp", { valueAsNumber: true })} error={errors.powerHp?.message} />
              <InputZod label="Engine Displacement"  {...register("engineDisplacement", { valueAsNumber: true })} error={errors.engineDisplacement?.message} />
              <Controller
                name="transmission"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Transmission"
                    options={TransmissionType}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="additionalFuelType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Additional Fuel Type"
                    options={AdditionalFuelType}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Fuel Type"
                    options={FuelType}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="driveType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Drive Type"
                    options={DriveType}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <InputZod label="Body Type"  {...register("body")} error={errors.body?.message} />
              <InputZod label="Registration"  {...register("registrationPlate")} error={errors.registrationPlate?.message} />
            </Section>
          </div>

          <Section header="Equipment">
            <InputZod label="Search" placeholder="Search equipment..." value={equipmentSearch} onChange={(e) => setEquipmentSearch(e.target.value)} />
            <div className="grid md:grid-cols-2 gap-2 max-h-100 overflow-y-auto mt-4">
              {sortedEquipment.map((eq) => (
                <label key={eq.code} className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-base-200 cursor-pointer">
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
      </form>
    </div>
  );
}
