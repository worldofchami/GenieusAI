"use client"

import { Wand2Icon } from "lucide-react"
import { FunctionComponent, PropsWithChildren } from "react";

export function TextInput() {
    return (
        <>
        <div className="h-12 flex pl-4 rounded-[6px] bg-[#2F2F2F] stdborder">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="h-full w-full bg-transparent font-light text-xs"
                autoFocus
            />
            <div className="w-12 h-12 grid place-content-center cursor-pointer">
                <Wand2Icon width={18} height={18} />
            </div>
        </div>
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