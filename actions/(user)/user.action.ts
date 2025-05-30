"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUser() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
        throw new Error("Clerk user not found");
    }

    const userData = {
        clerkId: userId,
        name: clerkUser.fullName || clerkUser.firstName || "Anonymous",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        avatar: clerkUser.imageUrl || null,
    };

    const user = await prisma.user.upsert({
        where: { clerkId: userId },
        update: {
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        },
        create: {
            clerkId: userData.clerkId,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        },
    });

    return user;
} 