import api from "../../../auth/services/api";
import { ICustomer } from "./types";

export class customerServices {
  static async get() {
    const { data } = await api.get("/clientes");

    return data;
  }

  static async create(values: ICustomer) {
    const response = await api.post<ICustomer>("/clientes", values);
    return response.data;
  }

  static async update(id: string, values: ICustomer) {
    const response = await api.put<ICustomer>(`/clientes/${id}`, values);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`/clientes/${id}`);
  }

  static async getById(id: string) {
    const response = await api.get<ICustomer>(`/clientes/${id}`);
    return response.data;
  }
}
