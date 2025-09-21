/** @format */

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MediaItem {
	type: "video" | "image" | "gradient";
	url: string;
	fallback?: string;
	alt?: string;
}

export interface MediaDisplayProps {
	media: MediaItem;
	className?: string;
	imageClassName?: string;
	videoClassName?: string;
	autoPlay?: boolean;
	muted?: boolean;
	loop?: boolean;
	controls?: boolean;
	priority?: boolean;
	sizes?: string;
	width?: number;
	height?: number;
}

export function MediaDisplay({
	media,
	className,
	imageClassName,
	videoClassName,
	autoPlay = true,
	muted = true,
	loop = true,
	controls = false,
	priority = false,
	sizes,
	width = 500,
	height = 500,
	...props
}: MediaDisplayProps) {
	const baseClassName = cn("w-full h-full object-cover", className);

	switch (media.type) {
		case "video":
			if (!media.url) {
				return (
					<GradientFallback
						fallback={media.fallback}
						className={baseClassName}
					/>
				);
			}
			return (
				<video
					src={media.url}
					className={cn(baseClassName, videoClassName)}
					autoPlay={autoPlay}
					muted={muted}
					loop={loop}
					controls={controls}
					playsInline
					{...props}
				/>
			);

		case "image":
			if (!media.url) {
				return (
					<GradientFallback
						fallback={media.fallback}
						className={baseClassName}
					/>
				);
			}
			return (
				<Image
					src={media.url}
					alt={media.alt || "Media content"}
					width={width}
					height={height}
					className={cn(baseClassName, imageClassName)}
					priority={priority}
					sizes={sizes}
					{...props}
				/>
			);

		case "gradient":
		default:
			return (
				<GradientFallback
					fallback={media.fallback}
					className={baseClassName}
				/>
			);
	}
}

interface GradientFallbackProps {
	fallback?: string;
	className?: string;
}

function GradientFallback({ fallback, className }: GradientFallbackProps) {
	return (
		<div className={cn(fallback || "bg-gradient-to-br from-gray-400 to-gray-600", "flex items-center justify-center", className)}>
			<div className="text-white text-center">
				<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg
						className="w-8 h-8"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
				</div>
				<p className="text-sm opacity-80">Media Preview</p>
			</div>
		</div>
	);
}
