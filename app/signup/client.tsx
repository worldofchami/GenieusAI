"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FunctionComponent, useState } from "react"
import { toast } from "react-hot-toast";
import { Button, TextInput } from "../(util)/components"
import { DBResponse, ISignUpForm } from "../(util)/interfaces";
import { PasswordPattern, PasswordRegExp, UsernamePattern, UsernameRegExp } from "../(util)/RegExp";

interface SignUpFormProps {
    signUp: (data: ISignUpForm) => Promise<DBResponse>;
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = ({ signUp }) => {
    const [passwordType, setPasswordType] = useState("password");

    const handleTogglePassword = () => {
        if(passwordType === "password") setPasswordType("text")
        else setPasswordType("password")
    }

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();
        const email = formData.get("email")?.toString();

        if(!username || !password || !email) {
            toast.error("Please fill in all the fields!");
            return;
        }

        if(UsernameRegExp.test(username) && PasswordRegExp.test(password)) {
            const data = {
                username,
                password,
                email
            };

            const { ok, message } = await toast.promise<DBResponse>(
                signUp(data),
                {
                    loading: "Signing you up...",
                    success: "",
                    error: "Critical error! Please contact support."
                },
                {
                    success: {
                        style: {
                            display: "none"
                        }
                    }
                }
            );

            if(ok) {
                toast.success(message);
                router.refresh();
                router.push("/chat");
            }

            else {
                toast.error(message);
            }
        }

        else if(!UsernameRegExp.test(username)) {
            toast.error("Please enter a valid username!");
        }

        else if(!PasswordRegExp.test(password)) {
            toast.error("Please enter a valid password!");
        }
    }

    return (
        <>
        <form action={handleSubmit} className="mt-4 flex flex-col gap-y-2">
            {/* <div>
                <div className="w-20 h-10 flex items-center justify-center px-2 rounded-[4px] glass cursor-pointer">
                    <Image
                        src="/icons/google.svg"
                        alt="Continue with Google"
                        title="Continue with Google"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div className="text-center">
                <span className="font-light text-sm text-contrastlt">━━━━━━━ or ━━━━━━━━</span>
            </div> */}
            <TextInput
                label="Username"
                placeholder="johnmckenzie"
                pattern={UsernamePattern}
                name="username"
                autoFocus
            />
            <TextInput
                label="Email"
                type="email"
                placeholder="johnmckenzie@org.com"
                name="email"
            />
            <div className="relative">
                <TextInput
                    type={passwordType}
                    label="Password"
                    placeholder="Very Secure Password"
                    className="pw_input"
                    pattern={PasswordPattern}
                    name="password"
                />
                <div
                    className="h-10 aspect-square absolute bottom-1 right-0 cursor-pointer grid place-content-center"
                    onClick={handleTogglePassword}
                >
                    <Image
                        src={`/icons/eye_${passwordType}.svg`}
                        alt="Show/Hide Password"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
            <Button type="submit" className="mt-2">
                Sign Up
            </Button>
        </form>
        </>
    )
}