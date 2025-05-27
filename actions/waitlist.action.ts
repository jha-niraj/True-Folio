"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const waitlistSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>

export async function joinWaitlist(data: WaitlistFormData) {
    try {
        const validatedData = waitlistSchema.parse(data)

        const existingUser = await prisma.waitlistForCoderz.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            return {
                success: false,
                message: "This email is already on the waitlist!",
            }
        }

        await prisma.waitlistForCoderz.create({
            data: validatedData,
        })

        return {
            success: true,
            message: "Successfully joined the waitlist!",
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                message: error.errors[0].message,
            }
        }

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        }
    }
} 