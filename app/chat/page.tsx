import { Wand2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { submitPrompt } from "../(util)/actions";
import { UserChatBubble, ChatContainer, GenieusChatBubble } from "../(util)/components";
import { API_URL } from "../layout";

export default async function Page() {
    return (
        <>
        <section className="w-96 h-[80vh] bg-bg px-6 pb-6 flex flex-col absolute my-auto top-0 bottom-0 right-8 rounded-lg border-[1px] border-contrast">
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
            <ChatContainer submitPrompt={submitPrompt}>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <UserChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </UserChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
                <GenieusChatBubble>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </GenieusChatBubble>
            </ChatContainer>
        </section>
        </>
    )
}