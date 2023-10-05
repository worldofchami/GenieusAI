import { Message } from "@/app/(util)/interfaces";
import { Database } from "@/types/supabase";
import { createRouteHandlerClient, User } from "@supabase/auth-helpers-nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Tell Genieus some information about itself to be more helpful
    const configMessage: Message = {
        role: "system",
        content: "You are a helpful assistant named Genieus. Answer any questions asked to you in a helpful and friendly tone"
    };

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const email = await (await supabase.auth.getSession()).data.session?.user.email!;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
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

            // Store current chat into DB
            await supabase
                .from("chats")
                .update({
                    chat: [
                        ...messages,
                        {
                            role: "assistant",
                            content: completion
                        }
                    ]
                }).match({ email });
        }
    });

    return new StreamingTextResponse(stream);
}
