import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zplhsgsvywvegyhmfjlp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbGhzZ3N2eXd2ZWd5aG1mamxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTAyNTAsImV4cCI6MjAzNDc4NjI1MH0.aRDvuWaChWwW5hiG7RQ0ZVt_8kSgxVmP1mhV9wgZgdY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
