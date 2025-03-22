import api from "../../../auth/services/api";
import { ICustomer } from "./types";

export class customerServices {
  static async get({ from, to }: { from: number; to: number }) {
    const response = await api.get<{ data: ICustomer[]; total: number }>("/clientes", {
      params: {
        skip: from,
        take: to - from + 1,
      },
    });

    return {
      data: response.data.data,
      count: response.data.total,
    };
  }

  static async create(values: ICustomer) {
    const response = await api.post<ICustomer>("/clientes", values);
    return response.data;
  }

  static async update(id: number, values: ICustomer) {
    const response = await api.put<ICustomer>(`/clientes/${id}`, values);
    return response.data;
  }

  static async delete(id: number) {
    await api.delete(`/clientes/${id}`);
  }

  static async getById(id: number) {
    const response = await api.get<ICustomer>(`/clientes/${id}`);
    return response.data;
  }
}
