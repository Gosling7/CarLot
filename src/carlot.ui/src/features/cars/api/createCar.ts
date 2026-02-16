import { api } from "../../../shared/axios";

interface CreateCarInput {
  make: string;
  model: string;
  year: string;
}

export async function createCar(data: CreateCarInput) {
  const response = await api.post("/cars", data)
  return response.data;
}