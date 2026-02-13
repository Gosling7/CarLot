import type { AdditionalFuelType, DriveType, FuelType, TransmissionType } from "./CarDto";

export interface AddCarRequest {
  vin: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  additionalFuelType: AdditionalFuelType;
  transmission: TransmissionType;
  powerHp: number;
  engineDisplacement?: number;
  turbocharged: boolean;
  body: string;
  registrationPlate: string;
  driveType: DriveType;
  mileageKm: number;
  location: string;
  equipment: ReadonlyArray<string>;
}