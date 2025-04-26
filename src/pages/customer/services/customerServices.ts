import api from "../../../auth/services/api";
import { ICustomer } from "./types";

export class customerServices {
  static async get() {
    const { data } = await api.get("/customers/all");

    return data;
  }

  static async create(values: ICustomer) {
    const response = await api.post<ICustomer>("/customer", values);
    return response.data;
  }

  static async update(id: string, values: ICustomer) {
    const response = await api.put<ICustomer>(`/customer/${id}`, values);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`/customer/${id}`);
  }

  static async getById(id: string) {
    const response = await api.get<ICustomer>(`/customer/${id}`);
    return response.data;
  }
}
