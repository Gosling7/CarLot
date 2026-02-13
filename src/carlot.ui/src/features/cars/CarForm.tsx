import { useState } from "react";
import type { Equipment } from "../../types/Types";
import Select from "../../components/Select";
import Input from "../../components/Input";

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

export const CarForm = () => {
  console.log("CarForm rendered!")

  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [vin, setVin] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  console.log(vin);

  const filteredEquipment = equipmentDummyData.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()));

  const onToggle = (code: string) => {
    setSelectedCodes(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const sortedEquipment = [
    ...filteredEquipment.filter(eq => selectedCodes.includes(eq.code)),
    ...filteredEquipment.filter(eq => !selectedCodes.includes(eq.code)),
  ];

  return (
    <div className="max-w-5xl bg-base-200 p-6 rounded-lg max-h-[95vh] overflow-y-auto modal-box">
      <div className="flex flex-col gap-4">

        <form method="dialog" className="pb-4">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <div>

          <div className="bg-base-100 p-4 rounded-lg">
            <h3 className="mb-2 text-sm font-semibold">
              Basic Info
            </h3>
            <div className="grid md:grid-cols-2 gap-6 p-4  rounded-lg">
              <Input label={"VIN"} onChange={(e) => setVin(e.target.value)} />
              <Input label={"Make"} />
              <Input label={"Model"} />
              <Input label={"Year"} type="number" />
            </div>

          </div>
        </div>

        <div className="bg-base-100 p-4">
          <h3 className="mb-2 text-sm font-semibold">
            Engine & Fuel
          </h3>

          <div className="grid md:grid-cols-2 gap-6 p-4  rounded-lg">
            <Select label="Fuel Type" options={["Petrol", "Diesel", "Electric", "Hybrid"]} />
            <Select label="Additional Fuel Type" options={["LPG", "CNG"]} />
            <Input label="Power (HP)" type="number" />
            <Input label="Engine Displacement" type="number" />
            <Input label="Turbocharged" type="checkbox" />
          </div>
        </div>

        <div className="bg-base-100 p-4">
          <h3 className="mb-2 text-sm font-semibold">
            Drivetrain & Body
          </h3>

          <div className="grid md:grid-cols-2 gap-6 p-4 rounded-lg">
            <Select label="Transmission" options={["Manual", "Automatic"]} />
            <Select label="Drive Type" options={["FWD", "RWD", "AWD"]} />
            <Input label="Body Type" />
          </div>
        </div>

        <div className="bg-base-100 p-4">
          <h3 className="mb-2 text-sm font-semibold ">
            Registration & Usage
          </h3>

          <div className="grid md:grid-cols-2 gap-6 p-4 rounded-lg">
            <Input label="Registration Plate" />
            <Input label="Mileage (KM)" type="number" />
            <Input label="Location" />
          </div>
        </div>

        <div className="bg-base-100 p-4">
          <h3 className="mb-2 text-sm font-semibold ">
            Equipment
          </h3>

          <div className=" rounded-lg p-4 space-y-3">
            <Input
              placeholder="Search equipment..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <p className="text-xs ">
              {filteredEquipment.length} result{filteredEquipment.length !== 1 && "s"}
            </p>

            <div className="grid md:grid-cols-2 gap-2 max-h-64 min-h-64 overflow-y-scroll content-start">
              {sortedEquipment.map(eq => (
                <label
                  key={eq.code}
                  className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 "
                    checked={selectedCodes.includes(eq.code)}
                    onChange={() => onToggle(eq.code)}
                  />
                  <span className="text-sm ">
                    {eq.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="btn btn-lg text-white py-3 rounded-lg font-semibold">
          Add Car
        </button>

      </div>
    </div>
  );
}