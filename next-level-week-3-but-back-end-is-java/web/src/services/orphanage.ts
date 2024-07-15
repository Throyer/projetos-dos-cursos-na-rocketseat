import { api } from "./api";

export interface OrphanageInfo {
  id: string
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  whatsapp: string;
  open_on_weekends: boolean;
  images: { url: string }[];
}

export const allOrphanages = async () => {
  const response = await api.get<OrphanageInfo[]>("/orphanages");
  return response.data;
}

export const orphanageById = async (id: string) => {
  const response = await api.get<OrphanageInfo>(`/orphanages/${id}`);
  return response.data;
}

export const createOrphanage = async (body: any): Promise<void> => {
  api.post("/orphanages", body);
}