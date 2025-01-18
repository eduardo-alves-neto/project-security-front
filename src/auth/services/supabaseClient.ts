import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fdreugxwpzuktmjzsjxj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcmV1Z3h3cHp1a3RtanpzanhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTExNjQsImV4cCI6MjA1MjAyNzE2NH0.GALK-kIHv3PmyK9lOS-swnJ72IY9qomfRuhgrrKjKXU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
