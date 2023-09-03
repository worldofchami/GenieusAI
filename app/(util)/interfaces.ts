export interface PromptResponse {
    ok: boolean;
    reply: string;
}

export interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}