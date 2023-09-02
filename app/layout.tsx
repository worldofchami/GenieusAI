import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "GenieusAI",
    description: "Your handy chatbot, always there to help!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={bricolageGrotesque.className}>
                <main className="w-full h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
