/** @format */

"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "glass" | "outline";
	size?: "sm" | "md" | "lg";
	asChild?: boolean;
	children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
	const baseClasses =
		"inline-flex items-center justify-center font-semibold rounded-[20px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary: "liquid-button text-white hover:scale-105 focus:ring-blue-500",
		secondary: "bg-white/10 hover:bg-white/20 text-white hover:text-white focus:ring-white",
		glass: "liquid-glass-light text-white/80 hover:text-white hover:scale-105 focus:ring-white",
		outline: "border border-white/30 text-white hover:bg-white/10 focus:ring-white",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(baseClasses, variants[variant], sizes[size], className)}
			ref={ref}
			{...props}
		>
			{children}
		</Comp>
	);
});

Button.displayName = "Button";

export { Button };
