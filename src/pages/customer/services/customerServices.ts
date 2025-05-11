import api from "../../../auth/services/api";
import { IEmailForm } from "../list/views/SendEmailView";
import { IContract, ICustomer } from "./types";

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

  static async notify(emailData: IEmailForm) {
    const response = await api.post("/customer/notify", emailData);

    return response.data;
  }
}

export class contractServices {
  static async get() {
    const { data } = await api.get("/contracts/all");

    return data;
  }

  static async create(values: IContract) {
    const response = await api.post<IContract>("/contract", values);
    return response.data;
  }

  static async update(id: string, values: IContract) {
    const response = await api.put<IContract>(`/contract/${id}`, values);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`/contract/${id}`);
  }

  static async getById(id: string) {
    const response = await api.get<IContract>(`/contract/${id}`);
    return response.data;
  }
}
