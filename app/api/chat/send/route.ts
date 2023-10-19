import { Message } from "@/app/(util)/interfaces";
import { Database } from "@/types/supabase";
import { createRouteHandlerClient, User } from "@supabase/auth-helpers-nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { cookies } from "next/headers";
import OpenAI from "openai";

const config = ({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Tell Genieus some information about itself to be more helpful
    const configMessage: Message = {
        role: "system",
        content: "You are a helpful assistant named Genieus. Answer any questions asked to you in a helpful and friendly tone"
    };

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const email = await (await supabase.auth.getSession()).data.session?.user.email || "anon";

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        stream: true,
        messages: [configMessage, ...messages],
    });

    const stream = OpenAIStream(response, {
        onCompletion: async (completion: string) => {
            // Store user message in DB
            await supabase
                .from("messages")
                .insert({
                    email,
                    role: "user",
                    content: messages.at(-1)?.content
                });
            
            // Store response in DB
            await supabase
                .from("messages")
                .insert({
                    email,
                    role: "assistant",
                    content: completion
                });

            // Anonymous user, don't store chat
            if(email === "anon") return;
            // Fetch current chat
            const res = await supabase
                .from("chats")
                .select("chat")
                .match({ email });

            const currentChat = res.data?.[0].chat!;

            // Store new chat
            await supabase
                .from("chats")
                .update({
                    chat: [
                        ...currentChat,
                        {
                            role: "user",
                            content: messages.at(-1)?.content
                        },
                        {
                            role: "assistant",
                            content: completion
                        }
                    ]
                })
                .eq("email", email);
        }
    });

    return new StreamingTextResponse(stream);
}
