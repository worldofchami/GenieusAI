import { User } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function useAuth({ cookies }: { cookies: () => ReadonlyRequestCookies }): { user: User | null } {
    const userCookie = cookies()?.get(`sb-${process.env.SUPABASE_ID}-auth-token`);
    return {
        user: userCookie ? JSON.parse(userCookie.value)?.["user"] : null
    }
}