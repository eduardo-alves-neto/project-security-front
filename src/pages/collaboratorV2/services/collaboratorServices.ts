import api from "../../../auth/services/api";
import { ICollaborator } from "./types";

export class collaboratorServices {
  static async get() {
    const { data } = await api.get("/collaborators/all");

    return data;
  }

  static async create(values: ICollaborator) {
    const response = await api.post<ICollaborator>("/collaborator", values);
    return response.data;
  }

  static async update(id: string, values: ICollaborator) {
    const response = await api.put<ICollaborator>(`/collaborator/${id}`, values);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`/collaborator/${id}`);
  }

  static async getById(id: string) {
    const response = await api.get<ICollaborator>(`/collaborator/${id}`);
    return response.data;
  }
}
