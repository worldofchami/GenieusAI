"use client"

import { Wand2Icon } from "lucide-react"
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
    submitPrompt: (formData: FormData) => Promise<PromptResponse>;
}

interface MessageBlock {
    content: string;
    isGenieus: boolean;
}

export const ChatContainer: FunctionComponent<PromptFormProps & PropsWithChildren> = ({ submitPrompt, children }) => {
    const chatRef = useCustomRef<HTMLDivElement>();

    const [prompt, setPrompt] = useState("");

    const [genieusMessages, setGenieusMessages] = useState<string[]>([]);
    const [userMessages, setUserMessages] = useState<string[]>([]);

    const [messageBlocks, setMessageBlocks] = useState<ReactNode[]>([]);

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setPrompt(value);
    }

    const handleSubmit = async (formData: FormData) => {
        if(formData.get("prompt")) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight
            });
    
            addMessageBlock({
                content: prompt,
                isGenieus: false
            });
    
            setPrompt("");
    
            const { ok, reply } = await submitPrompt(formData);
            
            addMessageBlock({
                content: reply,
                isGenieus: true
            });
        }
    }

    const addMessageBlock = (options: MessageBlock) => {
        const { isGenieus, content } = options;

        if(isGenieus) {
            setGenieusMessages(
                [...genieusMessages, content]
            );

            setMessageBlocks(
                [...messageBlocks, <GenieusChatBubble>{content}</GenieusChatBubble>]
            );
        }

        else {
            setUserMessages(
                [...userMessages, content]
            );

            setMessageBlocks(
                [...messageBlocks, <UserChatBubble>{content}</UserChatBubble>]
            );
        }
    }

    return (
        <>
        <div className="w-fit h-full flex flex-col gap-y-2 overflow-auto pt-4 pb-2 mb-4" ref={chatRef}>
            {children}
            {messageBlocks}
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