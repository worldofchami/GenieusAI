import Image from "next/image";
import { UserChatBubble, TextInput, ChatContainer, GenieusChatBubble } from "../(util)/components";

export default async function Page() {
    return (
        <>
        <section className="w-96 h-[80vh] bg-bg px-6 pb-6 flex flex-col gap-y-4 absolute my-auto top-0 bottom-0 right-8 rounded-lg border-[1px] border-contrast">
            <div className="w-full h-20 flex gap-x-4 items-center border-b-[1px] border-contrast">
                <div className="w-10 h-10 rounded-full">
                    <Image
                        src="/images/genieus.jpeg"
                        alt="Picture of Genieus"
                        width={40}
                        height={40}
                        className="w-full h-full rounded-full"
                    />
                </div>
                <h1>Genieus AI</h1>
            </div>
            <ChatContainer>
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
            <TextInput />
        </section>
        </>
    )
}