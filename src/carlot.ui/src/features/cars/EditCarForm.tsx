import { useState, useEffect } from "react";
import type { Equipment } from "../../types/Types";
import Input from "../../components/Input";
import Select from "../../components/Select";

type Car = {
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  status: "Available" | "Reserved" | "Archived";
  body: string;
  engineDisplacement?: number;
  powerHp?: number;
  fuelType: string;
  additionalFuelType?: string;
  transmission: string;
  driveType: string;
  location: string;
  registration: string;
  equipment: string[];
};

const dummyCars: Car[] = [
  {
    vin: "WBAXX12345BMW",
    make: "BMW",
    model: "330i",
    year: 2021,
    mileage: 42000,
    status: "Available",
    body: "Sedan",
    engineDisplacement: 2.0,
    powerHp: 255,
    fuelType: "Petrol",
    additionalFuelType: "",
    transmission: "Automatic",
    driveType: "RWD",
    location: "Warsaw",
    registration: "WX12345",
    equipment: ["AC", "LANE_ASSIST", "ACC"]
  },
  {
    vin: "WAUZZZ8V7KAUDI",
    make: "Audi",
    model: "A4",
    year: 2019,
    mileage: 67000,
    status: "Reserved",
    body: "Sedan",
    engineDisplacement: 2.0,
    powerHp: 190,
    fuelType: "Diesel",
    additionalFuelType: "",
    transmission: "Automatic",
    driveType: "AWD",
    location: "Krakow",
    registration: "KR67890",
    equipment: ["AC", "LEATHER", "BLUETOOTH"]
  }
];

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

export const EditCarForm = () => {
  const [vinSearch, setVinSearch] = useState("");
  const [car, setCar] = useState<Car | null>(null);

  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Populate selectedCodes when car changes
  useEffect(() => {
    if (car) {
      setSelectedCodes(car.equipment);
    }
  }, [car]);

  const handleSearch = () => {
    const found = dummyCars.find(
      (c) => c.vin.toLowerCase() === vinSearch.toLowerCase()
    );
    if (found) {
      setCar({ ...found });
      setSuccessMessage(null);
    } else {
      alert("Car not found");
      setCar(null);
    }
  };

  const handleChange = <K extends keyof Car>(key: K, value: Car[K]) => {
    if (!car) return;
    setCar({ ...car, [key]: value });
  };

  const onToggle = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  const filteredEquipment = equipmentDummyData.filter((e) =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );

  const sortedEquipment = [
    ...filteredEquipment.filter((eq) => selectedCodes.includes(eq.code)),
    ...filteredEquipment.filter((eq) => !selectedCodes.includes(eq.code))
  ];

  const handleSave = () => {
    if (!car) return;
    // Apply selected equipment
    const updatedCar = { ...car, equipment: selectedCodes };
    setCar(updatedCar);
    setSuccessMessage("Car successfully updated!");
  };

  return (
    <div className="modal-box max-w-6xl bg-base-200 animate-fadeIn relative overflow-y-auto max-h-[95vh]">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Edit Car</h2>

      {/* VIN Search */}
      <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-sm font-semibold mb-3">Find Car by VIN</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              label="VIN"
              value={vinSearch}
              onChange={(e) => setVinSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Current Car Info */}
      {/* {car && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6 animate-fadeIn">
          <h3 className="text-sm font-semibold mb-4">Current Car Info</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="opacity-60">Make / Model</p>
              <p className="font-medium">{car.make} {car.model}</p>
            </div>
            <div>
              <p className="opacity-60">Year</p>
              <p className="font-medium">{car.year}</p>
            </div>
            <div>
              <p className="opacity-60">Mileage</p>
              <p className="font-medium">{car.mileage.toLocaleString()} km</p>
            </div>
            <div>
              <p className="opacity-60">Status</p>
              <span className="badge badge-outline">{car.status}</span>
            </div>
            <div className="md:col-span-3">
              <p className="opacity-60">Equipment</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {car.equipment.map((code) => (
                  <span key={code} className="badge badge-primary badge-outline">
                    {equipmentDummyData.find((e) => e.code === code)?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Full Edit Form */}
      {car && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="bg-base-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Basic Info</h3>
              <Input label="VIN" value={car.vin} onChange={(e) => handleChange("vin", e.target.value)} />
              <Input label="Make" value={car.make} onChange={(e) => handleChange("make", e.target.value)} />
              <Input label="Model" value={car.model} onChange={(e) => handleChange("model", e.target.value)} />
              <Input label="Year" type="number" value={car.year} onChange={(e) => handleChange("year", Number(e.target.value))} />
              <Input label="Mileage" type="number" value={car.mileage} onChange={(e) => handleChange("mileage", Number(e.target.value))} />
              <Input label="Location" value={car.location} onChange={(e) => handleChange("location", e.target.value)} />
            </div>

            {/* Right column */}
            <div className="bg-base-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Engine & Details</h3>
              <Input label="Power (HP)" type="number" value={car.powerHp ?? ""} onChange={(e) => handleChange("powerHp", Number(e.target.value))} />
              <Input label="Engine Displacement" type="number" value={car.engineDisplacement ?? ""} onChange={(e) => handleChange("engineDisplacement", Number(e.target.value))} />
              <Select label="Fuel Type" options={["Petrol", "Diesel", "Electric", "Hybrid"]} value={car.fuelType} onChange={(val) => handleChange("fuelType", val)} />
              <Select label="Additional Fuel Type" options={["", "LPG", "CNG"]} value={car.additionalFuelType ?? ""} onChange={(val) => handleChange("additionalFuelType", val)} />
              <Select label="Transmission" options={["Manual", "Automatic"]} value={car.transmission} onChange={(val) => handleChange("transmission", val)} />
              <Select label="Drive Type" options={["FWD", "RWD", "AWD"]} value={car.driveType} onChange={(val) => handleChange("driveType", val)} />
              <Input label="Body Type" value={car.body} onChange={(e) => handleChange("body", e.target.value)} />
              <Input label="Registration" value={car.registration} onChange={(e) => handleChange("registration", e.target.value)} />
              <Select label="Status" options={["Available", "Reserved", "Archived"]} value={car.status} onChange={(val) => handleChange("status", val as Car["status"])} />
            </div>
          </div>

          {/* Equipment */}
          <div className="bg-base-100 p-4 mt-6 rounded-xl">
            <h3 className="font-semibold mb-3">Equipment</h3>
            <Input placeholder="Search equipment..." value={equipmentSearch} onChange={(e) => setEquipmentSearch(e.target.value)} />
            <div className="grid md:grid-cols-2 gap-2 max-h-64 overflow-y-auto mt-4">
              {sortedEquipment.map((eq) => (
                <label key={eq.code} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" checked={selectedCodes.includes(eq.code)} onChange={() => onToggle(eq.code)} />
                  <span className="text-sm">{eq.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-lg btn-primary mt-6 w-full" type="button" onClick={handleSave}>
            Save Changes
          </button>
        </>
      )}
    </div>
  );
};
