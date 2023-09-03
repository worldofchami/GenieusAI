"use client"

import { SeparatorHorizontal } from "lucide-react";
import Image from "next/image";
import { FunctionComponent, useState } from "react"
import { Button, TextInput } from "../(util)/components"

interface SignUpFormProps {
    signUp: (formData: FormData) => Promise<any>;
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = ({ signUp }) => {
    const [passwordType, setPasswordType] = useState("password");

    const handleTogglePassword = () => {
        if(passwordType === "password") setPasswordType("text")
        else setPasswordType("password")
    }

    return (
        <>
        <form action="" className="mt-4 flex flex-col gap-y-2">
            <div>
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
                <span className="font-light text-sm text-contrast">━━━━━━━ or ━━━━━━━━</span>
            </div>
            <TextInput
                label="Username"
                placeholder="johnmckenzie"
            />
            <TextInput
                label="Email"
                type="email"
                placeholder="johnmckenzie@org.com"
            />
            <div className="relative">
                <TextInput
                    type={passwordType}
                    label="Password"
                    placeholder="Very Secure Password"
                    className="pw_input"
                />
                <div
                    className="h-10 aspect-square absolute bottom-0 right-0 cursor-pointer grid place-content-center"
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