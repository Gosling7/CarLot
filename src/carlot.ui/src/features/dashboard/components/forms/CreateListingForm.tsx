import { Input, InputZod } from "@/components/Input";
import Select from "@/components/Select";
import { useEffect, useState } from "react";
import { DashboardModal } from "../DashboardModal";
import { CloseModalButton } from "../CloseModalButton";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { CarStatus } from "@/types/CarDto";
import { useFetchCarByVin } from "../../hooks/useFetchCarByVin";
import { useForm } from "react-hook-form";
import type { AddListingRequest } from "@/types/AddListingRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddListingSchema, type AddListingFormValues } from "@/lib/validation/addListing.schema";
import { useCreateListing } from "../../hooks/useCreateListing";
import type { AxiosError } from "axios";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { setErrorsInForm } from "@/lib/FormUtils";
import { Form } from "@/components/Form";
import { TextAreaZod } from "@/components/TextArea";

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

// Dummy catalog cars
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

const defaultAddListingRequest: AddListingRequest = {
  vin: "",
  price: 0,
  description: ""
}

export const CreateListingForm = () => {
  const [vinSearch, setVinSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"Active" | "Draft" | "Archived">("Active");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fetchedVin, setFetchedVin] = useState("");

  const { data: car } = useFetchCarByVin({
    vin: fetchedVin,
    enabled: fetchedVin !== ""
  });

  // TODO: useForm z walidacja zod
  const {
    register,
    handleSubmit,
    // getValues,
    setValue,
    setError,
    formState: { errors }
  } = useForm<AddListingFormValues>({
    resolver: zodResolver(AddListingSchema),
    defaultValues: defaultAddListingRequest,
    mode: "onBlur"
  });

  useEffect(() => {
    if (car) {
      setValue("vin", car.vin, { shouldValidate: true, shouldDirty: true });
    }
  }, [car, setValue]);

  const { mutate } = useCreateListing();
  const onSubmit = (newListing: AddListingRequest) => {
    mutate(newListing, {
      onError: (err: AxiosError) => {
        const problemDetails = err.response?.data as ProblemDetails;
        setErrorsInForm(problemDetails, setError); // sprawdzic dorzucona rure z typem AddListingRequest i naprawic
      },
    });
  };

  const handleSearch = () => {
    // const car = dummyCars.find(c => c.vin.toLowerCase() === vinSearch.toLowerCase());
    // if (car) {
    //   setSelectedCar(car);
    //   setSuccessMessage(null);
    // } else {
    //   alert("Car not found in catalog");
    //   setSelectedCar(null);
    // }

    setFetchedVin(vinSearch);
  };

  // const handleCreateListing = () => {
  //   if (!selectedCar) return;
  //   // Normally call API here
  //   console.log("Creating listing for", selectedCar.vin, { price, description, status });
  //   setSuccessMessage("Listing successfully created!");
  // };

  return (
    <DashboardModal>
      <CloseModalButton />
      <div className="grid grid-cols-1 gap-6">

        <h2 className="text-2xl font-bold">Create Listing</h2>

        <Section header="Find in Catalog">
          <div className="flex gap-4 items-end">
            <div className="w-full">
              <Input
                label="VIN"
                value={vinSearch}
                onChange={(e) => setVinSearch(e.target.value)}
              />
            </div>

            <Button label={"Search"} onClick={handleSearch} />
          </div>
        </Section>

        {car && (
          <Section header="Car Info">
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
                      {car.equipment.find(e => e.code === eq.code)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* {car && (
          <Section header={"Listing Details"} >
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <Select
                label="Status"
                options={["Active", "Draft", "Archived"]}
                value={status}
                onChange={(val) => setStatus(val as typeof status)}
              />
            </div>

            <fieldset className="fieldset mx-2 mt-2">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24 rounded-lg w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </fieldset>
          </Section>
        )} */}

        {car && (
          <Form
            header=""
            onSubmit={handleSubmit(onSubmit, (errors) => console.log("validation failed", errors))}>
            <Section header={"Listing Details"} >
              <div className="grid md:grid-cols-2 gap-6">
                <InputZod
                  label="Price" {...register("price", { valueAsNumber: true })}
                  error={errors.price?.message}
                />
                <Select
                  label="Status"
                  options={["Active", "Draft", "Archived"]}
                  value={status}
                  onChange={(val) => setStatus(val as typeof status)}
                />
              </div>

              <TextAreaZod
                label="Description" {...register("description")}
                error={errors.description?.message}
              />
            </Section>

            <Button label={"Save Changes"} type="submit" />
          </Form>
        )}

        {/* {car && (
          <Button label={"Save Changes"} type="submit" />
        )} */}

        {/* {selectedCar && (
          <button
            className="btn btn-lg btn-primary mt-4 w-full"
            type="button"
            onClick={handleCreateListing}
          >
            Create Listing
          </button>
        )} */}

        {successMessage && (
          <div className="bg-success/10 border border-success rounded-xl p-5 mt-4 animate-fadeIn">
            <h4 className="font-semibold text-success mb-1">Success</h4>
            <p className="text-sm opacity-80">{successMessage}</p>
          </div>
        )}
      </div>
    </DashboardModal>

  );
};

// TODO: wspolne z UpdateCarForm i create listing
const CarPreviewInfo = ({ label, value }: { label: string, value: string }) => {
  return (
    <div>
      <p className="opacity-60">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}