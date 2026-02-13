import type { EquipmentDto } from "./EquipmentDto";

export interface CarDto {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  additionalFuelType: AdditionalFuelType;
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
  Petrol,
  Diesel,
  Electric,
  Hybrid
}

export enum AdditionalFuelType {
  None,
  LPG,
  CNG
}

export enum TransmissionType {
  Manual,
  Automatic
}

export enum DriveType {
  FWD,
  RWD,
  AWD,
  FourWD
}

export enum CarStatus {
  Active,
  Inactive,
  Sold
}
