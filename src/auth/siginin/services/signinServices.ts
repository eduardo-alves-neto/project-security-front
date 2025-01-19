import { supabase } from "../../../supabase";

export interface ISignin {
  email: string;
  password: string;
}

export class SignIn {
  static async post({ email, password }: ISignin) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }
}
