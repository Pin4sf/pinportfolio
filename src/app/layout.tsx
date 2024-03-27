import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { CreateClient } from "@prismicio/client";
import { createClient,repositoryName } from "@/prismicio";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const settings = await client.getSingle("settings")

    return {
        title: "Shivansh Fulper",
        description: "Shivansh Fulper's Portfolio",
    };
}



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-slate-900 text-slate-100">
            <body className={clsx(urbanist.className, "relative min-h-screen")}>
                <Header />
                {children}
                <Footer />
                <div className="background-gradient absolute inset-0 -z-50 max-h-screen"></div>
                <div className="absolute pointer-events-none insert-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
            </body>
            <PrismicPreview repositoryName={ repositoryName } />
        </html>
    );
}
