import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Celerates Assessment",
    description: "Celerates - Frontend Engineer Technical Assessment by Otrinanda Gandhi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* <SidebarProvider>
                    <AppSidebar /> */}
                    <main>
                        {/* <SidebarTrigger /> */}
                        {children}
                    </main>
                    <Toaster />
                {/* </SidebarProvider> */}
            </body>
        </html>
    );
}
