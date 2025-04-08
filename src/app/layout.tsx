import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import AuthButtons from "@/components/auth-buttons";
import { HomeIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <AuthProvider>

      
        <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between z-10 relative">
          <Link href="/" className="text-xl tracking-widest flex gap-2 items-center md:text-2xl lg:text-3xl">
          <HomeIcon className="hidden md:block"/>
            <span className="uppercase">Fire Homes</span>
          </Link>
          <ul className="flex gap-6 items-center">
          <li><Link href={"/property-search"} className="uppercase tracking-widest hover:underline">Property Search</Link></li>
           
            <li><AuthButtons/></li>
            
          </ul>
        </nav>
        {children}
        <Toaster richColors/>
        </AuthProvider>
      </body>
    </html>
  );
}
