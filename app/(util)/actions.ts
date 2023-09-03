import { API_URL } from "../layout";
import { Message, PromptResponse } from "./interfaces";

export async function submitPrompt(chat: Message[]): Promise<PromptResponse> {
    "use server"

    if(chat.length > 0) {
        try {
            // Only use last 10 messages
            const _chat = chat.slice(
                chat.length > 15 ? chat.length-15 : 0,
                chat.length
            );

            const response = await fetch(`${API_URL}/chat/send`, {
                method: "POST",
                body: `{ "messages": ${JSON.stringify(_chat)} }`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await response.json();

            console.log(data.reply)
    
            return {
                ok: true,
                reply: data.reply
            }
        }

        catch(e) {
            console.log(e);
            
            return {
                ok: false,
                reply: "Something went wrong... Please try again!"
            }
        }
    }

    return {
        ok: false,
        reply: "Something went wrong... Please try again!"
    }
}

export async function signUp(formData: FormData) {
    "use server"
}