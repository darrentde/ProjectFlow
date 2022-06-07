import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/lib/supabase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}

// Additional related to api
// iAmport { supabase } from "../supabase";

// export default function handler(req, res) {
//   supabase.auth.api.setAuthCookie(req, res);
// }
