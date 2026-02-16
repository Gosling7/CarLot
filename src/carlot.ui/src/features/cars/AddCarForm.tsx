import { useState } from 'react'
import type { Equipment } from "../../types/Types";
import Select from "../../components/Select";
import { Section } from "../../components/Section";
import { Input } from "../../components/Input";
import { Form } from "../../components/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AddCarRequest } from "../../types/AddCarRequest";
import { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "../../types/CarDto";

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

  const [car, setCar] = useState<AddCarRequest>(initialAddCarRequest);
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  function handleChange<K extends keyof AddCarRequest>(key: K, value: AddCarRequest[K]) {
    setCar((prev) => ({ ...prev, [key]: value } as AddCarRequest));
  }

  const filteredEquipment = equipmentDummyData.filter((e) =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );
  const sortedEquipment = [
    ...filteredEquipment.filter((eq) => selectedCodes.includes(eq.code)),
    ...filteredEquipment.filter((eq) => !selectedCodes.includes(eq.code))
  ];

  function onToggle(code: string) {
    setCar((prev) => {
      const current = prev.equipmentCodes ?? [];
      const updated = current.includes(code)
        ? current.filter(c => c !== code) // if already in the previous car state, then remove (so clicking an already checked checkbox)
        : [...current, code];
      return { ...prev, equipmentCodes: updated };
    });
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

  function handleSave() {
    createCarMutation.mutate(car);
  }

  function enumToOptions<T extends object>(enumObj: T) {
    Object.values(enumObj) as Array<T[keyof T]>;
  }

  //console.log(car);
  console.log(enumToOptions(FuelType));

  return (
    <div className="modal-box max-w-6xl bg-base-200 animate-fadeIn relative overflow-y-auto max-h-[95vh]">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

      <Form header="Add Car">

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column */}
          <Section header="Basic Info">
            <Input label="VIN" value={car.vin} onChange={(e) => handleChange("vin", e.target.value)} />
            <Input label="Make" value={car.make} onChange={(e) => handleChange("make", e.target.value)} />
            <Input label="Model" value={car.model} onChange={(e) => handleChange("model", e.target.value)} />
            <Input label="Year" type="number" value={car.year} onChange={(e) => handleChange("year", Number(e.target.value))} />
            <Input label="Mileage" type="number" value={car.mileageKm} onChange={(e) => handleChange("mileageKm", Number(e.target.value))} />
            <Input label="Location" value={car.location} onChange={(e) => handleChange("location", e.target.value)} />
          </Section>

          {/* Right column */}
          <Section header="Engine & Details">
            <Input label="Power (HP)" type="number" value={car.powerHp ?? ""} onChange={(e) => handleChange("powerHp", Number(e.target.value))} />
            <Input label="Engine Displacement" type="number" value={car.engineDisplacement ?? ""} onChange={(e) => handleChange("engineDisplacement", Number(e.target.value))} />
            <Select label="Fuel Type" options={FuelType} value={car.fuelType} onChange={(e) => handleChange("fuelType", e)} />
            <Select label="Additional Fuel Type" options={AdditionalFuelType} value={car.additionalFuelType} onChange={(e) => handleChange("additionalFuelType", e)} />
            <Select label="Transmission" options={TransmissionType} value={car.transmission} onChange={(e) => handleChange("transmission", e)} />
            <Select label="Drive Type" options={DriveType} value={car.driveType} onChange={(e) => handleChange("driveType", e)} />
            <Input label="Body Type" value={car.body} onChange={(e) => handleChange("body", e.target.value)} />
            <Input label="Registration" value={car.registrationPlate} onChange={(e) => handleChange("registrationPlate", e.target.value)} />
          </Section>
        </div>

        <Section header="Equipment">
          <Input label="Search" placeholder="Search equipment..." value={equipmentSearch} onChange={(e) => setEquipmentSearch(e.target.value)} />
          <div className="grid md:grid-cols-2 gap-2 max-h-100 overflow-y-auto mt-4">
            {sortedEquipment.map((eq) => (
              <label key={eq.code} className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-base-200 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={car.equipmentCodes.includes(eq.code)}
                  onChange={() => onToggle(eq.code)}
                />
                <span className="text-sm">{eq.name}</span>
              </label>
            ))}
          </div>
        </Section>

        <button className="btn btn-lg mt-6 w-full" type="button" onClick={handleSave}>
          Save Changes
        </button>

      </Form >
    </div>
  );
}
