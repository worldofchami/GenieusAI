import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "react-hot-toast";

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "GenieusAI",
    description: "Your handy chatbot, always there to help!",
};

export const API_URL = process.env.NODE_ENV === "production" ? "https://genieusai.vercel.app/api" : "http://localhost:3000/api";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <link
              rel="icon"
              href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧞‍♂️</text></svg>"
            />
            <body className={bricolageGrotesque.className}>
                <section className="h-full w-full bg-bg px-6 pb-6 flex flex-col ">
                    <Toaster
                       containerClassName="relative bg-bg"
                       containerStyle={{
                            position: "relative",
                       }}
                       toastOptions={{
                            style: {
                                background: "rgb(60 60 60)",
                                color: "#CDCDCD",
                                textAlign: "center"
                            }
                       }}
                    />
                    {children}
                </section>
            </body>
        </html>
    );
}
