"use client"

import { Wand2Icon } from "lucide-react"
import { FunctionComponent, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useChat } from "ai/react";

export function TextInput() {

    return (
        <>
        
        </>
    )
}

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

export const ChatContainer = ({ children }: PropsWithChildren) => {
    return (
        <>
        <div className="w-fit h-full flex flex-col gap-y-2 overflow-auto pt-4 pb-2 mb-4">
            {children}
        </div>
        </>
    )
}