import { supabase } from "../../../supabase";
import { ICustomer } from "./types";

export class customerServices {
  static async get({ from, to }: { from: number; to: number }) {
    const res = await supabase
      .from("customerss")
      .select("*", { count: "exact" })
      .range(from, to);

    return res;
  }

  static async create(values: ICustomer) {
    const res = await supabase.from("customers").insert(values);

    return res;
  }

  static async delete(id: number) {
    const res = await supabase.from("customers").delete().eq("id", id);
    return res;
  }
}
