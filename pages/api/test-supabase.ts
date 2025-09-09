// pages/api/test-supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "test@example.com",
    password: "yourpassword",
  })

  res.status(200).json({ data, error })
}
