export interface PromptResponse {
    ok: boolean;
    reply: string;
}

export interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}

export interface ISignUpForm {
    username: string;
    email: string;
    password: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface DBResponse {
    ok: boolean;
    message: string;
}