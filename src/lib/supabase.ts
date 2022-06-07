import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServerKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServerKey);

// Export for usage by the rest of the app
export { supabase };

// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPBASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const client = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);

// export { client as supabaseClient };  //Should be the same meaning as the above
