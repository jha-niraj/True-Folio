"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { joinWaitlist, WaitlistFormData } from "@/actions/waitlist.action"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export function WaitlistDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<WaitlistFormData>()

    const onSubmit = async (data: WaitlistFormData) => {
        setIsSubmitting(true)
        const result = await joinWaitlist(data)
        setResponse(result)
        setIsSubmitting(false)
        if (result.success) {
            reset()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                setResponse(null)
                reset()
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-white cursor-pointer text-black hover:bg-black hover:text-white">
                    Join Waitlist
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">Join Our Waitlist</DialogTitle>
                </DialogHeader>
                <AnimatePresence mode="wait">
                    {
                        response ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center p-6 text-center"
                            >
                                {
                                    response.success ? (
                                        <>
                                            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                            <h3 className="text-lg font-semibold text-green-700 mb-2">Thank You!</h3>
                                            <p className="text-gray-600">{response.message}</p>
                                            <p className="text-sm text-gray-500 mt-2">We'll keep you updated on our progress.</p>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-16 h-16 text-red-500 mb-4" />
                                            <h3 className="text-lg font-semibold text-red-700 mb-2">Oops!</h3>
                                            <p className="text-gray-600">{response.message}</p>
                                            <Button
                                                variant="ghost"
                                                className="mt-4"
                                                onClick={() => setResponse(null)}
                                            >
                                                Try Again
                                            </Button>
                                        </>
                                    )
                                }
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        {...register("name")}
                                        className="border-gray-300"
                                    />
                                    {
                                        errors.name && (
                                            <p className="text-sm text-red-500">{errors.name.message}</p>
                                        )
                                    }
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                        className="border-gray-300"
                                    />
                                    {
                                        errors.email && (
                                            <p className="text-sm text-red-500">{errors.email.message}</p>
                                        )
                                    }
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-white hover:from-teal-500 hover:to-emerald-500"
                                    disabled={isSubmitting}
                                >
                                    {
                                        isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Joining...
                                            </>
                                        ) : (
                                            "Join Waitlist"
                                        )
                                    }
                                </Button>
                            </motion.form>
                        )
                    }
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
} 