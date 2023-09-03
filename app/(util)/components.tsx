"use client"

import { Loader2, Wand2Icon } from "lucide-react"
import { ChangeEvent, FunctionComponent, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useChat } from "ai/react";
import { PromptResponse } from "./interfaces";
import { useCustomRef } from "./hooks";

interface ChatBubbleProps {

}

export const UserChatBubble: FunctionComponent<ChatBubbleProps & PropsWithChildren> = ({ children }) => {
    return (
        <>
        <div
            className="w-fit h-fit max-w-[80%] px-4 py-2 user_cb rounded-xs bg-[#2E2E2E] ml-auto text-right"
        >
            <p className="text-xs leading-relaxed font-light">
                {children}
            </p>
        </div>
        </>
    )
}


export const GenieusChatBubble: FunctionComponent<ChatBubbleProps & PropsWithChildren> = ({ children }) => {
    return (
        <>
        <div
            className="w-fit h-fit max-w-[80%] px-4 py-2 genieus_cb rounded-xs bg-accent mr-auto text-left"
        >
            <p className="text-xs leading-relaxed font-light">
                {children}
            </p>
        </div>
        </>
    )
}

interface PromptFormProps {
    submitPrompt: (prompt: string) => Promise<PromptResponse>;
}

interface MessageBlock {
    prompt: string;
    reply: string;
}

export const ChatContainer: FunctionComponent<PromptFormProps & PropsWithChildren> = ({ submitPrompt, children }) => {
    const chatRef = useCustomRef<HTMLDivElement>();

    const [prompt, setPrompt] = useState("");

    const [messageBlocks, setMessageBlocks] = useState<ReactNode[]>([]);

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setPrompt(value);
    }

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(prompt) {    
            setLoading(true);

            const { ok, reply } = await submitPrompt(prompt);
            
            addMessageBlocks({
                prompt,
                reply,
            });

            setPrompt("");
        }
    }

    useEffect(() => {

        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight + 10000,
            behavior: "smooth"
        });

        return () => {};

    }, [messageBlocks.length]);

    const addMessageBlocks = (options: MessageBlock) => {
        const { prompt, reply } = options;

        setMessageBlocks((current) => {
            return [...current, <UserChatBubble>{prompt}</UserChatBubble>, <GenieusChatBubble>{reply}</GenieusChatBubble>];
        });

        setLoading(false);
    }

    return (
        <>
        <div className="w-full h-full flex flex-col gap-y-2 overflow-auto pt-4 pb-2 mb-4" ref={chatRef}>
            {children}
            {messageBlocks}
            {
                loading &&
                <div className="w-full h-12 flex justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            }
        </div>
        <form action={handleSubmit} className="h-12 flex pl-4 rounded-[6px] bg-[#2F2F2F] stdborder">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="h-full w-full bg-transparent font-light text-xs"
                name="prompt"
                autoFocus
                value={prompt}
                onChange={handleChange}
                autoComplete="off"
            />
            <button
                type="submit"
                className="w-12 h-12 grid place-content-center cursor-pointer"
            >
                <Wand2Icon width={18} height={18} />
            </button>
        </form>
        </>
    )
}