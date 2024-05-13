"use client"

import { Loader2, Wand2Icon } from "lucide-react"
import { ButtonHTMLAttributes, DetailedHTMLProps, FormEvent, FunctionComponent, HTMLProps, InputHTMLAttributes, PropsWithChildren, ReactNode, useEffect, useId, useState } from "react";
import { useChat } from "ai/react";
import { Message, PromptResponse } from "./interfaces";
import { useCustomRef } from "./hooks";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Message as AIMessage } from "ai/react";
import { clearChat } from "./actions";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";

interface ChatBubbleProps extends HTMLProps<HTMLDivElement> {
    content: string;
}

export const UserChatBubble: FunctionComponent<ChatBubbleProps> = ({ content, ...props }) => {
    return (
        <>
        <div
            className={twMerge("w-fit h-fit max-w-[90%] px-4 py-2 user_cb rounded-xs bg-[#2E2E2E] ml-auto text-right", props.className)}
        >
            <p className="text-xs leading-relaxed font-light max-md:text-lg">
                <Markdown>{content}</Markdown>
            </p>
        </div>
        </>
    )
}


export const GenieusChatBubble: FunctionComponent<ChatBubbleProps> = ({ content, ...props }) => {
    return (
        <>
        <div
            className={twMerge("w-fit h-fit max-w-[90%] px-4 py-2 genieus_cb rounded-xs bg-accent mr-auto text-left", props.className)}
        >
            <p className="text-xs leading-relaxed font-light max-md:text-lg">
                <Markdown>{content}</Markdown>
            </p>
        </div>
        </>
    )
}

interface PromptFormProps {
    submitPrompt: (chat: Message[]) => Promise<PromptResponse>;
    messages: Message[];
}

export const ChatContainer: FunctionComponent<PromptFormProps & PropsWithChildren> = ({ messages: persistedMesages, submitPrompt, children }) => {
    const [localMessages, writeLocalMessages] = useLocalStorage<Message[]>("messages", []);
    const [activeMessages, setActiveMessages] = useState<Message[]>(persistedMesages);

    useEffect(() => {
        // If previous messages exist, prefer them and flush local storage & populate with
        if(persistedMesages.length > 0) {
            writeLocalMessages(persistedMesages);
        }

        else {
            setActiveMessages(localMessages);
        }
    }, []);

    const chatRef = useCustomRef<HTMLDivElement>();

    const handleCompletion = async (message: AIMessage) => {
        messages.push(message);
        writeLocalMessages((curr) => [...curr, { role: "assistant", content: message.content } as Message]);
        scrollToBottom();
    }

    const { messages, input: prompt, handleInputChange, handleSubmit: sendChat, isLoading } = useChat({
        api: "/api/chat/send",
        onFinish: handleCompletion
    });

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        // Another response being generated; had to put this here because it only works this way
        // For some weird reason
        if(isLoading) {
            toast.error("Genieus is busy! Please give him a few moments...");
            return;
        }
        
        if(prompt) {
            sendChat(ev);
            writeLocalMessages((curr) => [...curr, { role: "user", content: prompt } as Message]);
        }

        // Not loading, but no prompt entered
        else {
            toast.error("Please enter a prompt!");
        }
    }

    const messageBlocks = [...activeMessages, ...messages].map(({ role, content }, index) => {
        return role === "user" ?
            <UserChatBubble key={index} content={content} /> :
            <GenieusChatBubble key={index} content={content} />
    });

    const scrollToBottom = () => {
        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight + 10000,
            behavior: "smooth"
        });
    };

    // useEffect(() => {
    //     if(_prevMessages.length > 0) {
    //         writePrevMessages(_prevMessages);
    //     }
        
    //     else {
    //         writePrevMessages(messages.map(({ role, content }) => ({ role, content }) as Message));
    //     }
    // }, [messages]);

    useEffect(() => {
        scrollToBottom();

        return () => {};

    }, [messageBlocks.length]);

    return (
        <>
        <div className="w-full h-full flex flex-col gap-y-2 overflow-auto pt-4 pb-2 mb-4" ref={chatRef}>
            {
                !children &&
                <GenieusChatBubble content="Welcome! I'm your personal AI genie :) 🧞‍♂️ Ask anything, and I'll do my best to grant you your wish... 🪄" />
            }
            {children}
            {messageBlocks}
            {
                isLoading &&
                <div className="w-full h-12 flex justify-center">
                    <Loader2 className="animate-spin text-accent" />
                </div>
            }
        </div>
        <form onSubmit={handleSubmit} className="h-12 flex pl-4 rounded-[6px] bg-[#2F2F2F] stdborder">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="h-full w-full bg-transparent font-light text-xs max-md:text-lg"
                name="prompt"
                autoFocus
                value={prompt}
                onChange={handleInputChange}
                autoComplete="off"
            />
            <button
                type="submit"
                className="w-12 h-12 grid place-content-center cursor-pointer hover:opacity-80"
                disabled={isLoading}
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
        <div className="w-full h-full flex flex-col gap-y-1 input_container" data-label={label.toLowerCase()}>
            <label className="text-left text-xs font-light" htmlFor={`${label}-${useId()}`}>{label}</label>
            <input
                { ...props }
                className={twMerge("h-10 w-full bg-[#1f1f1f] font-light text-xs rounded-[6px] stdborder pl-3 placeholder:text-contrast", props.className)}
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

export const ClearChatButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
    const [_, writeLocalMessages] = useLocalStorage<Message[]>("messages", []);

    function flushChats() {
        writeLocalMessages([]);
        return clearChat();
    }
    
    const handleClearChat = async () => {
        const { ok, message } = await toast.promise(
            flushChats(),
            {
                loading: "Clearing your chats...",
                success: "",
                error: "Something went wrong... Please try again!"
            },
            {
                success: {
                    style: {
                        display: "none"
                    }
                }
            }
        );

        if(ok) {
            toast.success(message);
        }

        else {
            toast.error(message);
        }
    }

    return (
        <>
        <button
            { ...props }
            onClick={handleClearChat}
            className={twMerge("h-fit w-fit px-3 py-1 stdborder rounded-[4px] font-light bg-secAccent hover:opacity-90", props.className)}
        >
            {children}
        </button>
        </>
    )
}

export const ClearLocalChatButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
    const [_, writeLocalMessages] = useLocalStorage<Message[]>("messages", []);

    const handleClear = () => {
        writeLocalMessages([]);
        toast.success("Successfully cleared your chats!");
    }

    return (
        <>
        <button
            { ...props }
            onClick={handleClear}
            className={twMerge("h-fit w-fit px-3 py-1 stdborder rounded-[4px] font-light bg-accent hover:opacity-90", props.className)}
        >
            {children}
        </button>
        </>
    )
}