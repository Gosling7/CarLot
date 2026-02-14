import { useState } from "react";
import type { Equipment } from "../../types/Types";
import Input from "../../components/Input";

type CarPreview = {
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  status: string;
  equipment: string[];
};

const dummyCars: CarPreview[] = [
  {
    vin: "WBAXX12345BMW",
    make: "BMW",
    model: "330i",
    year: 2021,
    mileage: 42000,
    status: "Available",
    equipment: ["AC", "LANE_ASSIST", "ACC"]
  },
  {
    vin: "WAUZZZ8V7KAUDI",
    make: "Audi",
    model: "A4",
    year: 2019,
    mileage: 67000,
    status: "Reserved",
    equipment: ["AC", "LEATHER", "BLUETOOTH"]
  },
  {
    vin: "VWZZZ1KZ6DWGOLF",
    make: "VW",
    model: "Golf GTI",
    year: 2018,
    mileage: 89000,
    status: "Archived",
    equipment: ["AC", "SUNROOF", "APPLE_CARPLAY"]
  }
];

const equipmentDummyData: Equipment[] = [
  { name: "Air Conditioning", code: "AC" },
  { name: "Lane Assist", code: "LANE_ASSIST" },
  { name: "Adaptive Cruise Control", code: "ACC" },
  { name: "Blind Spot Monitoring", code: "BLIND_SPOT" },
  { name: "Leather Upholstery", code: "LEATHER" },
  { name: "Sunroof", code: "SUNROOF" },
  { name: "Apple CarPlay", code: "APPLE_CARPLAY" },
  { name: "Bluetooth Connectivity", code: "BLUETOOTH" }
];

export const UpdateCarForm = () => {
  const [vinSearch, setVinSearch] = useState("");
  const [car, setCar] = useState<CarPreview | null>(null);

  const [selectedSection, setSelectedSection] = useState<
    "mileage" | "equipment" | "status" | null
  >(null);

  const [mileage, setMileage] = useState<number>(0);
  const [status, setStatus] = useState("Available");
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = () => {
    const found = dummyCars.find(c =>
      c.vin.toLowerCase() === vinSearch.toLowerCase()
    );

    if (found) {
      setCar(found);
      setMileage(found.mileage);
      setStatus(found.status);
      setSelectedCodes(found.equipment);
      setSelectedSection(null);
      setSuccessMessage(null);
    } else {
      setCar(null);
      alert("Car not found");
    }
  };

  const handleSelectSection = (
    section: "mileage" | "equipment" | "status"
  ) => {
    setSelectedSection(section);
    setSuccessMessage(null);
  };

  const filteredEquipment = equipmentDummyData.filter(e =>
    e.name.toLowerCase().includes(equipmentSearch.toLowerCase())
  );

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

  /* ==============================
     SAVE HANDLERS (Now Update Car)
     ============================== */

  const saveMileage = () => {
    if (!car) return;

    const updatedCar = { ...car, mileage };
    setCar(updatedCar);

    setSuccessMessage("Mileage successfully updated.");
    setSelectedSection(null);
  };

  const saveEquipment = () => {
    if (!car) return;

    const updatedCar = { ...car, equipment: selectedCodes };
    setCar(updatedCar);

    setSuccessMessage("Equipment successfully updated.");
    setSelectedSection(null);
  };

  const saveStatus = () => {
    if (!car) return;

    const updatedCar = { ...car, status };
    setCar(updatedCar);

    setSuccessMessage("Status successfully updated.");
    setSelectedSection(null);
  };

  return (
    <div className="modal-box max-w-5xl bg-base-200 animate-fadeIn relative">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Update Car</h2>

      {/* VIN SEARCH */}
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
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <p className="text-xs mt-2 opacity-70">
          Try: WBAXX12345BMW, WAUZZZ8V7KAUDI, VWZZZ1KZ6DWGOLF
        </p>
      </div>

      {/* CAR PREVIEW */}
      {car && (
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
              <span className="badge badge-outline">
                {car.status}
              </span>
            </div>

            <div className="md:col-span-3">
              <p className="opacity-60">Equipment</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {car.equipment.map(code => (
                  <span key={code} className="badge badge-primary badge-outline">
                    {equipmentDummyData.find(e => e.code === code)?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE OPTIONS */}
      {car && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-sm font-semibold mb-4">
            What do you want to update?
          </h3>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className={`btn ${selectedSection === "mileage" ? "btn-primary" : "btn-outline"}`}
              onClick={() => handleSelectSection("mileage")}
            >
              Mileage
            </button>

            <button
              type="button"
              className={`btn ${selectedSection === "equipment" ? "btn-primary" : "btn-outline"}`}
              onClick={() => handleSelectSection("equipment")}
            >
              Equipment
            </button>

            <button
              type="button"
              className={`btn ${selectedSection === "status" ? "btn-primary" : "btn-outline"}`}
              onClick={() => handleSelectSection("status")}
            >
              Status
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="bg-success/10 border border-success rounded-xl p-5 mb-6 animate-fadeIn">
          <h4 className="font-semibold text-success mb-1">
            Update Successful
          </h4>
          <p className="text-sm opacity-80">
            {successMessage}
          </p>
        </div>
      )}

      {/* MILEAGE */}
      {selectedSection === "mileage" && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-sm font-semibold mb-4">Update Mileage</h3>

          <Input
            label="New Mileage (KM)"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
          />

          <button
            className="btn btn-primary mt-4"
            type="button"
            onClick={saveMileage}
          >
            Save Mileage
          </button>
        </div>
      )}

      {/* EQUIPMENT */}
      {selectedSection === "equipment" && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-sm font-semibold mb-4">Update Equipment</h3>

          <Input
            placeholder="Search equipment..."
            value={equipmentSearch}
            onChange={(e) => setEquipmentSearch(e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-2 max-h-64 overflow-y-auto mt-4">
            {sortedEquipment.map(eq => (
              <label
                key={eq.code}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedCodes.includes(eq.code)}
                  onChange={() => onToggle(eq.code)}
                />
                <span className="text-sm">{eq.name}</span>
              </label>
            ))}
          </div>

          <button
            className="btn btn-primary mt-4"
            type="button"
            onClick={saveEquipment}
          >
            Save Equipment
          </button>
        </div>
      )}

      {/* STATUS */}
      {selectedSection === "status" && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-sm font-semibold mb-4">Update Status</h3>

          <select
            className="select select-bordered w-full max-w-xs"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Archived">Archived</option>
          </select>

          <button
            className="btn btn-primary mt-4"
            type="button"
            onClick={saveStatus}
          >
            Save Status
          </button>
        </div>
      )}
    </div>
  );
};
