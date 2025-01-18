import { supabase } from "../../services/supabaseClient";

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data }; 
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    return { error: error.message };
  }
};
