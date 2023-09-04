import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Link from "next/link";
import { Button, LogOutButton } from "../(util)/components";
import { API_URL } from "../layout";

export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies });

    let username = "";

    try {
        username = (await supabase.auth.getUser()).data.user?.user_metadata.username;
    }

    catch(e) { console.error(e) }

    return (
        <>
        <div className="w-full h-full flex flex-col items-center justify-center">
        {
            username ?
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold mb-4">Welcome back, {username}!</h1>
                <div className="flex flex-col items-center gap-y-4">
                    <Link href="/chat">
                        <Button>
                            Back to Chat
                        </Button>
                    </Link>
                    <Link href="/signout">
                        <LogOutButton className="glass bg-transparent">
                            Sign Out
                        </LogOutButton>
                    </Link>
                </div>
                <span className="mt-4 text-sm font-light text-contrastlt">Got a question? <a href="mailto:tinochaminuka@gmail.com" className="underline">Email us</a></span>
            </div>
            :
            <>
            <span className="text-sm font-light">You're not logged in!</span>
            <span className="text-xs text-contrastlt mb-4">Login to receive assistance.</span>
            <div className="flex gap-x-2">
                <Link href="/login">
                    <Button>
                        Login
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="glass bg-transparent">
                        Sign Up
                    </Button>
                </Link>
            </div>
            <span className="text-sm font-light">Got a question? <a href="mailto:tinochaminuka@gmail.com" className="underline">Email us</a></span>
            </>   
        }
        </div>
        </>
    )
}