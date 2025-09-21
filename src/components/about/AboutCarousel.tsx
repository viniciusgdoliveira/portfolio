/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AboutCarouselProps } from "@/types/about";
import { cn } from "@/lib/utils";

export function AboutCarousel({ sections, autoRotate = true, interval = 8000, className }: AboutCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);

	useEffect(() => {
		if (!isAutoRotating || sections.length <= 1) return;

		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
		}, interval);

		return () => clearInterval(intervalId);
	}, [sections.length, isAutoRotating, interval]);

	const handleSectionSelect = (index: number) => {
		setCurrentIndex(index);
	};

	const toggleAutoRotation = () => {
		setIsAutoRotating(!isAutoRotating);
	};

	if (!sections || sections.length === 0) {
		return null;
	}

	const currentSection = sections[currentIndex];

	return (
		<div className={cn("max-w-6xl mx-auto", className)}>
			<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
				{/* Image Section */}
				<div className="relative">
					<div className="aspect-square md:aspect-[4/5] lg:aspect-square rounded-3xl liquid-glass overflow-hidden transition-all duration-1000 ease-in-out">
						<Image
							src={currentSection.image}
							alt={currentSection.alt || `${currentSection.title} - About section`}
							width={500}
							height={500}
							className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

						{/* Play/Pause Button */}
						{sections.length > 1 && (
							<div className="absolute bottom-4 right-4">
								<button
									onClick={toggleAutoRotation}
									className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/90 hover:text-white hover:bg-black/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
									aria-label={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
								>
									{isAutoRotating ? (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
										</svg>
									) : (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									)}
								</button>
							</div>
						)}
					</div>

					{/* Navigation Dots */}
					{sections.length > 1 && (
						<div className="flex justify-center space-x-3 mt-6">
							{sections.map((_, index) => (
								<button
									key={index}
									onClick={() => handleSectionSelect(index)}
									className={cn(
										"w-3 h-3 rounded-full transition-all duration-300",
										index === currentIndex ? "bg-blue-600 dark:bg-blue-400 scale-125" : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
									)}
									aria-label={`View ${sections[index].title} section`}
								/>
							))}
						</div>
					)}
				</div>

				{/* Content Section */}
				<Card className="p-6 md:p-8 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
					<div className="mb-6">
						<h3 className="text-xl md:text-2xl font-bold text-white mb-4">{currentSection.title}</h3>
						<p className="text-base md:text-lg text-white/80 leading-relaxed">{currentSection.content}</p>
					</div>

					{/* Tech Stack */}
					<div className="flex flex-wrap gap-2 md:gap-3">
						{currentSection.techStack.map((skill, index) => (
							<Badge
								key={index}
								size="md"
							>
								{skill}
							</Badge>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
