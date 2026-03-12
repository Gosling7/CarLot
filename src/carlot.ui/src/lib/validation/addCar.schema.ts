import {
  AdditionalFuelType,
  DriveType,
  FuelType,
  TransmissionType,
} from "@/types/CarDto";
import z from "zod";

export const AddCarSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(new Date().getFullYear()),
  mileageKm: z.number().min(0),

  fuelType: z.enum(FuelType),
  additionalFuelType: z.enum(AdditionalFuelType),
  transmission: z.enum(TransmissionType),
  driveType: z.enum(DriveType),

  powerHp: z.number().min(1),
  engineDisplacement: z.number().optional(),
  turbocharged: z.boolean(),

  body: z.string().min(1),
  registrationPlate: z.string().min(1),
  location: z.string().min(1),

  equipmentCodes: z.array(z.string()),
});

export type AddCarFormValues = z.infer<typeof AddCarSchema>;
