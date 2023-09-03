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

export const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={bricolageGrotesque.className}>
                <main className="w-full h-screen">
                    <section className="w-96 h-[80vh] bg-bg px-6 pb-6 flex flex-col absolute my-auto top-0 bottom-0 right-8 rounded-lg border-[1px] border-contrast">
                        {children}
                    </section>
                </main>
            </body>
        </html>
    );
}
