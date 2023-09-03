import { TextInput } from "../(util)/components";

export default async function Page() {
    return (
        <>
        <div className="w-full h-full pt-10 text-center">
            <h1 className="text-2xl text-center mb-10">Welcome to Genieus AI, your personal AI genie!</h1>
            <span className="text-sm font-light">To get started, sign up:</span>
            <div className="mt-4 flex flex-col gap-y-2">
                <TextInput
                    label="Username"
                    placeholder="johnmckenzie"
                />
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="johnmckenzie@org.com"
                />
                <TextInput
                    type={`password`}
                    label="Password"
                    placeholder="Very Secure Password"
                />
            </div>
        </div>
        </>
    )
}