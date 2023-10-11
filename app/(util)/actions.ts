import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { StreamingTextResponse } from "ai";
import { cookies } from "next/headers";
import { API_URL } from "../layout";
import { DBResponse, ILoginForm, ISignUpForm, Message, PromptResponse } from "./interfaces";

export const dynamic = "force-dynamic";

export async function submitPrompt(chat: Message[]): Promise<PromptResponse> {
    "use server"

    if(chat.length > 0) {
        try {
            // Only use last 15 messages
            const newChat = chat.slice(-15);

            const supabase = createServerActionClient<Database>({ cookies });
            const email = await (await supabase.auth.getSession()).data.session?.user.email;

            const response: StreamingTextResponse = await fetch(`${API_URL}/chat/send`, {
                method: "POST",
                body: `{ "messages": ${JSON.stringify(newChat)}, "email": "${email}")} }`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await response.json();
    
            const { reply } = data;

            return {
                ok: true,
                reply
            }
        }

        catch(e) {            
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

    const supabase = createServerActionClient<Database>({ cookies });

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

    // Create blank chat entry for user
    await supabase
        .from("chats")
        .insert({
            email,
            chat: []
        });

    return {
        ok: true,
        message: `Welcome to GenieusAI, ${username}!`
    }
}

export async function login(data: ILoginForm): Promise<DBResponse> {
    "use server"

    const { email, password } = data;

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.auth
        .signInWithPassword({
            email,
            password
        });

    return {
        ok: true,
        message: `Welcome back!`
    }
}