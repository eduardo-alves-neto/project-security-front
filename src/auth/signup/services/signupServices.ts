import { supabase } from "../../../supabase";

export interface ISignup {
  email: string;
  password: string;
}

export class SignUp {
  static async post({ email, password }: ISignup) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { data, error };
  }
}
