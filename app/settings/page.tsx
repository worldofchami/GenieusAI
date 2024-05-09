import { cookies } from "next/headers";
import Link from "next/link";
import { Button, ClearChatButton, LogOutButton } from "../(util)/components";
import { useAuth } from "../(util)/utils";

export const dynamic = "force-dynamic";

export default async function Page() {
    const { user } = useAuth({ cookies });

    let username = "";

    if(user) {
        username = user.user_metadata.username;
    }
    
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
                    <ClearChatButton>
                        Clear Chat
                    </ClearChatButton>
                    <div>
                        <LogOutButton className="glass bg-transparent">
                            Sign Out
                        </LogOutButton>
                    </div>
                </div>
                <span className="mt-4 text-sm font-light text-contrastlt">Got a question? <a href="mailto:tinochaminuka@gmail.com" className="underline">Email us</a></span>
            </div>
            :
            <>
            <div className="flex flex-col items-center">
                <span className="text-sm font-light">You're not logged in!</span>
                <span className="text-xs text-contrastlt mb-4">Login to see all your messages.</span>
                <div className="flex flex-col items-center gap-y-4">
                    <Link href="/chat">
                        <Button>
                            Back to Chat
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button className="bg-secAccent">
                            Login
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button className="glass bg-transparent">
                            Home
                        </Button>
                    </Link>
                </div>
                <span className="mt-4 text-sm font-light text-contrastlt">Got a question? <a href="mailto:tinochaminuka@gmail.com" className="underline">Email us</a></span>
            </div>
            </>   
        }
        </div>
        </>
    )
}