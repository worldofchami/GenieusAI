import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { API_URL } from "../layout";
import { DBResponse, ISignUpForm, Message, PromptResponse } from "./interfaces";

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

export async function signUp(data: ISignUpForm): Promise<DBResponse> {
    "use server"

    const username = data.username.toLowerCase();
    const email = data.email.toLowerCase();
    const password = data.password;

    const supabase = createServerActionClient({ cookies });

    const { error: InsertError } = await supabase
        .from("users")
        .insert({
            username,
            email
        });

    if(InsertError) {
        return {
            ok: false,
            message: "Username has already been used!"
        }
    }

    const { error } = await supabase.auth
        .signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        });

    if(error) {
        return {
            ok: false,
            message: "Email has already been used!"
        }
    }

    return {
        ok: true,
        message: `Welcome to GenieusAI, ${username}!`
    }
}