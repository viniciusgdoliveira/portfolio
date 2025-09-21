/** @format */

"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "glass" | "elevated";
	children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = "default", children, ...props }, ref) => {
	const variants = {
		default: "liquid-card",
		glass: "liquid-glass",
		elevated: "liquid-card hover:scale-105 transition-all duration-300",
	};

	return (
		<div
			className={cn(variants[variant], className)}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
});

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("text-2xl font-semibold leading-none tracking-tight text-white", className)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-white/80", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("p-6 pt-0", className)}
		{...props}
	/>
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
