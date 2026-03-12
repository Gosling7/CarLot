import { useState } from "react";
import { Input } from "../../components/Input";
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

type Listing = {
  vin: string;
  price: number;
  description: string;
  status: "Active" | "Draft" | "Archived";
};

// Dummy catalog
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
  }
];

// Dummy listings
const dummyListings: Listing[] = [
  {
    vin: "WBAXX12345BMW",
    price: 55000,
    description: "Well maintained BMW 330i, single owner, full service history.",
    status: "Active"
  }
];

export const EditListingForm = () => {
  const [vinSearch, setVinSearch] = useState("");
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [vinNotFound, setVinNotFound] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = () => {
    const foundListing = dummyListings.find(l => l.vin.toLowerCase() === vinSearch.toLowerCase());
    const foundCar = dummyCars.find(c => c.vin.toLowerCase() === vinSearch.toLowerCase());

    if (foundListing && foundCar) {
      setListing({ ...foundListing });
      setSelectedCar({ ...foundCar });
      setVinNotFound(false);
      setSuccessMessage(null);
    } else {
      setListing(null);
      setSelectedCar(null);
      setVinNotFound(true);
    }
  };

  const handleChange = <K extends keyof Listing>(key: K, value: Listing[K]) => {
    if (!listing) return;
    setListing({ ...listing, [key]: value });
  };

  const handleSave = () => {
    if (!listing) return;
    console.log("Saving listing:", listing);
    setSuccessMessage("Listing successfully updated!");
  };

  return (
    <div className="modal-box max-w-4xl bg-base-200 animate-fadeIn relative max-h-[95vh] overflow-y-auto">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
          ✕
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Edit Listing</h2>

      {/* VIN Search */}
      <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-sm font-semibold mb-3">Find Listing by VIN</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              label="VIN"
              value={vinSearch}
              onChange={(e) => setVinSearch(e.target.value)}
            />
            {vinNotFound && (
              <p className="text-error text-xs mt-1">No listing found for a car with this VIN</p>
            )}
          </div>
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Car Snapshot */}
      {selectedCar && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6 animate-fadeIn">
          <h3 className="text-sm font-semibold mb-4">Car Snapshot</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="opacity-60">Make / Model</p>
              <p className="font-medium">{selectedCar.make} {selectedCar.model}</p>
            </div>
            <div>
              <p className="opacity-60">Year</p>
              <p className="font-medium">{selectedCar.year}</p>
            </div>
            <div>
              <p className="opacity-60">Mileage</p>
              <p className="font-medium">{selectedCar.mileage.toLocaleString()} km</p>
            </div>
            <div>
              <p className="opacity-60">Body Type</p>
              <p className="font-medium">{selectedCar.body}</p>
            </div>
            <div className="md:col-span-3">
              <p className="opacity-60">Equipment</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedCar.equipment.map((code) => (
                  <span key={code} className="badge badge-primary badge-outline">{code}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Listing Form */}
      {listing && (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm mb-6">
          <h3 className="font-semibold mb-4">Listing Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Price"
              type="number"
              value={listing.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
            <Select
              label="Status"
              options={["Active", "Draft", "Archived"]}
              value={listing.status}
              onChange={(val) => handleChange("status", val as Listing["status"])}
            />
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={listing.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-lg btn-primary mt-4 w-full"
            type="button"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-success/10 border border-success rounded-xl p-5 mt-4 animate-fadeIn">
          <h4 className="font-semibold text-success mb-1">Success</h4>
          <p className="text-sm opacity-80">{successMessage}</p>
        </div>
      )}
    </div>
  );
};
