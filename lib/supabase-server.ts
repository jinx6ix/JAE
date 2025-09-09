import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          return (await cookies()).get(name)?.value;
        },
        async set(name, value, options) {
          (await cookies()).set(name, value, options);
        },
        async remove(name, options) {
          (await cookies()).delete(name);
        },
      },
    }
  );
}
