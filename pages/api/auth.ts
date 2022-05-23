import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/lib/supabase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
