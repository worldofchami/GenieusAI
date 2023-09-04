"use client"

import { Wand2Icon } from "lucide-react"
import { GenieusChatBubble } from "./components"

export const EmptyChatContainer = () => {
    return (
        <>
        <div className="w-full h-full pt-4 pb-2">
            <GenieusChatBubble>
                Welcome! I'm your personal AI genie {":)"} 🧞‍♂️
                Ask anything, and I'll do my best to grant you your wish... 🪄
            </GenieusChatBubble>
        </div>
        <div className="h-12 flex pl-4 rounded-[6px] bg-[#2F2F2F] stdborder">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="h-full w-full bg-transparent font-light text-xs"
                name="prompt"
                autoFocus
                autoComplete="off"
            />
            <button
                type="submit"
                className="w-12 h-12 grid place-content-center cursor-pointer"
            >
                <Wand2Icon width={18} height={18} />
            </button>
        </div>
        </>
    )
}