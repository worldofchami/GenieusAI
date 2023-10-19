import Link from "next/link";
import { signUp } from "../(util)/actions";
import { TextInput } from "../(util)/components";
import { SignUpForm } from "./client";

export default async function Page() {
    return (
        <>
        <div className="w-full h-full flex flex-col justify-center text-center">
            <h1 className="text-2xl text-center mb-4">Welcome to Genieus AI, your personal AI genie!</h1>
            <span className="text-sm font-light">To get started, sign up:</span>
            <br />
            <span className="text-contrastlt text-sm font-light">Already have an account? <Link href="/login" className="underline">Login</Link>.</span>
            <SignUpForm signUp={signUp} />
        </div>
        </>
    )
}