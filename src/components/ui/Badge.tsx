/** @format */

"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "secondary" | "destructive" | "outline";
	size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = "default", size = "md", ...props }, ref) => {
	const variants = {
		default: "liquid-glass-light text-white",
		secondary: "bg-white/20 text-white/90",
		destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
		outline: "border border-white/30 text-white/80",
	};

	const sizes = {
		sm: "px-2 py-1 text-xs rounded-xl",
		md: "px-3 py-1.5 text-sm rounded-full",
		lg: "px-4 py-2 text-base rounded-full",
	};

	return (
		<div
			className={cn("inline-flex items-center font-medium transition-colors", variants[variant], sizes[size], className)}
			ref={ref}
			{...props}
		/>
	);
});
Badge.displayName = "Badge";

export { Badge };
