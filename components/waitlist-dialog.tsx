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
                <Button 
                    variant="outline" 
                    className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-black dark:bg-white/5 dark:hover:bg-white/20 dark:hover:text-white transition-all duration-300"
                >
                    Join Waitlist
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border dark:border-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center text-gray-900 dark:text-white">Join Our Waitlist</DialogTitle>
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
                                            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">Thank You!</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{response.message}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">We'll keep you updated on our progress.</p>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-16 h-16 text-red-500 mb-4" />
                                            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Oops!</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{response.message}</p>
                                            <Button
                                                variant="ghost"
                                                className="mt-4 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        {...register("name")}
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 dark:text-red-400">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white dark:from-teal-400 dark:to-emerald-400 dark:hover:from-teal-500 dark:hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Joining...
                                        </>
                                    ) : (
                                        "Join Waitlist"
                                    )}
                                </Button>
                            </motion.form>
                        )
                    }
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
} 