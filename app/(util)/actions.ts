import { API_URL } from "../layout";
import { PromptResponse } from "./interfaces";

export async function submitPrompt(formData: FormData): Promise<PromptResponse> {
    "use server"

    const prompt = formData.get("prompt");

    const messages = ["m1"].map((_) => {
        return {
            role: "user",
            content: prompt,
            name: "testuser",
        }
    });

    if(prompt) {
        try {
            const response = await fetch(`${API_URL}/chat/send`, {
                method: "POST",
                body: `{ "messages": ${JSON.stringify(messages)} }`,
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