import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../(util)/components";

export const dynamic = "force-dynamic";


export default async function Page() {
    return (
        <>
        <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-sm font-light">Successfully signed out!</span>
            <span className="text-xs text-contrastlt mb-4">Sad to see you go {":("}. Hope to see you soon!</span>
            <div className="flex gap-x-2">
                <a href="/">
                    <Button>
                        Home
                    </Button>
                </a>
            </div>
        </div>
        </>
    )
}