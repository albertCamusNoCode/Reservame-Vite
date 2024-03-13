import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dlziynapzdavkuymwnaf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseml5bmFwemRhdmt1eW13bmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MTIyODcsImV4cCI6MjAwNTM4ODI4N30.2KSP4NV57USOcppLecT167am0zYGRsChQklcKkpDIiM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
