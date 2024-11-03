import { createClient } from "@supabase/supabase-js";

import { Database } from "./supabase.types";

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL;
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
