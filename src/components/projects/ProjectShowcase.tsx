/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./ProjectCard";
import { ProjectSelector } from "./ProjectSelector";
import { Button } from "@/components/ui/Button";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectShowcaseProps {
	projects: Project[];
	selectedIndex?: number;
	onProjectSelect?: (index: number) => void;
	className?: string;
	showBackButton?: boolean;
	backButtonHref?: string;
}

export function ProjectShowcase({ projects, selectedIndex = 0, onProjectSelect, className, showBackButton = false, backButtonHref = "/" }: ProjectShowcaseProps) {
	const t = useTranslations("projects");
	const [internalSelectedProject, setInternalSelectedProject] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Use external selectedIndex if provided, otherwise use internal state
	const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : internalSelectedProject;

	const handleProjectSelect = (index: number) => {
		if (index === currentSelectedIndex) return;

		setIsTransitioning(true);
		setTimeout(() => {
			if (onProjectSelect) {
				onProjectSelect(index);
			} else {
				setInternalSelectedProject(index);
			}
			setIsTransitioning(false);
		}, 150);
	};

	const handlePrevious = () => {
		const newIndex = currentSelectedIndex === 0 ? projects.length - 1 : currentSelectedIndex - 1;
		handleProjectSelect(newIndex);
	};

	const handleNext = () => {
		const newIndex = currentSelectedIndex === projects.length - 1 ? 0 : currentSelectedIndex + 1;
		handleProjectSelect(newIndex);
	};

	if (!projects || projects.length === 0) {
		return (
			<div className="h-full flex items-center justify-center">
				<p className="text-white/60 text-lg">No projects available.</p>
			</div>
		);
	}

	const currentProject = projects[currentSelectedIndex];

	return (
		<div className={cn("h-full flex flex-col", className)}>
			{/* Full-screen Project Display */}
			<div className="flex-1 flex items-center justify-center p-4 lg:p-0">
				<div className="relative w-full max-w-4xl">
					{/* Enhanced TV Frame Effect */}
					<div className="absolute -inset-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl blur-xl" />
					<div className="relative liquid-glass-light rounded-3xl p-4 lg:p-6 border border-white/20">
						{/* Inner glow effect */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

						<div className={cn("relative transition-all duration-700 ease-out", isTransitioning ? "opacity-60 scale-98 blur-sm" : "opacity-100 scale-100 blur-0")}>
							<ProjectCard
								project={currentProject}
								size="large"
								showFullDescription={true}
								className="hover:scale-[1.01] hover:shadow-2xl"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced Navigation Controls */}
			<div className="flex items-center justify-center gap-4 lg:gap-6 mt-6 lg:mt-8 px-4">
				<button
					onClick={handlePrevious}
					className="p-3 lg:p-4 rounded-full liquid-button hover:scale-110 transition-all duration-300"
					aria-label="Previous project"
				>
					<svg
						className="w-5 h-5 lg:w-6 lg:h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<div className="flex items-center gap-2 lg:gap-3">
					{projects.map((_, index) => (
						<button
							key={index}
							onClick={() => handleProjectSelect(index)}
							className={cn(
								"w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300",
								index === currentSelectedIndex ? "bg-white scale-125 shadow-lg shadow-white/50" : "bg-white/40 hover:bg-white/60 hover:scale-110"
							)}
							aria-label={`Go to project ${index + 1}`}
						/>
					))}
				</div>

				<button
					onClick={handleNext}
					className="p-3 lg:p-4 rounded-full liquid-button hover:scale-110 transition-all duration-300"
					aria-label="Next project"
				>
					<svg
						className="w-5 h-5 lg:w-6 lg:h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			{/* Enhanced Back to Home Button */}
			{showBackButton && (
				<div className="flex justify-center mt-6 lg:mt-8 px-4">
					<Button
						variant="secondary"
						size="md"
						className="liquid-button hover:scale-105 transition-all duration-300"
						asChild
					>
						<Link
							href={backButtonHref}
							className="inline-flex items-center space-x-2"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<span>{t("backToHome")}</span>
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}

interface ProjectPreviewProps {
	project: Project;
	onClick: () => void;
	className?: string;
}

function ProjectPreview({ project, onClick, className }: ProjectPreviewProps) {
	return (
		<div
			className={cn("flex-shrink-0 w-40 md:w-48 transition-opacity duration-300 cursor-pointer", className)}
			onClick={onClick}
		>
			<ProjectCard
				project={project}
				size="small"
				showFullDescription={false}
			/>
		</div>
	);
}
