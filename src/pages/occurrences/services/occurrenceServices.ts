import api from "../../../auth/services/api";
import { ICustomer } from "../../customer/services/types";
import { IOccurrence } from "./types";

export class occurrenceServices {
  static async get() {
    const { data } = await api.get("/occurrences/all");

    return data;
  }

  static async create(values: IOccurrence) {
    const response = await api.post<IOccurrence>("/occurrence", values);
    return response.data;
  }

  static async update(id: string, values: IOccurrence) {
    const response = await api.put<IOccurrence>(`/occurrence/${id}`, values);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`/occurrence/${id}`);
  }

  static async getById(id: string) {
    const response = await api.get<IOccurrence>(`/occurrence/${id}`);
    return response.data;
  }

  static async getCollaborators() {
    const response = await api.get<any[]>(`/collaborators/all`);
    return response.data;
  }

  static async getCustomers() {
    const response = await api.get<ICustomer[]>(`/customers/all`);
    return response.data;
  }
}
