import { Input, InputZod } from "@/components/Input";
import Select, { SelectRHF } from "@/components/Select";
import { useEffect, useState } from "react";
import { DashboardModal } from "../DashboardModal";
import { CloseModalButton } from "../CloseModalButton";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { CarStatus } from "@/types/CarDto";
import { useFetchCarByVin } from "../../hooks/useFetchCarByVin";
import { useUpdateListing } from "../../hooks/useUpdateListing";
import { Form } from "@/components/Form";
import { useForm } from "react-hook-form";
import { UpdateListingSchema, type UpdateListingForm } from "@/lib/validation/updateListing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateListingRequest } from "@/types/requests/UpdateListingRequest";
import { ListingStatus } from "@/types/enums/ListingStatus";
import type { AxiosError } from "axios";
import { setErrorsInForm } from "@/lib/FormUtils";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { useFetchListingByVin } from "../../hooks/useFetchListingByVin";
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

const defaultUpdateListingRequest: UpdateListingRequest = {
  vin: "",
  price: 0,
  description: "",
  status: ListingStatus.Draft
}

export const EditListingForm = () => {
  const [vinSearch, setVinSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fetchedVin, setFetchedVin] = useState("");

  const { data: car } = useFetchCarByVin({
    vin: fetchedVin,
    enabled: fetchedVin !== ""
  });

  const { data: listing } = useFetchListingByVin({ vin: fetchedVin, enabled: car !== null && car !== undefined })

  const updateListing = useUpdateListing({
    vin: car?.vin,
    onSuccess: () => setSuccessMessage("Listing successfully updated.")
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors: updateListingErrors }
  } = useForm<UpdateListingForm>({
    resolver: zodResolver(UpdateListingSchema),
    defaultValues: defaultUpdateListingRequest,
    mode: "onBlur"
  });

  useEffect(() => {
    if (car) {
      setValue("vin", car.vin, { shouldValidate: true, shouldDirty: true });
    }

    if (listing) {
      setValue("description", listing.description, { shouldValidate: true, shouldDirty: true });
      setValue("price", listing.price, { shouldValidate: true, shouldDirty: true });
    }
  }, [car, listing, setValue]);

  const handleSearch = () => {
    setFetchedVin(vinSearch);
  };

  function onSubmit(updatedListing: UpdateListingRequest) {
    updateListing.mutate(updatedListing, {
      onError: (err: AxiosError) => {
        const problemDetails = err.response?.data as ProblemDetails;
        setErrorsInForm(problemDetails, setError);
      },
    });
  }

  return (
    <DashboardModal>
      <CloseModalButton />
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-bold">Edit Listing</h2>

        <Section header="Find Listing">
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

        {/* Car Snapshot */}
        {car && (
          <Section header="Car Info">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <ListingPreviewInfo label={"Make / Model"} value={`${car.make} ${car.model}`} />
              <ListingPreviewInfo label={"Year"} value={car.year} />
              <ListingPreviewInfo label={"Mileage"} value={`${car.mileageKm.toLocaleString()} km`} />

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

        {/* Edit Listing Form */}
        {listing && (
          <Form
            header=""
            // onSubmit={handleSubmit(onSubmit, (errors) => console.log("validation failed", errors))}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Section header={"Listing Details"} >
              <div className="grid md:grid-cols-2 gap-6">
                <InputZod
                  label="Price" {...register("price", { valueAsNumber: true })}
                  error={updateListingErrors.price?.message}
                />

                {/* TODO: clean up the mess with Select, why rhf and not zod like InputZod */}
                <SelectRHF
                  label="Status"
                  options={["Active", "Draft", "Archived"]}
                  value={status}
                  onChange={(val) => setStatus(val as typeof status)}
                />
              </div>

              <TextAreaZod
                label="Description" {...register("description")}
                error={updateListingErrors.description?.message}
              />
            </Section>

            {car && (
              <Button label={"Save Changes"} type="submit" />
            )}
          </Form>
        )}

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
const ListingPreviewInfo = ({ label, value }: { label: string, value: string }) => {
  return (
    <div>
      <p className="opacity-60">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}