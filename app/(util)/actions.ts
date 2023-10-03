import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { StreamingTextResponse } from "ai";
import { cookies } from "next/headers";
import { API_URL } from "../layout";
import { DBResponse, ILoginForm, ISignUpForm, Message, PromptResponse } from "./interfaces";

export const dynamic = "force-dynamic";

export async function submitPrompt(chat: Message[]): Promise<PromptResponse> {
    "use server"

    const supabase = createServerActionClient<Database>({ cookies });

    const email = await (await supabase.auth.getUser()).data.user?.email as string;

    if(chat.length > 0) {
        try {
            await supabase
                .from("messages")
                .insert({
                    email,
                    role: "user",
                    content: chat.at(-1)?.content
                });

            const _newChat = chat.slice(
                chat.length > 14 ? chat.length-14 : 0,
                chat.length
            );

            // Only use last 15 messages
            const _chat = [
            {
                role: "system",
                content: "You are a helpful assistant named Genieus"
            }, ..._newChat];

            const response: StreamingTextResponse = await fetch(`${API_URL}/chat/send`, {
                method: "POST",
                body: `{ "messages": ${JSON.stringify(_chat)} }`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await response.json();
    
            const { reply } = data;

            await supabase
                .from("chats")
                .upsert({
                    email,
                    chat: [
                        ..._newChat,
                        {
                            role: "assistant",
                            content: reply
                        }
                    ]
                });

            await supabase
                .from("messages")
                .insert({
                    email,
                    role: "assistant",
                    content: reply
                })

            return {
                ok: true,
                reply
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