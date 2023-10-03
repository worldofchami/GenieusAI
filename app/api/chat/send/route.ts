import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages,
    });

    // const data = await response.json();

    const stream = OpenAIStream(response, {
        // onStart: async () => {
        //   await savePromptToDatabase(prompt)
        // },
        // onToken: async (token: string) => {
        //   // This callback is called for each token in the stream
        //   // You can use this to debug the stream or save the tokens to your database
        //   console.log(token)
        // },
        // onCompletion: async (completion: string) => {
        //   await saveCompletionToDatabase(completion)
        // }
    });

    return new StreamingTextResponse(stream);
}
