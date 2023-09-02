import "./globals.css";

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
            <body>
                <main className="w-full h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
