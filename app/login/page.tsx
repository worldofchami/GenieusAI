import Link from "next/link";
import { login } from "../(util)/actions";
import { LoginForm } from "./client";

export default async function Page() {
    return (
        <>
        <div className="w-full h-full flex flex-col justify-center pt-10 text-center">
            <h1 className="text-2xl text-center mb-4">Welcome back to Genieus AI, your personal AI genie!</h1>
            <br />
            <span className="text-contrastlt text-sm font-light">Don't have an account? <Link href="/signup" className="underline">Sign Up</Link>.</span>
            <LoginForm login={login} />
        </div>
        </>
    )
}