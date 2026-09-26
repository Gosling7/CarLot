import type { EquipmentDto } from "./EquipmentDto";

export interface CarDto {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  additionalFuelType: AdditionalFuelType | null;
  powerHp: number;
  engineDisplacement?: number;
  turbocharged: boolean;
  body: string;
  registrationPlate: string;
  driveType: DriveType;
  mileageKm: number;
  location: string;
  version: number;
  createdAtUtc: string;
  updatedAtUtc?: string;
  status: CarStatus;
  equipment: ReadonlyArray<EquipmentDto>;
}

export enum FuelType {
  Petrol = "Petrol",
  Diesel = "Diesel",
  Electric = "Electric",
  Hybrid = "Hybrid",
  LPG = "LPG",
}

export enum AdditionalFuelType {
  LPG = "LPG",
  CNG = "CNG",
}

export enum TransmissionType {
  Manual = "Manual",
  Automatic = "Automatic",
  SemiAutomatic = "SemiAutomatic",
  CVT = "CVT",
}

export enum DriveType {
  FWD = "FWD",
  RWD = "RWD",
  AWD = "AWD",
  FourWD = "FourWD",
}

export enum CarStatus {
  Received = "Received",
  NeedUpdate = "NeedUpdate",
  ReadyForListing = "ReadyForListing",
  LiveListing = "LiveListing",
  Archived = "Archived",
}
