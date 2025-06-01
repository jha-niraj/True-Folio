"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightProps = {
	className?: string;
	gradientFirst?: string;
	gradientSecond?: string;
	gradientThird?: string;
	translateY?: number;
	width?: number;
	height?: number;
	smallWidth?: number;
	duration?: number;
	xOffset?: number;
};

export const Spotlight = ({
	className,
	gradientFirst = "radial-gradient(circle at center, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 100%)",
	gradientSecond = "radial-gradient(circle at center, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
	gradientThird = "radial-gradient(circle at center, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
	translateY = -350,
	width = 560,
	height = 1380,
	smallWidth = 240,
	duration = 7,
	xOffset = 100,
}: SpotlightProps = {}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}
		>
			<motion.div
				animate={{
					x: [0, xOffset, 0],
				}}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: "reverse",
					ease: "easeInOut",
				}}
				className="absolute top-0 left-0 w-full h-full"
			>
				<div
					style={{
						transform: `translateY(${translateY}px)`,
						background: gradientFirst,
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
						opacity: 0.4
					}}
				/>
			</motion.div>

			<motion.div
				animate={{
					x: [0, -xOffset, 0],
				}}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: "reverse",
					ease: "easeInOut",
				}}
				className="absolute top-0 right-0 w-full h-full"
			>
				<div
					style={{
						transform: `translateY(${translateY}px)`,
						background: gradientSecond,
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						right: 0,
						opacity: 0.3
					}}
				/>
			</motion.div>
		</motion.div>
	);
};