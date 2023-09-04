import { Database, Json } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Wand2Icon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { submitPrompt } from "../(util)/actions";
import { UserChatBubble, ChatContainer, GenieusChatBubble, Button } from "../(util)/components";
import { EmptyChatContainer } from "../(util)/emptycomponents";
import { Message } from "../(util)/interfaces";
import { API_URL } from "../layout";

export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies });

    let email = "";

    let messages: Message[] = [];

    try {
        email = (await supabase.auth.getUser()).data.user?.email as string;

        const { data } = await supabase
            .from("chats")
            .select("chat")
            .match({ email })
            .single();

        if(data && "chat" in data) {
            messages = data.chat?.map((_) => {
                if(!_) return null;
                const _chat = _ as { [key: string]: Json };
                
                if(!_chat.role || !_chat.content) return null;

                return {
                    role: _chat.role,
                    content: _chat.content
                } as Message;
    
            }).filter(_ => _) as Message[];
        }
    }

    catch(e) { console.error(e) }

    return (
        <>
        {
            email ?
            <>
            <div className="w-full h-20 flex items-center gap-x-4 border-b-[1px] border-contrast relative">
                <div className="w-9 h-9 rounded-full">
                    <Image
                        src="/images/genieus.jpeg"
                        alt="Picture of Genieus"
                        width={36}
                        height={36}
                        className="w-full h-full rounded-full"
                    />
                </div>
                <h1>Genieus AI</h1>
                <Link href="/settings">
                    <Image
                        src="/icons/cog.svg"
                        alt="Your Settings"
                        width={20}
                        height={20}
                        className="w-5 h-5 absolute right-0 my-auto top-0 bottom-0"
                    />
                </Link>
            </div> 
            <ChatContainer messages={messages} submitPrompt={submitPrompt} />
            </>
            :
            <>
            <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center rounded-sm stdborder bg-bg bg-opacity-[.85] z-10">
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
            </div>
            <div className="w-full h-20 flex items-center gap-x-4 border-b-[1px] border-contrast relative">
                <div className="w-9 h-9 rounded-full">
                    <Image
                        src="/images/genieus.jpeg"
                        alt="Picture of Genieus"
                        width={36}
                        height={36}
                        className="w-full h-full rounded-full"
                    />
                </div>
                <h1>Genieus AI</h1>
                <Image
                    src="/icons/cog.svg"
                    alt="Your Settings"
                    width={20}
                    height={20}
                    className="w-5 h-5 absolute right-0 my-auto top-0 bottom-0"
                />
            </div>
            <EmptyChatContainer />
            </>

        }
        </>
    )
}