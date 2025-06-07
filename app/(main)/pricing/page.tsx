"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Zap, 
    Send, 
    CheckCircle2, 
    Clock, 
    Mail, 
    Bell,
    Sparkles,
    ExternalLink,
    ArrowRight,
    Award,
    Gift,
    Link,
    Info
} from "lucide-react";
import { toast } from "sonner";

export default function PricingPage() {
    const [requestedCredits, setRequestedCredits] = useState(25);
    const [reason, setReason] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Predefined credit amounts (multiples of 5)
    const quickAmounts = [10, 15, 20, 25, 30, 50, 100];

    const handleCreditChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        // Round to nearest multiple of 5
        const roundedValue = Math.round(numValue / 5) * 5;
        setRequestedCredits(Math.max(5, roundedValue));
    };

    const handleSubmitRequest = async () => {
        if (requestedCredits < 5) {
            toast.error("Minimum request is 5 credits");
            return;
        }

        if (reason.trim().length < 10) {
            toast.error("Please provide a detailed reason (at least 10 characters)");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsDialogOpen(true);
        
        // Reset form
        setReason("");
        setRequestedCredits(25);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Transfer Credits
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                        TrueFolio is powered by <span className="text-primary font-semibold">The Coderz</span> platform. Transfer credits from your Coderz account to continue building your amazing portfolio here.
                    </p>

                    {/* Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4 max-w-2xl mx-auto"
                    >
                        <div className="flex items-start gap-3">
                            <Gift className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div className="text-left">
                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                                    🎉 New to The Coderz? Get 50 Free Credits!
                                </p>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                    Sign up on The Coderz platform and receive 50 credits instantly. Use them here on TrueFolio or explore other amazing features on the main platform.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Request Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="border-border/40 shadow-xl">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Send className="h-4 w-4 text-primary" />
                                    </div>
                                    Request Credit Transfer
                                </CardTitle>
                                <CardDescription>
                                    Request to transfer credits from your Coderz account to TrueFolio. We'll verify your account balance and process the transfer.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Credit Amount */}
                                <div className="space-y-3">
                                    <Label htmlFor="credits" className="text-sm font-semibold">
                                        How many credits do you want to transfer?
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            id="credits"
                                            type="number"
                                            value={requestedCredits}
                                            onChange={(e) => handleCreditChange(e.target.value)}
                                            min={5}
                                            step={5}
                                            className="w-32 text-lg font-semibold"
                                        />
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-amber-500" />
                                            <span className="text-sm text-muted-foreground">Credits</span>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Amount Buttons */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <span className="text-xs text-muted-foreground mr-2">Quick select:</span>
                                        {quickAmounts.map((amount) => (
                                            <Button
                                                key={amount}
                                                variant={requestedCredits === amount ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setRequestedCredits(amount)}
                                                className="h-8 text-xs cursor-pointer"
                                            >
                                                {amount}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="space-y-3">
                                    <Label htmlFor="reason" className="text-sm font-semibold">
                                        What will you use these credits for on TrueFolio?
                                    </Label>
                                    <Textarea
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Please explain how you plan to use these credits on TrueFolio. For example: 'I want to refresh my portfolio insights, analyze my coding patterns, and try the AI-powered recommendations.' This helps us process your request faster."
                                        className="min-h-[120px] resize-none"
                                        maxLength={500}
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">
                                            {reason.length}/500 characters
                                        </span>
                                        {reason.length >= 10 && (
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Good length
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    onClick={handleSubmitRequest}
                                    disabled={isSubmitting || reason.length < 10}
                                    className="w-full h-12 text-base font-semibold cursor-pointer"
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="mr-2"
                                        >
                                            <Sparkles className="h-5 w-5" />
                                        </motion.div>
                                    ) : (
                                        <Send className="h-5 w-5 mr-2" />
                                    )}
                                    {isSubmitting ? "Processing Transfer Request..." : "Request Transfer"}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Info Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* How it Works */}
                        <Card className="border-border/40">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Info className="h-5 w-5 text-blue-500" />
                                    How it works
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Account Verification</p>
                                        <p className="text-xs text-muted-foreground">We verify your Coderz account and credit balance</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Credit Transfer</p>
                                        <p className="text-xs text-muted-foreground">Credits are moved from your Coderz account to TrueFolio</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-purple-600 text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Instant Access</p>
                                        <p className="text-xs text-muted-foreground">Use your credits immediately on TrueFolio features</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Process Timeline */}
                        <Card className="border-border/40">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Clock className="h-5 w-5 text-amber-500" />
                                    Processing time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm">Review within 2-4 hours</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">Email notification sent</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bell className="h-4 w-4 text-amber-500" />
                                    <span className="text-sm">In-app notification</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Don't have an account */}
                        <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-primary/10">
                            <CardContent className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">New to The Coderz?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Create your account on The Coderz platform to get started. You'll receive <span className="font-semibold text-foreground">50 free credits</span> instantly!
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => window.open('https://thecoderz.in.net', '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Join The Coderz
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Already have account */}
                        <Card className="border-border/40 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/10 dark:to-blue-950/10">
                            <CardContent className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto">
                                        <Link className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h3 className="font-semibold">Already have an account?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Visit The Coderz platform to check your credit balance or purchase more credits for both platforms.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => window.open('https://thecoderz.in.net/signin', '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Sign In to Coderz
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Success Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <AnimatePresence>
                        {isDialogOpen && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                <DialogHeader className="text-center pb-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <DialogTitle className="text-2xl font-bold text-emerald-600">
                                        Transfer Request Submitted!
                                    </DialogTitle>
                                    <DialogDescription className="text-center space-y-3 pt-2">
                                        <p>
                                            Your request to transfer <span className="font-semibold text-foreground">{requestedCredits} credits</span> from your Coderz account to TrueFolio has been submitted.
                                        </p>
                                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                            <p className="text-sm font-medium text-foreground">What's next?</p>
                                            <ul className="text-sm space-y-1">
                                                <li>• Account verification within 2-4 hours</li>
                                                <li>• Email & in-app notifications</li>
                                                <li>• Credits transferred if sufficient balance</li>
                                            </ul>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={closeDialog}
                                        className="flex-1 cursor-pointer"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Got it!
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open('https://thecoderz.in.net', '_blank')}
                                        className="cursor-pointer"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Visit Coderz
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </div>
    );
} 