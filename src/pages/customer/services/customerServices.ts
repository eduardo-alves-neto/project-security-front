import { supabase } from "../../../supabase";

export class customerServices {
  static async get({ from, to }: { from: number; to: number }) {
    const res = await supabase
      .from("customers")
      .select("*", { count: "exact" })
      .range(from, to);

    return res;
  }
}
