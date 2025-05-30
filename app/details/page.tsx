"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncUser } from "@/actions/(user)/user.action";

export default function DetailsPage() {
	const router = useRouter();

	useEffect(() => {
		const initUser = async () => {
			try {
				await syncUser();
				// After successful sync, you can redirect to the dashboard or profile page
				router.push("/dashboard");
			} catch (error) {
				console.error("Error syncing user:", error);
				// Handle error appropriately
			}
		};

		initUser();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Setting up your profile...</h1>
				<p className="text-gray-600">Please wait while we prepare your dashboard.</p>
			</div>
		</div>
	);
}
