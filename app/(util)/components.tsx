"use client"

import { Loader2, Wand2Icon } from "lucide-react"
import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, FormEvent, FunctionComponent, HTMLProps, InputHTMLAttributes, PropsWithChildren, ReactNode, useEffect, useId, useState } from "react";
import { useChat } from "ai/react";
import { Message, PromptResponse } from "./interfaces";
import { useCustomRef } from "./hooks";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";

interface ChatBubbleProps extends HTMLProps<HTMLDivElement> {

}

export const UserChatBubble: FunctionComponent<ChatBubbleProps & PropsWithChildren> = ({ children, ...props }) => {
    return (
        <>
        <div
            className={twMerge("w-fit h-fit max-w-[90%] px-4 py-2 user_cb rounded-xs bg-[#2E2E2E] ml-auto text-right", props.className)}
        >
            <p className="text-xs leading-relaxed font-light">
                {children}
            </p>
        </div>
        </>
    )
}


export const GenieusChatBubble: FunctionComponent<ChatBubbleProps & PropsWithChildren> = ({ children, ...props }) => {
    return (
        <>
        <div
            className={twMerge("w-fit h-fit max-w-[90%] px-4 py-2 genieus_cb rounded-xs bg-accent mr-auto text-left", props.className)}
        >
            <p className="text-xs leading-relaxed font-light">
                {children}
            </p>
        </div>
        </>
    )
}

interface PromptFormProps {
    submitPrompt: (chat: Message[]) => Promise<PromptResponse>;
    messages: Message[];
}

interface MessageBlock {
    prompt: string;
    reply: string;
}

export const ChatContainer: FunctionComponent<PromptFormProps & PropsWithChildren> = ({ messages: _messages, submitPrompt, children }) => {
    const chatRef = useCustomRef<HTMLDivElement>();

    const { messages, input: prompt, handleInputChange, handleSubmit: sendChat } = useChat({
        api: "/api/chat/send"
    });

    const [messageBlocks, setMessageBlocks] = useState<ReactNode[]>([]);

    // Initial message
    const [chatMessages, setChatMessages] = useState<Message[]>(_messages);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        if(prompt) {
            sendChat(ev);

            setLoading(true);

            const { ok, reply } = await submitPrompt([...chatMessages, {
                role: "user",
                content: prompt
            }]);
            
            setChatMessages((curr) => ([
                ...curr,
            ]));

            addMessages({
                prompt,
                reply,
            });
        }
    }

    useEffect(() => {

        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight + 10000,
            behavior: "smooth"
        });

        return () => {};

    }, [messageBlocks.length]);

    useEffect(() => {
        setMessageBlocks(
            messages.map(({ role, content }) => {
                if(role === "user") {
                    return <UserChatBubble>{content}</UserChatBubble>
                }

                else {
                    return <GenieusChatBubble>{content}</GenieusChatBubble>
                }
            })
        );

    }, [messages]);

    const addMessages = (options: MessageBlock) => {
        const { prompt, reply } = options;

        setChatMessages((current) => ([
            ...current, { role: "user", content: prompt }, { role: "assistant", content: reply }
        ]));

        setLoading(false);
    }
    
    return (
        <>
        <div className="w-full h-full flex flex-col gap-y-2 overflow-auto pt-4 pb-2 mb-4" ref={chatRef}>
            {
                !children &&
                <GenieusChatBubble>
                    Welcome! I'm your personal AI genie {":)"} 🧞‍♂️
                    Ask anything, and I'll do my best to grant you your wish... 🪄
                </GenieusChatBubble>
            }
            {children}
            {messageBlocks}
            {
                loading &&
                <div className="w-full h-12 flex justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            }
        </div>
        <form onSubmit={handleSubmit} className="h-12 flex pl-4 rounded-[6px] bg-[#2F2F2F] stdborder">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="h-full w-full bg-transparent font-light text-xs"
                name="prompt"
                autoFocus
                value={prompt}
                onChange={handleInputChange}
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

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

export const TextInput: FunctionComponent<TextInputProps> = ({ label, ...props }) => {
    return (
        <>
        <div className="w-full h-full flex flex-col gap-y-1 input_container" aria-label={label.toLowerCase()}>
            <label className="text-left text-xs font-light" htmlFor={`${label}-${useId()}`}>{label}</label>
            <input
                { ...props }
                className={twMerge("h-10 w-full bg-[#1f1f1f] font-light text-xs rounded-[6px] stdborder pl-3 placeholder:text-contrast", props.className)}
                autoFocus
                autoComplete="off"
            />
        </div>
        </>
    )
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    secondary?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
    return (
        <>
        <button
            { ...props }
            className={twMerge("h-fit w-fit px-3 py-1 stdborder rounded-[4px] font-light bg-accent hover:opacity-90", props.className)}
        >
            {children}
        </button>
        </>
    )
}

export const LogOutButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await fetch(`${API_URL}/auth/signout`, {
            method: "POST"
        });

        router.push("/signout");
        router.refresh();
    }

    return (
        <>
        <button
            { ...props }
            onClick={handleSignOut}
            className={twMerge("h-fit w-fit px-3 py-1 stdborder rounded-[4px] font-light bg-accent hover:opacity-90", props.className)}
        >
            {children}
        </button>
        </>
    )
}