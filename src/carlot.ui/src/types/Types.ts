export interface Equipment {
  name: string;
  code: string;
}

export interface CarFormState {
  vin: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  turbocharged: boolean;
  equipmentIds: string[];
}
