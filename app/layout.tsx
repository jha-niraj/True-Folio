import { ClerkProvider } from "@clerk/nextjs"
import { type Metadata } from "next"
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/themeprovider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-space-grotesk',
})
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TrueFolio - AI-Powered Portfolio Platform",
	description: "Transform your coding journey into a compelling portfolio with AI-powered insights.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en" className="h-full" suppressHydrationWarning>
				<head>
					<link rel="icon" href="/truefolio.ico" />
				</head>
				<body className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}